# 📚 스토리 관리 시스템

모로 백작의 저택 게임의 스토리를 효율적으로 관리하기 위한 모듈화 시스템입니다.

## 🎯 해결하는 문제

**기존 방식:**
- ❌ 1개의 거대한 storyData.ts 파일 (1000+ 라인)
- ❌ 수정할 때마다 전체 파일 탐색
- ❌ 노드 간 연결 오류를 수동으로 찾아야 함
- ❌ 도달 불가능한 노드를 발견하기 어려움

**개선된 방식:**
- ✅ 논리적 단위로 분리된 여러 파일
- ✅ 헬퍼 함수로 반복 코드 제거
- ✅ 자동 검증 시스템
- ✅ 개발 도구로 실시간 디버깅

---

## 🗂️ 파일 구조

```
/data/
  /story/                    # 스토리 노드들
    day1-afternoon.ts        # 1일차 오후
    day1-evening.ts          # 1일차 저녁
    well-hope-encounter.ts   # 호프 대화 트리
    stangerson-dialogues.ts  # 스탠거슨 대화
    endings.ts               # 엔딩 모음
    README.md               # 사용 가이드
  
  storyData.ts              # 메인 파일 (병합만 담당)
  characterData.ts
  itemData.ts
  ...

/utils/
  storyBuilder.ts           # 병합 & 검증 도구
  storyHelpers.ts           # 노드 생성 헬퍼 함수

/components/
  DevTools.tsx              # 개발자 도구 UI
```

---

## 🛠️ 주요 기능

### 1. 스토리 모듈화

**파일 분리 예시:**

```typescript
// data/story/well-hope-encounter.ts
import { StoryNode } from '../../types/story';

export const wellHopeEncounterNodes: Record<string, StoryNode> = {
  turn_around: {
    id: 'turn_around',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '뒤를 돌아보니...',
    choices: [...]
  },
  
  well_ask_hope_relation: {
    id: 'well_ask_hope_relation',
    // ...
  }
};
```

**병합하기:**

```typescript
// data/storyData.ts
import { mergeStoryNodes } from '../utils/storyBuilder';
import { day1AfternoonNodes } from './story/day1-afternoon';
import { wellHopeEncounterNodes } from './story/well-hope-encounter';

export const storyData = mergeStoryNodes(
  day1AfternoonNodes,
  wellHopeEncounterNodes
  // ... 필요한 만큼 추가
);
```

---

### 2. 헬퍼 함수

#### 기본 노드 생성

```typescript
import { createNode, choices } from '../utils/storyHelpers';

const node = createNode({
  id: 'investigate_room',
  text: '방을 조사합니다...',
  choices: choices(
    ['서랍을 연다', 'open_drawer'],
    ['창문을 본다', 'check_window']
  ),
  day: 1,
  timeOfDay: 'afternoon',
  character: 'holmes'
});
```

#### 대화 체인

```typescript
import { createDialogueChain, choices } from '../utils/storyHelpers';

const dialogues = createDialogueChain({
  baseId: 'holmes_explains',
  texts: [
    '홈즈가 생각에 잠깁니다.',
    '"왓슨, 이것을 보시오..."',
    '"범인은 왼손잡이였습니다."'
  ],
  finalChoices: choices(
    ['동의한다', 'agree'],
    ['의문을 제기한다', 'question']
  ),
  character: 'holmes'
});

// 생성된 노드:
// - holmes_explains
// - holmes_explains_1
// - holmes_explains_2
```

#### 엔딩 생성

```typescript
import { createEnding } from '../utils/storyHelpers';

const ending = createEnding({
  id: 'ending_perfect',
  text: '[완벽한 엔딩]\n\n모든 것이 해결되었습니다...',
  endingType: 'good'
});
```

#### 아이템 관련

```typescript
import { itemChoice, requiredItemChoice, choices } from '../utils/storyHelpers';

const node = createNode({
  id: 'locked_door',
  text: '문이 잠겨있습니다.',
  choices: [
    requiredItemChoice('열쇠로 연다', 'open_door', '지하실 열쇠'),
    ...choices(['자물쇠를 딴다', 'pick_lock'])
  ]
});
```

---

### 3. 자동 검증 시스템

```typescript
import { validateStoryNodes } from '../utils/storyBuilder';

const result = validateStoryNodes(storyData);

console.log(result);
// {
//   valid: false,
//   errors: [
//     '노드 "abc"가 존재하지 않는 노드 "xyz"를 참조',
//     '노드 "def"에 선택지가 없음'
//   ],
//   warnings: [
//     '고아 노드 발견: test_node_1, test_node_2'
//   ]
// }
```

**검증 항목:**
- ✅ 노드 ID 일치성
- ✅ 존재하지 않는 nextNode 참조
- ✅ 엔딩이 아닌 노드의 선택지 누락
- ✅ 고아 노드 (참조되지 않는 노드)
- ✅ 순환 참조
- ✅ 도달 불가능한 노드

---

### 4. 개발자 도구 (Dev Tools)

**실행 방법:**
1. 게임 실행
2. 우측 하단 "🔧 Dev Tools" 버튼 클릭

**기능:**

#### 📋 검증 탭
- 스토리 오류/경고 실시간 표시
- 도달 불가능 노드 목록
- 순환 참조 경로
- 고아 노드 탐지

#### 📊 분석 탭
- 전체 노드 수
- 엔딩 노드 수
- 평균 선택지 수
- 최대 스토리 깊이
- 일차별/시간대별 노드 분포

#### 🗺️ 그래프 탭 (향후 추가)
- 스토리 흐름 시각화
- 엔딩 경로 표시

**스크린샷:**
```
┌─────────────────────────────────┐
│ Story Development Tools     ✕   │
├─────────────────────────────────┤
│  ✓ 검증   📊 분석   🗺️ 그래프  │
├─────────────────────────────────┤
│                                 │
│  ✅ 스토리 검증 통과            │
│  총 347개 노드                  │
│                                 │
│  ⚠️ 경고 (2)                    │
│  • 고아 노드 발견: test_1       │
│  • 순환 참조: a → b → a        │
│                                 │
└─────────────────────────────────┘
```

---

## 📝 사용 예시

### 새 스토리 추가하기

```bash
# 1. 새 파일 생성
touch data/story/day2-morning.ts
```

```typescript
// 2. 노드 작성
import { createNode, choices } from '../../utils/storyHelpers';

export const day2MorningNodes = {
  morning_start: createNode({
    id: 'morning_start',
    text: '2일차 아침이 밝았습니다...',
    choices: choices(
      ['아침 식사를 한다', 'breakfast'],
      ['바로 조사를 시작한다', 'investigate']
    ),
    day: 2,
    timeOfDay: 'morning'
  }),
  
  breakfast: createNode({
    id: 'breakfast',
    text: '홈즈와 함께 아침을 먹습니다...',
    choices: choices(['계속', 'investigate']),
    day: 2,
    timeOfDay: 'morning'
  })
};
```

```typescript
// 3. storyData.ts에 추가
import { day2MorningNodes } from './story/day2-morning';

export const storyData = mergeStoryNodes(
  // ... 기존 노드들
  day2MorningNodes  // 추가
);
```

```typescript
// 4. Dev Tools로 검증
// 게임 실행 → Dev Tools 클릭 → 검증 탭 확인
```

---

### 대화 트리 만들기

```typescript
// data/story/interrogation.ts
import { createNode, createCharacterDialogue, choices } from '../../utils/storyHelpers';

export const interrogationNodes = {
  start_interrogation: createCharacterDialogue({
    id: 'start_interrogation',
    character: 'stangerson',
    dialogue: '저는 아무것도 모릅니다!',
    watsonResponse: '그의 눈빛이 흔들립니다.',
    choices: [
      { text: '압박한다', nextNode: 'pressure_stangerson' },
      { text: '회유한다', nextNode: 'persuade_stangerson' },
      { text: '증거를 제시한다', nextNode: 'show_evidence', requiredItem: '백작의 일기' }
    ]
  }),
  
  pressure_stangerson: createNode({
    id: 'pressure_stangerson',
    text: '"거짓말하지 마십시오!"\n\n스탠거슨이 당황합니다.',
    choices: choices(
      ['계속 압박한다', 'pressure_more'],
      ['전략을 바꾼다', 'start_interrogation']
    ),
    character: 'stangerson'
  })
};
```

---

### 조사 시퀀스 만들기

```typescript
import { createInvestigationNode, itemChoice, choices } from '../../utils/storyHelpers';

export const investigationNodes = {
  search_room: createInvestigationNode({
    id: 'search_room',
    location: '방',
    clue: '서랍 안에서 낡은 편지를 발견합니다.',
    nextChoices: [
      itemChoice('편지를 가져간다', 'take_letter', '제퍼슨의 편지'),
      ...choices(['방을 나간다', 'leave_room'])
    ]
  })
};
```

---

## 🚀 워크플로우

### 개발 사이클

```
1. 스토리 작성
   ↓
2. 파일로 분리 (챕터/캐릭터별)
   ↓
3. 헬퍼 함수로 노드 생성
   ↓
4. storyData.ts에 병합
   ↓
5. Dev Tools로 검증
   ↓
6. 오류 수정
   ↓
7. 테스트 플레이
   ↓
8. 반복
```

### Git 커밋 전 체크리스트

```bash
# 검증 통과 확인
✓ Dev Tools 검증 탭에 오류 없음
✓ 경고 확인 및 처리
✓ 도달 불가능 노드 없음

# 테스트
✓ 주요 경로 플레이 테스트
✓ 엔딩 도달 확인
✓ 아이템 획득/사용 테스트
```

---

## 📊 분석 도구

### 스토리 통계

```typescript
import { analyzeStory } from '../utils/storyBuilder';

const stats = analyzeStory(storyData);

console.log(`
총 노드: ${stats.totalNodes}
엔딩 노드: ${stats.endingNodes}
평균 선택지: ${stats.averageChoices.toFixed(1)}
최대 깊이: ${stats.maxDepth}

일차별:
${Object.entries(stats.nodesByDay).map(([day, count]) => 
  `  ${day}일차: ${count}개`
).join('\n')}

시간대별:
${Object.entries(stats.nodesByTimeOfDay).map(([time, count]) => 
  `  ${time}: ${count}개`
).join('\n')}
`);
```

### 도달 불가능 노드 찾기

```typescript
import { findUnreachableNodes } from '../utils/storyBuilder';

const unreachable = findUnreachableNodes(storyData);
console.log('도달 불가능:', unreachable);
// ['old_test_node', 'unused_scene']
```

### 순환 참조 탐지

```typescript
import { findCircularReferences } from '../utils/storyBuilder';

const cycles = findCircularReferences(storyData);
cycles.forEach(cycle => {
  console.log('순환:', cycle.join(' → '));
});
// 순환: node_a → node_b → node_c → node_a
```

---

## 💡 팁과 트릭

### 1. 네이밍 컨벤션

```typescript
// 좋은 예
'study_room_investigation'
'hope_confrontation_1'
'ending_hope_arrested'

// 나쁜 예
'node1'
'temp'
'test'
```

### 2. 파일 분리 기준

```typescript
// 챕터별
day1-afternoon.ts    // 50-100 노드
day1-evening.ts

// 캐릭터별
hope-dialogues.ts    // 호프 관련 모든 대화
stangerson-dialogues.ts

// 이벤트별
basement-investigation.ts  // 지하실 조사 시퀀스
well-discovery.ts          // 우물 발견 이벤트

// 기능별
endings.ts           // 모든 엔딩
tutorials.ts         // 튜토리얼 노드
```

### 3. 헬퍼 함수 조합

```typescript
// 대화 체인 + 분기
const nodes = {
  ...createDialogueChain({
    baseId: 'holmes_theory',
    texts: ['홈즈가 추리를 시작합니다...', '...'],
    finalChoices: choices(['동의', 'agree'], ['반박', 'disagree'])
  }),
  
  agree: createNode({
    id: 'agree',
    text: '당신은 동의합니다.',
    choices: choices(['계속', 'next'])
  })
};
```

### 4. 템플릿 변수

```typescript
import { replaceTemplateVars } from '../utils/storyHelpers';

const template = '{{character}}가 말합니다: "{{message}}"';

const text = replaceTemplateVars(template, {
  character: '홈즈',
  message: '흥미롭군요'
});
// "홈즈가 말합니다: "흥미롭군요""
```

---

## 🔧 문제 해결

### Q: "노드를 찾을 수 없습니다" 오류

```typescript
// storyData.ts에 import 했는지 확인
import { myNewNodes } from './story/my-new-nodes';

export const storyData = mergeStoryNodes(
  myNewNodes  // 이 줄이 있는지 확인
);
```

### Q: 순환 참조 경고

```typescript
// 의도된 순환인지 확인 (예: 반복 가능한 대화)
// 의도하지 않았다면 Dev Tools에서 경로 확인 후 수정
```

### Q: 고아 노드 경고

```typescript
// 해당 노드를 참조하는 선택지 추가
// 또는 사용하지 않는 노드라면 삭제
```

---

## 📦 배포 전 최종 점검

```bash
✓ Dev Tools 검증 탭: 오류 0개
✓ 모든 엔딩 도달 가능
✓ 주요 아이템 획득 가능
✓ 도달 불가능 노드 제거
✓ 고아 노드 확인
✓ 테스트 플레이 완료
```

---

## 🎓 학습 자료

- `/data/story/README.md` - 자세한 사용 가이드
- `/utils/storyHelpers.ts` - 헬퍼 함수 정의
- `/utils/storyBuilder.ts` - 검증 로직
- `/components/DevTools.tsx` - UI 구현

---

**💬 질문이나 개선 사항이 있다면 이슈를 남겨주세요!**
