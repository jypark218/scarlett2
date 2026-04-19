/**
 * 메인 허브 (현관 홀)
 * 플레이어가 여러 장소를 오가는 중심 위치
 */

import { StoryNode } from '../../../types/story';

export const mainHubNodes: Record<string, StoryNode> = {
  // ========== 메인 허브 ==========
  // mansion_entrance는 삭제됨 - main_entrance를 사용하세요
  
  main_entrance: {
    id: 'main_entrance',
    day: 1,
    timeOfDay: 'afternoon',
    text: `현관 홀에 서 있다.

정면에는 2층으로 오르는 계단, 왼쪽에는 서재 문이 보인다. 오른쪽 복도 너머로 뒷뜰이 보이고, 부엌으로 가는 문도 있다.`, // 기본 텍스트 (처음 방문 시)
    // visitedNodes를 확인해 다시 돌아왔을 때와 처음 왔을 때 다르게 표현
    conditionalText: [
      {
        // 다른 장소들을 방문하고 다시 현관으로 돌아온 경우
        condition: (context) => {
          const exploredLocations = [
            'study_room',
            'upstairs',
            'back_entrance',
            'kitchen_entrance',
            'well',
            'meet_drebber',
            'discover_stangerson'
          ];
          return exploredLocations.some(node => context.visitedNodes.includes(node));
        },
        text: `현관 홀로 돌아왔다.

정면에는 2층으로 오르는 계단, 왼쪽에는 서재 문이 보인다. 오른쪽 복도 너머로 뒷뜰이 보이고, 부엌으로 가는 문도 있다.

홈즈가 턱을 쓰다듬으며 생각에 잠긴다.

[홈즈]: 조각들이 모이고 있어. 하지만 아직 완전하지 않군.`
      }
    ],
    nextNode: 'main_entrance_holmes_reaction'
  },

  // 홈즈의 반응 (방문한 장소에 따라 달라짐)
  main_entrance_holmes_reaction: {
    id: 'main_entrance_holmes_reaction',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `여기서부터 시작하자. 서두르지 말고... 차근차근.`, // 기본 텍스트 (처음 방문 시)
    conditionalText: [
      {
        // 모든 주요 장소를 방문한 경우
        condition: (context) => {
          const allLocations = ['study_room', 'upstairs', 'back_entrance'];
          return allLocations.every(node => context.visitedNodes.includes(node));
        },
        text: `꽤 많은 걸 알아냈어. 이제 단서들을 연결할 시간이야.`
      },
      {
        // 스탐거슨과 드레버를 모두 만난 경우
        condition: (context) => {
          return context.visitedNodes.includes('discover_stangerson') && 
                 context.visitedNodes.includes('meet_drebber');
        },
        text: `집사와 손님... 두 사람 모두 20년 전의 사건과 연결되어 있어. 그리고 호프까지... 이건 우연이 아니야.`
      },
      {
        // 서재만 방문한 경우
        condition: (context) => {
          return context.visitedNodes.includes('study_room') && 
                 !context.visitedNodes.includes('upstairs') &&
                 !context.visitedNodes.includes('back_entrance');
        },
        text: `서재에서 흥미로운 걸 찾았어. 다른 곳도 살펴보자.`
      },
      {
        // 2층만 방문한 경우
        condition: (context) => {
          return context.visitedNodes.includes('upstairs') && 
                 !context.visitedNodes.includes('study_room') &&
                 !context.visitedNodes.includes('back_entrance');
        },
        text: `2층의 상황이 심상치 않군. 1층도 조사해야 해.`
      },
      {
        // 뒷뜰만 방문한 경우
        condition: (context) => {
          return context.visitedNodes.includes('back_entrance') && 
                 !context.visitedNodes.includes('study_room') &&
                 !context.visitedNodes.includes('upstairs');
        },
        text: `뒷뜰의 흔적들이 흥미롭군. 저택 내부도 확인해야겠어.`
      },
      {
        // 아직 아무것도 방문하지 않은 경우 (기본값)
        condition: () => true,
        text: `여기서부터 시작하자. 서두르지 말고... 차근차근.`
      }
    ],
    choices: [
      { text: '서재를 조사한다', nextNode: 'study_hub' },
      { text: '2층으로 올라간다', nextNode: 'checkpoint_go_upstairs' },
      { text: '부엌을 조사한다', nextNode: 'kitchen_hub' },
      { text: '뒷뜰을 조사한다', nextNode: 'backyard_hub' },
      { text: '근처 여관을 방문한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber' },
      { text: '홈즈와 심도있는 대화를 나눈다', nextNode: 'holmes_hint_playcount_2' }
    ]
  },

  // ========== 체크포인트: 2층 올라가기 전 ==========
  checkpoint_go_upstairs: {
    id: 'checkpoint_go_upstairs',
    day: 1,
    timeOfDay: 'afternoon',
    text: `홈즈가 계단 앞에 섰다.

그가 잠시 멈추더니 나를 돌아봤다.

[홈즈]: 왓슨, 1층은 충분히 조사했나?

그의 목소리는 평소보다 낮았다.

[홈즈]: 2층에는... 무언가 중요한 게 있을 거야. 한번 올라가면 돌아오기 어려울 수도 있어.

나는 고개를 끄덕였다.`,
    choices: [
      { text: '1층을 더 조사하고 싶다', nextNode: 'main_entrance' },
      { text: '지금 올라간다', nextNode: 'upstairs' }
    ]
  },

  // ========== 서재 시퀀스 후 복귀 ==========
  main_entrance_return_study: {
    id: 'main_entrance_return_study',
    day: 1,
    timeOfDay: 'afternoon',
    conditionalText: [
      {
        // 스탐거슨을 발견하지 못한 경우 - 불안한 분위기
        condition: (context) => !context.visitedNodes.includes('discover_stangerson'),
        text: `현관 홀로 돌아왔다.

서재에서 확인한 것들이 머릿속을 맴돈다. RACHE 글자, 백작의 일기...

그런데... 집사가 보이지 않는다. 이 큰 저택에 집사가 없다는 게 이상하다.

홈즈가 조용히 말한다.`
      }
    ],
    text: `현관 홀로 돌아왔다.

서재에서 확인한 것들이 머릿속을 맴돈다. RACHE 글자, 스탐저슨의 떨리는 손, 백작의 일기...

홈즈가 조용히 말한다.`,
    nextNode: 'main_entrance_return_study_holmes'
  },

  // 홈즈의 반응 (스탄저슨과의 대화 깊이에 따라 분기)
  main_entrance_return_study_holmes: {
    id: 'main_entrance_return_study_holmes',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `서재는 충분해. 다른 곳도 살펴보자.`, // 기본 텍스트
    conditionalText: [
      {
        // 스탐거슨을 아직 발견하지 못한 경우
        condition: (context) => !context.visitedNodes.includes('discover_stangerson'),
        text: `왓슨, 집사를 찾아야 해. 백작의 집사라면 많은 걸 알고 있을 텐데... 어디 숨어있는 걸까?`
      },
      {
        // 스탐저슨이 지하실 고백을 한 경우 (깊은 대화)
        condition: (context) => {
          const deepConfession = [
            'stangerson_basement_confession',
            'stangerson_full_confession',
            'stangerson_save_count',
            'stangerson_basement_hint'
          ];
          return deepConfession.some(node => context.visitedNodes.includes(node));
        },
        text: `저 집사... 백작을 지하실에 가뒀다고 했어. 서둘러야 해. 백작이 아직 살아있다면...`
      },
      {
        // 스탐저슨과 중간 정도 대화한 경우 (백작과의 관계, 배신 동기 등)
        condition: (context) => {
          const moderateConversation = [
            'stangerson_betrayal_motive',
            'stangerson_relationship',
            'press_stangerson_level_1',
            'stangerson_night_detail'
          ];
          return moderateConversation.some(node => context.visitedNodes.includes(node));
        },
        text: `스탠저슨... 뭔가 깊이 연루되어 있어. 20년 전 사건의 공범일 가능성이 높아.`
      },
      {
        // 스탐저슨을 발견만 하고 대화 없이 나온 경우
        condition: (context) => context.visitedNodes.includes('discover_stangerson'),
        text: `집사를 만났지만 아직 충분히 캐내지 못했어. 나중에 다시 추궁해야겠군.`
      },
      {
        // 서재만 조사하고 스탐저슨을 만나지 않은 경우
        condition: () => true, // 기본값
        text: `서재는 충분해. 다른 곳도 살펴보자.`
      }
    ],
    choices: [
      { text: '2층으로 올라간다', nextNode: 'checkpoint_go_upstairs' },
      { text: '뒷뜰을 조사한다', nextNode: 'back_entrance' },
      { text: '서재로 다시 간다', nextNode: 'study_room' },
      { text: '근처 여관을 방문한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber' },
      { text: '홈즈와 대화한다', nextNode: 'holmes_hint_playcount_2' },
      { 
        text: '💎 최종 추리를 시작한다', 
        nextNode: 'study_complete_to_deduction',
        requirement: { items: ['ledger', 'will'] }
      }
    ]
  },

  // ========== 2층 조사 후 복귀 ==========
  main_entrance_return_upstairs: {
    id: 'main_entrance_return_upstairs',
    day: 1,
    timeOfDay: 'evening',
    text: `1층 현관으로 내려왔다.

2층에서 본 것들... 침실의 혼란, 비밀 통로, 그리고...

홈즈가 계단 난간에 기댄 채 각에 잠겼다.`,
    nextNode: 'main_entrance_return_upstairs_holmes'
  },

  // 홈즈의 반응 (드레버와의 대화 깊이에 따라 분기)
  main_entrance_return_upstairs_holmes: {
    id: 'main_entrance_return_upstairs_holmes',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `아직 조사하지 않은 곳들이 있어. 빠짐없이 살펴봐야 해.`, // 기본 텍스트
    conditionalText: [
      {
        // 드레버의 어두운 과거까지 파헤친 경우 (깊은 대화)
        condition: (context) => {
          const deepConversation = [
            'drebber_dark_past_revealed',
            'drebber_final_confrontation',
            'drebber_breaks_down',
            'drebber_confesses_murder_attempt'
          ];
          return deepConversation.some(node => context.visitedNodes.includes(node));
        },
        text: `드레버... 그는 백작을 죽이려 했어. 20년 전의 원한... 그리고 5만 파운드의 빚. 강력한 동기야.`
      },
      {
        // 드레버와 중간 정도 대화한 경우 (알리바이, 사업 분쟁 등)
        condition: (context) => {
          const moderateConversation = [
            'drebber_alibi',
            'drebber_business_from_alibi',
            'drebber_business_first',
            'drebber_playcount_2_question'
          ];
          return moderateConversation.some(node => context.visitedNodes.includes(node));
        },
        text: `드레버는 백작과 금전적 분쟁이 있었어. 하지만 알리바이를 확인해봐야겠군.`
      },
      {
        // 드레버를 만나기만 하고 대화 없이 나온 경우
        condition: (context) => context.visitedNodes.includes('meet_drebber'),
        text: `저 남자... 뭔가 숨기고 있어. 더 캐내야겠어.`
      },
      {
        // 침실만 조사하고 드레버를 만나지 않은 경우
        condition: () => true, // 기본값
        text: `아직 조사하지 않은 곳들이 있어. 빠짐없이 살펴봐야 해.`
      }
    ],
    choices: [
      { text: '🔼 2층으로 다시 올라간다', nextNode: 'upstairs' },
      { 
        text: '서재로 간다', 
        nextNode: 'study_room',
        hideIfVisitedNode: 'discover_stangerson'
      },
      { 
        text: '서재로 간다', 
        nextNode: 'study_room',
        requiredVisitedNode: 'discover_stangerson'
      },
      { text: '뒷뜰로 간다', nextNode: 'back_entrance' },
      { text: '근처 여관을 방문한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber' },
      { text: '홈즈와 대화한다', nextNode: 'holmes_hint_playcount_2' }
    ]
  },

  // ========== 뒷뜰 조사 후 복귀 ==========
  main_entrance_return_backyard: {
    id: 'main_entrance_return_backyard',
    day: 1,
    timeOfDay: 'evening',
    text: `현관으로 돌아왔다.

뒤뜰의 발자국들... 깨진 유리창... 우물에서 본 그것...

홈즈가 눈을 감은 채 생각에 잠겼다.

[홈즈]: 이 사건에는 보이는 것보다 더 많은 진실이 숨어있어.`,
    choices: [
      { 
        text: '서재를 조사한다', 
        nextNode: 'study_room',
        hideIfVisitedNode: 'discover_stangerson'
      },
      { 
        text: '서재를 조사한다', 
        nextNode: 'study_room',
        requiredVisitedNode: 'discover_stangerson'
      },
      { text: '2층으로 올라간다', nextNode: 'checkpoint_go_upstairs' },
      { text: '뒷뜰로 다시 간다', nextNode: 'back_entrance' },
      { text: '근처 여관을 방문한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber' },
      { text: '홈즈와 대화한다', nextNode: 'holmes_hint_playcount_2' },
      { 
        text: '💎 최종 추리를 시작한다', 
        nextNode: 'final_deduction_checkpoint',
        showIf: (context) => {
          // 핵심 조사 완료 체크
          const hasEnoughEvidence = context.items.length >= 3;
          const visitedKeyLocations = [
            'examine_ritual_tools',
            'read_count_confession'
          ].some(node => context.visitedNodes.includes(node));
          
          return hasEnoughEvidence || visitedKeyLocations;
        }
      }
    ]
  }
};