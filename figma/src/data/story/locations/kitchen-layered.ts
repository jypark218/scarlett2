/**
 * 🍳 부엌 계층적 조사 시스템 (Kitchen Layered Investigation)
 * 
 * Phase 1: 공간 파악 (Initial Observation)
 * Phase 2: 정밀 조사 (Detailed Investigation)
 * Phase 3: 추리 결론 (Deduction)
 */

import { StoryNode } from '../../types/story';

export const kitchenLayeredNodes: Record<string, StoryNode> = {
  
  // ========== PHASE 1: 공간 파악 (Initial Hub) ==========
  
  kitchen_hub: {
    id: 'kitchen_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    conditionalText: [
      {
        // Phase 1 모두 완료 시
        condition: (context) => {
          const phase1 = ['kitchen_observe_table', 'kitchen_observe_floor', 'kitchen_observe_cupboard'];
          return phase1.every(node => context.visitedNodes.includes(node));
        },
        text: `부엌을 전체적으로 파악했다.

홈즈가 말한다.

[홈즈]: 이제 세부적으로 조사해보자. 뭔가 숨겨진 게 있을 거야.`
      },
      {
        // 재방문
        condition: (context) => {
          const phase1 = ['kitchen_observe_table', 'kitchen_observe_floor', 'kitchen_observe_cupboard'];
          return phase1.some(node => context.visitedNodes.includes(node));
        },
        text: `부엌으로 돌아왔다.

낡은 나무 식탁과 찬장이 보인다.`
      }
    ],
    text: `부엌으로 들어선다.

낡은 나무 식탁과 찬장, 그리고 오래된 화덕이 보인다. 벽에는 구리 냄비와 프라이팬이 걸려있다.

공기가 차갑다. 화덕의 불은 꺼진 지 오래인 것 같다.

홈즈가 주변을 천천히 살피며 손가락으로 식탁 표면을 훑는다.

[홈즈]: (눈을 가늘게 뜨며) 부엌치고는 지나치게 깨끗하군. 마지막으로 사용한 지 며칠은 지난 것 같네. 하인들도 없었던 걸까?

식탁 위에 빈 접시와 찻잔이 놓여있다. 찻잔에는 차 자국이 말라붙어 있다.

바닥 한가운데 낡은 양탄자가 깔려있다. 다른 곳은 깨끗한데 양탄자 주변에만 검은 진흙이 묻어있다.

[왓슨]: (바닥을 가리키며) 홈즈, 저 진흙을 봐. 최근에 누군가 밖에서 들어온 것 같은데.

[홈즈]: (고개를 끄덕이며) 그것뿐이 아니야, 왓슨. 양탄자의 위치가 부자연스러워. 무언가를 숨기고 있는 것 같군.`,
    choices: [
      {
        text: '🍽️ 식탁 주변을 관찰한다',
        nextNode: 'kitchen_observe_table',
        hideIfVisitedNode: 'kitchen_observe_table'
      },
      {
        text: '👣 바닥과 양탄자를 관찰한다',
        nextNode: 'kitchen_observe_floor',
        hideIfVisitedNode: 'kitchen_observe_floor'
      },
      {
        text: '🗄️ 찬장과 주변을 관찰한다',
        nextNode: 'kitchen_observe_cupboard',
        hideIfVisitedNode: 'kitchen_observe_cupboard'
      },
      {
        text: '🔍 정밀 조사를 시작한다',
        nextNode: 'kitchen_phase2_hub',
        requiredVisitedNode: 'kitchen_observe_floor'
      },
      {
        text: '🚪 현관으로 돌아간다',
        nextNode: 'main_entrance'
      }
    ]
  },

  // ========== PHASE 1-1: 식탁 주변 관찰 ==========
  
  kitchen_observe_table: {
    id: 'kitchen_observe_table',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // Layer 2: 진흙 발자국 발견 후 - 추리 단계
        condition: (context) => context.flags.kitchen_floor_observed === true,
        text: `식탁으로 다시 다가간다.

[왓슨]: 이 빵과 우유... 이상하지 않나, 홈즈?

홈즈가 접시를 들어 자세히 관찰한다.

[홈즈]: 역시 그렇군. 빵 껍질이 정교하게 잘려있어.

그가 빵을 가리킨다.

[홈즈]: 백작 같은 미식가라면... 빵 껍질을 이렇게 깔끔하게 제거할까?

[왓슨]: 그럼...

홈즈가 찻잔을 집어든다.

[홈즈]: 이 찻잔... 크기가 성인 남자 손에 비해 턱없이 작아. 섬세한 여성용이야.

그가 식탁 주변을 돌아본다.

[홈즈]: 이 식기들... 조심스럽게 배치되어 있어. 마치... 연약한 누군가를 위해 준비한 것 같군.

[홈즈]: 백작 혼자였다면 이렇게 정성스럽게 준비했을 리 없어.

홈즈가 창밖을 본다.

[홈즈]: 이 저택엔 우리가 보지 못한 '작고 연약한 손님'이 숨어 있어, 왓슨.`
      }
    ],
    text: `식탁에 다가간다.

[왓슨]: 빈 접시와 찻잔이 있군...

홈즈가 접시를 들어본다.

[홈즈]: 아직 완전히 마르지 않았어. 최근에 사용된 거야.

그가 찻잔의 물 얼룩을 살핀다.

[홈즈]: 24시간 이내... 어제 밤이나 오늘 아침일 가능성이 높아.

[왓슨]: 누군가 여기서 식사를 했다는 건가?

홈즈가 식탁 위를 더 자세히 본다.

[홈즈]: 그렇지. 그리고 서둘러 마친 것 같아. 접시를 제대로 씻지도 않았네.

식탁 위에 작은 빵 부스러기가 남아있다.

홈즈가 빵 부스러기를 집어든다.

[홈즈]: 흰 빵이야. 고급 품종이지. 신선해... 오늘 아침에 구운 걸 거야.

그리고 우유가 담긴 잔이 하나 있다.

[홈즈]: 우유는 아직 상하지 않았어. 누군가 최근에 준비한 거지.

[왓슨]: 하지만... 백작이 실종됐다고 했는데, 누가...?

[홈즈]: 그게 문제야, 왓슨. 이 저택에 우리가 모르는 누군가가 있어.

**[발견: 최근 사용 흔적, 고급 빵과 우유]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'kitchen_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.kitchen_table_observed = true;
    }
  },

  // ========== PHASE 1-2: 바닥과 양탄자 관찰 ==========
  
  kitchen_observe_floor: {
    id: 'kitchen_observe_floor',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    text: `바닥을 살핀다.

대부분 깨끗한데... 양탄자 주변에만 진흙이 묻어있다.

[왓슨]: 이 진흙은...?

홈즈가 무릎을 꿇고 진흙을 만져본다.

[홈즈]: 흥미롭군. 일반 진흙이 아니야.

[홈즈]: 검은빛이 도는 갈색... 습하고 미네랄 함량이 높아.

[왓슨]: 그게 무슨 의미인가?

[홈즈]: 이런 진흙은 특정 지역에서만 발견돼. 우물 근처나... 오래된 지하 공간에서.

그가 양탄자를 가리킨다.

[홈즈]: 진흙이 양탄자 주변에만 묻어있어. 누군가 이 양탄자를 자주 움직였다는 뜻이지.

**[발견: 수상한 진흙, 양탄자 흔적]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'kitchen_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.kitchen_floor_observed = true;
      context.flags.noticed_carpet = true;
    }
  },

  // ========== PHASE 1-3: 찬장과 주변 관찰 ==========
  
  kitchen_observe_cupboard: {
    id: 'kitchen_observe_cupboard',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    text: `찬장을 살펴본다.

낡은 그릇들과 접시가 선반에 놓여있다.

[왓슨]: 대부분 녹이 슬었군...

홈즈가 찬장 뒤쪽을 들여다본다.

[홈즈]: 오랫동안 사용되지 않은 것 같네. 하지만...

그가 찬장 뒤쪽을 가리킨다.

[홈즈]: 여기 뭔가 더 있어. 작은 상자가 보이는군.

창문 쪽을 보니 밖에서 희미한 인기척이 느껴진다.

[왓슨]: 하인들이 있을까?

[홈즈]: 있다면 말을 걸어볼 필요가 있어.

**[발견: 찬장 뒤 상자, 하인들]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'kitchen_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.kitchen_cupboard_observed = true;
    }
  },

  // ========== PHASE 2: 정밀 조사 허브 ==========
  
  kitchen_phase2_hub: {
    id: 'kitchen_phase2_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    conditionalText: [
      {
        // 지하실 입구 발견 후
        condition: { visitedNode: 'kitchen_discover_basement' },
        text: `양탄자 밑에 지하실 입구가 드러나 있다.

[홈즈]: 다른 것도 빠짐없이 조사하자.`
      }
    ],
    text: `[홈즈]: 이제 세부적으로 파고들자.

무엇을 먼저 조사할까?`,
    choices: [
      {
        text: '🔍 진흙을 정밀 조사한다',
        nextNode: 'kitchen_detail_mud',
        requiredVisitedNode: 'kitchen_observe_floor',
        hideIfVisitedNode: 'kitchen_detail_mud'
      },
      {
        text: '🪟 양탄자를 들춰본다',
        nextNode: 'kitchen_discover_basement',
        requiredVisitedNode: 'kitchen_observe_floor',
        hideIfVisitedNode: 'kitchen_discover_basement'
      },
      {
        text: '📦 찬장 뒤 상자를 조사한다',
        nextNode: 'kitchen_detail_cupboard_box',
        requiredVisitedNode: 'kitchen_observe_cupboard',
        hideIfVisitedNode: 'kitchen_detail_cupboard_box'
      },
      {
        text: '🪟 창문을 조사한다',
        nextNode: 'kitchen_detail_window',
        hideIfVisitedNode: 'kitchen_detail_window'
      },
      {
        text: '💬 하인들에게 말을 건다',
        nextNode: 'kitchen_detail_servants',
        requiredVisitedNode: 'kitchen_observe_cupboard',
        hideIfVisitedNode: 'kitchen_detail_servants'
      },
      {
        text: '🚪 지하실로 들어간다',
        nextNode: 'kitchen_enter_basement',
        requiredVisitedNode: 'kitchen_discover_basement',
        requiredItem: '지하실 열쇠'
      },
      {
        text: '🔙 다시 전체를 둘러본다',
        nextNode: 'kitchen_hub'
      }
    ]
  },

  // ========== PHASE 2-1: 진흙 정밀 조사 ==========
  
  kitchen_detail_mud: {
    id: 'kitchen_detail_mud',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    text: `홈즈가 무릎을 꿇고 진흙을 정밀하게 조사한다.

[홈즈]: 왓슨, 이리 와서 보게.

그가 돋보기로 진흙을 살핀다.

[홈즈]: 이 진흙... 2가지 종류가 섞여있어.

[왓슨]: 2가지?

[홈즈]: 하나는 점토질 진흙. 지하 공간에서 온 거야. 다른 하나는... 정원 흙.

그가 진흙을 종이에 채취한다.

[홈즈]: 누군가 뒷뜰을 거쳐 지하로 내려갔어. 아마 백작일 가능성이 높지.

[홈즈]: 그런데... 발자국 크기가 조금 작군. 백작치고는 말이야.

**[단서 획득: 진흙 분석 자료]**`,
    choices: [
      {
        text: '진흙 샘플을 챙긴다',
        nextNode: 'kitchen_acquire_mud'
      }
    ],
    onEnter: (context) => {
      context.flags.examined_kitchen_mud = true;
    }
  },

  kitchen_acquire_mud: {
    id: 'kitchen_acquire_mud',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    text: `**[획득: 진흙 샘플]**

진흙 샘플을 채취했다. 지하실과 뒷뜰의 연결고리다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'kitchen_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('진흙 샘플');
    }
  },

  // ========== PHASE 2-2: 양탄자 들춰보기 - 지하실 발견 ==========
  
  kitchen_discover_basement: {
    id: 'kitchen_discover_basement',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 서재 방문 후
        condition: (context) => 
          context.visitedNodes.includes('study_hub') || 
          context.visitedNodes.includes('study_room'),
        text: `양탄자를 들춰내자... 숨겨진 문이 나타난다!

무거운 철문에 견고한 자물쇠가 달려있다.

[홈즈]: 역시... 지하실 입구가 여기 있었군. 백작이 의도적으로 숨긴 거야.

자물쇠를 살펴본다. 최근에 사용된 흔적이 있다.

[홈즈]: 이 자물쇠... 최근에 열렸던 흔적이 있네. 범인이 이미 안에 있을지도 모르지!

문틈 사이로 아래를 들여다보니... 희미한 촛불 빛이 보인다.

[왓슨]: 누군가 아래에 있는 건가?

홈즈가 귀를 기울인다. 하지만 아무 소리도 들리지 않는다.

[홈즈]: 열쇠가 필요해. 백작이라면 중요한 열쇠는... 서재나 침실 같은 곳에 보관했을 거야.`
      }
    ],
    text: `양탄자를 들춰내자... 숨겨진 문이 나타난다!

무거운 철문에 견고한 자물쇠가 달려있다.

[홈즈]: 오호... 지하실이 숨겨져 있었군. 의도적으로 양탄자로 가린 것 같아.

자물쇠를 살펴본다. 최근에 사용된 흔적이 있다.

[홈즈]: 이 자물쇠... 최근에 열렸던 흔적이 있네. 누군가 이미 안에 있을지도 모르지!

문틈 사이로 아래를 들여다보니... 희미한 촛불 빛이 보인다.

[왓슨]: 누군가 아래에 있는 건가?

홈즈가 귀를 기울인다. 하지만 아무 소리도 들리지 않는다.

[홈즈]: 열쇠가 필요해. 이런 저택이라면... 서재나 침실 같은 곳에 보관했을 거야.`,
    choices: [
      {
        text: '🔑 지하실 열쇠로 연다',
        nextNode: 'open_basement',
        requiredItem: '지하실 열쇠'
      },
      {
        text: '🔓 자물쇠를 따본다',
        nextNode: 'kitchen_pick_lock_fail'
      },
      {
        text: '일단 다른 곳을 더 조사한다',
        nextNode: 'kitchen_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.found_basement_entrance = true;
    }
  },

  // 자물쇠 따기 실패
  kitchen_pick_lock_fail: {
    id: 'kitchen_pick_lock_fail',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    text: `홈즈가 자물쇠를 따려고 시도한다.

하지만... 자물쇠가 너무 견고하다.

[홈즈]: 안 되겠어. 이건 일반 자물쇠가 아니야. 특수 제작된 거군.

[홈즈]: 열쇠를 찾는 수밖에 없어.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'kitchen_phase2_hub'
      }
    ]
  },

  // ========== PHASE 2-3: 찬장 뒤 상자 조사 ==========
  
  kitchen_detail_cupboard_box: {
    id: 'kitchen_detail_cupboard_box',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    text: `찬장 뒤쪽의 작은 나무 상자를 꺼낸다.

홈즈가 상자를 열어본다.

안에는 오래된 편지 몇 장과... 작은 은빛 십자가 목걸이가 들어있다.

편지를 펼쳐보니... 모두 독일어로 쓰여있다.

[홈즈]: 백작이 고향에서 받은 편지들인 것 같네. 날짜를 보니... 20년 전 것들이야.

**[발견: 오래된 편지, 십자가 목걸이]**`,
    choices: [
      {
        text: '📜 편지를 자세히 읽는다',
        nextNode: 'kitchen_read_old_letters',
        hideIfVisitedNode: 'kitchen_read_old_letters'
      },
      {
        text: '✝️ 십자가 목걸이를 조사한다',
        nextNode: 'kitchen_examine_necklace',
        hideIfVisitedNode: 'kitchen_examine_necklace'
      },
      {
        text: '다른 것을 조사한다',
        nextNode: 'kitchen_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.found_cupboard_box = true;
    }
  },

  // 편지 읽기
  kitchen_read_old_letters: {
    id: 'kitchen_read_old_letters',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    text: `홈즈가 독일어 편지를 읽는다.

[홈즈]: "사랑하는 제여, 주님의 은총이 함께하길..."

[홈즈]: 종교적인 내용이군. "영원한 구원 교단"에서 보낸 편지야.

그가 다른 편지를 펼쳐본다.

[홈즈]: "우리는 순결한 신부를 찾았소. 의식은 보름달이 뜰 때..."

홈즈의 얼굴이 굳는다.

[홈즈]: ...이건... 루시에 대한 얘기야.

[왓슨]: 루시?

[홈즈]: 20년 전 사건의 피해자. 백작은 그 의식에 참여했던 거야.

**[중요 정보: 백작과 교단의 연결고리]**`,
    choices: [
      {
        text: '편지를 챙긴다',
        nextNode: 'kitchen_acquire_letters'
      }
    ]
  },

  kitchen_acquire_letters: {
    id: 'kitchen_acquire_letters',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    text: `**[획득: 교단의 편지]**

20년 전 교단에서 백작에게 보낸 편지를 챙겼다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'kitchen_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('교단의 편지');
      context.flags.knows_cult_letters = true;
    }
  },

  // 십자가 목걸이 조사
  kitchen_examine_necklace: {
    id: 'kitchen_examine_necklace',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    text: `홈즈가 은빛 십자가 목걸이를 자세히 본다.

[홈즈]: 특이한 십자가군... 일반적인 기독교 십자가와 다르네.

그가 십자가 뒷면을 살핀다.

[홈즈]: 여기 글자가 새겨져 있어. "R.A.C.H.E"

[왓슨]: RACHE...! 서재에서 본 그 글자!

[홈즈]: 그래. 이건 교단의 상징이야. "영원한 구원 교단"의 표식이지.

**[단서 획득: 교단 십자가]**`,
    choices: [
      {
        text: '십자가를 챙긴다',
        nextNode: 'kitchen_acquire_necklace'
      }
    ]
  },

  kitchen_acquire_necklace: {
    id: 'kitchen_acquire_necklace',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    text: `**[획득: 교단 십자가 목걸이]**

RACHE가 새겨진 십자가 목걸이를 챙겼다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'kitchen_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('교단 십자가 목걸이');
    }
  },

  // ========== PHASE 2-4: 창문 조사 ==========
  
  kitchen_detail_window: {
    id: 'kitchen_detail_window',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    speaker: 'watson',
    text: `창문으로 다가간다.

유리창은 깨끗하다. 밖이 잘 보인다.

뒷마당이 펼쳐져 있다. 정원사와 하인 몇 명이 일하고 있다.

[왓슨]: (창문을 열며) 실례합니다!

하인들이 고개를 든다.`,
    choices: [
      {
        text: '💬 하인들에게 말을 건다',
        nextNode: 'kitchen_detail_servants'
      },
      {
        text: '🔙 다른 것을 조사한다',
        nextNode: 'kitchen_phase2_hub'
      }
    ]
  },

  // ========== PHASE 2-5: 하인들에게 말 걸기 ==========
  
  kitchen_detail_servants: {
    id: 'kitchen_detail_servants',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    speaker: 'watson',
    text: `창문을 열고 밖의 하인들에게 말을 건다.

[왓슨]: 실례합니다. 잠깐만...

늙은 정원사가 고개를 든다.

[정원사]: 탐정님들이시군요...

그는 불안한 얼굴이다.

[정원사]: 무엇을 도와드릴까요?

[왓슨]: 어젯밤에 이상한 일을 보신 적 있습니까?

정원사가 잠시 망설인다.

[정원사]: ...사실... 밤늦게 누군가 부엌 쪽에서 소리가 났습니다.

[왓슨]: 소리?

[정원사]: 무언가 무거운 걸 끄는 소리... 그리고 지하에서 희미한 불빛이...

그가 말을 흐린다.

**[정보 획득: 밤의 소음]**`,
    choices: [
      {
        text: '더 자세히 묻는다',
        nextNode: 'kitchen_servants_detail'
      },
      {
        text: '다른 것을 조사한다',
        nextNode: 'kitchen_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.talked_to_servants = true;
    }
  },

  kitchen_servants_detail: {
    id: 'kitchen_servants_detail',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    text: `[왓슨]: 그 불빛을... 몇 시쯤 보셨습니까?

정원사가 생각한다.

[정원사]: 자정 쯤이었을 겁니다... 전 일찍 자거든요.

[정원사]: 그런데... 그 후로 백작님을 보지 못했습니다.

[왓슨]: 백작님은 원래 어떤 분이셨나요?

정원사의 얼굴이 어두워진다.

[정원사]: ...좋은 분이셨습니다. 하지만... 최근 몇 달간... 많이 변하셨어요.

[정원사]: 밤마다 지하에서... 무언가 하시는 것 같았습니다.

**[정보 획득: 백작의 이상 행동]**`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'kitchen_phase2_hub'
      }
    ]
  },

  // ========== PHASE 3: 지하실 진입 ==========
  
  kitchen_enter_basement: {
    id: 'kitchen_enter_basement',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    text: `홈즈가 지하실 열쇠를 자물쇠에 넣는다.

찰칵.

자물쇠가 열린다.

무거운 철문을 천천히 연다.

삐걱...

어둠 속에서 차갑고 습한 공기가 올라온다.

홈즈가 랜턴을 든다.

[홈즈]: 조심해, 왓슨. 무슨 일이 있을지 모르니까.

나는 권총을 꺼내 든다.

계단을 내려간다...`,
    choices: [
      {
        text: '⬇️ 지하실로 내려간다',
        nextNode: 'basement_hub'
      }
    ]
  }
};