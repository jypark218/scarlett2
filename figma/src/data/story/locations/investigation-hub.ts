/**
 * 용의자 조사 허브
 */

import { StoryNode } from '../../../types/story';

export const investigationHubNodes: Record<string, StoryNode> = {
  continue_investigation_1: {
    id: 'continue_investigation_1',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'mansion_entrance',
    text: '스탠거슨과의 대화를 마치고 홈즈가 말한다. \\\"왓슨, 다른 곳도 조사해야 해.\\\"\\\\\\\\n\\\\\\\\n현관 홀로 돌아왔다. 다음 조사 방향을 선택해야 한다.',
    choices: [
      { 
        text: '2층으로 올라간다', 
        nextNode: 'upstairs',
        requirement: { visitedNode: 'stangerson_initial' } // 스탠거슨과 대화 후에만 (드레버 존재를 알게 됨)
      },
      { text: '서재를 더 조사한다', nextNode: 'study_room' },
      { text: '뒷뜰을 조사한다', nextNode: 'back_entrance' }
    ]
  },

  continue_investigation_2: {
    id: 'continue_investigation_2',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'dark_corridor',
    text: '드레버와의 대화를 마치고 홈즈가 말한다. \"왓슨, 아직 조사할 곳이 많아. 침실도 자세히 살펴봐야 하고...\"\\\\n\\\\n복도로 돌아왔다. 다음 조사 방향을 선택해야 한다.',
    choices: [
      { text: '드레버에게 다시 질문한다', nextNode: 'meet_drebber' },
      { text: '침실을 조사한다', nextNode: 'bedroom' },
      { text: '1층으로 내려간다', nextNode: 'main_entrance_return_upstairs' },
      { text: '근처 여관을 방문한다', nextNode: 'inn_entrance' }
    ]
  }
};