import { StoryNode } from '../../../types/story';

/**
 * 누락된 노드 임시 구현
 * TODO: 향후 콘텐츠 확장 시 완전한 구현 필요
 */

export const missingNodes: Record<string, StoryNode> = {
  // ========== Inn 관련 ==========
  inn_return: {
    id: 'inn_return',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '여관을 나와 저택으로 돌아간다.',
    nextNode: 'main_entrance'
  },

  // ========== Hope 심문 관련 ==========
  hope_basement_knowledge: {
    id: 'hope_basement_knowledge',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 지하실...? 그곳에 대해서는... (말을 흐린다)',
    choices: [
      { text: '계속 추궁한다', nextNode: 'press_hope_level_2' },
      { text: '다른 질문을 한다', nextNode: 'present_evidence_to_hope' }
    ]
  },

  hope_lucy_confession: {
    id: 'hope_lucy_confession',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 루시... 그녀는 내 모든 것이었소. (눈물을 흘린다)',
    choices: [
      { text: '위로한다', nextNode: 'comfort_hope' },
      { text: '계속 질문한다', nextNode: 'press_hope_level_2' }
    ]
  },

  hope_count_choice_result: {
    id: 'hope_count_choice_result',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 백작은... 선택을 해야 했소. 나처럼.',
    nextNode: 'hope_go_basement_together'
  },

  hope_murder_accusation: {
    id: 'hope_murder_accusation',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 살인이라고요? 아니오. 이건... 정의요.',
    choices: [
      { text: '법적 정의를 설득한다', nextNode: 'persuade_legal' },
      { text: '백작을 구하러 간다', nextNode: 'chase_hope_to_basement' }
    ]
  },

  hope_holmes_persuasion: {
    id: 'hope_holmes_persuasion',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: '[홈즈]: 호프씨, 복수는 아무것도 돌려주지 않습니다.',
    nextNode: 'hope_final_choice'
  },

  hope_acknowledge_pain: {
    id: 'hope_acknowledge_pain',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '[왓슨]: 당신의 고통을 이해합니다. 하지만...',
    nextNode: 'hope_final_choice'
  },

  hope_self_forgiveness: {
    id: 'hope_self_forgiveness',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 용서... 나 자신을 용서할 수 있을까요?',
    nextNode: 'true_ending_mercy'
  },

  hope_save_count_together: {
    id: 'hope_save_count_together',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: ...알았소. 함께 갑시다.',
    nextNode: 'chase_hope_to_basement'
  },

  hope_lucy_memory: {
    id: 'hope_lucy_memory',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 루시가 바라던 것은... 복수가 아니었소.',
    nextNode: 'true_ending_mercy'
  },

  basement_with_hope: {
    id: 'basement_with_hope',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '호프와 함께 지하실로 향한다.',
    nextNode: 'basement_scene'
  },

  hope_must_save_count: {
    id: 'hope_must_save_count',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '[왓슨]: 백작을 구해야 합니다!',
    nextNode: 'chase_hope_to_basement'
  },

  hope_understand_pain: {
    id: 'hope_understand_pain',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '[왓슨]: 당신의 아픔을 이해합니다.',
    nextNode: 'hope_final_choice'
  },

  hope_law_solution: {
    id: 'hope_law_solution',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '[왓슨]: 법의 심판을 받게 합시다.',
    nextNode: 'persuade_legal'
  },

  hope_revenge_motive: {
    id: 'hope_revenge_motive',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 20년을 기다렸소. 복수를 위해...',
    nextNode: 'press_hope_level_2'
  },

  hope_comfort_after_locket: {
    id: 'hope_comfort_after_locket',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '나는 조용히 호프의 어깨에 손을 얹었다.',
    nextNode: 'hope_final_choice'
  },

  hope_count_escape: {
    id: 'hope_count_escape',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 백작은 도망쳤소. 지하실로...',
    nextNode: 'chase_hope_to_basement'
  },

  hope_why_no_police: {
    id: 'hope_why_no_police',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 경찰이요? 그들은 20년 전에도 아무것도 하지 않았소.',
    nextNode: 'press_hope_level_2'
  },

  hope_revenge_decision: {
    id: 'hope_revenge_decision',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 결정은 이미 내렸소. 20년 전에...',
    nextNode: 'hope_go_basement_together'
  },

  hope_revenge_plan: {
    id: 'hope_revenge_plan',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 계획은 완벽했소. 모든 것이...',
    nextNode: 'press_hope_level_3'
  },

  hope_comfort_lucy_story: {
    id: 'hope_comfort_lucy_story',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '나는 그의 이야기를 조용히 들었다.',
    nextNode: 'hope_final_choice'
  },

  hope_count_connection: {
    id: 'hope_count_connection',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    text: '[호프]: 백작은... 모든 것을 빼앗아갔소.',
    nextNode: 'press_hope_level_2'
  },

  hope_not_too_late: {
    id: 'hope_not_too_late',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '[왓슨]: 아직 늦지 않았습니다.',
    nextNode: 'hope_final_choice'
  },

  // ========== Stangerson 심문 관련 ==========
  stangerson_count_fate: {
    id: 'stangerson_count_fate',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: '[스탠거슨]: 백작님의 운명은... 이미 정해진 것입니다.',
    nextNode: 'press_stangerson_level_2'
  },

  call_police_early: {
    id: 'call_police_early',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '경찰을 부르기로 결정한다.',
    nextNode: 'suggest_police'
  },

  stangerson_how_knew_basement: {
    id: 'stangerson_how_knew_basement',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: '[스탠거슨]: 지하실이요? 저는... 오래 전부터 알고 있었습니다.',
    nextNode: 'press_stangerson_level_2'
  },

  stangerson_why_hide_this: {
    id: 'stangerson_why_hide_this',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: '[스탠거슨]: 숨긴 것이 아닙니다. 다만... 말할 수 없었을 뿐.',
    nextNode: 'press_stangerson_level_2'
  },

  persuade_hope_basement: {
    id: 'persuade_hope_basement',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '[왓슨]: 호프, 이제 그만 멈춥시다.',
    nextNode: 'basement_scene'
  },

  save_count_first: {
    id: 'save_count_first',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '백작을 먼저 구하기로 결정한다.',
    nextNode: 'basement_scene'
  },

  reveal_stangerson_guilt: {
    id: 'reveal_stangerson_guilt',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '스탠거슨의 죄를 폭로한다.',
    nextNode: 'stangerson_full_confession'
  },

  stangerson_what_hope_doing: {
    id: 'stangerson_what_hope_doing',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: '[스탠거슨]: 그 남자는... 백작님을 찾고 있었습니다.',
    nextNode: 'press_stangerson_level_2'
  },

  confront_stangerson: {
    id: 'confront_stangerson',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '스탠거슨을 직접 대면한다.',
    nextNode: 'stangerson_study_clues'
  },

  stangerson_saw_count: {
    id: 'stangerson_saw_count',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: '[스탠거슨]: 네... 백작님을 봤습니다. 그 밤에...',
    nextNode: 'stangerson_full_confession'
  },

  stangerson_about_1861: {
    id: 'stangerson_about_1861',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: '[스탠거슨]: 1861년... 그 해를 잊을 수 없습니다.',
    nextNode: 'press_stangerson_level_3'
  },

  // ========== Drebber 관련 ==========
  // drebber_playcount_2_question는 drebber-hints.ts에 정의되어 있으므로 여기서는 제거

  // ========== Hope 관련 (추가) ==========
  ask_hope_what_late: {
    id: 'ask_hope_what_late',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'hope',
    speaker: 'watson',
    text: `"무엇이 늦었다는 겁니까?"

내가 조심스럽게 물었다.

호프가 저택을 바라본다. 그의 눈에 깊은 슬픔이 어려있다.

[호프]: 복수... 아니, 그것조차 아니오. 저는 그저... 그에게 묻고 싶었소.

[왓슨]: 무엇을 묻고 싶으셨습니까?

[호프]: "왜?"라고. "왜 그녀를 죽였냐?"고. "왜 그 많은 사람들을 속였냐?"고...

그가 주먹을 쥔다.

[호프]: 하지만 이제... 그는 사라졌소. 저는 물어볼 기회조차 없이... 또 늦었소.

홈즈가 조용히 말한다.

[홈즈]: 아직 끝나지 않았습니다. 백작을 찾을 수 있을 겁니다.

호프가 고개를 젓는다.

[호프]: 고맙소. 하지만... 이미 20년이 지났소. 1년 더 늦는다고 달라질 게... 있겠소?`,
    choices: [
      { text: '저택을 조사하러 간다', nextNode: 'main_entrance_after_hope' },
      { text: '호프에게 함께 가자고 한다', nextNode: 'invite_hope_investigate' }
    ]
  },

  // ========== 기타 누락 노드 ==========
  stangerson_poison_confront: {
    id: 'stangerson_poison_confront',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: '[왓슨]: 이 독약에 대해 설명해주십시오.',
    nextNode: 'stangerson_study_clues'
  }
};