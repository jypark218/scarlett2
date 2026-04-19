/**
 * 📚 서재 계층적 조사 시스템 (Layered Investigation System)
 * 
 * 선택지 과부하 방지를 위한 3단계 조사 구조:
 * Phase 1: 공간 파악 (Initial Observation) - 3개 기본 선택지
 * Phase 2: 정밀 조사 (Detailed Investigation) - 조건부 해금
 * Phase 3: 추리 결론 (Deduction) - 단서 조합
 */

import { StoryNode } from '../../types/story';

export const studyLayeredNodes: Record<string, StoryNode> = {
  
  // ========== PHASE 1: 공간 파악 (Initial Hub) ==========
  
  study_hub: {
    id: 'study_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'watson',
    conditionalText: [
      {
        // 모든 Phase 1 관찰 완료 시
        condition: (context) => {
          const phase1 = ['study_observe_desk', 'study_observe_wall', 'study_observe_floor'];
          return phase1.every(node => context.visitedNodes.includes(node));
        },
        text: `서재를 전반적으로 살펴보았다.

홈즈가 턱을 쓰다듬으며 말한다.

[홈즈]: 이제 세부적으로 조사해보자. 뭔가 더 발견할 수 있을 거야.`
      },
      {
        // 일부 관찰 완료 시
        condition: (context) => {
          const phase1 = ['study_observe_desk', 'study_observe_wall', 'study_observe_floor'];
          return phase1.some(node => context.visitedNodes.includes(node));
        },
        text: `서재로 돌아왔다.

홈즈가 말한다.

[홈즈]: 아직 살펴보지 않은 곳이 있어. 놓친 단서가 있을 수 있네.`
      }
    ],
    text: `서재의 문을 연다. 

황동 손잡이가 얼음처럼 차갑다. 묘하게 불안한 느낌이 든다. 마치 무언가가 기다리고 있는 것 같은...

문이 삐걱... 삐걱... 소리를 내며 천천히, 너무나 천천히 열린다.

...

방 안으로 들어서자마자, 공기가 확연히 다르다. 무겁고 답답하다.

철 냄새. 아니, 피 냄새다. 역한 금속성 냄새가 코를 찌른다.

벽을 보는 순간... 온몸에 소름이 쫙 돋는다. 심장이 빠르게 뛴다.

**RACHE**

핏자국으로 쓰인 글자. 아직 완전히 마르지 않았다. 선명한, 끔찍할 정도로 선명한 붉은색. 글자는 높이 2미터쯤, 마치 벽에 외치듯 새겨져 있다.

[왓슨]: (뒤로 한 걸음 물러서며) ...이런, 젠장!

홈즈가 침착하게, 그러나 긴장한 표정으로 방 안을 천천히 살핀다.

[홈즈]: (차분하지만 단호하게) 왓슨, 진정해. 현장을 오염시키면 안 돼. 발자국 하나, 먼지 한 톨도 증거가 될 수 있어.

[홈즈]: (손을 펴 보이며) 단계적으로 조사하자. 먼저 방의 전체적인 상황을 파악하는 게 우선이야. 서두르면 중요한 걸 놓칠 수 있어.`,
    choices: [
      { 
        text: '📖 책상 주변을 관찰한다', 
        nextNode: 'study_observe_desk',
        hideIfVisitedNode: 'study_observe_desk'
      },
      { 
        text: '🖼️ 벽면 전체를 관찰한다', 
        nextNode: 'study_observe_wall',
        hideIfVisitedNode: 'study_observe_wall'
      },
      { 
        text: '👣 바닥과 주변을 관찰한다', 
        nextNode: 'study_observe_floor',
        hideIfVisitedNode: 'study_observe_floor'
      },
      // Phase 2 진입 선택지 (Phase 1 완료 후에만 표시)
      {
        text: '🔍 정밀 조사를 시작한다',
        nextNode: 'study_phase2_hub',
        requiredVisitedNode: 'study_observe_wall' // 최소 하나라도 관찰해야 함
      },
      {
        text: '🚪 현관으로 돌아간다',
        nextNode: 'main_entrance'
      }
    ]
  },

  // ========== PHASE 1-1: 책상 주변 관찰 ==========
  
  study_observe_desk: {
    id: 'study_observe_desk',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    speaker: 'watson',
    text: `책상 주변으로 천천히 다가간다. 유리 파편을 밟지 않도록 조심한다.

[왓슨]: (주변을 둘러보며) 책상이 완전히 엉망이군... 무슨 일이 있었던 거야?

서류들이 바닥에 흩어져 있다. 잉크병은 산산조각 나 있고, 검은 잉크가 바닥에 웅덩이를 만들었다. 의자는 뒤로 넘어져 있다.

홈즈가 무릎을 꿇고 바닥을 자세히 살핀다. 돋보기를 꺼내 든다.

[홈즈]: (바닥을 훑으며) 투쟁의 흔적이야, 왓슨. 그것도 격렬한 몸싸움이 있었어. 이 서류들... 뿌려진 게 아니라 쓸려나간 거야.

[홈즈]: (일어서며 턱을 쓰다듬는다) 그런데... 이상하군.

그가 손가락으로 책상 서랍을 가리킨다. 서랍이 반쯤 열려 있다.

[홈즈]: (서랍을 들여다보며) 서랍이 반쯤 열려 있어. 누군가 급하게 뭔가를 찾았던 것 같아. 안이 뒤죽박죽이야.

나는 수첩을 꺼내 메모한다. 손이 약간 떨린다.

**[발견: 투쟁의 흔적, 열린 서랍]**

[홈즈]: (생각에 잠긴 표정으로) 나중에 서랍을 자세히 조사해 봐야겠어. 뭔가 중요한 걸 찾던 중이었을 거야.`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'study_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.study_desk_observed = true;
    }
  },

  // ========== PHASE 1-2: 벽면 전체 관찰 ==========
  
  study_observe_wall: {
    id: 'study_observe_wall',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    speaker: 'watson',
    text: `천천히 고개를 들어 벽면을 둘러본다.

거대한 책장이 벽 전체를 차지하고 있다. 수백 권의 책들... 철학서, 신학서, 의학서...

그리고... 그 옆 벽면에... 선명한 핏자국 글자 **RACHE**.

[왓슨]: (소름이 돋으며) 이 글자... 범인이 남긴 메시지일까? 마지막 순간에 쓴 건가?

홈즈가 천천히 다가와 벽의 글자를 몇 초간 응시한다. 표정이 진지하다.

[홈즈]: (턱을 쓰다듬으며) 독일어로 '복수'를 뜻하지. RACHE... 하지만...

그가 돋보기를 꺼내 글자를 자세히 들여다본다.

[홈즈]: (중얼거리듯) 흥미롭군. 혈액이 한 번에 쓰인 게 아니야. 여러 번 덧칠했어.

[왓슨]: 덧칠?

[홈즈]: (고개를 끄덕이며) 마치... 의식의 일부처럼. 이건 단순한 메시지가 아닐 수도 있어.

그가 벽면을 더 천천히 훑는다. 손으로 벽을 짚어본다.

[홈즈]: (멈춰 서며) 여기, 책장 옆에 가계도가 걸려 있군.

오래된 양피지에 그려진 가족 계보다. 금박 테두리에 정교한 필체.

[홈즈]: (고개를 갸웃하며) 흥미로운 배치야. 보통 가계도는 서재가 아니라 거실이나 응접실에 걸어두는데... 백작은 왜 이걸 여기에?

나는 수첩을 꺼내 스케치하기 시작한다.

**[발견: RACHE 핏자국, 벽면 가계도]**

[홈즈]: (생각에 잠긴 표정으로) RACHE와 가계도, 둘 다 나중에 자세히 봐야겠어. 뭔가 연결고리가 있을 거야.`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'study_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.study_wall_observed = true;
    }
  },

  // ========== PHASE 1-3: 바닥과 주변 관찰 ==========
  
  study_observe_floor: {
    id: 'study_observe_floor',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    speaker: 'watson',
    text: `바닥을 살핀다.

여기저기 혈흔이 튀어있다.

그리고... 찢어진 천 조각이 보인다.

[왓슨]: 홈즈, 여기 천 조각이...

홈즈가 다가온다.

[홈즈]: 고급 천이군. 코트의 일부로 보여.

그가 천 조각을 집어든다.

[홈즈]: 누군가 탈출하다 찢긴 것 같아. 서두른 흔적이야.

문득, 책장 뒤에서 바스락 소리가 들린다.

당신이 재빨리 돌아본다.

...아무도 없다. 하지만 창문 커튼이 살랑 흔들리고 있다.

바람일까? 아니면...

[홈즈]: (낮은 목소리로) 우리만 있는 게 아닐 수도 있어. 조심해.

**[발견: 찢어진 천 조각, 수상한 기척]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'study_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.study_floor_observed = true;
      context.flags.heard_study_noise = true;
    }
  },

  // ========== PHASE 2: 정밀 조사 허브 ==========
  
  study_phase2_hub: {
    id: 'study_phase2_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    speaker: 'holmes',
    conditionalText: [
      {
        // 스탠거슨 발견 후
        condition: { visitedNode: 'study_discover_stangerson' },
        text: `스탠거슨이 불안한 눈빛으로 우리를 지켜본다.

[홈즈]: 이제 본격적으로 조사해보자, 왓슨.

무엇을 먼저 조사할까?`
      }
    ],
    text: `[홈즈]: 이제 세부적으로 파고들자.

전체 상황은 파악했어. 이제 각 증거를 정밀하게 분석할 차례야.`,
    choices: [
      {
        text: '📜 RACHE 핏자국을 정밀 조사한다',
        nextNode: 'study_detail_rache',
        requiredVisitedNode: 'study_observe_wall',
        hideIfVisitedNode: 'study_detail_rache'
      },
      {
        text: '🗂️ 가계도를 정밀 조사한다',
        nextNode: 'study_detail_genealogy',
        requiredVisitedNode: 'study_observe_wall',
        hideIfVisitedNode: 'study_detail_genealogy'
      },
      {
        text: '📖 책상 서랍을 정밀 조사한다',
        nextNode: 'study_detail_desk_drawer',
        requiredVisitedNode: 'study_observe_desk',
        hideIfVisitedNode: 'study_detail_desk_drawer'
      },
      {
        text: '🧵 찢어진 천 조각을 정밀 조사한다',
        nextNode: 'study_detail_cloth',
        requiredVisitedNode: 'study_observe_floor',
        hideIfVisitedNode: 'study_detail_cloth'
      },
      {
        text: '🔍 책장 뒤의 기척을 확인한다',
        nextNode: 'study_discover_stangerson',
        requiredVisitedNode: 'study_observe_floor',
        hideIfVisitedNode: 'study_discover_stangerson'
      },
      {
        text: '📚 책장을 정밀 조사한다',
        nextNode: 'study_detail_bookshelf',
        hideIfVisitedNode: 'study_detail_bookshelf'
      },
      {
        text: '🔙 다시 전체를 둘러본다',
        nextNode: 'study_hub'
      }
    ]
  },

  // ========== PHASE 2-1: RACHE 정밀 조사 ==========
  
  study_detail_rache: {
    id: 'study_detail_rache',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    conditionalText: [
      {
        // 스탠거슨을 이미 만난 후 RACHE를 조사하는 경우
        condition: { visitedNode: 'study_discover_stangerson' },
        text: `홈즈가 벽의 핏자국을 꼼꼼히 살핀다.

스탠거슨이 불안한 눈빛으로 우리를 지켜본다.

[홈즈]: RACHE... 독일어로 '복수'를 뜻하지. 스탠거슨 씨, 이 글자를 보신 적 있습니까?

스탠거슨의 얼굴이 창백해진다.

[스탄거슨]: ...예. 20년 전... 교단에서...

[왓슨]: 교단?

스탠거슨이 떨린다.

[스탄거슨]: "영원한 구원 교단"... 그들의 상징이었습니다... '신의 복수'라는 의미로...

그가 말을 흐린다. 뭔가 숨기고 있는 것이 분명하다.

**[단서 획득: RACHE = 교단 상징]**`
      }
    ],
    text: `홈즈가 핏자국 글자를 자세히 관찰한다.

[홈즈]: RACHE... 독일어로 복수를 뜻하지. 

[왓슨]: 범인의 메시지일까?

[홈즈]: 그럴 수도 있지. 하지만... 혹시 종교적 상징일 가능성도 있어.

그가 핏자국을 자세히 관찰한다.

[홈즈]: 글자체가 의례적이야. 마치... 의식의 일부처럼 쓰여졌어.

그가 핏자국의 높이와 각도를 측정한다.

[홈즈]: 오른손잡이가 썼군. 키는 170센티 정도...

**[단서 획득: RACHE 글자 분석]**`,
    choices: [
      {
        text: '스탠거슨에게 RACHE에 대해 묻는다',
        nextNode: 'study_ask_stangerson_rache',
        requiredVisitedNode: 'study_discover_stangerson'
      },
      {
        text: '다른 것을 조사한다',
        nextNode: 'study_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.examined_rache = true;
      context.addItem('RACHE 분석 자료');
    }
  },

  // ========== PHASE 2-2: 가계도 정밀 조사 ==========
  
  study_detail_genealogy: {
    id: 'study_detail_genealogy',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    speaker: 'watson',
    text: `벽면에 걸린 백작의 가계도를 자세히 살펴본다.

[왓슨]: 이건... 백작 가문의 족보군.

모로 백작의 이름이 맨 위에 적혀있고, 그 아래로...

[왓슨]: 엘렌...?

홈즈가 다가온다.

[홈즈]: 잠깐, 왓슨. 여기 엘렌의 이름이 적힌 부분을 보게.

홈즈가 종이를 만진다.

[홈즈]: 종이 질감이 미묘하게 다르군.

그가 돋보기로 자세히 본다.

[홈즈]: 이건... 덧칠된 거야!

[왓슨]: 덧칠?

[홈즈]: 원래 다른 이름이 적혀 있었는데, 그 위에 '엘렌'을 새로 써넣은 거지.

그가 빛에 비춰본다.

[홈즈]: 백작은 엘렌을 자신의 혈육으로 위장하기 위해 가계도까지 손을 댔어.

[왓슨]: 왜 그렇게까지...?

[홈즈]: 그게 바로 우리가 밝혀야 할 거야.

홈즈가 가계도의 다른 부분을 살핀다.

[홈즈]: 엘렌의 어머니 란이 비어있네. 의도적으로 지운 거야.

**[결정적 단서 획득: 위조된 가계도]**`,
    choices: [
      {
        text: '📜 가계도를 스케치해 둔다',
        nextNode: 'study_acquire_genealogy'
      }
    ],
    onEnter: (context) => {
      context.flags.examined_genealogy = true;
    }
  },

  study_acquire_genealogy: {
    id: 'study_acquire_genealogy',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'watson',
    text: `**[획득: 위조된 가계도 증거]**

가계도의 위조 흔적을 스케치했다.

백작과 대화할 때 "엘렌의 출생"에 대해 물을 수 있다.`,
    choices: [
      { 
        text: '다른 것을 조사한다', 
        nextNode: 'study_phase2_hub' 
      }
    ],
    onEnter: (context) => {
      context.flags.found_genealogy_clue = true;
      context.flags.knows_ellen_not_count_daughter = true;
      context.addItem('위조된 가계도 증거');
    }
  },

  // ========== PHASE 2-3: 책상 서랍 정밀 조사 ==========
  
  study_detail_desk_drawer: {
    id: 'study_detail_desk_drawer',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 스탠거슨을 이미 발견한 경우 - 그가 지켜보는 중
        condition: { visitedNode: 'study_discover_stangerson' },
        text: `책상 서랍을 열어본다.

스탠거슨이 긴장한 눈빛으로 우리를 지켜본다.

홈즈가 서랍을 열려고 하자... 스탠거슨이 한 걸음 다가온다.

[스탄거슨]: 저, 저기... 그건...

[홈즈]: 조사가 필요합니다, 스태그슨 씨.

서랍을 열자 낡은 가죽 일기장이 놓여있다.

스탠거슨의 얼굴이 창백해진다.

**[발견: 낡은 가죽 일기장]**`
      }
    ],
    text: `책상 서랍을 열어본다.

반쯤 열린 서랍 안에는 여러 물건이 들어있다.

오래된 편지들, 장부, 메모들...

그리고 그 사이에...

[홈즈]: 왓슨, 여기 일기장이 있네.

노화된 가죽 표지의 일기장이 서랍 안에 놓여있다.

**[발견: 낡은 가죽 일기장]**`,
    choices: [
      { 
        text: '📖 일기장을 읽는다', 
        nextNode: 'hope_diary_discovery',
        hideIfVisitedNode: 'hope_diary_discovery'
      },
      { 
        text: '다른 것을 조사한다', 
        nextNode: 'study_phase2_hub' 
      }
    ],
    onEnter: (context) => {
      context.flags.found_desk_drawer = true;
    }
  },

  // ========== PHASE 2-4: 천 조각 정밀 조사 ==========
  
  study_detail_cloth: {
    id: 'study_detail_cloth',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈가 바닥의 찢어진 천 조각을 집어든다.

[홈즈]: 고급 천이군. 울과 실크의 혼방... 런던 테일러 거리에서나 볼 수 있는 직물이야.

그가 천의 색과 패턴을 살핀다.

[홈즈]: 코트의 일부로 보여. 누군가 탈출하다가 걸린 것 같아.

[왓슨]: 백작의 것일까?

[홈즈]: 아니야. 백작은 더 화려한 스타일을 선호하지. 이건... 소박하면서도 품질 좋은 천이야.

그가 천 조각을 코에 대본다.

[홈즈]: 희미하게... 담배 냄새와... 무언가 더 있군. 약품 냄새 같은...

**[증거 획득: 찢어진 천 조각]**`,
    choices: [
      {
        text: '천 조각을 챙긴다',
        nextNode: 'study_acquire_cloth'
      }
    ],
    onEnter: (context) => {
      context.flags.examined_cloth = true;
    }
  },

  study_acquire_cloth: {
    id: 'study_acquire_cloth',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'watson',
    text: `**[획득: 찢어진 천 조각]**

고급 코트의 일부로 보이는 천 조각을 챙겼다.`,
    choices: [
      { 
        text: '다른 것을 조사한다', 
        nextNode: 'study_phase2_hub' 
      }
    ],
    onEnter: (context) => {
      context.addItem('찢어진 천 조각');
    }
  },

  // ========== PHASE 2-5: 스태그슨 발견 ==========
  
  study_discover_stangerson: {
    id: 'study_discover_stangerson',
    day: 1,
    location: 'library',
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `책장 뒤로 조심스럽게 다가간다.

누군가가 놀라 뒤로 물러섰다.

집사 복장의 중년 남자였다. 손에는 서류 뭉치를 들고 있고, 얼굴은 창백했다.

[스탠거슨]: 저, 저는... 스태그슨입니다. 백작님의 집사죠.

그의 목소리가 떨렸다.

[스탠거슨]: 탐정님들이신가요? 경찰이... 부르셨다고 들었습니다.

홈즈가 그의 손과 얼굴을 관찰했다. 그의 손이 미세하게 떨리고 있었다.

[홈즈]: 여기서 뭘 하고 계셨습니까?

스탠거슨이 시선을 피했다.

[스탄거슨]: 저, 저는... 백작님의 서류를... 정리하고 있었습니다...

하지만 그의 눈빛은 거짓말을 하고 있다는 걸 말해주고 있었다.

**[인물 발견: 스태그슨 - 백작의 집사]**`,
    choices: [
      {
        text: '스탠거슨에게 질문한다',
        nextNode: 'ask_stangerson'
      },
      {
        text: '일단 다른 것을 조사한다',
        nextNode: 'study_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.met_stangerson = true;
    }
  },

  // ========== PHASE 2-6: 책장 정밀 조사 ==========
  
  study_detail_bookshelf: {
    id: 'study_detail_bookshelf',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 이미 금고를 연 경우
        condition: (context) => context.visitedNodes.includes('safe_opened'),
        text: `책장을 다시 살펴본다.

이미 금고는 열었다.

홈즈가 책들을 훑어본다.

[홈즈]: 오컬트 관련 서적이 많군... 신비주의, 교단, 의식...

그가 특정 책을 집어든다.

[홈즈]: "영원한 신부의 의식"... 이건...

**[발견: 의식 관련 서적]**`
      }
    ],
    text: `홈즈가 책장을 자세히 살핀다.

[홈즈]: 흥미로운 장서들이군... 신학, 철학, 그리고...

그가 멈춘다.

[홈즈]: 여기, 책 한 권이 앞으로 나와 있어.

그가 책을 빼자... 뒤에서 찰칵 소리가 들린다.

책장 일부가 열리며 벽 속 금고가 드러난다.

[홈즈]: 비밀 금고군!

**[발견: 숨겨진 금고]**`,
    choices: [
      {
        text: '금고를 조사한다',
        nextNode: 'safe',
        hideIfVisitedNode: 'safe'
      },
      {
        text: '다른 것을 조사한다',
        nextNode: 'study_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.found_secret_safe = true;
    }
  },

  // ========== PHASE 3: 추리 결론 (스탠거슨 질문 등은 기존 노드 활용) ==========
  
  study_ask_stangerson_rache: {
    id: 'study_ask_stangerson_rache',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    speaker: 'holmes',
    text: `[홈즈]: 스태그슨 씨, RACHE에 대해 아시는 게 있습니까?

스탠거슨이 핏기가 빠진다.

[스탄거슨]: ...그건...

[홈즈]: 교단과 관련이 있지 않습니까?

스탠거슨이 놀라 홈즈를 본다.

[스탄거슨]: 어떻게...

[홈즈]: 답해주시죠.

스탠거슨이 떨리는 목소리로 말한다.

[스탄거슨]: ...20년 전, 백작님은... "영원한 구원 교단"의 일원이었습니다.

[스탄거슨]: RACHE는... 그들의 상징입니다. '신의 복수'...

[왓슨]: 교단이라니...!

[스탄거슨]: 하지만 백작님은... 오래전에 교단을 떠나셨습니다...

그가 말을 흐린다.

**[중요 정보: 백작과 교단의 연결고리]**`,
    choices: [
      {
        text: '교단에 대해 더 묻는다',
        nextNode: 'study_phase2_hub'
      },
      {
        text: '다른 것을 조사한다',
        nextNode: 'study_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.knows_cult_connection = true;
    }
  }
};