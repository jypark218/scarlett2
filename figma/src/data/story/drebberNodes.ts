import { StoryNode } from '../../types';

/**
 * 드레버 관련 노드들
 * 2층에서 드레버를 만나고 조사하는 시퀀스
 */

export const drebberNodes: Record<string, StoryNode> = {
  meet_drebber: {
    id: 'meet_drebber',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `복도 끝에서 담배 연기가 피어오르는 곳으로 다가간다.

한 남자가 초조하게 담배를 피우고 있다. 정장 차림이지만 옷은 낡았고, 얼굴에는 깊은 근심이 서려있다.

당신이 다가가자 그가 고개를 든다.

[드레버]: 당신들이... 탐정이오?

[왓슨]: 네, 셜록 홈즈와 왓슨입니다.

[드레버]: 음... 이노크 드레버요. 백작과... 사업 관계에 있는...

그의 눈가에는 두려움과 절박함이 가득하다.

홈즈가 드레버를 날카롭게 관찰한다. 큰 손, 굵은 손가락... 담배를 피우는 동작에서 긴장이 느껴진다.`,
    conditionalText: [
      {
        // 이미 드레버와 대화한 적이 있고, 여관도 방문한 경우
        condition: (context) => {
          return context.visitedNodes.includes('drebber_alibi') && 
                 context.visitedNodes.includes('inn_entrance');
        },
        text: `복도 끝으로 다가간다.

드레버가 여전히 창가에서 담배를 피우고 있다. 여관을 다녀온 후라 그의 표정이 더 굳어 보인다.

당신이 다가가자 그가 경계하는 눈빛으로 본다.

[드레버]: ...또 뭘 물으실 건가?

홈즈가 차분하게 말한다.

[홈즈]: 몇 가지 더 확인할 게 있습니다.`
      },
      {
        // 이미 드레버와 대화한 적이 있는 경우 (여관은 방문 안함)
        condition: (context) => {
          return context.visitedNodes.includes('drebber_alibi');
        },
        text: `복도 끝으로 다시 간다.

드레버가 여전히 초조하게 담배를 피우고 있다.

당신이 다가가자 그가 고개를 든다.

[드레버]: ...또 무슨 일이오?

홈즈가 조용히 말한다.

[홈즈]: 추가로 여쭤볼 게 있습니다.`
      }
    ],
    choices: [
      { 
        text: '사건 당일 밤 행적을 묻는다', 
        nextNode: 'drebber_alibi'
      },
      { 
        text: '백작과의 사업 분쟁에 대해 묻는다', 
        nextNode: 'drebber_business_first'
      },
      {
        text: '💎 백작과의 관계에 대해 깊이 캐묻는다',
        nextNode: 'drebber_relationship',
        requiredVisitedNode: 'drebber_alibi'
      },
      { 
        text: '💎 진흙과 과거에 대해 추궁한다', 
        nextNode: 'drebber_playcount_2_question',
        // 드레버와 한 번 이상 대화한 적이 있어야 추궁 가능
        requiredVisitedNode: 'drebber_alibi'
      },
      { text: '다른 곳을 조사한다', nextNode: 'continue_investigation_2' }
    ]
  },

  drebber_alibi: {
    id: 'drebber_alibi',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `당신이 묻는다.

[왓슨]: 어젯밤 어디 계셨습니까?

드레버가 담배를 한 모금 빨고 짜증스럽게 대답한다.

[드레버]: ...여관이오. 근처 여관에서.

[홈즈]: 백작님을 만나러 온 것이 아니었습니까?

드레버가 잠시 망설이다 대답한다.

[드레버]: 회의 약속이 있었소. 하지만 백작은... 나타나지 않았지.

홈즈가 의심스럽게 바라본다.

[홈즈]: 증인이 있습니까?

[드레버]: ...여관 주인이 기억할 거요.`,
    choices: [
      { text: '사업상 분쟁에 대해 캐묻는다', nextNode: 'drebber_business_from_alibi' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_2' }
    ]
  },

  drebber_business_from_alibi: {
    id: 'drebber_business_from_alibi',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `당신이 묻는다.

[왓슨]: 백작과는 어떤 사업 관계셨습니까?

드레버가 담배 연기를 내뿜으며 대답한다.

[드레버]: ...광산 투자요. 1871년부터. 백작이 제안했지.

[왓슨]: 결과는?

드레버의 표정이 어두워진다.

[드레버]: 실패했소. 백작이 나에게 모든 책임을 떠넘겼어.

그때 홈즈가 복도 구석에 놓인 서류 가방을 발견한다. 무심코 들여다보더니 눈빛이 예리해진다.

[홈즈]: 드레버 씨, 이 계약서는... 5만 파운드? 백작이 채권자로 되어있군요.

드레버의 얼굴이 순간 굳어진다.

[드레버]: 그, 그건...!

홈즈가 압박한다.

[홈즈]: 이게 투자금입니까?`,
    choices: [
      { text: '빚에 대해 추궁한다', nextNode: 'drebber_debt' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_2' }
    ]
  },

  drebber_business_first: {
    id: 'drebber_business_first',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `당신이 묻는다.

[왓슨]: 백작과는 어떤 사업 관계셨습니까?

드레버가 담배 연기를 내뿜으며 짧게 대답한다.

[드레버]: ...광산 투자.

[홈즈]: 언제부터입니까?

드레버가 머뭇거린다.

[드레버]: 1871년... 백작이 제안했지.

[왓슨]: 결과는 어땠습니까?

드레버의 표정이 어두워진다.

[드레버]: ...실패했소.

그때 홈즈가 복도 구석에 놓인 서류 가방을 발견한다. 무심코 들여다보더니 눈빛이 예리해진다.

[홈즈]: 드레버 씨, 이 계약서는... 5만 파운드? 백작이 채권자로 되어있군요.

드레버의 얼굴이 순간 굳어진다.

[드레버]: 그, 그건...!

홈즈가 압박한다.

[홈즈]: 사업 투자금입니까?

드레버가 입술을 깨문다.

[드레버]: ...백작이 나에게 모든 책임을 떠넘겼소.`,
    choices: [
      { text: '빚에 대해 추궁한다', nextNode: 'drebber_debt' },
      { text: '1871년 사업의 내용을 묻는다', nextNode: 'drebber_1871_business' },
      { text: '침실을 조사한다', nextNode: 'bedroom' }
    ]
  },

  drebber_1871_business: {
    id: 'drebber_1871_business',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `홈즈가 날카롭게 묻는다.

[홈즈]: 1871년... 백작이 독일에서 가져왔다는 그 자금, 출처를 아십니까?

드레버가 머뭇거린다.

[드레버]: 나는... 묻지 않았소. 사업가에게 자금 출처를 따지는 건 무례한 일이니까.

[왓슨]: 하지만 지금은 의심이 가신다는 건가요?

드레버가 잠시 망설이다 낮은 목소리로 말한다.

[드레버]: ...그렇게 큰 돈을 갑자기 손에 넣는다는 게 이상하긴 했소. 상속이나 사업 이익이라고 하기엔 너무 급작스러웠지. 하지만 그땐 내 사업에만 신경 쓰느라...

홈즈가 메모하며 끼어든다.

[홈즈]: 의심스러운 점이 더 있습니까?

드레버가 고개를 끄덕인다.

[드레버]: 백작은... 그 돈에 대해 말하기를 꺼렸소. 누가 물어보면 화제를 돌리곤 했지. 마치 숨기고 싶어 하는 것처럼.`,
    choices: [
      { text: '자금 출처의 정당성에 의문을 제기한다', nextNode: 'drebber_money_legitimacy' },
      { text: '빚에 대해 추궁한다', nextNode: 'drebber_debt' }
    ]
  },

  drebber_money_legitimacy: {
    id: 'drebber_money_legitimacy',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `당신이 조심스럽게 묻는다.

[왓슨]: 혹시... 그 자금이 정당하지 않은 방법으로 얻어진 것일 가능성은?

드레버가 얼굴을 찌푸린다.

[드레버]: 그건... 단정하기 어렵소. 추측만으로는...

[홈즈]: 그러나 의심은 하고 계시군요.

드레버가 잠시 침묵하다 답한다.

[드레버]: ...그렇소. 백작의 태도가 너무 수상��으니까. 하지만 확실한 증거는 없소.

홈즈가 냉정하게 정리한다.

[홈즈]: 출처 불명의 거액. 갑작스러운 투자. 질문 회피... 흥미롭군. 하지만 아직은 추측의 영역이야.

드레버가 불안한 표정으로 덧붙인다.

[드레버]: 만약... 정말로 그 돈에 문제가 있다면, 백작에게 사기당한 건 나만이 아닐 수도 있소!`,
    choices: [
      { text: '다른 피해자가 있을 가능성을 논의한다', nextNode: 'drebber_other_victims' },
      { text: '빚에 대해 추궁한다', nextNode: 'drebber_debt' }
    ]
  },

  drebber_other_victims: {
    id: 'drebber_other_victims',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `홈즈가 턱을 쓰다듬으며 생각에 잠긴다.

[홈즈]: 만약 백작이 정말로 의심스러운 자금으로 사업을 했다면... 피해자가 더 있을 수 있겠군요.

드레버가 고개를 끄덕인다.

[드레버]: 그렇소! 나만 피해자가 아닐 수도 있단 말이오!

[왓슨]: 그렇다면 복수의 동기가...?

홈즈가 날카롭게 드레버를 쳐다본다.

[홈즈]: 그래서 복수하고 싶었습니까?

드레버가 화들짝 놀라며 고개를 젓는다.

[드레버]: 아니오! 나는 돈만 돌려받고 싶었소! 백작이 죽으면 나는 끝이오!

홈즈가 메모하며 중얼거린다.

[홈즈]: 흥미롭군. 당신 입장에선 백작이 살아있어야 할 텐데...

그 순간, 드레버가 갑자기 시계를 확인하고는 불안한 표정을 짓는다.

[드레버]: 아, 잠깐... 서재에 두고 온 것이... 실례하겠습니다.

그가 서둘러 자리를 뜨려 한다. 홈즈의 눈이 날카로워진다.`,
    choices: [
      { text: '드레버를 따라간다', nextNode: 'drebber_revenge' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_2' }
    ]
  },

  drebber_revenge: {
    id: 'drebber_revenge',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `당신과 홈즈가 재빨리 드레버를 따라간다.

드레버가 서재로 향하는 것을 따라가니, 그는 책장 뒤편에서 뭔가를 꺼내려 하고 있다.

[홈즈]: 드레버 씨, 무엇을 찾고 계십니까?

드레버가 깜짝 놀라 돌아본다. 손에는 서류 뭉치가 들려있다.

[드레버]: 아, 이건... 그냥 계약서요. 백작과의...

홈즈가 다가가 서류를 살핀다. 5만 파운드라는 금액이 눈에 띈다.

[홈즈]: 5만 파운드... 상당한 금액이군요.

드레버가 긴장한 표정으로 답한다.

[드레버]: 그건... 투자금 손실이오. 백작이 책임져야 할...

[왓슨]: 백작이 죽으면 어떻게 되는 겁니까?

드레버의 얼굴이 창백해진다.

[드레버]: 그럼... 나는 파산이오. 그래서 백작을 찾아야 한단 말이오!

홈즈가 날카로운 시선으로 드레버를 관찰한다. 그의 손이 미세하게 떨리고 있다.`,
    choices: [
      { text: '침실을 조사한다', nextNode: 'bedroom' },
      { text: '다른 용의자를 조사한다', nextNode: 'continue_investigation_2' }
    ]
  },

  drebber_debt: {
    id: 'drebber_debt',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'drebber',
    text: `당신이 추궁한다.

[왓슨]: 5만 파운드... 백작이 죽으면 어떻게 되는 겁니까?

드레버가 얼굴이 창백해진다.

[드레버]: 그, 그렇게 되면...! 나는 완전히 파산이오! 백작만이 그 돈을 갚을 수 있소!

홈즈가 침묵하며 드레버를 관찰한다. 그리고 조용히 메모를 적는다.

[홈즈]: 백작이 죽으면 회수 불가능... 흥미롭군요.

드레버가 고개를 숙인다. 하지만 그 순간, 그의 눈빛에 뭔가 다른 감정이 스친다.

당신은 그걸 놓치지 않았다. 두려움? 아니면... 무언가를 숨기는 표정?

홈즈도 눈치챘는지 드레버를 예리하게 쳐다본다.`,
    choices: [
      { text: '침실을 조사한다', nextNode: 'bedroom' },
      { text: '1층으로 내려간다', nextNode: 'main_entrance' }
    ]
  }
};