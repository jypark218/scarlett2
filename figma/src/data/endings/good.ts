/**
 * ✅ 굿 엔딩 (4개)
 */

import { EndingInfo } from '../../types/ending';

export const goodEndings: EndingInfo[] = [
  // 🌟 진엔딩 (True Ending)
  {
    id: 'true_ending_mercy',
    number: 1,
    title: '자비와 구원',
    type: 'good',
    summary: '호프가 백작을 용서하고, 모든 피해자를 구했다. 진정한 정의가 실현되었다.',
    suspect: 'hope'
  },
  
  // ✅ 일반 굿 엔딩
  {
    id: 'good_ending_stangerson',
    number: 2,
    title: '공범의 고백',
    type: 'good',
    summary: '스탠거슨의 배신을 저지하고 백작을 구했다. 그는 20년의 죄책감을 고백했다.',
    suspect: 'stangerson'
  },
  {
    id: 'good_ending_drebber',
    number: 3,
    title: '숨겨진 악의 심판',
    type: 'good',
    summary: '드레버의 음모를 간파하고 백작을 구했다. 정의가 승리했다.',
    suspect: 'drebber'
  },
  {
    id: 'ending_justice',
    number: 4,
    title: '회색빛 정의',
    type: 'good',
    summary: '범인을 잡았지만... 모두가 피해자였다. 완전한 승리는 없었다.',
  }
];
