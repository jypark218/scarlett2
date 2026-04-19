// 용의자들의 배경 서사 강화
// 스탐거슨의 과거, 동기, 1861년 사건과의 연결고리

import { StoryNode } from '../../types/story';

export const suspectsBackstory: Record<string, StoryNode> = {
  
  // ========== 스탐거슨 심화 서사 ==========
  
  stangerson_relationship: {
    id: 'stangerson_relationship',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `[왓슨]: "백작과는 어떤 관계였습니까?"

당신이 묻자 스탐거슨의 얼굴이 일그러진다.

[조셉 스탬거슨]: "관계라고요...? 주인과 집사... 아니, 감시자와 죄수의 관계였습니다."

[셜록 홈즈]: "자세히 말씀해주시겠습니까?"

[조셉 스탬거슨]: "1861년... 저는 어리석었습니다. 백작의 계획에 동참했죠. 페리에 영감의 재산을... 그 가족의 행복을..."

그가 떨리는 손으로 얼굴을 감싼다.

[조셉 스탬거슨]: "그 후 20년... 백작은 저를 집사로 고용했습니다. 아니, 감금했습니다. 제가 도망치면 경찰에 신고하겠다고 협박하며... 저는 자유가 없었습니다."`,
    choices: [
      { text: '1861년 사건에 대해 더 캐묻는다', nextNode: 'stangerson_1861_event' },
      { text: '20년간 도망칠 기회는 없었는지 묻는다', nextNode: 'stangerson_escape_chance' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_1861_event: {
    id: 'stangerson_1861_event',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `[왓슨]: "1861년 사건... 정확히 무슨 일이 있었습니까?"

스탠거슨이 깊은 한숨을 쉰다.

[조셉 스탬거슨]: "그것은... 말하기 어렵습니다..."

그의 손이 심하게 떨린다.

[조셉 스탬거슨]: "백작은... '영적 깨달음의 교단'이라는 집단의 설교자였습니다."

홈즈가 메모한다.

[셜록 홈즈]: "교단? 종교 단체였습니까?"

[조셉 스탬거슨]: "표면적으로는... 그렇습니다. 하지만 실제로는..."

그가 눈을 감는다.

[조셉 스탬거슨]: "금광 투자를 '신의 계시'라고 포장한... 사기 집단이었습니다."

[왓슨]: "페리에 영감이 피해자였군요."

[조셉 스탬거슨]: "네... 페리에 영감은 신실한 사람이었습니다. 백작을 믿었죠. 그리고... 모든 재산을 잃었습니다."`,
    choices: [
      { text: '백작의 신비주의에 대해 더 묻는다', nextNode: 'stangerson_count_mysticism' },
      { text: '루시는 어떻게 되었는지 묻는다', nextNode: 'stangerson_lucy_fate' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_count_mysticism: {
    id: 'stangerson_count_mysticism',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'holmes',
    text: `[셜록 홈즈]: "백작의 신비주의... 진심이었습니까, 아니면 사기 수단이었습니까?"

스탠거슨이 잠시 생각한다.

[조셉 스탬거슨]: "처음에는... 사기였습니다. 사람들을 속이는 도구였죠."

[조셉 스탬거슨]: "하지만 루시가... 죽은 후..."

그가 말을 멈춘다.

[왓슨]: "어떻게요?"

[조셉 스탬거슨]: "백작은 변했습니다. 진짜로... 광신에 빠져들었습니다."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "지하실 제단이 그와 관련이 있습니까?"

스탠거슨이 고개를 끄덕인다.

[조셉 스탬거슨]: "네... 백작은 매일 밤 지하실에 내려가 참회 의식을 했습니다."

[조셉 스탬거슨]: "루시의 영혼을 위로하기 위해서... 아니, 자신의 죄를 씻기 위해서..."

[조셉 스탬거슨]: "20년간... 단 하루도 빠지지 않고..."`,
    choices: [
      { text: '의식의 내용을 묻는다', nextNode: 'stangerson_ritual_details' },
      { text: '루시에 대해 묻는다', nextNode: 'stangerson_lucy_fate' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_ritual_details: {
    id: 'stangerson_ritual_details',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `"어떤 의식이었습니까?"

스탠거슨이 불편한 표정을 짓는다.

[조셉 스탬거슨]: "저도... 자세히는 모릅니다. 백작만 내려갔으니까요."

[조셉 스탬거슨]: "하지만 이상한 소리가 들렸습니다. 기도 같기도 하고... 노래 같기도 하고..."

[셜록 홈즈]: "제단에는 무엇이 있습니까?"

[조셉 스탬거슨]: "...루시의 초상화와 로켓이 있었습니다. 백작이 루시 영감님 집에서 가져온..."

그가 고개를 숙인다.

[조셉 스탬거슨]: "백작은 그걸 보며 기도했습니다. '루시여, 용서하소서...' 하고..."

[왓슨]: "20년간 계속?"

[조셉 스탬거슨]: "네... 백작의 삶 전체가... 속죄였습니다."`,
    choices: [
      { text: '엘렌도 그 의식과 관련이 있는지 묻는다', nextNode: 'stangerson_ellen_ritual' },
      { text: '백작이 협박한 증거가 있는지 묻는다', nextNode: 'stangerson_evidence' },
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'stangerson_knows_hope' }
    ]
  },

  stangerson_ellen_ritual: {
    id: 'stangerson_ellen_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `"엘렌... 백작의 양딸도 그 의식과 관련이 있습니까?"

스탠거슨이 놀란 표정을 짓는다.

[조셉 스탬거슨]: "...어떻게 엘렌을 아십니까?"

[왓슨]: "우리가 만났습니다. 계속 말씀해주십시오."

스탠거슨이 한숨을 쉰다.

[조셉 스탬거슨]: "백작은... 엘렌을 특별하게 여겼습니다. '루시의 혼이 깃든 아이'라고..."

[셜록 홈즈]: "루시의 환생이라고 믿었습니까?"

[조셉 스탬거슨]: "...네. 백작은 엘렌이 태어났을 때 '신의 선물'이라고 했습니다."

[조셉 스탬거슨]: "그래서 20년간 숨겨 키운 겁니다. 엘렌을 지키는 것이... 백작에게는 루시를 다시 지키는 것과 같았으니까요."

당신은 숨이 멎는다.

이것이... 백작의 광기이자 속죄였구나.`,
    choices: [
      { text: '백작이 협박한 증거가 있는지 묻는다', nextNode: 'stangerson_evidence' },
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'stangerson_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_lucy_fate: {
    id: 'stangerson_lucy_fate',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `\"루시는... 어떻게 되었습니까?\"

스탠거슨의 얼굴이 창백해진다.

[조셉 스탬거슨]: \"루시는... 교단의 진실을 알아챘습니다. 백작의 '영적 깨달음'이 사기라는 걸...\"

[조셉 스탬거슨]: \"그리고 백작이... 그녀를 '영원한 신부 의식'에 선택했을 때...\"

그가 말을 멈춘다.

[왓슨]: \"계속하십시오.\"

[조셉 스탬거슨]: \"루시는 거부했습니다. 당연히... 호프와 약혼한 사이였으니까요.\"

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: \"그래서 백작은?\"

스탠거슨이 눈을 감는다.

[조셉 스탬거슨]: \"교단이 페리에 일가를 '악령에 씌었다'고 규정했습니다...\"

[조셉 스탬거슨]: \"1861년 11월 20일... 루시가 딸을 낳았습니다. 엘렌이라는...\"

[조셉 스탬거슨]: \"호프와 루시는 아기를 데리고 도망쳤습니다. 하지만 며칠 뒤...\"

그의 손이 심하게 떨린다.

[조셉 스탬거슨]: \"11월 25일... 백작이 루시를 찾아냈습니다. '구마 의식'이라며...\"

[조셉 스탬거슨]: \"저는... 저는 의사였습니다... 의료 대기를 했지만...\"

[조셉 스탬거슨]: \"'위험합니다, 출산한 지 닷새밖에 안 됐습니다'라고 말했지만...\"

[조셉 스탬거슨]: \"백작은... 듣지 않았습니다. 악령을 쫓아낸다며...\"

그가 눈물을 흘린다.

[조셉 스탬거슨]: \"다음날 새벽... 호프가 제단에서 루시를 발견했을 때...\"

[조셉 스탬거슨]: \"의식은 끝난 후였고... 루시는... 이미...\"

[조셉 스탬거슨]: \"저는 악마였습니다. 그 대가로 20년을 지옥에서 살았습니다.\"`,
    choices: [
      { text: '백작이 협박한 증거가 있는지 묻는다', nextNode: 'stangerson_evidence' },
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'stangerson_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_escape_chance: {
    id: 'stangerson_escape_chance',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `[왓슨]: "20년이나 되었는데... 도망칠 기회는 없었습니까?"

스탠거슨이 고개를 젓는다.

[조셉 스탬거슨]: "기회는... 수없이 있었습니다. 하지만..."

[셜록 홈즈]: "하지만?"

[조셉 스탬거슨]: "백작은 제 가족을 알고 있었습니다. 고향의 어머니와 누이를... 만약 제가 도망치면 그들이..."

그가 떨리는 목소리로 말한다.

[조셉 스탬거슨]: "게다가... 저도 공범입니다. 경찰에 자수하면 저 역시 처벌받을 것이고... 저는 그저... 버티는 수밖에 없었습니다."

홈즈가 메모를 적는다.`,
    choices: [
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'stangerson_knows_hope' },
      { text: '사건 당일 행적을 묻는다', nextNode: 'stangerson_alibi_detail' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_evidence: {
    id: 'stangerson_evidence',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'holmes',
    text: `[셜록 홈즈]: "백작이 당신을 협박했다는 증거가 있습니까?"

스탠거슨이 잠시 망설이다가 말한다.

[조셉 스탬거슨]: "...장부가 있습니다. 서재 금고 안에."

[셜록 홈즈]: "장부?"

[조셉 스탬거슨]: "1861년부터의 모든 거래 기록... 백작의 명령서, 협박 편지... 백작은 증거를 남기는 버릇이 있었습니다. 자신의 권력을 과시하려는..."

[왓슨]: "그 장부에 당신의 무죄를 증명할 내용이 있습니까?"

스탠거슨이 쓴웃음을 짓는다.

[조셉 스탬거슨]: "무죄...? 아니요. 저는 공범입니다. 하지만... 백작이 주도했다는 건 증명할 수 있습니다."`,
    choices: [
      { text: '금고를 열어보겠다고 말한다', nextNode: 'promise_check_safe' },
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'stangerson_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  promise_check_safe: {
    id: 'promise_check_safe',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `"금고를 열어 확인해보겠습니다."

스탠거슨이 고개를 끄덕인다.

[조셉 스탬거슨]: "...감사합니다. 진실이... 밝혀지길 바랍니다."

[셜록 홈즈]: "금고 조합은 아십니까?"

[조셉 스탬거슨]: "아닙니다... 백작만이 알고 있었죠. 하지만 서재 어딘가에 메모가 있을 겁니다. 백작은 기억력을 믿지 못했으니까요."

[셜록 홈즈]: "왓슨, 서재를 철저히 수색해야겠습니다."`,
    choices: [
      { text: '🔍 서재를 조사한다', nextNode: 'study' },
      { text: '제퍼슨 호프에 대해서도 묻는다', nextNode: 'stangerson_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_motive: {
    id: 'stangerson_motive',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `[왓슨]: "백작이 사라진 날... 당신의 첫 반응은 무엇이었습니까?"

스탠거슨이 잠시 생각한다.

[조셉 스탬거슨]: "...안도였습니다."

[셜록 홈즈]: "거짓말하지 않겠습니다. 백작이 사라졌다는 소식을 들었을 때... 처음엔 안도했습니다. 20년간의 지옥이 끝났다고..."

그가 떨리는 손으로 얼굴을 감싼다.

[조셉 스탬거슨]: "하지만 곧... 두려움이 밀려왔습니다. 만약 백작이 죽었다면... 저도 용의자가 될 것이고, 진실이 밝혀지면... 저 역시 공범으로..."

[셜록 홈즈]: "그래서 적극적으로 수사에 협조하지 않았군요."

[조셉 스탬거슨]: "...네. 비겁했습니다."`,
    choices: [
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'stangerson_knows_hope' },
      { text: '사건 당일 행적을 다시 묻는다', nextNode: 'stangerson_alibi_detail' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_knows_hope: {
    id: 'stangerson_knows_hope',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `[왓슨]: "제퍼슨 호프를 알고 계십니까?"

스탠거슨의 얼굴이 창백해진다.

[조셉 스탬거슨]: "호프... 그 이름을 들으니... 아, 신이시여."

[셜록 홈즈]: "그를 아는군요."

[조셉 스탬거슨]: "3개월 전... 저택에 새 마차꾼이 왔습니다. 처음엔 몰랐죠. 20년이 지났으니까... 하지만 그의 눈빛을... 저는 알아봤습니다."

[조셉 스탬거슨]: "루시의 무덤 앞에서 울던 그 청년의 눈빛을... 이제는 복수심으로 불타고 있었습니다."

[셜록 홈즈]: "그에게 말을 걸었습니까?"

[조셉 스탬거슨]: "아니요... 저는 겁이 났습니다. 그가 저도... 복수의 대상으로 생각할까 봐..."`,
    choices: [
      { text: '호프가 백작을 어떻게 생각하는지 묻는다', nextNode: 'stangerson_hope_theory' },
      { text: '왜 경찰에 신고하지 않았는지 묻는다', nextNode: 'stangerson_why_not_police' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_hope_theory: {
    id: 'stangerson_hope_theory',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `\"호프는 백작에 대해... 어떤 감정을 가지고 있는 것 같습니까?\"

스탠거슨이 고개를 숙인다.

[조셉 스탬거슨]: \"...증오. 깊은 증오입니다. 그에게는 충분한 이유가 있으니까요.\"`,
    choices: [
      { text: '호프가 어디 있을지 아는지 묻는다', nextNode: 'stangerson_hope_location' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_hope_location: {
    id: 'stangerson_hope_location',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `"호프가 어디 있을지 아십니까? 백작을 어디로 데려갔을까요?"

스탠거슨이 생각에 잠긴다.

[조셉 스탬거슨]: "저택에는... 지하실이 있습니다. 백작이 의식을 치르던 곳이죠."

[셜록 홈즈]: "의식?"

[조셉 스탬거슨]: "백작은... 이상한 종교 의식에 심취해 있었습니다. 지하실에 제단을 만들어뒀더군요. 하지만... 호프가 거기 있을지는 모르겠습니다."

[왓슨]: "왜 그렇게 생각하십니까?"

스탠거슨이 불안한 표정을 짓는다.

[조셉 스탬거슨]: "...며칠 전부터 지하실 쪽에서 이상한 소리가 들렸습니다. 백작도 그곳에 자주 내려갔고요."

[셜록 홈즈]: "지하실로 가는 입구는?"

[조셉 스탬거슨]: "두 곳이 있습니다. 하나는 부엌 바닥에 숨겨져 있고, 다른 하나는... 뒷뜰 우물을 통해서도 갈 수 있습니다."

[왓슨]: "우물로?"

[조셉 스탬거슨]: "네. 백작은 가끔 우물로 내려가곤 했습니다. 저도 정확히는 모르지만... 지하 터널이 연결되어 있다고 들었습니다."

[조셉 스탬거슨]: "하지만 두 입구 모두 열쇠가 필요합니다. 백작만 갖고 있었죠... 아, 금고! 서재 금고에 예비 열쇠가 있을 겁니다!"

[셜록 홈즈]: "왓슨, 조사가 필요할 것 같습니다."`,
    choices: [
      { text: '🔍 서재로 가서 금고를 연다', nextNode: 'safe' },
      { text: '다른 용의자도 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_why_not_police: {
    id: 'stangerson_why_not_police',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `"왜 경찰에 신고하지 않았습니까? 호프가 위험한 사람일 수도 있는데..."

스탠거슨이 쓴웃음을 짓는다.

[조셉 스탬거슨]: "신고요? 탐정님, 제가 경찰에 뭐라고 말하겠습니까? '20년 전 제가 백작과 함께 그 남자의 인생을 파괴했고, 이제 그가 복수하러 온 것 같습니다'라고요?"

[조셉 스탬거슨]: "제가 신고하는 순간, 저도 체포될 겁니다. 1861년 사건의 공범으로..."

[셜록 홈즈]: "그래서 침묵을 선택했군요."

[조셉 스탬거슨]: "네... 비겁하게도..."`,
    choices: [
      { text: '호프의 위치를 아는지 묻는다', nextNode: 'stangerson_hope_location' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_alibi_detail: {
    id: 'stangerson_alibi_detail',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    speaker: 'watson',
    text: `"사건 당일 밤, 정확히 어디서 무엇을 하고 계셨습니까?"

[조셉 스탬거슨]: "서재에서... 장부를 정리하고 있었습니다. 백작님이 실종되기 전날 밤이었죠."

[셜록 홈즈]: "목격자는?"

[조셉 스탬거슨]: "없습니다... 저는 혼자였습니다."

[셜록 홈즈]: "그날 밤 이상한 소리를 들었습니까?"

[조셉 스탬거슨]: "...말소리가 들렸습니다. 백작님과... 다른 누군가. 그리고 지하로 내려가는 발소리..."

[셜록 홈즈]: "왜 확인하러 가지 않았습니까?"

[조셉 스탬거슨]: "...두려웠습니다. 그리고... 어쩌면 모르는 척 하고 싶었을지도..."`,
    choices: [
      { text: '지하실에 대해 묻는다', nextNode: 'stangerson_hope_location' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  stangerson_alibi_check: {
    id: 'stangerson_alibi_check',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    text: `\"사건 당일 밤, 정확히 어디서 무엇을 하고 계셨습니까?\"\n\n[조셉 스탬거슨]: \"서재에서... 장부를 정리하고 있었습니다. 백작님이 실종되기 전날 밤이었죠.\"

[셜록 홈즈]: \"목격자는?\"

[조셉 스탬거슨]: \"없습니다... 저는 혼자였습니다.\"

[셜록 홈즈]: \"그날 밤 이상한 소리를 들었습니까?\"

[조셉 스탬거슨]: \"...말소리가 들렸습니다. 백작님과... 다른 누군가. 그리고 지하로 내려가는 발소리...\"

[셜록 홈즈]: \"왜 확인하러 가지 않았습니까?\"

[조셉 스탬거슨]: \"...두려웠습니다. 그리고... 어쩌면 모르는 척 하고 싶었을지도...\"`,
    choices: [
      { text: '지하실에 대해 묻는다', nextNode: 'stangerson_hope_location' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  // ========== 드레버 심화 서사 ==========

  drebber_relationship: {
    id: 'drebber_relationship',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `[왓슨]: "백작과는 정확히 언제부터 알고 지냈습니까?"

드레버가 담배를 한 모금 빨고 대답한다.

[이노크 드레버]: "1878년... 아니, 정확히는 그보다 훨씬 전부터였소."

[셜록 홈즈]: "훨씬 전이라면?"

드레버가 잠시 망설인다.

[이노크 드레버]: "...1861년입니다. 유타주에서... 저도 그곳에 있었소."

홈즈의 눈빛이 날카로워진다.

[셜록 홈즈]: "페리에 영감 사건과 관련이 있습니까?"

드레버가 고개를 숙인다.

[이노크 드레버]: "...저는 백작의 하수인이었습니다. 페리에 영감을 압박하는 일을... 그리고 루시가 죽었을 때... 저는 아무것도 하지 못했소."`,
    choices: [
      { text: '1861년 사건에서 당신 역할을 추궁한다', nextNode: 'drebber_1861_role' },
      { text: '루시의 죽음에 대해 더 묻는다', nextNode: 'drebber_lucy_death' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_1861_role: {
    id: 'drebber_1861_role',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `[왓슨]: "1861년 사건에서 당신은 정확히 무엇을 했습니까?"

드레버가 떨리는 손으로 담배를 꺼낸다.

[이노크 드레버]: "저는... 페리에 영감의 사업 파트너를 협박했습니다. 백작의 명령으로... 그들이 계약을 파기하도록..."

[셜록 홈즈]: "금광 개발권을 가로채기 위해서."

[이노크 드레버]: "네... 백작은 스탐거슨을 시켜 서류를 위조했고, 저는 사람들을 협박했습니다. 그리고..."

그가 고개를 떨군다.

[이노크 드레버]: "페리에 영감은 파산했고, 루시는... 병을 치료할 돈이 없어서... 제가 죽인 겁니다. 제 손에 피가..."

[셜록 홈즈]: "왜 20년이 지난 지금까지 백작과 함께 있었습니까?"

[이노크 드레버]: "...협박당했습니다. 백작은 증거를 갖고 있었고, 제가 배신하면 경찰에 넘기겠다고..."`,
    choices: [
      { text: '백작의 협박 증거에 대해 묻는다', nextNode: 'drebber_blackmail_evidence' },
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'drebber_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_lucy_death: {
    id: 'drebber_lucy_death',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `[왓슨]: "루시가 죽었을 때... 당신은 무엇을 했습니까?"

드레버의 얼굴이 굳어진다.

[이노크 드레버]: "...그건 내 책임이 아니었소. 백작과 스탐거슨이... 그 둘이 의식을 강행한 거요."

[셜록 홈즈]: "도망쳤군요."

드레버가 짜증스럽게 담배를 비벼 끈다.

[이노크 드레버]: "제퍼슨 호프가 미친 듯이 달려들었소! 나라고 그 앞을 막을 수 있었겠소?"

그가 방어적인 태도로 덧붙인다.

[이노크 드레버]: "루시가 죽은 후... 호프가 복수를 맹세했다는 소문을 들었습니다. 하지만 주범은 백작이었으니... 내가 타겟은 아닐 거라 생각했소."

[왓슨]: "그래서 도망쳤습니까?"

[이노크 드레버]: "피신한 거요. 영국으로 왔지. 하지만 백작도 따라왔고... 그 작자가 날 찾아냈소. 그리고... 협박이 시작됐습니다."`,
    choices: [
      { text: '호프가 당신을 찾을 수도...', nextNode: 'drebber_hope_threat' },
      { text: '백작의 협박 내용을 자세히 묻는다', nextNode: 'drebber_blackmail_evidence' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_hope_threat: {
    id: 'drebber_hope_threat',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'holmes',
    text: `[셜록 홈즈]: "호프가 당신도 찾아올 수 있다는 생각은 안 하셨습니까?"

드레버가 불편한 표정으로 담배를 입에 문다.

[이노크 드레버]: "당연히 생각했소. 하지만 주범은 백작이었으니... 호프가 백작만 노린다면..."

[셜록 홈즈]: "당신은 안전하다고 생각했군요."

드레버가 짜증스럽게 대답한다.

[이노크 드레버]: "그렇게 믿고 싶었소. 뭐 어쩌겠소? 평생 숨어 살 수도 없는 노릇 아니오?"

[왓슨]: "그런데 왜 이번에 저택에 오셨습니까? 위험하지 않았습니까?"

드레버가 주머니에서 편지를 꺼낸다. 손이 약간 떨린다.

[이노크 드레버]: "...이걸 받았소. 백작으로부터."

홈즈가 편지를 받아든다. '마지막 기회다. 오지 않으면 모든 증거를 경찰에 넘긴다.'

[셜록 홈즈]: "협박 편지로군요."

[이노크 드레버]: "뭐, 선택의 여지가 없었다고나 할까요. 그 작자가 증거를 경찰에 넘기면... 난 끝이오."`,
    choices: [
      { text: '백작이 요구한 것이 무엇인지 묻는다', nextNode: 'drebber_count_demand' },
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'drebber_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_count_demand: {
    id: 'drebber_count_demand',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `"백작이 당신에게 무엇을 요구했습니까?"

드레버가 씁쓸하게 웃는다.

[이노크 드레버]: "돈이었소. 5만 파운드... 제가 가진 모든 것을."

[셜록 홈즈]: "투자 손실을 메우기 위해?"

[이노크 드레버]: "아닙니다. 백작은... '침묵의 대가'라고 했습니다. 제가 돈을 주면 과거 증거를 태워주겠다고..."

[왓슨]: "하지만 믿지 않으셨겠군요."

드레버가 고개를 끄덕인다.

[이노크 드레버]: "백작은 절대 증거를 파기하지 않을 사람입니다. 저는... 평생 협박당할 운명이었소."

[셜록 홈즈]: "그래서 백작이 사라졌을 때..."

[이노크 드레버]: "...안도했습니다. 부끄럽지만 솔직히 말하면... 백작이 죽었다면... 저는 자유로워지는 겁니다."`,
    choices: [
      { text: '백작을 죽일 동기가 충분하다고 지적한다', nextNode: 'drebber_motive_accusation' },
      { text: '제퍼슨 호프에 대해 묻는다', nextNode: 'drebber_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_motive_accusation: {
    id: 'drebber_motive_accusation',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'holmes',
    text: `홈즈가 날카롭게 말한다.

[셜록 홈즈]: "당신에게는 충분한 동기가 있습니다. 20년간의 협박, 5만 파운드의 갈취... 백작이 사라지면 모든 게 해결되죠."

드레버가 화들짝 놀란다.

[이노크 드레버]: "아니오! 저는 안 했습니다! 그날 밤 저는 여관에 있었소!"

[왓슨]: "증명할 수 있습니까?"

[이노크 드레버]: "여관 주인이 증인입니다! 저는 밤새 방에 있었고... 나가지 않았소!"

홈즈가 의심스럽게 바라본다.

[셜록 홈즈]: "하지만 백작이 죽으면 당신이 가장 이득을 보는 사람입니다."

[이노크 드레버]: "...그렇습니다. 하지만 저는 안 했습니다. 제발... 믿어주십시오..."

그의 눈빛이 진실된 것 같기도, 거짓말 같기도 하다.`,
    choices: [
      { text: '여관 주인에게 확인하겠다고 말한다', nextNode: 'drebber_alibi_promise' },
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'drebber_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_alibi_promise: {
    id: 'drebber_alibi_promise',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `"여관 주인에게 확인해보겠습니다."

드레버가 안도한 표정을 짓는다.

[이노크 드레버]: "감사합니다... 제발 확인해주십시오. 저는 정말 아무것도 하지 않았소."

[셜록 홈즈]: "하지만 한 가지는 확실합니다. 당신도 이 사건과 깊이 연루되어 있다는 것."

드레버가 고개를 숙인다.

[이노크 드레버]: "...그건 부인할 수 없습니다. 20년 전의 죄가... 이제야 돌아온 것인지도 모르죠."`,
    choices: [
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'drebber_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_blackmail_evidence: {
    id: 'drebber_blackmail_evidence',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `[왓슨]: "백작이 갖고 있던 증거... 정확히 무엇이었습니까?"

드레버가 떨리는 목소리로 답한다.

[이노크 드레버]: "...편지들입니다. 제가 페리에 영감의 파트너들을 협박할 때 보낸... 그리고 백작과 주고받은 서신..."

[셜록 홈즈]: "그 증거가 지금 어디 있습니까?"

[이노크 드레버]: "백작의 금고에... 서재 금고에 보관되어 있을 겁니다."

홈즈가 메모한다.

[셜록 홈즈]: "흥미롭군요. 스탐거슨도 같은 말을 했습니다."

드레버가 놀란다.

[이노크 드레버]: "스탠거슨도...? 그럼 그도 같은 처지였군요..."

[왓슨]: "백작은 당신 둘을 모두 협박했던 겁니까?"

[이노크 드레버]: "...런 것 같습니다. 우리는 백작의 꼭두각시였소."`,
    choices: [
      { text: '금고를 확인하겠다고 말한다', nextNode: 'drebber_safe_promise' },
      { text: '제퍼슨 호프를 아는지 묻는다', nextNode: 'drebber_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_safe_promise: {
    id: 'drebber_safe_promise',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'holmes',
    text: `[셜록 홈즈]: "금고를 열어 확인해보겠습니다."

드레버가 조심스럽게 묻는다.

[이노크 드레버]: "만약... 증거를 찾으시면... 어떻게 하실 겁니까?"

[셜록 홈즈]: "그건 증거의 내용에 달려있습니다."

[이노크 드레버]: "...저는 도망칠 수 없겠군요."

[왓슨]: "진실을 밝히는 게 최선입니다."

드레버가 쓴웃음을 짓는다.

[이노크 드레버]: "진실... 20년 전에 진실을 말했어야 했는데..."`,
    choices: [
      { text: '🔍 서재로 가서 금고를 연다', nextNode: 'safe' },
      { text: '제퍼슨 호프에 대해서도 묻는다', nextNode: 'drebber_knows_hope' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_knows_hope: {
    id: 'drebber_knows_hope',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `[왓슨]: "제퍼슨 호프를 알고 계십니까?"

드레버의 얼굴이 새하얗게 질린다.

[이노크 드레버]: "호프... 그 이름을..."

[셜록 홈즈]: "알고 계시는군요."

[이노크 드레버]: "루시의... 약혼자였습니다. 20년 전... 그가 루시의 무덤 앞에서 복수를 맹세하는 걸 봤습니다."

그가 떨린다.

[이노크 드레버]: "그날... 그의 눈빛을 잊을 수가 없습니다. 증오와... 결의로 가득 찬..."

[왓슨]: "그 후로 호프를 본 적이 있습니까?"

드레버가 고개를 젓는다.

[이노크 드레버]: "아니오... 하지만 늘 두려웠습니다. 언젠가 그가 나타날 거라는 걸... 그리고..."

그가 떨리는 목소리로 말한다.

[이노크 드레버]: "이번에... 이번에 그가 왔다면... 저도 표적일 겁니다. 백작만이 아니라..."`,
    choices: [
      { text: '호프가 어디 있을지 아는지 묻는다', nextNode: 'drebber_hope_location' },
      { text: '호프의 복수 계획을 막으려 했는지 묻는다', nextNode: 'drebber_hope_prevention' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_hope_location: {
    id: 'drebber_hope_location',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'watson',
    text: `"호프가 어디 있을지 아십니까?"

드레버가 생각에 잠긴다.

[이노크 드레버]: "...여관에서 한 번 봤습니다. 3개월 전쯤... 저택 근처를 배회하고 있었어요."

[셜록 홈즈]: "말을 걸었습니까?"

[이노크 드레버]: "아니오... 겁이 났습니다. 그는 저를 보고도... 무표정했어요. 하지만 그 눈빛은..."

그가 떨린다.

[이노크 드레버]: "...죽이겠다는 눈빛이었습니다."

[왓슨]: "그런데 왜 경찰에 신고하지 않았습니까?"

드레버가 쓴웃음을 짓는다.

[이노크 드레버]: "신고요? '20년 전 제가 그의 약혼녀를 죽였으니 체포해달라'고 말하란 겁니까?"

[셜록 홈즈]: "침묵을 선택했군요."

[이노크 드레버]: "...비겁하게도, 그렇습니다."`,
    choices: [
      { text: '지하실에 대해 아는지 묻는다', nextNode: 'drebber_basement_knowledge' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_hope_prevention: {
    id: 'drebber_hope_prevention',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    speaker: 'holmes',
    text: `[셜록 홈즈]: "호프의 복수를 막으려는 시도는 안 했습니까?"

드레버가 고개를 젓는다.

[이노크 드레버]: "...어떻게 막습니까? 그에게는 복수할 권리가 있습니다."

[왓슨]: "하지만 당신도 위험하지 않습니까?"

[이노크 드레버]: "그습니다... 하지만 저는... 어쩌면 죗값을 치러야 할 때가 온 걸지도 모릅니다."

홈즈가 예리하게 쳐다본다.

[셜록 홈즈]: "スポ츠값을 치를 각오가 되어있다는 말입니까?"

드레버가 담배를 한 모금 빨고 답한다.

[이노크 드레버]: "20년간... 악몽을 꿨습니다. 루시가 죽어가는 모습을... 호프가 울부짖는 소리를... 어쩌면 죽는 것이... 더 편할지도 모릅니다."

그의 눈빛에 깊은 절망이 서려있다.`,
    choices: [
      { text: '지하실에 대해 아는지 묻는다', nextNode: 'drebber_basement_knowledge' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_1' }
    ]
  },

  drebber_basement_knowledge: {
    id: 'drebber_basement_knowledge',
    day: 1,
    timeOfDay: 'evening',
    location: 'upstairs', // 2층에서 대화 중
    character: 'drebber',
    speaker: 'watson',
    text: `[왓슨]: "이 저택에 지하실이 있다는 걸 아십니까?"

드레버가 고개를 끄덕인다.

[이노크 드레버]: "...네. 백작이 의식을 치르던 곳이죠. 저도 몇 번 내려가 본 적이 있습니다."

[셜록 홈즈]: "어떤 의식입니까?"

[이노크 드레버]: "...모르겠습니다. 백작은 이상한 종교에 심취해 있었고... 지하실에 제단을 만들어뒀더군요."

홈즈가 날카롭게 묻는다.

[셜록 홈즈]: "며칠 전부터 지하실 쪽에서 이상한 소리가 들렸다는 보고가 있습니다. 당신도 들었습니까?"

드레버가 떨린다.

[이노크 드레버]: "...그날 밤... 말소리가 들렸습니다. 백작님과... 다른 누군가. 저는... 확인하러 가지 못했습니다."

[왓슨]: "왜 확인하지 않으셨습니까?"

[이노크 드레버]: "...두려웠습니다. 혹시 호프일까 봐..."

[셜록 홈즈]: "지하실로 가는 입구는?"

[이노크 드레버]: "두 곳 있소. 부엌 바닥에 하나... 그리고 뒷뜰 우물로도 내려갈 수 있다고 들었소."

[왓슨]: "우물로요?"

드레버가 고개를 끄덕인다.

[이노크 드레버]: "백작이 가끔 우물로 내려갔다더군요. 지하 터널이 연결되어 있다고... 정확히는 모르겠지만."

[셜록 홈즈]: "열쇠는?"

[이노크 드레버]: "백작만 갖고 있었소. 하지만 서재 금고에 예비 열쇠가 있을 거요."

홈즈가 메모한다.

[셜록 홈즈]: "왓슨, 조사가 필요할 것 같습니다."`,
    choices: [
      { text: '🔍 서재로 가서 금고를 확인한다', nextNode: 'study_general_investigation' },
      { text: '드레버에게 더 물어본다', nextNode: 'meet_drebber' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_2' }
    ]
  }
};