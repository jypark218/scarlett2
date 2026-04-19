/**
 * 🛠️ 개발자 헬퍼 함수
 * 
 * 브라우저 콘솔에서 직접 사용할 수 있는 유틸리티 함수들
 */

import { 
  validateAllDialogues, 
  validateNode as validateNodeFn, 
  printValidationReport, 
  getProblematicNodes 
} from './dialogueValidator';
import { storyData } from '../data/storyData';
import { parseDialogueLines, detectCharacter, extractDialogue, CHARACTER_ALIASES } from './characterMatcher';
import { characters } from '../data/characterData';

/**
 * 개발자 도구 도움말 출력
 */
export function help() {
  console.log(`
🛠️ 모로 백작의 비밀 - 개발자 도구 가이드

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 검증 도구
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

validate()                  - 전체 스토리 검증
validateNode('node_id')     - 특정 노드 검증
problems()                  - 문제가 있는 노드 목록
problems('error')           - 에러만 있는 노드 목록

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 테스트 도구
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

testNode('node_id')         - 노드 파싱 테스트
testText('텍스트')          - 텍스트 파싱 테스트
detectSpeaker('텍스트')     - 화자 감지 테스트

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 정보 확인
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

formats()                   - 지원하는 대화 형식
aliases()                   - 캐릭터 별칭 목록
stats()                     - 스토리 통계

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 사용 예시
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 전체 검증 실행
validate();

// 특정 노드 테스트
testNode('start');

// 화자 감지 테스트
detectSpeaker('홈즈: 흥미롭군요.');

// 문제 노드만 확인
problems();

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 자세한 가이드: /docs/DIALOGUE_SYSTEM.md
  `);
}

/**
 * 전체 검증 (간편 함수)
 */
export function validate() {
  console.log('🔍 전체 스토리 검증 중...\n');
  const report = validateAllDialogues(storyData);
  printValidationReport(report);
  
  if (report.summary.errors > 0) {
    console.log('\n💡 Tip: problems() 명령으로 문제 노드 목록을 확인하세요.');
  }
  
  return report;
}

/**
 * 문제 노드 목록 (간편 함수)
 */
export function problems(severity: 'error' | 'warning' | 'info' = 'warning') {
  console.log(`🚨 문제 노드 목록 (심각도: ${severity} 이상)\n`);
  const nodes = getProblematicNodes(severity, storyData);
  
  if (nodes.length === 0) {
    console.log('✅ 문제가 있는 노드가 없습니다!');
    return [];
  }
  
  console.log(`총 ${nodes.length}개 노드:\n`);
  nodes.forEach((nodeId, index) => {
    console.log(`  ${index + 1}. ${nodeId}`);
  });
  
  console.log(`\n💡 Tip: testNode('node_id') 명령으로 상세 정보를 확인하세요.`);
  
  return nodes;
}

/**
 * 노드 테스트 (간편 함수)
 */
export function testNode(nodeId: string) {
  if (!storyData[nodeId]) {
    console.error(`❌ 노드를 찾을 수 없습니다: ${nodeId}`);
    return;
  }
  
  testParseNode(nodeId, storyData);
}

/**
 * 텍스트 파싱 테스트 (간편 함수)
 */
export function testText(text: string, character?: string) {
  console.group('🧪 텍스트 파싱 테스트');
  console.log('📝 입력 텍스트:');
  console.log(text);
  console.log('\n🤖 파싱 결과:');
  
  const result = parseDialogueLines(text, character, 'test');
  result.forEach((line, i) => {
    console.log(`\n${i + 1}번 째 라인:`);
    console.log(`  화자: ${line.characterId}`);
    console.log(`  대사: ${line.text}`);
    console.log(`  신뢰도: ${(line.confidence * 100).toFixed(0)}%`);
  });
  
  console.groupEnd();
  return result;
}

/**
 * 화자 감지 테스트 (간편 함수)
 */
export function detectSpeaker(text: string) {
  console.group('🔍 화자 감지 테스트');
  console.log(`📝 입력: "${text}"`);
  
  const result = detectCharacter(text);
  console.log(`\n🎯 감지 결과:`);
  console.log(`  화자: ${result.characterId}`);
  console.log(`  신뢰도: ${(result.confidence * 100).toFixed(0)}%`);
  console.log(`  대사: "${extractDialogue(text)}"`);
  
  console.groupEnd();
  return result;
}

/**
 * 지원 형식 확인 (간편 함수)
 */
export function formats() {
  checkFormatSupport();
}

/**
 * 캐릭터 별칭 확인 (간편 함수)
 */
export function aliases() {
  checkCharacterAliases();
}

/**
 * 스토리 통계
 */
export function stats() {
  const nodes = Object.values(storyData);
  const withText = nodes.filter(n => n.text);
  const withChoices = nodes.filter(n => n.choices && n.choices.length > 0);
  const endings = nodes.filter(n => n.isEnding);
  
  console.group('📊 스토리 통계');
  console.log(`총 노드 수: ${nodes.length}`);
  console.log(`텍스트 있는 노드: ${withText.length}`);
  console.log(`선택지 있는 노드: ${withChoices.length}`);
  console.log(`엔딩 노드: ${endings.length}`);
  
  // 캐릭터별 통계
  const characterCount: Record<string, number> = {};
  withText.forEach(node => {
    if (node.character) {
      characterCount[node.character] = (characterCount[node.character] || 0) + 1;
    }
  });
  
  console.log('\n캐릭터별 노드 수:');
  Object.entries(characterCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([char, count]) => {
      console.log(`  ${char}: ${count}개`);
    });
  
  console.groupEnd();
}

/**
 * 빠른 수정 제안
 */
export function quickFix(nodeId: string) {
  const node = storyData[nodeId];
  if (!node) {
    console.error(`❌ 노드를 찾을 수 없습니다: ${nodeId}`);
    return;
  }
  
  if (!node.text) {
    console.log('ℹ️ 이 노드에는 텍스트가 없습니다.');
    return;
  }
  
  console.group(`🔧 빠른 수정 제안: ${nodeId}`);
  
  const parsed = parseDialogueLines(node.text, node.character, nodeId);
  const lowConfidence = parsed.filter(line => line.confidence < 0.7);
  
  if (lowConfidence.length === 0) {
    console.log('✅ 문제가 없습니다!');
  } else {
    console.log(`⚠️ ${lowConfidence.length}개의 낮은 신뢰도 대화 발견:\n`);
    
    lowConfidence.forEach((line, i) => {
      console.log(`${i + 1}. 원본: "${line.originalText}"`);
      console.log(`   신뢰도: ${(line.confidence * 100).toFixed(0)}%`);
      console.log(`   감지된 화자: ${line.characterId}`);
      
      // 수정 제안
      if (line.confidence < 0.5) {
        console.log(`   💡 제안: "${line.characterId}: ${line.text}"`);
      }
      console.log('');
    });
  }
  
  console.groupEnd();
}

/**
 * 전역 객체에 헬퍼 함수 등록 (개발 모드에서만)
 */
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).devTools = {
    help,
    validate,
    validateNode: validateNodeFn,
    problems,
    testNode,
    testText,
    detectSpeaker,
    formats,
    aliases,
    stats,
    quickFix
  };
  
  console.log(`
🛠️ 개발자 도구가 로드되었습니다!

사용법을 보려면: devTools.help()
빠른 검증: devTools.validate()
  `);
}

// Export for direct import
export {
  validateNodeFn,
  validateAllDialogues,
  getProblematicNodes,
  testParseNode,
  checkFormatSupport,
  checkCharacterAliases
};

/**
 * 노드 파싱 테스트
 */
function testParseNode(nodeId: string, storyNodes: Record<string, any>) {
  const node = storyNodes[nodeId];
  if (!node) {
    console.error(`❌ 노드를 찾을 수 없습니다: ${nodeId}`);
    return;
  }

  console.group(`🧪 노드 파싱 테스트: ${nodeId}`);
  console.log('📝 원본 텍스트:');
  console.log(node.text);
  console.log('\n🤖 파싱 결과:');

  const parsed = parseDialogueLines(node.text, node.character, nodeId);
  parsed.forEach((line, i) => {
    const charName = characters[line.characterId]?.name || line.characterId;
    const confidence = (line.confidence * 100).toFixed(0);
    console.log(`  ${i + 1}. [${charName}] (${confidence}%): ${line.text.substring(0, 60)}${line.text.length > 60 ? '...' : ''}`);
  });

  console.groupEnd();
}

/**
 * 지원 형식 확인
 */
function checkFormatSupport() {
  console.group('📚 지원하는 대화 형식');
  console.log(`
1. [캐릭터명]: 대사
   예: [홈즈]: 흥미롭군요.

2. [캐릭터명] 대사
   예: [홈즈] 흥미롭군요.

3. 캐릭터명: 대사
   예: 홈즈: 흥미롭군요.

4. "대사" (노드 character 지정 필요)
   예: "흥미롭군요."

5. [행동/상황] (자동으로 내레이션 처리)
   예: [당신은 조용히 문을 연다]
  `);
  console.groupEnd();
}

/**
 * 캐릭터 별칭 확인
 */
function checkCharacterAliases() {
  console.group('🎭 캐릭터 별칭 목록');
  Object.entries(CHARACTER_ALIASES).forEach(([charId, aliases]) => {
    const charName = characters[charId]?.name || charId;
    console.log(`${charName} (${charId}): ${aliases.join(', ')}`);
  });
  console.groupEnd();
}