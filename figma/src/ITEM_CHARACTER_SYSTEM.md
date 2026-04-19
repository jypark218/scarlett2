# 🎁 아이템-캐릭터 연동 시스템

아이템을 획득하면 직접 대면하지 않은 캐릭터의 정보도 인물 도감에서 열람할 수 있는 시스템입니다.

---

## 🎯 핵심 기능

### **기존 방식**
```
캐릭터 해금 = 직접 대면해야만 가능
  ↓
문제: 루시, 모로 백작 등 만날 수 없는 캐릭터는 영원히 잠김
```

### **개선된 방식**
```
캐릭터 해금 = 직접 대면 OR 관련 아이템 획득
  ↓
해결: 아이템 단서를 통해 모든 캐릭터 정보 열람 가능!
```

---

## 📊 아이템-캐릭터 연결표

| 아이템 | 해금 캐릭터 | 설명 |
|--------|------------|------|
| **백작의 일기** | 모로 백작, 루시 루이자 | 백작의 일기에서 과거를 알게 됨 |
| **제퍼슨의 편지** | 제퍼슨 호프, 루시 루이자 | 호프와 딸 루시의 이야기를 알게 됨 |
| **지하실 열쇠** | 모로 백작 | 백작의 행방을 추리할 수 있게 됨 |
| **루시의 반지** | 루시 루이자, 제퍼슨 호프 | L.L 각인으로 관계를 알게 됨 |

---

## 🔧 시스템 구조

### 1. 데이터 정의 (`/data/itemCharacterLinks.ts`)

```typescript
export interface ItemCharacterLink {
  itemId: string;           // 아이템 ID (diary, letter, key, ring)
  characterIds: string[];   // 해금되는 캐릭터 ID들
  description: string;      // 왜 이 아이템이 해당 캐릭터와 연결되는지
}

export const itemCharacterLinks: ItemCharacterLink[] = [
  {
    itemId: 'diary',
    characterIds: ['count', 'lucy'],
    description: '백작의 일기에서 모로 백작과 루시 루이자의 과거를 알게 됨'
  },
  // ...
];
```

### 2. 헬퍼 함수

#### **단일 아이템으로 해금**
```typescript
getUnlockedCharactersByItem(itemId: string): string[]

// 예시
getUnlockedCharactersByItem('diary')
// → ['count', 'lucy']
```

#### **여러 아이템으로 해금**
```typescript
getUnlockedCharactersByItems(itemIds: string[]): string[]

// 예시
getUnlockedCharactersByItems(['diary', 'letter'])
// → ['count', 'lucy', 'hope'] (중복 제거됨)
```

#### **모든 해금된 캐릭터 (직접 대면 + 아이템)**
```typescript
getAllUnlockedCharacters(
  unlockedCharacters: string[],  // 직접 대면한 캐릭터
  inventory: string[]            // 보유 아이템
): string[]

// 예시
getAllUnlockedCharacters(
  ['watson', 'holmes'],    // 직접 만남
  ['diary', 'letter']      // 아이템 보유
)
// → ['watson', 'holmes', 'count', 'lucy', 'hope']
```

#### **캐릭터 해금 여부 확인**
```typescript
isCharacterUnlocked(
  characterId: string,
  unlockedCharacters: string[],
  inventory: string[]
): boolean

// 예시
isCharacterUnlocked('lucy', ['watson'], ['diary'])
// → true (diary 아이템으로 해금됨)
```

---

## 🎨 UI 표시

### **인물 도감에서 구별**

#### **직접 대면한 캐릭터**
```
┌─────────────────────┐
│ 👤 셜록 홈즈         │
│ 명탐정               │
│ 클릭하여 자세히 보기  │
└─────────────────────┘
```

#### **아이템으로 해금한 캐릭터**
```
┌─────────────────────┐
│ 📦 루시 루이자       │  ← 📦 아이콘 표시
│ 과거 희생자          │
│ 클릭하여 자세히 보기  │
│ [단서 획득] 배지     │  ← 노란색 배지
└─────────────────────┘
```

### **시각적 차이**

```tsx
// 직접 대면
<CharacterCard
  character={holmes}
  unlockedBy="direct"  // 일반 표시
/>

// 아이템으로 해금
<CharacterCard
  character={lucy}
  unlockedBy="item"    // 📦 아이콘 + 배지
/>
```

---

## 💻 구현 예시

### App.tsx

```tsx
import { getAllUnlockedCharacters } from './data/itemCharacterLinks';

function App() {
  const [unlockedCharacters, setUnlockedCharacters] = useState(['watson', 'holmes']);
  const [inventory, setInventory] = useState(['diary']);
  
  // IntroScreen에 전달
  return (
    <IntroScreen
      unlockedCharacters={unlockedCharacters}  // 직접 대면
      inventory={inventory}                    // 아이템 목록
    />
  );
}
```

### IntroScreen.tsx

```tsx
import { getAllUnlockedCharacters } from '../data/itemCharacterLinks';

function IntroScreen({ unlockedCharacters, inventory }) {
  // 모든 해금된 캐릭터 계산
  const allUnlockedCharacters = getAllUnlockedCharacters(
    unlockedCharacters,  // ['watson', 'holmes']
    inventory            // ['diary']
  );
  // → ['watson', 'holmes', 'count', 'lucy']
  
  return (
    <CharacterGallery
      unlockedCharacters={allUnlockedCharacters}      // 전체
      directUnlockedCharacters={unlockedCharacters}   // 직접 대면만
    />
  );
}
```

### CharacterGallery

```tsx
function CharacterGallery({ unlockedCharacters, directUnlockedCharacters }) {
  return (
    <CharacterGalleryModal
      unlockedCharacters={allUnlockedCharacters}
      directUnlockedCharacters={directUnlockedCharacters}
    />
  );
}
```

### CharacterGalleryModal

```tsx
function CharacterGalleryModal({ unlockedCharacters, directUnlockedCharacters }) {
  return characters.map(character => {
    const isUnlocked = unlockedCharacters.includes(character.id);
    const isDirect = directUnlockedCharacters.includes(character.id);
    const unlockedBy = isUnlocked ? (isDirect ? 'direct' : 'item') : undefined;
    
    return (
      <CharacterCard
        character={character}
        isUnlocked={isUnlocked}
        unlockedBy={unlockedBy}  // 'direct' or 'item'
      />
    );
  });
}
```

---

## 🎮 게임 플레이 시나리오

### 시나리오 1: 백작의 일기 획득

```
플레이어 상태:
- 직접 대면: watson, holmes, gregson
- 아이템: diary

인물 도감:
✅ 왓슨 (직접 대면)
✅ 홈즈 (직접 대면)
✅ 그레그슨 (직접 대면)
✅ 모로 백작 (📦 단서 획득)  ← diary로 해금!
✅ 루시 루이자 (📦 단서 획득) ← diary로 해금!
❌ 제퍼슨 호프 (잠김)
❌ 스탠거슨 (잠김)
❌ 드레버 (잠김)
```

### 시나리오 2: 모든 아이템 획득

```
플레이어 상태:
- 직접 대면: watson, holmes, gregson
- 아이템: diary, letter, key, ring

인물 도감:
✅ 왓슨 (직접 대면)
✅ 홈즈 (직접 대면)
✅ 그레그슨 (직접 대면)
✅ 모로 백작 (📦 단서 획득)  ← diary, key
✅ 루시 루이자 (📦 단서 획득) ← diary, letter, ring
✅ 제퍼슨 호프 (📦 단서 획득) ← letter, ring
❌ 스탠거슨 (잠김)  ← 직접 만나야 해금
❌ 드레버 (잠김)    ← 직접 만나야 해금
```

### 시나리오 3: 직접 대면 + 아이템

```
플레이어 상태:
- 직접 대면: watson, holmes, hope (호프 만남!)
- 아이템: diary

인물 도감:
✅ 왓슨 (직접 대면)
✅ 홈즈 (직접 대면)
✅ 제퍼슨 호프 (직접 대면)  ← 직접 만남!
✅ 모로 백작 (📦 단서 획득)
✅ 루시 루이자 (📦 단서 획득)
```

---

## 🔍 특별한 케이스

### **루시 루이자**
```
문제: 1861년에 사망했으므로 게임에서 절대 만날 수 없음
해결: diary, letter, ring 중 하나라도 획득하면 정보 열람 가능
```

### **모로 백작**
```
문제: 지하실에 감금되어 있어 특정 엔딩에서만 만남
해결: diary나 key 획득으로 정보 열람 가능
```

### **제퍼슨 호프**
```
문제: 진범이므로 특정 선택지에서만 등장
해결: letter나 ring 획득으로 정보 열람 가능
```

---

## 📋 체크리스트

### 개발 시 확인 사항

```bash
✅ itemCharacterLinks 데이터 정의
✅ App.tsx에 getAllUnlockedCharacters import
✅ IntroScreen에 inventory props 추가
✅ CharacterGallery에 directUnlockedCharacters props 추가
✅ CharacterCard에 unlockedBy 표시 구현
✅ 아이템 획득 시 인물 도감 자동 업데이트
```

### 테스트 시나리오

```bash
1. 아이템 없이 시작 → 직접 만난 캐릭터만 표시
2. diary 획득 → count, lucy 해금 확인
3. letter 획득 → hope, lucy 해금 확인
4. 중복 아이템(diary + letter) → lucy 중복 없이 표시
5. 직접 대면 + 아이템 → 올바른 배지 표시
```

---

## 🎁 장점

### **게임플레이**
- ✅ 모든 캐릭터 정보 열람 가능
- ✅ 아이템 수집의 의미 증가
- ✅ 스토리 이해도 향상

### **플레이어 경험**
- ✅ 막다른 길 없음 (모든 정보 접근 가능)
- ✅ 탐험 보상 (아이템으로 비밀 해금)
- ✅ 재플레이 가치 증가

### **스토리텔링**
- ✅ 자연스러운 정보 전달
- ✅ 아이템이 스토리의 일부
- ✅ 몰입도 향상

---

## 🔄 확장 가능성

### 새 아이템-캐릭터 추가

```typescript
// data/itemCharacterLinks.ts에 추가만 하면 됨!

export const itemCharacterLinks: ItemCharacterLink[] = [
  // ... 기존 데이터
  {
    itemId: 'new_item',
    characterIds: ['new_character'],
    description: '새 아이템으로 새 캐릭터를 알게 됨'
  }
];
```

### 다른 시스템과 연동

```typescript
// 장소-캐릭터 연동
export const locationCharacterLinks = [
  {
    locationId: 'basement',
    characterIds: ['count']
  }
];

// 엔딩-캐릭터 연동
export const endingCharacterLinks = [
  {
    endingId: 'true_ending',
    characterIds: ['all_characters']
  }
];
```

---

## 📚 관련 파일

```
/data/
  itemCharacterLinks.ts       # 아이템-캐릭터 연결 정의 및 헬퍼 함수

/components/
  /character-gallery/
    CharacterCard.tsx          # 📦 아이콘 및 배지 표시
    CharacterGalleryModal.tsx  # unlockedBy 판별
  CharacterGallery.tsx         # directUnlockedCharacters props
  IntroScreen.tsx             # getAllUnlockedCharacters 활용

/App.tsx                       # inventory → IntroScreen 전달
```

---

## 🎉 결과

### **기존**
```
인물 도감: 3/8 해금
- 왓슨 ✅
- 홈즈 ✅
- 그레그슨 ✅
- 모로 백작 ❌ (만날 수 없음)
- 루시 ❌ (이미 사망)
- 호프 ❌ (특정 엔딩만)
- 스탠거슨 ❌
- 드레버 ❌
```

### **개선**
```
인물 도감: 6/8 해금
- 왓슨 ✅ (직접 대면)
- 홈즈 ✅ (직접 대면)
- 그레그슨 ✅ (직접 대면)
- 모로 백작 ✅ (📦 백작의 일기)
- 루시 ✅ (📦 루시의 반지)
- 호프 ✅ (📦 제퍼슨의 편지)
- 스탠거슨 ❌
- 드레버 ❌
```

---

**플레이어는 이제 게임을 클리어하지 않아도 아이템을 통해 핵심 인물들의 정보를 모두 확인할 수 있습니다!** 🎊
