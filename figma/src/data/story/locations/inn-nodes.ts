/**
 * 🏨 여관 (The Inn)
 * 드레버가 묵었다고 주장하는 근처 여관
 * 여관 주인과 대화하여 드레버의 알리바이 확인
 */

import { StoryNode } from '../../../types/story';

export const innNodes: Record<string, StoryNode> = {
  // 📍 여관 입구
  inn_entrance: {
    id: 'inn_entrance',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `저택에서 도보로 20분 거리에 있는 작은 여관.

[왓슨]: 여기가 드레버가 묵었다는 여관이군.

낡은 간판이 삐걱거린다. "그린 라이온 여관(Green Lion Inn)".

홈즈가 주변을 살핀다.

[홈즈]: 왓슨, 저 마차 자국을 보게. 최근 3일 이내의 흔적이 여러 개 있어. 

[왓슨]: 드레버의 것도 있을까?

[홈즈]: 확인해봐야겠군. 들어가세.

여관 문을 밀고 들어가자, 낡은 나무 바닥이 삐걱거린다.`,
    choices: [
      { text: '여관 주인을 찾는다', nextNode: 'inn_meet_innkeeper' },
      { text: '로비를 먼저 살펴본다', nextNode: 'inn_lobby_investigate' }
    ]
  },

  // 📍 여관 로비 조사
  inn_lobby_investigate: {
    id: 'inn_lobby_investigate',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `로비는 작고 소박하다. 벽난로 옆에 낡은 의자 몇 개와 오래된 카운터.

홈즈가 카운터 위의 장부를 훑어본다.

[홈즈]: 투숙객 명단... 이노크 드레버, 3일 전 체크인. 방 번호는 7번.

[왓슨]: 그럼 정말 여기 묵었다는 거야?

[홈즈]: 그건... 주인에게 직접 물어봐야겠군.

뒤쪽에서 나이 든 목소리가 들린다.

[여관주인]: 탐정 선생님들이시오? 무슨 일로 오셨는지...`,
    choices: [
      { text: '여관 주인과 대화한다', nextNode: 'inn_meet_innkeeper' }
    ]
  },

  // 📍 여관 주인 첫 만남
  inn_meet_innkeeper: {
    id: 'inn_meet_innkeeper',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'innkeeper', // 👈 여관 주인은 테마곡 없음 → mystery 트랙 재생
    text: `나이 든 남자가 앞치마를 두른 채 카운터 뒤에서 걸어 나온다. 60대 후반, 회색 머리에 온화한 인상.

[여관주인]: 제임스 매튜스라고 합니다. 이 여관을 30년째 운영하고 있지요.

[왓슨]: 안녕하십니까. 저는 존 왓슨 박사이고, 이쪽은...

[홈즈]: 셜록 홈즈입니다. 모로 백작 저택의 사건을 조사 중입니다.

매튜스가 고개를 끄덕인다.

[여관주인]: 아, 그 끔찍한 사건... 경찰에서도 다녀갔습니다. 어떻게 도와드릴까요?

[홈즈]: 이노크 드레버라는 손님에 대해 여쭤보고 싶습니다.`,
    choices: [
      { text: '드레버의 체크인 시간을 묻는다', nextNode: 'inn_ask_checkin' },
      { text: '드레버의 밤 시간 행적을 묻는다', nextNode: 'inn_ask_night_activity' },
      { text: '드레버의 인상에 대해 묻는다', nextNode: 'inn_ask_impression' },
      { text: '마차꾼에 대해 묻는다', nextNode: 'inn_ask_coachman' }
    ]
  },

  // 📍 체크인 시간 질문
  inn_ask_checkin: {
    id: 'inn_ask_checkin',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'innkeeper',
    text: `[왓슨]: 드레버 씨가 언제 체크인했나요?

매튜스가 장부를 확인한다.

[여관주인]: 3일 전 오후 4시경입니다. 마차를 타고 왔더군요. 짐은 작은 가방 하나뿐이었고.

[홈즈]: 표정은 어땠습니까?

[여관주인]: 굉장히 지쳐 보였습니다. 안색도 창백하고... 뭔가 걱정이 많아 보이더군요. "조용한 방을 부탁한다"고 하시더라고요.

[왓슨]: 특이한 점은 없었습니까?

[여관주인]: 글쎄요... 체크인할 때 손이 떨리더군요. 펜으로 이름을 쓰는데 글씨가 삐뚤빼뚤했습니다.

홈즈가 고개를 끄덕인다.`,
    choices: [
      { text: '밤 시간 행적을 묻는다', nextNode: 'inn_ask_night_activity', hideIfVisitedNode: 'inn_ask_night_activity' },
      { text: '드레버의 인상에 대해 묻는다', nextNode: 'inn_ask_impression', hideIfVisitedNode: 'inn_ask_impression' },
      { text: '방 번호를 확인한다', nextNode: 'inn_ask_room', hideIfVisitedNode: 'inn_ask_room' },
      { text: '방을 조사하고 싶다고 한다', nextNode: 'inn_ask_room_search', requiredVisitedNode: 'inn_ask_night_activity' },
      { text: '다른 질문을 한다', nextNode: 'inn_meet_innkeeper' }
    ]
  },

  // 📍 밤 시간 행적 질문 (핵심 알리바이)
  inn_ask_night_activity: {
    id: 'inn_ask_night_activity',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'innkeeper',
    text: `[홈즈]: 가장 중요한 질문이오. 3일 전 밤, 드레버 씨가 방에 계셨소?

매튜스가 잠시 생각한다.

[여관주인]: 음... 그날 밤 말씀이시죠?

[왓슨]: 네, 특히 밤 11시에서 새벽 2시 사이입니다.

매튜스가 난처한 표정을 짓는다.

[여관주인]: 솔직히 말씀드리자면... 모르겠습니다.

[홈즈]: 모른다고?

[여관주인]: 네. 저는 밤 10시면 잠이 듭니다. 그 시간대에 손님들이 들락날락하는 걸 일일이 확인하지는 않거든요.

[왓슨]: 하지만 방에서 나가는 소리나...

매튜스가 고개를 젓는다.

[여관주인]: 7번 방은 뒷계단 쪽입니다. 조용히 나가려면... 제가 모를 수도 있습니다.

홈즈가 날카롭게 묻는다.

[홈즈]: 그럼 다음 날 아침엔 어땠소?`,
    nextNode: 'inn_morning_evidence'
  },

  // 📍 아침 증거
  inn_morning_evidence: {
    id: 'inn_morning_evidence',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'innkeeper',
    text: `[여관주인]: 다음 날 아침 7시쯤... 드레버 씨가 아침 식사를 하러 내려왔습니다.

[왓슨]: 상태는 어땠습니까?

매튜스가 눈을 가늘게 뜬다.

[여관주인]: 더 지쳐 보였습니다. 눈 밑이 시커머고... 잠을 제대로 못 잔 것 같았어요. 그리고...

[홈즈]: 그리고?

[여관주인]: 구두에 진흙이 묻어 있더군요. "산책이라도 했냐"고 물었더니, "밤에 잠이 안 와서 좀 걸었다"고 하더라고요.

당신과 홈즈가 시선을 교환한다.

[왓슨]: (산책...? 아니면 저택에?)

[홈즈]: 진흙의 색은 기억하시오?

[여관주인]: 검은빛이 도는 갈색이었습니다. 일반 흙보다 좀 더 습한 느낌이었고요.

홈즈가 날카롭게 반응한다.

[홈즈]: 검은빛이 도는 갈색... 습한 진흙...

당신도 무언가 떠올린다.

[왓슨]: (저택 부엌이나 우물 근처에서 본 진흙과 같은 특징인데...?)

홈즈가 메모를 한다.

[홈즈]: 매우 흥미로운 정보요. 이런 진흙은 특정 장소에서만 발견되지. 일반 길거리 흙이 아니야.

[왓슨]: 그럼 드레버가 단순히 산책한 게 아니군.

[홈즈]: 저택 근처로 갔을 가능성이 높아. 특히 우물이나 지하 공간 같은 곳 말이야.`,
    choices: [
      { text: '드레버의 인상을 더 묻는다', nextNode: 'inn_ask_impression' },
      { text: '방을 조사하고 싶다고 한다', nextNode: 'inn_ask_room_search' },
      { text: '여관을 나선다', nextNode: 'inn_leave' }
    ]
  },

  // 📍 드레버의 인상
  inn_ask_impression: {
    id: 'inn_ask_impression',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'innkeeper',
    text: `[왓슨]: 드레버 씨가 어떤 사람으로 보였습니까?

[여관주인]: 불쌍한 사람이었습니다. 계속 뭔가에 쫓기는 듯한 표정이었어요.

[홈즈]: 구체적으로?

[여관주인]: 식사 중에도 계속 창밖을 보더군요. 누가 지켜보는지 확인하듯이. 그리고 손을 계속 떨었습니다. 술을 마시지도 않았는데 말이죠.

[왓슨]: 다른 손님과 대화는 했나요?

[여관주인]: 아니요. 완전히 혼자였습니다. 방에만 틀어박혀 있었고... 식사 때만 잠깐 내려왔어요.

[홈즈]: 편지나 전보를 받은 적은?

매튜스가 고개를 끄덕인다.

[여관주인]: 네! 하루에 한 통씩... 총 세 통의 편지가 왔습니다. 발신인은 모르겠고, 런던 소인이 찍혀 있었습니다.

[왓슨]: 내용은 모르시겠죠?

[여관주인]: 네. 하지만 편지를 읽고 나면... 더 초조해지더군요.`,
    choices: [
      { text: '밤 시간 행적을 묻는다', nextNode: 'inn_ask_night_activity', hideIfVisitedNode: 'inn_ask_night_activity' },
      { text: '체크인 시간을 묻는다', nextNode: 'inn_ask_checkin', hideIfVisitedNode: 'inn_ask_checkin' },
      { text: '방 번호를 확인한다', nextNode: 'inn_ask_room', hideIfVisitedNode: 'inn_ask_room' },
      { text: '🔥 다른 투숙객에 대해 묻는다', nextNode: 'inn_ask_coachman', hideIfVisitedNode: 'inn_ask_coachman' }, // ✅ 호프 연결
      { text: '방을 조사하고 싶다고 한다', nextNode: 'inn_ask_room_search', requiredVisitedNode: 'inn_ask_night_activity' },
      { text: '여관을 나선다', nextNode: 'inn_leave' }
    ]
  },

  // 📍 방 조사 요청
  inn_ask_room_search: {
    id: 'inn_ask_room_search',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `[홈즈]: 7번 방을 조사해도 되겠소?

매튜스가 난처한 표정을 짓는다.

[여관주인]: 글쎄요... 드레버 씨가 아직 투숙 중이라... 허락 없이는...

[홈즈]: 모로 백작의 실종 사건을 조사 중이오. 협조해주면 감사하겠소.

매튜스가 잠시 망설이다가 고개를 끄덕인다.

[여관주인]: 알겠습니다. 저도 진실이 밝혀지길 바랍니다. 열쇠를 드리죠.

그가 벽에 걸린 열쇠를 건넨다.

[여관주인]: 7번 방입니다. 2층 복도 끝, 뒷계단 옆이에요.`,
    choices: [
      { text: '7번 방으로 올라간다', nextNode: 'inn_room_7_entrance' }
    ]
  },

  // 📍 7번 방 입구
  inn_room_7_entrance: {
    id: 'inn_room_7_entrance',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `2층 복도 끝, 뒷계단 바로 옆에 있는 7번 방.

[왓슨]: 정말 나가기 좋은 위치로군.

[홈즈]: 우연이 아냐, 왓슨. 의도적으로 이 방을 선택했을 가능성이 높을 거야.

열쇠를 돌리자 문이 열린다.

작고 소박한 방. 침대, 작은 책상, 의자, 그리고 창문.

홈즈가 즉시 조사를 시작한다.`,
    choices: [
      { text: '침대를 조사한다', nextNode: 'inn_room_bed' },
      { text: '책상을 조사한다', nextNode: 'inn_room_desk' },
      { text: '창문을 조사한다', nextNode: 'inn_room_window' },
      { text: '뒷계단을 확인한다', nextNode: 'inn_room_stairs' }
    ]
  },

  // 📍 침대 조사
  inn_room_bed: {
    id: 'inn_room_bed',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    conditionalText: [
      {
        // 부엌이나 우물 진흙을 조사한 경우
        condition: (context) => 
          context.visitedNodes.includes('kitchen_mud_investigation') || 
          context.visitedNodes.includes('well_mud_investigation'),
        text: `홈즈가 침대 시트를 들춰본다.

[홈즈]: 왓슨, 이것 보게.

베개가 두 개다. 하지만 한쪽만 사용된 흔적.

[홈즈]: 머리 자국이 얕아. 오래 누워있지 않았다는 뜻이지.

[왓슨]: 몇 시간 정도?

[홈즈]: 많아야 3-4시간. 정상적인 수면이라면 최소 6-7시간은 누워있어야 하는데...

침대 밑을 확인한 홈즈가 무언가를 집어든다.

[홈즈]: 구두끈이 끊어진 구두... 진흙이 묻어있군!

홈즈가 진흙을 자세히 살핀다.

[홈즈]: 왓슨, 이 진흙... 검은빛 도는 갈색이야. 우리가 저택 부엌과 우물에서 본 것과 같은 특징이 있어!

[왓슨]: 그럼 드레버가 정말 저택에 갔다는 증거군!

[홈즈]: 채취한 샘플과 직접 대조해보면 확실해질 거야. 과학적 분석이 필요해.`
      }
    ],
    text: `홈즈가 침대 시트를 ��춰본다.

[홈즈]: 왓슨, 이것 보게.

베개가 두 개다. 하지만 한쪽만 사용된 흔적.

[홈즈]: 머리 자국이 얕아. 오래 누워있지 않았다는 뜻이지.

[왓슨]: 몇 시간 정도?

[홈즈]: 많아야 3-4시간. 정상적인 수면이라면 최소 6-7시간은 누워있어야 하는데...

침대 밑을 확인한 홈즈가 무언가를 집어든다.

[홈즈]: 구두끈이 끊어진 구두... 진흙이 묻어있군. 검은빛 도는 갈색. 여관주인의 증언과 일치해.`,
    choices: [
      { text: '🔬 진흙 샘플을 분석한다', nextNode: 'mud_analysis_puzzle', puzzleType: 'mudAnalysis', hideIfVisitedNode: 'mud_analysis_puzzle', requiredVisitedNode: 'kitchen_mud_investigation' },
      { text: '책상을 조사한다', nextNode: 'inn_room_desk' },
      { text: '창문을 조사한다', nextNode: 'inn_room_window' },
      { text: '뒷계단을 확인한다', nextNode: 'inn_room_stairs' }
    ]
  },

  // 📍 책상 조사 (핵심 증거)
  inn_room_desk: {
    id: 'inn_room_desk',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `책상 위에 몇 장의 종이와 펜이 놓여있다.

당신이 종이를 펼쳐본다.

[왓슨]: 홈즈, 이것 좀 봐!

편지가 세 통. 모두 런던에서 온 것.

**첫 번째 편지:**
"드레버, 백작이 당신을 찾고 있소. 빚을 갚거나... 아니면 다른 방법을 찾으시오. - S"

**두 번째 편지:**
"시간이 없소. 이번 주 안에 결정시오. 가족 생각하시오. - S"

**세 번째 편지:**
"마지막 경고요. 백작이 법적 조치를 취할 것이오. 모든 것을 잃게 될 것이오. - S"

[홈즈]: S... 스탠거슨일까?

책상 서랍을 열자... 메모가 하나 더 있다.

드레버의 필체로 적힌 글귀:

"더 이상 방법이 없다. 백작이... 모든 것을 빼앗았다. 아내와 아이들은 어떻게 하나..."

그 아래, 거칠게 지워진 글씨들.

홈즈가 편지들을 신중하게 접어 넣는다.

[홈즈]: 보관해두지, 왓슨.

**[증거 획득: 협박 편지들]**`,
    item: 'threatening_letters',
    choices: [
      { text: '침대를 조사한다', nextNode: 'inn_room_bed', hideIfVisitedNode: 'inn_room_bed' },
      { text: '창문을 조사한다', nextNode: 'inn_room_window', hideIfVisitedNode: 'inn_room_window' },
      { text: '뒷계단을 확인한다', nextNode: 'inn_room_stairs', hideIfVisitedNode: 'inn_room_stairs' },
      { text: '조사를 마치고 1층으로 내려간다', nextNode: 'inn_conclusion' }
    ]
  },

  // 📍 창문 조사
  inn_room_window: {
    id: 'inn_room_window',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈가 창문을 열어본다.

[홈즈]: 왓���, 이 창문... 밖에서도 열 수 있어.

창틀에 작은 흠집들.

[홈즈]: 최근에 여러 번 열었다 닫았다 한 흔적이야. 드레버가 밤마다 이 창으로 나갔을 가능성이 있어.

창밖을 보니... 뒷계단으로 이어지는 지붕이 보인다.

[왓슨]: 저 지붕을 타고 내려갈 수 있겠.

[홈즈]: 그렇지. 여관 주인 몰래.`,
    choices: [
      { text: '침대를 조사한다', nextNode: 'inn_room_bed' },
      { text: '책상을 조사한다', nextNode: 'inn_room_desk' },
      { text: '뒷계단을 확인한다', nextNode: 'inn_room_stairs' }
    ]
  },

  // 📍 뒷계단 확인
  inn_room_stairs: {
    id: 'inn_room_stairs',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `방 밖으로 나와 뒷계단을 살펴본다.

낡은 나무 계단. 삐걱거리는 소리가 거의 없다.

[왓슨]: 조용히 내려갈 수 있겠어.

계단 난간에 작은 천 조각이 걸려있다.

홈즈가 집어 든다.

[홈즈]: 드레버의 코트에서 떨어진 것 같아. 질감이 고급 울... 드레버가 입었던 회색 코트와 일치해.

계단을 내려가보니... 뒷문으로 바로 연결된다.

[홈즈]: 완벽한 탈출로군. 여관 주인이 전혀 모를 수밖에 없어.

뒷문 밖은 어두운 골목. 저택 방향으로 이어지는 길이 보인다.`,
    choices: [
      { text: '여관 주인에게 돌아간다', nextNode: 'inn_conclusion' }
    ]
  },

  // 📍 여관 조사 결론
  inn_conclusion: {
    id: 'inn_conclusion',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `1층으로 내려와 여관 주인에게 열쇠를 돌려준다.

[홈즈]: 감사하오, 매튜스 씨. 큰 도움이 되었소.

[여관주인]: 뭔가 발견하셨나요?

홈즈가 고개를 끄덕인다.

[홈즈]: 드레버 씨가... 밤에 외출한 것이 거의 확실하오.

매튜스가 놀란다.

[여관주인]: 정말입니까?! 그럼 알리바이가...

[홈즈]: 없소. 그는 뒷계단을 통해 몰래 나갔고... 저택으로 갔을 가능성이 크오.

여관을 나서며 당신이 홈즈에게 속삭인다.

[왓슨]: 드레버가 범인일까요?

[홈즈]: 동기와 기회는 있지. 하지만... 아직 확정하긴 이르네. 더 조사해야 해.

**[단서 해금: 드레버의 거짓 알리바이]**`,
    choices: [
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  // 📍 여관에서 나가기 (조기 종료)
  inn_leave: {
    id: 'inn_leave',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `[왓슨]: 감사합니다, 매튜스 씨. 도움이 되었습니다.

[여관주인]: 볌말씀을요. 진실이 밝혀지길 바랍니다.

여관을 나서며 홈즈가 말한다.

[홈즈]: 드레버의 알리바이는... 의심스럽군. 여관 주인도 확신하지 못했으니까.

[왓슨]: 저택으로 돌아가서 더 조사해야겠습니다.

**[단서: 드레버의 불확실한 알리바이]**`,
    choices: [
      { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
    ]
  },

  // 📍 방 번호 확인 (추가 분기)
  inn_ask_room: {
    id: 'inn_ask_room',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'innkeeper',
    text: `[홈즈]: 드레버 씨의 방 번호는?

[여관주인]: 7번입니다. 2층 복도 끝, 뒷계단 바로 옆이죠.

[왓슨]: 뒷계단?

[여관주인]: 네. 원래 하인들이 쓰던 계단입니다. 지금은 거의 안 쓰지만... 드레버 씨가 조용한 방을 원하셔서 그쪽을 드렸습니다.

홈즈가 당신과 눈빛을 교환한다.

[홈즈]: (속삭임) 뒷계단... 몰래 나가기엔 완벽한 위치군.`,
    choices: [
      { text: '밤 시간 행적을 묻는다', nextNode: 'inn_ask_night_activity' },
      { text: '방을 조사하고 싶다고 한다', nextNode: 'inn_ask_room_search' }
    ]
  },

  // 📍 마차꾼에 대해 묻는다
  inn_ask_coachman: {
    id: 'inn_ask_coachman',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'innkeeper',
    text: `[홈즈]: 최근에 다른 투숙객이 있었나요?

매튜스가 고개를 끄덕인다.

[여관주인]: 아, 네. 제퍼슨 호프라는 마차꾼이 있습니다.

[왓슨]: 마차꾼이요?

[여관주인]: 네. 3일 전부터 묵고 계십니다. 2층 끝방에 계시죠.

홈즈와 당신이 시선을 교환한다.

[홈즈]: 어떤 사람입니까?

[여관주인]: 조용하고... 슬퍼 보이는 분이에요. 별로 말이 없으시고... 밤마다 창밖만 바라보시더라고요.

[여관주인]: 그리고... 가끔 누군가의 이름을 부르시는 것 같았어요. '루시'라고...`,
    choices: [
      { text: '💬 "지금 방에 있습니까?"', nextNode: 'inn_hope_location' },
      { text: '🔍 "이상한 행동을 본 적 있습니까?"', nextNode: 'inn_hope_behavior' },
      { text: '🔥 "그를 만나고 싶습니다"', nextNode: 'inn_meet_hope' },
      { text: '다른 질문으로 돌아간다', nextNode: 'inn_meet_innkeeper' }
    ]
  },

  // 📍 진흙 분석 퍼즐 완료 후
  mud_analysis_puzzle: {
    id: 'mud_analysis_puzzle',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    speaker: 'watson',
    text: `홈즈가 드레버의 구두 진흙을 자세히 관찰한다.

[홈즈]: 왓슨, 내 가방에서 진흙 샘플들을 꺼내주게.

당신이 부엌과 우물에서 채취한 진흙 샘플을 꺼낸다.

홈즈가 세 샘플을 나란히 놓고 비교기 시작한다.

[홈즈]: 자, 이제 과학적으로 증명해보지.

홈즈의 눈이 빛난다.

[홈즈]: 색상, 습도, 입자 크기... 모든 특성이 완벽하게 일치해! 의심의 여지가 없어.

[왓슨]: 그럼 드레버가 정말 저택에 갔다는 확실한 증거군!

[홈즈]: 그뿐만이 아니야. 이 진흙의 경로를 역추적하면... 드레버는 우물을 통해 지하실로 들어갔고, 부엌을 거쳐 나온 거야.

[왓슨]: 그의 알리바이는 완전히 무너졌어!

홈즈가 고개를 끄덕인다.

[홈즈]: 과학은 거짓말하지 않지, 왓슨. 이제 우리는 확실한 증거를 손에 쥐었어.

**[증거 확보: 진흙 샘플 일치 - 드레버의 저택 침입 증명]**`,
    choices: [
      { text: '다른 곳을 조사한다', nextNode: 'inn_room_7_entrance' },
      { text: '여관을 나간다', nextNode: 'inn_conclusion' }
    ]
  }
};