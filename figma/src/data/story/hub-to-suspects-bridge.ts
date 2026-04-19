import { StoryNode } from '../../types/story';

/**
 * 🌉 허브 시스템 → 용의자 선택 연결
 * 
 * 2층/서재/뒷뜰 탐색 완료 후 용의자 선택으로 이어지는 브리지 노드
 */
export const hubToSuspectsBridge: Record<string, StoryNode> = {
  // ✅ 기존 upstairs_end 오버라이드
  upstairs_end: {
    id: 'upstairs_end',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[2층 조사 완료]

홈즈가 복도를 살피며 말한다.

[셜록 홈즈]: 왓슨, 2층에서 중요한 단서를 얻었어.

[셜록 홈즈]: 이제... 모든 조각을 맞출 시간이야.`,
    choices: [
      { 
        text: '💎 모든 단서를 종합해 완전한 추리를 한다', 
        nextNode: 'final_deduction_hub',
        requirement: { items: ['locket', 'ledger', 'will'] }
      },
      { 
        text: '🔍 지금까지의 단서로 추리를 시작한다', 
        nextNode: 'incomplete_deduction_hub',
        requirement: { items: ['ledger', 'will'] },
        hideIfHasItem: 'locket'
      },
      { 
        text: '🔍 아직 다른 곳을 더 조사한다', 
        nextNode: 'main_entrance_return_upstairs' 
      }
    ]
  },

  // ✅ 최종 추리 허브 (모든 증거를 모았을 때)
  final_deduction_hub: {
    id: 'final_deduction_hub',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[현관 홀, 저녁]

홈즈가 손을 모으고 생각에 잠긴다.

[셜록 홈즈]: 왓슨, 모든 단서를 정리해보자.

**[증거 정리]**

📿 **루시의 로켓** - 우물 근처에서 발견. 1861년 루시 루이자의 것. 20년 전 비극과 연관.

📒 **오래된 장부** - 1861년 유타 금광 사기 기록. 스탠거슨의 비서실에서 발견.

📜 **새 유언장** - 백작이 스탠거슨에게 재산을 물려주려 해. 드레버의 지문 발견.

[셜록 홈즈]: 세 명의 용의자, 서로 얽힌 관계...

[셜록 홈즈]: 왓슨, 당신의 의견을 듣고 싶어.`,
    choices: [
      { 
        text: '\"호프가 가장 수상합니다. 20년 동안 백작을 추적했습니다...\"', 
        nextNode: 'hope_route_start',
        requirement: { item: 'locket' }
      },
      { 
        text: '\"조셉 스탠거슨을 의심합니다. 백작의 유산을 노리고...\"', 
        nextNode: 'stangerson_route_start',
        requirement: { item: 'ledger' }
      },
      { 
        text: '\"이녹 드레버가 가장 의심스럽습니다. 유산에서 제외된 것이...\"', 
        nextNode: 'drebber_route_start',
        requirement: { item: 'will' }
      }
    ]
  },

  // ✅ 초회차용 불완전 추리 허브 (로켓 없이, 2개 단서만)
  incomplete_deduction_hub: {
    id: 'incomplete_deduction_hub',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[현관 홀, 저녁]

홈즈가 손을 모으고 생각에 잠긴다.

[셜록 홈즈]: 왓슨, 지금까지 찾은 단서를 정리해보자.

[왓슨]: (아직 모든 증거를 모으지 못한 것 같지만... 일단 추리를 시작해보자)`,
    conditionalText: [
      {
        condition: { hasItem: 'locket' },
        text: `[현관 홀, 저녁]

홈즈가 손을 모으고 생각에 잠긴다.

[셜록 홈즈]: 왓슨, 지금까지 찾은 단서를 정리해보자.

**[발견한 증거]**

📿 **루시의 로켓** - 우물 근처에서 발견. 1861년 루시 루이자의 것. 20년 전 비극과 연관.

[셜록 홈즈]: 이것만으로는 부족해. 다른 증거가 더 필요한데...

[왓슨]: 하지만 시간이 없어. 백작이 위험할 수도 있어!

[셜록 홈즈]: ...알았어. 일단 지금까지의 단서로 추리를 진행하자.`
      },
      {
        condition: (context) => context.items.includes('ledger') && context.items.includes('will'),
        text: `[현관 홀, 저녁]

홈즈가 손을 모으고 생각에 잠긴다.

[셜록 홈즈]: 왓슨, 지금까지 찾은 단서를 정리해보자.

**[발견한 증거]**

📒 **오래된 장부** - 1861년 유타 금광 사기 기록. 스탠거슨이 관련되어 있다.

📜 **유언장** - 백작이 스탠거슨에게 재산을 물려주려 했다. 드레버의 지문이 묻어있다.

[왓슨]: 그렇다면... 스탠거슨이나 드레버 중 하나가 범인이겠군.

[셜록 홈즈]: ...그럴 가능성이 높아. 하지만 뭔가... 놓친 것 같은 느낌이 드는데.

[왓슨]: 일단 지금까지의 단서로 추리를 진행해보자.`
      },
      {
        condition: { hasItem: 'ledger' },
        text: `[현관 홀, 저녁]

홈즈가 손을 모으고 생각에 잠긴다.

[셜록 홈즈]: 왓슨, 지금까지 찾은 단서를 정리해보자.

**[발견한 증거]**

📒 **오래된 장부** - 1861년 유타 금광 사기 기록. 스탠거슨이 관련되어 있다.

[셜록 홈즈]: 이것만으로는 증거가 부족해. 더 조사해야...

[왓슨]: 하지만 시간이 없어. 백작이 위험할 수도 있어!

[셜록 홈즈]: ...좋아. 일단 지금까지의 단서로 추리를 시작하자.`
      },
      {
        condition: { hasItem: 'will' },
        text: `[현관 홀, 저녁]

홈즈가 손을 모으고 생각에 잠긴다.

[셜록 홈즈]: 왓슨, 지금까지 찾은 단서를 정리해보자.

**[발견한 증거]**

📜 **유언장** - 백작이 스탠거슨에게 재산을 물려주려 했다. 드레버의 지문이 묻어있다.

[셜록 홈즈]: 유언장만으로는 확실하지 않아. 다른 증거도 필요해...

[왓슨]: 하지만 시간이 없어. 백작이 위험할 수도 있어!

[셜록 홈즈]: ...알았어. 일단 추리를 진행해보자.`
      }
    ],
    choices: [
      { 
        text: '조셉 스탠거슨을 의심한다', 
        nextNode: 'incomplete_suspect_choice_hub'
      },
      { 
        text: '이녹 드레버를 의심한다', 
        nextNode: 'incomplete_suspect_choice_hub'
      },
      { 
        text: '아직 조사가 부족한 것 같다... 더 찾아본다', 
        nextNode: 'main_entrance_return_upstairs'
      }
    ]
  },

  // ✅ 초회차용 용의자 선택 (호프 없음)
  incomplete_suspect_choice_hub: {
    id: 'incomplete_suspect_choice_hub',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[셜록 홈즈]: 알겠어, 왓슨. 그럼 그 방향으로 추리를 진행해보자.

[셜록 홈즈]: 스탠거슨과 드레버... 둘 다 의심스러운 인물이야.

[셜록 홈즈]: 이제 누구를 먼저 추적할지 결정해야 해.`,
    choices: [
      {
        text: '조셉 스탠거슨 - 유산 상속자를 추적한다',
        nextNode: 'incomplete_suspect_choice_stangerson'
      },
      {
        text: '이녹 드레버 - 유산에서 제외된 자를 추적한다',
        nextNode: 'incomplete_suspect_choice_drebber'
      }
    ]
  },

  // ✅ 용의자별 선택 노드 추가
  incomplete_suspect_choice_stangerson: {
    id: 'incomplete_suspect_choice_stangerson',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[셜록 홈즈]: 조셉 스탠거슨... 유산 상속자이자 집사.

그에겐 동기가 있어. 백작을 제거하면 모든 유산이 그에게 돌아가지.

[왓슨]: 하지만 백작이 살아있어야 상속할 수 있지 않나?

[홈즈]: 그게 더 흥미로운 점이야. 무언가 숨기고 있어.`,
    nextNode: 'incomplete_investigation_timeskip'
  },

  incomplete_suspect_choice_drebber: {
    id: 'incomplete_suspect_choice_drebber',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[셜록 홈즈]: 이녹 드레버... 유산에서 제외된 옛 동업자.

5만 파운드의 빚... 그리고 백작과의 금전 분쟁.

[왓슨]: 충분한 동기군.

[홈즈]: 하지만 알리바이가 있어. 여관에 있었다고 했지. 확인이 필요해.`,
    nextNode: 'incomplete_investigation_timeskip'
  },

  // NOTE: incomplete_investigation_timeskip는 suspect-routes.ts에 정의되어 있음

  // ✅ 서재/뒷뜰에서도 최종 추리로 갈 수 있도록
  study_complete_to_deduction: {
    id: 'study_complete_to_deduction',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    text: `[서재 조사 완료]

금고를 열고 RACHE 메시지를 확인했다.

스탠거슨과도 대화를 나눴다.

[왓슨]: 홈즈, 이제 충분한 단서를 모은 것 같아.`,
    choices: [
      { 
        text: '💎 모든 단서를 종합해 완전한 추리를 한다', 
        nextNode: 'final_deduction_hub',
        requirement: { items: ['locket', 'ledger', 'will'] }
      },
      { 
        text: '🔍 지금까지의 단서로 추리를 시작한다', 
        nextNode: 'incomplete_deduction_hub',
        requirement: { items: ['ledger', 'will'] },
        hideIfHasItem: 'locket'
      },
      { 
        text: '🔍 다른 곳을 더 조사한다', 
        nextNode: 'main_entrance_return_study' 
      }
    ]
  },

  backyard_complete_to_deduction: {
    id: 'backyard_complete_to_deduction',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    text: `[뒷뜰 조사 완료]

우물에서 호프를 만났고, 마구간도 확인했다.

[왓슨]: 홈즈, 모든 장소를 조사한 것 같아.`,
    choices: [
      { 
        text: '💎 모든 단서를 종합해 완전한 추리를 한다', 
        nextNode: 'final_deduction_hub',
        requirement: { items: ['locket', 'ledger', 'will'] }
      },
      { 
        text: '🔍 지금까지의 단서로 추리를 시작한다', 
        nextNode: 'incomplete_deduction_hub',
        requirement: { items: ['ledger', 'will'] },
        hideIfHasItem: 'locket'
      },
      { 
        text: '🔍 다른 곳을 더 조사한다', 
        nextNode: 'main_entrance_return_backyard' 
      }
    ]
  }
};