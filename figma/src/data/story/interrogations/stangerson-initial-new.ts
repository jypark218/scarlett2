/**
 * 스탬거슨 초기 심문
 * 첫 대면 및 기본 질문
 */

import { StoryNode } from '../../../types/story';

export const stangersonInitialNodes: Record<string, StoryNode> = {
  // 초기 대면
  ask_stangerson: {
    id: 'ask_stangerson',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    speaker: 'watson',
    text: `[왓슨]: "백작님은 어디에 계십니까?" 당신이 묻자 스탬거슨의 얼굴이 창백해집니다.

[조셉 스탬거슨]: "그건... 설명하기 어렵습니다. 3일 전 밤, 서재에서 고함 소리가 들렸습니다. 달려갔지만..."

그가 말을 멈추고 손수건으로 이마를 닦습니다. 손이 심하게 떨리고 있습니다.

[셜록 홈즈]: "달려갔지만?"

[조셉 스탬거슨]: "...이미 늦었습니다. 백작님은 계시지 않았고, 방 안은 난장판이었어요."

홈즈가 날카롭게 물어봅니다.

[셜록 홈즈]: "이상하군요. 집사라면 주인의 행방을 파악하고 계셔야 하는데, 3일이나 지났는데도 아무것도 모른다는 말씀이신가요?"

스탠거슨이 뒤로 한 걸음 물러섭니다.

[조셉 스탬거슨]: "저도... 상황을 이해하지 못하고 있습니다."`,
    choices: [
      { text: '3일 전 밤에 무슨 일이 있었는지 자세히 묻는다', nextNode: 'stangerson_night_detail' },
      { text: '그가 뭘 숨기는지 추궁한다', nextNode: 'press_stangerson_level_1' },
      { text: '증거를 제시한다', nextNode: 'present_evidence_to_stangerson' },
      { text: '백작과의 관계를 파악한다', nextNode: 'stangerson_relationship' },
      { text: '일단 서재를 더 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  press_stangerson_level_1: {
    id: 'press_stangerson_level_1',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "스탠거슨씨, 당신은 무언가를 숨기고 있습니다."

스탠거슨: "아, 아닙니다! 제가 뭘 숨기겠습니까!"

홈즈가 한 걸음 다가갑니다.

홈즈: "서재에서 무엇을 하고 계셨습니까? 우리가 도착했을 때 책장 사이에서 뭔가를 찾고 계셨죠. 아니, 정확히 말하면... 숨기려 하고 계셨습니다."

스탠거슨: "그건... 백작님의 기록을 찾으려고 했던 겁니다. 단서를 찾으려고요!"

홈즈가 냉정하게 말합니다.

홈즈: "거짓말입니다. 당신의 손놀림을 봤습니다. 뭔가를 집어넣으려 하셨죠. 발견되기 전에 감추려 했던 겁니다."

스탠거슨의 이마에서 땀이 흐릅니다.`,
    choices: [
      { text: '백작과의 과거를 묻는다', nextNode: 'stangerson_relationship' },
      { text: '무엇을 감추려 했는지 추궁한다', nextNode: 'stangerson_betrayal_motive' },
      { text: '다른 방법으로 접근한다', nextNode: 'stangerson_gentle_approach' },
      { text: '일단 추궁을 중단한다', nextNode: 'study_with_stangerson' }
    ]
  },

  present_evidence_to_stangerson: {
    id: 'present_evidence_to_stangerson',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "스탠거슨씨, 이 증거를 보세요."

홈즈가 증거를 내밉니다. 스태거슨의 눈이 커집니다.

스탠거슨: "이건... 어디서...?"

그의 얼굴이 더욱 창백해집니다. 손이 떨리기 시작합니다.

홈즈: "백작님의 사라짐과 관련된 것입니다. 이제 말씀해주시겠습니까?"

스탠거슨: "저는... 경찰을 부르려 했지만... 두려웠습니다."

홈즈: "무엇이 두려우셨습니까?"

스탠거슨이 입을 다뭅니다. 그의 시선이 증거에서 떨어지지 않습니다.`,
    choices: [
      { text: '백작과의 과거를 묻는다', nextNode: 'stangerson_relationship' },
      { text: '무엇을 감추려 했는지 추궁한다', nextNode: 'stangerson_betrayal_motive' },
      { text: '다른 방법으로 접근한다', nextNode: 'stangerson_gentle_approach' },
      { text: '일단 서재를 더 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  stangerson_night_detail: {
    id: 'stangerson_night_detail',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    speaker: 'watson',
    text: `[왓슨]: "3일 전 밤, 정확히 무슨 일이 있었습니까?"

스탠거슨이 기억을 떠올립니다.

[조셉 스탬거슨]: "밤 11시쯤 서재에서 고함 소리가 들렸습니다. 백작님의 목소리와 다른 남자의 목소리였죠."

홈즈가 메모합니다.

[셜록 홈즈]: "다른 남자?"

[조셉 스탬거슨]: "예, 낮은 목소리에 미국식 억양이었습니다. '기다렸소'라고 외치는 소리가 들렸어요."

스탠거슨이 떨립니다.

[조셉 스탬거슨]: "그리고 어떤 여자 이름을 들었습니다. '루시'라는 이름이요. '루시를 위해서'라고 말하더군요."`,
    choices: [
      { text: '서재 문을 열지 않은 이유를 캐묻는다', nextNode: 'stangerson_door_locked' },
      { text: '끌려가는 방향을 물어본다', nextNode: 'stangerson_direction' },
      { text: '그 남자의 외모나 특징을 기억하는지 묻는다', nextNode: 'stangerson_intruder_description' },
      { text: '일단 다른 질문을 한다', nextNode: 'ask_stangerson' }
    ]
  },

  stangerson_relationship: {
    id: 'stangerson_relationship',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    speaker: 'watson',
    text: `[왓슨]: "백작님과는 얼마나 오래 일하셨습니까?"

[조셉 스탬거슨]: "10년입니다."

[왓슨]: "그 전엔?"

스탠거슨이 주저합니다.

[조셉 스탬거슨]: "저는 독일에서 왔습니다. 1871년에 백작님을 만났죠."

홈즈가 눈을 가늘게 뜹니다.

[셜록 홈즈]: "1871년이군요. 그때 독일에서 무슨 일이 있었습니까?"

스탠거슨이 얼어붙습니다.

[조셉 스탬거슨]: "그건 말하기 어렵습니다."

[홈즈]: "백작님은 당신을 어떻게 고용했습니까? 독일에서 영국까지 데려온 특별한 이유가 있습니까?"

스탠거슨의 입술이 파르르 떨립니다.

[조셉 스탬거슨]: "저는 그저 일자리가 필요했을 뿐입니다."

홈즈가 한 걸음 다가갑니다.

[셜록 홈즈]: "아니면 백작이 당신의 비밀을 알고 있었습니까?"`,
    choices: [
      { text: '독일에서 무슨 일이 있었는지 추궁한다', nextNode: 'stangerson_germany_past' },
      { text: '백작이 협박했는지 추궁한다', nextNode: 'stangerson_blackmail' },
      { text: '부드럽게 진실을 말하도록 유도한다', nextNode: 'stangerson_gentle_approach' },
      { text: '일단 다른 질문을 한다', nextNode: 'ask_stangerson' }
    ]
  },

  stangerson_betrayal_motive: {
    id: 'stangerson_betrayal_motive',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "무엇을 감추려 했습니까? 서류를 숨기려 하셨죠."

스탠거슨: "아, 아닙니다! 제가 왜 그런 짓을 하겠습니까!"

홈즈: "저택에서 무슨 일이 있었는지 정확히 말씀해주십시오. 백작님이 사라졌을 때, 당신은 무엇을 하고 계셨습니까?"

스탠거슨: "저는 방에 있었습니다. 서재에서 소리가 났을 때요."

홈즈: "소리를 듣고도 가보지 않으셨습니까?"

스탠거슨: "갔습니다! 하지만 문이 잠겨 있었고, 그 후에는 무서워서 더 이상 접근하지 못했습니다."

그가 말을 잇지 못합니다.`,
    choices: [
      { text: '독일에서의 과거를 추궁한다', nextNode: 'stangerson_germany_past' },
      { text: '부드럽게 접근한다', nextNode: 'stangerson_gentle_approach' },
      { text: '백작이 협박했는지 확인한다', nextNode: 'stangerson_blackmail' },
      { text: '일단 추궁을 멈춘다', nextNode: 'study_with_stangerson' }
    ]
  },

  stangerson_door_locked: {
    id: 'stangerson_door_locked',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"왜 서재 문을 열지 않았습니까? 주인이 위험할 수도 있었는데요."

스탠거슨이 바닥을 응시합니다.

"열쇠가 없었습니다. 그리고 안에서 잠가버렸고요."

"문을 부수려 하진 않았습니까?" 당신이 묻습니다.

긴 침묵.

"두려웠습니다." 그가 작은 목소리로 인정합니다. "그 남자의 목소리가 너무 무서웠어요. '복수'라는 단어를 들었을 때는 더욱."

홈즈가 메모합니다. "그래서 도망쳤군요."

스탠거슨이 고개를 떨군 채 대답합니다. "저는 방으로 돌아가 문을 잠갔습니다. 다음 날 아침까지요."`,
    choices: [
      { text: '다음 날 아침에 무엇을 했는지 묻는다', nextNode: 'stangerson_next_morning' },
      { text: '그 남자가 누구인지 아는지 추궁한다', nextNode: 'stangerson_stranger_question' },
      { text: '부드럽게 위로한다', nextNode: 'stangerson_gentle_approach' },
      { text: '일단 다른 질문을 한다', nextNode: 'ask_stangerson' }
    ]
  }
};
