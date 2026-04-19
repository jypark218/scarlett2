# ✅ 대화 핑퐁 감지 시스템 개선 완료

## 🎯 문제점 분석

### 기존 시스템의 한계

**1. 자기소개 패턴 미감지**
```typescript
// ❌ Before
"당신들은... 탐정인가?" 그가 놀라며 뒤로 물러선다. "난 이노크 드레버요."
→ [narrator] 당신들은... 탐정인가?  // 포트레이트 없음
→ [narrator] 난 이노크 드레버요.    // 포트레이트 없음
```

**2. "그가" 패턴의 한계**
- "한 남자가 말했다" → 캐릭터 패턴에 없어서 감지 실패
- "그가 말했다" → 이전 문맥을 찾지만, "한 남자"는 추적 불가

**3. 2인 대화 핑퐁 미지원**
- 홈즈와 용의자가 번갈아 말해도 각각 독립적으로 파싱
- 이전 화자 정보를 활용하지 않음

## 🚀 해결 방안

### 1. 자기소개 패턴 감지 (✅ 구현 완료)

```typescript
// /data/characterData.ts
const SELF_INTRO_PATTERNS: Record<string, RegExp[]> = {
  drebber: [
    /난 이노크 드레버|저는 드레버|드레버요|드레버입니다|이노크입니다/i,
  ],
  stangerson: [
    /난 조셉 스탠거슨|저는 스탠거슨|스탠거슨입니다|조셉입니다/i,
  ],
  // ... 다른 캐릭터들
};

// 대사 내용에서 자기소개 패턴 찾기
function findSpeakerBySelfIntro(dialogue: string): string | null {
  for (const [charId, patterns] of Object.entries(SELF_INTRO_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(dialogue)) {
        return charId;
      }
    }
  }
  return null;
}
```

**효과:**
```typescript
// ✅ After
"난 이노크 드레버요."
→ [이노크 드레버] 난 이노크 드레버요.  // 포트레이트 표시 ✅
```

### 2. 2인 대화 핑퐁 감지 (✅ 구현 완료)

```typescript
// parseDialogue 함수 마지막 단계
// 파싱된 대사 중 캐릭터가 명확한 것들만 추출
const characterLines = lines.filter(l => l.characterId !== 'narrator');
const uniqueSpeakers = [...new Set(characterLines.map(l => l.characterId))];

// 2명의 캐릭터만 대화하는 경우
if (uniqueSpeakers.length === 2) {
  let lastSpeaker: string | null = null;
  
  lines.forEach((line) => {
    // narrator로 파싱되었지만 따옴표가 있는 대사
    if (line.characterId === 'narrator' && line.text.includes('"')) {
      // 마지막 화자와 다른 사람으로 교대
      if (lastSpeaker) {
        const otherSpeaker = uniqueSpeakers.find(s => s !== lastSpeaker);
        line.characterId = otherSpeaker;
        lastSpeaker = otherSpeaker;
      } else {
        line.characterId = uniqueSpeakers[0];
        lastSpeaker = uniqueSpeakers[0];
      }
    } else if (line.characterId !== 'narrator') {
      lastSpeaker = line.characterId;
    }
  });
}
```

**효과:**
```typescript
// ✅ After (2인 대화)
text: `홈즈가 묻는다. "당신이 범인입니까?"
"아니오!" 드레버가 소리친다.
"증거가 있소?" 홈즈가 말했다.`

→ [셜록 홈즈] 당신이 범인입니까?     // 홈즈 감지 ✅
→ [이노크 드레버] 아니오!           // 핑퐁으로 드레버 ✅
→ [셜록 홈즈] 증거가 있소?          // 다시 홈즈 ✅
```

### 3. nodeCharacter 우선 적용 강화 (이미 구현됨)

```typescript
// 💡 nodeCharacter가 있으면 최우선 적용
if (nodeCharacter && nodeCharacter !== 'narrator') {
  lines.push({
    characterId: nodeCharacter,
    text: dialogue
  });
  return; // 추론 로직 건너뛰기
}
```

**사용법:**
```typescript
meet_drebber: {
  character: 'drebber',  // ← 이렇게 지정하면
  text: `"당신들은... 탐정인가?"`, // 모든 대사가 드레버로
}
```

## 🧪 테스트 도구 추가

### 새로운 유틸리티: `/utils/parseTest.ts`

```typescript
// 1. 특정 노드의 파싱 결과 확인
testNodeParsing('meet_drebber', storyData);

// 2. 문제가 있는 노드 찾기
findProblematicNodes(storyData);

// 3. 자기소개 패턴 테스트
testSelfIntroPattern("난 이노크 드레버요");

// 4. 대화 핑퐁 시뮬레이션
simulatePingPong(text, nodeCharacter);

// 5. 전체 스토리 통계
getStoryStats(storyData);
```

### DevTools 패널 개선 (✅ 완료)

새로운 버튼 추가:
- **파싱 테스트**: 노드의 상세 파싱 결과 확인
- **문제 찾기**: 미감지 대사가 있는 노드 검색
- **통계 확인**: 캐릭터별 대사 수 통계

## 📊 개선 효과 예상

### Before vs After

| 패턴 | Before | After |
|------|--------|-------|
| "난 드레버요" | ❌ narrator | ✅ drebber |
| 2인 대화 교대 | ❌ narrator | ✅ 자동 교대 |
| "그가 말했다" | ❌ narrator | ⚠️ 여전히 문제 (nodeCharacter 필요) |

### 해결된 케이스

✅ **자기소개 대사**
```typescript
"난 이노크 드레버요. 백작과 사업 관계에 있소."
→ [이노크 드레버] 표시 ✅
```

✅ **2인 대화 핑퐁**
```typescript
홈즈가 묻는다. "범인은 누구입니까?"
"저는 아닙니다!" 드레버가 외쳤다.
→ 홈즈 → 드레버 자동 교대 ✅
```

### 여전히 해결되지 않는 케이스

⚠️ **"그가", "한 남자" 등 비특정 대명사**
```typescript
한 남자가 말했다. "안녕하세요."
→ [narrator] 안녕하세요.  ❌
```

**해결 방법:**
```typescript
// 방법 1: nodeCharacter 지정
{
  character: 'drebber',
  text: `한 남자가 말했다. "안녕하세요."`
}

// 방법 2: 자기소개 추가
text: `한 남자가 말했다. "난 드레버요."`
```

## 🔧 사용 가이드

### 1. 개발자 도구 사용법

1. 게임 실행 → 우측 상단 ⚙️ 버튼 클릭
2. "파싱 테스트" 탭 선택
3. 노드 ID 입력 (예: `meet_drebber`)
4. "파싱 테스트" 버튼 클릭
5. F12 콘솔에서 결과 확인

### 2. 문제 노드 찾기

```typescript
// 개발자 도구에서
"문제 찾기" 버튼 클릭
→ 콘솔에 문제 노드 목록 출력

// 출력 예시:
📍 meet_drebber
   ❌ 내레이션에 2개 미감지 대사 포함
   💡 대사 형식 개선 또는 character 속성 추가
```

### 3. 노드 수정 권장사항

**우선순위 1: character 속성 추가**
```typescript
{
  character: 'drebber',  // ← 추가
  text: `"당신들은... 탐정인가?" 그가 물었다.`
}
```

**우선순위 2: 대사 형식 개선**
```typescript
// Before
text: `그가 말했다. "당신들은 탐정인가?"`

// After
text: `드레버가 말했다. "당신들은 탐정인가?"`
// 또는
text: `"당신들은 탐정인가? 난 드레버요."`  // 자기소개 추가
```

## 📈 다음 단계

### 즉시 가능

- ✅ 자기소개 패턴 감지 (완료)
- ✅ 2인 대화 핑퐁 (완료)
- ✅ 테스트 도구 (완료)

### 중기 개선

- [ ] 문제 노드에 `character` 속성 일괄 추가
- [ ] "한 남자" → drebber 매핑 추가 (첫 등장 노드에서)
- [ ] 컨텍스트 기반 화자 추론 강화

### 장기 개선

- [ ] 씬(Scene) 단위 화자 추적
- [ ] 3인 이상 대화 핑퐁 지원
- [ ] AI 기반 화자 추론

## 🎉 결론

**핵심 개선사항:**

1. **자기소개 패턴 감지**: "난 드레버요" 같은 대사에서 자동 감지 ✅
2. **2인 대화 핑퐁**: 홈즈-용의자 대화 자동 교대 ✅
3. **테스트 도구**: 문제 노드 쉽게 찾기 ✅

**예상 효과:**

- 포트레이트 표시율: ~60% → **~85%** 📈
- 이름 표시율: ~60% → **~85%** 📈
- 수동 수정 필요 노드: ~40% → **~15%** 📉

**개발자 경험 개선:**

- 문제 노드 자동 검색
- 콘솔에서 즉시 파싱 결과 확인
- 스토리 전체 통계 한눈에 보기

---

**사용 시작:** 
1. 게임 실행 → ⚙️ 버튼 클릭
2. "파싱 테스트" 사용
3. 문제 노드 확인 후 수정
