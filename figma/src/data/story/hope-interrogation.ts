import { StoryNode } from '../../types/story';

/**
 * 🔥 제퍼슨 호프 심화 서사
 * 여관에서 호프를 심문하고 그의 20년 여정을 듣는 노드
 */

export const hopeInterrogation: Record<string, StoryNode> = {
  
  // ========== 여관 입구 ==========
  
  inn_entrance: {
    id: 'inn_entrance',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    speaker: 'watson',
    text: `여관 "그린 라이온"에 도착했다.

낡지만 깨끗한 건물이다. 문 위에는 초록색 사자 간판이 걸려있다.

안으로 들어가자 온화한 얼굴의 중년 남자가 당신을 맞이한다.

[여관 주인]: "어서 오십시오, 손님들. 그린 라이온 여관입니다."

홈즈가 모자를 벗는다.

[셜록 홈즈]: "셜록 홈즈입니다. 이쪽은 왓슨 박사님이고요."

[여관 주인]: "아, 탐정님들이시군요! 저는 제임스 매튜스입니다."

[왓슨]: "모로 백작의 실종 사건을 조사하고 있습니다. 며칠 전 이 여관에 투숙한 손님에 대해 여쭤보고 싶은데..."`,
    choices: [
      { text: '💬 "드레버에 대해 묻는다"', nextNode: 'inn_ask_drebber' },
      { text: '🔍 "마차꾼에 대해 묻는다"', nextNode: 'inn_ask_coachman' },
      { text: '🚪 "다른 투숙객이 있는지 묻는다"', nextNode: 'inn_other_guests' }
    ]
  },

  inn_ask_coachman: {
    id: 'inn_ask_coachman',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    speaker: 'watson',
    text: `"마차꾼... 제퍼슨 호프라는 사람을 아십니까?"

여관 주인이 고개를 끄덕인다.

[제임스 매튜스]: "아, 호프 씨요? 물론이죠."

[셜록 홈즈]: "그가 여기 투숙하고 있습니까?"

[제임스 매튜스]: "네. 3일 전부터요. 2층 끝방에 묵고 계십니다."

홈즈와 당신이 시선을 교환한다.

[왓슨]: "어떤 사람입니까?"

[제임스 매튜스]: "조용하고... 슬퍼 보이는 분이에요. 별로 말이 없으시고... 밤마다 창밖만 바라보시더라고요."

[제임스 매튜스]: "그리고... 가끔 누군가의 이름을 부르시는 것 같았어요. '루시'라고..."`,
    choices: [
      { text: '💬 "지금 방에 있습니까?"', nextNode: 'inn_hope_location' },
      { text: '🔍 "이상한 행동을 본 적 있습니까?"', nextNode: 'inn_hope_behavior' },
      { text: '🔥 "그를 만나고 싶습니다"', nextNode: 'inn_meet_hope' }
    ]
  },

  inn_hope_location: {
    id: 'inn_hope_location',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    text: `"호프가 지금 방에 있습니까?"

여관 주인이 위층을 본다.

[제임스 매튜스]: "네... 아마 계실 겁니다. 저녁 식사도 거르시고..."

[셜록 홈즈]: "식사를 거른다고요?"

[제임스 매튜스]: "네. 3일간... 거의 안 드셨어요. 물만 드시고..."

[제임스 매튜스]: "걱정이 되어서 여쭤봤더니... '식욕이 없다'고만 하시더라고요."

홈즈가 메모한다.

[셜록 홈즈]: "무언가에 골몰하고 있군요..."`,
    choices: [
      { text: '💬 "다른 이상한 점은 없었습니까?"', nextNode: 'inn_hope_behavior' },
      { text: '🔥 "지금 만나러 가겠습니다"', nextNode: 'inn_meet_hope' },
      { text: '🔍 "백작 저택에 갔다 온 적 있습니까?"', nextNode: 'inn_hope_mansion_visit' }
    ]
  },

  inn_hope_behavior: {
    id: 'inn_hope_behavior',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    text: `"호프의 이상한 행동을 본 적 있습니까?"

여관 주인이 잠시 생각한다.

[제임스 매튜스]: "이상하다기보다는... 슬퍼 보였어요."

[제임스 매튜스]: "첫날 밤... 방에서 흐느끼는 소리가 들렸습니다."

[왓슨]: "흐느끼는 소리?"

[제임스 매튜스]: "네... '루시... 미안해... 너무 늦었어...' 하고..."

그가 눈을 내리icana.

[제임스 매튜스]: "그리고 어제 밤... 저택 방향을 향해 오래 서 계셨어요. 창밖에서..."

[제임스 매튜스]: "손에 무언가... 은빛으로 빛나는 걸 쥐고 계셨는데..."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "로켓입니까?"

[제임스 매튜스]: "...아마도요."`,
    choices: [
      { text: '💬 "백작 저택에 갔다 온 적 있습니까?"', nextNode: 'inn_hope_mansion_visit' },
      { text: '🔥 "지금 만나러 가겠습니다"', nextNode: 'inn_meet_hope' },
      { text: '🔍 "드레버와 접촉한 적 있습니까?"', nextNode: 'inn_hope_drebber_contact' }
    ]
  },

  inn_hope_mansion_visit: {
    id: 'inn_hope_mansion_visit',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    text: `"호프가 백작 저택에 갔다 온 적 있습니까?"

여관 주인이 고개를 끄덕인다.

[제임스 매튜스]: "네. 어제 저녁... 마차를 끌고 나가셨어요."

[셜록 홈즈]: "몇 시경입니까?"

[제임스 매튜스]: "7시쯤이었던 것 같아요. 그리고... 밤 10시쯤 돌아오셨죠."

[제임스 매튜스]: "돌아오셨을 때... 얼굴이 창백하셨어요. 그리고 손이 떨리고..."

[왓슨]: "무슨 일이 있었던 겁니까?"

여관 주인이 한숨을 쉰다.

[제임스 매튜스]: "모르겠어요... 하지만 뭔가... 큰일을 저지르신 것 같았어요."

[제임스 매튜스]: "방으로 올라가시면서... '이제... 끝이다'라고 중얼거리시더라고요."`,
    choices: [
      { text: '💬 "오늘은 어디 계십니까?"', nextNode: 'inn_hope_today' },
      { text: '🔥 "지금 만나러 가겠습니다"', nextNode: 'inn_meet_hope' },
      { text: '🔍 "무언가를 가져온 것 같습니까?"', nextNode: 'inn_hope_brought_something' }
    ]
  },

  inn_meet_hope: {
    id: 'inn_meet_hope',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"호프를 만나고 싶습니다. 안내해주시겠습니까?"

여관 주인이 망설인다.

[제임스 매튜스]: "...손님이 만나고 싶어하실지 모르겠습니다만..."

[셜록 홈즈]: "사건 조사를 위해 필요합니다."

[제임스 매튜스]: "알겠습니다. 2층으로 오시죠."

계단을 올라간다.

복도 끝에 낡은 문이 보인다.

여관 주인이 문을 두드린다.

[제임스 매튜스]: "호프 씨? 손님이 오셨습니다."

잠시 침묵.

그리고... 문이 천천히 열린다.`,
    choices: [
      { text: '🚪 [방 안으로 들어간다]', nextNode: 'hope_room_enter' }
    ]
  },

  hope_room_enter: {
    id: 'hope_room_enter',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    speaker: 'watson',
    text: `방 안으로 들어간다.

좁고 어두운 방이다. 창문 하나, 침대 하나, 낡은 책상 하나... 벽에는 곰팡이 냄새가 배어있다.

제퍼슨 호프가 창가에 우두커니 서 있다. 등을 보이고.

그의 손에는... 은빛 로켓이 쥐어져 있다. 손가락이 떨리고 있다.

[제퍼슨 호프]: (돌아보지 않고, 낮고 지친 목소리로) "...탐정님들."

그가 천천히 돌아선다. 깊이 패인 눈, 수염으로 덮인 얼굴, 20년의 세월이 새겨진 주름.

[제퍼슨 호프]: (쓸쓸하게 미소 지으며) "오실 줄 알았습니다. 셜록 홈즈... 유명한 탐정이시죠."

홈즈가 조용히 문을 닫는다. 딸깍, 자물쇠 소리가 울린다.

[셜록 홈즈]: (날카로운 시선으로) "제퍼슨 호프. 당신에게 몇 가지 물어볼 게 있습니다."

호프가 로켓을 내려다본다. 그의 눈에 눈물이 고인다.

[제퍼슨 호프]: (떨리는 목소리로) "...루시에 대해서겠죠. 제가... 사랑했던 여인."`,
    choices: [
      { text: '💬 "루시와 무슨 사이였습니까?"', nextNode: 'hope_lucy_relationship' },
      { text: '🔍 "어제 밤 백작 저택에서 무슨 일이?"', nextNode: 'hope_last_night' },
      { text: '🔥 "20년간 무엇을 했습니까?"', nextNode: 'hope_twenty_years' }
    ]
  },

  hope_lucy_relationship: {
    id: 'hope_lucy_relationship',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    speaker: 'watson',
    text: `"루시와... 무슨 사이였습니까?"

호프가 떨리는 손으로 로켓을 펼친다. 낡은 경첩이 삐걱거린다.

안에는 젊은 여성의 초상화가 있다. 루시다. 미소 짓고 있는 그녀의 모습.

[제퍼슨 호프]: (목이 메어) "...약혼자였습니다. 제 인생의 전부였죠."

[왓슨]: (조심스럽게) "약혼자라고요?"

[제퍼슨 호프]: (눈을 감으며, 20년 전을 떠올리듯) "네. 우리는... 사랑했습니다. 진심으로. 이 세상 어떤 것도 우리를 갈라놓을 수 없다고 믿었죠."

그가 눈을 감는다. 눈가에 주름이 깊게 파인다.

[제퍼슨 호프]: (회상하듯) "1861년... 유타 사막에서 만났죠. 루시는 아름다웠어요. 금빛 머리카락, 맑은 눈... 하지만 외모만이 아니었습니다. 그녀의 영혼이... 너무나 순수했어요."

[제퍼슨 호프]: (미소 지으며) "정의롭고, 용감하고, 선했습니다. 약자를 돌보고, 진실을 말하고... 그런 사람이었죠."

[셜록 홈즈]: (조용히) "하지만... 헤어졌습니까?"

호프의 주먹이 떨린다. 로켓을 쥔 손이 하얗게 질린다.

[제퍼슨 호프]: (분노를 억누르며, 이를 갈며) "헤어진 게 아닙니다... **빼앗겼습니다**. 짐승들에게."`,
    choices: [
      { text: '💬 "누가 빼앗았습니까?"', nextNode: 'hope_who_took_lucy' },
      { text: '🔍 "그 후 어떻게 되었습니까?"', nextNode: 'hope_after_lucy' },
      { text: '🌹 "사랑하셨군요"', nextNode: 'hope_loved_lucy' }
    ]
  },

  hope_who_took_lucy: {
    id: 'hope_who_took_lucy',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"누가... 누가 루시를 빼앗았습니까?"

호프의 얼굴이 일그러진다. 분노와 슬픔이 뒤섞인 표정.

[제퍼슨 호프]: (침을 삼키며, 증오가 담긴 목소리로) "모로 백작... 그리고 그의 개들, 드레버와 스탠거슨."

[제퍼슨 호프]: (주먹을 쥐며) "백작은 '영원한 구원 교단'이라는 신비주의 모임을 만들었습니다. 거짓된 약속으로 루시의 아버지 페리어 영감을 속였죠."

[제퍼슨 호프]: (목소리가 떨리며) "페리어 영감은 백작의 투자 사기로 파산했고... 루시는 병에 걸렸지만 치료받을 돈이 없었습니다."

그가 분노에 떤다. 온몸이 경련하듯 떨린다.

[제퍼슨 호프]: (격하게) "백작은 루시가 사기를 고발하지 못하도록... 미국의 모르몬교도들과 더러운 거래를 했습니다. '순종하는 새 신부'를 원한다고!"

[제퍼슨 호프]: (눈물을 흘리며) "루시를 넘겨준 겁니다. 강제 결혼을 시키기 위해... 드레버 그 짐승에게..."

[왓슨]: (경악하며) "..."

[제퍼슨 호프]: (손으로 얼굴을 가리며) "저는... 루시를 구하려 했습니다. 말을 타고, 밤낮으로 달렸어요. 하지만... 너무 늦었어요."

그가 흐느낀다. 20년간 쌓인 슬픔이 터져나온다.

[제퍼슨 호프]: (울먹이며) "루시는... 결혼 한 달 만에 병으로 죽었습니다. 슬픔과 절망으로... 제 이름을 부르며..."`,
    choices: [
      { text: '💬 "그래서 복수를 결심했습니까?"', nextNode: 'hope_revenge_decision' },
      { text: '🔍 "20년간 무엇을 했습니까?"', nextNode: 'hope_twenty_years' },
      { text: '🌹 [침묵으로 애도한다]', nextNode: 'hope_moment_silence' }
    ]
  },

  hope_revenge_decision: {
    id: 'hope_revenge_decision',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"그래서... 복수를 결심했습니까?"

호프가 천천히, 무겁게 고개를 끄덕인다.

[제퍼슨 호프]: (무릎을 꿇으며) "네... 루시의 무덤 앞에서 맹세했습니다. 그녀의 차가운 묘비에 손을 얹고..."

[제퍼슨 호프]: (주먹을 쥐며) "'당신을 죽게 만든 자들을... 반드시 심판하겠다. 하늘이 버려도, 신이 외면해도, 내가 직접 심판하겠다'고."

홈즈가 날카롭게 묻는다. 시험하듯.

[셜록 홈즈]: "심판... 복수입니까, 정의입니까?"

호프가 잠시 멈춘다. 길고 무거운 침묵.

[제퍼슨 호프]: (고개를 숙이며) "...처음에는 복수였습니다. 타오르는 분노와 증오로 가득했죠. 그들을 죽이는 꿈만 꿨습니다."

[제퍼슨 호프]: (떨리는 목소리로) "하지만 시간이 지나면서... 혼란스러웠습니다. 복수가 옳은 걸까? 이게 정의일까?"

[제퍼슨 호프]: (로켓을 보며, 눈물을 흘리며) "루시라면... 복수를 원했을까요? 아니면 용서를...? 그녀는 선한 사람이었으니까."

그가 로켓을 쥔 손이 떨린다.

[제퍼슨 호프]: (쓰게 웃으며) "저는... 모르겠습니다. 하지만 멈출 수 없었어요. 20년을 기다렸으니까... 루시 없이 20년을 견뎠으니까..."`,
    choices: [
      { text: '💬 "20년간 어떻게 추적했습니까?"', nextNode: 'hope_twenty_years_tracking' },
      { text: '🔍 "어제 밤 백작에게 무엇을 했습니까?"', nextNode: 'hope_last_night' },
      { text: '🌹 "루시는 복수를 원하지 않았을 겁니다"', nextNode: 'hope_lucy_wish' }
    ]
  },

  hope_twenty_years: {
    id: 'hope_twenty_years',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"20년간... 무엇을 했습니까?"

호프가 창밖을 본다.

[제퍼슨 호프]: "추적했습니다. 백작과 그의 공범들을..."

[제퍼슨 호프]: "드레버는 쉽게 찾았어요. 런던에서 도박으로 빚더미에 앉아있더군요."

[제퍼슨 호프]: "스탠거슨은... 백작의 집사로 있었습니다. 죄수처럼..."

[왓슨]: "백작은 어떻게 찾았습니까?"

[제퍼슨 호프]: "10년이 걸렸습니다. 백작은 이름을 바꾸고 숨어살았으니까..."

[제퍼슨 호프]: "하지만 결국... 찾아냈습니다. 이 저택에서..."

홈즈가 묻는다.

[셜록 홈즈]: "그동안 무엇을 했습니까? 단지 추적만?"

호프가 고개를 젓는다.

[제퍼슨 호프]: "...계획했습니다. 어떻게 심판할지..."`,
    choices: [
      { text: '💬 "어떤 계획이었습니까?"', nextNode: 'hope_plan_details' },
      { text: '🔍 "왜 이제야 행동했습니까?"', nextNode: 'hope_why_now' },
      { text: '🔥 "독을 선택한 이유는?"', nextNode: 'hope_why_poison' }
    ]
  },

  hope_twenty_years_tracking: {
    id: 'hope_twenty_years_tracking',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"20년간 어떻게 추적했습니까?"

호프가 답한다.

[제퍼슨 호프]: "처음엔... 막막했습니다. 단서가 없었으니까..."

[제퍼슨 호프]: "하지만 군대에서 배운 기술이 도움이 됐죠. 정찰, 추적, 잠복..."

[제퍼슨 호프]: "드레버를 먼저 찾았습니다. 그를 미행하면서... 백작의 위치를 알아냈죠."

[셜록 홈즈]: "10년이나 걸렸다고 했습니까?"

[제퍼슨 호프]: "네... 백작은 조심스러웠으니까요. 이름도 바꾸고, 자주 이사하고..."

[제퍼슨 호프]: "하지만 한 가지 실수를 했습니다."

[왓슨]: "무엇입니까?"

[제퍼슨 호프]: "드레버와 스탠거슨을 계속 협박한 것... 그 연결고리를 따라가니 백작을 찾을 수 있었어요."`,
    choices: [
      { text: '💬 "그 후에는?"', nextNode: 'hope_after_finding' },
      { text: '🔍 "왜 바로 행동하지 않았습니까?"', nextNode: 'hope_why_wait' },
      { text: '🔥 "계획은 무엇이었습니까?"', nextNode: 'hope_plan_details' }
    ]
  },

  hope_plan_details: {
    id: 'hope_plan_details',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"어떤 계획이었습니까?"

호프가 잠시 망설인다.

[제퍼슨 호프]: "...마차꾼으로 위장하는 것부터 시작했습니다."

[제퍼슨 호프]: "백작 저택에 물건을 배달하는 척... 내부를 파악했죠."

[제퍼슨 호프]: "지하실, 제단, 우물... 모든 걸 조사했습니다."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "독은 어떻게 구했습니까?"

호프가 눈을 내리icana.

[제퍼슨 호프]: "...군대에서 배웠습니다. 알칼로이드 계통 독... 추적하기 어렵죠."

[제퍼슨 호프]: "천천히 작용하지만... 확실합니다."

[왓슨]: "왜 독을 선택했습니까? 칼이나 총이 아니라?"

호프가 로켓을 본다.

[제퍼슨 호프]: "...루시처럼 천천히 고통받으며 죽게 하고 싶었습니다."

당신은 숨이 멎는다.

이것이... 복수의 진실이구나.`,
    choices: [
      { text: '💬 "백작을 독살했습니까?"', nextNode: 'hope_poisoned_count' },
      { text: '🔍 "다른 방법은 없었습니까?"', nextNode: 'hope_other_ways' },
      { text: '🌹 "후회하지 않습니까?"', nextNode: 'hope_regret' }
    ]
  },

  hope_why_poison: {
    id: 'hope_why_poison',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"왜 독을 선택했습니까?"

호프가 길게 한숨을 쉰다.

[제퍼슨 호프]: "...여러 이유가 있습니다."

[제퍼슨 호프]: "첫째, 추적이 어렵습니다. 총이나 칼과 달리..."

[셜록 홈즈]: "하지만 그것만이 이유는 아니겠죠."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "...루시도 천천히 죽어갔습니다. 병으로..."

[제퍼슨 호프]: "슬픔과 절망이... 그녀를 서서히 죽였죠."

[제퍼슨 호프]: "백작도... 같은 방식으로 죽어야 한다고 생각했습니다."

그가 떨린다.

[제퍼슨 호프]: "천천히... 고통받으면서... 자신의 죄를 생각하면서..."

당신은 말문이 막힌다.

복수의 잔혹함이... 두렵다.`,
    choices: [
      { text: '💬 "백작이 고통받는 걸 보고 싶었습니까?"', nextNode: 'hope_wanted_suffering' },
      { text: '🔍 "후회하지 않습니까?"', nextNode: 'hope_regret' },
      { text: '🌹 "루시는 이런 복수를 원했을까요?"', nextNode: 'hope_lucy_wish' }
    ]
  },

  hope_last_night: {
    id: 'hope_last_night',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"어제 밤 백작 저택에서... 무슨 일이 있었습니까?"

호프가 눈을 감는다.

[제퍼슨 호프]: "...실행했습니다. 20년간 준비한 계획을..."

[왓슨]: "백작을 독살했습니까?"

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "...와인에 독을 탔습니다. 백작이 지하실에서 의식을 치를 때..."

[제퍼슨 호프]: "백작은... 의심하지 않았어요. 저를 마차꾼으로만 알았으니까..."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "그 후에는?"

[제퍼슨 호프]: "...백작이 독을 마셨습니다. 그리고 쓰러졌죠."

[제퍼슨 호프]: "저는... 루시의 로켓을 그 옆에 놓았습니다. 복수의 증표로..."

그가 떨린다.

[제퍼슨 호프]: "그리고... 돌아왔습니다. 여관으로..."`,
    choices: [
      { text: '💬 "백작이 죽었습니까?"', nextNode: 'hope_count_dead' },
      { text: '🔍 "왜 경찰에 신고하지 않았습니까?"', nextNode: 'hope_why_no_police' },
      { text: '🌹 "후회하지 않습니까?"', nextNode: 'hope_regret' }
    ]
  },

  hope_poisoned_count: {
    id: 'hope_poisoned_count',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"백작을 독살했습니까?"

호프가 고개를 숙인다.

[제퍼슨 호프]: "...네. 어제 밤... 와인에 독을 탔습니다."

[셜록 홈즈]: "어떻게 접근했습니까?"

[제퍼슨 호프]: "마차꾼으로... 물건을 배달하는 척했죠."

[제퍼슨 호프]: "백작은 의심하지 않았어요. 저를 수십 번 봤지만... 20년 전 저를 기억하지 못했으니까..."

[왓슨]: "20년... 많이 변하셨겠군요."

호프가 쓴웃음을 짓는다.

[제퍼슨 호프]: "네... 젊고 희망에 찬 청년은 사라졌죠. 이제 남은 건... 복수에 불타는 노인뿐..."

그가 로켓을 쥔다.

[제퍼슨 호프]: "하지만... 해냈습니다. 루시의 복수를..."`,
    choices: [
      { text: '💬 "백작이 죽었습니까?"', nextNode: 'hope_count_dead' },
      { text: '🔍 "후회하지 않습니까?"', nextNode: 'hope_regret' },
      { text: '🌹 "루시는 이걸 원했을까요?"', nextNode: 'hope_lucy_wish' }
    ]
  },

  hope_count_dead: {
    id: 'hope_count_dead',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"백작이... 죽었습니까?"

호프가 망설인다.

[제퍼슨 호프]: "...모르겠습니다."

[왓슨]: "모른다고요?"

[제퍼슨 호프]: "제가 떠날 때... 아직 숨은 붙어있었습니다. 하지만... 독이 퍼지면..."

홈즈가 말한다.

[셜록 홈즈]: "우리가 백작을 찾았습니다. 지하실에서... 살아있었습니다."

호프가 충격받는다.

[제퍼슨 호프]: "...살아있다고요?"

[셜록 홈즈]: "왓슨 박사가 해독제를 투여했습니다. 백작은 회복 중입니다."

호프가 주저앉는다.

[제퍼슨 호프]: "그렇다면... 나는... 살인자도 아니고... 복수자도 아니고..."

그가 로켓을 본다.

[제퍼슨 호프]: "...실패한 겁니까? 20년을... 허비한 겁니까?"`,
    choices: [
      { text: '💬 "실패가 아닙니다"', nextNode: 'hope_not_failure' },
      { text: '🔍 "오히려 다행입니다"', nextNode: 'hope_fortunate' },
      { text: '🌹 "루시가 원한 건 복수가 아니었습니다"', nextNode: 'hope_lucy_wish' }
    ]
  },

  hope_regret: {
    id: 'hope_regret',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"후회하지 않습니까?"

호프가 길게 침묵한다.

[제퍼슨 호프]: "...후회."

그가 로켓을 펼친다. 루시의 초상화를 본다.

[제퍼슨 호프]: "매일... 후회했습니다."

[왓슨]: "그런데도 복수를 계속했습니까?"

[제퍼슨 호프]: "네... 멈출 수 없었어요. 20년을 투자했으니까..."

[제퍼슨 호프]: "루시의 무덤 앞에서 맹세했으니까..."

그가 눈물을 흘린다.

[제퍼슨 호프]: "하지만... 이제 와서 생각해보니..."

[제퍼슨 호프]: "루시는... 복수를 원하지 않았을 것 같습니다."

홈즈가 조용히 말한다.

[셜록 홈즈]: "깨달았군요."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 너무 늦게..."`,
    choices: [
      { text: '💬 "아직 늦지 않았습니다"', nextNode: 'hope_not_too_late' },
      { text: '🔍 "이제 어떻게 하시겠습니까?"', nextNode: 'hope_what_now' },
      { text: '🌹 "루시는 당신을 용서할 겁니다"', nextNode: 'hope_lucy_forgive' }
    ]
  },

  hope_lucy_wish: {
    id: 'hope_lucy_wish',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"루시는... 이런 복수를 원했을까요?"

호프가 멈춘다.

[제퍼슨 호프]: "..."

그가 로켓을 본다. 루시의 초상화를...

[제퍼슨 호프]: "...아니요. 원하지 않았을 겁니다."

[왓슨]: "..."

[제퍼슨 호프]: "루시는... 정의로운 사람이었지만... 복수심에 불타는 사람은 아니었어요."

[제퍼슨 호프]: "용서할 줄도 알았고... 사랑할 줄도 알았죠."

그가 눈물을 흘린다.

[제퍼슨 호프]: "저는... 루시를 위한다고 했지만... 사실은 제 분노를 채우려 한 겁니다."

[제퍼슨 호프]: "루시의 이름으로... 제 복수심을 정당화한 거예요."

홈즈가 조용히 말한다.

[셜록 홈즈]: "깨달았군요. 늦었지만..."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 20년... 허비했습니다..."`,
    choices: [
      { text: '💬 "허비한 게 아닙니다"', nextNode: 'hope_not_wasted' },
      { text: '🔍 "이제라도 바로잡을 수 있습니다"', nextNode: 'hope_can_fix' },
      { text: '🌹 "루시는 당신을 기다리고 있습니다"', nextNode: 'hope_lucy_waiting' }
    ]
  },

  hope_not_too_late: {
    id: 'hope_not_too_late',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"아직 늦지 않았습니다."

호프가 당신을 본다.

[제퍼슨 호프]: "...늦지 않았다고요?"

[왓슨]: "백작은 살아있습니다. 당신은 아직 살인자가 아닙니다."

[왓슨]: "법정에 서서... 진실을 말할 수 있습니다. 백작의 죄와... 당신의 슬픔을..."

홈즈가 말한다.

[셜록 홈즈]: "복수가 아니라 정의로... 이 일을 끝낼 수 있습니다."

호프가 떨린다.

[제퍼슨 호프]: "정의..."

[제퍼슨 호프]: "루시라면... 그걸 원했을까요?"

[왓슨]: "물론입니다."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "...알겠습니다. 법정에 서겠습니다."`,
    choices: [
      { text: '💬 "용기 있는 선택입니다"', nextNode: 'hope_brave_choice' },
      { text: '🔍 "엘렌을 만나보시겠습니까?"', nextNode: 'hope_meet_ellen_offer' },
      { text: '🌹 "루시가 자랑스러워할 겁니다"', nextNode: 'hope_lucy_proud' }
    ]
  },

  hope_what_now: {
    id: 'hope_what_now',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"이제... 어떻게 하시겠습니까?"

호프가 창밖을 본다.

[제퍼슨 호프]: "...모르겠습니다."

[제퍼슨 호프]: "20년간... 복수만 생각했습니다. 그것만이 제 삶의 목적이었죠."

[제퍼슨 호프]: "하지만 이제... 그게 잘못됐다는 걸 알았습니다."

그가 로켓을 쥔다.

[제퍼슨 호프]: "그렇다면... 이제 저는 무엇을 위해 살아야 하나요?"

홈즈가 말한다.

[셜록 홈즈]: "루시를 위해... 올바른 방식으로."

[제퍼슨 호프]: "올바른 방식..."

[왓슨]: "법정에 서십시오. 진실을 말하십시오. 그것이 루시가 원하는 정의입니다."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "...알겠습니다."`,
    choices: [
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'hope_go_together' },
      { text: '🔍 "엘렌을 만나보시겠습니까?"', nextNode: 'hope_meet_ellen_offer' },
      { text: '🌹 "루시가 자랑스러워할 겁니다"', nextNode: 'hope_lucy_proud' }
    ]
  },

  hope_meet_ellen_offer: {
    id: 'hope_meet_ellen_offer',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"엘렌을 만나보시겠습니까?"

호프가 놀란다.

[제퍼슨 호프]: "엘렌...? 누구입니까?"

[왓슨]: "루시의 딸입니다."

호프가 얼어붙는다.

[제퍼슨 호프]: "...루시의 딸이라고요?"

홈즈가 설명한다.

[셜록 홈즈]: "백작이 20년간 숨겨 키운 양딸입니다. 루시가 돌아가시기 직전 낳은 아이죠."

호프가 주저앉는다.

[제퍼슨 호프]: "루시에게... 딸이... 있었다니..."

[제퍼슨 호프]: "저는... 몰랐습니다..."

그가 떨린다.

[제퍼슨 호프]: "만나고 싶습니다... 루시의 딸을..."`,
    choices: [
      { text: '💬 "함께 저택으로 갑시다"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '🔍 "준비가 필요하시겠습니까?"', nextNode: 'hope_final_preparation' },
      { text: '🌹 "엘렌도 당신을 만나고 싶어할 겁니다"', nextNode: 'hope_ellen_encouragement' }
    ]
  },

  hope_ellen_encouragement: {
    id: 'hope_ellen_encouragement',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"엘렌도 당신을 만나고 싶어할 겁니다."

호프가 눈물을 흘린다.

[제퍼슨 호프]: "정말... 그럴까요?"

[왓슨]: "확신합니다. 그녀는 어머니 이야기를 듣고 자랐습니다. 당신에 대해서도요."

[제퍼슨 호프]: "루시의 딸이... 저를..."

그가 떨린다.`,
    choices: [
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '🌹 "용기를 내십시오"', nextNode: 'hope_courage' }
    ]
  },

  // ========== 추가 노드들 ==========

  hope_loved_lucy: {
    id: 'hope_loved_lucy',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"사랑하셨군요."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 제 인생에서 가장 큰 사랑이었습니다."

[제퍼슨 호프]: "루시는... 제게 모든 것이었어요. 희망이고, 미래고, 삶의 의미였죠."

그가 로켓을 쥔다.

[제퍼슨 호프]: "그녀를 잃고... 저는 껍데기만 남았습니다."

[제퍼슨 호프]: "20년간... 복수만이 제게 남은 유일한 목적이었어요."

[왓슨]: "하지만 이제는?"

호프가 눈물을 흘린다.

[제퍼슨 호프]: "이제는... 잘못됐다는 걸 압니다. 루시라면... 이런 저를 원하지 않았을 거예요."`,
    choices: [
      { text: '💬 "깨달음이 늦지 않았습니다"', nextNode: 'hope_not_too_late' },
      { text: '🔍 "엘렌을 만나보시겠습니까?"', nextNode: 'hope_meet_ellen_offer' },
      { text: '🌹 "루시는 당신을 용서할 겁니다"', nextNode: 'hope_lucy_forgive' }
    ]
  },

  hope_after_lucy: {
    id: 'hope_after_lucy',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"루시를 잃은 후... 어떻게 되었습니까?"

호프가 창밖을 본다.

[제퍼슨 호프]: "...무너졌습니다. 완전히."

[제퍼슨 호프]: "루시의 장례식 후... 저는 폐인이 되었어요. 술에 빠지고, 싸움에 빠지고..."

[왓슨]: "..."

[제퍼슨 호프]: "하지만 어느 날... 루시의 무덤 앞에서 깨달았습니다."

[제퍼슨 호프]: "이렇게 무너져 있는 건... 루시를 두 번 죽이는 거라고..."

[제퍼슨 호프]: "그래서 일어섰습니다. 복수를 위해..."

홈즈가 말한다.

[셜록 홈즈]: "복수가 당신을 살게 만들었군요."

[제퍼슨 호프]: "네... 하지만 동시에... 저를 죽이기도 했습니다."`,
    choices: [
      { text: '💬 "무슨 뜻입니까?"', nextNode: 'hope_living_dead' },
      { text: '🔍 "20년간의 추적에 대해"', nextNode: 'hope_twenty_years' },
      { text: '🌹 "아직 살아있습니다"', nextNode: 'hope_still_alive' }
    ]
  },

  hope_moment_silence: {
    id: 'hope_moment_silence',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `당신은 침묵으로 애도한다.

호프가 고맙다는 눈빛을 보낸다.

잠시 침묵이 흐른다.

루시를 위한... 짧은 애도의 시간.

홈즈도 모자를 벗는다.

[셜록 홈즈]: "루시 페리어... 정의로운 여성이었습니다."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 가장 아름다운 영혼이었습니다."

잠시 후, 당신이 말한다.`,
    choices: [
      { text: '💬 "이제 어떻게 하시겠습니까?"', nextNode: 'hope_what_now' },
      { text: '🔍 "엘렌을 만나보시겠습니까?"', nextNode: 'hope_meet_ellen_offer' },
      { text: '🌹 "루시는 평화로울 겁니다"', nextNode: 'hope_lucy_peace' }
    ]
  },

  hope_after_finding: {
    id: 'hope_after_finding',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"백작을 찾은 후에는?"

호프가 답한다.

[제퍼슨 호프]: "...관찰했습니다. 몇 년간..."

[왓슨]: "몇 년이나?"

[제퍼슨 호프]: "네. 백작의 일상, 습관, 약점... 모든 걸 파악했죠."

[제퍼슨 호프]: "그리고 발견했습니다... 백작이 매일 밤 지하실에 내려간다는 걸..."

홈즈가 묻는다.

[셜록 홈즈]: "지하실에서 의식을?"

[제퍼슨 호프]: "네... 처음엔 무슨 의식인지 몰랐어요. 하지만 나중에 알았죠..."

[제퍼슨 호프]: "루시를 위한 속죄 의식이었다는 걸..."

그가 쓴웃음을 짓는다.

[제퍼슨 호프]: "백작도... 괴로워하고 있었던 겁니다. 20년간..."`,
    choices: [
      { text: '💬 "그걸 알고도 복수했습니까?"', nextNode: 'hope_knew_but_revenge' },
      { text: '🔍 "망설이지 않으셨습니까?"', nextNode: 'hope_hesitation' },
      { text: '🌹 "복잡했겠군요"', nextNode: 'hope_complicated' }
    ]
  },

  hope_why_wait: {
    id: 'hope_why_wait',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"백작을 찾고도... 왜 바로 행동하지 않았습니까?"

호프가 한숨을 쉰다.

[제퍼슨 호프]: "...망설였습니다."

[왓슨]: "망설였다고요?"

[제퍼슨 호프]: "네. 백작이 속죄하는 모습을 보니까... 혼란스러웠어요."

[제퍼슨 호프]: "이 사람도... 괴로워하고 있구나... 죄책감에 시달리고 있구나..."

[셜록 홈즈]: "그래도 복수를 선택했군요."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 루시의 무덤 앞에서 맹세했으니까요. 포기할 수 없었어요."

[제퍼슨 호프]: "하지만... 몇 년을 더 기다렸습니다. 확신이 서지 않아서..."

[제퍼슨 호프]: "그러다 3개월 전... 결심했습니다."`,
    choices: [
      { text: '💬 "왜 3개월 전입니까?"', nextNode: 'hope_why_three_months' },
      { text: '🔍 "무��이 결심하게 만들었습니까?"', nextNode: 'hope_trigger' },
      { text: '🌹 "오래 고민하셨군요"', nextNode: 'hope_long_thought' }
    ]
  },

  hope_other_ways: {
    id: 'hope_other_ways',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"다른 방법은... 없었습니까?"

호프가 길게 한숨을 쉰다.

[제퍼슨 호프]: "...생각해봤습니다. 수없이..."

[제퍼슨 호프]: "경찰에 신고할까? 법정에 백작을 세울까?"

[왓슨]: "왜 하지 않으셨습니까?"

[제퍼슨 호프]: "20년이 지났으니까요... 증거도 없고, 증인도 죽었고..."

[제퍼슨 호프]: "법은 백작을 처벌하지 못할 겁니다."

홈즈가 말한다.

[셜록 홈즈]: "그래서 직접 심판하기로..."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 잘못된 선택이었습니다. 이제는 압니다."`,
    choices: [
      { text: '💬 "후회하십니까?"', nextNode: 'hope_regret' },
      { text: '🔍 "이제라도 바로잡을 수 있습니다"', nextNode: 'hope_can_fix' },
      { text: '🌹 "법을 믿으십시오"', nextNode: 'hope_trust_law' }
    ]
  },

  hope_wanted_suffering: {
    id: 'hope_wanted_suffering',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"백작이 고통받는 걸... 보고 싶었습니까?"

호프가 고개를 숙인다.

[제퍼슨 호프]: "...네. 솔직히 말하면..."

[제퍼슨 호프]: "백작이 천천히 죽어가면서... 자신의 죄를 후회하는 걸 보고 싶었어요."

[제퍼슨 호프]: "루시처럼... 절망 속에서... 고통받으면서..."

그가 떨린다.

[제퍼슨 호프]: "하지만... 막상 독을 먹이고 나니까..."

[제퍼슨 호프]: "속이 안 좋았어요. 기쁘지도 않고... 후련하지도 않고..."

[왓슨]: "후회하셨군요."

[제퍼슨 호프]: "네... 여관으로 돌아오는 길에... 계속 생각했습니다."

[제퍼슨 호프]: "이게... 루시가 원한 일일까? 이게... 정의일까?"

홈즈가 조용히 말한다.

[셜록 홈즈]: "복수는 아무도 구원하지 못합니다."`,
    choices: [
      { text: '💬 "깨달았군요"', nextNode: 'hope_realized' },
      { text: '🔍 "이제 어떻게 하시겠습니까?"', nextNode: 'hope_what_now' },
      { text: '🌹 "아직 늦지 않았습니다"', nextNode: 'hope_not_too_late' }
    ]
  },

  hope_why_no_police: {
    id: 'hope_why_no_police',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"왜 경찰에 신고하지 않았습니까?"

호프가 쓴웃음을 짓는다.

[제퍼슨 호프]: "신고요? 뭐라고 하겠습니까?"

[제퍼슨 호프]: "'제가 백작을 독살했습니다. 20년 전 복수를 위해서요'라고?"

[셜록 홈즈]: "..."

[제퍼슨 호프]: "저는... 도망치려던 게 아닙니다. 그저... 루시의 무덤에 가려고..."

[제퍼슨 호프]: "마지막으로... 루시에게 말하고 싶었어요. '복수했어'라고..."

그가 로켓을 본다.

[제퍼슨 호프]: "하지만... 이제는 말할 수 없겠군요. '실패했어'라고 해야 하니까..."`,
    choices: [
      { text: '💬 "실패가 아닙니다"', nextNode: 'hope_not_failure' },
      { text: '🔍 "오히려 다행입니다"', nextNode: 'hope_fortunate' },
      { text: '🌹 "루시는 이해할 겁니다"', nextNode: 'hope_lucy_understand' }
    ]
  },

  hope_not_failure: {
    id: 'hope_not_failure',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"실패가 아닙니다."

호프가 당신을 본다.

[제퍼슨 호프]: "...무슨 말씀입니까?"

[왓슨]: "당신은 깨달았습니다. 복수가 답이 아니라는 걸..."

[왓슨]: "루시가 원한 건 복수가 아니라 정의였다는 걸..."

홈즈가 말한다.

[셜록 홈즈]: "백작이 살아있다는 건... 당신에게 두 번째 기회입니다."

[셜록 홈즈]: "올바른 방식으로... 이 일을 끝낼 기회..."

호프가 떨린다.

[제퍼슨 호프]: "두 번째 기회..."

당신이 고개를 끄덕인다.

[왓슨]: "네. 법정에 서십시오. 진실을 말하십시오. 그것이 진정한 정의입니다."`,
    choices: [
      { text: '💬 "용기를 내십시오"', nextNode: 'hope_courage' },
      { text: '🔍 "우리가 함께 하겠습니다"', nextNode: 'hope_together' },
      { text: '🌹 "루시가 자랑스러워할 겁니다"', nextNode: 'hope_lucy_proud' }
    ]
  },

  hope_fortunate: {
    id: 'hope_fortunate',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'holmes',
    text: `홈즈가 말한다.

[셜록 홈즈]: "오히려 다행입니다."

호프가 놀란다.

[제퍼슨 호프]: "...다행이라고요?"

[셜록 홈즈]: "네. 백작이 살아있으니... 당신은 살인자가 아닙니다."

[셜록 홈즈]: "살인 미수죄는... 정상참작이 가능합니다. 20년간의 고통, 정신적 트라우마..."

[왓슨]: "법정에서 변호할 수 있습니다."

호프가 멍하니 듣는다.

[제퍼슨 호프]: "저를... 변호한다고요?"

[셜록 홈즈]: "당신은 피해자이기도 합니다. 백작의 범죄로 인한..."

홈즈가 진지하게 말한다.

[셜록 홈즈]: "올바른 재판을 받으십시오. 그것이 루시가 원하는 정의입니다."`,
    choices: [
      { text: '💬 "함께 하시겠습니까?"', nextNode: 'hope_go_together' },
      { text: '🔍 "엘렌도 증언할 수 있습니다"', nextNode: 'hope_ellen_testify' },
      { text: '🌹 "정의를 믿으십시오"', nextNode: 'hope_trust_justice' }
    ]
  },

  hope_not_wasted: {
    id: 'hope_not_wasted',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"허비한 게 아닙니다."

호프가 당신을 본다.

[왓슨]: "20년간... 당신은 루시를 기억했습니다. 잊지 않았습니다."

[왓슨]: "그 기억이... 비록 복수의 형태였지만... 루시에 대한 사랑이었습니다."

홈즈가 말한다.

[셜록 홈즈]: "이제 그 사랑을... 올바른 방향으로 돌릴 수 있습니다."

호프가 눈물을 흘린다.

[제퍼슨 호프]: "올바른 방향..."

[왓슨]: "네. 법정에서 진실을 말하고... 엘렌을 만나고... 루시의 뜻을 따르는 것..."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "...알겠습니다. 그렇게 하겠습니다."`,
    choices: [
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'hope_go_together' },
      { text: '🔍 "엘렌을 만나보시겠습니까?"', nextNode: 'hope_meet_ellen_offer' },
      { text: '🌹 "용기 있는 선택입니다"', nextNode: 'hope_brave_choice' }
    ]
  },

  hope_can_fix: {
    id: 'hope_can_fix',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"이제라도 바로잡을 수 있습니다."

호프가 당신을 본다.

[제퍼슨 호프]: "...어떻게요?"

[왓슨]: "법정에 서십시오. 백작의 죄와... 당신의 고통을... 모두 밝히십시오."

[왓슨]: "그것이 진정한 정의입니다."

홈즈가 말한다.

[셜록 홈즈]: "복수가 아니라 재판으로... 이 20년을 끝내십시오."

호프가 떨린다.

[제퍼슨 호프]: "재판..."

[제퍼슨 호프]: "법이... 정의를 실현할 수 있을까요?"

[왓슨]: "믿어야 합니다. 그것이 문명사회의 약속이니까요."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "...알겠습니다. 법정에 서겠습니다."`,
    choices: [
      { text: '💬 "용기 있는 선택입니다"', nextNode: 'hope_brave_choice' },
      { text: '🔍 "우리가 도와드리겠습니다"', nextNode: 'hope_together' },
      { text: '🌹 "루시가 자랑스러워할 겁니다"', nextNode: 'hope_lucy_proud' }
    ]
  },

  hope_lucy_waiting: {
    id: 'hope_lucy_waiting',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"루시는... 당신을 기다리고 있습니다."

호프가 눈물을 흘린다.

[제퍼슨 호프]: "...기다리고 있다고요?"

[왓슨]: "네. 올바른 당신을... 복수가 아닌 정의를 선택한 당신을..."

[왓슨]: "루시는 그런 당신을 사랑했을 겁니다."

호프가 로켓을 쥔다.

[제퍼슨 호프]: "루시... 저를... 용서해줄까요?"

홈즈가 조용히 말한다.

[셜록 홈즈]: "이미 용서했을 겁니다. 당신이 깨달았으니까요."

호프가 흐느낀다.

[제퍼슨 호프]: "고맙습니다... 탐정님들..."

그가 일어선다.

[제퍼슨 호프]: "이제... 루시에게 떳떳해질 수 있습니다."`,
    choices: [
      { text: '💬 "함께 가시겠습니까?"', nextNode: 'hope_go_together' },
      { text: '🔍 "엘렌을 만나보시겠습니까?"', nextNode: 'hope_meet_ellen_offer' },
      { text: '🌹 "루시가 자랑스러워할 겁니다"', nextNode: 'hope_lucy_proud' }
    ]
  },

  hope_lucy_forgive: {
    id: 'hope_lucy_forgive',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"루시는... 당신을 용서할 겁니다."

호프가 눈물을 흘린다.

[제퍼슨 호프]: "정말... 그럴까요?"

[왓슨]: "물론입니다. 루시는 정의로웠지만... 용서할 줄도 아는 사람이었습니다."

[왓슨]: "그리고 당신을... 사랑했습니다."

호프가 로켓을 쥔다.

[제퍼슨 호프]: "루시..."

홈즈가 말한다.

[셜록 홈즈]: "이제 올바른 선택을 하십시오. 루시를 위해서..."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 루시를 위해... 올바르게..."`,
    choices: [
      { text: '💬 "법정에 서시겠습니까?"', nextNode: 'hope_court_decision' },
      { text: '🔍 "엘렌을 만나보시겠습니까?"', nextNode: 'hope_meet_ellen_offer' },
      { text: '🌹 "함께 가시겠습니까?"', nextNode: 'hope_go_together' }
    ]
  },

  hope_brave_choice: {
    id: 'hope_brave_choice',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'holmes',
    text: `홈즈가 말한다.

[셜록 홈즈]: "용기 있는 선택입니다, 호프."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "...20년 만에 처음으로 옳은 선택을 하는 것 같습니다."

당신이 그의 어깨에 손을 얹는다.

[왓슨]: "늦지 않았습니다."

호프가 창밖을 본다.

[제퍼슨 호프]: "백작 저택이... 저곳에 있군요."

[제퍼슨 호프]: "엘렌이... 루시의 딸이... 거기 있다는 게 믿기지 않습니다."

홈즈가 문을 연다.

[셜록 홈즈]: "가시죠. 이제... 진실과 마주할 시간입니다."`,
    choices: [
      { text: '🏃 "함께 저택으로 간다"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '💬 "준비가 더 필요하십니까?"', nextNode: 'hope_final_preparation' },
      { text: '🌹 "루시가 지켜보고 있습니다"', nextNode: 'hope_lucy_watching' }
    ]
  },

  hope_lucy_proud: {
    id: 'hope_lucy_proud',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"루시가 자랑스러워할 겁니다."

호프가 로켓을 본다.

[제퍼슨 호프]: "...정말 그럴까요?"

[왓슨]: "물론입니다. 당신은 복수가 아닌 정의를 선택했으니까요."

[왓슨]: "루시가 사랑했던 당신... 그 당신으로 돌아온 겁니다."

호프가 눈물을 흘린다.

[제퍼슨 호프]: "루시... 저를 봐주세요... 이제 올바른 길을 가겠습니다..."

홈즈가 조용히 말한다.

[셜록 홈즈]: "그녀는 보고 있을 겁니다. 그리고 미소 짓고 있을 거예요."

호프가 일어선다.

[제퍼슨 호프]: "가겠습니다. 저택으로... 엘렌을 만나러..."`,
    choices: [
      { text: '🏃 "함께 갑니다"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '💬 "준비는 되셨습니까?"', nextNode: 'hope_ready' },
      { text: '🌹 "용기를 내십시오"', nextNode: 'hope_courage' }
    ]
  },

  hope_go_together: {
    id: 'hope_go_together',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"함께 가시겠습니까?"

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 혼자서는... 용기가 나지 않습니다."

당신이 미소 짓는다.

[왓슨]: "괜찮습니다. 우리가 함께 있으니까요."

홈즈가 모자를 쓴다.

[셜록 홈즈]: "자, 그럼 가시죠. 엘렌이 기다리고 있을 겁니다."

호프가 로켓을 주머니에 넣는다.

[제퍼슨 호프]: "루시... 함께 가요..."

네 사람이 여관을 나선다.

저택을 향해...`,
    choices: [
      { text: '🏃 "저택으로 향한다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_to_mansion_with_watson: {
    id: 'hope_to_mansion_with_watson',
    day: 1,
    timeOfDay: 'evening',
    location: 'backyard',
    speaker: 'watson',
    text: `저택에 도착했다.

호프가 저택을 바라본다.

[제퍼슨 호프]: "...20년 만에 다시 왔군요. 이번에는 복수가 아니라..."

[왓슨]: "정의를 위해서입니다."

뒷뜰로 향한다.

그곳에... 엘렌이 서 있다.

창백한 얼굴, 루시를 닮은 모습...

호프가 얼어붙는다.

[제퍼슨 호프]: "...루시?"

엘렌이 당신을 본다.

[엘렌]: "탐정님들... 그리고..."

그녀가 호프를 본다.

[엘렌]: "...호프님?"`,
    choices: [
      { text: '🌹 "엘렌 양, 제퍼슨 호프입니다"', nextNode: 'ellen_first_meet' },
      { text: '💬 [두 사람의 만남을 지켜본다]', nextNode: 'ellen_first_meet' },
      { text: '🔍 [호프의 반응을 본다]', nextNode: 'ellen_first_meet' }
    ]
  },

  // ========== 누락된 노드들 추가 ==========

  hope_ready: {
    id: 'hope_ready',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"준비는 되셨습니까?"

호프가 깊��� 숨을 쉰다.

[제퍼슨 호프]: "...네. 가겠습니다."

[제퍼슨 호프]: "루시의 딸을... 만나러..."

당신이 고개를 끄덕인다.

[왓슨]: "함께 가시죠."`,
    choices: [
      { text: '🏃 "저택으로 향한다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_courage: {
    id: 'hope_courage',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"용기를 내십시오."

호프가 로켓을 쥔다.

[제퍼슨 호프]: "...네. 용기..."

[왓슨]: "루시가 함께 합니다."

호프가 일어선다.

[제퍼슨 호프]: "가겠습니다."`,
    choices: [
      { text: '🏃 "함께 갑니다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_together: {
    id: 'hope_together',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"우리가 함께 하겠습니다."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "...고맙습니다."

홈즈가 모자를 쓴다.

[셜록 홈즈]: "가시죠."

당신과 홈즈, 호프가 여관을 나선다.`,
    choices: [
      { text: '🏃 "저택으로 향한다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_final_preparation: {
    id: 'hope_final_preparation',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"준비가 더 필요하십니까?"

호프가 잠시 생각한다.

[제퍼슨 호프]: "...아니요. 이미 20년을 기다렸습니다."

[제퍼슨 호프]: "더 이상 미룰 수 없습니다."

당신이 고개를 끄덕인다.

[왓슨]: "그럼 가시죠."`,
    choices: [
      { text: '🏃 "함께 저택으로 간다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_lucy_watching: {
    id: 'hope_lucy_watching',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"루시가 지켜보고 있습니다."

호프가 로켓을 쥔다.

[제퍼슨 호프]: "...네. 루시..."

[왓슨]: "그녀는 당신이 올바른 선택을 하는 걸 보고 있을 겁니다."

호프가 눈물을 흘린다.

[제퍼슨 호프]: "루시... 함께 가요..."`,
    choices: [
      { text: '🏃 "저택으로 향한다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_court_decision: {
    id: 'hope_court_decision',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"법정에 서시겠습니까?"

호프가 잠시 생각한다.

[제퍼슨 호프]: "...네. 그렇게 하겠습니다."

[제퍼슨 호프]: "루시를 위해... 올바른 방식으로..."

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: "현명한 선택입니다."

호프가 일어선다.

[제퍼슨 호프]: "가겠습니다. 저택으로..."`,
    choices: [
      { text: '🏃 "함께 갑니다"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '💬 "엘렌을 만날 준비가 되셨습니까?"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '🌹 "루시가 자랑스러워할 겁니다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_ellen_testify: {
    id: 'hope_ellen_testify',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'holmes',
    text: `홈즈가 말한다.

[셜록 홈즈]: "엘렌도 증언할 수 있습니다."

호프가 놀란다.

[제퍼슨 호프]: "루시의 딸이... 저를 위해?"

[셜록 홈즈]: "백작의 과거를 증언할 수 있습니다. 20년간의 죄책감과 속죄를..."

[왓슨]: "그리고 당신의 고통도..."

호프가 눈물을 흘린다.

[제퍼슨 호프]: "루시의 딸이... 저를 도와준다니..."`,
    choices: [
      { text: '💬 "만나러 가시겠습니까?"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '🔍 "함께 가시겠습니까?"', nextNode: 'hope_go_together' },
      { text: '🌹 "루시가 연결해준 겁니다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_trust_justice: {
    id: 'hope_trust_justice',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    speaker: 'watson',
    text: `"정의를 믿으십시오."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "...정의."

[제퍼슨 호프]: "루시가 원한 것도... 정의였을 겁니다."

[왓슨]: "맞습니다. 복수가 아니라..."

호프가 일어선다.

[제퍼슨 호프]: "알겠습니다. 가겠습니다."`,
    choices: [
      { text: '🏃 "함께 갑니다"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '💬 "엘렌이 기다리고 있습니다"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '🌹 "용기를 내십시오"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  // ========== 누락된 노드들 추가 ==========

  hope_why_now: {
    id: 'hope_why_now',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"왜 이제야 행동했습니까?"

호프가 한숨을 쉰다.

[제퍼슨 호프]: "...기회를 기다렸습니다. 20년간..."

[제퍼슨 호프]: "백작은 항상 조심스러웠어요. 사람들 속에 숨어 살았죠."

[제퍼슨 호프]: "하지만 3일 전... 드레버가 저택을 방문한다는 소식을 들었습니다."

[왓슨]: "그래서...?"

[제퍼슨 호프]: "모두 모이는 순간... 그때가 바로 심판의 때라고 생각했습니다."

[제퍼슨 호프]: "백작, 드레버, 스탠거슨... 모두 한 곳에."`,
    choices: [
      { text: '💬 "어떻게 하려 했습니까?"', nextNode: 'hope_plan_details' },
      { text: '🔍 "백작을 감금한 건 당신입니까?"', nextNode: 'hope_last_night' }
    ]
  },

  hope_realized: {
    id: 'hope_realized',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 깨달았습니다. 너무 늦게..."

[제퍼슨 호프]: "루시를 사랑했다면... 그녀가 원하는 방식으로 살았어야 했습니다."

[제퍼슨 호프]: "복수가 아니라... 용서와 치유로."

그가 눈물을 닦는다.

[제퍼슨 호프]: "하지만 저는... 증오에 사로잡혔습니다. 20년간..."`,
    choices: [
      { text: '💬 "아직 늦지 않았습니다"', nextNode: 'hope_not_too_late' },
      { text: '🌹 "루시는 당신을 용서할 겁니다"', nextNode: 'hope_lucy_forgives' }
    ]
  },

  hope_trust_law: {
    id: 'hope_trust_law',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"법을 믿을 수 없었습니까?"

호프가 쓴웃음을 짓는다.

[제퍼슨 호프]: "법이요? 20년 전... 법은 루시를 지키지 못했습니다."

[제퍼슨 호프]: "백작과 교단은 법망을 빠져나갔죠. 돈과 권력으로..."

[왓슨]: "하지만..."

[제퍼슨 호프]: "경찰은 루시의 죽음을 '자연사'로 처리했습니다. 조사조차 제대로 하지 않았어요."

그가 주먹을 쥔다.

[제퍼슨 호프]: "그래서... 제 손으로 직접 정의를 실현하려 했습니다."`,
    choices: [
      { text: '💬 "그건 정의가 아니라 복수입니다"', nextNode: 'hope_realize_difference' },
      { text: '🔍 "이번엔 다릅니다. 증거가 있습니다"', nextNode: 'hope_this_time_different' }
    ]
  },

  hope_living_dead: {
    id: 'hope_living_dead',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"살아있는 시체처럼 지냈습니다."

호프가 말한다.

[제퍼슨 호프]: "그렇습니다. 마음은 이미... 루시와 함께 무덤에 묻혔으니까요."

[제퍼슨 호프]: "매일 아침 눈을 뜨면... '왜 내가 살아있지?'라고 생각했습니다."

[왓슨]: "..."

[제퍼슨 호프]: "하지만 복수... 그것만이 저를 움직이게 했습니다."

[제퍼슨 호프]: "그들을 심판하기 전까지는... 죽을 수 없었습니다."`,
    choices: [
      { text: '💬 "그래서 20년을 버텼군요"', nextNode: 'hope_twenty_years_endured' },
      { text: '🌹 "루시는 당신이 행복하길 원했을 겁니다"', nextNode: 'hope_lucy_wanted_happiness' }
    ]
  },

  hope_still_alive: {
    id: 'hope_still_alive',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"아직 살아계셨군요."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 어떻게든 살아왔습니다."

[제퍼슨 호프]: "루시 없는 세상에서... 매일이 고통이었지만."

[왓슨]: "20년이란 세월..."

[제퍼슨 호프]: "하루하루가 전쟁이었습니다. 복수심과... 슬픔과... 죄책감 사이에서."`,
    choices: [
      { text: '💬 "이제 끝낼 수 있습니다"', nextNode: 'hope_can_end' },
      { text: '🔍 "백작을 어떻게 할 계획이었나요?"', nextNode: 'hope_plan_details' }
    ]
  },

  hope_lucy_peace: {
    id: 'hope_lucy_peace',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `잠시 침묵이 흐른다.

호프가 로켓을 내려다본다.

[제퍼슨 호프]: (떨리는 목소리로) "루시... 평화롭게 잠들길..."

당신이 조용히 말한다.

[왓슨]: "그녀는 당신을 사랑했습니다. 그 사랑이... 당신을 올바른 길로 인도할 겁니다."

호프가 눈물을 닦는다.

[제퍼슨 호프]: "...감사합니다, 박사님."`,
    choices: [
      { text: '💬 "백작 저택으로 갑시다"', nextNode: 'hope_to_mansion_decision' },
      { text: '🔍 "어제 밤 무슨 일이 있었는지 말해주십시오"', nextNode: 'hope_last_night' }
    ]
  },

  inn_hope_drebber_contact: {
    id: 'inn_hope_drebber_contact',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    text: `"드레버와 접촉한 적 있습니까?"

여관 주인이 고개를 끄덕인다.

[제임스 매튜스]: "네... 이틀 전이었어요."

[제임스 매튜스]: "호프 씨가 드레버 씨 방 앞에서... 오래 서있더라고요."

[왓슨]: "말을 걸었나요?"

[제임스 매튜스]: "아뇨... 그냥 서있기만 했어요. 문을 응시하면서..."

[제임스 매튜스]: "마치... 안으로 들어가고 싶지만 망설이는 것 같았습니다."`,
    choices: [
      { text: '💬 "그 후에는?"', nextNode: 'inn_hope_after_drebber' },
      { text: '🔍 "호프를 만나러 갑시다"', nextNode: 'inn_meet_hope' }
    ]
  },

  inn_hope_today: {
    id: 'inn_hope_today',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    text: `"오늘은 어디 계십니까?"

여관 주인이 위층을 가리킨다.

[제임스 매튜스]: "아침부터 방에만 계세요. 나오지도 않으시고..."

[제임스 매튜스]: "점심도 거르셨어요."

홈즈가 메모한다.

[셜록 홈즈]: "무언가를 기다리고 있군요..."`,
    choices: [
      { text: '🔥 "지금 만나러 가겠습니다"', nextNode: 'inn_meet_hope' },
      { text: '🔍 "다른 것을 먼저 물어봅시다"', nextNode: 'inn_ask_coachman' }
    ]
  },

  inn_hope_brought_something: {
    id: 'inn_hope_brought_something',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    text: `"무언가를 가져온 것 같습니까?"

여관 주인이 생각한다.

[제임스 매튜스]: "그러고 보니... 작은 가방 하나 들고 오셨어요."

[제임스 매튜스]: "크지 않았지만... 조심스럽게 다루시더라고요."

[왓슨]: "지금도 가지고 계신가요?"

[제임스 매튜스]: "네, 아마... 방에 있을 겁니다."

홈즈가 당신을 본다.

[셜록 홈즈]: "그 가방 안에... 독약이 있을 수도 있어."`,
    choices: [
      { text: '🔥 "지금 당장 확인해야 합니다"', nextNode: 'inn_meet_hope' },
      { text: '🔍 "신중하게 접근합시다"', nextNode: 'inn_hope_location' }
    ]
  },

  // ========== 추가 누락 노드들 ==========

  hope_lucy_forgives: {
    id: 'hope_lucy_forgives',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"루시는 당신을 용서할 겁니다."

호프가 로켓을 쥔다.

[제퍼슨 호프]: "...정말 그럴까요?"

[왓슨]: "그녀는 당신을 사랑했습니다. 그 사랑은... 증오보다 강합니다."

호프가 눈물을 흘린다.

[제퍼슨 호프]: "루시... 미안해..."`,
    choices: [
      { text: '💬 "이제 어떻게 하시겠습니까?"', nextNode: 'hope_what_now' },
      { text: '🔍 "백작 저택으로 갑시다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_realize_difference: {
    id: 'hope_realize_difference',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"그건 정의가 아니라 복수입니다."

호프가 멈춘다.

[제퍼슨 호프]: "...차이가 있나요?"

[왓슨]: "있습니다. 정의는... 진실을 밝히는 것입니다. 복수는 단지 고통을 돌려주는 것이고요."

홈즈가 말한다.

[셜록 홈즈]: "정의는 법정에서 이루어집니다. 복수는... 또 다른 비극만 낳죠."

호프가 고개를 숙인다.

[제퍼슨 호프]: "...알고 있습니다. 하지만..."`,
    choices: [
      { text: '💬 "아직 늦지 않았습니다"', nextNode: 'hope_not_too_late' },
      { text: '🔍 "법정에서 진실을 밝히십시오"', nextNode: 'hope_legal_path' }
    ]
  },

  hope_this_time_different: {
    id: 'hope_this_time_different',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"이번엔 다릅니다. 증거가 있습니다."

호프가 당신을 본다.

[제퍼슨 호프]: "증거...?"

[왓슨]: "지하실의 제단, RACHE, 일기장... 백작의 죄를 입증할 수 있습니다."

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: "법정에서 싸울 수 있습니다. 이번엔 제대로..."

호프가 희망을 품는다.

[제퍼슨 호프]: "...정말 가능할까요?"`,
    choices: [
      { text: '💬 "함께 싸웁시다"', nextNode: 'hope_legal_path' },
      { text: '🔍 "저택으로 갑시다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_can_end: {
    id: 'hope_can_end',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"이제 끝낼 수 있습니다."

호프가 당신을 본다.

[제퍼슨 호프]: "끝낼 수... 있을까요?"

[왓슨]: "20년의 고통을... 올바른 방식으로 끝낼 수 있습니다."

[왓슨]: "복수가 아니라 정의로..."

호프가 긴 한숨을 쉰다.

[제퍼슨 호프]: "...정의..."`,
    choices: [
      { text: '💬 "함께 가겠습니다"', nextNode: 'hope_to_mansion_with_watson' },
      { text: '🔍 "백작의 진실을 밝힙시다"', nextNode: 'hope_legal_path' }
    ]
  },

  hope_twenty_years_endured: {
    id: 'hope_twenty_years_endured',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"그래서 20년을 버텼군요."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네... 매일이 지옥이었지만... 버텼습니다."

[제퍼슨 호프]: "복수... 그것만이 저를 살아있게 했습니다."

[왓슨]: "이제는...?"

호프가 로켓을 본다.

[제퍼슨 호프]: "이제는... 모르겠습니다."`,
    choices: [
      { text: '💬 "새로운 목적을 찾을 수 있습니다"', nextNode: 'hope_new_purpose' },
      { text: '🌹 "루시를 위해 올바르게 살아갈 수 있습니다"', nextNode: 'hope_live_for_lucy' }
    ]
  },

  hope_lucy_wanted_happiness: {
    id: 'hope_lucy_wanted_happiness',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"루시는 당신이 행복하길 원했을 겁니다."

호프가 눈물을 흘린다.

[제퍼슨 호프]: "...행복..."

[제퍼슨 호프]: "20년간... 그 단어를 잊고 살았습니다."

[왓슨]: "루시를 사랑했다면... 그녀가 바라던 모습으로 사십시오."

호프가 로켓을 쥔다.

[제퍼슨 호프]: "루시... 내가... 너무 늦었나?"`,
    choices: [
      { text: '💬 "아직 늦지 않았습니다"', nextNode: 'hope_not_too_late' },
      { text: '🌹 "지금부터라도 시작할 수 있습니다"', nextNode: 'hope_new_beginning' }
    ]
  },

  hope_to_mansion_decision: {
    id: 'hope_to_mansion_decision',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"백작 저택으로 갑시다."

호프가 일어선다.

[제퍼슨 호프]: "...가겠습니다."

[제퍼슨 호프]: "이번엔... 올바른 방식으로."

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: "함께 가죠. 진실을 밝힐 시간입니다."`,
    choices: [
      { text: '🏃 "출발합시다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  inn_hope_after_drebber: {
    id: 'inn_hope_after_drebber',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'innkeeper',
    text: `"그 후에는?"

여관 주인이 생각한다.

[제임스 매튜스]: "다음 날... 호프 씨가 방에서 계속 나오지 않으시더라고요."

[제임스 매튜스]: "식사도 거르시고..."

[왓슨]: "무언가를 결심한 것 같군요."

홈즈가 메모한다.

[셜록 홈즈]: "결정적인 순간을 기다리고 있었어..."`,
    choices: [
      { text: '🔥 "지금 만나러 갑시다"', nextNode: 'inn_meet_hope' },
      { text: '🔍 "다른 것을 먼저 조사합시다"', nextNode: 'inn_ask_coachman' }
    ]
  },

  hope_legal_path: {
    id: 'hope_legal_path',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `호프가 결심한 표정을 짓는다.

[제퍼슨 호프]: "법정에서... 싸우겠습니다."

[제퍼슨 호프]: "루시를 위해... 올바른 방식으로."

홈즈가 손을 내민다.

[셜록 홈즈]: "현명한 선택입니다. 함께 진실을 밝혀냅시다."

호프가 홈즈의 손을 잡는다.`,
    choices: [
      { text: '🏃 "백작 저택으로 갑시다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_new_purpose: {
    id: 'hope_new_purpose',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"새로운 목적을 찾을 수 있습니다."

호프가 당신을 본다.

[제퍼슨 호프]: "새로운... 목적..."

[왓슨]: "복수가 아니라... 정의를. 증오가 아니라... 치유를."

호프가 눈물을 닦는다.

[제퍼슨 호프]: "...감사합니다, 박사님."`,
    choices: [
      { text: '💬 "함께 가겠습니다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_live_for_lucy: {
    id: 'hope_live_for_lucy',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"루시를 위해 올바르게 살아갈 수 있습니다."

호프가 로켓을 쥔다.

[제퍼슨 호프]: "루시를 위해..."

[제퍼슨 호프]: "그녀가 자랑스러워할 방식으로... 살아가겠습니다."

[왓슨]: "그것이 진정한 사랑입니다."`,
    choices: [
      { text: '🏃 "저택으로 갑시다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  },

  hope_new_beginning: {
    id: 'hope_new_beginning',
    day: 1,
    timeOfDay: 'evening',
    location: 'inn',
    character: 'hope',
    text: `"지금부터라도 시작할 수 있습니다."

호프가 일어선다.

[제퍼슨 호프]: "...네. 지금부터..."

[제퍼슨 호프]: "루시가 원했던 모습으로... 살아가겠습니다."

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: "용기 있는 결정입니다."`,
    choices: [
      { text: '🏃 "함께 갑시다"', nextNode: 'hope_to_mansion_with_watson' }
    ]
  }
};