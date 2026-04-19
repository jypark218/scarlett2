# ✅ 스탠거슨 대사 문제 완전 해결

## 🔍 발견된 문제

1. **정규식 패턴 미흡** - `labeledDialoguePattern`에 전체 이름 누락
   - ❌ Before: `/(홈즈|스탠거슨|...)/` - 짧은 이름만 인식
   - ✅ After: `/(홈즈|셜록 홈즈|스탠거슨|조셉 스탠거슨|...)/` - 전체 이름도 인식

2. **오타 존재** - "조셉 스태너슨" (잘못된 철자)
   - ❌ Before: `조셉 스태너슨`
   - ✅ After: `조셉 스탠거슨`

3. **`character` 속성 누락** - 일부 노드에서 주요 화자 미지정

## 🛠️ 적용된 해결책

### 1. parseDialogue 정규식 패턴 확장 (/data/characterData.ts)

```typescript
// Before
const labeledDialoguePattern = /(왓슨|백작|호프|홈즈|그레그슨|스탠거슨|드레버|루시):\s*"([^"]*)"/g;

// After  
const labeledDialoguePattern = /(왓슨|백작|모로 백작|호프|제퍼슨 호프|홈즈|셜록 홈즈|그렉슨|그레그슨|그레그슨 형사|스탠거슨|조셉 스탠거슨|스탬거슨|조셉 스탬거슨|드레버|이녹 드레버|이노크 드레버|루시|루시 루이자):\s*"([^"]*)"/g;
```

### 2. 스탠거슨 노드 텍스트 형식 통일

#### 수정된 파일들:
- `/data/story/interrogations/stangerson-initial.ts`
- `/data/story/interrogations/stangerson-past.ts`
- `/data/story/interrogations/stangerson-resolution.ts`

#### 변경 내용:
```typescript
// Before - 내레이션 형식
text: `홈즈가 스탠거슨 앞으로 한 걸음 다가갑니다.

홈즈: "당신이 백작을 배신했습니까?"

스탠거슨이 고개를 젓습니다.

스탠거슨: "배신? 아닙니다! 저는..."`

// After - 대사 라벨 형식 + character 속성 추가
{
  id: 'stangerson_betrayal_motive',
  character: 'holmes',  // ⭐ 추가
  text: `홈즈: "당신이 백작을 배신했습니까?"

스탠거슨: "배신? 아닙니다! 저는..."

홈즈: "20년간 협박당하며 살았습니다..."

스탠거슨: "그런 게 아닙니다! 저는 비겁자입니다!"`
}
```

### 3. character 속성 추가한 노드들

✅ `confront_stangerson` - character: 'holmes'
✅ `stangerson_betrayal_motive` - character: 'holmes'  
✅ `stangerson_relief` - character: 'holmes'
✅ `stangerson_murder_motive` - character: 'holmes'

## 📊 파싱 우선순위

parseDialogue 함수는 다음 순서로 텍스트를 파싱합니다:

1. **[캐릭터명]:대사** 형식 (대괄호)
   - 예: `[조셉 스탠거슨]:...탐정님. 늦으셨습니다.`
   - speakerMap 매핑 사용

2. **캐릭터명: "대사"** 형식 (따옴표)
   - 예: `스탠거슨: "배신? 아닙니다!"`
   - labeledDialoguePattern 정규식 사용
   - ⭐ 이 부분이 확장됨!

3. **기존 따옴표 파싱** (라벨 없음)
   - nodeCharacter 속성 우선 적용
   - 행동 패턴으로 화자 추론

## 🎯 작동 방식

### 예시: stangerson_betrayal_motive 노드

**입력 텍스트:**
```
홈즈: "당신이 백작을 배신했습니까?"

스탠거슨: "배신? 아닙니다! 저는..."

홈즈: "20년간 협박당하며 살았습니다..."

스탠거슨: "그런 게 아닙니다! 저는 비겁자입니다!"
```

**파싱 결과:**
```javascript
[
  { characterId: 'holmes', text: '당신이 백작을 배신했습니까?' },
  { characterId: 'narrator', text: '' },  // 빈 줄
  { characterId: 'stangerson', text: '배신? 아닙니다! 저는...' },
  { characterId: 'narrator', text: '' },
  { characterId: 'holmes', text: '20년간 협박당하며 살았습니다...' },
  { characterId: 'narrator', text: '' },
  { characterId: 'stangerson', text: '그런 게 아닙니다! 저는 비겁자입니다!' }
]
```

**화면 표시:**
1. 셜록 홈즈 포트레이트 + "당신이 백작을 배신했습니까?"
2. 조셉 스탠거슨 포트레이트 + "배신? 아닙니다! 저는..."
3. 셜록 홈즈 포트레이트 + "20년간 협박당하며 살았습니다..."
4. 조셉 스탠거슨 포트레이트 + "그런 게 아닙니다! 저는 비겁자입니다!"

## 🔍 디버깅

브라우저 콘솔에서 다음 로그 확인 가능:

```
[parseDialogue] 노드 stangerson_betrayal_motive: 4개 라벨 대사 발견
[parseDialogue] 홈즈 (holmes): "당신이 백작을 배신했습니까..."
[parseDialogue] 스탠거슨 (stangerson): "배신? 아닙니다! 저는..."
[parseDialogue] 홈즈 (holmes): "20년간 협박당하며 살았습니다..."
[parseDialogue] 스탠거슨 (stangerson): "그런 게 아닙니다! 저는 비겁자..."
```

## ✅ 체크리스트

- [x] labeledDialoguePattern에 전체 이름 추가
- [x] "조셉 스태너슨" 오타 수정 → "조셉 스탠거슨"
- [x] stangerson_betrayal_motive 노드 형식 통일
- [x] stangerson_murder_motive 노드 형식 통일
- [x] stangerson_relief 노드 형식 통일
- [x] confront_stangerson 노드 형식 통일
- [x] character 속성 추가

## 🎮 테스트 방법

1. 게임 시작
2. F12 → 콘솔 탭 열기
3. 스탠거슨 루트 진행:
   - 서재에서 "그가 뭘 하고 있었는지 추궁한다" 선택
   - "백작을 배신한 이유를 캐묻는다" 선택
4. 콘솔 로그에서 `[parseDialogue]` 확인
5. 홈즈와 스탠거슨 포트레이트가 번갈아 정확히 표시되는지 확인

## 🎉 결과

이제 스탠거슨 관련 모든 대사에서:
- ✅ 올바른 캐릭터 포트레이트 표시
- ✅ 올바른 캐릭터 이름 색상 표시
- ✅ 대사별로 순차적으로 표시
- ✅ 홈즈 ↔ 스탠거슨 혼동 없음
