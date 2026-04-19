import { StoryNode } from '../../types/story';

/**
 * 🔀 3명의 용의자 루트 시스템
 * 🔀 용의자 선택 분기점
 * 2층 탐색 후, 홈즈와 왓슨이 누구를 주요 용의자로 볼지 결정
 */
export const suspectChoiceHub: Record<string, StoryNode> = {
  // 📍 suspect_choice_hub는 사용되지 않음 - hub-to-suspects-bridge.ts의 incomplete_suspect_choice_hub를 사용하세요
  // 삭제됨
  
  // ═══════════════════════════════════════════════════════
  // 🔴 호프 루트 (기존 스토리 기반 - 진엔딩 가능)
  // ═══════════════════════════════════════════════════════
  
  hope_route_start: {
    id: 'hope_route_start',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: 호프를 추적합시다. 루시의 로켓... 그의 슬픔이 느껴집니다.

[셜록 홈즈]: 좋아. 하지만 조심하게, 왓슨. 슬픔은 때로 가장 위험한 무기가 되지.

[당신들은 지하실로 향합니다]

[어둠 속에서 촛불 하나가 보입니다]

[제퍼슨 호프]: ...왔군요, 탐정님.
`,
    choices: [
      { text: '💬 "호프, 루시는 당신의 복수를 원하지 않을 것입니다"', nextNode: 'hope_persuade_mercy' },
      { text: '⚡ "당장 멈추시오! 백작에게서 떨어져!"', nextNode: 'hope_confrontation' },
      { text: '🤝 "당신의 고통을 이해합니다. 하지만 법이 정의를 실현할 것입니다"', nextNode: 'hope_legal_justice' },
      { text: '🔍 "잠깐... 호프, 당신이 진짜 범인이 맞습니까?"', nextNode: 'hope_doubt_culprit' }
    ]
  },

  // 🌟 진엔딩 루트
  hope_persuade_mercy: {
    id: 'hope_persuade_mercy',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]:호프... 루시는 선한 사람이었습니다. 그녀는 당신의 복수를 원하지 않을 것입니다.

[제퍼슨 호프]:...

[그의 손이 떨립니다]

[왓슨]:그녀가 사랑한 당신은... 살인자가 아니었습니다. 그녀의 기억 속 당신은...

[제퍼슨 호프]:루시... 당신은... 나에게 뭐라고 말할까요...

[눈물이 그의 뺨을 타고 흐릅니다]

[모로 백작]:호프... 나는... 용서를 구할 자격도 없지만... 미안하오...

[제퍼슨 호프]:백작...

[긴 침묵]

[제퍼슨 호프]:...루시는 용서하는 사람이었소. 나보다... 훨씬 나은 사람이었지.

[그가 약병을 바닥에 내려놓습니다]`,
    choices: [
      { text: '🌟 [호프의 손을 잡는다]', nextNode: 'true_ending_mercy' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🟠 스탐거슨 루트
  // ═══════════════════════════════════════════════════════
  
  stangerson_route_start: {
    id: 'stangerson_route_start',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[셜록 홈즈]: 스탐거슨... 20년간 백작의 곁에 있었어. 공범이라면...

[당신들은 비서실로 향합니다]

[문이 잠겨있습니다]

[셜록 홈즈]: 왓슨, 안에서 무슨 소리가...

[쾅!]

[당신이 문을 박차고 들어가니...]

[조셉 스탐거슨]: ...탐정님. 늦으셨습니다.

[바닥에 모로 백작이 쓰러져 있습니다!]

[조셉 스탐거슨]: 백작이 모든 것을 경찰에 말하려 했습니다. 나는... 그럴 수 없었어요.`,
    choices: [
      { text: '💉 [급히 백작에게 해독제를 투여한다]', nextNode: 'stangerson_save_count' },
      { text: '⚔️ [스탄거슨을 제압한다]', nextNode: 'stangerson_fight' },
      { text: '💬 "왜 그랬습니까? 20년간 함께했는데..."', nextNode: 'stangerson_confession' }
    ]
  },

  stangerson_save_count: {
    id: 'stangerson_save_count',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[당신은 즉시 의사 가방에서 해독제를 꺼냅니다]

[왓슨]: 아직 늦지 않았습니다!

[홈즈가 스탐거슨을 제압하는 동안, 당신은 백작을 치료합니다]

[모로 백작]: 으윽... 왓슨... 박사...

[셜록 홈즈]: 스탐거슨, 당신은 체포되었네. 백작 살해 미수 혐의로.

[조셉 스탬거슨]: ...20년이었습니다. 20년간... 나는 두려움 속에 살았습니다...

[그가 무릎을 꿇습니다]

[조셉 스탬거슨]: 이제... 끝났군요. 고백하겠습니다. 모든 것을...`,
    choices: [
      { text: '✅ [경찰을 부른다]', nextNode: 'good_ending_stangerson' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 드레버 루트 (가장 위험한 시나리오)
  // ═══════════════════════════════════════════════════════
  
  drebber_route_start: {
    id: 'drebber_route_start',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[셜록 홈즈]: 드레버... 가장 의심스러운 사람이야. 그는 너무 조용했어.

[셜록 홈즈]: 유언장을 본 사람이 백작을 죽일 동기가...

[갑자기!]

[이녹 드레버]: 잘 추리하셨습니다, 홈즈 씨.

[뒤에서 드레버가 나타납니다 - 손에 리볼버를 들고!]

[이녹 드레버]: 하지만 당신들이 알아차리기엔... 너무 늦었습니다.

[셜록 홈즈]: 드레버... 자네가...?

[이녹 드레버]: 백작은 이미 지하실에서 죽었습니다. 이제 당신들도...`,
    choices: [
      { text: '🎯 [홈즈를 밀어 총알을 피한다]', nextNode: 'drebber_save_holmes' },
      { text: '💪 [드레버에게 달려든다]', nextNode: 'drebber_rush' },
      { text: '🗣️ "잠깐! 백작이 정말 죽었다는 증거가 있소?"', nextNode: 'drebber_bluff' }
    ]
  },

  drebber_save_holmes: {
    id: 'drebber_save_holmes',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[당신은 홈즈를 밀어냅니다!]

[총성!]

[총알이 당신의 어깨를 스칩니다]

[왓슨]: 으윽!

[셜록 홈즈]: 왓슨!

[홈즈가 재빨리 드레버를 제압합니다]

[이녹 드레버]: 크윽... 계획이...

[경찰 호루라기 소리가 들립니다 - 레스트레이드가 도착했습니다!]

[레스트레이드]: 무슨 일입니까?

[셜록 홈즈]: 드레버를 체포하시오. 백작 살해 미수 혐의��!

[당신들이 지하실로 내려가니... 백작이 의자에 묶여 있지만 살아있습니다]

[모로 백작]: 탐정님... 왓슨 박사... 감사합니다...`,
    choices: [
      { text: '🏆 [사건 해결]', nextNode: 'good_ending_drebber' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // ⚠️ 불완전 조사 루트 (로켓 없이 조사)
  // ═══════════════════════════════════════════════════════
  
  incomplete_investigation_timeskip: {
    id: 'incomplete_investigation_timeskip',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[시간이 흐릅니다...]

당신들은 선택한 용의자를 추적하기 시작했다.

하지만... 무언가 놓친 것 같은 느낌이 지워지지 않는다.

홈즈도 평소와 달리 표정이 어둡다.

[셜록 홈즈]: 왓슨... 뭔가... 중요한 단서를 놓쳤어.

[왓슨]: 우리가... 잘못 생각한 걸까?

[셜록 홈즈]: 아니, 아직 늦지 않았어. 다시 조사하자.`,
    choices: [
      { text: '🔍 처음부터 다시 조사한다', nextNode: 'main_entrance' },
      { text: '📍 중요한 장소를 다시 확인한다', nextNode: 'main_entrance_return_upstairs' }
    ]
  }
};