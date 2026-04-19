import { StoryNode } from '../../../types/story';

/**
 * 🩺 스탠거슨 - 회차별 추가 관찰
 */

export const stangersonHints: Record<string, StoryNode> = {
  stangerson_timeline_confront: {
    id: 'stangerson_timeline_confront',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    conditionalText: [
      {
        // 지하실을 이미 방문한 경우 - 더 구체적인 증거로 압박
        condition: (context) => {
          const basementVisited = ['open_basement', 'basement_interior', 'basement_investigation'];
          return basementVisited.some(node => context.visitedNodes.includes(node));
        },
        text: `홈즈가 스탠거슨을 다시 찾는다.

[홈즈]: 스탠거슨 씨, 시간 확인을 하겠습니다.

스탠거슨이 긴장한다.

[홈즈]: 당신은 11시에 환자를 보러 나갔다고 했죠. 그리고 1시에 돌아왔다고.

[스탄거슨]: 맞습니다...

[홈즈]: 하지만 목격자가 있습니다. 11시 45분경, 의료 가방을 든 남자가 저택 지하실로 들어가는 걸 봤다고 하더군요.

홈즈가 잠시 멈추고 스탠거슨을 응시한다.

[홈즈]: 그리고 저는 지하실을 조사했습니다. 당신 집사복과 똑같은 천 조각이 계단에 걸려있더군요.

스탠거슨의 얼굴이 새하얗게 변한다.

[스탄거슨]: 그건... 그건...

홈즈가 기다린다. 침묵의 압박.`
      }
    ],
    text: `홈즈가 스탠거슨을 다시 찾는다.

[홈즈]: 스탠거슨 씨, 시간 확인을 하겠습니다.

스탠거슨이 긴장한다.

[홈즈]: 당신은 11시에 환자를 보러 나갔다고 했죠. 그리고 1시에 돌아왔다고.

[스탄거슨]: 맞습니다...

[홈즈]: 하지만 목격자가 있습니다. 11시 45분경, 의료 가방을 든 남자가 저택 지하실로 들어가는 걸 봤다고 하더군요.

스탠거슨의 얼굴이 창백해진다.

[스탄거슨]: 그건... 그건...

홈즈가 기다린다. 침묵의 압박.`,
    choices: [
      { text: '그의 반응을 관찰한다', nextNode: 'stangerson_reaction_observe' },
      { text: '의료 가방을 조사한다', nextNode: 'stangerson_bag_detail' }
    ]
  },

  stangerson_reaction_observe: {
    id: 'stangerson_reaction_observe',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `스탠거슨의 이마에 땀이 맺힌다. 손이 떨리고, 시선이 흔들린다.

하지만... 당신은 의사로서 느낀다. 이건 죄책감이 아니라...

공포다.

[스탄거슨]: (떨리는 목소리로) 나는... 나는 그날 밤 저택에 왔습니다.

홈즈가 고개를 끄덕인다.

[스탄거슨]: 하지만 살인을 하지 않았어요! 나는... 백작님을... 구하려고 했습니다!

[왓슨]: 구하려?

스탠거슨이 고개를 떨어뜨린다.

[스탄거슨]: 늦었습니다... 이미... 이미 끌려가신 후였어요...

[홈즈]: 끌려갔다고요?

[스탄거슨]: 서재에 피가... 엄청난 투쟁의 흔적이 있었습니다. 백작님이 중상을 입고 어딘가로... 끌려가셨을 겁니다...`,
    choices: [
      { text: '누가 끌고 갔는지 묻는다', nextNode: 'stangerson_discovery_detail' },
      { text: '왜 신고하지 않았는지 묻는다', nextNode: 'stangerson_why_no_report' }
    ]
  },

  stangerson_discovery_detail: {
    id: 'stangerson_discovery_detail',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'stangerson',
    text: `[홈즈]: 정확히 무엇을 보았습니까?

스탠거슨이 기억을 더듬는다.

[스탄거슨]: 서재... 백작님이 쓰러져 계셨고... RACHE가 벽에... 피투성이였습니다.

[왓슨]: 백작이 살아계셨습니까?

[스탄거슨]: 의식이... 있었습니다. 하지만 중상이었어요. 그때... 누군가 나타났습니다.

[홈즈]: 누구였습니까?

스탠거슨이 떨린다.

[스탄거슨]: 키 큰 남자... 제퍼슨 호프... 그 이름을 들었습니다...`,
    choices: [
      { text: '제퍼슨 호프에 대해 묻는다', nextNode: 'stangerson_hope_question' }
    ]
  },

  stangerson_why_no_report: {
    id: 'stangerson_why_no_report',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `[왓슨]: 왜 경찰에 신고하지 않았습니까?

스탠거슨이 망설인다.

[스탄거슨]: 나는... 의심받을 것이 분명했습니다. 백작님과... 복잡한 과거가 있었으니...

홈즈가 날카롭게 본다.

[홈즈]: 협박받고 있었죠?

스탠거슨이 고개를 끄덕인다.

[스탄거슨]: 10년... 매달 돈을... 하지만 그게 전부가 아닙니다.

[왓슨]: 뭐가 더 있습니까?

스탠거슨이 창밖을 본다.

[스탄거슨]: 제퍼슨 호프... 그가 찾아올까봐... 나는 매일 두려웠습니다.`,
    choices: [
      { text: '제퍼슨 호프에 대해 묻는다', nextNode: 'stangerson_hope_question' }
    ]
  },

  stangerson_hope_question: {
    id: 'stangerson_hope_question',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `홈즈가 로켓 사진을 꺼낸다.

[홈즈]: 이 여성을 아십니까?

스탠거슨이 사진을 보고 얼어붙는다.

[스탄거슨]: ...루시.

[왓슨]: 루시?

[스탄거슨]: 루시 페리어... 20년 전... 유타에서...

그의 목소리가 떨린다.

[스탄거슨]: 그녀를 살리지 못했습니다... 나는 의사였지만...

홈즈가 조용히 묻는다.

[홈즈]: 제퍼슨 호프는 그녀의 약혼자였죠?

스탠거슨이 고개를 끄덕인다.

[스탄거슨]: 그리고... 복수자입니다.`,
    choices: [
      { text: '20년 전 일을 더 듣는다', nextNode: 'utah_past_reveal' },
      { text: '제퍼슨 호프를 찾는다', nextNode: 'search_hope_urgently' }
    ]
  },

  stangerson_bag_detail: {
    id: 'stangerson_bag_detail',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `홈즈가 스탠거슨의 의료 가방을 자세히 조사한다.

가방 안쪽 가죽에 신선한 핏자국. 약병들 - 모르핀, 아트로핀, 그리고...

[홈즈]: 스트리크닌 병이 반쯤 비어있군요.

스탠거슨이 당황한다.

[스탄거슨]: 그건... 환자 치료용으로...

[홈즈]: 스트리크닌은 극독이죠. 소량 투여로도 치명적인.

홈즈가 병을 빛에 비춘다.

[홈즈]: 흥미롭게도... 백작의 시체에선 독극물 증상이 없었습니다.

스탠거슨이 안도하는 듯 보인다.

[홈즈]: 하지만 왓슨, 이 독은 '아직' 사용되지 않았을 뿐이죠.`,
    choices: [
      { text: '스트리크닌의 용도를 묻는다', nextNode: 'strychnine_purpose' },
      { text: '대화를 마친다', nextNode: 'main_entrance' }
    ]
  },

  strychnine_purpose: {
    id: 'strychnine_purpose',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `[홈즈]: 이 스트리크닌... 누구를 위한 겁니까?

스탠거슨이 입술을 깨문다.

[스탄거슨]: ...나 자신을 위한 겁니다.

당신은 놀란다.

[스탄거슨]: 만약 제퍼슨 호프가 나를 찾는다면... 나는... 고통스럽게 죽고 싶지 않습니다.

그의 눈에 깊은 절망이 서려있다.

[스탄거슨]: 차라리... 스스로 선택하겠습니다.

홈즈가 조용히 병을 내려놓는다.

[홈즈]: ...그럴 필요 없기를 바랍니다.`,
    choices: [
      { text: '대화를 마친다', nextNode: 'main_entrance' }
    ]
  },

  stangerson_poison_confront: {
    id: 'stangerson_poison_confront',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'watson',
    text: `당신이 스탠거슨에게 스트리크닌 병을 보여준다.

[왓슨]: 이걸 설명하시겠습니까?

스탠거슨이 가방을 보고 놀란다.

[스탄거슨]: 어떻게... 내 가방을...

[홈즈]: 반쯤 비어있습니다.

스탠거슨이 떨린다.

[스탄거슨]: 나는... (긴 침묵) 죽을 준비를 하고 있었습니다.

[왓슨]: 자살을?

[스탄거슨]: 제퍼슨 호프가 오면... 나는... 도망칠 수 없습니다. 20년을 도망쳤지만...

그가 고개를 떨어뜨린다.

[스탄거슨]: 차라리 내 손으로... 끝내려 합니다.`,
    choices: [
      { text: '제퍼슨 호프를 찾아야 한다', nextNode: 'search_hope_urgently' },
      { text: '대화를 마친다', nextNode: 'main_entrance' }
    ]
  }
};