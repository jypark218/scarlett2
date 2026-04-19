/**
 * 배경 시스템 통합 export
 * (하위 호환성 유지를 위한 리엑스포트)
 */

// 타입
export type { BackgroundImage } from '../types/dialogue';

// 배경 데이터
export { backgrounds } from './backgrounds';

// 배경 매칭 함수
export { getBackgroundForNode, getLocationFromNode } from '../utils/background/matcher';

// 배경 헬퍼 함수
export { getLocationName } from '../utils/background/helpers';
