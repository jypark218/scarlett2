import { StoryNode } from '../../types/story';

/**
 * 제퍼슨 호프 - 초기 대면 노드들
 * 마차에서 호프를 만나고, 그의 과거와 동기를 파악하는 초반 탐정 장면
 */
export const hopeEarlyNodes: Record<string, StoryNode> = {
  // 마차에서 호프와의 첫 대면 - part1-opening.ts의 investigate_carriage를 사용하므로 삭제
  
  ask_hope_name: {
    id: 'ask_hope_name',
    day: 1,
    timeOfDay: 'afternoon',
    text: `[호프]: "...누구시오?"

내가 그 남자에게 다가갔다.

"존 왓슨입니다. 이쪽은 탐정 셜록 홈즈 씨고요."

호프의 얼굴이 굳어졌다. "탐정"이라는 말에 긴장한 것 같았다.

[호프]: "...제퍼슨 호프라 하오. 그냥 지나가다 잠시 쉬고 있을 뿐이오."`,
    choices: [
      { text: '왜 여기 있는지 계속 추궁한다', nextNode: 'ask_hope_wait_time' },
      { text: '백작과의 관계를 캐묻는다', nextNode: 'ask_hope_past_suspicious' },
      { text: '더 이상 압박하지 않고 저택으로 간다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 호프가 얼마나 기다렸는지 확인하는 노드 (압박)
  ask_hope_wait_time: {
    id: 'ask_hope_wait_time',
    day: 1,
    timeOfDay: 'afternoon',
    text: `[홈즈]: 마차 바퀴 자국, 말의 배설물 상태, 그리고... 저 담요의 이슬 자국을 보면 최소 하룻밤은 이곳에서 주무신 겁니다.

호프가 입술을 깨문다.

[홈즈]: 어제 밤에 무슨 일이 있었습니까?

긴 침묵.

[호프]: ...아무것도 보지 못했소.

그의 목소리가 떨린다.

[호프]: 비명 소리를 들었을 뿐... 하지만 이미 늦소. 제가... 제가 늦었단 말이오.

그의 주먹이 떨린다. 후회와 분노가 뒤섞인 표정이다.`,
    choices: [
      { text: '비명에 대해 더 자세히 묻는다', nextNode: 'ask_hope_scream_details' },
      { text: '\"늦었다\"는 말의 의미를 파고든다', nextNode: 'ask_hope_witness' },
      { text: '백작과 무슨 관계인지 밝혀낸다', nextNode: 'ask_hope_past_suspicious' }
    ]
  },

  // 비명 소리에 대한 구체적인 질문 (새 노드)
  ask_hope_scream_details: {
    id: 'ask_hope_scream_details',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"비명이라고 하셨습니까? 정확히 언제, 어디서 들으셨죠?"

호프가 저택을 바라봤다. 그의 눈빛이... 흔들렸다.

[호프]: "...어젯밤이오. 자정 무렵... 저택 안쪽 깊은 곳에서..."

그가 손으로 저택 뒷편을 가리켰다.

[호프]: "남자의 비명이었소. 고통스러운... 그리고... 공포에 질린..."

[홈즈]: "왜 들어가 보지 않으셨습니까?"

호프가 주먹을 쥐었다.

[호프]: "...문이 잠겨있었소. 뒷문, 정문... 모두. 저택은 어둠에 잠겨있었고... 비명은 금방 멈췄소."

그가 떨렸다.

[호프]: "아침이 되어 경찰이 왔을 때... 저는... 이미 너무 늦었다는 걸 알았소."

홈즈가 나를 봤다. 그의 눈빛이 날로워졌다.

[홈즈]: "(속삭임) 왓슨, 이 남자... 백작을 찾아왔다가 범행 현장의 소리를 들은 거네. 하지만 왜 경찰에 신고하지 않았을까?"`,
    choices: [
      { text: '왜 경찰에 말하지 않았는지 추궁한다', nextNode: 'ask_hope_why_silent' },
      { text: '\"늦었다\"는 말의 의미를 파고든다', nextNode: 'ask_hope_witness' },
      { text: '백작과 무슨 관계인지 밝혀낸다', nextNode: 'ask_hope_past_suspicious' }
    ]
  },

  // 왜 경찰에 말하지 않았는지 (새 노드)
  ask_hope_why_silent: {
    id: 'ask_hope_why_silent',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"비명을 들었다면 왜 경찰에 알리지 않으셨습니까?"

호프의 표정이 굳어졌다.

[호프]: "..."

[홈즈]: "범행을 목격한 증인이라면 당연히 신고해야 합니다. 하지만 당신은 침묵했죠."

호프가 고개를 돌렸다.

[호프]: "저는... 그저 마차꾼일 뿐이오. 경찰이... 믿어줄 리 없소."

[홈즈]: "아니면... 당신도 이 사건에 연루되어 있기 때문입니까?"

긴장감이 흘렀다.

[호프]: "...저는 아무것도 하지 않았소. 단지... 너무 늦게 도착했을 뿐이오."

그가 마차를 향해 걸었다.

[호프]: "이제 가봐야겠소. 더 이상... 할 말이 없소."`,
    choices: [
      { text: '붙잡는다', nextNode: 'stop_hope_leaving' },
      { text: '보내준다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 호프를 붙잡는 장면 (새 노드)
  stop_hope_leaving: {
    id: 'stop_hope_leaving',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"잠깐만요! 아직 끝나지 않았습니다!"

호프가 멈춰섰다. 뒤돌아보지 않았다.

[호프]: "...탐정님, 박사님. 저를... 놓아주시오."

[홈즈]: "당신은 무언가 숨기고 있소. 백작과의 관계, 20년이라는 시간..."

호프가 천천히 뒤돌아봤다. 그의 눈에는... 눈물이 고여있었다.

[호프]: "숨기고 있다고요? 그렇소... 저는 20년간... 그 사람을 찾아 헤맸소."

[호프]: "하지만 이제... 모든 게 끝났소. 제가 찾던 사람은... 이미..."

그가 말을 멈췄다. 더 이상 말하면 안 된다는 듯.

[홈즈]: "\"찾던 사람\"이 백작입니까?"

호프가 대답하지 않았다. 그저... 슬픈 눈으로 저택을 바라볼 뿐이었다.`,
    choices: [
      { text: '백작과의 관계를 밝혀낸다', nextNode: 'ask_hope_past_suspicious' },
      { text: '더 이상 묻지 않고 보내준다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 제퍼슨 호프에게 목격 여부를 묻는 장면 (강한 압박)
  ask_hope_witness: {
    id: 'ask_hope_witness',
    day: 1,
    timeOfDay: 'afternoon',
    text: `[홈즈]: "늦었다"... 무엇이 늦었습니까?

호프가 고개를 돌린다.

[호프]: ...아무것도 아니오.

[홈즈]: 당신은 평범한 마부가 아닙니다. 외투에 묻은 먼지, 손의 굳은살... 오래 여행한 사람입니다.

호프가 긴장한다.

[홈즈]: 그리고 마차 안에 낡은 사진틀이 보이는군요. 소중히 간직한 물건... 

홈즈가 호프의 눈을 똑바로 본다.

[홈즈]: 당신은 이 저택에 처음 온 게 아닙니다. 백작을 알고 있죠?

호프가 무너지듯 고개를 떨군다.

[호프]: ...그렇소. 오래... 아주 오래전부터... 찾아 헤맸소. 하지만 결국... 늦었소.`,
    choices: [
      { text: '누구를 찾았는지 밝혀낸다', nextNode: 'hope_breaks_down' },
      { text: '더 이상 묻지 않고 저택을 조사한다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 호프의 과거 - 처음엔 회피 (의심 단계)
  ask_hope_past_suspicious: {
    id: 'ask_hope_past_suspicious',
    day: 1,
    timeOfDay: 'afternoon',
    text: `[홈즈]: 백작과는 어떤 관계십니까?

호프가 경직된다.

[호프]: ...모른다고 했소. 그냥 지나가던 사람이오.

홈즈가 눈을 가늘게 뜬다.

[홈즈]: 그렇다면 왜 여기 계신 겁니까? 마차꾼이라면 배달을 마치고 떠나셔야죠.

호프가 입술을 깨문다.

[홈즈]: 하지만 당신은 하룻밤 넘게 이곳에서 대기하셨어요. 밤새 잠도 제대로 못 주무신 것 같은데... 누구를 기다리셨습니까?`,
    choices: [
      { text: '(홈즈를 제지한다) "홈즈, 너무 몰아붙이는 것 아닌가?"', nextNode: 'watson_defends_hope' },
      { text: '(침묵하며 호프의 반응을 관찰한다)', nextNode: 'observe_hope_reaction' },
      { text: '(홈즈를 돕는다) "우리는 진실을 알아야 합니다"', nextNode: 'watson_supports_holmes' }
    ]
  },

  // 🆕 왓슨이 호프를 변호
  watson_defends_hope: {
    id: 'watson_defends_hope',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"홈즈." 내가 조용히 말했다. "이 사람은 아직 용의자가 아니네. 증인일 가능성도 있지 않나?"

홈즈가 나를 보더니 잠시 침묵한다.

[홈즈]: ...맞는 말이야, 왓슨. 미안합니다, 호프 씨.

호프가 나를 본다. 그의 눈빛에 감사의 기색이 스쳤다.

[호프]: ...고맙소, 박사님.

하지만 여전히 그는 긴장해 있다.

[왓슨]: 호프 씨, 우리는 백작을 찾아야 합니다. 혹시 도움이 될 만한 정보라도...?`,
    choices: [
      { text: '백작에 대해 아는 게 있는지 묻는다', nextNode: 'hope_carefully_asks_about_count' },
      { text: '더 이상 압박하지 않고 저택으로 간다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 🆕 호프에게 조심스럽게 질문
  hope_carefully_asks_about_count: {
    id: 'hope_carefully_asks_about_count',
    day: 1,
    timeOfDay: 'afternoon',
    text: `[왓슨]: 백작에 대해... 무엇이라도 아시는 게 있다면...

호프가 한참을 망설이다가 천천히 입을 연다.

[호프]: ...오래전 일이오. 20년도 더 됐소.

그가 주먹을 쥔다.

[호프]: 그 사람은... 사기꾼이오. 많은 사람들을 파산시켰소. 저도... 그중 하나였소.

홈즈가 고개를 끄덕인다.

[홈즈]: 그래서 이곳에 오신 겁니까? 복수를 위해?

호프의 눈빛이 흔들린다.

[호프]: 복수...? 아니오... 저는 그저... 확인하고 싶었을 뿐이오. 그 사람이 정말... 살아있는지...`,
    choices: [
      { text: '왜 확인하고 싶었는지 묻는다', nextNode: 'hope_reveals_lucy_hint' },
      { text: '더 이상 묻지 않는다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 🆕 호프가 루시에 대한 힌트를 준다
  hope_reveals_lucy_hint: {
    id: 'hope_reveals_lucy_hint',
    day: 1,
    timeOfDay: 'afternoon',
    text: `[왓슨]: 왜... 확인하고 싶으셨습니까?

호프가 마차 안을 본다. 거기에는... 낡은 사진틀이 놓여있다.

[호프]: ...잃어버린 사람이 있소. 소중한... 매우 소중한 사람을...

그가 사진틀을 만진다.

[호프]: 그 사람이 죽기 전에... "그를 찾아달라"고 했소. "진실을 밝혀달라"고...

[호프]: 저는... 약속을 지키려 온 것뿐이오.

그의 목소리가 떨린다.

[왓슨]: (속으로) 이 사람은... 복수가 아니라 **애도**를 하러 온 거다.

홈즈가 나를 본다. 그의 표정이 부드러워졌다.`,
    choices: [
      { text: '사진 속 사람에 대해 묻는다', nextNode: 'ask_hope_past_revealed' },
      { text: '더 이상 묻지 않고 보내준다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 🆕 호프의 반응을 관찰
  observe_hope_reaction: {
    id: 'observe_hope_reaction',
    day: 1,
    timeOfDay: 'afternoon',
    text: `나는 침묵했다. 홈즈의 질문에 호프가 어떻게 반응하는지 관찰하기로 했다.

호프는... 대답하지 않았다.

하지만 그의 몸 많은 것을 말해주고 있었다.

떨리는 손. 계속 저택을 향하는 시선. 꽉 깨문 입술.

[왓슨]: (이 사람은... 뭔가 깊은 상처를 안고 있다.)

홈즈가 부드럽게 말한다.

[홈즈]: 호프 씨... 당신이 무엇을 겪었는지는 모르겠습니다만, 우리는 적이 아닙니다.

호프가 천천히 고개를 든다.

[호프]: ...당신들이 뭘 알아낸다 한들... 무엇이 달라질까요?

그의 목소리에 깊은 절망이 담겨있다.`,
    choices: [
      { text: '"진실을 아는 것만으로도 의미가 있습니다"', nextNode: 'watson_truth_matters' },
      { text: '"아무것도 달라지지 않을 수도 있죠"', nextNode: 'watson_honest_answer' },
      { text: '침묵한다', nextNode: 'hope_breaks_down' }
    ]
  },

  // 🆕 왓슨: 진실의 가치
  watson_truth_matters: {
    id: 'watson_truth_matters',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"진실을 아는 것만으로도 의미가 있습니다." 내가 말했다.

"누군가의 고통이 헛되지 않���다는 것... 기억되고 있다는 것... 그것만으로도 충분하지 않을까요?"

호프가 나를 오래 바라본다.

[호프]: ...박사님은... 좋은 분이시오.

그가 한숨을 쉰다.

[호프]: 하지만 20년이오. 20년간... 아무도 기억하지 않았소. 법도, 경찰도, 세상도...

[왓슨]: 이제는 우리가 기억하겠습니다.

호프의 눈가가 붉어진다.`,
    choices: [
      { text: '사진 속 사람에 대해 조심스럽게 묻는다', nextNode: 'ask_hope_past_revealed' },
      { text: '더 이상 묻지 않는다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 🆕 왓슨: 솔직한 대답
  watson_honest_answer: {
    id: 'watson_honest_answer',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"...아무것도 달라지지 않을 수도 있죠."

나는 솔직하게 말했다.

"진실을 밝혀낸다고 해서 돌아가신 분이 돌아오는 건 아닙니다. 과거가 바뀌는 것도 아니고요."

호프가 쓸쓸하게 웃는다.

[호프]: 역시... 그렇겠죠.

"하지만..."

내가 계속 말한다.

"그래도 알아야 한다고 생각합니다. 진실은... 알 권리가 있으니까요."

호프가 고개를 끄덕인다.

[호프]: ...맞는 말이오. 그래서... 저도 여기 온 겁니다.`,
    choices: [
      { text: '사진 속 사람에 대해 묻는다', nextNode: 'ask_hope_past_revealed' },
      { text: '더 이상 묻지 않는다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 🆕 호프가 감정이 무너진다
  hope_breaks_down: {
    id: 'hope_breaks_down',
    day: 1,
    timeOfDay: 'afternoon',
    text: `나는 아무 말도 하지 않았다.

때로는 침묵이 최선이니까.

긴 침묵이 흘렀다.

그리고... 호프가 천천히 무너지기 시작했다.

[호프]: ...루시. 그녀의 이름은... 루시였소.

그의 목소리가 떨렸다.

[호프]: 20년 전... 그녀는 병에 걸렸소. 하지만 치료비가... 재산이 모두 사라져서...

그가 주먹을 쥔다.

[호프]: 그 악마가... 모로 백작이... 모든 걸 빼앗아갔소!

그의 목소리가 분노로 변했다.

[호프]: 저는... 그저 지켜볼 수밖에 없었소! 그녀가... 그녀가 죽어가는 걸...!

홈즈가 조용히 고개를 끄덕인다.

[홈즈]: (속삭임) 이제 이해했어, 왓슨. 이 사람은... **증오**가 아니라 **죄책감**을 안고 있어.`,
    choices: [
      { text: '호프를 위로한다', nextNode: 'comfort_hope_breakdown' },
      { text: '더 자세히 묻는다', nextNode: 'ask_hope_past_revealed' }
    ]
  },

  // 🆕 호프 위로
  comfort_hope_breakdown: {
    id: 'comfort_hope_breakdown',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"당신 잘못이 아닙니다."

내가 그의 어깨에 손을 얹었다.

"당신은... 최선을 다하셨을 겁니다."

호프가 고개를 젓는다.

[호프]: 아니오... 저는... 무력했소. 군인이었지만... 사랑하는 사람 하나 지키지 못했소.

[왓슨]: ...

[호프]: 그래서 왔소. 20년 만에... 그 악마를 찾아서... 루시에게 사과하려고...

그가 저택을 본다.

[호프]: 하지만 이미... 늦었소. 그는 사라졌소. 저는... 또 늦었소.

홈즈가 말한다.

[홈즈]: 아직 끝나지 않았습니다. 우리가 함께 찾아봅시다.

호프가 놀란 표정으로 홈즈를 본다.`,
    choices: [
      { text: '함께 조사하자고 제안한다', nextNode: 'invite_hope_investigate' },
      { text: '저택으로 들어간다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 🆕 호프를 조사에 초대
  invite_hope_investigate: {
    id: 'invite_hope_investigate',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"함께 가시죠." 내가 말했다. "우리가 백작을 찾으면... 진실도 밝혀질 겁니다."

호프가 망설인다.

[호프]: ...고맙소. 하지만... 저는 여기서 기다리겠소.

[왓슨]: 왜요?

[호프]: 만약 그가... 돌아온다면 말이오. 제가 여기 있어야... 놓치지 않아야.

홈즈가 고개를 끄덕인다.

[홈즈]: 알겠습니다. 무슨 일이 생기면... 소리 지르십시오.

호프가 고개를 숙인다.

[호프]: ...감사하오. 탐정님, 박사님.

우리는 저택으로 향한다. 뒤돌아보니 호프는 여전히 마차 옆에 서서... 저택을 응시하고 있다.`,
    nextNode: 'main_entrance'
  },

  // 🆕 왓슨이 홈즈를 지지
  watson_supports_holmes: {
    id: 'watson_supports_holmes',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"우리는 진실을 알아야 합니다." 내가 홈즈 편을 들었다.

"백작이 실종되었고, 호프 씨는 현장 근처에 계셨습니다. 솔직히 말씀해주시는 게 좋을 것 같습니다."

호프가 우리 둘을 번갈아 본다.

[호프]: ...진실이라...

그가 씁쓸하게 웃는다.

[호프]: 알고 싶으십니까? 좋소. 말해드리죠.

그가 주먹을 쥔다.

[호프]: 맞소. 저는 그 악마를 찾아왔소. 20년간... 찾아 헤맸소!

그의 목소리가 떨린다.

[호프]: 하지만 보시오! 제가 도착했을 땐 이미... 너무 늦었소! 그는 사라졌고... 는 또... 또...!

그가 무너진다.

홈즈가 조용히 말한다.

[홈즈]: ...죄송합니다. 너무 몰아붙였군요.`,
    choices: [
      { text: '더 자세히 묻는다', nextNode: 'hope_breaks_down' },
      { text: '더 이상 묻지 않는다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 호프의 과거 완전 공개 (ask_hope_past_revealed)
  ask_hope_past_revealed: {
    id: 'ask_hope_past_revealed',
    day: 1,
    timeOfDay: 'afternoon',
    text: `"사진 속 사람... 누구십니까?"

호프가 한참을 침묵하더니, 천천히 마차 안에서 낡은 사진틀을 꺼냈다.

그 안에는... 젊은 여인의 흑백 사진이 있었다.

[호프]: ...루시. 루시 페리어.

그의 목소리가 떨렸다.

[호프]: 제 아내... 아니, 아내가 될 뻔했던 사람이오.

홈즈가 조용히 듣고 있다.

[호프]: 20년 전... 그녀는 모로 백작의 사기에 걸려들었소. 아버지가 투자한 돈... 전 재산을...

그가 주먹을 쥔다.

[호프]: 파산했소. 그리고 루시는... 병에 걸렸소. 치료비도... 약값도...

그의 눈에 눈물이 맺힌다.

[호프]: 저는... 아무것도 할 수 없었소. 그저... 그녀가 죽어가는 걸 지켜볼 수만...

[왓슨]: (가슴이 무너진다)

[호프]: 그녀가 죽기 전에... 마지막으로 말했소. "복수하지 말아요... 다만... 진실은 밝혀주세요"라고...

홈즈가 고개를 끄덕인다.

[홈즈]: 그래서... 20년간 백작을 찾아 헤매신 겁니까.

호프가 고개를 끄덕인다.

[호프]: ...이제야 찾았는데. 또 늦었소.`,
    choices: [
      { text: '함께 백작을 찾자고 제안한다', nextNode: 'invite_hope_investigate' },
      { text: '저택으로 들어간다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 침묵하며 기다리는 노드 (새로 추가)
  hope_reveals_more: {
    id: 'hope_reveals_more',
    day: 1,
    timeOfDay: 'afternoon',
    text: `나는 아무 말도 하지 않았다.

때로는 침묵이 가장 좋은 질문이니까.

긴 침묵이 흘렀다.

호프가... 천천히 입을 열었다.

[호프]: ...어젯밤, 비명을 들었소.

홈즈가 귀를 기울인다.

[호프]: 저택 안쪽에서... 남자의 비명이... 고통스럽고 공포에 질린...

그가 떤다.

[호프]: 저는 문을 두드렸소. 부르짖었소. 하지만 문은 모두 잠겨있었고...

[호프]: 비명은... 금방 멈췄소.

그가 주먹을 쥔다.

[호프]: 저는... 또 늦었소. 또...`,
    choices: [
      { text: '(공감) 위로한다', nextNode: 'comfort_hope_loss' },
      { text: '(의심) 왜 경찰에 알리지 않았는지 묻는다', nextNode: 'ask_hope_why_no_police' },
      { text: '저택으로 들어간다', nextNode: 'main_entrance_after_hope' }
    ]
  },

  // 마차 주변 조사
  search_carriage: {
    id: 'search_carriage',
    day: 1,
    timeOfDay: 'afternoon',
    text: `마차 주변을 살펴본다. 바퀴 자국이 깊게 파여있다. 적어도 하루는 이곳에 있었던 것 같다.

마차 안을 들여다보니 몇 가지 물건이 보인다. 담요, 물통, 그리고... 낡은 사진틀.

[홈즈]: 이 사람은 오랫동안 기다렸네. 무언가를... 아니, 누군가를.`,
    choices: [
      { text: '마차꾼에게 말을 건다', nextNode: 'ask_hope_name' },
      { text: '마차를 두고 저택으로 간다', nextNode: 'main_entrance' }
    ]
  }
};