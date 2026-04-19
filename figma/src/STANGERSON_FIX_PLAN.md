# 스탠거슨 수정 계획서

## 1. 인물명 오타 통일 작업

### 현재 상황
- **스탠거슨**(정확한 표기) 외에 다음 오타들이 발견됨:
  - 스탬거슨 (7개 파일, 81+ 건)
  - 스탐거슨 (동일)
  - 스태거슨 (확인 필요)

### 수정 대상 파일
1. `/data/story/suspect-routes.ts` - 다수의 오타 포함
2. `/data/story/bad-endings.ts` - 엔딩 대사 오타
3. `/data/story/free-choice-routes.ts` - 자유 선택 루트 오타
4. `/data/story/suspects-backstory.ts` - 배경 스토리 오타
5. `/data/story/interrogations/stangerson-initial.ts` - 심문 대사 오타

### 작업 방법
- 전체 파일 검색하여 "스탬거슨", "스탐거슨", "스태거슨"을 모두 "스탠거슨"으로 일괄 변경
- 대화문 내 일관성 확인

---

## 2. 스탠거슨 스토리 유실 노드 정리

### 현재 파일 구조
```
/data/story/interrogations/
├── stangerson-initial.ts     (초기 대면)
├── stangerson-past.ts         (과거 심문)
├── stangerson-evidence.ts     (증거 제시)
├── stangerson-resolution.ts   (해결)
├── hope-evidence.ts           (호프 증거)
└── index.ts                   (통합)
```

### 유실 가능성 체크 항목
1. **서재 초기 노드 연결**
   - `discover_stangerson` → `ask_stangerson` 연결 확인
   - `examine_rache` 후 스탠거슨 대화 확인

2. **심문 노드 연결성**
   - `ask_stangerson` (stangerson-initial.ts)
   - `press_stangerson_level_1/2/3` (stangerson-evidence.ts)
   - `present_evidence_to_stangerson` (stangerson-evidence.ts)

3. **누락된 노드 확인**
   - `stangerson_relationship` 정의 여부
   - `stangerson_night_detail` 정의 여부
   - `stangerson_basement_question` 정의 여부
   - `stangerson_basement_confession` 정의 여부
   - `confront_stangerson` 정의 여부

4. **엔딩 연결**
   - 스탠거슨 고백 → 배드엔딩 루트
   - 스탠거슨 무죄 → 진엔딩 루트

### 수정 계획
- 누락된 노드를 해당 파일에 추가
- storyData.ts에서 모든 노드가 제대로 export되는지 확인

---

## 3. 증거 제시 시스템 - 2층 단서 획득 문제

### 현재 문제점

**문제**: 증거 제시 시스템에서 중요 단서들이 2층에서만 획득 가능
- `루시의 반지` - 2층 침실 서랍 (drawer_key 필요)
- `서랍 열쇠` - 2층 어딘가
- `백작의 일기` - 위치 확인 필요

**현재 체크포인트 구조**:
- 1층 조사 완료 → 체크포인트 저장
- 2층 올라가기 → 새로운 탐색
- 증거 제시는 1층 심문에서 필요

**모순점**:
1. 1층에서 스탠거슨/호프를 심문할 때 증거 제시 옵션이 나타남
2. 그러나 핵심 증거(루시의 반지)는 2층에서만 획득 가능
3. 플레이어가 2층을 먼저 가지 않으면 증거 없이 심문만 함

### 해결 방안 (3가지 옵션)

#### 옵션 A: 증거 없이도 진행 가능하도록 (추천)
```
장점:
- 자유도 높음
- 여러 경로 탐색 가능
- 회차 플레이 유도

방법:
1. 증거 없이도 대화로 진실에 접근 가능
2. 증거가 있으면 더 빠르게/확실하게 결말
3. requiredItem 조건은 유지하되, 대체 경로 추가
   - "증거 제시" (requiredItem 필요)
   - "대화로 압박" (증거 없이 가능, 난이도 높음)
```

#### 옵션 B: 필수 증거는 1층에 배치
```
방법:
1. 루시의 반지 → 서재 금고나 다른 1층 위치로 이동
2. 백작의 일기 → 이미 1층에 있는지 확인
3. 2층 증거는 보너스/깊은 이해용

장점:
- 선형적 진행 가능
- 초심자 친화적

단점:
- 자유도 감소
- 현재 설계와 충돌
```

#### 옵션 C: 조건부 증거 제시 (하이브리드)
```
방법:
1. 증거 제시 선택지에 조건 추가:
   - showIf: { hasItem: '루시의 반지' }
   - 증거가 없으면 선택지 자체가 숨김

2. 대신 대체 경로 강화:
   - "💬 추궁하기" 선택지 항상 표시
   - "🔍 관찰로 추리하기" 선택지 추가

3. 2층 탐색 후 다시 1층 돌아오기:
   - "1층으로 돌아가 다시 심문한다" 선택지
   - 새로운 증거로 재심문 가능

장점:
- 현실적
- 플레이어 혼란 방지
- 탐정물 느낌 살림

단점:
- 구현 복잡도 증가
```

### 추천 방안: **옵션 A + C 조합**

#### 구체적 구현:
```typescript
// stangerson-evidence.ts 수정 예시

present_evidence_to_stangerson: {
  id: 'present_evidence_to_stangerson',
  text: `증거를 제시할 시간이다...`,
  choices: [
    {
      text: '💍 루시의 반지를 제시한다',
      nextNode: 'evidence_ring_result',
      requiredItem: '루시의 반지',
      showIf: { hasItem: '루시의 반지' }  // ← 추가
    },
    {
      text: '📜 백작의 일기를 제시한다',
      nextNode: 'evidence_diary_result',
      requiredItem: '백작의 일기',
      showIf: { hasItem: '백작의 일기' }  // ← 추가
    },
    // 증거 없이도 선택 가능
    {
      text: '🔍 관찰한 것으로 추궁한다',
      nextNode: 'press_stangerson_by_observation'  // ← 새 노드
    },
    {
      text: '💬 계속 대화로 압박한다',
      nextNode: 'press_stangerson_level_1'
    },
    {
      text: '⬅️ 다른 곳을 먼저 조사한다',
      nextNode: 'main_entrance_return_study'
    }
  ]
}
```

#### 새 노드 추가:
```typescript
press_stangerson_by_observation: {
  id: 'press_stangerson_by_observation',
  text: `증거는 없지만... 스탠거슨의 행동을 관찰한 것으로 추궁할 수 있다.

그의 떨리는 손, 피하는 시선, 땀방울...

홈즈가 속삭인다. "왓슨, 때로는 증거보다 사람의 반응이 더 많은 것을 말해주지."`,
  choices: [
    { text: '손의 떨림을 지적한다', nextNode: 'press_stangerson_level_1' },
    { text: '시선 회피를 추궁한다', nextNode: 'press_stangerson_level_2' },
    { text: '다른 증거를 찾아본다', nextNode: 'search_more_evidence_hint' }
  ]
}

search_more_evidence_hint: {
  id: 'search_more_evidence_hint',
  text: `홈즈가 말한다.

[홈즈]: "더 확실한 증거가 필요해. 저택의 다른 곳들, 특히 2층을 조사해봐야 할 것 같아."

스탠거슨을 계속 압박하는 것도 방법이지만... 결정적 증거가 있다면 훨씬 수월할 것이다.`,
  choices: [
    { text: '2층으로 올라간다', nextNode: 'upstairs' },
    { text: '계속 대화로 압박한다', nextNode: 'press_stangerson_level_1' },
    { text: '일단 다른 곳을 조사한다', nextNode: 'main_entrance_return_study' }
  ]
}
```

---

## 4. 작업 순서

1. **오타 통일** (30분)
   - 스탬거슨/스탐거슨 → 스탠거슨 일괄 변경
   - 변경 후 전체 검색으로 확인

2. **유실 노드 확인 및 복구** (1시간)
   - 각 interrogation 파일 노드 연결성 점검
   - 누락된 노드 추가
   - storyData.ts export 확인

3. **증거 제시 시스템 개선** (2시간)
   - showIf 조건 추가로 증거 없을 때 숨김
   - 대체 경로 노드 추가 (관찰 기반 추궁)
   - 힌트 노드 추가 (2층 조사 유도)
   - 호프 심문에도 동일 패턴 적용

4. **테스트** (1시간)
   - 1층만 조사 → 증거 없이 심문 경로
   - 2층 조사 → 증거로 심문 경로
   - 양쪽 경로 모두 엔딩 도달 가능한지 확인

---

## 5. 예상 효과

### Before
- ❌ 증거 제시 선택지가 나와도 아이템이 없어서 선택 불가 (혼란)
- ❌ 2층 가지 않으면 막히는 듯한 느낌
- ❌ 스탠거슨 이름 표기 불일치

### After
- ✅ 증거 없으면 선택지 자체가 숨겨짐 (깔끔)
- ✅ 증거 없이도 대화로 진행 가능 (자유도)
- ✅ 2층 조사 힌트 제공 (플레이어 유도)
- ✅ 증거가 있으면 더 쉽고 확실한 해결 (보상감)
- ✅ 스탠거슨 표기 통일 (몰입감)

---

## 진행 여부 확인

위 계획에 대해:
1. 전체 진행 OK
2. 일부만 진행 (어떤 부분?)
3. 다른 방향 제안

어떻게 진행할까요?
