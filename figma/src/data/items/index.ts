/**
 * 아이템 데이터 통합
 * 모든 아이템을 카테고리별로 가져와서 통합
 */

import { ItemInfo } from '../../types/item';
import { documentItems } from './documents';
import { keyItems } from './keys';
import { personalItems } from './personal';

/**
 * 전체 아이템 맵 (카테고리별 통합)
 */
export const itemDataMap: Record<string, ItemInfo> = {
  ...documentItems,  // 📜 문서 증거
  ...keyItems,       // 🔑 열쇠 & 비밀번호
  ...personalItems   // 💍 개인 소지품
};

/**
 * 모든 아이템 목록 반환
 */
export function getAllItems(): ItemInfo[] {
  return Object.values(itemDataMap);
}

/**
 * 카테고리별 아이템 접근 (필요시 사용)
 */
export { documentItems } from './documents';
export { keyItems } from './keys';
export { personalItems } from './personal';
