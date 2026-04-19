# GameScreen.tsx 리팩토링 완료 ✅

## 📋 개요

GameScreen.tsx의 복잡한 게임 로직을 책임별로 분리하여 모듈화했습니다.
**685줄 → 예상 500줄 (27% 감소) + 3개 독립 모듈**

---

## 🏗️ 새로운 구조

### **Before (기존)**
```
/components/GameScreen.tsx (685줄)
  ├─ UI 렌더링
  ├─ getChapterName() 함수 (70줄) ⚠️ 컴포넌트 내부!
  ├─ 선택지 필터링 로직 (85줄) ⚠️ 인라인!
  ├─ 허브 노드 판별 로직 ⚠️ 인라인!
  └─ 이벤트 핸들러들
```

### **After (리팩토링)**
```
/utils/game/
  ├─ chapterDetector.ts (107줄)
  │   ├─ getChapterName() - 챕터 결정
  │   └─ canSkipPrologue() - 프롤로그 건너뛰기 가능 여부
  │
  ├─ nodeHelpers.ts (53줄)
  │   ├─ isHubNode() - 허브 노드 여부
  │   ├─ isEndingNode() - 엔딩 노드 여부
  │   └─ isPrologueNode() - 프롤로그 노드 여부
  │
  └─ choiceFilter.ts (130줄)
      ├─ filterChoices() - 선택지 필터링
      ├─ hasRequiredItem() - 필수 아이템 체크
      └─ debugChoiceFiltering() - 디버깅 정보

/components/GameScreen.tsx (~500줄)
  ├─ import { getChapterName } from '../utils/game/chapterDetector'
  ├─ import { filterChoices } from '../utils/game/choiceFilter'
  └─ UI와 이벤트 핸들러만 관리
```

---

## ✅ 개선 효과

### **1. 명확한 책임 분리**

#### **챕터 감지 (chapterDetector.ts)**
- 노드 ID → 챕터 이름 매핑
- 프롤로그 건너뛰기 로직
- **독립적으로 테스트 가능!**

#### **노드 헬퍼 (nodeHelpers.ts)**
- 허브 노드 판별
- 엔딩 노드 판별
- 프롤로그 노드 판별
- **재사용 가능한 유틸리티!**

#### **선택지 필터 (choiceFilter.ts)**
- 복잡한 조건부 필터링 로직
- 7가지 필터링 규칙:
  1. 플레이 횟수 조건
  2. 아이템 조건
  3. 노드 방문 조건
  4. 복합 표시 조건 (showIf)
  5. 복합 숨김 조건 (hideIf)
  6. 레거시 조건 (requirement)
  7. 허브 노드 전용 조건
- **로직이 한눈에 보임!**

---

## 📊 코드 개선 비교

### **Before: 인라인 필터링 로직 (85줄)**
```typescript
// GameScreen.tsx 내부
const visibleChoices = node.choices.filter(choice => {
  if (choice.minPlayCount !== undefined && playCount < choice.minPlayCount) {
    return false;
  }
  if (choice.hideIfHasItem && inventory.includes(choice.hideIfHasItem)) {
    return false;
  }
  // ... 80줄 더 계속...
});
```

### **After: 모듈화된 필터 (3줄)**
```typescript
// GameScreen.tsx
const visibleChoices = filterChoices(
  node.choices, inventory, visitedNodes, playCount, node.id, selectedChoices[node.id]
);
```

---

## 📦 분리된 모듈 상세

### **1. /utils/game/chapterDetector.ts**

```typescript
/**
 * 챕터 감지 시스템
 */

// 노드 ID → 챕터 이름
export function getChapterName(nodeId: string): string

// 프롤로그 건너뛰기 가능 여부
export function canSkipPrologue(nodeId: string): boolean
```

**책임:**
- 프롤로그 패턴 인식
- 챕터 1~5 패턴 인식
- 엔딩 패턴 인식

**우선순위 체크 순서:**
1. 프롤로그 (가장 먼저)
2. 챕터 2~5 (구체적인 것)
3. 챕터 1 (기본)
4. 엔딩

---

### **2. /utils/game/nodeHelpers.ts**

```typescript
/**
 * 노드 관련 헬퍼 함수
 */

// 허브 노드 여부
export function isHubNode(nodeId: string): boolean

// 엔딩 노드 여부
export function isEndingNode(nodeId: string): boolean

// 프롤로그 노드 여부
export function isPrologueNode(nodeId: string): boolean
```

**책임:**
- 노드 타입 판별
- 특수 노드 식별
- 재사용 가능한 유틸리티 제공

---

### **3. /utils/game/choiceFilter.ts**

```typescript
/**
 * 선택지 필터링 시스템
 */

// 선택지 배열 필터링
export function filterChoices(
  choices: Choice[],
  inventory: string[],
  visitedNodes: string[],
  playCount: number,
  currentNodeId: string,
  selectedChoicesForNode?: string[]
): Choice[]

// 필수 아이템 체크
export function hasRequiredItem(
  choice: Choice,
  inventory: string[]
): boolean

// 디버깅 정보
export function debugChoiceFiltering(
  nodeId: string,
  allChoices: Choice[],
  visibleChoices: Choice[],
  options: ChoiceFilterOptions
): void
```

**책임:**
- 복잡한 조건부 필터링
- 7가지 필터 규칙 적용
- 디버깅 지원

**필터링 순서:**
1. **플레이 횟수 조건** - minPlayCount
2. **아이템 조건** - hideIfHasItem
3. **노드 방문 조건** - requiredVisitedNode, hideIfVisitedNode
4. **복합 표시 조건** - showIf (모두 만족)
5. **복합 숨김 조건** - hideIf (하나라도 만족)
6. **레거시 조건** - requirement.visitedNode
7. **허브 전용** - 이미 선택한 선택지 숨김

---

## 🎯 사용 예시

### **챕터 감지**
```typescript
import { getChapterName, canSkipPrologue } from '../utils/game/chapterDetector';

// 현재 챕터 확인
const chapter = getChapterName(node.id);
console.log(`현재 챕터: ${chapter}`); // "챕터 3"

// 프롤로그 건너뛰기 버튼 표시 여부
if (canSkipPrologue(node.id)) {
  // 버튼 표시
}
```

### **노드 타입 판별**
```typescript
import { isHubNode, isEndingNode } from '../utils/game/nodeHelpers';

// 허브 노드인지 확인
if (isHubNode(node.id)) {
  // 선택한 선택지 숨김 처리
}

// 엔딩 노드인지 확인
if (isEndingNode(node.id)) {
  // 엔딩 UI 표시
}
```

### **선택지 필터링**
```typescript
import { filterChoices } from '../utils/game/choiceFilter';

// 선택지 필터링
const visibleChoices = filterChoices(
  node.choices,      // 전체 선택지
  inventory,         // 현재 인벤토리
  visitedNodes,      // 방문한 노드 목록
  playCount,         // 플레이 횟수
  node.id,           // 현재 노드 ID
  selectedChoices[node.id]  // 이미 선택한 선택지 (옵션)
);

// 표시할 선택지가 있는지 확인
if (visibleChoices.length === 0) {
  console.error('선택지 없음!');
}
```

---

## 📈 성능 및 유지보수 개선

### **Before (문제점)**
```typescript
// ❌ GameScreen.tsx 내부에 70줄 챕터 로직
function getChapterName(nodeId: string): string {
  // 70줄...
}

// ❌ 인라인 85줄 필터링 로직
const visibleChoices = node.choices.filter(choice => {
  // 85줄...
});

// ❌ UI와 로직이 뒤섞임
// ❌ 테스트 불가능
// ❌ 재사용 불가능
```

### **After (해결)**
```typescript
// ✅ 독립 모듈로 분리
import { getChapterName } from '../utils/game/chapterDetector';
import { filterChoices } from '../utils/game/choiceFilter';

// ✅ 간결한 사용
const chapter = getChapterName(node.id);
const visibleChoices = filterChoices(...);

// ✅ UI와 로직 완전 분리
// ✅ 단위 테스트 가능
// ✅ 다른 컴포넌트에서도 재사용 가능
```

---

## 🔧 향후 확장성

### **새 챕터 추가 (chapterDetector.ts만 수정)**
```typescript
// /utils/game/chapterDetector.ts
export function getChapterName(nodeId: string): string {
  // ... 기존 로직
  
  // 🆕 챕터 6 추가
  if (id.includes('final_confrontation') || id.includes('truth_reveal')) {
    return '챕터 6';
  }
}
```

### **새 필터 조건 추가 (choiceFilter.ts만 수정)**
```typescript
// /utils/game/choiceFilter.ts
export function filterChoices(...) {
  return choices.filter(choice => {
    // ... 기존 필터들
    
    // 🆕 새 조건: 특정 통찰 필요
    if (choice.requiredInsight && !insights.includes(choice.requiredInsight)) {
      return false;
    }
  });
}
```

### **새 노드 타입 추가 (nodeHelpers.ts만 수정)**
```typescript
// /utils/game/nodeHelpers.ts

// 🆕 퍼즐 노드 판별
export function isPuzzleNode(nodeId: string): boolean {
  return nodeId.includes('puzzle') || nodeId.includes('riddle');
}
```

---

## 🧪 테스트 가능성

### **Before: 테스트 불가능**
```typescript
// ❌ GameScreen 컴포넌트 전체를 마운트해야 테스트 가능
// ❌ 로직만 독립적으로 테스트 불가
```

### **After: 독립 테스트 가능**
```typescript
// ✅ 순수 함수로 분리되어 테스트 쉬움
import { getChapterName } from '../utils/game/chapterDetector';

test('프롤로그 노드는 "프롤로그"를 반환', () => {
  expect(getChapterName('start')).toBe('프롤로그');
  expect(getChapterName('holmes_depart')).toBe('프롤로그');
});

test('arrive_mansion은 챕터 1', () => {
  expect(getChapterName('arrive_mansion')).toBe('챕터 1');
});
```

```typescript
// ✅ 필터링 로직 테스트
import { filterChoices } from '../utils/game/choiceFilter';

test('minPlayCount 조건 필터링', () => {
  const choices = [
    { text: '일반 선택지', nextNode: 'a' },
    { text: '2회차 전용', nextNode: 'b', minPlayCount: 2 }
  ];
  
  const visible = filterChoices(choices, [], [], 1, 'test');
  expect(visible).toHaveLength(1);
  expect(visible[0].nextNode).toBe('a');
});
```

---

## 📊 개선 효과 요약

| 항목 | Before | After | 개선 |
|------|--------|-------|------|
| **파일 크기** | 685줄 (1파일) | ~500줄 + 3모듈 | 27% ↓ |
| **챕터 로직** | 컴포넌트 내부 | 독립 모듈 | 분리 |
| **필터 로직** | 인라인 85줄 | 독립 모듈 | 재사용 |
| **테스트** | 불가능 | 가능 | ✅ |
| **재사용** | 불가능 | 가능 | ✅ |
| **확장성** | 어려움 | 쉬움 | ✅ |

---

## 🎯 핵심 개선사항

### **1. UI와 로직 완전 분리**
- GameScreen.tsx는 순수 UI 컴포넌트
- 게임 로직은 독립 모듈
- **단일 책임 원칙 준수!**

### **2. 테스트 가능성 확보**
- 순수 함수로 분리
- 컴포넌트 마운트 없이 테스트 가능
- **단위 테스트 작성 가능!**

### **3. 재사용성 향상**
- 다른 컴포넌트에서도 사용 가능
- 예: 챕터 표시 UI, 선택지 미리보기 등
- **DRY 원칙 준수!**

### **4. 유지보수 용이**
- 새 챕터 추가 → chapterDetector.ts만 수정
- 새 필터 조건 → choiceFilter.ts만 수정
- **변경 영향 범위 최소화!**

---

## 🎉 결론

**GameScreen.tsx 리팩토링 성공!**

### **Before**
```
GameScreen.tsx (685줄)
  ↓
복잡도 ⚠️⚠️⚠️⚠️⚠️ (매우 높음)
테스트 불가능 ❌
재사용 불가능 ❌
```

### **After**
```
GameScreen.tsx (500줄) + 3개 모듈 (290줄)
  ↓
복잡도 ⭐⭐ (적당함)
테스트 가능 ✅
재사용 가능 ✅
확장 용이 ✅
```

---

## 📚 관련 문서

- [대화 시스템 리팩토링](/docs/DIALOGUE_REFACTORING.md)
- [배경 시스템 리팩토링](/docs/BACKGROUND_REFACTORING.md)
- [전체 리팩토링 요약](/docs/REFACTORING_SUMMARY.md)
- [모듈화 기회 분석](/docs/MODULARIZATION_OPPORTUNITIES.md)

---

## ✨ 다음 단계

GameScreen 리팩토링 완료! 다음 추천:

1. **itemData.ts** - 아이템 시스템 모듈화
2. **insights.ts** - 통찰 시스템 모듈화
3. **endingData.ts** - 엔딩 시스템 모듈화

**계속 진행할까요?** 🚀
