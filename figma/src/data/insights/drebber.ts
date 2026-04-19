/**
 * 😖 이녹 드레버 관련 통찰
 */

import { Insight } from '../../types/insight';

export const drebberInsights: Record<string, Insight> = {
  drebber_guilt: {
    id: 'drebber_guilt',
    name: '드레버의 죄책감',
    description: '이노크 드레버는 매일 밤 루시의 울음소리를 들었다고 했어. 그는 이미... 스스로를 벌하고 있었던 거야.',
    character: 'drebber',
    icon: '😖'
  },
  
  drebber_remorse: {
    id: 'drebber_remorse',
    name: '드레버의 참회',
    description: '드레버는 자신이 저지른 일을 후회하고 있었어. 복수할 가치가 있는 사람과, 이미 벌을 받고 있는 사람은... 다른 법이야.',
    character: 'drebber',
    icon: '🙏'
  }
};
