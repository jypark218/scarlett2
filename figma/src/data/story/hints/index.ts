/**
 * 힌트 노드 통합 파일
 */

import { holmesHints } from './holmes-hints';
import { deductionHints } from './deduction-hints';
import { stangersonHints } from './stangerson-hints';
import { drebberHints } from './drebber-hints';

export const allHintNodes = {
  ...holmesHints,
  ...deductionHints,
  ...stangersonHints,
  ...drebberHints,
};
