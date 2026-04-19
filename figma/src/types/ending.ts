/**
 * 엔딩 타입 정의
 */

export interface EndingInfo {
  id: string;
  number: number;
  title: string;
  type: 'good' | 'bad' | 'neutral';
  summary: string;
  suspect?: 'hope' | 'stangerson' | 'drebber';  // 어느 용의자 루트인지
}
