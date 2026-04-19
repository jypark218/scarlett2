/**
 * 시스템 노드 통합 파일
 * - 허브 시스템
 * - 용의자 선택 시스템
 * - 엔딩 시스템 (굿/배드)
 * - 자유 선택 루트
 * - 증거 획득 시스템
 * - 엘렌 등장 시스템
 */

import { hubSystem } from '../hub-system';
import { hubToSuspectsBridge } from '../hub-to-suspects-bridge';
import { suspectChoiceHub } from '../suspect-routes';
import { badEndings } from '../bad-endings';
import { goodEndings } from '../good-endings';
import { freeChoiceRoutes } from '../free-choice-routes';
import { evidenceAcquisitionImproved } from '../evidence-acquisition-improved';
import { ellenEncounterModular } from '../ellen/index';
import { remainingHubNodes } from '../remaining-hubs'; // 🆕 백작/여관/다락방 허브
import { ellenHubNodes } from '../ellen-hub-system'; // 🆕 엘렌 허브
import { finalDeductionNodes } from '../final-deduction-hub'; // 🆕 최종 추리 허브
import { timelineLockNodes } from '../timeline-lock-system'; // 🆕 타임라인 잠금

export const allSystemNodes = {
  ...hubSystem,
  ...hubToSuspectsBridge,
  ...suspectChoiceHub,
  ...freeChoiceRoutes,
  ...evidenceAcquisitionImproved,
  ...ellenEncounterModular,  // 모듈화된 엘렌 시스템 (첫 만남 파트만 분리, 나머지는 원본 사용)
  ...remainingHubNodes, // 🆕 추가
  ...ellenHubNodes, // 🆕 추가
  ...finalDeductionNodes, // 🆕 최종 추리 허브
  ...timelineLockNodes, // 🆕 타임라인 잠금
  ...goodEndings,
  ...badEndings,
};