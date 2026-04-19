/**
 * 🧪 대화 파싱 테스트 유틸리티
 * 
 * 개선된 파싱 로직을 테스트하기 위한 도구
 */

import { parseDialogue, characters } from '../data/characterData';
import type { StoryNode } from '../types/story';

/**
 * 특정 노드의 파싱 결과를 콘솔에 출력
 */
export function testNodeParsing(nodeId: string, storyData: Record<string, StoryNode>) {
  const node = storyData[nodeId];
  
  if (!node) {
    console.error(`❌ 노드를 찾을 수 없습니다: ${nodeId}`);
    return;
  }
  
  if (!node.text) {
    console.log(`ℹ️ 노드 ${nodeId}에는 텍스트가 없습니다.`);
    return;
  }
  
  console.group(`🧪 파싱 테스트: ${nodeId}`);
  console.log(`📝 원본 텍스트:\n${node.text}\n`);
  
  const lines = parseDialogue(node.text, node.character, nodeId);
  
  console.log(`📊 파싱 결과 (${lines.length}개 라인):`);
  lines.forEach((line, i) => {
    const char = characters[line.characterId];
    const icon = line.characterId === 'narrator' ? '📖' : '💬';
    console.log(`${i + 1}. ${icon} [${char?.name || line.characterId}]`);
    console.log(`   "${line.text}"`);
  });
  
  // 통계
  const speakerCount = new Set(lines.filter(l => l.characterId !== 'narrator').map(l => l.characterId)).size;
  const narratorCount = lines.filter(l => l.characterId === 'narrator').length;
  const dialogueCount = lines.filter(l => l.characterId !== 'narrator').length;
  
  console.log(`\n📈 통계:`);
  console.log(`  - 등장 캐릭터: ${speakerCount}명`);
  console.log(`  - 대사: ${dialogueCount}개`);
  console.log(`  - 내레이션: ${narratorCount}개`);
  
  // 노드에 character 속성이 있는지 확인
  if (node.character) {
    console.log(`\n🎯 노드 character 속성: ${characters[node.character]?.name || node.character}`);
  } else {
    console.log(`\n⚠️ 노드에 character 속성이 없습니다.`);
    if (speakerCount === 1) {
      const mainSpeaker = lines.find(l => l.characterId !== 'narrator')?.characterId;
      if (mainSpeaker) {
        console.log(`   💡 제안: character: '${mainSpeaker}' 추가를 고려하세요.`);
      }
    }
  }
  
  console.groupEnd();
}

/**
 * 문제가 있는 노드들을 찾아서 출력
 */
export function findProblematicNodes(storyData: Record<string, StoryNode>) {
  console.group('🔍 문제 노드 검색');
  
  const problems: Array<{
    nodeId: string;
    issue: string;
    suggestion: string;
  }> = [];
  
  for (const [nodeId, node] of Object.entries(storyData)) {
    if (!node.text) continue;
    
    const lines = parseDialogue(node.text, node.character, nodeId);
    const speakers = lines.filter(l => l.characterId !== 'narrator');
    const narratorLines = lines.filter(l => l.characterId === 'narrator');
    
    // 1. 대사가 있는데 모두 narrator로 파싱된 경우
    if (node.text.includes('"') && speakers.length === 0) {
      problems.push({
        nodeId,
        issue: '모든 대사가 narrator로 파싱됨',
        suggestion: '노드에 character 속성 추가 또는 대사 형식 개선'
      });
    }
    
    // 2. nodeCharacter와 실제 대사가 많이 불일치하는 경우
    if (node.character && node.character !== 'narrator') {
      const matchCount = lines.filter(l => l.characterId === node.character).length;
      if (matchCount === 0 && speakers.length > 0) {
        problems.push({
          nodeId,
          issue: `character: '${node.character}'이지만 해당 캐릭터 대사 없음`,
          suggestion: 'character 속성 제거 또는 수정'
        });
      }
    }
    
    // 3. 내레이션에 따옴표가 포함된 경우 (미감지 대사)
    const narratorWithQuotes = narratorLines.filter(l => l.text.includes('"') && l.text.length > 10);
    if (narratorWithQuotes.length > 0) {
      problems.push({
        nodeId,
        issue: `내레이션에 ${narratorWithQuotes.length}개 미감지 대사 포함`,
        suggestion: '대사 형식 개선 (홈즈: "대사" 또는 character 속성 추가)'
      });
    }
  }
  
  if (problems.length === 0) {
    console.log('✅ 문제가 있는 노드가 발견되지 않았습니다!');
  } else {
    console.log(`⚠️ ${problems.length}개 노드에서 문제 발견:\n`);
    problems.forEach(({ nodeId, issue, suggestion }) => {
      console.log(`📍 ${nodeId}`);
      console.log(`   ❌ ${issue}`);
      console.log(`   💡 ${suggestion}\n`);
    });
  }
  
  console.groupEnd();
  return problems;
}

/**
 * 자기소개 패턴 테스트
 */
export function testSelfIntroPattern(dialogue: string) {
  console.group('🎯 자기소개 패턴 테스트');
  console.log(`테스트 대사: "${dialogue}"`);
  
  const patterns = {
    watson: /난 왓슨|저는 왓슨|왓슨 박사|왓슨입니다|왓슨이요/i,
    holmes: /난 셜록 홈즈|저는 홈즈|홈즈요|홈즈입니다|셜록 홈즈입니다/i,
    gregson: /그레그슨 형사|난 그레그슨|저는 그레그슨|형사입니다/i,
    count: /난 모로 백작|저는 백작|백작입니다|모로입니다/i,
    hope: /난 제퍼슨 호프|저는 호프|호프요|호프입니다|마차꾼입니다/i,
    stangerson: /난 조셉 스탠거슨|저는 스탠거슨|스탠거슨입니다|조셉입니다/i,
    drebber: /난 이노크 드레버|저는 드레버|드레버요|드레버입니다|이노크입니다/i,
    lucy: /난 루시|저는 루시|루시입니다|루이자입니다/i,
  };
  
  let found = false;
  for (const [charId, pattern] of Object.entries(patterns)) {
    if (pattern.test(dialogue)) {
      console.log(`✅ 감지됨: ${characters[charId]?.name || charId}`);
      found = true;
    }
  }
  
  if (!found) {
    console.log('❌ 자기소개 패턴을 찾을 수 없습니다.');
  }
  
  console.groupEnd();
}

/**
 * 대화 핑퐁 패턴 시뮬레이션
 */
export function simulatePingPong(text: string, nodeCharacter?: string) {
  console.group('🏓 대화 핑퐁 시뮬레이션');
  console.log(`입력 텍스트:\n${text}\n`);
  
  const lines = parseDialogue(text, nodeCharacter);
  
  const speakers = [...new Set(lines.filter(l => l.characterId !== 'narrator').map(l => l.characterId))];
  console.log(`감지된 화자: ${speakers.map(s => characters[s]?.name || s).join(', ')}`);
  
  if (speakers.length === 2) {
    console.log('✅ 2인 대화 감지 - 핑퐁 패턴 적용됨');
  } else if (speakers.length === 1) {
    console.log('ℹ️ 단일 화자 대화');
  } else if (speakers.length > 2) {
    console.log('ℹ️ 다중 화자 대화 (핑퐁 패턴 비활성화)');
  }
  
  console.log('\n파싱 결과:');
  lines.forEach((line, i) => {
    const char = characters[line.characterId];
    console.log(`${i + 1}. [${char?.name || line.characterId}] ${line.text}`);
  });
  
  console.groupEnd();
}

/**
 * 전체 스토리 통계
 */
export function getStoryStats(storyData: Record<string, StoryNode>) {
  console.group('📊 스토리 전체 통계');
  
  let totalNodes = 0;
  let nodesWithText = 0;
  let totalLines = 0;
  let totalDialogues = 0;
  let totalNarrations = 0;
  const speakerCounts: Record<string, number> = {};
  
  for (const [nodeId, node] of Object.entries(storyData)) {
    totalNodes++;
    if (!node.text) continue;
    
    nodesWithText++;
    const lines = parseDialogue(node.text, node.character, nodeId);
    totalLines += lines.length;
    
    lines.forEach(line => {
      if (line.characterId === 'narrator') {
        totalNarrations++;
      } else {
        totalDialogues++;
        speakerCounts[line.characterId] = (speakerCounts[line.characterId] || 0) + 1;
      }
    });
  }
  
  console.log(`📝 총 노드: ${totalNodes}개`);
  console.log(`📄 텍스트가 있는 노드: ${nodesWithText}개`);
  console.log(`📊 총 라인: ${totalLines}개`);
  console.log(`💬 대사: ${totalDialogues}개`);
  console.log(`📖 내레이션: ${totalNarrations}개`);
  console.log(`\n캐릭터별 대사 수:`);
  
  Object.entries(speakerCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([charId, count]) => {
      const char = characters[charId];
      console.log(`  ${char?.name || charId}: ${count}개`);
    });
  
  console.groupEnd();
}
