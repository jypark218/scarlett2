/**
 * 스탠거슨 해결/행동 노드
 * 속죄, 구출, 지하실 힌트
 */

import { StoryNode } from '../../../types/story';

export const stangersonResolutionNodes: Record<string, StoryNode> = {
  stangerson_gentle_approach: {
    id: 'stangerson_gentle_approach',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `당신이 부드럽게 다가갑니다.

"스탠거슨씨, 진정하십시오. 당신이 무언가를 숨기고 있다는 건 알겠습니다."

스탠거슨이 고개를 들고 당신을 봅니다. 눈에 눈물이 고입니다.

"하지만 지금은 백작을 찾는 것이 우선입니다. 나중에 과거에 대해선 물어보겠습니다. 지금은... 백작을 구하는 데 협조해주십시오."

스탠거슨이 떨립니다. 그의 손이 무언가를 꽉 쥐고 있습니다.

"저는... 저는..." 그가 고백하려다 말을 멈춥니다. "...백작님이 어디 계신지 알고 있습니다."`,
    choices: [
      { text: '어디에 있는지 묻는다', nextNode: 'stangerson_basement_confession' },
      { text: '백작을 구해야 한다고 설득한다', nextNode: 'stangerson_save_count' },
      { text: '모든 진실을 털어놓게 한다', nextNode: 'stangerson_full_confession' }
    ]
  },

  stangerson_basement_confession: {
    id: 'stangerson_basement_confession',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"어디 계십니까? 스탠거슨, 지금 당장 말씀하십시오!"

스탠거슨이 무너집니다. 그의 손에서 열쇠가 떨어집니다.

"지하실입니다... 제가... 제가 가뒀습니다..."

홈즈가 날카롭게 묻습니다. "당신이?"

"3일 전... 백작님이 자수하려 한다는 걸 알았습니다. 1861년 사건을... 모두 고백하려 했어요."

스탠거슨이 떨리는 목소리로 계속합니다.

"그럼 저도... 공범으로 드러날 겁니다. 20년간 숨겨온 죄가... 그래서 저는..."

홈즈가 차갑게 말합니다. "그래서 백작을 지하실에 가둔 겁니까?"

"죽일 순 없었어요! 하지만... 막아야 했습니다. 제발... 이해해주십시오..."

홈즈가 설계도를 들춥니다. "지하실로 안내하시오. 지금 당장!"`,
    choices: [
      { text: '즉시 지하실로 향한다', nextNode: 'find_basement_stangerson_guilty' },
      { text: '스탠거슨을 체포한다', nextNode: 'arrest_stangerson_first' },
      { text: '더 많은 정보를 얻는다', nextNode: 'stangerson_basement_detail_v2' }
    ]
  },

  stangerson_basement_hint: {
    id: 'stangerson_basement_hint',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"저택에는 지하실이 있습니다."

홈즈가 귀를 기울입니다.

"백작님이 신비주의 연구를 하던 곳입니다. 제단, 촛불, 기이한 기호들이 있죠. 백작님은 그곳에서 '속죄의식'을 하곤 했습니다."

"속죄의식이라니요?"

"루시에게 용서를 구하는 의식이었습니다. 만약 백작님이 위험에 처했다면... 그곳일 겁니다."

스탠거슨이 떨리는 손으로 서랍을 엽니다. 낡은 설계도를 꺼냅니다.

"이것이... 지하실로 가는 지도입니다. 부엌 바닥 아래... 숨겨진 문이..."

홈즈가 설계도를 받아들며 당신을 봅니다. "서둘러야 해, 왓슨!"`,
    choices: [
      { text: '즉시 지하실로 향한다', nextNode: 'find_basement' },
      { text: '스탠거슨에게 함께 가자고 한다', nextNode: 'stangerson_join_rescue' },
      { text: '더 많은 정보를 얻는다', nextNode: 'stangerson_basement_detail' }
    ]
  },

  stangerson_murder_motive: {
    id: 'stangerson_murder_motive',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'holmes',
    text: `홈즈가 천천히 서재를 거닐며 말을 시작합니다.

"흥미로운 사실들이 있습니다. 첫째, 당신은 20년간 백작을 두려워하며 살았습니다."

그가 잠시 멈춥니다.

"둘째, 3개월 전 호프가 나타났을 때 당신은 그를 알아봤지만 아무 말도 하지 않았습니다."

스탠거슨이 불안하게 손을 비빕니다.

"셋째..."

홈즈가 그의 눈을 똑바로 바라봅니다.

"비명을 들은 후 3일간 지하실을 확인하지 않았습니다. 주인이 위험에 처했을지 모르는데 말이죠."

"저, 저는 겁이 났습니다..."

"겁? 아니면..."

홈즈가 날카롭게 말합니다.

"20년간 당신을 괴롭힌 사람이 사라지길 바랐던 건 아닙니까?"

스탠거슨이 얼어붙습니다.

"아닙니다! 저는... 바라긴 했을지도... 하지만 직접 손을 쓰지는...!"

그가 무너지듯 고개를 숙입니다.

"제발... 백작님을 구해주십시오. 제가 비겁했어도... 죽기를 바라진 않았습니다..."`,
    choices: [
      { text: '믿고 함께 백작을 찾는다', nextNode: 'stangerson_join_rescue' },
      { text: '여전히 의심하며 혼자 조사한다', nextNode: 'search_study_more' },
      { text: '호프의 위치를 알려달라고 한다', nextNode: 'stangerson_knows_location' }
    ]
  },

  stangerson_hatred: {
    id: 'stangerson_hatred',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"왜 백작님이 당하기를 바랐습니까?"

스탠거슨이 고개를 숙입니다.

"20년입니다... 20년간 저는 백작님의 그림자 속에 살았습니다."

그의 목소리가 떨립니다.

"협박, 감시, 두려움... 매일 밤 악몽을 꿨습니다. 경찰이 문을 두드리는 꿈, 감옥에 갇히는 꿈..."

"하지만 살해하려던 건 아니었죠?" 당신이 묻습니다.

"아닙니다! 절대 아닙니다! 저는... 다만 자유로워지고 싶었을 뿐입니다. 호프가 나타났을 때, 일부는... 일부는 안도했습니다."

홈즈가 냉정하게 말합니다. "그래서 호프를 막지 않았군요."

스탠거슨이 울먹입니다. "용서해주십시오... 저는... 저는 너무 비겁했습니다..."`,
    choices: [
      { text: '지금이라도 백작을 구하자고 설득한다', nextNode: 'stangerson_save_count' },
      { text: '당신도 공범이라고 추궁한다', nextNode: 'stangerson_complicit' },
      { text: '백작의 위치를 물어본다', nextNode: 'stangerson_knows_location' }
    ]
  },

  stangerson_complicit: {
    id: 'stangerson_complicit',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈가 차갑게 말합니다.

"당신은 호프를 막지 않았습니다. 그가 백작을 납치하는 것을 방관했죠."

"저, 저는 몰랐습니다!"

"거짓말입니다. 당신은 모든 것을 알고 있었습니다. 호프가 누구인지, 무엇을 하러 왔는지..."

스탠거슨이 고개를 떨굽니다.

"...알고 있었습니다. 3개월 전 그가 마차꾼으로 나타났을 때부터..."

"왜 경고하지 않았습니까?"

긴 침묵.

"...백작님이 당해도 된다고 생각했습니다. 20년간의 지옥... 이제 끝날 거라고..."

홈즈가 당신을 봅니다. "방조죄입니다, 왓슨. 하지만 지금 백작을 구하면 참작의 여지가 있을 겁니다."`,
    choices: [
      { text: '스탠거슨에게 백작을 구할 기회를 준다', nextNode: 'stangerson_redemption_offer' },
      { text: '혼자서 백작을 찾으러 간다', nextNode: 'go_basement_alone' },
      { text: '먼저 스탠거슨을 체포한다', nextNode: 'arrest_stangerson_first' }
    ]
  },

  stangerson_save_count: {
    id: 'stangerson_save_count',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"스탠거슨씨, 아직 늦지 않았습니다. 백작을 구할 수 있습니다."

스탠거슨이 고개를 듭니다. 눈에는 희망과 두려움이 섞여 있습니다.

"정말... 정말 그럴 수 있을까요?"

"예. 백작이 어디 있는지 아십니까?"

스탠거슨이 떨리는 목소리로 말합니다.

"지하실... 백작님의 속죄의 방... 호프가 그곳을 알고 있다면..."

홈즈가 일어섭니다. "시간이 없습니다. 지금 당장 안내해주십시오!"

스탠거슨이 고개를 끄덕입니다. "알겠습니다... 제가... 제가 안내하겠습니다!"`,
    choices: [
      { text: '스탠거슨과 함께 지하실로 향한다', nextNode: 'stangerson_join_rescue' },
      { text: '위치만 듣고 혼자 간다', nextNode: 'stangerson_basement_hint' }
    ]
  },

  stangerson_redemption_offer: {
    id: 'stangerson_redemption_offer',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"스탠거슨씨, 과거는 바꿀 수 없습니다. 하지만 지금은 바꿀 수 있습니다."

당신이 그의 어깨에 손을 얹습니다.

"백작을 구하십시오. 그것이 속죄의 시작입니다."

스탠거슨은 고개를 듭니다. 눈에 희망의 빛이 서립니다.

"정말... 정말 그럴 수 있을까요?"

"예. 지금 당장 시작할 수 있다. 백작이 어디 있을지 알려주십시오."

스탠거슨이 결심한 듯 고개를 끄덕입니다.

"지하실입니다! 만약 백작님이 위험에 처했다면... 지하실일 겁니다. 제가... 제가 안내하겠습니다!"

홈즈가 당신을 봅니다. "훌륭한 판단입니다, 왓슨."`,
    choices: [
      { text: '스탠거슨과 함께 지하실로 향한다', nextNode: 'stangerson_join_rescue' },
      { text: '먼저 더 많은 증거를 모은다', nextNode: 'search_study_more' }
    ]
  },

  stangerson_join_rescue: {
    id: 'stangerson_join_rescue',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    text: `스탠거슨이 앞장섭니다. 그의 발걸음은 떨리지만 결연합니다.

"이쪽입니다... 부엌을 통해..."

복도를 지나며 그가 속삭입니다.

"박사님, 홈즈 씨... 제가 20년간 하지 못한 일을 오늘 하겠습니다. 옳은 일을..."

부엌 바닥의 낡은 양탄자를 걷어내자 숨겨진 철문이 나타납니다.

"여기... 지하실로 가는 문입니다. 백작님과 호프가... 그리고 진실이 기다리고 있습니다."

그가 열쇠를 꺼냅니다. 손이 떨립니다.

"20년... 드디어... 끝낼 수 있을까요?"

찰칵. 문이 열립니다. 아래에서 촛불 빛이 희미하게 보입니다.`,
    choices: [
      { text: '조심스럽게 내려간다', nextNode: 'basement_scene' },
      { text: '스탠거슨에게 먼저 내려가게 한다', nextNode: 'stangerson_goes_first' }
    ]
  },

  stangerson_knows_location: {
    id: 'stangerson_knows_location',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"백작과 호프가 지금 어디 있는지 알고 있습니까?"

스탠거슨이 창밖을 봅니다.

"저택 어딘가에... 아직 있을 겁니다. 호프는 20년을 기다렸습니다. 서두르지 않을 겁니다..."

그가 떨립니다.

"아마도 지하실... 백작님의 '속죄의 방'에... 그곳에서 백작님은 루시에게 용서를 구했습니다. 호프가 알았다면..."

홈즈가 메모합니다. "시간이 없습니다, 왓슨. 지하실을 찾아야 합니다!"`,
    choices: [
      { text: '지하실 위치를 물어본다', nextNode: 'stangerson_basement_hint' },
      { text: '즉시 저택을 수색한다', nextNode: 'search_study_more' }
    ]
  },

  stangerson_basement_detail: {
    id: 'stangerson_basement_detail',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"지하실에 대해 자세히 말씀해주십시오."

스탠거슨이 떨리는 목소리로 설명합니다.

"백작님은... 그곳에서 매일 밤 의식을 행했습니다. 촛불을 켜고, 루시의 초상화 앞에서... '용서해주오'라고 되뇌곤 했죠."

"얼마나 오래?"

"10년... 아니, 어쩌면 20년... 저도 정확히는 모릅니다. 백작님은 저를 그곳에 들이지 않았으니까요."

홈즈가 눈을 가늘게 뜹니다. "하지만 위치는 아시는군요."

"...네. 부엌 바닥 아래입니다. 숨겨진 철문이..."

당신이 묻습니다. "호프가 그곳을 알 리가 있습니까?"

스탠거슨이 고개를 숙입니다. "백작님이... 어쩌면 스스로 안내했을지도..."`,
    choices: [
      { text: '즉시 지하실로 향한다', nextNode: 'find_basement' },
      { text: '스탠거슨과 함께 간다', nextNode: 'stangerson_join_rescue' }
    ]
  },

  stangerson_goes_first: {
    id: 'stangerson_goes_first',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    text: `"제가 먼저 내려가겠습니다." 스탠거슨이 말합니다.

"위험할 수 있습니다." 당신이 경고합니다.

"알고 있습니다. 하지만... 이것이 제 속죄입니다."

그가 계단을 조심스럽게 내려갑니다. 촛불 빛이 그의 그림자를 길게 늘입니다.

갑자기 아래에서 목소리가 들립니다.

"스탠거슨... 드디어 왔군." 호프의 목소리입니다.

"호프 씨... 백작님을 풀어주십시오!"

"20년을 기다렸소. 하루 이틀 더... 문제없지."

스탠거슨이 떨립니다. 당신과 홈즈가 뒤따라 내려갑니다.`,
    choices: [
      { text: '호프와 대화한다', nextNode: 'basement_scene' },
      { text: '백작의 상태를 먼저 확인한다', nextNode: 'basement_scene' }
    ]
  },

  // ========== 새로운 노드: 스탠거슨이 범인인 루트 ==========
  
  stangerson_basement_detail_v2: {
    id: 'stangerson_basement_detail_v2',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"왜 가뒀습니까? 백작이 자수하면 당신도 처벌받겠지만... 살인보다는 낫지 않습니까?"

스탠거슨이 고개를 젓습니다.

"저는... 생각할 시간이 필요했습니다. 백작을 설득할 시간이..."

홈즈가 냉정하게 말합니다. "아니면 호프가 처리해주길 기다린 건 아닙니까?"

스탠거슨이 얼어붙습니다.

"아닙니다! 저는 호프가 나타날 줄 몰랐어요! 3일 전에 백작을 가뒀고... 그 후로..."

당신이 물어봅니다. "백작은 무사합니까?"

"음식과 물은 갖다 드렸습니다... 하지만 오늘... 오늘은 못 갔어요... 당신들이 와서..."

홈즈가 서둘러 일어납니다. "왓슨, 지금 당장 가야 해!"`,
    choices: [
      { text: '즉시 지하실로 향한다', nextNode: 'find_basement_stangerson_route' },
      { text: '스탠거슨을 먼저 체포한다', nextNode: 'arrest_stangerson_first' }
    ]
  },

  arrest_stangerson_first: {
    id: 'arrest_stangerson_first',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈가 스탠거슨의 손을 붙잡습니다.

"조셉 스태거슨, 당신을 감금 혐의로 체포합니다."

스탠거슨이 저항하지 않습니다. 그저 고개를 숙일 뿐입니다.

"알고 있었습니다... 이렇게 될 줄..."

당신이 그의 손에서 열쇠를 가져옵니다.

"지하실은 어떻게 갑니까?"

"부엌... 부엌 바닥 아래... 양탄자를 걷어내면... 철문이..."

홈즈가 당신을 봅니다. "왓슨, 백작을 구하러 가자. 스태거슨은... 여기 묶어두게."

당신은 스태거슨을 의자에 묶고 지하실로 향합니다.`,
    choices: [
      { text: '지하실로 향한다', nextNode: 'find_basement_stangerson_route' }
    ]
  },

  find_basement_stangerson_guilty: {
    id: 'find_basement_stangerson_guilty',
    day: 1,
    timeOfDay: 'evening',
    character: 'watson',
    text: `스탠거슨이 앞장서서 부엌으로 안내합니다.

그의 손이 떨리고 있습니다.

낡은 양탄자를 걷어내자 무거운 철문이 드러납니다.

스탠거슨이 열쇠를 꺼냅니다. 자물쇠가 찰칵 열립니다.

"백작님... 죄송합니다..."

문이 열리자 축축한 공기가 올라옵니다.

계단을 내려가는데... 아래에서 희미한 촛불 빛이 보입니다.

그리고... 목소리가 들립니다.

"누구냐...?" 약한 목소리입니다. 백작의 목소리입니다!

하지만 다른 목소리도 들립니다.

"스탠거슨... 드디어 왔군." 낯선 남자의 목소리... 미국 억양!

호프입니다!`,
    choices: [
      { text: '서둘러 내려간다', nextNode: 'basement_stangerson_hope_confrontation' },
      { text: '조심스럽게 ���근한다', nextNode: 'basement_stangerson_hope_confrontation' }
    ]
  },

  find_basement_stangerson_route: {
    id: 'find_basement_stangerson_route',
    day: 1,
    timeOfDay: 'evening',
    character: 'watson',
    text: `부엌 바닥의 양탄자를 걷어냅니다.

무거운 철문이 드러납니다.

스탠거슨에게서 가져온 열쇠로 자물쇠를 엽니다.

찰칵.

문이 열리고 축축한 공기가 올라옵니다.

홈즈가 당신을 봅니다. "조심해, 왓슨."

계단을 내려가는데... 아래에서 희미한 촛불 빛이 보입니다.

그리고 목소리가 들립니다.

"누가... 누가 거기 있소?" 약한 목소리. 백작입니다!

하지만... 다른 목소리도 들립니다.

"드디어... 20년을 기다렸소..." 낯선 남자의 목소리!

호프입니다!`,
    choices: [
      { text: '서둘러 내려간다', nextNode: 'basement_stangerson_hope_confrontation' },
      { text: '조심스럽게 접근한다', nextNode: 'basement_stangerson_hope_confrontation' }
    ]
  },

  basement_stangerson_hope_confrontation: {
    id: 'basement_stangerson_hope_confrontation',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `지하실로 내려가자 충격적인 광경이 펼쳐집니다.

백작이 쇠사슬에 묶여 제단 앞에 쓰러져 있습니다. 3일��� 갇혀있었던 모습... 창백하고 약해 보입니다.

그리고 그 앞에 키 큰 남자가 서 있습니다. 제퍼슨 호프.

그의 손에는... 두 개의 약병이 있습니다.

호프가 당신을 봅니다. 눈에 눈물이 가득합니다.

"...탐정님들. 방해하지 마시오."

백작이 당신을 봅니다. "홈즈 씨... 왓슨 박사... 죄송합니다... 제가... 스태거슨을 이렇게 만들었습니다..."

호프가 말합니다. "백작, 당신의 사죄는 듣고 싶지 않소. 선택하시오. 하나는 독약, 하나는 물... 루시가 당했던 것처럼."

긴박한 순간입니다!`,
    choices: [
      { text: '호프를 설득한다', nextNode: 'persuade_hope_basement' },
      { text: '백작을 먼저 구한다', nextNode: 'save_count_first' },
      { text: '스탠거슨의 죄를 밝힌다', nextNode: 'reveal_stangerson_guilt' }
    ]
  }
};