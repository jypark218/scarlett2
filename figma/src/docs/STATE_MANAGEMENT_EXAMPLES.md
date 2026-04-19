# 상태 관리 실전 예제 모음

이 문서는 실제 게임 시나리오에서 상태 관리를 어떻게 적용하는지 보여주는 실전 예제 모음입니다.

---

## 📚 목차

1. [호프의 관계 분기 시스템](#1-호프의-관계-분기-시스템)
2. [엘렌의 운명 분기](#2-엘렌의-운명-분기)
3. [지하실 진입 경로 관리](#3-지하실-진입-경로-관리)
4. [시간대 기반 이벤트 순서](#4-시간대-기반-이벤트-순서)
5. [아이템 획득 체인](#5-아이템-획득-체인)

---

## 1. 호프의 관계 분기 시스템

### 시나리오 요구사항

- 호프와의 대화에서 플레이어의 선택에 따라 "신뢰", "적대", "중립" 관계로 분기
- 한 번 신뢰 관계가 되면 적대 관계가 될 수 없음 (상호 배타적)
- 관계에 따라 엔딩이 달라짐

### 구현

#### 1단계: 상태 검증 설정 (`stateValidator.ts`)

```typescript
export const MUTUALLY_EXCLUSIVE_GROUPS = {
  hope_relationship: [
    'hope_trusts_watson',      // 호프가 왓슨을 신뢰
    'hope_hostile_watson',     // 호프가 왓슨에게 적대적
    'hope_neutral_watson'      // 호프가 중립적
  ]
};
```

#### 2단계: 관계 분기 노드 작성

```typescript
// 초기 만남 - 중립 상태
export const hopeFirstMeet = {
  id: 'hope_first_meet',
  day: 1,
  timeOfDay: 'afternoon',
  character: 'hope',
  text: `
[호프]: ...여기서 뭐 하는 거요?

그의 눈빛은 경계하고 있다.
`,
  choices: [
    { 
      text: '진실을 말한다: "실종 사건을 조사하고 있습니다"', 
      nextNode: 'hope_trust_path' 
    },
    { 
      text: '거짓말한다: "그냥 지나가다가..."', 
      nextNode: 'hope_hostile_path' 
    },
    { 
      text: '말없이 조사를 계속한다', 
      nextNode: 'hope_neutral_path' 
    }
  ]
};

// 신뢰 경로 - 상태 플래그 설정
export const hopeTrustPath = {
  id: 'hope_trust_path', // ⭐ 이 노드 방문 = 신뢰 관계
  day: 1,
  timeOfDay: 'afternoon',
  character: 'hope',
  text: `
[호프]: ...그렇군요. 사실은 저도... 이 저택에서 이상한 일들을 목격했습니다.

호프가 조금씩 마음을 열기 시작한다.

[호프]: 백작이... 뭔가를 숨기고 있어요.
`,
  choices: [
    { 
      text: '더 자세히 듣는다', 
      nextNode: 'hope_reveals_secret'
    }
  ]
};

// 적대 경로 - 상태 플래그 설정
export const hopeHostilePath = {
  id: 'hope_hostile_path', // ⭐ 이 노드 방문 = 적대 관계
  day: 1,
  timeOfDay: 'afternoon',
  character: 'hope',
  text: `
[호프]: ...거짓말을 하고 있군요.

그의 눈빛이 차갑게 식는다.

[호프]: 당신 같은 사람들은... 믿을 수 없어.
`,
  choices: [
    { 
      text: '호프가 떠난다', 
      nextNode: 'hope_leaves_angry'
    }
  ]
};
```

#### 3단계: 관계 상태에 따른 후속 노드 분기

```typescript
// 우물에서 다시 만남 - 관계에 따라 대사 다름
export const hopeAtWell = {
  id: 'hope_at_well',
  day: 1,
  timeOfDay: 'afternoon',
  character: 'hope',
  text: '호프가 우물 옆에 서 있다.', // 기본 텍스트
  conditionalText: [
    {
      // 신뢰 관계 - 최우선
      condition: { visitedNode: 'hope_trust_path' },
      text: `
[호프]: 왓슨... 여기 와줘서 고맙소.

호프가 당신을 믿는 눈빛으로 바라본다.

[호프]: 이 우물은... 루시가 마지막으로 있던 곳이오.
`,
      priority: 100
    },
    {
      // 적대 관계
      condition: { visitedNode: 'hope_hostile_path' },
      text: `
[호프]: ...또 왔소.

호프가 경계하며 당신을 바라본다.

[호프]: 여긴 당신이 올 곳이 아니오.
`,
      priority: 100
    },
    {
      // 중립 관계 (아무것도 방문 안 함)
      condition: (context) => {
        return !context.visitedNodes.includes('hope_trust_path') && 
               !context.visitedNodes.includes('hope_hostile_path');
      },
      text: `
[호프]: ...무슨 일이오?

호프가 무표정하게 당신을 바라본다.
`,
      priority: 50
    }
  ],
  choices: [
    { 
      text: '우물에 대해 묻는다', 
      nextNode: 'ask_about_well',
      // ✅ 신뢰 관계일 때만 표시
      showIf: { visitedNode: 'hope_trust_path' }
    },
    { 
      text: '루시에 대해 묻는다', 
      nextNode: 'ask_about_lucy',
      // ✅ 신뢰 관계일 때만 표시
      showIf: { visitedNode: 'hope_trust_path' }
    },
    { 
      text: '더 묻지 않는다', 
      nextNode: 'leave_well'
    }
  ]
};
```

#### 4단계: 엔딩 분기

```typescript
// 진엔딩 - 신뢰 관계 필수
export const trueEnding = {
  id: 'true_ending',
  isEnding: true,
  endingType: 'true',
  text: `
[호프]: 왓슨... 당신 덕분에 루시를 구할 수 있었소.

호프가 당신의 손을 굳게 잡는다.

[호프]: 영원히 잊지 않을 거요.

--- TRUE END: 구원의 빛 ---
`,
  choices: [
    { 
      text: '[TRUE END 조건]', 
      nextNode: 'true_ending',
      // ✅ 신뢰 관계 + 엘렌 구출 필수
      requirement: {
        visitedNode: 'hope_trust_path'
      },
      showIf: { visitedNode: 'ellen_saved' }
    }
  ]
};

// 배드 엔딩 - 적대 관계
export const badEnding = {
  id: 'bad_ending_hope_enemy',
  isEnding: true,
  endingType: 'bad',
  text: `
[호프]: ...결국 당신도 그들과 같았군.

호프가 차갑게 돌아선다.

--- BAD END: 신뢰의 상실 ---
`,
  // ✅ 적대 관계로 진입하면 자동으로 이 엔딩으로
  choices: []
};
```

### 테스트 시나리오

**케이스 1: 신뢰 → 적대 시도 (차단되어야 함)**

1. `hope_first_meet`에서 "진실을 말한다" 선택
2. `hope_trust_path` 방문 ✅
3. 이후 `hope_hostile_path`로 가는 선택지는 모두 숨겨짐
4. 개발 콘솔: ✅ 검증 통과

**케이스 2: 적대 → 신뢰 시도 (차단되어야 함)**

1. `hope_first_meet`에서 "거짓말한다" 선택
2. `hope_hostile_path` 방문 ✅
3. 이후 `hope_trust_path`로 가는 선택지는 모두 숨겨짐
4. 개발 콘솔: ✅ 검증 통과

**케이스 3: 두 경로 모두 방문 (오류)**

1. 치트 또는 버그로 두 노드 모두 방문
2. 개발 콘솔: ❌ 상태 검증 오류
```
❌ [상태 검증 오류] 노드 hope_at_well:
  - [hope_relationship] 상호 배타적인 상태가 동시에 활성화됨: hope_trust_path, hope_hostile_path
```

---

## 2. 엘렌의 운명 분기

### 시나리오 요구사항

- 엘렌을 구출, 희생, 또는 찾지 못하는 세 가지 결과
- 세 가지 결과는 상호 배타적
- 플레이어의 선택과 시간에 따라 결정

### 구현

#### stateValidator.ts

```typescript
export const MUTUALLY_EXCLUSIVE_GROUPS = {
  ellen_fate: [
    'ending_ellen_saved',      // 엘렌 구출 성공
    'ending_ellen_sacrificed', // 엘렌 희생
    'ending_ellen_lost'        // 엘렌을 찾지 못함
  ]
};
```

#### 시나리오 노드

```typescript
// 시간 제한이 있는 선택
export const ritualChoice = {
  id: 'ritual_choice',
  day: 1,
  timeOfDay: 'night',
  text: `
의식이 시작되려 한다. 엘렌은 제단에 묶여 있다.

지금 결정해야 한다!
`,
  choices: [
    { 
      text: '엘렌을 구출한다', 
      nextNode: 'save_ellen_attempt',
      // ✅ 지하실 열쇠가 있어야 가능
      requiredItem: '지하실 열쇠'
    },
    { 
      text: '백작을 막는다', 
      nextNode: 'stop_count',
      // ✅ 호프의 도움이 있어야 가능
      showIf: { visitedNode: 'hope_trust_path' }
    },
    { 
      text: '경찰을 부른다', 
      nextNode: 'call_police' 
    }
  ]
};

// 구출 성공
export const ellenSaved = {
  id: 'ending_ellen_saved', // ⭐ 상태 플래그
  isEnding: true,
  endingType: 'good',
  text: `
엘렌이 의식을 되찾는다.

[엘렌]: ...감사합니다...

--- GOOD END: 구원 ---
`
};

// 희생
export const ellenSacrificed = {
  id: 'ending_ellen_sacrificed', // ⭐ 상태 플래그
  isEnding: true,
  endingType: 'bad',
  text: `
의식이 완료되었다...

엘렌의 목소리가 들리지 않는다.

--- BAD END: 희생 ---
`
};

// 놓침
export const ellenLost = {
  id: 'ending_ellen_lost', // ⭐ 상태 플래그
  isEnding: true,
  endingType: 'neutral',
  text: `
엘렌의 행방을 찾지 못했다...

--- NEUTRAL END: 미해결 ---
`
};
```

---

## 3. 지하실 진입 경로 관리

### 시나리오 요구사항

- 지하실은 부엌과 우물, 두 경로로 진입 가능
- 두 경로를 모두 발견할 수 있음 (상호 배타적 아님)
- 하지만 어떤 경로로 먼저 진입했는지 추적 필요

### 구현

#### stateValidator.ts

```typescript
export const MUTUALLY_EXCLUSIVE_GROUPS = {
  // 특수 케이스: 복수 방문 허용하지만 경고는 출력
  basement_routes: [
    'basement_via_kitchen',    // 부엌을 통해 진입
    'basement_via_well'        // 우물을 통해 진입
  ]
};
```

#### 시나리오 노드

```typescript
// 부엌에서 지하실 발견
export const kitchenBasement = {
  id: 'basement_via_kitchen',
  day: 1,
  timeOfDay: 'afternoon',
  text: `
부엌 바닥에 숨겨진 문을 발견했다.

지하실로 이어지는 계단이 보인다.
`,
  choices: [
    { 
      text: '지하실로 내려간다', 
      nextNode: 'basement_entrance_kitchen',
      requiredItem: '지하실 열쇠'
    },
    { 
      text: '나중에 오기로 한다', 
      nextNode: 'kitchen' 
    }
  ]
};

// 우물에서 지하실 발견
export const wellBasement = {
  id: 'basement_via_well',
  day: 1,
  timeOfDay: 'afternoon',
  text: `
우물 벽에 비밀 통로가 있다!

지하실로 이어지는 것 같다.
`,
  choices: [
    { 
      text: '우물 퍼즐을 풀고 내려간다', 
      nextNode: 'basement_entrance_well',
      puzzleType: 'well'
    },
    { 
      text: '뒤로 돌아간다', 
      nextNode: 'back_entrance' 
    }
  ]
};

// 지하실 공통 진입점 - 어느 경로로 왔는지에 따라 대사 다름
export const basementEntrance = {
  id: 'basement_entrance',
  day: 1,
  timeOfDay: 'afternoon',
  text: '지하실에 도착했다.', // 기본 텍스트
  conditionalText: [
    {
      // 두 경로 모두 발견한 경우 (최우선)
      condition: (context) => {
        return context.visitedNodes.includes('basement_via_kitchen') &&
               context.visitedNodes.includes('basement_via_well');
      },
      text: `
지하실에 도착했다.

홈즈가 말한다. "두 개의 입구가 있었군... 백작이 도망칠 경로를 만들어둔 거야."
`,
      priority: 100
    },
    {
      // 부엌 경로로만 온 경우
      condition: { visitedNode: 'basement_via_kitchen' },
      text: `
부엌에서 내려온 계단을 통해 지하실에 도착했다.

어둡고 습한 냄새가 난다.
`,
      priority: 50
    },
    {
      // 우물 경로로만 온 경우
      condition: { visitedNode: 'basement_via_well' },
      text: `
우물의 비밀 통로를 통해 지하실에 도착했다.

차가운 물 냄새가 섞여 있다.
`,
      priority: 50
    }
  ],
  choices: [
    { text: '지하실을 조사한다', nextNode: 'basement_investigation' }
  ]
};
```

### 테스트 시나리오

**케이스 1: 부엌 경로만 사용**
- `basement_via_kitchen` 방문 ✅
- `basementEntrance`: "부엌에서 내려온..." 대사 출력
- 개발 콘솔: ✅ 검증 통과

**케이스 2: 두 경로 모두 발견**
- `basement_via_kitchen` 방문 ✅
- `basement_via_well` 방문 ✅
- `basementEntrance`: "두 개의 입구가 있었군..." 대사 출력
- 개발 콘솔: ⚠️ 경고 (정상 동작)
```
⚠️ [상태 검증 경고] 노드 basement_entrance:
  - [basement_routes] 지하실에 여러 경로로 진입했습니다: basement_via_kitchen, basement_via_well
```

---

## 4. 시간대 기반 이벤트 순서

### 시나리오 요구사항

- 오후 → 저녁 → 밤 순서로 진행
- 각 시간대마다 필수 이벤트가 있음
- 순서를 건너뛰면 경고

### 구현

#### stateValidator.ts

```typescript
export const TIME_BASED_REQUIREMENTS = {
  evening: {
    requiredVisitedAny: ['study_room', 'upstairs', 'back_entrance']
  },
  night: {
    requiredVisitedAny: ['drebber_alibi', 'basement_scene', 'hope_reveals_lucy_hint']
  }
};
```

#### 시나리오 노드

```typescript
// 오후 - 초기 조사
export const afternoonInvestigation = {
  id: 'afternoon_investigation',
  day: 1,
  timeOfDay: 'afternoon',
  text: `
오후 3시. 저택 조사를 시작한다.
`,
  choices: [
    { text: '서재를 조사한다', nextNode: 'study_room' },
    { text: '2층으로 올라간다', nextNode: 'upstairs' },
    { text: '뒷마당을 본다', nextNode: 'back_entrance' }
  ]
};

// 저녁 - 중간 조사
export const eveningInvestigation = {
  id: 'evening_investigation',
  day: 1,
  timeOfDay: 'evening', // ✅ 오후 조사를 했어야 함
  text: `
저녁 6시. 해가 지고 있다.

홈즈가 말한다. "이제 본격적으로 조사해볼까."
`,
  choices: [
    { 
      text: '드레버의 알리바이를 확인한다', 
      nextNode: 'drebber_alibi',
      // ✅ 서재나 2층을 조사해야 표시
      showIf: { visitedAny: ['study_room', 'upstairs'] }
    },
    { 
      text: '지하실을 조사한다', 
      nextNode: 'basement_scene',
      requiredItem: '지하실 열쇠'
    }
  ]
};

// 밤 - 최종 대결
export const nightConfrontation = {
  id: 'night_confrontation',
  day: 1,
  timeOfDay: 'night', // ✅ 저녁 조사를 했어야 함
  text: `
한밤중. 저택은 고요하다.

홈즈가 속삭인다. "이제 진실을 밝힐 시간이야."
`,
  choices: [
    { 
      text: '의식을 막는다', 
      nextNode: 'stop_ritual',
      // ✅ 저녁 조사를 완료해야 표시
      showIf: { visitedAny: ['drebber_alibi', 'basement_scene'] }
    }
  ]
};
```

### 테스트 시나리오

**케이스 1: 정상 진행**
1. `afternoon_investigation` (오후)
2. `study_room` 방문
3. `evening_investigation` (저녁) - ✅ 검증 통과
4. `drebber_alibi` 방문
5. `night_confrontation` (밤) - ✅ 검증 통과

**케이스 2: 순서 건너뛰기**
1. `afternoon_investigation` (오후)
2. 서재/2층 조사 안 함
3. `night_confrontation` (밤) - ⚠️ 경고
```
⚠️ [상태 검증 경고] 노드 night_confrontation:
  - [시간대 검증] night 시간대에 필요한 선행 노드를 방문하지 않았습니다
```

---

## 5. 아이템 획득 체인

### 시나리오 요구사항

- 금고를 열어야 지하실 열쇠를 얻을 수 있음
- 서랍장 열쇠를 얻어야 엘렌의 유언장을 볼 수 있음
- 순서가 틀리면 오류

### 구현

#### stateValidator.ts

```typescript
export const ITEM_DEPENDENCY_CHAIN: Record<string, string[]> = {
  '금고 비밀번호': ['지하실 열쇠', 'ledger'],
  '서랍장 열쇠': ['ellen_will']
};
```

#### 시나리오 노드

```typescript
// 1단계: 일기장 발견 → 금고 비밀번호
export const diaryDiscovery = {
  id: 'diary_discovery',
  text: `
책상 서랍에서 낡은 일기장을 발견한다.

마지막 페이지에 숫자가 적혀있다: 1861
`,
  choices: [
    { 
      text: '[금고 비밀번호를 기억한다]', 
      nextNode: 'got_safe_password',
      item: '금고 비밀번호'
    }
  ]
};

// 2단계: 금고 열기 → 지하실 열쇠
export const safeOpen = {
  id: 'safe_opened',
  text: `
금고가 열렸다!

안에는 오래된 열쇠와 장부가 있다.
`,
  choices: [
    { 
      text: '지하실 열쇠를 가져간다', 
      nextNode: 'got_basement_key',
      item: '지하실 열쇠', // ✅ 의존성: '금고 비밀번호' 필요
      hideIfHasItem: '지하실 열쇠'
    },
    { 
      text: '장부를 가져간다', 
      nextNode: 'got_ledger',
      item: 'ledger',
      hideIfHasItem: 'ledger'
    }
  ]
};

// 3단계: 화장대 조사 → 서랍장 열쇠
export const vanity = {
  id: 'vanity',
  text: `
화장대에 작은 열쇠가 숨겨져 있다.
`,
  choices: [
    { 
      text: '열쇠를 가져간다', 
      nextNode: 'got_drawer_key',
      item: '서랍장 열쇠',
      hideIfHasItem: '서랍장 열쇠'
    }
  ]
};

// 4단계: 서랍장 열기 → 엘렌의 유언장
export const drawerOpen = {
  id: 'drawer_opened',
  text: `
서랍장이 열렸다!

안에는 편지가 한 통 있다...
`,
  choices: [
    { 
      text: '편지를 읽는다', 
      nextNode: 'ellen_will_acquired',
      item: 'ellen_will', // ✅ 의존성: '서랍장 열쇠' 필요
      requiredItem: '서랍장 열쇠'
    }
  ]
};
```

### 테스트 시나리오

**케이스 1: 정상 순서**
1. `diary_discovery` → '금고 비밀번호' 획득 ✅
2. `safe_opened` → '지하실 열쇠' 획득 ✅
3. 개발 콘솔: ✅ 검증 통과

**케이스 2: 순서 위반 (치트/버그)**
1. 치트로 '지하실 열쇠'를 바로 획득
2. 개발 콘솔: ❌ 의존성 오류
```
❌ [상태 검증 오류] 노드 basement_entrance:
  - [아이템 의존성] '지하실 열쇠'을(를) '금고 비밀번호' 없이 획득했습니다
```

---

## 🎯 종합 예제: 복합 분기 시나리오

### 요구사항

- 호프와의 관계 (신뢰/적대)
- 엘렌의 운명 (구출/희생)
- 지하실 진입 경로 (부엌/우물)
- 이 모든 요소가 엔딩에 영향

### 엔딩 분기표

| 호프 관계 | 엘렌 구출 | 지하실 경로 | 엔딩 |
|---------|---------|-----------|------|
| 신뢰 | 성공 | 둘 다 발견 | TRUE END |
| 신뢰 | 성공 | 하나만 발견 | GOOD END |
| 신뢰 | 실패 | - | NEUTRAL END |
| 적대 | - | - | BAD END |

### 구현

```typescript
// 최종 엔딩 분기
export const finalEnding = {
  id: 'final_ending',
  text: '사건의 결말...', // 기본 텍스트 (사용 안 됨)
  conditionalText: [
    {
      // TRUE END: 모든 조건 만족
      condition: (context) => {
        return context.visitedNodes.includes('hope_trust_path') &&
               context.visitedNodes.includes('ending_ellen_saved') &&
               context.visitedNodes.includes('basement_via_kitchen') &&
               context.visitedNodes.includes('basement_via_well');
      },
      text: `
[홈즈]: 왓슨, 자네는 정말 훌륭한 탐정이야.

모든 진실을 밝혀냈다. 호프와 엘렌, 모두 구할 수 있었다.

그리고 저택의 모든 비밀을 밝혀냈다...

--- TRUE END: 완전한 진실 ---
`,
      priority: 1000 // 최우선
    },
    {
      // GOOD END: 신뢰 + 엘렌 구출
      condition: (context) => {
        return context.visitedNodes.includes('hope_trust_path') &&
               context.visitedNodes.includes('ending_ellen_saved');
      },
      text: `
[호프]: 감사합니다, 왓슨...

엘렌을 구출했다. 하지만 저택의 비밀은 아직 남아있다...

--- GOOD END: 구원 ---
`,
      priority: 500
    },
    {
      // NEUTRAL END: 신뢰만
      condition: { visitedNode: 'hope_trust_path' },
      text: `
[호프]: ...최선을 다했소.

호프와의 신뢰는 남았지만, 엘렌은 구하지 못했다...

--- NEUTRAL END: 미완의 구원 ---
`,
      priority: 300
    },
    {
      // BAD END: 적대
      condition: { visitedNode: 'hope_hostile_path' },
      text: `
[호프]: ...결국 아무것도 구하지 못했군.

호프가 떠난다. 모든 것이 실패로 끝났다.

--- BAD END: 신뢰의 상실 ---
`,
      priority: 300
    }
  ],
  isEnding: true
};
```

---

## 💡 팁과 모범 사례

### 1. 상태 플래그는 노드 ID로 관리

```typescript
// ✅ 좋음: 노드 방문 자체가 상태
const trustEstablished = {
  id: 'hope_trust_established', // 이 노드 방문 = 신뢰 관계
  text: '호프가 당신을 믿기 시작한다...'
};

// ❌ 나쁨: 별도의 플래그 변수 관리 (복잡함)
// let hopeTrustLevel = 0; // 관리하기 어려움
```

### 2. conditionalText는 구체적인 것부터

```typescript
conditionalText: [
  { 
    condition: { visitedAll: ['a', 'b', 'c'], hasItem: 'key' }, 
    text: '모든 조건 만족',
    priority: 100 
  },
  { 
    condition: { visitedAny: ['a', 'b'] }, 
    text: '일부 조건 만족',
    priority: 50 
  },
  { 
    condition: { visitedNode: 'a' }, 
    text: '최소 조건 만족',
    priority: 10 
  }
]
```

### 3. 개발 모드 활용

```typescript
// 개발 중에는 콘솔을 자주 확인하세요!
// GameScreen.tsx에서 자동으로 검증이 실행됩니다.

// ✅ 정상: 검증 통과 메시지
// ⚠️ 경고: 권장 사항 위반 (게임은 정상 작동)
// ❌ 오류: 논리적 오류 발견 (수정 필요)
```

---

**작성일**: 2025-12-19  
**버전**: 1.0.0
