# 🔍 고아 노드 현황 분석 리포트

**생성일**: 2025-12-19  
**분석자**: AI Assistant  
**상태**: ✅ 분석 완료

---

## 📊 요약

고아 노드 문제를 확인하기 위해 현재 storyData 구조를 분석했습니다.

### 현재 구조

```typescript
// storyData.ts
export const storyData: StoryData = {
  ...part1Opening,          // Part 1: 오프닝
  ...part2FirstFloor,       // Part 2: 1층 탐색
  ...part3SecondFloor,      // Part 3: 2층 탐색
  ...allCharacterNodes,     // 캐릭터별 노드
  ...allLocationNodes,      // 장소별 노드
  ...allInterrogationNodes, // 심문 노드
  ...allStoryFixes,         // 수정사항
  ...allSystemNodes,        // 시스템 노드
  ...allHintNodes,          // 힌트 노드
};
```

---

## 🔍 고아 노드 확인 방법

### 자동 스캔 도구

새로 생성된 `/utils/orphan-scanner.ts`를 사용하면 됩니다:

```typescript
import { printOrphanReport } from './utils/orphan-scanner';

// 개발 모드에서 실행
printOrphanReport();
```

### 수동 확인 체크리스트

각 파일 카테고리별로 확인이 필요한 항목들:

#### 1. 주석 처리된 파일들 (의도적 비활성화)

**파일**: `/data/story/fixes/index.ts`

```typescript
// ❌ 현재 주석 처리되어 고아 노드 발생 가능
// import { psychologicalNodes } from '../psychological-depth';
// import { drebberDarkRoute } from '../drebber-dark-route';
// import { ambiguousEndings } from '../ambiguous-endings';
```

**영향받는 노드**:
- `psychological-depth.ts`: ~15개 노드
- `drebber-dark-route.ts`: ~8개 노드
- `ambiguous-endings.ts`: ~5개 노드

**조치 필요**:
- [ ] 삭제할 것인지 결정
- [ ] 또는 재활성화 후 연결

#### 2. Ellen 관련 노드

**파일**: 
- `/data/story/characters/ellen-discovery.ts`
- `/data/story/ellen-missing-nodes.ts`
- `/data/story/ellen-interrogation.ts`

**잠재적 고아 노드**:
- `ellen_follow_heart`
- `ellen_met_hope`
- `ellen_take_time_decision`
- `ellen_reassure_search`
- 등 (상세 목록은 ellen-missing-nodes.ts 참고)

**조치**:
- [ ] `allCharacterNodes`에 포함되어 있는지 확인
- [ ] 각 노드가 실제 게임 플로우에 연결되어 있는지 확인

#### 3. 서스펜스 이벤트

**파일**: `/data/story/locations/suspense-events.ts`

**잠재적 고아 노드**:
- `hallway_shadow_event`
- `chase_shadow`
- `call_holmes_shadow`
- `ignore_shadow`
- `sudden_door_slam`
- `backyard_watched`
- 등

**조치**:
- [ ] `allLocationNodes`에 포함되어 있는지 확인
- [ ] 허브 시스템과 연결되어 있는지 확인
- [ ] 트리거 조건이 설정되어 있는지 확인

#### 4. 심문/증거 관련 노드

**파일**:
- `/data/story/interrogations/*.ts`
- `/data/story/hints/*.ts`

**조치**:
- [ ] `allInterrogationNodes`에 포함 확인
- [ ] `allHintNodes`에 포함 확인
- [ ] 실제 심문 플로우에서 호출되는지 확인

---

## 🔧 고아 노드 해결 전략

### 전략 1: 분류 및 우선순위 설정

```typescript
// 1. 의도적으로 비활성화된 노드 (낮은 우선순위)
const intentionallyDisabled = [
  'psychological-depth.ts 노드들',
  'drebber-dark-route.ts 노드들',
  'ambiguous-endings.ts 노드들'
];

// 2. 구현 중인 노드 (중간 우선순위)
const workInProgress = [
  'ellen-missing-nodes.ts의 일부',
  'suspense-events.ts의 일부'
];

// 3. 실제 연결이 필요한 노드 (높은 우선순위)
const needsConnection = [
  'ellen_interrogation의 핵심 노드들',
  'hope_interrogation의 핵심 노드들'
];
```

### 전략 2: 연결 패턴

#### 패턴 A: 허브에서 분기

```typescript
// 예: main_entrance 허브에서 서스펜스 이벤트 트리거
const main_entrance = {
  id: 'main_entrance',
  choices: [
    // 기존 선택지들...
    { 
      text: '🚨 (복도에서 이상한 소리가 들린다)', 
      nextNode: 'hallway_shadow_event',
      showIf: { 
        visitedNode: 'upstairs',
        // 2층을 방문했을 때만 트리거
      }
    }
  ]
};
```

#### 패턴 B: 조건부 nextNode

```typescript
// 예: 엘렌 발견 후 자동으로 심문 노드로
const ellen_discovery = {
  id: 'ellen_discovery',
  text: '엘렌을 발견했다!',
  nextNode: 'ellen_first_interrogation' // ✅ 자동 연결
};
```

#### 패턴 C: 선택지에서 분기

```typescript
// 예: 호프 심문에서 깊은 대화 분기
const hope_interrogation = {
  id: 'hope_interrogation',
  choices: [
    { text: '루시에 대해 묻는다', nextNode: 'hope_lucy_conversation' },
    { text: '복수 동기를 묻는다', nextNode: 'hope_revenge_motive' }
  ]
};
```

---

## 📝 실행 가능한 수정 제안

### 1단계: 주석 처리된 파일 정리

```typescript
// /data/story/fixes/index.ts

// Option A: 완전히 삭제 (추천)
// - psychological-depth.ts 삭제
// - drebber-dark-route.ts 삭제
// - ambiguous-endings.ts 삭제

// Option B: 재활성화
import { psychologicalNodes } from '../psychological-depth';
import { drebberDarkRoute } from '../drebber-dark-route';
import { ambiguousEndings } from '../ambiguous-endings';

export const allStoryFixes: Record<string, StoryNode> = {
  ...storyFixes,
  ...criticalFixes,
  ...psychologicalNodes, // ✅ 재활성화
  ...drebberDarkRoute,
  ...ambiguousEndings,
  // ...
};
```

### 2단계: Ellen 노드 연결

```typescript
// /data/story/characters/index.ts

import { ellenDiscovery } from './ellen-discovery';
import { ellenInterrogation } from '../ellen-interrogation';
import { ellenMissingNodes } from '../ellen-missing-nodes';

export const allCharacterNodes: Record<string, StoryNode> = {
  ...ellenDiscovery,
  ...ellenInterrogation,
  ...ellenMissingNodes, // ✅ 추가되어 있는지 확인
  // ...
};
```

### 3단계: 서스펜스 이벤트 트리거 추가

```typescript
// /data/story/locations/upstairs-nodes.ts

export const upstairsNodes: Record<string, StoryNode> = {
  upstairs: {
    id: 'upstairs',
    choices: [
      // 기존 선택지들...
      { 
        text: '🚨 (복도 끝에 그림자가...)', 
        nextNode: 'hallway_shadow_event',
        requiredVisitedNode: 'bedroom', // 침실 방문 후 트리거
        hideIfVisitedNode: 'hallway_shadow_event' // 한 번만
      }
    ]
  }
};
```

---

## 🎯 우선순위별 작업 목록

### 🔴 High Priority (즉시 수정 필요)

1. **정의되지 않은 참조 수정**
   - [ ] 모든 `nextNode`가 실제로 존재하는지 확인
   - [ ] 존재하지 않는 참조는 오류 발생

2. **핵심 엔딩 노드 연결**
   - [ ] `good-endings.ts`의 모든 엔딩이 도달 가능한지 확인
   - [ ] `bad-endings.ts`의 모든 엔딩이 도달 가능한지 확인

### 🟡 Medium Priority (검토 필요)

3. **Ellen 시스템 완전성 검증**
   - [ ] `ellen-discovery.ts` → `ellen-interrogation.ts` 연결
   - [ ] `ellen-missing-nodes.ts`의 노드들이 실제로 사용되는지 확인

4. **심문 시스템 연결**
   - [ ] Hope 심문 노드들이 제대로 연결되어 있는지
   - [ ] Stangerson 심문 노드들이 제대로 연결되어 있는지

### 🟢 Low Priority (선택적)

5. **서스펜스 이벤트 활성화**
   - [ ] `suspense-events.ts` 노드들을 허브에 연결
   - [ ] 조건부 트리거 설정

6. **주석 처리된 파일 정리**
   - [ ] 사용하지 않을 파일 삭제
   - [ ] 또는 재활성화 후 연결

---

## 🔍 검증 방법

### 자동 검증

```typescript
// App.tsx 또는 개발 도구에서
import { printOrphanReport } from './utils/orphan-scanner';

if (process.env.NODE_ENV === 'development') {
  printOrphanReport();
}
```

### 수동 검증

1. **게임 플레이 테스트**
   - [ ] 모든 엔딩에 도달 가능한지 확인
   - [ ] 모든 캐릭터 심문이 가능한지 확인
   - [ ] 모든 증거를 획득할 수 있는지 확인

2. **선택지 체크**
   - [ ] 각 허브에서 모든 분기가 표시되는지 확인
   - [ ] 조건부 선택지가 적절한 타이밍에 나타나는지 확인

3. **콘솔 로그 확인**
   - [ ] "노드를 찾을 수 없음" 오류가 없는지 확인
   - [ ] "선택지 없음" 경고가 없는지 확인

---

## 📚 참고 파일

### 핵심 구조 파일
- `/data/storyData.ts` - 메인 데이터 취합
- `/data/story/systems/index.ts` - 시스템 노드 통합
- `/data/story/fixes/index.ts` - 수정사항 통합
- `/data/story/characters/index.ts` - 캐릭터 노드 통합

### 검증 도구
- `/utils/orphan-scanner.ts` - 고아 노드 스캐너 (신규)
- `/utils/dataValidator.ts` - 데이터 검증기 (기존)
- `/orphan-node-scanner.ts` - 레거시 스캐너 (참고용)

---

## 💡 다음 단계

1. **즉시 실행**:
   ```bash
   # 개발 모드에서 게임 실행 후 콘솔 확인
   npm run dev
   # 또는
   # orphan-scanner.ts를 직접 실행
   ```

2. **분석 결과 확인**:
   - 콘솔에 출력된 고아 노드 목록 확인
   - 카테고리별로 정리

3. **수정 작업**:
   - High Priority 항목부터 처리
   - 각 수정 후 테스트 플레이

4. **최종 검증**:
   - 모든 엔딩 도달 가능 확인
   - 고아 노드 0개 달성

---

**작성자**: AI Assistant  
**최종 수정**: 2025-12-19  
**상태**: ✅ 분석 완료, 실행 대기 중

> 💬 실제 고아 노드 개수를 확인하려면 `/utils/orphan-scanner.ts`의 `printOrphanReport()`를 실행하세요.
