/**
 * 🔗 노드 연결 수정 (Gemini 피드백 기반)
 * 
 * 제미나이 분석 리포트:
 * - 끊어진 연결 67건 복구
 * - 엘렌이 루시의 딸이라는 설정 완성
 * 
 * 우선순위:
 * 🔴 지하실 클라이맥스 연결
 * 🟠 엘렌의 정체성 및 증거 연결
 * 🟡 진엔딩 활성화 분기
 */

import { StoryNode } from '../../types/story';

export const nodeConnectionsFix: Record<string, StoryNode> = {

  // ═══════════════════════════════════════════════════════
  // 🔴 최우선: 지하실 클라이맥스 연결
  // ═══════════════════════════════════════════════════════

  /**
   * Gemini 피드백:
   * find_basement → ask_count_truth_basement
   * ask_count_truth_basement → count_full_confession_with_ellen
   * 
   * 현재 상태:
   * find_basement → open_basement → basement_scene_with_ellen
   * 
   * 해결: ask_count_truth_basement를 basement_scene_with_ellen에 추가
   */

  ask_count_truth_basement: {
    id: 'ask_count_truth_basement',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    speaker: 'watson',
    text: `지하실에 들어서자 백작이 의자에 앉아있다.

호프가 그 앞에 서 있다.

"백작, 진실을 말씀해주십시오."

당신이 엄숙하게 말한다.

백작이 당신을 본다.

[모로 백작]: "...무엇을 알고 싶소?"

홈즈가 앞으로 나선다.

[홈즈]: "20년 전... 루시 페리에에게 무슨 일이 있었습니까?"

백작의 얼굴이 굳는다.

[모로 백작]: "...루시..."

그가 고개를 숙인다.

[모로 백작]: "그녀는... 내가 죽인 거나 다름없소..."`,
    choices: [
      { text: '💬 "자세히 말씀해주십시오"', nextNode: 'count_full_confession_with_ellen' },
      { text: '⚖️ "엘렌도 알 권리가 있습니다"', nextNode: 'ellen_confusion_phase', condition: (context) => context.visitedNodes.includes('ellen_appears') },
      { text: '🌹 루시의 편지를 보여준다', nextNode: 'show_lucy_letter_basement', requiredItem: 'lucy_letter' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🟠 엘렌의 정체성 및 증거 연결 (루시의 유산)
  // ═══════════════════════════════════════════════════════

  /**
   * Gemini 피드백:
   * inn_room_desk → acquire_lucy_letter → ellen_receives_locket
   * 
   * 현재 상태:
   * acquire_lucy_letter는 well-hope-encounter.ts에 존재
   * turn_around로 연결됨
   * 
   * 해결: acquire_lucy_letter에서 엘렌과의 대화로 연결되는 분기 추가
   */

  acquire_lucy_letter_extended: {
    id: 'acquire_lucy_letter_extended',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    text: `루시의 편지를 조심스럽게 챙긴다.

이것은... 중요한 증거다.

[아이템 획득: 루시의 편지]

홈즈가 편지를 읽는다.

[홈즈]: "왓슨, 이것은... 루시의 마지막 편지야."

[홈즈]: "그리고... 엘렌에게 보여줘야 할 것 같아."

당신이 고개를 끄덕인다.

엘렌은... 진실을 알 권리가 있다.`,
    choices: [
      { 
        text: '🌹 엘렌에게 편지를 보여준다', 
        nextNode: 'show_letter_to_ellen',
        condition: (context) => context.visitedNodes.includes('ellen_appears')
      },
      { 
        text: '💬 일단 더 조사한다', 
        nextNode: 'turn_around' 
      }
    ]
  },

  show_letter_to_ellen: {
    id: 'show_letter_to_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'mansion',
    character: 'ellen',
    speaker: 'watson',
    text: `당신이 엘렌을 찾는다.

그녀가 거실에 앉아있다.

"엘렌, 이것을 보십시오."

당신이 루시의 편지를 건넨다.

엘렌이 편지를 받아든다.

그녀가 읽기 시작한다.

**"사랑하는 제퍼슨에게... 백작이 아버지를 속였어요..."**

엘렌의 손이 떨린다.

[엘렌]: "...루시?"

[엘렌]: "이게... 누구예요?"

당신이 조심스럽게 말한다.

[왓슨]: "엘렌... 루시는..."

[왓슨]: "당신의 어머니입니다."

엘렌이 얼어붙는다.`,
    choices: [
      { text: '💬 "진실을 말씀드리겠습니다"', nextNode: 'reveal_truth_to_ellen' },
      { text: '🌹 홈즈에게 도움을 요청한다', nextNode: 'holmes_helps_reveal' }
    ]
  },

  reveal_truth_to_ellen: {
    id: 'reveal_truth_to_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'mansion',
    character: 'ellen',
    speaker: 'watson',
    text: `"엘렌... 당신은 루시 페리에의 딸입니다."

당신이 조용히 말한다.

"20년 전... 당신의 어머니는..."

엘렌이 당신을 본다. 눈물이 흐른다.

[엘렌]: "...저는... 백작님의 딸이 아니라는 거예요?"

당신이 고개를 끄덕인다.

[왓슨]: "백작은... 당신을 키웠습니다."

[왓슨]: "하지만 당신의 진짜 어머니는... 루시입니다."

엘렌이 편지를 다시 본다.

[엘렌]: "어머니..."

그녀가 울음을 터뜨린다.`,
    choices: [
      { text: '💬 엘렌을 위로한다', nextNode: 'comfort_ellen_truth' },
      { text: '🌹 호프를 부른다', nextNode: 'call_hope_for_ellen', condition: (context) => context.visitedNodes.includes('meet_hope') }
    ]
  },

  comfort_ellen_truth: {
    id: 'comfort_ellen_truth',
    day: 1,
    timeOfDay: 'evening',
    location: 'mansion',
    character: 'ellen',
    speaker: 'watson',
    text: `당신이 엘렌의 어깨에 손을 얹는다.

"괜찮습니다, 엘렌."

"진실은... 때로 고통스럽습니다."

"하지만 알아야 합니다."

엘렌이 당신을 본다.

[엘렌]: "박사님... 저는..."

[엘렌]: "제가 누구인지 알고 싶어요."

홈즈가 다가온다.

[홈즈]: "엘렌, 당신은... 루시의 딸입니다."

[홈즈]: "그리고 그것은... 자랑스러운 일입니다."

엘렌이 고개를 끄덕인다.

[엘렌]: "...감사합니다."`,
    choices: [
      { text: '🌹 호프를 부른다', nextNode: 'call_hope_for_ellen', condition: (context) => context.visitedNodes.includes('meet_hope') },
      { text: '💬 "지하실로 갑시다"', nextNode: 'find_basement' }
    ]
  },

  call_hope_for_ellen: {
    id: 'call_hope_for_ellen',
    day: 1,
    timeOfDay: 'evening',
    location: 'mansion',
    character: 'hope',
    text: `당신이 호프를 부른다.

호프가 나타난다.

그가 엘렌을 본다.

[제퍼슨 호프]: "...엘렌?"

엘렌이 호프를 본다.

[엘렌]: "당신은... 누구세요?"

호프가 무릎을 꿇는다.

[제퍼슨 호프]: "나는..."

[제퍼슨 호프]: "네 어머니를 사랑했던... 남자다."

엘렌의 눈이 커진다.

호프가 로켓을 꺼낸다.

[제퍼슨 호프]: "이것은... 루시의 것이오."

[제퍼슨 호프]: "네가 가져라."`,
    choices: [
      { text: '🌹 엘렌이 로켓을 받는다', nextNode: 'ellen_receives_locket' },
      { text: '💬 호프에게 더 물어본다', nextNode: 'hope_tells_more' }
    ]
  },

  hope_tells_more: {
    id: 'hope_tells_more',
    day: 1,
    timeOfDay: 'evening',
    location: 'mansion',
    character: 'hope',
    text: `"호프, 더 말씀해주십시오."

당신이 말한다.

호프가 엘렌을 본다.

[제퍼슨 호프]: "엘렌... 네 어머니 루시는..."

[제퍼슨 호프]: "세상에서 가장 아름다운 사람이었소."

[제퍼슨 호프]: "나는... 그녀를 사랑했소."

[제퍼슨 호프]: "하지만 백작이... 그녀를 빼앗았소..."

엘렌이 눈물을 흘린다.

[엘렌]: "어머니는... 저를 사랑했나요?"

호프가 고개를 끄덕인다.

[제퍼슨 호프]: "세상 무엇보다."`,
    choices: [
      { text: '🌹 엘렌이 로켓을 받는다', nextNode: 'ellen_receives_locket' }
    ]
  },

  holmes_helps_reveal: {
    id: 'holmes_helps_reveal',
    day: 1,
    timeOfDay: 'evening',
    location: 'mansion',
    character: 'holmes',
    text: `당신이 홈즈를 본다.

홈즈가 고개를 끄덕인다.

그가 엘렌에게 다가간다.

[홈즈]: "엘렌, 진실을 듣기 어렵겠지만..."

[홈즈]: "알아야 합니다."

엘렌이 홈즈를 본다.

[홈즈]: "당신은 루시 페리에의 딸입니다."

[홈즈]: "백작은... 당신의 친아버지가 아닙니다."

엘렌이 숨을 죽인다.

[엘렌]: "...아니라고..."

홈즈가 루시의 편지를 가리킨다.

[홈즈]: "증거가 여기 있습니다."`,
    choices: [
      { text: '💬 "진실을 받아들이세요"', nextNode: 'reveal_truth_to_ellen' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 진엔딩 활성화 분기
  // ═══════════════════════════════════════════════════════

  /**
   * Gemini 피드백:
   * count_full_confession_with_ellen → hope_mercy_route (lucy_letter 조건)
   * 
   * 현재 상태:
   * count_full_confession_with_ellen은 basement-climax.ts에 존재
   * 
   * 해결: 선택지에 hope_mercy_route 추가
   */

  // 이 노드는 basement-climax.ts를 수정하여 해결

  // ═══════════════════════════════════════════════════════
  // 🔧 기술적 품질 개선
  // ═══════════════════════════════════════════════════════

  /**
   * 시간 역행 문제 해결
   * Day 1 Evening → Day 2 Morning으로 자연스럽게 전환
   */

  basement_to_morning: {
    id: 'basement_to_morning',
    day: 2,
    timeOfDay: 'morning',
    location: 'mansion',
    speaker: 'narrator',
    text: `[다음 날 아침]

햇살이 저택에 비친다.

지난 밤의 긴장이 풀린다.

모든 진실이 밝혀졌다.

백작은 자수했고...

호프는 복수를 포기했고...

엘렌은 진실을 받아들였다.

이제... 새로운 시작이다.`,
    choices: [
      { text: '🌟 에필로그', nextNode: 'true_ending_reconciliation' }
    ]
  }

};
