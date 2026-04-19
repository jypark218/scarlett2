/**
 * 뒷뜰 관련 노드
 * 우물, 터널, 루시의 반지 발견
 */

import { StoryNode } from '../../../types/story';

export const backyardNodes: Record<string, StoryNode> = {
  // ========== 뒷뜰 시퀀스 종료 ==========
  back_entrance_return: {
    id: 'back_entrance_return',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    text: '뒷뜰 조사를 마쳤다. 우물과 터널을 발견했다.\\n\\n홈즈가 턱을 쓸어내린다. "터널은 막혀있지만 중요한 단서야. 저택 안을 더 조사해야 해."',
    choices: [
      { text: '정문으로 돌아간다', nextNode: 'main_entrance_return_backyard' },
      { text: '우물을 다시 조사한다', nextNode: 'investigate_well' }
    ]
  },

  // ========== 우물 조사 ==========
  investigate_well: {
    id: 'investigate_well',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'well',
    conditionalText: [
      {
        // 부엌 진흙을 조사한 경우 - 연결점 제공
        condition: (context) => context.visitedNodes.includes('kitchen_mud_investigation'),
        text: `우물을 들여다본다.

깊은 우물 안... 바닥에 무언가 반짝이는 것이 보인다!

반지다. 작은 금반지가 우물 바닥 선반에 걸쳐 있다.

홈즈가 우물 둘레를 살핀다.

[홈즈]: 왓슨, 이것 보게.

우물 주변에 진흙이 묻어 있다. 검은빛이 도는 갈색 진흙.

[홈즈]: 이 진흙... 부엌에서 본 것과 똑같아. 누군가 이 우물 근처를 다녀갔고, 그 진흙을 부엌까지 가져갔다는 뜻이지.

[왓슨]: 그럼 범인이 우물을 이용했다는 건가?

[홈즈]: 가능성이 높아. 우물과 지하실이 연결되어 있을지도 몰라. 반지를 건져야겠어.`
      }
    ],
    text: '우물을 들여다본다.\\n\\n깊은 우물 안... 바닥에 무언가 반짝이는 것이 보인다!\\n\\n반지다. 작은 금반지가 우물 바닥 선반에 걸쳐 있다.\\n\\n홈즈가 말한다. "손이 닿지 않아. 두레박을 사용해야겠어."',
    choices: [
      { text: '🔍 우물 주변 진흙을 조사한다', nextNode: 'well_mud_investigation', hideIfVisitedNode: 'well_mud_investigation' },
      { text: '🪣 [두레박으로 반지를 건진다]', nextNode: 'take_ring', item: '루시의 반지', puzzleType: 'well', hideIfHasItem: '루시의 반지' },
      { text: '정문으로 돌아간다', nextNode: 'back_entrance_return' }
    ]
  },

  // 📍 우물 주변 진흙 조사
  well_mud_investigation: {
    id: 'well_mud_investigation',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'well',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 부엌 진흙도 조사한 경우 - 결정적 연결
        condition: (context) => context.visitedNodes.includes('kitchen_mud_investigation'),
        text: `홈즈가 우물 주변을 자세히 조사한다.

[홈즈]: 왓슨! 이것 좀 보게!

우물 둘레에 진흙 자국이 선명하게 남아있다. 검은빛이 도는 갈색 진흙.

[홈즈]: 이 진흙... 부엌에서 본 것과 완벽하게 일치해!

홈즈가 진흙을 채취해 비교한다.

[홈즈]: 색깔, 습도, 입자의 크기... 모두 똑같아. 의심의 여지가 없어.

[왓슨]: 그럼 범인이 우물에서 부엌으로 이동했다는 건가?

[홈즈]: 정확히! 그리고 보게... 발자국이 우물에서 저택 쪽으로 이어지고 있어.

당신이 발자국을 따라가본다.

[왓슨]: 군화 자국인 것 같은데...

[홈즈]: 맞아. 성인 남성, 키는 약 6피트... 그리고 이 간격을 보면 급하게 걸었어.

홈즈가 메모를 한다.

[홈즈]: 범인은 우물을 통해 저택에 접근했고, 지하실로 들어갔다가 부엌을 거쳐 나갔을 가능성이 크네.

[왓슨]: 그럼 우물 아래 터널이...?

[홈즈]: 지하실과 연결되어 있을 거야. 확인해봐야겠군.`
      }
    ],
    text: `홈즈가 우물 주변을 자세히 조사한다.

[홈즈]: 왓슨! 이것 좀 보게!

우물 둘레에 진흙 자국이 선명하게 남아있다. 검은빛이 도는 갈색 진흙.

[홈즈]: 이 진흙은 특이해. 일반 정원 흙과 다르지. 미네랄 함량이 높고 습기가 많아.

당신이 진흙을 만져본다.

[왓슨]: 끈적끈적하군.

[홈즈]: 바로 그거야. 이런 진흙은 지하 수맥 근처에서만 발견돼. 우물 바닥이나... 오래된 지하 공간 같은 곳에서 말이지.

홈즈가 발자국을 따라간다.

[홈즈]: 보게, 왓슨. 발자국이 우물에서 저택 방향으로 이어지고 있어.

[왓슨]: 군화 자국 같은데...

[홈즈]: 정확해. 성인 남성의 것이야. 누군가 우물 근처를 지나 저택 안으로 들어갔어.

[왓슨]: 그럼 이 진흙이 다른 곳에도...?

[홈즈]: 있을 거야. 범인이 이동한 경로를 따라가면 같은 진흙을 발견할 수 있을 걸세.`,
    choices: [
      { text: '🪣 반지를 건진다', nextNode: 'take_ring', item: '루시의 반지', puzzleType: 'well', hideIfHasItem: '루시의 반지' },
      { text: '저택 안을 조사한다', nextNode: 'back_entrance_return' }
    ]
  },

  // well_bottom은 사용되지 않음 - well 노드를 사용하세요
  // 삭제됨

  // ========== 반지 획득 ==========
  take_ring: {
    id: 'take_ring',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'well',
    text: `반지를 손에 쥐었다. 홈즈가 자세히 살펴본다.

"L.L... 이니셜이 새겨져 있어. 혼약 반지야. 누군가에게 중요한 물건이었을 거야."

우물 안을 보니 아래로 터널이 이어져 있다.

홈즈가 무릎을 꿇고 터널을 자세히 살핀다. "누군가 이 터널을 이용해 저택에 드나들었어. 군화 발자국, 마차꾼, 이 반지... 모든 것이 연결되기 시작해."`,
    choices: [
      { text: '터널로 들어간다', nextNode: 'tunnel' },
      { text: '저택 안을 먼저 조사한다', nextNode: 'back_entrance_return' }
    ]
  }
};
