import { StoryNode } from '../../../types/story';

/**
 * 🌹 Part 1: 엘렌과의 첫 만남
 * - 침실에서 엘렌이 등장
 * - 신원 확인 및 대화
 * - 백작 실종 확인
 */
export const ellenFirstEncounter: Record<string, StoryNode> = {
  // ═══════════════════════════════════════════════════════
  // 🌹 엘렌과의 첫 만남 (침실 서랍장 발견 후)
  // ═══════════════════════════════════════════════════════
  
  ellen_appears: {
    id: 'ellen_appears',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[침실 - 서랍장을 조사하던 중]

당신이 루시의 편지를 읽고 있을 때...

문이 조용히 열린다.

홈즈가 돌아본다. "누구...?"

한 여성이 문 앞에 서 있다.

창백한 얼굴, 루시를 닮은 섬세한 인상...

어두운 드레스를 입고, 손에는 작은 은빛 로켓을 쥐고 있다.

당신은 순간 숨이 멎는다.

그녀는... 루시의 사진과 똑같다.`,
    choices: [
      { text: '💬 "당신은... 누구십니까?"', nextNode: 'ellen_introduction' },
      { text: '🔍 [홈즈를 바라본다]', nextNode: 'holmes_recognizes_ellen' }
    ]
  },

  ellen_introduction: {
    id: 'ellen_introduction',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: ...안녕하세요. 탐정님들.

[그녀의 목소리가 떨린다]

[엘렌]: 저는 엘렌입니다. 엘렌 페리어.

[왓슨]: 페리어...? 그렇다면...

[엘렌]: 네. 루시 페리어의 딸입니다.

[그녀가 당신이 든 편지를 본다]

[엘렌]: 어머니의... 편지를 읽고 계셨군요.

[눈물이 그녀의 뺨을 타고 흐른다]`,
    choices: [
      { text: '💬 "엘렌 양... 당신이 살아계셨군요"', nextNode: 'ellen_survival_explanation' },
      { text: '🤔 "전보에는... 당신이 사망했다고..."', nextNode: 'ellen_fake_telegram' },
      { text: '🌹 "실례지만, 여기서 무엇을 하고 계셨나요?"', nextNode: 'ellen_hiding_reason' }
    ]
  },

  holmes_recognizes_ellen: {
    id: 'holmes_recognizes_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `[셜록 홈즈]: 엘렌... 엘렌 페리어.

[홈즈가 확신에 찬 목소리로 말한다]

[셜록 홈즈]: 루시의 딸. 백작이 20년간 숨겨왔던 양딸.

[엘렌이 놀라서 홈즈를 본다]

[엘렌]: ...어떻게 아셨나요?

[셜록 홈즈]: 서랍장의 편지들, 유언장, 그리고... 당신의 얼굴.

[홈즈가 루시의 사진을 가리킨다]

[셜록 홈즈]: 당신은 어머니를 닮았습니다. 아주 많이.`,
    choices: [
      { text: '💬 "엘렌 양... 당신이 살아계셨군요"', nextNode: 'ellen_survival_explanation' },
      { text: '🔍 "전보에는 당신이 사망했다고 했는데..."', nextNode: 'ellen_fake_telegram' }
    ]
  },

  ellen_survival_explanation: {
    id: 'ellen_survival_explanation',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 살아있습니다. 그 전보는... 거짓이었어요.

[왓슨]: 거짓?

[엘렌]: 아버지... 백작님이 저를 보호하기 위해 만든 거짓말이었습니다.

[그녀가 떨리는 손으로 로켓을 쥔다]

[엘렌]: 드레버가 저택을 방문하려 한다는 소식을 들었어요. 법률사무소에서 전보가 왔죠.

[엘렌]: 아버지는... 저를 숨기기로 했습니다. 그리고 제가 죽었다는 거짓 전보를 만들었어요.

[왓슨]: 드레버로부터 당신을 지키려고...

[엘렌]: 네. 드레버와 스탠거슨... 그들은 어머니를 괴롭힌 사람들입니다.

[그녀의 목소리에 분노가 섞인다]

[엘렌]: 아버지는... 그들이 저까지 해칠까봐 두려워하셨어요.

[왓슨]: 그런데 그들은 어떻게 당신의 존재를...?

[엘렌]: 스탠거슨은... 집사니까 처음부터 알고 있었죠. 제가 아기였을 때부터요.

[엘렌]: 그리고 드레버는... 3년 전, 유언장 얘기가 나왔을 때 알게 됐어요.

[그녀가 고개를 숙인다]

[엘렌]: 백작님이 유언장을 쓰면서... 제 이름을 언급하셨나봐요. 스탠거슨을 통해 드레버도 알게 됐죠.`,
    choices: [
      { text: '💬 "그렇다면 지금 백작님은...?"', nextNode: 'ellen_knows_count_missing' },
      { text: '🔍 "당신은 지금까지 어디 숨어계셨나요?"', nextNode: 'ellen_hiding_place' },
      { text: '🌹 "어머니 루시에 대해... 기억하시나요?"', nextNode: 'ellen_lucy_memory' }
    ]
  },

  ellen_fake_telegram: {
    id: 'ellen_fake_telegram',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 그 전보는 아버지가 만든 거짓말입니다.

[그녀가 고개를 숙인다]

[엘렌]: 저를 보호하기 위해서요. 드레버가 저를 찾지 못하도록.

[셜록 홈즈]: 그렇군요. 만약 드레버가 당신이 죽었다고 믿는다면...

[엘렌]: 저를 찾으러 오지 않을 거라고 생각하셨죠.

[왓슨]: 하지만... 스탠거슨도 그 전보를 봤을 겁니다.

[엘렌]: 네. 그래서 제가 더 조심해야 했어요. 저택 안에 숨어서...

[그녀가 창밖을 본다]

[엘렌]: 아버지를... 지켜보면서.`,
    choices: [
      { text: '💬 "백작님은 지금 어디 계신가요?"', nextNode: 'ellen_knows_count_missing' },
      { text: '🔍 "당신은 어디에 숨어계셨습니까?"', nextNode: 'ellen_hiding_place' }
    ]
  },

  ellen_hiding_reason: {
    id: 'ellen_hiding_reason',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 저는... 제 방에 숨어있었습니다.

[왓슨]: 제 방?

[엘렌]: 다락방입니다. 아버지가... 저를 위해 만들어주신 작은 공간이에요.

[그녀가 천장을 가리킨다]

[엘렌]: 드레버가 올 때마다 저는 그곳에 숨었어요. 20년간... 계속.

[셜록 홈즈]: 백작은 당신을 철저히 보호했군요.

[엘렌]: 네. 아버지는... 어머니를 지키지 못한 대신, 저만은 반드시 지키겠다고 하셨어요.

[그녀의 눈에서 눈물이 흐른다]

[엘렌]: 하지만 이번에는... 뭔가 달랐어요. 아버지가 너무 불안해하셨어요.`,
    choices: [
      { text: '💬 "무엇이 달랐나요?"', nextNode: 'ellen_recent_tension' },
      { text: '🔍 "백작님은 지금 어디 계신가요?"', nextNode: 'ellen_knows_count_missing' }
    ]
  },

  ellen_hiding_place: {
    id: 'ellen_hiding_place',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 다락방입니다. 침실 천장 위에 숨겨진 작은 방이에요.

[홈즈가 천장을 올려다본다]

[셜록 홈즈]: 그래서 발자국이...

[엘렌]: 네. 제가 내려왔다 올라갔다 하면서 남긴 흔적이에요.

[왓슨]: 20년간... 그렇게 숨어지내신 겁니까?

[엘렌]: 네. 드레버와 스탠거슨이 올 때마다요.

[그녀가 슬픈 미소를 짓는다]

[엘렌]: 하지만 아버지와 단둘이 있을 때는... 행복했어요. 아버지는 저를 정말 사랑하셨으니까요.

[엘렌]: 어머니 이야기도 많이 해주셨어요. 루시가 얼마나 아름다운 사람이었는지...`,
    choices: [
      { text: '🌹 "어머니에 대해 더 들려주시겠습니까?"', nextNode: 'ellen_lucy_memory' },
      { text: '💬 "백작님은 지금 어디 계신가요?"', nextNode: 'ellen_knows_count_missing' }
    ]
  },

  ellen_lucy_memory: {
    id: 'ellen_lucy_memory',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 어머니... 루시.

[그녀가 로켓을 꺼내 펼친다]

[엘렌]: 저는 어머니를 직접 본 적이 없어요. 제가 태어나기 직전에... 돌아가셨으니까요.

[왓슨]: ...

[엘렌]: 하지만 아버지가 말씀해주셨어요. 어머니는 정의로운 분이었다고.

[엘렌]: 모르몬교도들에게 억지로 끌려갔지만... 끝까지 저항했다고.

[그녀의 목소리가 떨린다]

[엘렌]: 그리고 제퍼슨 호프라는 남자를 사랑했다고. 진심으로.

[셜록 홈즈]: 제퍼슨 호프...

[엘렌]: 네. 어머니의 연인이셨죠. 저는... 그분을 만나본 적이 없어요.

[그녀가 고개를 숙인다]

[엘렌]: 하지만 언젠가... 만날 수 있기를 바랐어요.`,
    choices: [
      { text: '💬 "호프... 그가 저택에 왔습니다"', nextNode: 'ellen_hope_revelation' },
      { text: '🔍 "백작님은 지금 어디 계신가요?"', nextNode: 'ellen_knows_count_missing' }
    ]
  },

  ellen_hope_revelation: {
    id: 'ellen_hope_revelation',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: ...뭐라고요?

[그녀가 놀라서 당신을 본다]

[엘렌]: 호프님이... 여기에?

[왓슨]: 네. 마차꾼으로 위장해서 왔습니다.

[엘렌이 손으로 입을 가린다]

[엘렌]: 그렇군요... 드디어... 드디어 오셨군요.

[셜록 홈즈]: 당신은 그를 알고 있었습니까?

[엘렌]: 아니요. 직접 만난 적은 없어요. 하지만...

[그녀가 서랍에서 편지 한 통을 꺼낸다]

[엘렌]: 3개월 전, 아버지가 받은 편지입니다. "제퍼슨 호프"라는 서명이 있어요.

[왓슨]: 무슨 내용입니까?

[엘렌]: "복수를 멈출 수 없소. 20년을 기다렸소. 루시의 원수를 반드시 갚겠소."

[그녀가 떨린다]

[엘렌]: 아버지는... 그 편지를 받고 너무 괴로워하셨어요.`,
    choices: [
      { text: '💬 "백작님은 어디 계신가요?"', nextNode: 'ellen_knows_count_missing' },
      { text: '🔍 "호프의 복수... 당신은 어떻게 생각하십니까?"', nextNode: 'ellen_on_revenge' }
    ]
  },

  ellen_recent_tension: {
    id: 'ellen_recent_tension',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 3일 전... 법률사무소에서 전보가 왔어요.

[왓슨]: 드레버가 방문한다는...

[엘렌]: 네. 그리고 아버지는 제게 말씀하셨어요.

[그녀가 눈물을 훔친다]

[엘렌]: "엘렌, 이번에는 위험할 수도 있다. 며칠간 다락방에 숨어라. 절대 나오지 마라."

[엘렌]: 그리고... "죄송하다"고 하셨어요.

[왓슨]: 죄송하다고요?

[엘렌]: 네. "네 어머니를 지키지 못해서 죄송하다. 하지만 너만은 반드시 지키겠다"고.

[그녀가 흐느낀다]

[엘렌]: 그게... 아버지의 마지막 말씀이었어요.`,
    choices: [
      { text: '💬 "백작님은 지금 어디 계신가요?"', nextNode: 'ellen_knows_count_missing' },
      { text: '🌹 [그녀의 손을 잡아준다]', nextNode: 'watson_comforts_ellen' }
    ]
  },

  ellen_knows_count_missing: {
    id: 'ellen_knows_count_missing',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 모르겠어요...

[그녀가 떨린다]

[엘렌]: 어젯밤... 이상한 소리가 들렸어요. 다락방에서.

[엘렌]: 비명 같기도 하고... 아니면 싸우는 소리 같기도 하고...

[왓슨]: 그래서 내려오셨습니까?

[엘렌]: 네. 아침이 되자 조용해졌어요. 그래서... 용기를 내서 내려왔죠.

[그녀가 방을 둘러본다]

[엘렌]: 하지만 아버지는... 어디에도 안 계세요.

[셜록 홈즈]: 엘렌 양. 우리가 찾아보겠습니다.

[홈즈가 진지하게 말한다]

[셜록 홈즈]: 당신의 아버지를. 그리고 진실을.`,
    choices: [
      { text: '💬 "우리와 함께 가시겠습니까?"', nextNode: 'ellen_joins_investigation' },
      { text: '🔍 "다락방에 계시는 게 안전합니다"', nextNode: 'ellen_stays_hidden' },
      { text: '🌹 "호프에 대해 더 말씀해주시겠습니까?"', nextNode: 'ellen_on_revenge' }
    ]
  },

  watson_comforts_ellen: {
    id: 'watson_comforts_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `당신이 그녀의 손을 잡아준다.

[왓슨]: 괜찮습니다, 엘렌 양. 우리가 백작님을 찾아드리겠습니다.

[엘렌]: 고맙습니다... 박사님.

[그녀가 눈물을 훔친다]

[엘렌]: 아버지는... 좋은 분이세요. 20년 전의 일은... 실수였어요.

[왓슨]: 우리도 압니다.

홈즈가 조용히 고개를 끄덕인다.

[셜록 홈즈]: 백작은 속죄하려 했습니다. 당신을 키우면서.

[엘렌]: 네... 아버지는 제게 모든 걸 주셨어요. 사랑도, 보호도...

[그녀가 로켓을 꼭 쥔다]

[엘렌]: 이제 제가... 아버지를 지킬 차례예요.`,
    choices: [
      { text: '💬 "우리와 함께 가시겠습니까?"', nextNode: 'ellen_joins_investigation' },
      { text: '🔍 "다락방에 머무시는 게 안전합니다"', nextNode: 'ellen_stays_hidden' }
    ]
  },

  ellen_on_revenge: {
    id: 'ellen_on_revenge',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 복수...

[그녀가 길게 한숨을 쉰다]

[엘렌]: 저도... 어릴 때는 복수하고 싶었어요.

[엘렌]: 어머니를 괴롭힌 드레버와 스탠거슨을. 어머니를 죽음으로 몰아간 모든 사람들을.

[왓슨]: 하지만 지금은?

[엘렌]: 지금은... 모르겠어요.

[그녀가 창밖을 본다]

[엘렌]: 아버지가 말씀하셨어요. "복수는 또 다른 복수를 부를 뿐이다"라고.

[엘렌]: "루시는 복수를 원하지 않았을 것이다"라고.

[셜록 홈즈]: 현명한 말씀입니다.

[엘렌]: 하지만... 호프님의 마음도 이해가 돼요.

[그녀가 로켓을 본다]

[엘렌]: 20년... 20년간 사랑하는 사람을 잃은 슬픔을 안고 사는 것... 얼마나 고통스러웠을까요.`,
    choices: [
      { text: '💬 "당신은 현명합니다, 엘렌 양"', nextNode: 'ellen_wisdom' },
      { text: '🔍 "이제 백작님을 찾아야 합니다"', nextNode: 'ellen_search_count' }
    ]
  },

  ellen_joins_investigation: {
    id: 'ellen_joins_investigation',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 네. 함께 가겠습니다.

[그녀가 일어선다]

[엘렌]: 20년간... 숨어만 살았어요. 이제는... 아버지를 위해 무언가 해야 해요.

[셜록 홈즈]: 위험할 수 있습니다.

[엘렌]: 알아요. 하지만... 더 이상 도망치고 싶지 않아요.

[그녀가 결연한 표정을 짓는다]

[엘렌]: 어머니도... 끝까지 싸우셨잖아요.

[왓슨]: ...알겠습니다.

당신은 고개를 끄덕인다.

[왓슨]: 우리와 함께 가시죠, 엘렌 양.

홈즈가 문을 연다.

[셜록 홈즈]: 지하실로 갑시다. 모든 진실이 그곳에 있을 겁니다.`,
    choices: [
      { text: '🏃 [엘렌과 함께 지하실로 간다]', nextNode: 'basement_with_ellen' }
    ]
  },

  ellen_stays_hidden: {
    id: 'ellen_stays_hidden',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: ...네. 알겠어요.

[그녀가 고개를 숙인다]

[엘렌]: 아버지도 그렇게 원하실 거예요. 제가 안전하기를...

[왓슨]: 우리가 백작님을 꼭 찾아드리겠습니다.

[엘렌]: 고맙습니다, 박사님. 탐정님.

[그녀가 다락방으로 올라간다]

[엘렌]: 부디... 아버지를 구해주세요.

문이 닫힌다.

홈즈가 당신을 본다.

[셜록 홈즈]: 왓슨. 이제 우리가 할 일은 명확합니다.

[왓슨]: 백작을 찾고, 진실을 밝히는 것.

[셜록 홈즈]: 그리고... 엘렌을 위한 정의를 실현하는 것.`,
    choices: [
      { text: '🏃 [지하실로 간다]', nextNode: 'find_basement' }
    ]
  },

  ellen_wisdom: {
    id: 'ellen_wisdom',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 감사합니다, 박사님.

[그녀가 미소 짓는다]

[엘렌]: 하지만 저는... 여전히 혼란스러워요.

[엘렌]: 복수가 옳은지, 용서가 옳은지...

[셜록 홈즈]: 그것은 당신이 결정할 문제가 아닙니다.

[홈즈가 말한다]

[셜록 홈즈]: 법과 정의가 결정할 일이죠.

[엘렌]: 하지만... 호프님에게는 법이 아무것도 해주지 못했잖아요.

[그녀가 조용히 말한다]

[엘렌]: 20년 전에도, 지금도.

당신은... 말문이 막힌다.

그녀의 말이 옳기 때문이다.`,
    choices: [
      { text: '💬 "그래도 우리는 할 수 있는 걸 해야 합니다"', nextNode: 'ellen_search_count' },
      { text: '🌹 "당신의 판단을 존중하겠습니다"', nextNode: 'ellen_search_count' }
    ]
  },

  ellen_search_count: {
    id: 'ellen_search_count',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: 이제... 백작님을 찾아야 합니다.

[엘렌]: 네.

[그녀가 일어선다]

[셜록 홈즈]: 지하실을 조사하지 않았습니까?

[왓슨]: 아직입니다.

[셜록 홈즈]: 그렇다면... 그곳에 답이 있을 겁니다.

엘렌이 당신을 본다.

결연한 눈빛이다.

[엘렌]: 함께 가겠습니다.`,
    choices: [
      { text: '💬 "좋습니다. 함께 갑시다"', nextNode: 'ellen_joins_investigation' },
      { text: '🔍 "안전한 곳에 계시는 게..."', nextNode: 'ellen_stays_hidden' }
    ]
  }
};
