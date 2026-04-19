/**
 * ❌ 배드 엔딩 (7개)
 */

import { EndingInfo } from '../../types/ending';

export const badEndings: EndingInfo[] = [
  // ========== 호프 관련 배드 엔딩 (3개) ==========
  
  {
    id: 'bad_hope_wrong_deduction',
    number: 5,
    title: '탐정의 실수',
    type: 'bad',
    summary: '호프가 진범이 아니라고 믿고 시간을 낭비했다. 백작이 독살당했다.',
    suspect: 'hope'
  },
  {
    id: 'bad_hope_violence',
    number: 6,
    title: '무모한 돌진',
    type: 'bad',
    summary: '호프와 싸우다 왓슨이 목숨을 잃었다.',
    suspect: 'hope'
  },
  {
    id: 'bad_hope_count_suicide',
    number: 7,
    title: '가혹한 비난',
    type: 'bad',
    summary: '백작을 비난하여 그가 스스로 독을 마시게 했다.',
    suspect: 'hope'
  },
  
  // ========== 스탠거슨 관련 배드 엔딩 (2개) ==========
  
  {
    id: 'bad_stangerson_betrayal',
    number: 8,
    title: '배신자의 승리',
    type: 'bad',
    summary: '스탠거슨의 진면목을 파악하지 못했다. 그는 백작을 죽이고 도주했다.',
    suspect: 'stangerson'
  },
  {
    id: 'bad_stangerson_innocent_dies',
    number: 9,
    title: '무고한 희생',
    type: 'bad',
    summary: '잘못된 추리로 드레버를 의심하는 사이, 스탠거슨이 백작을 살해했다.',
    suspect: 'stangerson'
  },
  
  // ========== 드레버 관련 배드 엔딩 (2개) ==========
  
  {
    id: 'bad_drebber_hidden_truth',
    number: 10,
    title: '숨겨진 진실',
    type: 'bad',
    summary: '드레버가 진범임을 깨닫지 못했다. 백작과 호프가 모두 죽었다.',
    suspect: 'drebber'
  },
  {
    id: 'bad_holmes_dies',
    number: 11,
    title: '친구의 죽음',
    type: 'bad',
    summary: '드레버의 덫에 걸려 홈즈가 목숨을 잃었다.',
    suspect: 'drebber'
  },
  
  // ========== 기타 배드 엔딩 ==========
  
  {
    id: 'no_culprit_ending',
    number: 16,
    title: '미해결',
    type: 'bad',
    summary: '범인을 특정하지 못했다. 누구도 유죄 판결을 받지 못한 씁쓸한 결말.',
  }
];
