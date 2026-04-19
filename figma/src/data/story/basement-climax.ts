/**
 * 🎭 지하실 클라이맥스: "진실의 무게"
 * 
 * 제미나이 제안 시나리오:
 * 왓슨과 홈즈가 지하실에 진입하자, 오랜 원한의 끝에 서 있는 호프와 백작,
 * 그리고 그 사이에서 얼어붙은 엘렌을 발견합니다.
 * 
 * 핵심 연결:
 * - find_basement → basement_scene_with_ellen (엘렌이 함께 있는 버전)
 * - ask_count_truth_basement → count_full_confession_with_ellen
 * - count_full_confession_with_ellen → hope_mercy_route (진엔딩 루트)
 */

import { StoryNode } from '../../types/story';

export const basementClimaxNodes: Record<string, StoryNode> = {

  // ═══════════════════════════════════════════════════════
  // 🎭 1. 침묵을 깨는 진실 - 엘렌이 함께 있는 지하실 장면
  // ═══════════════════════════════════════════════════════

  basement_scene_with_ellen: {
    id: 'basement_scene_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `지하실에 들어서자... 숨이 멎는다.

작은 돌방. 벽에는 커다란 초상화가 걸려있다.

젊은 여성... 루시의 얼굴이다.

**"루시 페리에 (1839-1861)"**

그 앞에... 모로 백작이 의자에 묶여있다.

키 큰 남자 제퍼슨 호프가 백작 옆에 서 있다.

그리고...

엘렌이 그 사이에서 얼어붙어 있다.

그녀의 얼굴은... 공포와 혼란으로 일그러져 있다.

"기다리십시오!" 당신이 외친다.

호프가 놀라 뒤를 돌아본다. 그의 얼굴은... 눈물범벅이다.

홈즈가 조심스럽게 다가간다.`,
    choices: [
      { text: '💬 엘렌을 안심시킨다', nextNode: 'calm_ellen_basement' },
      { text: '🔍 호프에게 설명을 요구한다', nextNode: 'ask_hope_explain_basement' },
      { text: '⚖️ 백작에게 진실을 묻는다', nextNode: 'ask_count_truth_with_ellen' }
    ]
  },

  calm_ellen_basement: {
    id: 'calm_ellen_basement',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"엘렌, 괜찮습니다."

당신이 엘렌에게 다가간다.

그녀가 당신을 본다. 눈물이 흐른다.

[엘렌]: "박사님... 저... 저는..."

[엘렌]: "루시는 누구예요? 왜 모두가..."

당신이 그녀의 어깨에 손을 얹는다.

[왓슨]: "천천히 설명드리겠습니다. 우선 진정하세요."

호프가 엘렌을 본다. 그의 눈에 복잡한 감정이 교차한다.`,
    choices: [
      { text: '호프에게 설명을 요구한다', nextNode: 'ask_hope_explain_basement' },
      { text: '백작에게 진실을 묻는다', nextNode: 'ask_count_truth_with_ellen' }
    ]
  },

  ask_hope_explain_basement: {
    id: 'ask_hope_explain_basement',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'hope',
    text: `호프가 억눌린 목소리로 말한다.

[제퍼슨 호프]: "백작, 네놈이 숨겨온 가장 추악한 비밀이 이 아이였나?"

[제퍼슨 호프]: "루시를 빼앗고도 모자라..."

[제퍼슨 호프]: "그녀의 핏줄까지 네 인형으로 삼으려 했다니."

엘렌이 떨린다.

[엘렌]: "무슨... 말씀을 하시는 거죠?"

[엘렌]: "루시는 누구고, 왜 저를 그렇게 바라보시나요?"

백작이 차갑게 웃는다.

[모로 백작]: "엘렌, 넌 내가 창조한 백작가의 영애다."

[모로 백작]: "과거의 망령이 하는 말에 귀 기울이지 마라."

[모로 백작]: "넌 오직 나의 딸로만 존재해야 해."

엘렌의 얼굴이 창백해진다.`,
    choices: [
      { text: '💔 엘렌에게 진실을 알려준다', nextNode: 'reveal_truth_to_ellen_basement' },
      { text: '⚖️ 백작에게 자백을 요구한다', nextNode: 'ask_count_truth_with_ellen' },
      { text: '🌹 루시의 편지를 보여준다', nextNode: 'show_lucy_letter_basement', requiredItem: 'lucy_letter' },
      { text: '🌟 엘렌의 각성을 유도한다', nextNode: 'ellen_confusion_phase' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎭 2. 운명을 결정짓는 선택 - 진엔딩 루트
  // ═══════════════════════════════════════════════════════

  show_lucy_letter_basement: {
    id: 'show_lucy_letter_basement',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `당신이 품 안에서 루시의 편지를 꺼낸다.

"호프, 멈추십시오."

"이 편지를 보십시오."

호프가 당신을 본다.

[왓슨]: "루시가 진정으로 원했던 건..."

[왓슨]: "피의 복수가 아니라, 이 아이의 평온이었습니다."

당신이 편지를 호프에게 건넨다.

호프가 떨리는 손으로 편지를 받아든다.

그가 편지를 읽기 시작한다...

**"제퍼슨에게... 부디 우리 딸을 지켜주세요..."**

호프의 눈에 눈물이 맺힌다.`,
    choices: [
      { text: '호프의 반응을 기다린다', nextNode: 'hope_reads_lucy_letter' }
    ]
  },

  hope_reads_lucy_letter: {
    id: 'hope_reads_lucy_letter',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'hope',
    text: `호프가 편지를 읽으며 손을 떤다.

그가 엘렌을 본다.

루시를 닮은 얼굴... 루시의 눈빛...

[제퍼슨 호프]: "...루시."

그의 목소리가 떨린다.

[제퍼슨 호프]: "당신을 닮은 이 아이의 눈에..."

[제퍼슨 호프]: "어둠을 심어줄 수는 없겠군."

호프가 백작을 본다.

[제퍼슨 호프]: "백작..."

[제퍼슨 호프]: "나는... 당신을 증오했소."

[제퍼슨 호프]: "하지만 엘렌 때문에..."

[제퍼슨 호프]: "복수를 멈출 수밖에 없소."

호프가 백작의 밧줄을 푼다.

백작이 일어선다. 몸이 약해 보인다.`,
    choices: [
      { text: '💬 "올바른 선택입니다"', nextNode: 'hope_mercy_route' },
      { text: '🌹 엘렌을 호프에게 데려간다', nextNode: 'ellen_meets_hope_basement' },
      { text: '⚖️ 백작에게 자백을 요구한다', nextNode: 'count_full_confession_with_ellen' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎭 3. 호프의 자비 루트 (진엔딩)
  // ═══════════════════════════════════════════════════════

  hope_mercy_route: {
    id: 'hope_mercy_route',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"올바른 선택입니다, 호프."

당신이 말한다.

호프가 엘렌을 본다.

[제퍼슨 호프]: "엘렌..."

[제퍼슨 호프]: "나는 네 어머니를 사랑했던 사람이다."

[제퍼슨 호프]: "루시... 그녀는 너를 낳고..."

그가 말을 잇지 못한다.

엘렌이 조심스럽게 다가간다.

[엘렌]: "어머니를... 사랑하셨나요?"

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "세상 무엇보다."

엘렌의 눈에 눈물이 고인다.

[엘렌]: "어머니는... 저를 사랑했나요?"

호프가 루시의 편지를 엘렌에게 건넨다.

[제퍼슨 호프]: "직접 읽어보거라."

엘렌이 편지를 읽는다.

**"내 사랑하는 딸에게..."**

그녀가 울음을 터뜨린다.

홈즈가 조용히 말한다.

[홈즈]: "아름다운 순간이군요..."`,
    choices: [
      { text: '백작에게 진실을 묻는다', nextNode: 'count_final_confession' },
      { text: '세 사람을 화해시킨다', nextNode: 'reconcile_all_three' }
    ]
  },

  ellen_meets_hope_basement: {
    id: 'ellen_meets_hope_basement',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'ellen',
    text: `당신이 엘렌을 호프에게 데려간다.

호프가 엘렌을 본다.

그의 눈에 루시가 보인다.

[제퍼슨 호프]: "...루시."

엘렌이 떨리며 묻는다.

[엘렌]: "당신은... 누구세요?"

호프가 무릎을 꿇는다.

[제퍼슨 호프]: "나는..."

[제퍼슨 호프]: "네 어머니를 사랑했던... 남자다."

엘렌의 눈이 커진다.

[엘렌]: "어머니...?"

당신이 루시의 편지를 꺼낸다.

[왓슨]: "이것을 읽어보세요, 엘렌."

엘렌이 편지를 받아든다.`,
    choices: [
      { text: '엘렌이 편지를 읽는다', nextNode: 'ellen_reads_lucy_letter' }
    ]
  },

  ellen_reads_lucy_letter: {
    id: 'ellen_reads_lucy_letter',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'ellen',
    text: `엘렌이 편지를 읽기 시작한다.

**"내 사랑하는 딸 엘렌에게..."**

**"나는 곧 떠날 것 같구나..."**

**"하지만 네가 행복하게 자라길..."**

**"제퍼슨, 부디 우리 딸을 지켜주세요..."**

엘렌의 손이 떨린다.

[엘렌]: "어머니가... 저를..."

눈물이 흐른다.

[엘렌]: "사랑했구나..."

호프가 일어선다.

[제퍼슨 호프]: "루시는 너를 세상 무엇보다 사랑했다."

[제퍼슨 호프]: "그리고 나도... 네 어머니를..."

엘렌이 호프를 안는다.

20년의 시간이 녹아내린다.`,
    choices: [
      { text: '감동적인 재회를 지켜본다', nextNode: 'hope_mercy_route' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎭 4. 백작의 최종 자백
  // ═══════════════════════════════════════════════════════

  ask_count_truth_with_ellen: {
    id: 'ask_count_truth_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    speaker: 'watson',
    text: `"백작, 진실을 말씀해주십시오."

"엘렌 앞에서."

백작이 당신을 본다.

그가 엘렌을 본다.

[모로 백작]: "...엘렌."

엘렌이 백작을 본다. 두려움과 혼란이 교차한다.

[엘렌]: "아버지... 진실이 뭐예요?"

백작이 한숨을 쉰다.

[모로 백작]: "나는... 네 친아버지가 아니다."

엘렌이 얼어붙는다.

[모로 백작]: "20년 전... 루시가 죽었을 때..."

[모로 백작]: "그녀가 마지막으로 부탁했다..."

[모로 백작]: "\"엘렌을... 부탁해요...\""

백작의 눈에 눈물이 맺힌다.`,
    choices: [
      { text: '더 자세히 듣는다', nextNode: 'count_full_confession_with_ellen' }
    ]
  },

  count_full_confession_with_ellen: {
    id: 'count_full_confession_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `백작이 모든 것을 말한다.

[모로 백작]: "1861년... 나는 교단의 설교자였다..."

[모로 백작]: "\"영원한 구원 교단\"..."

[모로 백작]: "루시를 \"영원한 신부\"로 만들려 했다..."

엘렌이 숨을 죽인다.

[모로 백작]: "하지만 의식이 실패했고..."

[모로 백작]: "루시는... 죽었다..."

백작이 무너진다.

[모로 백작]: "나는 미쳤었다... 광기에 빠져있었다..."

[모로 백작]: "하지만 루시가 마지막 순간..."

[모로 백작]: "네 생명을 구했다... 엘렌..."

[모로 백작]: "\"엘렌을 지켜주세요...\"라고..."

백작이 울음을 터뜨린다.

[모로 백작]: "나는... 20년간 속죄했다..."

[모로 백작]: "너를 키우면서... 루시에게 용서를 빌었다..."

엘렌이 백작을 본다. 복잡한 감정이 교차한다.`,
    choices: [
      { text: '🌹 "루시의 뜻을 이루셨습니다"', nextNode: 'count_redemption' },
      { text: '⚖️ "하지만 죗값을 치러야 합니다"', nextNode: 'count_judgment' },
      { text: '💬 엘렌의 반응을 기다린다', nextNode: 'ellen_reaction_to_confession' },
      { text: '🌟 루시의 편지로 호프를 설득한다', nextNode: 'hope_mercy_route', requiredItem: 'lucy_letter' }
    ]
  },

  reveal_truth_to_ellen_basement: {
    id: 'reveal_truth_to_ellen_basement',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `당신이 엘렌에게 조심스럽게 말한다.

"엘렌..."

"당신은 루시 페리에의 딸입니다."

엘렌이 얼어붙는다.

[엘렌]: "뭐라고...요?"

당신이 루시 초상화를 가리킨다.

[왓슨]: "저분이... 당신의 어머니입니다."

엘렌이 초상화를 본다.

그녀와 똑같은 얼굴...

[엘렌]: "아니... 저는..."

호프가 다가온다.

[제퍼슨 호프]: "네 어머니... 루시는..."

[제퍼슨 호프]: "너를 낳고 죽었다..."

[제퍼슨 호프]: "그리고 나는... 네 어머니를 사랑했던 남자다."

엘렌이 주저앉는다.

모든 것이 무너진다.`,
    choices: [
      { text: '엘렌을 위로한다', nextNode: 'comfort_ellen_after_truth' },
      { text: '루시의 편지를 보여준다', nextNode: 'show_lucy_letter_to_ellen', requiredItem: 'lucy_letter' }
    ]
  },

  comfort_ellen_after_truth: {
    id: 'comfort_ellen_after_truth',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `당신이 엘렌의 어깨에 손을 얹는다.

"괜찮습니다, 엘렌."

"진실은... 때로 고통스럽습니다."

"하지만 알아야 합니다."

엘렌이 당신을 본다.

[엘렌]: "제 인생이... 모두 거짓이었나요?"

백작이 고개를 젓는다.

[모로 백작]: "아니다, 엘렌..."

[모로 백작]: "내가 너를 사랑한 건... 진실이다..."

엘렌이 울음을 터뜨린다.`,
    choices: [
      { text: '백작과 호프를 화해시킨다', nextNode: 'reconcile_all_three' },
      { text: '루시의 편지를 보여준다', nextNode: 'show_lucy_letter_to_ellen', requiredItem: 'lucy_letter' }
    ]
  },

  show_lucy_letter_to_ellen: {
    id: 'show_lucy_letter_to_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `당신이 루시의 편지를 엘렌에게 건넨다.

"이것을 읽어보세요."

"당신 어머니의 마지막 편지입니다."

엘렌이 떨리는 손으로 편지를 받는다.

그녀가 읽기 시작한다.

**"내 사랑하는 딸 엘렌에게..."**

엘렌의 눈에 눈물이 고인다.`,
    choices: [
      { text: '엘렌이 편지를 읽는다', nextNode: 'ellen_reads_lucy_letter' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎭 5. 화해와 심판
  // ═══════════════════════════════════════════════════════

  reconcile_all_three: {
    id: 'reconcile_all_three',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `당신이 세 사람을 본다.

백작... 호프... 엘렌...

20년의 ��극이 이들을 얽매고 있다.

"여러분..."

당신이 말한다.

"루시는 복수를 원하지 않았습니다."

"그녀가 원한 건... 엘렌의 행복이었습니다."

백작이 고개를 끄덕인다.

[모로 백작]: "...그렇소."

호프가 엘렌을 본다.

[제퍼슨 호프]: "...미안하다, 엘렌."

[제퍼슨 호프]: "네게 상처를 주려던 게 아니었다."

엘렌이 호프를 본다.

[엘렌]: "...어머니를 사랑했다면..."

[엘렌]: "그걸로 충분해요."

그녀가 백작을 본다.

[엘렌]: "아버지... 백작님도..."

[엘렌]: "저를 키워주셔서... 감사해요."

백작이 눈물을 흘린다.

호프가 백작에게 손을 내민다.

[제퍼슨 호프]: "...백작."

백작이 호프의 손을 잡는다.

20년의 원한이... 녹는다.`,
    choices: [
      { text: '🌟 새벽의 항해', nextNode: 'true_ending_reconciliation' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎭 6. 진엔딩: 용서와 화해
  // ═══════════════════════════════════════════════════════

  true_ending_reconciliation: {
    id: 'true_ending_reconciliation',
    day: 2,
    timeOfDay: 'morning',
    location: 'mansion',
    speaker: 'narrator',
    isEnding: true,
    text: `[다음 날 아침]

모로 백작의 저택은 평화로웠다.

지하실에서 모든 진실이 밝혀졌다.

백작은 자수했다. 과거의 죄악에 대한 책임을 받아들였다.

하지만 엘렌과 호프는... 그를 용서했다.

---

[저택 정원]

엘렌이 루시의 묘 앞에 서 있다.

호프가 그녀 옆에 있다.

[엘렌]: "어머니... 저는 이제... 진실을 알았어요."

[엘렌]: "그리고... 용서했어요."

호프가 엘렌의 어깨에 손을 얹는다.

[제퍼슨 호프]: "루시... 당신의 딸은..."

[제퍼슨 호프]: "당신보다 훨씬 강하오."

멀리서 백작이 경찰차에 오른다.

그가 엘렌을 본다. 그리고 미소 짓는다.

[모로 백작]: "...고맙다, 엘렌."

---

[왓슨의 수기]

"1881년 11월, 모로 백작의 저택 사건은 이렇게 끝났다.

백작은 20년 전의 죄로 재판을 받았다. 하지만 엘렌을 키운 공로로 형량이 감경되었다.

제퍼슨 호프는 엘렌의 보호자가 되었다. 루시가 원했던 대로.

엘렌은... 두 아버지 사이에서 자신의 길을 찾았다.

복수가 아닌 용서를.
증오가 아닌 화해를.

이것이 진정한 구원이었다."

---

**TRUE ENDING**
**"진실의 무게"**

루시의 유언은 이루어졌다.
엘렌은 사랑 속에서 자랐고,
용서는 모든 이를 자유롭게 했다.

[THE END]`,
    choices: []
  },

  count_redemption: {
    id: 'count_redemption',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"루시의 뜻을 이루셨습니다, 백작."

당신이 말한다.

"엘렌을 훌륭하게 키우셨습니다."

백작이 당신을 본다.

[모로 백작]: "...감사합니다, 박사님."

엘렌이 백작에게 다가간다.

[엘렌]: "아버지..."

[엘렌]: "백작님이 저를 사랑했다는 걸... 알아요."

백작이 엘렌을 안는다.

[모로 백작]: "엘렌... 미안하다..."

부녀가 포옹한다.

호프가 그 모습을 본다.

[제퍼슨 호프]: "...루시, 당신의 딸은 행복하게 자랐소."

홈즈가 조용히 말한다.

[홈즈]: "속죄는... 완성되었군요."`,
    choices: [
      { text: '화해를 지켜본다', nextNode: 'reconcile_all_three' }
    ]
  },

  count_judgment: {
    id: 'count_judgment',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"하지만 죗값을 치러야 합니다."

당신이 엄숙하게 말한다.

"루시의 죽음... 그리고 교단의 죄악..."

"법의 심판을 받으셔야 합니다."

백작이 고개를 끄덕인다.

[모로 백작]: "...그렇소."

[모로 백작]: "나는 도망치지 않겠소."

엘렌이 백작을 본다.

[엘렌]: "아버지..."

백작이 엘렌을 본다.

[모로 백작]: "엘렌... 나를 용서하지 않아도 된다..."

[모로 백작]: "다만... 행복하게 살아다오..."

엘렌이 눈물을 흘린다.

홈즈가 말한다.

[홈즈]: "스코틀랜드 야드에 연락하겠습니다."`,
    choices: [
      { text: '⚖️ 법의 심판 엔딩', nextNode: 'ending_justice' }
    ]
  },

  ellen_reaction_to_confession: {
    id: 'ellen_reaction_to_confession',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'ellen',
    text: `엘렌이 백작을 본다.

긴 침묵이 흐른다.

그녀가 입을 연다.

[엘렌]: "아버지..."

[엘렌]: "...백작님."

백작이 엘렌을 본다.

[엘렌]: "저는... 혼란스러워요."

[엘렌]: "제 인생이... 거짓인 것 같아요."

백작이 고개를 숙인다.

[엘렌]: "하지만..."

엘렌이 눈물을 닦는다.

[엘렌]: "백작님이 저를 사랑했다는 건... 알아요."

[엘렌]: "20년간... 속죄하셨다는 것도..."

호프가 엘렌을 본다.

[제퍼슨 호프]: "엘렌..."

엘렌이 호프를 본다.

[엘렌]: "당신도... 어머니를 사랑했죠?"

호프가 고개를 끄덕인다.

[엘렌]: "그럼... 이제... 어떻게 해야 하죠?"`,
    choices: [
      { text: '💬 "용서하십시오"', nextNode: 'suggest_forgiveness' },
      { text: '⚖️ "심판을 받아야 합니다"', nextNode: 'suggest_judgment' },
      { text: '🌹 "엘렌의 선택입니다"', nextNode: 'ellen_chooses' }
    ]
  },

  suggest_forgiveness: {
    id: 'suggest_forgiveness',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"용서하십시오, 엘렌."

당신이 조용히 말한다.

"백작은 20년간 속죄했습니다."

"그리고 당신을 사랑했습니다."

"루시도... 그걸 원했을 겁니다."

엘렌이 당신을 본다.

[엘렌]: "...정말요?"

당신이 루시의 편지를 가리킨다.

[왓슨]: "루시의 편지에... 있습니다."

[왓슨]: "\"엘렌을 지켜주세요\"라고..."

엘렌이 백작을 본다.

[엘렌]: "...아버지."

백작이 놀란다.

[엘렌]: "용서할게요."

백작이 무너진다.

[모로 백작]: "엘렌... 고맙다..."`,
    choices: [
      { text: '화해를 지켜본다', nextNode: 'reconcile_all_three' }
    ]
  },

  suggest_judgment: {
    id: 'suggest_judgment',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"심판을 받아야 합니다."

당신이 엄숙하게 말한다.

"백작의 죄는... 가볍지 않습니다."

"루시의 죽음... 교단의 죄악..."

"법의 심판을 받아야 합니다."

백작이 고개를 끄덕인다.

[모로 백작]: "...동의하오."

엘렌이 눈물을 흘린다.

[엘렌]: "하지만... 아버지는..."

호프가 엘렌의 어깨에 손을 얹는다.

[제퍼슨 호프]: "정의는... 때로 고통스럽다, 엘렌."`,
    choices: [
      { text: '⚖️ 법의 심판 엔딩', nextNode: 'ending_justice' }
    ]
  },

  ellen_chooses: {
    id: 'ellen_chooses',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'ellen',
    text: `"엘렌의 선택입니다."

당신이 말한다.

"당신이 결정하세요."

엘렌이 백작을 본다. 그리고 호프를 본다.

긴 침묵이 흐른다.

그녀가 결정한다.

[엘렌]: "저는..."

[엘렌]: "아버지를... 백작님을 용서하고 싶어요."

백작이 놀란다.

[엘렌]: "하지만... 법의 심판도 받으셔야 해요."

[엘렌]: "그게... 옳은 일이니까요."

홈즈가 고개를 끄덕인다.

[홈즈]: "현명한 선택입니다, 엘렌."

호프가 엘렌을 본다.

[제퍼슨 호프]: "...루시를 닮���구나."`,
    choices: [
      { text: '⚖️ 법의 심판 엔딩', nextNode: 'ending_justice' }
    ]
  },

  count_final_confession: {
    id: 'count_final_confession',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `백작이 모든 것을 말한다.

[모로 백작]: "1861년... 나는 광신도였다..."

[모로 백작]: "\"영원한 구원 교단\"의 설교자..."

[모로 백작]: "루시를 \"영원한 신부\"로 만들려 했다..."

[모로 백작]: "하지만... 의식이 실패했고..."

[모로 백작]: "루시는 죽었다..."

백작이 루시 초상화를 본다.

[모로 백작]: "그 순간... 깨달았다..."

[모로 백작]: "내가 얼마나 미쳤었는지..."

[모로 백작]: "20년간... 이곳에서..."

[모로 백작]: "루시에게 용서를 빌었다..."

[모로 백작]: "그리고 엘렌을 키우며... 속죄했다..."

홈즈가 말한다.

[홈즈]: "속죄는... 완성되었습니까?"

백작이 고개를 끄덕인다.

[모로 백작]: "...아니요."

[모로 백작]: "속죄는 결코 끝나지 않는다..."`,
    choices: [
      { text: '백작을 용서한다', nextNode: 'count_redemption' },
      { text: '법의 심판을 요구한다', nextNode: 'count_judgment' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎭 6. 진엔딩: 용서와 화해
  // ═══════════════════════════════════════════════════════

  true_ending_reconciliation: {
    id: 'true_ending_reconciliation',
    day: 2,
    timeOfDay: 'morning',
    location: 'mansion',
    speaker: 'narrator',
    isEnding: true,
    text: `[다음 날 아침]

모로 백작의 저택은 평화로웠다.

지하실에서 모든 진실이 밝혀졌다.

백작은 자수했다. 과거의 죄악에 대한 책임을 받아들였다.

하지만 엘렌과 호프는... 그를 용서했다.

---

[저택 정원]

엘렌이 루시의 묘 앞에 서 있다.

호프가 그녀 옆에 있다.

[엘렌]: "어머니... 저는 이제... 진실을 알았어요."

[엘렌]: "그리고... 용서했어요."

호프가 엘렌의 어깨에 손을 얹는다.

[제퍼슨 호프]: "루시... 당신의 딸은..."

[제퍼슨 호프]: "당신보다 훨씬 강하오."

멀리서 백작이 경찰차에 오른다.

그가 엘렌을 본다. 그리고 미소 짓는다.

[모로 백작]: "...고맙다, 엘렌."

---

[왓슨의 수기]

"1881년 11월, 모로 백작의 저택 사건은 이렇게 끝났다.

백작은 20년 전의 죄로 재판을 받았다. 하지만 엘렌을 키운 공로로 형량이 감경되었다.

제퍼슨 호프는 엘렌의 보호자가 되었다. 루시가 원했던 대로.

엘렌은... 두 아버지 사이에서 자신의 길을 찾았다.

복수가 아닌 용서를.
증오가 아닌 화해를.

이것이 진정한 구원이었다."

---

**TRUE ENDING**
**"진실의 무게"**

루시의 유언은 이루어졌다.
엘렌은 사랑 속에서 자랐고,
용서는 모든 이를 자유롭게 했다.

[THE END]`,
    choices: []
  }

};