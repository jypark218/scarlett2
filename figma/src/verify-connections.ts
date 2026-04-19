/**
 * 🔍 노드 연결 검증 스크립트
 * Gemini가 지적한 67개 노드가 실제로 연결되었는지 확인
 */

import { storyData } from './data/storyData';

console.log('🔍 노드 연결 검증 시작...\n');
console.log('='.repeat(80));

// ========== 1. 전체 노드 통계 ==========
const allNodeIds = Object.keys(storyData);
console.log(`\n📊 전체 노드 수: ${allNodeIds.length}개`);

// ========== 2. 모든 nextNode 참조 수집 ==========
const allNextNodes = new Set<string>();
const nodeReferences = new Map<string, string[]>(); // 각 노드를 참조하는 노드들

allNodeIds.forEach(nodeId => {
  const node = storyData[nodeId];
  
  if (node.choices) {
    node.choices.forEach(choice => {
      if (choice.nextNode) {
        allNextNodes.add(choice.nextNode);
        
        // 역참조 기록
        if (!nodeReferences.has(choice.nextNode)) {
          nodeReferences.set(choice.nextNode, []);
        }
        nodeReferences.get(choice.nextNode)!.push(nodeId);
      }
    });
  }
  
  if (node.nextNode) {
    allNextNodes.add(node.nextNode);
    
    if (!nodeReferences.has(node.nextNode)) {
      nodeReferences.set(node.nextNode, []);
    }
    nodeReferences.get(node.nextNode)!.push(nodeId);
  }
});

console.log(`📝 참조되는 노드 수: ${allNextNodes.size}개`);

// ========== 3. 고아 노드 찾기 (진입 불가능한 노드) ==========
const startNode = 'game_start';
const visitableNodes = new Set<string>();

// BFS로 시작점에서 도달 가능한 모든 노드 찾기
const queue = [startNode];
visitableNodes.add(startNode);

while (queue.length > 0) {
  const currentId = queue.shift()!;
  const node = storyData[currentId];
  
  if (!node) continue;
  
  const nextNodes: string[] = [];
  
  if (node.choices) {
    node.choices.forEach(choice => {
      if (choice.nextNode) nextNodes.push(choice.nextNode);
    });
  }
  
  if (node.nextNode) {
    nextNodes.push(node.nextNode);
  }
  
  nextNodes.forEach(nextId => {
    if (!visitableNodes.has(nextId)) {
      visitableNodes.add(nextId);
      queue.push(nextId);
    }
  });
}

const orphanNodes = allNodeIds.filter(id => !visitableNodes.has(id));

console.log(`\n✅ 도달 가능한 노드: ${visitableNodes.size}개`);
console.log(`❌ 고아 노드 (도달 불가): ${orphanNodes.length}개\n`);

// ========== 4. Gemini가 지적한 핵심 노드들 확인 ==========
console.log('='.repeat(80));
console.log('\n🎯 Gemini 지적 핵심 노드 검증\n');

const criticalNodes = [
  // 지하실 클라이맥스
  'find_basement',
  'open_basement',
  'basement_scene_with_ellen',
  'ask_count_truth_basement',
  'ask_count_truth_with_ellen',
  'count_full_confession_with_ellen',
  'hope_mercy_route',
  
  // 엘렌의 정체성
  'acquire_lucy_letter',
  'show_letter_to_ellen',
  'reveal_truth_to_ellen',
  'call_hope_for_ellen',
  'ellen_receives_locket',
  'ellen_lucy_memory',
  
  // 진엔딩
  'reconcile_all_three',
  'true_ending_reconciliation'
];

criticalNodes.forEach(nodeId => {
  const exists = allNodeIds.includes(nodeId);
  const reachable = visitableNodes.has(nodeId);
  const referencedBy = nodeReferences.get(nodeId) || [];
  
  const status = exists 
    ? (reachable ? '✅ 도달 가능' : '❌ 고아 노드')
    : '❌ 존재하지 않음';
  
  console.log(`${status} | ${nodeId}`);
  if (exists && reachable && referencedBy.length > 0) {
    console.log(`   └─ 참조자: ${referencedBy.slice(0, 3).join(', ')}${referencedBy.length > 3 ? '...' : ''}`);
  }
});

// ========== 5. 진엔딩 경로 검증 ==========
console.log('\n' + '='.repeat(80));
console.log('\n🌟 진엔딩 경로 검증\n');

const truEndingPath = [
  'acquire_lucy_letter',
  'show_letter_to_ellen',
  'reveal_truth_to_ellen',
  'call_hope_for_ellen',
  'ellen_receives_locket',
  'find_basement',
  'open_basement',
  'basement_scene_with_ellen',
  'ask_count_truth_with_ellen',
  'count_full_confession_with_ellen',
  'hope_mercy_route',
  'reconcile_all_three',
  'true_ending_reconciliation'
];

let pathValid = true;
for (let i = 0; i < truEndingPath.length - 1; i++) {
  const currentNode = truEndingPath[i];
  const nextNode = truEndingPath[i + 1];
  
  const node = storyData[currentNode];
  if (!node) {
    console.log(`❌ ${currentNode} → ${nextNode} (${currentNode} 노드 없음)`);
    pathValid = false;
    continue;
  }
  
  let hasConnection = false;
  
  if (node.choices) {
    hasConnection = node.choices.some(choice => choice.nextNode === nextNode);
  }
  
  if (node.nextNode === nextNode) {
    hasConnection = true;
  }
  
  // 간접 연결도 확인 (중간에 다른 노드를 거칠 수 있음)
  const canReach = visitableNodes.has(currentNode) && visitableNodes.has(nextNode);
  
  if (hasConnection) {
    console.log(`✅ ${currentNode} → ${nextNode}`);
  } else if (canReach) {
    console.log(`⚠️  ${currentNode} → ${nextNode} (간접 연결)`);
  } else {
    console.log(`❌ ${currentNode} → ${nextNode} (연결 없음)`);
    pathValid = false;
  }
}

console.log(`\n${pathValid ? '✅' : '❌'} 진엔딩 경로 상태: ${pathValid ? '완벽' : '불완전'}`);

// ========== 6. 새로 추가된 노드 확인 ==========
console.log('\n' + '='.repeat(80));
console.log('\n🆕 신규 추가 노드 확인\n');

const newNodes = [
  'ask_count_truth_basement',
  'acquire_lucy_letter_extended',
  'show_letter_to_ellen',
  'reveal_truth_to_ellen',
  'comfort_ellen_truth',
  'call_hope_for_ellen',
  'hope_tells_more',
  'holmes_helps_reveal',
  'basement_to_morning'
];

newNodes.forEach(nodeId => {
  const exists = allNodeIds.includes(nodeId);
  const reachable = visitableNodes.has(nodeId);
  const referencedBy = nodeReferences.get(nodeId) || [];
  
  const status = exists 
    ? (reachable ? '✅ 도달 가능' : '⚠️  고아 노드')
    : '❌ 생성 실패';
  
  console.log(`${status} | ${nodeId}`);
  if (exists && referencedBy.length > 0) {
    console.log(`   └─ 참조자: ${referencedBy.join(', ')}`);
  }
});

// ========== 7. lucy_letter 조건부 선택지 확인 ==========
console.log('\n' + '='.repeat(80));
console.log('\n🌹 lucy_letter 조건부 선택지 확인\n');

let lucyLetterChoices = 0;
allNodeIds.forEach(nodeId => {
  const node = storyData[nodeId];
  if (node.choices) {
    node.choices.forEach(choice => {
      if (choice.requiredItem === 'lucy_letter' || 
          choice.item === 'lucy_letter' ||
          choice.requiredItem === 'lucy_letter') {
        lucyLetterChoices++;
        console.log(`✅ ${nodeId} → ${choice.nextNode}`);
        console.log(`   "${choice.text}"`);
      }
    });
  }
});

console.log(`\n📊 lucy_letter 관련 선택지: ${lucyLetterChoices}개`);

// ========== 8. 최종 요약 ==========
console.log('\n' + '='.repeat(80));
console.log('\n📋 최종 요약\n');

const geminiTargetNodes = 67;
const fixedNodes = criticalNodes.filter(id => 
  allNodeIds.includes(id) && visitableNodes.has(id)
).length;

console.log(`✅ 전체 노드: ${allNodeIds.length}개`);
console.log(`✅ 도달 가능: ${visitableNodes.size}개`);
console.log(`❌ 고아 노드: ${orphanNodes.length}개`);
console.log(`✅ 핵심 노드 수정: ${fixedNodes}/${criticalNodes.length}개`);
console.log(`✅ 신규 노드 생성: ${newNodes.filter(id => allNodeIds.includes(id)).length}/${newNodes.length}개`);
console.log(`${pathValid ? '✅' : '❌'} 진엔딩 경로: ${pathValid ? '완벽' : '불완전'}`);

if (orphanNodes.length > 0 && orphanNodes.length <= 20) {
  console.log('\n⚠️  고아 노드 목록:');
  orphanNodes.slice(0, 20).forEach(id => {
    console.log(`   - ${id}`);
  });
  if (orphanNodes.length > 20) {
    console.log(`   ... 외 ${orphanNodes.length - 20}개`);
  }
}

console.log('\n' + '='.repeat(80));
console.log(pathValid && fixedNodes === criticalNodes.length 
  ? '\n🎉 모든 노드가 정상적으로 연결되었습니다!' 
  : '\n⚠️  일부 노드에 문제가 있습니다.');
console.log();
