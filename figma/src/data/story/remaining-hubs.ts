import { StoryNode } from '../../types/story';

/**
 * 🎯 남은 허브 시스템 완성
 * 
 * 1. 백작 허브 (count_hub) - 백작 대화 중앙 관리
 * 2. 여관 허브 (inn_investigation_hub) - 여관 조사 중앙 관리
 * 3. 다락방 허브 (attic_investigation_hub) - 다락방 조사 중앙 관리
 * 4. 스탠거슨 → 드레버 폭로 (조건부 진행)
 */

export const remainingHubNodes: Record<string, StoryNode> = {

  // ═══════════════════════════════════════════════════════
  // 🆕 1. 백작 허브 (count_hub)
  // ═══════════════════════════════════════════════════════
  
  count_hub: {
    id: 'count_hub',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `백작이 의자에 묶인 채 당신을 본다.

[모로 백작]: 탐정님... 무엇이든 물어보십시오.

그의 목소리가 지쳐있다. 하지만 눈빛은 진지하다.

무엇을 물어보시겠습니까?`,
    choices: [
      { 
        text: '💬 "루시에 대해 말씀해주십시오"', 
        nextNode: 'count_lucy_memory',
        hideIfVisitedNode: 'count_lucy_memory'
      },
      { 
        text: '🔍 "의식에 대해 말씀해주십시오"', 
        nextNode: 'ask_count_about_ritual',
        requiredVisitedNode: 'examine_ritual_tools',
        hideIfVisitedNode: 'ask_count_about_ritual'
      },
      { 
        text: '🌹 "엘렌을 어떻게 지켜왔습니까?"', 
        nextNode: 'ask_count_about_ellen',
        requiredVisitedNode: 'read_count_confession',
        hideIfVisitedNode: 'ask_count_about_ellen'
      },
      { 
        text: '🎯 "호프와 화해해야 합니다"', 
        nextNode: 'reconcile_count_and_hope',
        requiredVisitedNodes: ['ask_count_about_ritual', 'count_lucy_memory'],
        hideIfVisitedNode: 'reconcile_count_and_hope'
      },
      { 
        text: '✂️ "밧줄을 풀어드리겠습니다"', 
        nextNode: 'free_count_immediately'
      },
      { 
        text: '🚪 "잠시 후 다시 오겠습니다"', 
        nextNode: 'leave_count_alone'
      }
    ]
  },

  count_lucy_memory: {
    id: 'count_lucy_memory',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `백작이 루시의 초상화를 본다.

[모로 백작]: 루시... 그녀는 제 죄입니다.

[왓슨]: 무슨 뜻입니까?

[모로 백작]: 1860년... 저는 '영원한 구원 교단'의 설교자였습니다.

[모로 백작]: 브리검 영이 제게 계시를 내렸죠. "루시 페리어를 영원한 신부로 삼으라"고...

그가 눈을 감는다.

[모로 백작]: 저는... 믿었습니다. 신의 뜻이라고.

[모로 백작]: 하지만... 루시는 이미 호프의 아이를 임신하고 있었습니다.

[왓슨]: ...!

[모로 백작]: 의식을 강행했습니다. 루시는 거부했지만... 교단의 압력이... 너무 강했습니다.

그가 눈물을 흘린다.

[모로 백작]: 그리고... 엘렌이 태어났습니다. 하지만 루시는... 5일 만에...

[모로 백작]: 죽었습니다. 제 손으로.

침묵이 흐른다.

[모로 백작]: 그날 이후... 저는 교단을 떠났습니다. 엘렌을 데리고...

[모로 백작]: 20년간... 속죄했습니다.`,
    choices: [
      { text: '💬 "엘렌을 어떻게 키우셨습니까?"', nextNode: 'ask_count_about_ellen' },
      { text: '🔍 "의식에 대해 더 말씀해주십시오"', nextNode: 'ask_count_about_ritual', requiredVisitedNode: 'examine_ritual_tools' },
      { text: '🔙 "다른 것을 묻겠습니다"', nextNode: 'count_hub' }
    ]
  },

  ask_count_about_ellen: {
    id: 'ask_count_about_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `[왓슨]: 엘렌을 어떻게 지켜왔습니까?

백작이 미소 짓는다. 슬프지만 따뜻한 미소.

[모로 백작]: 엘렌... 루시의 마지막 선물...

[모로 백작]: 다락방을 만들었습니다. 세상으로부터 숨기기 위해...

[왓슨]: 20년간... 갇혀 살게 했다는 말입니까?

백작이 고개를 숙인다.

[모로 백작]: 제 가장 큰 죄입니다.

[모로 백작]: 하지만... 교단이 엘렌을 노렸습니다.

[모로 백작]: 드레버와 스탠거슨... 그들은 여전히 교단의 영향 아래 있었습니다.

[모로 백작]: 엘렌이 루시의 딸이라는 것을 알면... 또 다시 '영원한 신부 의식'을...

그가 떨린다.

[모로 백작]: 그래서 숨겼습니다. 20년간...

[모로 백작]: 교육시켰습니다. 책을 읽게 하고, 생각하게 하고...

[모로 백작]: 하지만... 자유를 주지 못했습니다.

홈즈가 조용히 말한다.

[홈즈]: 감옥과 보호의 경계는 종이 한 장 차이죠.

백작이 고개를 끄덕인다.

[모로 백작]: 맞습니다... 저는... 엘렌을 감금한 겁니다. 사랑이라는 이름으로...`,
    choices: [
      { text: '💬 "엘렌은 밖으로 나가고 싶어했습니까?"', nextNode: 'count_ellen_wanted_freedom' },
      { text: '🔍 "의식 계획은 누가 세웠습니까?"', nextNode: 'count_ritual_conspiracy', requiredVisitedNode: 'examine_ritual_tools' },
      { text: '🔙 "다른 것을 묻겠습니다"', nextNode: 'count_hub' }
    ]
  },

  count_ellen_wanted_freedom: {
    id: 'count_ellen_wanted_freedom',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `[모로 백작]: 엘렌은... 착한 아이였습니다.

[모로 백작]: 불평하지 않았습니다. 하지만...

그가 눈을 감는다.

[모로 백작]: 일기장을 봤습니다. 몰래...

[모로 백작]: "새처럼 날고 싶어요"... "밖을 보고 싶어요"... "친구가 있었으면 좋겠어요"...

그가 흐느낀다.

[모로 백작]: 제가... 엘렌의 삶을 빼앗았습니다.

[모로 백작]: 지키려 했지만... 결국 가둔 겁니다.

[왓슨]: ...

백작이 당신을 본다.

[모로 백작]: 엘렌을... 자유롭게 해주십시오.

[모로 백작]: 제가 할 수 없었던 것을...`,
    choices: [
      { text: '💬 "엘렌을 만나게 해드리겠습니다"', nextNode: 'promise_ellen_meeting' },
      { text: '🔙 "다른 것을 묻겠습니다"', nextNode: 'count_hub' }
    ]
  },

  count_ritual_conspiracy: {
    id: 'count_ritual_conspiracy',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `[왓슨]: 의식실의 드레스... 엘렌의 이름이 새겨져 있었습니다.

백작의 얼굴이 창백해진다.

[모로 백작]: ...뭐라고요?

[왓슨]: 당신이 계획한 게 아니었습니까?

[모로 백작]: 아닙니다! 절대로!

그가 절규한다.

[모로 백작]: 저는... 교단을 떠났습니다! 20년 전에!

[모로 백작]: 의식 같은 건... 다시는 하지 않겠다고 맹세했습니다!

홈즈가 날카롭게 묻는다.

[홈즈]: 그럼 누가 그 드레스를 준비했죠?

백작이 멈춘다.

[모로 백작]: ...드레버... 스탠거슨...

[모로 백작]: 그들이... 여전히 교단의 명령을 따르고 있었습니다...

[모로 백작]: 저는 몰랐습니다... 그들이 엘렌을...

그가 주먹을 쥔다.

[모로 백작]: 호프가... 알아냈습니다.

[모로 백작]: 그래서 저를 감금한 겁니다. 의식을 막기 위해...

홈즈가 고개를 끄덕인다.

[홈즈]: 이제 이해됩니다. 호프는 당신을 죽이려 한 게 아니라... 엘렌을 지키려 한 거군요.

백작이 눈물을 흘린다.

[모로 백작]: 호프... 미안합니다...`,
    choices: [
      { text: '🎯 "호프와 화해해야 합니다"', nextNode: 'reconcile_count_and_hope' },
      { text: '🔙 "다른 것을 묻겠습니다"', nextNode: 'count_hub' }
    ]
  },

  promise_ellen_meeting: {
    id: 'promise_ellen_meeting',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `백작이 당신을 본다.

[모로 백작]: 엘렌을... 만날 수 있을까요...?

[왓슨]: 물론입니다. 그녀도 당신을 찾고 있습니다.

백작이 눈물을 흘린다.

[모로 백작]: 감사합니다... 감사합니다...

[모로 백작]: 제가... 얼마나 미안한지... 전해주십시오...

당신이 고개를 끄덕인다.`,
    choices: [
      { text: '🔙 "다른 것을 묻겠습니다"', nextNode: 'count_hub' },
      { text: '🌹 "엘렌을 데려오겠습니다"', nextNode: 'fetch_ellen_for_count' }
    ]
  },

  reconcile_count_and_hope: {
    id: 'reconcile_count_and_hope',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"백작님, 호프와 화해하셔야 합니다."

백작이 고개를 숙인다.

[모로 백작]: 저는... 그럴 자격이...

[왓슨]: 엘렌을 위해서라도.

백작이 고개를 든다.

[모로 백작]: ...엘렌...

[왓슨]: 엘렌에게는 두 아버지가 필요합니다.

[왓슨]: 루시를 사랑한 호프... 그리고 엘렌을 20년간 키운 당신...

백작이 눈물을 흘린다.

[모로 백작]: 호프가... 용서해줄까요...?

홈즈가 조용히 말한다.

[홈즈]: 엘렌이 다리가 되어줄 겁니다.

백작이 고개를 끄덕인다.

[모로 백작]: 알겠습니다... 호프를... 만나겠습니다.`,
    choices: [
      { text: '🌹 "함께 진실을 밝힙시다"', nextNode: 'prepare_final_confrontation' },
      { text: '🔙 "먼저 다른 것을 확인하겠습니다"', nextNode: 'count_hub' }
    ]
  },

  leave_count_alone: {
    id: 'leave_count_alone',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"잠시 후 다시 오겠습니다."

백작이 고개를 끄덕인다.

[모로 백작]: 알겠습니다... 저는... 여기 있겠습니다.

당신이 돌아서 계단을 올라간다.`,
    choices: [
      { text: '⬆️ 부엌으로 올라간다', nextNode: 'kitchen_entrance' }
    ]
  },

  fetch_ellen_for_count: {
    id: 'fetch_ellen_for_count',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    text: `"엘렌을 데려오겠습니다."

백작이 얼굴을 밝힌다.

[모로 백작]: 정말... 감사합니다...

당신이 위층으로 올라가 엘렌을 찾는다.

[전개를 위해 엘렌 허브 시스템과 연결 필요]`,
    choices: [
      { text: '⬆️ 엘렌을 찾으러 간다', nextNode: 'ellen_hub' }
    ]
  },

  prepare_final_confrontation: {
    id: 'prepare_final_confrontation',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `홈즈가 말한다.

[홈즈]: 이제... 모든 조각이 맞춰지고 있어.

[홈즈]: 백작, 호프, 엘렌... 그리고 진범...

[왓슨]: 드레버나 스탠거슨 중 하나겠죠?

[홈즈]: 아니면 둘 다일 수도 있지.

홈즈가 당신을 본다.

[홈즈]: 최종 추리를 준비해야 해, 왓슨.`,
    choices: [
      { text: '🎯 "증거를 모두 정리합시다"', nextNode: 'organize_all_evidence' },
      { text: '🔙 "먼저 백작과 더 대화하겠습니다"', nextNode: 'count_hub' }
    ]
  },

  organize_all_evidence: {
    id: 'organize_all_evidence',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 증거들을 정리한다.

[홈즈]: 루시의 편지, 의식 계획 메모, 협박 편지들, 진흙 샘플...

[홈즈]: 그리고 각 용의자의 증언들...

[왓슨]: 누가 진범일까요?

홈즈가 미소 짓는다.

[홈즈]: 이제 알아낼 시간이야.`,
    choices: [
      { text: '🎯 "최종 추리를 시작합니다"', nextNode: 'final_deduction_hub' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🆕 2. 여관 허브 (inn_investigation_hub)
  // ═══════════════════════════════════════════════════════

  inn_investigation_hub: {
    id: 'inn_investigation_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'inn',
    character: 'watson',
    text: `그린 라이온 여관.

낡은 간판이 삐걱거린다.

홈즈가 주변을 살핀다.

어디를 조사하시겠습니까?`,
    choices: [
      { 
        text: '💬 "여관 주인과 대화한다"', 
        nextNode: 'inn_meet_innkeeper',
        hideIfVisitedNode: 'inn_meet_innkeeper'
      },
      { 
        text: '🔍 "로비를 조사한다"', 
        nextNode: 'inn_lobby_investigate',
        hideIfVisitedNode: 'inn_lobby_investigate'
      },
      { 
        text: '🚪 "드레버의 방을 조사한다"', 
        nextNode: 'inn_ask_room_search',
        requiredVisitedNode: 'inn_ask_night_activity'
      },
      { 
        text: '🏠 "저택으로 돌아간다"', 
        nextNode: 'main_entrance'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🆕 3. 다락방 허브 (attic_investigation_hub)
  // ═══════════════════════════════════════════════════════

  attic_investigation_hub: {
    id: 'attic_investigation_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    text: `다락방... 엘렌이 20년간 살았던 공간.

좁지만 깔끔하게 정돈되어 있다.

홈즈가 주변을 살핀다.

무엇을 조사하시겠습니까?`,
    choices: [
      { 
        text: '📖 "일기장을 읽는다"', 
        nextNode: 'ellen_diary_attic',
        hideIfVisitedNode: 'ellen_diary_attic'
      },
      { 
        text: '🛏️ "침대 주변을 조사한다"', 
        nextNode: 'attic_bed_area',
        hideIfVisitedNode: 'attic_bed_area'
      },
      { 
        text: '📚 "책장을 살펴본다"', 
        nextNode: 'attic_bookshelf',
        hideIfVisitedNode: 'attic_bookshelf'
      },
      { 
        text: '🪜 "아래층으로 내려간다"', 
        nextNode: 'bedroom'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🆕 4. 스탠거슨 → 드레버 폭로 (조건부 진행)
  // ═══════════════════════════════════════════════════════

  stangerson_final_revelation: {
    id: 'stangerson_final_revelation',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `"스탠거슨, 이제 모든 걸 말씀해주십시오."

당신이 단호하게 말하자 스탠거슨이 멈춘다.

[스탠거슨]: ...

[홈즈]: 우리는 이미 알고 있습니다. 호프, 협박 편지, 1861년 사건...

[홈즈]: 이제 진실을 말할 시간입니다.

스탠거슨이 한숨을 쉰다.

[스탠거슨]: ...알겠습니다.

그가 고개를 숙인다.

[스탠거슨]: 제가... 모든 걸 말씀드리겠습니다.

[스탠거슨]: 드레버의 계획... 교단의 음모... 모든 것을...`,
    choices: [
      { text: '💬 "계속하십시오"', nextNode: 'stangerson_reveals_drebber_plan' }
    ]
  }
};
