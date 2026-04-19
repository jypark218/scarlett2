// 지하실 2개 공간: 속죄실(A) + 의식실(B)
// 접근 경로: 부엌 → 속죄실, 우물 → 의식실, 속죄실 ↔ 의식실 (특수 열쇠)

import { StoryNode } from '../../../types/story';

export const basementNodes: Record<string, StoryNode> = {
  
  // ========================================
  // [A] 속죄실 (부엌에서 진입)
  // ========================================
  
  atonement_chamber_entrance: {
    id: 'atonement_chamber_entrance',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    speaker: 'watson',
    text: `계단을 조심스럽게 내려간다.

돌로 만들어진 좁은 통로... 촛불이 희미하게 타오르고 있다.

[왓슨]: 홈즈... 이곳은...

[홈즈]: 지하실이야. 하지만 일반적인 저장고가 아니야.

벽에는 이상한 상징들이 그려져 있다. 교단의 흔적...

통로 끝에 방이 하나 보인다.`,
    choices: [
      { text: '방으로 들어간다', nextNode: 'atonement_chamber_interior' },
      { text: '벽의 상징을 조사한다', nextNode: 'examine_cult_symbols' }
    ]
  },

  examine_cult_symbols: {
    id: 'examine_cult_symbols',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `벽에 그려진 상징들을 자세히 본다.

원... 십자가... 그리고 이상한 글자들...

[홈즈]: "영원한 구원 교단"의 상징이야. 유타주에서 쓰이던 것과 같아.

[왓슨]: 이곳에서... 의식을 치렀던 건가요?

[홈즈]: 아마도. 하지만 어떤 의식이었을까...

안쪽에서 희미한 빛이 보인다.`,
    choices: [
      { text: '안쪽 방으로 간다', nextNode: 'atonement_chamber_interior' }
    ]
  },

  atonement_chamber_interior: {
    id: 'atonement_chamber_interior',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 호프를 쫓아 왔을 경우
        condition: (context) => context.visitedNodes.includes('chase_hope_to_basement'),
        text: `방 안으로 들어서자... 숨이 멎는다.

돌로 만들어진 작은 방. 벽에는 커다란 초상화가 걸려있다.

젊은 여성... 루시의 얼굴이다.

그 앞에... 모로 백작이 의자에 묶여있다!

제퍼슨 호프가 백작 옆에 서 있다.

하지만... 독약은 없다. 대신 호프가 백작을 지키고 있는 모습이다.

[홈즈]: 호프! 무슨 짓을 한 겁니까?!

호프가 돌아본다.

[제퍼슨 호프]: ...탐정님들. 여긴 오지 말았어야 했는데...`
      }
    ],
    text: `방 안으로 들어서자... 소름이 돋는다.

돌로 만들어진 작은 방. 제단은 없지만... 벽에 커다란 초상화가 걸려있다.

젊은 여성의 초상화. 아름답지만 슬픈 눈빛...

초상화 밑에 명패가 있다.

**"루시 페리에 (1839-1861)"**

**"사랑하는 딸에게. 영원히 미안하오. - M.C."**

[왓슨]: 루시... 이곳은 백작이 루시를 위해 만든...

[홈즈]: 속죄실이야, 왓슨. 백작이 20년간 이곳에서 참회했던 거지.

방 한쪽에 작은 책상이 있다. 그 위에 일기장과 촛불...`,
    choices: [
      { text: '루시 초상화를 자세히 본다', nextNode: 'examine_lucy_portrait' },
      { text: '책상의 일기장을 읽는다', nextNode: 'read_count_confession' },
      { text: '방 안을 더 조사한다', nextNode: 'search_atonement_chamber' }
    ]
  },

  examine_lucy_portrait: {
    id: 'examine_lucy_portrait',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `루시의 초상화를 가까이서 본다.

22세... 너무나 젊은 나이에 세상을 떠났다.

그녀의 눈빛은 순수하지만... 어딘가 두려움이 서려있다.

이 그림은 의식 직전에 그려진 것 같다.

초상화 액자 뒤쪽에 뭔가가 끼워져 있다.

조심스럽게 꺼내보니... 작은 열쇠다.

[아이템 획득: 의식실 열쇠]

낡은 황동 열쇠. 뭔가를 여는 열쇠인 것 같다.`,
    choices: [
      { text: '열쇠를 챙긴다', nextNode: 'acquire_ritual_chamber_key' }
    ]
  },

  acquire_ritual_chamber_key: {
    id: 'acquire_ritual_chamber_key',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `열쇠를 주머니에 넣는다.

홈즈가 방을 둘러본다.

[홈즈]: 왓슨, 저기 봐. 벽에 문이 하나 더 있어.

방 구석에 철문이 하나 있다. 자물쇠가 걸려있다.

[왓슨]: 이 열쇠로 열 수 있을까요?

[홈즈]: 시도해봐야지.`,
    choices: [
      { text: '철문을 조사한다', nextNode: 'locked_door_to_ritual_chamber' },
      { text: '일기장을 먼저 읽는다', nextNode: 'read_count_confession' }
    ]
  },

  read_count_confession: {
    id: 'read_count_confession',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    speaker: 'watson',
    text: `책상 위의 일기장을 조심스럽게 펼친다.

백작의 글씨... 떨리는 필체로 쓰여있다.

---

**1861년 11월 27일**

"루시가 죽었다. 내 손으로... 내 광신이... 순수한 영혼을 죽였다."

"제단에 피가 너무 많았다. 산후 출혈... 스탠거슨이 막을 수 없었다."

"나는... 신의 계시라고 믿었다. 하지만 신은... 나를 저주했다."

---

**1861년 12월 1일**

"아기... 엘렌을 데려왔다. 호프가 찾기 전에..."

"이 아이만은... 지켜야 한다. 루시의 딸을... 내가 키우겠다."

---

**1881년 10월 15일**

"20년이 지났다. 엘렌은 아름답게 자랐다. 루시를 닮았다."

"하지만... 나는 용서받을 수 없다."

"이 속죄실에서... 매일 루시에게 용서를 빈다."

---

당신은 일기를 덮는다. 손이 떨린다.`,
    choices: [
      { text: '홈즈에게 일기를 보여준다', nextNode: 'holmes_reads_confession' },
      { text: '철문을 조사한다', nextNode: 'locked_door_to_ritual_chamber' }
    ]
  },

  holmes_reads_confession: {
    id: 'holmes_reads_confession',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `홈즈가 일기를 읽는다.

그의 표정이 굳어진다.

[홈즈]: ...백작은 진심으로 후회했군. 20년간...

[왓슨]: 하지만 루시는 돌아오지 않습니다.

[홈즈]: 그래. 속죄가 죄를 지우지는 못하지. 하지만...

그가 엘렌의 이름을 다시 본다.

[홈즈]: 엘렌을 보호한 건... 백작이 할 수 있는 유일한 구원이었어.

방 구석의 철문에서 소리가 들린다.`,
    choices: [
      { text: '철문을 조사한다', nextNode: 'locked_door_to_ritual_chamber' }
    ]
  },

  search_atonement_chamber: {
    id: 'search_atonement_chamber',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `방 안을 자세히 조사한다.

책상 서랍에는 오래된 편지들... 루시가 백작에게 보낸 편지들이다.

"제발... 아버지를 풀어주세요..."

"저는... 호프를 사랑합니다..."

"제 아이를... 제발..."

벽 한쪽에는 흰 드레스가 걸려있다. 결혼 드레스... 아니, 의식용 드레스.

피 자국이 남아있다.

[왓슨]: 이건... 루시가 입었던...

[홈즈]: 백작이 보관하고 있었군. 증거이자... 죄의 상징으로.

방 구석에 철문이 하나 더 보인다.`,
    choices: [
      { text: '철문을 조사한다', nextNode: 'locked_door_to_ritual_chamber' },
      { text: '편지를 더 읽는다', nextNode: 'read_lucy_letters' }
    ]
  },

  read_lucy_letters: {
    id: 'read_lucy_letters',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `루시의 편지를 읽는다. 눈물이 날 것 같다.

---

**1861년 11월 18일**

"백작님... 제발 아버지를 풀어주세요. 아버지는 아무 죄도 없습니다."

"제가 의식을 받겠습니다. 대신 아버지와 호프를 풀어주세요."

---

**1861년 11월 22일 (출산 2일 후)**

"엘렌이 태어났습니다. 제 딸... 제 전부..."

"백작님, 부탁드립니다. 엘렌만은... 지켜주세요..."

---

마지막 편지는 여기서 끝난다.

3일 후... 루시는 제단에서 죽었다.

하지만 백작은... 약속을 지켰다. 엘렌을 지켰다.`,
    choices: [
      { text: '편지를 조심스럽게 챙긴다', nextNode: 'acquire_lucy_final_letters' }
    ]
  },

  acquire_lucy_final_letters: {
    id: 'acquire_lucy_final_letters',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `[아이템 획득: 루시의 마지막 편지]

편지를 조심스럽게 주머니에 넣는다.

이것은... 루시의 마지막 목소리다.

홈즈가 방 구석을 가리킨다.

[홈즈]: 왓슨, 저기. 철문이 있어.`,
    choices: [
      { text: '철문을 조사한다', nextNode: 'locked_door_to_ritual_chamber' }
    ]
  },

  // ========================================
  // 두 공간 사이 잠긴 문
  // ========================================

  locked_door_to_ritual_chamber: {
    id: 'locked_door_to_ritual_chamber',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    conditionalText: [
      {
        // 의식실 열쇠를 가지고 있는 경우
        condition: { hasItem: '의식실 열쇠' },
        text: `철문 앞에 선다. 무거운 자물쇠가 걸려있다.

[홈즈]: 루시 초상화 뒤에서 찾은 열쇠... 이 문을 여는 거였군.

[왓슨]: 이 문 너머에 뭐가 있을까요?

[홈즈]: 모르겠어. 하지만... 백작이 이렇게 숨겨놨다는 건...

문틈 사이로 희미한 촛불 빛이 보인다.

안쪽에서 냄새가 난다. 향... 그리고 피의 냄새...`
      }
    ],
    text: `방 구석의 철문을 조사한다.

무거운 자물쇠가 걸려있다. 특수한 열쇠가 필요해 보인다.

[홈즈]: 이 문... 최근에 열렸던 흔적이 있어.

문틈 사이로 희미한 빛이 보인다.

[왓슨]: 저 너머에 뭐가 있을까요?

[홈즈]: 루시 초상화를 다시 확인해봐. 혹시 열쇠가 숨겨져 있을지도...`,
    choices: [
      { text: '열쇠로 문을 연다', nextNode: 'open_ritual_chamber_door', requiredItem: '의식실 열쇠' },
      { text: '루시 초상화를 다시 확인한다', nextNode: 'examine_lucy_portrait', hideIfHasItem: '의식실 열쇠' },
      { text: '문을 따고 들어간다', nextNode: 'try_break_door' }
    ]
  },

  try_break_door: {
    id: 'try_break_door',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `문을 밀어보지만... 꿈쩍도 하지 않는다.

[홈즈]: 특수 자물쇠야. 폭력으로는 열 수 없어.

[왓슨]: 열쇠가 어딘가에 있을 텐데...

[홈즈]: 백작이라면... 루시와 관련된 곳에 숨겨놨을 거야.

루시 초상화가 의미심장하게 보인다.`,
    choices: [
      { text: '루시 초상화를 조사한다', nextNode: 'examine_lucy_portrait', hideIfHasItem: '의식실 열쇠' },
      { text: '속죄실로 돌아간다', nextNode: 'atonement_chamber_interior' }
    ]
  },

  open_ritual_chamber_door: {
    id: 'open_ritual_chamber_door',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    speaker: 'watson',
    text: `의식실 열쇠를 자물쇠에 끼운다.

찰칵!

문이 천천히 열린다.

[홈즈]: 조심해, 왓슨.

문 너머로... 더 큰 공간이 보인다.

촛불이 원형으로 배치되어 있고... 제단이 보인다.

[왓슨]: 이곳이... 진짜 의식실...

등골이 오싹해진다.`,
    choices: [
      { text: '의식실로 들어간다', nextNode: 'ritual_chamber_interior' }
    ]
  },

  // ========================================
  // [B] 의식실 (우물 터널 or 속죄실 연결)
  // ========================================

  ritual_chamber_interior: {
    id: 'ritual_chamber_interior',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 백작을 여기서 발견하는 경우
        condition: (context) => 
          context.visitedNodes.includes('chase_hope_to_basement') &&
          !context.visitedNodes.includes('basement_scene'),
        text: `의식실 안으로 들어서자... 숨이 멎는다.

넓은 돌방. 벽에는 교단의 상징들이 가득하다.

중앙에 제단... 촛불이 원형으로 놓여있다.

그리고 제단 옆에...

모로 백작이 의자에 묶여있다!

제퍼슨 호프가 백작을 지키고 서 있다.

[홈즈]: 호프!

호프가 돌아본다.

[제퍼슨 호프]: ...왔군요, 탐정.`
      }
    ],
    text: `의식실 안으로 들어선다.

넓은 돌로 만들어진 방... 천장이 높고 음산하다.

중앙에 돌로 만든 제단이 있다. 그 위에는 하얀 천이 깔려있고...

피 자국이 남아있다. 20년 전의 피...

촛불이 원형으로 배치되어 있다. 12개... 교단의 숫자.

벽에는 이상한 상징들이 그려져 있다.

**"영원한 신부 의식"**의 흔적들...

[왓슨]: 이곳에서... 루시가...

[홈즈]: 그래. 20년 전... 이 제단에서 의식이 거행됐어.

제단 옆에 작은 탁자가 있다. 그 위에 의식 도구들이 놓여있다.`,
    choices: [
      { text: '제단을 조사한다', nextNode: 'examine_ritual_altar' },
      { text: '의식 도구를 조사한다', nextNode: 'examine_ritual_tools' },
      { text: '벽의 상징을 조사한다', nextNode: 'examine_ritual_symbols' },
      { text: '방 안을 둘러본다', nextNode: 'search_ritual_chamber' }
    ]
  },

  examine_ritual_altar: {
    id: 'examine_ritual_altar',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `제단을 가까이서 본다.

하얀 천... 하지만 피 자국이 남아있다.

홈즈가 천을 들춰낸다.

[홈즈]: 산후 출혈... 루시는 이 제단 위에서...

당신은 입을 다물 수 없다.

제단 위에 작은 글씨가 새겨져 있다.

**"신의 신부여, 영원한 구원을 받으소서"**

[왓슨]: 광기군요...

제단 옆에 뭔가가 떨어져 있다. 하얀 천 조각...

최근 것이다.`,
    choices: [
      { text: '천 조각을 조사한다', nextNode: 'examine_white_cloth' },
      { text: '의식 도구를 본다', nextNode: 'examine_ritual_tools' }
    ]
  },

  examine_white_cloth: {
    id: 'examine_white_cloth',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `하얀 천 조각을 집어든다.

홈즈가 빛에 비춰본다.

[홈즈]: 이건... 최근 것이야. 며칠 전...

[왓슨]: 누군가 이곳에서 의식을 준비했다는 건가요?

[홈즈]: 그래. 그리고 이 천의 크기로 봐서...

그가 당신을 본다.

[홈즈]: 드레스야. 신부 드레스... 새로운 희생자를 위한...

[왓슨]: 설마... 엘렌?!

홈즈가 고개를 끄덕인다.`,
    choices: [
      { text: '증거를 챙긴다', nextNode: 'acquire_ritual_cloth_evidence' }
    ]
  },

  acquire_ritual_cloth_evidence: {
    id: 'acquire_ritual_cloth_evidence',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `[아이템 획득: 의식용 천 조각]

천 조각을 주머니에 넣는다.

[왓슨]: 백작이... 다시 의식을 치르려 했던 건가요?

[홈즈]: 아니면... 누군가 백작을 이용하려 했거나.

[왓슨]: 엘렌을 새로운 "영원한 신부"로...

생각만 해도 소름이 돋는다.

의식 도구 탁자 위에 뭔가가 더 있다.`,
    choices: [
      { text: '의식 도구를 조사한다', nextNode: 'examine_ritual_tools' },
      { text: '방을 더 살핀다', nextNode: 'search_ritual_chamber' }
    ]
  },

  examine_ritual_tools: {
    id: 'examine_ritual_tools',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `탁자 위의 도구들을 본다.

낡은 성경... 교단의 기도문이 적혀있다.

은으로 만든 잔... 의식용 포도주를 담는 것 같다.

촛불... 그리고 향로...

홈즈가 성경을 펼친다.

[홈즈]: "영원한 신부 의식"... 여기 순서가 적혀있어.

[왓슨]: 어떤 내용입니까?

[홈즈]: ...읽고 싶지 않군. 광신의 기록이야.

하지만 마지막 페이지에 메모가 있다.

필체가 다르다. 최근에 쓴 것 같다.`,
    choices: [
      { text: '메모를 읽는다', nextNode: 'read_ritual_note' },
      { text: '다른 곳을 조사한다', nextNode: 'search_ritual_chamber' }
    ]
  },

  read_ritual_note: {
    id: 'read_ritual_note',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `메모를 조심스럽게 읽는다.

---

**1881년 11월 15일 (2주 전)**

"엘렌을 위한 의식 준비"

"루시의 혼을 이어받을 새로운 신부"

"11월 20일 - 엘렌의 생일"

"그날... 의식을 완성한다"

---

필체를 보니... 백작의 글씨가 아니다.

[홈즈]: 이건... 백작이 쓴 게 아니야.

[왓슨]: 그럼 누가?

홈즈가 메모를 자세히 본다.

[홈즈]: 스탠거슨... 아니면 드레버...

[왓슨]: 누군가 백작을 이용해 엘렌을 의식에...

끔찍한 계획이다.`,
    choices: [
      { text: '메모를 증거로 챙긴다', nextNode: 'acquire_ritual_note' }
    ]
  },

  acquire_ritual_note: {
    id: 'acquire_ritual_note',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    text: `[아이템 획득: 의식 계획 메모]

메모를 챙긴다. 중요한 증거다.

[홈즈]: 이제 명확해졌어, 왓슨.

[왓슨]: 무엇이요?

[홈즈]: 백작 실종 사건의 진짜 이유.

[홈즈]: 누군가 11월 20일에 의식을 치르려 했어. 엘렌을 희생양으로.

[왓슨]: 그리고 호프가 그걸 알아냈고...

[홈즈]: 백작을 감금해서 의식을 막은 거야.

모든 퍼즐이 맞춰지기 시작한다.`,
    choices: [
      { text: '방을 더 조사한다', nextNode: 'search_ritual_chamber' },
      { text: '속죄실로 돌아간다', nextNode: 'return_to_atonement_chamber' }
    ]
  },

  examine_ritual_symbols: {
    id: 'examine_ritual_symbols',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `벽의 상징들을 자세히 본다.

원... 십자가... 그리고 이상한 글자들...

[홈즈]: "영원한 구원 교단"의 상징이야. 유타주에서 사용하던 것과 동일해.

[왓슨]: 백작이 유타에서 가져온 건가요?

[홈즈]: 그래. 교단의 의식을 그대로 재현한 거야.

상징 아래에 작은 글씨가 새겨져 있다.

**"1861년 11월 25일 - 루시 페리에"**

**"1881년 11월 20일 - ?"**

물음표... 누군가 새로운 이름을 새기려 했다.`,
    choices: [
      { text: '사진을 찍어 증거로 남긴다', nextNode: 'document_symbols' },
      { text: '다른 곳을 조사한다', nextNode: 'search_ritual_chamber' }
    ]
  },

  document_symbols: {
    id: 'document_symbols',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `상징들을 스케치북에 그린다.

[왓슨]: 이것도 증거로 남겨야겠습니다.

[홈즈]: 잘했어. 이 상징들이 교단과의 연결고리를 증명해줄 거야.

[아이템 획득: 교단 상징 스케치]

방 안을 더 둘러본다.`,
    choices: [
      { text: '제단을 조사한다', nextNode: 'examine_ritual_altar', hideIfVisitedNode: 'examine_ritual_altar' },
      { text: '방 전체를 살핀다', nextNode: 'search_ritual_chamber' }
    ]
  },

  search_ritual_chamber: {
    id: 'search_ritual_chamber',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `방 전체를 조사한다.

벽 한쪽에 옷장이 있다. 열어보니... 하얀 드레스가 걸려있다.

새것이다. 최근에 만든 것 같다.

[홈즈]: 엘렌을 위한 드레스야...

드레스 주머니에서 작은 종이가 나온다.

"엘렌에게 - 11월 20일 저녁 6시, 이곳으로 오시오. 중요한 이야기가 있소. - 아버지"

[왓슨]: 백작이 엘렌을 이곳으로 부르려 했던 건가요?

[홈즈]: 아니야. 이 필체... 위조야.

누군가 백작을 사칭해서 엘렌을 이곳으로 유인하려 했던 거다.

방 반대편에 또 다른 문이 보인다.`,
    choices: [
      { text: '드레스와 편지를 증거로 챙긴다', nextNode: 'acquire_dress_evidence' },
      { text: '반대편 문을 조사한다', nextNode: 'examine_tunnel_door' }
    ]
  },

  acquire_dress_evidence: {
    id: 'acquire_dress_evidence',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `[아이템 획득: 의식용 드레스]
[아이템 획득: 위조된 편지]

증거들을 조심스럽게 챙긴다.

[왓슨]: 이제 확실합니다. 누군가 계획적으로...

[홈즈]: 엘렌을 의식의 희생양으로 만들려 했어.

[홈즈]: 그리고 호프가 그걸 알아냈고, 백작을 감금해서 의식을 막은 거야.

[왓슨]: 그럼 호프는... 범인이 아니라 구원자?

홈즈가 고개를 끄덕인다.

반대편 문에서 바람 소리가 들린다.`,
    choices: [
      { text: '반대편 문을 조사한다', nextNode: 'examine_tunnel_door' }
    ]
  },

  examine_tunnel_door: {
    id: 'examine_tunnel_door',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `방 반대편의 문을 조사한다.

철문... 하지만 이쪽은 열려있다.

문 너머로 터널이 보인다.

[홈즈]: 이 터널... 어디로 이어질까?

차가운 바람이 불어온다.

[왓슨]: 밖으로 통하는 것 같습니다.

[홈즈]: 우물... 우물로 이어지는 터널이야!

[왓슨]: 그럼 이 의식실은 우물에서도 접근할 수 있다는 건가요?

[홈즈]: 그래. 두 개의 진입로... 부엌과 우물.

호프가 이 구조를 알고 있었을 거야.`,
    choices: [
      { text: '터널을 따라 우물로 간다', nextNode: 'tunnel_to_well' },
      { text: '속죄실로 돌아간다', nextNode: 'return_to_atonement_chamber' },
      { text: '의식실에 머문다', nextNode: 'stay_in_ritual_chamber' }
    ]
  },

  tunnel_to_well: {
    id: 'tunnel_to_well',
    day: 1,
    timeOfDay: 'evening',
    location: 'garden',
    character: 'holmes',
    text: `터널을 따라 걷는다.

좁고 어두운 통로... 돌계단이 위로 이어진다.

올라가니... 우물 안쪽이다!

[홈즈]: 역시. 우물이 비밀 통로였어.

우물 위로 올라간다. 정원이 보인다.

[왓슨]: 호프가 이 경로를 알고 있었다면...

[홈즈]: 백작을 의식실로 데려가기 쉬웠겠지.

이제 저택 구조가 명확해진다.`,
    choices: [
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' },
      { text: '지하실로 돌아간다', nextNode: 'ritual_chamber_interior' }
    ]
  },

  return_to_atonement_chamber: {
    id: 'return_to_atonement_chamber',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `의식실을 나와 속죄실로 돌아온다.

루시의 초상화가 다시 보인다.

이제 모든 것이 이해된다.

속죄실 - 백작의 참회 공간
의식실 - 광기의 현장

두 공간 사이의 잠긴 문...

백작은 과거와 현재를 분리하려 했던 거다.`,
    choices: [
      { text: '계단으로 올라간다', nextNode: 'exit_basement_to_kitchen' },
      { text: '의식실로 다시 간다', nextNode: 'ritual_chamber_interior' }
    ]
  },

  stay_in_ritual_chamber: {
    id: 'stay_in_ritual_chamber',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `의식실에 머물며 증거를 정리한다.

[홈즈]: 왓슨, 이제 정리해보자.

[홈즈]: 1. 누군가 엘렌을 의식 희생양으로 만들려 했어.
[홈즈]: 2. 호프가 그 계획을 알아냈어.
[홈즈]: 3. 호프는 백작을 감금해서 의식을 막았어.

[왓슨]: 그럼 호프는 범인이 아니라...

[홈즈]: 엘렌의 구원자야. 자신의 딸을 지키려 한 거지.

모든 것이 명확해진다.`,
    choices: [
      { text: '증거를 정리하고 위로 올라간다', nextNode: 'exit_basement_to_kitchen' },
      { text: '호프를 찾아야 한다', nextNode: 'search_for_hope_after_basement' }
    ]
  },

  exit_basement_to_kitchen: {
    id: 'exit_basement_to_kitchen',
    day: 1,
    timeOfDay: 'evening',
    location: 'kitchen',
    speaker: 'watson',
    text: `지하실을 나와 부엌으로 올라온다.

양탄자 아래 숨겨진 입구... 이제는 열려있다.

[홈즈]: 호프가 이 입구를 알고 있었어.

[왓슨]: 백작을 이곳으로 데려와 감금했군요.

[홈즈]: 그래. 의식을 막기 위해서.

이제 호프를 찾아야 한다.`,
    choices: [
      { text: '호프를 찾으러 간다', nextNode: 'search_for_hope_after_basement' },
      { text: '현관으로 간다', nextNode: 'main_entrance' }
    ]
  },

  search_for_hope_after_basement: {
    id: 'search_for_hope_after_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `호프를 찾아 저택을 둘러본다.

[홈즈]: 지하실에 없다면... 어디 갔을까?

[왓슨]: 우물? 아니면...

저택 밖에서 마차 소리가 들린다.

[홈즈]: 저건...!

창밖을 보니 호프가 마차에 올라타고 있다.

떠나려는 것 같다!`,
    choices: [
      { text: '뛰어가서 호프를 막는다', nextNode: 'stop_hope_leaving' },
      { text: '조용히 따라간다', nextNode: 'follow_hope_quietly' }
    ]
  },

  stop_hope_leaving: {
    id: 'stop_hope_leaving',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `저택 밖으로 뛰어나가 호프를 붙잡는다.

[왓슨]: 호프! 기다리시오!

호프가 돌아본다. 그의 눈에는 눈물이 맺혀있다.

[제퍼슨 호프]: ...탐정. 방해하지 마시오.

[왓슨]: 지하실에서 모든 걸 봤습니다. 당신은...

[제퍼슨 호프]: 제가 뭘 했는지 아십니까?

그가 고개를 숙인다.

[제퍼슨 호프]: 백작을 감금했소. 딸을 지키기 위해...

홈즈가 다가온다.`,
    choices: [
      { text: '호프와 대화한다', nextNode: 'hope_confession_after_basement' }
    ]
  },

  follow_hope_quietly: {
    id: 'follow_hope_quietly',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `조용히 호프를 따라간다.

그는 마차를 타고... 우물 쪽으로 간다.

[홈즈]: 우물... 왜 거기로?

마차가 멈춘다. 호프가 내려 우물가에 앉는다.

그는... 루시를 그리워하는 것 같다.

[왓슨]: 다가가시겠습니까?

[홈즈]: ...잠깐만 기다려보자.`,
    choices: [
      { text: '호프에게 다가간다', nextNode: 'approach_hope_at_well' },
      { text: '계속 지켜본다', nextNode: 'observe_hope_at_well' }
    ]
  },

  approach_hope_at_well: {
    id: 'approach_hope_at_well',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `조심스럽게 호프에게 다가간다.

[왓슨]: ...호프.

그가 돌아본다. 놀라지 않는다.

[제퍼슨 호프]: 알고 있었소. 따라오는 것을.

[왓슨]: 지하실에서... 모든 걸 봤습니다.

호프가 우물을 바라본다.

[제퍼슨 호프]: 이곳... 루시와 마지막으로 만난 곳이오.

[제퍼슨 호프]: 20년 전... 그녀가 저에게 말했죠.

[제퍼슨 호프]: "엘렌을 부탁해요..."

그가 눈물을 흘린다.`,
    choices: [
      { text: '엘렌을 지켰다고 말한다', nextNode: 'hope_protected_ellen' },
      { text: '진실을 물어본다', nextNode: 'ask_hope_full_truth' }
    ]
  },

  observe_hope_at_well: {
    id: 'observe_hope_at_well',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    text: `조용히 호프를 지켜본다.

그는 우물가에 앉아... 뭔가를 꺼낸다.

반지... 루시의 반지를 바라본다.

[제퍼슨 호프]: 루시... 지켰소. 우리 딸을...

그가 흐느낀다.

홈즈가 속삭인다.

[홈즈]: 20년의 고통... 하지만 딸을 지켰군.

이제 다가가야 할 때다.`,
    choices: [
      { text: '호프에게 다가간다', nextNode: 'approach_hope_at_well' }
    ]
  },

  hope_protected_ellen: {
    id: 'hope_protected_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `"당신은 엘렌을 지켰습니다." 당신이 말한다.

호프가 당신을 본다.

[제퍼슨 호프]: ...지켰다고요?

[왓슨]: 의식을 막았습니다. 백작을 감금해서.

[제퍼슨 호프]: 하지만... 저는... 범죄를...

[왓슨]: 딸을 구했습니다.

호프가 주저앉는다.

[제퍼슨 호프]: 엘렌... 제 딸...

[제퍼슨 호프]: 20년간... 죽었다고 믿었소...

[제퍼슨 호프]: 그런데 살아있었고... 또 위험에 처했고...

그가 눈물을 흘린다.`,
    choices: [
      { text: '호프를 위로한다', nextNode: 'comfort_hope_final' },
      { text: '백작에 대해 묻는다', nextNode: 'ask_about_count_location' }
    ]
  },

  ask_hope_full_truth: {
    id: 'ask_hope_full_truth',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `"진실을 말해주십시오. 전부."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: ...좋소. 이제 숨길 이유도 없군요.

그가 깊게 숨을 쉰다.

[제퍼슨 호프]: 2주 전... 엘렌이 찾아왔소.

[왓슨]: 엘렌이?!

[제퍼슨 호프]: 네. 그녀가... 백작의 계획을 알게 됐다고...

[제퍼슨 호프]: 11월 20일... 그녀의 생일에...

[제퍼슨 호프]: "영원한 신부 의식"을 치른다고...

당신은 숨이 멎는다.`,
    choices: [
      { text: '계속 듣는다', nextNode: 'hope_full_confession' }
    ]
  },

  hope_full_confession: {
    id: 'hope_full_confession',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    text: `호프가 떨리는 목소리로 계속한다.

[제퍼슨 호프]: 엘렌이 말했소... 의식실을 봤다고...

[제퍼슨 호프]: 자신을 위한 드레스가 준비되어 있었다고...

[제퍼슨 호프]: 그 순간... 깨달았소.

[제퍼슨 호프]: 루시처럼... 내 딸도...

그가 주먹을 쥔다.

[제퍼슨 호프]: 그래서 결심했소.

[제퍼슨 호프]: 백작을 막겠다고.

[제퍼슨 호프]: 의식을 절대 치르지 못하게...

[왓슨]: 그래서 백작을 감금한 겁니까?

호프가 고개를 끄덕인다.`,
    choices: [
      { text: '백작은 어디 있습니까?', nextNode: 'ask_about_count_location' },
      { text: '엘렌은 안전합니까?', nextNode: 'ask_about_ellen_safety' }
    ]
  },

  ask_about_count_location: {
    id: 'ask_about_count_location',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `"백작은 어디 있습니까?"

호프가 지하실을 가리킨다.

[제퍼슨 호프]: ...속죄실에.

[왓슨]: 속죄실?

[제퍼슨 호프]: 루시의 초상화가 있는 곳... 백작이 참회하던 곳...

[제퍼슨 호프]: 거기에 가뒀소. 아이러니하게도.

[왓슨]: 백작은 무사합니까?

[제퍼슨 호프]: ...살아있소. 해치지 않았소.

[제퍼슨 호프]: 다만... 의식을 못하게 묶어뒀을 뿐...

홈즈가 당신을 본다.`,
    choices: [
      { text: '백작을 구하러 간다', nextNode: 'rescue_count_from_basement' },
      { text: '엘렌에 대해 먼저 묻는다', nextNode: 'ask_about_ellen_safety' }
    ]
  },

  ask_about_ellen_safety: {
    id: 'ask_about_ellen_safety',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    text: `"엘렌은 안전합니까?"

호프가 고개를 끄덕인다.

[제퍼슨 호프]: 안전한 곳에 숨겼소.

[왓슨]: 어디에?

[제퍼슨 호프]: ...제 오두막에. 마을 외곽...

[제퍼슨 호프]: 아무도 찾지 못할 곳이오.

[홈즈]: 엘렌은 모든 걸 알고 있습니까?

호프가 고개를 숙인다.

[제퍼슨 호프]: ...네. 제가... 자신의 친아버지라는 것도...

[제퍼슨 호프]: 루시의 딸이라는 것도...

[제퍼슨 호프]: 모두 말했소.`,
    choices: [
      { text: '엘렌을 데려와야 합니다', nextNode: 'suggest_bring_ellen' },
      { text: '백작을 먼저 구합니다', nextNode: 'rescue_count_from_basement' }
    ]
  },

  suggest_bring_ellen: {
    id: 'suggest_bring_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `"엘렌을 데려와야 합니다."

호프가 고개를 젓는다.

[제퍼슨 호프]: 아니오... 위험하오...

[왓슨]: 백작을 구하면 모든 게 끝납니다.

[제퍼슨 호프]: 백작을... 구한다고?

[홈즈]: 그래요. 백작도 피해자일 수 있습니다.

호프가 혼란스러워한다.

[제퍼슨 호프]: 하지만... 백작이 의식을...

[홈즈]: 확인이 필요합니다. 함께 가시죠.`,
    choices: [
      { text: '호프와 함께 지하실로 간다', nextNode: 'return_to_basement_with_hope' }
    ]
  },

  rescue_count_from_basement: {
    id: 'rescue_count_from_basement',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `"백작을 구하러 가겠습니다."

호프가 당신을 붙잡는다.

[제퍼슨 호프]: 기다리시오!

[왓슨]: 왜요?

[제퍼슨 호프]: ...함께 가겠소.

[제퍼슨 호프]: 백작과... 대면해야 할 때가 온 것 같소.

홈즈가 고개를 끄덕인다.

[홈즈]: 좋습니다. 함께 가시죠.

셋이서 저택으로 향한다.`,
    choices: [
      { text: '지하실로 간다', nextNode: 'return_to_basement_with_hope' }
    ]
  },

  return_to_basement_with_hope: {
    id: 'return_to_basement_with_hope',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'hope',
    text: `호프와 함께 지하실로 내려간다.

속죄실... 루시의 초상화가 보인다.

그리고... 의자에 묶인 백작.

모로 백작이 고개를 든다.

[모로 백작]: ...호프...

[제퍼슨 호프]: 백작.

20년 만의 대면.

공기가 얼어붙는다.`,
    choices: [
      { text: '두 사람의 대화를 지켜본다', nextNode: 'basement_scene' },
      { text: '백작을 풀어준다', nextNode: 'free_count_immediately' }
    ]
  },

  free_count_immediately: {
    id: 'free_count_immediately',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `당신이 백작에게 다가가 밧줄을 푼다.

[모로 백작]: 감사하오... 박사님...

백작이 일어선다. 몸이 많이 약해졌다.

[모로 백작]: 호프... 미안하오...

호프가 백작을 본다. 복잡한 감정이 교차한다.

[제퍼슨 호프]: ...

침묵이 흐른다.

홈즈가 두 사람을 본다.`,
    choices: [
      { text: '대화를 유도한다', nextNode: 'mediate_count_hope_talk' },
      { 
        text: '의식에 대해 묻는다', 
        nextNode: 'ask_count_about_ritual',
        requiredVisitedNode: 'examine_ritual_tools' // 🆕 조건부 해금
      }
    ]
  },

  mediate_count_hope_talk: {
    id: 'mediate_count_hope_talk',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"두 분... 대화가 필요합니다."

백작과 호프가 서로를 본다.

[모로 백작]: ...호프. 20년... 오래 기다렸소.

[제퍼슨 호프]: ...복수를 위해 왔소.

[모로 백작]: 알고 있소. 당연한 일이지.

[제퍼슨 호프]: 하지만...

호프가 루시 초상화를 본다.

[제퍼슨 호프]: ...엘렌을 키워줬소. 20년간.

백작이 고개를 끄덕인다.

[모로 백작]: 루시가... 부탁했소. 마지막 순간...`,
    choices: [
      { text: '계속 듣는다', nextNode: 'count_lucy_final_words' }
    ]
  },

  ask_count_about_ritual: {
    id: 'ask_count_about_ritual',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    speaker: 'watson',
    text: `"백작, 의식에 대해 말해주십시오."

백작이 놀란다.

[모로 백작]: 의식...? 무슨 의식을?

[왓슨]: 엘렌을 위한 "영원한 신부 의식"입니다.

백작의 얼굴이 창백해진다.

[모로 백작]: 그... 그건... 제가 아니오!

[제퍼슨 호프]: 거짓말!

[모로 백작]: 아니오! 저는... 절대...!

백작이 흐느낀다.

[모로 백작]: 루시를 잃은 후... 다시는 의식을... 절대...

그가 진심인 것 같다.`,
    choices: [
      { text: '증거를 보여준다', nextNode: 'show_ritual_evidence_to_count' },
      { text: '호프에게 묻는다', nextNode: 'ask_hope_about_ritual' }
    ]
  },

  show_ritual_evidence_to_count: {
    id: 'show_ritual_evidence_to_count',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    conditionalText: [
      {
        condition: { hasItem: '의식 계획 메모' },
        text: `의식 계획 메모를 백작에게 보여준다.

백작이 메모를 읽더니... 충격을 받는다.

[모로 백작]: 이... 이건... 제 글씨가 아니오!

[홈즈]: 누구의 글씨입니까?

백작이 떨리는 손으로 메모를 본다.

[모로 백작]: 이건... 스탠거슨... 아니면...

[모로 백작]: 아니오... 설마...

그가 고개를 젓는다.

[모로 백작]: 누군가 저를... 이용하려 했군요...`
      }
    ],
    text: `의식실에서 찾은 증거들을 백작에게 보여준다.

하얀 드레스... 위조된 편지...

백작이 보더니 충격을 받는다.

[모로 백작]: 이... 이런...!

[왓슨]: 아십니까?

[모로 백작]: 저는... 이런 걸 준비한 적이 없소!

[모로 백작]: 누군가... 저를 이용해서...

그가 엘렌의 이름을 보고 흐느낀다.`,
    choices: [
      { text: '누가 했는지 묻는다', nextNode: 'ask_count_suspect' },
      { text: '호프를 본다', nextNode: 'hope_reaction_to_truth' }
    ]
  },

  ask_count_suspect: {
    id: 'ask_count_suspect',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `"누가 이런 짓을 을까요?"

백작이 생각에 잠긴다.

[모로 백작]: ...의식실에 접근할 수 있는 사람은...

[모로 백작]: 스태너슨... 그는 이 저택의 구조를 알고...

[모로 백작]: 드레버... 그는 교단에 원한이...

[모로 백작]: 아니면...

그가 고개를 젓는다.

[모로 백작]: 확실하지 않소. 하지만...

[모로 백작]: 엘렌을 노린 건 분명하오.

호프가 주먹을 쥔다.`,
    choices: [
      { text: '호프를 본다', nextNode: 'hope_reaction_to_truth' },
      { text: '범인을 찾아야 한다', nextNode: 'plan_to_find_culprit' }
    ]
  },

  hope_reaction_to_truth: {
    id: 'hope_reaction_to_truth',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'hope',
    text: `호프가 백작을 본다.

[제퍼슨 호프]: ...백작이 아니었소?

백작이 고개를 끄덕인다.

[모로 백작]: 저는... 20년간 속죄했소.

[모로 백작]: 다시는... 그런 광기에 빠지지 않겠다고...

[모로 백작]: 엘렌은... 제가 지켜야 할 딸이오.

호프가 주저앉는다.

[제퍼슨 호프]: 그럼... 제가...

[제퍼슨 호프]: 잘못 판단한 건가...

홈즈가 두 사람을 본다.`,
    choices: [
      { text: '두 사람을 화해시킨다', nextNode: 'reconcile_count_and_hope' },
      { text: '범인을 찾아야 한다', nextNode: 'plan_to_find_culprit' }
    ]
  },

  reconcile_count_and_hope: {
    id: 'reconcile_count_and_hope',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"두 분 모두... 엘렌을 사랑합니다."

백작과 호프가 당신을 본다.

[왓슨]: 백작은 20년간 엘렌을 키웠고...

[왓슨]: 호프는 엘렌을 의식에서 구했습니다.

[왓슨]: 두 분 모두... 아버지입니다.

백작이 호프에게 손을 내민다.

[모로 백작]: 호프... 미안하오. 루시를...

호프가 떨리는 손으로 백작의 손을 잡는다.

[제퍼슨 호프]: ...엘렌을 키워줘서... 감사하오.

두 사람이 악수한다.

20년의 원한이... 조금씩 녹는다.`,
    choices: [
      { text: '엘렌을 데려오자고 한다', nextNode: 'suggest_reunion_with_ellen' },
      { text: '범인을 찾아야 한다', nextNode: 'plan_to_find_culprit' }
    ]
  },

  plan_to_find_culprit: {
    id: 'plan_to_find_culprit',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `홈즈가 증거들을 정리한다.

[홈즈]: 이제 명확합니다.

[홈즈]: 백작이 아닌 누군가가 엘렌을 의식 희생양으로 만들려 했어요.

[왓슨]: 스탐거슨? 드레버?

[홈즈]: 둘 다 용의자입니다. 하지...

그가 메모를 다시 본다.

[홈즈]: 동기가 뭘까요? 엘렌을 왜?

백작이 말한다.

[모로 백작]: ...유산.

[왓슨]: 유산?

[모로 백작]: 엘렌이 제 전 재산을 상속받게 되어있소.

모든 것이 맞춰진다.`,
    choices: [
      { text: '유산 동기를 추리한다', nextNode: 'deduce_inheritance_motive' },
      { text: '용의자들을 심문하러 간다', nextNode: 'plan_interrogation' }
    ]
  },

  suggest_reunion_with_ellen: {
    id: 'suggest_reunion_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"엘렌을 데려옵시다."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: ...그래야겠소.

[제퍼슨 호프]: 엘렌도... 백작을 걱정하고 있을 거요.

백작이 눈물을 흘린다.

[모로 백작]: 엘렌... 제 딸...

[모로 백작]: 만나고 싶소...

홈즈가 말한다.

[홈즈]: 하지만 범인을 먼저 찾아야 합니다. 엘렌의 안전을 위해.

모두가 고개를 끄덕인다.`,
    choices: [
      { text: '범인을 찾는 계획을 세운다', nextNode: 'plan_to_find_culprit' }
    ]
  },

  count_lucy_final_words: {
    id: 'count_lucy_final_words',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `백작이 루시 초상화를 본다.

[모로 백작]: 루시가... 제단에서... 마지막으로 말했소...

[모로 백작]: "엘렌을... 지켜주세요..."

[모로 백작]: "호프를... 미워하지 마세요..."

[모로 백작]: 그게... 루시의 마지막 말이었소.

호프가 눈물을 흘린다.

[제퍼슨 호프]: 루시...

두 남자가 함께 운다.

20년의 상처가... 조금씩 아문다.`,
    choices: [
      { text: '두 사람을 화해시킨다', nextNode: 'reconcile_count_and_hope' }
    ]
  },

  comfort_hope_final: {
    id: 'comfort_hope_final',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `당신이 호프의 어깨에 손을 얹는다.

[왓슨]: 잘하셨습니다. 엘렌을 지켰습니다.

호프가 고개를 끄덕인다.

[제퍼슨 호프]: ...루시가 부탁했소. 마지막 순간...

[제퍼슨 호프]: "엘렌을 부탁해요..."라고...

[제퍼슨 호프]: 20년... 지키지 못했지만...

[제퍼슨 호프]: 이번엔... 지켰소.

그가 조용히 운다.

당신은 그를 위로한다.`,
    choices: [
      { text: '함께 저택으로 돌아간다', nextNode: 'return_to_mansion_with_hope' }
    ]
  },

  return_to_mansion_with_hope: {
    id: 'return_to_mansion_with_hope',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `호프와 함께 저택으로 돌아온다.

[홈즈]: 이제 모든 걸 정리해봅시다.

모두가 응접실에 모인다.

진실을 밝힐 시간이다.`,
    choices: [
      { text: '추리를 시작한다', nextNode: 'final_deduction_meeting' }
    ]
  },

  deduce_inheritance_motive: {
    id: 'deduce_inheritance_motive',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `홈즈가 추리를 시작한다.

[홈즈]: 백작의 유산... 엘렌이 전부 상속받는다.

[홈즈]: 그럼 유산을 노리는 사람이라면...

[홈즈]: 엘렌을 제거하고 싶을 거야.

[왓슨]: 하지만 왜 의식으로?

[홈즈]: 사고로 위장하기 위해서지.

[홈즈]: "영원한 신부 의식"이 잘못되어 엘렌이 사망했다...

[홈즈]: 그럼 백작의 책임으로 돌릴 수 있어.

백작이 고개를 끄덕인다.

[모로 백작]: 그리고 다음 상속자가...

모든 것이 명확해진다.`,
    choices: [
      { text: '용의자를 지목한다', nextNode: 'identify_suspects' }
    ]
  },

  identify_suspects: {
    id: 'identify_suspects',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `홈즈가 용의자를 정리한다.

[홈즈]: 1. 조셉 스탠거슨 - 집사, 백작의 신임, 유산 차순위

[홈즈]: 2. 이녹 드레버 - 백작의 적, 복수 동기

[왓슨]: 둘 다 의심스럽습니다.

[홈즈]: 그래. 하지만 증거가 필요해.

백작이 말한다.

[모로 백작]: 스태너슨은... 이 저택의 모든 열쇠를 가지고 있소.

[모로 백작]: 의식실에도... 접근할 수 있지...

호프가 덧붙인다.

[제퍼슨 호프]: 드레버는... 교단에 대해 조사했소. 의식도 알고 있을 거요.

둘 다 가능성이 있다.`,
    choices: [
      { text: '스탠거슨을 의심한다', nextNode: 'suspect_stangerson' },
      { text: '드레버를 의심한다', nextNode: 'suspect_drebber' },
      { text: '둘 다 심문한다', nextNode: 'plan_dual_interrogation' }
    ]
  },

  plan_interrogation: {
    id: 'plan_interrogation',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `홈즈가 계획을 세운다.

[홈즈]: 용의자들을 따로 심문합시다.

[홈즈]: 스태너슨... 그리고 드레버...

[왓슨]: 어떻게 접근하시겠습니까?

[홈즈]: 증거를 제시하고 반응을 봐야죠.

[홈즈]: 의식 계획 메모... 드레스... 편지...

백작이 일어선다.

[모로 백작]: 저도 함께 가겠소. 제 저택에서 일어난 일이니...

호프도 고개를 끄덕인다.

[제퍼슨 호프]: 저도... 엘렌을 지켜야 하오.

모두 함께 위로 올라간다.`,
    choices: [
      { text: '심문을 시작한다', nextNode: 'begin_suspect_interrogation' }
    ]
  },

  suspect_stangerson: {
    id: 'suspect_stangerson',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"스탠거슨이 의심스럽습니다."

홈즈가 고개를 끄덕인다.

[홈즈]: 그도 그래. 집사로서 모든 접근권이 있고...

[홈즈]: 유산 차순위 상속자이기도 하지.

백작이 한숨을 쉰다.

[모로 백작]: 스태너슨... 20년간 믿어왔는데...

[모로 백작]: 설마... 그가...

확인이 필요하다.`,
    choices: [
      { text: '스탠거슨을 심문하러 간다', nextNode: 'plan_stangerson_interrogation' }
    ]
  },

  suspect_drebber: {
    id: 'suspect_drebber',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"드레버가 의심스럽습니다."

홈즈가 고개를 끄덕인다.

[홈즈]: 복수 동기가 명확하고...

[홈즈]: 교단에 대해 조사도 했지.

호프가 말한다.

[제퍼슨 호프]: 드레버는... 백작을 증오하고 있소.

[제퍼슨 호프]: 엘렌을 이용해서 백작을 파멸시키려 했을 수도...

가능성이 높다.`,
    choices: [
      { text: '드레버를 심문하러 간다', nextNode: 'plan_drebber_interrogation' }
    ]
  },

  plan_dual_interrogation: {
    id: 'plan_dual_interrogation',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `"둘 다 심문합시다."

홈즈가 전략을 짠다.

[홈즈]: 좋아. 따로 심문해서 진술을 비교하자.

[홈즈]: 모순이 나오면 범인을 잡을 수 있어.

백작과 호프가 고개를 끄덕인다.

모두 함께 위로 올라간다.

진실을 밝힐 시간이다.`,
    choices: [
      { text: '심문을 시작한다', nextNode: 'begin_dual_interrogation' }
    ]
  }

};