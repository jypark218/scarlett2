import { StoryNode } from '../../types';

/**
 * Part 3: 2층 탐색
 * - 침실, 옷장, 비밀 통로
 */

export const part3SecondFloor: Record<string, StoryNode> = {
  bedroom: {
    id: 'bedroom',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'watson',
    speaker: 'watson',
    conditionalText: [
      {
        // 침실 단서를 하나라도 조사한 경우 - 짧은 설명
        condition: (context) => {
          const bedroomClues = [
            'acquire_will_bedroom_v2', 
            'will_examine_forgery',
            'bedroom_drawer', 
            'vanity', 
            'examine_bed', 
            'examine_walls', 
            'window', 
            'wardrobe',
            'discover_attic_ladder',
            'attic_interior',
            'sudden_door_slam'
          ];
          return bedroomClues.some(node => context.visitedNodes.includes(node));
        },
        text: `침실로 돌아온다. 홈즈가 주변을 살피며 말한다.

[홈즈]: 다른 곳도 조사해보자, 왓슨.`
      }
    ],
    text: `침실에 들어선다. 큰 침대와 옷장, 그리고 책상이 보인다.

책상 위에 새로 작성된 서류가 놓여있다.

구석에 작은 서랍장이 눈에 띈다. 가장 위 서랍에는 정교한 자물쇠가 달려있다.

그리고 침대 옆에 작은 화장대가 보인다.

홈즈가 주변을 천천히 살핀다.

[홈즈]: 왓슨, 침실을 꼼꼼히 조사하자.

당신이 주변을 살펴본다. 침대는 깔끔하게 정돈되어 있다. 시트는 고급 린넨이고, 베개는 깃털로 채워져 있다.

홈즈가 침대 밑을 들여다본다.

[홈즈]: 왓슨, 잠깐... 여기 뭔가 있어.

침대 밑에서 작은 종이 쪼가리를 발견한다. 찢어진 편지의 일부분인 것 같다.

홈즈가 조심스럽게 주워 읽는다.

[홈즈]: "...유타에서의 일을 잊을 수 없소. 당신이 저지른 죄는..." 흥미롭군. 편지가 찢어져 있어.

그가 침대 옆 융단에 시선을 둔다.

[홈즈]: 융단 밑도 살펴보자.

홈즈가 융단의 한쪽 끝을 살짝 들춰본다.

[홈즈]: 여기 마루바닥에 얼룩이 있어.

당신이 다가가 본다. 희미한 붉은 얼룩... 그리고 검은 흙자국.

[왓슨]: 이건... 혹시 피?

홈즈가 고개를 젓는다.

[홈즈]: 아니야. 와인 자국이야. 하지만 이 검은 흙... 어디선가 가져온 거야. 누군가 밖에서 들어왔거나... 저택 어딘가 습한 곳을 다녀온 것 같아.`,
    choices: [
      // ========== 1단계: 처음 진입 시 핵심 선택지만 ==========
      // 📜 책상 위 유언장 (처음 방문 시 - 아직 안 읽음)
      { text: '책상 위 서류를 조사한다', nextNode: 'acquire_will_bedroom_v2', hideIfVisitedNode: 'acquire_will_bedroom_v2' },
      
      // 📜 가짜 유언장 다시 보기 (읽은 후 - 아직 획득 안함)
      { text: '책상 위 유언장을 다시 본다', nextNode: 'will_examine_forgery', requiredVisitedNode: 'acquire_will_bedroom_v2', hideIfHasItem: 'will' },
      
      { text: '침대 주변을 조사한다', nextNode: 'examine_bed' },
      { text: '옷장을 조사한다', nextNode: 'wardrobe', hideIfVisitedNode: 'wardrobe' },
      
      // ========== 2단계: 책상 조사 후 추가 선택지 ==========
      // 🔒 서랍장 (유언장 읽은 후에만 표시)
      { text: '서랍장을 조사한다', nextNode: 'bedroom_drawer', requiredVisitedNode: 'acquire_will_bedroom_v2', hideIfHasItem: 'ellen_will' },
      
      // 💄 화장대 (유언장 읽은 후에만 표시)
      { text: '화장대를 조사한다', nextNode: 'vanity', requiredVisitedNode: 'acquire_will_bedroom_v2', hideIfHasItem: 'drawer_key' },
      
      { text: '벽과 그림을 살펴본다', nextNode: 'examine_walls', requiredVisitedNode: 'acquire_will_bedroom_v2' },
      { text: '창밖을 살펴본다', nextNode: 'window', requiredVisitedNode: 'acquire_will_bedroom_v2' },
      
      // 🪜 다락방 (침실 조사를 어느 정도 한 후에만 표시)
      { text: '🪜 천장의 사다리를 발���한다', nextNode: 'discover_attic_ladder', requiredVisitedNode: 'examine_bed', hideIfVisitedNode: 'discover_attic_ladder' },
      
      // 🚨 서스펜스 이벤트 (침실 조사 중 발생)
      { text: '🚨 갑자기 큰 소리가 들린다!', nextNode: 'sudden_door_slam', requiredVisitedNode: 'examine_bed', hideIfVisitedNode: 'sudden_door_slam' },
      
      { text: '복도로 돌아간다', nextNode: 'upstairs' }
    ]
  },

  window: {
    id: 'window',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `창밖을 본다. 정원이 보이고... 우물이 보인다. 그리고 마차도 여전히 서 있다.\\\\n\\\\n홈즈가 창가에 선다. \\\\\\\"마차가 아직 그대로 있군. 저 마차꾼... 아직 저택을 떠나지 않은 것 같아.\\\\\\\"`,
    choices: [
      { text: '정원으로 내려간다', nextNode: 'back_entrance' },
      { text: '옷장을 조사한다', nextNode: 'wardrobe', hideIfVisitedNode: 'wardrobe' },
      { text: '침실로 돌아간다', nextNode: 'bedroom' }
    ]
  },

  wardrobe: {
    id: 'wardrobe',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `옷장을 연다. 백작의 고급 의복들이 가지런히 걸려있다.

홈즈가 옷들을 살피며 중얼거린다. \\\"흥미롭군...\\\" 그가 검은 코트의 주머니를 확인한다.

주머니에서 전보 한 장이 떨어진다.`,
    choices: [
      { text: '전보를 읽는다', nextNode: 'acquire_telegram_wardrobe', hideIfHasItem: 'telegram' },
      { text: '옷에서 다른 단서를 찾는다', nextNode: 'search_clothes' },
      { text: '침실로 돌아간다', nextNode: 'bedroom' },
      { text: '복도로 나간다', nextNode: 'upstairs' }
    ]
  },

  search_clothes: {
    id: 'search_clothes',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `옷들을 자세히 살핀다. 대부분 고급스러운 독일제 의복이다.

한 코트 소매에서 희미한 잉크 얼룩을 발견한다. 홈즈가 고개를 끄덕인다. \"최근에 편지를 많이 썼어. 서재를 조사해보자.\"`,
    choices: [
      { text: '전보를 먼저 확인한다', nextNode: 'acquire_telegram_wardrobe' },
      { text: '1층 서재로 간다', nextNode: 'main_entrance' }
    ]
  },

  vanity: {
    id: 'vanity',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    speaker: 'watson',
    text: `화장대에 다가간다.

화려한 보석함들... 고급 향수병들... 하지만 모두 먼지가 쌓여있다. 오랫동안 사용하지 않은 흔적이.

홈즈가 서랍을 열어본다.

그 속에서... 작고 정교한 은빛 열쇠가 하나 눈에 띈다. 손잡이에 장미 문양이 새겨져 있다.`,
    choices: [
      { text: '서랍 열쇠를 가져간다', nextNode: 'acquire_drawer_key_vanity', item: 'drawer_key', hideIfHasItem: 'drawer_key' },
      { text: '침실로 돌아간다', nextNode: 'bedroom' }
    ]
  },

  acquire_drawer_key_vanity: {
    id: 'acquire_drawer_key_vanity',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    text: `[아이템 획득: 서랍 열쇠]

작고 정교한 은빛 열쇠를 집어든다. 손잡이에 장미 문양이 섬세하게 새겨져 있다.

홈즈가 열쇠를 살핀다.

[홈즈]: 이건 여성용 장신구 상자나 개인 서랍을 여는 열쇠 같아. 침실 어딘가에 이와 맞는 자물쇠가 있을 거야.

당신이 주변을 둘러보니... 침실 구석의 서랍장이 눈에 들어온다.`,
    choices: [
      { text: '서랍장으로 간다', nextNode: 'bedroom_drawer' },
      { text: '일단 다른 곳을 더 조사한다', nextNode: 'bedroom' }
    ]
  },

  // ========== 침대 주변 조사 ==========
  examine_bed: {
    id: 'examine_bed',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 지하실을 이미 방문한 경우 - 융단 조사에서 비교 가능
        condition: (context) => {
          const basementVisited = ['open_basement', 'basement_interior', 'basement_investigation'];
          return basementVisited.some(node => context.visitedNodes.includes(node));
        },
        text: `침대 주변을 살펴본다.

침대는 깔끔하게 정돈되어 있다. 시트는 고급 린넨이고, 베개는 깃털로 채워져 있다.

홈즈가 침대 밑을 들여다본다.

[홈즈]: 왓슨, 잠깐... 여기 뭔가 있어.

침대 밑에서 작은 종이 쪼가리를 발견한다. 찢어진 편지의 일부분인 것 같다.

홈즈가 조심스럽게 주워 읽는다.

[홈즈]: "...유타에서의 일을 잊을 수 없소. 당신이 저지른 죄는..." 흥미롭군. 편지가 찢어져 있어.

그가 침대 옆 융단에 시선을 둔다.

[홈즈]: 융단 밑도 살펴보자.

홈즈가 융단의 한쪽 끝을 살짝 들춰본다.

[홈즈]: 여기 마루바닥에 얼룩이 있어.

당신이 다가가 본다. 희미한 붉은 얼룩... 그리고 검은 흙자국.

[왓슨]: 이건... 혹시 피?

홈즈가 고개를 젓는다.

[홈즈]: 니야. 와인 자국이야. 하지만 이 검은 흙... 지하실 흙과 비슷해. 누군가 지하실을 다녀온 후 이 방에 들어왔다는 뜻이야.`
      }
    ],
    text: `침대 주변을 살펴본다.

침대는 깔끔하게 정돈되어 있다. 시트는 고급 린넨이고, 베개는 깃털로 채워져 있다.

홈즈가 침대 밑을 들여다본다.

[홈즈]: 왓슨, 잠깐... 여기 뭔가 있어.

침대 밑에서 작은 종이 쪼가리를 발견한다. 찢어진 편지의 일부분인 것 같다.

홈즈가 조심스럽게 주워 읽는다.

[홈즈]: "...유타에서의 일을 잊을 수 없소. 당신이 저지른 죄는..." 흥미롭군. 편지가 찢어져 있어.

그가 침대 옆 융단에 시선을 둔다.

[홈즈]: 융단 밑도 살펴보자.

홈즈가 융단의 한 끝을 살짝 들춰본다.

[홈즈]: 여기 마루바닥에 얼룩이 있어.

당신이 다가가 본다. 희미한 붉은 얼룩... 그리고 검은 흙자국.

[왓슨]: 이건... 혹시 피?

홈즈가 고개를 젓는다.

[홈즈]: 아니야. 와인 자국이야. 하지만 이 검은 흙... 어디선가 가져온 거야. 누군가 밖에서 들어왔거나... 저택 어딘가 습한 곳을 다녀온 것 같아.`,
    choices: [
      { text: '침실로 돌아간다', nextNode: 'bedroom' }
    ]
  },

  // examine_carpet 노드는 이제 사용하지 않음 (침대 조사에 통합됨)

  // ========== 벽과 그림 조사 ==========
  examine_walls: {
    id: 'examine_walls',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'holmes',
    speaker: 'watson',
    conditionalText: [
      {
        // 호프를 만났거나 지하실을 발견한 경우 - 루시 이름 공개
        condition: (context) => {
          const lucyRevealed = ['meet_hope', 'hope_encounter', 'basement_investigation', 'open_basement', 'basement_interior'];
          return lucyRevealed.some(node => context.visitedNodes.includes(node));
        },
        text: `벽을 따라 걸린 그림들을 살펴본다.

대부분 풍경화다. 독일의 성, 산, 호수...

그런데 한 그림이 눈에 띈다. 유타의 황량한 사막을 그린 그림.

홈즈가 그림 앞에 멈춰 선다.

[홈즈]: 왓슨, 이 그림... 유타야. 백작이 왜 유타 그림을 침실에 걸어뒀을까?

그림 뒷면에 작은 글씨가 새겨져 있다.

"용서하소서, 루시... 1861년 유타."

[왓슨]: 루시! 호프가 말했던 바로 그 여성... 백작이 무언가 죄책감을 느끼고 있었던 것 같습니다.`
      }
    ],
    text: `벽을 따라 걸린 그림들을 살펴본다.

대부분 풍경화다. 독일의 성, 산, 호수...

그런데 한 그림이 눈에 띈다. 유타의 황량한 사막을 그린 그림.

홈즈가 그림 앞에 멈춰 선다.

[홈즈]: 왓슨, 이 그림... 유타야. 백작이 왜 유타 그림을 침실에 걸어뒀을까?

그림 뒷면에 작은 글씨가 새겨져 있다.

"용서하소서, L... 1861년 유타."

[홈즈]: 유타... 1861년... 그리고 이니셜 L. 백작의 과거에 무언가 숨겨진 사건이 있었던 것 같아.`,
    choices: [
      { text: '다른 그림도 살펴본다', nextNode: 'examine_paintings' },
      { text: '침실로 돌아간다', nextNode: 'bedroom' }
    ]
  },

  examine_paintings: {
    id: 'examine_paintings',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'watson',
    speaker: 'watson',
    conditionalText: [
      {
        // 호프를 만났거나 지하실을 발견한 경우 - 루시 이름 공개
        condition: (context) => {
          const lucyRevealed = ['meet_hope', 'hope_encounter', 'basement_investigation', 'open_basement', 'basement_interior'];
          return lucyRevealed.some(node => context.visitedNodes.includes(node));
        },
        text: `다른 그림들도 하나하나 살펴본다.\n\n독일 하이델베르크 성... 라인강... 슈바르츠발트...\n\n모두 백작의 고향과 관련된 그림들이다.\n\n그런데 그림들 사이에 작은 사진 액자가 하나 있다.\n\n흐릿한 흑백 사진. 젊은 여성과 어린 소녀가 함께 찍은 사진이다.\n\n뒷면에 글씨가 있다. \"루시와 엘렌, 1861년 11월 22일.\"\n\n작은 글씨로: \"사랑하는 딸에게. - 루시\"\n\n당신은 숨이 멎는다.\n\n[왓슨]: 루시... 그리고 엘렌! 출산 이틀 후... 루시가 딸과 함께한 마지막 순간들이었군요.\n\n홈즈가 사진을 유심히 본다.\n\n[홈즈]: 사흘 후... 루시는 의식 제단에 끌려갔고, 엘렌은 호프가 숨겼을 거야.\n\n[왓슨]: 그리고 백작은... 루시를 죽이고 나서... 엘렌을 찾아 데려왔군요.\n\n[홈즈]: 20년간... 그는 루시의 딸을 키우며 속죄했던 거지.`
      }
    ],
    text: `다른 그림들도 하나하나 살펴본다.

독일 하이델베르크 성... 라인강... 슈바르츠발트...

모두 백작의 고향과 관련된 그림들이다.

그런데 그림들 사이에 작은 사진 액자가 하나 있다.

흐릿한 흑백 사진. 젊은 여성과 어린 소녀가 함께 찍은 사진이다.

뒷면에 글씨가 있다. "L... 그리고 엘렌, 1860년."

홈즈가 사진을 유심히 본다.

[홈즈]: 이니셜 L... 그리고 엘렌. 백작의 과거에 이 두 사람이 중요한 역할을 했던 것 같아.`,
    choices: [
      { text: '침실로 돌아간다', nextNode: 'bedroom' },
      { text: '복도로 나간다', nextNode: 'upstairs' }
    ]
  },

  // 비밀 통로 관련 노드들 제거
  // secret_passage, examine_passage_traces, secret_passage_end 제거됨

  // ========== 다락방 노드들 ==========
  discover_attic_ladder: {
    id: 'discover_attic_ladder',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'bedroom',
    character: 'watson',
    speaker: 'watson',
    text: `천장을 올려다보다가... 문득 이상한 것을 발견한다.

침실 구석, 옷장 바로 옆 천장에... 희미한 틈이 보인다.

홈즈가 당신의 시선을 따라 천장을 본다.

[홈즈]: 왓슨, 저건... 다락방 입구야!

그가 옷장을 옆으로 조금 밀자, 벽면에 접혀있던 작은 사다리가 드러난다.

[왓슨]: 이렇게 감춰져 있었군요... 

홈즈가 사다리를 내린다. 오래된 나무 사다리가 삐걱거리며 펼쳐진다.

[홈즈]: 누군가 이 다락방을 사용했어. 먼지가 적고... 사다리에 최근 손자국이 있어.`,
    choices: [
      { text: '🪜 다락방으로 올라간다', nextNode: 'attic_hub' },
      { text: '나중에 조사하기로 한다', nextNode: 'bedroom_hub' }
    ]
  },

  attic_interior: {
    id: 'attic_interior',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    speaker: 'watson',
    conditionalText: [
      {
        // 엘렌을 만난 경우 - 엘렌의 거주 흔적을 구체적으로 인식
        condition: (context) => {
          const ellenMet = ['ellen_first_meet', 'ellen_encounter', 'ellen_reveal'];
          return ellenMet.some(node => context.visitedNodes.includes(node));
        },
        text: `사다리를 타고 다락방으로 올라간다.

좁은 공간... 하지만 예상보다 깔끔하게 정돈되어 있다.

작은 침대, 책상, 그리고 촛대가 놓여있다. 누군가 이곳에서... 살았다.

[왓슨]: 홈즈, 이곳은... 엘렌의 방입니다!

홈즈가 고개를 끄덕인다.

[홈즈]: 그래. 백작이 엘렌을 숨기기 위해 만든 공간이야. 20년간... 엘렌은 이 좁은 다락방에서...

책상 위에 낡은 일기장이 놓여있다. 표지에 작은 글씨로 "엘렌의 일기"라고 적혀있다.

선반에는 몇 권의 책들... "셰익스피어 전집", "성경", "과학 입문"... 백작이 엘렌을 교육한 흔적이다.

침대 옆 벽에는 작은 창문이 있다. 하지만 두꺼운 커튼으로 가려져 있다.

[홈즈]: 외부에서 보이지 않도록... 백작이 철저하게 숨겼군.

당신은 가슴이 먹먹해진다. 엘렌... 20년간 이 좁은 공간에서...`
      }
    ],
    text: `사다리를 타고 다락방으로 올라간다.

좁은 공간... 하지만 예상보다 깔끔하게 정돈되어 있다.

작은 침대, 책상, 그리고 촛대가 놓여있다. 누군가 이곳에서... 살았다.

홈즈가 주변을 살핀다.

[홈즈]: 왓슨, 이곳은 누군가의 거주 공간이야. 최근까지 사용한 흔적이 보여.

책상 위에 낡은 일기장이 놓여있다.

선반에는 몇 권의 책들... "셰익스피어 전집", "성경", "과학 입문"...

침대 옆 벽에는 작은 창문이 있다. 하지만 두꺼운 커튼으로 가려져 있다.

[홈즈]: 외부에서 보이지 않도록... 누군가를 철저하게 숨긴 것 같아.

당신은 주변을 살핀다. 누가 이곳에 살았을까?`,
    choices: [
      { text: '📖 책상 위 일기장을 읽는다', nextNode: 'ellen_diary_attic', hideIfVisitedNode: 'ellen_diary_attic' },
      { text: '🛏️ 침대 주변을 조사한다', nextNode: 'attic_bed_area', hideIfVisitedNode: 'attic_bed_area' },
      { text: '📚 책장을 살펴본다', nextNode: 'attic_bookshelf', hideIfVisitedNode: 'attic_bookshelf' },
      { text: '🪜 사다리를 타고 내려간다', nextNode: 'bedroom' }
    ]
  },

  ellen_diary_attic: {
    id: 'ellen_diary_attic',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    speaker: 'watson',
    text: `일기장을 조심스럽게 펼친다. 표지에 "엘렌의 일기"라고 적혀있다.

**1875년 3월 1일**
오늘은 제 다섯 번째 생일이에요.
아버지가 케이크를 만들어주셨어요. 
하지만 밖에 나갈 수는 없어요. 
아버지가 "위험하다"고 하셨어요.

**1878년 7월 15일**
창밖을 봤어요. 새들이 자유롭게 날아가요.
저도 언젠가... 밖에 나갈 수 있을까요?
아버지는 \"언젠가는\"이라고만 하세요.

**1881년 11월 20일**
오늘 아버지가 울고 계셨어요.
제가 물어봤더니... "어머니 생각이 났다"고 하셨어요.
어머니... 저는 어머니를 본 적이 없어요.
하지만 아버지는 항상 말씀하세요. "넌 어머니를 닮았다"고.

**1885년 5월 3일**
드레버 아저씨가 또 왔어요.
저는 다락방에 숨어야 했어요.
무서워요... 왜 저는 항상 숨어야 하는 걸까요?

마지막 페이지:

**1886년 12월 18일 (어제)**
아버지가 이상해요. 너무 괴로워하세요.
무슨 일이 일어나려는 걸까요?
두려워요...

홈즈가 일기를 읽고 침묵한다.

[홈즈]: 엘렌... 20년간 갇혀 살았군. 백작은 그녀를 지키려 했지만... 감옥이나 다름없었어.`,
    choices: [
      { text: '다른 곳을 조사한다', nextNode: 'attic_interior' },
      { text: '침실로 내려간다', nextNode: 'bedroom' }
    ]
  },

  attic_bed_area: {
    id: 'attic_bed_area',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    speaker: 'watson',
    text: `침대 주변을 살펴본다.

작은 침대... 하지만 정성스럽게 만들어진 이불과 베개가 있다.

침대 옆 작은 상자를 열어본다.

안에는... 손수건, 리본, 작은 인형... 여자아이가 소중히 간직했을 물건들이다.

그리고 작은 사진 한 장.

젊은 여성의 사진이다. 뒷면에 글씨가 있다.

"사랑하는 엘렌에게. 항상 너를 지켜볼게. - 엄마"

[왓슨]: 루시... 엘렌의 어머니...

홈즈가 사진을 본다.

[홈즈]: 백작이 엘렌에게 준 거야. 어머니를 기억하게 하려고...

당신은 가슴이 아프다. 엘렌... 어머니의 사진만 보며 자랐을...`,
    choices: [
      { text: '다른 곳을 조사한다', nextNode: 'attic_interior' }
    ]
  },

  attic_bookshelf: {
    id: 'attic_bookshelf',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'holmes',
    speaker: 'watson',
    text: `책장을 살펴본다.

셰익스피어, 괴테, 실러... 고전 문학들.

과학 입문서, 역사책, 지리책...

홈즈가 책들을 펼쳐본다.

[홈즈]: 백작이 엘렌을 교육했군. 체계적으로...

책 사이에서 종이 한 장이 떨어진다.

백작의 필체로 쓴 메모다.

"엘렌, 
세상은 넓고 아름답단다.
언젠가 너도 자유롭게 세상을 보게 될 거야.
그때까지... 이 책들로 세상을 배우렴.
- 아버지"

홈즈가 메모를 접는다.

[홈즈]: 백작은... 엘렌을 사랑했어. 하지만 자유를 줄 수는 없었지.`,
    choices: [
      { text: '다른 곳을 조사한다', nextNode: 'attic_interior' }
    ]
  }
};