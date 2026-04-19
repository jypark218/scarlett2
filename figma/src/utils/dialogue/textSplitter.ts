/**
 * 긴 대사 자동 분할 유틸리티
 */

import { DialogueLine } from '../../types/dialogue';

/**
 * 긴 대사를 자연스러운 구두점에서 끊어서 여러 줄로 분할
 * @param lines - 파싱된 대사 배열
 * @param maxLength - 최대 길이 (기본값: 50자)
 * @returns 분할된 대사 배열
 */
export function splitLongDialogues(lines: DialogueLine[], maxLength: number = 50): DialogueLine[] {
  const result: DialogueLine[] = [];
  
  for (const line of lines) {
    // 길이가 짧으면 그대로 유지
    if (line.text.length <= maxLength) {
      result.push(line);
      continue;
    }
    
    // 긴 대사를 분할
    const parts: string[] = [];
    let remaining = line.text;
    
    while (remaining.length > maxLength) {
      // 자연스러운 분할 위치 찾기 (우선순위: 마침표 > 물음표/느낌표 > ... > 쉼표 > 공백)
      let splitIndex = -1;
      
      // 1. 마침표로 끊기 (가장 자연스러움)
      const periodIndex = remaining.lastIndexOf('.', maxLength);
      if (periodIndex > maxLength * 0.4) { // 너무 앞쪽에서 끊지 않도록
        splitIndex = periodIndex + 1;
      }
      
      // 2. 물음표나 느낌표로 끊기
      if (splitIndex === -1) {
        const questionIndex = remaining.lastIndexOf('?', maxLength);
        const exclamIndex = remaining.lastIndexOf('!', maxLength);
        const maxPunct = Math.max(questionIndex, exclamIndex);
        if (maxPunct > maxLength * 0.4) {
          splitIndex = maxPunct + 1;
        }
      }
      
      // 3. "..."로 끊기
      if (splitIndex === -1) {
        const ellipsisIndex = remaining.lastIndexOf('...', maxLength);
        if (ellipsisIndex > maxLength * 0.3) {
          splitIndex = ellipsisIndex + 3;
        }
      }
      
      // 4. 쉼표로 끊기
      if (splitIndex === -1) {
        const commaIndex = remaining.lastIndexOf(',', maxLength);
        if (commaIndex > maxLength * 0.4) {
          splitIndex = commaIndex + 1;
        }
      }
      
      // 5. 공백으로 끊기 (마지막 수단)
      if (splitIndex === -1) {
        const spaceIndex = remaining.lastIndexOf(' ', maxLength);
        if (spaceIndex > maxLength * 0.3) {
          splitIndex = spaceIndex + 1;
        } else {
          // 공백도 없으면 강제로 maxLength에서 끊기
          splitIndex = maxLength;
        }
      }
      
      // 분할
      const part = remaining.substring(0, splitIndex).trim();
      if (part) {
        parts.push(part);
      }
      remaining = remaining.substring(splitIndex).trim();
    }
    
    // 남은 부분 추가
    if (remaining) {
      parts.push(remaining);
    }
    
    // 분할된 부분들을 개별 대사로 추가
    for (const part of parts) {
      result.push({
        characterId: line.characterId,
        text: part
      });
    }
  }
  
  return result;
}
