/**
 * 화자 감지 유틸리티
 */

import { SpeakerPattern } from '../../types/dialogue';

// ============================================================
// 🎯 자기소개 패턴 (대사 내용에서 화자 감지)
// ============================================================

const SELF_INTRO_PATTERNS: Record<string, RegExp[]> = {
  watson: [
    /난 왓슨|저는 왓슨|왓슨 박사|왓슨입니다|왓슨이요/i,
  ],
  holmes: [
    /난 셜록 홈즈|저는 홈즈|홈즈요|홈즈입니다|셜록 홈즈입니다/i,
  ],
  gregson: [
    /그레그슨 사|난 그레그슨|저는 그레그슨|형사입니다/i,
  ],
  lestrade: [
    /레스트레이드 경감|난 레스트레이드|저는 레스트레이드/i,
  ],
  count: [
    /난 모로 백작|저는 백작|백작입니다|모로입니다/i,
  ],
  hope: [
    /난 제퍼슨 호프|저는 호프|호프요|호프입니다|마차꾼입니다/i,
  ],
  stangerson: [
    /난 조셉 스태거|저는 스태거슨|스태거슨입니다|조셉입니다/i,
  ],
  drebber: [
    /난 이노크 드레버|저는 드레버|드레버요|드레버입니다|이노크입니다/i,
  ],
  innkeeper: [
    /난 제임스|저는 매튜스|여관주인입니다|매튜스입니다|제임스 매튜스/i,
  ],
  ellen: [
    /난 엘렌|저는 엘렌|엘렌입니다/i,
  ]
};

/**
 * 대사 내용에서 자기소개 패턴 찾기
 */
export function findSpeakerBySelfIntro(dialogue: string): string | null {
  for (const [charId, patterns] of Object.entries(SELF_INTRO_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(dialogue)) {
        return charId;
      }
    }
  }
  return null;
}

// ============================================================
// 📊 데이터 기반 화자 인식 시스템
// ============================================================

// 캐릭터별 패턴 정의 (한 곳에 관리)
const SPEAKER_PATTERNS: Record<string, SpeakerPattern> = {
  holmes: {
    names: ['홈즈'],
    actions: ['말', '대답', '웃', '고개', '묻', '속삭', '외치', '소리', '말합', '대꾸'],
    particles: ['가', '는', '의', '를']
  },
  gregson: {
    names: ['그레그슨', '그레그슨 형사'],
    actions: ['말', '대답', '웃', '고개', '묻', '속삭', '외치', '소리', '말합', '대꾸'],
    particles: ['이', '은', '의', '를']
  },
  lestrade: {
    names: ['레스트레이드'],
    actions: ['말', '대답', '웃', '고개', '묻', '속삭', '외치', '소리', '말합', '대꾸'],
    particles: ['이', '은', '의', '를']
  },
  count: {
    names: ['백작'],
    actions: ['말', '대답', '웃', '고개', '묻', '속삭', '외치', '비명', '소리', '말합', '대꾸'],
    particles: ['이', '은', '의', '를']
  },
  hope: {
    names: ['호프', '마차꾼'],
    actions: ['말', '대답', '웃', '고개', '묻', '속삭', '외치', '소리', '말합', '대꾸'],
    particles: ['가', '은', '의', '를', '이']
  },
  stangerson: {
    names: ['스태거슨'],  // ✅ 올바른 철자
    actions: ['말', '대답', '웃', '고개', '묻', '속삭', '외치', '소리', '말합', '대꾸'],
    particles: ['이', '은', '의', '를']
  },
  drebber: {
    names: ['드레버'],
    actions: ['말', '대답', '웃', '고개', '묻', '속삭', '외치', '소리', '말합', '대꾸'],
    particles: ['가', '는', '의', '를']
  },
  innkeeper: {
    names: ['매튜스', '여관주인'],
    actions: ['말', '대답', '웃', '고개', '묻', '속삭', '외치', '소리', '말합', '대꾸'],
    particles: ['이', '은', '의', '를']
  },
  ellen: {
    names: ['엘렌'],
    actions: ['말', '대답', '웃', '고개', '묻', '속삭', '외치', '소리', '말합', '대꾸', '울'],
    particles: ['이', '은', '의', '를']
  }
};

/**
 * 정규표현식 자동 생성 (행동 패턴: "이름 + 조사 + 동사")
 */
function buildActionPattern(speakerId: string): RegExp {
  const config = SPEAKER_PATTERNS[speakerId];
  if (!config) return /(?!)/; // 절대 매칭 안 되는 패턴
  
  const patterns = config.names.flatMap(name => 
    config.particles.map(particle => 
      `${name}${particle} (?:${config.actions.join('|')})`
    )
  );
  
  return new RegExp(patterns.join('|'));
}

// 모든 캐릭터의 패턴을 미리 생성 (성능 최적화)
const ACTION_PATTERNS: Record<string, RegExp> = {};
Object.keys(SPEAKER_PATTERNS).forEach(id => {
  ACTION_PATTERNS[id] = buildActionPattern(id);
});

/**
 * 텍스트에서 화자 찾기 (행동 패턴 기반)
 */
export function findSpeakerInText(text: string): string | null {
  const textLower = text.toLowerCase();
  
  // 우선순위 순서로 체크 (더 구체적인 패턴 먼저)
  const priority = ['holmes', 'gregson', 'lestrade', 'count', 'hope', 'stangerson', 'drebber', 'innkeeper', 'ellen'];
  
  for (const speakerId of priority) {
    if (ACTION_PATTERNS[speakerId].test(textLower)) {
      return speakerId;
    }
  }
  
  return null;
}

/**
 * "그가/그의" 패턴에서 가장 최근 화자 찾기
 */
export function findLastMentionedSpeaker(fullText: string): string {
  const textLower = fullText.toLowerCase();
  let lastIndex = -1;
  let lastSpeaker = 'narrator';
  
  for (const speakerId of Object.keys(SPEAKER_PATTERNS)) {
    const pattern = ACTION_PATTERNS[speakerId];
    const matches = [...textLower.matchAll(new RegExp(pattern.source, 'g'))];
    
    if (matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      const index = lastMatch.index || 0;
      
      if (index > lastIndex) {
        lastIndex = index;
        lastSpeaker = speakerId;
      }
    }
  }
  
  return lastSpeaker;
}

/**
 * 캐릭터 매핑 (이름 → ID)
 */
export const SPEAKER_MAP: Record<string, string> = {
  '왓슨': 'watson',
  '당신이 말한다': 'watson',  // 플레이어(왓슨)의 대사
  '백작': 'count',
  '모로 백작': 'count',
  '호프': 'hope',
  '제퍼슨 호프': 'hope',
  '홈즈': 'holmes',
  '셜록 홈즈': 'holmes',
  '그렉슨': 'gregson',
  '그레그슨': 'gregson',
  '그레그슨 형사': 'gregson',
  '레스트레이드': 'lestrade',
  '레스트레이드 경감': 'lestrade',
  '스탠거슨': 'stangerson',
  '조셉 스태거슨': 'stangerson',
  '조셉 스탬거슨': 'stangerson',  // 표기 변형 추가
  '드레버': 'drebber',
  '이녹 드레버': 'drebber',
  '이노크 드레버': 'drebber',
  '매튜스': 'innkeeper',
  '제임스 매튜스': 'innkeeper',
  '여관주인': 'innkeeper',
  '엘렌': 'ellen'
};
