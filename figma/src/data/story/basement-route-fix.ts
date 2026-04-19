// 지하실 진입 루트 통합 수정
// 터널/옷장/금고를 모두 조사 → 금고를 열어 지하실 열쇠 획득 → 지하실 진입

import { StoryNode } from '../../types/story';

export const basementRouteFix: Record<string, StoryNode> = {
  // ========== 터널 루트 수정 ==========
  // 터널은 막혀있음 - 힌트만 제공
  tunnel: {
    id: 'tunnel',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    speaker: 'watson',
    text: `터널은 저택 지하로 이어진다. 축축한 벽을 따라 걷자 무거운 철문이 나타난다.

벽에는 누군가가 긁어놓은 흔적이 있다. 손톱 자국... 깊게 파여 있다. 

홈즈가 벽을 만지며 속삭인다. "피가 묻어있어. 누군가 필사적으로 탈출하려 했던 것 같아."

철문은 안쪽에서 잠겨있어 열리지 않는다.`,
    choices: [
      { text: '철문을 조사한다', nextNode: 'examine_tunnel_door' },
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  examine_tunnel_door: {
    id: 'examine_tunnel_door',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    speaker: 'watson',
    text: `철문을 자세히 살핀다. 안쪽에서 잠겨있어 밖에서는 열 수 없다.

바닥에는 밧줄 조각과 찢어진 천 조각이 있다. 누군가를 끌고 온 흔적이다.

홈즈가 말한다. "이 터널은 범인이 사용했지만, 우리는 다른 경로를 찾아야 해. 저택 안에 지하실로 가는 길이 있을 거야."`,
    choices: [
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  // ========== 금고 루트 수정 ==========
  // 금고를 열면 지하실 열쇠 획득
  safe_open_basement_key: {
    id: 'safe_open_basement_key',
    day: 1,
    timeOfDay: 'afternoon',
    text: `금고가 열린다!

안에는 다음과 같은 물건들이 있다:
- 낡은 장부 한 권 (1861-1871년 기록)
- 녹슨 열쇠 (지하실용으로 보임)
- 오래된 편지 몇 통

홈즈가 관심 있게 물건들을 살펴본다.`,
    choices: [
      { text: '장부를 살펴본다', nextNode: 'examine_ledger_safe', hideIfHasItem: 'ledger' },
      { text: '지하실 열쇠를 가져간다', nextNode: 'got_basement_key', item: '지하실 열쇠', hideIfHasItem: '지하실 열쇠' },
      { text: '다른 물건들을 살펴본다', nextNode: 'study_room' }
    ]
  },

  examine_ledger_safe: {
    id: 'examine_ledger_safe',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    text: `장부를 꺼내 표지를 본다.

"1861년 유타주 금광 투자 기록"

낡고 먼지투성이지만... 표지 안쪽에 희미한 글씨가 보인다.

홈즈가 말한다. "왓슨, 이것은 중요한 문서일 수 있네. 자세히 조사해보자."`,
    choices: [
      { text: '[장부를 펼쳐 증거로 챙긴다]', nextNode: 'acquire_ledger_safe_v2' },
      { text: '나중에 보기로 한다', nextNode: 'safe_open_basement_key' }
    ]
  },

  got_basement_key: {
    id: 'got_basement_key',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    conditionalText: [
      {
        // 지하실의 존재를 이미 아는 경우
        condition: (context) => 
          context.visitedNodes.includes('basement_entrance') || 
          context.visitedNodes.includes('kitchen_investigation') ||
          context.visitedNodes.includes('find_basement') ||
          context.visitedNodes.includes('chase_hope_to_basement'),
        text: `[아이템 획득: 지하실 열쇠]

당신이 녹슨 열쇠를 집어든다.

홈즈가 열쇠를 살펴본다.

[홈즈]: 왓슨, 바로 이거야! 부엌에서 봤던 지하실 문을 열 수 있는 열쇠군. 이제 지하실로 갈 수 있어.

[왓슨]: 지금 바로 가볼까?

[홈즈]: 물론이지. 하지만 서두를 필요는 없네. 준비가 충분하지 않으면 위험할 수 있어. 자네가 결정하게.`
      }
    ],
    text: `[아이템 획득: 오래된 열쇠]

당신이 녹슨 열쇠를 집어든다.

홈즈가 열쇠를 살펴본다.

[홈즈]: 왓슨, 오래된 열쇠를 찾았군. 잠겨있는 방이나 문이 있는지 찾아봐야겠어.

[왓슨]: 이 저택 어딘가에 숨겨진 공간이 있을까?

[홈즈]: 가능성이 높아. 저택을 더 샅샅이 뒤져보세.`,
    choices: [
      { text: '금고를 더 조사한다', nextNode: 'safe_open_basement_key' },
      { text: '어딘지 모르는 곳을 조사하러 간다', nextNode: 'find_basement' },
      { text: '다른 곳을 더 조사한다', nextNode: 'main_entrance_return_study' }
    ]
  },

  // read_letter 노드 제거 (더 이상 필요 없음)

  // ========== 지하실 진입 (단일 루트) ==========
  find_basement: {
    id: 'find_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `부엌 바닥의 양탄자를 들춰내자... 숨겨진 지하실 입구가 나타난다!

무거운 철문에 자물쇠가 걸려있다. 

홈즈가 자물쇠를 살핀다. "최근에 열렸던 흔적이 있어. 범인이 이미 안에 있을 수 있어!"

문틈 사이로 희미한 촛불 빛이 보인다.`,
    choices: [
      { text: '지하실 열쇠로 연다', nextNode: 'open_basement', requiredItem: '지하실 열쇠' },
      { text: '열쇠가 없다... 자물쇠를 따본다', nextNode: 'pick_lock_fail' }
    ]
  },

  pick_lock_fail: {
    id: 'pick_lock_fail',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    conditionalText: [
      {
        // 서재를 이미 알고 있는 경우
        condition: (context) => 
          context.visitedNodes.includes('study_room') || 
          context.visitedNodes.includes('examine_safe'),
        text: '홈즈가 자물쇠를 따려고 시도하지만... 특수한 자물쇠라 쉽게 열리지 않는다.\n\n"이건 일반적인 자물쇠가 아니야. 열쇠가 필요해. 서재의 금고를 확인해보자!"'
      }
    ],
    text: '홈즈가 자물쇠를 따려고 시도하지만... 특수한 자물쇠라 쉽게 열리지 않는다.\n\n"이건 일반적인 자물쇠가 아니야. 열쇠가 필요해. 저택 안에서 열쇠를 찾아봐야겠어."',
    choices: [
      { text: '서재로 간다', nextNode: 'study_room' },
      { text: '현관으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  pick_lock: {
    id: 'pick_lock',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: '홈즈가 자물쇠를 따려고 시도하지만... 이 자물쇠는 특수 제작된 것으로 쉽게 열리지 않는다.\\\\n\\\\n\\\"왓슨, 이건 시간 낭비야. 열쇠를 찾아야 해. 금고를 확인해보자.\\\"',
    choices: [
      { text: '서재로 간다', nextNode: 'study_room' },
      { text: '현관으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  open_basement: {
    id: 'open_basement',
    day: 1,
    timeOfDay: 'evening',
    text: '지하실 열쇠를 자물쇠에 끼우자... 찰칵! 문이 열린다.\n\n문을 열자 어둠 속에서 촛불 빛이 보인다. 계단을 내려가니 넓은 지하실이 나타난다.',
    conditionalText: [
      {
        // 엘렌과 대화했고 루시 편지를 가지고 있는 경우 - 진엔딩 루트
        condition: (context) => 
          context.visitedNodes.includes('ellen_appears') && 
          context.inventory.includes('lucy_letter'),
        text: '지하실 열쇠를 자물쇠에 끼우자... 찰칵! 문이 열린다.\n\n문을 열자 어둠 속에서 촛불 빛이 보인다.\n\n그리고... 목소리가 들린다. 엘렌의 목소리다!\n\n계단을 내려가니 넓은 지하실이 나타난다.'
      }
    ],
    choices: [
      { 
        text: '조심스럽게 들어간다', 
        nextNode: 'basement_hub',
        condition: (context) => 
          context.visitedNodes.includes('ellen_appears') && 
          context.inventory.includes('lucy_letter')
      },
      { 
        text: '조심스럽게 들어간다', 
        nextNode: 'basement_hub',
        condition: (context) => 
          !context.visitedNodes.includes('ellen_appears') || 
          !context.inventory.includes('lucy_letter')
      }
    ]
  },

  // ========== 호프를 쫓아 지하실로 ==========
  chase_hope_to_basement: {
    id: 'chase_hope_to_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    speaker: 'watson',
    text: '호프를 뒤쫓아 저택 안으로 들어간다. 그는 부엌으로 향한다.\n\n바닥의 지하실 입구가 열려있다! 호프가 이미 내려갔다.\n\n홈즈가 속삭인다. "빨리! 늦으면 안 돼!"\n\n계단을 서둘러 내려가자... 지하실에서 목소리가 들린다.',
    choices: [
      { text: '지하실로 들어간다', nextNode: 'basement_scene' }
    ]
  },

  // 터널에서 직접 지하실로 가는 루트 제거
  tunnel_basement_discovery: {
    id: 'tunnel_basement_discovery',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: '철문을 밀어보지만 안쪽에서 잠겨있어 열리지 않는다.\n\n홈즈가 말한다. "이 문은 안쪽에서만 열 수 있어. 범인은 안에서 이 문을 잠갔군. 우리는 저택 안에서 다른 입구를 찾아야 해."',
    choices: [
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
    ]
  }
};