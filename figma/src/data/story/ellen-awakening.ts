/**
 * 🌟 엘렌의 각성 (The Awakening)
 * 
 * 엘렌이 백작의 거짓된 부성애를 깨고, 
 * 루시의 딸로서 정체성을 회복하는 3단계 심리 변화
 * 
 * 1단계: 인지부조화 (Confusion) - ellen_confusion_phase
 * 2단계: 진실의 폭로 (Exposure) - ellen_exposure_phase  
 * 3단계: 자아의 각성 (Awakening) - ellen_awakening_phase
 */

import { StoryNode } from '../../types/story';

export const ellenAwakeningNodes: Record<string, StoryNode> = {

  // ═══════════════════════════════════════════════════════
  // 🎭 1단계: 인지부조화 (Confusion)
  // ═══════════════════════════════════════════════════════

  ellen_confusion_phase: {
    id: 'ellen_confusion_phase',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `백작이 엘렌을 본다.

[모로 백작]: "엘렌, 저들의 말을 듣지 마라."

[모로 백작]: "너는 내 자랑스러운 딸이자..."

[모로 백작]: "이 저택의 후계자다."

백작의 목소리에 권위가 섞여있다.

엘렌이 손에 쥔 로켓을 본다.

그녀가 백작을 본다.

[엘렌]: "하지만..."

[엘렌]: "이 편지와 로켓은 거짓말을 하지 않아요."

엘렌의 목소리가 떨린다.

[엘렌]: "제 기억 속의 자장가는..."

[엘렌]: "당신의 목소리가 아니었어요."

백작의 얼굴이 굳는다.`,
    choices: [
      { text: '🔍 호프가 개입한다', nextNode: 'ellen_exposure_phase' },
      { text: '💬 "기억을 더듬어보세요, 엘렌"', nextNode: 'ellen_remember_lullaby' },
      { text: '⚖️ 백작에게 진실을 요구한다', nextNode: 'count_forced_truth' }
    ]
  },

  ellen_remember_lullaby: {
    id: 'ellen_remember_lullaby',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'ellen',
    text: `"기억을 더듬어보세요, 엘렌."

당신이 조용히 말한다.

엘렌이 눈을 감는다.

[엘렌]: "어렸을 때... 누군가 자장가를 불러주었어요..."

[엘렌]: "따뜻한 목소리... 부드러운 손길..."

그녀가 눈을 뜬다.

[엘렌]: "그건... 백작님의 목소리가 아니었어요."

호프가 조용히 말한다.

[제퍼슨 호프]: "...루시의 목소리였을 거야."

엘렌이 호프를 본다.

[엘렌]: "루시...?"

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "네 어머니... 루시 페리에."`,
    choices: [
      { text: '진실이 폭로된다', nextNode: 'ellen_exposure_phase' }
    ]
  },

  count_forced_truth: {
    id: 'count_forced_truth',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    speaker: 'watson',
    text: `"백작, 이제 진실을 말씀하십시오."

당신이 엄숙하게 말한다.

"엘렌 앞에서."

백작이 당신을 노려본다.

[모로 백작]: "...진실?"

그가 비웃는다.

[모로 백작]: "좋아. 진실을 원하는가?"

백작이 엘렌을 본다.

[모로 백작]: "엘렌, 넌..."

[모로 백작]: "천한 여자의 피를 이어받았다."

엘렌이 숨을 죽인다.

[모로 백작]: "하지만 내가..."

[모로 백작]: "널 고귀하게 다시 빚어낸 거다!"

백작의 본색이 드러난다.`,
    choices: [
      { text: '엘렌의 반응을 본다', nextNode: 'ellen_exposure_phase' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎭 2단계: 진실의 폭로 (Exposure)
  // ═══════════════════════════════════════════════════════

  ellen_exposure_phase: {
    id: 'ellen_exposure_phase',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'hope',
    text: `호프가 앞으로 나선다.

[제퍼슨 호프]: "그는 너를 사랑한 게 아니다, 엘렌!"

호프의 목소리가 떨린다.

[제퍼슨 호프]: "루시를 파멸시킨 죄책감을..."

[제퍼슨 호프]: "씻기 위해 너를 인형처럼 가두었을 뿐이야!"

백작이 냉소한다.

[모로 백작]: "인형?"

백작이 일어선다. (밧줄이 풀려있다면)

[모로 백작]: "그래! 맞다!"

[모로 백작]: "넌 그 천한 여자의 피를 이어받았지!"

백작의 본색이 완전히 드러난다.

[모로 백작]: "하지만 내가 널 고귀하게 다시 빚어낸 거다!"

[모로 백작]: "교육시키고, 키우고, 백작가의 영애로 만들었다!"

엘렌이 뒤로 물러난다.

[엘렌]: "아니... 아니에요..."

그녀의 손이 로켓을 꽉 쥔다.`,
    choices: [
      { text: '🌟 엘렌의 각성', nextNode: 'ellen_awakening_phase' },
      { text: '💬 "엘렌, 진실을 받아들이세요"', nextNode: 'watson_encourage_ellen' },
      { text: '⚔️ 백작을 제압한다', nextNode: 'stop_count_violence' }
    ]
  },

  watson_encourage_ellen: {
    id: 'watson_encourage_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"엘렌, 진실을 받아들이세요."

당신이 조용히 말한다.

"당신은 루시의 딸입니다."

"그리고 그것은... 부끄러운 일이 아닙니다."

엘렌이 당신을 본다.

눈물이 흐른다.

[엘렌]: "하지만... 제 인생은... 거짓이었어요..."

당신이 고개를 젓는다.

[왓슨]: "아니요."

[왓슨]: "당신 어머니의 사랑은 진실이었습니다."

[왓슨]: "그리고 당신의 삶도... 진실입니다."

엘렌이 로켓을 본다.

루시의 초상화가 빛난다.`,
    choices: [
      { text: '엘렌이 각성한다', nextNode: 'ellen_awakening_phase' }
    ]
  },

  stop_count_violence: {
    id: 'stop_count_violence',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `홈즈가 백작 앞을 막아선다.

[홈즈]: "그만하십시오, 백작."

백작이 홈즈를 본다.

[모로 백작]: "비켜라, 탐정!"

[모로 백작]: "이건 내 가족 일이다!"

홈즈가 단호하게 말한다.

[홈즈]: "가족?"

[홈즈]: "당신은 엘렌을 가족이 아닌 소유물로 취급했습니다."

백작이 얼어붙는다.

엘렌이 홈즈 뒤에서 말한다.

[엘렌]: "홈즈 씨... 괜찮아요."

그녀가 앞으로 나선다.

[엘렌]: "제가... 직접 말씀드릴게요."`,
    choices: [
      { text: '엘렌의 각성을 지켜본다', nextNode: 'ellen_awakening_phase' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎭 3단계: 자아의 각성 (Awakening)
  // ═══════════════════════════════════════════════════════

  ellen_awakening_phase: {
    id: 'ellen_awakening_phase',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'ellen',
    text: `백작의 외침이 지하실에 울려 퍼진다. 

엘렌은 손에 쥔 어머니의 로켓을 내려다본다. 

그녀의 눈빛이 흔들림을 멈추고 차갑게 가라앉는다.

엘렌이 로켓을 꽉 쥔다.

그녀가 백작을 똑바로 본다.

[엘렌]: "당신이 준 이름은 가짜였군요."

그녀의 목소리가 떨리지 않는다.

[엘렌]: "나는..."

엘렌이 로켓을 가슴에 얹는다.

[엘렌]: "백작의 인형이 아니라..."

[엘렌]: "루시의 딸, 엘렌이에요."

침묵이 흐른다.

백작이 무너진다.

[모로 백작]: "엘렌... 나는..."

엘렌이 고개를 젓는다.

[엘렌]: "20년간 저를 사랑해주신 건... 감사해요."

[엘렌]: "하지만 이제..."

그녀가 호프를 본다.

[엘렌]: "진실을 알고 싶어요."

호프가 고개를 끄덕인다.

각성이 완성된다.`,
    choices: [
      { text: '🌹 "용감합니다, 엘렌"', nextNode: 'praise_ellen_courage' },
      { text: '💬 호프가 진실을 말한다', nextNode: 'hope_tells_full_truth' },
      { text: '⚖️ 백작의 반응을 본다', nextNode: 'count_reaction_to_awakening' }
    ],
    onEnter: {
      setFlag: 'is_ellen_awakened',
      value: true
    }
  },

  praise_ellen_courage: {
    id: 'praise_ellen_courage',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `"용감합니다, 엘렌."

당신이 말한다.

"진실을 받아들이는 건... 쉬운 일이 아닙니다."

엘렌이 당신을 본다.

그녀가 미소 짓는다. 눈물 속에서.

[엘렌]: "박사님... 저는..."

[엘렌]: "제가 누구인지 알고 싶어요."

[엘렌]: "진짜 저를."

홈즈가 조용히 말한다.

[홈즈]: "그것이 진정한 자유입니다."

호프가 엘렌에게 다가간다.

[제퍼슨 호프]: "엘렌... 내가 모든 걸 말해주마."`,
    choices: [
      { text: '호프의 이야기를 듣는다', nextNode: 'hope_tells_full_truth' }
    ]
  },

  hope_tells_full_truth: {
    id: 'hope_tells_full_truth',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'hope',
    text: `호프가 엘렌 앞에 무릎을 꿇는다.

[제퍼슨 호프]: "엘렌... 나는 네 어머니를 사랑했다."

[제퍼슨 호프]: "루시 페리에... 세상에서 가장 아름다운 여인."

엘렌이 로켓을 본다.

[제퍼슨 호프]: "1861년... 그녀는 이곳에 끌려왔다."

[제퍼슨 호프]: "백작의 교단에... \"영원한 신부 의식\"을 위해..."

엘렌이 숨을 죽인다.

[제퍼슨 호프]: "의식은 실패했고... 루시는..."

호프의 목소리가 떨린다.

[제퍼슨 호프]: "너를 낳고 죽었다."

[제퍼슨 호프]: "하지만 마지막 순간..."

[제퍼슨 호프]: "그녀는 백작에게 부탁했다..."

[제퍼슨 호프]: "\"엘렌을 지켜주세요\"라고..."

백작이 고개를 끄덕인다.

[모로 백작]: "...그게... 내가 할 수 있는 유일한 속죄였다..."

엘렌이 두 남자를 본다.

복잡한 감정이 교차한다.`,
    choices: [
      { text: '💔 "어머니는... 저를 사랑했나요?"', nextNode: 'ellen_asks_about_lucy_love' },
      { text: '⚖️ "백작은... 왜 저를 키웠나요?"', nextNode: 'ellen_asks_count_reason' },
      { text: '🌹 루시의 편지를 보여준다', nextNode: 'show_lucy_letter_to_awakened_ellen', requiredItem: 'lucy_letter' }
    ]
  },

  ellen_asks_about_lucy_love: {
    id: 'ellen_asks_about_lucy_love',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'hope',
    text: `엘렌이 떨리는 목소리로 묻는다.

[엘렌]: "어머니는... 저를 사랑했나요?"

호프가 엘렌을 본다.

눈물이 흐른다.

[제퍼슨 호프]: "세상 무엇보다."

[제퍼슨 호프]: "루시는 마지막 순간까지..."

[제퍼슨 호프]: "너를 품에 안고 있었다."

[제퍼슨 호프]: "\"내 딸... 엘렌...\"이라고 불렀지."

엘렌이 울음을 터뜨린다.

[엘렌]: "어머니..."

호프가 엘렌을 안는다.

[제퍼슨 호프]: "루시는 너를 사랑했다, 엘렌."

[제퍼슨 호프]: "그리고 나도..."

20년의 슬픔이 녹아내린다.`,
    choices: [
      { text: '감동적인 순간을 지켜본다', nextNode: 'hope_mercy_route' }
    ]
  },

  ellen_asks_count_reason: {
    id: 'ellen_asks_count_reason',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `엘렌이 백작을 본다.

[엘렌]: "백작님은... 왜 저를 키웠나요?"

백작이 엘렌을 본다.

긴 침묵이 흐른다.

[모로 백작]: "...처음엔 죄책감 때문이었다."

[모로 백작]: "루시를 죽인... 내 죄를 씻기 위해..."

백작이 눈물을 흘린다.

[모로 백작]: "하지만... 너를 키우면서..."

[모로 백작]: "진짜로... 사랑하게 되었다."

[모로 백작]: "너는 내 속죄였고..."

[모로 백작]: "동시에... 내 구원이었다."

엘렌이 눈물을 닦는다.

[엘렌]: "...감사해요, 백작님."

[엘렌]: "하지만 이제..."

[엘렌]: "진실 속에서 살고 싶어요."

백작이 고개를 끄덕인다.

[모로 백작]: "...그래라, 엘렌."`,
    choices: [
      { text: '화해의 순간', nextNode: 'reconcile_all_three' }
    ]
  },

  show_lucy_letter_to_awakened_ellen: {
    id: 'show_lucy_letter_to_awakened_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    speaker: 'watson',
    text: `당신이 루시의 편지를 엘렌에게 건넨다.

"이것을 읽어보세요, 엘렌."

"당신 어머니의 마지막 편지입니다."

엘렌이 떨리는 손으로 편지를 받는다.

그녀가 읽기 시작한다.

**"내 사랑하는 딸 엘렌에게..."**

**"나는 곧 떠날 것 같구나..."**

**"하지만 네가 행복하게 자라길..."**

**"엄마는 항상 너와 함께 있을 거야..."**

엘렌의 눈에서 눈물이 흐른다.

[엘렌]: "어머니... 저는..."

[엘렌]: "이제 알았어요..."

그녀가 로켓을 가슴에 얹는다.

[엘렌]: "제가 누구인지..."

각성이 완성된다.`,
    choices: [
      { text: '진엔딩으로', nextNode: 'hope_mercy_route' }
    ]
  },

  count_reaction_to_awakening: {
    id: 'count_reaction_to_awakening',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `백작이 엘렌의 각성을 본다.

그의 얼굴에 복잡한 감정이 지나간다.

분노... 슬픔... 체념...

그리고 마침내... 해방.

[모로 백작]: "엘렌..."

백작이 무릎을 꿇는다.

[모로 백작]: "나는... 너를 감옥에 가두었구나..."

[모로 백작]: "거짓된 정체성이라는 감옥에..."

엘렌이 백작을 본다.

[엘렌]: "하지만... 사랑은 진실이었어요."

백작이 놀란다.

[엘렌]: "20년간... 저를 키워주신 건..."

[엘렌]: "거짓이 아니었잖아요."

백작이 울음을 터뜨린다.

[모로 백작]: "엘렌... 고맙다..."

용서가 시작된다.`,
    choices: [
      { text: '🌟 화해', nextNode: 'reconcile_all_three' },
      { text: '⚖️ 심판', nextNode: 'count_judgment' }
    ]
  }

};
