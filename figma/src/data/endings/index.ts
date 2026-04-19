/**
 * 엔딩 데이터 통합
 * 모든 엔딩을 타입별로 가져와서 통합
 */

import { EndingInfo } from '../../types/ending';
import { goodEndings } from './good';
import { badEndings } from './bad';
import { neutralEndings } from './neutral';

/**
 * 전체 엔딩 목록 (타입별 통합)
 */
export const endingList: EndingInfo[] = [
  ...goodEndings,    // ✅ 굿 엔딩 (4개)
  ...badEndings,     // ❌ 배드 엔딩 (7개)
  ...neutralEndings  // 🌫️ 중립 엔딩 (4개)
];

/**
 * 타입별 엔딩 접근 (필요시 사용)
 */
export { goodEndings } from './good';
export { badEndings } from './bad';
export { neutralEndings } from './neutral';

/**
 * 엔딩 ID로 엔딩 정보 찾기
 */
export function getEndingById(id: string): EndingInfo | undefined {
  return endingList.find(ending => ending.id === id);
}

/**
 * 엔딩 번호로 엔딩 정보 찾기
 */
export function getEndingByNumber(number: number): EndingInfo | undefined {
  return endingList.find(ending => ending.number === number);
}

/**
 * 타입별 엔딩 필터링
 */
export function getEndingsByType(type: 'good' | 'bad' | 'neutral'): EndingInfo[] {
  return endingList.filter(ending => ending.type === type);
}

/**
 * 용의자별 엔딩 필터링
 */
export function getEndingsBySuspect(suspect: 'hope' | 'stangerson' | 'drebber'): EndingInfo[] {
  return endingList.filter(ending => ending.suspect === suspect);
}
