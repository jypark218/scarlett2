/**
 * 💔 제퍼슨 호프 관련 통찰
 */

import { Insight } from '../../types/insight';

export const hopeInsights: Record<string, Insight> = {
  hope_grief: {
    id: 'hope_grief',
    name: '호프의 슬픔',
    description: '이제 알겠어. 제퍼슨 호프는 범인이 아니라... 복수자였다. 사랑하는 사람을 잃은 슬픔에 빠진 남자였을 뿐이야.',
    character: 'hope',
    icon: '💔'
  },
  
  hope_love: {
    id: 'hope_love',
    name: '호프의 사랑',
    description: '루시 페리어... 호프가 평생을 바쳐 사랑한 여인. 그의 모든 행동은 그녀를 향한 사랑에서 비롯된 거였어.',
    character: 'hope',
    icon: '🌹'
  }
};
