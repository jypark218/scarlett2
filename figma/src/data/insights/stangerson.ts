/**
 * 😰 조셉 스탠거슨 관련 통찰
 */

import { Insight } from '../../types/insight';

export const stangersonInsights: Record<string, Insight> = {
  stangerson_fear: {
    id: 'stangerson_fear',
    name: '스탠거슨의 공포',
    description: '조셉 스탠거슨... 그는 죽기 전까지 두려움에 떨고 있었어. 자신이 저지른 죄를 알고 있었고, 대가를 치를 것임을 예감하고 있었던 거야.',
    character: 'stangerson',
    icon: '😰'
  },
  
  stangerson_guilt: {
    id: 'stangerson_guilt',
    name: '스탠거슨의 죄책감',
    description: '스탠거슨은 드레버를 따라 죄를 지었지만... 진심으로 후회하고 있었어. 하지만 너무 늦었던 거지.',
    character: 'stangerson',
    icon: '😔'
  }
};
