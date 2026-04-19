// 1일차 오후 스토리 노드들
import { StoryNode } from '../../types/story';

export const day1AfternoonNodes: Record<string, StoryNode> = {
  // main_entrance는 hub-system.ts에 있음 (중복 제거)

  // back_entrance는 part2-first-floor.ts에 있음 (중복 제거)

  // 서재 첫 진입 - 스탬거슨 없이 먼저 조사
  study_room: {
    id: 'study_room',
    day: 1,
    timeOfDay: 'afternoon',
    location: 'library',
    conditionalText: [
      {
        // 이미 서재의 선택지를 하나라도 본 경우 (재방문)
        condition: (context) => {
          const studyChoices = ['examine_rache', 'examine_desk', 'examine_cloth', 'discover_stangerson', 'examine_bookshelf'];
          return studyChoices.some(node => context.visitedNodes.includes(node));
        },
        text: `서재로 돌아왔다.\\n\\n홈즈가 말한다. "다시 살펴보자. 놓친 단서가 있을 수 있어."`
      }
    ],
    text: `서재의 문을 연다. 

손잡이가 차갑다. 묘하게 불안한 느낌이 든다.

문이 삐걱 소리를 내며 천천히 열린다.

...

방 안으로 들어서자마자, 공기가 다르다. 

철 냄새. 피 냄새다.

벽을 보는 순간... 온몸에 소름이 돋는다.

**RACHE**

핏자국으로 쓰인 글자. 아직 완전히 마르지 않았다. 선명한 붉은색.

[왓슨]: ...이런 망할!

홈즈가 침착하게 방 안을 살핀다.

[홈즈]: 왓슨, 진정해. 현장을 오염시키면 안 돼.

책상이 엉망이다. 서류들이 바닥에 흩어져 있고...

바닥에는 투쟁의 흔적. 깨진 잉크병, 쓰러진 의자.

그리고... 찢어진 천 조각.

[왓슨]: 피가... 이렇게 많다니. 백작은 어디로 간 거지?

[홈즈]: 이 피의 양을 보면 중상을 입었을 가능성이 크지. 하지만 시신은 없어. 어딘가로 옮겨졌을 수도 있고...

문득, 뒤에서 바스락 소리가 들린다.

당신이 재빨리 돌아본다.

...아무도 없다. 하지만 창문 커튼이 살랑 흔들리고 있다.

바람일까? 아니면...

[홈즈]: (낮은 목소리로) 우리만 있는 게 아닐 수도 있어. 조심해.`,
    choices: [
      { text: '책장 뒤를 확인한다', nextNode: 'discover_stangerson', hideIfVisitedNode: 'discover_stangerson' },
      { text: 'RACHE 글자를 먼저 조사한다', nextNode: 'examine_rache' },
      { text: '📜 가계도를 조사한다', nextNode: 'study_genealogy_investigation', hideIfVisitedNode: 'study_genealogy_investigation' },
      { text: '책상을 조사한다', nextNode: 'examine_desk' },
      { text: '책장을 살펴본다', nextNode: 'examine_bookshelf' },
      { text: '바닥의 천 조각을 조사한다', nextNode: 'examine_cloth', hideIfHasItem: '찢어진 천 조각' },
      { text: '현관 홀로 돌아간다', nextNode: 'main_entrance_return_study' }
    ]
  },

  // 스탠거슨 발견
  discover_stangerson: {
    id: 'discover_stangerson',
    day: 1,
    location: 'library', // ✅ location 추가 - 서재 배경 유지
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `내가 책장 뒤로 다가가자 누군가가 놀라 뒤로 물러섰다.

집사 복장의 중년 남자였다. 손에는 서류 뭉치를 들고 있고, 얼굴은 창백했다.

[스탠거슨]: 저, 저는... 스태그슨입니다. 백작님의 집사죠.

그의 목소리가 떨렸다.

[스탠거슨]: 탐정님들이신가요? 경찰이... 부르셨다고 들었습니다.

홈즈가 그의 손과 얼굴을 관찰했다. 그의 손이 미세하게 떨리고 있었다.

[홈즈]: 여기서 뭘 하고 계셨습니까?

스탠거슨이 시선을 피했다.

[스탠거슨]: 저는... 백작님의 서류를 정리하고 있었습니다. 혹시 단서가 있을까 해서요.

그가 서류 뭉치를 우리에게 보여준다. 백작의 재산 관련 문서들이었다.

[홈즈]: 그 서류들을 왜 숨기셨습니까?

[스탠거슨]: 숨긴 게 아닙니다! 놀라서 그만... 죄송합니다.

그의 눈빛이 진실된 것 같기도, 거짓말 같기도 했다.

홈즈가 스태그슨에게 말한다.

[홈즈]: 그럼 스태그슨씨, 저희가 조사하는 동안 협조해주시겠습니까?

[스탠거슨]: 물론입니다. 백작님을 찾는 게 저도 간절합니다...`,
    choices: [
      { text: 'RACHE 글자를 조사한다', nextNode: 'examine_rache' },
      { text: '책상을 조사한다', nextNode: 'examine_desk' },
      { text: '바닥의 천 조각을 조사한다', nextNode: 'examine_cloth_with_stangerson', hideIfHasItem: '찢어진 천 조각' },
      { text: '스탠거슨에게 질문한다', nextNode: 'ask_stangerson' }
    ]
  },

  // 스태그슨이 있는 상태로 서재 조사
  study_with_stangerson: {
    id: 'study_with_stangerson',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `스태그슨을 지켜보면서 서재를 조사한다.

그는 불안하게 서성이며 우리의 움직임을 주시하고 있다.

홈즈가 말한다.

[홈즈]: 스태그슨씨, 저희가 조사하는 동안 그대로 계시죠. 곧 질문이 있을 겁니다.

스태그슨이 고개를 끄덕이지만 식은땀을 흘린다.`,
    choices: [
      { text: 'RACHE 글자를 조사한다', nextNode: 'examine_rache' },
      { text: '책상을 조사한다', nextNode: 'examine_desk' },
      { text: '바닥의 천 조각을 조사한다', nextNode: 'examine_cloth_with_stangerson', hideIfHasItem: '찢어진 천 조각' },
      { text: '스태그슨에게 질문한다', nextNode: 'ask_stangerson' }
    ]
  },

  // 찢어진 천 조각 조사
  examine_cloth: {
    id: 'examine_cloth',
    day: 1,
    timeOfDay: 'afternoon',
    speaker: 'watson',
    conditionalText: [
      {
        // 지하실을 이미 방문한 경우
        condition: (context) => context.visitedNodes.includes('basement_scene') || context.visitedNodes.includes('open_basement'),
        text: `바닥을 살피다 책장 앞에 떨어진 검은 천 조각을 발견한다.

고급스러운 울 소재다. 찢어진 가장자리가 있다.

홈즈가 조심스럽게 집어든다.

[홈즈]: 아, 이건... 지하실 계단에서 본 그 천이군!

그가 천을 빛에 비춰본다.

[홈즈]: 역시. 집사복 천과 같은 재질이야. 스태그슨이 지하실로 급하게 내려가다 계단의 못에 걸렸을 때 떨어진 거지.

천 조각을 주머니에 넣는다.`
      },
      {
        // 지하실의 존재를 알지만 방문은 안 한 경우
        condition: (context) => context.visitedNodes.includes('find_basement') || context.visitedNodes.includes('chase_hope_to_basement'),
        text: `바닥을 살피다 책장 앞에 떨어진 검은 천 조각을 발견한다.

고급스러운 울 소재다. 찢어진 가장자리가 있다.

홈즈가 조심스럽게 집어든다.

[홈즈]: 흥미롭군. 이건 집사복에서 떨어진 것 같아.

그가 천을 빛에 비춰본다.

[홈즈]: 지하실 계단의 못에 걸렸을 가능성이 높아. 누군가 서둘러 지하실로 내려갔다는 뜻이지.

천 조각을 주머니에 넣는다.`
      }
    ],
    text: `바닥을 살피다 책장 앞에 떨어진 검은 천 조각을 발견한다.

고급스러운 울 소재다. 찢어진 가장자리가 있다.

홈즈가 조심스럽게 집어든다.

[홈즈]: 흥미롭군. 이건 집사복에서 떨어진 것 같아.

그가 천을 빛에 비춰본다.

[홈즈]: 가장자리가 날카롭게 찢어졌어. 무언가 날카로운 것에... 못이나 돌출부에 걸렸을 때 생기는 찢어짐이야.

[왓슨]: 누군가 급하게 움직이다 옷이 찢긴 건가?

[홈즈]: 정확해. 그리고 천의 재질로 봐서는... 집사복일 가능성이 높아.

천 조각을 주머니에 넣는다.`,
    item: '찢어진 천 조각',
    choices: [
      { text: 'RACHE 글자를 조사한다', nextNode: 'examine_rache' },
      { text: '책상을 조사한다', nextNode: 'examine_desk' },
      { text: '책장 뒤를 확인한다', nextNode: 'discover_stangerson', hideIfVisitedNode: 'discover_stangerson' }
    ]
  },

  // 스태그슨이 있는 상태에서 천 조각 발견
  examine_cloth_with_stangerson: {
    id: 'examine_cloth_with_stangerson',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'watson',
    conditionalText: [
      {
        // 지하실을 이미 방문한 경우
        condition: (context) => context.visitedNodes.includes('basement_scene') || context.visitedNodes.includes('open_basement'),
        text: `바닥을 살피다 책장 앞에 떨어진 검은 천 조각을 발견한다.

고급스러운 울 소재다. 찢어진 가장자리가 있다.

홈즈가 조심스럽게 집어든다.

[홈즈]: 아, 이건... 지하실 계단에서 본 그 천이군!

그 순간, 스태그슨의 얼굴이 창백해진다.

홈즈가 천을 빛에 비춰보며 말한다.

[홈즈]: 역시. 집사복 천과 같은 재질이야. 스태그슨씨, 당신이 지하실로 급하게 내려가다 계단의 못에 걸렸을 때 떨어진 거죠?

스태그슨이 불안하게 자신의 옷자락을 본다. 그의 집사복 한쪽이 찢어져 있다.

[스태그슨]: 저, 저건... 제가... 조사하다가...

그가 말을 더듬는다. 거짓말이 분명하다.

천 조각을 주머니에 넣는다.`
      },
      {
        // 지하실의 존재를 알지만 방문은 안 한 경우
        condition: (context) => context.visitedNodes.includes('find_basement') || context.visitedNodes.includes('chase_hope_to_basement'),
        text: `바닥을 살피다 책장 앞에 떨어진 검은 천 조각을 발견한다.

고급스러운 울 소재다. 찢어진 가장자리가 있다.

홈즈가 조심스럽게 집어든다.

[홈즈]: 흥미롭군. 이건 집사복에서 떨어진 것 같아.

그 순간, 스태그슨의 얼굴이 창백해진다.

홈즈가 천을 빛에 비춰보며 말한다.

[홈즈]: 지하실 계단의 못에 걸렸을 가능성이 높아. 누군가 서둘러 지하실로 내려갔다는 뜻이지.

스태그슨이 불안하게 자신의 옷자락을 본다. 그의 집사복 한쪽이 찢어져 있다.

[스태그슨]: 저, 저건... 제가... 조사하다가...

그가 말을 더듬는다. 거짓말이 분명하다.

천 조각을 주머니에 넣는다.`
      }
    ],
    text: `바닥을 살피다 책장 앞에 떨어진 검은 천 조각을 발견한다.

고급스러운 울 소재다. 찢어진 가장자리가 있다.

홈즈가 조심스럽게 집어든다.

[홈즈]: 흥미롭군. 이건 집사복에서 떨어진 것 같아.

그 순간, 스태그슨의 얼굴이 창백해진다.

홈즈가 천을 빛에 비춰보며 말한다.

[홈즈]: 가장자리가 날카롭게 찢어졌어. 무언가 날카로운 것에... 못이나 돌출부에 걸렸을 때 생기는 찢어짐이야.

스태그슨이 불안하게 자신의 옷자락을 본다. 그의 집사복 한쪽이 찢어져 있다.

[왓슨]: 누군가 급하게 움직이다 옷이 찢긴 건가?

[홈즈]: 정확해. 그리고 천의 재질로 봐서는... 집사복일 가능성이 높아.

스태그슨이 말을 더듬는다.

[스태그슨]: 저, 저건... 제가... 조사하다가...

거짓말이 분명하다.

천 조각을 주머니에 넣는다.`,
    item: '찢어진 천 조각',
    choices: [
      { text: '스태그슨을 추궁한다', nextNode: 'confront_stangerson_cloth' },
      { text: 'RACHE 글자를 조사한다', nextNode: 'examine_rache' },
      { text: '책상을 조사한다', nextNode: 'examine_desk' },
      { text: '스태그슨에게 질문한다', nextNode: 'ask_stangerson' }
    ]
  },

  // 천 조각으로 스태그슨 추궁
  confront_stangerson_cloth: {
    id: 'confront_stangerson_cloth',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    speaker: 'holmes',
    text: `[홈즈]: 스태그슨씨, 이 천 조각... 당신 옷에서 떨어진 것 아닙니까?

홈즈가 천 조각을 스태그슨의 찢어진 옷자락에 대본다.

완벽하게 일치한다.

스태그슨이 뒷걸음질 친다.

[스태그슨]: 그, 그건... 저는... 단지...

[홈즈]: 지하실에 내려가셨죠? 어젯밤에.

스태그슨의 얼굴에서 혈색이 사라진다.

[스태그슨]: ...아닙니다! 저는 아무것도 하지 않았습니다!

그가 패닉 상태에 빠진다.

[스태그슨]: 저는... 저는 단지 백작님을 찾으려... 지하실을 조사했을 뿐입니다!

[홈즈]: 무엇을 찾으셨습니까?

긴 침묵.

[스태그슨]: ...아무것도... 아무것도 없었습니다...

그가 고개를 떨군다. 뭔가 더 숨기고 있는 것이 분명하다.`,
    choices: [
      { text: '더 강하게 압박한다', nextNode: 'press_stangerson_level_1' },
      { text: '증거를 제시한다', nextNode: 'present_evidence_to_stangerson' },
      { text: '일단 넘어간다', nextNode: 'study_with_stangerson' }
    ]
  }
};