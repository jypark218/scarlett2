import { StoryNode } from '../../types/story';

/**
 * 🎯 최종 추리 허브 (Final Deduction Hub)
 * 
 * 목적:
 * 1. 모든 증거와 증언 종합
 * 2. 진범 지목 시스템
 * 3. 역전재판 스타일 추궁
 * 4. 엔딩 분기 결정
 * 
 * 진행 조건:
 * - 주요 허브 방문 완료
 * - 핵심 증거 3개 이상
 * - NPC 대화 완료
 */

export const finalDeductionNodes: Record<string, StoryNode> = {

  // ═══════════════════════════════════════════════════════
  // 🆕 최종 추리 진입 (조건 체크)
  // ═══════════════════════════════════════════════════════

  final_deduction_checkpoint: {
    id: 'final_deduction_checkpoint',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    conditionalText: [
      {
        // 모든 조건 충족 시
        condition: (context) => {
          const hasEnoughEvidence = context.items.length >= 3;
          const visitedKeyLocations = [
            'examine_ritual_tools',
            'read_count_confession',
            'inn_conclusion'
          ].every(node => context.visitedNodes.includes(node));
          const talkedToNPCs = [
            'stangerson_hub',
            'count_hub',
            'ellen_hub'
          ].some(node => context.visitedNodes.includes(node));
          
          return hasEnoughEvidence && visitedKeyLocations && talkedToNPCs;
        },
        text: `홈즈가 모든 증거를 정리한다.

[홈즈]: 왓슨, 이제 모든 조각이 맞춰졌어.

당신이 증거들을 나열한다:
${(context) => context.items.map(item => `• ${item}`).join('\n')}

[홈즈]: 루시의 죽음, 엘렌의 감금, 호프의 복수, 백작의 속죄...

[홈즈]: 그리고... 진범.

홈즈가 당신을 본다.

[홈즈]: 왓슨, 자네가 말해보게. 누가 이 모든 일을 꾸몄을까?`
      }
    ],
    text: `홈즈가 증거를 정리하려 하지만... 멈춘다.

[홈즈]: 왓슨, 아직 충분하지 않아.

[왓슨]: 뭐가 부족하죠?

[홈즈]: 증거가 더 필요해. 그리고... 각 용의자의 증언도 확보해야 해.

홈즈가 당신을 본다.

[홈즈]: 서두르지 말게. 탐정의 추리는... 모든 퍼즐 조각이 모였을 때 시작하는 거야.

**[힌트: 지하실 의식실을 조사하고, 백작/스탠거슨과 대화하세요]**`,
    choices: [
      { text: '💎 "추리를 시작합니다"', nextNode: 'final_deduction_hub', showIf: (context) => {
        const hasEnoughEvidence = context.items.length >= 3;
        const visitedKeyLocations = [
          'examine_ritual_tools',
          'read_count_confession',
          'inn_conclusion'
        ].every(node => context.visitedNodes.includes(node));
        const talkedToNPCs = [
          'stangerson_hub',
          'count_hub'
        ].some(node => context.visitedNodes.includes(node));
        
        return hasEnoughEvidence && visitedKeyLocations && talkedToNPCs;
      }},
      { text: '🔍 "더 조사하겠습니다"', nextNode: 'main_entrance' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🆕 최종 추리 허브
  // ═══════════════════════════════════════════════════════

  final_deduction_hub: {
    id: 'final_deduction_hub',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 서재 한가운데 천천히 걸어 나온다. 손에는 파이프를 들고 있다.

[홈즈]: (파이프 연기를 깊게 들이마신 뒤 내뿜으며) 자, 왓슨. 이제 시작하지. 주홍색 연구의 마지막 장을...

당신이 증거들을 하나하나 테이블 위에 펼친다. 편지들, 메모, 로켓, 피 묻은 천...

홈즈가 증거들을 천천히 바라본다. 시간이 멈춘 것 같다.

[홈즈]: (진지하게, 당신의 눈을 똑바로 보며) 왓슨, 자네의 추리를 들려주게.

[홈즈]: (손가락으로 테이블을 톡톡 두드리며) 누가 모로 백작을 지하실에 감금했나?

[홈즈]: 그리고... 누가 "영원한 신부 의식"을 계획했나? 이 모든 비극의 설계자는 누구지?

홈즈의 회색 눈이 날카롭게 빛난다.

[홈즈]: (경고하듯) 신중하게 생각하게. 잘못된 추리는... 무고한 사람을 범인으로 만들 수도 있어. 그리고 진짜 범인을 놓칠 수도 있지.

[왓슨]: (긴장하며 증거들을 다시 본다)

누구를 지목하시겠습니까?`,
    choices: [
      { 
        text: '🎯 제퍼슨 호프 - "복수자"', 
        nextNode: 'accuse_hope',
        hideIfVisitedNode: 'accuse_hope'
      },
      { 
        text: '🎯 이노크 드레버 - "채무자"', 
        nextNode: 'accuse_drebber',
        hideIfVisitedNode: 'accuse_drebber'
      },
      { 
        text: '🎯 조셉 스탠거슨 - "비서"', 
        nextNode: 'accuse_stangerson',
        hideIfVisitedNode: 'accuse_stangerson'
      },
      { 
        text: '🎯 모로 백작 - "교단 설교자"', 
        nextNode: 'accuse_count',
        hideIfVisitedNode: 'accuse_count'
      },
      {
        text: '💡 "증거를 다시 검토합니다"',
        nextNode: 'review_evidence'
      },
      {
        text: '🔄 "잠깐, 다시 생각해봅시다"',
        nextNode: 'reconsider_deduction',
        showIf: (context) => {
          const accusedSomeone = [
            'accuse_hope',
            'accuse_drebber',
            'accuse_stangerson',
            'accuse_count'
          ].some(node => context.visitedNodes.includes(node));
          return accusedSomeone;
        }
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🔍 증거 재검토
  // ═══════════════════════════════════════════════════════

  review_evidence: {
    id: 'review_evidence',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 증거들을 하나씩 집어든다.

[홈즈]: 증거를 다시 살펴보지.

**획득한 증거:**
• 루시의 편지 - 우물에서 발견
• 의식 계획 메모 - 의식실에서 발견
• 협박 편지들 - 여관 드레버 방에서 발견
• 백작의 고백 일기 - 속죄실에서 발견

[홈즈]: 그리고 각 용의자의 동기...

**제퍼슨 호프:**
- 동기: 루시에 대한 복수
- 행적: 마차꾼으로 위장, 백작 감금
- 증언: "의식을 막으려 했다"

**이노크 드레버:**
- 동기: 경제적 궁지, 백작에 대한 원한
- 행적: 여관 알리바이 거짓, 저택 침입 흔적
- 증언: 협박 편지 수신

**조셉 스탠거슨:**
- 동기: 불명확
- 행적: 백작의 비서, 3일 전 밤 목격자
- 증언: 드레버와 호프 언급

**모로 백작:**
- 동기: 루시에 대한 속죄, 엘렌 보호
- 행적: 20년간 엘렌 감금, 교단 탈퇴
- 증언: "의식은 계획하지 않았다"

홈즈가 당신을 본다.

[홈즈]: 패턴이 보이는가?`,
    choices: [
      { text: '🎯 "호프가 범인입니다"', nextNode: 'accuse_hope', hideIfVisitedNode: 'accuse_hope' },
      { text: '🎯 "드레버가 범인입니다"', nextNode: 'accuse_drebber', hideIfVisitedNode: 'accuse_drebber' },
      { text: '🎯 "스탠거슨이 범인입니다"', nextNode: 'accuse_stangerson', hideIfVisitedNode: 'accuse_stangerson' },
      { text: '🎯 "백작이 범인입니다"', nextNode: 'accuse_count', hideIfVisitedNode: 'accuse_count' },
      { text: '🔙 "다시 생각하겠습니다"', nextNode: 'final_deduction_hub' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎯 호프 지목
  // ═══════════════════════════════════════════════════════

  accuse_hope: {
    id: 'accuse_hope',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    speaker: 'watson',
    text: `"호프가 범인입니다."

홈즈가 고개를 끄덕인다.

[홈즈]: 근거는?

[왓슨]: 백작을 감금한 건 호프입니다. 마차꾼으로 위장해서...

[홈즈]: 맞아. 하지만...

홈즈가 의식 계획 메모를 집어든다.

[홈즈]: 이 메모를 보게. 호프의 필체가 아니야.

[왓슨]: ...!

[홈즈]: 호프는 백작을 감금했지. 하지만 의식을 계획한 건... 다른 사람이야.

[홈즈]: 호프의 동기를 생각해보게. 복수인가, 보호인가?

홈즈가 당신을 본다.

[홈즈]: 엘렌의 증언을 기억하나? "호프님께 의식 계획을 말씀드렸다"고 했어.

[홈즈]: 호프는... 의식을 막으려 한 거야.`,
    choices: [
      { text: '💭 "그럼 호프는 무죄입니다"', nextNode: 'hope_innocent_conclusion' },
      { text: '💭 "하지만 백작 감금은 범죄입니다"', nextNode: 'hope_guilty_kidnapping' },
      { text: '🔙 "다른 사람을 지목하겠습니다"', nextNode: 'final_deduction_hub' }
    ]
  },

  hope_innocent_conclusion: {
    id: 'hope_innocent_conclusion',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 미소 짓는다.

[홈즈]: 정확해. 호프는... 영웅이었어. 비극적인 방법이었지만.

[홈즈]: 20년간 루시를 잊지 못했고, 딸을 지키려 했어.

[왓슨]: 그럼 진짜 범인은...?

홈즈가 다른 증거를 가리킨다.

[홈즈]: 의식을 계획한 사람... 그리고 호프를 이용한 사람...

[홈즈]: 다시 추리하게.`,
    choices: [
      { text: '🔙 "다시 시작합니다"', nextNode: 'final_deduction_hub' }
    ]
  },

  hope_guilty_kidnapping: {
    id: 'hope_guilty_kidnapping',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 고개를 끄덕인다.

[홈즈]: 법적으로는 맞아. 감금은 범죄지.

[홈즈]: 하지만... 동기를 보게. 호프는 백작을 죽이지 않았어.

[홈즈]: 만약 복수가 목적이었다면... 즉시 죽였을 거야.

[왓슨]: 그럼...?

[홈즈]: 호프는 시간을 벌려 했어. 의식 날짜까지...

[홈즈]: 누군가를 막기 위해서.

홈즈가 의식 계획 메모를 가리킨다.

[홈즈]: 진짜 범인은... 이 메모를 쓴 사람이야.`,
    choices: [
      { text: '🔙 "다시 추리하겠습니다"', nextNode: 'final_deduction_hub' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎯 드레버 지목
  // ═══════════════════════════════════════════════════════

  accuse_drebber: {
    id: 'accuse_drebber',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    speaker: 'watson',
    text: `"드레버가 범인입니다."

홈즈가 귀를 기울인다.

[홈즈]: 근거는?

[왓슨]: 여관 알리바이가 거짓입니다. 진흙 샘플이 일치했고...

[왓슨]: 협박 편지를 받았습니다. 경제적 동기가 있어요.

홈즈가 고개를 끄덕인다.

[홈즈]: 맞아. 드레버는 3일 전 밤, 저택에 침입했어.

[홈즈]: 하지만...

홈즈가 의식 계획 메모를 펼친다.

[홈즈]: 이 메모의 날짜를 보게. "2주 전 작성"이라고 되어있어.

[왓슨]: ...!

[홈즈]: 드레버가 여관에 체크인한 건 3일 전이야.

[홈즈]: 의식 계획은... 그 전부터 진행되고 있었어.

홈즈가 당신을 본다.

[홈즈]: 드레버는 공범일 수도 있지. 하지만 주범은 아니야.`,
    choices: [
      { text: '💭 "그럼 드레버는 공범입니까?"', nextNode: 'drebber_accomplice_theory' },
      { text: '💭 "드레버는 피해자일 수도..."', nextNode: 'drebber_victim_theory' },
      { text: '🔙 "다른 사람을 지목하겠습니다"', nextNode: 'final_deduction_hub' }
    ]
  },

  drebber_accomplice_theory: {
    id: 'drebber_accomplice_theory',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 협박 편지를 펼친다.

[홈즈]: 협박 편지의 서명... "S".

[홈즈]: 스탠거슨일 가능성이 높아.

[왓슨]: 스탠거슨이 드레버를 협박했다?

[홈즈]: 아니면... 이용했을 수도 있지.

홈즈가 메모한다.

[홈즈]: 드레버는 경제적으로 궁지에 몰렸어. 절박했지.

[홈즈]: 누군가 그를 이용해서... 백작에게 접근하게 만들었을 수도 있어.

[왓슨]: 그럼 진짜 범인은...

홈즈가 고개를 끄덕인다.

[홈즈]: 드레버를 조종한 사람... 협박 편지를 보낸 "S"...`,
    choices: [
      { text: '🎯 "스탠거슨입니다!"', nextNode: 'accuse_stangerson', hideIfVisitedNode: 'accuse_stangerson' },
      { text: '🔙 "증거를 더 확인하겠습니다"', nextNode: 'final_deduction_hub' }
    ]
  },

  drebber_victim_theory: {
    id: 'drebber_victim_theory',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 고개를 끄덕인다.

[홈즈]: 드레버의 상태를 기억하나? 여관주인의 증언...

[홈즈]: "손이 떨렸다", "쫓기는 듯한 표정", "밤새 잠을 못 잤다"...

[왓슨]: 범인이 아니라... 협박당한 사람...

[홈즈]: 정확해. 드레버는 누군가에게 강요당했을 가능성이 높아.

홈즈가 협박 편지를 가리킨다.

[홈즈]: "가족 생각하시오"... 이건 협박이야.

[홈즈]: 드레버를 조종한 사람이... 진짜 범인이야.`,
    choices: [
      { text: '🎯 "스탠거슨이 드레버를 협박했습니다"', nextNode: 'accuse_stangerson', hideIfVisitedNode: 'accuse_stangerson' },
      { text: '🔙 "다시 추리하겠습니다"', nextNode: 'final_deduction_hub' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎯 스탠거슨 지목 (정답 경로)
  // ═══════════════════════════════════════════════════════

  accuse_stangerson: {
    id: 'accuse_stangerson',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    speaker: 'watson',
    text: `"스탠거슨이 범인입니다."

홈즈의 눈이 빛난다.

[홈즈]: 근거를 말해보게.

[왓슨]: 협박 편지의 서명 "S"... 스탠거슨입니다.

[왓슨]: 드레버를 협박해서 백작에게 접근하게 만들었고...

[왓슨]: 의식 계획 메모도... 스탠거슨의 필체일 가능성이 있습니다.

홈즈가 서재 서랍을 연다.

[홈즈]: 왓슨, 이것 보게.

스탠거슨의 개인 문서들... 그리고...

[홈즈]: 교단 문서. "영원한 구원 교단 - 런던 지부장 조셉 스탠거슨"

[왓슨]: ...!

[홈즈]: 스탠거슨은... 백작이 교단을 떠난 후에도 계속 신도였어.

[홈즈]: 그리고 교단의 명령을 받았지. "엘렌을 영원한 신부로 바치라"고.

홈즈가 의식 계획 메모를 펼친다.

[홈즈]: 모든 증거가 일치해. 스탠거슨이...

[홈즈]: 진범이야.`,
    choices: [
      { text: '💡 "추궁합시다!"', nextNode: 'confront_stangerson' },
      { text: '💭 "하지만 동기가 약합니다..."', nextNode: 'stangerson_motive_doubt' }
    ]
  },

  stangerson_motive_doubt: {
    id: 'stangerson_motive_doubt',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `[왓슨]: 하지만 동기가 약하지 않습니까?

홈즈가 고개를 젓는다.

[홈즈]: 광신, 왓슨. 광신만큼 강한 동기는 없어.

[홈즈]: 스탠거슨은 교단에 세뇌당했어. 20년 넘게...

홈즈가 교단 문서를 펼친다.

[홈즈]: "루시의 피를 이어받은 자만이 신의 계시를 받을 수 있다"...

[홈즈]: 교단은 엘렌을 노렸어. 루시의 딸이니까.

[홈즈]: 그리고 스탠거슨은... 그 명령을 충실히 따랐지.

[왓슨]: 백작은 몰랐던 건가요?

[홈즈]: 백작은 속았어. 20년간 엘렌을 숨기며 속죄했지만...

[홈즈]: 스탠거슨은... 가장 가까운 곳에서 기회를 노리고 있었어.

홈즈가 당신을 본다.

[홈즈]: 이제... 스탠거슨을 추궁할 시간이야.`,
    choices: [
      { text: '💡 "추궁합시다!"', nextNode: 'confront_stangerson' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎯 백작 지목
  // ═══════════════════════════════════════════════════════

  accuse_count: {
    id: 'accuse_count',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    speaker: 'watson',
    text: `"백작이 범인입니다."

홈즈가 고개를 갸웃한다.

[홈즈]: 근거는?

[왓슨]: 의식실을 만든 건 백작입니다. 엘렌의 드레스도...

[홈즈]: 왓슨...

홈즈가 백작의 고백 일기를 펼친다.

[홈즈]: 백작의 일기를 다시 읽어보게.

"1861년... 루시가 죽었다. 내 손으로... 교단의 명령을... 따랐다..."

"회개한다... 교단을 떠난다... 엘렌을 지킨다..."

"20년... 속죄... 엘렌은 자유로워야 한다..."

[홈즈]: 백작은 20년간 속죄했어. 엘렌을 감금한 건 맞지만...

[홈즈]: 보호하기 위해서였어. 의식을 막기 위해서.

[왓슨]: 하지만 의식실이...

홈즈가 고개를 젓는다.

[홈즈]: 의식실은... 백작이 만든 게 아니야.

[홈즈]: 누군가 백작 몰래 만들었어. 지하실에서...`,
    choices: [
      { text: '💭 "그럼 누가 만들었을까요?"', nextNode: 'who_made_ritual_chamber' },
      { text: '🔙 "다시 추리하겠습니다"', nextNode: 'final_deduction_hub' }
    ]
  },

  who_made_ritual_chamber: {
    id: 'who_made_ritual_chamber',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 의식실 열쇠를 집어든다.

[홈즈]: 누가 이 열쇠를 가지고 있었을까?

[왓슨]: 백작이...

[홈즈]: 아니. 백작은 감금당했어. 열쇠는... 다른 사람이 관리했지.

홈즈가 서재를 가리킨다.

[홈즈]: 비서. 백작의 개인 비서...

[왓슨]: 스탠거슨!

홈즈가 고개를 끄덕인다.

[홈즈]: 스탠거슨은 20년간 백작 곁에 있었어.

[홈즈]: 백작의 신뢰를 받았지. 하지만...

[홈즈]: 그는 여전히 교단의 신도였어.

[홈즈]: 의식실을 만들고... 엘렌을 노리고... 드레버를 협박하고...

[홈즈]: 모든 걸... 스탠거슨이 했어.`,
    choices: [
      { text: '🎯 "스탠거슨이 진범입니다!"', nextNode: 'accuse_stangerson', hideIfVisitedNode: 'accuse_stangerson' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 💡 스탠거슨 추궁 (역전재판 스타일)
  // ═══════════════════════════════════════════════════════

  confront_stangerson: {
    id: 'confront_stangerson',
    day: 1,
    timeOfDay: 'evening',
    location: 'library',
    character: 'stangerson',
    text: `홈즈와 당신이 서재로 스탠거슨을 불러들인다.

[스탠거슨]: 무슨... 일이십니까?

홈즈가 증거들을 테이블에 펼친다.

[홈즈]: 스탠거슨 씨. 이제 진실을 말할 시간입니다.

[스탠거슨]: 진실...? 무슨...

[홈즈]: 당신이 "영원한 신부 의식"을 계획했습니다.

스탠거슨의 얼굴이 창백해진다.

[스탠거슨]: 저, 저는...!

[홈즈]: 증거가 있습니다.

홈즈가 하나씩 제시한다.`,
    choices: [
      { text: '📜 [협박 편지 제시]', nextNode: 'present_threatening_letters' },
      { text: '📖 [교단 문서 제시]', nextNode: 'present_cult_documents' },
      { text: '🔑 [의식실 열쇠 제시]', nextNode: 'present_ritual_key' }
    ]
  },

  present_threatening_letters: {
    id: 'present_threatening_letters',
    day: 1,
    timeOfDay: 'evening',
    location: 'library',
    character: 'stangerson',
    text: `홈즈가 협박 편지를 펼친다.

[홈즈]: 드레버에게 보낸 편지입니다. 서명은 "S".

[홈즈]: 당신이 드레버를 협박했습니다. 백작에게 접근하게 만들기 위해...

스탠거슨이 떨린다.

[스탠거슨]: 저, 저는... 그건...

[홈즈]: 필적 감정을 받을까요?

스탠거슨이 고개를 숙인다.

[스탠거슨]: ...인정합니다.

[왓슨]: ...!

[스탠거슨]: 하지만... 저는 백작님을 위해서...

[홈즈]: 거짓말입니다.

홈즈가 다음 증거를 꺼낸다.`,
    choices: [
      { text: '📖 [교단 문서 제시]', nextNode: 'present_cult_documents' }
    ]
  },

  present_cult_documents: {
    id: 'present_cult_documents',
    day: 1,
    timeOfDay: 'evening',
    location: 'library',
    character: 'stangerson',
    text: `홈즈가 교단 문서를 펼친다.

[홈즈]: "영원한 구원 교단 - 런던 지부장 조셉 스탠거슨"

[홈즈]: 당신은 여전히 교단의 신도였습니다.

[홈즈]: 백작이 떠난 후에도... 20년간...

스탠거슨이 눈을 감는다.

[스탠거슨]: ...

[홈즈]: 교단의 명령을 받았죠. "엘렌을 영원한 신부로 바치라"고.

스탠거슨이 떨린다.

[스탠거슨]: 저는... 신의 계시를...

[홈즈]: 광신입니다. 그리고... 살인 미수입니다.

홈즈가 마지막 증거를 꺼낸다.`,
    choices: [
      { text: '🔑 [의식실 열쇠 제시]', nextNode: 'present_ritual_key' }
    ]
  },

  present_ritual_key: {
    id: 'present_ritual_key',
    day: 1,
    timeOfDay: 'evening',
    location: 'library',
    character: 'stangerson',
    text: `홈즈가 의식실 열쇠를 테이블에 놓는다.

[홈즈]: 의식실을 만든 건 당신입니다.

[홈즈]: 백작 몰래... 지하실에서...

[홈즈]: 엘렌의 드레스를 준비하고... 제단을 세우고...

[홈즈]: 의식 날짜까지 정했습니다.

스탠거슨이 주저앉는다.

[스탠거슨]: 저는... 저는 신의 명령을...

[왓슨]: 광기입니다!

홈즈가 조용히 말한다.

[홈즈]: 스탠거슨 씨. 마지막 질문입니다.

[홈즈]: 왜... 20년을 기다렸습니까?

스탠거슨이 고개를 든다.

[스탠거슨]: 엘렌이... 21세가 되어야 한다는 계시가...

[스탠거슨]: 루시와 같은 나이... 엘렌이 21세가 되는 날...

[스탠거슨]: 의식을 완성하면... 교단의 영광이...

홈즈가 고개를 젓는다.

[홈즈]: 미쳤군요.

홈즈가 당신을 본다.

[홈즈]: 왓슨, 이제... 결정할 시간이야.`,
    choices: [
      { text: '⚖️ "경찰에 넘깁니다"', nextNode: 'stangerson_to_police' },
      { text: '💬 "백작과 대면시킵니다"', nextNode: 'stangerson_meets_count' },
      { text: '🌹 "엘렌을 데려옵니다"', nextNode: 'stangerson_meets_ellen' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🔄 재고려
  // ═══════════════════════════════════════════════════════

  reconsider_deduction: {
    id: 'reconsider_deduction',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 당신을 본다.

[홈즈]: 확신이 서지 않는가?

[왓슨]: 모든 용의자가... 뭔가 숨기고 있는 것 같아서...

홈즈가 고개를 끄덕인다.

[홈즈]: 그래. 이 사건은... 모두가 비밀을 가지고 있어.

[홈즈]: 하지만 진범은... 단 한 명이야.

[홈즈]: 의식을 계획하고... 모든 걸 조종한 사람...

홈즈가 증거들을 가리킨다.

[홈즈]: 다시 생각해보게. 신중하게.`,
    choices: [
      { text: '🔍 "증거를 재검토합니다"', nextNode: 'review_evidence' },
      { text: '🔙 "처음부터 다시"', nextNode: 'final_deduction_hub' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎭 엔딩 분기
  // ═══════════════════════════════════════════════════════

  stangerson_to_police: {
    id: 'stangerson_to_police',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 경찰을 부른다.

레스트레이드 경감이 도착한다.

[레스트레이드]: 홈즈! 범인을 잡았다고?

[홈즈]: 조셉 스탠거슨입니다. "영원한 신부 의식" 계획자이자...

[홈즈]: 백작 감금 사건의 배후입니다.

레스트레이드가 스탠거슨을 체포한다.

[스탠거슨]: 신의 계시가... 신의 계시가...

스탠거슨이 끌려가는 모습을 지켜본다.

홈즈가 당신을 본다.

[홈즈]: 이제... 나머지 사람들을 구해야 해.

[홈즈]: 백작, 호프, 엘렌... 그리고 드레버.

[홈즈]: 진실을 밝혔으니... 화해시킬 차례야.`,
    choices: [
      { text: '🌹 "모두를 모읍시다"', nextNode: 'gather_everyone_for_truth' }
    ]
  },

  stangerson_meets_count: {
    id: 'stangerson_meets_count',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `스탠거슨을 지하실로 데려간다.

백작이 의자에서 스탠거슨을 본다.

[모로 백작]: 스탠거슨... 자네가...

스탠거슨이 고개를 숙인다.

[스탠거슨]: 백작님... 저는... 교단의 명령을...

백작이 눈을 감는다.

[모로 백작]: 20년... 20년간 곁에 있으면서...

[모로 백작]: 자네도... 나처럼 교단을 떠났다고 믿었는데...

[스탠거슨]: 저는... 신앙을 버릴 수 없었습니다...

백작이 눈물을 흘린다.

[모로 백작]: 엘렌을... 노렸구나... 내 딸을...

스탠거슨이 주저앉는다.

[스탠거슨]: 용서하십시오... 용서하십시오...

백작이 고개를 젓는다.

[모로 백작]: 용서는... 내가 할 일이 아니야.

백작이 천장을 본다.

[모로 백작]: 루시... 루시가 할 일이지...`,
    choices: [
      { text: '⚖️ "경찰에 넘깁니다"', nextNode: 'stangerson_to_police' },
      { text: '🌹 "엘렌을 데려옵니다"', nextNode: 'stangerson_meets_ellen' }
    ]
  },

  stangerson_meets_ellen: {
    id: 'stangerson_meets_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'ellen',
    text: `엘렌을 데려온다.

스탠거슨이 엘렌을 보고 얼어붙는다.

[엘렌]: ...스탠거슨 아저씨...

[스탠거슨]: 엘렌... 양...

엘렌이 스탠거슨을 본다.

[엘렌]: 제가... 무서웠나요?

[스탠거슨]: ...

[엘렌]: 저를... 의식에... 바치려 하셨나요?

스탠거슨이 눈물을 흘린다.

[스탠거슨]: 저는... 신의 계시라고... 믿었습니다...

엘렌이 다가간다.

[엘렌]: 저는... 신의 계시가 아닙니다.

[엘렌]: 저는... 루시의 딸이고... 백작님의 딸이고... 호프님의 딸입니다.

[엘렌]: 저는... 사람입니다.

스탠거슨이 무너진다.

[스탠거슨]: 용서하십시오... 용서하십시오...

엘렌이 조용히 말한다.

[엘렌]: 저는... 용서할 수 없어요.

[엘렌]: 하지만... 법이 판단할 거예요.

엘렌이 돌아선다.

[엘렌]: 이제... 끝났어요.`,
    choices: [
      { text: '⚖️ "경찰에 넘깁니다"', nextNode: 'stangerson_to_police' }
    ]
  },

  gather_everyone_for_truth: {
    id: 'gather_everyone_for_truth',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    text: `모두를 속죄실로 모은다.

백작, 호프, 엘렌, 드레버...

그리고 홈즈와 당신.

홈즈가 진실을 밝힌다.

진범은 스탠거슨이었고...

호프는 엘렌을 지키려 했고...

백작은 20년간 속죄했고...

드레버는 협박당한 피해자였다.

침묵이 흐른다.

그리고... 엘렌이 앞으로 나선다.

[엘렌]: 이제... 모두 용서할 시간입니다.

엘렌이 백작과 호프의 손을 잡는다.

[엘렌]: 아버지들... 감사합니다.

두 남자가 눈물을 흘린다.

20년의 비극이... 마침내... 끝난다.`,
    choices: [
      { text: '🌟 [트루 엔딩으로]', nextNode: 'true_ending_reconciliation' }
    ]
  }
};
