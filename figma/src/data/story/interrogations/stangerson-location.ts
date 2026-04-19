/**
 * 스탠거슨 위치/지하실 관련
 * 끌려간 방향, 지하실, 침입자 정보 등
 */

import { StoryNode } from '../../../types/story';

export const stangersonLocationNodes: Record<string, StoryNode> = {
  // 끌려간 방향
  stangerson_direction: {
    id: 'stangerson_direction',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"끌려가는 소리가 어느 방향에서 들렸습니까?"

스탠거슨이 생각에 잠깁니다.

"복도 쪽이었습니다. 아래로, 계단을 내려가는 소리 같았어요."

홈즈가 메모합니다. "아래로? 1층? 아니면 더 아래로?"

"잘 모르겠습니다. 하지만 소리가 점점 멀어졌고, 마지막에는 문 닫히는 소리가 희미하게 들렸어요."

"문 닫히는 소리라..." 당신이 중얼거립니다.

홈즈가 날카롭게 묻습니다. "이 저택에 지하실이나 지하 공간이 있습니까?"

스탠거슨이 얼어붙습니다. 그의 반응이 모든 것을 말해줍니다.`,
    choices: [
      { text: '지하실에 대해 자세히 묻는다', nextNode: 'stangerson_basement_question' },
      { text: '왜 그 방향을 확인하지 않았는지 따진다', nextNode: 'stangerson_didnt_check' },
      { text: '지금 당장 그곳으로 가자고 한다', nextNode: 'stangerson_go_basement_now' },
      { text: '일단 다른 질문을 한다', nextNode: 'ask_stangerson' }
    ]
  },

  // 침입자의 외모
  stangerson_intruder_description: {
    id: 'stangerson_intruder_description',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "그 남자를 직접 보셨습니까? 외모나 특징을 기억하시나요?"

스탠거슨: "아니요, 문이 잠겨있어서 보지 못했습니다. 목소리만 들었죠."

"목소리의 특징은?"

"낮고 거칠었습니다. 하지만 침착했어요. 화가 난 것 같으면서도 통제되어 있었달까요."

홈즈가 관심을 보입니다. "흥미롭군. 감정적인 복수가 아니라 계획된 행동이라는 뜻이야."

"그리고..." 스태거슨이 주저합니다. "다음 날 아침 서재를 확인했을 때, 발자국이 있었습니다."

"발자국?" 당신이 묻습니다.

"큰 발자국이었어요. 부츠 자국이었고, 굉장히 무거운 사람 같았습니다. 그리고 복도에 진흙이 묻어있었죠."`,
    choices: [
      { text: '진흙 자국이 어디로 이어졌는지 묻는다', nextNode: 'stangerson_muddy_trail' },
      { text: '서재에 다른 흔적은 없었는지 확인한다', nextNode: 'stangerson_study_clues' },
      { text: '일단 다른 질문을 한다', nextNode: 'ask_stangerson' }
    ]
  },

  // 지하실 질문
  stangerson_basement_question: {
    id: 'stangerson_basement_question',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "이 저택에 지하실이 있습니까? 정확히 대답해주십시오."

스탠거슨이 고개를 끄덕입니다.

"있습니다. 부엌 아래에요. 오래된 와인 저장소였지만 지금은 백작님이 다른 용도로 사용하십니다."

"다른 용도?"

"연구실이라고 하셨죠. 신비주의 연구를요. 저는 들어가본 적이 없습니다. 백작님이 금지하셨으니까요."

홈즈의 눈빛이 빛납니다. "그렇다면 백작님이 지금 그곳에 있을 가능성이 있습니까?"

스탠거슨이 창백해집니다. "만약 그 남자가 알고 있다면요. 만약 그가 백작님의 과거를 안다면, 그곳을 선택했을 겁니다."

"왜죠?"

"그곳은 백작님의 속죄의 방이니까요."`,
    choices: [
      { text: '속죄의 방이 무슨 뜻인지 묻는다', nextNode: 'stangerson_atonement_room' },
      { text: '지금 당장 그곳으로 가자고 한다', nextNode: 'stangerson_go_basement_now' },
      { text: '그 남자가 어떻게 그곳을 알았을지 묻는다', nextNode: 'stangerson_how_knew_basement' },
      { text: '일단 다른 질문을 한다', nextNode: 'ask_stangerson' }
    ]
  },

  // 속죄의 방
  stangerson_atonement_room: {
    id: 'stangerson_atonement_room',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"속죄의 방이라니, 무슨 뜻입니까?"

스탠거슨이 떨리는 목소리로 말합니다.

"백작님은 그곳에 제단을 만들어두셨습니다. 촛불과 기이한 기호들, 그리고 사진 한 장이 놓여있었죠."

"사진?"

"젊은 여자의 사진이었습니다. 백작님은 매주 그곳에 내려가서 촛불을 켜고 중얼거리셨어요. '용서를 구한다'고요."

홈즈가 당신을 봅니다. "왓슨, 이것은 단순한 납치가 아닙니다."

"그 사진 속 여자가 루시입니까?" 당신이 묻습니다.

스탠거슨이 고개를 끄덕입니다. "20년간 백작님은 그녀의 환영에 시달렸습니다. 그리고 이제 그녀의 약혼자가 복수하러 왔죠."`,
    choices: [
      { text: '지금 당장 지하실로 향한다', nextNode: 'stangerson_go_basement_now' },
      { text: '왜 더 일찍 말하지 않았는지 따진다', nextNode: 'stangerson_why_hide_this' },
      { text: '백작이 아직 살아있을지 묻는다', nextNode: 'stangerson_count_alive' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 진흙 자국의 행방
  stangerson_muddy_trail: {
    id: 'stangerson_muddy_trail',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"진흙 자국이 어디로 이어졌습니까?"

스탠거슨이 망설입니다.

"복도를 따라 계단 쪽으로요. 그리고 1층 홀을 지나 부엌 방향으로 이어졌습니다."

홈즈가 관심을 보입니다. "부엌이라... 그곳에서 끝났습니까?"

"네, 하지만 제가 확인했을 때는 진흙 자국이 부엌 입구에서 끝나있었어요. 더 이상 따라갈 수 없었습니다."

"끝나있었다?" 홈즈가 의심스러운 표정을 짓습니다. "아니면 누군가 닦아낸 겁니까?"

스탠거슨이 얼어붙습니다. "저는 닦지 않았습니다! 정말입니다!"

"그렇다면 범인이 흔적을 지운 겁니다." 홈즈가 결론을 내립니다. "계획적이고 치밀한 사람이군요."`,
    choices: [
      { text: '지금 부엌으로 가서 확인한다', nextNode: 'investigate_kitchen' },
      { text: '다른 흔적은 없었는지 확인한다', nextNode: 'stangerson_study_clues' },
      { text: '범인이 아직 저택에 있을 가능성을 묻는다', nextNode: 'stangerson_intruder_still_here' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 서재의 다른 단서들
  stangerson_study_clues: {
    id: 'stangerson_study_clues',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈: "서재에 다른 흔적은 없었습니까? 혈흔, 찢어진 옷, 싸움의 흔적?"

스탠거슨: "혈흔은 없었습니다. 하지만 백작님의 책상 서랍이 열려있고, 어떤 서류들이 사라진 것 같았어요."

"어떤 서류입니까?"

"잘 모르겠습니다. 백작님의 개인 문서들이었죠. 아마도 오래된 편지나 계약서 같은 것들요."`,
    choices: [
      { text: '백작의 개인 서류가 어디 있는지 묻는다', nextNode: 'stangerson_documents_location' },
      { text: '지하실로 가서 직접 확인한다', nextNode: 'stangerson_go_basement_now' },
      { text: '범인의 목적을 다시 추론한다', nextNode: 'stangerson_intruder_motive' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 범인이 아직 저택에 있는가
  stangerson_intruder_still_here: {
    id: 'stangerson_intruder_still_here',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'watson',
    text: `"그 남자가 아직 이 저택 안에 있을 가능성은 없습니까?"

스탠거슨이 두려움에 떨립니다.

"저도 생각해봤습니다. 3일 동안 저택을 나가는 사람을 보지 못했어요."

홈즈가 날카롭게 묻습니다. "3일 동안? 그렇다면 범인은 여전히 이 건물 안에 있다는 뜻입니까?"

"모르겠습니다! 밤에 나갔을 수도 있고, 아니면..."

"아니면?"

스탠거슨이 시선을 떨구며 말합니다. "아니면 아직 저택 어딘가에 있을 수도 있습니다. 백작님과 함께요."

침묵이 흐릅니다. 만약 그게 사실이라면, 백작은 3일간 어딘가에 갇혀있던 것입니다.`,
    choices: [
      { text: '끌려간 방향을 다시 묻는다', nextNode: 'stangerson_direction' },
      { text: '왜 저택 구석구석을 찾아보지 않았는지 따진다', nextNode: 'stangerson_didnt_check' },
      { text: '경찰을 부르자고 제안한다', nextNode: 'suggest_police' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 왜 확인하지 않았는가
  stangerson_didnt_check: {
    id: 'stangerson_didnt_check',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'watson',
    speaker: 'watson',
    text: `"3일이나 지났는데 왜 저택 구석구석을 찾아보지 않으셨습니까?"

스탠거슨이 고개를 숙입니다.

"두려웠습니다. 그리고 혹시 찾아다니다가 저도 당할까봐요."

"하지만 주인이 위험에 처했을 수도 있는데요!"

"알고 있습니다!" 스태거슨이 소리칩니다. "하지만 저는 겁쟁이입니다! 20년간 도망치며 살아온 겁쟁이란 말입니다!"

그가 무너집니다. "그리고 솔직히 말하자면, 일부는 백작님이 당하기를 바랐을지도 모릅니다. 제가 용기가 없어서 하지 못한 일을요."

홈즈가 당신을 봅니다. 이 남자는 피해자인가, 공범인가?`,
    choices: [
      { text: '끌려간 방향을 다시 묻는다', nextNode: 'stangerson_direction' },
      { text: '관찰한 사실들을 나열하며 압박한다', nextNode: 'stangerson_murder_motive' },
      { text: '더 이상 시간을 낭비할 수 없다', nextNode: 'go_basement_alone' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 지금 당장 지하실로
  stangerson_go_basement_now: {
    id: 'stangerson_go_basement_now',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈가 일어서려다가 멈춘다. "잠깐, 왓슨."

"왜 그래, 홈즈?"

"지하실로 가는 건 좋은데... 열쇠가 있나?" 홈즈가 스태거슨을 본다.

스탠거슨이 고개를 젓는다. "지하실 열쇠는 백작님이 보관하고 계셨습니다. 아마 서재 금고나... 침실 어딘가에..."

홈즈가 턱을 쓸어내린다. "무작정 가서는 안 돼. 열쇠를 먼저 찾고, 다른 단서들도 충분히 수집해야 해. 준비 없이 가면 위험할 뿐이야."

"하지만 백작이...!"

"백작님은 3일째 그곳에 계셔. 몇 시간 더 조사한다고 크게 달라지지 않아. 오히려 우리가 준비 없이 가면 우리까지 위험해질 수 있어." 

홈즈가 단호하게 말한다. "먼저 단서를 모으자. 그게 백작님을 구하는 최선의 방법이야."`,
    choices: [
      { text: '홈즈 말이 맞다. 먼저 조사를 계속한다', nextNode: 'study_with_stangerson' },
      { text: '지하실 열쇠를 찾으러 금고를 조사한다', nextNode: 'safe' },
      { text: '2층 침실에서 열쇠를 찾아본다', nextNode: 'upstairs' }
    ]
  },

  // 백작의 서류 위치
  stangerson_documents_location: {
    id: 'stangerson_documents_location',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"백작님의 개인 서류는 보통 어디에 보관하셨습니까?"

스탠거슨: "대부분은 서재 금고에 있습니다. 하지만 정말 중요한 것들은... 침실에 따로 보관하셨죠."

"침실에요?"

"네, 2층 침실 서랍장입니다. 특별한 자물쇠가 달린 서랍이에요. 백작님만 열쇠를 갖고 계셨습니다."

홈즈가 말합니다. "그 열쇠를 찾으면 중요한 단서를 발견할 수 있을지도 모르겠군."`,
    choices: [
      { text: '2층 침실을 조사하러 간다', nextNode: 'upstairs' },
      { text: '지하실을 먼저 확인한다', nextNode: 'stangerson_go_basement_now' },
      { text: '범인의 목적을 다시 추론한다', nextNode: 'stangerson_intruder_motive' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 범인의 목적 추론
  stangerson_intruder_motive: {
    id: 'stangerson_intruder_motive',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'holmes',
    text: `홈즈가 생각에 잠깁니다.

"왓슨, 생각해보게. 범인은 백작을 납치고, 서재를 뒤지고, 서류를 가져갔어."

"복수가 목적이라면 그 자리에서 죽였을 텐데요."

"정확해. 그리고 서류를 가져간 건... 증거를 찾고 있다는 뜻이야."

스탠거슨이 긴장합니다. "무슨 증거요?"

홈즈가 날카롭게 봅니다. "당신도 알고 있을 거요, 스태거슨씨. 1861년 유타에서 있었던 일에 대한 증거."

스탠거슨이 창백해집니다.`,
    choices: [
      { text: '지하실로 가서 백작을 찾는다', nextNode: 'stangerson_go_basement_now' },
      { text: '1861년 사건에 대해 더 캐묻는다', nextNode: 'stangerson_about_1861' },
      { text: '범인이 증거를 찾았는지 묻는다', nextNode: 'stangerson_evidence_found' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 증거를 찾았는가
  stangerson_evidence_found: {
    id: 'stangerson_evidence_found',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'watson',
    text: `"범인이 원하는 증거를 찾았을까요?"

스탠거슨이 고개를 젓습니다. "모르겠습니다. 백작님은 매우 조심스러운 분이셨어요. 중요한 것들은 여러 곳에 나눠서 숨겼죠."

"여러 곳이라니?"

"금고, 서랍, 그리고..." 스태거슨이 망설입니다. "지하실에도 뭔가 숨겨둔 게 있을 겁니다."

홈즈: "그래서 범인이 백작을 지하실로 데려간 거군. 숨긴 곳을 말하게 하려고."`,
    choices: [
      { text: '즉시 지하실로 향한다', nextNode: 'stangerson_go_basement_now' },
      { text: '무엇을 숨겼는지 더 자세히 묻는다', nextNode: 'stangerson_hidden_things' },
      { text: '경찰을 부른다', nextNode: 'suggest_police' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 무엇을 숨겼는가
  stangerson_hidden_things: {
    id: 'stangerson_hidden_things',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'stangerson',
    text: `"백작이 무엇을 숨겼습니까?"

스탠거슨이 주저합니다. "잘은 모릅니다. 하지만 가끔 밤에 지하실로 내려가시는 걸 봤어요."

"무엇을 하러요?"

"오래된 상자를 확인하시는 것 같았습니다. 한번은 1861년이라고 적힌 장부를 보신 적이 있어요."

홈즈가 눈을 빛냅니다. "그 장부! 그게 결정적 증거일 거야. 유타에서의 범죄를 기록한 장부!"`,
    choices: [
      { text: '그 장부를 찾아야 한다', nextNode: 'stangerson_go_basement_now' },
      { text: '범인도 그 장부를 찾고 있는지 묻는다', nextNode: 'stangerson_intruder_motive' },
      { text: '일단 서재를 조사한다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 경찰 제안
  suggest_police: {
    id: 'suggest_police',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'watson',
    text: `"홈즈, 이건 위험합니다. 레스트레이드를 부르는 게 낫지 않을까요?"

홈즈가 고개를 젓습니다. "시간이 없어, 왓슨. 경찰을 부르는 동안 백작은 죽을 수도 있어."

"하지만..."

"자네는 군의관이었잖아. 권총도 갖고 있고." 홈즈가 미소 짓습니다. "우리 둘이면 충분해."

스탠거슨이 걱정스럽게 말합니다. "하지만 그 남자는 위험합니다. 20년을 기다린 사람이에요."

홈즈: "바로 그래서 서둘러야 해요."`,
    choices: [
      { text: '홈즈와 함께 지하실로 향한다', nextNode: 'stangerson_go_basement_now' },
      { text: '그래도 신중하게 생각해본다', nextNode: 'study_with_stangerson' }
    ]
  },

  // 혼자 가기
  go_basement_alone: {
    id: 'go_basement_alone',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    character: 'watson',
    text: `"더 이상 시간을 낭비할 수 없습니다."

당신이 권총을 꺼내며 일어섭니다.

홈즈가 당신을 잡습니다. "왓슨, 혼자 가면 안 돼."

"백작이 죽어가고 있을 수도 있어요!"

"바로 그래서야. 자네 혼자서는 위험해." 홈즈가 단호하게 말합니다. "그리고 지하실 열쇠도 없잖아. 무작정 가서 문 앞에서 돌아서는 건 아무 의미 없어."

스탠거슨이 떨리는 목소리로 말합니다. "지, 지하실 열쇠는 백작님이 보관하고 계셨어요. 금고나 침실에 있을 겁니다."

홈즈가 당신의 어깨를 잡습니다. "왓슨, 침착하게. 먼저 열쇠를 찾고, 증거를 모으자. 그게 백작을 구하는 최선의 방법이야."`,
    choices: [
      { text: '홈즈 말이 맞다. 금고를 조사한다', nextNode: 'safe' },
      { text: '2층 침실을 조사한다', nextNode: 'upstairs' },
      { text: '스탠거슨에게 더 질문한다', nextNode: 'study_with_stangerson' }
    ]
  }
};