import { StoryNode } from '../../types/story';

/**
 * 🌹 엘렌 심문 노드들
 * 엘렌을 만나고 심도있게 대화하는 노드
 */

export const ellenInterrogation: Record<string, StoryNode> = {
  
  // ========== 엘렌과의 만남 (뒷뜰에서) ==========
  
  meet_ellen: {
    id: 'meet_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `뒷뜰에서 한 여성이 서 있다.

창백한 얼굴, 섬세한 인상, 어두운 드레스...

그녀가 당신을 발견하고 놀란다.

[엘렌]: "...누, 누구세요?"

홈즈가 모자를 벗는다.

[셜록 홈즈]: "셜록 홈즈입니다. 이쪽은 존 왓슨 박사님이고요."

[엘렌]: "탐정님들... 왜 여기에..."

그녀가 불안한 표정을 짓는다.

[왓슨]: "백작님의 실종 사건을 조사하고 있습니다. 실례지만, 당신은 누구십니까?"`,
    choices: [
      { text: '💬 "당신의 이름을 알려주시겠습니까?"', nextNode: 'ellen_name' },
      { text: '🔍 "왜 여기 숨어계셨습니까?"', nextNode: 'ellen_why_hiding' },
      { text: '🌹 "괜찮습니다. 무서워하지 마세요"', nextNode: 'ellen_reassurance' }
    ],
    onEnter: (context) => {
      context.flags.has_met_ellen = true;
    }
  },

  ellen_name: {
    id: 'ellen_name',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"당신의 이름을 알려주시겠습니까?"

그녀가 잠시 망설인다.

[엘렌]: "...엘렌입니다. 엘렌 페리어."

[왓슨]: "페리어...?"

홈즈의 눈빛이 날카로워진다.

[셜록 홈즈]: "루시 페리어의..."

[엘렌]: "네... 어머니의 딸입니다."

[왓슨]: "그렇다면... 백작님과는?"

엘렌이 고개를 숙인다.

[엘렌]: "아버지... 양아버지이십니다. 20년간 저를 키워주셨어요."`,
    choices: [
      { text: '💬 "어머니 루시에 대해 알고 계십니까?"', nextNode: 'ellen_about_lucy' },
      { text: '🔍 "왜 숨어살았습니까?"', nextNode: 'ellen_why_hiding' },
      { text: '🌹 "백작님이 당신을 보호하셨군요"', nextNode: 'ellen_count_protection' }
    ]
  },

  ellen_reassurance: {
    id: 'ellen_reassurance',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"괜찮습니다. 무서워하지 마세요."

당신이 부드럽게 말한다.

[왓슨]: "우리는 당신을 해칠 생각이 없습니다. 진실을 찾으려는 것뿐이에요."

엘렌이 조금 긴장을 푼다.

[엘렌]: "...감사합니다, 박사님."

홈즈가 말한다.

[셜록 홈즈]: "엘렌 양, 당��의 이야기를 듣고 싶습니다. 백작님에 대해서... 그리고 이 저택에서 무슨 일이 있었는지."

엘렌이 고개를 끄덕인다.

[엘렌]: "...알겠어요. 말씀드리겠습니다."`,
    choices: [
      { text: '💬 "당신은 백작님의 무엇입니까?"', nextNode: 'ellen_relationship_count' },
      { text: '🔍 "왜 숨어계셨습니까?"', nextNode: 'ellen_why_hiding' },
      { text: '🌹 "천천히 말씀하셔도 됩니다"', nextNode: 'ellen_takes_time' }
    ]
  },

  ellen_why_hiding: {
    id: 'ellen_why_hiding',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"왜 숨어계셨습니까?"

엘렌이 한숨을 쉰다.

[엘렌]: "...드레버와 스탠거슨 때문입니다."

[왓슨]: "그들이 당신을 해치려 했습니까?"

[엘렌]: "아버지가... 그렇게 생각하셨어요. 그들은 어머니를 괴롭힌 사람들이니까..."

홈즈가 묻는다.

[셜록 홈즈]: "백작은 당신을 어떻게 보호했습니까?"

[엘렌]: "다락방에 숨겨주셨어요. 그들이 올 때마다... 저는 그곳에 숨었습니다. 20년간..."

그녀의 목소리가 떨린다.

[엘렌]: "하지만 이번에는... 뭔가 달랐어요. 아버지가 너무 불안해하셨어요."`,
    choices: [
      { text: '💬 "무엇이 달랐습니까?"', nextNode: 'ellen_what_different' },
      { text: '🔍 "백작님은 지금 어디 계십니까?"', nextNode: 'ellen_count_location' },
      { text: '🌹 "20년간... 힘드셨겠군요"', nextNode: 'ellen_sympathy' }
    ]
  },

  ellen_about_lucy: {
    id: 'ellen_about_lucy',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"어머니 루시에 대해 알고 계십니까?"

엘렌이 로켓을 꺼내 펼친다.

[엘렌]: "저는... 어머니를 직접 본 적이 없어요."

[엘렌]: "제가 태어나기 직전에 돌아가셨으니까요."

[왓슨]: "..."

[엘렌]: "하지만 아버지가 많은 이야기를 해주셨어요. 어머니는 정의로운 분이었다고..."

그녀의 눈에 눈물이 맺힌다.

[엘렌]: "그리고 제퍼슨 호프라는 남자를 사랑했다고. 진심으로."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "제퍼슨 호프... 그가 이 저택에 왔다는 걸 알고 계십니까?"

엘렌이 떨린다.

[엘렌]: "...네. 들었어요."`,
    choices: [
      { text: '💬 "호프에 대해 어떻게 생각하십니까?"', nextNode: 'ellen_about_hope' },
      { text: '🔍 "백작님은 호프를 두려워했습니까?"', nextNode: 'ellen_count_fear_hope' },
      { text: '🌹 "어머니를 닮으셨군요"', nextNode: 'ellen_resembles_lucy' }
    ]
  },

  ellen_relationship_count: {
    id: 'ellen_relationship_count',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"당신은 백작님의 무엇입니까?"

엘렌이 답한다.

[엘렌]: "양딸입니다. 백작님이 어머니가 돌아가신 후... 저를 키워주셨어요."

[왓슨]: "20년간?"

[엘렌]: "네. 아버지는... 저를 정말 사랑하셨어요."

홈즈가 묻는다.

[셜록 홈즈]: "백작은 왜 당신을 숨겼습니까?"

[엘렌]: "드레버와 스탠거슨... 그들이 저를 해칠까봐 두려워하셨어요."

[엘렌]: "그들은 어머니를 괴롭힌 사람들이니까..."

[왓슨]: "백작은 당신을 보호하려 했군요."

엘렌이 고개를 끄덕인다.

[엘렌]: "네... 어머니를 지키지 못한 대신, 저만은 반드시 지키겠다고 하셨어요."`,
    choices: [
      { text: '💬 "백작님은 지금 어디 계십니까?"', nextNode: 'ellen_count_location' },
      { text: '🔍 "사건 당일 밤에 무엇을 보셨습니까?"', nextNode: 'ellen_night_witness' },
      { text: '🌹 "백작님이 좋은 아버지셨군요"', nextNode: 'ellen_good_father' }
    ]
  },

  ellen_takes_time: {
    id: 'ellen_takes_time',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"천천히 말씀하셔도 됩니다."

엘렌이 감사하다는 표정을 짓는다.

[엘렌]: "고맙습니다, 박사님."

그녀가 깊은 숨을 쉰다.

[엘렌]: "저는... 엘렌 페리어입니다. 루시 페리어의 딸이고요."

[엘렌]: "백작님이 20년간 저를 키워주셨어요. 숨겨서..."

[왓슨]: "숨겨서?"

[엘렌]: "네. 드레버와 스탠거슨으로부터... 그들은 어머니를 괴롭힌 사람들이거든요."

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: "이해했습니다. 백작은 당신을 보호하려 했군요."`,
    choices: [
      { text: '💬 "백작님은 지금 어디 계신 것 같습니까?"', nextNode: 'ellen_count_location' },
      { text: '🔍 "제퍼슨 호프에 대해 알고 계십니까?"', nextNode: 'ellen_about_hope' },
      { text: '🌹 "당신의 이야기를 더 들려주세요"', nextNode: 'ellen_more_story' }
    ]
  },

  ellen_count_protection: {
    id: 'ellen_count_protection',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작님이 당신을 보호하셨군요."

엘렌이 고개를 끄덕인다.

[엘렌]: "네... 아버지는 제게 모든 걸 주셨어요. 사랑도, 보호도..."

[엘렌]: "어머니를 지키지 못한 죄책감에... 저만은 반드시 지키겠다고 하셨어요."

[왓슨]: "훌륭한 분이시군요."

[엘렌]: "네... 하지만..."

그녀가 고개를 숙인다.

[엘렌]: "이번에는... 제가 아버지를 지켜야 하는데... 저는 아무것도 못했어요."

홈즈가 말한다.

[셜록 홈즈]: "아직 늦지 않았습니다, 엘렌 양. 우리가 함께 찾을 겁니다."`,
    choices: [
      { text: '💬 "백작님은 지금 어디 계신 것 같습니까?"', nextNode: 'ellen_count_location' },
      { text: '🔍 "사건 당일 밤에 무엇을 들었습니까?"', nextNode: 'ellen_night_witness' },
      { text: '🌹 "백작님의 신비주의에 대해 들은 적 있습니까?"', nextNode: 'ellen_mysticism' },
      { text: '💫 "우리가 도와드리겠습니다"', nextNode: 'ellen_help' }
    ]
  },

  ellen_mysticism: {
    id: 'ellen_mysticism',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작님의 신비주의에 대해 들은 적 있습니까?"

엘렌이 놀란 표정을 짓는다.

[엘렌]: "...어떻게 아셨어요?"

[왓슨]: "지하실 제단을 들었습니다."

엘렌이 고개를 끄덕인다.

[엘렌]: "네... 아버지는 매일 밤 지하실에 내려가셨어요. 의식을 치르기 위해..."

[셜록 홈즈]: "어떤 의식이었습니까?"

[엘렌]: "...어머니를 위한 기도였어요. 아버지는 '루시의 영혼을 위로하는 것'이라고 하셨죠."

그녀가 로켓을 쥔다.

[엘렌]: "아버지는... 자신이 어머니를 죽게 만들었다고 믿었어요. 그래서 20년간... 매일 밤 용서를 빌었죠."

[왓슨]: "그 의식에 당신도 참여했습니까?"

엘렌이 고개를 젓는다.

[엘렌]: "아니요... 저는 한 번도 지하실에 가본 적이 없어요. 하지만 아버지가 말씀하셨어요..."

그녀가 떨린다.

[엘렌]: "'엘렌, 너는 루시의 혼이 깃든 아이다'라고..."`,
    choices: [
      { text: '💬 "루시의 환생이라고 믿으셨습니까?"', nextNode: 'ellen_reincarnation' },
      { text: '🔍 "어떻게 생각하십니까?"', nextNode: 'ellen_on_mysticism' },
      { text: '🌹 "그게 부담스럽지 않으셨습니까?"', nextNode: 'ellen_mysticism_burden' }
    ]
  },

  ellen_reincarnation: {
    id: 'ellen_reincarnation',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작님은... 당신을 루시의 환생이라고 믿으셨습니까?"

엘렌이 한숨을 쉰다.

[엘렌]: "그런 것 같아요... 아버지는 제가 태어났을 때 '신의 선물'이라고 하셨대요."

[엘렌]: "스탠거슨 아저씨가 말해줬어요. 아버지가 저를 처음 봤을 때... 울면서 '루시가 돌아왔다'고 했다고..."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "백작은 신비주의를 사기에 이용했다고 들었습니다. 하지만 당신을 대하는 건... 진심이었군요."

[엘렌]: "네... 처음엔 사기였을지 몰라도... 어머니가 죽은 후에는 진짜로 믿었던 것 같아요."

[엘렌]: "아버지의 신비주의는... 속죄였어요. 어머니에 대한..."

당신은 고개를 끄덕인다.

이것이... 백작이 살아온 방식이었구나.`,
    choices: [
      { text: '💬 "백작님의 과거에 대해 더 들었습니까?"', nextNode: 'ellen_count_past' },
      { text: '🔍 "지하실 제단에 대해 더 말씀해주세요"', nextNode: 'ellen_basement_info' },
      { text: '🌹 "당신은 현명합니다"', nextNode: 'ellen_wise' }
    ]
  },

  ellen_on_mysticism: {
    id: 'ellen_on_mysticism',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작님의 신비주의에 대해... 어떻게 생각하십니까?"

엘렌이 잠시 생각한다.

[엘렌]: "...처음엔 이해할 수 없었어요. 왜 아버지가 매일 밤 지하실에 내려가는지..."

[엘렌]: "하지만 나이가 들면서... 알게 됐어요. 아버지에게는 그게 필요했던 거예요."

[왓슨]: "필요했다고요?"

[엘렌]: "네. 아버지는... 어머니를 죽게 만든 죄책감에 괴로워하셨어요. 그 고통을 견디기 위해..."

그녀가 눈물을 훔친다.

[엘렌]: "신비주의가 아버지의 위안이었어요. 어머니와 여전히 연결되어 있다고 믿는 게..."

홈즈가 조용히 말한다.

[셜록 홈즈]: "광기와 속죄의 경계에 서 있었군요."

엘렌이 고개를 끄덕인다.

[엘렌]: "네... 하지만 저에게는... 그저 사랑이 깊은 아버지였어요."`,
    choices: [
      { text: '💬 "20년 전 사건에 대해 알고 계십니까?"', nextNode: 'ellen_count_past' },
      { text: '🔍 "지하실에 대해 더 말씀해주세요"', nextNode: 'ellen_basement_info' },
      { text: '🌹 "당신은 아버지를 이해하셨군요"', nextNode: 'ellen_understanding' }
    ]
  },

  ellen_mysticism_burden: {
    id: 'ellen_mysticism_burden',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"'루시의 혼이 깃든 아이'라는 말... 부담스럽지 않으셨습니까?"

엘렌이 쓴웃음을 짓는다.

[엘렌]: "처음엔... 그랬어요. 저는 저인데... 왜 어머니의 그림자로 살아야 하나..."

[엘렌]: "하지만 아버지의 눈빛을 보면... 알 수 있었어요. 그분에게는 그게 필요했다는 걸."

[왓슨]: "자신을 희생하신 거군요."

[엘렌]: "아니에요... 아버지도 저를 사랑하셨으니까요. 진심으로."

홈즈가 묻는다.

[셜록 홈즈]: "백작은 당신과 루시를 구별했습니까?"

엘렌이 고개를 끄덕인다.

[엘렌]: "네. 아버지는 제 생일을 챙겨주셨고, 제가 좋아하는 것들을 기억하셨어요."

[엘렌]: "저는... 루시의 환생이면서도, 엘렌이었어요. 아버지에게는..."

당신은 감동받는다.

복잡하지만... 진실된 사랑이었구나.`,
    choices: [
      { text: '💬 "20년 전 사건에 대해 들었습니까?"', nextNode: 'ellen_count_past' },
      { text: '🔍 "지하실 제단에 대해 더 자세히"', nextNode: 'ellen_basement_info' },
      { text: '🌹 "당신은 강한 사람입니다"', nextNode: 'ellen_strong' }
    ]
  },

  ellen_count_past: {
    id: 'ellen_count_past',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작님의 과거... 20년 전 사건에 대해 들었습니까?"

엘렌이 고개를 끄덕인다.

[엘렌]: "네... 아버지는 숨기지 않으셨어요. 제가 15살이 되었을 때... 모든 걸 말씀해주셨죠."

[왓슨]: "어떤 이야기였습니까?"

[엘렌]: "유타주에서... 아버지는 신비주의 모임을 만들었대요. '영적 깨달음의 교단'이라는..."

[엘렌]: "그리고 그걸 이용해... 사람들을 속였다고... 금광 투자를 '신의 계시'라고 포장해서..."

그녀가 눈물을 흘린다.

[엘렌]: "그중 한 명이... 제 외할아버지였어요. 존 페리어..."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "백작은 자신의 죄를 인정했습니까?"

[엘렌]: "네... 아버지는 울면서 말씀하셨어요. '나는 악마였다. 하지만 이제는 속죄하고 싶다'고..."

[엘렌]: "그래서 저를 키우는 거라고... 어머니를 지키지 못한 대신..."

당신은 숨이 멎는다.

이것이... 백작의 20년이었구나.`,
    choices: [
      { text: '💬 "그 이야기를 듣고 어떻게 느끼셨습니까?"', nextNode: 'ellen_reaction_past' },
      { text: '🔍 "드레버와 스탠거슨에 대해서도 들었습니까?"', nextNode: 'ellen_knows_suspects' },
      { text: '🌹 "당신은 아버지를 용서하셨군요"', nextNode: 'ellen_forgave_count' }
    ]
  },

  ellen_understanding: {
    id: 'ellen_understanding',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"당신은 아버지를 이해하셨군요."

엘렌이 미소 짓는다.

[엘렌]: "네... 사랑하는 사람을 이해하는 건 당연한 거잖아요."

[왓슨]: "하지만 쉽지 않았을 텐데..."

[엘렌]: "처음엔 그랬어요. 하지만 아버지의 고통을 보면서... 알게 됐어요."

[엘렌]: "아버지는 20년간... 단 하루도 평화로운 날이 없었어요. 밤마다 악몽을 꾸시고..."

홈즈가 조용히 말한다.

[셜록 홈즈]: "속죄하는 삶이었군요."

[엘렌]: "네... 그래서 저는 아버지를 원망할 수 없어요. 이미 충분히... 스스로를 벌하셨으니까요."`,
    choices: [
      { text: '💬 "이제 백작님을 찾아야 합니다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "당신은 현명합니다"', nextNode: 'ellen_wise' }
    ]
  },

  ellen_strong: {
    id: 'ellen_strong',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"당신은 강한 사람입니다."

엘렌이 고개를 젓는다.

[엘렌]: "강하지 않아요... 그저... 아버지를 사랑했을 뿐이에요."

[왓슨]: "그것이 강함입니다."

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: "사랑하는 사람의 과거를 받아들이고, 여전히 사랑할 수 있는 것... 그것이 진정한 용기입니다."

엘렌이 눈물을 닦는다.

[엘렌]: "고맙습니다... 박사님, 탐정님."`,
    choices: [
      { text: '💬 "이제 백작님을 찾아야 합니다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 함께 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "당신의 도움이 필요합니다"', nextNode: 'ellen_need_help' }
    ]
  },

  ellen_reaction_past: {
    id: 'ellen_reaction_past',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"그 이야기를 듣고... 어떻게 느끼셨습니까?"

엘렌이 깊은 한숨을 쉰다.

[엘렌]: "...처음엔 충격이었어요. 제 외할아버지를... 어머니를..."

[엘렌]: "하지만 아버지가 너무 괴로워하셨어요. 진심으로 후회하고 계셨죠."

[왓슨]: "그래서 용서하셨습니까?"

[엘렌]: "네... 아버지는 이미 20년간 벌을 받으셨으니까요. 매일 밤 악몽에 시달리시고..."

홈즈가 묻는다.

[셜록 홈즈]: "복수를 생각해본 적은 없습니까?"

엘렌이 고개를 젓는다.

[엘렌]: "아니요... 어머니라면 복수를 원하지 않으셨을 거예요. 어머니는 정의로운 분이었지만... 용서할 줄도 아는 분이었을 거예요."`,
    choices: [
      { text: '💬 "당신은 어머니를 닮으셨군요"', nextNode: 'ellen_resembles_lucy' },
      { text: '🔍 "호프에 대해서는 어떻게 생각하십니까?"', nextNode: 'ellen_about_hope' },
      { text: '🌹 "현명한 판단입니다"', nextNode: 'ellen_wise' }
    ]
  },

  ellen_knows_suspects: {
    id: 'ellen_knows_suspects',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"드레버와 스탠거슨에 대해서도 들었습니까?"

엘렌이 고개를 끄덕인다.

[엘렌]: "네... 아버지의 공범들이었죠. 스탠거슨은 서류를 위조했고, 드레버는 사람들을 협박했다고..."

[엘렌]: "아버지는 그들도 협박했대요. 20년간... 집사와 손님이라는 이름으로 묶어두셨다고..."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "당신은 그들을 만났습니까?"

[엘렌]: "스탠거슨은... 어릴 때부터 봤어요. 저를 숨겨줬으니까..."

[엘렌]: "하지만 드레버는... 한 번도 직접 본 적이 없어요. 그가 올 때마다 다락방에 숨었으니까..."

[왓슨]: "그들을 어떻게 생각하십니까?"

엘렌이 한숨을 쉰다.

[엘렌]: "...불쌍해요. 그들도 아버지처럼... 20년간 죄책감에 시달렸을 테니까요."`,
    choices: [
      { text: '💬 "그들도 용서하시겠습니까?"', nextNode: 'ellen_forgive_suspects' },
      { text: '🔍 "스탠거슨에 대해 더 말씀해주세요"', nextNode: 'ellen_stangerson_relation' },
      { text: '🌹 "당신은 관대하시군요"', nextNode: 'ellen_merciful' }
    ]
  },

  ellen_forgave_count: {
    id: 'ellen_forgave_count',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"당신은 아버지를 용서하셨군요."

엘렌이 미소 짓는다.

[엘렌]: "용서... 했다기보다는... 이해했어요."

[엘렌]: "아버지는 실수를 했지만... 그걸 바로잡으려 평생을 바쳤으니까요."

[왓슨]: "당신을 키우면서."

[엘렌]: "네... 그리고 매일 밤 어머니에게 용서를 빌면서..."

홈즈가 조용히 말한다.

[셜록 홈즈]: "백작은 행운이었습니다. 당신 같은 딸을 두어서."

엘렌이 눈물을 닦는다.

[엘렌]: "아니에요... 제가 행운이었어요. 그런 아버지를 만나서..."`,
    choices: [
      { text: '💬 "이제 백작님을 찾아야 합니다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "함께 진실을 찾읍시다"', nextNode: 'ellen_help' }
    ]
  },

  ellen_forgive_suspects: {
    id: 'ellen_forgive_suspects',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"그들도... 용서하시겠습니까?"

엘렌이 잠시 생각한다.

[엘렌]: "...모르겠어요. 그들이 진심으로 후회한다면... 어쩌면..."

[엘렌]: "하지만 그건 제가 결정할 일이 아니에요. 어머니의 일이니까..."

홈즈가 말한다.

[셜록 홈즈]: "현명한 답변입니다."

[엘렌]: "저는... 그저 아버지를 찾고 싶을 뿐이에요. 그리고 모든 걸 끝내고 싶어요..."

[엘렌]: "이 20년간의 악몽을..."`,
    choices: [
      { text: '💬 "우리가 도와드리겠습니다"', nextNode: 'ellen_help' },
      { text: '🔍 "지하실로 함께 갑시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "용기를 내세요"', nextNode: 'ellen_encouragement' }
    ]
  },

  ellen_stangerson_relation: {
    id: 'ellen_stangerson_relation',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"스탠거슨에 대해 더 말씀해주세요."

엘렌이 답한다.

[엘렌]: "스탠거슨 아저씨는... 저를 처음부터 알고 계셨어요. 제가 태어났을 때부터..."

[엘렌]: "아버지가 저를 숨기기로 했을 때도... 도와주셨죠."

[왓슨]: "그는 어떤 사람이었습니까?"

[엘렌]: "...슬픈 사람이었어요. 늘 죄책감에 시달리는 것 같았어요."

[엘렌]: "가끔 저를 보면서... 눈물을 흘리곤 했어요. '루시 양을 닮았다'고 하면서..."

홈즈가 묻는다.

[셜록 홈즈]: "그가 당신에게 친절했습니까?"

[엘렌]: "네... 아저씨는 저에게 책을 가져다주시고, 이야기를 들려주셨어요."

[엘렌]: "어쩌면... 저를 통해 어머니에게 속죄하려 했던 걸지도 몰라요."`,
    choices: [
      { text: '💬 "그를 믿으십니까?"', nextNode: 'ellen_trust_stangerson' },
      { text: '🔍 "다른 용의자들에 대해서도"', nextNode: 'ellen_about_suspects' },
      { text: '🌹 "이제 백작님을 찾읍시다"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_merciful: {
    id: 'ellen_merciful',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"당신은 관대하시군요."

엘렌이 고개를 젓는다.

[엘렌]: "관대한 게 아니에요... 그저... 복수가 또 다른 복수를 부른다는 걸 알기 때문이에요."

[엘렌]: "아버지가 말씀하셨어요. '증오는 증오를 낳고, 슬픔은 슬픔을 낳는다'고..."

[왓슨]: "현명한 말씀입니다."

[엘렌]: "네... 그래서 저는... 호프님에게도 그렇게 말하고 싶어요."

홈즈가 예리하게 묻는다.

[셜록 홈즈]: "호프를 만날 용기가 있습니까?"

엘렌이 떨리지만 고개를 끄덕인다.

[엘렌]: "...네. 어머니의 딸이라면... 용기를 내야죠."`,
    choices: [
      { text: '💬 "함께 호프를 찾읍시다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "먼저 백작님부터 찾아야 합니다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "당신은 정말 용감합니다"', nextNode: 'ellen_brave' }
    ]
  },

  ellen_what_different: {
    id: 'ellen_what_different',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"무엇이 달랐습니까?"

엘렌이 떨리는 목소리로 답한다.

[엘렌]: "3일 전... 편지가 왔어요. 호프라는 서명이 있는..."

[왓슨]: "제퍼슨 호프?"

[엘렌]: "네. 편지에는... '복수를 멈출 수 없다'고 적혀있었어요."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "백작의 반응은?"

[엘렌]: "너무 괴로워하셨어요. 저에게 '며칠간 다락방에 숨어라, 절대 나오지 마라'고..."

[엘렌]: "그리고... '죄송하다'고 하셨어요."

[왓슨]: "죄송하다고요?"

[엘렌]: "네. '네 어머니를 지키지 못해서 죄송하다'고..."

그녀가 눈물을 흘린다.

[엘렌]: "그게... 아버지의 마지막 말씀이었어요."`,
    choices: [
      { text: '💬 "그날 밤 무슨 일이 있었습니까?"', nextNode: 'ellen_night_witness' },
      { text: '🔍 "호프가 백작님을 어디로 데려갔을까요?"', nextNode: 'ellen_hope_theory' },
      { text: '🌹 [그녀의 손을 잡아준다]', nextNode: 'ellen_comfort' }
    ]
  },

  ellen_count_location: {
    id: 'ellen_count_location',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작님은 지금 어디 계십니까?"

엘렌이 고개를 젓는다.

[엘렌]: "모르겠어요... 어젯밤 이상한 소리가 들렸고..."

[왓슨]: "어떤 소리였습니까?"

[엘렌]: "비명 같기도 하고... 아니면 싸우는 소리 같기도 하고..."

[엘렌]: "그리고 지하로 내려가는 발소리..."

홈즈가 메모한다.

[셜록 홈즈]: "지하실?"

[엘렌]: "네. 아버지가 의식을 치르던 곳이에요. 저는... 한 번도 내려가본 적이 없지만..."

[왓슨]: "호프가 거기 있을 가능성은?"

엘렌이 떨린다.

[엘렌]: "...아마도."`,
    choices: [
      { text: '💬 "지하실에 대해 더 자세히 말씀해주세요"', nextNode: 'ellen_basement_info' },
      { text: '🔍 "함께 지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "걱정 마세요, 우리가 찾을 겁니다"', nextNode: 'ellen_reassure_search' }
    ]
  },

  ellen_sympathy: {
    id: 'ellen_sympathy',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"20년간... 힘드셨겠군요."

엘렌이 쓴웃음을 짓는다.

[엘렌]: "처음엔... 그랬어요. 왜 저만 숨어야 하는지 이해할 수 없었죠."

[엘렌]: "하지만 아버지가 말씀해주셨어요. 어머니의 이야기를..."

[왓슨]: "루시에 대해서?"

[엘렌]: "네. 어머니가 얼마나 힘들었는지... 그리고 결국 돌아가셨는지..."

그녀가 로켓을 쥔다.

[엘렌]: "그제야 이해했어요. 아버지가 왜 저를 지키려 하는지."

[셜록 홈즈]: "당신은 어머니의 복수를 원하십니까?"

엘렌이 고개를 젓는다.

[엘렌]: "아니요... 어머니는 복수를 원하지 않으셨을 거예요."`,
    choices: [
      { text: '💬 "현명한 생각입니다"', nextNode: 'ellen_wise' },
      { text: '🔍 "호프에 대해 어떻게 생각하십니까?"', nextNode: 'ellen_about_hope' },
      { text: '🌹 "당신은 어머니를 닮으셨군요"', nextNode: 'ellen_resembles_lucy' }
    ]
  },

  ellen_about_hope: {
    id: 'ellen_about_hope',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"호프에 대해 어떻게 생각하십니까?"

엘렌이 깊은 한숨을 쉰다.

[엘렌]: "...어릴 때는 만나고 싶었어요. 어머니를 사랑했던 사람이니까..."

[왓슨]: "하지만 지금은?"

[엘렌]: "지금은... 복잡해요."

[엘렌]: "호프님은 어머니를 위해 20년간 복수를 준비했어요. 그 마음은... 진실이에요."

[엘렌]: "하지만 아버지도... 20년간 저를 사랑으로 키워주셨어요. 그것도... 진실이에요."

홈즈가 조용히 말한다.

[셜록 홈즈]: "두 가지 진실이 충돌하는군요."

엘렌이 고개를 끄덕인다.

[엘렌]: "저는... 어떻게 해야 할지 모르겠어요."`,
    choices: [
      { text: '💬 "당신의 마음을 따르세요"', nextNode: 'ellen_follow_heart' },
      { text: '🔍 "호프를 만나보셨습니까?"', nextNode: 'ellen_met_hope' },
      { text: '🌹 "시간을 가지셔도 됩니다"', nextNode: 'ellen_take_time_decision' }
    ]
  },

  ellen_count_fear_hope: {
    id: 'ellen_count_fear_hope',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작님은 호프를 두려워했습니까?"

엘렌이 고개를 끄덕인다.

[엘렌]: "네... 하지만 두려움보다는... 죄책감이었던 것 같아요."

[왓슨]: "죄책감?"

[엘렌]: "아버지는 늘 말씀하셨어요. '호프에게는 복수할 권리가 있다'고..."

[엘렌]: "'우리가 루시를 죽게 만들었으니까'라고..."

홈즈가 예리하게 묻는다.

[셜록 홈즈]: "백작은 속죄하려 했습니까?"

[엘렌]: "네. 저를 키우는 것이... 아버지의 속죄였던 것 같아요."

[엘렌]: "어머니를 지키지 못한 대신, 저만은 반드시 지키겠다고..."

당신은 고개를 끄덕인다.

이것이... 백작의 20년이었구나.`,
    choices: [
      { text: '💬 "백작님은 훌륭한 분이셨습니다"', nextNode: 'ellen_count_praise' },
      { text: '🔍 "호프는 그걸 알고 있을까요?"', nextNode: 'ellen_hope_knows' },
      { text: '🌹 "당신이 있어서 백작님이 행복하셨을 거예요"', nextNode: 'ellen_made_count_happy' }
    ]
  },

  ellen_resembles_lucy: {
    id: 'ellen_resembles_lucy',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"당신은 어머니를 닮으셨���요."

엘렌이 놀란다.

[엘렌]: "어떻게 아세요? 어머니를 보신 적이..."

[왓슨]: "사진을 봤습니다. 그리고... 당신의 눈빛에서 어머니의 정의로움이 보입니다."

엘렌이 눈물을 흘린다.

[엘렌]: "고맙습니다... 박사님."

홈즈가 말한다.

[셜록 홈즈]: "루시도 당신을 자랑스러워할 겁니다."

[엘렌]: "정말... 그럴까요?"

[왓슨]: "물론입니다."

당신이 미소 짓는다.

[왓슨]: "당신은 어머니처럼 용감하고, 현명합니다."`,
    choices: [
      { text: '💬 "이제 백작님을 찾아야 합니다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "어머니라면 어떻게 하셨을까요?"', nextNode: 'ellen_wwld' },
      { text: '🌹 "당신의 힘이 필요합니다"', nextNode: 'ellen_need_help' }
    ]
  },

  ellen_night_witness: {
    id: 'ellen_night_witness',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"사건 당일 밤에 무엇을 보셨습니까?"

엘렌이 떨리는 목소리로 답한다.

[엘렌]: "다락방에서... 소리가 들렸어요."

[왓슨]: "어떤 소리였습니까?"

[엘렌]: "말소리... 아버지와 다른 누군가..."

[엘렌]: "그리고 싸우는 소리... 무언가 부딪히는 소리..."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "확인하러 가지 않으셨습니까?"

엘렌이 고개를 숙인다.

[엘렌]: "...두려웠어요. 아버지가 '절대 나오지 마라'고 하셨으니까..."

[엘렌]: "하지만... 나갔어야 했어요. 그랬다면..."

그녀가 흐느낀다.`,
    choices: [
      { text: '💬 "당신 잘못이 아닙니다"', nextNode: 'ellen_not_fault' },
      { text: '🔍 "그 후에는 어떻게 되었습니까?"', nextNode: 'ellen_after_sounds' },
      { text: '🌹 [그녀를 위로한다]', nextNode: 'ellen_comfort' }
    ]
  },

  ellen_good_father: {
    id: 'ellen_good_father',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작님이 좋은 아버지셨군요."

엘렌이 미소 짓는다.

[엘렌]: "네... 최고의 아버지셨어요."

[엘렌]: "비록 숨어살아야 했지만... 아버지와 함께한 시간은 행복했어요."

[왓슨]: "백작님도 당신을 키우면서 행복하셨을 겁니다."

[엘렌]: "...그랬으면 좋겠어요."

홈즈가 말한다.

[셜록 홈즈]: "분명 그랬을 겁니다. 당신은 백작에게... 20년의 속죄이자 희망이었을 테니까요."

엘렌이 눈물을 닦는다.

[엘렌]: "감사합니다, 탐정님."`,
    choices: [
      { text: '💬 "이제 백작님을 찾아야 합니다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "함께 지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "당신의 이야기를 더 들려주세요"', nextNode: 'ellen_more_story' }
    ]
  },

  ellen_more_story: {
    id: 'ellen_more_story',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `"당신의 이야기를 더 들려주세요."

엘렌이 천천히 말한다.

[엘렌]: "20년간... 저는 이 저택에서 숨어살았어요."

[엘렌]: "드레버와 스탠거슨이 올 때마다 다락방에 숨었죠."

[왓슨]: "힘들지 않으셨습니까?"

[엘렌]: "처음엔... 그랬어요. 하지만 아버지가 설명해주셨죠."

[엘렌]: "어머니가 겪은 일을... 그리고 제가 왜 보호받아야 하는지..."

홈즈가 묻는다.

[셜록 홈즈]: "백작은 당신에게 20년 전 사건을 모두 말했습니까?"

[엘렌]: "네... 숨기지 않으셨어요. 자신의 죄까지 모두..."

그녀가 로켓을 쥔다.

[엘렌]: "그래서 저는... 아버지를 용서할 수 있었어요."`,
    choices: [
      { text: '💬 "당신은 훌륭합니다"', nextNode: 'ellen_praise' },
      { text: '🔍 "호프에 대해서도 들었습니까?"', nextNode: 'ellen_told_about_hope' },
      { text: '🌹 "그 로켓은 어머니의 것입니까?"', nextNode: 'ellen_locket_story' }
    ]
  },

  // 이하 더 많은 대화 노드들...
  
  ellen_basement_info: {
    id: 'ellen_basement_info',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `[엘렌]: "지하실은... 아버지가 의식을 치르던 곳이에요."

[왓슨]: "어떤 의식입니까?"

[엘렌]: "모르겠어요. 저는 한 번도 내려가본 적이 없으니까..."

[엘렌]: "하지만 아버지가 말씀하셨어요. 제단이 있다고... 그리고 상징적인 장소라고..."

홈즈가 메모한다.

[셜록 홈즈]: "입구는 어디입니까?"

[엘렌]: "두 곳이 있어요. 하나는 부엌 바닥에 숨겨져 있고... 다른 하나는 뒷뜰 우물을 통해서도 갈 수 있다고 들었어요."

[왓슨]: "우물로?"

[엘렌]: "네. 아버지가 가끔 우물로 내려가셨어요. 지하 터널이 연결되어 있다고..."

[셜록 홈즈]: "열쇠는?"

[엘렌]: "아버지만 갖고 계셨어요. 하지만... 서재 금고에 예비 열쇠가 있을 거예요."

[왓슨]: "확실합니까?"

[엘렌]: "...아마도. 아버지는 중요한 것들을 다 금고에 보관하셨거든요."`,
    choices: [
      { text: '💬 "함께 지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🔍 "다른 단서가 있습니까?"', nextNode: 'ellen_other_clues' },
      { text: '🏃 "서재 금고를 확인해야겠습니다"', nextNode: 'study_general_investigation' }
    ]
  },

  ellen_basement_offer: {
    id: 'ellen_basement_offer',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"함께 지하실로 가시겠습니까?"

엘렌이 떨린다.

[엘렌]: "저는... 무서워요..."

[왓슨]: "괜찮습니다. 우리가 함께 있으니까요."

홈즈가 말한다.

[셜록 홈즈]: "하지만 위험할 수 있습니다. 안전한 곳에 계시는 게..."

[엘렌]: "아니에요. 가겠어요."

그녀가 결연한 표정을 짓는다.

[엘렌]: "20년간 숨기만 했어요. 이제는... 아버지를 위해 무언가 해야 해요."

당신이 고개를 끄덕인다.

[왓슨]: "알겠습니다. 함께 갑시다."`,
    choices: [
      { text: '🏃 "지하실로 갑니다"', nextNode: 'find_basement' },
      { text: '💬 "먼저 준비가 필요합니다"', nextNode: 'ellen_prepare' },
      { text: '🔍 "금고부터 확인합시다"', nextNode: 'study_general_investigation' }
    ]
  },

  ellen_help: {
    id: 'ellen_help',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `"우리가 도와드리겠습니다."

엘렌이 감사하다는 표정을 짓는다.

[엘렌]: "정말... 감사합니다, 탐정님들."

홈즈가 말한다.

[셜록 홈즈]: "백작님을 반드시 찾을 겁니다. 그리고 진실도."

[엘렌]: "진실..."

그녀가 로켓을 본다.

[엘렌]: "진실이 밝혀지면... 어떻게 될까요?"

[왓슨]: "정의가 실현될 겁니다."

[엘렌]: "...그게 두려워요. 진실이... 아버지에게 불리할 수도 있잖아요."

홈즈가 진지하게 말한다.

[셜록 홈즈]: "하지만 진실은 밝혀져야 합니다. 당신의 어머니를 위해서라도."`,
    choices: [
      { text: '💬 "함께 진실을 찾읍시다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "먼저 단서를 모아야 합니다"', nextNode: 'ellen_clues_first' },
      { text: '🌹 "걱정 마세요, 우리가 있습니다"', nextNode: 'ellen_dont_worry' }
    ]
  },

  ellen_search_together: {
    id: 'ellen_search_together',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"함께 진실을 찾읍시다."

엘렌이 고개를 끄덕인다.

[엘렌]: "네... 함께요."

홈즈가 메모를 확인한다.

[셜록 홈즈]: "아직 조사하지 않은 곳들이 있습니다. 하나씩 확인합시다."

당신이 엘렌에게 묻는다.

[왓슨]: "이제 어디로 가시겠습니까?"

엘렌이 저택을 본다.

[엘렌]: "...지하실이요. 아버지가 거기 계실 것 같아요."`,
    choices: [
      { text: '🏃 "지하실로 갑니다"', nextNode: 'find_basement' },
      { text: '💬 "먼저 서재를 확인합시다"', nextNode: 'study_general_investigation' },
      { text: '🔍 "다른 용의자들도 조사해야 합니다"', nextNode: 'continue_investigation_1' }
    ]
  },

  // ========== 누락된 노드들 ==========

  ellen_praise: {
    id: 'ellen_praise',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"훌륭합니다, 엘렌 양."

엘렌이 미소 짓는다.

[엘렌]: "고맙습니다..."`,
    choices: [
      { text: '💬 "계속 말씀해주세요"', nextNode: 'ellen_conversation_hub' },
      { text: '🔍 "지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "함께 찾읍시다"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_first_meet: {
    id: 'ellen_first_meet',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `엘렌과 대화를 이어간다.

그녀의 눈빛에서 슬픔과 결연함이 동시에 느껴진다.

[왓슨]: "더 말씀해주시겠습니까?"

엘렌이 고개를 끄덕인다.`,
    choices: [
      { text: '💬 "호프에 대해 어떻게 생각하십니까?"', nextNode: 'ellen_about_hope' },
      { text: '🔍 "지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "함께 찾읍시다"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_conversation_hub: {
    id: 'ellen_conversation_hub',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    speaker: 'watson',
    text: `엘렌과의 대화가 계속된다.

그녀는 차분하지만 슬픔을 감추지 못한다.`,
    choices: [
      { text: '💬 "호프에 대해 어떻게 생각하십니까?"', nextNode: 'ellen_about_hope' },
      { text: '🔍 "지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "함께 찾읍시다"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_told_about_hope: {
    id: 'ellen_told_about_hope',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 고개를 끄덕인다.

[엘렌]: "네... 아버지가 말씀해주셨어요."

[엘렌]: "호프님은... 어머니를 사랑했던 분이라고..."`,
    choices: [
      { text: '💬 "어떻게 생각하십니까?"', nextNode: 'ellen_about_hope' },
      { text: '🔍 "만나고 싶으십니까?"', nextNode: 'ellen_about_hope' },
      { text: '🌹 "계속 말씀해주세요"', nextNode: 'ellen_conversation_hub' }
    ]
  },

  ellen_locket_story: {
    id: 'ellen_locket_story',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 로켓을 만진다.

[엘렌]: "이 로켓은... 어머니의 유품이에요."

[엘렌]: "아버지가 제게 주시면서... '루시를 기억하라'고 하셨죠."`,
    choices: [
      { text: '💬 "로켓 안에는 무엇이?"', nextNode: 'ellen_conversation_hub' },
      { text: '🔍 "소중히 간직하시는군요"', nextNode: 'ellen_conversation_hub' },
      { text: '🌹 "계속 말씀해주세요"', nextNode: 'ellen_conversation_hub' }
    ]
  },

  ellen_follow_heart: {
    id: 'ellen_follow_heart',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"마음을 따르십시오."

엘렌이 고개를 끄덕인다.

[엘렌]: "...네. 그렇게 하겠습니다."`,
    choices: [
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 갑시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "용기를 내세요"', nextNode: 'ellen_encouragement' }
    ]
  },

  ellen_met_hope: {
    id: 'ellen_met_hope',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 답한다.

[엘렌]: "...만나고 싶어요. 호프님을..."

[엘렌]: "어머니를 사랑했던 분이니까..."`,
    choices: [
      { text: '💬 "곧 만날 수 있을 겁니다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "먼저 백작님을 찾읍시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "용기 있는 선택입니다"', nextNode: 'ellen_encouragement' }
    ]
  },

  ellen_take_time_decision: {
    id: 'ellen_take_time_decision',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"천천히 생각하십시오."

엘렌이 고개를 끄덕인다.

[엘렌]: "...고맙습니다."`,
    choices: [
      { text: '💬 "먼저 백작님을 찾읍시다"', nextNode: 'ellen_basement_offer' },
      { text: '🔍 "지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_reassure_search: {
    id: 'ellen_reassure_search',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"반드시 찾겠습니다."

엘렌이 눈물을 흘린다.

[엘렌]: "고맙습니다... 탐정님..."`,
    choices: [
      { text: '💬 "지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🔍 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' },
      { text: '🌹 "용기를 내십시오"', nextNode: 'ellen_encouragement' }
    ]
  },

  ellen_prepare: {
    id: 'ellen_prepare',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"준비가 필요하시겠습니까?"

엘렌이 고개를 젓는다.

[엘렌]: "아니요... 가겠습니다. 지금 바로..."`,
    choices: [
      { text: '🏃 "함께 갑니다"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_other_clues: {
    id: 'ellen_other_clues',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 생각한다.

[엘렌]: "아버지는... 서재에도 자주 계셨어요."

[엘렌]: "무언가를 쓰시거나... 읽으시거나..."`,
    choices: [
      { text: '💬 "서재를 조사해봐야겠군요"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실부터 확인합시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_wise: {
    id: 'ellen_wise',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"현명하시군요."

엘렌이 미소 짓는다.

[엘렌]: "...아니에요. 그저... 아버지에게서 배웠을 뿐이에요."`,
    choices: [
      { text: '💬 "훌륭한 분이셨군요"', nextNode: 'ellen_conversation_hub' },
      { text: '🔍 "지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "함께 찾읍시다"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_wwld: {
    id: 'ellen_wwld',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"루시라면 어떻게 했을까요?"

엘렌이 잠시 생각한다.

[엘렌]: "...용서했을 것 같아요. 하지만 정의도 원했을 거예요."`,
    choices: [
      { text: '💬 "현명한 답변입니다"', nextNode: 'ellen_wise' },
      { text: '🔍 "함께 진실을 찾읍시다"', nextNode: 'ellen_search_together' },
      { text: '🌹 "당신은 어머니를 닮으셨어요"', nextNode: 'ellen_resembles_lucy' }
    ]
  },

  ellen_need_help: {
    id: 'ellen_need_help',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"당신의 도움이 필요합니다."

엘렌이 고개를 끄덕인다.

[엘렌]: "...저도 돕고 싶어요. 아버지를 위해..."`,
    choices: [
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 갑시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "고맙습니다"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_hope_theory: {
    id: 'ellen_hope_theory',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 답한다.

[엘렌]: "호프님이... 아버지에게 무슨 일을 하셨을까요?"

[엘렌]: "복수를... 하셨을까요?"`,
    choices: [
      { text: '💬 "그것을 확인해야 합니다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "함께 찾읍시다"', nextNode: 'ellen_search_together' },
      { text: '🌹 "걱정하지 마세요"', nextNode: 'ellen_dont_worry' }
    ]
  },

  ellen_comfort: {
    id: 'ellen_comfort',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `당신이 엘렌을 위로한다.

[왓슨]: "괜찮습니다..."

엘렌이 눈물을 닦는다.

[엘렌]: "...고맙습니다."`,
    choices: [
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 갑시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "용기를 내세요"', nextNode: 'ellen_encouragement' }
    ]
  },

  ellen_not_fault: {
    id: 'ellen_not_fault',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"당신 잘못이 아닙니다."

엘렌이 눈물을 흘린다.

[엘렌]: "하지만... 제가 뭔가 했어야..."

[왓슨]: "아닙니다. 당신은 아무 잘못이 없습니다."`,
    choices: [
      { text: '💬 "함께 찾읍시다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 가시겠습니까?"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "용기를 내세요"', nextNode: 'ellen_encouragement' }
    ]
  },

  ellen_after_sounds: {
    id: 'ellen_after_sounds',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 답한다.

[엘렌]: "그 후에는... 조용했어요."

[엘렌]: "무서워서... 다락방에서 나가지 못했습니다..."`,
    choices: [
      { text: '💬 "괜찮습니다"', nextNode: 'ellen_comfort' },
      { text: '🔍 "함께 확인합시다"', nextNode: 'ellen_search_together' },
      { text: '🌹 "당신 잘못이 아닙니다"', nextNode: 'ellen_not_fault' }
    ]
  },

  ellen_clues_first: {
    id: 'ellen_clues_first',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"먼저 단서를 모읍시다."

엘렌이 고개를 끄덕인다.

[엘렌]: "네... 무엇을 확인해야 할까요?"`,
    choices: [
      { text: '💬 "지하실부터요"', nextNode: 'ellen_basement_offer' },
      { text: '🔍 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' },
      { text: '🌹 "서재도 확인해야 합니다"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_dont_worry: {
    id: 'ellen_dont_worry',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"걱정하지 마세요."

엘렌이 눈물을 닦는다.

[엘렌]: "...네. 믿겠습니다."`,
    choices: [
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 갑시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "반드시 찾겠습니다"', nextNode: 'ellen_reassure_search' }
    ]
  },

  ellen_brave: {
    id: 'ellen_brave',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"당신은 용감합니다."

엘렌이 미소 짓는다.

[엘렌]: "...고맙습니다."`,
    choices: [
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 갑시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "용기를 내세요"', nextNode: 'ellen_encouragement' }
    ]
  },

  ellen_trust_stangerson: {
    id: 'ellen_trust_stangerson',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 답한다.

[엘렌]: "...네. 믿어요. 스탠거슨 아저씨를..."

[엘렌]: "평생 죄책감에 시달렸으니까요..."`,
    choices: [
      { text: '💬 "그는 속죄하려 했군요"', nextNode: 'ellen_search_together' },
      { text: '🔍 "다른 용의자들은?"', nextNode: 'ellen_about_suspects' },
      { text: '🌹 "현명한 판단입니다"', nextNode: 'ellen_wise' }
    ]
  },

  ellen_about_suspects: {
    id: 'ellen_about_suspects',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 답한다.

[엘렌]: "드레버에 대해서는... 잘 모르겠어요."

[엘렌]: "한 번도 본 적이 없으니까..."`,
    choices: [
      { text: '💬 "함께 조사합시다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 갑시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "괜찮습니다"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_encouragement: {
    id: 'ellen_encouragement',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `"용기를 내세요."

엘렌이 깊게 숨을 쉰다.

[엘렌]: "...네. 용기..."

당신이 미소 짓는다.

[왓슨]: "함께 갑시다."`,
    choices: [
      { text: '🏃 "지하실로 향한다"', nextNode: 'ellen_basement_offer' },
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'ellen_search_together' }
    ]
  },

  ellen_count_praise: {
    id: 'ellen_count_praise',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 미소 짓는다.

[엘렌]: "네... 아버지는 훌륭한 분이셨어요..."`,
    choices: [
      { text: '💬 "함께 찾읍시다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "지하실로 갑시다"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "반드시 찾겠습니다"', nextNode: 'ellen_reassure_search' }
    ]
  },

  ellen_hope_knows: {
    id: 'ellen_hope_knows',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 답한다.

[엘렌]: "...호프님이 아시나요? 저에 대해서..."

[왓슨]: "곧 만나게 될 겁니다."`,
    choices: [
      { text: '💬 "함께 찾읍시다"', nextNode: 'ellen_search_together' },
      { text: '🔍 "먼저 백작님부터"', nextNode: 'ellen_basement_offer' },
      { text: '🌹 "걱정하지 마세요"', nextNode: 'ellen_dont_worry' }
    ]
  },

  ellen_made_count_happy: {
    id: 'ellen_made_count_happy',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    character: 'ellen',
    text: `엘렌이 미소 짓는다.

[엘렌]: "...아버지가 저 때문에 행복하셨다면..."

[엘렌]: "그것만으로도 충분해요."`,
    choices: [
      { text: '💬 "훌륭합니다"', nextNode: 'ellen_praise' },
      { text: '🔍 "함께 찾읍시다"', nextNode: 'ellen_search_together' },
      { text: '🌹 "반드시 찾겠습니다"', nextNode: 'ellen_reassure_search' }
    ]
  }
};