/**
 * 🔑 열쇠 및 비밀번호 아이템
 */

import { ItemInfo } from '../../types/item';

export const keyItems: Record<string, ItemInfo> = {
  // ========== 열쇠 ==========
  
  '지하실 열쇠': {
    id: '지하실 열쇠',
    name: '지하실 열쇠',
    imageUrl: 'https://images.unsplash.com/photo-1584985429926-08867327d3a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwa2V5fGVufDF8fHx8MTc2NTM1OTY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    acquireMessage: `청동 열쇠를 손에 쥐었다. 상당히 무겁다.

녹이 슬었지만... 최근에 사용한 흔적이 역력하다. 손잡이 부분이 깨끗하다. 누군가 자주 만졌던 것이다.

홈즈가 열쇠를 살핀다. "흥미롭군. 이 열쇠는 최근 3-4일 내에 사용되었어."

이 열쇠가 무엇을 여는지는... 직접 찾아봐야 할 것 같다.`,
    description: '저택 지하실을 여는 낡은 청동 열쇠. 최근 사용된 흔적이 명확하다.',
    summaryDescription: '지하실 출입용 청동 열쇠. 사건 당일에도 사용된 흔적이 있다.'
  },
  
  drawer_key: {
    id: 'drawer_key',
    name: '서랍 열쇠',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    acquireMessage: `작고 정교한 열쇠다. 은으로 만들어졌으며, 손잡이에 장미 문양이 새겨져 있다.

홈즈가 열쇠를 자세히 살핀다. "이건... 여성용 장신구 상자나 개인 서랍을 여는 열쇠 같군."

열쇠가 햇빛에 반짝인다. 최근에도 자주 사용된 것 같다.

"침실에 이와 맞는 자물쇠가 있을 거야."`,
    description: '은으로 만든 작은 열쇠. 장미 문양이 새겨진 손잡이. 침실 서랍을 여는 열쇠로 추정된다.',
    summaryDescription: '장미 문양의 서랍 열쇠. 침실 어딘가를 열 수 있을 것 같다.'
  },
  
  // ========== 비밀번호 ==========
  
  '금고 비밀번호': {
    id: 'safe_password',
    name: '금고 비밀번호',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    acquireMessage: `일기장 마지막 페이지의 숫자를 기억했다.

**1861**

백작이 평생 잊지 못한 숫자인 것 같다.

홈즈가 말한다. "이것이 금고 비밀번호일 거야. 백작은... 무언가를 잊지 않으려 했군."

이 숫자로 금고를 열 수 있을 것 같다.`,
    description: '백작의 일기에서 발견한 금고 비밀번호. 1861년, 백작이 평생 속죄한 숫자.',
    summaryDescription: '금고 비밀번호 "1861". 백작의 일기에서 획득.'
  }
};
