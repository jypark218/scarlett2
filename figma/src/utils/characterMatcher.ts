/**
 * 🎭 고도화된 캐릭터 자동 매칭 시스템
 * 
 * 대화 텍스트에서 화자를 자동으로 감지하고 매칭합니다.
 * - 다양한 패턴 지원 (콜론, 인용부호, 서술형)
 * - 컨텍스트 기반 추론
 * - 별칭 자동 처리
 */

export interface CharacterAlias {
  id: string;
  names: string[];
  patterns: string[];
  keywords: string[];
}

export interface MatchResult {
  characterId: string;
  confidence: number; // 0-1
  matchType: 'exact' | 'pattern' | 'context' | 'fallback';
  matchedText?: string;
}

/**
 * 캐릭터 별칭 및 패턴 정의
 */
export const CHARACTER_ALIASES: Record<string, CharacterAlias> = {
  watson: {
    id: 'watson',
    names: ['왓슨', '존 H. 왓슨', '존 왓슨', '왓슨 박사', '나'],
    patterns: [
      '왓슨이', '왓슨은', '왓슨의', '왓슨을', '왓슨에게',
      '내가', '나는', '나의', '나를'
    ],
    keywords: ['군의관', '친구', '조수', '동료']
  },
  holmes: {
    id: 'holmes',
    names: ['홈즈', '셜록 홈즈', '탐정'],
    patterns: [
      '홈즈가', '홈즈는', '홈즈의', '홈즈를', '홈즈에게',
      '탐정이', '탐정은', '탐정의'
    ],
    keywords: ['추리', '관찰', '연역', '탐정', '베이커가']
  },
  gregson: {
    id: 'gregson',
    names: ['그레그슨', '그레그슨 형사', '형사'],
    patterns: [
      '그레그슨이', '그레그슨은', '그레그슨의', '그레그슨을',
      '형사가', '형사는', '형사의'
    ],
    keywords: ['스코틀랜드 야드', '경찰', '수사', '형사']
  },
  count: {
    id: 'count',
    names: ['모로 백작', '백작', '모로'],
    patterns: [
      '백작이', '백작은', '백작의', '백작을', '백작에게',
      '모로가', '모로는', '모로의'
    ],
    keywords: ['저택', '귀족', '주인', '백작']
  },
  hope: {
    id: 'hope',
    names: ['제퍼슨 호프', '호프', '제퍼슨', '마차꾼'],
    patterns: [
      '호프가', '호프는', '호프의', '호프를', '호프에게',
      '제퍼슨이', '제퍼슨은',
      '마차꾼이', '마차꾼은'
    ],
    keywords: ['마차', '복수', '유타', '루시']
  },
  stangerson: {
    id: 'stangerson',
    names: ['조셉 스탠거슨', '스탠거슨', '조셉', '비서'],
    patterns: [
      '스탠거슨이', '스탠거슨은', '스탠거슨의', '스탠거슨을',
      '조셉이', '조셉은',
      '비서가', '비서는'
    ],
    keywords: ['비서', '충실한', '보좌관']
  },
  drebber: {
    id: 'drebber',
    names: ['이노크 드레버', '드레버', '이노크', '집사'],
    patterns: [
      '드레버가', '드레버는', '드레버의', '드레버를',
      '이노크가', '이노크는',
      '집사가', '집사는'
    ],
    keywords: ['집사', '하인', '충성']
  },
  lucy: {
    id: 'lucy',
    names: ['루시', '루시 루이자', '루이자'],
    patterns: [
      '루시가', '루시는', '루시의', '루시를',
      '루이자가', '루이자는'
    ],
    keywords: ['메이드', '하녀', '여인']
  }
};

/**
 * 대화 형식 패턴
 */
const DIALOGUE_PATTERNS = {
  // "홈즈: 대화 내용" 형식
  colonFormat: /^([^:：]+)[：:]\s*(.+)$/,
  
  // "홈즈가 말했다. "대화 내용"" 형식
  quotedFormat: /^(.+?)(가|이|는|은)\s+(말했다|대답했다|물었다|외쳤다|속삭였다|덧붙였다)\.?\s*["""'](.+)["""']$/,
  
  // ""대화 내용" 홈즈가 말했다." 형식
  quotedReverseFormat: /^["""'](.+)["""']\s+(.+?)(가|이|는|은)\s+(말했다|대답했다|물었다|외쳤다|속삭였다|덧붙였다)\.?$/,
  
  // "홈즈가 말했다" 단순 서술
  narrativeFormat: /(.+?)(가|이|는|은)\s+(말했다|대답했다|물었다|외쳤다|속삭였다|덧붙였다|고개를|미소를|웃었다|설명했다)/
};

/**
 * 텍스트에서 캐릭터 감지
 */
export function detectCharacter(text: string, context?: {
  previousSpeaker?: string;
  nodeId?: string;
  availableCharacters?: string[];
}): MatchResult {
  // 1. 콜론 형식 감지 ("홈즈: 대화")
  const colonMatch = text.match(DIALOGUE_PATTERNS.colonFormat);
  if (colonMatch) {
    const speakerText = colonMatch[1].trim();
    const matched = findCharacterByName(speakerText);
    if (matched) {
      return {
        characterId: matched,
        confidence: 1.0,
        matchType: 'exact',
        matchedText: speakerText
      };
    }
  }

  // 2. 인용부호 + 서술 형식 감지
  const quotedMatch = text.match(DIALOGUE_PATTERNS.quotedFormat);
  if (quotedMatch) {
    const speakerText = quotedMatch[1].trim();
    const matched = findCharacterByName(speakerText);
    if (matched) {
      return {
        characterId: matched,
        confidence: 0.95,
        matchType: 'pattern',
        matchedText: speakerText
      };
    }
  }

  // 3. 역순 인용부호 형식
  const reverseMatch = text.match(DIALOGUE_PATTERNS.quotedReverseFormat);
  if (reverseMatch) {
    const speakerText = reverseMatch[2].trim();
    const matched = findCharacterByName(speakerText);
    if (matched) {
      return {
        characterId: matched,
        confidence: 0.95,
        matchType: 'pattern',
        matchedText: speakerText
      };
    }
  }

  // 4. 서술 형식에서 화자 추출
  const narrativeMatch = text.match(DIALOGUE_PATTERNS.narrativeFormat);
  if (narrativeMatch) {
    const speakerText = narrativeMatch[1].trim();
    const matched = findCharacterByName(speakerText);
    if (matched) {
      return {
        characterId: matched,
        confidence: 0.9,
        matchType: 'pattern',
        matchedText: speakerText
      };
    }
  }

  // 5. 패턴 기반 감지 (전체 텍스트 스캔)
  const patternMatch = detectByPattern(text);
  if (patternMatch) {
    return patternMatch;
  }

  // 6. 컨텍스트 기반 추론
  if (context) {
    const contextMatch = detectByContext(text, context);
    if (contextMatch) {
      return contextMatch;
    }
  }

  // 7. 폴백: 내레이터
  return {
    characterId: 'narrator',
    confidence: 0.5,
    matchType: 'fallback'
  };
}

/**
 * 이름으로 캐릭터 찾기
 */
function findCharacterByName(nameText: string): string | null {
  const normalized = nameText.trim().toLowerCase();
  
  for (const [charId, alias] of Object.entries(CHARACTER_ALIASES)) {
    // 정확한 이름 매칭
    if (alias.names.some(name => normalized.includes(name.toLowerCase()))) {
      return charId;
    }
    
    // 패턴 매칭 (조사 포함)
    if (alias.patterns.some(pattern => normalized.includes(pattern.toLowerCase()))) {
      return charId;
    }
  }
  
  return null;
}

/**
 * 패턴 기반 감지
 */
function detectByPattern(text: string): MatchResult | null {
  const normalized = text.toLowerCase();
  
  for (const [charId, alias] of Object.entries(CHARACTER_ALIASES)) {
    // 패턴 매칭
    for (const pattern of alias.patterns) {
      if (normalized.includes(pattern.toLowerCase())) {
        return {
          characterId: charId,
          confidence: 0.8,
          matchType: 'pattern',
          matchedText: pattern
        };
      }
    }
    
    // 키워드 매칭 (신뢰도 낮음)
    for (const keyword of alias.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        return {
          characterId: charId,
          confidence: 0.6,
          matchType: 'context',
          matchedText: keyword
        };
      }
    }
  }
  
  return null;
}

/**
 * 컨텍스트 기반 감지
 */
function detectByContext(text: string, context: {
  previousSpeaker?: string;
  nodeId?: string;
  availableCharacters?: string[];
}): MatchResult | null {
  // 이전 화자가 있고, 대화가 짧으면 동일 화자일 가능성
  if (context.previousSpeaker && text.length < 50 && !text.includes('"')) {
    return {
      characterId: context.previousSpeaker,
      confidence: 0.7,
      matchType: 'context'
    };
  }
  
  // 노드 ID 기반 추론
  if (context.nodeId) {
    if (context.nodeId.includes('holmes')) {
      return {
        characterId: 'holmes',
        confidence: 0.65,
        matchType: 'context'
      };
    }
    if (context.nodeId.includes('gregson')) {
      return {
        characterId: 'gregson',
        confidence: 0.65,
        matchType: 'context'
      };
    }
    if (context.nodeId.includes('count')) {
      return {
        characterId: 'count',
        confidence: 0.65,
        matchType: 'context'
      };
    }
  }
  
  return null;
}

/**
 * 대화 라인에서 실제 대사 추출
 */
export function extractDialogue(text: string): string {
  // 콜론 형식
  const colonMatch = text.match(DIALOGUE_PATTERNS.colonFormat);
  if (colonMatch) {
    return colonMatch[2].trim();
  }
  
  // 인용부호 형식
  const quotedMatch = text.match(DIALOGUE_PATTERNS.quotedFormat);
  if (quotedMatch) {
    return quotedMatch[4].trim();
  }
  
  // 역순 인용부호
  const reverseMatch = text.match(DIALOGUE_PATTERNS.quotedReverseFormat);
  if (reverseMatch) {
    return reverseMatch[1].trim();
  }
  
  // 인용부호만 있는 경우
  const quoteOnlyMatch = text.match(/^["""'](.+)["""']$/);
  if (quoteOnlyMatch) {
    return quoteOnlyMatch[1].trim();
  }
  
  // 서술 제거
  const cleaned = text
    .replace(/^.+?(가|이|는|은)\s+(말했다|대답했다|물었다|외쳤다|속삭였다|덧붙였다)\.?\s*/, '')
    .replace(/\s+.+?(가|이|는|은)\s+(말했다|대답했다|물었다|외쳤다|속삭였다|덧붙였다)\.?$/, '');
  
  return cleaned.trim() || text.trim();
}

/**
 * 여러 라인을 파싱
 */
export interface ParsedDialogue {
  characterId: string;
  text: string;
  confidence: number;
  originalText: string;
}

export function parseDialogueLines(
  fullText: string,
  defaultCharacter?: string,
  nodeId?: string
): ParsedDialogue[] {
  const lines = fullText.split('\n').filter(line => line.trim());
  const result: ParsedDialogue[] = [];
  let previousSpeaker: string | undefined = defaultCharacter;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    const match = detectCharacter(trimmed, {
      previousSpeaker,
      nodeId
    });
    
    const dialogue = extractDialogue(trimmed);
    
    result.push({
      characterId: match.characterId,
      text: dialogue,
      confidence: match.confidence,
      originalText: trimmed
    });
    
    previousSpeaker = match.characterId;
  }
  
  return result;
}
