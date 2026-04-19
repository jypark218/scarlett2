import { StoryNode } from '../../types/story';

/**
 * 🌹 엘렌 등장 노드
 * 특정 조건(서랍장 발견, 루시 편지 획득 등)을 충족하면 엘렌이 직접 등장
 */
export const ellenEncounter: Record<string, StoryNode> = {
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

뒤에서 희미한 기척이 느껴진다.

문이 조용히, 너무나 조용히 열린다.

홈즈가 순간적으로 돌아본다. "누구...?"

한 여성이 문 앞에 서 있다.

창백한 얼굴, 루시를 닮은 섬세한 인상... 어두운 드레스를 입고, 떨리는 손으로 작은 은빛 로켓을 꽉 쥐고 있다.

당신은 순간 숨이 멎는다.

그녀는... 루시의 사진과 똑같다. 마치 20년 전 그 여인이 환영처럼 나타난 것만 같다.`,
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
    text: `[엘렌]: (시선을 바닥에 고정한 채, 가느다란 목소리로) ...안녕하세요. 탐정님들.

[그녀의 목소리가 떨린다. 손가락이 로켓을 더욱 세게 움켜쥔다]

[엘렌]: 저, 저는... 엘렌입니다. 엘렌 페리어.

[왓슨]: (놀라서) 페리어...?! 그렇다면...

[엘렌]: (눈물이 고이며) 네. 루시 페리어의... 딸입니다.

[그녀가 당신이 든 편지를 본다. 떨리는 눈동자]

[엘렌]: (목이 메어) 어머니의... 편지를 읽고 계셨군요. 제가... 한 번도 받지 못한 편지를.

[눈물이 그녀의 하얀 뺨을 타고 흐른다]`,
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
    text: `[셜록 홈즈]: (날카로운 눈빛으로 그녀를 관찰하며) 엘렌... 엘렌 페리어.

[홈즈가 확신에 찬 목소리로 말한다]

[셜록 홈즈]: 루시의 딸. 백작이 20년간 세상으로부터 숨겨왔던 양딸. 당신 나이는... 스물넷쯤 되겠군요.

[엘렌이 놀라서 뒤로 물러서며 홈즈를 본다]

[엘렌]: (숨을 삼키며) ...어, 어떻게 아셨나요? 저를 본 적도 없으시잖아요...

[셜록 홈즈]: (서랍장을 가리키며) 서랍장의 편지들, 유언장, 그리고... 무엇보다 당신의 얼굴.

[홈즈가 루시의 사진을 천천히 들어올린다]

[셜록 홈즈]: 당신은 어머니를 닮았습니다. 아주, 아주 많이. 눈썹의 각도, 입술의 곡선, 심지어 서 있는 자세까지... 유전이란 거짓말을 하지 않지요.`,
    choices: [
      { text: '💬 "엘렌 양, 앉으시죠"', nextNode: 'ellen_sits_down' },
      { text: '🔍 "전보에는 당신이 사망했다고 했는데..."', nextNode: 'ellen_fake_telegram' }
    ]
  },

  ellen_survival_explanation: {
    id: 'ellen_survival_explanation',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: (고개를 끄덕이며) 네... 살아있습니다. 그 전보는... 거짓이었어요.

[왓슨]: (당황하며) 거짓이라고?

[엘렌]: (목소리가 떨리며) 아버지... 백작님이 저를 보호하기 위해 만든 거짓말이었습니다.

[그녀가 떨리는 손으로 로켓을 쥔다. 손가락이 하얗게 질릴 정도로 세게]

[엘렌]: (한숨을 쉬며) 일주일 전이었어요. 드레버가 저택을 방문하려 한다는 소식을 들었어요. 법률사무소에서 급히 전보가 왔죠.

[엘렌]: (눈물을 닦으며) 아버지는... 저를 완전히 숨기기로 결심하셨어요. 그리고 제가 병으로 죽었다는 거짓 전보를 보내셨습니다.

[왓슨]: (이해하며) 드레버로부터 당신을 지키려고...

[엘렌]: (고개를 끄덕이며, 목소리에 분노가 섞여) 네. 드레버와 스탠거슨... 그들은 어머니를 괴롭힌 사람들입니다. 어머니를 죽음으로 몰아간...

[왓슨]: 그런데 그들은 어떻게 당신의 존재를...?

[엘렌]: (쓴웃음을 지으며) 스탠거슨은... 집사니까 처음부터 알고 있었죠. 제가 갓난아기였을 때부터 이 저택에 있었으니까요.

[엘렌]: 그리고 드레버는... 3년 전, 유언장 얘기가 나왔을 때 알게 됐어요.

[그녀가 고개를 숙인다. 어깨가 떨린다]

[엘렌]: (숨을 떨며) 백작님이 유언장을 쓰시면서... 제 이름을 언급하셨나봐요. "엘렌 페리어, 나의 양딸"이라고. 스탠거슨을 통해 드레버도 알게 됐죠.`,
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

[엘렌]: 저는 어머니를 기억하지 못해요. 생후 닷새만에... 돌아가셨으니까요.

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
  },

  // ═══════════════════════════════════════════════════════
  // 🏃 엘렌과 함께 지하실 조사 (대체 루트)
  // ═══════════════════════════════════════════════════════
  
  basement_with_ellen: {
    id: 'basement_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[지하실 입구]

엘렌이 지하실 문 앞에서 멈춘다.

[엘렌]: 여기는... 한 번도 내려와본 적이 없어요.

[왓슨]: 괜찮습니다. 우리가 함께 있으니까요.

홈즈가 문을 연다.

어둡고 차가운 공기가 올라온다.

계단을 내려간다.

그리고...`,
    choices: [
      { text: '🔦 [횃불을 켠다]', nextNode: 'basement_discovery_with_ellen' }
    ]
  },

  basement_discovery_with_ellen: {
    id: 'basement_discovery_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[지하실 내부]

횃불 빛이 지하실을 비춘다.

그리고... 당신은 본다.

바닥에 쓰러진 한 남자.

모로 백작이다!

[엘렌]: 아버지!!!

엘렌이 비명을 지르며 달려든다.

[왓슨]: 엘렌 양, 잠깐!

당신이 그녀를 붙잡는다.

홈즈가 백작에게 다가가 맥박을 확인한다.

[셜록 홈즈]: ...살아있습니다. 독이 몸에 퍼지고 있지만, 아직 시간이 있어요!

[왓슨]: 해독제가 필요합니다!

엘렌이 눈물을 흘린다.

[엘렌]: 아버지... 제발...`,
    choices: [
      { text: '💉 [왓슨의 의술로 응급처치한다]', nextNode: 'watson_saves_count_with_ellen' },
      { text: '🔍 [주변을 수색해 해독제를 찾는다]', nextNode: 'find_antidote_with_ellen' }
    ]
  },

  watson_saves_count_with_ellen: {
    id: 'watson_saves_count_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `당신이 재빠르게 의료 가방을 꺼낸다.

[왓슨]: 홈즈, 그를 바로 눕혀!

홈즈가 백작을 바로 눕힌다.

당신이 독의 증상을 확인한다.

[왓슨]: 이건... 알칼로이드 계통 독... 아트로핀으로 중화할 수 있어!

재빠르게 주사를 놓는다.

엘렌이 아버지의 손을 잡는다.

[엘렌]: 아버지... 저예요, 엘렌이에요...

백작의 눈꺼풀이 떨린다.

[모로 백작]: 엘...렌...?

[엘렌]: 네! 저예요!

백작이 희미하게 미소 짓는다.

[모로 백작]: 살아있구나... 다행이다...`,
    choices: [
      { text: '💬 "백작님, 누가 이렇게 만들었습니까?"', nextNode: 'count_reveals_culprit_to_ellen' },
      { text: '🌹 [엘렌과 백작의 재회를 지켜본다]', nextNode: 'ellen_count_reunion' }
    ]
  },

  find_antidote_with_ellen: {
    id: 'find_antidote_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `당신이 지하실을 수색한다.

선반 위에... 작은 약병이 보인다!

[왓슨]: 이것은... 해독제!

홈즈가 병을 확인한다.

[셜록 홈즈]: 맞습니다! 누군가 미리 준비해둔 것 같군요!

당신이 백작의 입에 해독제를 흘려넣는다.

엘렌이 아버지를 안는다.

[엘렌]: 아버지... 제발...

백작이 기침을 하고... 눈을 뜬다.

[모로 백작]: 엘...렌...

[엘렌]: 아버지!

눈물이 흐른다.`,
    choices: [
      { text: '🌹 [재회를 지켜본다]', nextNode: 'ellen_count_reunion' }
    ]
  },

  ellen_count_reunion: {
    id: 'ellen_count_reunion',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 아버지... 괜찮으세요?

[모로 백작]: 엘렌... 내 딸...

백작이 그녀의 손을 잡는다.

[모로 백작]: 미안하다... 너를... 지키지 못해서...

[엘렌]: 아니에요! 아버지는... 저를 지켜주셨어요! 20년간!

[모로 백작]: 루시를... 지키지 못했지만... 너만은...

그가 눈물을 흘린다.

[엘렌]: 어머니도... 고마워하실 거예요. 아버지가 저를 키워주신 걸.

[모로 백작]: 엘렌...

둘이 껴안는다.

당신과 홈즈는... 조용히 지켜본다.

이것이... 20년의 속죄다.`,
    choices: [
      { text: '💬 "백작님, 이제 진실을 말씀해주십시오"', nextNode: 'count_full_confession_with_ellen' },
      { text: '🔍 "누가 이런 짓을 했습니까?"', nextNode: 'count_reveals_culprit_to_ellen' }
    ]
  },

  count_reveals_culprit_to_ellen: {
    id: 'count_reveals_culprit_to_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'count',
    text: `[모로 백작]: 그것은...

백작이 고통스럽게 말한다.

[모로 백작]: 호프... 제퍼슨 호프였소.

엘렌이 숨을 멈춘다.

[엘렌]: 어머니의...

[모로 백작]: 네. 루시의 연인이었던 남자요.

[모로 백작]: 그가... 20년간 나를 추적했소. 복수하기 위해.

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: 우물에서 로켓을 발견했습니다. 루시의 로켓을.

[모로 백작]: 그것은... 호프가 20년간 간직했던 것이오.

[모로 백작]: 그가... 내게 독을 먹였소. 그리고 그 로켓을 놓고 갔소.

[모로 백작]: 복수의... 증표로.`,
    choices: [
      { text: '💬 "호프는 지금 어디 있습니까?"', nextNode: 'search_for_hope_with_ellen' },
      { text: '🌹 [엘렌을 본다]', nextNode: 'ellen_reaction_to_hope' }
    ]
  },

  count_full_confession_with_ellen: {
    id: 'count_full_confession_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    character: 'count',
    text: `[모로 백작]: 진실을... 말하겠소.

백작이 일어나 앉는다.

[모로 백작]: 20년 전... 나는 스탠거슨, 드레버와 함께 유타에서 금광 사기를 벌였소.

[모로 백작]: 많은 사람들을 속였소. 그중에는... 루시의 아버지도 있었소.

엘렌이 듣는다.

[모로 백작]: 루시는... 우리의 죄를 알아챘소. 그리고 경찰에 신고하려 했소.

[모로 백작]: 하지만... 모르몬교도들이 그녀를 납치했소. 우리가 사주한 것이오.

[엘렌]: ...아버지.

[모로 백작]: 미안하다, 엘렌. 나는... 악마였소.

그가 눈물을 흘린다.

[모로 백작]: 하지만 루시를 직접 만나고... 나는 변했소. 그녀는 선한 사람이었소.

[모로 백작]: 나는... 그녀를 탈출시켰소. 내 저택에 숨겨주었소.

[모로 백작]: 그리고 그녀가 너를 낳았을 때... 나는 맹세했소.

[모로 백작]: 루시를 지키지 못한 대신... 너만은 반드시 지키겠다고.`,
    choices: [
      { text: '🌹 [엘렌의 반응을 본다]', nextNode: 'ellen_forgives_count' },
      { text: '💬 "그래서 20년간 숨겨 키운 것이군요"', nextNode: 'count_final_words' }
    ]
  },

  ellen_reaction_to_hope: {
    id: 'ellen_reaction_to_hope',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 호프님이...

그녀가 떨린다.

[엘렌]: 어머니의 연인이... 아버지를...

[왓슨]: 엘렌 양...

[엘렌]: 저는... 저는 어떻게 해야 하나요?

[그녀가 당신을 본다]

[엘렌]: 호프님은... 어머니를 사랑했어요. 20년간 복수를 준비했어요.

[엘렌]: 하지만... 아버지도... 저를 사랑하셨어요. 20년간 저를 키워주셨어요.

[그녀가 눈물을 흘린다]

[엘렌]: 저는... 누구 편이어야 하나요?

당신은... 답할 수 없다.

이것은 그녀만이 결정할 수 있는 문제다.`,
    choices: [
      { text: '💬 "당신의 마음을 따르세요"', nextNode: 'ellen_makes_choice' },
      { text: '🔍 "호프를 찾아야 합니다"', nextNode: 'search_for_hope_with_ellen' }
    ]
  },

  ellen_forgives_count: {
    id: 'ellen_forgives_count',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 아버지...

그녀가 백작을 안는다.

[엘렌]: 저는... 아버지를 사랑해요.

[모로 백작]: 엘렌...

[엘렌]: 과거에 무슨 일이 있었든... 아버지는 저를 사랑으로 키워주셨어요.

[엘렌]: 그것이... 진실이에요.

백작이 흐느낀다.

[모로 백작]: 고맙다... 내 딸...

홈즈가 조용히 말한다.

[셜록 홈즈]: 사랑이... 속죄의 시작이군요.

당신도 고개를 끄덕인다.

이것이... 진정한 용서다.`,
    choices: [
      { text: '🔍 "이제 호프를 찾아야 합니다"', nextNode: 'search_for_hope_with_ellen' },
      { text: '💬 "백작님을 안전한 곳으로 옮깁시다"', nextNode: 'move_count_safely' }
    ]
  },

  ellen_makes_choice: {
    id: 'ellen_makes_choice',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: ...제 마음은.

그녀가 눈을 감는다.

[엘렌]: 두 분 모두를... 구하고 싶어요.

[엘렌]: 아버지도, 호프님도... 모두 슬픔 속에서 살아왔어요.

[엘렌]: 어머니라면... 어떻게 하셨을까요?

그녀가 로켓을 펼친다.

루시의 초상화가 보인다.

[엘렌]: 어머니라면... 복수가 아니라 용서를 원하셨을 거예요.

[그녀가 결연한 표정을 짓는다]

[엘렌]: 저는... 호프님을 만나겠어요. 그리고 말씀드리겠어요.

[엘렌]: "어머니는 복수를 원하지 않으셨을 거라고."`,
    choices: [
      { text: '🌹 "용기 있는 선택입니다"', nextNode: 'ellen_brave_decision' },
      { text: '🔍 "함께 호프를 찾읍시다"', nextNode: 'search_for_hope_with_ellen' }
    ]
  },

  ellen_brave_decision: {
    id: 'ellen_brave_decision',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: 엘렌 양... 당신은 정말 용감합니다.

[엘렌]: 아니에요. 저는... 그저 어머니의 뜻을 따르고 싶을 뿐이에요.

홈즈가 미소 짓는다.

[셜록 홈즈]: 루시도 당신을 자랑스러워할 겁니다.

백작이 딸의 손을 잡는다.

[모로 백작]: 엘렌... 넌 정말... 루시를 닮았구나.

[엘렌]: 감사합니다, 아버지.

그녀가 일어선다.

[엘렌]: 이제... 호프님을 찾아야 해요.

당신이 고개를 끄덕인다.

[왓슨]: 함께 갑시다.`,
    choices: [
      { text: '🏃 [호프를 찾으러 간다]', nextNode: 'search_for_hope_with_ellen' }
    ]
  },

  search_for_hope_with_ellen: {
    id: 'search_for_hope_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `당신과 홈즈, 그리고 엘렌이 저택을 수색한다.

호프는 어디에 있을까?

정원을 확인한다.

복도를 확인한다.

그리고... 뒷뜰 우물가에서.

한 남자가 서 있다.

제퍼슨 호프다.

그는 로켓을 바라보고 있다.

엘렌이 숨을 멈춘다.`,
    choices: [
      { text: '💬 [엘렌이 다가간다]', nextNode: 'ellen_meets_hope' },
      { text: '🔍 [당신이 먼저 호프에게 다가간다]', nextNode: 'watson_confronts_hope_with_ellen' }
    ]
  },

  ellen_meets_hope: {
    id: 'ellen_meets_hope',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 조용히 다가간다.

[엘렌]: ...호프님?

호프가 돌아본다.

그리고... 얼어붙는다.

[제퍼슨 호프]: 너는... 

[엘렌]: 저는 엘렌입니다. 루시의...

[제퍼슨 호프]: 딸...

호프의 손이 떨린다. 그의 얼굴이 창백해진다.

[제퍼슨 호프]: 하지만... 너는... 죽었다고... 교단이...

[엘렌]: 백작님이 저를 구해주셨어요. 20년간 키워주셨죠.

호프가 비틀거린다. 믿을 수 없다는 표정이다.

[제퍼슨 호프]: 살아있었다고...? 내 딸이... 내 엘렌이...

[엘렌]: 네. 어머니를... 어머니를 사랑하셨다고 들었어요.

호프가 무릎을 꿇는다.

[제퍼슨 호프]: 엘렌... 내 딸... 미안하오...

그가 흐느낀다.

[제퍼슨 호프]: 네가 살아있는 줄도 몰랐소... 20년간... 죽었다고 믿었소...

[제퍼슨 호프]: 미안하오... 아버지가... 너를 찾지도 못했구나...

엘렌도 눈물을 흘린다.`,
    choices: [
      { text: '🌹 [두 사람의 만남을 지켜본다]', nextNode: 'ellen_hope_reconciliation' },
      { text: '💬 "호프, 백작은 아직 살아있습니다"', nextNode: 'hope_learns_count_alive' }
    ]
  },

  watson_confronts_hope_with_ellen: {
    id: 'watson_confronts_hope_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `당신이 호프에게 다가간다.

[왓슨]: 호프.

호프가 돌아본다.

[제퍼슨 호프]: 탐정... 그리고...

그가 엘렌을 본다.

[제퍼슨 호프]: ...루시?

호프의 눈이 흔들린다. 루시와 너무나 닮았다.

[엘렌]: 아니에요. 저는 엘렌입니다. 어머니의 딸이에요.

호프가 충격을 받는다. 손이 떨린다.

[제퍼슨 호프]: 딸... 루시에게 딸이...?

[제퍼슨 호프]: 하지만... 죽었다고... 교단이 처형했다고...

당신이 말한다.

[왓슨]: 백작이 20년간 키웠습니다. 루시의 딸을.

[왓슨]: 엘렌은 살아있었습니다. 백작이 구해서 자신의 딸로...

호프가 무릎을 꿇는다.

[제퍼슨 호프]: 살아있었구나... 내 딸이...`,
    choices: [
      { text: '💬 "백작은 속죄하려 했습니다"', nextNode: 'watson_explains_count' },
      { text: '🔍 "당신은 백작을 독살했습니다"', nextNode: 'accuse_hope_with_ellen' }
    ]
  },

  ellen_hope_reconciliation: {
    id: 'ellen_hope_reconciliation',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 호프님... 어머니는... 복수를 원하지 않으셨을 거예요.

[제퍼슨 호프]: ...뭐라고?

[엘렌]: 어머니는... 선한 분이셨다고 들었어요.

[엘렌]: 복수보다는... 용서를 원하셨을 거예요.

호프가 고개를 젓는다.

[제퍼슨 호프]: 아니오... 루시는... 정의를 사랑했소...

[엘렌]: 네. 정의를요. 복수가 아니라.

그녀가 호프의 손을 잡는다.

[엘렌]: 호프님... 이제 그만하세요. 어머니를 위해서.

호프가... 무너진다.

[제퍼슨 호프]: 루시... 미안하오... 나는... 잘못된 길을...

눈물이 흐른다.

20년의 복수가... 무너진다.`,
    choices: [
      { text: '💬 "백작은 아직 살아있습니다"', nextNode: 'hope_learns_count_alive' },
      { text: '🌹 [엘렌이 호프를 위로한다]', nextNode: 'ellen_comforts_hope' }
    ]
  },

  watson_explains_count: {
    id: 'watson_explains_count',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: 백작은... 과거를 후회했습니다.

[왓슨]: 루시를 지키지 못한 것을. 그래서 엘렌을 키웠습니다.

[왓슨]: 20년간... 사랑으로.

호프가 바닥을 본다.

[제퍼슨 호프]: 그래도... 그래도 루시는 죽었소!

[엘렌]: 호프님...

엘렌이 다가간다.

[엘렌]: 어머니는... 복수를 원하지 않으셨을 거예요.

호프가 그녀를 본다.

루시를 닮은 얼굴.

[제퍼슨 호프]: ...루시.

그가 무릎을 꿇는다.

[제퍼슨 호프]: 미안하오... 나는... 잘못된 길을...`,
    choices: [
      { text: '💬 "백작은 아직 살아있습니다"', nextNode: 'hope_learns_count_alive' },
      { text: '🌹 [엘렌을 본다]', nextNode: 'ellen_decides_hope_fate' }
    ]
  },

  accuse_hope_with_ellen: {
    id: 'accuse_hope_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: 당신은 백작을 독살했습니다!

[제퍼슨 호프]: ...맞소.

그가 고개를 끄덕인다.

[제퍼슨 호프]: 20년을 기다렸소. 이 순간을.

엘렌이 떨린다.

[엘렌]: 아버지를...

[제퍼슨 호프]: 미안하오, 아가씨. 하지만... 그는 루시를 죽게 만들었소!

홈즈가 말한다.

[셜록 홈즈]: 하지만 백작은 속죄했습니다. 20년간 당신의 딸을 키우면서.

호프가 충격을 받는다.

[제퍼슨 호프]: ...내 딸?

그가 엘렌을 본다. 믿을 수 없다는 얼굴이다.

[제퍼슨 호프]: 하지만... 죽었다고... 교단이...

[엘렌]: 저는... 어머니와 호프님의 딸입니다. 하지만...

[엘렌]: 저를 키운 건 백작님이셨어요. 20년간... 아버지처럼.

[제퍼슨 호프]: ...

그가 주저앉는다.`,
    choices: [
      { text: '💬 "백작은 아직 살아있습니다"', nextNode: 'hope_learns_count_alive' },
      { text: '🔍 "당신을 체포하겠습니다"', nextNode: 'arrest_hope_with_ellen' }
    ]
  },

  hope_learns_count_alive: {
    id: 'hope_learns_count_alive',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    text: `[제퍼슨 호프]: ...뭐라고?

[왓슨]: 백작은 아직 살아있습니다. 우리가 해독제를 투여했습니다.

호프가 충격을 받는다.

[제퍼슨 호프]: 살아... 있다고?

[셜록 홈즈]: 네. 당신의 복수는... 실패했습니다.

호프가 무릎을 꿇는다.

[제퍼슨 호프]: 그렇다면... 나는... 살인 미수범...

엘렌이 그에게 다가간다.

[엘렌]: 호프님... 이제 그만하세요.

[엘렌]: 어머니도... 이런 당신을 원하지 않으실 거예요.

호프가 눈물을 흘린다.

[제퍼슨 호프]: 루시... 미안하오...

그가 로켓을 꺼내 엘렌에게 건넨다.

[제퍼슨 호프]: 이것은... 너의 어머니 것이오. 네가 가져라.`,
    choices: [
      { text: '🌹 [엘렌이 로켓을 받는다]', nextNode: 'ellen_receives_locket' },
      { text: '💬 "호프, 당신은 어떻게 하시겠습니까?"', nextNode: 'hope_final_decision' }
    ]
  },

  ellen_comforts_hope: {
    id: 'ellen_comforts_hope',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 호프님... 괜찮으세요.

그녀가 호프를 안아준다.

[엘렌]: 어머니는... 당신을 사랑하셨어요.

[엘렌]: 그리고... 당신이 행복하기를 원하셨을 거예요.

호프가 흐느낀다.

[제퍼슨 호프]: 루시... 나는... 너를 위해...

[엘렌]: 어머니는 이미 알고 계세요. 호프님이 얼마나 사랑했는지.

그녀가 로켓을 본다.

[엘렌]: 이제... 복수를 놓으세요. 어머니를 위해서.

호프가 고개를 끄덕인다.

[제퍼슨 호프]: ...알겠소.

그가 로켓을 엘렌에게 건넨다.

[제퍼슨 호프]: 이것은... 네 어머니의 것이오. 네가 가져라.`,
    choices: [
      { text: '🌹 [엘렌이 로켓을 받는다]', nextNode: 'ellen_receives_locket' }
    ]
  },

  ellen_decides_hope_fate: {
    id: 'ellen_decides_hope_fate',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 탐정님...

그녀가 당신을 본다.

[엘렌]: 호프님을... 어떻게 하실 건가요?

[왓슨]: 그것은... 법이 결정할 문제입니다.

[엘렌]: 하지만... 호프님은 어머니를 사랑했어요.

[엘렌]: 복수는 잘못됐지만... 그 마음만은 진실이었어요.

홈즈가 당신을 본다.

[셜록 홈즈]: 왓슨... 당신의 판단은?

당신은... 고민한다.

법과 정의.

복수와 용서.

무엇이 옳은가?`,
    choices: [
      { text: '⚖️ "법에 맡기는 것이 옳습니다"', nextNode: 'hope_to_court_with_ellen' },
      { text: '🌹 "엘렌 양의 뜻을 따르겠습니다"', nextNode: 'ellen_decides' },
      { text: '💬 "호프, 당신이 결정하시오"', nextNode: 'hope_final_decision' }
    ]
  },

  ellen_receives_locket: {
    id: 'ellen_receives_locket',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `엘렌이 로켓을 받는다.

손에 쥐고... 펼쳐본다.

루시의 초상화가 빛난다.

[엘렌]: 어머니...

그녀가 눈물을 흘린다.

[엘렌]: 저는... 어머니를 본 적이 없어요.

[엘렌]: 하지만 이제... 어머니를 느낄 수 있어요.

호프가 고개를 끄덕인다.

[제퍼슨 호프]: 루시는... 정말 아름다운 사람이었소.

[제퍼슨 호프]: 그리고 넌... 그녀를 닮았소.

엘렌이 미소 짓는다.

[엘렌]: 감사합니다, 호프님.

당신과 홈즈는... 조용히 지켜본다.

이것이... 진정한 화해다.`,
    choices: [
      { text: '💬 "이제... 백작에게 돌아갑시다"', nextNode: 'return_to_count_with_all' },
      { text: '⚖️ "호프, 당신은 법정에 서야 합니다"', nextNode: 'hope_to_court_with_ellen' }
    ]
  },

  hope_final_decision: {
    id: 'hope_final_decision',
    day: 1,
    timeOfDay: 'evening',
    character: 'hope',
    text: `[제퍼슨 호프]: 나는...

그가 하늘을 올려다본다.

[제퍼슨 호프]: 법정에 서겠소.

[왓슨]: ...

[제퍼슨 호프]: 20년간 복수를 준비했소. 하지만... 잘못됐소.

[제퍼슨 호프]: 루시는... 복수를 원하지 않았을 거요.

그가 엘렌을 본다.

[제퍼슨 호프]: 네가 증명했소. 루시의 뜻을.

[엘렌]: 호프님...

[제퍼슨 호프]: 법이 나를 심판하도록 하겠소. 그것이... 정의니까.

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: 용기 있는 선택입니다, 호프.

당신도 고개를 끄덕인다.

이것이... 진정한 정의의 시작이다.`,
    choices: [
      { text: '⚖️ [호프를 법정으로 데려간다]', nextNode: 'hope_court_ending_with_ellen' },
      { text: '🌹 [먼저 백작에게 돌아간다]', nextNode: 'return_to_count_with_all' }
    ]
  },

  arrest_hope_with_ellen: {
    id: 'arrest_hope_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: 제퍼슨 호프, 당신을 살인 미수 혐의로 체포합니다.

호프가 고개를 끄덕인다.

[제퍼슨 호프]: ...알겠소.

그가 손을 내민다.

엘렌이 당신을 붙잡는다.

[엘렌]: 잠깐만요, 박사님!

[왓슨]: 엘렌 양...

[엘렌]: 호프님은... 어머니를 사랑했어요!

[엘렌]: 복수는 잘못됐지만... 그 마음만은 진실이었어요!

당신은 고민한다.

법과 인정.

무엇이 옳은가?`,
    choices: [
      { text: '⚖️ "법은 법입니다"', nextNode: 'hope_arrested_ending' },
      { text: '🌹 "엘렌 양의 말도 일리가 있습니다"', nextNode: 'hope_mercy_route' }
    ]
  },

  hope_to_court_with_ellen: {
    id: 'hope_to_court_with_ellen',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: 호프. 당신은 법정에 서야 합니다.

호프가 고개를 끄덕인다.

[제퍼슨 호프]: 알고 있소.

엘렌이 그의 손을 잡는다.

[엘렌]: 호프님... 저는 법정에서 증언하겠어요.

[제퍼슨 호프]: ...뭐라고?

[엘렌]: 호프님이 어머니를 얼마나 사랑했는지. 20년간 얼마나 고통받았는지.

[엘렌]: 그리고... 어머니라면 용서하셨을 거라고.

호프가 눈물을 흘린다.

[제퍼슨 호프]: 고맙소... 아가씨...

홈즈가 말한다.

[셜록 홈즈]: 법정이 당신을 공정하게 심판할 겁니다.

당신도 고개를 끄덕인다.

이것이... 정의다.`,
    choices: [
      { text: '⚖️ [법정 엔딩으로]', nextNode: 'hope_court_ending_with_ellen' }
    ]
  },

  return_to_count_with_all: {
    id: 'return_to_count_with_all',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `당신들이 지하실로 돌아간다.

백작이 여전히 누워있다.

엘렌과 호프가 들어서자...

백작이 눈을 뜬다.

[모로 백작]: 호프...

[제퍼슨 호프]: 백작...

둘이 마주 본다.

20년의 원한.

하지만... 엘렌이 그 사이에 선다.

[엘렌]: 아버지. 호프님. 두 분 모두... 어머니를 사랑하셨어요.

[엘렌]: 이제... 원한을 끝내세요. 어머니를 위해서.

백작과 호프가... 서로를 본다.

그리고...`,
    choices: [
      { text: '🌹 [화해의 순간]', nextNode: 'count_hope_reconciliation' },
      { text: '💬 [당신이 중재한다]', nextNode: 'watson_mediates' }
    ]
  },

  ellen_decides: {
    id: 'ellen_decides',
    day: 1,
    timeOfDay: 'evening',
    character: 'ellen',
    text: `[엘렌]: 저는...

그녀가 깊게 숨을 쉰다.

[엘렌]: 호프님을... 용서하고 싶어요.

[왓슨]: ...엘렌 양.

[엘렌]: 어머니라면... 그렇게 하셨을 거예요.

[엘렌]: 복수보다는 용서를. 분노보다는 사랑을.

호프가 무릎을 꿇는다.

[제퍼슨 호프]: 아가씨... 고맙소...

[엘렌]: 하지만 조건이 있어요.

[제퍼슨 호프]: ...무엇이오?

[엘렌]: 이제 복수를 멈추세요. 그리고... 어머니를 위해 살아가세요.

[엘렌]: 복수가 아니라... 사랑으로.

호프가 눈물을 흘린다.

[제퍼슨 호프]: ...약속하겠소.`,
    choices: [
      { text: '🌹 [감동적인 순간]', nextNode: 'mercy_ending_with_ellen' }
    ]
  },

  count_hope_reconciliation: {
    id: 'count_hope_reconciliation',
    day: 1,
    timeOfDay: 'evening',
    character: 'count',
    text: `[모로 백작]: 호프...

백작이 손을 내민다.

[모로 백작]: 미안하오. 루시를... 지키지 못해서.

호프가 그 손을 잡는다.

[제퍼슨 호프]: 나도... 미안하오. 복수에 눈이 멀어서...

둘이 악수한다.

20년의 원한이... 끝난다.

엘렌이 미소 짓는다.

[엘렌]: 어머니도... 기뻐하실 거예요.

홈즈가 조용히 말한다.

[셜록 홈즈]: 이것이... 진정한 해결이군요.

당신도 고개를 끄덕인다.

사건은... 이렇게 끝난다.

복수가 아니라 화해로.`,
    choices: [
      { text: '🌟 [진엔딩으로]', nextNode: 'true_ending_with_ellen' }
    ]
  },

  watson_mediates: {
    id: 'watson_mediates',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: 두 분 모두... 들어주십시오.

당신이 백작과 호프 사이에 선다.

[왓슨]: 백작. 당신은 과거에 잘못을 저질렀습니다. 하지만 20년간 속죄했습니다.

[왓슨]: 호프. 당신은 사랑하는 사람을 잃었습니다. 하지만 복수는 해결책이 아닙니다.

[왓슨]: 엘렌을 보십시오. 루시의 딸을.

엘렌이 두 사람을 본다.

[왓슨]: 그녀는... 용서를 선택했습니다. 루시의 뜻을 따라서.

[왓슨]: 두 분도... 그렇게 하시겠습니까?

백작과 호프가... 서로를 본다.

그리고... 고개를 끄덕인다.`,
    choices: [
      { text: '🌹 [화해 성공]', nextNode: 'count_hope_reconciliation' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🌟 엘렌 관련 엔딩들
  // ═══════════════════════════════════════════════════════

  true_ending_with_ellen: {
    id: 'true_ending_with_ellen',
    day: 1,
    timeOfDay: 'night',
    speaker: 'watson',
    text: `[🌟 진엔딩: 용서와 화해]

[3개월 후, 런던]

당신은 신문을 펼친다.

**"모로 백작 사건, 화해로 종결"**
**"피해자와 가해자, 법정에서 화해 성립"**

백작은 과거의 죄를 인정했다.
호프는 복수를 포기했다.

법원은... 둘 모두에게 집행유예를 선고했다.

엘렌의 증언이 결정적이었다.

"어머니는 복수가 아니라 용서를 원하셨을 겁니다."

---

[베이커 스트리트 221B]

홈즈가 파이프를 피운다.

[셜록 홈즈]: 왓슨. 좋은 소식이 있어.

[왓슨]: 무엇이지?

[셜록 홈즈]: 엘렌이 편지를 보냈어. 백작과 호프가 함께 자선재단을 설립했대.

[왓슨]: 자선재단?

[셜록 홈즈]: 루시 페리어 재단. 억울한 피해자들을 돕는 재단이야.

당신은 미소 짓는다.

[왓슨]: 그것이... 진정한 속죄군.

[셜록 홈즈]: 그리고 엘렌이 재단 이사장이래.

[왓슨]: 엘렌이?

[셜록 홈즈]: 루시의 딸답게... 정의를 실현하고 있어.

창밖으로 런던의 저녁이 보인다.

사건은 끝났다.

복수가 아니라 화해로.

분노가 아니라 용서로.

이것이... 진정한 정의다.

---

🌟 **TRUE ENDING 달성**
"용서와 화해 - 루시의 뜻대로"

엘렌이 두 사람을 화해시켰습니다.
백작과 호프는 함께 속죄하고 있습니다.
루시 페리어 재단이 많은 사람들을 돕고 있습니다.

당신은... 진정한 탐정이 되었습니다.

THE END`,
    isEnding: true,
    endingType: 'true',
    choices: []
  },

  mercy_ending_with_ellen: {
    id: 'mercy_ending_with_ellen',
    day: 1,
    timeOfDay: 'night',
    speaker: 'watson',
    text: `[✨ 자비 엔딩: 엘렌의 용서]

엘렌의 용서로... 모든 것이 끝났다.

호프는 복수를 포기했다.
백작은 과거를 인정했다.

둘은... 악수했다.

20년의 원한이 끝났다.

---

[1개월 후]

당신은 엘렌에게서 편지를 받는다.

"박사님, 고맙습니다.

아버지와 호프님은 이제 친구가 되었어요.
함께 어머니 무덤을 찾아갔답니다.

어머니도... 기뻐하실 거예요.

복수가 아니라 용서를 선택해서.

엘렌 올림"

당신은 미소 짓는다.

홈즈가 말한다.

[셜록 홈즈]: 왓슨. 이번 사건에서 우리가 배운 것은...

[왓슨]: 용서의 힘이지.

[셜록 홈즈]: 그리고... 사랑의 힘.

두 사람이 창밖을 본다.

런던의 저녁이 아름답다.

---

✨ **MERCY ENDING 달성**
"엘렌의 용서"

엘렌이 호프를 용서했습니다.
백작과 호프는 화해했습니다.
루시의 뜻이 실현되었습니다.

THE END`,
    isEnding: true,
    endingType: 'good',
    choices: []
  },

  hope_court_ending_with_ellen: {
    id: 'hope_court_ending_with_ellen',
    day: 1,
    timeOfDay: 'night',
    speaker: 'watson',
    text: `[⚖️ 정의 엔딩: 법정의 판결]

[2주 후, 런던 법정]

재판이 열렸다.

호프가 피고인석에 앉아있다.

엘렌이 증인석에 선다.

[엘렌]: 호프님은... 어머니를 사랑했습니다.

[엘렌]: 20년간 복수를 준비했지만... 그것은 사랑 때문이었습니다.

[엘렌]: 어머니라면... 호프님을 용서하셨을 겁니다.

판사가 고민한다.

그리고... 판결을 내린다.

**"피고인 제퍼슨 호프, 살인 미수 혐의... 징역 5년, 집행유예 5년"**

**"단, 피해자 모로 백작과의 화해 조건부"**

백작이 일어선다.

[모로 백작]: 저는... 호프와 화해하겠습니다.

법정이 술렁인다.

호프가 눈물을 흘린다.

---

[법정 밖]

엘렌이 당신에게 다가온다.

[엘렌]: 감사합니다, 박사님. 탐정님.

[왓슨]: 당신이 해낸 겁니다, 엘렌 양.

홈즈가 고개를 끄덕인다.

[셜록 홈즈]: 법과 인정... 둘 다 실현되었군요.

당신은 미소 짓는다.

이것이... 정의다.

---

⚖️ **JUSTICE ENDING 달성**
"법정의 정의"

호프는 법정에 섰습니다.
엘렌의 증언으로 선처되었습니다.
백작과의 화해가 이루어졌습니다.

THE END`,
    isEnding: true,
    endingType: 'good',
    choices: []
  },

  hope_arrested_ending: {
    id: 'hope_arrested_ending',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[⚔️ 법 엔딩: 엄격한 정의]

당신이 호프를 체포한다.

엘렌이 울부짖는다.

[엘렌]: 안 돼요! 호프님은...!

[왓슨]: 죄송합니다, 엘렌 양. 하지만 법은 법입니다.

호프가 고개를 끄덕인다.

[제퍼슨 호프]: 괜찮소, 아가씨. 나는... 받아야 할 벌을 받겠소.

경찰이 호프를 데려간다.

엘렌이 무너진다.

---

[2주 후, 재판 결과]

**"제퍼슨 호프, 살인 미수 혐의 징역 10년"**

가혹한 판결이었다.

엘렌은 매주 호프를 면회한다.

백작은... 호프를 용서했지만.

법은 용서하지 않았다.

홈즈가 말한다.

[셜록 홈즈]: 왓슨... 우리가 한 게 옳았을까요?

당신은... 답할 수 없다.

정의는 실현됐지만...

마음은 무겁다.

---

⚔️ **LAW ENDING 달성**
"엄격한 정의"

호프는 체포되었습니다.
법정에서 유죄 판결을 받았습니다.
엘렌은 슬퍼하고 있습니다.

THE END`,
    isEnding: true,
    endingType: 'neutral',
    choices: []
  },

  hope_mercy_route: {
    id: 'hope_mercy_route',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: ...엘렌 양의 말도 일리가 있습니다.

[셜록 홈즈]: 왓슨?

[왓슨]: 호프. 당신의 고통을 이해합니다. 하지만...

[왓슨]: 이제 복수를 끝내십시오. 루시를 위해서.

호프가 엘렌을 본다.

루시를 닮은 얼굴.

[제퍼슨 호프]: ...알겠소.

그가 고개를 숙인다.

[제퍼슨 호프]: 법정에 서겠소. 하지만... 복수는 끝내겠소.

엘렌이 미소 짓는다.

[엘렌]: 감사합니다, 호프님.

당신도 미소 짓는다.

이것이... 진정한 정의의 시작이다.`,
    choices: [
      { text: '⚖️ [법정 엔딩으로]', nextNode: 'hope_court_ending_with_ellen' }
    ]
  },

  count_final_words: {
    id: 'count_final_words',
    day: 1,
    timeOfDay: 'evening',
    character: 'count',
    text: `[모로 백작]: 맞소... 20년간 숨겨 키웠소.

[모로 백작]: 루시를 지키지 못한 대신... 엘렌만은 지키겠다고 맹세했소.

엘렌이 아버지를 안는다.

[엘렌]: 아버지... 고마워요. 저를 사랑해주셔서.

백작이 눈물을 흘린다.

[모로 백작]: 엘렌... 너는 내 인생의 구원이었어.

[모로 백작]: 너 때문에... 나는 다시 인간이 될 수 있었어.

홈즈가 조용히 말한다.

[셜록 홈즈]: 사랑이... 사람을 바꾸는군요.

당신도 고개를 끄덕인다.

이것이... 진정한 속죄다.`,
    choices: [
      { text: '🔍 "이제 호프를 찾아야 합니다"', nextNode: 'search_for_hope_with_ellen' },
      { text: '🌹 [가족의 재회를 지켜본다]', nextNode: 'family_moment' }
    ]
  },

  family_moment: {
    id: 'family_moment',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `당신과 홈즈는... 조용히 물러선다.

백작과 엘렌이 서로를 안고 있다.

20년의 사랑.

20년의 속죄.

이것이... 가족이다.

홈즈가 당신에게 속삭인다.

[셜록 홈즈]: 왓슨... 우리가 지켜야 할 것은 이것이었군요.

[왓슨]: 가족?

[셜록 홈즈]: 사랑입니다. 법도 정의도... 사랑 위에 세워져야 해요.

당신은 고개를 끄덕인다.

그리고... 호프를 찾으러 간다.

진정한 해결을 위해서.`,
    choices: [
      { text: '🏃 [호프를 찾으러 간다]', nextNode: 'search_for_hope_with_ellen' }
    ]
  },

  move_count_safely: {
    id: 'move_count_safely',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[왓슨]: 백작님을 안전한 곳으로 옮깁시다.

홈즈와 함께 백작을 침실로 옮긴다.

엘렌이 아버지 곁을 지킨다.

[엘렌]: 아버지... 괜찮으실 거예요.

백작이 미소 짓는다.

[모로 백작]: 엘렌... 너만 있으면... 나는 괜찮아.

당신이 백작의 상태를 확인한다.

[왓슨]: 독은 거의 빠졌습니다. 며칠 쉬면 회복하실 겁니다.

홈즈가 창밖을 본다.

[셜록 홈즈]: 이제... 호프를 찾아야 합니다.

[왓슨]: 맞아. 진범을 잡지 않으면...`,
    choices: [
      { text: '🔍 [호프를 찾으러 간다]', nextNode: 'search_for_hope_with_ellen' },
      { text: '🌹 [엘렌과 함께 백작을 간호한다]', nextNode: 'care_for_count' }
    ]
  },

  care_for_count: {
    id: 'care_for_count',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `당신이 백작을 간호한다.

엘렌이 아버지의 손을 잡고 있다.

[엘렌]: 박사님... 아버지는 괜찮으실 거죠?

[왓슨]: 네. 걱정 마세요.

백작이 평화롭게 숨을 쉰다.

홈즈가 문 밖에서 경비를 선다.

[셜록 홈즈]: 왓슨. 호프가 다시 올 수도 있어요.

[왓슨]: 알아. 준비하고 있어.

하지만... 호프는 나타나지 않는다.

어디로 간 걸까?`,
    choices: [
      { text: '🔍 [다음날 호프를 수색한다]', nextNode: 'search_hope_next_day' },
      { text: '🌹 [백작이 회복할 때까지 기다린다]', nextNode: 'wait_for_count_recovery' }
    ]
  },

  search_hope_next_day: {
    id: 'search_hope_next_day',
    day: 2,
    timeOfDay: 'morning',
    speaker: 'watson',
    text: `[다음날 아침]

당신과 홈즈가 저택을 수색한다.

호프의 흔적을 찾는다.

그리고... 뒷뜰 우물가에서.

한 남자가 서 있다.

제퍼슨 호프다.

그는... 떠나지 못했다.`,
    choices: [
      { text: '💬 [호프에게 다가간다]', nextNode: 'watson_confronts_hope_with_ellen' },
      { text: '🔍 [엘렌을 부른다]', nextNode: 'bring_ellen_to_hope' }
    ]
  },

  bring_ellen_to_hope: {
    id: 'bring_ellen_to_hope',
    day: 2,
    timeOfDay: 'morning',
    speaker: 'watson',
    text: `당신이 엘렌을 부른다.

[왓슨]: 엘렌 양. 호프가... 떠나지 못하고 있습니다.

엘렌이 놀라서 밖을 본다.

우물가에 서 있는 호프.

[엘렌]: ...가겠어요.

[왓슨]: 위험할 수 있습니다.

[엘렌]: 괜찮아요. 저는... 어머니의 딸이니까요.

그녀가 밖으로 나간다.

호프를 향해 걸어간다.

당신과 홈즈는... 조용히 지켜본다.`,
    choices: [
      { text: '🌹 [두 사람의 만남을 지켜본다]', nextNode: 'ellen_meets_hope' }
    ]
  },

  wait_for_count_recovery: {
    id: 'wait_for_count_recovery',
    day: 2,
    timeOfDay: 'morning',
    speaker: 'watson',
    text: `[3일 후]

백작이 완전히 회복했다.

엘렌이 아버지를 부축하며 정원을 산책한다.

홈즈가 당신에게 말한다.

[셜록 홈즈]: 왓슨. 호프를 찾지 못했습니다.

[왓슨]: 런던을 떠났나?

[셜록 홈즈]: 아마도. 복수를 포기하고...

그때, 정원에서 엘렌의 목소리가 들린다.

[엘렌]: 호프님!

당신들이 뛰어나간다.

우물가에 호프가 서 있다.`,
    choices: [
      { text: '🏃 [급히 달려간다]', nextNode: 'hope_returns' }
    ]
  },

  hope_returns: {
    id: 'hope_returns',
    day: 2,
    timeOfDay: 'morning',
    character: 'hope',
    text: `[제퍼슨 호프]: ...미안합니다.

호프가 백작 앞에 무릎을 꿇는다.

[제퍼슨 호프]: 백작... 당신을 죽이려 했습니다.

[모로 백작]: ...

[제퍼슨 호프]: 하지만... 엘렌을 보고... 깨달았습니다.

호프가 엘렌을 본다.

[제퍼슨 호프]: 루시는... 복수를 원하지 않았을 거라고.

엘렌이 눈물을 흘린다.

백작이... 호프의 손을 잡는다.

[모로 백작]: 일어나시오, 호프. 나도... 미안하오.

두 사람이 일어선다.

그리고... 악수한다.

20년의 원한이 끝났다.`,
    choices: [
      { text: '🌟 [진엔딩으로]', nextNode: 'true_ending_with_ellen' }
    ]
  }
};
