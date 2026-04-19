# 고아 노드 67개 빠른 확인 가이드

## 🚨 현재 상황

사용자가 "끊어진 연결 67개 노드"를 언급했으므로, 현재 게임에 고아 노드가 존재하는 것으로 보입니다.

---

## ⚡ 즉시 확인 방법

### 방법 1: DevTools에서 확인 (가장 빠름)

1. 개발 모드로 게임 실행
2. 브라우저 콘솔 열기 (F12)
3. 다음 코드 실행:

```javascript
// 콘솔에 붙여넣기
import('/utils/orphan-scanner.ts').then(m => m.printOrphanReport());
```

### 방법 2: App.tsx에 임시 코드 추가

```typescript
// App.tsx 상단에 추가
import { scanOrphanNodes } from './utils/orphan-scanner';

// useEffect 내부에 추가
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    const result = scanOrphanNodes();
    console.log('🔍 고아 노드:', result.orphanCount, '개');
    console.log(result.orphanNodes);
  }
}, []);
```

---

## 📊 예상되는 고아 노드 카테고리

### 1. 주석 처리된 파일 (~28개)

**파일**: 
- `/data/story/psychological-depth.ts` (~15개)
- `/data/story/drebber-dark-route.ts` (~8개)
- `/data/story/ambiguous-endings.ts` (~5개)

**상태**: `/data/story/fixes/index.ts`에서 주석 처리됨

**수정 방법**:

```typescript
// /data/story/fixes/index.ts

// ❌ 현재 (주석 처리)
// import { psychologicalNodes } from '../psychological-depth';
// import { drebberDarkRoute } from '../drebber-dark-route';
// import { ambiguousEndings } from '../ambiguous-endings';

// ✅ 수정 1: 재활성화 (사용할 경우)
import { psychologicalNodes } from '../psychological-depth';
import { drebberDarkRoute } from '../drebber-dark-route';
import { ambiguousEndings } from '../ambiguous-endings';

export const allStoryFixes = {
  // ... 기존 코드
  ...psychologicalNodes,
  ...drebberDarkRoute,
  ...ambiguousEndings,
};

// ✅ 수정 2: 삭제 (사용하지 않을 경우)
// - psychological-depth.ts 파일 삭제
// - drebber-dark-route.ts 파일 삭제
// - ambiguous-endings.ts 파일 삭제
```

### 2. Ellen 관련 노드 (~22개)

**파일**: `/data/story/ellen-missing-nodes.ts`

**상태**: 정의되어 있지만 실제 게임 플로우에 연결 안 됨

**수정 방법**:

```typescript
// /data/story/characters/index.ts에서 확인

export const allCharacterNodes = {
  ...ellenDiscovery,
  ...ellenFirstEncounter,
  // ❓ ellen-missing-nodes가 포함되어 있는지 확인 필요
};

// 만약 없다면 추가:
import { ellenMissingNodes } from '../ellen-missing-nodes';

export const allCharacterNodes = {
  ...ellenDiscovery,
  ...ellenFirstEncounter,
  ...ellenMissingNodes, // ✅ 추가
};
```

### 3. 서스펜스 이벤트 (~10개)

**파일**: `/data/story/locations/suspense-events.ts`

**상태**: 정의되어 있지만 허브에서 트리거되지 않음

**수정 방법**:

```typescript
// /data/story/locations/upstairs-nodes.ts

export const upstairsNodes = {
  upstairs: {
    id: 'upstairs',
    choices: [
      // 기존 선택지...
      { 
        text: '🚨 (복도 끝에 그림자가...)', 
        nextNode: 'hallway_shadow_event',
        requiredVisitedNode: 'bedroom',
        hideIfVisitedNode: 'hallway_shadow_event'
      }
    ]
  }
};

// /data/story/part3-second-floor.ts의 bedroom에도 추가
export const bedroom = {
  choices: [
    // 기존 선택지...
    { 
      text: '🚨 갑자기 큰 소리가 들린다!', 
      nextNode: 'sudden_door_slam',
      requiredVisitedNode: 'examine_bed',
      hideIfVisitedNode: 'sudden_door_slam'
    }
  ]
};
```

### 4. Hope 심문 노드 (~7개)

**파일**: `/data/story/fixes/missing-nodes.ts`

**노드 예시**:
- `hope_basement_knowledge`
- `hope_lucy_confession`
- `hope_count_choice_result`
- 등

**수정 방법**:

```typescript
// 각 노드가 연결되어야 할 위치를 찾아서 연결

// 예: hope_basement_knowledge
// → well-hope-encounter.ts의 선택지에 추가

export const wellHopeEncounterNodes = {
  hope_at_well: {
    choices: [
      // 기존 선택지...
      { 
        text: '지하실에 대해 묻는다', 
        nextNode: 'hope_basement_knowledge', // ✅ 연결
        showIf: { visitedNode: 'basement_scene' }
      }
    ]
  }
};
```

---

## 🔧 전체 해결 프로세스

### Step 1: 현재 상태 확인

```bash
# 개발 모드 실행
npm run dev

# 콘솔에서 확인 (또는 위의 방법 1, 2 사용)
```

### Step 2: 고아 노드 카테고리별 정리

```typescript
// 콘솔 출력 결과를 기반으로 분류
const orphansByCategory = {
  psychological: [],  // psychological-depth.ts
  drebber_dark: [],   // drebber-dark-route.ts
  ambiguous: [],      // ambiguous-endings.ts
  ellen: [],          // ellen-missing-nodes.ts
  suspense: [],       // suspense-events.ts
  hope: [],           // hope 관련
  other: []
};
```

### Step 3: 우선순위 결정

```typescript
// 1. 즉시 삭제 (사용 안 함)
const toDelete = [
  // 주석 처리된 파일들 (사용하지 않을 경우)
];

// 2. 재활성화 (사용할 것)
const toReactivate = [
  // 주석 처리된 파일들 (사용할 경우)
];

// 3. 연결 필요
const toConnect = [
  // ellen-missing-nodes
  // suspense-events
  // hope 심문 노드
];
```

### Step 4: 수정 작업

#### 옵션 A: 주석 파일 삭제 (추천)

```bash
# 사용하지 않는 파일 삭제
rm /data/story/psychological-depth.ts
rm /data/story/drebber-dark-route.ts
rm /data/story/ambiguous-endings.ts
```

#### 옵션 B: 주석 파일 재활성화

```typescript
// /data/story/fixes/index.ts
import { psychologicalNodes } from '../psychological-depth';
import { drebberDarkRoute } from '../drebber-dark-route';
import { ambiguousEndings } from '../ambiguous-endings';

export const allStoryFixes = {
  ...storyFixes,
  ...criticalFixes,
  ...psychologicalNodes,
  ...drebberDarkRoute,
  ...ambiguousEndings,
  ...missingNodes,
};
```

#### 옵션 C: Ellen/Suspense 노드 연결

각 카테고리별 수정 방법은 위 섹션 참고

### Step 5: 검증

```bash
# 수정 후 다시 확인
npm run dev
# 콘솔에서 고아 노드 개수 확인
# 목표: 0개
```

---

## 📋 체크리스트

### 즉시 확인 사항

- [ ] 현재 고아 노드 개수 확인 (67개 맞는지)
- [ ] 카테고리별 분류
- [ ] 각 노드의 용도 파악

### 수정 작업

#### 주석 처리된 파일 (28개)
- [ ] 삭제할지 재활성화할지 결정
- [ ] 결정에 따라 작업 수행

#### Ellen 노드 (22개)
- [ ] `allCharacterNodes`에 포함 여부 확인
- [ ] 미포함 시 추가
- [ ] 각 노드의 연결 위치 파악

#### 서스펜스 이벤트 (10개)
- [ ] `allLocationNodes`에 포함 여부 확인
- [ ] 허브에서 트리거 선택지 추가
- [ ] 조건부 표시 설정

#### Hope 심문 (7개)
- [ ] 각 노드의 적절한 연결 위치 파악
- [ ] 선택지 추가

### 최종 검증
- [ ] 고아 노드 0개 달성
- [ ] 게임 플레이 테스트
- [ ] 모든 엔딩 도달 가능 확인

---

## 🎯 예상 시간

| 작업 | 예상 소요 시간 |
|------|---------------|
| 현황 확인 | 5분 |
| 주석 파일 처리 (삭제) | 2분 |
| Ellen 노드 연결 | 20분 |
| 서스펜스 이벤트 연결 | 15분 |
| Hope 노드 연결 | 10분 |
| 검증 | 10분 |
| **합계** | **~1시간** |

---

## 💡 팁

1. **주석 파일은 삭제 추천**
   - 현재 사용되지 않고 있음
   - 필요하면 나중에 git에서 복원 가능

2. **Ellen 노드는 우선순위 높음**
   - 엘렌 시스템은 게임의 핵심 요소
   - 반드시 연결 필요

3. **서스펜스 이벤트는 선택적**
   - 게임 분위기 향상용
   - 시간이 없으면 나중에 추가 가능

4. **점진적 접근**
   - 한 번에 모두 수정하지 말고
   - 카테고리별로 하나씩 수정 후 테스트

---

**다음 단계**: 위 방법 중 하나로 현재 고아 노드를 확인하고, 결과를 공유해주세요. 그러면 구체적인 수정 방법을 제시하겠습니다!
