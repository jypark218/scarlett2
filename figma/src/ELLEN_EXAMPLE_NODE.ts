/**
 * 엘렌 등장 예시 노드
 * 실제 게임에서 사용할 수 있는 엘렌 대화 노드 샘플
 */

import { StoryNode } from './types/story';

export const ellenExampleNodes: Record<string, StoryNode> = {
  // ========== 예시 1: [캐릭터명]: 대사 형식 ==========
  ellen_first_encounter: {
    id: 'ellen_first_encounter',
    day: 2,
    timeOfDay: 'evening',
    text: `침실 구석의 그림자가 움직인다.

누군가 조용히 나타난다. 젊은 여성이다.

[엘렌]: 왓슨 박사님... 놀라셨죠?

[왓슨]: 당신은... 누구시오?

[엘렌]: 저는 엘렌입니다. 백작님의... 딸이에요.

홈즈가 날카롭게 그녀를 관찰한다.

[셜록 홈즈]: 유언장에 적힌 그 엘렌... 당신이었군요.`,
    choices: [
      { text: '엘렌에게 질문한다', nextNode: 'ellen_question_1' },
      { text: '홈즈에게 확인한다', nextNode: 'holmes_confirms_ellen' }
    ]
  },

  // ========== 예시 2: character 속성 명시 ==========
  ellen_speaks_alone: {
    id: 'ellen_speaks_alone',
    day: 2,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `저는... 어머니를 본 적이 없어요.

백작님께서 말씀하셨죠. "네 어머니는 천사였단다"라고.

하지만 진실을 알았어요. 어머니는... 사랑하는 사람과 떨어져 슬픔 속에 죽으셨다는 것을.

제퍼슨 호프... 그분이 제 진짜 아버지인 거죠?`,
    choices: [
      { text: '진실을 말해준다', nextNode: 'tell_ellen_truth' },
      { text: '아직 이르다고 말한다', nextNode: 'protect_ellen' }
    ]
  },

  // ========== 예시 3: 행동 묘사 + 대사 ==========
  ellen_reveals_secret: {
    id: 'ellen_reveals_secret',
    day: 2,
    timeOfDay: 'evening',
    text: `엘렌이 떨리는 목소리로 말한다. "백작님은... 저를 지켜주셨어요."

그녀의 눈에 눈물이 맺힌다.

엘렌이 울먹인다. "하지만 스탠거슨이... 그가 유언장을 위조했어요."

홈즈가 앞으로 나선다. "자세히 말해주시겠소?"

엘렌은 고개를 끄덕인다. "제가 본 것을... 모두 말씀드릴게요."`,
    choices: [
      { text: '엘렌의 증언을 듣는다', nextNode: 'ellen_testimony' }
    ]
  },

  // ========== 예시 4: 홈즈, 왓슨, 엘렌 3자 대화 ==========
  three_way_conversation: {
    id: 'three_way_conversation',
    day: 2,
    timeOfDay: 'evening',
    text: `[셜록 홈즈]: 엘렌 양, 3일 전 밤 어디 계셨습니까?

[엘렌]: 저는... 우물가에 있었어요.

[왓슨]: 우물가에? 왜 그런 곳에?

[엘렌]: 어머니의 편지를 숨기러... 스탠거슨이 찾을까봐 두려웠어요.

[셜록 홈즈]: 서재의 여성 발자국... 당신 것이었군요.

엘렌이 고개를 숙인다.

[엘렌]: 죄송해요. 백작님의 일기를 읽었어요. 진실을 알고 싶었어요.`,
    choices: [
      { text: '편지에 대해 묻는다', nextNode: 'ask_about_letter' },
      { text: '발자국에 대해 묻는다', nextNode: 'ask_about_footprints' }
    ]
  },

  // ========== 예시 5: 엘렌의 감정적 고백 ==========
  ellen_emotional_confession: {
    id: 'ellen_emotional_confession',
    day: 2,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `왓슨 박사님... 전 항상 의문이었어요.

왜 백작님은 절 "딸"이라고 부르시면서도, 제 진짜 어머니 이야기는 안 해주셨는지.

왜 제가 외출할 때마다 불안해하셨는지.

왜 스탠거슨과 드레버를 절대 저와 단둘이 있게 하지 않으셨는지.

이제 알아요. 백작님은... 어머니를 지키지 못한 죄책감에, 저라도 지키려 하셨던 거죠.

그런데 백작님마저... 돌아가셨어요.

엘렌이 조용히 운다.

이제 전 정말 혼자에요.`,
    choices: [
      { text: '위로한다', nextNode: 'comfort_ellen' },
      { text: '진실을 밝히겠다고 약속한다', nextNode: 'promise_justice' }
    ]
  }
};

// ========== 렌더링 시뮬레이션 ==========

/**
 * 각 예시 노드가 어떻게 표시되는지 시뮬레이션
 */
export const renderSimulation = {
  ellen_first_encounter: [
    { speaker: 'narrator', text: '침실 구석의 그림자가 움직인다.' },
    { speaker: 'narrator', text: '누군가 조용히 나타난다. 젊은 여성이다.' },
    { 
      speaker: 'ellen',  // ✅ 엘렌의 포트레이트 표시 (text-rose-400)
      text: '왓슨 박사님... 놀라셨죠?' 
    },
    { 
      speaker: 'watson', 
      text: '당신은... 누구시오?' 
    },
    { 
      speaker: 'ellen',  // ✅ 엘렌의 포트레이트 표시
      text: '저는 엘렌입니다. 백작님의... 딸이에요.' 
    },
    { speaker: 'narrator', text: '홈즈가 날카롭게 그녀를 관찰한다.' },
    { 
      speaker: 'holmes', 
      text: '유언장에 적힌 그 엘렌... 당신이었군요.' 
    }
  ],

  ellen_speaks_alone: [
    { 
      speaker: 'ellen',  // ✅ character: 'ellen' 속성으로 지정
      text: '저는... 어머니를 본 적이 없어요.' 
    },
    { 
      speaker: 'ellen', 
      text: '백작님께서 말씀하셨죠. "네 어머니는 천사였단다"라고.' 
    },
    { 
      speaker: 'ellen', 
      text: '하지만 진실을 알았어요. 어머니는... 사랑하는 사람과 떨어져 슬픔 속에 죽으셨다는 것을.' 
    },
    { 
      speaker: 'ellen', 
      text: '제퍼슨 호프... 그분이 제 진짜 아버지인 거죠?' 
    }
  ],

  ellen_reveals_secret: [
    { 
      speaker: 'ellen',  // ✅ "엘렌이 말한다" 패턴으로 자동 인식
      text: '백작님은... 저를 지켜주셨어요.' 
    },
    { speaker: 'narrator', text: '그녀의 눈에 눈물이 맺힌다.' },
    { 
      speaker: 'ellen',  // ✅ "엘렌이 울먹인다" 패턴으로 자동 인식
      text: '하지만 스탠거슨이... 그가 유언장을 위조했어요.' 
    },
    { speaker: 'holmes', text: '자세히 말해주시겠소?' },
    { 
      speaker: 'ellen',  // ✅ "엘렌은 고개를 끄덕인다" 패턴으로 자동 인식
      text: '제가 본 것을... 모두 말씀드릴게요.' 
    }
  ]
};

// ========== 포트레이트 표시 예시 ==========

/**
 * DialogueBox에서 엘렌의 대사가 표시될 때:
 * 
 * <div class="dialogue-box">
 *   <img 
 *     src="https://images.unsplash.com/photo-1642268602642-64a8fbac1e99?..." 
 *     class="portrait"
 *   />
 *   <div class="dialogue-content">
 *     <span class="text-rose-400">엘렌</span>
 *     <p>왓슨 박사님... 놀라셨죠?</p>
 *   </div>
 * </div>
 * 
 * ✅ 장미빛 이름
 * ✅ 빅토리아 시대 여성 초상화
 * ✅ 다른 캐릭터와 명확히 구분됨
 */
