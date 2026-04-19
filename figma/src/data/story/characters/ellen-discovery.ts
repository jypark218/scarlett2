// 엘렌이 의식 계획을 알게 되는 경로
// 호프에게 도움을 요청하는 과정

import { StoryNode } from '../../../types/story';

export const ellenDiscoveryNodes: Record<string, StoryNode> = {

  // ========================================
  // 엘렌의 발견 (Day -7 ~ Day -3)
  // 회상 노드로 구성
  // ========================================

  ellen_discovers_ritual_plan: {
    id: 'ellen_discovers_ritual_plan',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `[엘렌과의 대화 - 회상]

엘렌이 조용히 말한다.

[엘렌]: ...1주일 전이었어요.

[왓슨]: 무슨 일이 있었습니까?

[엘렌]: 아버지가... 저를 지하실로 불렀어요.

그녀가 떨린다.

[엘렌]: 처음엔... 저택 구조를 보여주시는 줄 알았죠.

[엘렌]: 하지만...

그녀의 목소리가 떨린다.`,
    choices: [
      { text: '계속 듣는다', nextNode: 'ellen_sees_ritual_chamber' },
      { text: '위로한다', nextNode: 'comfort_ellen_before_story' }
    ]
  },

  comfort_ellen_before_story: {
    id: 'comfort_ellen_before_story',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"천천히 말해도 됩니다."

엘렌이 고개를 끄덕인다.

[엘렌]: 감사합니다...

그녀가 깊게 숨을 쉰다.

[엘렌]: 말씀드릴게요. 모두...`,
    choices: [
      { text: '듣는다', nextNode: 'ellen_sees_ritual_chamber' }
    ]
  },

  ellen_sees_ritual_chamber: {
    id: 'ellen_sees_ritual_chamber',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 떨리는 목소리로 계속한다.

[엘렌]: 지하실에는... 두 개의 방이 있었어요.

[엘렌]: 첫 번째 방에는 젊은 여성의 초상화가...

[엘렌]: "루시 페리에"라는 이름이 적혀있었죠.

[왓슨]: 당신 어머니의...

엘렌이 고개를 끄덕인다.

[엘렌]: 네. 그때는 몰랐어요. 하지만...

[엘렌]: 아버지가 그 앞에서 울고 계셨어요.

[엘렌]: "미안하다... 루시... 미안하다..."라고...

[홈즈]: 속죄실이군요.

엘렌이 계속한다.

[엘렌]: 그리고... 그 방에서 다른 문을 여셨어요.

[엘렌]: 그 안에는...

그녀가 떤다.`,
    choices: [
      { text: '계속 듣는다', nextNode: 'ellen_sees_altar' },
      { text: '잠시 쉬자고 한다', nextNode: 'suggest_break_for_ellen' }
    ]
  },

  suggest_break_for_ellen: {
    id: 'suggest_break_for_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"잠시 쉬시겠습니까?"

엘렌이 고개를 젓는다.

[엘렌]: 아니에요. 지금 말해야 해요.

[엘렌]: 더 이상 숨기고 싶지 않아요.

그녀의 눈에 결의가 보인다.`,
    choices: [
      { text: '계속 듣는다', nextNode: 'ellen_sees_altar' }
    ]
  },

  ellen_sees_altar: {
    id: 'ellen_sees_altar',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 눈물을 흘리며 말한다.

[엘렌]: 그 안에는... 제단이 있었어요.

[엘렌]: 촛불... 이상한 상징들... 그리고...

[엘렌]: 하얀 드레스가 걸려있었어요.

[왓슨]: 드레스...?

[엘렌]: 결혼 드레스 같았지만... 뭔가 이상했어요.

[엘렌]: 너무... 의식용 같았어요.

홈즈가 날카롭게 반응한다.

[홈즈]: 당신을 위한 드레스였군요.

엘렌이 고개를 끄덕인다.

[엘렌]: 아버지가... 그렇게 말씀하셨어요.

[엘렌]: "엘렌, 네 생일에... 특별한 의식을 치를 거야..."`,
    choices: [
      { text: '무슨 의식이었는지 묻는다', nextNode: 'ellen_learns_ritual_name' },
      { text: '어떻게 반응했는지 묻는다', nextNode: 'ellen_reaction_to_ritual' }
    ]
  },

  ellen_learns_ritual_name: {
    id: 'ellen_learns_ritual_name',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"무슨 의식이었습니까?"

엘렌이 떨린다.

[엘렌]: "영원한 신부 의식"...

[엘렌]: 아버지가 그렇게 부르셨어요.

[엘렌]: "루시처럼... 너도 신의 신부가 될 거야..."

[왓슨]: 그게 무슨 뜻인지 이해하셨습니까?

[엘렌]: 처음엔... 몰랐어요.

[엘렌]: 하지만... 아버지의 눈빛이...

[엘렌]: 광기... 같았어요.

그녀가 흐느낀다.`,
    choices: [
      { text: '위로한다', nextNode: 'comfort_ellen_after_ritual' },
      { text: '다음에 어떻게 했는지 묻는다', nextNode: 'ellen_escape_decision' }
    ]
  },

  ellen_reaction_to_ritual: {
    id: 'ellen_reaction_to_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 눈물을 닦는다.

[엘렌]: 처음엔... 믿을 수 없었어요.

[엘렌]: 아버지가 저를 20년간 키워주셨는데...

[엘렌]: 왜 갑자기...?

[왓슨]: 거부하셨습니까?

[엘렌]: ...직접은 못했어요.

[엘렌]: 아버지가... 너무 기뻐하시는 것 같았거든요.

[엘렌]: "드디어... 루시의 혼을 이을 수 있어..."

[엘렌]: 그 말을 듣고... 깨달았어요.

[홈즈]: 무엇을요?

[엘렌]: 아버지가... 정상이 아니시다는 걸...`,
    choices: [
      { text: '그 후 어떻게 했는지 묻는다', nextNode: 'ellen_escape_decision' }
    ]
  },

  comfort_ellen_after_ritual: {
    id: 'comfort_ellen_after_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"힘드셨겠습니다..."

엘렌이 고개를 끄덕인다.

[엘렌]: 20년간... 아버지를 믿었는데...

[엘렌]: 그분이... 저를...

그녀가 울음을 참는다.

[왓슨]: 그 후 어떻게 하셨습니까?

엘렌이 눈물을 닦는다.

[엘렌]: 도망쳐야 한다고 생각했어요.`,
    choices: [
      { text: '계속 듣는다', nextNode: 'ellen_escape_decision' }
    ]
  },

  ellen_escape_decision: {
    id: 'ellen_escape_decision',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 조용히 말한다.

[엘렌]: 그날 밤... 도망치려 했어요.

[엘렌]: 하지만... 어디로 가야 할지...

[엘렌]: 아는 사람도 없고... 돈도 없고...

[왓슨]: 그때 호프를 만나셨군요.

엘렌이 고개를 끄덕인다.

[엘렌]: 네... 우연히...

[엘렌]: 아버지께 물건을 배달하러 오신 마차꾼이었어요.

[엘렌]: 하지만... 그분의 눈빛에서...

[엘렌]: 뭔가... 슬픔이 느껴졌어요.

홈즈가 메모한다.`,
    choices: [
      { text: '호프와의 만남을 듣는다', nextNode: 'ellen_meets_hope_flashback' }
    ]
  },

  ellen_meets_hope_flashback: {
    id: 'ellen_meets_hope_flashback',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 회상한다.

[엘렌]: 호프님이 저택 정원에서 쉬고 계실 때...

[엘렌]: 제가 다가갔어요.

[엘렌]: "실례지만... 도와주실 수 있나요?"

[엘렌]: 호프님이 저를 보시더니... 얼어붙으셨어요.

[왓슨]: 왜죠?

[엘렌]: 나중에 아셨다고 하시더라고요.

[엘렌]: 제가... 루시님을 닮았다고...

[엘렌]: 그때는 무슨 말인지 몰랐지만...

홈즈가 고개를 끄덕인다.

[홈즈]: 호프가 당신이 루시의 딸이라는 걸 직감했군요.`,
    choices: [
      { text: '호프에게 뭐라고 말했는지 묻는다', nextNode: 'ellen_tells_hope_about_ritual' }
    ]
  },

  ellen_tells_hope_about_ritual: {
    id: 'ellen_tells_hope_about_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 계속한다.

[엘렌]: 저는... 호프님에게 모든 걸 말씀드렸어요.

[엘렌]: 지하실... 의식실... 드레스...

[엘렌]: 11월 20일에 의식을 치른다는 것...

[엘렌]: 호프님의 얼굴이... 창백해지셨어요.

[왓슨]: 호프가 뭐라고 하셨습니까?

엘렌이 눈물을 흘린다.

[엘렌]: "절대... 절대 안 돼..."

[엘렌]: "루시처럼... 너까지 잃을 순 없어..."

[엘렌]: 그때 알았어요.

[엘렌]: 호프님이... 루시님을 사랑했다는 걸...

그리고... 제가 그분의 딸이라는 걸...`,
    choices: [
      { text: '호프가 진실을 밝혔는지 묻는다', nextNode: 'hope_reveals_truth_to_ellen' },
      { text: '호프가 어떻게 도왔는지 묻는다', nextNode: 'hope_protects_ellen' }
    ]
  },

  hope_reveals_truth_to_ellen: {
    id: 'hope_reveals_truth_to_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 조용히 말한다.

[엘렌]: 호프님이... 모든 걸 말씀해주셨어요.

[엘렌]: 루시님... 제 친어머니...

[엘렌]: 20년 전... "영원한 구원 교단"...

[엘렌]: 그리고... 백작님이 어머니를 죽게 만들었다는 것...

[왓슨]: 그걸 듣고... 어떠셨습니까?

엘렌이 눈물을 흘린다.

[엘렌]: 믿을 수 없었어요.

[엘렌]: 아버지가... 제 친아버지가 아니라는 것도...

[엘렌]: 그분이... 어머니를 죽였다는 것도...

[엘렌]: 하지만... 동시에... 이해가 됐어요.

[왓슨]: 무엇이요?

[엘렌]: 왜 아버지가 항상 슬퍼 보이셨는지...

[엘렌]: 왜 속죄실에서 울고 계셨는지...`,
    choices: [
      { text: '백작을 용서할 수 있었는지 묻는다', nextNode: 'ellen_forgiveness_struggle' },
      { text: '호프의 계획을 듣는다', nextNode: 'hope_protects_ellen' }
    ]
  },

  ellen_forgiveness_struggle: {
    id: 'ellen_forgiveness_struggle',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작을... 용서할 수 있었습니까?"

엘렌이 복잡한 표정을 짓는다.

[엘렌]: ...모르겠어요.

[엘렌]: 20년간 저를 사랑으로 키워주신 분...

[엘렌]: 하지만 동시에 제 어머니를 죽게 만든 분...

[엘렌]: 증오해야 할까요? 사랑해야 할까요?

[왓슨]: ...

[엘렌]: 호프님은 말씀하셨어요.

[엘렌]: "네 마음이 정하는 대로 하렴"이라고...

[엘렌]: 하지만... 그게 뭔지 모르겠어요.

그녀가 조용히 운다.`,
    choices: [
      { text: '시간이 필요하다고 말한다', nextNode: 'watson_comforts_ellen' },
      { text: '호프의 계획을 듣는다', nextNode: 'hope_protects_ellen' }
    ]
  },

  watson_comforts_ellen: {
    id: 'watson_comforts_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"시간이 필요합니다. 서두르지 마세요."

엘렌이 당신을 본다.

[엘렌]: 감사합니다...

[엘렌]: 모두가... 제게 답을 요구하는 것 같았어요.

[엘렌]: 하지만 저는... 아직...

[왓슨]: 괜찮습니다. 천천히...

엘렌이 고개를 끄덕인다.`,
    choices: [
      { text: '호프의 계획을 듣는다', nextNode: 'hope_protects_ellen' }
    ]
  },

  hope_protects_ellen: {
    id: 'hope_protects_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 이야기를 계속한다.

[엘렌]: 호프님이... 계획을 세우셨어요.

[왓슨]: 어떤 계획입니까?

[엘렌]: 의식을 막는 것...

[엘렌]: 백작님을 감금해서... 11월 20일에 의식을 못 치르게...

[홈즈]: 백작 없이는 의식이 불가능하니까요.

엘렌이 고개를 끄덕인다.

[엘렌]: 네... 호프님이 말씀하시길...

[엘렌]: "설교자 없는 의식은 무의미하다"고...

[엘렌]: 그래서... 며칠 전...

[엘렌]: 호프님이 백작님을 지하실에...

그녀가 눈물을 흘린다.

[엘렌]: 저 때문에... 아버지가...`,
    choices: [
      { text: '당신 잘못이 아니라고 말한다', nextNode: 'reassure_ellen_not_guilty' },
      { text: '호프가 백작을 해치지 않았는지 묻는다', nextNode: 'ask_if_count_safe' }
    ]
  },

  reassure_ellen_not_guilty: {
    id: 'reassure_ellen_not_guilty',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"당신 잘못이 아닙니다."

엘렌이 당신을 본다.

[왓슨]: 호프는 당신을 지키려 한 겁니다.

[왓슨]: 백작의 광기로부터...

엘렌이 눈물을 닦는다.

[엘렌]: 하지만... 백작님도... 저를 사랑하셨어요...

[엘렌]: 단지... 방법이 잘못됐을 뿐...

[왓슨]: ...

그녀의 마음이 찢어지고 있다.`,
    choices: [
      { text: '백작이 무사한지 묻는다', nextNode: 'ask_if_count_safe' }
    ]
  },

  ask_if_count_safe: {
    id: 'ask_if_count_safe',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작은 무사합니까?"

엘렌이 고개를 끄덕인다.

[엘렌]: 호프님이... 해치지 않으셨어요.

[엘렌]: 그저... 묶어서 가두셨을 뿐...

[엘렌]: "복수는... 루시가 원하지 않을 것"이라고 하시면서...

[왓슨]: 그럼 백작은 아직 지하실에...?

엘렌이 고개를 끄덕인다.

[엘렌]: 네... 속죄실에...

[엘렌]: 호프님이 음식과 물은 가져다 드린다고...

[홈즈]: 그럼 백작은 살아있군요.

엘렌이 눈물을 흘린다.

[엘렌]: 아버지... 괜찮으실까요...?`,
    choices: [
      { text: '백작을 구하러 가자고 한다', nextNode: 'suggest_rescue_count_ellen' },
      { text: '엘렌의 안전이 먼저라고 한다', nextNode: 'prioritize_ellen_safety' }
    ]
  },

  suggest_rescue_count_ellen: {
    id: 'suggest_rescue_count_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"백작을 구하러 갑시다."

엘렌이 놀란다.

[엘렌]: 하지만... 호프님이...

[왓슨]: 호프도 설득하겠습니다.

[왓슨]: 이 모든 비극을... 끝낼 때입니다.

홈즈가 고개를 끄덕인다.

[홈즈]: 왓슨 말이 맞아. 이제 진실을 밝혀야 해.

엘렌이 주저한다.

[엘렌]: 저도... 아버지를 만나야 할까요?

[왓슨]: 준비가 되었을 때...

엘렌이 고개를 끄덕인다.`,
    choices: [
      { text: '함께 저택으로 간다', nextNode: 'return_to_mansion_with_ellen' }
    ]
  },

  prioritize_ellen_safety: {
    id: 'prioritize_ellen_safety',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    speaker: 'watson',
    text: `"당신의 안전이 먼저입니다."

엘렌이 당신을 본다.

[왓슨]: 백작도 중요하지만... 당신을 지켜야 합니다.

[엘렌]: 하지만... 아버지가...

[홈즈]: 우리가 확인하고 올게요. 당신은 여기 있어요.

엘렌이 망설인다.

[엘렌]: ...아니에요.

[엘렌]: 저도 가겠어요.

[엘렌]: 이 모든 일이... 저 때문에 시작됐으니까요.

[엘렌]: 제가... 끝내야 해요.

그녀의 눈에 결의가 보인다.`,
    choices: [
      { text: '함께 간다', nextNode: 'return_to_mansion_with_ellen' }
    ]
  },

  return_to_mansion_with_ellen: {
    id: 'return_to_mansion_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `엘렌과 함께 저택으로 향한다.

[엘렌]: 떨려요...

[왓슨]: 괜찮습니다. 우리가 함께 있어요.

홈즈가 앞장선다.

[홈즈]: 이제 모든 걸 정리할 시간이야.

저택이 가까워진다.

진실과 화해의 순간이 다가온다.`,
    choices: [
      { text: '저택으로 들어간다', nextNode: 'enter_mansion_with_ellen' }
    ]
  },

  enter_mansion_with_ellen: {
    id: 'enter_mansion_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'entrance',
    character: 'ellen',
    text: `저택 현관으로 들어선다.

엘렌이 떨린다.

[엘렌]: 이곳에서... 20년을 살았어요...

[엘렌]: 하지만 이제는... 낯설어요...

홈즈가 그녀를 위로한다.

[홈즈]: 곧 끝날 거예요.

우물가에서 인기척이 느껴진다.

호프가 서 있다.`,
    choices: [
      { text: '호프에게 다가간다', nextNode: 'ellen_reunites_with_hope' }
    ]
  },

  ellen_reunites_with_hope: {
    id: 'ellen_reunites_with_hope',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    text: `호프가 엘렌을 본다.

[제퍼슨 호프]: 엘렌...! 왜 여기...!

[엘렌]: 호프님... 저도 가야 해요.

[제퍼슨 호프]: 안 돼! 위험해!

엘렌이 고개를 젓는다.

[엘렌]: 아버지를... 만나야 해요.

[엘렌]: 제가... 결정해야 해요.

호프가 엘렌을 본다.

[제퍼슨 호프]: ...루시를 닮았구나. 용감해...

그가 눈물을 흘린다.

[제퍼슨 호프]: 좋아... 함께 가자.

모두 함께 지하실로 향한다.`,
    choices: [
      { text: '지하실로 간다', nextNode: 'final_basement_scene_with_all' }
    ]
  },

  final_basement_scene_with_all: {
    id: 'final_basement_scene_with_all',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `속죄실로 들어선다.

백작이 의자에 묶여있다.

그가 고개를 든다.

[모로 백작]: ...엘렌?

엘렌이 앞으로 나간다.

[엘렌]: 아버지...

백작이 눈물을 흘린다.

[모로 백작]: 엘렌... 미안하다... 나는...

[엘렌]: 알아요. 모두 알아요.

[엘렌]: 어머니... 루시님... 교단... 의식...

백작이 고개를 숙인다.

[모로 백작]: ...용서해줄 수 있겠니?

엘렌이 눈물을 흘린다.

모두가 숨을 죽인다.

엘렌의 선택이... 모든 것을 결정할 것이다.`,
    choices: [
      { text: '[엘렌의 선택을 지켜본다]', nextNode: 'ellen_final_choice' }
    ]
  },

  ellen_final_choice: {
    id: 'ellen_final_choice',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'ellen',
    text: `엘렌이 백작에게 다가간다.

그녀가 백작의 밧줄을 푼다.

[엘렌]: 일어나세요... 아버지.

백작이 놀란다.

[모로 백작]: 엘렌...?

엘렌이 백작을 안는다.

[엘렌]: 저는... 증오할 수 없어요.

[엘렌]: 20년간... 저를 사랑으로 키워주셨으니까요.

[엘렌]: 하지만... 다시는 이러지 말아주세요.

[엘렌]: 광기는... 이제 끝내세요.

백작이 흐느낀다.

[모로 백작]: 고맙다... 내 딸...

호프가 두 사람을 본다.

그의 눈에도 눈물이 맺힌다.

[제퍼슨 호프]: 루시... 네 딸이... 용서를 선택했어...

모두가 조용히 운다.

20년의 비극이... 조금씩 아문다.`,
    choices: [
      { text: '[진실이 밝혀졌다]', nextNode: 'truth_revealed_ending' }
    ]
  },

  truth_revealed_ending: {
    id: 'truth_revealed_ending',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `모두가 지하실에서 나온다.

백작, 호프, 엘렌... 그리고 당신과 홈즈.

홈즈가 정리한다.

[홈즈]: 이제 명확합니다.

[홈즈]: 백작은 의식을 계획하지 않았어요.

[홈즈]: 누군가 백작을 이용해 엘렌을 노린 겁니다.

[왓슨]: 그럼 진짜 범인은...?

홈즈가 고개를 끄덕인다.

[홈즈]: 용의자를 심문해야 합니다.

모두가 응접실로 모인다.

최종 추리의 시간이다.`,
    choices: [
      { text: '용의자 심문을 시작한다', nextNode: 'begin_final_interrogation' }
    ]
  }

};
