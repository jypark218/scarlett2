import { StoryNode } from '../../../types/story';

/**
 * 🕵️ 홈즈와의 추리 대화 - 롤플레이 중심
 */

export const holmesHints: Record<string, StoryNode> = {
  holmes_hint_playcount_2: {
    id: 'holmes_hint_playcount_2',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    conditionalText: [
      {
        // 스탠거슨을 발견하지 못한 경우 - 집사의 부재가 이상함
        condition: (context) => !context.visitedNodes.includes('discover_stangerson'),
        text: `홈즈가 담배를 피우며 창밖을 바라본다.

[홈즈]: 이상해, 왓슨.

[왓슨]: 무엇이 말입니까?

[홈즈]: 백작의 저택인데... 집사가 보이지 않아. 주인이 실종되면 집사는 경찰에 신고하거나, 최소한 저택을 지켜야 하는데...

그가 담배 연기를 내뿜는다.

[홈즈]: 도망갔거나... 아니면 숨어있거나. 둘 중 하나겠지.

[왓슨]: 범인일 가능성도...?

[홈즈]: 서두르지 말게. 그보다... 이 사건, 뭔가 표면적인 것과 숨겨진 것의 괴리가 크다는 느낌이 들어.

그가 손가락으로 공중에 무언가를 그린다.

[홈즈]: 우리가 보는 것... RACHE, 혈흔, 발자국. 하지만 그 뒤에... 20년 전부터 이어져온 무언가가 있어.`
      },
      {
        // 지하실을 이미 방문한 경우 - 진흙에 대한 추리
        condition: (context) => {
          const basementVisited = ['open_basement', 'basement_interior', 'basement_investigation'];
          return basementVisited.some(node => context.visitedNodes.includes(node));
        },
        text: `홈즈가 담배를 피우며 생각에 잠겨있다.

[홈즈]: 왓슨, 자네 드레버의 구두를 봤나?

[왓슨]: 보긴 했습니다만...

[홈즈]: 진흙이야. 검은빛 도는 갈색 진흙. 그런데 여관 주변 토양은 붉은 점토질이었지.

그가 돋보기를 만지작거린다.

[홈즈]: 지하실의 진흙이 그와 같았어. 습기 많고, 이끼 성분이 섞인... 

[왓슨]: 그렇다면 드레버가 지하실에?

[홈즈]: 가능성이 높아. 문제는... 언제, 왜, 그리고... 

그가 잠시 말을 멈춘다.

[홈즈]: 혼자였을까? 아니면 누군가와 함께?`
      }
    ],
    text: `홈즈가 담배를 피우며 창밖을 바라본다.

[홈즈]: 왓슨, 이 사건... 단순한 살인이 아니야.

[왓슨]: 무슨 뜻입니까?

[홈즈]: 20년 전의 사건과 연결되어 있어. 교단, 루시, 그리고... 백작의 과거.

그가 담배 연기를 내뿜는다.

[홈즈]: 우리가 보는 건 빙산의 일각이지. 그 아래... 훨씬 더 깊은 무언가가 숨어있어.`,
    choices: [
      { text: '진흙의 의미에 대해 묻는다', nextNode: 'holmes_mud_connection', requiredVisitedNode: 'open_basement' },
      { text: '20년 전 사건에 대해 묻는다', nextNode: 'holmes_past_theory' },
      { text: '대화를 마친다', nextNode: 'main_entrance' }
    ]
  },

  holmes_mud_connection: {
    id: 'holmes_mud_connection',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `[왓슨]: 진흙... 드레버가 지하실에 있었다는 증거일까요?

홈즈가 고개를 끄덕인다.

[홈즈]: 그의 알리바이는 여관이었지. 하지만 구두의 진흙은 거짓말을 하지 않아.

[왓슨]: 그렇다면 그가 백작을...

[홈즈]: 기다려, 왓슨. 드레버가 지하실에 갔다는 건 확실해. 하지만 그가 '살인자'라는 결론은... 아직 이르네.

그가 턱을 쓰다듬는다.

[홈즈]: 오히려 의문이 생겨. 왜 드레버는 지하실에 갔을까? 무엇을 찾았을까? 그리고...

그의 눈빛이 날카로워진다.

[홈즈]: 백작은 정말 지하실에서 죽었을까?`,
    choices: [
      { text: '스탠거슨의 의료 가방도 의심스럽다', nextNode: 'holmes_medical_bag_hint', requiredVisitedNode: 'discover_stangerson' },
      { text: '대화를 마친다', nextNode: 'main_entrance' }
    ]
  },

  holmes_past_theory: {
    id: 'holmes_past_theory',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `[왓슨]: 20년 전 사건... 교단과 루시의 죽음이 이번 사건과 연결되어 있다고 보십니까?

홈즈가 파이프를 내려놓는다.

[홈즈]: 호프가 20년간 복수를 준비했어. 드레버와 스탠거슨도 그때 거기 있었지. 그리고 백작...

그가 잠시 생각에 잠긴다.

[홈즈]: 백작이 가해자일까, 아니면 피해자일까?

[왓슨]: 교단의 교주급 설교자였다면 가해자 아닙니까?

[홈즈]: 그렇게 보이지. 하지만 왓슨... 사람은 변할 수 있어. 20년은 긴 시간이야.

그가 창밖을 바라본다.

[홈즈]: 백작이 속죄하려 했다면? 루시를 구하려 했다면? 그렇다면... 진짜 범인은 따로 있을지도 몰라.`,
    choices: [
      { text: '대화를 마친다', nextNode: 'main_entrance' }
    ]
  },

  holmes_meta_hint: {
    id: 'holmes_meta_hint',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `[왓슨]: 홈즈, 괜찮습니까?

홈즈가 이상한 미소를 짓는다.

[홈즈]: 아, 미안하네. 가끔... 이미 알고 있는 것처럼 느껴질 때가 있어.

[왓슨]: 무슨 말씀인지...

[홈즈]: 데자뷰라고 해야 하나. 이 사건을... 전에도 본 것 같은 느낌.

그가 고개를 젓는다.

[홈즈]: 추리의 부작용이겠지. 너무 많은 사건을 다루다보니...

[왓슨]: 쉬는 게 좋겠습니다.

[홈즈]: 아니, 괜찮아. 오히려... 이 직감이 맞을 때가 있거든. 이 저택에... 뭔가 중요한 게 숨어있어.`,
    choices: [
      { text: '알겠습니다', nextNode: 'main_entrance' }
    ]
  },

  holmes_medical_bag_hint: {
    id: 'holmes_medical_bag_hint',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `[왓슨]: 스탠거슨의 의료 가방... 혈흔이 있었습니다.

홈즈가 고개를 끄덕인다.

[홈즈]: 그의 설명은 '환자 치료 중'이었지. 의사라면 혈흔이 있는 건 자연스러워.

[왓슨]: 하지만 신선한 혈흔이라면...

[홈즈]: 가능성은 있어. 하지만 왓슨, 혈흔보다 더 궁금한 게 있네.

그가 가방을 가리킨다.

[홈즈]: 약병이야. 의료 가방엔 통상 진통제, 소독약... 그리고 독극물도 있지.

당신은 소름이 돋는다.

[홈즈]: 독극물이 줄어들어 있다면... 그게 중요한 단서가 될 거야.`,
    choices: [
      { text: '가방을 더 조사한다', nextNode: 'inspect_medical_bag_detail' },
      { text: '대화를 마친다', nextNode: 'main_entrance' }
    ]
  },

  inspect_medical_bag_detail: {
    id: 'inspect_medical_bag_detail',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `홈즈와 함께 의료 가방을 세밀하게 조사한다.

약병들을 하나씩 확인하는데... 스트리크닌 병이 반쯤 비어있다.

[왓슨]: 이건...

[홈즈]: 치명적인 독이지. 그런데 왓슨, 시체를 기억하나?

[왓슨]: RACHE만 있었습니다. 독극물 증상은 없었고요.

[홈즈]: 바로 그거야. 그렇다면 이 독은... 누구를 위한 걸까?

그가 턱을 쓰다듬는다.

[홈즈]: 사용되지 않았거나... 아니면 아직 사용될 예정이거나.

당신은 불안해진다.`,
    choices: [
      { text: '스탠거슨에게 추궁한다', nextNode: 'stangerson_poison_confront' },
      { text: '증거로 보관한다', nextNode: 'main_entrance' }
    ]
  }
};