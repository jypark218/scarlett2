/**
 * 엘렌 등장 시스템 - 모듈화된 구조
 * 
 * 기존 ellen-encounter.ts (2070줄)를 논리적 단위로 분리:
 * - Part 1: 첫 만남 (ellen-first-encounter.ts)
 * - Part 2: 지하실 조사 (ellen-basement.ts) - 작성 예정
 * - Part 3: 호프와의 만남 (ellen-meets-hope.ts) - 작성 예정
 * - Part 4: 엔딩 (ellen-endings.ts) - 작성 예정
 * 
 * 현재는 기존 ellen-encounter.ts를 그대로 사용하고,
 * 수정이 필요한 부분만 fixes/ellen-encounter-fix.ts로 패치
 */

import { ellenFirstEncounter } from './ellen-first-encounter';

// 임시: 나머지 노드들은 원본 파일에서 가져옴
import { ellenEncounter as ellenOriginal } from '../ellen-encounter';

// Part 1만 덮어쓰고 나머지는 원본 사용
export const ellenEncounterModular = {
  ...ellenOriginal,
  ...ellenFirstEncounter  // Part 1 노드로 덮어쓰기 (특수 인코딩 문제 해결)
};
