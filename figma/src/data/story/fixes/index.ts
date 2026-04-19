/**
 * 스토리 수정사항 통합 파일
 * - 용의자 배경 서사
 * - 스토리 수정사항
 * - 지하실 루트 수정
 * - 최종 수정사항
 * - 누락된 노드들
 * - 서스펜스 이벤트들
 * - 엘렌 누락 노드들
 * - 지하실 클라이맥스 "진실의 무게"
 * - 엘렌의 각성 "The Awakening"
 * - 노드 연결 수정 (Gemini 피드백)
 */

import { suspectsBackstory } from '../suspects-backstory';
import { storyFixes } from '../fixes';
import { basementRouteFix } from '../basement-route-fix';
import { criticalFixes } from '../critical-fixes';
import { basementSceneExtended } from '../basement-scene-extended';
import { basementInterrogationNodes } from '../basement-interrogation-nodes';
import { missingNodes } from './missing-nodes';
import { suspenseEventNodes } from '../locations/suspense-events';
import { ellenMissingNodes } from '../ellen-missing-nodes';
import { basementClimaxNodes } from '../basement-climax';
import { ellenAwakeningNodes } from '../ellen-awakening';
import { nodeConnectionsFix } from '../node-connections-fix';

export const allStoryFixes = {
  ...suspectsBackstory,
  ...storyFixes,
  ...basementRouteFix,
  ...criticalFixes,
  ...basementSceneExtended,
  ...basementInterrogationNodes,
  ...missingNodes,
  ...suspenseEventNodes,
  ...ellenMissingNodes,
  ...basementClimaxNodes,
  ...ellenAwakeningNodes,
  ...nodeConnectionsFix, // ✅ 추가: Gemini 피드백 기반 노드 연결 수정
};