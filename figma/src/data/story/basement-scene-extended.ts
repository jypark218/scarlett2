// basement_scene 이후 새로운 분기 노드들
// 독약 시나리오를 감금 시나리오로 대체

import { StoryNode } from '../../types/story';

export const basementSceneExtended: Record<string, StoryNode> = {

  // basement_scene의 새로운 분기들
  holmes_deduces_basement: {
    id: 'holmes_deduces_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 지하실을 둘러본다.

[홈즈]: 흥미롭군요...

그가 루시 초상화를 본다.

[홈즈]: 이곳은 속죄실이야. 백작이 루시를 위해 만든...

그리고 철문을 가리킨다.

[홈즈]: 저 문 너머가 의식실이겠군.

[홈즈]: 호프... 당신은 백작이 엘렌을 의식에 바치려 했다고 생각하는 겁니까?

호프가 고개를 끄덕인다.

[제퍼슨 호프]: 엘렌이 직접 봤소! 의식실에 드레스가...

백작이 고개를 젓는다.

[모로 백작]: 나는... 그런 적 없소... 누군가 나를...

홈즈가 날카롭게 반응한다.

[홈즈]: 누군가가 백작을 이용했다는 건가요?`,
    choices: [
      { text: '증거를 요구한다', nextNode: 'demand_evidence_basement' },
      { text: '의식실을 조사하자고 한다', nextNode: 'suggest_check_ritual_chamber' },
      { text: '백작을 먼저 풀어준다', nextNode: 'free_count_first' }
    ]
  },

  ask_count_truth_basement: {
    id: 'ask_count_truth_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'count',
    speaker: 'watson',
    text: `"백작, 진실을 말씀해주십시오."

백작이 당신을 본다.

[모로 백작]: ...나는 의식을 계획하지 않았소.

[제퍼슨 호프]: 거짓말!

[모로 백작]: 아니오! 루시를 잃은 후...

백작이 루시 초상화를 본다.

[모로 백작]: 나는 다시는... 그런 광기에 빠지지 않겠다고...

[모로 백작]: 20년간... 속죄했소...

[모로 백작]: 엘렌은... 내가 지켜야 할 딸이오...

그의 눈에 눈물이 맺힌다.

[모로 백작]: 누군가... 나를 이용해 엘렌을 노린 것이오...`,
    choices: [
      { text: '누가 그랬는지 묻는다', nextNode: 'ask_who_planned_ritual' },
      { text: '증거가 있는지 묻는다', nextNode: 'ask_for_proof' },
      { text: '호프의 반응을 본다', nextNode: 'hope_reaction_to_count_words' }
    ]
  },

  demand_evidence_basement: {
    id: 'demand_evidence_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 백작에게 다가간다.

[홈즈]: 증거가 필요합니다.

[홈즈]: 누군가 당신을 이용했다면... 그 증거를 보여주십시오.

백작이 고개를 끄덕인다.

[모로 백]: 의식실... 저 문 너머...

[모로 백작]: 내가 준비한 것이 아닌 물건들이 있을 것이오...

호프가 의심스럽게 본다.

[제퍼슨 호프]: 백작의 말을... 믿을 수 있소?

홈즈가 호프를 본다.

[홈즈]: 확인해봐야죠. 의식실을 조사합시다.`,
    choices: [
      { text: '의식실로 간다', nextNode: 'go_to_ritual_chamber_together' },
      { text: '백작을 풀고 함께 간다', nextNode: 'free_count_and_investigate' }
    ]
  },

  suggest_check_ritual_chamber: {
    id: 'suggest_check_ritual_chamber',
    day: 1,
    timeOfDay: 'evening',
    character: 'watson',
    speaker: 'watson',
    text: `"의식실을 조사합시다."

홈즈가 고개를 끄덕인다.

[홈즈]: 좋은 생각이야, 왓슨.

[홈즈]: 증거가 진실을 말해줄 거야.

호프가 철문을 가리킨다.

[제퍼슨 호프]: 저 문이... 의식실로 가는 문이오.

[제퍼슨 호프]: 하지만 열쇠가...

백작이 말한다.

[모로 백작]: 루시 초상화 뒤에... 열쇠가 숨겨져 있을 것이오...

모두가 초상화를 본다.`,
    choices: [
      { text: '초상화 뒤를 확인한다', nextNode: 'find_ritual_key_together' },
      { text: '문을 부수고 들어간다', nextNode: 'break_door_basement' }
    ]
  },

  free_count_first: {
    id: 'free_count_first',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `"백작을 먼저 풀어줍시다."

호프가 놀란다.

[제퍼슨 호프]: 뭐라고?!

[왓슨]: 대화가 필요합니다. 묶인 채로는...

홈즈가 당신을 본다.

[홈즈]: 왓슨, 위험할 수 있어.

[왓슨]: 괜찮습니다.

당신이 백작의 밧줄을 푼다.

백작이 일어선다. 몸이 약해 보인다.

[모로 백작]: 감사하오... 박사님...

호프가 경계한다.

[제퍼슨 호프]: 백작... 도망치려 하지 마시오...

백작이 고개를 젓는다.

[모로 백작]: 도망치지 않겠소. 이제... 진실을 밝혀야 하오.`,
    choices: [
      { text: '의식실로 함께 간다', nextNode: 'go_to_ritual_chamber_together' },
      { text: '백작의 이야기를 듣는다', nextNode: 'count_full_explanation' }
    ]
  },

  ask_who_planned_ritual: {
    id: 'ask_who_planned_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'count',
    speaker: 'watson',
    text: `"누가 의식을 계획했습니까?"

백작이 생각에 잠긴다.

[모로 백작]: ...확실하지 않소.

[모로 백작]: 의식실에 접근할 수 있는 사람은...

[모로 백작]: 스탠거슨... 집사로서 열쇠를 가지고 있소...

[모로 백작]: 드레버... 그는 교단에 대해 조사했소...

호프가 끼어든다.

[제퍼슨 호프]: 둘 다 용의자군!

홈즈가 메모한다.

[홈즈]: 동기는 무엇일까요?

백작이 한숨을 쉰다.

[모로 백작]: ...유산.

[모로 백작]: 엘렌이 내 전 재산을 상속받게 되어있소.`,
    choices: [
      { text: '유산 동기를 더 깊게 파고든다', nextNode: 'explore_inheritance_motive' },
      { text: '용의자를 심문하자고 한다', nextNode: 'suggest_interrogate_suspects' }
    ]
  },

  ask_for_proof: {
    id: 'ask_for_proof',
    day: 1,
    timeOfDay: 'evening',
    character: 'count',
    text: `"증거가 있습니까?"

백작이 고개를 끄덕인다.

[모로 백작]: 의식실을 조사하면... 알 수 있을 것이오.

[모로 백작]: 내가 준비하지 않은 물건들이...

[모로 백작]: 드레스... 편지... 의식 계획서...

[모로 백작]: 모두 위조된 것들이오.

호프가 의심스럽게 본다.

[제퍼슨 호프]: 말로는 뭐든 할 수 있소!

홈즈가 철문을 가리킨다.

[홈즈]: 확인해봅시다. 의식실로.`,
    choices: [
      { text: '의식실로 간다', nextNode: 'go_to_ritual_chamber_together' }
    ]
  },

  hope_reaction_to_count_words: {
    id: 'hope_reaction_to_count_words',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    text: `호프가 백작의 말을 듣고 흔들린다.

[제퍼슨 호프]: ...속죄? 20년간?

[제퍼슨 호프]: 그게 사실이라면...

그가 백작을 본다.

[제퍼슨 호프]: 엘렌을... 지켜준 거요?

백작이 고개를 끄덕인다.

[모로 백작]: 루시의... 마지막 부탁이었소...

[모로 백작]: "엘렌을... 부탁해요..."

호프의 눈에 눈물이 맺힌다.

[제퍼슨 호프]: 루시가... 그렇게...

그가 주저앉는다.

[제퍼슨 호프]: 그럼... 내가 잘못 판단한 건가...`,
    choices: [
      { text: '호프를 위로한다', nextNode: 'comfort_hope_in_basement' },
      { text: '진실을 확인하자고 한다', nextNode: 'suggest_verify_truth' }
    ]
  },

  find_ritual_key_together: {
    id: 'find_ritual_key_together',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `홈즈가 루시 초상화에 다가간다.

[홈즈]: 백작... 정말 여기 열쇠가?

백작이 고개를 끄덕인다.

[모로 백작]: 초상화 뒤... 액자 틀 안쪽...

홈즈가 조심스럽게 초상화를 확인한다.

작은 열쇠가 나온다.

[아이템 획득: 의식실 열쇠]

[홈즈]: 찾았어!

호프가 철문을 본다.

[제퍼슨 호프]: ...이제 진실을 밝힐 시간이군.`,
    choices: [
      { text: '의식실로 들어간다', nextNode: 'enter_ritual_chamber_group' }
    ]
  },

  break_door_basement: {
    id: 'break_door_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 문을 밀어본다.

[홈즈]: 특수 자물쇠야... 폭력으로는 안 열려.

호프가 나선다.

[제퍼슨 호프]: 내가 열겠소!

하지만 문은 꿈쩍도 하지 않는다.

백작이 말한다.

[모로 백작]: 말했지 않소... 루시 초상화 뒤에 열쇠가...

홈즈가 백작을 본다.

[홈즈]: 확인해봅시다.`,
    choices: [
      { text: '초상화 뒤를 확인한다', nextNode: 'find_ritual_key_together' }
    ]
  },

  go_to_ritual_chamber_together: {
    id: 'go_to_ritual_chamber_together',
    day: 1,
    timeOfDay: 'evening',
    text: `모두가 철문 앞에 선다.

홈즈가 의식실 열쇠로 문을 연다.

찰칵!

문이 천천히 열린다.

더 큰 공간이 나타난다...

제단... 촛불... 상징들...

그리고... 하얀 드레스가 걸려있다.

[왓슨]: 이곳이... 의식실...

모두가 숨을 죽인다.`,
    choices: [
      { text: '의식��을 조사한다', nextNode: 'investigate_ritual_chamber_group' }
    ]
  },

  free_count_and_investigate: {
    id: 'free_count_and_investigate',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `"백작을 풀고 함께 조사합시다."

호프가 반대한다.

[제퍼슨 호프]: 안 돼! 백작은...

[왓슨]: 그의 협력이 필요합니다.

당신이 백작의 밧줄을 푼다.

백작이 일어선다.

[모로 백작]: 감사하오... 함께 가시죠.

모두가 철문 앞으로 간다.`,
    choices: [
      { text: '의식실로 들어간다', nextNode: 'enter_ritual_chamber_group' }
    ]
  },

  count_full_explanation: {
    id: 'count_full_explanation',
    day: 1,
    timeOfDay: 'evening',
    character: 'count',
    text: `백작이 조용히 말하기 시작한다.

[모로 백작]: 1주일 전... 엘렌을 지하실로 불렀소.

[모로 백작]: 루시를 보여주기 위해... 속죄실로...

[모로 백작]: 하지만... 의식실 문이 열려있었소.

호프가 집중한다.

[모로 백작]: 안에는... 하얀 드레스가... 제단 위에...

[모로 백작]: 나는 놀랐소. 내가 준비한 게 아니었으니까.

[모로 백작]: 엘렌은... 겁에 질려 도망쳤소...

[모로 백작]: 그 후... 찾을 수 없었지...

백작이 눈물을 흘린다.

[모로 백작]: 누군가... ��를 이용해... 엘렌을...`,
    choices: [
      { text: '누가 그랬을지 추리한다', nextNode: 'deduce_culprit_basement' },
      { text: '의식실을 조사한다', nextNode: 'suggest_check_ritual_chamber' }
    ]
  },

  comfort_hope_in_basement: {
    id: 'comfort_hope_in_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `당신이 호프의 어깨에 손을 얹는다.

[왓슨]: 당신은 엘렌을 지켰습니다.

호프가 당신을 본다.

[왓슨]: 백작이 계획하지 않았다 해도...

[왓슨]: 당신이 의식을 막은 건 맞습니다.

[왓슨]: 엘렌은 안전합니다. 당신 덕분에.

호프가 눈물을 닦는다.

[제퍼슨 호프]: ...루시... 나는... 네 딸을 지켰소...

백작이 고개를 끄덕인다.

[모로 백작]: 감사하오, 호프...`,
    choices: [
      { text: '두 사람을 화해시킨다', nextNode: 'reconcile_hope_and_count' },
      { text: '진범을 찾자고 한다', nextNode: 'suggest_find_real_culprit' }
    ]
  },

  suggest_verify_truth: {
    id: 'suggest_verify_truth',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `"진실을 확인합시다."

홈즈가 고개를 끄덕인다.

[홈즈]: 의식실을 조사하면 알 수 있을 거야.

[홈즈]: 백작의 말이 사실인지...

호프가 일어선다.

[제퍼슨 호프]: ...가보자. 진실을.

모두가 철문으로 향한다.`,
    choices: [
      { text: '의식실로 간다', nextNode: 'go_to_ritual_chamber_together' }
    ]
  },

  enter_ritual_chamber_group: {
    id: 'enter_ritual_chamber_group',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    text: `의식실 안으로 들어선다.

넓은 돌방... 제단... 촛불...

그리고 하얀 드레스가 걸려있다.

백작이 드레스를 본다.

[모로 백작]: 저건... 내가 준비한 게 아니오...

홈즈가 드레스를 조사한다.

[홈즈]: 최근 것이야... 며칠 전...

제단 옆 탁자에 뭔가가 있다.`,
    choices: [
      { text: '탁자를 조사한다', nextNode: 'examine_table_group' },
      { text: '드레스를 자세히 본다', nextNode: 'examine_dress_group' },
      { text: '방 전체를 살핀다', nextNode: 'search_chamber_group' }
    ]
  },

  investigate_ritual_chamber_group: {
    id: 'investigate_ritual_chamber_group',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    text: `홈즈가 의식실을 조사한다.

[홈즈]: 흥미롭군...

제단 위에 의식 도구들...

성경... 잔... 촛불...

그리고 메모가 하나 있다.

홈즈가 메모를 집어든다.

[홈즈]: 이건... 의식 계획서야...

모두가 모여든.`,
    choices: [
      { text: '메모를 읽는다', nextNode: 'read_ritual_plan_note' }
    ]
  },

  explore_inheritance_motive: {
    id: 'explore_inheritance_motive',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 추리를 시작한다.

[홈즈]: 엘렌이 전 재산을 상속받는다...

[홈즈]: 그 엘렌을 제거하면 다음 상속자가...

백작이 고개를 끄덕인다.

[모로 백작]: 스탠거슨... 차순위 상속자요...

호프가 반응한다.

[제퍼슨 호프]: 스탠거슨이?!

홈즈가 계속한다.

[홈즈]: 아니면 드레버... 그는 백작에게 빚이...

[홈즈]: 엘렌을 의식 사고로 위장해 제거하고...

[홈즈]: 백작의 책임으로 돌리려 했을 수도...

모든 것이 맞춰진다.`,
    choices: [
      { text: '스탠거슨을 의심한다', nextNode: 'suspect_stangerson_basement' },
      { text: '드레버를 의심한다', nextNode: 'suspect_drebber_basement' },
      { text: '둘 다 심문한다', nextNode: 'suggest_interrogate_both' }
    ]
  },

  suggest_interrogate_suspects: {
    id: 'suggest_interrogate_suspects',
    day: 1,
    timeOfDay: 'evening',
    character: 'watson',
    speaker: 'watson',
    text: `"용의자들을 심문합시다."

홈즈가 고개를 끄덕인다.

[홈즈]: 좋은 생각이야.

[홈즈]: 스탠거슨과 드레버... 둘 다 의심스러워.

백작이 말한다.

[모로 백작]: 저택 응접실에 있을 것이오...

호프가 일어선다.

[제퍼슨 호프]: 진범을... 찾자.

모두가 지하실을 나와 위로 올라간다.`,
    choices: [
      { text: '응접실로 간다', nextNode: 'go_to_drawing_room_interrogation' }
    ]
  },

  reconcile_hope_and_count: {
    id: 'reconcile_hope_and_count',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `"두 분 모두... 엘렌을 사랑합니다."

백작과 호프가 당신을 본다.

[왓슨]: 백작은 20년간 엘렌을 키웠고...

[왓슨]: 호프는 엘렌을 의식에서 구했습니다.

[왓슨]: 두 분 모두... 아버지입니다.

백작이 호프에게 손을 내민다.

[모로 백작]: 호프... 미안하오. 루시를...

호프가 떨리는 손으로 백작의 손을 잡는다.

[제퍼슨 호프]: ...엘렌을 키워줘서... 감사하오.

두 사람이 악수한다.

20년의 원한이... 녹는다.

홈즈가 조용히 말한다.

[홈즈]: 아름다운 순간이군요...`,
    choices: [
      { text: '엘렌을 데려오자고 한다', nextNode: 'suggest_bring_ellen' },
      { text: '진범을 찾아야 한다고 한다', nextNode: 'suggest_find_real_culprit' }
    ]
  },

  suggest_find_real_culprit: {
    id: 'suggest_find_real_culprit',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `"진범을 찾아야 합니다."

홈즈가 고개를 끄덕인다.

[홈즈]: 맞아. 누군가 엘렌을 노렸어.

[홈즈]: 용의자를 심문해야 해.

백작이 말한다.

[모로 백작]: 스탠거슨과 드레버...

호프가 덧붙인다.

[제퍼슨 호프]: 둘 다 의심스럽소.

모두가 위로 올라간다.

진실을 밝힐 시간이다.`,
    choices: [
      { text: '응접실로 간다', nextNode: 'go_to_drawing_room_interrogation' }
    ]
  },

  deduce_culprit_basement: {
    id: 'deduce_culprit_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 추리를 시작한다.

[홈즈]: 의식을 계획한 사람...

[홈즈]: 1. 지하실에 접근할 수 있어야 해

[홈즈]: 2. 교단에 대해 알고 있어야 해

[홈즈]: 3. 엘렌을 제거할 동기가 있어야 해

백작이 말한다.

[모로 백작]: 스탠거슨... 유산 동기...

호프가 덧붙인다.

[제퍼슨 호프]: 드레버... 복수 동기...

홈즈가 고개를 끄덕인다.

[홈즈]: 둘 다 가능성이 있어.

[홈즈]: 심문이 필요해.`,
    choices: [
      { text: '용의자 심문을 시작한다', nextNode: 'suggest_interrogate_suspects' }
    ]
  },

  suspect_stangerson_basement: {
    id: 'suspect_stangerson_basement',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `"스탠거슨이 의심스럽습니다."

홈즈가 고개를 끄덕인다.

[홈즈]: 집사로서 모든 열쇠를 가지고 있고...

[홈즈]: 유산 차순위 상속자이기도 하지.

백작이 한숨을 쉰다.

[모로 백작]: 스탠거슨... 20년간 믿어왔는데...

호프가 말한다.

[제퍼슨 호프]: 확인해봅시다.`,
    choices: [
      { text: '스탠거슨을 심문하러 간다', nextNode: 'go_interrogate_stangerson' }
    ]
  },

  suspect_drebber_basement: {
    id: 'suspect_drebber_basement',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `"드레버가 의심스럽습니다."

홈즈가 고개를 끄덕인다.

[홈즈]: 복수 동기가 명확하고...

[홈즈]: 교단에 대해 조사도 했지.

호프가 말한다.

[제퍼슨 호프]: 드레버는 백작을 증오하고 있소.

[제퍼슨 호프]: 엘렌을 이용해 백작을 파멸시키려 했을 수도...

백작이 고개를 끄덕인다.

[모로 백작]: 가능성이 높소...`,
    choices: [
      { text: '드레버를 심문하러 간다', nextNode: 'go_interrogate_drebber' }
    ]
  },

  suggest_interrogate_both: {
    id: 'suggest_interrogate_both',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `"둘 다 심문합시다."

홈즈가 전략을 짠다.

[홈즈]: 따로 심문해서 진술을 비교하자.

[홈즈]: 모순이 나오면 범인을 잡을 수 있어.

백작과 호프가 고개를 끄덕인다.

모두 함께 위로 올라간다.

진실을 밝힐 시간이다.`,
    choices: [
      { text: '응접실로 간다', nextNode: 'go_to_drawing_room_interrogation' }
    ]
  },

  examine_table_group: {
    id: 'examine_table_group',
    day: 1,
    timeOfDay: 'evening',
    text: `탁자 위를 조사한다.

의식 도구들... 성경, 잔, 촛불...

그리고 메모가 하나 있다.

홈즈가 메모를 집어든다.

**"1881년 11월 20일 - 엘렌을 위한 의식"**

백작이 메모를 보더니 놀란다.

[모로 백작]: 이건... 내 필체가 아니오!

호프가 메모를 본다.

[제퍼슨 호프]: 위조...?

홈즈가 메모를 자세히 본다.

[홈즈]: 누군가 백작을 사칭했군요.`,
    choices: [
      { text: '필체를 분석한다', nextNode: 'analyze_handwriting' },
      { text: '드레스를 조사한다', nextNode: 'examine_dress_group' }
    ]
  },

  examine_dress_group: {
    id: 'examine_dress_group',
    day: 1,
    timeOfDay: 'evening',
    text: `하얀 드레스를 조사한다.

새것이다. 최근에 만든 것 같다.

홈즈가 드레스 주머니를 확인한다.

편지가 하나 나온다.

**"엘렌에게 - 11월 20일 저녁 6시, 지하실로 오시오. - 아버지"**

백작이 편지를 보더니 경악한다.

[모로 백작]: 이것도 위조요! 나는 이런 편지를...!

호프가 날카롭게 반응한다.

[제퍼슨 호프]: 누군가 백작을 사칭해 엘렌을 유인하려 했군!`,
    choices: [
      { text: '편지를 증거로 챙긴다', nextNode: 'acquire_fake_letter' }
    ]
  },

  search_chamber_group: {
    id: 'search_chamber_group',
    day: 1,
    timeOfDay: 'evening',
    text: `방 전체를 조사한다.

벽에는 교단 상징들...

제단 위에는 피 자국...

그리고 반대편에 또 다른 문이 있다.

[홈즈]: 저 문은...?

백작이 말한다.

[모로 백작]: 우물로 이어지는 터널이오...

[모로 백작]: 두 개의 진입로... 부엌과 우물...

호프가 고개를 끄덕인다.

[제퍼슨 호프]: 내가 알고 있던 구조군...`,
    choices: [
      { text: '증거를 정리한다', nextNode: 'summarize_evidence_basement' },
      { text: '위로 올라간다', nextNode: 'exit_basement_all' }
    ]
  },

  read_ritual_plan_note: {
    id: 'read_ritual_plan_note',
    day: 1,
    timeOfDay: 'evening',
    text: `홈즈가 메모를 읽는다.

[홈즈]: "1881년 11월 20일 - 엘렌을 위한 의식"

[홈즈]: "루시의 혼을 이어받을 새로운 신부"

[홈즈]: "제단에서 의식을 완성한다"

백작이 메모를 보더니 고개를 젓는다.

[모로 백작]: 이건 내 필체가 아니오!

호프가 메모를 자세히 본다.

[제퍼슨 호프]: 위조군...

홈즈가 분석한다.

[홈즈]: 필체를 보니... 스탠거슨... 아니면 드레버...

[홈즈]: 둘 중 하나야.`,
    choices: [
      { text: '스탠거슨 필체와 비교한다', nextNode: 'compare_stangerson_writing' },
      { text: '드레버 필체와 비교한다', nextNode: 'compare_drebber_writing' },
      { text: '둘 다 심문한다', nextNode: 'suggest_interrogate_both' }
    ]
  },

  analyze_handwriting: {
    id: 'analyze_handwriting',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 메모의 필체를 자세히 본다.

[홈즈]: 흥미롭군...

[홈즈]: 백작의 필체를 흉내 냈지만...

[홈즈]: 약간의 차이가 있어...

그가 백작을 본다.

[홈즈]: 백작, 당신의 필적 샘플이 있습니까?

백작이 고개를 끄덕인다.

[모로 백작]: 서재에... 일기가...

홈즈가 메모한다.

[홈즈]: 비교 분석이 필요해.`,
    choices: [
      { text: '서재로 가서 일기를 가져온다', nextNode: 'fetch_count_diary' },
      { text: '용의자 필적을 구한다', nextNode: 'get_suspect_samples' }
    ]
  },

  acquire_fake_letter: {
    id: 'acquire_fake_letter',
    day: 1,
    timeOfDay: 'evening',
    text: `[아이템 획득: 위조된 편지]

편지를 증거로 챙긴다.

홈즈가 말한다.

[홈즈]: 이것이 결정적 증거야.

[홈즈]: 필적 분석으로 범인을 찾을 수 있어.

백작이 말한다.

[모로 백작]: 스탠거슨과 드레버... 둘 중 하나요...

호프가 주먹을 쥔다.

[제퍼슨 호프]: 찾아내자. 진범을.`,
    choices: [
      { text: '지하실을 나간다', nextNode: 'exit_basement_all' }
    ]
  },

  summarize_evidence_basement: {
    id: 'summarize_evidence_basement',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 증거를 정리한다.

[홈즈]: 1. 위조된 의식 계획서

[홈즈]: 2. 엘렌을 유인하는 가짜 편지

[홈즈]: 3. 새로 만든 의식용 드레스

[홈즈]: 4. 백작의 필적을 흉내 낸 흔적

홈즈가 결론을 내린다.

[홈즈]: 누군가 백작을 사칭해 엘렌을 의식에...

[홈즈]: 그리고 사고로 위장해 백작의 책임으로...

백작이 고개를 끄덕인다.

[모로 백작]: 완벽한 계획이었군...

호프가 말한다.

[제퍼슨 호프]: 하지만 내가 막았소.`,
    choices: [
      { text: '위로 올라간다', nextNode: 'exit_basement_all' }
    ]
  },

  exit_basement_all: {
    id: 'exit_basement_all',
    day: 1,
    timeOfDay: 'evening',
    text: `모두가 지하실을 나와 위로 올라온다.

부엌... 그리고 현관...

이제 용의자들을 심문할 시간이다.

홈즈가 말한다.

[홈즈]: 응접실로 가시죠.

[홈즈]: 스탠거슨과 드레버를 불러야 해.

백작과 호프가 고개를 끄덕인다.

진실을 밝힐 시간이다.`,
    choices: [
      { text: '응접실로 간다', nextNode: 'go_to_drawing_room_interrogation' }
    ]
  },

  suggest_bring_ellen: {
    id: 'suggest_bring_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `"엘렌을 데려옵시다."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: ...그래야겠소.

[제퍼슨 호프]: 엘렌도 진실을 알 권리가...

백작이 눈물을 흘린다.

[모로 백작]: 엘렌... 만나고 싶소...

홈즈가 말한다.

[홈즈]: 하지만 범인을 먼저 찾아야 합니다.

[홈즈]: 엘렌의 안전을 위해.

모두가 고개를 끄덕인다.`,
    choices: [
      { text: '용의자 심문을 시작한다', nextNode: 'suggest_interrogate_suspects' }
    ]
  },

  // intervene에서 참조하는 노드들
  ask_hope_about_ritual: {
    id: 'ask_hope_about_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    speaker: 'watson',
    text: `"호프, 의식에 대해 말해주십시오."

호프가 고개를 끄덕인다.

[제퍼슨 호프]: ...1주일 전이었소.

[제퍼슨 호프]: 엘렌이 찾아왔소. 겁에 질려서...

[제퍼슨 호프]: 백작이 지하실로 데려갔다고...

[제퍼슨 호프]: 의식실에... 드레스가 준비되어 있었다고...

백작이 고개를 젓는다.

[모로 백작]: 나는... 그런 적 없소...

호프가 백작을 노려본다.

[제퍼슨 호프]: 거짓말!`,
    choices: [
      { text: '백작에게도 듣는다', nextNode: 'ask_count_about_ritual_plan' },
      { text: '의식실을 조사한다', nextNode: 'suggest_check_ritual_chamber' }
    ]
  },

  ask_count_about_ritual_plan: {
    id: 'ask_count_about_ritual_plan',
    day: 1,
    timeOfDay: 'evening',
    character: 'count',
    speaker: 'watson',
    text: `"백작, 진실을 말씀해주십시오."

백작이 당신을 본다.

[모로 백작]: 나는... 의식을 계획하지 않았소.

[모로 백작]: 엘렌을 지하실로 데려간 건... 루시를 보여주기 위해서였소.

[모로 백작]: 속죄실에 있는 루시의 초상화를...

[모로 백작]: 하지만 의식실 문이 열려있었소.

백작이 떨린다.

[모로 백작]: 안에는... 드레스가... 제단 위에...

[모로 백작]: 내가 준비한 게 아니었소!

호프가 의심스럽��� 본다.`,
    choices: [
      { text: '증거가 있는지 묻는다', nextNode: 'ask_for_proof' },
      { text: '의식실을 조사한다', nextNode: 'suggest_check_ritual_chamber' }
    ]
  },

  go_to_drawing_room_interrogation: {
    id: 'go_to_drawing_room_interrogation',
    day: 1,
    timeOfDay: 'evening',
    text: `모두가 응접실로 향한다.

스탠거슨과 드레버가 불안한 표정으로 기다리고 있다.

홈즈가 두 사람을 본다.

[홈즈]: 이제... 진실을 밝힐 시간입니다.

긴장감이 감돈다.`,
    choices: [
      { text: '스탠거슨부터 심문한다', nextNode: 'interrogate_stangerson_ritual' },
      { text: '드레버부터 심문한다', nextNode: 'interrogate_drebber_ritual' },
      { text: '둘을 동시에 대면시킨다', nextNode: 'confront_both_suspects' }
    ]
  },

  go_interrogate_stangerson: {
    id: 'go_interrogate_stangerson',
    day: 1,
    timeOfDay: 'evening',
    text: `스탠거슨을 응접실로 부른다.

그가 불안한 표정으로 들어온다.

[스탠거슨]: 부르셨습니까...?

홈즈가 의식 계획 메모를 꺼낸다.

[홈즈]: 이것에 대해 설명해주시겠습니까?

스탠거슨이 창백해진다.`,
    choices: [
      { text: '추궁한다', nextNode: 'press_stangerson_ritual' }
    ]
  },

  go_interrogate_drebber: {
    id: 'go_interrogate_drebber',
    day: 1,
    timeOfDay: 'evening',
    text: `드레버를 응접실로 부른다.

그가 경계하는 표정으로 들어온다.

[드레버]: 무슨 일입니까?

홈즈가 의식 계획 메모를 보여준다.

[홈즈]: 이것이 당신 필체와 비슷한데요.

드레버가 긴장한다.`,
    choices: [
      { text: '추궁한다', nextNode: 'press_drebber_ritual' }
    ]
  },

  compare_stangerson_writing: {
    id: 'compare_stangerson_writing',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 스탠거슨의 필적 샘플을 꺼낸다.

집사 일지에서 발췌한 글씨들...

메모와 비교한다.

[홈즈]: ...흥미롭군.

[홈즈]: 약간 비슷하지만... 완전히 같지는 않아.

[왓슨]: 위조했을 가능성은?

[홈즈]: 있어. 하지만 확실하지 않아.

드레버 필적도 확인이 필요하다.`,
    choices: [
      { text: '드레버 필적과 비교한다', nextNode: 'compare_drebber_writing' },
      { text: '스탠거슨을 심문한다', nextNode: 'go_interrogate_stangerson' }
    ]
  },

  compare_drebber_writing: {
    id: 'compare_drebber_writing',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 드레버의 편지를 꺼낸다.

백작에게 보낸 빚 독촉장...

메모와 비교한다.

[홈즈]: 이건...!

홈즈의 눈이 날카로워진다.

[홈즈]: 필적이... 매우 유사해!

[왓슨]: 드레버가?!

[홈즈]: 확실하진 않지만... 의심스러워.

드레버를 심문해야 한다.`,
    choices: [
      { text: '드레버를 심문한다', nextNode: 'go_interrogate_drebber' },
      { text: '스탠거슨도 함께 심문한다', nextNode: 'suggest_interrogate_both' }
    ]
  },

  fetch_count_diary: {
    id: 'fetch_count_diary',
    day: 1,
    timeOfDay: 'evening',
    text: `서재로 가서 백작의 일기를 가져온다.

홈즈가 일기의 필적과 메모를 비교한다.

[홈즈]: 확실히 다르군.

[홈즈]: 백작을 흉내 냈지만... 미세한 차이가 있어.

백작이 말한다.

[모로 백작]: 누군가 나를 이용하려 했소...

홈즈가 고개를 끄덕인다.`,
    choices: [
      { text: '용의자 필적을 구한다', nextNode: 'get_suspect_samples' }
    ]
  },

  get_suspect_samples: {
    id: 'get_suspect_samples',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 스탠거슨과 드레버의 필적 샘플을 수집한다.

집사 일지... 빚 독촉장... 편지들...

메모와 하나씩 비교한다.

[홈즈]: 이제... 확실해졌어.

그가 결론을 내린다.`,
    choices: [
      { text: '범인을 지목한다', nextNode: 'identify_culprit_handwriting' }
    ]
  },

  identify_culprit_handwriting: {
    id: 'identify_culprit_handwriting',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `홈즈가 필적 분석 결과를 발표한다.

[홈즈]: 의식 계획 메모의 필적은...

[홈즈]: 드레버와 80% 일치합니다.

드레버가 얼어붙는다.

[드레버]: 그... 그건...!

백작이 드레버를 노려본다.

[모로 백작]: 네가... 엘렌을...!

호프가 주먹을 쥔다.

[제퍼슨 호프]: 이 자식...!`,
    choices: [
      { text: '드레버를 추궁한다', nextNode: 'confront_drebber_culprit' },
      { text: '스탠거슨의 반응을 본다', nextNode: 'stangerson_reaction_to_reveal' }
    ]
  },

  interrogate_stangerson_ritual: {
    id: 'interrogate_stangerson_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'stangerson',
    text: `스탠거슨에게 의식 계획을 묻는다.

[홈즈]: 당신이 의식실에 접근할 수 있었죠?

스탠거슨이 떨린다.

[스탠거슨]: 저는... 집사로서 열쇠를...

[홈즈]: 드레스를 준비한 건 당신입니까?

스탠거슨이 고개를 젓는다.

[스탠거슨]: 아닙니다! 저는... 그건...

그가 드레버를 본다.

[스탠거슨]: ...드레버입니다.`,
    choices: [
      { text: '더 자세히 듣는다', nextNode: 'stangerson_reveals_drebber_plan' }
    ]
  },

  interrogate_drebber_ritual: {
    id: 'interrogate_drebber_ritual',
    day: 1,
    timeOfDay: 'evening',
    character: 'drebber',
    text: `드레버에게 의식 계획을 묻는다.

[홈즈]: 왜 엘렌을 의식 희생양으로 만들려 했습니까?

드레버가 웃는다.

[드레버]: 증거가 있소?

홈즈가 필적 분석 결과를 보여준다.

드레버의 얼굴이 굳는다.

[드레버]: ...그건...

[홈즈]: 인정하십니까?`,
    choices: [
      { text: '동기를 묻는다', nextNode: 'ask_drebber_motive' },
      { text: '증거를 더 제시한다', nextNode: 'present_more_evidence_drebber' }
    ]
  },

  confront_both_suspects: {
    id: 'confront_both_suspects',
    day: 1,
    timeOfDay: 'evening',
    text: `스탠거슨과 드레버를 동시에 응접실로 부른다.

두 사람이 서로를 경계한다.

홈즈가 의식 계획 메모를 펼친다.

[홈즈]: 누가 이것을 썼습니까?

침묵.

스탠거슨이 드레버를 본다.

드레버가 스탠거슨을 노려본다.

긴장감이 흐른다.`,
    choices: [
      { text: '진실이 밝혀진다', nextNode: 'good_ending_truth_revealed' }
    ]
  }

};