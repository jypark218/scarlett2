/**
 * 통찰 타입 정의
 */

export interface Insight {
  id: string;
  name: string;
  description: string;
  character: 'hope' | 'stangerson' | 'drebber' | 'watson';
  icon: string;
}
