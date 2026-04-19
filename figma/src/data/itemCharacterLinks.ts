// 아이템과 캐릭터의 연결 관계 정의
// 특정 아이템을 획득하면 관련 캐릭터의 정보가 언락됨

export interface ItemCharacterLink {
  itemId: string;
  characterIds: string[];
  description: string; // 왜 이 아이템이 해당 캐릭터와 연결되는지
}

export const itemCharacterLinks: ItemCharacterLink[] = [
  {
    itemId: 'diary',
    characterIds: ['count', 'lucy', 'hope'],
    description: '백작의 일기에서 모로 백작과 루시 루이자, 제퍼슨 호프의 과거를 알게 됨'
  },
  {
    itemId: '제퍼슨의 편지',
    characterIds: ['hope', 'lucy'],
    description: '제퍼슨 호프의 편지에서 호프와 딸 루시의 이야기를 알게 됨'
  },
  {
    itemId: '지하실 열쇠',
    characterIds: ['count'],
    description: '지하실 열쇠로 백작의 행방을 추리할 수 있게 됨'
  },
  {
    itemId: '루시의 반지',
    characterIds: ['lucy', 'hope'],
    description: 'L.L 각인 반지로 루시 루이자와 호프의 관계를 알게 됨'
  },
  {
    itemId: 'locket',
    characterIds: ['lucy', 'hope'],
    description: '루시의 로켓에서 호프의 20년간의 복수 동기를 알게 됨'
  },
  {
    itemId: 'ledger',
    characterIds: ['count', 'stangerson', 'drebber'],
    description: '1861년 장부에서 백작, 스탠거슨, 드레버의 사기 공모를 알게 됨'
  },
  {
    itemId: 'will',
    characterIds: ['count', 'stangerson', 'drebber'],
    description: '유언장에서 스탠거슨이 유일한 상속자임을 알게 되고, 드레버의 질투 동기를 알게 됨'
  },
  {
    itemId: 'drawer_key',
    characterIds: ['ellen'],
    description: '장미 문양의 서랍 열쇠에서 여성의 존재를 암시받음'
  },
  {
    itemId: 'ellen_will',
    characterIds: ['ellen', 'count', 'lucy'],
    description: '엘렌의 유언장에서 루시의 딸이자 백작의 양딸인 엘렌의 존재를 알게 됨'
  }
];

/**
 * 아이템 획득 시 언락되는 캐릭터 목록 반환
 */
export function getUnlockedCharactersByItem(itemId: string): string[] {
  const link = itemCharacterLinks.find(link => link.itemId === itemId);
  return link ? link.characterIds : [];
}

/**
 * 여러 아이템으로 언락되는 모든 캐릭터 반환
 */
export function getUnlockedCharactersByItems(itemIds: string[]): string[] {
  const allCharacters = itemIds.flatMap(itemId => 
    getUnlockedCharactersByItem(itemId)
  );
  
  // 중복 제거
  return Array.from(new Set(allCharacters));
}

/**
 * 특정 캐릭터를 언락할 수 있는 아이템 목록 반환
 */
export function getItemsForCharacter(characterId: string): string[] {
  return itemCharacterLinks
    .filter(link => link.characterIds.includes(characterId))
    .map(link => link.itemId);
}

/**
 * 캐릭터가 언락되었는지 확인 (직접 대면 또는 아이템으로)
 */
export function isCharacterUnlocked(
  characterId: string,
  unlockedCharacters: string[],
  inventory: string[]
): boolean {
  // 직접 대면으로 언락된 경우
  if (unlockedCharacters.includes(characterId)) {
    return true;
  }
  
  // 아이템으로 언락 가능한 경우
  const unlockedByItems = getUnlockedCharactersByItems(inventory);
  return unlockedByItems.includes(characterId);
}

/**
 * 현재 언락 가능한 모든 캐릭터 반환 (직접 대면 + 아이템)
 */
export function getAllUnlockedCharacters(
  unlockedCharacters: string[],
  inventory: string[]
): string[] {
  const itemUnlocked = getUnlockedCharactersByItems(inventory);
  const allUnlocked = [...unlockedCharacters, ...itemUnlocked];
  
  // 중복 제거
  return Array.from(new Set(allUnlocked));
}