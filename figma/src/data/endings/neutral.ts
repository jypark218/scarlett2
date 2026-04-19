/**
 * 🌫️ 중립/찜찜한 엔딩 (4개)
 */

import { EndingInfo } from '../../types/ending';

export const neutralEndings: EndingInfo[] = [
  {
    id: 'hope_ambiguous_ending',
    number: 12,
    title: '정의인가, 복수인가',
    type: 'neutral',
    summary: '호프를 범인으로 지목했지만... 뭔가 찜찜하다. 진짜 그가 범인이었을까?',
    suspect: 'hope'
  },
  {
    id: 'stangerson_ambiguous_ending',
    number: 13,
    title: '공범의 최후',
    type: 'neutral',
    summary: '스탠거슨을 잡았지만... 정말 그가 범인이었을까? 불안한 마음이 남는다.',
    suspect: 'stangerson'
  },
  {
    id: 'drebber_ending_ambiguous',
    number: 14,
    title: '회색 정의',
    type: 'neutral',
    summary: '드레버를 체포했다. 하지만 그도 피해자였다... 이게 정의일까?',
    suspect: 'drebber'
  },
  {
    id: 'meta_confusion_ending',
    number: 15,
    title: '반복되는 악몽',
    type: 'neutral',
    summary: '범인을 잡았다... 하지만 왜 꿈에서 계속 다른 사람이 범인이었지? (메타 엔딩)',
  }
];
