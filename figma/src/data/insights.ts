/**
 * 통찰 데이터 (하위 호환성 유지)
 * 
 * ⚠️ 이 파일은 하위 호환성을 위해 유지됩니다.
 * 실제 데이터는 /data/insights/ 폴더로 분리되었습니다.
 * 
 * 새 코드에서는 다음과 같이 사용하세요:
 * import { insightsData, TRUE_ENDING_REQUIRED_INSIGHTS } from '../data/insights';
 */

// 타입 re-export
export type { Insight } from '../types/insight';

// 데이터 re-export
export { 
  insightsData,
  TRUE_ENDING_REQUIRED_INSIGHTS 
} from './insights/index';