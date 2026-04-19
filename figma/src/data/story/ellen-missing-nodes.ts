import { StoryNode } from '../../types/story';

/**
 * 엘렌 심문 누락 노드들
 */

export const ellenMissingNodes: Record<string, StoryNode> = {
  
  // 기본 리다이렉트 노드들 - 중복 제거됨 (ellen-interrogation.ts에 있음)

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
