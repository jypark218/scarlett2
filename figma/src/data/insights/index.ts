/**
 * 통찰 데이터 통합
 * 모든 통찰을 캐릭터별로 가져와서 통합
 */

import { Insight } from '../../types/insight';
import { hopeInsights } from './hope';
import { stangersonInsights } from './stangerson';
import { drebberInsights } from './drebber';
import { watsonInsights } from './watson';

/**
 * 전체 통찰 맵 (캐릭터별 통합)
 */
export const insightsData: Record<string, Insight> = {
  ...hopeInsights,        // 💔 호프
  ...stangersonInsights,  // 😰 스탠거슨
  ...drebberInsights,     // 😖 드레버
  ...watsonInsights       // ❤️ 왓슨
};

/**
 * 진엔딩 필수 통찰
 */
export { TRUE_ENDING_REQUIRED_INSIGHTS } from './constants';

/**
 * 캐릭터별 통찰 접근 (필요시 사용)
 */
export { hopeInsights } from './hope';
export { stangersonInsights } from './stangerson';
export { drebberInsights } from './drebber';
export { watsonInsights } from './watson';
