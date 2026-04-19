/**
 * 긴 텍스트를 3줄 기준으로 분할하는 유틸리티
 */

// 한 줄당 평균 글자 수 (화면 크기에 따라 조정)
// 모바일: ~30자, 데스크톱: ~50자 정도를 고려
const CHARS_PER_LINE = 50;
const MAX_LINES = 3;
const MAX_CHARS = CHARS_PER_LINE * MAX_LINES; // 약 150자

/**
 * 텍스트를 3줄 기준으로 분할
 * 문단이나 자연스러운 끊는 지점을 우선 고려
 */
export function splitTextIntoChunks(text: string): string[] {
  // 빈 텍스트면 그대로 반환
  if (!text || text.trim().length === 0) {
    return [text];
  }

  // 짧은 텍스트는 분할하지 않음
  if (text.length <= MAX_CHARS) {
    return [text];
  }

  const chunks: string[] = [];
  let remainingText = text;

  while (remainingText.length > 0) {
    // 3줄 분량보다 짧으면 그대로 추가
    if (remainingText.length <= MAX_CHARS) {
      chunks.push(remainingText.trim());
      break;
    }

    // 3줄 분량만큼 자르기
    let cutIndex = MAX_CHARS;
    const segment = remainingText.substring(0, MAX_CHARS);

    // 자연스러운 분할 지점 찾기 (우선순위: 문단 > 문장 > 단어)
    const breakPoints = [
      { pattern: /\n\n/g, priority: 1 },  // 빈 줄
      { pattern: /\n/g, priority: 2 },    // 줄바꿈
      { pattern: /[.!?]\s/g, priority: 3 }, // 문장 끝
      { pattern: /[,;:]\s/g, priority: 4 }, // 쉼표/세미콜론
      { pattern: /\s/g, priority: 5 }       // 공백
    ];

    let bestCutIndex = -1;
    let bestPriority = Infinity;

    for (const { pattern, priority } of breakPoints) {
      const matches = Array.from(segment.matchAll(pattern));
      
      // 마지막 매치를 찾기 (가장 뒤에 있는 자연스러운 끊는 지점)
      if (matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        const matchIndex = lastMatch.index! + lastMatch[0].length;
        
        // 우선순위가 더 높으면 (숫자가 작으면) 업데이트
        if (priority < bestPriority) {
          bestCutIndex = matchIndex;
          bestPriority = priority;
        }
      }
    }

    // 자연스러운 끊는 지점을 찾았으면 사용
    if (bestCutIndex > 0 && bestCutIndex < MAX_CHARS) {
      cutIndex = bestCutIndex;
    }

    // 현재 청크 추가
    const chunk = remainingText.substring(0, cutIndex).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    // 남은 텍스트 업데이트
    remainingText = remainingText.substring(cutIndex).trim();
  }

  return chunks;
}

/**
 * 대사 배열을 3줄 기준으로 분할
 */
export function splitDialogueLines(lines: any[]): any[] {
  const splitLines: any[] = [];

  for (const line of lines) {
    const chunks = splitTextIntoChunks(line.text);
    
    if (chunks.length === 1) {
      // 분할 필요 없음
      splitLines.push(line);
    } else {
      // 여러 청크로 분할
      chunks.forEach(chunk => {
        splitLines.push({
          ...line,
          text: chunk
        });
      });
    }
  }

  return splitLines;
}