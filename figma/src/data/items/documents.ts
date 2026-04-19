/**
 * 📜 문서 증거 아이템
 * 일기, 편지, 유언장, 장부 등
 */

import { ItemInfo } from '../../types/item';

export const documentItems: Record<string, ItemInfo> = {
  // ========== 백작 관련 문서 ==========
  
  'diary': {
    id: 'diary',
    name: '모로 백작의 일기',
    imageUrl: 'https://images.unsplash.com/photo-1670786056253-03def3bf8e3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBkaWFyeSUyMGJvb2t8ZW58MXx8fHwxNzY1MzU5NjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    acquireMessage: `낡은 일기장이다. 가죽 표지가 세월의 무게를 말해주고 있다. 조심스럽게 펼쳐보니... 떨리는 글씨가 보인다.

"1861년 그 해... 한 여자를 만났다. 그녀에게는 연인이 있었다. 청년..."

페이지가 넘어간다. 잉크 자국에서 백작의 괴로움이 느껴진다.

"그녀가 병으로 죽었을 때, 나는 끔찍한 일을 저질렀다. 유산을 훔치고, 청년을 내쫓고, 그들을 버렸다..."

마지막 페이지에는...

"20년이 지난 지금, 그가 돌아왔다. 복수를 위해... 어쩌면 나는 이것을 기다렸는지도 모른다."`,
    description: '모로 백작이 남긴 일기장. 1861년의 비극과 한 여자에 대한 죄책감이 담겨있다.',
    summaryDescription: '백작의 고백록. 20년 전 비극적인 과거가 기록되어 있다.'
  },
  
  will: {
    id: 'will',
    name: '모로 백작의 유언장',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    acquireMessage: `새로 작성된 유언장이다. 잉크가 아직 완전히 마르지 않았다.

내용을 읽어보니...

\"나, 모로 백작은 모든 재산을 충실한 집사 조셉 스탠거슨에게 물려준다.\"

하지만 서류 가장자리를... 홈즈가 돋보기로 살핀다.

"왓슨, 이걸 봐. 지문이야. 누군가 이 유언장을 몰래 본 것 같아."

지문의 주인이 누구인지는... 더 조사가 필요하다.`,
    description: '백작이 최근 작성한 유언장. 전 재산을 스탠거슨에게 물려준다는 내용. 알 수 없는 지문이 묻어있다.',
    summaryDescription: '백작의 신규 유언장. 스탠거슨이 유일한 상속자. 지문 발견.'
  },
  
  ellen_will: {
    id: 'ellen_will',
    name: '엘렌에게 남긴 유언장',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    acquireMessage: `서랍 깊숙한 곳에서 낡은 봉투를 발견했다.

봉투를 열어보니... 유언장이다. 하지만 책상 위의 것과는 다른, 오래된 것이다.

내용을 읽어보니...

"나, 모로 백작은 내 모든 재산을... 엘렌에게 물려준다. 그녀는 내 딸이다."

날짜는 3년 전. 그리고 밑에 작은 글씨로...

"루시... 미안하오. 당신의 딸만은... 내가 지키겠소."

홈즈가 조용히 말한다. "이것이 진짜 유언장이야. 책상 위의 것은... 위조였어."`,
    description: '3년 전에 작성된 모로 백작의 진짜 유언장. 엘렌이라는 여성에게 전 재산을 물려준다는 내용. 엘렌은 백작의 딸이라고 명시되어 있다.',
    summaryDescription: '백작의 진짜 유언장. 엘렌(백작의 딸)이 유일한 상속자.'
  },
  
  // ========== 호프 관련 문서 ==========
  
  '제퍼슨의 편지': {
    id: '제퍼슨의 편지',
    name: '제퍼슨의 편지',
    imageUrl: 'https://images.unsplash.com/photo-1649019489428-70f505daacd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbGV0dGVyJTIwZW52ZWxvcGV8ZW58MXx8fHwxNzY1MzU5NjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    acquireMessage: `봉투를 집어 들었다. 손때가 묻어있고, 가장자리가 헤어져 있다. 수없이 읽고 또 읽은 흔적이다.

편지를 펼쳐보니 거친 필체로 쓰여있다.

"루시... 내 사랑... 당신은 복수하지 말라고 했소. 행복하라고..."

잉크가 번진 자국이 있다. 눈물일까?

"하지만 나는 약속을 지킬 수 없었소. 당신을 빼앗은 그들을... 용서할 수 없소..."

제퍼슨 호프. 20년간 복수를 꿈꾸며 살아온 남자의 편지다.`,
    description: '제퍼슨 호프가 죽은 연인 루시에게 쓴 편지. 복수와 그리움이 뒤섞여있다.',
    summaryDescription: '호프가 루시에게 쓴 편지. 복수 결심과 20년간의 고통이 배어있다.'
  },

  '루시의 편지': {
    id: '루시의 편지',
    name: '루시의 편지',
    imageUrl: 'https://images.unsplash.com/photo-1649019489428-70f505daacd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbGV0dGVyJTIwZW52ZWxvcGV8ZW58MXx8fHwxNzY1MzU5NjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    acquireMessage: `우물 돌 틈에서 발견한 낡은 편지. 종이가 물에 젖어 훼손되었지만 글씨는 아직 읽을 수 있다.

"사랑하는 제퍼슨에게... 백작이 아버지를 속였어요. 재산이 모두... 저는 병에 걸렸어요... 치료비가... 제발..."

- Lucy

편지는 여기서 끝난다. 눈물 자국과 물 얼룩이 섞여있다.

20년 전, 루시가 제퍼슨에게 보내려 했던 마지막 편지. 하지만 이 편지는 전달되지 못했다.

홈즈가 조용히 말한다. "이것이... 모든 비극의 시작이었군요."`,
    description: '루시 페리에가 제퍼슨 호프에게 보내려 했던 미완성 편지. 백작의 배신과 자신의 병에 대해 쓰여 있다. 20년 전 우물에 떨어져 전달되지 못했다.',
    summaryDescription: '루시가 호프에게 보낸 마지막 편지. 백작의 배신과 그녀의 비극적 상황을 증명한다.'
  },
  
  // ========== 사기 사건 관련 문서 ==========
  
  ledger: {
    id: 'ledger',
    name: '1861년 장부',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    acquireMessage: `먼지투성이 장부를 펼쳤다. 가죽 표지가 낡았지만 내용은 명확하다.

1861년 유타주 금광 투자 기록.

- 모로 백작 서명
- 조셉 스탠거슨 서명
- 이녹 드레버 서명

그리고... 페이지 가득한 손실 기록. 투자자들의 돈이 증발했다.

홈즈가 날카롭게 말한다. "사기야. 스탠거슨이 공범이었다는 증거지."`,
    description: '1861년 금광 사기의 장부. 모로 백작, 스탠거슨, 드레버의 서명이 있다. 스탠거슨의 공범 관계를 입증한다.',
    summaryDescription: '유타 금광 사기 장부. 스탠거슨의 공범 관계와 배신을 증명하는 문서.'
  },
  
  telegram: {
    id: 'telegram',
    name: '은행 전보',
    imageUrl: 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    acquireMessage: `백작의 코트 주머니에서 발견한 전보. 종이가 구겨져 있다. 여러 번 읽고 또 읽은 흔적이다.

발신: 런던 중앙 은행
수신: 모로 백작

\"귀하의 계좌가 동결되었습니다. 1861년 사기 사건 관련 고소장이 접수되었습니다. 즉시 출두하시기 바랍니다.\"

날짜는... 3일 전.

홈즈가 중얼거린다. "백작은 파산 직전이었군. 유산 싸움은 무의미했어."`,
    description: '런던 중앙 은행에서 온 전보. 백작의 계좌 동결과 1861년 사기 사건 재수사 통보. 백작이 파산 직전이었음을 증명한다.',
    summaryDescription: '은행 전보. 백작 계좌 동결. 유산이 사실상 존재하지 않음을 입증.'
  },
  
  threatening_letters: {
    id: 'threatening_letters',
    name: '협박 편지 & 저택 지도',
    imageUrl: 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    acquireMessage: `여관 7번 방 책상에서 발견한 증거물들.

세 통의 협박 편지와 드레버가 직접 그린 저택 평면도.

홈즈가 조용히 말한다. "이것으로 드레버의 계획이 명확해졌어. 그는 미리 준비했어."

편지 서명은 \\"S\\". 스탠거슨일 가능성이 높다.

**[핵심 증거: 드레버의 살해 계획 입증]**`,
    description: '여관에서 발견한 협박 편지 3통과 저택 평면도. 드레버가 사전에 범행을 계획했다는 결정적 증거.',
    summaryDescription: '협박 편지 & 저택 지도. 드레버의 계획적 범행 입증.'
  }
};