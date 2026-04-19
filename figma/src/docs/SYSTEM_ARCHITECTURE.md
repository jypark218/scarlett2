# 🏗️ 대화 시스템 아키텍처

## 시스템 개요

모로 백작의 비밀 게임의 고도화된 대화 처리 시스템은 3계층 구조로 설계되었습니다:

```
┌─────────────────────────────────────┐
│     UI Layer (React Components)     │
│  - DialogueBox                      │
│  - DevTools                         │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│   Business Logic Layer              │
│  - enhancedCharacterData.ts         │
│  - characterData.ts (legacy)        │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│   Core Services Layer               │
│  - characterMatcher.ts              │
│  - dialogueValidator.ts             │
└─────────────────────────────────────┘
```

## 핵심 컴포넌트

### 1. Character Matcher (캐릭터 매칭 엔진)

**파일**: `/utils/characterMatcher.ts`

**역할**:
- 대화 텍스트에서 화자 자동 감지
- 다양한 패턴 지원 (콜론, 인용부호, 서술 등)
- 컨텍스트 기반 추론
- 신뢰도 점수 계산

**주요 기능**:
```typescript
// 화자 감지
detectCharacter(text: string, context?: Context): MatchResult

// 순수 대사 추출
extractDialogue(text: string): string

// 전체 파싱
parseDialogueLines(fullText: string, defaultChar?: string): ParsedDialogue[]
```

**매칭 알고리즘**:
1. 콜론 형식 감지 (신뢰도: 100%)
2. 인용부호 + 서술 (신뢰도: 95%)
3. 역순 인용부호 (신뢰도: 95%)
4. 서술 형식 (신뢰도: 90%)
5. 패턴 기반 (신뢰도: 80%)
6. 컨텍스트 추론 (신뢰도: 65-70%)
7. 폴백: 내레이터 (신뢰도: 50%)

### 2. Dialogue Validator (대화 검증기)

**파일**: `/utils/dialogueValidator.ts`

**역할**:
- 스토리 데이터 검증
- 문제 자동 감지
- 개선 제안 생성
- 리포트 생성

**검증 항목**:
- ✅ 낮은 신뢰도 화자 매칭
- ✅ 존재하지 않는 캐릭터 ID
- ✅ 선언된 캐릭터와 불일치
- ✅ 빈 대화 내용
- ✅ 형식 문제 (인용부호, 콜론 등)

**주요 기능**:
```typescript
// 전체 검증
validateAllDialogues(): ValidationReport

// 노드별 검증
validateNodeDialogue(nodeId, text, character): ValidationIssue[]

// 문제 노드 추출
getProblematicNodes(minSeverity): string[]

// 콘솔 출력
printValidationReport(report): void
```

### 3. Enhanced Character Data (향상된 파서)

**파일**: `/data/enhancedCharacterData.ts`

**역할**:
- 기존 시스템과 새 시스템 통합
- 레거시 호환성 유지
- 개발 도구 제공

**주요 기능**:
```typescript
// 향상된 파싱
parseDialogueEnhanced(
  text: string,
  nodeCharacter?: string,
  nodeId?: string,
  useAutoDetection: boolean = true
): DialogueLine[]

// 테스트 도구
testParseNode(nodeId: string, storyData: any): void
checkFormatSupport(): void
checkCharacterAliases(): void
```

### 4. Dev Tools (개발자 도구)

**파일**: `/components/DevTools.tsx`

**역할**:
- UI 기반 검증 인터페이스
- 실시간 문제 확인
- 노드별 테스트
- 시스템 정보 제공

**기능**:
- 🔍 전체 검증 실행
- 🎯 개별 노드 테스트
- 📊 문제 목록 표시
- 💡 개선 제안 표시
- 📚 시스템 정보 확인

## 데이터 흐름

### 1. 대화 파싱 흐름

```
Story Node → parseDialogueEnhanced
              ↓
         characterMatcher.parseDialogueLines
              ↓
         각 라인별로:
              ↓
         detectCharacter (화자 감지)
              ↓
         extractDialogue (대사 추출)
              ↓
         DialogueLine[] 반환
```

### 2. 검증 흐름

```
validateAllDialogues
    ↓
각 노드별로:
    ↓
validateNodeDialogue
    ↓
parseDialogueLines
    ↓
각 라인 검사:
    - 신뢰도 체크
    - 캐릭터 존재 확인
    - 선언 일치 확인
    - 형식 체크
    ↓
ValidationIssue[] 수집
    ↓
ValidationReport 생성
```

### 3. 게임 실행 흐름

```
GameScreen 렌더링
    ↓
useEffect (node 변경)
    ↓
parseDialogue(node.text)
    ↓
DialogueBox에 전달
    ↓
타이핑 효과로 표시
```

## 설정 시스템

### 캐릭터 별칭 설정

**파일**: `/utils/characterMatcher.ts`

```typescript
export const CHARACTER_ALIASES: Record<string, CharacterAlias> = {
  holmes: {
    id: 'holmes',
    names: ['홈즈', '셜록 홈즈', '탐정'],
    patterns: [
      '홈즈가', '홈즈는', '홈즈의', '홈즈를',
      '탐정이', '탐정은', '탐정의'
    ],
    keywords: ['추리', '관찰', '연역', '탐정']
  },
  // ... 다른 캐릭터들
};
```

### 대화 패턴 설정

```typescript
const DIALOGUE_PATTERNS = {
  colonFormat: /^([^:：]+)[：:]\s*(.+)$/,
  quotedFormat: /^(.+?)(가|이|는|은)\s+(말했다|대답했다)\.?\s*["""'](.+)["""']$/,
  // ... 다른 패턴들
};
```

## 확장 가능성

### 새로운 캐릭터 추가

1. `/data/characterData.ts`에 캐릭터 정보 추가:
```typescript
export const characters: Record<string, Character> = {
  // ... 기존 캐릭터들
  newChar: {
    id: 'newChar',
    name: '새 캐릭터',
    nameColor: 'text-indigo-400',
    portraitUrl: 'https://...'
  }
};
```

2. `/utils/characterMatcher.ts`에 별칭 추가:
```typescript
export const CHARACTER_ALIASES: Record<string, CharacterAlias> = {
  // ... 기존 별칭들
  newChar: {
    id: 'newChar',
    names: ['새 캐릭터', '별칭1', '별칭2'],
    patterns: ['새 캐릭터가', '새 캐릭터는'],
    keywords: ['특징1', '특징2']
  }
};
```

### 새로운 패턴 추가

`/utils/characterMatcher.ts`의 `detectCharacter` 함수에 로직 추가:

```typescript
// 새로운 패턴 감지
const newPattern = text.match(/새로운 정규식/);
if (newPattern) {
  const speakerText = newPattern[1].trim();
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
```

### 새로운 검증 규칙 추가

`/utils/dialogueValidator.ts`의 `validateNodeDialogue` 함수에 추가:

```typescript
// 새로운 검증 규칙
if (/* 조건 */) {
  issues.push({
    nodeId,
    severity: 'warning',
    type: 'custom_check',
    message: '새로운 검증 규칙 위반',
    suggestion: '해결 방법'
  });
}
```

## 성능 최적화

### 1. 패턴 캐싱
```typescript
// 정규식을 미리 컴파일
const compiledPatterns = {
  colonFormat: /^([^:：]+)[：:]\s*(.+)$/,
  // ...
};
```

### 2. 조기 반환
```typescript
// 높은 신뢰도로 매칭되면 즉시 반환
if (colonMatch) {
  return { characterId, confidence: 1.0, matchType: 'exact' };
}
```

### 3. 메모이제이션
```typescript
// 동일 텍스트 재파싱 방지
const parseCache = new Map<string, DialogueLine[]>();
```

## 에러 처리

### 1. 안전한 폴백
```typescript
// 매칭 실패 시 narrator로 폴백
return {
  characterId: 'narrator',
  confidence: 0.5,
  matchType: 'fallback'
};
```

### 2. 검증 경고
```typescript
// 개발 모드에서 경고 출력
if (process.env.NODE_ENV === 'development') {
  console.warn('[Character Matcher] 낮은 신뢰도:', confidence);
}
```

### 3. 유효성 검사
```typescript
// 캐릭터 존재 확인
if (characterId !== 'narrator' && !characters[characterId]) {
  console.error('존재하지 않는 캐릭터:', characterId);
}
```

## 테스트 전략

### 단위 테스트
```typescript
// 패턴 매칭 테스트
describe('detectCharacter', () => {
  it('should detect colon format', () => {
    const result = detectCharacter('홈즈: 안녕하세요');
    expect(result.characterId).toBe('holmes');
    expect(result.confidence).toBe(1.0);
  });
});
```

### 통합 테스트
```typescript
// 전체 파싱 테스트
describe('parseDialogueLines', () => {
  it('should parse multiple lines', () => {
    const text = '홈즈: 첫 대사\n왓슨: 두번째 대사';
    const result = parseDialogueLines(text);
    expect(result).toHaveLength(2);
  });
});
```

### 검증 테스트
```typescript
// 검증 시스템 테스트
describe('validateAllDialogues', () => {
  it('should find all issues', () => {
    const report = validateAllDialogues();
    expect(report.issues).toBeDefined();
  });
});
```

## 모니터링

### 개발 모드 로깅
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('[Parser]', {
    nodeId,
    linesCount: result.length,
    averageConfidence: avg(result.map(l => l.confidence))
  });
}
```

### 검증 메트릭
```typescript
const metrics = {
  totalNodes: report.totalNodes,
  errorRate: report.summary.errors / report.checkedNodes,
  avgConfidence: calculateAvgConfidence()
};
```

## 마이그레이션 가이드

### 기존 시스템에서 새 시스템으로

1. **점진적 마이그레이션**
   - 새 노드는 `parseDialogueEnhanced` 사용
   - 기존 노드는 그대로 유지 (하위 호환성)

2. **검증 후 이전**
   ```typescript
   // 노드 검증
   validateNode('target_node');
   
   // 문제 없으면 마이그레이션
   node.useEnhanced = true;
   ```

3. **일괄 마이그레이션**
   ```typescript
   // 전체 검증으로 안정성 확인
   const report = validateAllDialogues();
   if (report.summary.errors === 0) {
     enableEnhancedParser();
   }
   ```

## 참고 자료

- [대화 시스템 가이드](/docs/DIALOGUE_SYSTEM.md)
- [Character Matcher 소스](/utils/characterMatcher.ts)
- [Dialogue Validator 소스](/utils/dialogueValidator.ts)
- [Dev Tools 소스](/components/DevTools.tsx)

---

**버전**: 2.0.0  
**최종 업데이트**: 2024
