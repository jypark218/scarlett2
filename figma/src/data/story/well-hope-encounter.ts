// 우물에서 호프를 만나는 대화 트리
import { StoryNode } from '../../types/story';

export const wellHopeEncounterNodes: Record<string, StoryNode> = {
  well: {
    id: 'well',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    conditionalText: [
      {
        // 반지를 이미 획득한 후 재방문
        condition: { hasItem: '루시의 반지' },
        text: `다시 우물로 왔다.

돌로 된 우물벽, 이끼... 그리고 아까 반지를 건졌던 기억이 떠오른다.

홈즈가 말한다.

[홈즈]: 이미 중요한 증거를 얻었어. 루시의 반지... 이것이 모든 걸 풀 열쇠가 될 거야.

우물 주변을 둘러보니 더 이상 조사할 것은 없어 보인다.`
      }
    ],
    text: '정원 끝에 있는 낡은 우물에 다가간다. 돌로 된 우물벽에는 이끼가 끼어있고, 오래 사용하지 않은 것 같다.\n\n홈즈가 우물 가장자리를 살핀다. "흥미롭군... 최근 발자국이 있어. 군화... 그리고 이것은..."\n\n그가 뭔가를 발견한 듯하다.',
    choices: [
      { text: '우물을 자세히 조사한다', nextNode: 'investigate_well' },
      { text: '뒤를 돌아본다', nextNode: 'turn_around' }
    ]
  },

  turn_around: {
    id: 'turn_around',
    day: 1,
    timeOfDay: 'afternoon',
    conditionalText: [
      {
        condition: { visitedNode: 'ask_hope_name' },
        text: '뒤를 돌아보니 누군가 서 있다.\\n\\n제퍼슨 호프다. 아까 마차에서 봤던 그 남자.\\n\\n그의 눈빛은 슬픔과 분노가 섞여있다.\\n\\n[호프]: \"...여기서 뭐 하는 거요?\" 그가 우물을 바라본다. \"이곳은... 특별한 곳이오.\"'
      },
      {
        condition: { visitedNode: 'investigate_carriage' },
        text: '뒤를 돌아보니 누군 서 있다.\\n\\n아까 마차 옆에서 봤던 남자다. 키가 크고 근육질이며, 검게 탄 피부, 날씨에 시달린 듯한 얼굴...\\n\\n그의 눈빛은 슬픔과 분노가 섞여있다.\\n\\n[호프]: \"...여기서 뭐 하는 거요?\" 그가 우물을 바라본다. \"이곳은... 특별한 곳이오.\"\\n\\n홈즈가 속삭인다. \"아까 그 마차꾼이야...\"'
      }
    ],
    text: '뒤를 돌아보니 누군가 서 있다.\\n\\n키가 크고 근육질인 남자다. 검게 탄 피부, 날씨에 시달린 듯한 얼굴... 그의 눈빛은 슬픔과 분노가 섞여있다.\\n\\n\"...여기서 뭐 하는 거요?\" 남자가 우물을 바라본다. \"이곳은... 특별한 곳이오.\"\\n\\n홈즈가 속삭인다. \"정문에 마차가 있었는데... 저 사람이 마차꾼인 것 같아.\"',
    choices: [
      { text: '을 묻는다', nextNode: 'ask_stranger_name', hideIf: { visitedAny: ['ask_hope_name', 'investigate_carriage'] } },
      { text: '백작과의 관계를 묻는다', nextNode: 'ask_hope_relation' },
      { text: '우물에 대해 묻는다', nextNode: 'ask_hope_well' },
      { text: '반지를 보여준다', nextNode: 'well_show_ring', requiredItem: '루시의 반지', showIf: { visitedNode: 'well_ask_about_lucy' } }
    ]
  },

  ask_stranger_name: {
    id: 'ask_stranger_name',
    day: 1,
    timeOfDay: 'afternoon',
    text: '\"실례지만... 성함이 어떻게 되시나요?\" 당신이 묻자 남자가 잠시 망설인다.\\n\\n\"...제퍼슨 호프요.\" 그가 짧게 답한다. \"백작의 저택에 물건을 배달하는 마차꾼이오.\"\\n\\n하지만 그의 주먹은 꽉 쥐어져 있다.',
    choices: [
      { text: '백작과의 관계를 묻는다', nextNode: 'ask_hope_relation' },
      { text: '우물에 대해 묻는다', nextNode: 'ask_hope_well' }
    ]
  },

  ask_hope_relation: {
    id: 'ask_hope_relation',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"백작과는 어떤 사이요?"

나는 조심스럽게 물었다.

호프의 표정이 굳어졌다.

[호프]: ...옛날 일이오.

그가 말을 멈췄다.

[호프]: 지금은 그저 마차꾼일 뿐이오. 백작께 물건을 배달하러 왔소.

하지만 그의 주먹은 꽉 쥐어져 있다.`,
    choices: [
      { text: '옛날 일이 무엇인지 추궁한다', nextNode: 'press_hope_level_1' },
      { text: '증거를 제시한다', nextNode: 'present_evidence_to_hope' },
      { text: '오늘 백작을 봤는지 묻는다', nextNode: 'well_ask_count_whereabouts' },
      { text: '다른 질문을 한다', nextNode: 'turn_around' }
    ]
  },

  ask_hope_well: {
    id: 'ask_hope_well',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: `\"이 우물에 대해 아십니까?\" 당신이 묻자 호프가 우물을 바라본다.

\"...알고 있소.\" 그가 우물 가장자리를 만진다. \"오래전에... 누군가... 여기서 편지를 읽곤 했지...\"

그의 손이 떨린다. \"마지막으로... 그 사람을 본 곳도... 여기였소.\"`,
    choices: [
      { text: '그 사람이 누구인지 묻는다', nextNode: 'well_ask_about_lucy' },
      { text: '반지를 보여준다', nextNode: 'well_show_ring', requiredItem: '루시의 반지', showIf: { visitedNode: 'well_ask_about_lucy' } },
      { text: '더 묻지 않는다', nextNode: 'well_let_hope_go' }
    ]
  },

  well_ask_count_whereabouts: {
    id: 'well_ask_count_whereabouts',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '"오늘 백을 보셨습니까?" 당신이 묻자 호프가 잠시 망설인다.\n\n"...보지 못했소." 그가 저택을 바라본다. "하지만... 이 저택 어딘가에 있을 것이오."\n\n그의 눈빛이 날카로워진다. "그는... 도망가지 못할 것이오."',
    choices: [
      { text: '백작을 찾는 것을 도와주겠다고 말한다', nextNode: 'well_offer_help' },
      { text: '경찰에 맡기자고 제안한다', nextNode: 'well_suggest_police' }
    ]
  },

  well_offer_help: {
    id: 'well_offer_help',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '"우리가 도와드리겠습니다. 함께 찾아봅시다." 당신이 말하자 호프가 고개를 젓는다.\n\n"도움은... 필요 없소." 그가 당신을 본다. "이건... 제 일이오. 20년간... 기다려온..."\n\n그가 말을 멈춘다. 너무 많이 말한 것 같다는 표정이다.',
    choices: [
      { text: '더 추궁한다', nextNode: 'well_press_hope_past' },
      { text: '그를 내버려둔다', nextNode: 'well_let_hope_go' }
    ]
  },

  well_suggest_police: {
    id: 'well_suggest_police',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson', // ✅ 왓슨이 경찰 제안 → 호프가 대응
    text: '"경찰에 맡기는 게 어떻습니까?" 당신이 제안하자 호프가 씁쓸하게 웃는다.\n\n"경찰...? 20년 전에도 경찰은 없었소." 그가 주먹을 쥔다. "법은... 우리를 지켜주지 못했소."\n\n"이제는... 제 방식으로 하겠소."\n\n홈즈가 당신의 팔을 잡는다. 위험한 상황이다.',
    choices: [
      { text: '호프를 막는다', nextNode: 'well_try_stop_hope' },
      { text: '뒤따라간다', nextNode: 'well_follow_hope_secretly' }
    ]
  },

  investigate_well: {
    id: 'investigate_well',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'watson', // ✅ 왓슨이 조사 → 홈즈의 반응
    text: '우물을 자세히 조사한다.\\n\\n돌 틈 사이에 뭔가가 끼어있다. 작은 종이 조각...\\n\\n펼쳐보니 낡은 편지다.\\n\\n\\"사랑하는 제퍼슨에게... 백작이 아버지를 속였어요. 재산이 모두... 저는 병에 걸렸어요... 치료비가... 제발... - Lucy\\"\\n\\n편지는 여기서 끝난다. 눈물 자국이 있다.\\n\\n홈즈가 말한다. \\"비극이군요...\\"',
    choices: [
      { text: '편지를 증거로 챙긴다', nextNode: 'acquire_lucy_letter', item: '루시의 편지' },
      { text: '뒤를 돌아본다', nextNode: 'turn_around' }
    ]
  },

  acquire_lucy_letter: {
    id: 'acquire_lucy_letter',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    text: '루시의 편지를 조심스럽게 챙긴다.\\n\\n이것은... 중요한 증거다.\\n\\n뒤에서 인기척이 느껴진다.',
    choices: [
      { text: '뒤를 돌아본다', nextNode: 'turn_around' }
    ]
  },

  well_press_hope_past: {
    id: 'well_press_hope_past',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '"20년 전에 무슨 일이 있었소?"\n\n호프가 망설인다. "...개인적인 일이오. 사업상 문제였지. 백작과... 좋지 않게 끝났소."\n\n"좋지 않게"라는 표현이 너무 애매하다.',
    choices: [
      { text: '더 깊게 추궁한다', nextNode: 'well_hope_tragedy' },
      { text: '백작 행방을 묻는다', nextNode: 'well_ask_count_whereabouts' }
    ]
  },

  well_hope_tragedy: {
    id: 'well_hope_tragedy',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '"백작과의 일이... 복잡했소. 그녀는... 루시였소. 그녀는... 사라졌소."\n\n호프의 눈이 마주치는 순간 눈물이 흘러내린다. "그녀는... 저에게 모든 것을 주었소. 그녀는... 저를 믿었소. 하지만... 그녀는... 사라졌소."\n\n즈가 메모한다. "루시... 사라졌소."',
    choices: [
      { text: '루시 이야기를 꺼낸다', nextNode: 'well_ask_about_lucy' },
      { text: '백작의 행방을 묻는다', nextNode: 'well_ask_count_whereabouts' }
    ]
  },

  well_let_hope_go: {
    id: 'well_let_hope_go',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `호프가 마차에 올라타 떠난다.

홈즈가 말한다.

[홈즈]: 저 남자... 뭔가 깊은 상처를 안고 있어. 20년이라는 시간... 무엇을 겪었을까?

우물 근처를 살피다 바닥에 떨어진 무언가를 발견한다.`,
    choices: [
      { text: '바닥의 물건을 조사한다', nextNode: 'acquire_locket_well_v2', hideIfHasItem: 'locket' },
      { text: '우물 안을 자세히 들여다본다', nextNode: 'well_deep', hideIfHasItem: '루시의 편지' },
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  well_show_ring: {
    id: 'well_show_ring',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '"이것을 보십시오." 당신이 주머니에서 반지를 꺼내자 호프의 얼굴이 창백해진다.\n\n"그것은... 그것은...!" 그가 떨리는 손으로 반지를 받아든다. "L.L... Lucy Louisa... 루시의 반지..."\n\n눈물이 흘러내린다. "어떻... 어떻게 이것이...? 백작이... 그 악마가 이것마저 가져갔단 말이오...?"\n\n호프가 무릎을 꿇고 반지 가슴에 안는다. "루시... 미안하오... 지켜주지 못해서... 미안하오..."',
    choices: [
      { text: '진실을 말해달라고 요청한다', nextNode: 'well_ask_truth_after_ring' },
      { text: '위로의 말을 건넨다', nextNode: 'well_comfort_hope_ring' }
    ]
  },

  well_ask_truth_after_ring: {
    id: 'well_ask_truth_after_ring',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '"무슨 일이 있었는지 말해주십시오." 당신이 조심스럽게 말하자 호프가 고개를 든다.\n\n"진실... 알고 싶으십니까?" 그가 떨리는 목소리로 말한다.\n\n"1859년 봄, 유타주에서... 루시와 저는 만났습니다. 사랑에 빠졌죠. 1860년 약혼했습니다."\n\n"하지만 백작이... 모로 백작이..."\n\n그의 목소리가 떨린다.\n\n"그는 \'영원한 구원 교단\'이라는... 이름만 들어도 소름이 돋는 집단의 설교자였습니다."\n\n"루시의 아버지 페리에 영감을 교단에 끌어들였죠. \'신의 계시\', \'영적 깨달음\'... 모두 거짓말이었습니다."\n\n호프가 주먹을 쥔다.\n\n"하지만 가장 끔찍했던 것은..."\n\n그가 눈을 감는다.\n\n"백작이 루시를 \'영원한 신부 의식\'에 선택했다는 겁니다. 신의 계시라며..."\n\n"하지만 루시는... 이미 제 아이를 임신하고 있었습니다."',
    choices: [
      { text: '계속 듣는다', nextNode: 'well_truth_ritual_horror' },
      { text: '위로의 말을 건넨다', nextNode: 'well_comfort_hope_ring' }
    ]
  },

  well_truth_ritual_horror: {
    id: 'well_truth_ritual_horror',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '호프가 떨리는 목소리로 계속한다.\n\n"루시는... 거부했습니다. 당연하죠. 저와 약혼한 사이였으니까."\n\n"하지만 백작은... 집착했습니다. 페리에 일가를 \'악령에 씌었다\'고 규정했죠."\n\n"그리고..."\n\n그가 눈물을 흘린다.\n\n"루시가 딸을 낳았습니다... 엘렌이라고 이름 지었죠. 1861년 11월 20일."\n\n"우린 도망쳤습니다. 하지만 며칠 뒤... 교단이 루시를 찾아냈죠."\n\n"백작은... \'악령을 쫓아낸다\'며... 루시를 제단으로 끌고 갔습니다."\n\n"스탠거슨이 의사로 대기하고 있었고, 드레버가 성경을 읽었고..."\n\n"백작이 \'구마 의식\'을 집도했습니다."\n\n당신은 등골이 오싹해진다.\n\n"다음 날... 제가 루시를 발견했을 때..."\n\n"피... 너무 많은 피... 산후 출혈이..."\n\n"루시는... 이미..."\n\n호프가 주먹을 쥔다.\n\n"그리고... 아기... 엘렌도... 사라졌습니다."\n\n"교단이... 백작이... \'악령의 자식\'이라며..."\n\n그가 목이 메인다.\n\n"저는... 루시도... 딸도... 둘 다 잃었습니다."',
    choices: [
      { text: '그를 위로한다', nextNode: 'well_comfort_after_truth' },
      { text: '백작을 찾아야 한다고 말한다', nextNode: 'well_must_find_count' }
    ]
  },

  well_comfort_hope_ring: {
    id: 'well_comfort_hope_ring',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson', // ✅ 왓슨이 위로 → 호프의 반응
    text: '"힘내십시오." 당신이 그의 어깨에 손을 얹자 호프가 떨린다.\n\n"힘내라고요...? 어떻게... 어떻게 힘을 낼 수 있습니까..." 그가 반지를 꽉 쥔다. "20년... 20년을... 기다렸습니다..."\n\n그가 갑자기 일어선다. "죄송합니다. 저는... 가봐야겠습니다. 할 일이... 있습니다."\n\n홈즈가 당신을 본다. 호프의 눈빛이... 위험하다.',
    choices: [
      { text: '호프를 붙잡는다', nextNode: 'well_try_stop_hope' },
      { text: '뒤따라간다', nextNode: 'well_follow_hope_secretly' }
    ]
  },

  well_comfort_after_truth: {
    id: 'well_comfort_after_truth',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson', // ✅ 왓슨이 위로 → 호프의 반응
    text: '"당신만의 고통이 아닙니다. 우리가 도울 수 있습니다." 당신이 말하자 호프가 씁쓸하게 웃는다.\n\n"도와주시겠다고요? 어떻게요?" 그가 반지를 바라본다. "법? 정의? 20년 전 법은... 우리를 지켜주지 못했습니다."\n\n"하지만... 당신들은 좋은 분들이오." 그가 천천히 일어선다. "저는... 이만 가보겠습니다. 해야 할 일이... 있으니까요."\n\n그가 돌아서는 순간, 홈즈가 긴장한다.',
    choices: [
      { text: '호프를 막는다', nextNode: 'well_try_stop_hope' },
      { text: '조용히 따라간다', nextNode: 'well_follow_hope_secretly' }
    ]
  },

  well_must_find_count: {
    id: 'well_must_find_count',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson', // ✅ 왓슨이 제안 → 호프의 반응
    text: '"백작을 찾아야 합니다. 진실을 밝혀야 합니다." 당신이 말하자 호프가 고개를 끄덕인다.\n\n"그렇소... 백작을..." 그가 잠시 망설인다. "하지만... 법이 그를 심판할 수 있을까요? 20년이 지났는데..."\n\n"저는... 제 방식으로 하겠습니다." 그가 돌아선다. "방해하지 마십시오."\n\n홈즈가 당신의 팔을 잡는다. "왓슨, 저 사람은... 위험합니다."',
    choices: [
      { text: '호프를 막는다', nextNode: 'well_try_stop_hope' },
      { text: '뒤따라간다', nextNode: 'well_follow_hope_secretly' }
    ]
  },

  well_try_stop_hope: {
    id: 'well_try_stop_hope',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson', // ✅ 왓슨이 멈춤 시도 → 호프의 반응
    text: '당신이 호프의 팔을 잡는다. "기다리십시오! 무슨 짓을 하려는 겁니까?"\n\n호프가 당신을 본다. 그의 눈에는... 슬픔만 가득하다.\n\n"무슨 짓이냐고요?" 그가 조용히 말한다. "제가... 20년간 준비해온 일이오."\n\n그가 당신의 손을 부드럽게 떼어낸다. 전직 군인답게 힘이 세다. "죄송합니다, 박사님."\n\n그가 빠르게 저택으로 향한다. 홈즈가 외친다. "빨리! 따라가야 합니다!"',
    choices: [
      { text: '호프를 쫓아간다', nextNode: 'chase_hope_to_basement' }
    ]
  },

  well_follow_hope_secretly: {
    id: 'well_follow_hope_secretly',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: '홈즈와 함께 조용히 호프를 따라간다.\n\n그는 저택으로 향한다. 정문이 아닌... 뒷문으로.\n\n홈즈가 속삭인다. "저 사람... 이 저택의 구조를 알고 있군. 계획적이야."\n\n해가 지고 있다. 호프가 지하실 입구로 사라진다.\n\n당신 홈즈는 서로를 본다. 가야 한다.',
    choices: [
      { text: '지하실로 따라 들어간다', nextNode: 'chase_hope_to_basement' }
    ]
  },

  well_deep: {
    id: 'well_deep',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `우물을 자세히 조사한다.

돌 틈 사이에 뭔가가 끼어있다. 작은 종이 조각...

펼쳐보니 낡은 편지다.

"사랑하는 제퍼슨에게... 백작이 아버지를 속였어요. 재산이 모두... 저는 병에 걸렸어요... 치료비가... 제발... - Lucy"

편지는 여기서 끝난다. 눈물 자국이 있다.

홈즈가 말한다. "비극이군요..."

그리고 우물 아래를 내려다본다.

[홈즈]: 왓슨, 이 우물... 바닥이 보여. 그리고 벽에 홈이 파여있어. 내려갈 수 있을 것 같은데?`,
    choices: [
      { text: '편지를 증거로 챙긴다', nextNode: 'acquire_lucy_letter', item: '루시의 편지', hideIfHasItem: '루시의 편지' },
      { text: '우물 안으로 내려간다', nextNode: 'well_descend' },
      { text: '뒤를 돌아본다', nextNode: 'turn_around' }
    ]
  },

  well_deep_post_hope: {
    id: 'well_deep_post_hope',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: '우물 안을 자세히 들여다본다.\\n\\n우물 안에는 뭔가가 떨어져 있다. 작은 종이 조각...\\n\\n펼쳐보니 낡은 편지다.\\n\\n\"사랑하는 제퍼슨에게... 백작이 아버지를 속였어요. 재산이 모두... 저는 병에 걸렸어요... 치료비가... 제발... - Lucy\"\\n\\n편지는 여기서 끝난다. 눈물 자국이 있다.\\n\\n홈즈가 말한다. \"비극이군요...\"',
    choices: [
      { text: '편지를 증거로 챙긴다', nextNode: 'acquire_lucy_letter', item: '루시의 편지', hideIfHasItem: '루시의 편지' },
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
    ]
  }
};