/**
 * 캐릭터별 상세 노드 통합 파일
 * - 호프 초반 만남
 * - 드레버 상세 대화
 * - 스탠거슨 심문
 * - 2층 복도
 * - 1일차 오후 (서재 등)
 * - 우물에서 호프 만남
 * - 참회실 (우물 경유)
 * - 엘런 발견
 */

import { hopeEarlyNodes } from '../hopeEarlyNodes';
import { drebberNodes } from '../drebberNodes';
import { upstairsNode } from '../upstairsNode';
import { stangersonInterrogation } from '../stangerson-interrogation';
import { day1AfternoonNodes } from '../day1-afternoon';
import { wellHopeEncounterNodes } from '../well-hope-encounter';
import { confessionRoomNodes } from '../confession-room';
import { ellenDiscoveryNodes } from './ellen-discovery';

export const allCharacterNodes = {
  ...day1AfternoonNodes,
  ...hopeEarlyNodes,
  ...upstairsNode,
  ...drebberNodes,
  ...stangersonInterrogation,
  ...wellHopeEncounterNodes,
  ...confessionRoomNodes,
  ...ellenDiscoveryNodes,
};