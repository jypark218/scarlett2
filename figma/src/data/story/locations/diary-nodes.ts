/**
 * 백작의 일기 관련 노드
 */

import { StoryNode } from '../../../types/story';

export const diaryNodes: Record<string, StoryNode> = {
  acquire_safe_password: {
    id: 'acquire_safe_password',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    text: `일기 마지막 페이지의 숫자 **1861**을 머릿속에 새긴다.

홈즈가 말한다. \"1861년... 백작이 평생 잊지 못한 숫자인 것 같군요. 아마 이것이 금고 비밀번호일 겁니다.\"

이 숫자를 기억했다.`,
    choices: [
      { text: '금고로 간다', nextNode: 'examine_bookshelf' },
      { text: '서재를 더 조사한다', nextNode: 'study_general_investigation' }
    ]
  },

  show_diary_holmes: {
    id: 'show_diary_holmes',
    day: 1,
    timeOfDay: 'afternoon',
    text: '홈즈가 일기를 읽고 고개를 끄덕입니다. \"제퍼슨 페리에... 20년 전의 배신. 백작은 복수를 당하고 있는 것입니다. 서둘러 지하실을 찾아야 합니다!\"',
    choices: [
      { text: '금고를 열어본다', nextNode: 'safe' },
      { text: '2층을 조사한다', nextNode: 'upstairs' },
      { text: '현관으로 돌아간다', nextNode: 'main_entrance_return_study' }
    ]
  }
};