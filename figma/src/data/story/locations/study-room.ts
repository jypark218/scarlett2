/**
 * 서재 관련 노드
 * 스탠거슨과의 초기 대면 및 서재 탐색
 */

import { StoryNode } from '../../../types/story';

export const studyRoomNodes: Record<string, StoryNode> = {
  // ========== meet_stangerson은 사용되지 않음 - discover_stangerson을 사용하세요 ==========
  
  // ========== 서재 조사 (미사용 노드들 삭제) ==========
  search_study_more: {
    id: 'search_study_more',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    text: '스탠거슨의 증언을 메모한 후, 서재를 둘러본다.\\n\\n벽면에는 책장이 가득하고, 책상 위에는 서류들이 흩어져 있다.\\n\\n홈즈가 말한다. \"왓슨, 우선 서재를 자세히 살펴보자. 그리고 다른 장소들도 조사해야 해.\"',
    choices: [
      { text: '책상을 조사한다', nextNode: 'examine_desk', hideIfHasItem: '금고 비밀번호' },
      { text: '책장을 살펴본다', nextNode: 'examine_bookshelf' },
      { text: '2층으로 올라간다', nextNode: 'upstairs' },
      { text: '뒷뜰로 나간다', nextNode: 'back_entrance' },
      { text: '현관으로 돌아간다', nextNode: 'main_entrance_return_study' }
    ]
  },

  examine_desk: {
    id: 'examine_desk',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    speaker: 'watson',
    conditionalText: [
      {
        // 스탠거슨을 이미 발견한 경우 - 그가 지켜보는 중
        condition: { visitedNode: 'discover_stangerson' },
        text: `책상을 살펴본다.

오래된 편지들, 장부, 메모들이 흩어져 있다.

스탠거슨이 긴장한 눈빛으로 우리를 지켜본다.

홈즈가 책상 서랍을 열려고 하자... 스탠거슨이 한 걸음 다가온다.

[스탠거슨]: 저, 저기... 그건...

[홈즈]: 조사가 필요합니다, 스탠거슨 씨.

서랍을 열자 낡은 가죽 일기장이 놓여있다.

스탠거슨의 얼굴이 창백해진다.`
      }
    ],
    text: `책상을 살펴본다.

오래된 편지들, 장부, 메모들이 흩어져 있다.

홈즈가 책상 서랍을 열어본다.

[홈즈]: 왓슨, 여기 일기장이 있네.

노화된 가죽 표지의 일기장이 서랍 안에 놓여있다.`,
    choices: [
      { text: '📖 [일기장을 읽는다]', nextNode: 'hope_diary_discovery', hideIfVisitedNode: 'hope_diary_discovery' },
      { text: '다른 곳을 조사한다', nextNode: 'study_general_investigation' }
    ]
  },

  examine_bookshelf: {
    id: 'examine_bookshelf',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    speaker: 'watson',
    conditionalText: [
      {
        // 이미 금고를 연 경우
        condition: (context) => context.visitedNodes.includes('safe_opened'),
        text: `책장을 다시 살펴본다.

열린 금고가 보인다. 이미 조사를 마쳤다.

홈즈가 말한다. "금고는 이미 확인했어. 다른 곳을 조사하자."`
      }
    ],
    text: '책장을 살펴본다.\\\\n\\\\n오래된 책들... 법률서적, 역사서...\\\\n\\\\n그런데... 벽면에 작은 금고가 숨겨져 있다!\\\\n\\\\n홈즈가 다가온다. \"왓슨! 금고를 발견했군. 비밀번호가 필요한 것 같아.\"',
    choices: [
      { text: '🔑 [비밀번호를 입력한다]', nextNode: 'safe_opened', puzzleType: 'safe', requiredItem: '금고 비밀번호', hideIfVisitedNode: 'safe_opened' },
      { text: '금고를 열어본다 (추측)', nextNode: 'safe_opened', puzzleType: 'safe', hideIfVisitedNode: 'safe_opened' },
      { text: '일단 다른 것을 조사한다', nextNode: 'study_general_investigation' }
    ]
  },

  safe_opened: {
    id: 'safe_opened',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    speaker: 'watson',
    text: '금고가 열렸다! 안에는 여러 물건들이 들어있다.\\n\\n홈즈가 안을 살피며 말한다. "여기... 청동 열쇠가 하나 있군. 그리고..."\\n\\n그가 먼지투이의 낡은 장부를 꺼낸다.',
    choices: [
      { text: '📝 장부를 살펴본다', nextNode: 'acquire_ledger_safe', hideIfHasItem: 'ledger' },
      { text: '🔑 청동 열쇠를 가져간다', nextNode: 'acquire_basement_key_safe', hideIfHasItem: '지하실 열쇠' },
      { text: '다른 것을 조사한다', nextNode: 'study_general_investigation' }
    ]
  },

  // 📝 장부 획득
  acquire_ledger_safe: {
    id: 'acquire_ledger_safe',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    speaker: 'watson',
    text: '오래된 장부를 집어든다.\n\n1861년... 독일 여행... 거액의 지출... "루시에게"라는 메모가 보인다.\n\n홈즈가 말한다. "루시... 백작의 과거와 관련된 인물일 거야."',
    choices: [
      { text: '📝 [장부를 증거로 챙긴다]', nextNode: 'safe_check_remaining', item: 'ledger' }
    ]
  },

  // 🔑 지하실 열쇠 획득
  acquire_basement_key_safe: {
    id: 'acquire_basement_key_safe',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    conditionalText: [
      {
        // 지하실의 존재를 이미 아는 경우
        condition: (context) => 
          context.visitedNodes.includes('find_basement') || 
          context.visitedNodes.includes('chase_hope_to_basement') ||
          context.visitedNodes.includes('kitchen_investigation') ||
          context.visitedNodes.includes('basement_entrance'),
        text: '묵직한 청동 열쇠를 발견했다.\n\n홈즈가 말한다. "바로 이거야! 부엌에서 봤던 지하실 문을 열 수 있는 열쇠다!"'
      }
    ],
    text: '묵직한 청동 열쇠를 발견했다.\n\n홈즈가 열쇠를 살펴본다. "오래된 열쇠군... 이 저택 어딘가에 열쇠를 사용할 수 있는 방이 있을 거야."',
    choices: [
      { text: '🔑 [청동 열쇠를 챙긴다]', nextNode: 'safe_check_remaining', item: '지하실 열쇠' }
    ]
  },

  // 금고 재확인 (남은 아이템 체크)
  safe_check_remaining: {
    id: 'safe_check_remaining',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    speaker: 'watson',
    conditionalText: [
      {
        // 둘 다 획득한 경우
        condition: (context) => 
          context.inventory?.includes('ledger') && 
          context.inventory?.includes('지하실 열쇠'),
        text: '금고를 다시 살펴본다.\n\n이미 모든 것을 챙겼다. 더 이상 남은 것은 없다.\n\n홈즈가 말한다. "좋아, 이제 다른 곳을 조사하자."'
      },
      {
        // 장부만 획득한 경우
        condition: (context) => 
          context.inventory?.includes('ledger') && 
          !context.inventory?.includes('지하실 열쇠'),
        text: '금고를 다시 살펴본다.\n\n아직 청동 열쇠가 남아있다.'
      },
      {
        // 열쇠만 획득한 경우
        condition: (context) => 
          !context.inventory?.includes('ledger') && 
          context.inventory?.includes('지하실 열쇠'),
        text: '금고를 다시 살펴본다.\n\n아직 낡은 장부가 남아있다.'
      }
    ],
    text: '금고 안을 다시 살펴본다.\n\n여전히 장부와 청동 열쇠가 남아있다.',
    choices: [
      { text: '📝 장부를 살펴본다', nextNode: 'acquire_ledger_safe', hideIfHasItem: 'ledger' },
      { text: '🔑 청동 열쇠를 가져간다', nextNode: 'acquire_basement_key_safe', hideIfHasItem: '지하실 열쇠' },
      { text: '서재를 더 둘러본다', nextNode: 'study_general_investigation' }
    ]
  },

  examine_ledger_safe: {
    id: 'examine_ledger_safe',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    speaker: 'watson',
    text: '오래된 장부를 넘겨본다.\\n\\n1861년... 독일 여행... 거액의 지출... "루시에게"라는 메모가 보인다.\\n\\n홈즈가 말한다. "루시... 백작의 과거와 관련된 인물일 거야."',
    choices: [
      { text: '🔑 청동 열쇠를 가져간다', nextNode: 'got_basement_key', item: '지하실 열쇠', hideIfHasItem: '지하실 열쇠' },
      { text: '서재를 더 둘러본다', nextNode: 'study_general_investigation' }
    ]
  },

  got_basement_key: {
    id: 'got_basement_key',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: '묵직한 쇠 열쇠를 주머니에 넣는다.\\n\\n홈즈가 말한다. "이제 지하실을 조사할 수 있어. 뒷뜰에 지하실 입구가 있을 거야."',
    choices: [
      { text: '책상을 조사한다', nextNode: 'examine_desk', hideIfHasItem: '금고 비밀번호' },
      { text: '2층으로 올라간다', nextNode: 'upstairs' },
      { text: '뒷뜰로 나간다', nextNode: 'back_entrance' },
      { text: '현관으로 돌아간다', nextNode: 'main_entrance_return_study' }
    ]
  },

  // ========== 일반 서재 조사 (스탠거슨 대화 없이) ==========
  study_general_investigation: {
    id: 'study_general_investigation',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    speaker: 'watson',
    text: '서재를 둘러본다.\n\n벽면에는 책장이 가득하고, 책상 위에는 서류들이 흩어져 있다.\n\n홈즈가 말한다. "왓슨, 서재를 자세히 살펴보자. 그리고 다른 장소들도 조사해야 해."',
    choices: [
      { text: '책상을 조사한다', nextNode: 'examine_desk', hideIfHasItem: '금고 비밀번호' },
      { text: '책장을 살펴본다', nextNode: 'examine_bookshelf' },
      { text: '2층으로 올라간다', nextNode: 'upstairs' },
      { text: '뒷뜰로 나간다', nextNode: 'back_entrance' },
      { text: '현관으로 돌아간다', nextNode: 'main_entrance_return_study' }
    ]
  }
};