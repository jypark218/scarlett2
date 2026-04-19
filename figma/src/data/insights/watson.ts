/**
 * ❤️ 왓슨 관련 통찰
 */

import { Insight } from '../../types/insight';

export const watsonInsights: Record<string, Insight> = {
  watson_empathy: {
    id: 'watson_empathy',
    name: '나의 공감',
    description: '이제 모든 이의 고통을 이해할 수 있어. 범인도, 피해자도... 모두 인간이야.',
    character: 'watson',
    icon: '❤️'
  },
  
  truth_beyond_justice: {
    id: 'truth_beyond_justice',
    name: '정의를 넘어선 진실',
    description: '때로는 법적 정의보다... 인간적 이해와 용서가 더 중요할지도 몰라. 진정한 해결은 처벌이 아니라 치유에 있는 거야.',
    character: 'watson',
    icon: '⚖️'
  }
};
