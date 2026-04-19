# 📦 아이템 시스템 공용화 및 전체 데이터 검증

아이템 시스템을 완전히 모듈화하고 전체 게임 데이터 검증 시스템을 구축했습니다.

---

## ✨ 주요 개선사항

### **1. 아이템 헬퍼 함수 라이브러리**

```
기존: 아이템 데이터만 존재
  ↓
개선: 완전한 헬퍼 함수 시스템

/utils/itemHelpers.ts
├── 생성 헬퍼
├── 검색 & 필터링
├── 인벤토리 관리
├── 통계 & 분석
└── 검증 시스템
```

### **2. 전체 데이터 검증 시스템**

```
/utils/dataValidator.ts
├── 캐릭터 검증
├── 아이템 검증
├── 아이템-캐릭터 연결 검증
├── 스토리-아이템 검증
├── 스토리-캐릭터 검증
└── 스토리 노드 검증
```

### **3. DevTools 통합**

```
개발자 도구 > 데이터 검증 탭
├── 전체 데이터 검증 실행
├── 실시간 오류/경고 표시
└── 콘솔 로그 자동 출력
```

---

## 🔧 아이템 헬퍼 함수

### **생성 헬퍼**

```typescript
import { createItem } from './utils/itemHelpers';

const newItem = createItem({
  id: 'new_item',
  name: '새 아이템',
  imageUrl: 'https://...',
  acquireMessage: '획득 메시지',
  description: '설명',
  summaryDescription: '짧은 설명'
});
```

### **검색 & 필터링**

```typescript
import { 
  getAllItems,
  getItemById,
  getItemByName,
  getItemsByIds 
} from './utils/itemHelpers';

// 모든 아이템
const allItems = getAllItems();
// [{ id: '백작의 일기', ... }, { id: '제퍼슨의 편지', ... }, ...]

// ID로 검색
const diary = getItemById('백작의 일기');

// 이름으로 검색
const letter = getItemByName('제퍼슨의 편지');

// 여러 ID로 검색
const items = getItemsByIds(['백작의 일기', '지하실 열쇠']);
```

### **인벤토리 관리**

```typescript
import { 
  hasItem,
  hasAllItems,
  hasAnyItem,
  addItem,
  addItems,
  removeItem 
} from './utils/itemHelpers';

const inventory = ['백작의 일기', '지하실 열쇠'];

// 단일 아이템 보유 확인
hasItem(inventory, '백작의 일기')  // true

// 모든 아이템 보유 확인 (AND)
hasAllItems(inventory, ['백작의 일기', '지하실 열쇠'])  // true
hasAllItems(inventory, ['백작의 일기', '루시의 반지'])  // false

// 하나라도 보유 확인 (OR)
hasAnyItem(inventory, ['루시의 반지', '지하실 열쇠'])  // true

// 아이템 추가
const newInventory = addItem(inventory, '제퍼슨의 편지');
// ['백작의 일기', '지하실 열쇠', '제퍼슨의 편지']

// 여러 아이템 추가 (중복 자동 제거)
const moreInventory = addItems(inventory, ['제퍼슨의 편지', '루시의 반지']);

// 아이템 제거
const lessInventory = removeItem(inventory, '백작의 일기');
```

### **통계 & 분석**

```typescript
import { getInventoryStats } from './utils/itemHelpers';

const stats = getInventoryStats(['백작의 일기', '지하실 열쇠']);
// {
//   total: 4,           // 전체 아이템 수
//   collected: 2,       // 획득한 아이템 수
//   remaining: 2,       // 남은 아이템 수
//   percentage: 50,     // 진행도 (%)
//   isComplete: false   // 완료 여부
// }
```

### **미확인 아이템 관리**

```typescript
import { 
  addViewedItem,
  hasViewedItem,
  getUnviewedItemCount,
  getUnviewedItems 
} from './utils/itemHelpers';

const inventory = ['백작의 일기', '지하실 열쇠', '제퍼슨의 편지'];
const viewedItems = ['백작의 일기'];

// 미확인 아이템 개수
getUnviewedItemCount(inventory, viewedItems)  // 2

// 미확인 아이템 목록
getUnviewedItems(inventory, viewedItems)
// [{ id: '지하실 열쇠', ... }, { id: '제퍼슨의 편지', ... }]

// 아이템 확인 처리
const newViewedItems = addViewedItem(viewedItems, '지하실 열쇠');
// ['백작의 일기', '지하실 열쇠']

// 확인 여부
hasViewedItem(newViewedItems, '지하실 열쇠')  // true
```

### **아이템 검증**

```typescript
import { validateItem, validateItems } from './utils/itemHelpers';

// 단일 아이템 검증
const result = validateItem(myItem);
// {
//   valid: true/false,
//   errors: ['오류 메시지...']
// }

// 여러 아이템 검증
const multiResult = validateItems([item1, item2, item3]);
// {
//   valid: true/false,
//   errors: { 'item_id': ['오류1', '오류2'] },
//   duplicateIds: ['중복된 ID들']
// }
```

---

## 🔍 전체 데이터 검증 시스템

### **검증 항목**

```typescript
import { validateAllGameData } from './utils/dataValidator';

const results = validateAllGameData();
// {
//   valid: true/false,
//   characterValidation: {...},      // 캐릭터 검증
//   relationshipValidation: {...},   // 관계 검증
//   itemValidation: {...},           // 아이템 검증
//   itemMapValidation: {...},        // 아이템 맵 검증
//   itemCharacterLinkValidation: {...},  // 아이템-캐릭터 연결 검증
//   storyItemValidation: {...},      // 스토리-아이템 검증
//   storyCharacterValidation: {...}, // 스토리-캐릭터 검증
//   storyNodeValidation: {...},      // 스토리 노드 검증
//   summary: {
//     totalErrors: 0,
//     totalWarnings: 3,
//     criticalErrors: []
//   }
// }
```

### **1. 캐릭터 검증**

```typescript
✅ 중복 ID 없음
✅ 필수 필드 존재 (id, name, role, description)
✅ nameColor 형식 ('text-' 접두사)
✅ portraitUrl 형식 (http/https)
✅ traits 배열 비어있지 않음
```

### **2. 관계 검증**

```typescript
✅ 관계에서 참조하는 캐릭터 ID가 실제로 존재
✅ 관계 설명 비어있지 않음
```

### **3. 아이템 검증**

```typescript
✅ 중복 ID 없음
✅ 필수 필드 존재
✅ imageUrl 형식 체크
✅ 아이템 맵의 키와 ID/name 일치
```

### **4. 아이템-캐릭터 연결 검증**

```typescript
✅ 연결된 아이템 ID가 실제로 존재
✅ 연결된 캐릭터 ID가 실제로 존재
✅ 연결 설명 비어있지 않음
```

### **5. 스토리-아이템 검증**

```typescript
✅ 스토리에서 부여하는 아이템 ID가 실제로 존재
✅ 선택지에서 요구하는 아이템 ID가 실제로 존재
⚠️ 사용되지 않는 아이템 경고
```

### **6. 스토리-캐릭터 검증**

```typescript
✅ 대사에서 사용하는 캐릭터 ID가 실제로 존재
⚠️ 사용되지 않는 캐릭터 경고
```

### **7. 스토리 노드 검증**

```typescript
✅ start 노드 존재
✅ 다음 노드 ID가 실제로 존재
✅ 모든 노드 도달 가능
⚠️ 도달 불가능한 노드 (고아 노드) 경고
```

---

## 💻 사용 방법

### **기본 검증 (자동)**

```typescript
// App.tsx 또는 main.tsx에서
import { validateAllGameData, logValidationResults } from './utils/dataValidator';

// 개발 모드에서만 실행
if (process.env.NODE_ENV === 'development') {
  const results = validateAllGameData();
  
  if (!results.valid) {
    console.error('⚠️ 게임 데이터 검증 실패!');
    logValidationResults(results);
  }
}
```

### **DevTools로 검증**

```bash
1. 게임 실행
2. 우측 하단 "🔧 Dev Tools" 클릭
3. "데이터 검증" 탭 선택
4. "전체 데이터 검증 실행" 버튼 클릭
5. 결과 확인 (UI + 콘솔)
```

### **개별 검증**

```typescript
import {
  validateItemCharacterLinks,
  validateStoryItems,
  validateStoryCharacters,
  validateStoryNodes
} from './utils/dataValidator';

// 아이템-캐릭터 연결만 검증
const linkResult = validateItemCharacterLinks();

// 스토리-아이템만 검증
const storyItemResult = validateStoryItems();

// 스토리-캐릭터만 검증
const storyCharResult = validateStoryCharacters();

// 스토리 노드만 검증
const nodeResult = validateStoryNodes();
```

---

## 🎮 실제 활용 예시

### **예시 1: 아이템 수집 진행도 UI**

```tsx
import { getInventoryStats } from './utils/itemHelpers';

function ProgressBar({ inventory }) {
  const stats = getInventoryStats(inventory);
  
  return (
    <div>
      <div className="progress-bar">
        <div style={{ width: `${stats.percentage}%` }} />
      </div>
      <p>{stats.collected} / {stats.total}</p>
      {stats.isComplete && <span>🎉 모든 아이템 수집!</span>}
    </div>
  );
}
```

### **예시 2: 조건부 선택지 (AND)**

```tsx
import { hasAllItems } from './utils/itemHelpers';

// 스토리 노드에서
const canOpenBasement = hasAllItems(inventory, ['지하실 열쇠', '백작의 일기']);

if (canOpenBasement) {
  // 지하실 진입 선택지 활성화
}
```

### **예시 3: 조건부 선택지 (OR)**

```tsx
import { hasAnyItem } from './utils/itemHelpers';

// 루시에 대한 정보를 알고 있는지
const knowsAboutLucy = hasAnyItem(inventory, ['백작의 일기', '제퍼슨의 편지', '루시의 반지']);

if (knowsAboutLucy) {
  // 루시 관련 대화 선택지 활성화
}
```

### **예시 4: 미확인 아이템 배지**

```tsx
import { getUnviewedItemCount } from './utils/itemHelpers';

function InventoryButton({ inventory, viewedItems }) {
  const unviewedCount = getUnviewedItemCount(inventory, viewedItems);
  
  return (
    <button>
      인벤토리
      {unviewedCount > 0 && (
        <span className="badge">{unviewedCount}</span>
      )}
    </button>
  );
}
```

### **예시 5: 검증 에러 처리**

```typescript
import { validateAllGameData } from './utils/dataValidator';

try {
  const results = validateAllGameData();
  
  if (!results.valid) {
    // 치명적 오류가 있으면 게임 실행 차단
    if (results.summary.criticalErrors.length > 0) {
      throw new Error('치명적 데이터 오류 발견');
    }
    
    // 일반 오류는 경고만
    console.warn(`${results.summary.totalErrors}개의 오류가 있습니다`);
  }
} catch (error) {
  // 에러 처리
  showErrorScreen(error.message);
}
```

---

## 📊 검증 결과 예시

### **콘솔 출력 (성공)**

```
🔍 게임 데이터 검증 결과

📊 전체 요약:
  상태: ✅ 통과
  오류: 0개
  경고: 0개

👥 캐릭터:
  ✅ 통과

📦 아이템:
  ✅ 통과

🔗 아이템-캐릭터 연결:
  ✅ 통과

📖 스토리:
  아이템 사용:
    ✅ 통과
  캐릭터 사용:
    ✅ 통과
  노드 연결:
    ✅ 통과
```

### **콘솔 출력 (오류)**

```
🔍 게임 데이터 검증 결과

📊 전체 요약:
  상태: ❌ 실패
  오류: 3개
  경고: 2개

🚨 치명적 오류:
  - 중복 아이템 ID: 백작의 일기

👥 캐릭터:
  ❌ 관계 오류:
    - "holmes"의 관계에서 존재하지 않는 캐릭터 ID "mysterious_person"을 참조합니다

📦 아이템:
  ❌ 아이템 맵 오류:
    - 키 불일치: "diary" ≠ "백작의 일기" (id)

🔗 아이템-캐릭터 연결:
  ❌ 오류:
    - 아이템 "unknown_item"이(가) 존재하지 않는 캐릭터 ID "ghost"를 참조합니다

📖 스토리:
  아이템 사용:
    ✅ 통과
    ⚠️ 경고:
      - 아이템 "루시의 반지"가 스토리에서 사용되지 않습니다
  캐릭터 사용:
    ✅ 통과
    ⚠️ 경고:
      - 캐릭터 "drebber" (이노크 드레버)가 스토리에서 사용되지 않습니다
  노드 연결:
    ✅ 통과
```

---

## 🛠️ 확장 가능성

### **새 아이템 추가**

```typescript
// 1. itemData.ts에 추가
export const itemDataMap = {
  // ... 기존 아이템
  '새 아이템': createItem({
    id: '새 아이템',
    name: '새 아이템',
    imageUrl: 'https://...',
    acquireMessage: '...',
    description: '...',
    summaryDescription: '...'
  })
};

// 2. itemCharacterLinks.ts에 연결 추가 (필요시)
export const itemCharacterLinks = [
  // ... 기존 연결
  {
    itemId: '새 아이템',
    characterIds: ['character1', 'character2'],
    description: '새 아이템으로 캐릭터를 알게 됨'
  }
];

// 3. 검증 실행
validateAllGameData();  // 자동으로 새 아이템 검증됨!
```

### **커스텀 검증 규칙**

```typescript
// utils/dataValidator.ts에 추가

export function validateCustomRule(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // 커스텀 검증 로직
  // ...
  
  return { valid: errors.length === 0, errors };
}

// validateAllGameData에 통합
export function validateAllGameData() {
  // ... 기존 검증
  const customValidation = validateCustomRule();
  
  return {
    // ... 기존 결과
    customValidation,
    // ...
  };
}
```

---

## 📚 파일 구조

```
/utils/
  itemHelpers.ts          # 아이템 헬퍼 함수 (15+ 함수)
  dataValidator.ts        # 전체 데이터 검증 시스템
  characterHelpers.ts     # 캐릭터 헬퍼 함수 (기존)
  storyBuilder.ts         # 스토리 검증 (기존)

/data/
  itemData.ts             # 아이템 데이터 + getAllItems()
  itemCharacterLinks.ts   # 아이템-캐릭터 연결
  characterInfoData.ts    # 캐릭터 데이터
  storyData.ts            # 스토리 데이터

/components/
  DevTools.tsx            # 개발자 도구 (데이터 검증 탭 추가)
```

---

## ✅ 체크리스트

### **개발 전**

```bash
✅ itemHelpers.ts 생성
✅ dataValidator.ts 생성
✅ itemData.ts에 getAllItems() 추가
✅ DevTools에 데이터 검증 탭 추가
✅ 전체 데이터 검증 시스템 통합
```

### **배포 전**

```bash
✅ validateAllGameData() 실행
✅ 치명적 오류 0개
✅ 일반 오류 0개
✅ 경고 확인 및 처리
✅ 모든 아이템 ID 중복 없음
✅ 모든 연결 정합성 확인
```

---

## 🎁 주요 이점

### **개발 효율성**

- ⏱️ **자동 검증**: 수동 확인 불필요
- 🔧 **헬퍼 함수**: 반복 코드 제거
- 🐛 **조기 발견**: 런타임 전에 오류 발견

### **코드 품질**

- ✅ **타입 안정성**: TypeScript 완벽 지원
- ✅ **재사용성**: 모든 함수 독립 사용 가능
- ✅ **유지보수성**: 논리적으로 분리된 구조

### **확장성**

- 📈 **쉬운 확장**: 새 아이템/캐릭터 추가 간단
- 🔌 **플러그인**: 커스텀 검증 규칙 추가 가능
- 🎨 **다른 프로젝트**: 헬퍼 함수 재사용

---

## 🚀 다음 단계

1. **아이템 데이터 분리**
   ```bash
   touch /data/items/basic.ts
   touch /data/items/clues.ts
   ```

2. **자동 검증 통합**
   ```typescript
   // App.tsx에서
   if (process.env.NODE_ENV === 'development') {
     validateAllGameData();
   }
   ```

3. **CI/CD 통합**
   ```bash
   # package.json
   "scripts": {
     "validate": "node scripts/validate-data.js"
   }
   ```

---

## 📝 비교 요약

| 항목 | 기존 | 개선 |
|------|------|------|
| **아이템 관리** | 데이터만 | 15+ 헬퍼 함수 |
| **검증** | 수동 | 자동 시스템 |
| **검증 범위** | 스토리만 | 전체 데이터 |
| **DevTools** | 스토리 검증만 | 데이터 검증 추가 |
| **오류 발견** | 런타임 | 개발 중 |
| **확장성** | 어려움 | 쉬움 |

이제 아이템 시스템도 완전히 공용화되었고, 전체 게임 데이터를 자동으로 검증할 수 있습니다! 🎉
