/**
 * 엔딩 데이터 (하위 호환성 유지)
 * 
 * ⚠️ 이 파일은 하위 호환성을 위해 유지됩니다.
 * 실제 데이터는 /data/endings/ 폴더로 분리되었습니다.
 * 
 * 새 코드에서는 다음과 같이 사용하세요:
 * import { endingList, getEndingById } from '../data/endings';
 */

// 타입 re-export
export type { EndingInfo } from '../types/ending';

// 데이터 re-export
export { 
  endingList,
  goodEndings,
  badEndings,
  neutralEndings,
  getEndingById,
  getEndingByNumber,
  getEndingsByType,
  getEndingsBySuspect
} from './endings/index';