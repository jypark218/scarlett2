/**
 * 스탠거슨 사건 조사
 * 다음 날 아침, 증거 인멸, 진흙 자국 등
 */

import { StoryNode } from '../../../types/story';

export const stangersonInvestigationNodes: Record<string, StoryNode> = {
  // 다음 날 아침 행동
  stangerson_next_morning: {
    id: 'stangerson_next_morning',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"다음 날 아침, 무엇을 하셨습니까?"

스탠거슨이 손을 떱니다.

"해가 뜨자마자 서재로 갔습니다. 문이 열려 있었어요. 안은 엉망이었죠. 책들이 바닥에 널려있고, 의자가 넘어져 있었습니다."

"백작님은요?"

"없었습니다. 흔적도 없이 사라졌어요. 다만 책상 위에 붉은 종이가 하나 놓여있었습니다."

홈즈가 날카롭게 묻습니다. "붉은 종이? 무엇이 쓰여 있었습니까?"

스탠거슨이 얼어붙습니다. "아무 글자도 없었습니다. 그냥 붉은 종이 한 장뿐이었어요."

"그 종이는 지금 어디 있습니까?"

"저, 저는 무서워서 태워버렸습니다. 그리고 경찰에 신고하지 못했죠."`,
    choices: [
      { text: '왜 경찰에 신고하지 않았는지 추궁한다', nextNode: 'stangerson_no_police' },
      { text: '왜 증거를 태웠는지 따진다', nextNode: 'stangerson_burned_evidence' },
      { text: '붉은 종이의 의미를 아는지 묻는다', nextNode: 'stangerson_red_paper_meaning' },
      { text: '일단 다른 질문을 한다', nextNode: 'stangerson_hub' }
    ]
  },

  // 증거 인멸 추궁
  stangerson_burned_evidence: {
    id: 'stangerson_burned_evidence',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "증거를 태웠다고요? 왜 그런 짓을 했습니까?"

스탠거슨: "저, 저는 무서웠습니다! 그 붉은 종이가 무엇을 의미하는지 알았으니까요."

"무엇을 의미합니까?"

스탠거슨이 떨립니다. "복수의 표시입니다. 20년 전에도 봤던 것이에요."

홈즈의 눈빛이 날카로워집니다. "20년 전이라니요? 설명해주십시오."

"그때도 누군가 죽었습니다. 그리고 옆에 붉은 종이가 놓여있었죠. 그 후 우리는 도망쳤습니다."

당신이 묻습니다. "누가 죽었습니까?"

스탠거슨이 고개를 숙입니다. "페리에 영감님이요."`,
    choices: [
      { text: '20년 전 사건을 자세히 듣는다', nextNode: 'stangerson_germany_past' },
      { text: '페리에가 누구인지 묻는다', nextNode: 'stangerson_lucy_question' },
      { text: '백작이 과거에 무슨 짓을 했는지 추궁한다', nextNode: 'stangerson_past_victim' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 붉은 종이의 의미
  stangerson_red_paper_meaning: {
    id: 'stangerson_red_paper_meaning',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"붉은 종이가 무엇을 의미합니까? 당신은 아는 것 같은데요."

스탠거슨이 창백해집니다.

"저는 전에 그것을 봤습니다. 20년 전에요."

홈즈가 앞으로 나섭니다. "언제, 어디서 봤습니까?"

"미국에서입니다. 어떤 노인이 죽었을 때 그 옆에 붉은 종이가 놓여있었어요. 그리고 누군가 벽에 글자를 남겼죠."

"무슨 글자였습니까?"

스탠거슨 떨리는 목소리로 말합니다. "RACHE... 독일어로 '복수'라는 뜻입니다."

홈즈가 당신을 봅니다. "왓슨, 이 사건은 20년 전부터 시작된 것 같습니다."`,
    choices: [
      { text: '20년 전 사건에 대해 자세히 묻는다', nextNode: 'stangerson_germany_past' },
      { text: '그 남자가 누구인지 아는지 추궁한다', nextNode: 'stangerson_stranger_question' },
      { text: '백작과 당신의 관계를 캐묻는다', nextNode: 'stangerson_relationship' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 낯선 남자에 대한 질문
  stangerson_stranger_question: {
    id: 'stangerson_stranger_question',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "미국 억양의 남자가 '루시를 위해서'라고 했습니다. 그 남자가 누구인지 아십니까?"

스탠거슨이 얼어붙습니다.

"저 모릅니다."

홈즈가 한 걸음 다가갑니다. "하지만 짐작은 하고 계시죠? 루시라는 이름을 들었을 때, 백작이 두려워했던 이유를 알고 계실 겁니다."

스탠거슨의 손이 떨립니다.

홈즈: "백작님과 당신, 그리고 루시. 과거에 무슨 일이 있었습니까?"`,
    choices: [
      { text: '루시가 누구인지 묻는다', nextNode: 'stangerson_lucy_question' },
      { text: '백작이 과거에 누군가를 해친 적 있는지 추궁한다', nextNode: 'stangerson_past_victim' },
      { text: '부드럽게 진실을 말하도록 유도한다', nextNode: 'stangerson_gentle_approach' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 루시에 대한 질문
  stangerson_lucy_question: {
    id: 'stangerson_lucy_question',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"루시는 누구입니까?"

스탠거슨이 고개를 숙입니다.

"페리에 영감의 딸이었습니다."

"페리에?" 홈즈가 메모합니다.

"20년 전 일입니다. 독일에서, 아니 미국에서 일어난 일이죠." 그가 말을 더듬습니다.

"정확히 말씀해주십시오." 당신이 부드럽게 묻습니다.

긴 침묵 후, 스태거슨이 떨리는 목소리로 말합니다.

"루시는 병으로 죽었습니다. 치료비가 있었지만 백작님이 쓰지 않으셨죠."`,
    choices: [
      { text: '백작이 치료비를 주지 않았다는 말인지 확인한다', nextNode: 'stangerson_lucy_death' },
      { text: '루시의 연인이나 가족이 있었는지 묻는다', nextNode: 'stangerson_lucy_lover' },
      { text: '더 자세한 진실을 캐묻는다', nextNode: 'stangerson_germany_past' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 루시의 연인
  stangerson_lucy_lover: {
    id: 'stangerson_lucy_lover',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"루시에게 가족이나 연인이 있었습니까?"

스탠거슨이 고개를 끄덕입니다.

"약혼자가 있었습니다. 군인이었죠. 키가 크고, 눈빛이 강한 남자였어요."

홈즈가 날카롭게 묻습니다. "그 남자 이름은?"

"저는 잘 기억이 나지 않습니다." 스태거슨이 회피합니다.

하지만 당신은 알아챕니다. 그가 거짓말을 하고 있다는 것을.

홈즈: "미국식 억양의 키 큰 남자, 20년 전 루시의 약혼자. 그 남자가 백작을 납치했다고 생각하십니까?"

스탠거슨이 창백해집니다.`,
    choices: [
      { text: '그 남자의 이름을 알려달라고 압박한다', nextNode: 'stangerson_reveal_hope' },
      { text: '백작이 루시에게 무슨 짓을 했는지 추궁한다', nextNode: 'stangerson_lucy_death' },
      { text: '20년 전 사건을 자세히 듣는다', nextNode: 'stangerson_1861_connection' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 호프의 이름이 드러나는 순간
  stangerson_reveal_hope: {
    id: 'stangerson_reveal_hope',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "이름을 말씀하십시오. 백작을 납치한 그 남자의 이름을."

스탠거슨이 떨립니다.

긴 침묵.

"...제퍼슨 호프." 그가 마침내 인정합니다.

홈즈가 메모합니다. "제퍼슨 호프... 미국인, 전직 군인, 루시의 약혼자..."

스탠거슨: "20년간... 그를 잊고 살았습니다. 하지만 한 달 전... 백작님이 편지를 받았을 때... 저는 알았습니다. 그가 돌아왔다는 것을..."

당신이 묻습니다. "편지에 뭐라고 쓰여있었습니까?"`,
    choices: [
      { text: '편지 내용을 듣는다', nextNode: 'stangerson_threat_letter' },
      { text: '호프가 왜 복수하려 하는지 묻는다', nextNode: 'stangerson_1861_connection' },
      { text: '지금 호프가 어디 있는지 추궁한다', nextNode: 'stangerson_knows_location' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 협박 편지 내용
  stangerson_threat_letter: {
    id: 'stangerson_threat_letter',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"한 달 전 편지... 미국 우표가 붙어있었습니다."

스탠거슨이 떨리는 목소리로 회상합니다.

"'곧 간다. 20년을 기다렸다. 루시를 위해서.' 서명은 없었지만... 백작님은 즉시 알아챘습니다."

"호프라는 것을요?" 홈즈가 확인합니다.

"예... 백작님은 그날 밤 술을 마시며 중얼거렸습니다. '드디어 왔군... 피할 수 없는 것을...'"

당신이 묻습니다. "그런데 왜 경찰에 신고하지 않았습니까?"

스탠거슨: "백작님이 금지하셨습니다. '경찰이 오면 20년 전 일까지 밝혀진다. 우리 둘 다 끝이다'라고..."`,
    choices: [
      { text: '20년 전 사건의 진실을 듣는다', nextNode: 'stangerson_1861_connection' },
      { text: '백작이 협박으로 당신을 묶어뒀다고 추궁한다', nextNode: 'stangerson_blackmail' },
      { text: '호프의 현재 위치를 묻는다', nextNode: 'stangerson_knows_location' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 과거 피해자
  stangerson_past_victim: {
    id: 'stangerson_past_victim',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "백작이 과거에 누군가를 해친 적이 있습니까? 미국에서... 혹은 독일에서..."

스탠거슨이 고개를 떨굽니다.

"...있었습니다."

"누구입니까?"

"페리에 영감... 그리고 그의 딸 루시..."

홈즈의 눈빛이 날카로워집니다. "어떻게 해쳤습니까?"

스탠거슨: "사기... 금광 투자 사기였습니다. 페리에 영감의 전 재산을 빼앗았죠. 그리고 루시가 병들었을 때..."

그가 말을 잇지 못합니다.`,
    choices: [
      { text: '루시에게 무슨 일이 있었는지 묻는다', nextNode: 'stangerson_lucy_death' },
      { text: '루시의 가족은 어떻게 됐는지 캐묻는다', nextNode: 'stangerson_lucy_lover' },
      { text: '당신도 공범이었는지 추궁한다', nextNode: 'stangerson_1861_connection' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 루시의 죽음
  stangerson_lucy_death: {
    id: 'stangerson_lucy_death',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"루시가 병들었을 때 무슨 일이 있었습니까?"

스탠거슨이 바닥을 응시합니다.

"폐병이었습니다. 치료비가 필요했죠. 하지만 페리에 영감의 돈은 이미 우리가 가져간 상태였고요."

그의 목소리가 떨립니다.

"백작님은 말했습니다. '우리 돈이 왜 그들의 치료비가 되어야 하나?' 라고요."

"그래서?" 당신이 묻습니다.

"루시는 죽었습니다. 침대에서, 약혼자가 지켜보는 가운데요."

홈즈가 조용히 말합니다. "그 약혼자가 지금 백작을 납치한 자겠군요."`,
    choices: [
      { text: '약혼자의 이름을 묻는다', nextNode: 'stangerson_reveal_hope' },
      { text: '당신의 역할을 추궁한다', nextNode: 'stangerson_1861_connection' },
      { text: '백작을 구해야 한다고 설득한다', nextNode: 'stangerson_save_count' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  }
};