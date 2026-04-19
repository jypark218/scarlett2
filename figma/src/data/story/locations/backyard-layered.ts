/**
 * 🌳 뒷뜰 계층적 조사 시스템 (Backyard Layered Investigation)
 * 
 * Phase 1: 공간 파악 (Initial Observation)
 * Phase 2: 정밀 조사 (Detailed Investigation)
 * Phase 3: 우물 조사 (Well Investigation)
 */

import { StoryNode } from '../../types/story';

export const backyardLayeredNodes: Record<string, StoryNode> = {
  
  // ========== PHASE 1: 공간 파악 (Initial Hub) ==========
  
  backyard_hub: {
    id: 'backyard_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    conditionalText: [
      {
        // Phase 1 모두 완료 시
        condition: (context) => {
          const phase1 = ['backyard_observe_garden', 'backyard_observe_well', 'backyard_observe_window'];
          return phase1.every(node => context.visitedNodes.includes(node));
        },
        text: `뒷뜰을 전체적으로 파악했다.

홈즈가 말한다.

[홈즈]: 이제 세부적으로 조사하자. 중요한 단서가 있을 거야.`
      },
      {
        // 재방문
        condition: (context) => {
          const phase1 = ['backyard_observe_garden', 'backyard_observe_well', 'backyard_observe_window'];
          return phase1.some(node => context.visitedNodes.includes(node));
        },
        text: `뒷뜰로 돌아왔다.

홈즈가 주변을 살핀다.`
      }
    ],
    text: `뒷문을 열고 뒷뜰로 나간다.

넓은 정원이 펼쳐진다. 하지만 관리가 잘 안 되어 잡초가 무성하다.

멀리 낡은 우물이 보인다.

그리고 저택 뒤편 창문 하나가 깨져있다.

바닥에는 여러 발자국이 흩어져 있다.

홈즈가 주변을 천천히 살핀다.

[홈즈]: 왓슨, 여기도 조사해야 해. 범인이 이쪽으로 도망쳤을 수도 있어.`,
    choices: [
      {
        text: '🌱 정원 바닥을 관찰한다',
        nextNode: 'backyard_observe_garden',
        hideIfVisitedNode: 'backyard_observe_garden'
      },
      {
        text: '💧 우물 주변을 관찰한다',
        nextNode: 'backyard_observe_well',
        hideIfVisitedNode: 'backyard_observe_well'
      },
      {
        text: '🪟 깨진 창문을 관찰한다',
        nextNode: 'backyard_observe_window',
        hideIfVisitedNode: 'backyard_observe_window'
      },
      {
        text: '🔍 정밀 조사를 시작한다',
        nextNode: 'backyard_phase2_hub',
        requiredVisitedNode: 'backyard_observe_garden'
      },
      {
        text: '🚪 저택 안으로 돌아간다',
        nextNode: 'main_entrance'
      }
    ]
  },

  // ========== PHASE 1-1: 정원 바닥 관찰 ==========
  
  backyard_observe_garden: {
    id: 'backyard_observe_garden',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    speaker: 'watson',
    text: `정원 바닥을 살핀다.

여러 발자국이 흩어져 있다.

홈즈가 무릎을 꿇고 발자국을 본다.

[홈즈]: 흥미롭군. 최소 3명의 발자국이야.

[왓슨]: 3명?

[홈즈]: 하나는 큰 발... 아마 백작일 거야. 다른 하나는 중간 크기... 남자 하인 정도.

그가 세 번째 발자국을 가리킨다.

[홈즈]: 그리고 이건... 작은 발이야. 여자 아니면 소년.

발자국들은 우물 쪽으로 향하고 있다.

[홈즈]: 모두 우물 방향으로 가고 있어. 무언가 우물에서 일어난 거야.

**[발견: 3명의 발자국, 우물로 향함]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'backyard_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.backyard_garden_observed = true;
    }
  },

  // ========== PHASE 1-2: 우물 주변 관찰 ==========
  
  backyard_observe_well: {
    id: 'backyard_observe_well',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    speaker: 'watson',
    text: `우물로 다가간다.

낡은 돌로 쌓인 우물... 오래전에 사용을 멈춘 것 같다.

홈즈가 우물 가장자리를 살핀다.

[홈즈]: 최근에 누군가 여기 왔었어. 발자국이 신선하거든.

우물 안을 들여다본다.

어둡다... 바닥이 보이지 않는다.

[왓슨]: 뭔가 있을까?

홈즈가 작은 돌을 떨어뜨린다.

철썩.

물소리가 들린다.

[홈즈]: 물이 있군. 그런데... 뭔가 떠있는 것 같아.

**[발견: 우물 내부, 떠있는 물체]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'backyard_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.backyard_well_observed = true;
    }
  },

  // ========== PHASE 1-3: 깨진 창문 관찰 ==========
  
  backyard_observe_window: {
    id: 'backyard_observe_window',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    speaker: 'watson',
    text: `깨진 창문으로 다가간다.

유리 파편들이 바닥에 흩어져 있다.

[왓슨]: 창문이 깨졌군...

홈즈가 유리 파편을 살핀다.

[홈즈]: 유리가 안쪽으로 깨졌어. 밖에서 안으로 쳐서 깬 거야.

그가 창틀을 본다.

[홈즈]: 그리고 여기 천 조각이... 누군가 창문을 통해 들어갔어.

창문 안쪽을 들여다본다. 서재가 보인다.

[홈즈]: 이 창문... 서재로 통하는군. 범인의 침입 경로일 수도 있어.

**[발견: 침입 흔적, 서재 연결]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'backyard_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.backyard_window_observed = true;
      context.flags.knows_entry_point = true;
    }
  },

  // ========== PHASE 2: 정밀 조사 허브 ==========
  
  backyard_phase2_hub: {
    id: 'backyard_phase2_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    conditionalText: [
      {
        // 우물 조사 완료 후
        condition: { visitedNode: 'backyard_well_discovery' },
        text: `우물에서 무언가를 발견했다.

[홈즈]: 다른 곳도 조사하자.`
      }
    ],
    text: `[홈즈]: 이제 세부적으로 파고들자.

무엇을 먼저 조사할까?`,
    choices: [
      {
        text: '👣 발자국을 정밀 분석한다',
        nextNode: 'backyard_detail_footprints',
        requiredVisitedNode: 'backyard_observe_garden',
        hideIfVisitedNode: 'backyard_detail_footprints'
      },
      {
        text: '💧 우물 안을 조사한다',
        nextNode: 'backyard_detail_well',
        requiredVisitedNode: 'backyard_observe_well',
        hideIfVisitedNode: 'backyard_detail_well'
      },
      {
        text: '🪟 창문 침입 경로를 분석한다',
        nextNode: 'backyard_detail_window_entry',
        requiredVisitedNode: 'backyard_observe_window',
        hideIfVisitedNode: 'backyard_detail_window_entry'
      },
      {
        text: '🌳 숲 가장자리를 조사한다',
        nextNode: 'backyard_detail_forest',
        hideIfVisitedNode: 'backyard_detail_forest'
      },
      {
        text: '🏚️ 헛간을 조사한다',
        nextNode: 'backyard_detail_shed',
        hideIfVisitedNode: 'backyard_detail_shed'
      },
      {
        text: '🔙 다시 전체를 둘러본다',
        nextNode: 'backyard_hub'
      }
    ]
  },

  // ========== PHASE 2-1: 발자국 정밀 분석 ==========
  
  backyard_detail_footprints: {
    id: 'backyard_detail_footprints',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    speaker: 'watson',
    text: `홈즈가 발자국을 하나씩 정밀하게 분석한다.

[홈즈]: 첫 번째... 큰 발. 신발 바닥이 고급 제품이야. 백작의 신발일 가능성이 높아.

그가 두 번째 발자국을 가리킨다.

[홈즈]: 두 번째... 중간 크기. 평범한 하인용 신발. 아마 스탠거슨이겠지.

그리고 세 번째...

[홈즈]: 이 작은 발... 여자 신발이야. 그런데...

그가 발자국을 따라가본다.

[홈즈]: 이 발자국만 왕복 흔적이 있어. 다른 발자국들은 우물로 가기만 했는데...

[왓슨]: 그게 무슨 의미인가?

[홈즈]: 이 여자는 우물에 갔다가 다시 돌아왔어. 무언가를 버렸을 가능성이 있지.

**[결정적 분석: 여자의 왕복 발자국]**`,
    choices: [
      {
        text: '발자국 스케치를 남긴다',
        nextNode: 'backyard_acquire_footprint_sketch'
      }
    ],
    onEnter: (context) => {
      context.flags.analyzed_footprints = true;
    }
  },

  backyard_acquire_footprint_sketch: {
    id: 'backyard_acquire_footprint_sketch',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    text: `**[획득: 발자국 분석 자료]**

3명의 발자국 패턴을 스케치했다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'backyard_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('발자국 분석 자료');
    }
  },

  // ========== PHASE 2-2: 우물 안 조사 ==========
  
  backyard_detail_well: {
    id: 'backyard_detail_well',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    speaker: 'watson',
    text: `홈즈가 우물 가장자리에 매달린 밧줄을 끌어올린다.

[홈즈]: 왓슨, 손 좀 빌려줘.

함께 밧줄을 당긴다.

무거운 뭔가가 올라온다.

양동이다. 그리고 양동이 안에...

[왓슨]: 이건...!

낡은 가죽 가방이 들어있다!

홈즈가 가방을 열어본다.

안에는... 장부, 편지, 그리고 열쇠 다발.

[홈즈]: 백작의 물건들이야. 누군가 증거를 숨기려고 우물에 버린 거지.

장부를 펼쳐본다.

[홈즈]: 이건... 재무 장부야. 백작과 드레버 사이의 거래 내역이 있어.

**[결정적 증거 발견: 장부, 편지, 열쇠]**`,
    choices: [
      {
        text: '가방을 챙긴다',
        nextNode: 'backyard_acquire_well_items'
      }
    ],
    onEnter: (context) => {
      context.flags.found_well_evidence = true;
    }
  },

  backyard_acquire_well_items: {
    id: 'backyard_acquire_well_items',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    text: `**[획득: 백작의 가방 (장부, 편지, 열쇠)]**

우물에서 건진 백작의 물품들을 챙겼다.`,
    choices: [
      {
        text: '장부를 자세히 읽는다',
        nextNode: 'backyard_read_ledger'
      },
      {
        text: '다른 것을 조사한다',
        nextNode: 'backyard_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('백작의 재무 장부');
      context.addItem('지하실 열쇠');
      context.flags.has_basement_key = true;
    }
  },

  // 장부 읽기
  backyard_read_ledger: {
    id: 'backyard_read_ledger',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    text: `홈즈가 장부를 꼼꼼히 읽는다.

[홈즈]: 백작과 드레버... 5만 파운드의 채무 관계가 있어.

[왓슨]: 5만 파운드?!

[홈즈]: 드레버가 백작에게 투자했는데... 사업이 실패한 거야.

[홈즈]: 그리고 여기... "최종 상환 기한: 1890년 12월"

[왓슨]: 지금이 12월이군...

[홈즈]: 드레버는 백작에게 돈을 돌려받으려 했어. 충분한 살인 동기지.

**[결정적 정보: 5만 파운드 채무, 드레버 동기]**`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'backyard_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.knows_debt_motive = true;
    }
  },

  // ========== PHASE 2-3: 창문 침입 경로 분석 ==========
  
  backyard_detail_window_entry: {
    id: 'backyard_detail_window_entry',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    text: `홈즈가 창문 주변을 정밀하게 조사한다.

[홈즈]: 유리 파편의 각도를 보면... 밖에서 둔기로 쳤어.

그가 창틀에 걸린 천 조각을 집어든다.

[홈즈]: 이 천... 코트 소매 부분이야. 고급 천이지.

그가 천을 빛에 비춰본다.

[홈즈]: 여기 약간의 혈흔이 있어. 창문을 부수다 손을 다친 것 같군.

창문 아래 바닥을 본다.

[홈즈]: 여기 신발 자국... 크기가 큰 남자야. 아마 드레버일 거야.

**[결정적 증거: 드레버의 침입 흔적]**`,
    choices: [
      {
        text: '천 조각을 챙긴다',
        nextNode: 'backyard_acquire_cloth'
      }
    ]
  },

  backyard_acquire_cloth: {
    id: 'backyard_acquire_cloth',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    text: `**[획득: 혈흔 묻은 천 조각]**

창문에 걸린 천 조각을 증거로 챙겼다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'backyard_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('혈흔 묻은 천 조각');
      context.flags.has_drebber_entry_evidence = true;
    }
  },

  // ========== PHASE 2-4: 숲 가장자리 조사 ==========
  
  backyard_detail_forest: {
    id: 'backyard_detail_forest',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'watson',
    speaker: 'watson',
    text: `정원 가장자리, 숲이 시작되는 곳으로 간다.

나무들 사이로 어둡다.

[왓슨]: 여기서도 발자국이...

작은 발자국이 숲 안으로 이어진다.

홈즈가 발자국을 따라간다.

[홈즈]: 누군가 숲으로 도망쳤어. 아마 범행 후...

숲 안쪽에서 뭔가 반짝인다.

다가가보니... 작은 금빛 로켓이 떨어져 있다!

[홈즈]: 이건...!

로켓을 열자 안에 작은 사진이 들어있다.

젊은 여자의 사진... 루시다.

**[발견: 금빛 로켓, 루시의 사진]**`,
    choices: [
      {
        text: '로켓을 챙긴다',
        nextNode: 'backyard_acquire_locket'
      }
    ]
  },

  backyard_acquire_locket: {
    id: 'backyard_acquire_locket',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    text: `**[획득: 루시의 로켓]**

루시의 사진이 든 금빛 로켓을 챙겼다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'backyard_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('루시의 로켓');
      context.flags.found_lucy_locket = true;
    }
  },

  // ========== PHASE 2-5: 헛간 조사 ==========
  
  backyard_detail_shed: {
    id: 'backyard_detail_shed',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'watson',
    speaker: 'watson',
    text: `정원 구석에 낡은 헛간이 하나 있다.

문을 열고 들어간다.

먼지투성이... 오래된 도구들이 놓여있다.

그런데 구석에... 말안장과 마차 도구들이 있다!

[왓슨]: 홈즈, 이건...

홈즈가 말안장을 살핀다.

[홈즈]: 최근에 사용한 흔적이 있어. 아직 먼지가 덜 쌓였군.

마차 도구 위에 작은 메모가 하나 있다.

"마차는 저택 앞에"

[홈즈]: 누군가 마차를 준비해뒀어. 도주 계획이었던 거야.

**[발견: 마차 도구, 도주 계획]**`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'backyard_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.found_escape_plan = true;
    }
  }
};