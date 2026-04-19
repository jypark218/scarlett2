// 캐릭터 데이터 관리 헬퍼 함수들
import { CharacterInfo } from '../data/characterInfoData';

/**
 * 캐릭터 생성 헬퍼
 */
export function createCharacter(params: {
  id: string;
  name: string;
  nameColor: string;
  portraitUrl: string;
  role: string;
  description: string;
  traits: string[];
  relationships?: Array<{
    characterId: string;
    characterName: string;
    relation: string;
    description: string;
  }>;
}): CharacterInfo {
  return {
    id: params.id,
    name: params.name,
    nameColor: params.nameColor,
    portraitUrl: params.portraitUrl,
    role: params.role,
    description: params.description,
    traits: params.traits,
    relationships: params.relationships
  };
}

/**
 * 관계 생성 헬퍼
 */
export function createRelationship(
  characterId: string,
  characterName: string,
  relation: string,
  description: string
) {
  return {
    characterId,
    characterName,
    relation,
    description
  };
}

/**
 * 캐릭터 ID로 검색
 */
export function getCharacterById(
  characters: CharacterInfo[],
  id: string
): CharacterInfo | undefined {
  return characters.find(c => c.id === id);
}

/**
 * 언락된 캐릭터만 필터링
 */
export function getUnlockedCharacters(
  characters: CharacterInfo[],
  unlockedIds: string[]
): CharacterInfo[] {
  return characters.filter(c => unlockedIds.includes(c.id));
}

/**
 * 잠긴 캐릭터만 필터링
 */
export function getLockedCharacters(
  characters: CharacterInfo[],
  unlockedIds: string[]
): CharacterInfo[] {
  return characters.filter(c => !unlockedIds.includes(c.id));
}

/**
 * 역할별 캐릭터 그룹화
 */
export function groupCharactersByRole(
  characters: CharacterInfo[]
): Record<string, CharacterInfo[]> {
  return characters.reduce((acc, character) => {
    const role = character.role;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(character);
    return acc;
  }, {} as Record<string, CharacterInfo[]>);
}

/**
 * 캐릭터 진행도 계산
 */
export function calculateProgress(
  totalCharacters: number,
  unlockedCount: number
): {
  percentage: number;
  completed: boolean;
} {
  const percentage = (unlockedCount / totalCharacters) * 100;
  return {
    percentage,
    completed: percentage === 100
  };
}

/**
 * 캐릭터 검증
 */
export function validateCharacter(character: CharacterInfo): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!character.id) errors.push('ID가 없습니다');
  if (!character.name) errors.push('이름이 없습니다');
  if (!character.role) errors.push('역할이 없습니다');
  if (!character.description) errors.push('설명이 없습니다');
  if (!character.traits || character.traits.length === 0) {
    errors.push('특징이 없습니다');
  }

  // URL 형식 간단 체크
  if (character.portraitUrl && !character.portraitUrl.startsWith('http')) {
    errors.push('올바른 이미지 URL이 아닙니다');
  }

  // nameColor 형식 체크
  if (character.nameColor && !character.nameColor.startsWith('text-')) {
    errors.push('nameColor는 "text-" 접두사가 필요합니다');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 여러 캐릭터 검증
 */
export function validateCharacters(characters: CharacterInfo[]): {
  valid: boolean;
  errors: Record<string, string[]>;
  duplicateIds: string[];
} {
  const errors: Record<string, string[]> = {};
  const ids = new Set<string>();
  const duplicateIds: string[] = [];

  for (const character of characters) {
    // 개별 캐릭터 검증
    const validation = validateCharacter(character);
    if (!validation.valid) {
      errors[character.id] = validation.errors;
    }

    // 중복 ID 체크
    if (ids.has(character.id)) {
      duplicateIds.push(character.id);
    }
    ids.add(character.id);
  }

  return {
    valid: Object.keys(errors).length === 0 && duplicateIds.length === 0,
    errors,
    duplicateIds
  };
}

/**
 * 관계 데이터 정합성 체크
 */
export function validateRelationships(characters: CharacterInfo[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const characterIds = new Set(characters.map(c => c.id));

  for (const character of characters) {
    if (!character.relationships) continue;

    for (const rel of character.relationships) {
      // 관계된 캐릭터가 실제로 존재하는지 확인
      if (!characterIds.has(rel.characterId)) {
        errors.push(
          `"${character.name}"의 관계에서 존재하지 않는 캐릭터 ID "${rel.characterId}"를 참조합니다`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 캐릭터 통계
 */
export function getCharacterStats(
  characters: CharacterInfo[],
  unlockedIds: string[]
) {
  const unlockedCount = unlockedIds.length;
  const lockedCount = characters.length - unlockedCount;
  const roles = groupCharactersByRole(characters);
  const totalRelationships = characters.reduce(
    (sum, c) => sum + (c.relationships?.length || 0),
    0
  );

  return {
    total: characters.length,
    unlocked: unlockedCount,
    locked: lockedCount,
    progress: calculateProgress(characters.length, unlockedCount),
    roleCount: Object.keys(roles).length,
    totalRelationships
  };
}
