# 캐릭터 시스템 사용 가이드

## 📁 구조

```
/data/
  /characters/              # 캐릭터 데이터 파일들 (모듈화)
    protagonists.ts         # 주인공 그룹
    suspects.ts             # 용의자 그룹
    victims.ts              # 피해자 그룹
    README.md              # 이 파일
  
  characterInfoData.ts      # 메인 파일 (병합)

/components/
  /character-gallery/       # 캐릭터 도감 컴포넌트들
    CharacterCard.tsx       # 캐릭터 카드
    CharacterDetailModal.tsx # 상세 정보 모달
    CharacterGalleryModal.tsx # 도감 모달
  
  CharacterGallery.tsx      # 메인 컴포넌트 (공용화됨)

/utils/
  characterHelpers.ts       # 캐릭터 관리 유틸리티
```

---

## 🛠️ 사용 방법

### 1. 기본 사용 (기존과 동일)

```tsx
import { CharacterGallery } from './components/CharacterGallery';

function IntroScreen() {
  const unlockedCharacters = ['watson', 'holmes', 'gregson'];
  
  return (
    <CharacterGallery unlockedCharacters={unlockedCharacters} />
  );
}
```

### 2. 커스터마이징

```tsx
import { CharacterGallery } from './components/CharacterGallery';
import { myCustomCharacters } from './data/customCharacters';

function MyGame() {
  const unlockedCharacters = ['char1', 'char2'];
  
  return (
    <CharacterGallery 
      unlockedCharacters={unlockedCharacters}
      characters={myCustomCharacters}  // 커스텀 캐릭터 리스트
      buttonText="캐릭터 목록"          // 버튼 텍스트 변경
      buttonVariant="default"           // 버튼 스타일
      buttonClassName="bg-blue-500"     // 커스텀 스타일
    />
  );
}
```

---

## 📝 캐릭터 데이터 모듈화

### 파일 분리하기

```typescript
// data/characters/protagonists.ts
import { CharacterInfo } from '../characterInfoData';
import { createCharacter, createRelationship } from '../../utils/characterHelpers';

export const protagonists: CharacterInfo[] = [
  createCharacter({
    id: 'watson',
    name: '존 H. 왓슨',
    nameColor: 'text-blue-400',
    portraitUrl: 'https://images.unsplash.com/photo-...',
    role: '주인공',
    description: '아프가니스탄 전쟁에서 부상당한 군의관...',
    traits: ['성실함', '용감함', '의학 지식'],
    relationships: [
      createRelationship(
        'holmes',
        '셜록 홈즈',
        '동료',
        '홈즈의 룸메이트이자 사건 해결 파트너'
      )
    ]
  }),
  
  createCharacter({
    id: 'holmes',
    name: '셜록 홈즈',
    nameColor: 'text-purple-400',
    portraitUrl: 'https://images.unsplash.com/photo-...',
    role: '명탐정',
    description: '런던 최고의 자문 탐정...',
    traits: ['천재적 추리력', '관찰력', '바이올린 연주'],
    relationships: [
      createRelationship('watson', '존 H. 왓슨', '동료', '신뢰하는 파트너')
    ]
  })
];
```

```typescript
// data/characters/suspects.ts
export const suspects: CharacterInfo[] = [
  createCharacter({
    id: 'hope',
    name: '제퍼슨 호프',
    // ...
  }),
  // ...
];
```

### 병합하기

```typescript
// data/characterInfoData.ts
import { protagonists } from './characters/protagonists';
import { suspects } from './characters/suspects';
import { victims } from './characters/victims';

export const characterInfoList: CharacterInfo[] = [
  ...protagonists,
  ...suspects,
  ...victims
];
```

---

## 🔧 헬퍼 함수

### 캐릭터 생성

```typescript
import { createCharacter } from '../utils/characterHelpers';

const newCharacter = createCharacter({
  id: 'new_character',
  name: '새 캐릭터',
  nameColor: 'text-green-400',
  portraitUrl: 'https://...',
  role: '조력자',
  description: '설명...',
  traits: ['특징1', '특징2']
});
```

### 관계 생성

```typescript
import { createRelationship } from '../utils/characterHelpers';

const relationship = createRelationship(
  'character_id',
  '캐릭터 이름',
  '관계',
  '설명'
);
```

### 캐릭터 검색

```typescript
import { getCharacterById } from '../utils/characterHelpers';
import { characterInfoList } from '../data/characterInfoData';

const watson = getCharacterById(characterInfoList, 'watson');
```

### 필터링

```typescript
import { 
  getUnlockedCharacters, 
  getLockedCharacters 
} from '../utils/characterHelpers';

const unlocked = getUnlockedCharacters(
  characterInfoList, 
  ['watson', 'holmes']
);

const locked = getLockedCharacters(
  characterInfoList, 
  ['watson', 'holmes']
);
```

### 그룹화

```typescript
import { groupCharactersByRole } from '../utils/characterHelpers';

const groups = groupCharactersByRole(characterInfoList);
// {
//   '주인공': [...],
//   '용의자': [...],
//   '피해자': [...]
// }
```

### 통계

```typescript
import { getCharacterStats } from '../utils/characterHelpers';

const stats = getCharacterStats(
  characterInfoList,
  ['watson', 'holmes']
);

console.log(stats);
// {
//   total: 8,
//   unlocked: 2,
//   locked: 6,
//   progress: { percentage: 25, completed: false },
//   roleCount: 5,
//   totalRelationships: 15
// }
```

---

## ✅ 검증 도구

### 단일 캐릭터 검증

```typescript
import { validateCharacter } from '../utils/characterHelpers';

const result = validateCharacter(myCharacter);

if (!result.valid) {
  console.error('캐릭터 오류:', result.errors);
}
```

### 여러 캐릭터 검증

```typescript
import { validateCharacters } from '../utils/characterHelpers';

const result = validateCharacters(characterInfoList);

if (!result.valid) {
  console.error('캐릭터 오류:', result.errors);
  console.error('중복 ID:', result.duplicateIds);
}
```

### 관계 검증

```typescript
import { validateRelationships } from '../utils/characterHelpers';

const result = validateRelationships(characterInfoList);

if (!result.valid) {
  console.error('관계 오류:', result.errors);
}
```

---

## 🎨 컴포넌트 커스터마이징

### CharacterCard 재사용

```tsx
import { CharacterCard } from './components/character-gallery/CharacterCard';

function MyCustomList() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {characters.map(char => (
        <CharacterCard
          key={char.id}
          character={char}
          isUnlocked={true}
          onClick={() => handleClick(char)}
        />
      ))}
    </div>
  );
}
```

### CharacterDetailModal 단독 사용

```tsx
import { CharacterDetailModal } from './components/character-gallery/CharacterDetailModal';
import { useState } from 'react';

function MyComponent() {
  const [selectedChar, setSelectedChar] = useState(null);
  
  return (
    <>
      <button onClick={() => setSelectedChar(myCharacter)}>
        보기
      </button>
      
      {selectedChar && (
        <CharacterDetailModal
          character={selectedChar}
          unlockedCharacters={['watson', 'holmes']}
          onClose={() => setSelectedChar(null)}
        />
      )}
    </>
  );
}
```

---

## 📊 예제: 역할별 탭

```tsx
import { useState } from 'react';
import { groupCharactersByRole } from '../utils/characterHelpers';
import { CharacterCard } from '../components/character-gallery/CharacterCard';
import { characterInfoList } from '../data/characterInfoData';

function CharactersByRole({ unlockedCharacters }) {
  const [activeRole, setActiveRole] = useState('주인공');
  const groups = groupCharactersByRole(characterInfoList);
  
  return (
    <div>
      {/* 탭 */}
      <div className="flex gap-2 mb-4">
        {Object.keys(groups).map(role => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={activeRole === role ? 'active' : ''}
          >
            {role}
          </button>
        ))}
      </div>
      
      {/* 캐릭터 그리드 */}
      <div className="grid grid-cols-2 gap-4">
        {groups[activeRole].map(char => (
          <CharacterCard
            key={char.id}
            character={char}
            isUnlocked={unlockedCharacters.includes(char.id)}
            onClick={() => handleClick(char)}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## 🔄 마이그레이션 가이드

### 기존 코드 (변경 불필요)

```tsx
// 기존 코드는 그대로 동작함
<CharacterGallery unlockedCharacters={unlockedCharacters} />
```

### 새로운 기능 추가하려면

```tsx
// 1. characterInfoData.ts를 분리
// data/characters/protagonists.ts 생성
export const protagonists = [...];

// 2. characterInfoData.ts에서 import
import { protagonists } from './characters/protagonists';
export const characterInfoList = [...protagonists, ...];

// 3. 헬퍼 함수 활용
import { createCharacter } from '../utils/characterHelpers';
```

---

## 💡 팁

### 1. 이미지 URL 관리

```typescript
// 별도 파일로 관리
// data/characterImages.ts
export const characterImages = {
  watson: 'https://images.unsplash.com/photo-...',
  holmes: 'https://images.unsplash.com/photo-...',
};

// 사용
import { characterImages } from '../data/characterImages';

createCharacter({
  id: 'watson',
  portraitUrl: characterImages.watson,
  // ...
});
```

### 2. 색상 테마

```typescript
// data/characterColors.ts
export const characterColors = {
  protagonist: 'text-blue-400',
  detective: 'text-purple-400',
  suspect: 'text-orange-400',
  victim: 'text-red-400',
};
```

### 3. 대량 생성

```typescript
const characterData = [
  { id: 'char1', name: '캐릭터1', role: '역할1' },
  { id: 'char2', name: '캐릭터2', role: '역할2' },
];

const characters = characterData.map(data => 
  createCharacter({
    ...data,
    nameColor: 'text-blue-400',
    portraitUrl: getPortraitUrl(data.id),
    description: '...',
    traits: ['특징1', '특징2']
  })
);
```

---

## 🧪 테스트

```typescript
import { 
  validateCharacters, 
  validateRelationships 
} from '../utils/characterHelpers';
import { characterInfoList } from '../data/characterInfoData';

// 캐릭터 검증
const charValidation = validateCharacters(characterInfoList);
console.assert(charValidation.valid, '캐릭터 검증 실패');

// 관계 검증
const relValidation = validateRelationships(characterInfoList);
console.assert(relValidation.valid, '관계 검증 실패');

// 통계 확인
const stats = getCharacterStats(characterInfoList, []);
console.log('전체 캐릭터:', stats.total);
console.log('관계 수:', stats.totalRelationships);
```

---

## 📦 배포 전 체크리스트

```bash
✓ 모든 캐릭터 ID 중복 없음
✓ 모든 관계의 characterId가 실제 존재
✓ 이미지 URL이 모두 유효함
✓ nameColor가 "text-" 접두사 포함
✓ 모든 캐릭터에 role과 description 있음
✓ traits 배열이 비어있지 않음
```

---

**💬 질문이나 개선 사항이 있다면 이슈를 남겨주세요!**
