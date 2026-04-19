# 🔍 대화 핑퐁 감지 문제 분석

## 현재 시스템의 문제점

### 1. 실제 스토리에서 사용되는 패턴

```typescript
// ❌ 현재 시스템이 감지하지 못하는 패턴들
text: `복도 끝에서 담배 연기가 피어오르는 곳으로 다가간다.

한 남자가 초조하게 담배를 피우고 있다.

"당신들은... 탐정인가?" 그가 놀라며 뒤로 물러선다. "난 이노크 드레버요."`
```

**문제:**
- "그가"는 `findLastMentionedSpeaker()`로 처리되지만, "한 남자"는 캐릭터 패턴에 없음
- 따옴표 안의 대사에서 화자를 자기소개하지만, 파싱 시점에는 이미 늦음
- 결과: `narrator`로 잘못 감지되어 **포트레이트와 이름이 표시 안 됨**

### 2. parseDialogue 함수의 처리 순서 문제

```typescript
// 현재 순서:
1. [캐릭터명]: 대사 형식 체크 ✅
2. 캐릭터명: "대사" 형식 체크 ✅
3. 따옴표만 있는 경우 ❌ → 이전 텍스트에서 화자 추정
   - "홈즈가 말했다" → ✅ 감지 성공
   - "그가 말했다" → ❌ 실패 (narrator로 폴백)
   - "한 남자가 말했다" → ❌ 실패
```

### 3. 검증에서 걸러지지 않는 이유

```typescript
// dialogueValidator.ts
if (line.confidence < 0.7) {
  // 경고 발생
}
```

**문제:**
- `narrator`로 감지된 대사는 confidence 0.5 (폴백)
- 0.5 < 0.7 이므로 경고가 발생하지만...
- 실제로는 **대사 내용**에서 화자가 자기소개함 ("난 이노크 드레버요")
- 이를 감지하는 로직이 없음!

## 해결 방안

### A. 대사 내용 분석 강화 (추천)

따옴표 안의 대사에서 자기소개 패턴 감지:

```typescript
// "난 이노크 드레버요" → drebber
// "저는 조셉 스탠거슨입니다" → stangerson
// "왓슨, 보시오" → holmes (왓슨을 부르는 사람)
```

### B. 노드 character 속성 활용

```typescript
meet_drebber: {
  text: `"당신들은... 탐정인가?" 그가 놀라며...`,
  character: 'drebber',  // 명시적 지정
}
```

**장점:**
- 즉시 해결
- 파싱 로직 영향 없음

**단점:**
- 모든 노드에 수동 추가 필요
- 다중 화자 대화에서는 사용 불가

### C. 대화 핑퐁 컨텍스트 추적 (가장 정교)

```typescript
// 이전 대사가 홈즈였다면, 다음 대사는 상대방
// 2인 대화 감지 후 자동 교대
```

## 권장 조합 솔루션

### 1단계: 대사 내용 자기소개 패턴 감지 (즉시 적용)

```typescript
// parseDialogue 함수에 추가
const selfIntroPatterns = {
  'drebber': /난 이노크 드레버|저는 이노크 드레버|드레버요|드레버입니다/,
  'stangerson': /난 조셉 스탠거슨|저는 조셉|스탠거슨입니다/,
  'hope': /난 제퍼슨 호프|호프요|마차꾼입니다/,
  'gregson': /그레그슨 형사|형사입니다/,
  // ...
};

// 대사에서 자기소개 확인
for (const [charId, pattern] of Object.entries(selfIntroPatterns)) {
  if (pattern.test(dialogue)) {
    currentSpeaker = charId;
    break;
  }
}
```

### 2단계: nodeCharacter 우선 적용 강화 (이미 구현됨)

```typescript
// 현재 코드 (396-404행)
if (nodeCharacter && nodeCharacter !== 'narrator') {
  lines.push({
    characterId: nodeCharacter,
    text: dialogue
  });
  return; // ✅ 추론 건너뛰기
}
```

### 3단계: 대화 핑퐁 패턴 감지 (다중 대사 노드용)

```typescript
// 2인 대화 감지
if (lines.length >= 2) {
  const speakers = lines
    .filter(l => l.characterId !== 'narrator')
    .map(l => l.characterId);
  
  const uniqueSpeakers = [...new Set(speakers)];
  
  // 2명만 대화하는 경우
  if (uniqueSpeakers.length === 2) {
    let currentSpeakerIndex = 0;
    
    // 교대로 할당
    lines.forEach(line => {
      if (line.characterId === 'narrator' && line.text.includes('"')) {
        line.characterId = uniqueSpeakers[currentSpeakerIndex % 2];
        currentSpeakerIndex++;
      }
    });
  }
}
```

## 예상 효과

### Before
```
[narrator] "당신들은... 탐정인가?"  ❌ 포트레이트 없음
[narrator] "난 이노크 드레버요."   ❌ 포트레이트 없음
```

### After (자기소개 패턴 감지)
```
[이노크 드레버] "당신들은... 탐정인가?"  ✅ 포트레이트 표시
[이노크 드레버] "난 이노크 드레버요."   ✅ 포트레이트 표시
```

### After (nodeCharacter 지정)
```typescript
meet_drebber: {
  character: 'drebber',
  text: `"당신들은...`
}
```
→ 모든 대사가 drebber로 표시 ✅

## 구현 우선순위

1. **즉시 구현**: 자기소개 패턴 감지 (parseDialogue 함수 수정)
2. **중기**: 문제 노드에 character 속성 추가
3. **장기**: 2인 대화 핑퐁 자동 감지

---

다음 단계: 자기소개 패턴 감지 코드 구현
