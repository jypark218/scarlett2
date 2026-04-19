import { StoryNode } from '../../../types/story';

/**
 * 🔍 추론 및 연결
 */

export const deductionHints: Record<string, StoryNode> = {
  utah_past_reveal: {
    id: 'utah_past_reveal',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `스탠거슨이 깊이 한숨을 쉰다.

[스탠거슨]: 20년 전... 유타 솔트레이크시티. 나는 교단의 의사였습니다.

그가 먼 곳을 본다.

[스탠거슨]: 루시 페리어... 그녀와 아버지 존 페리어는 교단을 떠나려 했죠. 제퍼슨 호프가 도와주려 했고...

[왓슨]: 하지만?

[스탠거슨]: 배신당했습니다. 누군가 교단에 밀고했고... 존 페리어는 살해당했습니다. 루시는...

그의 목소리가 떨린다.

[스탠거슨]: 강제 결혼 후 한 달 만에... 죽었습니다. 나는... 그녀를 치료했지만... 마음의 병은 고칠 수 없었습니다.

홈즈가 조용히 묻는다.

[홈즈]: 누가 밀고했습니까?

스탠거슨이 고개를 숙인다.

[스탠거슨]: ...드레버와 나... 우리 둘입니다.`,
    choices: [
      { text: '모로 백작의 역할을 묻는다', nextNode: 'count_role_reveal' },
      { text: '제퍼슨 호프를 찾는다', nextNode: 'search_hope_urgently' }
    ]
  },

  count_role_reveal: {
    id: 'count_role_reveal',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `[홈즈]: 모로 백작은 어떤 역할이었습니까?

스탠거슨이 쓴웃음을 짓는다.

[스탠거슨]: 후원자... 그리고 사주자였습니다.

[왓슨]: 사주자?

[스탠거슨]: 백작은 유타에 광산 이권이 있었습니다. 존 페리어도 광산을 소유했죠... 그래서...

홈즈가 고개를 끄덕인다.

[홈즈]: 페리어를 제거하고 광산을 빼앗으려 했군요.

[스탠거슨]: 맞습니다. 백작이 우리에게 돈을 주고... 밀고하게 했습니다. 그리고 이후 20년...

그가 떨린다.

[스탠거슨]: 우리를 협박하며... 피로 얼룩진 돈을 뜯어냈습니다.

당신은 모든 퍼즐이 맞춰지는 걸 느낀다.`,
    choices: [
      { text: '제퍼슨 호프가 복수자임을 확신한다', nextNode: 'hope_avenger_confirmed' }
    ]
  },

  hope_avenger_confirmed: {
    id: 'hope_avenger_confirmed',
    day: 1,
    timeOfDay: 'evening',
    character: 'watson',
    text: `모든 것이 명확해진다.

루시 페리어 - 희생자
제퍼슨 호프 - 복수자
드레버와 스탠거슨 - 배신자
모로 백작 - 사주자

그리고 RACHE... 독일어로 복수.

[왓슨]: (백작은 첫 번째 희생자일 뿐이야... 호프는 아직 끝내지 않았어.)

홈즈가 당신을 본다.

[홈즈]: 왓슨, 우리는 선택해야 해. 법을 따를 것인가... 아니면 정의를 따를 것인가.

당신은 우물로 향해야 할 때가 왔음을 안다.`,
    choices: [
      { text: '우물로 간다', nextNode: 'well' }
    ]
  },

  locket_meaning_deduce: {
    id: 'locket_meaning_deduce',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈가 로켓을 손에 들고 생각한다.

[홈즈]: 로켓... 사랑하는 사람의 증표. 그리고 복수의 표식.

[왓슨]: 범인이 떨어뜨린 걸까요?

[홈즈]: 아니야, 왓슨. 범인은... 일부러 남긴 거야. "나는 왔다. 복수하러."

그가 로켓을 빛에 비춘다.

[홈즈]: 그리고 다시 가져갔어. 아직... 끝나지 않았으니까.

당신은 소름이 돋는다.

[홈즈]: 드레버와 스탠거슨... 그들도 위험해.

[왓슨]: 우리가 막아야...

[홈즈]: 아니면... 방관해야 할지도 모르지. 정의는... 때로 법정 밖에서 이루어지니까.`,
    choices: [
      { text: '제퍼슨 호프를 찾는다', nextNode: 'search_hope_urgently' }
    ]
  },

  search_hope_urgently: {
    id: 'search_hope_urgently',
    day: 1,
    timeOfDay: 'evening',
    character: 'watson',
    text: `홈즈와 당신은 결론에 도달한다.

[홈즈]: 제퍼슨 호프... 그를 찾아야 해.

[왓슨]: 어디서?

홈즈가 창밖을 본다. 우물이 보인다.

[홈즈]: 그는 루시를 잊지 않았어. 로켓을 우물에... 아니, 우물 '근처'에 떨어뜨렸지.

[왓슨]: 우물이 특별한 의미가?

[홈즈]: 희망의 우물... Hope's Well. 어쩌면 그곳이... 그가 루시를 기억하는 장소일지도.

당신은 우물로 향한다.`,
    choices: [
      { text: '우물로 간다', nextNode: 'well' }
    ]
  }
};