import { StoryNode } from '../../types/story';

/**
 * 🕯️ 백작의 참회실 (Confession Room)
 * 우물에서만 접근 가능한 백작의 사적 공간
 * 과거의 진실, 루시와의 관계, 참회 일기 등
 */

export const confessionRoomNodes: Record<string, StoryNode> = {
  // ========== 우물에서 로프로 내려가기 ==========
  well_descend: {
    id: 'well_descend',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'watson',
    text: `홈즈가 우물 벽을 살펴보더니 말한다.

[홈즈]: 왓슨, 여기 봐. 벽에 홈이 파여있어. 발판으로 쓸 수 있겠어.

[왓슨]: 설마 내려가자는 건가?

[홈즈]: 이 우물... 너무 깊지 않아. 그리고 아래쪽... 뭔가 있어. 

우물 아래를 내려다보니... 희미하게 문이 보인다.

[홈즈]: 저기, 철문이야. 지하로 연결되어 있어.

[왓슨]: 지하실로 가는 또 다른 입구란 말인가?

[홈즈]: 아마도 백작의 비밀 통로일 거야. 내려가보자.`,
    choices: [
      { text: '로프를 만들어 내려간다', nextNode: 'well_rope_descent' },
      { text: '너무 위험하다... 일단 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  well_rope_descent: {
    id: 'well_rope_descent',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    speaker: 'watson',
    text: `홈즈가 근처에서 오래된 밧줄을 찾아온다.

[홈즈]: 견고해 보이는군. 이걸로 내려가자.

밧줄을 우물 벽에 단단히 고정한다.

조심스럽게 밧줄을 잡고 우물 안으로 내려간다.

차갑고 습한 공기가 느껴진다.

5미터쯤 내려가자... 우물 벽 옆에 작은 철문이 나타난다.

[홈즈]: (아래서) 왓슨! 여기 문이 있어!

철문은 잠겨있지 않다. 홈즈가 문을 밀어 연다.

문 너머로 좁은 통로가 보인다. 희미한 촛불 빛이 새어나온다.`,
    choices: [
      { text: '철문 안으로 들어간다', nextNode: 'confession_room_entrance' }
    ]
  },

  // ========== 참회실 첫 진입 ==========
  confession_room_entrance: {
    id: 'confession_room_entrance',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    speaker: 'watson',
    text: `좁은 통로를 따라 들어가자... 작은 방이 나타난다.

석조 벽, 낮은 천장, 그리고 중앙에 놓인 낡은 나무 책상.

촛불이 타고 있다. 누군가 최근에 이곳을 사용했다.

[홈즈]: ...참회실이군.

벽에는 커다란 십자가가 걸려있고, 책상 위에는 일기장과 편지들이 놓여있다.

[왓슨]: 이곳이... 백작의 비밀 공간인가?

[홈즈]: 그렇지. 아무도 모르는 곳에서 홀로 참회하던 공간이야.

방 한쪽 벽에는 작은 액자들이 걸려있다. 사진들...`,
    choices: [
      { text: '책상 위 일기장을 조사한다', nextNode: 'confession_diary' },
      { text: '벽의 사진들을 살펴본다', nextNode: 'confession_photos' },
      { text: '편지들을 읽어본다', nextNode: 'confession_letters' },
      { text: '십자가를 조사한다', nextNode: 'confession_cross' }
    ]
  },

  // ========== 참회 일기 ==========
  confession_diary: {
    id: 'confession_diary',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    speaker: 'watson',
    text: `책상 위의 낡은 일기장을 펼친다.

1871년 1월 15일
"주여, 저를 용서하소서. 루시를 잃었습니다. 제 탐욕이 그녀를 죽였습니다."

1871년 2월 3일
"매일 밤 그녀의 목소리가 들립니다. '왜요, 백작님?' 대답할 수가 없습니다."

1871년 3월 20일
"드레버와 스탠거슨이 돌아왔습니다. 그들도 괴로워합니다. 하지만 진실을 말할 수 없습니다."

홈즈가 일기를 읽으며 말한다.

[홈즈]: 백작은... 평생 죄책감에 시달렸어. 루시의 죽음이 자신의 탓이라고 생각했지.

마지막 페이지를 넘긴다.

1891년 12월 20일 (며칠 전)
"제퍼슨 호프가 왔습니다. 복수의 시간입니다. 저는... 도망치지 않겠습니다."`,
    choices: [
      { text: '사진들을 살펴본다', nextNode: 'confession_photos' },
      { text: '편지들을 읽어본다', nextNode: 'confession_letters' },
      { text: '다른 방을 찾아본다', nextNode: 'confession_hallway_discovery' }
    ]
  },

  // ========== 벽의 사진들 ==========
  confession_photos: {
    id: 'confession_photos',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'watson',
    text: `벽에 걸린 작은 액자들을 살펴본다.

첫 번째 사진: 젊은 여성의 초상화. 아름다운 금발에 슬픈 눈빛.

뒷면에 글씨가 있다. "Lucy Louisa Ferrier - 1860"

[왓슨]: 루시...

두 번째 사진: 루시와 젊은 남자가 함께 찍은 사진. 남자는... 제퍼슨 호프다. 젊고 행복해 보인다.

세 번째 사진: 모로 백작, 드레버, 스탠거슨이 함께 있는 사진. 유타 어딘가로 보인다. 1861년.

홈즈가 사진을 유심히 본다.

[홈즈]: 왓슨, 이 사진들은... 백작이 평생 간직한 것들이야. 자신의 죄를 잊지 않기 위해.

[왓슨]: 루시와 호프... 저렇게 행복했는데...

바닥에 떨어진 로켓을 발견한다. 은빛 로켓...`,
    choices: [
      { text: '[로켓을 줍는다]', nextNode: 'confession_find_locket', item: 'locket', hideIfHasItem: 'locket' },
      { text: '편지들을 읽어본다', nextNode: 'confession_letters' },
      { text: '다른 방을 찾아본다', nextNode: 'confession_hallway_discovery' }
    ]
  },

  confession_find_locket: {
    id: 'confession_find_locket',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    speaker: 'watson',
    text: `[아이템 획득: 루시의 로켓]

바닥에 떨어진 은빛 로켓을 집어든다.

펼쳐보니 안에 작은 초상화가 들어있다. 루시의 얼굴...

뒷면에 새겨진 글씨: "Forever - J.H."

제퍼슨 호프의 것이다.

[홈즈]: 호프가 루시에게 준 로켓이야. 백작이 어떻게 이걸 갖고 있었을까?

[왓슨]: 루시가 죽은 후... 백작이 가져왔겠지.

[홈즈]: 그리고 평생 참회의 증거로 간직했어. 자신이 빼앗은 사랑을 잊지 않기 위해...

주머니에 로켓을 넣는다. 이건 중요한 증거다.`,
    choices: [
      { text: '편지들을 읽어본다', nextNode: 'confession_letters' },
      { text: '다른 방을 찾아본다', nextNode: 'confession_hallway_discovery' }
    ]
  },

  // ========== 편지들 ==========
  confession_letters: {
    id: 'confession_letters',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'watson',
    text: `책상 위의 편지들을 펼쳐본다.

첫 번째 편지 - 루시가 호프에게 쓴 편지 (미완성)

"사랑하는 제퍼슨,
백작이 아버지를 속였어요. 금광 투자는 거짓이었고... 우리 재산이 모두 사라졌어요.
저는 병에 걸렸어요. 치료비가... 제발 와주세요..."

편지는 여기서 끝난다. 눈물 자국이 있다.

두 번째 편지 - 백작이 자신에게 쓴 편지

"모로, 너는 악마다. 루시를 죽인 건 네 탐욕이다. 
용서받을 수 없다. 평생 괴로워하라."

홈즈가 말한다.

[홈즈]: 백작은... 스스로를 증오했어. 매일 이 편지들을 읽으며 자신을 벌했지.

[왓슨]: 끔찍하군...`,
    choices: [
      { text: '십자가를 조사한다', nextNode: 'confession_cross' },
      { text: '다른 방을 찾아본다', nextNode: 'confession_hallway_discovery' }
    ]
  },

  // ========== 십자가 ==========
  confession_cross: {
    id: 'confession_cross',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    speaker: 'watson',
    text: `벽에 걸린 커다란 십자가를 살펴본다.

오래되고 낡았다. 독일제로 보인다.

십자가 아래에 작은 글귀가 새겨져 있다.

"Vergebung ist unmöglich"
(용서는 불가능하다)

[홈즈]: 백작은... 스스로를 용서하지 않았어.

십자가 밑에 작은 상자가 놓여있다. 열어보니... 또 다른 편지들.

모두 호프가 백작에게 보낸 것들이다. 협박장.

"백작, 기억하시오. 루시가 당신 때문에 죽었소."
"복수의 날이 올 것이오."
"당신은 도망칠 수 없소."

[왓슨]: 호프는... 20년간 백작을 괴롭혔군.

[홈즈]: 백작도 받아들였어. 자신의 죄값이라고 생각했지.`,
    choices: [
      { text: '다른 방을 찾아본다', nextNode: 'confession_hallway_discovery' }
    ]
  },

  // ========== 메인 지하실로 가는 통로 발견 ==========
  confession_hallway_discovery: {
    id: 'confession_hallway_discovery',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'watson',
    text: `참회실을 더 살펴보니... 반대편 벽에 작은 문이 있다.

홈즈가 문을 열어본다.

[홈즈]: 왓슨, 통로가 있어.

좁은 통로가 이어진다. 촛불 빛이 저 멀리 보인다.

[홈즈]: 이 통로는... 아마 메인 지하실로 연결될 거야.

[왓슨]: 백작이 부엌에서 이곳으로 오기 위한 비밀 통로인가?

[홈즈]: 그렇지. 아무도 모르게 참회하기 위해...

통로를 따라 걸어간다. 10미터쯤 가자 넓은 공간이 나타난다.

지하실 메인 홀이다.`,
    choices: [
      { text: '지하실로 들어간다', nextNode: 'basement_hallway' }
    ]
  },

  // ========== 지하실 메인 홀 (참회실 경유) ==========
  basement_hallway: {
    id: 'basement_hallway',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    speaker: 'watson',
    text: `넓은 지하 홀에 들어선다.

석조 벽, 높은 천장, 양옆으로 여러 방들이 보인다.

촛불이 타고 있다. 최근에 누군가 이곳에 있었다.

[홈즈]: 이곳이 메인 지하실이야. 부엌에서 내려오는 입구도 저 앞에 보이는군.

왼쪽에 작은 방이 보인다. 문이 반쯤 열려있다.

안에서... 희미한 신음 소리가 들린다.

[왓슨]: 홈즈! 누가 있어!

홈즈와 함께 방으로 달려간다.`,
    choices: [
      { text: '방 안을 확인한다', nextNode: 'basement_scene' }
    ]
  }
};
