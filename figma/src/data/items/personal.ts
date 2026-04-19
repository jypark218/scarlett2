/**
 * 💍 개인 소지품 아이템
 * 반지, 로켓 등 개인적인 물건
 */

import { ItemInfo } from '../../types/item';

export const personalItems: Record<string, ItemInfo> = {
  // ========== 루시 관련 유품 ==========
  
  '루시의 반지': {
    id: '루시의 반지',
    name: '이니셜 반지',
    imageUrl: 'https://images.unsplash.com/photo-1720189031165-b6f3cf3ff940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByaW5nJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjUzNTk2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    acquireMessage: `금빛 반지다. 세월이 지났지만 여전히 아름답게 빛나고 있다.

안쪽을 들여다보니 섬세한 이니셜이 새겨져 있다.

"L.L"

홈즈가 반지를 자세히 살핀다. "혼약 반지군. 여성용이야. 19세기 중반... 아마 1860년대 제작일 거야."

왜 이것이 우물 바닥에 떨어져 있었을까?`,
    description: '우물에서 발견한 금반지. "L.L" 이니셜이 안쪽에 새겨져 있다. 혼약 반지로 보이며, 19세기 중반 제작으로 추정된다.',
    summaryDescription: '우물의 금반지. "L.L" 이니셜. 혼약 반지로 추정.'
  },
  
  locket: {
    id: 'locket',
    name: '루시의 로켓',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    acquireMessage: `작은 금빛 로켓이다. 가늘게 조각된 꽃무늬가 아름답다.

펜던트를 열어보니... 젊은 여성의 초상화가 들어있다. 부드러운 미소, 밝은 눈동자. 행복했던 시절의 모습이다.

뒷면을 보니 섬세한 글씨가 새겨져 있다.

"루시 루이자, 1861"

제퍼슨 호프가 20년간 간직해온 유일한 기억. 그의 방에서 발견한 이것은... 복수의 원동력이었다.`,
    description: '루시 루이자의 로켓 펜던트. 그녀의 초상화와 1861년 각인이 있다. 제퍼슨 호프의 복수 동기를 입증하는 결정적 증거.',
    summaryDescription: '호프가 20년간 품고 산 로켓. 루시의 초상화 포함. 복수 동기 입증.'
  },
  
  '찢어진 천 조각': {
    id: '찢어진 천 조각',
    name: '찢어진 검은 천',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    acquireMessage: `서재 바닥에 떨어진 작은 천 조각이다. 검은색 울 소재... 고급 의복에서 떨어진 것으로 보인다.

천 조각의 가장자리가 찢어져 있다. 무언가에 걸려 뜯겨진 흔적이다.

홈즈가 조심스럽게 들어올린다.

"왓슨, 이것 봐. 지하실 계단의 못에 걸렸을 가능성이 높아."

홈즈가 천을 ���에 비춰본다.

"누군가 서재에서 지하실로 황급히 내려갔어. 그리고 이 천 조각을 남긴 거야."`,
    description: '서재 바닥에서 발견한 찢어진 검은 천 조각. 고급 울 소재로, 집사복에서 떨어진 것으로 추정된다. 지하실 계단에서 찢어진 흔적이 있다.',
    summaryDescription: '서재의 찢어진 천. 집사복 소재. 지하실 왕래 증거.'
  }
};