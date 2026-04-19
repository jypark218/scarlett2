// 지하실 이후 심문 관련 노드들
// basement-scene-extended의 확장 노드

import { StoryNode } from '../../types/story';

export const basementInterrogationNodes: Record<string, StoryNode> = {

  // ===== 심문 추가 노드들 =====
  
  ask_drebber_motive: {
    id: 'ask_drebber_motive',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `\"왜 엘렌을 노렸습니까?\"

드레버가 침묵한다.

잠시 후... 그가 입을 연다.

[드레버]: ...백작 때문이오.

[드레버]: 그 자가... 내 인생을 파멸시켰소.

백작이 드레버를 본다.

[모로 백작]: 네가... 직접...?

드레버가 웃는다.

[드레버]: 엘렌이 의식에서 죽으면... 백작이 범인이 되겠지.

[드레버]: 완벽한 복수였소.`,
    choices: [
      { text: '드레버를 체포한다', nextNode: 'good_ending_truth_revealed' }
    ]
  },

  present_more_evidence_drebber: {
    id: 'present_more_evidence_drebber',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 증거들을 꺼낸다.

[홈즈]: 1. 위조된 편지

[홈즈]: 2. 의식 계획서

[홈즈]: 3. 필적 분석 결과

모든 것이 드레버를 가리킨다.

드레버가 무너진다.

[드레버]: ...인정하오.

진실이 밝혀진다.`,
    choices: [
      { text: '드레버를 체포한다', nextNode: 'good_ending_truth_revealed' }
    ]
  },

  press_stangerson_ritual: {
    id: 'press_stangerson_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    text: `홈즈가 스탠거슨을 압박한다.

[홈즈]: 당신이 의식실 열쇠를 관리했죠?

스탠거슨이 떨린다.

[스탠거슨]: 네... 하지만...

[홈즈]: 드레버가 열쇠를 빌려갔습니까?

스탠거슨이 고개를 끄덕인다.

[스탠거슨]: ...그렇습니다.

진실이 드러난다.`,
    choices: [
      { text: '드레버를 심문한다', nextNode: 'interrogate_drebber_ritual' }
    ]
  },

  press_drebber_ritual: {
    id: 'press_drebber_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    text: `홈즈가 드레버를 압박한다.

[홈즈]: 왜 백작을 증오했습니까?

드레버가 웃는다.

[드레버]: 그 자가... 내 인생을 파멸시켰소.

[홈즈]: 그래서 엘렌을?

드레버가 침묵한다.

증거가 산더미처럼 쌓여있다.`,
    choices: [
      { text: '증거를 제시한다', nextNode: 'present_more_evidence_drebber' }
    ]
  },

  stangerson_reveals_drebber_plan: {
    id: 'stangerson_reveals_drebber_plan',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    text: `스탠거슨이 모든 것을 말한다.

[스탠거슨]: 드레버가... 열쇠를 빌려갔습니다.

[스탠거슨]: 의식실을 준비하겠다고...

[스탠거슨]: 저는... 몰랐습니다... 엘렌을...

드레버가 스탠거슨을 노려본다.

[드레버]: 이 배신자!

진실이 완전히 밝혀진다.`,
    choices: [
      { text: '드레버를 체포한다', nextNode: 'good_ending_truth_revealed' }
    ]
  },

  confront_drebber_culprit: {
    id: 'confront_drebber_culprit',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `\"드레버, 모든 증거가 당신을 가리킵니다.\"

드레버가 웃음을 터뜨린다.

[드레버]: 하하... 그래... 인정하지...

[드레버]: 백작을 파멸시키려 했소!

[드레버]: 엘렌이 의식에서 죽으면... 백작이 범인...

백작이 주먹을 쥔다.

[모로 백작]: 이... 악마...!

홈즈가 드레버를 제압한다.`,
    choices: [
      { text: '경찰을 부른다', nextNode: 'good_ending_truth_revealed' }
    ]
  },

  stangerson_reaction_to_reveal: {
    id: 'stangerson_reaction_to_reveal',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    text: `스탠거슨이 드레버의 자백을 듣고 충격받는다.

[스탠거슨]: 드레버... 당신이...

[스탠거슨]: 저는... 몰랐습니다...

백작이 스탠거슨을 본다.

[모로 백작]: 스탠거슨... 당신은 몰랐군...

스탠거슨이 무릎을 꿇는다.

[스탠거슨]: 죄송합니다... 백작님...

진실이 완전히 밝혀진다.`,
    choices: [
      { text: '사건을 마무리한다', nextNode: 'good_ending_truth_revealed' }
    ]
  },

  // ===== 연결 노드들 =====
  
  plan_interrogation: {
    id: 'plan_interrogation',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 심문 계획을 세운다.

[홈즈]: 따로 심문해서 진술을 비교하자.

[홈즈]: 모순이 나오면 범인을 찾을 수 있어.`,
    choices: [
      { text: '심문을 시작한다', nextNode: 'go_to_drawing_room_interrogation' }
    ]
  },

  begin_suspect_interrogation: {
    id: 'begin_suspect_interrogation',
    day: 1,
    timeOfDay: 'evening',
    text: `응접실로 용의자들을 부른다.

스탠거슨과 드레버가 들어온다.

긴장감이 흐른다.`,
    choices: [
      { text: '심문 시작', nextNode: 'go_to_drawing_room_interrogation' }
    ]
  },

  plan_dual_interrogation: {
    id: 'plan_dual_interrogation',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 말한다.

[홈즈]: 둘을 동시에 심문하자.

[홈즈]: 서로의 반응을 보면 진실을 알 수 있어.`,
    choices: [
      { text: '심문 시작', nextNode: 'go_to_drawing_room_interrogation' }
    ]
  },

  begin_dual_interrogation: {
    id: 'begin_dual_interrogation',
    day: 1,
    timeOfDay: 'evening',
    text: `두 용의자를 응접실로 부른다.

스탠거슨과 드레버가 마주 앉는다.

긴장감이 감돈다.`,
    choices: [
      { text: '심문 시작', nextNode: 'confront_both_suspects' }
    ]
  },

  plan_drebber_interrogation: {
    id: 'plan_drebber_interrogation',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 말한다.

[홈즈]: 드레버부터 심문하자.

[홈즈]: 복수 동기가 강해.`,
    choices: [
      { text: '드레버 심문', nextNode: 'interrogate_drebber_ritual' }
    ]
  },

  plan_stangerson_interrogation: {
    id: 'plan_stangerson_interrogation',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 말한다.

[홈즈]: 스탠거슨부터 심문하자.

[홈즈]: 유산 동기가 있어.`,
    choices: [
      { text: '스탠거슨 심문', nextNode: 'interrogate_stangerson_ritual' }
    ]
  },

  suspect_drebber: {
    id: 'suspect_drebber',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `\"드레버가 가장 의심스럽습니다.\"

홈즈가 고개를 끄덕인다.

[홈즈]: 복수 동기가 명확하지.`,
    choices: [
      { text: '드레버 심문 계획', nextNode: 'plan_drebber_interrogation' }
    ]
  },

  suspect_stangerson: {
    id: 'suspect_stangerson',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `\"스탠거슨이 의심스럽습니다.\"

홈즈가 고개를 끄덕인다.

[홈즈]: 유산 동기가 있어.`,
    choices: [
      { text: '스탠거슨 심문 계획', nextNode: 'plan_stangerson_interrogation' }
    ]
  },

  return_to_mansion_with_hope: {
    id: 'return_to_mansion_with_hope',
    day: 1,
    timeOfDay: 'evening',
    text: `호프와 함께 저택으로 돌아간다.

이제 진실을 밝힐 시간이다.`,
    choices: [
      { text: '응접실로 간다', nextNode: 'go_to_drawing_room_interrogation' }
    ]
  },

  final_deduction_meeting: {
    id: 'final_deduction_meeting',
    day: 1,
    timeOfDay: 'evening',
    text: `모두가 응접실에 모인다.

홈즈가 추리를 시작한다.

진실이 밝혀질 순간이다.`,
    choices: [
      { text: '추리 발표', nextNode: 'go_to_drawing_room_interrogation' }
    ]
  },

  stop_hope_leaving: {
    id: 'stop_hope_leaving',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `\"호프, 기다리십시오!\"

호프가 멈춘다.

[왓슨]: 진실을 함께 밝힙시다.`,
    choices: [
      { text: '함께 저택으로', nextNode: 'return_to_mansion_with_hope' }
    ]
  },

  hope_confession_after_basement: {
    id: 'hope_confession_after_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    text: `호프가 모든 것을 고백한다.

[제퍼슨 호프]: ...백작을 감금한 건 나요.

[제퍼슨 호프]: 엘렌을 지키기 위해...

백작과 호프가 서로를 본다.

진실이 드러난다.`,
    choices: [
      { text: '화해를 유도한다', nextNode: 'reconcile_hope_and_count' }
    ]
  },

  // ===== 엔딩 노드들 =====
  
  good_ending_truth_revealed: {
    id: 'good_ending_truth_revealed',
    day: 2,
    timeOfDay: 'morning',
    speaker: 'narrator',
    text: `[✅ 굿엔딩: 진실이 밝혀지다]

이틀 뒤, 경찰서.

드레버가 법정으로 호송된다.

그의 죄명: 엘렌 납치 미수, 백작 감금 음모.

홈즈가 당신을 본다.

[홈즈]: 잘했어, 왓슨. 진실을 밝혀냈어.

모로 백작과 제퍼슨 호프가 악수한다.

[모로 백작]: 엘렌을 함께 키웁시다.

[제퍼슨 호프]: ...좋소.

엘렌이 두 아버지 사이에 서 있다.

[엘렌]: 감사합니다... 모두...

20년의 비극이... 조금씩 치유된다.

진실은... 때로 고통스럽지만... 필요하다.

--- 엔딩: 진실의 빛 ---`,
    isEnding: true,
    endingType: 'good',
    showCredits: true,
    choices: []
  },

  good_ending_reconciliation: {
    id: 'good_ending_reconciliation',
    day: 2,
    timeOfDay: 'morning',
    speaker: 'narrator',
    text: `[✅ 굿엔딩: 화해]

이틀 뒤, 모로 백작의 저택.

정원에서 백작, 호프, 엘렌이 함께 있다.

루시의 무덤 앞에서.

[모로 백작]: 루시... 미안하오...

[제퍼슨 호프]: 루시... 엘렌을 지켰소...

엘렌이 루시의 묘비에 꽃을 놓는다.

[엘렌]: 어머니... 사랑해요...

세 사람이 함께 묵념한다.

홈즈가 당신에게 속삭인다.

[홈즈]: 아름다운 결말이야, 왓슨.

[왓슨]: 네... 용서가... 복수보다 강하군요.

드레버는 법의 심판을 받았지만...

백작과 호프는... 서로를 용서했다.

엘렌은 두 아버지의 사랑을 받으며 자랄 것이다.

20년의 어둠이... 빛으로 바뀌었다.

--- 엔딩: 용서와 화해 ---`,
    isEnding: true,
    endingType: 'good',
    showCredits: true,
    choices: []
  }

};
