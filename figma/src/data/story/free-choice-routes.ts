import { StoryNode } from '../../types/story';

/**
 * 🆓 자유 선택 시스템
 * 
 * 각 용의자 루트에서 플레이어가 자유롭게 엔딩을 선택할 수 있도록 함
 * - 호프가 범인이 아닐 수도 있음
 * - 스탠거슨이 무죄일 수도 있음
 * - 드레버가 진짜 범인일 수도 있음
 */
export const freeChoiceRoutes: Record<string, StoryNode> = {
  
  // ═══════════════════════════════════════════════════════
  // 🔴 호프 루트 - 의심하는 분기
  // ═══════════════════════════════════════════════════════
  
  hope_doubt_culprit: {
    id: 'hope_doubt_culprit',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]:잠깐... 호프, 당신이 진짜 범인이 맞습니까?

[제퍼슨 호프]:...무슨 말씀이십니까?

[왓슨]:당신은 20년간 복수를 계획했다고 했습니다. 하지만...

[홈즈가 당신의 의도를 눈치챕니다]

[셜록 홈즈]:왓슨이 옳습니다. 호프, 당신의 계획은 너무... 완벽합니다.

[셜록 홈즈]:마치 누군가가 당신을 범인으로 만들려는 것처럼.

[제퍼슨 호프]:...!

[어둠 속에서 박수 소리가 들립니다]`,
    choices: [
      { text: '🔦 [어둠 속을 비춘다]', nextNode: 'hope_reveal_real_culprit' }
    ]
  },

  hope_reveal_real_culprit: {
    id: 'hope_reveal_real_culprit',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'unknown',
    text: `[촛불이 켜지고...]

[조셉 스탐거슨]:훌륭한 추리입니다, 탐정님.

[그의 손에는 권총이 들려있습니다]

[조셉 스탐거슨]:호프는... 완벽한 희생양이었죠. 20년간 복수를 꿈꾸던 남자.

[제퍼슨 호프]:스탠거슨... 네가...?

[조셉 스탐거슨]:백작은 모든 것을 경찰에 말하려 했습니다. 나는... 그럴 수 없었어요.

[셜록 홈즈]:그래서 호프를 이용한 것이군요. 복수자라는 완벽한 가면을...`,
    choices: [
      { text: '⚔️ [스탠거슨에게 달려든다]', nextNode: 'hope_route_save_all' },
      { text: '💬 "호프는 무죄입니다. 당신이 진범이군요."', nextNode: 'hope_route_accuse_stangerson' },
      { text: '🔫 [권총을 빼앗으려 한다]', nextNode: 'bad_hope_violence' }
    ]
  },

  hope_route_save_all: {
    id: 'hope_route_save_all',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[당신은 스탐거슨에게 달려듭니다!]

[총성!]

[하지만 호프가 스탐거슨을 막아섭니다]

[제퍼슨 호프]:20년을... 20년을 나는 복수만 생각했소. 하지만...

[제퍼슨 호프]:루시는 이런 나를 원하지 않았을 것이오!

[스탠거슨이 제압됩니다]

[모로 백작]:호프... 자네는... 나를 구해준 것인가...

[제퍼슨 호프]:백작... 당신은 유타에서 잘못을 저질렀소. 하지만...

[제퍼슨 호프]:복수는... 복수는 아무것도 되돌리지 못한다는 것을... 이제야 알겠소.`,
    choices: [
      { text: '🌟 [모두가 살아남았다]', nextNode: 'true_ending_mercy' }
    ]
  },

  hope_route_accuse_stangerson: {
    id: 'hope_route_accuse_stangerson',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[셜록 홈즈]:스탠거슨... 당신이 진범입니다.

[조셉 스탐거슨]:...증거가 있습니까?

[셜록 홈즈]:1861년 장부. 당신은 유타에 있었습니다. 백작과 함께.

[셜록 홈즈]:당신은 공범이었고, 이제 모든 것을 백작 탓으로 돌리려 했죠.

[조셉 스탐거슨]:...

[그가 무기를 내려놓습니다]

[조셉 스탐거슨]:20년이었습니다... 20년간 두려움 속에...

[레스트레이드가 들어옵니다]

[레스트레이드]:체포합니다!`,
    choices: [
      { text: '✅ [호프가 무죄임이 증명되었다]', nextNode: 'good_ending_hope_innocent' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🟠 스탐거슨 루트 - 무죄 가능성
  // ═══════════════════════════════════════════════════════

  stangerson_innocent_route: {
    id: 'stangerson_innocent_route',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'stangerson',
    text: `[홈즈가 재빨리 백작에게 해독제를 투여합니다]

[모로 백작]:으윽... 스탐거슨...

[조셉 스탐거슨]:백작님! 저는... 저는 진범이 누군지 알았습니다!

[조셉 스탐거슨]:드레버입니다! 그가 유언장을 위조하고...

[갑자기 문이 열리고 드레버가 나타납니다 - 손에 총을!]

[이녹 드레버]:참 아쉽군요. 모두 알아버렸다니.

[이녹 드레버]:백작, 당신의 재산... 모두 내 것이 될 뻔했는데.`,
    choices: [
      { text: '🎯 [재빨리 몸을 피한다]', nextNode: 'stangerson_route_expose_drebber' },
      { text: '🗣️ "드레버, 경찰이 이미 와 있소!"', nextNode: 'stangerson_route_bluff' }
    ]
  },

  stangerson_route_expose_drebber: {
    id: 'stangerson_route_expose_drebber',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[총성!]

[홈즈가 드레버의 손목을 쳐서 총을 떨어뜨립니다]

[셜록 홈즈]:드레버, 당신은 체포됩니다!

[이녹 드레버]:크윽... 계획이...

[레스트레이드가 들어옵니다]

[레스트레이드]:무슨 일입니까?

[셜록 홈즈]:드레버를 체포하시오. 백작 독살 미수 혐의로!

[조셉 스탬거슨]:저는... 무죄입니다. 백작을 지키려 했을 뿐...

[모로 백작]:스탄거슨... 자네는 충직했네. 미안하네...`,
    choices: [
      { text: '✅ [진범을 잡았다]', nextNode: 'good_ending_drebber' }
    ]
  },

  stangerson_route_bluff: {
    id: 'stangerson_route_bluff',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]:드레버, 경찰이 이미 와 있소!

[이녹 드레버]:...뭐라고?

[그가 잠시 망설입니다]

[셜록 홈즈]:그렇소, 드레버. 레스트레이드 경감이 밖에서 대기 중이지.

[셜록 홈즈]:총을 쏘면 즉시 체포될 거요.

[이녹 드레버]:...거짓말이오!

하지만 그의 목소리가 떨립니다.

그 순간, 홈즈가 재빨리 움직여 총을 빼앗습니다!

[셜록 홈즈]:드레버, 당신은 체포됩니다!

[이녹 드레버]:크윽...!

[문이 열리고 레스트레이드가 들어옵니다]

[레스트레이드]:무슨 일입니까? 총성이...

[셜록 홈즈]:좋은 타이밍이군요, 경감. 드레버를 체포하시오. 백작 독살 미수 혐의로!

[조셉 스탬거슨]:저는... 무죄입니다. 백작을 지키려 했을 뿐...

[모로 백작]:스탄거슨... 자네는 충직했네. 미안하네...`,
    choices: [
      { text: '✅ [진범을 잡았다]', nextNode: 'good_ending_drebber' }
    ]
  },

  stangerson_confession: {
    id: 'stangerson_confession',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'stangerson',
    text: `[왓슨]:왜 그랬습니까? 20년간 함께했는데...

[조셉 스탬거슨]:...20년이었습니다. 20년간 백작과 함께...

[조셉 스탬거슨]:하지만 저는... 저는 공범이 아니었습니다!

[셜록 홈즈]:무슨 말입니까?

[조셉 스탬거슨]:1861년... 유타에서... 저도 피해자였습니다.

[조셉 스탬거슨]:백작이 저를 협박했습니다. 장부를 보관하라고... 아니면 제 가족을 죽이겠다고...

[그가 무릎을 꿇고 웁니다]

[조셉 스탬거슨]:저는... 백작을 죽이려던 게 아닙니다! 구하려 했습니다!

[그가 손에 쥔 해독제 병을 보여줍니다]`,
    choices: [
      { text: '💉 [해독제로 백작을 구한다]', nextNode: 'stangerson_redemption' },
      { text: '❓ "그럼 누가 백작을 독살했습니까?"', nextNode: 'stangerson_reveal_drebber' }
    ]
  },

  stangerson_redemption: {
    id: 'stangerson_redemption',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[당신은 스탬거슨의 손에서 해독제를 받아 백작에게 투여합니다]

[모로 백작]:으윽... 왓슨 박사...

[조셉 스탬거슨]:백작님... 저는 이제... 자유롭습니다.

[셜록 홈즈]:스탠거슨, 당신은 피해자였군요.

[조셉 스탬거슨]:네... 하지만 이제 진실을 말할 수 있습니다.

[조셉 스탬거슨]:진짜 범인은... 드레버입니다!

[모로 백작]:드레버... 그가...?`,
    choices: [
      { text: '🔍 [드레버를 찾아 나선다]', nextNode: 'hunt_drebber' }
    ]
  },

  stangerson_reveal_drebber: {
    id: 'stangerson_reveal_drebber',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'stangerson',
    text: `[조셉 스탬거슨]:드레버입니다... 이녹 드레버가 백작을 독살했습니다!

[셜록 홈즈]:유언장... 드레버가 유산을 노렸군요.

[조셉 스탬거슨]:맞습니다! 그는 제가 공범으로 몰릴 것을 알고...

[갑자기 뒤에서 목소리가!]

[이녹 드레버]:잘도 알아냈군요.

[드레버가 총을 들고 나타납니다!]

[이녹 드레버]:하지만 이미 늦었습니다. 백작은 곧 죽을 것이고...`,
    choices: [
      { text: '🎯 [총을 빼앗는다]', nextNode: 'disarm_drebber' },
      { text: '💉 [급히 백작을 치료한다]', nextNode: 'save_count_ignore_drebber' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 드레버 루트 - 다양한 결말
  // ═══════════════════════════════════════════════════════

  drebber_rush: {
    id: 'drebber_rush',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[당신은 드레버에게 달려듭니다!]

[총성!]

[당신의 어깨에 총알이 박힙니다]

[왓슨]:으윽!

[하지만 당신은 멈추지 않습니다]

[왓슨]:홈즈... 백작을... 구하세요!

[홈즈가 재빨리 지하실로 향합니다]

[당신은 드레버와 격투를 벌입니다]

[이녹 드레버]:크윽... 이런...!

[당신이 그를 제압합니다]`,
    choices: [
      { text: '✅ [레스트레이드가 도착했다]', nextNode: 'drebber_arrested_watson_wounded' }
    ]
  },

  drebber_bluff: {
    id: 'drebber_bluff',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]:잠깐! 백작이 정말 죽었다는 증거가 있소?

[이녹 드레버]:...무슨 소리를?

[셜록 홈즈]:왓슨이 옳습니다. 백작이 정말 죽었다면... 왜 당신이 여기 있습니까?

[셜록 홈즈]:지하실을 확인할 필요도 없이... 당신은 거짓말을 하고 있소.

[이녹 드레버]:...!

[그의 얼굴이 일그러집니다]

[이녹 드레버]:...못 속일 줄은 알았어야 했는데. 셜록 홈즈를 상대로.

[홈즈가 재빨리 그의 총을 빼앗습니다]`,
    choices: [
      { text: '🔍 [지하실로 내려간다]', nextNode: 'drebber_bluff_success' }
    ]
  },

  drebber_bluff_success: {
    id: 'drebber_bluff_success',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[당신들이 지하실로 내려가니...]

[모로 백작]:탐정님... 왓슨 박사...

[백작이 의자에 묶여 있지만 살아있습니다!]

[셜록 홈즈]:백작, 무사하십니까?

[모로 백작]:드레버가... 유산을 노리고...

[레스트레이드가 들어옵니다]

[레스트레이드]:체포합니다!

[이녹 드레버]:...계획이 완벽했는데...`,
    choices: [
      { text: '✅ [사건 해결]', nextNode: 'good_ending_drebber' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🔀 공통 분기 노드
  // ═══════════════════════════════════════════════════════

  hunt_drebber: {
    id: 'hunt_drebber',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[셜록 홈즈]:드레버를 찾아야 합니다!

[당신들은 저택을 수색합니다]

[2층 서재에서...]

[이녹 드레버]:...다 끝났군요.

[그는 창문 앞에 서 있습니다]

[이녹 드레버]:유산... 모두 내 것이 될 뻔했는데...

[셜록 홈즈]:드레버, 당신은 체포됩니다!`,
    choices: [
      { text: '🤝 "저항하지 마시오. 이미 끝났습니다."', nextNode: 'drebber_surrender' },
      { text: '⚡ [재빨리 제압한다]', nextNode: 'drebber_captured' }
    ]
  },

  drebber_surrender: {
    id: 'drebber_surrender',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'drebber',
    text: `[이녹 드레버]:...당신들이 이겼습니다, 탐정님.

[그가 손을 들어 항복합니다]

[이녹 드레버]:20년간... 백작의 재산을 노렸습니다.

[이녹 드레버]:친구라는 가면을 쓰고... 기회를 노렸죠.

[레스트레이드가 수갑을 채웁니다]

[레스트레이드]:이녹 드레버, 체포합니다!

[모로 백작]:드레버... 나는 자네를 친구라고 믿었는데...`,
    choices: [
      { text: '✅ [사건 해결]', nextNode: 'good_ending_drebber' }
    ]
  },

  drebber_captured: {
    id: 'drebber_captured',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[당신은 재빨리 드레버를 제압합니다!]

[이녹 드레버]:크윽...!

[그가 바닥에 쓰러집니다]

[셜록 홈즈]:훌륭합니다, 왓슨!

[레스트레이드가 수갑을 채웁니다]

[레스트레이드]:이녹 드레버, 체포합니다!

[백작이 올라옵니다]

[모로 백작]:탐정님... 왓슨 박사... 감사합니다...`,
    choices: [
      { text: '🏆 [사건 해결]', nextNode: 'good_ending_drebber' }
    ]
  },

  disarm_drebber: {
    id: 'disarm_drebber',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[당신은 재빨리 드레버의 총을 빼앗습니다!]

[총성!]

[하지만 총알은 천장을 맞춥니다]

[이녹 드레버]:이런...!

[홈즈가 그를 제압합니다]

[셜록 홈즈]:드레버, 당신은 체포됩니다!

[동시에 당신은 백작을 치료합니다]

[모로 백작]:으윽... 왓슨 박사...

[조셉 스탬거슨]:백작님... 저는... 이제 자유입니다...`,
    choices: [
      { text: '✅ [모두를 구했다]', nextNode: 'good_ending_drebber' }
    ]
  },

  save_count_ignore_drebber: {
    id: 'save_count_ignore_drebber',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[당신은 드레버를 무시하고 백작을 치료합니다!]

[이녹 드레버]:바보 같은...!

[총성!]

[하지만 홈즈가 드레버를 제압합니다]

[셜록 홈즈]:왓슨! 괜찮습니까?

[왓슨]:네... 백작은...

[모로 백작]:으윽... 살았습니다...

[레스트레이드가 들어옵니다]

[레스트레이드]:드레버를 체포합니다!`,
    choices: [
      { text: '✅ [백작을 구했다]', nextNode: 'good_ending_drebber' }
    ]
  },

  drebber_arrested_watson_wounded: {
    id: 'drebber_arrested_watson_wounded',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'holmes',
    text: `[레스트레이드]:왓슨 박사!

[당신의 어깨에서 피가 흐릅니다]

[셜록 홉즈]:왓슨... 괜찮습니까?

[왓슨]:...백작은?

[홈즈가 웃습니다]

[셜록 홈즈]:살았습니다. 당신 덕분에.

[이녹 드레버]:...모두 끝났군...

[레스트레이드]:드레버, 체포합니다!

[모로 백작이 올라옵니다]

[모로 백작]:왓슨 박사... 목숨을 구해주셨습니다...`,
    choices: [
      { text: '🏥 [병원으로 간다]', nextNode: 'good_ending_watson_hero' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🌟 새로운 굿 엔딩
  // ═══════════════════════════════════════════════════════

  good_ending_hope_innocent: {
    id: 'good_ending_hope_innocent',
    day: 1,
    timeOfDay: 'night',
    speaker: 'watson',
    text: `[레스트레이드가 스탐거슨을 끌고 갑니다]

[제퍼슨 호프]:탐정님... 왓슨 박사... 감사합니다.

[제퍼슨 호프]:저는... 범인이 아니었습니다. 하지만 복수를 꿈꿨던 것은 사실입니다.

[모로 백작]:호프... 자네에게 사과하고 싶네. 유타에서의 일...

[제퍼슨 호프]:백작... 이제... 법이 정의를 실현할 것입니다.

[제퍼슨 호프]:루시도... 이걸 원했을 겁니다.

[그가 루시의 로켓을 꺼내 바라봅니다]

[셜록 홈즈]:호프, 당신은 자유입니다.

[제퍼슨 호프]:자유... 네. 이제야... 진짜 자유를 얻은 것 같습니다.

**🌟 GOOD ENDING: 호프의 무죄**

호프는 무죄로 밝혀졌습니다.
진범 스탐거슨은 체포되었고,
백작은 살아남았습니다.

하지만 20년의 복수심은 
호프의 마음에 영원한 상처를 남겼습니다.

그는 루시의 로켓을 안고
런던의 밤 속으로 사라졌습니다.`,
    isEnding: true,
    endingType: 'good',
    choices: []
  },

  good_ending_watson_hero: {
    id: 'good_ending_watson_hero',
    day: 2,
    timeOfDay: 'morning',
    speaker: 'watson',
    text: `[병원 침대에서 당신이 눈을 뜹니다]

[셜록 홈즈]:왓슨, 깨어났군요.

[왓슨]:홈즈... 백작은...?

[셜록 홈즈]:살았습니다. 당신이 드레버를 막아준 덕분에.

[모로 백작이 들어옵니다]

[모로 백작]:왓슨 박사... 목숨을 구해주셨습니다.

[모로 백작]:당신은 진정한 영웅입니다.

[창문 밖으로 런던의 아침 해가 떠오릅니다]

[셜록 홈즈]:왓슨, 훌륭했습니다.

[왓슨]:...홈즈, 우리가 해냈군요.

**✅ GOOD ENDING: 왓슨의 용기**

당신은 부상을 입었지만
모두를 구했습니다.

드레버는 체포되었고,
백작은 살아남았으며,
스탄거슨은 무죄로 밝혀졌습니다.

런던 타임즈는 당신을 영웅이라 불렀고,
홈즈는 당신을 최고의 파트너라 칭했습니다.`,
    isEnding: true,
    endingType: 'good',
    choices: []
  }
};