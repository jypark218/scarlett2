/**
 * 심문 노드 통합
 * 모든 interrogation-related 노드를 여기서 export
 */

import { stangersonInitialNodes } from './stangerson-initial';
import { stangersonInvestigationNodes } from './stangerson-investigation';
import { stangersonLocationNodes } from './stangerson-location';
import { stangersonPastNodes } from './stangerson-past';
import { stangersonResolutionNodes } from './stangerson-resolution';
import { stangersonEvidenceNodes } from './stangerson-evidence';
import { hopeEvidenceNodes } from './hope-evidence';
import { ellenInterrogation } from '../ellen-interrogation';
import { hopeInterrogation } from '../hope-interrogation';

export const allInterrogationNodes = {
  ...stangersonInitialNodes,
  ...stangersonInvestigationNodes,
  ...stangersonLocationNodes,
  ...stangersonPastNodes,
  ...stangersonResolutionNodes,
  ...stangersonEvidenceNodes,
  ...hopeEvidenceNodes,
  ...ellenInterrogation,
  ...hopeInterrogation
};

// 개별 export도 제공
export {
  stangersonInitialNodes,
  stangersonInvestigationNodes,
  stangersonLocationNodes,
  stangersonPastNodes,
  stangersonResolutionNodes,
  stangersonEvidenceNodes,
  hopeEvidenceNodes,
  ellenInterrogation,
  hopeInterrogation
};