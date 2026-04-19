import { StoryNode } from '../../types';

/**
 * Part 1: 오프닝 (게임 시작 ~ 저택 도착)
 * - 프롤로그 (day: 0): start ~ watson_leave (마차 타기까지)
 * - 챕터 1 (day: 1): arrive_mansion ~ (저택 도착 이후)
 */

export const part1Opening: Record<string, StoryNode> = {
  start: {
    id: 'start',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `1881년 10월, 런던.

베이커 스트리트 221B.`,
    nextNode: 'start_knock'
  },
  
  start_knock: {
    id: 'start_knock',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `쿵쾅쾅쾅!!!

문을 두드리는 소리가 집 전체를 울린다.`,
    shake: true,
    nextNode: 'start_wake'
  },
  
  start_wake: {
    id: 'start_wake',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `...뭐지?!

나는 침대에서 벌떡 일어났다. 심장이 쿵쿵 뛴다.

아프가니스탄에서 돌아온 후, 갑작스러운 소음에 아직도 놀라곤 한다.`,
    nextNode: 'start_time'
  },
  
  start_time: {
    id: 'start_time',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `시계를 보니 새벽 5시.

창밖은 아직 어둡다. 런던의 안개가 가로등 불빛을 희미하게 만든다.

누가 이 시간에...?`,
    nextNode: 'start_holmes_voice'
  },
  
  start_holmes_voice: {
    id: 'start_holmes_voice',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    text: `[홈즈]: (거실에서) 들어오시오!

홈즈의 목소리가 들린다. 평소처럼 차분하다.`,
    speaker: 'holmes',
    nextNode: 'start_rush'
  },
  
  start_rush: {
    id: 'start_rush',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `나는 재킷을 걸치며 거실로 향했다.

다리가 아직 완전히 낫지 않아 약간 절뚝거린다. 아프간 총상의 흔적이다.`,
    nextNode: 'gregson_panic'
  },
  
  gregson_panic: {
    id: 'gregson_panic',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (거친 숨을 몰아쉬며) 홈즈 씨!!! 당장 오셔야 합니다!

그레그슨 형사다. 스코틀랜드 야드의 베테랑 형사.`,
    nextNode: 'gregson_panic2'
  },
  
  gregson_panic2: {
    id: 'gregson_panic2',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `창백한 얼굴. 떨리는 손. 이마에는 식은땀이 맺혀있다.

그레그슨이 이렇게 당황한 모습을 본 건 처음이다.

무슨 일이 있었던 거지?`,
    nextNode: 'gregson_enters'
  },
  
  gregson_enters: {
    id: 'gregson_enters',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (목소리가 떨리며) 큰일입니다! 큰일이에요!

그가 거실 안으로 비틀거리며 들어선다.`,
    nextNode: 'holmes_calm'
  },
  
  holmes_calm: {
    id: 'holmes_calm',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    speaker: 'holmes',
    text: `[홈즈]: (파이프 연기를 천천히 내뿜으며) 진정하시오, 그레그슨.

[홈즈]: (차분하게) 흥분은 사건 해결에 아무런 도움이 되지 않네.`,
    nextNode: 'holmes_calm2'
  },
  
  holmes_calm2: {
    id: 'holmes_calm2',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    speaker: 'watson',
    text: `홈즈는 안락의자에 깊숙이 몸을 기댄 채 파이프를 피우고 있었다.

그의 눈가에 드리운 그림자를 보니, 밤새 잠을 자지 않은 것이 분명했다.

탁자 위에는 화학 서적들과 실험 도구들이 어지럽게 널려있다. 유리관에서 희미한 증기가 피어오른다.`,
    nextNode: 'holmes_explain'
  },
  
  holmes_explain: {
    id: 'holmes_explain',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    speaker: 'holmes',
    text: `[홈즈]: (날카로운 시선으로 그레그슨을 응시하며) 무슨 일인지 차근차근 설명해보시오.

[홈즈]: (손가락으로 책상을 톡톡 두드리며) 숨을 고르고, 처음부터 차례대로. 자네의 추측이 아니라 **사실**만 말하게.`,
    nextNode: 'gregson_breathe'
  },
  
  gregson_breathe: {
    id: 'gregson_breathe',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (깊게 숨을 들이마신다) 하아... 하아...

그가 손수건으로 이마의 땀을 닦는다.`,
    nextNode: 'gregson_news'
  },
  
  gregson_news: {
    id: 'gregson_news',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (떨리는 목소리로) 모로 백작이...

그가 잠시 말을 멈춘다. 용기를 내는 듯하다.`,
    nextNode: 'gregson_missing'
  },
  
  gregson_missing: {
    id: 'gregson_missing',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (목소리를 높이며) 실종되었습니다!

순간 거실의 공기가 무겁게 가라앉는다.`,
    nextNode: 'watson_shock'
  },
  
  watson_shock: {
    id: 'watson_shock',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `[왓슨]: (깜짝 놀라며) 뭐라고?!

나는 자리에서 벌떡 일어났다.`,
    nextNode: 'gregson_detail1'
  },
  
  gregson_detail1: {
    id: 'gregson_detail1',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (빠르게 설명하며) 오늘 새벽, 하인들이 백작의 침실을 확인했습니다.

[그레그슨]: 어제 저녁 이후로 백작님을 본 사람이 아무도 없었거든요.`,
    nextNode: 'gregson_detail2'
  },
  
  gregson_detail2: {
    id: 'gregson_detail2',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (눈살을 찌푸리며) 침실은... 평범했습니다. 침대는 정돈되어 있었고, 흔적이 없었어요.

[그레그슨]: 마치 그곳에서 잠을 자지 않은 것처럼...`,
    nextNode: 'gregson_detail3'
  },
  
  gregson_detail3: {
    id: 'gregson_detail3',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (목소리가 커지며) 하지만 서재는 난장판이었습니다! 책상이 넘어져 있고, 책들이 사방에 흩어져 있었죠!

[그레그슨]: (손을 떨며) 잉크병이 깨져서... 바닥 전체가 검게 물들었습니다.`,
    nextNode: 'gregson_detail4'
  },
  
  gregson_detail4: {
    id: 'gregson_detail4',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (숨을 삼키며) 그리고 벽에는... 피로 쓴 글자가...!

그의 얼굴이 더욱 창백해진다.`,
    nextNode: 'holmes_intrigued'
  },
  
  holmes_intrigued: {
    id: 'holmes_intrigued',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    speaker: 'holmes',
    text: `[홈즈]: (앞으로 몸을 숙이며 파이프를 재떨이에 내려놓는다) 흥미롭군.

[홈즈]: (눈을 가늘게 뜨며) 피로 쓴 메시지라... 범인은 무언가를 **전달**하고 싶어했어. 단순한 살인이 아니야.`,
    nextNode: 'holmes_intrigued2'
  },
  
  holmes_intrigued2: {
    id: 'holmes_intrigued2',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    speaker: 'holmes',
    text: `[홈즈]: (날카로운 시선으로 그레그슨을 바라보며) 그게 전부인가? 다른 흔적은? 발자국, 머리카락, 천 조각, 뭐든...

그가 손가락을 세우며 기다린다.`,
    nextNode: 'gregson_no'
  },
  
  gregson_no: {
    id: 'gregson_no',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (고개를 저으며) 아닙니다... 그게... 아직 자세히 조사하지 못했습니다.

[그레그슨]: (주머니를 뒤지며) 하지만... 이걸...`,
    nextNode: 'gregson_photo'
  },
  
  gregson_photo: {
    id: 'gregson_photo',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `[그레그슨]: (사진을 꺼내며) 이걸... 보십시오.

그의 손이 심하게 떨린다.`,
    nextNode: 'gregson_photo2'
  },
  
  gregson_photo2: {
    id: 'gregson_photo2',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `그레그슨이 떨리는 손으로 사진을 꺼냈다.

그리고 조심스럽게 테이블 위에 놓았다. 사진이 테이블에 닿는 작은 소리가 거실의 정적을 깬다.`,
    nextNode: 'watson_sees_photo'
  },
  
  watson_sees_photo: {
    id: 'watson_sees_photo',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `나는 몸을 숙여 사진을 봤다.

홈즈도 의자에서 일어나 내 옆으로 다가온다.`,
    nextNode: 'watson_sees_photo2'
  },
  
  watson_sees_photo2: {
    id: 'watson_sees_photo2',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `그리고...`,
    nextNode: 'watson_sees_photo3'
  },
  
  watson_sees_photo3: {
    id: 'watson_sees_photo3',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `...!`,
    nextNode: 'watson_photo_description'
  },
  
  watson_photo_description: {
    id: 'watson_photo_description',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `서재 벽면이었다.

그곳에... 붉은 글씨가 쓰여있었다.`,
    nextNode: 'watson_blood'
  },
  
  watson_blood: {
    id: 'watson_blood',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `피로 쓴 것이 분명했다.`,
    nextNode: 'rache_reveal'
  },
  
  rache_reveal: {
    id: 'rache_reveal',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `**RACHE**`,
    nextNode: 'watson_rache_question'
  },
  
  watson_rache_question: {
    id: 'watson_rache_question',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `라헤...?`,
    nextNode: 'watson_german'
  },
  
  watson_german: {
    id: 'watson_german',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `독일어인가?`,
    nextNode: 'silence'
  },
  
  silence: {
    id: 'silence',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `침묵.`,
    nextNode: 'holmes_stands'
  },
  
  holmes_stands: {
    id: 'holmes_stands',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `홈즈가 천천히 일어섰다.`,
    nextNode: 'holmes_smile'
  },
  
  holmes_smile: {
    id: 'holmes_smile',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `그의 얼굴에 희미한 미소가 떠올랐다.`,
    nextNode: 'holmes_rache'
  },
  
  holmes_rache: {
    id: 'holmes_rache',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    text: `RACHE.`,
    nextNode: 'holmes_rache2'
  },
  
  holmes_rache2: {
    id: 'holmes_rache2',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    text: `독일어로 "복수"를 뜻하지.`,
    nextNode: 'watson_shiver'
  },
  
  watson_shiver: {
    id: 'watson_shiver',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `나는 온몸에 소름이 돋는 것을 느꼈다.`,
    choices: [
      { text: '즉시 저택으로 출발한다', nextNode: 'watson_urge_depart' },
      { text: '백작의 과거를 먼저 조사한다', nextNode: 'watson_research_order' }
    ]
  },
  
  watson_urge_depart: {
    id: 'watson_urge_depart',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `"출발하세, 홈즈." 내가 말했다.`,
    nextNode: 'holmes_agree'
  },
  
  watson_research_order: {
    id: 'watson_research_order',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    text: `"왓슨, 백작의 과거를 조사해보시오."`,
    nextNode: 'research_count'
  },
  
  research_count: {
    id: 'research_count',
    day: 0,
    timeOfDay: 'morning',
    text: `홈즈는 즉시 움직이지 않았다. 그는 언제나 그랬듯이, 충분한 정보 없이는 현장에 가지 않는다.

나는 홈즈의 방대한 자료실을 뒤졌다. 신문 스크랩, 사회면 기사, 소문들...

그리고 찾아냈다.

**1861년, 모로 백작 독일 여행 중 스캔들**

모로 백작은 독일을 여행했다. 신비주의와 연금술을 연구하기 위해서였다고 한다.

그곳에서 한 남자를 만났다. 이름은 기록되지 않았지만, 그에게는 아름다운 딸 **루시**가 있었다.

루시에게는 약혼자가 있었다. 제퍼슨 호프라는 청년.

하지만... 백작이 루시를 "구원하겠다"며 강제로 데려갔다.

**"영원한 구원 교단"**이라는 종교 단체의 이름이 희미하게 언급되어 있다.

그리고 1주일 후... 루시는 죽었다.

자세한 내용은 알 수 없었다. 모든 기록이 묘하게 소실되어 있었다.

돈의 힘일까. 아니면... 더 어두운 무언가?

"흥미롭군." 홈즈가 내 어깨 너머로 기사를 읽었다. "20년 전의 비극... 그리고 지금의 복수. 루시의 약혼자 호프가 백작을 찾고 있다는 뜻이군."

"출발하지, 왓슨. 모로 백작의 저택으로."`,
    nextNode: 'chapter1_starts'
  },
  
  holmes_agree: {
    id: 'holmes_agree',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    text: `홈즈가 고개를 끄덕였다. "동의하네, 왓슨. 이 사건은 흥미롭군."`,
    nextNode: 'watson_gear_up'
  },
  
  watson_gear_up: {
    id: 'watson_gear_up',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `나는 코트를 입고 권총을 챙겼다. 아프가니스탄에서 가져온 육군용 리볼버다. 홈즈의 사건들은 종종 위험하기 때문에, 항상 휴대하는 습관이 생겼다.`,
    nextNode: 'gregson_ready_check'
  },
  
  gregson_ready_check: {
    id: 'gregson_ready_check',
    day: 0,
    timeOfDay: 'morning',
    character: 'gregson',
    text: `"준비되셨습니까, 왓슨 박사님?" 그레그슨이 물었다.`,
    nextNode: 'watson_ready_confirm'
  },
  
  watson_ready_confirm: {
    id: 'watson_ready_confirm',
    day:0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `"준비됐네." 내가 대답했다.

홈즈는 여행용 가방에 그의 수사 도구들을 챙겼다. 돋보기, 줄자, 그리고 화학 시약들.`,
    nextNode: 'holmes_depart'
  },
  
  holmes_depart: {
    id: 'holmes_depart',
    day: 0,
    timeOfDay: 'morning',
    character: 'holmes',
    text: `자, 가세. 모로 백작의 저택으로.`,
    nextNode: 'watson_leave'
  },
  
  watson_leave: {
    id: 'watson_leave',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `나는 문을 나서며 뒤를 돌아보았다. 평화로운 아침의 거실이 보였다. 

이 평화가 얼마나 갈까? 나는 알 수 없었다.`,
    nextNode: 'chapter1_starts'
  },
  
  // 챕터 1 시작 전환점 (프롤로그 종료)
  chapter1_starts: {
    id: 'chapter1_starts',
    day: 0,
    timeOfDay: 'morning',
    character: 'watson',
    text: `우리는 마차에 올라탔다.

모로 백작의 저택으로.`,
    nextNode: 'carriage_holmes_foreshadow'
  },
  
  // ========== 🚗 마차 시퀀스 (홈즈의 예견) ==========
  carriage_holmes_foreshadow: {
    id: 'carriage_holmes_foreshadow',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'carriage',
    character: 'holmes',
    speaker: 'watson',
    text: `마차가 안개 속을 달린다.

홈즈가 창밖의 안개를 응시한다.

[홈즈]: 왓슨, 자네는 모로 백작이 왜 우리를 불렀다고 생각하나?

[홈즈]: 단순한 도난이나 유산 문제라면 런던의 흔한 경관을 불렀겠지.

[홈즈]: 하지만 그는 우리를 선택했네.

[홈즈]: 그건 이 사건이 '증거'보다 '비밀'에 가깝다는 뜻이지.`,
    choices: [
      { text: '💬 백작의 배경을 묻는다', nextNode: 'carriage_watson_asks' }
    ]
  },

  carriage_watson_asks: {
    id: 'carriage_watson_asks',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'carriage',
    character: 'holmes',
    speaker: 'watson',
    text: `[왓슨]: 백작은 이 지역의 명망 높은 자산가네.

[왓슨]: 그의 편지에는 절박함이 묻어있었어.

홈즈가 고개를 끄덕인다.`,
    choices: [
      { text: '▶️ 계속', nextNode: 'carriage_holmes_warning' }
    ]
  },

  carriage_holmes_warning: {
    id: 'carriage_holmes_warning',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'carriage',
    character: 'holmes',
    speaker: 'holmes',
    text: `[홈즈]: 절박함이라...

[홈즈]: 20년 전 루시라는 여인이 사라졌던 그 비극의 향기가 여기까지 진동하는군.

홈즈가 당신을 본다.

[홈즈]: 저택에 들어서는 순간, 사람들의 눈이 아닌...

[홈즈]: 그들이 감추려 하는 '손'을 관찰하게.

마차가 멈춘다.

**[모로 백작의 저택 도착]**`,
    choices: [
      { text: '🏛️ 저택으로 들어간다', nextNode: 'arrive_mansion' }
    ]
  },
  
  arrive_mansion: {
    id: 'arrive_mansion',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `마차는 런던 외곽의 으스스한 길을 달렸다. 안개가 점점 짙어졌다.\n\n나무들이 괴기스러운 그림자를 드리웠고, 까마귀들이 불길하게 울었다.`,
    nextNode: 'arrive_mansion_2'
  },
  
  arrive_mansion_2: {
    id: 'arrive_mansion_2',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `그리고... 저택이 나타났다.\n\n모로 백작의 저택.\n\n검은 철문, 덩굴로 뒤덮인 벽, 깨진 창문들. 마치 오래전에 버려진 유령의 집 같았다.`,
    nextNode: 'arrive_mansion_3'
  },
  
  arrive_mansion_3: {
    id: 'arrive_mansion_3',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `마차에서 내리자 차가운 바람이 불어왔다. 내 다리의 오래된 상처가 욱신거렸다.\n\n홈즈가 날카로운 눈빛으로 주변을 관찰했다. 정문의 자물쇠가 부러져 있었다. 최근의 일이었다.`,
    nextNode: 'arrive_mansion_4'
  },
  
  arrive_mansion_4: {
    id: 'arrive_mansion_4',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `왓슨, 관찰하게. 저 마차를 보게. 주인은 최소 하룻밤 이상 여기서 대기한 것 같군.`,
    nextNode: 'arrive_mansion_5'
  },
  
  arrive_mansion_5: {
    id: 'arrive_mansion_5',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `저택 앞마당에는 낡은 마차 한 대가 멈춰서 있었다. 바퀴 자국이 깊게 파여있었다.\\n\\n누군가 백작의 저택을 감시하고 있는 걸까? 아니면... 다른 이유?`,
    choices: [
      { text: '마차를 조사한다', nextNode: 'investigate_carriage' },
      { text: '홈즈에게 의견을 묻는다', nextNode: 'ask_holmes_opinion' },
      { text: '주변 환경을 먼저 살핀다', nextNode: 'observe_surroundings' },
      { text: '정문으로 바로 들어간다', nextNode: 'direct_entrance_choice' }
    ]
  },

  // ========== 🆕 홈즈에게 의견 묻기 ==========
  ask_holmes_opinion: {
    id: 'ask_holmes_opinion',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"홈즈, 어떻게 생각해?"

홈즈가 파이프를 물고 주변을 천천히 둘러본다.`,
    nextNode: 'holmes_deduction_start'
  },

  holmes_deduction_start: {
    id: 'holmes_deduction_start',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `흥미로운 현장이군, 왓슨. 이미 여러 가지가 보이기 시작해.`,
    nextNode: 'holmes_deduction_details'
  },

  holmes_deduction_details: {
    id: 'holmes_deduction_details',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `홈즈가 손가락으로 마차를 가리킨다.

[홈즈]: 저 마차 바퀴의 흙. 런던 시내의 점토와는 다르지. 더 어둡고 습해. 아마도 저택 뒷편의 정원이나 우물 근처에서 온 것 같군.

그가 시선을 저택 2층 창문으로 옮긴다.

[홈즈]: 그리고 저 창문... 하나만 커튼이 흔들리고 있어. 바람 때문일 수도 있지만...

[왓슨]: 누군가 있다는 뜻인가?

[홈즈]: 가능성은 항상 열어두어야 하네.`,
    choices: [
      { text: '홈즈의 추리를 더 듣는다', nextNode: 'holmes_more_deduction' },
      { text: '직접 조사를 시작한다', nextNode: 'watson_independent_choice' }
    ]
  },

  holmes_more_deduction: {
    id: 'holmes_more_deduction',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `자네도 알다시피, 나는 가설을 세우기 전에 충분한 데이터를 수집하는 걸 선호하네.

하지만... 몇 가지는 이미 명확해.

첫째, 백작의 실종 우발적이지 않아. 누군가 계획한 것이지.

둘째, 범인은 이 저택의 구조를 잘 알고 있어. 정문 자물쇠를 부순 방식이 거칠어 보이지만, 실제로는 매우 정교하게 계산된 행동이야.

셋째... 우리를 기다리는 사람이 있어.`,
    nextNode: 'holmes_waiting_person'
  },

  holmes_waiting_person: {
    id: 'holmes_waiting_person',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `[왓슨]: 우리를 기다린다고?

[홈즈]: 그레그슨이 우리를 부른 건 우연이 아니야. 누군가 이 사건이 해결되길 원하고 있어. 혹은... 특정한 방향으로 조사가 진행되길 바라고 있지.

그가 차가운 미소를 짓는다.

[홈즈]: 그들의 의도대로 움직일 필요는 없어. 자, 들어가보자구.`,
    choices: [
      { text: '마차를 먼저 조사한다', nextNode: 'investigate_carriage' },
      { text: '정문으로 들어간다', nextNode: 'main_entrance' },
      { text: '주변을 더 살핀다', nextNode: 'observe_surroundings' }
    ]
  },

  // ========== 🆕 주변 환경 관찰 ==========
  observe_surroundings: {
    id: 'observe_surroundings',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `나는 서두르지 않기로 했다. 홈즈의 방법론을 따라, 먼저 주변을 꼼꼼히 살펴보기로 한다.

저택은 빅토리아 시대 초기의 고딕 양식이다. 3층 규모, 검은 벽돌, 뾰족한 지붕.

정원은 오래전부터 방치된 듯하다. 잡초가 무성하고, 분수는 깨져있다.`,
    nextNode: 'observe_details'
  },

  observe_details: {
    id: 'observe_details',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `그런데... 이상하다.

정원은 황폐하지만, 저택으로 이어지는 돌길은 비교적 깨끗하다. 누군가 최근에 왕래한 흔적이 있다.

그리고 담벼락 근처... 발자국이 보인다. 여러 사람의 것 같다.

[왓슨]: (백작이 실종된 건 어젯밤이라고 했지. 그렇다면 이 발자국들은...)

홈즈가 내 옆으로 다가온다.`,
    nextNode: 'holmes_joins_observation'
  },

  holmes_joins_observation: {
    id: 'holmes_joins_observation',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `잘 봤네, 왓슨. 자네 관찰력이 점점 좋아지고 있어.

저 발자국들... 최소 세 명이야. 한 명은 여성. 구두 뒤꿈치 자국이 얕거든.`,
    choices: [
      { text: '발자국을 따라가본다', nextNode: 'follow_footprints' },
      { text: '여성이 누구일지 추측해본다', nextNode: 'speculate_woman' },
      { text: '저택 내부로 들어간다', nextNode: 'main_entrance' }
    ]
  },

  follow_footprints: {
    id: 'follow_footprints',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `우리는 발자국을 따라 기 시작했다.

흔적은 정문으로 이어지다가... 갑자기 엉뚱한 방향으로 꺾인다.

뒤뜰 쪽이다.

[왓슨]:  정문으로 가지 않았을까?

[홈즈]: 목격되고 싶지 않았기 때문이지. 혹은... 정문이 아닌 다른 입구를 알고 있었거나.`,
    nextNode: 'footprints_reveal'
  },

  footprints_reveal: {
    id: 'footprints_reveal',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `발자국은 뒤뜰로 이어진다. 하지만 더 조사하려면 저택 내부를 먼저 확인해야 할 것 같다.

[홈즈]: 일단 저택 안으로 들어가자. 발자국은 나중에 다시 확인하면 돼.`,
    choices: [
      { text: '정문으로 들어간다', nextNode: 'main_entrance' },
      { text: '마차를 먼저 조사한다', nextNode: 'investigate_carriage' }
    ]
  },

  speculate_woman: {
    id: 'speculate_woman',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `여성이라... 하인일까?

[즈]: 가능성은 있지. 하지만 하인라면 왜 담벼락 근처를 걸었을까? 정문을 당당히 사용했을 텐데.

[왓슨]: 그럼 방문객?

[홈즈]: 혹은 목격자. 아니면... 공범.

홈즈가 의미심장하게 미소 짓는다.

[홈즈]: 추측만으로는 부족해. 증거를 찾아보자고.`,
    choices: [
      { text: '발자국을 더 따라간다', nextNode: 'follow_footprints' },
      { text: '저택으로 들어간다', nextNode: 'main_entrance' }
    ]
  },

  // ========== 🆕 왓슨 독립 행동 ==========
  watson_independent_choice: {
    id: 'watson_independent_choice',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"홈즈, 나는 직접 조사를 시작해보겠네."

홈즈가 놀란 표정으로 나를 본다.

[홈즈]: 오? 자네가 먼저 움직이겠다고? 흥미롭군.

[왓슨]: 자네 말대로, 데이터 수집이 먼저니까.

홈즈가 껄껄 웃는다.

[홈즈]: 좋아! 자네 직감을 믿어보게. 어디부터 시작할 건가?`,
    choices: [
      { text: '마차를 조사한다', nextNode: 'watson_investigates_carriage' },
      { text: '저택 외벽을 살핀다', nextNode: 'watson_checks_walls' },
      { text: '정문 자물쇠를 자세히 본다', nextNode: 'watson_checks_lock' }
    ]
  },

  watson_investigates_carriage: {
    id: 'watson_investigates_carriage',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `나는 마차로 다가갔다.

낡은 4인승 마차. 문은 잠기지 않았다.

안을 들여다보니... 좌석에 담요가 있다. 누군가 이 마차에서 잤던 것 같다.

[왓슨]: 홈즈, 이거 봐. 누군가 여기서 대기했어.

홈즈가 담요를 집어든다.

[홈즈]: 마차꾼의 것이야. 냄새가... 말과 가죽 냄새. 그리고... 담배.`,
    choices: [
      { text: '마차 주인을 찾는다', nextNode: 'ask_hope_name' },
      { text: '마차 주변을 더 조사한다', nextNode: 'search_carriage' },
      { text: '저택으로 바로 들어간다', nextNode: 'main_entrance' }
    ]
  },

  ask_hope_name: {
    id: 'ask_hope_name',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"홈즈, 이 마차 주인은 누구야?"

홈즈가 고개를 끄덕인다.

[홈즈]: 그건 알 수 없어. 하지만 담배 냄새는 말과 가죽 냄새가 섞여있어. 아마도 말을 타고 다니는 사람일 거야.

[왓슨]: 그럼 이 사람이 백작의 실종과 관련이 있을까?

[홈즈]: 가능성은 있어. 하지만 더 많은 증거가 필요해. 자, 저택으로 들어가보자구."`,
    nextNode: 'main_entrance'
  },

  search_carriage: {
    id: 'search_carriage',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `나는 마차 주변을 더 살펴보기로 했다.

바퀴 밑의 흙이 단단하게 굳어 있었다. 최소 하룻밤 이상 여기서 대기한 것 같았다.

그리고 담배꽁초가 여러 개 보였다. 마차꾼이 흡연자였다는 걸 알 수 있었다.

[왓슨]: 누군가 이 마차를 사용했어. 그리고 백작의 실종과 관련이 있을지도 모른다.

홈즈가 고개를 끄덕인다.

[홈즈]: 자네가 찾은 단서는 중요해. 자, 저택으로 들어가보자구."`,
    nextNode: 'main_entrance'
  },

  watson_checks_walls: {
    id: 'watson_checks_walls',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `나는 저택 외벽을 천천히 걸으며 관찰했다.

1층 창문들은 모두 굳게 닫혀있다. 하지만 하나... 부엌으로 보이는 창문이 살짝 열려있다.

[왓슨]: (침입로로 사용됐을까?)

2층 창문 중 하나에 커튼이 펄럭이고 있다. 바람이 불어오는 방향과는 반대다.

[왓슨]: (내부에서 누군가 움직였나?)`,
    nextNode: 'watson_wall_discovery'
  },

  watson_wall_discovery: {
    id: 'watson_wall_discovery',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `그리고... 벽에 긁힌 자국이 있다.

최근에 생긴 것 같다. 뭔가 무거운 물건을 끌고 간 흔적처럼 보인다.

자국은 뒤뜰 쪽으로 이어진다.

[홈즈]: 잘 찾았어, 왓슨. 뭔가 운반했던 것 같군. 시체...일 수도 있고.`,
    choices: [
      { text: '뒤뜰을 먼저 조사하고 싶다', nextNode: 'suggest_backyard_first' },
      { text: '저택 내부로 들어간다', nextNode: 'main_entrance' }
    ]
  },

  suggest_backyard_first: {
    id: 'suggest_backyard_first',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"홈즈, 뒤뜰을 먼저 조사하는 게 어떨까?"

[홈즈]: 흠... 논리적인 제안이야. 흔적이 신선할수록 단서도 많지.

하지만 내부를 먼저 확인하는 것도 중요해. 범행 현장을 보지 않고는 전체 그림을 그릴 수 없거든.

[왓슨]: 그럼 어떻게 하지?

[홈즈]: 자네가 결정하게. 자네 직감을 믿어봐.`,
    choices: [
      { text: '직감을 따라 뒤뜰로 간다', nextNode: 'back_entrance' },
      { text: '홈즈 말을 듣고 내부로 간다', nextNode: 'main_entrance' }
    ]
  },

  watson_checks_lock: {
    id: 'watson_checks_lock',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `나는 정문의 부러진 자물쇠를 자세히 살폈다.

겉보기엔 폭력적으로 부숴진 것 같지만... 자세히 보니 이상하다.

자물쇠 내부의 핀이 정교하게 조작된 흔적이 있다.

[왓슨]: (이건 단순한 폭력이 아니야. 전문가의 솜씨다.)

홈즈가 내 어깨 너머로 고개를 들이민다.`,
    nextNode: 'holmes_lock_analysis'
  },

  holmes_lock_analysis: {
    id: 'holmes_lock_analysis',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `예리하군, 왓슨! 바로 그거야!

이 자물쇠는 부숴진 게 아니라 **열린** 거야. 그리고 부숴진 것처럼 위장한 거지.

범인은 자물쇠를 여는 기술이 있었어. 그리고 그걸 숨기고 싶어했지.

[왓슨]: 왜 숨기려고 했을까?

[홈즈]: 내부자가 아니라는 걸 증명하기 위해서겠지. "외부 침입"처럼 보이게 하려는 거야.

그가 미소 짓는다.

[홈즈]: 하지만 우리는 이미 알아챘어. 범인은 이 저택에 대해 잘 알고 있다는 걸.`,
    choices: [
      { text: '저택으로 들어간다', nextNode: 'main_entrance' },
      { text: '마차를 조사한다', nextNode: 'investigate_carriage' }
    ]
  },

  // ========== 🆕 직접 입장 선택 (도덕적 딜레마) ==========
  direct_entrance_choice: {
    id: 'direct_entrance_choice',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"홈즈, 시간이 아까워. 바로 들어가자."

홈즈가 잠시 멈춰 선다.

[홈즈]: 서두르는 건 실수를 부르지, 왓슨.

[왓슨]: 하지만 백작의 목숨이 달린 일이야!

[홈즈]: 이미 늦었을 수도 있어. 그렇다면 더더욱 신중해야 하지.

그가 나를 똑바로 쳐다본다.

[홈즈]: 자네는 어떻게 생각하나? 신속함과 신중함 중 뭐가 더 중요할까?`,
    choices: [
      { text: '신속함이 우선이다 (바로 들어간다)', nextNode: 'rush_entrance' },
      { text: '홈즈 말이 맞다 (주변을 먼저 조사한다)', nextNode: 'careful_investigation' }
    ]
  },

  rush_entrance: {
    id: 'rush_entrance',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"아니, 나는 서둘러야 한다고 생각해. 만약 백작이 아직 살아있다면..."

홈즈가 한숨을 쉰다.

[홈즈]: 자네의 마음은 이해하지만, 감정은 때로 판단을 흐리게 하지.

그래도 홈즈는 따라온다.

[홈즈]: 좋아. 들어가보자고. 하지만 자네가 놓칠 수 있는 것들을 내가 챙기겠네.

우리는 정문을 밀고 들어간다.`,
    nextNode: 'main_entrance'
  },

  careful_investigation: {
    id: 'careful_investigation',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `"...자네 말이 맞아, 홈즈. 서두르다가 중요한 걸 놓칠 수 있지."

홈즈가 만족스럽게 고개를 끄덕인다.

[홈즈]: 현명한 판단이야, 왓슨. 자, 그럼 체계적으로 조사해보자구.`,
    choices: [
      { text: '마차를 조사한다', nextNode: 'investigate_carriage' },
      { text: '주변 환경을 관찰한다', nextNode: 'observe_surroundings' }
    ]
  },

  // 기존 investigate_carriage 노드로 이어짐
  investigate_carriage: {
    id: 'investigate_carriage',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `나는 마차로 다가갔다.

낡은 4인승 마차. 문은 잠기지 않았다.

안을 들여다보니... 좌석에 담요가 있다. 누군가 이 마차에서 잤던 것 같다.

[왓슨]: 홈즈, 이거 봐. 누군가 여기서 대기했어.

홈즈가 담요를 집어든다.

[홈즈]: 마차꾼의 것이야. 냄새가... 말과 가죽 냄새. 그리고... 담배.`,
    choices: [
      { text: '마차 주인을 찾는다', nextNode: 'ask_hope_name' },
      { text: '마차 주변을 더 조사한다', nextNode: 'search_carriage' },
      { text: '저택으로 바로 들어간다', nextNode: 'main_entrance' }
    ]
  }
};