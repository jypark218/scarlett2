import { StoryNode } from '../../../types/story';

/**
 * 🎭 드레버 - 회차별 추가 관찰
 */

export const drebberHints: Record<string, StoryNode> = {
  drebber_playcount_2_question: {
    id: 'drebber_playcount_2_question',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    conditionalText: [
      {
        // 지하실을 이미 방문한 경우 - 홈즈가 즉시 연결
        condition: (context) => {
          const basementVisited = ['open_basement', 'basement_interior', 'basement_investigation'];
          return basementVisited.some(node => context.visitedNodes.includes(node));
        },
        text: `드레버가 담배를 피우고 있다. 홈즈가 그의 구두를 주시한다.

[홈즈]: (조용히) 왓슨, 저 구두 밑창을 보게.

드레버가 당황하며 발을 뒤로 뺀다.

[드레버]: 왜... 왜 내 구두를 봅니까?

홈즈의 눈이 날카로워진다.

[홈즈]: 검은 진흙이 묻어있군요. 흥미롭게도... 지하실과 똑같은 진흙이에요.

드레버의 얼굴이 새하얗게 변한다.

[홈즈]: 드레버 씨, 당신 지하실에 가셨죠? 그것도 최근에. 진흙이 아직 마르지 않았어요.

[드레버]: 나, 나는... 산책을...

홈즈가 드레버의 손을 본다. 손톱 밑에 같은 진흙이 끼어있다.`
      }
    ],
    text: `드레버가 담배를 피우고 있다. 홈즈가 그의 구두를 주시한다.

[홈즈]: (조용히) 왓슨, 저 구두 밑창을 보게.

드레버가 당황하며 발을 뒤로 뺀다.

[드레버]: 왜... 왜 내 구두를 봅니까?

[홈즈]: 검은 진흙이 묻어있군요. 흥미롭게도... 여관 근처 토양은 붉은 점토질인데 말이죠.

드레버의 얼굴이 창백해진다.

[홈즈]: 그리고 그 진흙의 습기... 아직 마르지 않았습니다. 어젯밤이 아니라... 최근 몇 시간 이내에 묻은 거죠.

[드레버]: 나는... 산책을...

홈즈가 드레버의 손을 본다. 손톱 밑에 같은 진흙이 끼어있다.`,
    choices: [
      { text: '[지하실 조사 후] 진흙 성분을 대조한다', nextNode: 'drebber_mud_match', requiredItem: 'basement_soil' },
      { text: '손톱의 진흙을 지적한다', nextNode: 'drebber_fingernail_evidence' },
      { text: '일단 물러난다', nextNode: 'continue_investigation_2' }
    ]
  },

  drebber_fingernail_evidence: {
    id: 'drebber_fingernail_evidence',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    conditionalText: [
      {
        // 지하실을 이미 방문한 경우 - 더 강한 압박
        condition: (context) => {
          const basementVisited = ['open_basement', 'basement_interior', 'basement_investigation'];
          return basementVisited.some(node => context.visitedNodes.includes(node));
        },
        text: `홈즈가 드레버의 손을 가리킨다.

[홈즈]: 손톱 밑의 진흙은 설명하시겠습니까?

드레버가 손을 주머니에 넣는다.

[드레버]: 산책 중에... 넘어져서...

[홈즈]: 드레버 씨, 저는 이미 지하실을 조사했습니다. 창문 밖 흙이 파헤쳐진 흔적을 봤어요.

드레버가 담배를 떨어뜨린다.

[홈즈]: 손톱 밑에 진흙이 들어가려면, 무언가를 '판' 거나 '붙잡은' 거죠. 지하실 창문을 열려고 했죠?

드레버의 이마에 땀이 맺힌다.

[드레버]: ...맞소. 창문이... 잠겨있어서... 손으로 흙을 파서 열려고...

[왓슨]: 왜 지하실에 들어가려 했습니까?

홈즈와 당신이 시선을 교환한다. 드레버가 뭔가를 찾고 있었다.`
      }
    ],
    text: `홈즈가 드레버의 손을 가리킨다.

[홈즈]: 손톱 밑의 진흙은 설명하시겠습니까?

드레버가 손을 주머니에 넣는다.

[드레버]: 산책 중에... 넘어져서...

[홈즈]: 손톱 밑에 진흙이 들어가려면, 무언가를 '판' 거나 '붙잡은' 거죠. 단순히 넘어져서는 불가능합니다.

드레버가 담배를 떨어뜨린다.

[왓슨]: 무엇을 파셨습니까?

드레버가 입술을 깨문다. 그의 이마에 땀이 맺힌다.

[드레버]: ...창문이었소. 지하실 창문이... 잠겨있어서... 손으로 흙을 파서 열려고...

홈즈와 당신이 시선을 교환한다.`,
    choices: [
      { text: '왜 지하실에 들어가려 했는지 묻는다', nextNode: 'drebber_basement_reason' },
      { text: '지하실을 직접 조사한다', nextNode: 'find_basement' }
    ]
  },

  drebber_basement_reason: {
    id: 'drebber_basement_reason',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `[홈즈]: 지하실에 뭐가 있습니까?

드레버가 잠시 침묵한다. 그리고 조용히 대답한다.

[드레버]: ...편지요.

[왓슨]: 편지?`,
    choices: [
      { text: '누구를 봤는지 묻는다', nextNode: 'drebber_witness' },
      { text: '10년 전 일에 대해 묻는다', nextNode: 'drebber_past_indirect' }
    ]
  },

  drebber_witness: {
    id: 'drebber_witness',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `[홈즈]: 누구를 보았습니까?

드레버가 창밖을 본다.

[드레버]: 분명하진 않소... 비가 오고 어두웠으니... 하지만 키가 큰 남자였어. 외투를 입고...

[왓슨]: 얼굴은?

[드레버]: 못 봤소. 하지만... (떨리는 목소리로) 그가 뭔가를 들고 있었어. 가방 같은...

홈즈가 번뜩이는 눈으로 묻는다.

[홈즈]: 의료 가방?

드레버가 놀라 홈즈를 본다.

[드레버]: 어떻게...

[홈즈]: 시간은 정확히 언제였습니까?

[드레버]: 11시 45분에서 자정 사이... 그는 저택 뒤쪽으로... 지하실 쪽으로 갔소.`,
    choices: [
      { text: '스탠거슨을 다시 심문한다', nextNode: 'stangerson_timeline_confront' },
      { text: '지하실을 조사한다', nextNode: 'find_basement' }
    ]
  },

  drebber_past_indirect: {
    id: 'drebber_past_indirect',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈가 파이프를 피운다.

[홈즈]: 드레버 씨, 당신 손의 떨림... 매일 술을 마시는 사람의 것이 아니군요.

드레버가 손을 주먹 쥔다.

[홈즈]: 공포죠. 10년 전 일에 대한... 아니, 더 정확히는 '그 사람'에 대한 공포.

드레버가 숨을 멈춘다.

[홈즈]: 루시 페리어... 그리고 제퍼슨 호프.

드레버가 의자를 붙잡는다.

[드레버]: (떨리는 목소리로) 어떻게... 어떻게 그 이름을...

홈즈가 로켓 사진을 보여준다.

[홈즈]: 우물에서 발견했습니다. 그가 여기 있죠?`,
    choices: [
      { text: '드레버의 반응을 관찰한다', nextNode: 'drebber_hope_reaction' }
    ]
  },

  drebber_hope_reaction: {
    id: 'drebber_hope_reaction',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `드레버가 로켓을 보고 얼굴이 새하얗게 변한다.

[드레버]: 안 돼... 안 돼... 그가 찾아왔어...

그가 벌벌 떨기 시작한다.

[드레버]: 20년... 20년을 도망쳤는데... 그가 결국...

홈즈가 조용히 관찰한다. 당신은 드레버의 공포가 연기가 아님을 알 수 있다.

[드레버]: 스탠거슨도... 스탠거슨도 알고 있을 거요. 우리 둘 다... 우리 둘 다 그날 밤...

그가 말을 멈추고 창밖을 본다.

[드레버]: (중얼거리듯) 복수... 그가 복수하러 온 거야...

홈즈가 당신을 본다. 뭔가 큰 그림이 보이기 시작한다.`,
    choices: [
      { text: '제퍼슨 호프를 찾는다', nextNode: 'search_hope_urgently' },
      { text: '스탠거슨에게 확인한다', nextNode: 'stangerson_hope_question' }
    ]
  },

  drebber_mud_match: {
    id: 'drebber_mud_match',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈가 지하실에서 가져온 토양 샘플과 드레버의 구두 진흙을 비교한다.

돋보기로 자세히 관찰한 후, 홈즈가 고개를 끄덕인다.

[홈즈]: 일치합니다. 같은 성분이에요 - 검은빛 진흙, 이끼, 석회질...

드레버가 뒤로 물러선다.

[홈즈]: 드레버 씨, 당신은 여관이 아니라 이 저택 지하실에 있었습니다.

[드레버]: 나는... 나는 단지...

[왓슨]: 백작을 만났습니까?

드레버가 고개를 젓는다.

[드레버]: 아니! 창문이 열리지 않아서... 들어가지도 못했소!

홈즈가 그의 눈을 응시한다. 거짓말 탐지하듯.

[홈즈]: ...진실이군요. 당신은 들어가지 못했어요.`,
    choices: [
      { text: '그렇다면 누가 들어갔나', nextNode: 'who_entered_basement' },
      { text: '지하실을 더 조사한다', nextNode: 'find_basement' }
    ]
  },

  who_entered_basement: {
    id: 'who_entered_basement',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    conditionalText: [
      {
        // 지하실을 이미 방문한 경우
        condition: (context) => {
          const basementVisited = ['open_basement', 'basement_interior', 'basement_investigation'];
          return basementVisited.some(node => context.visitedNodes.includes(node));
        },
        text: `당신은 생각을 정리한다.\n\n드레버는 지하실에 들어가지 못했다. 하지만 지하실엔 발자국이 있었고, 진흙이 있었다.\n\n[왓슨]: (그렇다면 누가 들어간 거지?)\n\n홈즈가 중얼거린다.\n\n[홈즈]: 세 가지 가능성이야. 첫째, 백작 본인. 둘째, 스탠거슨 - 의료 가방을 든 남자. 셋째...\n\n그가 로켓을 본다.\n\n[홈즈]: 제퍼슨 호프... 복수자.\n\n당신은 우물로 가야 할 것 같은 예감이 든다.`
      }
    ],
    text: `당신은 생각을 정리한다.\n\n드레버는 들어가지 못했다고 했다. 하지만... 저택 어딘가에 검은 진흙이 있을 것이다.\n\n[왓슨]: (누가 그 장소를 다녀온 거지?)\n\n홈즈가 중얼거린다.\n\n[홈즈]: 세 가지 가능성이야. 첫째, 백작 본인. 둘째, 스탠거슨 - 의료 가방을 든 남자. 셋째...\n\n그가 로켓을 본다.\n\n[홈즈]: 제퍼슨 호프... 복수자.\n\n당신은 저택을 더 조사해야 할 것 같다.`,
    choices: [
      { text: '우물로 간다', nextNode: 'well' },
      { text: '저택을 계속 조사한다', nextNode: 'main_entrance' }
    ]
  }
};