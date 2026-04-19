import { StoryNode } from '../../types';

/**
 * Part 2: 1층 탐색
 * - 서재, 금고, 편지 등
 * - main_entrance는 hub-system.ts로 이동 (중복 제거)
 */

export const part2FirstFloor: Record<string, StoryNode> = {
  // main_entrance는 hub-system.ts에 정의됨 (중복 제거)

  back_entrance: {
    id: 'back_entrance',
    day: 1,
    location: 'backyard',
    timeOfDay: 'afternoon',
    character: 'holmes',
    conditionalText: [
      {
        // 뒷뜰의 선택지를 하나라도 본 경우 (재방문)
        condition: (context) => {
          const backyardChoices = ['examine_broken_window', 'analyze_backyard_footprints', 'well', 'kitchen_window_from_backyard'];
          return backyardChoices.some(node => context.visitedNodes.includes(node));
        },
        text: `다시 저택 뒷뜰로 나왔다.\n\n홈즈가 말한다.\n\n[홈즈]: 이미 조사했어. 다른 곳도 살펴보는 게 좋겠군.`
      }
    ],
    text: `저택 뒷뜰로 나왔다.\n\n뒷문은 잠겨있지만 문 자체의 유리창이 깨져있다. \n\n홈즈가 무릎을 꿇고 깨진 유리 조각들을 살핀다.\n\n[홈즈]: 흥미롭군...\n\n그가 유리 파편을 집어 들어 빛에 비춰본다.\n\n[왓슨]: 무엇을 발견했나?\n\n[홈즈]: 유리 표면에 먼지가 거의 없네. 게다가 파편의 단면이 아 선명하고... 바닥의 이슬에 젖지 않았군.\n\n그가 창틀을 만져본다.\n\n[홈즈]: 나무 프레임도 아직 습기를 머금지 않았어. 최근에, 아마도 어젯밤에서 오늘 새벽 사이에 깨진 것 같네.\n\n내가 유리 조각의 방향을 본다.\n\n[왓슨]: 파편이 대부분 밖에 떨어져 있군.\n\n[홈즈]: 바로 그거야, 왓슨. 안에서 밖으로 깨진 거지. 누군가 안에서 탈출했거나... 무언가를 밖으로 던진 흔적이네.\n\n정원 끝에 낡은 우물이 보인다. 그리고 옆쪽으로... 부엌 창문이 살짝 열려 있는 게 보인다.`,
    choices: [
      { text: '뒷문의 깨진 창문을 더 자세히 살펴본다', nextNode: 'examine_broken_window' },
      { text: '정원의 발자국을 조사한다', nextNode: 'analyze_backyard_footprints' },
      { text: '우물로 간다', nextNode: 'well' },
      { text: '부엌 창문을 조사하러 간다', nextNode: 'kitchen_window_from_backyard' },
      { text: '🌹 뒷뜰에 누군가 있다', nextNode: 'meet_ellen', requiredVisitedNode: 'drawer_lucy_letter' },
      { text: '👀 (묘한 느낌이 든다)', nextNode: 'backyard_watched', requiredVisitedNode: 'well' },
      { text: '정문으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  analyze_backyard_footprints: {
    id: 'analyze_backyard_footprints',
    day: 1,
    location: 'backyard',
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈가 돋보기로 정원 바닥의 발자국을 살핀다.

[홈즈]: 세 사람... 아니, 네 사람의 발자국이네. 백작의 것으로 보이는 발자국, 그리고... 군화 자국. 큰 남자야. 

그가 잠시 멈추더니 또 다른 발자국을 가리킨다.

[홈즈]: 그리고 이건... 여성의 신발 자국이군. 작고 가느다란 발. 

나는 고개를 갸우뚱했다. 이 저택에 여성이 있다는 말을 들은 적이 없는데?

홈즈의 표정도 심각해진다.

[홈즈]: 흥미로운 조합이군. 집사의 발자국도 보이고... 하지만 이 여성은 누구일까?

홈즈가 발자국들을 따라가본다.

[홈즈]: 발자국들이... 부엌 쪽으로 이어지고 있어. 하지만 여기서 직접 가기엔 너무 진흙투성이군. 정문을 통해 돌아가는 게 낫겠어.`,
    choices: [
      { text: '깨진 창문을 조사한다', nextNode: 'examine_broken_window' },
      { text: '우물로 간다', nextNode: 'well' },
      { text: '정문으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  examine_broken_window: {
    id: 'examine_broken_window',
    day: 1,
    location: 'backyard',
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈가 돋보기를 꺼내 창틀과 유리 조각을 면밀히 조사한다.

[홈즈]: 보게, 왓슨. 여기 창틀에 작은 혈흔이 있네.

내가 가까이 다가가 본다. 정말로 창틀 모서리에 갈색빛 얼룩이 묻어있다.

[홈즈]: 누군가 급하게 탈출하 손을 다친 것 같군. 그리고 이걸 보게...

그가 바닥의 발자국을 가리킨다.

[홈즈]: 창문 아래 땅이 부드러워서 발자국이 남았네. 성인 남성의 것이야. 걸음걸이로 보아... 급하게 도망친 것 같군.

[왓슨]: 범인의 것일 수도...?

[홈즈]: 가능성은 있지. 하지만 단정하기엔 아직 이르네. 더 조사가 필요해.`,
    choices: [
      { text: '정원의 발자국을 조사한다', nextNode: 'analyze_backyard_footprints' },
      { text: '우물로 간다', nextNode: 'well' },
      { text: '정문으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  main_entrance_after_hope: {
    id: 'main_entrance_after_hope',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `호프와의 대화를 마치고 저택 안으로 들어선다.`,
    // 호프와의 대화 깊이에 따라 다른 내레이션
    conditionalText: [
      {
        // 애도/복수 관련 깊은 대화를 한 경우
        condition: (context) => {
          const deepEmotionalNodes = [
            'hope_reveals_lucy_hint',
            'ask_hope_past_revealed',
            'hope_breaks_down'
          ];
          return deepEmotionalNodes.some(node => context.visitedNodes.includes(node));
        },
        text: `호프와의 대화를 마치고 저택 안으로 들어선다.

저 자... 복수가 아니라 애도를 하러 온 거였다. 20년간 잃어버린 사람을 찾아 헤맨 끝에...

가슴이 무거워진다.`
      },
      {
        // 압박적인 대화를 많이 한 경우
        condition: (context) => {
          const interrogationNodes = [
            'ask_hope_wait_time',
            'ask_hope_witness',
            'ask_hope_past_suspicious',
            'stop_hope_leaving'
          ];
          return interrogationNodes.filter(node => context.visitedNodes.includes(node)).length >= 2;
        },
        text: `호프와의 대화를 마치고 저택 안으로 들어선다.

뭔가... 너무 압박한 것 같아 찝찝한 기분이 든다.`
      }
    ],
    nextNode: 'main_entrance_after_hope_2'
  },

  main_entrance_after_hope_2: {
    id: 'main_entrance_after_hope_2',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'holmes',
    text: `자, 이제 본격적으로 조사를 시작해볼까.`, // 기본 텍스트 (호프와 대화 안 한 경우)
    // 호프와 깊은 대화를 했는지에 따라 대사 분기
    conditionalText: [
      {
        // 애도 관련 대화를 ��� 경우 - 홈즈의 공감
        condition: (context) => {
          const empathyNodes = [
            'hope_reveals_lucy_hint',
            'watson_truth_matters',
            'watson_honest_answer',
            'comfort_hope_breakdown',
            'watson_defends_hope',
            'hope_carefully_asks_about_count'
          ];
          return empathyNodes.some(node => context.visitedNodes.includes(node));
        },
        text: `[홈즈]: 저 남자... 복수가 아니라 애도를 하러 온 거네.

20년간... 잃어버린 사람을 찾아 헤맨 고통. 상상이 안 가는군.`
      },
      {
        // 호프의 과거를 알게 된 경우 (루시, 복수 등)
        condition: (context) => {
          const deepConversation = [
            'ask_hope_past_revealed',
            'hope_breaks_down',
            'ask_hope_motive',
            'stop_hope_leaving',
            'observe_hope_reaction'
          ];
          return deepConversation.some(node => context.visitedNodes.includes(node));
        },
        text: `[홈즈]: 저 남자... 20년간 복수를 준비해온 거네. 사랑하는 사람을 잃은 고통...

하지만 복수가 정의일까? 아니면 또 다른 비극의 시작일까?`
      },
      {
        // 호프와 간단한 대화만 한 경우
        condition: (context) => {
          const someConversation = [
            'ask_hope_name',
            'ask_hope_wait_time',
            'ask_hope_witness',
            'ask_hope_past_suspicious',
            'watson_supports_holmes'
          ];
          return someConversation.some(node => context.visitedNodes.includes(node));
        },
        text: `[홈즈]: 저 남자... 뭔가 숨기고 있어.

더 깊이 캐묻지 못한 게 아쉽군. 아마 백작과 관련이 있을 거야.`
      }
    ],
    nextNode: 'main_entrance_after_hope_3'
  },

  main_entrance_after_hope_3: {
    id: 'main_entrance_after_hope_3',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'holmes',
    text: `서둘러야 할 것 같군.`, // 기본 텍스트 (conditionalText 실패 시 사용)
    // 호프와의 대화 여부에 따라 대사 분기
    conditionalText: [
      {
        // 애도 관련 대화를 한 경우 - 더 조심스러운 톤
        condition: (context) => {
          const empathyNodes = [
            'hope_reveals_lucy_hint',
            'watson_truth_matters',
            'watson_honest_answer'
          ];
          return empathyNodes.some(node => context.visitedNodes.includes(node));
        },
        text: `[홈즈]: 진실을 밝혀야 해. 저 남자를 위해서라도... 그리고 백작을 위해서도.`
      },
      {
        // 호프와 깊은 대화를 한 경우
        condition: (context) => {
          const deepConversation = [
            'ask_hope_past_revealed',
            'hope_breaks_down',
            'ask_hope_motive',
            'stop_hope_leaving'
          ];
          return deepConversation.some(node => context.visitedNodes.includes(node));
        },
        text: `[홈즈]: 서둘러야겠어. 그가 다시 돌아오기 전에 진실을 밝혀내야 해.`
      },
      {
        // 호프와 간단한 대화만 한 경우
        condition: (context) => {
          const someConversation = [
            'ask_hope_name',
            'ask_hope_wait_time',
            'ask_hope_witness'
          ];
          return someConversation.some(node => context.visitedNodes.includes(node));
        },
        text: `[홈즈]: 서둘러야 할 것 같군. 저 남자가 다시 나타날 수도 있어.`
      }
    ],
    choices: [
      { text: '서재를 조사한다', nextNode: 'study_room' },
      { text: '2층으로 올라간다', nextNode: 'checkpoint_go_upstairs' },
      { text: '부엌을 조사한다', nextNode: 'kitchen_entrance' },
      { text: '뒷뜰을 조사한다', nextNode: 'back_entrance' },
      { text: '근처 여관을 방문한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber' },
      { text: '홈즈와 심도있는 대화를 나눈다', nextNode: 'holmes_hint_playcount_2' }
    ]
  },

  study: {
    id: 'study',
    day: 1,
    location: 'study',
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: '서재는 낡은 책들로 가득 차 있다. 벽에는 "RACHE"라는 글자가 핏자국으로 쓰여 있다. 홈즈가 조사한다. 책장 뒤에서 뭔가 직는 소리가 들린다.',
    choices: [
      { text: '책장 뒤를 확인한다', nextNode: 'discover_stangerson', hideIfVisitedNode: 'discover_stangerson' },
      { text: 'RACHE 글자를 조사한다', nextNode: 'examine_rache' },
      { text: '책장을 조사한다', nextNode: 'examine_bookshelf' },
      { text: '현관으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  examine_rache: {
    id: 'examine_rache',
    day: 1,
    location: 'study',
    timeOfDay: 'afternoon',
    character: 'holmes',
    conditionalText: [
      {
        // 스탠거슨을 이미 만난 후 RACHE를 조사하는 경우
        condition: { visitedNode: 'discover_stangerson' },
        text: `홈즈가 벽의 핏자국을 꼼꼼히 살핀다.

스탠거슨이 불안한 눈빛으로 우리를 지켜본다.

[홈즈]: RACHE... 독일어로 '복수'를 뜻하지. 스탠거슨씨, 이 글자를 보신 적 있습니까?

스탠거슨의 얼굴이 창백해진다.

[스탠거슨]: ...예. 20년 전... 교단에서...

[왓슨]: 교단?

스탠거슨이 떨린.

[스탠거슨]: "영원한 구원 교단"... 그들의 상징이었습니다... '신의 복수'라는 의미로...

그가 말을 흐린다. 뭔가 숨기고 있는 것이 분명하다.`
      }
    ],
    text: `홈즈가 글자를 살핀다.

[홈즈]: RACHE... 독일어로 복수를 뜻하지. 

[왓슨]: 범인의 메시지일까?

[홈즈]: 그럴 수도 있지. 하지만... 혹시 종교적 상징일 가능성도 있어.

그가 핏자국을 자세히 관찰한다.

[홈즈]: 글자체가 의례적이야. 마치... 의식의 일부처럼 쓰여졌어.

그때 책장 뒤에서 움직이는 소리가 들린다.

[홈즈]: ...누가 있소?`,
    choices: [
      { text: '책장 뒤를 확인한다', nextNode: 'discover_stangerson', hideIfVisitedNode: 'discover_stangerson' },
      { text: '스탠거슨에게 질문한다', nextNode: 'ask_stangerson', showIf: { visitedNode: 'discover_stangerson' } },
      { text: '책장을 조사한다', nextNode: 'examine_bookshelf' },
      { text: '현관으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  safe: {
    id: 'safe',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    conditionalText: [
      {
        // 스탠거슨을 이미 발견한 경우 - 그가 지켜보는 중
        condition: { visitedNode: 'discover_stangerson' },
        text: `금고는 잠겨있다. 4자리 숫자 조합이 필요하다.

홈즈가 금고를 살피자... 스탠거슨이 불안한 눈빛으로 다가온다.

[스탠거슨]: 그, 그건... 백작님의 금고입니다...

[홈즈]: 알고 있습니다. 조사가 필요합니다.

스탠거슨이 입술을 깨문다. 뭔가 금고 안에 있는 것을 걱정하는 것 같다.

[홈즈]: (조용히) 슨, 일기장에 힌트가 있을 거야.`
      }
    ],
    text: '금고는 잠겨있다. 4자리 숫자 조합이 필요하다. 홈즈가 말한다. "일기장에 힌트가 있을 수 있네."',
    choices: [
      { text: '일기장을 찾는다', nextNode: 'hope_diary_discovery', hideIfVisitedNode: 'hope_diary_discovery' },
      { text: '🔑 [비밀번호로 금고를 연다]', nextNode: 'safe_opened', requiredItem: 'safe_password' },
      { text: '금고를 열어본다', nextNode: 'safe_opened', puzzleType: 'safe' },
      { text: '다른 것을 조사한다', nextNode: 'study' }
    ]
  },

  safe_opened: {
    id: 'safe_opened',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 열쇠와 장부 모두 획득한 경우
        condition: (context) => {
          return context.items.includes('지하실 열쇠') && context.items.includes('ledger');
        },
        text: `금고를 다시 살펴본다.

이미 지하실 열쇠와 장부를 챙겼다. 더 이상 중요한 물건은 없어 보인다.

홈즈가 말한다.

[홈즈]: 필요한 건 다 가져갔어. 이제 다른 곳을 조사하자.`
      },
      {
        // 열쇠만 획득한 경우
        condition: (context) => {
          return context.items.includes('지하실 열쇠') && !context.items.includes('ledger');
        },
        text: `금고를 다시 살펴본다.

이미 지하실 열쇠를 챙겼다. 그런데... 먼지투성이의 은 장부가 아직 남아있다.

홈즈가 말한다.

[홈즈]: 저 장부도 중요할 것 같은데.`
      },
      {
        // 장부만 획득한 경우
        condition: (context) => {
          return !context.items.includes('지하실 열쇠') && context.items.includes('ledger');
        },
        text: `금고를 다시 살펴본다.

이미 장부를 챙겼다. 그런데... 지하실 열쇠가 아직 남아있다.

홈즈가 말한다.

[홈즈]: 지하실 열쇠... 반드시 필요할 거야.`
      }
    ],
    text: `금고가 열렸다! 안에는 여러 물건들이 들어있다.

홈즈가 안을 살피며 말한다. "여기... 지하실 열쇠가 있군. 그리고..."

그가 먼지투성이의 은 장부를 꺼낸다.`,
    choices: [
      { text: '장부를 살펴본다', nextNode: 'examine_ledger_safe', hideIfHasItem: 'ledger' },
      { text: '지하실 열쇠를 가져간다', nextNode: 'got_basement_key', item: '지하실 열쇠', hideIfHasItem: '지하실 열쇠' },
      { text: '다른 것을 조사한다', nextNode: 'study' }
    ]
  },

  // read_letter 노드 제거됨 (더 이상 사용하지 않음)
  
  // ========== 📚 서재 조사 시스템 (가계도 위조 발견) ==========
  study_genealogy_investigation: {
    id: 'study_genealogy_investigation',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'study',
    speaker: 'watson',
    conditionalText: [
      {
        // Layer 2: 엘렌을 만난 후 - 추리 단계
        condition: (context) => context.flags.has_met_ellen === true,
        text: `벽면에 걸린 백작의 가계도를 다시 살펴본다.

[왓슨]: 다시 보니... 이상한 점이 보이는군.

홈즈가 다가와 가계도를 자세히 본다.

[홈즈]: 역시 그랬군, 왓슨. 이 부분을 보게.

그가 엘렌의 이름이 적힌 부분을 가리킨다.

[홈즈]: 종이의 질감이 다르네. 이 부분만... 칼로 정교하게 긁어낸 흔적이 있어.

홈즈가 빛에 비춰본다.

[홈즈]: 덧쓴 잉크의 광택이 아직 살아있군. 최근에 수정한 거야.

[왓슨]: 그럼... 원래는 다른 이름이 있었다는 건가?

[홈즈]: 그렇지. 백작은 실종되기 직전, 진실을 감추려 했어. 긁어낸 자리에 "엘렌"이라는 이름을 덧썼지.

홈즈가 가계도를 계속 살핀다.

[홈즈]: 엘렌의 어머니 란... 의도적으로 비워뒀군. 진짜 혈육이었다면 이렇게까지 할 이유가 없어.

[왓슨]: 백작이 왜 그 아이를 자신의 딸로 위장하려 한 걸까?

[홈즈]: 그게 핵심이야, 왓슨. 20년 전의 비밀과 연결된 게 분명해.`
      }
    ],
    text: `벽면에 걸린 백작의 가계도를 살펴본다.

[왓슨]: 이건... 백작 가문의 족보군.

정교한 필체로 적힌 300년의 역사...

모로 백작... 그리고 그 아래 "엘렌"이라는 이름이 보인다.

홈즈가 다가와 가계도를 만져본다.

[홈즈]: 흥미롭군, 왓슨. 이 부분의 종이만... 미묘하게 얇아져 있어.

그가 빛에 비춰본다.

[홈즈]: 누군가 날카로운 칼로 이름을 긁어낸 흔적이야. 그리고 그 위에 덧쓴 잉크... 광택이 아직 살아있군.

[왓슨]: 위조라는 건가?

[홈즈]: 수정이라고 해야겠지. 하지만 왜 그랬을까? 무엇을 감추려 한 걸까?

홈즈가 엘렌의 어머니 란을 가리킨다.

[홈즈]: 그리고 이것 봐. 어머니 란이 비어있어. 보통은 혈통을 증명하기 위해 양쪽 부모를 모두 기록하는데...

[왓슨]: 이게 무슨 뜻일까, 홈즈?

[홈즈]: 아직은 모르겠어. 하지만 백작이 뭔가 숨기려 했다는 건 확실하군.`,
    choices: [
      {
        text: '📜 가계도를 기록한다',
        nextNode: 'acquire_genealogy_clue'
      }
    ]
  },

  acquire_genealogy_clue: {
    id: 'acquire_genealogy_clue',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'study',
    character: 'watson',
    text: `**[획득: 위조된 가계도 증거]**

백작과 대화할 때 "엘렌의 출생"에 대해 물을 수 있습니다.`,
    choices: [
      { 
        text: '🔙 서재로 돌아간다', 
        nextNode: 'study_room' 
      }
    ],
    onEnter: (context) => {
      context.flags.found_genealogy_clue = true;
      context.flags.knows_ellen_not_count_daughter = true;
      context.addItem('위조된 가계도 증거');
    }
  },

  // ========== 🍳 부엌 조사 시스템 (진흙 자국 발견) ==========
  kitchen_floor_investigation: {
    id: 'kitchen_floor_investigation',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    speaker: 'watson',
    text: `바닥을 살핀다.

[왓슨]: 홈즈, 여기 보게.

[왓슨]: 진흙 묻은 신발 자국이 있어.

홈즈가 무릎을 꿇고 자세히 본다.

[홈즈]: 런던 교외 지역의 점토질 진흙이야.

[홈즈]: 이 저택 정원의 흙이 아니야.

[홈즈]: 누군가 어젯밤 외부에서 들어왔어.

[홈즈]: 그것도... 급하게.

홈즈가 발자국 방향을 따라간다.

[홈즈]: 부엌에서... 지하로 향하는 계단 쪽으로 이어지는군.`,
    choices: [
      {
        text: '🔍 진흙 샘플을 채취한다',
        nextNode: 'acquire_mud_sample'
      }
    ]
  },

  acquire_mud_sample: {
    id: 'acquire_mud_sample',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    text: `**[획득: 진흙 샘플]**

스탠거슨을 심문할 때 "어젯밤의 행적"을 물을 수 있습니다.`,
    choices: [
      { 
        text: '🔙 부엌으로 돌아간다', 
        nextNode: 'kitchen_entrance' 
      }
    ],
    onEnter: (context) => {
      context.flags.found_kitchen_mud = true;
      context.flags.knows_stangerson_moved_last_night = true;
      context.addItem('진흙 샘플');
    }
  },

  kitchen_cupboard_investigation: {
    id: 'kitchen_cupboard_investigation',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    speaker: 'watson',
    text: `찬장을 연다.

그릇들... 식기들...

그리고 찬장 뒤쪽에... 무언가 반짝인다.

홈즈가 손을 뻗는다.

[홈즈]: 이건...

낡은 로켓 케이스다.

홈즈가 케이스를 연다.

안에 여성의 초상화가 들어있다.

[홈즈]: 루시의 것이야.

[왓슨]: 왜 부엌 찬장에...?

[홈즈]: 누군가 숨긴 거지. 엘렌에게 전달하려다 실패한 것 같아.`,
    choices: [
      {
        text: '📿 로켓 케이스를 가져간다',
        nextNode: 'acquire_locket_case'
      }
    ]
  },

  acquire_locket_case: {
    id: 'acquire_locket_case',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    text: `**[획득: 루시의 로켓 케이스]**

엘렌에게 어머니의 유품을 전달할 수 있습니다.`,
    choices: [
      { 
        text: '🔙 부엌으로 돌아간다', 
        nextNode: 'kitchen_entrance' 
      }
    ],
    onEnter: (context) => {
      context.flags.found_lucy_locket_case = true;
      context.addItem('루시의 로켓 케이스');
    }
  },

  kitchen_servants_talk: {
    id: 'kitchen_servants_talk',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'kitchen',
    character: 'watson',
    speaker: 'watson',
    text: `하인에게 다가간다.

[왓슨]: 실례합니다. 백작님은 어디 계신가요?

하인이 떨린다.

[하인]: 저, 저희는... 모릅니다...

[왓슨]: 언제부터 보지 못하셨나요?

[하인]: 3일... 아니... 4일 전부터...

홈즈가 끼어든다.

[홈즈]: 스탠거슨 씨는 어디 있습니까?

[하인]: 서, 서재에... 계실 겁니다...

하인의 안색이 창백하다.

[홈즈]: (왓슨에게 속삭인다) 공포는 가장 강력한 자물쇠지.`,
    choices: [
      { 
        text: '🔙 부엌으로 돌아간다', 
        nextNode: 'kitchen_entrance'
      }
    ],
    onEnter: (context) => {
      context.flags.talked_to_servants = true;
      context.flags.knows_count_missing_4days = true;
    }
  }
};