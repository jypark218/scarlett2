import { StoryNode } from '../../types/story';

/**
 * 🔍 개선된 증거 획득 노드들
 * 3가지 핵심 증거를 명확하게 획득하는 시퀀스
 */
export const evidenceAcquisitionImproved: Record<string, StoryNode> = {
  // ═══════════════════════════════════════════════════════
  // 📿 루시의 로켓 획득 (우물가) - 호프가 떠난 후
  // ═══════════════════════════════════════════════════════
  
  acquire_locket_well_v2: {
    id: 'acquire_locket_well_v2',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    conditionalText: [
      {
        // 지하실을 이미 방문한 경우 - 즉시 연결
        condition: (context) => {
          const basementVisited = ['open_basement', 'basement_interior', 'basement_investigation'];
          return basementVisited.some(node => context.visitedNodes.includes(node));
        },
        text: `바닥에 떨어진 로켓을 집어든다.

작고 오래된 은빛 로켓이다. 펼쳐보니 안에 작은 초상화가 들어있다. 젊은 여성의 얼굴... 그리고 "L.L."이라는 이니셜.

당신은 순간 숨이 멎는다.

[왓슨]: 홈즈! 이건... 지하실 벽에 있던 사진과 같은 여자입니다!

홈즈가 번뜩인다.

[홈즈]: 맞아! 루시... 루시 루이자(Lucy Louisa)! 그리고 이 로켓은... 호프가 떨어뜨린 거야!

[왓슨]: 그렇다면 호프가 지하실에...

[홈즈]: 지하실에 갔고, 백작을 만났고, 복수를 했지. 그리고 그녀의 로켓을 놓고 온 거야. 증표로.

[셜록 홈즈]: 이것은 결정적 증거가 될 거야, 왓슨.`
      }
    ],
    text: `바닥에 떨어진 로켓을 집어든다.

작고 오래된 은빛 로켓이다. 펼쳐보니 안에 작은 초상화가 들어있다. 젊은 여성의 얼굴... 그리고 "L.L."이라는 이니셜.

홈즈가 놀란다. "루시... 루시 루이자(Lucy Louisa)일 거야."

[셜록 홈즈]: 이것은 중요한 증거가 될 거야, 왓슨.`,
    item: 'locket',
    choices: [
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  examine_ledger_well: {
    id: 'examine_ledger_well',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    text: `오래된 장부를 넘겨본다.

1861년... 독일 여행... 거액의 지출... "루시에게"라는 메모가 보인다.

홈즈가 장부를 자세히 살핀다.

[셜록 홈즈]: 스탠거슨과 드레버... 그들도 공범이었군요.`,
    choices: [
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 📒 1861년 장부 획득 (서재의 금고) - 금고를 연 후
  // ═══════════════════════════════════════════════════════
  
  acquire_ledger_safe_v2: {
    id: 'acquire_ledger_safe_v2',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    text: `[서재 - 금고 내부]

금고 안에는 귀중품들이 가득하다.

보석, 금화, 중요한 서류들...

그리고... 먼지투성이 낡은 장부 한 권.

[장부를 꺼내 펼쳐본다]

**"1861년 유타주 금광 투자 기록"**

모로 백작, 조셉 스탠거슨, 이녹 드레버의 서명이 보인다.

그리고... 대량의 손실 기록.

[셜록 홈즈]:왓슨! 이것이 20년 전 사기의 증거입니다!

[셜록 홈즈]:스탠거슨과 드레버... 그들도 공범이었군요.`,
    choices: [
      { text: '[장부를 챙긴다]', nextNode: 'got_basement_key', item: 'ledger' }
    ]
  },

  // ══════════════════════════════════════════════════════
  // 📜 유언장 관련 (2층 백작의 방) - 2층 탐색 중
  // ══════════════════════════════════════════════════════
  
  // 📜 책상 위 유언장 읽기 (아이템 획득 X - 나중에 획득)
  acquire_will_bedroom_v2: {
    id: 'acquire_will_bedroom_v2',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    speaker: 'watson',
    text: `책상 위 서류를 살펴본다.

유언장이다. 홈즈가 빠르게 읽는다.

[홈즈]: "나, 모로 백작은 내 모든 재산을 스탠거슨에게 물려준다..."

[왓슨]: 스탠거슨? 집사에게?

[홈즈]: 흥미롭군. 혈연도 아닌 집사에게 전 재산을 상속한다...

서류 모서리에 지문이 묻어있다. 최근에 만진 흔적이 있다.

[홈즈]: 왓슨, 이 유언장... 뭔가 이상해. 종이 질감과 잉크가... 너무 새것 같아.

그가 서류를 빛에 비춰본다.

[홈즈]: 봉인 날짜는 3년 전인데... 종이는 최근에 만들어진 것 같군. 이건... 위조일 가능성이 있어.`,
    choices: [
      { text: '유언장을 자세히 조사한다', nextNode: 'will_examine_forgery' },
      { text: '침실을 더 둘러본다', nextNode: 'bedroom' }
    ]
  },
  
  // 📜 유언장 위조 의혹
  will_examine_forgery: {
    id: 'will_examine_forgery',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `홈즈가 돋보기로 유언장을 자세히 본다.

[홈즈]: 이 잉크... 3년 전 것이 아니야. 최근 몇 주 이내에 작성된 거야.

[왓슨]: 누군가 가짜 유언장을 만들어 놓았다는 건가?

[홈즈]: 그렇다면... 진짜 유언장은 어디에 있을까?

그가 주변을 둘러본다. 서랍장의 자물쇠가 눈에 띈다.

[홈즈]: 왓슨, 저 서랍장... 특별한 자물쇠가 달려있어. 뭔가 중요한 게 숨겨져 있을지도 몰라.`,
    choices: [
      { text: '[가짜 유언장을 챙긴다]', nextNode: 'will_acquired', item: 'will', hideIfHasItem: 'will' },
      { text: '서랍장을 조사한다', nextNode: 'bedroom_drawer' },
      { text: '침실을 더 둘러본다', nextNode: 'bedroom' }
    ]
  },
  
  // 📜 가짜 유언장 획득 완료
  will_acquired: {
    id: 'will_acquired',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    speaker: 'watson',
    text: `가짜 유언장을 주머니에 넣었다.

[홈즈]: 이것도 중요한 증거야. 누가 왜 이걸 만들었는지... 그게 핵심이야.`,
    choices: [
      { text: '서랍장을 조사한다', nextNode: 'bedroom_drawer', hideIfHasItem: 'ellen_will' },
      { text: '침실을 더 둘러본다', nextNode: 'bedroom' }
    ]
  },
  
  // ══════════════════════════════════════════════════════
  // 📧 전보 획득 (2층 옷장) - 옷장 조사 중
  // ══════════════════════════════════════════════════════
  
  acquire_telegram_wardrobe: {
    id: 'acquire_telegram_wardrobe',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    text: `전보를 펼쳐본다.

**"드레버 방문 예정 STOP 엘렌 보호 요청 STOP 위험 인물 경계 STOP"**

보낸 사람: **런던 법률사무소**

날짜: **3일 전**

홈즈가 표정이 심각해진다.

[셜록 홈즈]: 드레버가 위험 인물이라... 누군가를 보호하려 했던 것 같군.

[왓슨]: 엘렌이라는 사람은 누구지? 백작의 친족인가?

[셜록 홈즈]: 아직 모르겠어. 더 조사가 필요해.`,
    item: 'telegram',
    choices: [
      { text: '침실로 돌아간다', nextNode: 'bedroom' }
    ]
  },
  
  // ══════════════════════════════════════════════════════
  // 🌹 엘렌의 유언장 획득 (침실 서랍) - 서랍 열쇠로 해금
  // ══════════════════════════════════════════════════════
  
  acquire_ellen_will: {
    id: 'acquire_ellen_will',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    conditionalText: [
      {
        // 호프를 만났거나 지하실을 발견한 경우 - 루시를 알고 있음
        condition: (context) => {
          const lucyRevealed = ['meet_hope', 'hope_encounter', 'basement_investigation', 'open_basement', 'basement_interior'];
          return lucyRevealed.some(node => context.visitedNodes.includes(node));
        },
        text: `[침실 - 서랍장]

서랍을 열자... 조심스럽게 보관된 편지와 서류들이 보인다.

가장 위에 놓인 봉투를 집어든다.

낡은 양피지... 3년 전 날짜가 적혀있다.

[유언장을 펼쳐 읽는다]

**"최종 유언장"**

"나, 모로 백작은 내 모든 재산을... 엘렌에게 물려준다."

"그녀는 내 딸이다."

당신은 계속 읽는다.

밑에 작은 글씨로...

"루시... 미안하오. 당신의 딸만은... 내가 지키겠소."

순간, 당신의 손이 떨린다.

[왓슨]: ...루시?! 루시의 딸?!

홈즈가 당신의 어깨 너머로 유언장을 본다.

[왓슨]: 홈즈! 엘렌이... 엘렌이 호프가 말했던 바로 그 루시의 딸이란 말입니까?!

당신은 지하실에서 봤던 사진이 떠오른다. 루시... 그리고 백작...

[왓슨]: 그렇다면... 백작은 루시와... 그리고 엘렌을...

모든 퍼즐이 하나로 맞춰지기 시작한다.`
      }
    ],
    text: `[침실 - 서랍장]

서랍을 열자... 조심스럽게 보관된 편지와 서류들이 보인다.

가장 위에 놓인 봉투를 집어든다.

낡은 양피지... 3년 전 날짜가 적혀있다.

[유언장을 펼쳐 읽는다]

**"최종 유언장"**

"나, 모로 백작은 내 모든 재산을... 엘렌에게 물려준다."

"그녀는 내 딸이다."

당신은 놀란다. 엘렌? 백작의 딸?

밑에 작은 글씨로...

"L... 미안하오. 당신의 딸만은... 내가 지키겠소."

[왓슨]: 이니셜 L... 백작이 사과하는 대상... 그리고 엘렌은 그 여성의 딸이라는 건가?

홈즈가 유언장을 살펴본다.`,
    choices: [
      { text: '[유언장을 읽고 홈즈와 대화한다]', nextNode: 'ellen_will_revelation' }
    ]
  },
  
  ellen_will_revelation: {
    id: 'ellen_will_revelation',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    conditionalText: [
      {
        // 호프를 만났거나 지하실을 발견한 경우 - 루시를 알고 있음
        condition: (context) => {
          const lucyRevealed = ['meet_hope', 'hope_encounter', 'basement_investigation', 'open_basement', 'basement_interior'];
          return lucyRevealed.some(node => context.visitedNodes.includes(node));
        },
        text: `홈즈가 유언장을 다시 읽으며 눈빛이 날카로워진다.

[셜록 홈즈]: 왓슨... 이제 모든 게 명확해졌어.

[왓슨]: 루시... 호프가 그토록 사랑했던 루시가 죽었을 때, 이미 임신 상태였던 거군요!

[셜록 홈즈]: 맞아. 그리고 백작은... 루시를 지키지 못했지만, 그녀의 딸만은 보호하려 했던 거야.

[왓슨]: 그렇다면 백작은... 가해자이면서 동시에...

[셜록 홈즈]: 속죄자야. 20년간 엘렌을 자신의 딸로 키우며, 루시에게 용서를 구한 거지.

당신은 숨이 막힌다.

[왓슨]: 그리고 책상 위의 유언장은?

[셜록 홈즈]: 위조야. 누군가 이 진짜 유언장을 숨기고, 스탠거슨에게 유산이 가도록 만든 거지.

[왓슨]: 그렇다면 진짜 상속자는 스탠거슨이 아니라 엘렌... 루시의 딸!

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: 이것이 모든 것을 바꿔. 동기, 피해자, 가해자... 이 사건은 단순한 복수극이 아니야.

[왓슨]: 그렇다면 호프는... 루시의 딸이 살아있다는 걸 알고 있었을까요?

홈즈가 잠시 침묵한다.

[셜록 홈즈]: 그게... 핵심 질문이야, 왓슨.`
      }
    ],
    text: `홈즈가 유언장을 다시 읽으며 고개를 끄덕인다.

[셜록 홈즈]: 왓슨... 이것이 진짜 유언장이야.

[왓슨]: 엘렌이 백작의 딸이라니... 그럼 책상 위의 유언장은?

[셜록 홈즈]: 위조였어. 누군가 진짜 유언장을 숨기고, 스탠거슨에게 유산이 가도록 가짜를 만든 거지.

[왓슨]: 이니셜 L... 그 여성의 딸...

[셜록 홈즈]: 20년 전... 그 여성이 죽었을 때, 이미 임신 상태였던 거야. 백작이 아이를 보호했고...

[왓슨]: 그리고 자신의 딸로 키웠다...

[셜록 홈즈]: 엘렌은 그 여성의 딸이자, 백작이 키운 양딸이야. 백작은... 속죄하려 했던 것 같아.

[왓슨]: 그렇다면 진짜 상속자는 스탠거슨이 아니라 엘렌!

홈즈가 유언장을 조심스럽게 접는다.

[셜록 홈즈]: 이것이 모든 것을 바꿔. 유산 동기, 진짜 피해자, 그리고... 위조범의 정체.

[왓슨]: 누가 이런 짓을...

[셜록 홈즈]: 그게 우리가 밝혀야 할 거야.`,
    choices: [
      { text: '[엘렌의 유언장을 챙긴다]', nextNode: 'bedroom_drawer_more_clues', item: 'ellen_will' },
      { text: '침실로 돌아간다', nextNode: 'bedroom' }
    ]
  },
  
  bedroom_drawer_more_clues: {
    id: 'bedroom_drawer_more_clues',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    conditionalText: [
      {
        // 호프를 만났거나 지하실을 발견한 경우 - 루시를 알고 있음
        condition: (context) => {
          const lucyRevealed = ['meet_hope', 'hope_encounter', 'basement_investigation', 'open_basement', 'basement_interior'];
          return lucyRevealed.some(node => context.visitedNodes.includes(node));
        },
        text: `서랍 안을 더 살펴본다.

편지들이 가지런히 정리되어 있다.

엘렌이 백작에게 보낸 편지... "아버지"라고 부르고 있다.

그리고 루시가 남긴 마지막 편지.

"제 딸을 부탁합니다... 그 아이만은... 행복하게..."

손글씨가 흐릿하다. 죽어가면서 쓴 것이 분명하다.

홈즈가 조용히 말한다. "백작은... 속죄하려 했던 거야. 루시를 지키지 못한 대신, 그녀의 딸은 지키려고."

그때...

뒤에서 조용한 발소리가 들린다.`
      }
    ],
    text: `서랍 안을 더 살펴본다.

편지들이 가지런히 정리되어 있다.

엘렌이 백작에게 보낸 편지... "아버지"라고 부르고 있다.

그리고 한 여성이 남긴 마지막 편지. 이니셜은 "L."

"제 딸을 부탁합니다... 그 아이만은... 행복하게..."

손글씨가 흐릿하다. 죽어가면서 쓴 것이 분명하다.

홈즈가 조용히 말한다. "백작은... 속죄하려 했던 거야. 그 여성을 지키지 못한 대신, 그녀의 딸은 지키려고."

그때...

뒤에서 조용한 발소리가 들린다.`,
    choices: [
      { text: '[뒤를 돌아본다]', nextNode: 'ellen_appears' },
      { text: '일단 편지를 닫는다', nextNode: 'bedroom' }
    ]
  }
};