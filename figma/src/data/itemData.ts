/**
 * 아이템 데이터 (하위 호환성 유지)
 * 
 * ⚠️ 이 파일은 하위 호환성을 위해 유지됩니다.
 * 실제 데이터는 /data/items/ 폴더로 분리되었습니다.
 * 
 * 새 코드에서는 다음과 같이 사용하세요:
 * import { itemDataMap } from '../data/items';
 */

// 타입 re-export
export type { ItemInfo } from '../types/item';

// 데이터 re-export
export { itemDataMap, getAllItems } from './items/index';