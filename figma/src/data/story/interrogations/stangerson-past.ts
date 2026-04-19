/**
 * 스탠거슨 과거 이야기
 * 독일 사건, 협박, 1861년 연결
 */

import { StoryNode } from '../../../types/story';

export const stangersonPastNodes: Record<string, StoryNode> = {
  stangerson_germany_past: {
    id: 'stangerson_germany_past',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"독일에서 무슨 일이 있었습니까? 백작님이 당신을 데려온 이유가 있을 것입니다."

스탠거슨이 고개를 떨구고 침묵합니다.

홈즈가 기다립니다.

긴 침묵.

"사업이었습니다." 작은 목소리로 말합니다.

홈즈가 날카롭게 묻습니다. "어떤 사업입니까?"

스탠거슨이 손을 떱니다.

"그건 말할 수 없습니다."

홈즈가 압박합니다. "백작님이 실종되셨습니다. 진실을 말씀하십시오."

스탠거슨이 고개를 든다. 눈에는 두려움이 가득합니다.

"1861년의 금광 개발 사업이었습니다."

그가 멈춥니다. 더 이상 말하기를 거부하는 듯합니다.`,
    choices: [
      { text: '계속 압박한다', nextNode: 'stangerson_pressure_truth' },
      { text: '백작이 협박했는지 묻는다', nextNode: 'stangerson_blackmail' },
      { text: '나중에 다시 묻는다', nextNode: 'stangerson_hub' }
    ]
  },

  stangerson_pressure_truth: {
    id: 'stangerson_pressure_truth',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `홈즈가 한 걸음 다가섭니다.

"스탠거슨, 진실을 숨기면 당신도 용의자입니다."

스탠거슨이 떨립니다.

"페리에라는 영감님이 유타에 계셨습니다."

그가 숨을 깊이 들이쉽니다.

"백작님이 그분의 금광 투자를 받았습니다. 하지만 사기였죠."

목소리가 낮아집니다.

"우리는 그 돈을 가져갔습니다. 루시라는 그분의 딸이 병으로 죽어가는데도요."

그가 고개를 떨굽니다. 더 이상 말을 잇지 못합니다.`,
    choices: [
      { text: '20년간 양심의 가책은 없었는지 묻는다', nextNode: 'stangerson_conscience' },
      { text: '호프가 이곳에 온 이유를 알았는지 묻는다', nextNode: 'stangerson_knows_hope' },
      { text: '왜 이제서야 진실을 밝히는지 캐묻는다', nextNode: 'stangerson_confession_reason' }
    ]
  },

  stangerson_blackmail: {
    id: 'stangerson_blackmail',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"백작이 당신을 협박했습니까?"

스탠거슨이 고개를 끄덕입니다. 눈물이 맺힙니다.

"20년간 백작님은 저를 묶어두었습니다. '경찰에 신고하면 너도 공범이다. 평생 감옥에 갈 것이다'라고 말씀하셨죠."

그가 주먹을 쥡니다.

"저는 도망칠 수도 없었습니다. 백작님은 모든 증거를 가지고 있었으니까요. 계약서, 편지, 증인들을요."

"하지만 머물렀군." 홈즈가 날카롭게 쳐다본다.

"두려웠습니다. 그리고 저도 그 돈으로 살았습니다." 스태그슨이 얼굴을 가립니다. "피로 얼룩진 돈으로요."

홈즈가 당신을 본다. 이 남자는 피해자인가, 공범인가?`,
    choices: [
      { text: '백작을 죽일 동기가 있었다고 추궁한다', nextNode: 'stangerson_murder_motive' },
      { text: '백작이 사라진 걸 다행이라 생각하는지 묻는다', nextNode: 'stangerson_relief' },
      { text: '진심으로 후회하는지 확인한다', nextNode: 'stangerson_conscience' }
    ]
  },

  stangerson_1861_connection: {
    id: 'stangerson_1861_connection',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"1861년 사건... 당신도 직접 관여했습니까?"

스탠거슨이 바닥을 응시합니다.

"루시가 죽어가는 걸... 제가 봤습니다. 그녀는 침대에 누워 기침을 했고... 창백했고..."

그의 목소리가 떨립니다.

"약혼자가 무릎 꿇고 울고 있었습니다. 제발 살려달라고... 돈을 돌려달라고 애원했죠..."

"백작은 뭐라고 했습니까?"

"백작님이 말했습니다. '치료비는 없다. 페리에의 재산은 이미 우리 것이다. 포기해라.' 저는... 아무 말도 하지 못했습니다."

"왜 막지 않았습니까?" 당신이 묻습니다.

긴 침묵 후, 그가 작은 목소리로 대답합니다.

"저도... 저도 그 돈이 필요했습니다. 백작님의 제안을 거절할 수 없었어요."

그가 무너집니다. "하지만 루시의 얼굴을... 평생 잊을 수 없습니다..."`,
    choices: [
      { text: '그 약혼자가 누구인지 묻는다', nextNode: 'stangerson_reveal_hope' },
      { text: '후회를 행동으로 옮기지 않은 이유를 캐묻는다', nextNode: 'stangerson_inaction' },
      { text: '이제라도 속죄할 기회를 주겠다고 말한다', nextNode: 'stangerson_redemption_offer' }
    ]
  },

  stangerson_knows_hope: {
    id: 'stangerson_knows_hope',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"제퍼슨 호프... 그 남자가 돌아왔다는 걸 알고 있습니까?"

스탠거슨이 고개를 끄덕입니다.

"한 달 전... 백작님이 편지를 받았습니다. 봉투에 미국 우표가 붙어있었죠. 백작님은 편지를 읽고... 얼굴이 새하얘졌습니다."

"내용은?"

"'곧 간다. 20년을 기다렸다. 루시를 위해서.' 그게 전부였습니다. 서명도 없었지만... 백작님은 알았죠. 호프라는 걸."

홈즈가 메모합니다. "그런데도 경찰에 신고하지 않았군요."

"백작님이... 금지하셨습니다. '경찰이 오면 모든 게 밝혀진다. 20년 전 일까지'라고..."

스탠거슨이 당신을 봅니다. "저는 매일 밤 두려웠습니다. 호프가 올까봐... 아니, 진실이 밝혀질까봐..."`,
    choices: [
      { text: '호프를 막을 생각은 없었는지 묻는다', nextNode: 'stangerson_stop_hope' },
      { text: '백작이 사라진 밤에 무엇을 했는지 추궁한다', nextNode: 'stangerson_that_night_action' },
      { text: '지금 어디에 있는지 아는지 캐묻는다', nextNode: 'stangerson_knows_location' }
    ]
  },

  stangerson_no_police: {
    id: 'stangerson_no_police',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"왜 즉시 경찰에 신고하지 않았습니까?"

스탠거슨이 고개를 숙입니다.

"백작님이... 항상 말씀하셨습니다. '경찰이 오면 우리 둘 다 끝이다'라고... 20년 전 일이 밝혀지면..."

"그래서 주인이 납치당하는데도 방관했다는 겁니까?" 홈즈가 차갑게 묻습니다.

"저는... 두려웠습니다..." 스태그슨이 떨립니다. "그리고... 어쩌면..."

그가 말을 멈춥니다.

"어쩌면?" 당신이 묻습니다.

"...어쩌면 이것이 벌이라고 생각했습니다. 백작님이... 저도... 받아야 할..."`,
    choices: [
      { text: '지금이라도 백작을 구할 수 있다고 설득한다', nextNode: 'stangerson_save_count' },
      { text: '복수를 원하는지 추궁한다', nextNode: 'stangerson_murder_motive' },
      { text: '호프의 위치를 아는지 캐묻는다', nextNode: 'stangerson_knows_location' }
    ]
  },

  stangerson_full_confession: {
    id: 'stangerson_full_confession',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `스탠거슨이 의자에 주저앉습니다. 20년의 무게가 그를 짓누릅니다.

"모두 말씀드리겠습니다... 모두..."

그가 떨리는 목소리로 시작합니다.

"1861년, 저는 백작님과 독일에 있었습니다. 우리는 사기꾼이었죠. 페리에 영감을 속여 재산을 빼앗았습니다. 루시가 병들었을 때... 치료비가 충분히 있었지만... 우리는 쓰지 않았습니다."

물 릿니다.

"루시가 죽고 호프가 복수를 맹세했을 때, 우리는 도망쳤습니다. 영국으로... 백작은 귀족 행세를 했고, 저는 집사가 되었죠. 증거를 숨기기 위해서..."

"20년... 매일 밤 악몽을 꿨습니다. 그리고 호프가 왔을 때... 저는 알았습니다. 심판의 날이 온 것을..."`,
    choices: [
      { text: '백작을 구하러 가야 한다고 말한다', nextNode: 'stangerson_save_count' },
      { text: '법의 심판을 받아야 한다고 말한다', nextNode: 'stangerson_arrest' },
      { text: '속죄할 기회를 주겠다고 한다', nextNode: 'stangerson_redemption_offer' }
    ]
  },

  // 추가 노드들
  stangerson_conscience: {
    id: 'stangerson_conscience',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'stangerson',
    text: `"20년간... 단 하루도 평온한 날이 없었습니까?"

스탠거슨이 고개를 숙입니다.

"매일 밤... 루시의 얼굴이 보였습니다. 그녀가 침대에 누워... 기침하며... '왜요?'라고 묻는 모습이..."

그의 손이 떨립니다.

"저는 교회에 갔습니다. 고해성사를 했습니다. 하지만... 신부님은 '피해자에게 직접 용서를 구하라'고 하셨죠. 어떻게... 죽은 사람에게..."

홈즈가 조용히 말합니다. "하지만 백작을 구할 수는 있습니다. 지금."

스탠거슨은 고개를 듭니다. 눈에 희망의 빛이...`,
    choices: [
      { text: '지하실 위치를 알려달라고 한다', nextNode: 'stangerson_basement_hint' },
      { text: '함께 백작을 찾자고 제안한다', nextNode: 'stangerson_join_rescue' },
      { text: '더 자세한 진실을 듣는다', nextNode: 'stangerson_full_confession' }
    ]
  },

  stangerson_confession_reason: {
    id: 'stangerson_confession_reason',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"왜 이제서야 진실을 밝히십니까?"

스탠거슨이 창밖을 봅니다.

"호프가 왔을 때... 저는 깨달았습니다. 도망칠 수 없다는 것을... 20년이 지나도 진실은 따라온다는 것을..."

그가 당신을 봅니다.

"그리고... 어쩌면 이것이 마지막 기회라고 생각했습니다. 옳은 일을 할 수 있는..."

홈즈가 고개를 끄덕입니다. "지금이라도 늦지 않았습니다."`,
    choices: [
      { text: '백작을 구하라고 설득한다', nextNode: 'stangerson_redemption_offer' },
      { text: '호프의 위치를 묻는다', nextNode: 'stangerson_knows_location' },
      { text: '지하실에 대해 묻는다', nextNode: 'stangerson_basement_hint' }
    ]
  },

  stangerson_inaction: {
    id: 'stangerson_inaction',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"후회만 하고 행동하지 않은 이유가 뭡니까?"

스탠거슨이 주먹을 쥡니다.

"두려움... 비겁함... 그리고..." 그가 고개를 떨굽니다. "저도 그 돈으로 살았습니다. 백작님의 집에서, 백작님의 돈으로..."

"공범이었다는 말입니까?" 홈즈가 묻습니다.

"...예." 작은 목소리로 인정합니다. "저는 피해자인 척했지만... 사실은 공범이었습니다."

당신이 말합니다. "하지만 지금은 바꿀 수 있습니다."

스탠거슨이 고개를 듭니다. "정말... 그럴 수 있을까요?"`,
    choices: [
      { text: '속죄의 기회를 주겠다고 한다', nextNode: 'stangerson_redemption_offer' },
      { text: '백작의 위치를 알려달라고 한다', nextNode: 'stangerson_knows_location' },
      { text: '경찰에 자수하라고 권한다', nextNode: 'stangerson_arrest' }
    ]
  },

  stangerson_stop_hope: {
    id: 'stangerson_stop_hope',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"호프를 막을 생각은 없었습니까?"

스탠거슨이 고개를 젓습니다.

"어떻게... 막을 수 있었겠습니까? 그는... 정당한 복수를 하러 온 사람이었습니다."

그의 눈에 눈물이 맺힙니다.

"저는... 호프가 백작님을 죽인다 해도... 어쩌면 그게 는 일이라고... 벌이라고..."

홈즈가 날카롭게 묻습니다. "그렇다면 왜 우리에게 말하는 겁니까?"

"왜냐하면..." 스태그슨이 떨립니다. "백작님이 진짜로 죽으면... 저도 같이 죽는 것 같아서..."`,
    choices: [
      { text: '지금이라도 구할 수 있다고 설득한다', nextNode: 'stangerson_save_count' },
      { text: '호프의 위치를 묻는다', nextNode: 'stangerson_knows_location' },
      { text: '진심으로 후회하는지 확인한다', nextNode: 'stangerson_conscience' }
    ]
  },

  stangerson_that_night_action: {
    id: 'stangerson_that_night_action',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `"백작이 사라진 밤, 정확히 무엇을 했습니까?"

스탠거슨이 기억을 더듬습니다.

"밤 11시... 고함 소리를 들었습니다. 서재로 달려갔지만... 문이 잠겨있었고..."

"그 다음은?"

"저는... 방으로 돌아갔습니다. 문을 잠갔습니다. 다음 아침까지..."

홈즈가 차갑게 묻습니다. "경찰에 신고는?"

"못했습니다. 백작님이 항상 말씀하셨죠. '경찰이 오면 우리 둘 다 끝이다'라고..."

당신이 묻습니다. "아침에는?"

"서재가... 텅 비어있었습니다. 피 자국만... 'RACHE'라는 글자만..."`,
    choices: [
      { text: '왜 즉시 신고하지 않았는지 추궁한다', nextNode: 'stangerson_no_police' },
      { text: '백작이 어디 있는지 아는지 묻는다', nextNode: 'stangerson_knows_location' },
      { text: '부드럽게 접근한다', nextNode: 'stangerson_gentle_approach' }
    ]
  },

  stangerson_relief: {
    id: 'stangerson_relief',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈: "솔직히 말하십시오. 백작이 사라진 것이... 다행이라고 생각하지 않았습니까?"

스탠거슨: "...처음엔... 그렇게 생각했습니다."

스탠거슨: "20년의 감옥이... 드디어 사라진 것 같았습니다. 자유로워진 것 같았죠..."

스탠거슨: "하지만... 밤이 되자... 더 무서워졌습니다. 백작님이 정말 죽었다면... 저도... 살인자가 되는 것 같아서..."

홈즈: "그래서 우리에게 협조하는 겁니까?"`,
    choices: [
      { text: '백작을 찾아야 한다고 설득한다', nextNode: 'stangerson_save_count' },
      { text: '지하실 위치를 묻는다', nextNode: 'stangerson_basement_hint' },
      { text: '진실을 모두 털어놓게 한다', nextNode: 'stangerson_full_confession' }
    ]
  },

  stangerson_save_count: {
    id: 'stangerson_save_count',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"지금이라도 백작을 구할 수 있습니다!"

당신이 스태그슨의 어깨를 잡습니다.

"20년의 죄를... 지금 바로잡을 수 있습니다. 백작이 어디 있는지 알려주십시오!"

스탠거슨이 고개를 듭니다. 눈에 결의가 서립니다.

"...지하실입니다." 그가 말합니다. "백작님의 속죄의 방... 호프가 그곳에 있을 겁니다."

홈즈가 일어섭니다. "안내해주십시오. 지금 당장!"`,
    choices: [
      { text: '스탠거슨과 함께 지하실로 향한다', nextNode: 'stangerson_join_rescue' },
      { text: '지하실 위치만 듣고 혼자 간다', nextNode: 'stangerson_basement_hint' }
    ]
  },

  stangerson_arrest: {
    id: 'stangerson_arrest',
    day: 1,
    timeOfDay: 'afternoon',
    text: `홈즈가 단호한 표정으로 말합니다.

홈즈: "당신은 법의 심판을 받아야 합니다."

스탠거슨이 고개를 끄덕입니다.

스탠거슨: "...알고 있습니다. 20년간... 도망쳤지만..."

당신이 말을 습니다.

왓슨: "하지만 그 전에, 백작을 구해야 합니다."

스탠거슨이 당신을 봅니다.

스탠거슨: "제가... 도울 수 있다면... 마지막으로 옳은 일을 할 수 있다면..."

홈즈가 고개를 끄덕입니다.

홈즈: "지하실로 안내하십시오. 그 후에 당신의 운명은..."`,
    choices: [
      { text: '스탠거슨과 함께 지하실로 간다', nextNode: 'stangerson_join_rescue' },
      { text: '경찰을 먼저 부른다', nextNode: 'call_police_early' }
    ]
  }
};