// 아이템 데이터 관리 헬퍼 함수들
import { ItemInfo, itemDataMap } from '../data/itemData';

/**
 * 아이템 생성 헬퍼
 */
export function createItem(params: {
  id: string;
  name: string;
  imageUrl: string;
  acquireMessage: string;
  description: string;
  summaryDescription: string;
}): ItemInfo {
  return {
    id: params.id,
    name: params.name,
    imageUrl: params.imageUrl,
    acquireMessage: params.acquireMessage,
    description: params.description,
    summaryDescription: params.summaryDescription
  };
}

/**
 * 모든 아이템 목록 반환
 */
export function getAllItems(): ItemInfo[] {
  return Object.values(itemDataMap);
}

/**
 * 아이템 ID로 검색
 */
export function getItemById(itemId: string): ItemInfo | undefined {
  return itemDataMap[itemId];
}

/**
 * 아이템 이름으로 검색
 */
export function getItemByName(name: string): ItemInfo | undefined {
  return getAllItems().find(item => item.name === name);
}

/**
 * 여러 아이템 ID로 검색
 */
export function getItemsByIds(itemIds: string[]): ItemInfo[] {
  return itemIds
    .map(id => getItemById(id))
    .filter((item): item is ItemInfo => item !== undefined);
}

/**
 * 아이템 보유 여부 확인
 */
export function hasItem(inventory: string[], itemId: string): boolean {
  return inventory.includes(itemId);
}

/**
 * 여러 아이템 보유 여부 확인 (AND 조건)
 */
export function hasAllItems(inventory: string[], itemIds: string[]): boolean {
  return itemIds.every(id => inventory.includes(id));
}

/**
 * 여러 아이템 중 하나라도 보유 (OR 조건)
 */
export function hasAnyItem(inventory: string[], itemIds: string[]): boolean {
  return itemIds.some(id => inventory.includes(id));
}

/**
 * 아이템 추가
 */
export function addItem(inventory: string[], itemId: string): string[] {
  if (inventory.includes(itemId)) {
    return inventory; // 이미 있으면 그대로
  }
  return [...inventory, itemId];
}

/**
 * 여러 아이템 추가
 */
export function addItems(inventory: string[], itemIds: string[]): string[] {
  const uniqueItems = new Set([...inventory, ...itemIds]);
  return Array.from(uniqueItems);
}

/**
 * 아이템 제거
 */
export function removeItem(inventory: string[], itemId: string): string[] {
  return inventory.filter(id => id !== itemId);
}

/**
 * 인벤토리 통계
 */
export function getInventoryStats(inventory: string[]) {
  const totalItems = getAllItems().length;
  const collectedCount = inventory.length;
  const percentage = totalItems > 0 ? (collectedCount / totalItems) * 100 : 0;
  
  return {
    total: totalItems,
    collected: collectedCount,
    remaining: totalItems - collectedCount,
    percentage,
    isComplete: percentage === 100
  };
}

/**
 * 아이템 검증
 */
export function validateItem(item: ItemInfo): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!item.id) errors.push('ID가 없습니다');
  if (!item.name) errors.push('이름이 없습니다');
  if (!item.imageUrl) errors.push('이미지 URL이 없습니다');
  if (!item.acquireMessage) errors.push('획득 메시지가 없습니다');
  if (!item.description) errors.push('설명이 없습니다');
  if (!item.summaryDescription) errors.push('요약 설명이 없습니다');

  // URL 형식 체크
  if (item.imageUrl && !item.imageUrl.startsWith('http')) {
    errors.push('올바른 이미지 URL이 아닙니다');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 여러 아이템 검증
 */
export function validateItems(items: ItemInfo[]): {
  valid: boolean;
  errors: Record<string, string[]>;
  duplicateIds: string[];
} {
  const errors: Record<string, string[]> = {};
  const ids = new Set<string>();
  const duplicateIds: string[] = [];

  for (const item of items) {
    // 개별 아이템 검증
    const validation = validateItem(item);
    if (!validation.valid) {
      errors[item.id] = validation.errors;
    }

    // 중복 ID 체크
    if (ids.has(item.id)) {
      duplicateIds.push(item.id);
    }
    ids.add(item.id);
  }

  return {
    valid: Object.keys(errors).length === 0 && duplicateIds.length === 0,
    errors,
    duplicateIds
  };
}

/**
 * 아이템 맵 검증
 */
export function validateItemMap(itemMap: Record<string, ItemInfo>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const items = Object.values(itemMap);
  
  // 모든 아이템 검증
  const itemValidation = validateItems(items);
  
  if (!itemValidation.valid) {
    errors.push(`${Object.keys(itemValidation.errors).length}개의 아이템에 오류가 있습니다`);
    
    Object.entries(itemValidation.errors).forEach(([id, itemErrors]) => {
      errors.push(`  - ${id}: ${itemErrors.join(', ')}`);
    });
  }
  
  if (itemValidation.duplicateIds.length > 0) {
    errors.push(`중복 ID: ${itemValidation.duplicateIds.join(', ')}`);
  }
  
  // ID와 키의 일치 확인
  Object.entries(itemMap).forEach(([key, item]) => {
    if (key !== item.id && key !== item.name) {
      errors.push(`키 불일치: "${key}" ≠ "${item.id}" (id) 또는 "${item.name}" (name)`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 뷰어에서 본 아이템 추가
 */
export function addViewedItem(viewedItems: string[], itemId: string): string[] {
  if (viewedItems.includes(itemId)) {
    return viewedItems;
  }
  return [...viewedItems, itemId];
}

/**
 * 아이템을 봤는지 확인
 */
export function hasViewedItem(viewedItems: string[], itemId: string): boolean {
  return viewedItems.includes(itemId);
}

/**
 * 미확인 아이템 개수
 */
export function getUnviewedItemCount(inventory: string[], viewedItems: string[]): number {
  return inventory.filter(itemId => !viewedItems.includes(itemId)).length;
}

/**
 * 미확인 아이템 목록
 */
export function getUnviewedItems(inventory: string[], viewedItems: string[]): ItemInfo[] {
  const unviewedIds = inventory.filter(itemId => !viewedItems.includes(itemId));
  return getItemsByIds(unviewedIds);
}
