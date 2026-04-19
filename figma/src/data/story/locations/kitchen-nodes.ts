/**
 * 🍳 부엌 (Kitchen)
 * 지하실 입구가 있는 부엌 탐색
 */

import { StoryNode } from '../../../types/story';

export const kitchenNodes: Record<string, StoryNode> = {
  // 📍 부엌 입구
  kitchen_entrance: {
    id: 'kitchen_entrance',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    speaker: 'watson',
    conditionalText: [
      {
        // 진흙 조사 완료 후 재방문
        condition: (context) => {
          return context.visitedNodes.includes('kitchen_mud_investigation') || 
                 context.visitedNodes.includes('basement_entrance') ||
                 context.visitedNodes.includes('basement_door_locked');
        },
        text: `부엌으로 돌아왔다.

낡은 나무 식탁과 찬장이 보인다.`
      },
      {
        // 부엌을 처음 방문했지만 아직 진흙은 안 본 경우
        condition: (context) => {
          return context.visitedNodes.includes('kitchen_entrance') && 
                 !context.visitedNodes.includes('kitchen_mud_investigation');
        },
        text: `부엌으로 다시 들어선다.

낡은 나무 식탁과 찬장, 오래된 화덕이 보인다.

바닥 한가운데 낡은 양탄자가 깔려있다.`
      }
    ],
    text: `부엌으로 들어선다.

낡은 나무 식탁과 찬장, 그리고 오래된 화덕이 보인다.

홈즈가 주변을 살핀다.

[홈즈]: 부엌치고는 지나치게 깨끗하군. 마지막으로 사용한 지 며칠은 지난 것 같네.

식탁 위에 빈 접시와 찻잔이 놓여있다.

바닥 한가운데 낡은 양탄자가 깔려있다. 다른 곳은 깨끗한데 그 주변만 진흙이 묻어있다.`,
    choices: [
      { text: '🔍 바닥의 진흙을 조사한다', nextNode: 'kitchen_mud_investigation', hideIfVisitedNode: 'kitchen_mud_investigation' },
      { text: '🔍 바닥을 더 자세히 살펴본다', nextNode: 'kitchen_floor_investigation', hideIfVisitedNode: 'kitchen_floor_investigation' },
      { 
        text: '양탄자를 들춰본다', 
        nextNode: 'basement_entrance',
        hideIfVisitedNode: 'basement_entrance'
      },
      { text: '찬장을 조사한다', nextNode: 'kitchen_cupboard', hideIfVisitedNode: 'kitchen_cupboard' },
      { text: '🗄️ 찬장 뒤쪽을 조사한다', nextNode: 'kitchen_cupboard_investigation', hideIfVisitedNode: 'kitchen_cupboard_investigation' },
      { text: '💬 하인들에게 말을 건다', nextNode: 'kitchen_servants_talk', hideIfVisitedNode: 'kitchen_servants_talk' },
      { text: '창문을 살펴본다', nextNode: 'kitchen_window', hideIfVisitedNode: 'kitchen_window' },
      { text: '현관으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  // 📍 부엌 바닥 진흙 조사
  kitchen_mud_investigation: {
    id: 'kitchen_mud_investigation',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    text: `홈즈가 무릎을 꿇고 바닥의 진흙을 자세히 살핀다.

[홈즈]: 왓슨, 이리 와서 보게.

당신이 다가가 진흙을 본다.

[왓슨]: 평범한 진흙 아닌가?

홈즈가 손가락으로 진흙을 만져본다.

[홈즈]: 평범하지 않아. 이 진흙은... 검은빛이 도는 갈색이야. 일반 흙보다 훨씬 습하고, 미네랄 함량이 높은 특징이 있지.

[왓슨]: 그게 무슨 의미인가?

[홈즈]: 이런 진흙은 특정 지역에서만 발견돼. 우물 근처나... 오래된 지하 공간 같은 곳에서 말이야.

홈즈가 진흙을 종이에 채취한다.

[홈즈]: 이 진흙이 양탄자 주변에만 묻어있다는 건... 흥미롭군. 기억해두게.`,
    choices: [
      { text: '다른 곳을 조사한다', nextNode: 'kitchen_entrance' }
    ]
  },

  // 📍 양탄자 밑 지하실 입구 발견
  basement_entrance: {
    id: 'basement_entrance',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 백작이나 사건에 대해 알게 된 후 (서재 방문 후, 장부 획득 후, 편지 읽은 후 등)
        condition: (context) => 
          context.visitedNodes.includes('study_room') || 
          context.visitedNodes.includes('examine_ledger') ||
          context.visitedNodes.includes('drebber_bedroom') ||
          context.visitedNodes.includes('acquire_ledger_safe_v2') ||
          context.visitedNodes.includes('acquire_ledger_well'),
        text: `양탄자를 들춰내자... 숨겨진 문이 나타난다!

무거운 철문에 견고한 자물쇠가 달려있다.

[홈즈]: 역시... 지하실 입구가 여기 있었군. 백작이 의도적으로 숨긴 거야.

자물쇠를 살펴본다. 최근에 사용된 흔적이 있다.

[홈즈]: 이 자물쇠... 최근에 열렸던 흔적이 있네. 범인이 이미 안에 있을지도 모르지!

문틈 사이로 아래를 들여다보니... 희미한 촛불 빛이 보인다.

[왓슨]: 누군가 아래에 있는 건가?

홈즈가 귀를 기울인다. 하지만 아무 소리도 들리지 않는다.

[홈즈]: 열쇠가 필요해. 백작이라면 중요한 열쇠는... 서재나 침실 같은 곳에 보관했을 거야.`
      }
    ],
    text: `양탄자를 들춰내자... 숨겨진 문이 나타난다!

무거운 철문에 견고한 자물쇠가 달려있다.

[홈즈]: 오호... 지하실이 숨겨져 있었군. 의도적으로 양탄자로 가린 것 같아.

자물쇠를 살펴본다. 최근에 사용된 흔적이 있다.

[홈즈]: 이 자물쇠... 최근에 열렸던 흔적이 있네. 누군가 이미 안에 있을지도 모르지!

문틈 사이로 아래를 들여다보니... 희미한 촛불 빛이 보인다.

[왓슨]: 누군가 아래에 있는 건가?

홈즈가 귀를 기울인다. 하지만 아무 소리도 들리지 않는다.

[홈즈]: 열쇠가 필요해. 이런 저택이라면... 서재나 침실 같은 곳에 보관했을 거야.`,
    choices: [
      { text: '지하실 열쇠로 연다', nextNode: 'open_basement', requiredItem: '지하실 열쇠' },
      { text: '자물쇠를 따본다', nextNode: 'pick_lock_fail' },
      { text: '일단 다른 곳을 더 조사한다', nextNode: 'kitchen_entrance' }
    ]
  },

  // 📍 찬장 조사
  kitchen_cupboard: {
    id: 'kitchen_cupboard',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    speaker: 'watson',
    text: `찬장을 열어본다.

낡은 그릇들과 접시, 포크와 나이프...

대부분 오래되어 녹이 슬었다. 오랫동안 사용되지 않은 것이 분명하다.

그런데... 찬장 뒤쪽에 작은 나무 상자가 하나 있다.

홈즈가 상자를 꺼내 열어본다.

안에는 오래된 편지 몇 장과... 작은 은빛 십자가 목걸이가 들어있다.

편지를 펼쳐보니... 모두 독일어로 쓰여있다.

[홈즈]: 백작이 고향에서 받은 편지들인 것 같네. 날짜를 보니... 20년 전 것들이야.`,
    choices: [
      { text: '편지를 자세히 읽어본다', nextNode: 'kitchen_old_letters' },
      { text: '십자가 목걸이를 조사한다', nextNode: 'kitchen_necklace' },
      { text: '다른 곳을 조사한다', nextNode: 'kitchen_entrance' }
    ]
  },

  // 📍 오래된 편지들
  kitchen_old_letters: {
    id: 'kitchen_old_letters',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    text: `홈즈가 독일어 편지를 읽는다.

[홈즈]: "친애하는 형제여... 그대의 죄를 신께 고하라... 1861년의 일을 잊지 말라..."

[왓슨]: 1861년... 유타에서 무슨 일이 있었던 거지?

홈즈가 다른 편지도 읽는다.

[홈즈]: "모로... 루시는 천국에서 그대를 기다리리라... 용서를 구하라..."

[홈즈]: 백작의 가족이나 친구가 보낸 것 같네. 모두 백작에게 참회를 권하는 내용이야.

[왓슨]: 백작이 뭔가 끔찍한 일을 저질렀고... 그것 때문에 평생 괴로워했다는 건가.`,
    choices: [
      { text: '십자가 목걸이도 조사한다', nextNode: 'kitchen_necklace' },
      { text: '다른 곳을 조사한다', nextNode: 'kitchen_entrance' }
    ]
  },

  // 📍 십자가 목걸이
  kitchen_necklace: {
    id: 'kitchen_necklace',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    speaker: 'watson',
    text: `작은 은빛 십자가 목걸이를 들어본다.

섬세하게 만들어진 여성용 목걸이다.

뒷면에 작은 글씨가 새겨져 있다.

"Lucy - 1860"

루시... 이 이름은 누구일까?

홈즈가 목걸이를 유심히 본다.

[홈즈]: 이것은 루시라는 여성의 것이었을 걸세. 백작이 평생 간직한 유품인 것 같아.

[왓슨]: 백작에게 중요한 사람이었나봐.

[홈즈]: 편지 내용과 합쳐보면... 백작이 루시를 잃었고, 그것이 백작의 죄책감과 관련이 있을 거야.`,
    choices: [
      { text: '다른 곳을 조사한다', nextNode: 'kitchen_entrance' }
    ]
  },

  // 📍 창문 조사
  kitchen_window: {
    id: 'kitchen_window',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    text: `창문으로 다가간다.

창문이 살짝 열려있다. 찬 공기가 들어온다.

홈즈가 창틀을 살핀다.

[홈즈]: 왓슨, 여기를 보게. 창문 손잡이에 진흙이 묻어있어.

[왓슨]: 누군가 밖에서 이 창문을 통해 들어왔다는 건가?

[홈즈]: 그럴 수도 있지. 아니면 안에서 나갔거나.

창밖을 보니... 뒷뜰이 보인다. 우물과 정원이 보인다.

[홈즈]: 범인의 침입 경로일 수도 있네. 아니면 탈출 경로이거나.

홈즈가 창문 아래 땅을 본다.

[홈즈]: 발자국이 있군. 최근의 것이야.`,
    choices: [
      { text: '발자국을 따라 뒷뜰로 간다', nextNode: 'kitchen_to_backyard' },
      { text: '부엌을 더 살펴본다', nextNode: 'kitchen_entrance' }
    ]
  },

  // 📍 부엌에서 뒷뜰로 이동
  kitchen_to_backyard: {
    id: 'kitchen_to_backyard',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'watson',
    speaker: 'watson',
    text: `부엌 창문을 통해 밖으로 나간다.

차가운 공기가 얼굴을 스친다. 뒷뜰이 눈앞에 펼쳐진다.

황량한 정원, 낡은 우물, 그리고 뒷문의 깨진 유리창이 보인다.

홈즈가 땅바닥의 발자국을 따라간다.`,
    choices: [
      { text: '뒷뜰을 조사한다', nextNode: 'back_entrance' }
    ]
  },

  // 📍 부엌 조사 후 NPC와의 대화 연결
  investigate_kitchen: {
    id: 'investigate_kitchen',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'holmes',
    speaker: 'watson',
    text: `스탠거슨의 말을 듣고 부엌으로 향한다.

홈즈가 앞장서서 부엌 문을 연다.

[홈즈]: 진흙 자국... 여기서 끝나있군. 스탠거슨 말이 맞아.

바닥을 살펴보니 깨끗하게 닦인 흔적이 있다.

[홈즈]: 누군가 흔적을 지웠군.

홈즈가 바닥 한가운데의 양탄자를 발견한다.

[홈즈]: 왓슨... 저 양탄자 아래를 봐야 할 것 같아.`,
    choices: [
      { text: '양탄자를 들춰본다', nextNode: 'basement_entrance' },
      { text: '스탠거슨에게 돌아가 더 묻는다', nextNode: 'ask_stangerson' }
    ]
  },

  // 📍 뒷뜰에서 부엌 창문으로 접근
  kitchen_window_from_backyard: {
    id: 'kitchen_window_from_backyard',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'backyard',
    character: 'holmes',
    speaker: 'watson',
    text: `부엌 창문으로 다가간다.

창문이 살짝 열려있다. 밖에서 본 것처럼, 창문 손잡이에 진흙이 묻어있다.

홈즈가 창문 아래 땅을 살핀다.

[홈즈]: 왓슨, 여기 발자국이 있네. 성인 남성의 것... 키는 175cm 정도 되겠어.

그가 돋보기로 땅을 자세히 본다.

[홈즈]: 이 발자국은 우물 쪽에서 왔어. 그리고... 이 진흙의 색깔과 질감... 우물 근처의 흙과 같군.

[왓슨]: 범인이 우물에서 와서 이 창문으로 침입했다는 건가?

[홈즈]: 가능성이 높네. 아니면 안에서 나와 우물 쪽으로 갔거나.

홈즈가 창문 안쪽을 들여다본다.

[홈즈]: 부엌이 보이는군. 하지만 여기서 무단 침입하는 건 좋은 생각이 아니야. 정문을 통해 정식으로 들어가자.`,
    choices: [
      { text: '우물을 조사하러 간다', nextNode: 'well' },
      { text: '뒷뜰로 돌아간다', nextNode: 'back_entrance' }
    ]
  },

  // 📍 뒷뜰에서 부엌으로 이동
  backyard_to_kitchen: {
    id: 'backyard_to_kitchen',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    speaker: 'watson',
    text: `열린 창문을 통해 부엌 안으로 들어선다.

나무 바닥이 삐걱거린다. 부엌 안은 고요하다.

낡은 식탁과 찬장, 그리고 바닥의 양탄자가 보인다.

홈즈가 주변을 살피며 말한다.

[홈즈]: 여기서부터 조사해보자고.`,
    choices: [
      { text: '부엌을 조사한다', nextNode: 'kitchen_entrance' }
    ]
  }
};