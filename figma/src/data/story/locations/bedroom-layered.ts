/**
 * 🛏️ 침실 계층적 조사 시스템 (Bedroom Layered Investigation)
 * 
 * Phase 1: 공간 파악 (Initial Observation)
 * Phase 2: 정밀 조사 (Detailed Investigation)
 * Phase 3: 비밀 발견 (Hidden Discoveries)
 */

import { StoryNode } from '../../types/story';

export const bedroomLayeredNodes: Record<string, StoryNode> = {
  
  // ========== PHASE 1: 공간 파악 (Initial Hub) ==========
  
  bedroom_hub: {
    id: 'bedroom_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'watson',
    conditionalText: [
      {
        // Phase 1 모두 완료 시
        condition: (context) => {
          const phase1 = ['bedroom_observe_desk', 'bedroom_observe_bed', 'bedroom_observe_wardrobe'];
          return phase1.every(node => context.visitedNodes.includes(node));
        },
        text: `침실을 대략적으로 파악했다.

홈즈가 말한다.

[홈즈]: 이제 세부적으로 조사하자. 무언가 숨겨진 게 있을 거야.`
      },
      {
        // 재방문
        condition: (context) => {
          const phase1 = ['bedroom_observe_desk', 'bedroom_observe_bed', 'bedroom_observe_wardrobe'];
          return phase1.some(node => context.visitedNodes.includes(node));
        },
        text: `침실로 돌아왔다.

홈즈가 주변을 살피며 말한다.

[홈즈]: 다른 곳도 조사해보자, 왓슨.`
      }
    ],
    text: `침실에 들어선다.

무거운 침묵이 방을 가득 채우고 있다. 먼지가 공기 중에 떠다닌다.

큰 4주식 침대가 방 중앙을 차지하고 있다. 진홍색 커튼과 금장식... 한때는 호화로웠을 것이다.

책상 위에는 새로 작성된 서류가 흩어져 있다. 잉크가 아직 완전히 마르지 않았다.

구석에 작은 서랍장이 놓여있다. 가장 위 서랍에는 정교한 황동 자물쇠가 달려있다. 누군가 무언가를 숨기고 싶어했다는 증거.

그리고 침대 옆에 작은 화장대가 보인다. 거울에는 먼지가 쌓여있다.

[왓슨]: (주변을 둘러보며) 이상하게 조용하군... 너무 조용해.

홈즈가 주변을 천천히 살피며 손가락으로 가구 표면을 훑는다.

[홈즈]: (먼지를 살피며) 왓슨, 침실을 꼼꼼히 조사하자. 백작의 사생활이 담긴 공간이야. 공개된 서재보다 더 많은 진실이 숨어있을 거야.`,
    choices: [
      {
        text: '📜 책상 주변을 관찰한다',
        nextNode: 'bedroom_observe_desk',
        hideIfVisitedNode: 'bedroom_observe_desk'
      },
      {
        text: '🛏️ 침대 주변을 관찰한다',
        nextNode: 'bedroom_observe_bed',
        hideIfVisitedNode: 'bedroom_observe_bed'
      },
      {
        text: '👔 옷장과 벽면을 관찰한다',
        nextNode: 'bedroom_observe_wardrobe',
        hideIfVisitedNode: 'bedroom_observe_wardrobe'
      },
      {
        text: '🔍 정밀 조사를 시작한다',
        nextNode: 'bedroom_phase2_hub',
        requiredVisitedNode: 'bedroom_observe_desk'
      },
      {
        text: '🚪 1층으로 내려간다',
        nextNode: 'main_entrance'
      }
    ]
  },

  // ========== PHASE 1-1: 책상 주변 관찰 ==========
  
  bedroom_observe_desk: {
    id: 'bedroom_observe_desk',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `책상으로 다가간다.

[왓슨]: 여기 서류가 있군...

새로 작성된 유언장이 보인다. 잉크가 아직 완전히 마르지 않았다.

홈즈가 서류를 살핀다.

[홈즈]: 이건... 유언장이야. 최근에 작성된 거군.

구석에 작은 서랍장이 있다. 가장 위 서랍에 정교한 자물쇠가 달려있다.

[홈즈]: 저 서랍장... 뭔가 중요한 게 들어있을 것 같은데.

**[발견: 유언장, 잠긴 서랍장]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'bedroom_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.bedroom_desk_observed = true;
    }
  },

  // ========== PHASE 1-2: 침대 주변 관찰 ==========
  
  bedroom_observe_bed: {
    id: 'bedroom_observe_bed',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `침대로 다가간다.

침대는 깔끔하게 정돈되어 있다. 시트는 고급 린넨이고, 베개는 깃털로 채워져 있다.

홈즈가 침대 밑을 들여다본다.

[홈즈]: 왓슨, 잠깐... 여기 뭔가 있어.

침대 밑에서 작은 종이 쪼가리를 발견한다. 찢어진 편지의 일부분인 것 같다.

홈즈가 조심스럽게 주워 읽는다.

[홈즈]: "...유타에서의 일을 잊을 수 없소. 당신이 저지른 죄는..." 흥미롭군. 편지가 찢어져 있어.

그가 침대 옆 융단에 시선을 둔다.

[홈즈]: 융단 밑도 살펴보자.

홈즈가 융단의 한쪽 끝을 살짝 들춰본다.

[홈즈]: 여기 마루바닥에 얼룩이 있어.

희미한 붉은 얼룩... 그리고 검은 흙자국.

[왓슨]: 이건... 혹시 피?

홈즈가 고개를 젓는다.

[홈즈]: 아니야. 와인 자국이야. 하지만 이 검은 흙... 어디선가 가져온 거야.

**[발견: 찢어진 편지, 와인 얼룩, 검은 흙]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'bedroom_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.bedroom_bed_observed = true;
      context.flags.found_torn_letter_piece = true;
    }
  },

  // ========== PHASE 1-3: 옷장과 벽면 관찰 ==========
  
  bedroom_observe_wardrobe: {
    id: 'bedroom_observe_wardrobe',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `옷장으로 다가간다.

거대한 참나무 옷장이다. 문이 반쯤 열려있다.

[왓슨]: 옷장이 크군...

홈즈가 옷장 문을 열어본다.

안에는 백작의 옷들이 걸려있다. 고급 정장, 코트, 모자...

그런데 옷장 뒤쪽이 묘하게 어둡다.

[홈즈]: 이상하군... 옷장 깊이가 방 구조에 비해 얕은 것 같은데.

벽면을 보니 여러 그림이 걸려있다. 풍경화, 초상화...

그 중 하나의 초상화가 눈에 띈다. 젊은 여자의 초상화다.

[홈즈]: 저 초상화... 누구지?

**[발견: 이상한 옷장 깊이, 여자 초상화]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'bedroom_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.bedroom_wardrobe_observed = true;
    }
  },

  // ========== PHASE 2: 정밀 조사 허브 ==========
  
  bedroom_phase2_hub: {
    id: 'bedroom_phase2_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    conditionalText: [
      {
        // 비밀 통로 발견 후
        condition: { visitedNode: 'bedroom_discover_secret_passage' },
        text: `옷장 안의 비밀 통로가 드러나 있다.

[홈즈]: 다른 것도 빠짐없이 조사하자.`
      }
    ],
    text: `[홈즈]: 이제 세부적으로 파고들자.

무엇을 먼저 조사할까?`,
    choices: [
      {
        text: '📜 책상 위 유언장을 정밀 조사한다',
        nextNode: 'bedroom_detail_will',
        requiredVisitedNode: 'bedroom_observe_desk',
        hideIfVisitedNode: 'bedroom_detail_will'
      },
      {
        text: '🔒 잠긴 서랍장을 조사한다',
        nextNode: 'bedroom_detail_drawer',
        requiredVisitedNode: 'bedroom_observe_desk',
        hideIfVisitedNode: 'bedroom_detail_drawer'
      },
      {
        text: '💄 화장대를 조사한다',
        nextNode: 'bedroom_detail_vanity',
        requiredVisitedNode: 'bedroom_observe_desk',
        hideIfVisitedNode: 'bedroom_detail_vanity'
      },
      {
        text: '🖼️ 벽의 초상화를 조사한다',
        nextNode: 'bedroom_detail_portrait',
        requiredVisitedNode: 'bedroom_observe_wardrobe',
        hideIfVisitedNode: 'bedroom_detail_portrait'
      },
      {
        text: '👔 옷장 안쪽을 정밀 조사한다',
        nextNode: 'bedroom_discover_secret_passage',
        requiredVisitedNode: 'bedroom_observe_wardrobe',
        hideIfVisitedNode: 'bedroom_discover_secret_passage'
      },
      {
        text: '🪟 창문을 조사한다',
        nextNode: 'bedroom_detail_window',
        hideIfVisitedNode: 'bedroom_detail_window'
      },
      {
        text: '🔙 다시 전체를 둘러본다',
        nextNode: 'bedroom_hub'
      }
    ]
  },

  // ========== PHASE 2-1: 유언장 정밀 조사 ==========
  
  bedroom_detail_will: {
    id: 'bedroom_detail_will',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `책상 위의 유언장을 자세히 읽는다.

**"나 모로 백작은 이에 내 모든 재산을 양녀 엘렌 스탠거슨에게 물려준다."**

[왓슨]: 엘렌에게 모든 재산을...?

홈즈가 유언장을 꼼꼼히 살핀다.

[홈즈]: 잠깐... 이 잉크가 이상해.

그가 돋보기로 서명을 본다.

[홈즈]: 서명이 두 겹으로 쓰여져 있어. 원래 서명 위에 다른 서명을 덧씌운 거야.

[왓슨]: 위조?

[홈즈]: 정확해. 이 유언장은 가짜야. 누군가 백작의 진짜 유언장을 바꿔치기 했어.

**[결정적 발견: 위조된 유언장]**`,
    choices: [
      {
        text: '유언장을 챙긴다',
        nextNode: 'bedroom_acquire_fake_will'
      }
    ],
    onEnter: (context) => {
      context.flags.examined_will = true;
    }
  },

  bedroom_acquire_fake_will: {
    id: 'bedroom_acquire_fake_will',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    text: `**[획득: 위조된 유언장]**

가짜 유언장을 증거로 챙겼다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'bedroom_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('위조된 유언장');
      context.flags.has_fake_will = true;
    }
  },

  // ========== PHASE 2-2: 서랍장 조사 ==========
  
  bedroom_detail_drawer: {
    id: 'bedroom_detail_drawer',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    text: `잠긴 서랍장으로 다가간다.

정교한 자물쇠가 달려있다.

[홈즈]: 이 자물쇠... 특수 제작된 것 같은데.

그가 자물쇠를 살핀다.

[홈즈]: 열쇠가 필요해. 아마 화장대나 다른 곳에 숨겨뒀을 거야.`,
    choices: [
      {
        text: '🔑 서랍장 열쇠로 연다',
        nextNode: 'bedroom_open_drawer',
        requiredItem: '서랍장 열쇠'
      },
      {
        text: '다른 것을 조사한다',
        nextNode: 'bedroom_phase2_hub'
      }
    ]
  },

  bedroom_open_drawer: {
    id: 'bedroom_open_drawer',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `열쇠를 자물쇠에 넣는다.

찰칵.

서랍이 열린다.

안에는... 또 다른 유언장이 들어있다!

홈즈가 유언장을 꺼내 읽는다.

[홈즈]: "나 모로 백작은... 내 모든 재산을 내 친딸 루시의 딸에게..."

[왓슨]: 루시의 딸?

[홈즈]: 그래. 이게 진짜 유언장이야. 백작은 루시의 딸에게 재산을 물려주려 했어.

[홈즈]: 그리고 그 딸은... 엘렌이 아닌 다른 사람일 가능성이 있어.

**[결정적 증거 획득: 진짜 유언장]**`,
    choices: [
      {
        text: '진짜 유언장을 챙긴다',
        nextNode: 'bedroom_acquire_real_will'
      }
    ]
  },

  bedroom_acquire_real_will: {
    id: 'bedroom_acquire_real_will',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    text: `**[획득: 백작의 진짜 유언장]**

숨겨진 진짜 유언장을 챙겼다. 루시의 딸에 대한 언급이 있다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'bedroom_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('백작의 진짜 유언장');
      context.flags.has_real_will = true;
      context.flags.knows_lucy_daughter = true;
    }
  },

  // ========== PHASE 2-3: 화장대 조사 ==========
  
  bedroom_detail_vanity: {
    id: 'bedroom_detail_vanity',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'watson',
    speaker: 'watson',
    text: `화장대로 다가간다.

여러 화장품과 거울이 놓여있다.

홈즈가 서랍을 열어본다.

작은 상자들, 향수병들...

그리고 그 사이에... 작은 은빛 열쇠가 하나 있다.

[홈즈]: 이건... 서랍장 열쇠인 것 같은데.

**[발견: 서랍장 열쇠]**`,
    choices: [
      {
        text: '열쇠를 챙긴다',
        nextNode: 'bedroom_acquire_drawer_key'
      }
    ]
  },

  bedroom_acquire_drawer_key: {
    id: 'bedroom_acquire_drawer_key',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    text: `**[획득: 서랍장 열쇠]**

화장대에서 서랍장 열쇠를 발견했다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'bedroom_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('서랍장 열쇠');
    }
  },

  // ========== PHASE 2-4: 초상화 조사 ==========
  
  bedroom_detail_portrait: {
    id: 'bedroom_detail_portrait',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    text: `벽의 초상화를 자세히 본다.

젊은 여자의 초상화다. 아름다운 금발에 푸른 눈...

홈즈가 초상화 아래 명판을 읽는다.

[홈즈]: "루시 페리어, 1850-1870"

[왓슨]: 루시...! 20년 전 사건의...!

[홈즈]: 그래. 이 여자가 바로 "영원한 신부 의식"의 희생자야.

홈즈가 초상화를 자세히 본다.

[홈즈]: 백작은... 그녀를 사랑했던 것 같아. 이렇게 초상화를 걸어두다니.

**[중요 정보: 루시 페리어의 초상화]**`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'bedroom_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.saw_lucy_portrait = true;
      context.flags.knows_lucy_name = true;
    }
  },

  // ========== PHASE 2-5: 옷장 안쪽 정밀 조사 - 비밀 통로 발견 ==========
  
  bedroom_discover_secret_passage: {
    id: 'bedroom_discover_secret_passage',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `옷장 안쪽을 자세히 조사한다.

홈즈가 옷들을 한쪽으로 밀친다.

[홈즈]: 역시... 뭔가 있어.

옷장 뒤쪽 벽에 작은 문이 숨겨져 있다!

[왓슨]: 비밀 통로?

홈즈가 문을 열어본다.

삐걱...

좁은 통로가 나타난다. 계단이 위로 이어진다.

[홈즈]: 다락방으로 가는 길이군. 백작이 숨겨놓은 비밀 통로야.

어둠 속에서 희미한 빛이 보인다.

**[발견: 비밀 통로 - 다락방 연결]**`,
    choices: [
      {
        text: '⬆️ 다락방으로 올라간다',
        nextNode: 'attic_entrance'
      },
      {
        text: '일단 다른 것을 조사한다',
        nextNode: 'bedroom_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.found_secret_passage = true;
    }
  },

  // ========== PHASE 2-6: 창문 조사 ==========
  
  bedroom_detail_window: {
    id: 'bedroom_detail_window',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'watson',
    speaker: 'watson',
    text: `창문으로 다가간다.

밖을 내려다본다. 뒷뜰이 보인다.

[왓슨]: 여기서 뒷뜰이 한눈에 보이는군...

홈즈가 다가온다.

[홈즈]: 왓슨, 저기 봐.

그가 뒷뜰의 특정 지점을 가리킨다.

[홈즈]: 우물 근처... 발자국이 보이지?

희미하게 여러 발자국이 우물 주변에 찍혀있다.

[홈즈]: 여러 사람이 우물을 드나든 것 같군.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'bedroom_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.saw_backyard_from_window = true;
    }
  },

  // ========== PHASE 3: 다락방 진입 ==========
  
  attic_entrance: {
    id: 'attic_entrance',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    text: `좁은 계단을 조심스럽게 올라간다.

먼지가 쌓인 계단... 오랫동안 사용되지 않은 것 같다.

하지만 최근에 누군가 다녀간 흔적이 있다.

위에서 희미한 빛이 새어나온다.

[홈즈]: 조심해, 왓슨. 무슨 일이 있을지 모르니까.

나는 권총에 손을 갖다 댄다.

계단을 끝까지 올라가자...

다락방이 나타난다.`,
    choices: [
      {
        text: '⬆️ 다락방으로 들어간다',
        nextNode: 'attic_interior'
      }
    ]
  }
};