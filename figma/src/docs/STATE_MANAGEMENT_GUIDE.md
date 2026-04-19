# 상태 관리 개선 가이드

## 📋 개요

이 문서는 게임의 상태 플래그 관리와 조건문 우선순위 시스템에 대한 가이드입니다.

### 해결된 문제점

1. **상태 플래그의 누적 문제**: 상호 배타적인 상태(예: Trust vs Betrayal)가 동시에 true가 되어 논리적 모순 발생
2. **조건문의 우선순위 문제**: 여러 조건이 동시에 만족될 때 어떤 대사를 출력할지 불명확
3. **시간대/사건 인과관계 문제**: 선행 조건 없이 후행 이벤트가 발생

---

## 🔧 주요 개선 사항

### 1. 상태 검증 시스템 (`/utils/game/stateValidator.ts`)

#### 상호 배타적 상태 그룹 정의

```typescript
export const MUTUALLY_EXCLUSIVE_GROUPS = {
  // 엘렌의 운명 (세 가지 중 하나만 가능)
  ellen_fate: [
    'ending_ellen_saved',      // 엘렌 구출 성공
    'ending_ellen_sacrificed', // 엘렌 희생
    'ending_ellen_lost'        // 엘렌을 찾지 못함
  ],
  
  // 호프의 태도 (하나만 가능)
  hope_relationship: [
    'hope_trusts_watson',      // 호프가 왓슨을 신뢰
    'hope_hostile_watson',     // 호프가 왓슨에게 적대적
    'hope_neutral_watson'      // 호프가 중립적
  ]
};
```

**작동 방식:**
- 한 그룹 내에서 2개 이상의 노드가 방문되면 개발 모드에서 오류 출력
- 예: `hope_trusts_watson`과 `hope_hostile_watson`이 동시에 true가 되면 콘솔에 경고

#### 시간대 기반 조건 검증

```typescript
export const TIME_BASED_REQUIREMENTS = {
  evening: {
    // 저녁 시간대에는 오후 조사가 어느 정도 진행되어야 함
    requiredVisitedAny: ['study_room', 'upstairs', 'back_entrance']
  },
  night: {
    // 밤 시간대에는 저녁 조사가 완료되어야 함
    requiredVisitedAny: ['drebber_alibi', 'basement_scene', 'hope_reveals_lucy_hint']
  }
};
```

**작동 방식:**
- 특정 시간대의 노드에 진입 시 선행 조건 체크
- 조건 미충족 시 개발 모드에서 경고 출력

#### 아이템 의존성 체인

```typescript
export const ITEM_DEPENDENCY_CHAIN: Record<string, string[]> = {
  '금고 비밀번호': ['지하실 열쇠', 'ledger'], // 금고를 열어야 얻을 수 있음
  '서랍장 열쇠': ['ellen_will'],              // 서랍장 열쇠가 있어야 유언장을 얻을 수 있음
};
```

**작동 방식:**
- 선행 아이템 없이 후행 아이템을 획득하면 개발 모드에서 오류 출력
- 예: '금고 비밀번호' 없이 '지하실 열쇠'를 얻으면 경고

---

### 2. 우선순위 기반 conditionalText 시스템

#### 기존 방식 (문제점)

```typescript
// ❌ 문제: 배열 순서에 의존, 우선순위 불명확
conditionalText: [
  {
    condition: { hasItem: '반지' },
    text: "반지를 보고 있다."
  },
  {
    condition: { visitedNode: 'basement_scene' },
    text: "지하실을 본 후의 대사."
  }
]
```

**문제점:**
- 두 조건이 모두 만족되면 첫 번째 텍스트만 사용됨
- 시나리오 작성자가 의도한 우선순위와 다를 수 있음

#### 개선된 방식 (우선순위 시스템)

```typescript
// ✅ 개선: priority 필드로 명확한 우선순위 설정
conditionalText: [
  {
    condition: { hasItem: '반지' },
    text: "반지를 보고 있다.",
    priority: 10 // 높은 우선순위
  },
  {
    condition: { visitedNode: 'basement_scene' },
    text: "지하실을 본 후의 대사.",
    priority: 5  // 낮은 우선순위
  }
]
```

**작동 방식:**
1. `priority` 값이 높을수록 먼저 평가됨 (기본값: 0)
2. 우선순위가 같으면 배열 순서대로 평가
3. 첫 번째로 조건을 만족하는 텍스트 사용

---

## 📝 시나리오 작성 가이드

### 상호 배타적 상태 관리

#### ❌ 나쁜 예: 개별 플래그 방식

```typescript
// 문제: trust와 betrayal이 동시에 true가 될 수 있음
const node1 = {
  id: 'hope_shows_trust',
  text: '호프가 당신을 믿는다...',
  // 여기서 hope_trusts_watson = true
};

const node2 = {
  id: 'hope_betrays',
  text: '호프가 배신했다!',
  // 여기서 hope_hostile_watson = true
  // ⚠️ 문제: 두 상태가 동시에 true!
};
```

#### ✅ 좋은 예: 단일 변수 또는 검증된 상태 전환

```typescript
// 방법 1: visitedNode를 통한 상호 배타적 처리
const node1 = {
  id: 'hope_shows_trust',
  text: '호프가 당신을 믿는다...',
  choices: [
    { 
      text: '신뢰에 보답한다', 
      nextNode: 'trust_route',
      hideIfVisitedNode: 'betrayal_route' // 배신 루트를 탔으면 이 선택지 숨김
    }
  ]
};

// 방법 2: 상태 검증 시스템 활용
// stateValidator.ts에 그룹 정의 후 자동 검증됨
```

---

### 조건문 우선순위 설정

#### ❌ 나쁜 예: 우선순위 없는 조건

```typescript
conditionalText: [
  {
    // 일반적인 경우
    condition: { visitedNode: 'study_room' },
    text: "서재를 조사했다."
  },
  {
    // 특수한 경우 (더 중요함)
    condition: { 
      visitedAll: ['study_room', 'basement_scene'],
      hasItem: '지하실 열쇠'
    },
    text: "서재와 지하실을 모두 조사했고, 열쇠도 가지고 있다!"
  }
]
// ⚠️ 문제: study_room만 방문해도 첫 번째 텍스트가 표시됨
// 두 조건을 모두 만족해도 첫 번째 텍스트만 표시됨!
```

#### ✅ 좋은 예: 우선순위로 특수 케이스 우선 처리

```typescript
conditionalText: [
  {
    // 특수한 경우 - 높은 우선순위
    condition: { 
      visitedAll: ['study_room', 'basement_scene'],
      hasItem: '지하실 열쇠'
    },
    text: "서재와 지하실을 모두 조사했고, 열쇠도 가지고 있다!",
    priority: 100 // ✅ 가장 높은 우선순위
  },
  {
    // 일반적인 경우 - 낮은 우선순위
    condition: { visitedNode: 'study_room' },
    text: "서재를 조사했다.",
    priority: 10 // ✅ 낮은 우선순위
  }
]
// ✅ 결과: 두 조건을 모두 만족하면 더 구체적인 텍스트가 표시됨
```

---

### 시간대/사건 인과관계 체크

#### 체크리스트

| 항목 | 발생 가능한 문제 | 수정 방향 |
|------|-----------------|----------|
| **선행 조건** | 사건 A를 안 했는데 NPC가 사건 A 결과를 말함 | `requiredVisitedNode` 또는 `showIf: { visitedNode }` 사용 |
| **시간 모순** | 밤에만 죽는 NPC가 낮에 돌아다님 | `timeOfDay` 조건 체크, `TIME_BASED_REQUIREMENTS`에 정의 |
| **아이템 중복** | 유니크 아이템을 두 번 얻음 | `hideIfHasItem` 사용하여 이미 획득한 아이템 선택지 숨김 |
| **논리적 모순** | 엘렌을 구출했는데 희생된 것으로 나옴 | `MUTUALLY_EXCLUSIVE_GROUPS`에 정의하여 검증 |

#### 예제: 시간대 검증

```typescript
// ❌ 나쁜 예: 시간대 검증 없음
const nightNode = {
  id: 'midnight_ritual',
  day: 1,
  timeOfDay: 'night',
  text: '한밤중, 의식이 시작된다...',
  // ⚠️ 문제: 오후에 이 노드에 접근 가능하면?
};

// ✅ 좋은 예: 선행 조건 설정
const nightNode = {
  id: 'midnight_ritual',
  day: 1,
  timeOfDay: 'night',
  text: '한밤중, 의식이 시작된다...',
  choices: [
    {
      text: '의식을 목격한다',
      nextNode: 'ritual_scene',
      // ✅ 저녁 조사를 완료해야만 접근 가능
      showIf: {
        visitedAny: ['drebber_alibi', 'basement_scene']
      }
    }
  ]
};
```

---

## 🔍 디버깅 도구

### 개발 모드에서의 자동 검증

```typescript
// GameScreen.tsx에서 자동으로 실행됨
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    const validationResult = validateGameState(
      visitedNodes,
      inventory,
      node.id,
      node.timeOfDay
    );
    logValidationResults(validationResult, node.id);
  }
}, [node.id]);
```

### 콘솔 출력 예시

```
✅ [상태 검증 통과] 노드 study_room

⚠️ [상태 검증 경고] 노드 basement_scene:
  - [basement_routes] 지하실에 여러 경로로 진입했습니다: basement_via_kitchen, basement_via_well

❌ [상태 검증 오류] 노드 ending_ellen_saved:
  - [ellen_fate] 상호 배타적인 상태가 동시에 활성화됨: ending_ellen_saved, ending_ellen_sacrificed
  - [아이템 의존성] 'ellen_will'을(를) '서랍장 열쇠' 없이 획득했습니다
```

---

## 📚 권장 패턴

### 1. 우선순위 레벨 가이드

| Priority | 용도 | 예시 |
|----------|------|------|
| **100+** | 최우선 (엔딩 관련, 핵심 이벤트) | "엘렌을 구출한 후의 최종 대사" |
| **50-99** | 높은 우선순위 (중요 이벤트, 복합 조건) | "지하실과 서재 모두 조사 후" |
| **10-49** | 중간 우선순위 (일반 진행 상태) | "서재를 조사한 후" |
| **0-9** | 낮은 우선순위 (기본 상태, 폴백) | "처음 방문" |

### 2. conditionalText 작성 템플릿

```typescript
const exampleNode = {
  id: 'example_node',
  text: '기본 텍스트 (모든 조건 불만족 시)', // ✅ 항상 기본 텍스트 제공
  conditionalText: [
    {
      // 가장 특수한 케이스 (최우선)
      condition: { 
        visitedAll: ['event_a', 'event_b', 'event_c'],
        hasItem: 'special_item'
      },
      text: '모든 조건을 만족한 특수 대사',
      priority: 100
    },
    {
      // 중간 케이스
      condition: { visitedAny: ['event_a', 'event_b'] },
      text: 'A나 B 중 하나를 본 대사',
      priority: 50
    },
    {
      // 일반 케이스
      condition: { visitedNode: 'event_a' },
      text: 'A를 본 대사',
      priority: 10
    }
  ]
};
```

### 3. 상호 배타적 루트 분기

```typescript
// 신뢰 루트
const trustRoute = {
  id: 'hope_trust_route',
  text: '호프가 진실을 말한다...',
  choices: [
    {
      text: '호프를 돕는다',
      nextNode: 'help_hope',
      // ✅ 배신 루트를 탔으면 이 선택지 숨김
      hideIfVisitedNode: 'hope_betrayal_route'
    }
  ]
};

// 배신 루트
const betrayalRoute = {
  id: 'hope_betrayal_route',
  text: '호프를 의심한다...',
  choices: [
    {
      text: '호프를 체포한다',
      nextNode: 'arrest_hope',
      // ✅ 신뢰 루트를 탔으면 이 선택지 숨김
      hideIfVisitedNode: 'hope_trust_route'
    }
  ]
};
```

---

## 🚀 마이그레이션 가이드

기존 시나리오를 새로운 시스템으로 업그레이드하려면:

### Step 1: 상호 배타적 상태 식별

프로젝트에서 상호 배타적인 상태들을 찾아 `stateValidator.ts`에 추가:

```typescript
export const MUTUALLY_EXCLUSIVE_GROUPS = {
  // 여기에 프로젝트의 상호 배타적 그룹 추가
  new_group: [
    'state_a',
    'state_b',
    'state_c'
  ]
};
```

### Step 2: conditionalText에 우선순위 추가

복잡한 조건을 가진 노드들부터 우선순위 추가:

```typescript
// Before
conditionalText: [
  { condition: { hasItem: 'key' }, text: '열쇠가 있다' },
  { condition: { visitedNode: 'room' }, text: '방을 봤다' }
]

// After
conditionalText: [
  { condition: { hasItem: 'key' }, text: '열쇠가 있다', priority: 20 },
  { condition: { visitedNode: 'room' }, text: '방을 봤다', priority: 10 }
]
```

### Step 3: 개발 모드에서 테스트

1. 게임을 실행하고 콘솔 확인
2. 경고나 오류가 있으면 해당 노드 수정
3. 모든 경로를 플레이해보며 검증

---

## 📖 참고 자료

- `/utils/game/stateValidator.ts` - 상태 검증 시스템
- `/utils/game/choiceFilter.ts` - 선택지 필터링
- `/types/story.ts` - 타입 정의
- `/components/GameScreen.tsx` - 상태 검증 적용 예시

---

## 💡 FAQ

**Q: priority를 모든 conditionalText에 추가해야 하나요?**

A: 아니요. 조건이 겹칠 가능성이 있는 경우에만 추가하면 됩니다. 단일 조건만 있는 경우는 기본값(0)으로도 충분합니다.

**Q: 상태 검증 오류가 발생하면 게임이 멈추나요?**

A: 아니요. 개발 모드에서만 콘솔에 경고가 표시되며, 게임은 정상 작동합니다. 프로덕션 빌드에서는 검증이 실행되지 않습니다.

**Q: 기존 시나리오를 모두 수정해야 하나요?**

A: 아니요. 새로운 시스템은 기존 시나리오와 완전히 호환됩니다. 문제가 발견된 부분만 점진적으로 개선하면 됩니다.

---

**작성일**: 2025-12-19  
**버전**: 1.0.0
