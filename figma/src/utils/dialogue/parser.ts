/**
 * 대화 파싱 유틸리티
 */

import { DialogueLine } from '../../types/dialogue';
import { characterData } from '../../data/characters';
import { 
  findSpeakerBySelfIntro, 
  findSpeakerInText, 
  findLastMentionedSpeaker,
  SPEAKER_MAP 
} from './speakerDetector';
import { splitLongDialogues } from './textSplitter';

/**
 * ✅ 대사 검증 로직:
 * 노드의 character 속성과 파싱된 characterId를 비교하여
 * 불일치 시 경고 출력 및 노드 character로 강제 설정
 */
function validateDialogueCharacter(
  parsedCharacterId: string, 
  nodeCharacter: string | undefined,
  text: string,
  nodeId?: string
): string {
  // 내레이션은 항상 허용
  if (parsedCharacterId === 'narrator') {
    return parsedCharacterId;
  }
  
  // 노드에 character 속성이 있는 경우
  if (nodeCharacter) {
    // 파싱 결과와 불일치하면 경고
    if (parsedCharacterId !== nodeCharacter && parsedCharacterId !== 'narrator') {
      console.warn(`[대사 검증 실패] 노드 ID: ${nodeId || 'unknown'}`);
      console.warn(`  ├─ 노드 character: ${nodeCharacter} (${characterData[nodeCharacter]?.name})`);
      console.warn(`  ├─ 파싱된 character: ${parsedCharacterId} (${characterData[parsedCharacterId]?.name})`);
      console.warn(`  └─ 대사: "${text.substring(0, 50)}..."`);
      
      // 노드 character를 우선 적용
      return nodeCharacter;
    }
  }
  
  return parsedCharacterId;
}

/**
 * 대화 파싱 메인 함수
 */
export function parseDialogue(text: string, nodeCharacter?: string, nodeId?: string): DialogueLine[] {
  // ✅ text가 undefined이거나 빈 문자열인 경우 처리
  if (!text || typeof text !== 'string') {
    console.warn(`[대화 파싱 경고] 노드 ID: ${nodeId || 'unknown'} - text가 없거나 유효하지 않습니다.`);
    console.warn(`  └─ text 값:`, text);
    
    // 빈 대화 라인 반환
    return [{
      characterId: nodeCharacter || 'narrator',
      text: '',
      isNarration: true
    }];
  }

  const lines: DialogueLine[] = [];
  
  // 이스케이프된 따옴표 정규화 및 \\n 처리
  const normalizedText = text
    .replace(/\\n/g, '\n')       // \n (백슬래시+n) → 실제 줄바꿈
    .replace(/\\"/g, '"')        // \" (백슬래시+따옴표) → 실제 따옴표
    .replace(/\\'/g, "'");       // \' (백슬래시+작은따옴표) → 실제 작은따옴표
  
  // ============================================================
  // 🔍 순수 텍스트 체크 (대괄호, 따옴표, 특수 패턴 없음)
  // ============================================================
  const hasSpecialFormat = 
    normalizedText.includes('[') || 
    normalizedText.includes('\"') || 
    normalizedText.includes(':') ||
    /홈즈|그레그슨|백작|호프|스태거슨|드레버|매튜스|엘렌/.test(normalizedText);
  
  // ✅ 효과음이나 행동 묘사 패턴 감지 (내래이션으로 처리)
  const isSoundEffect = /^[쿵콰쾅탕퍽덜 Чт삐끼익!.…\s]+$/.test(normalizedText.trim());
  const isActionDescription = 
    normalizedText.includes('나는') || 
    normalizedText.includes('했다') || 
    normalizedText.includes('됐다') ||
    normalizedText.includes('보니') ||
    normalizedText.includes('들렸다') ||
    normalizedText.includes('거실에서') ||
    normalizedText.includes('침대에서') ||
    normalizedText.match(/\d{4}년/) || // 연도 표기
    normalizedText.match(/베이커 스트리트|런던|저택/); // 장소 설명
  
  // 효과음이나 행동 묘사는 무조건 내래이션
  if (!hasSpecialFormat && (isSoundEffect || isActionDescription)) {
    return [{
      characterId: 'narrator',
      text: normalizedText.trim(),
      isNarration: true
    }];
  }
  
  // 순수 텍스트면서 nodeCharacter가 제공된 경우, 바로 해당 캐릭터의 대사로 처리
  if (!hasSpecialFormat && nodeCharacter && nodeCharacter !== 'narrator') {
    return [{
      characterId: nodeCharacter,
      text: normalizedText.trim()
    }];
  }
  
  // ============================================================
  // 우선순위 1: [캐릭터명]:대사 형식 파싱 (최우선)
  // ============================================================
  // 개선된 패턴: 다음 [캐릭터명]: 또는 두 개 이상의 줄바꿈까지 매칭
  const bracketPattern = /\[([^\]]+)\]:\s*"([^"]+)"|\[([^\]]+)\]:\s*([^\[]+?)(?=\n\n|\[|$)/gs;
  const bracketMatches = [...normalizedText.matchAll(bracketPattern)];
  
  if (bracketMatches.length > 0) {
    let lastIndex = 0;
    
    bracketMatches.forEach(match => {
      const beforeText = normalizedText.substring(lastIndex, match.index);
      // 따옴표 있는 경우 (그룹 1, 2), 없는 경우 (그룹 3, 4)
      const speakerLabel = (match[1] || match[3] || '').trim();
      const dialogue = (match[2] || match[4] || '').trim();
      
      // 이전 내레이션 추가
      if (beforeText.trim()) {
        const narrationParts = beforeText.split(/\n\n+/).filter(p => p.trim() && !p.match(/\[([^\]]+)\]:/));
        narrationParts.forEach(part => {
          const cleanPart = part.trim();
          if (cleanPart && cleanPart.length > 0) {
            lines.push({
              characterId: 'narrator',
              text: cleanPart,
              isNarration: true // ✅ 내래이션 플래그
            });
          }
        });
      }
      
      // 내레이션 판별 (행동 묘사는 내레이션으로)
      // '당신이 말한'는 watson으로 처리하므로 제외
      const isNarration = (speakerLabel.includes('당신') && !SPEAKER_MAP[speakerLabel]) || 
                         speakerLabel.includes('홈즈가') || 
                         speakerLabel.includes('백작이') ||
                         speakerLabel.includes('스탠거슨을') ||
                         speakerLabel.includes('그가') ||
                         speakerLabel.includes('바닥') ||
                         speakerLabel.includes('문') ||
                         speakerLabel.includes('갑자기') ||
                         speakerLabel.startsWith('쾅');
      
      let characterId: string;
      
      if (isNarration) {
        characterId = 'narrator';
      } else {
        characterId = SPEAKER_MAP[speakerLabel] || 'narrator';
      }
      
      // ✅ 앞뒤 따옴표 제거
      const cleanDialogue = dialogue.replace(/^[\"\\\"「『]+|[\"\\\"」』]+$/g, '').trim();
      
      if (cleanDialogue) {
        lines.push({
          characterId,
          text: cleanDialogue,
          isNarration: isNarration || characterId === 'narrator' // ✅ 내래이션 플래그
        });
      }
      
      lastIndex = (match.index || 0) + match[0].length;
    });
    
    // 마지막 대사 이후 남은 텍스트
    const remainingText = normalizedText.substring(lastIndex);
    if (remainingText.trim()) {
      const narrationParts = remainingText.split(/\n\n+/).filter(p => p.trim() && !p.match(/\[([^\]]+)\]:/));
      narrationParts.forEach(part => {
        const cleanPart = part.trim();
        if (cleanPart && cleanPart.length > 0) {
          lines.push({
            characterId: 'narrator',
            text: cleanPart,
            isNarration: true // ✅ 내래이션 플래그
          });
        }
      });
    }
    
    return splitLongDialogues(lines);
  }
  
  // ============================================================
  // 우선순위 2: "캐릭터명: "대사"" 형식 파싱
  // ============================================================
  const labeledDialoguePattern = /(왓슨|백작|모로 백작|호프|제퍼슨 호프|홈즈|셜록 홈즈|그렉슨|그레그슨|그레그슨 형사|레스트레이드|레스트레이드 경감|스탠거슨|조셉 스태거슨|드레버|이녹 드레버|이노크 드레버|매튜스|제임스 매튜스|여관주인|엘렌):\s*\"([^\"]*)\"/g;
  const labeledMatches = [...normalizedText.matchAll(labeledDialoguePattern)];
  
  if (labeledMatches.length > 0) {
    let lastIndex = 0;
    
    labeledMatches.forEach(match => {
      const beforeText = normalizedText.substring(lastIndex, match.index);
      const speakerLabel = match[1];
      const dialogue = match[2];
      
      // 라벨 전 내레이션 추가
      if (beforeText.trim()) {
        const narrationParts = beforeText.split('\n\n').filter(p => p.trim());
        narrationParts.forEach(part => {
          lines.push({
            characterId: 'narrator',
            text: part.trim(),
            isNarration: true // ✅ 내래이션 플래그
          });
        });
      }
      
      const characterId = SPEAKER_MAP[speakerLabel] || 'narrator';
      
      lines.push({
        characterId,
        text: dialogue
      });
      
      lastIndex = (match.index || 0) + match[0].length;
    });
    
    // 마지막 라벨 이후 남은 텍스트
    const remainingText = normalizedText.substring(lastIndex);
    if (remainingText.trim()) {
      const narrationParts = remainingText.split('\n\n').filter(p => p.trim());
      narrationParts.forEach(part => {
        lines.push({
          characterId: 'narrator',
          text: part.trim(),
          isNarration: true // ✅ 내래이션 플래그
        });
      });
    }
    
    return splitLongDialogues(lines);
  }
  
  // ============================================================
  // 기존 파싱 로직 (라벨이 없는 경우)
  // ============================================================
  // 따옴표로 묶인 대사 분리
  const parts = normalizedText.split(/(\"[^\"]*\")/g);
  
  let processedIndex = 0;
  
  parts.forEach(part => {
    if (!part.trim()) return;
    
    // 따옴표로 묶인 대사인 경우
    if (part.startsWith('"') && part.endsWith('"')) {
      const dialogue = part.slice(1, -1);
      
      // 🎯 이전 텍스트에서 화자 추정 (행동 패턴 최우선)
      const prevText = normalizedText.substring(processedIndex, normalizedText.indexOf(part, processedIndex));
      const prevTextLower = prevText.toLowerCase();
      
      let currentSpeaker = 'narrator';
      
      // 1. 행동 패턴으로 화자 찾기 (최우선)
      const speakerFromAction = findSpeakerInText(prevText);
      
      if (speakerFromAction) {
        currentSpeaker = speakerFromAction;
      }
      // 2. "당신이" 패턴 (왓슨의 대사)
      else if (prevTextLower.match(/당신이 [말묻외대]/)) {
        currentSpeaker = 'watson';
      }
      // 3. "그가/그의" 패턴 - 이전 문맥에서 마지막 화자 찾기
      else if (prevTextLower.match(/그[가의를]/)) {
        const fullPrevText = normalizedText.substring(0, normalizedText.indexOf(part));
        currentSpeaker = findLastMentionedSpeaker(fullPrevText);
      }
      // 4. nodeCharacter가 있고 다른 단서가 없으면 사용
      else if (nodeCharacter && nodeCharacter !== 'narrator') {
        currentSpeaker = nodeCharacter;
      }
      // 5. 자기소개 패턴으로 화자 추정 (대사 내용 분석)
      else {
        const selfIntroSpeaker = findSpeakerBySelfIntro(dialogue);
        if (selfIntroSpeaker) {
          currentSpeaker = selfIntroSpeaker;
        }
        // 6. 대사 내용으로 화자 추정 (마지막 수단)
        else {
          const dialogueLower = dialogue.toLowerCase();
          
          // "왓슨, 보시오" → 홈즈가 말하는 것
          if (dialogueLower.includes('왓슨') && !dialogueLower.includes('홈즈')) {
            currentSpeaker = 'holmes';
          }
          // 루시 관련 긴 대사 → 호프가 말하는 것
          else if ((dialogueLower.includes('루시') || dialogueLower.includes('연인')) && dialogueLower.length > 20) {
            currentSpeaker = 'hope';
          }
        }
      }
      
      lines.push({
        characterId: currentSpeaker,
        text: dialogue
      });
      
      processedIndex = normalizedText.indexOf(part, processedIndex) + part.length;
    } else {
      // 일반 내레이션
      if (part.trim()) {
        lines.push({
          characterId: 'narrator',
          text: part.trim(),
          isNarration: true // ✅ 내래이션 플래그
        });
      }
    }
  });
  
  // 파싱 실패 시 전체를 내레이션으로
  if (lines.length === 0) {
    // nodeCharacter가 제공되었으면 해당 캐릭터의 대사로 처리
    // 제공되지 않았거나 'narrator'면 내레이션으로 처리
    const characterId = (nodeCharacter && nodeCharacter !== 'narrator') ? nodeCharacter : 'narrator';
    const isNarration = !nodeCharacter || nodeCharacter === 'narrator';
    
    lines.push({
      characterId: characterId,
      text: text,
      isNarration: isNarration // ✅ 내래이션 플래그
    });
  }
  
  // 긴 대사 분할 및 따옴표 제거
  const splitLines = splitLongDialogues(lines);
  
  // ✅ 출력 검증 로그
  const hasNarration = splitLines.some(line => line.isNarration);
  const hasDialogue = splitLines.some(line => !line.isNarration);
  
  console.log(`[대화 파싱 완료] 노드: ${nodeId || 'unknown'}`);
  console.log(`  ├─ 총 ${splitLines.length}개 라인`);
  console.log(`  ├─ 내래이션: ${splitLines.filter(l => l.isNarration).length}개`);
  console.log(`  ├─ 대사: ${splitLines.filter(l => !l.isNarration).length}개`);
  console.log(`  └─ 캐릭터: ${[...new Set(splitLines.filter(l => !l.isNarration).map(l => l.characterId))].join(', ')}`);
  
  // 모든 대사에서 앞뒤 따옴표 제거 (후처리) - 더 강력한 매칭
  return splitLines.map(line => ({
    ...line,
    text: line.text
      .replace(/^["'"""\u201C\u201D「『]+/g, '')  // 앞쪽 모든 종류의 따옴표 제거 (유니코드 포함)
      .replace(/["'"""\u201C\u201D」』]+$/g, '')  // 뒤쪽 모든 종류의 따옴표 제거 (유니코드 포함)
      .trim()
  }));
}