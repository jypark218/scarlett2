import { StoryNode } from '../../types/story';

/**
 * 🔧 호프 심문 누락 노드들
 * hope-interrogation.ts에 추가되어야 할 노드들
 */

export const hopeMissingNodes: Record<string, StoryNode> = {
  
  hope_why_now: {
    id: 'hope_why_now',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    speaker: 'watson',
    text: `"왜 이제야 행동했습니까?"

호프가 로켓을 본다.

[제퍼슨 호프]: "...기회를 기다렸습니다."

[제퍼슨 호프]: "백작이 저택을 사고, 엘렌을 부르고... 혼자가 될 때를..."

[왓슨]: "그래서... 이제 행동했군요."`,
    choices: [
      { text: '💬 "백작의 계획을 어떻게 알았습니까?"', nextNode: 'hope_plan_details' },
      { text: '🔍 "이제 어떻게 하시겠습니까?"', nextNode: 'hope_what_now' }
    ]
  },

  hope_realized: {
    id: 'hope_realized',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"깨달았군요."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 늦었지만... 깨달았습니다."

[왓슨]: "지금이라도... 올바른 길을 선택할 수 있습니다."`,
    choices: [
      { text: '💬 "용기를 내십시오"', nextNode: 'hope_courage' },
      { text: '🔍 "이제 어떻게 하시겠습니까?"', nextNode: 'hope_what_now' }
    ]
  },

  hope_trust_law: {
    id: 'hope_trust_law',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"법을 믿으십시오."

[왓슨]: "법은 완벽하지 않습니다. 하지만... 복수보다는 낫습니다."

호프가 잠시 생각한다.

[제퍼슨 호프]: "...그렇다면..."`,
    choices: [
      { text: '💬 "법정에 서시겠습니까?"', nextNode: 'hope_court_decision' },
      { text: '🔍 "우리가 함께 하겠습니다"', nextNode: 'hope_together' }
    ]
  },

  hope_living_dead: {
    id: 'hope_living_dead',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"무슨 뜻입니까?"

[제퍼슨 호프]: "...복수만 생각하며 살았습니다. 20년간..."

[제퍼슨 호프]: "저는... 살아있었나요?"

침묵이 흐른다.`,
    choices: [
      { text: '💬 "아직 늦지 않았습니다"', nextNode: 'hope_not_too_late' },
      { text: '🔍 "이제 다시 시작할 수 있습니다"', nextNode: 'hope_new_start' }
    ]
  },

  hope_still_alive: {
    id: 'hope_still_alive',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"아직 살아있습니다."

[왓슨]: "백작도, 당신도... 모두 살아있습니다."

[왓슨]: "아직... 선택할 수 있습니다."

호프가 고개를 숙인다.

[제퍼슨 호프]: "...알겠습니다."`,
    choices: [
      { text: '💬 "용기를 내십시오"', nextNode: 'hope_courage' },
      { text: '🔍 "함께 가시죠"', nextNode: 'hope_together' }
    ]
  },

  hope_lucy_peace: {
    id: 'hope_lucy_peace',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"루시는... 평화로울 겁니다."

[왓슨]: "당신이 복수가 아닌 정의를 선택한다면..."

호프가 눈을 감는다.

[제퍼슨 호프]: "...네. 알겠습니다."`,
    choices: [
      { text: '💬 "준비되셨습니까?"', nextNode: 'hope_ready' },
      { text: '🔍 "함께 갑시다"', nextNode: 'hope_together' }
    ]
  },

  hope_new_start: {
    id: 'hope_new_start',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"이제 다시 시작할 수 있습니다."

[왓슨]: "복수가 아닌... 정의를 위한 삶을..."

호프가 눈물을 흘린다.

[왓슨]: "희망은 항상 있습니다. 선택만 하면..."`,
    choices: [
      { text: '💬 "함께 갑시다"', nextNode: 'hope_together' },
      { text: '🔍 "준비되셨습니까?"', nextNode: 'hope_ready' }
    ]
  },

  inn_hope_drebber_contact: {
    id: 'inn_hope_drebber_contact',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    speaker: 'watson',
    text: `"호프가 드레버와 접촉한 적 있습니까?"

여관 주인이 고개를 끄덕인다.

[제임스 매튜스]: "네... 며칠 전에 그 뚱뚱한 신사가 여기 왔었어요."

[제임스 매튜스]: "호프 씨를 찾더니... 뭔가 다투는 것 같았어요."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "무슨 이야기를 나눴습니까?"

[제임스 매튜스]: "들리지 않았지만... 드레버가 겁에 질린 것 같았어요."

[제임스 매튜스]: "호프 씨가 뭔가를 보여주더니... 드레버가 창백해지더라고요."`,
    choices: [
      { text: '💬 "무엇을 보여줬습니까?"', nextNode: 'inn_hope_behavior' },
      { text: '🔥 "지금 호프를 만나러 가겠습니다"', nextNode: 'inn_meet_hope' },
      { text: '🔍 "백작 저택에 갔다 온 적 있습니까?"', nextNode: 'inn_hope_mansion_visit' }
    ]
  },

  inn_hope_today: {
    id: 'inn_hope_today',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    speaker: 'watson',
    text: `"오늘은 어디 계십니까?"

여관 주인이 위를 가리킨다.

[제임스 매튜스]: "2층 방에 계십니다. 아침부터 나오지 않으셨어요."

[제임스 매튜스]: "식사도 거르시고... 뭔가 생각에 잠겨 계신 것 같아요."

홈즈가 일어선다.

[셜록 홈즈]: "지금 만나보아야겠습니다."

[왓슨]: "그렇습니다. 더 늦기 전에..."`,
    choices: [
      { text: '🏃 "호프의 방으로 간다"', nextNode: 'inn_meet_hope' },
      { text: '💬 "조금 더 물어볼 게 있습니다"', nextNode: 'inn_ask_coachman' }
    ]
  },

  inn_hope_brought_something: {
    id: 'inn_hope_brought_something',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    speaker: 'watson',
    text: `"호프가 저택에서 무언가를 가져온 것 같습니까?"

여관 주인이 잠시 생각한다.

[제임스 매튜스]: "글쎄요... 확실하지는 않지만..."

[제임스 매튜스]: "어제 밤 돌아왔을 때... 코트 주머니에 뭔가 있는 것 같았어요."

[제임스 매튜스]: "로켓처럼 빛나는... 금색 무언가..."

홈즈가 메모한다.

[셜록 홈즈]: "로켓... 흥미롭군요."

당신이 홈즈를 본다.

그의 눈이 빛난다.

[셜록 홈즈]: "왓슨, 이제 그를 만나봅시다."`,
    choices: [
      { text: '🏃 "호프를 만나러 간다"', nextNode: 'inn_meet_hope' },
      { text: '💬 "조금 더 물어보겠습니다"', nextNode: 'inn_ask_coachman' }
    ]
  }
};
