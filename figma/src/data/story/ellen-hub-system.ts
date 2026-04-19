import { StoryNode } from '../../types/story';

/**
 * 🌹 엘렌 허브 시스템 & 루시 편지 연결 체인
 * 
 * 목적:
 * 1. 엘렌 대화 중앙 허브 (무한 루프 방지)
 * 2. acquire_lucy_letter → ellen_receives_locket 연결
 * 3. 단서 기반 대화 해금 시스템
 */

export const ellenHubNodes: Record<string, StoryNode> = {
  
  // ═══════════════════════════════════════════════════════
  // 🆕 엘렌 대화 허브 (중앙 노드)
  // ═══════════════════════════════════════════════════════
  
  ellen_hub: {
    id: 'ellen_hub',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 조용히 당신을 기다린다.
    
무엇을 물어보시겠습니까?`,
    choices: [
      { 
        text: '🌹 \"어머니 루시에 대해 들려주세요\"', 
        nextNode: 'ellen_lucy_memory',
        hideIfVisitedNode: 'ellen_lucy_memory'
      },
      { 
        text: '💬 \"백작님은 어디 계신가요?\"', 
        nextNode: 'ellen_knows_count_missing',
        hideIfVisitedNode: 'ellen_knows_count_missing'
      },
      { 
        text: '🔍 \"어디에 숨어계셨나요?\"', 
        nextNode: 'ellen_hiding_place',
        hideIfVisitedNode: 'ellen_hiding_place'
      },
      { 
        text: '📜 \"루시의 편지를 찾았습니다\"', 
        nextNode: 'show_lucy_letter_to_ellen',
        requiredItem: '루시의 편지',
        hideIfVisitedNode: 'show_lucy_letter_to_ellen'
      },
      { 
        text: '🎯 \"함께 백작과 호프를 찾읍시다\"', 
        nextNode: 'ellen_ready_to_confront',
        requiredVisitedNodes: ['show_lucy_letter_to_ellen', 'ellen_lucy_memory'],
        hideIfVisitedNode: 'ellen_ready_to_confront'
      },
      { 
        text: '🚪 \"이제 가보겠습니다\"', 
        nextNode: 'leave_ellen'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🆕 루시 편지 → 엘렌 반응 체인
  // ═══════════════════════════════════════════════════════

  show_lucy_letter_to_ellen: {
    id: 'show_lucy_letter_to_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"엘렌 양, 이것을 보십시오."

당신이 우물에서 찾은 편지를 꺼낸다.

낡고 찢어진 종이... 루시의 마지막 글씨...

엘렌이 편지를 받아든다.

[엘렌]: 이건...

그녀가 떨리는 손으로 편지를 읽는다.

"사랑하는 제퍼슨에게... 백작이 아버지를 속였어요. 재산이 모두... 저는 병에 걸렸어요... 치료비가... 제발... - Lucy"

엘렌의 눈에서 눈물이 흐른다.

[엘렌]: 어머니의... 글씨...

[엘렌]: 제가 태어나기 직전에... 쓰신 거예요...

그녀가 편지를 가슴에 안는다.`,
    choices: [
      { text: '💬 \"호프가 이 편지를 남겼습니다\"', nextNode: 'ellen_hope_left_letter' },
      { text: '🌹 \"어머니의 유품이 더 있습니다\"', nextNode: 'show_locket_to_ellen' }
    ]
  },

  ellen_hope_left_letter: {
    id: 'ellen_hope_left_letter',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 호프님이... 이 편지를...

[왓슨]: 네. 우물가에 남겨두셨습니다.

[엘렌]: 20년... 20년간 간직하고 계셨군요...

그녀가 로켓을 꺼내 펼친다.

안에는 루시의 초상화가 들어있다.

[엘렌]: 저도... 어머니를 그리워했어요. 한 번도 본 적 없지만...

[엘렌]: 호프님은... 제 친아버지... 맞나요?

[왓슨]: ...

침묵이 흐른다.

[엘렌]: 백작님이... 한 번 말씀하신 적 있어요.

[엘렌]: "너는 루시의 딸이다. 하지만 내가 키웠으니 내 딸이기도 하다"라고...

그녀가 눈물을 흘린다.`,
    choices: [
      { text: '💬 \"호프를 만나고 싶습니까?\"', nextNode: 'ellen_wants_to_meet_hope' },
      { text: '🌹 \"두 아버지 모두 당신을 사랑합니다\"', nextNode: 'ellen_two_fathers' }
    ]
  },

  show_locket_to_ellen: {
    id: 'show_locket_to_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    conditionalText: [
      {
        condition: { hasItem: '루시의 로켓' },
        text: `"이것도 보십시오."

당신이 루시의 로켓을 꺼낸다.

은빛으로 빛나는 로켓... 루시의 초상화가 들어있다.

엘렌이 보더니 놀란다.

[엘렌]: 그건... 어머니의 로켓!

[왓슨]: 호프가 가지고 있었습니다.

엘렌이 자신의 로켓과 비교한다.

똑같은 디자인... 하지만 호프의 것은 더 낡았다.

[엘렌]: 호프님이... 20년간...

그녀가 두 로켓을 함께 쥔다.

[엘렌]: 우리 모두... 어머니를 잊지 못했군요...`
      }
    ],
    text: `[엘렌]: 어머니의 유품...

그녀가 자신의 로켓을 펼쳐 보인다.

[엘렌]: 이것만 가지고 있어요. 백작님이 주신...

[왓슨]: 호프도 같은 로켓을 가지고 있습니다.

[엘렌]: ...

그녀의 눈에 눈물이 맺힌다.`,
    choices: [
      { text: '💬 \"호프를 만나야 합니다\"', nextNode: 'ellen_wants_to_meet_hope' },
      { text: '🌹 \"당신에게는 두 아버지가 있습니다\"', nextNode: 'ellen_two_fathers' },
      { text: '🔙 \"다른 이야기를 하죠\"', nextNode: 'ellen_hub' }
    ]
  },

  ellen_wants_to_meet_hope: {
    id: 'ellen_wants_to_meet_hope',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 호프님을... 만나고 싶어요.

[왓슨]: ...

[엘렌]: 제 친아버지... 어머니를 사랑했던 분...

[엘렌]: 20년간 어머니를 잊지 못한 분...

그녀가 편지를 꼭 쥔다.

[엘렌]: 하지만... 저 때문에 어머니가 돌아가셨다면...

[엘렌]: 호프님이 저를... 원망하실까요?

홈즈가 조용히 말한다.

[셜록 홈즈]: 아니오. 그는 당신을 지키려 여기 온 겁니다.

엘렌이 놀란다.`,
    choices: [
      { text: '🔍 \"호프가 백작을 감금한 이유를 아십니까?\"', nextNode: 'ellen_knows_ritual_plan' },
      { text: '💬 \"함께 호프를 찾읍시다\"', nextNode: 'ellen_agrees_to_find_hope' },
      { text: '🔙 \"잠깐, 다른 걸 먼저 묻겠습니다\"', nextNode: 'ellen_hub' }
    ]
  },

  ellen_two_fathers: {
    id: 'ellen_two_fathers',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"엘렌 양, 당신에게는 두 아버지가 있습니다."

엘렌이 당신을 본다.

[왓슨]: 백작... 20년간 당신을 키우고 지켜준 분.

[왓슨]: 그리고 호프... 루시를 사랑했고 당신을 그리워한 분.

[왓슨]: 두 분 모두... 당신을 사랑합니다.

엘렌이 눈물을 흘린다.

[엘렌]: 하지만... 두 분은... 원수 사이잖아요...

[홈즈]: 아직은. 하지만 당신이 있다면...

홈즈가 당신을 본다.

[홈즈]: 화해시킬 수 있을 겁니다.

엘렌이 고개를 끄덕인다.`,
    choices: [
      { text: '💬 \"함께 두 분을 찾읍시다\"', nextNode: 'ellen_agrees_to_find_both' },
      { text: '🔍 \"백작님은 어디 계신지 아십니까?\"', nextNode: 'ellen_knows_count_location' },
      { text: '🔙 \"먼저 다른 것을 묻겠습니다\"', nextNode: 'ellen_hub' }
    ]
  },

  ellen_agrees_to_find_hope: {
    id: 'ellen_agrees_to_find_hope',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 네... 함께 가겠습니다.

그녀가 편지와 로켓을 조심스럽게 챙긴다.

[엘렌]: 호프님께... 어머니의 편지를 전해드려야 해요.

[엘렌]: 그리고... 제가 살아있다는 것도...

홈즈가 고개를 끄덕인다.

[홈즈]: 먼저 백작의 위치를 찾아야 합니다. 호프도 그곳에 있을 겁니다.

엘렌이 일어선다.`,
    choices: [
      { text: '🚪 \"지하실로 갑시다\"', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' },
      { text: '🔍 \"먼저 더 조사합시다\"', nextNode: 'continue_investigation_with_ellen' }
    ]
  },

  ellen_agrees_to_find_both: {
    id: 'ellen_agrees_to_find_both',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 두 아버지 모두... 찾고 싶어요.

그녀가 결연한 표정을 짓는다.

[엘렌]: 백작님도... 호프님도... 제게는 소중한 분들이에요.

[엘렌]: 20년의 원한을... 끝낼 수 있다면...

홈즈가 미소 짓는다.

[홈즈]: 용감하군요.

[왓슨]: 함께 갑시다.

엘렌이 고개를 끄덕인다.`,
    choices: [
      { text: '🚪 \"지하실로 갑시다\"', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' },
      { text: '🔍 \"먼저 백작을 찾아야 합니다\"', nextNode: 'search_for_count_with_ellen' }
    ]
  },

  ellen_knows_ritual_plan: {
    id: 'ellen_knows_ritual_plan',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: ...의식.

그녀의 얼굴이 창백해진다.

[엘렌]: 제가 말씀드릴게요. 전부.

[엘렌]: 2주 전... 저는 우연히 지하실을 발견했어요.

[엘렌]: 백작님이 금지하신 곳이었지만... 호기심에...

그녀가 떨린다.

[엘렌]: 의식실이 있었어요. 제단... 그리고...

[엘렌]: 제 이름이 새겨진 드레스가...

[왓슨]: ...!

[엘렌]: 저는... 두려웠어요. 백작님이... 저를...

[엘렌]: 어머니처럼... "영원한 신부 의식"에...

그녀가 눈물을 흘린다.

[엘렌]: 그래서 호프님을 찾아갔어요. 여관에...

[엘렌]: 모든 걸 말씀드렸죠.

홈즈가 숨을 들이킨다.

[홈즈]: 그래서 호프가 백작을 감금한 거군요...

[홈즈]: 의식을 막기 위해서...`,
    choices: [
      { text: '💬 \"당신을 지키기 위해서였습니다\"', nextNode: 'ellen_hope_protected_her' },
      { text: '🔍 \"백작님이 정말 그런 계획을?\"', nextNode: 'ellen_count_doubt' }
    ]
  },

  ellen_hope_protected_her: {
    id: 'ellen_hope_protected_her',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"호프는 당신을 지키려 했습니다."

엘렌이 당신을 본다.

[왓슨]: 딸을 지키기 위해... 복수를 멈추고...

[왓슨]: 백작을 죽이지 않고 감금한 겁니다.

엘렌이 눈물을 흘린다.

[엘렌]: 호프님이... 저를...

[홈즈]: 그는 20년간 당신을 찾았습니다.

[홈즈]: 그리고 당신이 위험에 처했을 때... 행동했죠.

엘렌이 주저앉는다.

[엘렌]: 저는... 아버지들을 모두 만나야 해요...

[엘렌]: 진실을 밝혀야 해요...`,
    choices: [
      { text: '💬 \"함께 갑시다\"', nextNode: 'ellen_ready_to_confront' },
      { text: '🌹 \"용기를 내십시오\"', nextNode: 'encourage_ellen' }
    ]
  },

  ellen_count_doubt: {
    id: 'ellen_count_doubt',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 저도... 확신할 수 없어요.

그녀가 고개를 숙인다.

[엘렌]: 백작님은 저를 사랑하셨어요. 20년간...

[엘렌]: 하지만 교단에 대한 광신도... 있었어요.

[엘렌]: 가끔... 밤에 지하실로 내려가시면서...

[엘렌]: "루시여, 용서하라... 엘렌은 구원받아야 한다"고 중얼거리셨어요.

홈즈가 메모한다.

[홈즈]: 두 가지 가능성이 있습니다.

[홈즈]: 1. 백작이 정말 의식을 계획했다.

[홈즈]: 2. 누군가 백작을 이용해 엘렌을 노렸다.

엘렌이 고개를 든다.

[엘렌]: 진실을... 알고 싶어요.`,
    choices: [
      { text: '🔍 \"함께 조사합시다\"', nextNode: 'investigate_with_ellen' },
      { text: '🚪 \"지하실로 갑시다\"', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' }
    ]
  },

  leave_ellen: {
    id: 'leave_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `\"이제 가보겠습니다.\"\n\n엘렌이 고개를 끄덕인다.\n\n[엘렌]: 네... 조심히 가세요.\n\n[엘렌]: 탐정님들... 부탁드립니다.\n\n[엘렌]: 아버지를... 두 분 모두 구해주세요.\n\n당신이 고개를 끄덕이고 방을 나선다.`,
    choices: [
      { text: '🚪 복도로 돌아간다', nextNode: 'bedroom' }
    ]
  },

  ellen_ready_to_confront: {
    id: 'ellen_ready_to_confront',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 일어선다.

[엘렌]: 네. 함께 가겠습니다.

그녀가 편지와 로켓을 챙긴다.

[엘렌]: 이제... 모든 진실을 밝힐 시간이에요.

[엘렌]: 백작님도, 호프님도... 만나야 해요.

홈즈가 고개를 끄덕인다.

[홈즈]: 용감합니다.

셋이 함께 문을 나선다.`,
    choices: [
      { text: '🚪 지하실로 향한다', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' },
      { text: '🔍 먼저 증거를 더 모은다', nextNode: 'investigate_with_ellen' }
    ]
  },

  encourage_ellen: {
    id: 'encourage_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"용기를 내십시오, 엘렌 양."

당신이 그녀의 어깨에 손을 얹는다.

[왓슨]: 당신은 혼자가 아닙니다.

[왓슨]: 백작도, 호프도... 모두 당신을 사랑합니다.

[왓슨]: 그 사랑이... 20년의 원한을 이길 수 있습니다.

엘렌이 눈물을 닦는다.

[엘렌]: 감사합니다, 왓슨 박사님.

[엘렌]: 저... 용기를 내겠습니다.

그녀가 일어선다.`,
    choices: [
      { text: '💬 \"함께 갑시다\"', nextNode: 'ellen_ready_to_confront' }
    ]
  },

  investigate_with_ellen: {
    id: 'investigate_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 함께 조사를 돕기로 한다.

[엘렌]: 제가 아는 것들을 말씀드릴게요.

[홈즈]: 도움이 될 겁니다.

셋이 함께 저택을 조사하기 시작한다.`,
    choices: [
      { text: '🔍 서재로 간다', nextNode: 'study' },
      { text: '🚪 지하실로 간다', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' }
    ]
  },

  search_for_count_with_ellen: {
    id: 'search_for_count_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌과 함께 백작을 찾기 시작한다.

[엘렌]: 아버지가 자주 가시던 곳들이 있어요...

[엘렌]: 서재, 부엌... 그리고...

그녀가 멈춘다.

[엘렌]: 지하실.

홈즈가 고개를 끄덕인다.`,
    choices: [
      { text: '🚪 지하실로 간다', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' },
      { text: '🔍 다른 곳을 먼저 조사한다', nextNode: 'investigate_with_ellen' }
    ]
  },

  continue_investigation_with_ellen: {
    id: 'continue_investigation_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 함께하기로 한다.

[엘렌]: 제가 도울 수 있는 일이 있다면...

[홈즈]: 저택에 대해 물어볼 것들이 있습니다.

함께 조사를 계속한다.`,
    choices: [
      { text: '🔍 서재로 간다', nextNode: 'study' },
      { text: '🔍 부엌을 조사한다', nextNode: 'kitchen_entrance' }
    ]
  },

  ellen_knows_count_location: {
    id: 'ellen_knows_count_location',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 아버지는... 아마...

그녀가 망설인다.

[엘렌]: 지하실에 계실 거예요.

[왓슨]: 지하실?

[엘렌]: 네. 아버지가 어머니를 위해 만든... 속죄실이 있어요.

[엘렌]: 그리고 그 옆에... 의식실도...

홈즈가 메모한다.

[홈즈]: 그곳으로 안내해주시겠습니까?

엘렌이 고개를 끄덕인다.`,
    choices: [
      { text: '🚪 함께 지하실로 간다', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' },
      { text: '🔍 먼저 준비를 한다', nextNode: 'prepare_before_basement' }
    ]
  },

  prepare_before_basement: {
    id: 'prepare_before_basement',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `"먼저 준비를 합시다."

홈즈가 고개를 끄덕인다.

[홈즈]: 그래. 증거를 모두 모으고 가는 게 좋겠어.

엘렌도 동의한다.

증거를 정리하고 지하실로 향할 준비를 한다.`,
    choices: [
      { text: '🔍 증거를 정리한다', nextNode: 'organize_evidence_with_ellen' },
      { text: '🚪 이제 지하실로 간다', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' }
    ]
  },

  organize_evidence_with_ellen: {
    id: 'organize_evidence_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 증거들을 정리한다.

[홈즈]: 루시의 편지, 의식 계획 메모, 협박 편지들...

[홈즈]: 이제 퍼즐이 맞춰지고 있어.

엘렌이 자신의 증거도 꺼낸다.

[엘렌]: 이것도... 도움이 될까요?

함께 증거를 분석한다.`,
    choices: [
      { text: '🚪 지하실로 간다', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' },
      { text: '🔍 홈즈와 추론한다', nextNode: 'deduce_with_holmes_and_ellen' }
    ]
  },

  deduce_with_holmes_and_ellen: {
    id: 'deduce_with_holmes_and_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 추리를 시작한다.

[홈즈]: 백작은 루시의 죽음을 후회했어.

[홈즈]: 엘렌을 20년간 지켰지.

[홈즈]: 하지만 누군가 백작을 이용해 엘렌을 노렸어.

[홈즈]: 호프가 그것을 알아내고 백작을 감금했고...

엘렌이 고개를 끄덕인다.

[엘렌]: 그럼... 진짜 범인은...?

홈즈가 당신을 본다.

[홈즈]: 이제 확인할 시간이야.`,
    choices: [
      { text: '🚪 지하실로 향한다', nextNode: 'ellen_to_basement', requiredVisitedNode: 'find_basement' }
    ]
  },

  ellen_to_basement: {
    id: 'ellen_to_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌과 함께 지하실로 향한다.

[엘렌]: 드디어... 모든 진실을...

그녀가 떨리는 손으로 지하실 입구를 가리킨다.

어둠 속으로 내려간다.`,
    choices: [
      { text: '⬇️ 지하실로 내려간다', nextNode: 'basement_scene_with_ellen' }
    ]
  },

  basement_scene_with_ellen: {
    id: 'basement_scene_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `지하실 속죄실...

백작이 의자에 묶여있다.

호프가 옆에 서 있다.

엘렌이 들어서자... 모든 것이 멈춘다.

[모로 백작]: ...엘렌...

[제퍼슨 호프]: ...엘렌...

엘렌이 두 남자를 본다.

[엘렌]: 아버지들...

눈물이 흐른다.

20년의 운명이... 이 순간 교차한다.`,
    choices: [
      { text: '💬 "세 분... 대화가 필요합니다"', nextNode: 'mediate_three_way_talk' },
      { text: '🌹 "엘렌이 중재하게 합니다"', nextNode: 'ellen_mediates' }
    ]
  },

  mediate_three_way_talk: {
    id: 'mediate_three_way_talk',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"세 분 모두... 대화가 필요합니다."

백작과 호프가 엘렌을 본다.

엘렌이 앞으로 나선다.

[엘렌]: 저는... 두 분 모두의 딸입니다.

[엘렌]: 백작님... 저를 20년간 키워주셨어요.

[엘렌]: 호프님... 어머니를 사랑하셨고 저를 그리워하셨어요.

그녀가 두 손을 펼친다.

[엘렌]: 이제... 원한을 끝냅시다.

침묵이 흐른다.

백작이 눈물을 흘린다.

[모로 백작]: 엘렌... 미안하다...

호프도 눈물을 흘린다.

[제퍼슨 호프]: 루시... 우리 딸을... 잘 키워줘서... 고맙소...

두 남자가 서로를 본다.

20년의 증오가... 조금씩 녹기 시작한다.`,
    choices: [
      { text: '🌹 계속 중재한다', nextNode: 'reconcile_all_three' }
    ]
  },

  ellen_mediates: {
    id: 'ellen_mediates',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'ellen',
    text: `엘렌이 두 아버지 사이에 선다.

[엘렌]: 백작님.

백작이 그녀를 본다.

[엘렌]: 저를 지켜주셔서 감사해요. 20년간...

백작이 흐느낀다.

[엘렌]: 호프님.

호프가 그녀를 본다.

[엘렌]: 어머니를 사랑해주셔서 감사해요. 그리고 저를 찾아주셔서...

호프가 눈물을 흘린다.

[엘렌]: 두 분 모두... 제게는 아버지예요.

그녀가 두 손을 내민다.

백작과 호프가... 엘렌의 손을 잡는다.

셋이 함께... 눈물을 흘린다.

20년의 비극이... 마침내... 치유되기 시작한다.`,
    choices: [
      { text: '🌹 조용히 지켜본다', nextNode: 'true_ending_reconciliation' },
      { text: '💬 축복의 말을 건넨다', nextNode: 'watson_blesses_family' }
    ]
  },

  reconcile_all_three: {
    id: 'reconcile_all_three',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"엘렌이... 당신들을 이어줍니다."

백작과 호프가 엘렌을 본다.

[왓슨]: 루시는 죽었습니다. 하지만 그녀의 딸은 살아있습니다.

[왓슨]: 엘렌은... 두 분 모두를 필요로 합니다.

백작이 밧줄을 풀어달라는 듯 호프를 본다.

호프가 망설이다가... 밧줄을 푼다.

백작이 일어서서... 호프에게 손을 내민다.

[모로 백작]: 미안하오... 호프... 루시를... 당신을... 모두...

호프가 떨리는 손으로... 백작의 손을 잡는다.

[제퍼슨 호프]: 저도... 미안하오... 복수만 생각했소...

두 남자가 악수한다.

엘렌이 그 모습을 보고 눈물을 흘린다.

당신도... 눈물이 난다.

20년의 원한이... 마침내 끝난다.`,
    choices: [
      { text: '🌹 \"이제 평화를...\"', nextNode: 'true_ending_reconciliation' }
    ]
  },

  watson_blesses_family: {
    id: 'watson_blesses_family',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"축복합니다... 세 분 모두."

당신이 말한다.

[왓슨]: 루시도... 하늘에서 기뻐하실 겁니다.

엘렌이 당신을 보고 미소 짓는다.

백작과 호프도... 처음으로 진심 어린 미소를 짓는다.

홈즈가 조용히 말한다.

[홈즈]: 이것이... 진정한 정의군요.

모두가 함께... 루시의 초상화를 본다.

그녀의 미소가... 모두를 축복하는 것 같다.`,
    choices: [
      { text: '🌟 [트루 엔딩]', nextNode: 'true_ending_reconciliation' }
    ]
  }
};