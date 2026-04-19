/**
 * 호프 심문 - 증거 제시 시스템
 * 역전재판 스타일의 증거 제시 및 추궁
 */

import { StoryNode } from '../../../types/story';

export const hopeEvidenceNodes: Record<string, StoryNode> = {
  // 증거 제시 허브 노드
  present_evidence_to_hope: {
    id: 'present_evidence_to_hope',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `호프가 무언가를 숨기고 있다.

그의 꽉 쥔 주먹, 떨리는 목소리, 슬픔과 분노가 섞인 눈빛...

나는 주머니에서 증거를 꺼낸다.

어떤 증거를 제시할까?`,
    choices: [
      {
        text: '루시의 반지를 제시한다',
        nextNode: 'evidence_ring_to_hope_correct',
        requiredItem: '루시의 반지'
      },
      {
        text: '로켓 펜던트를 제시한다',
        nextNode: 'evidence_locket_to_hope_correct',
        requiredItem: 'locket'
      },
      {
        text: '독약 병을 제시한다',
        nextNode: 'evidence_poison_to_hope_wrong',
        requiredItem: '독약 병'
      },
      {
        text: '백작의 일기를 제시한다',
        nextNode: 'evidence_diary_to_hope_result',
        requiredItem: 'diary'
      },
      {
        text: '지하실 열쇠를 제시한다',
        nextNode: 'evidence_key_to_hope_result',
        requiredItem: '지하실 열쇠'
      },
      {
        text: '아직은 때가 아니다', 
        nextNode: 'well_let_hope_go'
      }
    ]
  },

  // 정답 1: 루시의 반지
  evidence_ring_to_hope_correct: {
    id: 'evidence_ring_to_hope_correct',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `나는 반지를 꺼내 호프에게 보여줬다.

"이것... 당신 것입니까?"

호프가 얼어붙었다.

그의 눈이 반지에 고정됐다. 손이 떨리기 시작했다.

[호프]: ...어디서...

그가 반지를 향해 손을 뻗었다가 멈췄다.

[호프]: 루시의... 반지...

그의 목소리가 갈라졌다.

[호프]: 20년... 20년 만에... 다시 보는군요.`,
    choices: [
      { text: '어떻게 이 반지를 알고 있는지 묻는다', nextNode: 'hope_ring_memory' },
      { text: '루시에 대해 묻는다', nextNode: 'hope_lucy_confession' },
      { text: '백작과의 관계를 추궁한다', nextNode: 'hope_count_connection' }
    ]
  },

  // 정답 2: 로켓 펜던트
  evidence_locket_to_hope_correct: {
    id: 'evidence_locket_to_hope_correct',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `나는 로켓 펜던트를 꺼냈다.

"루시 루이자, 1861..."

호프의 얼굴에서 혈색이 사라졌다.

[호프]: 그건... 내가... 그녀에게 준...

그가 무릎을 꿇었다.

[호프]: 어떻게... 어떻게 가지고 계십니까...

눈물이 그의 뺨을 타고 흘렀다.

[호프]: 그녀는... 죽을 때까지... 이걸 품에 안고 있었습니다...`,
    choices: [
      { text: '루시가 어떻게 죽었는지 묻는다', nextNode: 'hope_lucy_death_story' },
      { text: '백작이 무슨 짓을 했는지 추궁한다', nextNode: 'hope_count_crime' },
      { text: '그를 위로한다', nextNode: 'hope_comfort_after_locket' }
    ]
  },

  // 오답: 독약 병
  evidence_poison_to_hope_wrong: {
    id: 'evidence_poison_to_hope_wrong',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `나는 독약 병을 꺼냈다.

"이것... 당신 것입니까?"

호프가 독약 병을 봤다.

침묵이 흘렀다.

[호프]: ...네. 제 것입니다.

그의 목소리는 담담했다.

[호프]: 20년을 준비했습니다. 정의를... 아니, 복수를 위해서.

홈즈가 한 걸음 다가섰다.

[홈즈]: 백작을 독살하려 했습니까?

호프가 고개를 들었다.

[호프]: 아니요... 선택권을 주려 했습니다.`,
    choices: [
      { text: '선택권이 무슨 뜻인지 묻는다', nextNode: 'hope_poison_choice_explanation' },
      { text: '백작이 지금 어디 있는지 추궁한다', nextNode: 'hope_count_location' },
      { text: '왜 복수를 하려 했는지 묻는다', nextNode: 'hope_revenge_motive' }
    ]
  },

  // 오답: 백작의 일기
  evidence_diary_to_hope_result: {
    id: 'evidence_diary_to_hope_result',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"백작의 일기입니다. 여기에 루시에 대한 기록이..."

호프가 일기를 본다.

[호프]: ...백작이 쓴 것이군요.

그의 표정이 어두워졌다.

[호프]: 죄책감? 속죄? 이런 걸로... 루시가 돌아옵니까?

홈즈가 나를 본다. 이 증거로는 호프를 설득할 수 없다. 오히려 그의 분노만 키운 것 같다.`,
    choices: [
      { text: '다른 증거를 제시한다', nextNode: 'present_evidence_to_hope' },
      { text: '대화로 설득한다', nextNode: 'ask_hope_relation' }
    ]
  },

  // 오답: 지하실 열쇠
  evidence_key_to_hope_result: {
    id: 'evidence_key_to_hope_result',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"지하실 열쇠입니다. 혹시..."

호프가 열쇠를 본다.

[호프]: 지하실... 그곳이 백작의 속죄실이라고 들었습니다.

그가 씁쓸하게 웃는다.

[호프]: 하지만 속죄로 무엇이 바뀝니까? 루시는 돌아오지 않습니다.

홈즈가 나를 본다. 이 증거로는 호프의 마음을 움직일 수 없다.`,
    choices: [
      { text: '다른 증거를 제시한다', nextNode: 'present_evidence_to_hope' },
      { text: '지하실에 대해 직접 묻는다', nextNode: 'hope_basement_knowledge' }
    ]
  },

  // 추궁 시스템 - 단계별 압박
  press_hope_level_1: {
    id: 'press_hope_level_1',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"호프 씨, 백작과 무슨 일이 있었습니까?"

나는 조심스럽게 물었다.

호프가 우물을 바라봤다.

[호프]: ...오래 전 일입니다.

그의 주먹이 떨렸다.

[호프]: 더 이상 묻지 마십시오.`,
    choices: [
      { text: '주먹의 떨림을 지적한다', nextNode: 'press_hope_level_2' },
      { text: '증거를 제시한다', nextNode: 'present_evidence_to_hope' },
      { text: '일단 물러선다', nextNode: 'turn_around' }
    ]
  },

  press_hope_level_2: {
    id: 'press_hope_level_2',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"주먹을 떨고 계십니다."

나는 그의 손을 가리켰다.

호프가 주먹을 폈다 쥐었다를 반복했다.

[호프]: ...저는 단지...

그의 목소리가 갈라졌다.

[호프]: 20년입니다. 20년을... 기다렸습니다.

홈즈가 조용히 다가선다.`,
    choices: [
      { text: '"무엇을 기다렸습니까?" (결정타)', nextNode: 'press_hope_level_3' },
      { text: '증거를 제시한다', nextNode: 'present_evidence_to_hope' },
      { text: '더 이상 묻지 않는다', nextNode: 'turn_around' }
    ]
  },

  press_hope_level_3: {
    id: 'press_hope_level_3',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"20년간 무엇을 기다렸습니까?"

침묵이 흘렀다.

호프가 천천히 고개를 들었다.

[호프]: ...복수를.

그의 눈에 눈물이 고였다.

[호프]: 루시를 위한... 정의를.

홈즈가 한 걸음 물러섰다.

[홈즈]: 백작을... 죽이려 했습니까?

호프가 고개를 저었다.

[호프]: 아니요. 선택권을 주려 했습니다. 살 것인가, 죽을 것인가... 그가 루시에게 주지 않았던 그 선택을.`,
    choices: [
      { text: '백작이 지금 어디 있는지 추궁한다', nextNode: 'hope_count_location' },
      { text: '루시에게 무슨 일이 있었는지 묻는다', nextNode: 'hope_lucy_confession' },
      { text: '선택권에 대해 자세히 묻는다', nextNode: 'hope_poison_choice_explanation' }
    ]
  },

  // 호프의 고백 - 반지 후
  hope_ring_memory: {
    id: 'hope_ring_memory',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"이 반지... 어떻게 아십니까?"

호프가 반지를 바라봤다.

[호프]: 제가... 만들었습니다.

그의 목소리가 떨렸다.

[호프]: 20년 전, 루시에게 청혼할 때... 금세공사에게 맡겼습니다. 제 전 재산이었죠.

그가 눈을 감았다.

[호프]: 루시는... 좋아했습니다. 매일 끼고 있었죠. 죽는 그 순간까지도...

침묵이 흘렀다.`,
    choices: [
      { text: '루시가 어떻게 죽었는지 묻는다', nextNode: 'hope_lucy_death_story' },
      { text: '백작과의 관계를 묻는다', nextNode: 'hope_count_connection' },
      { text: '그를 위로한다', nextNode: 'hope_comfort_after_ring' }
    ]
  },

  // 루시의 죽음
  hope_lucy_death_story: {
    id: 'hope_lucy_death_story',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"루시는... 어떻게 돌아가셨습니까?"

호프가 하늘을 올려다봤다.

[호프]: 폐병이었습니다.

그의 목소리는 담담했다. 너무나 많이 이야기해서 감정이 마른 것처럼.

[호프]: 치료비가 있었습니다. 충분히... 충분히 있었죠.

그가 주먹을 쥐었다.

[호프]: 하지만 그 돈은... 백작이 가져갔습니다. 사기로. 루시의 아버지 페리에 영감을 속여서.

[호프]: 저는 루시 옆에서... 그저 지켜볼 수밖에 없었습니다. 아무것도 할 수 없이...

그가 울먹였다.

[호프]: 그녀가 숨을 거둘 때... 마지막으로 제 이름을 불렀습니다. "제퍼슨... 미안해..."라고...`,
    choices: [
      { text: '백작이 지금 어디 있는지 묻는다', nextNode: 'hope_count_location' },
      { text: '복수를 어떻게 계획했는지 묻는다', nextNode: 'hope_revenge_plan' },
      { text: '그를 위로한다', nextNode: 'hope_comfort_lucy_story' }
    ]
  },

  // 백작의 범죄
  hope_count_crime: {
    id: 'hope_count_crime',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"백작이... 정확히 무슨 짓을 했습니까?"

호프가 천천히 말했다.

[호프]: 금광 투자 사기였습니다.

그의 목소리는 차가웠다.

[호프]: 1860년, 독일에서 미국으로 건너온 페리에 영감... 루시의 아버지는 금광 개발 투자에 전 재산을 걸었습니다.

[호프]: 백작과 스탠거슨이... 거짓 서류를 만들고, 가짜 광산 주식을 팔았죠.

[호프]: 페리에 영감은 파산했습니다. 루시와 저는... 갈 곳이 없었죠.

그가 고개를 숙였다.

[호프]: 그리고 루시가 병에 걸렸을 때... 치료비조차 없었습니다.`,
    choices: [
      { text: '백작은 도망쳤는가', nextNode: 'hope_count_escape' },
      { text: '왜 경찰에 신고하지 않았는가', nextNode: 'hope_why_no_police' },
      { text: '복수를 결심한 계기를 묻는다', nextNode: 'hope_revenge_decision' }
    ]
  },

  // 백작의 위치
  hope_count_location: {
    id: 'hope_count_location',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"백작이 지금 어디 있습니까?"

호프가 저택을 바라봤다.

[호프]: ...지하실입니다.

홈즈가 긴장했다.

[홈즈]: 지하실? 당신이... 백작을 거기 가뒀습니까?

호프가 고개를 끄덕였다.

[호프]: 3일 전부터입니다. 그곳은... 백작의 속죄실이라고 들었습니다. 루시의 사진이 있는 곳.

그가 나를 똑바로 봤다.

[호프]: 적절한 곳이라고 생각했습니다. 그가 죄를 깨닫고... 선택할 수 있는 곳.`,
    choices: [
      { text: '선택이 무슨 뜻인지 묻는다', nextNode: 'hope_poison_choice_explanation' },
      { text: '백작이 살아있는지 확인한다', nextNode: 'hope_count_alive' },
      { text: '지금 당장 지하실로 가자고 한다', nextNode: 'hope_go_basement_together' }
    ]
  },

  // 독약 선택 설명
  hope_poison_choice_explanation: {
    id: 'hope_poison_choice_explanation',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"선택권... 무슨 뜻입니까?"

호프가 주머니에서 작은 상자를 꺼냈다.

[호프]: 두 개의 알약입니다.

그가 상자를 열었다. 똑같이 생긴 알약 두 개.

[호프]: 하나는 독약, 하나는 무해한 약입니다.

홈즈가 숨을 들이켰다.

[호프]: 저는 백작에게... 선택하라고 했습니다. 루시에게 준 고통을... 자신도 느껴보라고.

그가 상자를 닫았다.

[호프]: 루시도... 선택권이 있었어야 했습니다. 살 것인가, 죽을 것인가. 하지만 백작이 그 기회를 빼앗았죠.

침묵이 흘렀다.`,
    choices: [
      { text: '백작이 선택했는가', nextNode: 'hope_count_choice_result' },
      { text: '이건 살인이라고 말한다', nextNode: 'hope_murder_accusation' },
      { text: '정의와 복수는 다르다고 설득한다', nextNode: 'hope_justice_vs_revenge' }
    ]
  },

  // 백작이 살아있는가
  hope_count_alive: {
    id: 'hope_count_alive',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"백작이... 살아계십니까?"

호프가 고개를 끄덕였다.

[호프]: 네. 아직은.

그의 목소리는 담담했다.

[호프]: 하지만... 오래 버티지 못할 겁니다. 음식도 물도 주지 않았으니까요.

홈즈가 분노했다.

[홈즈]: 그건... 고문입니다!

호프가 냉소했다.

[호프]: 고문? 루시는 3개월간... 천천히 죽어갔습니다. 기침을 하며, 피를 토하며... 저는 그녀 옆에서 무력하게 지켜봤죠.

그가 나를 봤다.

[호프]: 3일이... 고문입니까?`,
    choices: [
      { text: '지금 당장 백작을 구해야 한다', nextNode: 'hope_must_save_count' },
      { text: '호프의 고통을 이해한다고 말한다', nextNode: 'hope_understand_pain' },
      { text: '법으로 해결하자고 설득한다', nextNode: 'hope_law_solution' }
    ]
  },

  // 함께 지하실로
  hope_go_basement_together: {
    id: 'hope_go_basement_together',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"함께 지하실로 갑시다. 백작을 만나야 합니다."

호프가 잠시 망설였다.

[호프]: ...좋습니다.

그가 일어섰다.

[호프]: 어차피... 끝을 봐야 합니다. 20년의 끝을.

홈즈가 나를 봤다. 긴장한 표정이었다.

[홈즈]: 왓슨, 조심해. 그가 무슨 짓을 할지 모르겠어.

나는 권총에 손을 올렸다.

[왓슨]: 알겠어, 홈즈.

호프가 저택을 향해 걷기 시작했다.`,
    choices: [
      { text: '호프를 따라 지하실로 간다', nextNode: 'basement_with_hope' }
    ]
  },

  // 위로 - 반지 후
  hope_comfort_after_ring: {
    id: 'hope_comfort_after_ring',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `나는 호프의 어깨에 손을 올렸다.

"당신의 고통을... 조금은 이해합니다."

호프가 눈물을 닦았다.

[호프]: 이해... 하십니까?

그가 쓰게 웃었다.

[호프]: 사랑하는 사람이... 눈앞에서 죽어가는데... 아무것도 할 수 없는 그 무력함을... 이해하십니까?

침묵이 흘렀다.

[호프]: ...미안합니다. 당신들은... 선한 분들입니다.

그가 반지를 바라봤다.

[호프]: 하지만 저는... 이미 선택했습니다. 돌이킬 수 없습니다.`,
    choices: [
      { text: '아직 늦지 않았다고 설득한다', nextNode: 'hope_not_too_late' },
      { text: '백작이 어디 있는지 묻는다', nextNode: 'hope_count_location' },
      { text: '루시라면 원하지 않을 거라고 말한다', nextNode: 'hope_lucy_wish' }
    ]
  },

  // 복수 vs 정의
  hope_justice_vs_revenge: {
    id: 'hope_justice_vs_revenge',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"정의와 복수는... 다릅니다."

나는 조용히 말했다.

호프가 나를 봤다.

[호프]: 다릅니까? 어떻게?

그의 목소리는 떨렸다.

[호프]: 법이 그를 심판할 수 있습니까? 20년이 지났는데? 증거도, 증인도... 모두 사라졌는데?

[호프]: 루시의 아버지는 죽었습니다. 루시도 죽었습니다. 저만... 남았습니다.

그가 주먹을 쥐었다.

[호프]: 그렇다면 제가... 정의를 실행해야 하지 않습니까?

홈즈가 한 걸음 나섰다.

[홈즈]: 그건 정의가 아닙니다. 그건... 당신을 파괴할 뿐입니다.`,
    choices: [
      { text: '홈즈의 말에 동의한다', nextNode: 'hope_holmes_persuasion' },
      { text: '호프의 고통을 인정한다', nextNode: 'hope_acknowledge_pain' },
      { text: '루시라면 원하지 않을 거라고 말한다', nextNode: 'hope_lucy_wish' }
    ]
  },

  // 루시의 바람
  hope_lucy_wish: {
    id: 'hope_lucy_wish',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"루시는... 이걸 원하지 않을 겁니다."

호프가 ���어붙었다.

[호프]: ...무슨 말씀을...

나는 천천히 말했다.

"루시는... 당신을 사랑했습니다. 당신이 살인자가 되는 걸... 원하지 않았을 겁니다."

호프의 눈에서 눈물이 흘렀다.

[호프]: 루시는... 착했습니다. 너무나... 착했죠.

그가 무릎을 꿇었다.

[호프]: 마지막 순간에도... 저를 용서했습니다. "당신 잘못이 아니에요"라고...

침묵이 흘렀다.

[호프]: ...하지만 저는... 용서할 수 없습니다. 저 자신을...`,
    choices: [
      { text: '용서는 당신 자신부터 시작이라고 말한다', nextNode: 'hope_self_forgiveness' },
      { text: '함께 백작을 구하자고 제안한다', nextNode: 'hope_save_count_together' },
      { text: '루시의 기억을 더럽히지 말라고 설득한다', nextNode: 'hope_lucy_memory' }
    ]
  }
};