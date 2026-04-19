/**
 * 배경 관련 헬퍼 함수
 */

import { backgrounds } from '../../data/backgrounds';
import { getLocationFromNode } from './matcher';

/**
 * 현재 위치의 한국어 이름 가져오기
 */
export function getLocationName(nodeId: string): string {
  const locationId = getLocationFromNode(nodeId);
  const background = backgrounds[locationId] || backgrounds.default;
  return background.name;
}
