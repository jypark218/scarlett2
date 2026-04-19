/**
 * 🕯️ 지하실 계층적 조사 시스템 (Basement Layered Investigation)
 * 
 * Phase 1: 공간 파악 (Initial Observation)
 * Phase 2: 정밀 조사 (Detailed Investigation)
 * Phase 3: 백작 발견 (Final Discovery)
 */

import { StoryNode } from '../../types/story';

export const basementLayeredNodes: Record<string, StoryNode> = {
  
  // ========== PHASE 1: 공간 파악 (Initial Hub) ==========
  
  basement_hub: {
    id: 'basement_hub',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    background: 'https://images.unsplash.com/photo-1647943360488-1079492accd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjByaXR1YWwlMjBjaGFtYmVyfGVufDF8fHx8MTc2NjE1MDQxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    character: 'watson',
    conditionalText: [
      {
        // Phase 1 모두 완료 시
        condition: (context) => {
          const phase1 = ['basement_observe_altar', 'basement_observe_walls', 'basement_observe_corner'];
          return phase1.every(node => context.visitedNodes.includes(node));
        },
        text: `지하실을 전체적으로 파악했다.

홈즈가 긴장한 목소리로 말한다.

[홈즈]: 이제 세부적으로 조사하자. 백작이 어디 있는지 찾아야 해.`
      },
      {
        // 백작 발견 후 재방문
        condition: { visitedNode: 'basement_find_count' },
        text: `지하실에 다시 왔다.

백작이 묶여있던 의자가 여전히 그대로다.

홈즈가 주변을 살핀다.`
      },
      {
        // 재방문
        condition: (context) => {
          const phase1 = ['basement_observe_altar', 'basement_observe_walls', 'basement_observe_corner'];
          return phase1.some(node => context.visitedNodes.includes(node));
        },
        text: `지하실을 다시 둘러본다.

여전히 차갑고 음산한 분위기다.`
      }
    ],
    text: `계단을 천천히, 조심스럽게 내려간다.

삐걱... 삐걱... 낡은 나무계단이 비명을 지른다.

차가운 공기가 얼굴을 때린다. 숨을 쉴 때마다 폐가 얼어붙는 것 같다.

지하실은... 생각보다 훨씬 넓다. 천장이 높고, 어둡고, 음산하다.

촛불이 여기저기 켜져있어 희미한, 불안한 빛을 내고 있다. 촛불 그림자가 벽에서 춤을 춘다.

그리고... 가운데 거대한 석제 제단이 보인다.

제단 위에는 말라붙은 붉은 얼룩들... 피다. 오래된 피와 최근 묻은 피가 겹쳐있다.

[왓슨]: (뒤로 물러서며) 이런... 세상에...

홈즈가 조용히, 차갑게 말한다.

[홈즈]: (제단을 응시하며) 의식용 제단이야. "영원한 신부 의식"을 여기서 치렀어. 루시도... 이 제단 위에 누웠겠지.

벽면에는 이상한 상징들이 붉은 페인트로 그려져 있다. RACHE, 십자가, 거꾸로 된 오각별, 알 수 없는 문자들...

구석에는 낡은 나무 상자들이 산처럼 쌓여있다. 먼지와 거미줄로 덮여있다.

그리고... 저 멀리 어둠 속에서 무언가 움직이는 것 같다. 쥐? 아니면...?

[홈즈]: (긴장한 목소리로) ...조심해, 왓슨. 우리만 있는 게 아닐 수도 있어.`,
    choices: [
      {
        text: '🕯️ 제단을 관찰한다',
        nextNode: 'basement_observe_altar',
        hideIfVisitedNode: 'basement_observe_altar'
      },
      {
        text: '🖼️ 벽면의 상징을 관찰한다',
        nextNode: 'basement_observe_walls',
        hideIfVisitedNode: 'basement_observe_walls'
      },
      {
        text: '📦 구석의 상자들을 관찰한다',
        nextNode: 'basement_observe_corner',
        hideIfVisitedNode: 'basement_observe_corner'
      },
      {
        text: '🔍 정밀 조사를 시작한다',
        nextNode: 'basement_phase2_hub',
        requiredVisitedNode: 'basement_observe_altar'
      },
      {
        text: '⬆️ 부엌으로 돌아간다',
        nextNode: 'kitchen_hub'
      }
    ]
  },

  // ========== PHASE 1-1: 제단 관찰 ==========
  
  basement_observe_altar: {
    id: 'basement_observe_altar',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    background: 'https://images.unsplash.com/photo-1654619139072-682d58ba1b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmFzZW1lbnQlMjBhbHRhciUyMGNhbmRsZXN8ZW58MXx8fHwxNzY2MTUwNDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    character: 'holmes',
    speaker: 'watson',
    text: `제단으로 천천히 다가간다. 발걸음마다 바닥에서 뭔가 부서지는 소리가 난다.

석제 제단... 차갑고 거친 표면에 말라붙은 피가 있다. 어두운 적갈색으로 변해버린 핏자국.

[왓슨]: (목소리가 떨리며) 이건... 최근 것인가?

홈즈가 장갑을 낀 손으로 피를 조심스럽게 만져본다. 손가락으로 비벼보고, 냄새를 맡는다.

[홈즈]: (고개를 젓으며) 아니. 오래됐어. 산화 정도를 보니 최소 20년은 된 것 같아. 루시... 그녀가 여기 누웠을 때의 피일 거야.

제단 위에 낡은 황동 촛대와 은잔이 놓여있다. 은잔에는 포도주 자국이 마르지 않은 채 남아있다.

[홈즈]: (촛대를 들어올리며) 의식용 도구들이야. "영원한 신부 의식"에서 사용했던 거지. 신부에게 마취약을 먹이고... 제단에 눕힌 다음...

제단 앞 바닥에는 무릎을 꿇을 수 있는 홈이 파여있다. 수십 번, 수백 번 무릎을 꿇은 흔적.

[왓슨]: (소름이 돋으며) 끔찍하군...

**[발견: 의식용 제단, 20년 된 피, 마취약 잔]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'basement_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.basement_altar_observed = true;
    }
  },

  // ========== PHASE 1-2: 벽면 관찰 ==========
  
  basement_observe_walls: {
    id: 'basement_observe_walls',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    background: 'https://images.unsplash.com/photo-1624429865170-af3db512d785?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwd2FsbCUyMHN5bWJvbHMlMjByaXR1YWx8ZW58MXx8fHwxNzY2MTUwNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    character: 'holmes',
    speaker: 'watson',
    text: `벽면으로 다가가 촛불을 높이 든다.

여러 상징들이 붉은 페인트로... 아니, 피로 그려져 있다.

**RACHE** **RACHE** **RACHE** - 미친 듯이 여러 번 반복해서 쓰여있다. 글자 크기가 제각각이다.

십자가들... 하지만 일반 십자가가 아니다. 거꾸로 된 십자가, 뒤틀린 십자가, 부러진 십자가...

그리고 알 수 없는 문자들이 빼곡하게 새겨져 있다.

[왓슨]: (숨을 삼키며) 이 문자들은...? 악마숭배 의식이라도 치른 건가?

홈즈가 돋보기를 꺼내 자세히 본다.

[홈즈]: (냉정하게) 독일어야. "Erlösung(구원)", "Ewigkeit(영원)", "Braut(신부)"... 교단의 주문 같은 거야. 미신에 사로잡힌 광신도들의 주술.

벽 한쪽에는 낡은 검은 천이 걸려있다. 천이 미세하게 흔들리고 있다. 그 뒤에 뭔가 더 있는 것 같다.

[왓슨]: (천을 가리키며) 저건...?

[홈즈]: (경계하며) 비밀 통로일 수도 있어. 나중에 확인하자.

**[발견: 교단 상징, 독일어 주문, 수상한 천]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'basement_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.basement_walls_observed = true;
    }
  },

  // ========== PHASE 1-3: 구석 상자들 관찰 ==========
  
  basement_observe_corner: {
    id: 'basement_observe_corner',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    background: 'https://images.unsplash.com/photo-1560698421-8b6a7d0d89dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjB3b29kZW4lMjBib3hlcyUyMHN0b3JhZ2V8ZW58MXx8fHwxNzY2MTUwNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    character: 'watson',
    speaker: 'watson',
    text: `구석의 상자들로 다가간다.

낡은 나무 상자들이 여러 개 쌓여있다.

[왓슨]: 뭐가 들어있을까...

홈즈가 상자 하나를 열어본다.

안에는 낡은 옷가지들과 책들...

[홈즈]: 교단의 물품들이야. 예복, 의식용 책...

또 다른 상자를 열자... 오래된 사진들이 나온다.

[홈즈]: 이건... 20년 전 사진들이군.

사진 속에는 여러 사람들이 있다. 검은 예복을 입고...

그리고 저 멀리 어둠 속... 무언가 움직인다!

[왓슨]: 저기 누가...!

**[발견: 교단 물품, 오래된 사진, 수상한 기척]**`,
    choices: [
      {
        text: '계속 조사한다',
        nextNode: 'basement_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.basement_corner_observed = true;
      context.flags.heard_basement_noise = true;
    }
  },

  // ========== PHASE 2: 정밀 조사 허브 ==========
  
  basement_phase2_hub: {
    id: 'basement_phase2_hub',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    conditionalText: [
      {
        // 백작 발견 후
        condition: { visitedNode: 'basement_find_count' },
        text: `백작을 발견했다.

[홈즈]: 다른 증거들도 수집하자.`
      }
    ],
    text: `[홈즈]: 이제 세부적으로 파고들자.

무엇을 먼저 조사할까?`,
    choices: [
      {
        text: '🕯️ 제단을 정밀 조사한다',
        nextNode: 'basement_detail_altar',
        requiredVisitedNode: 'basement_observe_altar',
        hideIfVisitedNode: 'basement_detail_altar'
      },
      {
        text: '📜 벽 뒤의 천을 들춰본다',
        nextNode: 'basement_detail_hidden_wall',
        requiredVisitedNode: 'basement_observe_walls',
        hideIfVisitedNode: 'basement_detail_hidden_wall'
      },
      {
        text: '📦 상자 속 사진을 자세히 본다',
        nextNode: 'basement_detail_photos',
        requiredVisitedNode: 'basement_observe_corner',
        hideIfVisitedNode: 'basement_detail_photos'
      },
      {
        text: '🔦 어둠 속 기척을 확인한다',
        nextNode: 'basement_find_count',
        requiredVisitedNode: 'basement_observe_corner',
        hideIfVisitedNode: 'basement_find_count'
      },
      {
        text: '📚 의식용 책을 읽는다',
        nextNode: 'basement_detail_ritual_book',
        hideIfVisitedNode: 'basement_detail_ritual_book'
      },
      {
        text: '🔙 다시 전체를 둘러본다',
        nextNode: 'basement_hub'
      }
    ]
  },

  // ========== PHASE 2-1: 제단 정밀 조사 ==========
  
  basement_detail_altar: {
    id: 'basement_detail_altar',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    speaker: 'watson',
    text: `제단을 정밀하게 조사한다.

홈즈가 제단 표면을 자세히 본다.

[홈즈]: 여기 글자가 새겨져 있어.

"영원한 신부에게 바치는 제단"

[홈즈]: 그리고 이 촛대와 은잔... 모두 특별히 제작된 거야.

은잔 안을 들여다보니 붉은 얼룩이 있다.

[홈즈]: 이건... 와인이 아니야. 피야.

[왓슨]: 인간의 피인가?

홈즈가 고개를 끄덕인다.

[홈즈]: 그럴 가능성이 높아. 의식에서 피를 마셨던 거지.

**[결정적 증거: 의식용 도구, 피 흔적]**`,
    choices: [
      {
        text: '의식 도구를 챙긴다',
        nextNode: 'basement_acquire_ritual_tools'
      }
    ],
    onEnter: (context) => {
      context.flags.examined_altar_detail = true;
    }
  },

  basement_acquire_ritual_tools: {
    id: 'basement_acquire_ritual_tools',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    text: `**[획득: 의식용 도구]**

제단의 은잔과 촛대를 증거로 챙겼다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'basement_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('의식용 도구');
    }
  },

  // ========== PHASE 2-2: 벽 뒤 천 들춰보기 ==========
  
  basement_detail_hidden_wall: {
    id: 'basement_detail_hidden_wall',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    speaker: 'watson',
    text: `벽에 걸린 천을 들춰본다.

그 뒤에는... 거대한 벽화가 숨겨져 있다!

[왓슨]: 이건...!

의식의 장면을 그린 벽화다.

검은 예복을 입은 사람들이 원을 그리며 서 있고...

가운데에는 흰 옷을 입은 여자가 무릎 꿇고 있다.

그리고 그 앞에는... 칼을 든 남자.

[홈즈]: "영원한 신부 의식"의 전체 과정이야.

홈즈가 벽화의 얼굴들을 자세히 본다.

[홈즈]: 이 사람들... 백작도 있고... 그리고...

그가 한 얼굴을 가리킨다.

[홈즈]: 젊은 스탠거슨도 있어. 20년 전엔 그도 교단원이었던 거야.

**[결정적 발견: 의식 벽화, 교단원 명단]**`,
    choices: [
      {
        text: '벽화를 스케치한다',
        nextNode: 'basement_acquire_mural_sketch'
      }
    ]
  },

  basement_acquire_mural_sketch: {
    id: 'basement_acquire_mural_sketch',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    text: `**[획득: 의식 벽화 스케치]**

벽화를 빠르게 스케치했다. 교단원들의 얼굴이 보인다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'basement_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('의식 벽화 스케치');
      context.flags.knows_stangerson_cultist = true;
    }
  },

  // ========== PHASE 2-3: 사진 자세히 보기 ==========
  
  basement_detail_photos: {
    id: 'basement_detail_photos',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    text: `상자 속 사진들을 자세히 본다.

홈즈가 사진 한 장을 집어든다.

[홈즈]: 1870년... 20년 전이야.

사진 속에는 젊은 백작과 스탠거슨, 그리고...

[홈즈]: 이 사람은... 드레버군!

[왓슨]: 드레버도 교단원이었다고?

[홈즈]: 그래. 그들은 모두 "영원한 구원 교단"의 일원이었어.

다른 사진을 본다. 흰 옷을 입은 여자... 루시다.

그리고 그 옆에... 어린 소녀.

[홈즈]: 이 소녀는... 루시의 딸일 거야.

**[중요 정보: 교단원 명단, 루시의 딸]**`,
    choices: [
      {
        text: '사진들을 챙긴다',
        nextNode: 'basement_acquire_photos'
      }
    ]
  },

  basement_acquire_photos: {
    id: 'basement_acquire_photos',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    text: `**[획득: 20년 전 교단 사진]**

20년 전 교단원들의 사진을 챙겼다.`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'basement_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.addItem('20년 전 교단 사진');
      context.flags.knows_drebber_cultist = true;
    }
  },

  // ========== PHASE 2-4: 의식용 책 읽기 ==========
  
  basement_detail_ritual_book: {
    id: 'basement_detail_ritual_book',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'holmes',
    speaker: 'watson',
    text: `상자에서 의식용 책을 꺼내 읽는다.

독일어로 쓰여있지만 홈즈가 번역해준다.

[홈즈]: "영원한 신부 의식... 순결한 처녀를 신에게 바쳐 영원한 구원을 얻는다..."

[홈즈]: "의식이 완료되면 신부는 신의 품에 안기고, 교단은 영원한 은총을 받는다..."

끔찍한 내용이다.

[홈즈]: 이건 인신 제물 의식이야. 그들은 루시를 제물로 바쳤어.

**[중요 정보: 의식의 진실]**`,
    choices: [
      {
        text: '다른 것을 조사한다',
        nextNode: 'basement_phase2_hub'
      }
    ],
    onEnter: (context) => {
      context.flags.read_ritual_book = true;
    }
  },

  // ========== PHASE 3: 백작 발견 ==========
  
  basement_find_count: {
    id: 'basement_find_count',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    background: 'https://images.unsplash.com/photo-1646524693820-0c51a13f5e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJpb3VzJTIwYmFzZW1lbnQlMjBjb3JyaWRvcnxlbnwxfHx8fDE3NjYxNTA0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    character: 'count',
    speaker: 'watson',
    text: `어둠 속으로 조심스럽게 다가간다.

랜턴을 들어올린다.

그리고... 본다.

의자에 묶인 남자.

[왓슨]: ...백작!

모로 백작이 의자에 묶여있다. 입에는 재갈이 물려있다.

그의 얼굴은 창백하고, 눈에는 공포가 가득하다.

홈즈가 재빨리 다가간다.

[홈즈]: 살아있어! 백작님, 괜찮으십니까?

홈즈가 재갈을 풀어준다.

백작이 거친 숨을 몰아쉰다.

[백작]: 탐...탐정님들...! 감사합니다... 제발... 여길...!

그가 무언가 말하려 하지만 너무 약해 보인다.

[홈즈]: 진정하세요. 우리가 구출하러 왔습니다.

백작을 의자에서 풀어준다.

**[결정적 발견: 백작 생존 확인, 감금 상태]**`,
    choices: [
      {
        text: '백작에게 질문한다',
        nextNode: 'basement_interrogate_count'
      },
      {
        text: '일단 밖으로 데려간다',
        nextNode: 'basement_escape_with_count'
      }
    ],
    onEnter: (context) => {
      context.flags.found_count_alive = true;
    }
  },

  // ========== 백작 심문 ==========
  
  basement_interrogate_count: {
    id: 'basement_interrogate_count',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `[홈즈]: 백작님, 누가 당신을 여기 가뒀습니까?

백작이 떨리는 목소리로 말한다.

[백작]: ...호프... 제퍼슨 호프...!

[왓슨]: 호프? 마차꾼?

[백작]: 그가... 저를... 20년 전 일로... 복수하려...!

[홈즈]: 20년 전? "영원한 신부 의식"을 말씀하시는 겁니까?

백작의 얼굴이 굳는다.

[백작]: ...어떻게...

[홈즈]: 우리는 이미 많은 것을 알고 있습니다. 진실을 말씀해주십시오.

백작이 고개를 떨어뜨린다.

**[중요 정보: 호프가 범인]**`,
    choices: [
      {
        text: '20년 전 사건에 대해 묻는다',
        nextNode: 'basement_scene'
      }
    ]
  },

  // ========== 백작 탈출 ==========
  
  basement_escape_with_count: {
    id: 'basement_escape_with_count',
    day: 1,
    timeOfDay: 'evening',
    location: 'basement',
    character: 'count',
    text: `백작을 부축하여 계단으로 향한다.

그때...

쾅!

위에서 문이 닫히는 소리!

[왓슨]: 문이...!

홈즈가 계단을 뛰어올라간다.

문이 잠겨있다!

[홈즈]: 누군가 우릴 가둔 거야!

위에서 목소리가 들린다.

[???]: 미안하지만... 이제 끝이야.

그 목소리는...`,
    choices: [
      {
        text: '계속...',
        nextNode: 'basement_scene'
      }
    ]
  }
};