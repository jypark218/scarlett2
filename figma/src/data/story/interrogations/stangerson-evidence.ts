/**
 * 스탠거슨 심문 - 증거 제시 시스템
 * 역전재판 스타일의 증거 제시 및 추궁
 */

import { StoryNode } from '../../../types/story';

export const stangersonEvidenceNodes: Record<string, StoryNode> = {
  // 증거 제시 허브 노드
  present_evidence_to_stangerson: {
    id: 'present_evidence_to_stangerson',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `스탠거슨이 거짓말을 하고 있다.

그의 떨리는 손, 피하는 시선, 식은땀... 모든 것이 말해준다.

나는 주머니에서 증거를 꺼낸다.

어떤 증거를 제시할까?`,
    choices: [
      {
        text: '백작의 일기를 제시한다',
        nextNode: 'evidence_diary_result',
        requiredItem: 'diary'
      },
      {
        text: '찢어진 천 조각을 제시한다',
        nextNode: 'evidence_cloth_correct',
        requiredItem: '찢어진 천 조각'
      },
      {
        text: '지하실 열쇠를 제시한다',
        nextNode: 'evidence_key_result',
        requiredItem: '지하실 열쇠'
      },
      {
        text: '로켓 펜던트를 제시한다',
        nextNode: 'evidence_locket_correct',
        requiredItem: 'locket'
      },
      {
        text: '아직은 때가 아니다', 
        nextNode: 'study_with_stangerson'
      }
    ]
  },

  // 정답: 찢어진 천 조각
  evidence_cloth_correct: {
    id: 'evidence_cloth_correct',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"이 천 조각... 당신 옷에서 떨어진 거 아닙니까?"

나는 조용히 물었다.

스탠거슨의 얼굴에서 혈색이 사라졌다. 그의 시선이 천 조각과 자신의 옷 사이를 오간다.

[스탄거슨]: 그, 그건...!

홈즈가 한 걸음 다가섰다. 그의 목소리는 낮고 차가웠다.

[홈즈]: 당신은 그날 밤 지하실에 있었군요.

침묵이 흘렀다.

스탠거슨이 무릎을 꿇었다.

[스탄거슨]: ...네, 있었습니다. 하지만 백작님을 해치지는 않았어요!`,
    choices: [
      { text: '지하실에서 무엇을 했는지 추궁한다', nextNode: 'stangerson_basement_confession' },
      { text: '백작이 지금 어디 있는지 묻는다', nextNode: 'stangerson_knows_location' },
      { text: '왜 거짓말했는지 따진다', nextNode: 'stangerson_why_lie' }
    ]
  },

  // 정답: 로켓 펜던트
  evidence_locket_correct: {
    id: 'evidence_locket_correct',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `나는 로켓 펜던트를 꺼내 스탠거슨 앞에 놓았다.

"루시 루이자, 1861..."

스탠거슨이 얼어붙었다.

[스탄거슨]: 그건... 어디서...

[홈즈]: 당신은 이것을 알고 있군요. 20년 전, 루시의 로켓.

스탠거슨의 손이 떨렸다.

[스탄거슨]: 저는... 저는 몰랐습니다. 그 사람이 아직 가지고 있을 줄은...

[홈즈]: 그 사람? 제퍼슨 호프를 말하는 겁니까?

스탠거슨이 고개를 떨굽다.

[스탄거슨]: ...네. 그는... 20년간 복수를 준비했습니다.`,
    choices: [
      { text: '호프가 어디 있는지 묻는다', nextNode: 'stangerson_hope_location' },
      { text: '20년 전 일을 자세히 듣는다', nextNode: 'stangerson_1861_connection' },
      { text: '백작이 지금 어떻게 됐는지 묻는다', nextNode: 'stangerson_count_fate' }
    ]
  },

  // 오답: 백작의 일기
  evidence_diary_result: {
    id: 'evidence_diary_result',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"이 일기... 백작님이 쓰신 일기입니다."

스탠거슨이 일기를 본다.

[스탄거슨]: ...네, 백작님의 것이 맞습니다.

[왓슨]: 여기에 루시와 1861년에 대한 기록이 있습니다.

스탠거슨의 표정이 어두워진다.

[스탄거슨]: 백작님은 항상 죄책감에 시달리셨습니다. 하지만... 그게 저와 무슨 상관입니까?

홈즈가 나를 본다. 이 증거로는 스탠거슨을 압박하기 어렵다.`,
    choices: [
      { text: '다른 증거를 제시한다', nextNode: 'present_evidence_to_stangerson' },
      { text: '계속 대화로 추궁한다', nextNode: 'confront_stangerson' }
    ]
  },

  // 오답: 지하실 열쇠
  evidence_key_result: {
    id: 'evidence_key_result',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"이 열쇠... 지하실 열쇠입니다."

스탠거슨이 열쇠를 본다.

[스탄거슨]: 네, 지하실 열쇠가 맞습니다. 어디서 찾으셨습니까?

[왓슨]: 금고 안에 있었습니다.

[스탄거슨]: 그렇군요... 백작님이 보관하고 계셨나 봅니다.

홈즈가 나를 본다. 이 증거로는 스탠거슨을 압박하기 어렵다. 지하실 열쇠는 현재 위치를 추론하는 데는 유용하지만, 스탠거슨의 거짓말을 증명하지는 못한다.`,
    choices: [
      { text: '다른 증거를 제시한다', nextNode: 'present_evidence_to_stangerson' },
      { text: '지하실에 대해 직접 묻는다', nextNode: 'stangerson_basement_question' }
    ]
  },

  // 추궁 시스템 - 단계별 압박
  press_stangerson_level_1: {
    id: 'press_stangerson_level_1',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"스탠거슨 씨, 정말 아무것도 보지 못했다고요?"

나는 천천히, 또박또박 물었다.

스탠거슨이 시선을 피한다.

[스탄거슨]: ...네, 저는 일찍 잠들었습니다.

하지만 그의 손은 떨리고 있었다.

홈즈가 나를 힐끗 본다. 계속 압박하라는 신호다.`,
    choices: [
      { text: '손의 떨림을 지적한다', nextNode: 'press_stangerson_level_2' },
      { text: '증거를 제시한다', nextNode: 'present_evidence_to_stangerson' },
      { text: '일단 믿어준다', nextNode: 'stangerson_believed' }
    ]
  },

  press_stangerson_level_2: {
    id: 'press_stangerson_level_2',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"손이 떨리고 계시는데요."

나는 그의 눈을 똑바로 봤다.

[스탄거슨]: 저, 저는 단지... 백작님이 걱정되어서...

그의 이마에 식은땀이 맺혔다.

[왓슨]: 그날 밤, 정말 방에 계셨습니까?

침묵.

홈즈가 한 걸음 다가선다.`,
    choices: [
      { text: '"어디 계셨습니까?" (결정타)', nextNode: 'press_stangerson_level_3' },
      { text: '증거를 제시한다', nextNode: 'present_evidence_to_stangerson' },
      { text: '더 이상 묻지 않는다', nextNode: 'study_with_stangerson' }
    ]
  },

  press_stangerson_level_3: {
    id: 'press_stangerson_level_3',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"그날 밤, 어디 계셨습니까?"

나는 한 걸음 다가서며 물었다.

스탠거슨이 뒤로 물러섰다. 그의 등이 벽에 닿았다.

[스탄거슨]: 저는... 저는...

홈즈가 조용히 말한다.

[홈즈]: 진실을 말씀하십시오. 당신은 그날 밤 지하실에 있었습니다.

스탠거슨의 얼굴이 창백해졌다.

[스탄거슨]: ...어떻게 아셨습니까?

홈즈가 그의 옷자락을 가리킨다.

[홈즈]: 찢어진 흔적이 있습니다. 지하실 계단의 못에 걸렸겠죠.`,
    choices: [
      { text: '지하실에서 무엇을 했는지 추궁한다', nextNode: 'stangerson_basement_confession' },
      { text: '백작을 만났는지 묻는다', nextNode: 'stangerson_saw_count' },
      { text: '왜 거짓말했는지 따진다', nextNode: 'stangerson_why_lie' }
    ]
  },

  // 스탠거슨의 고백
  stangerson_basement_confession: {
    id: 'stangerson_basement_confession',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `스탠거슨이 바닥에 주저앉았다.

[스탄거슨]: ...네, 저는 지하실에 갔습니다.

그의 목소리가 떨렸다.

[스탄거슨]: 비명 소리를 듣고... 두려웠지만... 백작님을 확인해야 했습니다.

[홈즈]: 그래서?

[스탄거슨]: 지하실 문이 열려있었어요. 안에서 목소리가 들렸습니다. 백작님과... 그 남자의 목소리.

그가 고개를 떨굽다.

[스탄거슨]: 저는... 도망쳤습니다. 백작님을 구하지 못했어요. 겁쟁이처럼... 20년 전처럼...`,
    choices: [
      { text: '그 남자가 누구였는지 봤는지 묻는다', nextNode: 'stangerson_saw_hope' },
      { text: '백작이 살아있었는지 확인한다', nextNode: 'stangerson_count_alive' },
      { text: '왜 경찰에 신고하지 않았는지 추궁한다', nextNode: 'stangerson_no_police' }
    ]
  },

  // 호프를 봤는가
  stangerson_saw_hope: {
    id: 'stangerson_saw_hope',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"그 남자를 직접 봤습니까?"

스탠거슨이 고개를 끄덕였다.

[스탄거슨]: 어두웠지만... 키가 크고, 어깨가 넓었습니다. 군인 같았어요.

그가 떨리는 목소리로 계속했다.

[스탄거슨]: 그리고 얼굴을... 희미하게 봤습니다. 20년이 지났지만... 알아볼 수 있었어요.

[홈즈]: 누구였습니까?

침묵.

[스탄거슨]: ...제퍼슨 호프. 루시의 약혼자였던 남자입니다.`,
    choices: [
      { text: '호프가 백작에게 무엇을 하고 있었는지 묻는다', nextNode: 'stangerson_what_hope_doing' },
      { text: '지금 호프가 어디 있는지 추궁한다', nextNode: 'stangerson_hope_location' },
      { text: '백작이 살아있었는지 확인한다', nextNode: 'stangerson_count_alive' }
    ]
  },

  // 백작이 살아있는가
  stangerson_count_alive: {
    id: 'stangerson_count_alive',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"백작님이 살아계셨습니까?"

스탠거슨이 고개를 끄덕였다.

[스탄거슨]: 네... 3일 전에는 살아계셨습니다.

[왓슨]: 지금은요?

긴 침묵.

[스탄거슨]: 모르겠습니다. 그 이후로... 확인하지 못했습니다.

홈즈가 날카롭게 묻는다.

[홈즈]: 3일 동안 확인하지 않았다고요? 주인이 납치당했는데?

스탠거슨이 울먹였다.

[스탄거슨]: 저는... 무서웠습니다. 그리고 솔직히... 일부는 백작님이 당하기를 바랐을지도 모릅니다.`,
    choices: [
      { text: '지금 당장 백작을 구하러 가야 한다', nextNode: 'stangerson_go_basement_now' },
      { text: '왜 백작이 당하기를 바랐는지 묻는다', nextNode: 'stangerson_hatred' },
      { text: '혼자서라도 지하실로 간다', nextNode: 'go_basement_alone' }
    ]
  },

  // 왜 거짓말을 했는가
  stangerson_why_lie: {
    id: 'stangerson_why_lie',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"왜 거짓말을 하셨습니까?"

나는 조용히 물었다.

스탠거슨이 고개를 숙였다.

[스탄거슨]: 두려웠습니다. 만약 진실을 말하면... 제가 공범으로 몰릴까봐...

[홈즈]: 공범? 백작 납치의 공범이란 말입니까?

[스탄거슨]: 아니요! 저는 백작님을 납치하지 않았습니다! 하지만... 막지도 않았죠.

그의 목소리가 떨렸다.

[스탄거슨]: 그리고 20년 전 일까지 밝혀질까봐 무서웠습니다. 루시의 죽음... 페리에 영감의 파산... 우리가 저지른 일들...`,
    choices: [
      { text: '20년 전 일을 자세히 듣는다', nextNode: 'stangerson_1861_connection' },
      { text: '지금이라도 백작을 구해야 한다고 설득한다', nextNode: 'stangerson_save_count' },
      { text: '진실을 밝히는 것이 죄라고 말한다', nextNode: 'stangerson_gentle_approach' }
    ]
  },

  // 일단 믿어준다 - 서재 조사로 복귀
  stangerson_believed: {
    id: 'stangerson_believed',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `"알겠습니다, 스탠거슨 씨. 일단은 믿겠습니다."

나는 고개를 끄덕였다.

스탠거슨이 안도의 한숨을 내쉬었다.

[스탄거슨]: 감사합니다... 정말 감사합니다.

홈즈가 나를 보며 작은 목소리로 말한다.

[홈즈]: 왓슨, 아직 확실한 건 없어. 다른 단서를 더 찾아보자.

서재를 더 조사할 필요가 있다.`,
    choices: [
      { text: 'RACHE 글자를 조사한다', nextNode: 'examine_rache' },
      { text: '책상을 조사한다', nextNode: 'examine_desk' },
      { text: '나중에 다시 질문한다', nextNode: 'study_with_stangerson' }
    ]
  }
};