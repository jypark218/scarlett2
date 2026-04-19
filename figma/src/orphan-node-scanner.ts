/**
 * 고아 노드 스캐너
 * 모든 스토리 파일에서 정의된 노드와 참조된 노드를 비교하여
 * 어디서도 참조되지 않는 고아 노드를 찾습니다.
 */

import { storyData } from './data/storyData';

interface ScanResult {
  definedNodes: Set<string>;
  referencedNodes: Set<string>;
  orphanNodes: string[];
  startNode: string;
}

function scanOrphanNodes(): ScanResult {
  const definedNodes = new Set<string>();
  const referencedNodes = new Set<string>();

  // 1. 모든 정의된 노드 수집
  for (const [key, node] of Object.entries(storyData)) {
    if (node && typeof node === 'object' && 'id' in node) {
      definedNodes.add(node.id as string);
    }
  }

  // 2. 모든 참조된 노드 수집
  for (const node of Object.values(storyData)) {
    if (!node || typeof node !== 'object') continue;

    // nextNode 참조
    if ('nextNode' in node && typeof node.nextNode === 'string') {
      referencedNodes.add(node.nextNode);
    }

    // choices 내 nextNode 참조
    if ('choices' in node && Array.isArray(node.choices)) {
      for (const choice of node.choices) {
        if (choice && typeof choice === 'object' && 'nextNode' in choice) {
          if (typeof choice.nextNode === 'string') {
            referencedNodes.add(choice.nextNode);
          }
        }
      }
    }

    // confrontation 내 nextNode 참조
    if ('confrontation' in node && typeof node.confrontation === 'object') {
      const conf = node.confrontation as any;
      if (conf.successNode) referencedNodes.add(conf.successNode);
      if (conf.failureNode) referencedNodes.add(conf.failureNode);
      if (conf.neutralNode) referencedNodes.add(conf.neutralNode);
    }

    // deduction 내 nextNode 참조
    if ('deduction' in node && typeof node.deduction === 'object') {
      const ded = node.deduction as any;
      if (ded.successNode) referencedNodes.add(ded.successNode);
      if (ded.failureNode) referencedNodes.add(ded.failureNode);
      if (ded.partialNode) referencedNodes.add(ded.partialNode);
    }
  }

  // 3. start 노드는 고아가 아님 (진입점)
  const startNode = 'start';
  referencedNodes.add(startNode);

  // 4. 고아 노드 = 정의됨 but 참조 안 됨
  const orphanNodes: string[] = [];
  for (const nodeId of definedNodes) {
    if (!referencedNodes.has(nodeId)) {
      orphanNodes.push(nodeId);
    }
  }

  // 알파벳 순 정렬
  orphanNodes.sort();

  return {
    definedNodes,
    referencedNodes,
    orphanNodes,
    startNode
  };
}

// 실행
const result = scanOrphanNodes();

console.log('='.repeat(80));
console.log('🔍 고아 노드 스캔 결과');
console.log('='.repeat(80));
console.log();
console.log(`📊 통계:`);
console.log(`  - 정의된 노드: ${result.definedNodes.size}개`);
console.log(`  - 참조된 노드: ${result.referencedNodes.size}개`);
console.log(`  - 고아 노드: ${result.orphanNodes.length}개`);
console.log();
console.log('='.repeat(80));
console.log('📋 고아 노드 목록 (알파벳 순):');
console.log('='.repeat(80));
console.log();

if (result.orphanNodes.length === 0) {
  console.log('✅ 고아 노드가 없습니다!');
} else {
  result.orphanNodes.forEach((nodeId, index) => {
    console.log(`${(index + 1).toString().padStart(3, ' ')}. ${nodeId}`);
  });
}

console.log();
console.log('='.repeat(80));

// 파일로도 저장
const report = {
  timestamp: new Date().toISOString(),
  statistics: {
    definedNodes: result.definedNodes.size,
    referencedNodes: result.referencedNodes.size,
    orphanNodes: result.orphanNodes.length
  },
  orphanNodesList: result.orphanNodes
};

console.log();
console.log('📄 리포트를 orphan-nodes-report.json에 저장했습니다.');

export { scanOrphanNodes, report };
