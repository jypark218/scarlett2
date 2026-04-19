/**
 * 🪜 다락방 계층적 조사 시스템 (Attic Layered Investigation)
 * 
 * Phase 1: 공간 파악 (Initial Observation)
 * Phase 2: 정밀 조사 (Detailed Investigation)
 * Phase 3: 엘렌의 비밀 발견 (Ellen's Secret Discovery)
 */

import { StoryNode } from '../../../types/story';

export const atticLayeredNodes: Record<string, StoryNode> = {
  
  // ========== PHASE 1: 공간 파악 (Initial Hub) ==========
  
  attic_hub: {
    id: 'attic_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    speaker: 'watson',
    conditionalText: [
      {
        // 엘렌을 만난 경우
        condition: (context) => {
          const ellenMet = ['ellen_first_meet', 'ellen_encounter', 'ellen_reveal'];
          return ellenMet.some(node => context.visitedNodes.includes(node));
        },
        text: `다락방으로 돌아왔다.

작은 침대, 책상, 촛대... 엘렌이 20년간 살았던 공간.

[왓슨]: (가슴이 먹먹하다... 이렇게 좁은 공간에서...)`
      },
      {
        // Phase 1 모두 완료 시
        condition: (context) => {
          const phase1 = ['attic_observe_desk', 'attic_observe_bed', 'attic_observe_window'];
          return phase1.every(node => context.visitedNodes.includes(node));
        },
        text: `다락방을 전체적으로 파악했다.

홈즈가 말한다.

[홈즈]: 이제 세부적으로 조사해보자. 엘렌의 흔적을 더 찾을 수 있을 거야.`
      }
    ],
    text: `사다리를 타고 다락방으로 올라간다.

좁은 공간... 하지만 예상보다 깔끔하게 정돈되어 있다.

작은 침대, 책상, 그리고 촛대가 놓여있다. 누군가 이곳에서... 살았다.

홈즈가 주변을 살핀다.

[홈즈]: 왓슨, 이곳은 누군가의 거주 공간이야. 최근까지 사용한 흔적이 보여.

[홈즈]: 먼저 전체적으로 살펴보자. 서두르지 말고.`,
    choices: [
      { 
        text: '📖 책상 주변을 관찰한다', 
        nextNode: 'attic_observe_desk',
        hideIfVisitedNode: 'attic_observe_desk'
      },
      { 
        text: '🛏️ 침대 주변을 관찰한다', 
        nextNode: 'attic_observe_bed',
        hideIfVisitedNode: 'attic_observe_bed'
      },
      { 
        text: '🪟 창문 주변을 관찰한다', 
        nextNode: 'attic_observe_window',
        hideIfVisitedNode: 'attic_observe_window'
      },
      {
        text: '🔍 정밀 조사를 시작한다',
        nextNode: 'attic_phase2_hub',
        requiredVisitedNode: 'attic_observe_desk'
      },
      {
        text: '🪜 사다리를 타고 내려간다',
        nextNode: 'bedroom_hub'
      }
    ]
  },

  // ========== PHASE 1-1: 책상 주변 관찰 ==========
  
  attic_observe_desk: {
    id: 'attic_observe_desk',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    speaker: 'watson',
    text: `책상으로 다가간다.

낡은 나무 책상 위에 몇 가지 물건이 놓여있다.

- 낡은 일기장 (표지가 닳아있다)
- 잉크병과 펜
- 촛대 (최근까지 사용한 흔적)

홈즈가 책상 표면을 만진다.

[홈즈]: 먼지가 거의 없어. 누군가 최근까지 이 책상을 사용했어.

그가 일기장을 가리킨다.

[홈즈]: 일기장이군. 하지만 함부로 펼쳐보면 안 돼. 나중에 자세히 조사하자.

**[발견: 엘렌의 일기장, 사용 흔적]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'attic_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.attic_desk_observed = true;
    }
  },

  // ========== PHASE 1-2: 침대 주변 관찰 ==========
  
  attic_observe_bed: {
    id: 'attic_observe_bed',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    speaker: 'watson',
    text: `침대로 다가간다.

작은 단단침대. 담요가 깔끔하게 개어져 있다.

홈즈가 침대 프레임을 살핀다.

[홈즈]: 오래된 침대군. 하지만 관리가 잘 되어있어.

침대 옆에 작은 상자가 놓여있다.

[왓슨]: 이건...

홈즈가 상자를 가리킨다.

[홈즈]: 보관함이야. 아마 소중한 물건을 넣어두었을 거야. 나중에 열어보자.

침대 밑을 살펴보니... 먼지가 거의 없다.

[홈즈]: 청소를 자주 했군. 이곳을 소중히 여긴 사람이 살았어.

**[발견: 침대 옆 보관함, 깨끗한 상태]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'attic_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.attic_bed_observed = true;
    }
  },

  // ========== PHASE 1-3: 창문 주변 관찰 ==========
  
  attic_observe_window: {
    id: 'attic_observe_window',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'holmes',
    speaker: 'watson',
    text: `창문으로 다가간다.

작은 창문... 하지만 두꺼운 커튼으로 가려져 있다.

홈즈가 커튼을 조심스럽게 옆으로 젖힌다.

밖의 풍경이 보인다. 저택의 뒷뜰과... 멀리 마을이 보인다.

[왓슨]: 이곳에서... 세상을 바라봤겠군요.

홈즈가 창틀을 살핀다.

[홈즈]: 창문은 열 수 없게 못으로 고정되어 있어. 외부에서 보이지 않도록 커튼도 두껍게...

그가 창틀의 낙서를 발견한다.

작은 글씨로... "자유롭고 싶어요"라고 적혀있다.

[홈즈]: ...왓슨. 이곳에 갇힌 사람이... 얼마나 답답했을까.

**[발견: 고정된 창문, 벽의 낙서]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'attic_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.attic_window_observed = true;
    }
  },

  // ========== PHASE 2: 정밀 조사 허브 ==========
  
  attic_phase2_hub: {
    id: 'attic_phase2_hub',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'holmes',
    speaker: 'holmes',
    conditionalText: [
      {
        // 엘렌을 만난 경우
        condition: (context) => {
          const ellenMet = ['ellen_first_meet', 'ellen_encounter', 'ellen_reveal'];
          return ellenMet.some(node => context.visitedNodes.includes(node));
        },
        text: `[홈즈]: 이제 엘렌의 흔적을 더 자세히 찾아보자.

이곳에서 20년을 산 사람... 분명 중요한 것들을 남겼을 거야.

무엇을 조사할까?`
      }
    ],
    text: `[홈즈]: 이제 세부적으로 파고들자.

이곳에 살았던 사람의 흔적... 더 깊이 조사해보자.`,
    choices: [
      {
        text: '📖 일기장을 정밀 조사한다',
        nextNode: 'attic_detail_diary',
        requiredVisitedNode: 'attic_observe_desk',
        hideIfVisitedNode: 'attic_detail_diary'
      },
      {
        text: '📦 침대 옆 보관함을 조사한다',
        nextNode: 'attic_detail_box',
        requiredVisitedNode: 'attic_observe_bed',
        hideIfVisitedNode: 'attic_detail_box'
      },
      {
        text: '📚 책장을 정밀 조사한다',
        nextNode: 'attic_detail_bookshelf',
        hideIfVisitedNode: 'attic_detail_bookshelf'
      },
      {
        text: '🪟 창문 낙서를 정밀 조사한다',
        nextNode: 'attic_detail_writing',
        requiredVisitedNode: 'attic_observe_window',
        hideIfVisitedNode: 'attic_detail_writing'
      },
      {
        text: '🔙 다시 전체를 둘러본다',
        nextNode: 'attic_hub'
      }
    ]
  },

  // ========== PHASE 2-1: 일기장 정밀 조사 ==========
  
  attic_detail_diary: {
    id: 'attic_detail_diary',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    speaker: 'watson',
    text: `일기장을 조심스럽게 펼친다.

표지에 작은 글씨로 "엘렌의 일기"라고 적혀있다.

**1875년 3월 1일**
오늘은 제 다섯 번째 생일이에요.
아버지가 케이크를 만들어주셨어요. 
하지만 밖에 나갈 수는 없어요. 
아버지가 "위험하다"고 하셨어요.

**1878년 7월 15일**
창밖을 봤어요. 새들이 자유롭게 날아가요.
나도 저렇게... 날고 싶어요.

**1885년 10월 3일**
오늘 루시 언니를 처음 봤어요.
아버지가 데려오셨어요. 
루시 언니는 웃으며 나를 안아주었어요.
"넌 소중한 아이야"라고 했어요.

홈즈가 옆에서 일기를 읽는다.

[홈즈]: ...엘렌은 어릴 때부터 이곳에 갇혀 있었군.

**[증거 획득: 엘렌의 일기장]**`,
    choices: [
      {
        text: '📖 일기장을 챙긴다',
        nextNode: 'attic_acquire_diary'
      }
    ],
    onEnter: (context) => {
      context.flags.examined_ellen_diary = true;
    }
  },

  attic_acquire_diary: {
    id: 'attic_acquire_diary',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    text: `**[획득: 엘렌의 일기장]**

엘렌이 20년간 써온 일기장을 챙겼다.

이 일기는... 엘렌이 어떻게 살았는지 보여주는 증거다.`,
    choices: [
      { 
        text: '다른 것을 조사한다', 
        nextNode: 'attic_phase2_hub' 
      }
    ],
    onEnter: (context) => {
      context.addItem('엘렌의 일기장');
      context.flags.has_ellen_diary = true;
    }
  },

  // ========== PHASE 2-2: 보관함 정밀 조사 ==========
  
  attic_detail_box: {
    id: 'attic_detail_box',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'holmes',
    speaker: 'watson',
    text: `침대 옆 보관함을 연다.

안에는...

- 작은 나무 인형 (손으로 만든 것)
- 낡은 리본
- 말린 꽃잎들
- 그리고... 작은 편지

홈즈가 편지를 집어든다.

[홈즈]: 왓슨, 이것 봐.

편지를 펼치자... 루시의 필체다.

"엘렌에게,

너는 혼자가 아니야. 언니가 항상 함께 있을게.
언젠가 우리 함께 밖으로 나가자.
약속해.

- 루시"

[왓슨]: ...루시가 엘렌을...

홈즈가 고개를 끄덕인다.

[홈즈]: 루시는 엘렌을 구하려 했어. 하지만...

**[증거 획득: 루시가 엘렌에게 보낸 편지]**`,
    choices: [
      {
        text: '📜 편지를 챙긴다',
        nextNode: 'attic_acquire_lucy_letter'
      }
    ],
    onEnter: (context) => {
      context.flags.found_lucy_letter_to_ellen = true;
    }
  },

  attic_acquire_lucy_letter: {
    id: 'attic_acquire_lucy_letter',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'watson',
    text: `**[획득: 루시가 엘렌에게 보낸 편지]**

루시와 엘렌의 관계를 보여주는 중요한 증거를 챙겼다.`,
    choices: [
      { 
        text: '다른 것을 조사한다', 
        nextNode: 'attic_phase2_hub' 
      }
    ],
    onEnter: (context) => {
      context.addItem('루시가 엘렌에게 보낸 편지');
    }
  },

  // ========== PHASE 2-3: 책장 정밀 조사 ==========
  
  attic_detail_bookshelf: {
    id: 'attic_detail_bookshelf',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'holmes',
    speaker: 'watson',
    text: `선반에 꽂힌 책들을 살펴본다.

- "셰익스피어 전집"
- "성경"
- "과학 입문"
- "프랑스어 교본"
- "수학 원리"

홈즈가 책을 펼쳐본다.

[홈즈]: 백작이 엘렌을 교육했군. 꽤 수준 높은 책들이야.

책 여백에 작은 글씨로 메모가 적혀있다.

"언젠가 이 지식을 밖에서 쓸 수 있을까?"

[왓슨]: 엘렌은... 배우고 싶어했어요. 밖으로 나가고 싶어했고...

홈즈가 책을 내려놓는다.

[홈즈]: 백작은 엘렌을 가두면서도... 교육은 시켰어. 모순적이지.

**[발견: 백작의 교육 흔적]**`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'attic_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.examined_ellen_books = true;
    }
  },

  // ========== PHASE 2-4: 창문 낙서 정밀 조사 ==========
  
  attic_detail_writing: {
    id: 'attic_detail_writing',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'holmes',
    speaker: 'watson',
    text: `창틀의 낙서를 자세히 살펴본다.

작은 글씨들이 빼곡하게 적혀있다.

"자유롭고 싶어요"
"밖으로 나가고 싶어요"
"엄마를 보고 싶어요"
"언젠가... 언젠가..."

그리고 마지막 줄...

"루시 언니... 고마워요. 당신이 있어서 견딜 수 있었어요."

홈즈가 낙서를 보며 침묵한다.

[홈즈]: ...왓슨. 엘렌은 20년 동안... 이 좁은 공간에서... 희망을 잃지 않으려 했어.

[왓슨]: 그리고 루시가... 그 희망이었군요.

홈즈가 고개를 끄덕인다.

[홈즈]: 루시는 엘렌에게 단순한 친구가 아니었어. 세상과 연결된 유일한 끈이었지.

**[발견: 엘렌의 절규, 루시에 대한 감사]**`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'attic_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.examined_ellen_writings = true;
      context.flags.knows_lucy_ellen_bond = true;
    }
  },

  // ========== PHASE 3: 추리 결론 ==========
  
  attic_deduction: {
    id: 'attic_deduction',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'holmes',
    text: `홈즈가 다락방 중앙에 서서 주변을 둘러본다.

[홈즈]: 왓슨, 이제 전체 그림이 보이기 시작해.

[홈즈]: 백작은 엘렌을 20년간 이곳에 숨겼어. 왜일까?

[왓슨]: 교단과... 관련이 있을까요?

[홈즈]: 정확해. 엘렌은 교단의 "영원한 신부 의식"을 위해 태어난 아이야.

[홈즈]: 백작은 엘렌을 의식에 바치기 싫어서... 숨긴 거지.

[홈즈]: 하지만 시간이 지나면서... 교단의 압박이 커졌고...

[홈즈]: 백작은 대신 루시를 의식에 바치려 했어.

[왓슨]: 그래서... 루시가 실종된 거군요!

홈즈가 고개를 끄덕인다.

[홈즈]: 그래. 하지만 누군가 이 계획을 알았어. 그리고 백작을 납치했지.

[홈즈]: 범인은... 이 모든 진실을 알고 있어. 우리도 서둘러야 해.

**[추리: 엘렌과 루시, 그리고 교단의 관계 파악]**`,
    choices: [
      {
        text: '지하실로 가야 한다',
        nextNode: 'attic_to_basement_prompt',
        requiredItem: '지하실 열쇠'
      },
      {
        text: '더 조사가 필요하다',
        nextNode: 'bedroom_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.attic_deduction_complete = true;
      context.flags.knows_ellen_lucy_truth = true;
    }
  },

  attic_to_basement_prompt: {
    id: 'attic_to_basement_prompt',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'attic',
    character: 'holmes',
    text: `[홈즈]: 왓슨, 이제 지하실로 가야 해.

루시는... 아마 그곳에 있을 거야.

그리고 백작도.

[왓슨]: 지금 바로 갑니까?

홈즈가 고개를 끄덕인다.

[홈즈]: 더 늦기 전에. 서둘러야 해.`,
    choices: [
      {
        text: '지하실로 간다',
        nextNode: 'find_basement'
      },
      {
        text: '아직 준비가 부족하다',
        nextNode: 'bedroom_hub'
      }
    ]
  }
};
