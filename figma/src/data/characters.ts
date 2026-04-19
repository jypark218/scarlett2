/**
 * 캐릭터 데이터 (순수 데이터만)
 */

import { CharacterData } from '../types/dialogue';

export const characterData: Record<string, CharacterData> = {
  watson: {
    id: 'watson',
    name: '존 H. 왓슨',
    nameColor: 'text-blue-400',
    portraitUrl: 'https://images.unsplash.com/photo-1745758278377-2b42af378614?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  holmes: {
    id: 'holmes',
    name: '셜록 홈즈',
    nameColor: 'text-purple-400',
    portraitUrl: 'https://images.unsplash.com/photo-1591980076746-ef1adcbe0088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  gregson: {
    id: 'gregson',
    name: '그레그슨 형사',
    nameColor: 'text-yellow-400',
    portraitUrl: 'https://images.unsplash.com/photo-1552622594-9a37efeec618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  lestrade: {
    id: 'lestrade',
    name: '레스트레이드 경감',
    nameColor: 'text-indigo-400',
    portraitUrl: 'https://images.unsplash.com/photo-1591980076746-ef1adcbe0088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  count: {
    id: 'count',
    name: '모로 백작',
    nameColor: 'text-red-400',
    portraitUrl: 'https://images.unsplash.com/photo-1576858688752-d7d4dbd6686a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  hope: {
    id: 'hope',
    name: '제퍼슨 호프',
    nameColor: 'text-orange-400',
    portraitUrl: 'https://images.unsplash.com/photo-1599017795237-63e467a75ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  stangerson: {
    id: 'stangerson',
    name: '조셉 스탠거슨',
    nameColor: 'text-green-400',
    portraitUrl: 'https://images.unsplash.com/photo-1585575367916-0c6d0eac6901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  drebber: {
    id: 'drebber',
    name: '이노크 드레버',
    nameColor: 'text-cyan-400',
    portraitUrl: 'https://images.unsplash.com/photo-1720876478882-f8a25f507961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  narrator: {
    id: 'narrator',
    name: '내레이션',
    nameColor: 'text-slate-400',
    portraitUrl: ''
  },
  innkeeper: {
    id: 'innkeeper',
    name: '제임스 매튜스',
    nameColor: 'text-amber-400',
    portraitUrl: 'https://images.unsplash.com/photo-1725783544345-24b39bad8628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  ellen: {
    id: 'ellen',
    name: '엘렌',
    nameColor: 'text-rose-400',
    portraitUrl: 'https://images.unsplash.com/photo-1642268602642-64a8fbac1e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTY4Mzg4NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  lucy: {
    id: 'lucy',
    name: '루시 루이자',
    nameColor: 'text-pink-400',
    portraitUrl: 'https://images.unsplash.com/photo-1682686578456-69ae00b0ecbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  }
};

// characters alias for backward compatibility
export const characters = characterData;

// characterPortraits for easy portrait access
export const characterPortraits: Record<string, string> = Object.entries(characterData).reduce((acc, [id, data]) => {
  acc[id] = data.portraitUrl;
  return acc;
}, {} as Record<string, string>);