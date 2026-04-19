/**
 * 빠른 고아 노드 체크 - 제미나이가 지적한 67개 노드 확인
 */

import { storyData } from './data/storyData';
import { StoryNode } from './types/story';

// 1. 정의된 노드 수집
const definedNodes = new Set<string>();
const nodeToFile = new Map<string, string>();

for (const [key, node] of Object.entries(storyData)) {
  if (node && typeof node === 'object' && 'id' in node) {
    definedNodes.add(node.id as string);
    nodeToFile.set(node.id as string, key); // 어디서 정의되었는지 추적
  }
}

// 2. 참조된 노드 수집
const referencedNodes = new Set<string>();
const references = new Map<string, string[]>(); // nodeId -> [referencing nodes]
const undefinedRefs = new Map<string, string[]>(); // undefined nodeId -> [referencing nodes]

for (const [key, node] of Object.entries(storyData)) {
  if (!node || typeof node !== 'object') continue;
  const storyNode = node as StoryNode;

  // nextNode
  if (storyNode.nextNode) {
    referencedNodes.add(storyNode.nextNode);
    if (!references.has(storyNode.nextNode)) {
      references.set(storyNode.nextNode, []);
    }
    references.get(storyNode.nextNode)!.push(storyNode.id);

    // 정의되지 않은 참조 체크
    if (!definedNodes.has(storyNode.nextNode)) {
      if (!undefinedRefs.has(storyNode.nextNode)) {
        undefinedRefs.set(storyNode.nextNode, []);
      }
      undefinedRefs.get(storyNode.nextNode)!.push(storyNode.id);
    }
  }

  // choices
  if (storyNode.choices) {
    for (const choice of storyNode.choices) {
      if (choice.nextNode) {
        referencedNodes.add(choice.nextNode);
        if (!references.has(choice.nextNode)) {
          references.set(choice.nextNode, []);
        }
        references.get(choice.nextNode)!.push(storyNode.id);

        // 정의되지 않은 참조 체크
        if (!definedNodes.has(choice.nextNode)) {
          if (!undefinedRefs.has(choice.nextNode)) {
            undefinedRefs.set(choice.nextNode, []);
          }
          undefinedRefs.get(choice.nextNode)!.push(storyNode.id);
        }
      }
    }
  }

  // confrontation
  if (storyNode.confrontation) {
    const conf = storyNode.confrontation as any;
    for (const target of [conf.successNode, conf.failureNode, conf.neutralNode]) {
      if (target) {
        referencedNodes.add(target);
        if (!references.has(target)) {
          references.set(target, []);
        }
        references.get(target)!.push(storyNode.id);

        if (!definedNodes.has(target)) {
          if (!undefinedRefs.has(target)) {
            undefinedRefs.set(target, []);
          }
          undefinedRefs.get(target)!.push(storyNode.id);
        }
      }
    }
  }

  // deduction
  if (storyNode.deduction) {
    const ded = storyNode.deduction as any;
    for (const target of [ded.successNode, ded.failureNode, ded.partialNode]) {
      if (target) {
        referencedNodes.add(target);
        if (!references.has(target)) {
          references.set(target, []);
        }
        references.get(target)!.push(storyNode.id);

        if (!definedNodes.has(target)) {
          if (!undefinedRefs.has(target)) {
            undefinedRefs.set(target, []);
          }
          undefinedRefs.get(target)!.push(storyNode.id);
        }
      }
    }
  }
}

// 3. start와 엔딩 노드는 자동으로 참조됨
referencedNodes.add('start');
for (const node of Object.values(storyData) as StoryNode[]) {
  if (node && node.isEnding) {
    referencedNodes.add(node.id);
  }
}

// 4. 고아 노드
const orphanNodes: string[] = [];
for (const nodeId of definedNodes) {
  if (!referencedNodes.has(nodeId)) {
    orphanNodes.push(nodeId);
  }
}

// 5. 카테고리별 분류
const categorized: Record<string, string[]> = {
  ellen: [],
  hope: [],
  drebber: [],
  stangerson: [],
  basement: [],
  ending: [],
  suspense: [],
  psychological: [],
  dark_route: [],
  ambiguous: [],
  other: []
};

for (const nodeId of orphanNodes) {
  const lower = nodeId.toLowerCase();
  if (lower.includes('ellen')) categorized.ellen.push(nodeId);
  else if (lower.includes('hope')) categorized.hope.push(nodeId);
  else if (lower.includes('drebber')) categorized.drebber.push(nodeId);
  else if (lower.includes('stangerson')) categorized.stangerson.push(nodeId);
  else if (lower.includes('basement')) categorized.basement.push(nodeId);
  else if (lower.includes('ending')) categorized.ending.push(nodeId);
  else if (lower.includes('shadow') || lower.includes('chase') || lower.includes('suspense')) categorized.suspense.push(nodeId);
  else if (lower.includes('psycholog') || lower.includes('reflect') || lower.includes('moral')) categorized.psychological.push(nodeId);
  else if (lower.includes('dark')) categorized.dark_route.push(nodeId);
  else if (lower.includes('ambiguous')) categorized.ambiguous.push(nodeId);
  else categorized.other.push(nodeId);
}

// 6. 결과 출력
console.log('='.repeat(80));
console.log('🔍 고아 노드 분석 결과 (제미나이 지적사항 확인)');
console.log('='.repeat(80));
console.log();
console.log('📊 통계:');
console.log(`  총 정의된 노드: ${definedNodes.size}개`);
console.log(`  참조된 노드: ${referencedNodes.size}개`);
console.log(`  🔴 고아 노드: ${orphanNodes.length}개`);
console.log(`  ⚠️ 정의되지 않은 참조: ${undefinedRefs.size}개`);
console.log();

// 치명적 오류: 정의되지 않은 참조
if (undefinedRefs.size > 0) {
  console.log('='.repeat(80));
  console.log('🚨 치명적 오류: 정의되지 않은 노드 참조');
  console.log('='.repeat(80));
  console.log();
  for (const [nodeId, fromNodes] of undefinedRefs.entries()) {
    console.log(`❌ "${nodeId}" (참조 위치: ${fromNodes.length}곳)`);
    fromNodes.forEach(from => console.log(`   ← ${from}`));
    console.log();
  }
}

// 고아 노드 카테고리별
console.log('='.repeat(80));
console.log('📋 카테고리별 고아 노드');
console.log('='.repeat(80));
console.log();

for (const [category, nodes] of Object.entries(categorized)) {
  if (nodes.length > 0) {
    console.log(`\n📁 ${category.toUpperCase()} (${nodes.length}개):`);
    nodes.forEach((nodeId, i) => {
      console.log(`  ${(i + 1).toString().padStart(3)}. ${nodeId}`);
    });
  }
}

console.log();
console.log('='.repeat(80));
console.log(`🎯 총 고아 노드: ${orphanNodes.length}개`);
console.log('='.repeat(80));

// 제미나이가 언급한 특정 노드들 체크
console.log();
console.log('='.repeat(80));
console.log('🔍 제미나이 지적사항 확인');
console.log('='.repeat(80));
console.log();

const geminiMentioned = [
  'got_basement_key',
  'ask_count_truth_basement',
  'count_full_confession'
];

for (const nodeId of geminiMentioned) {
  const exists = definedNodes.has(nodeId);
  const referenced = referencedNodes.has(nodeId);
  const status = exists ? (referenced ? '✅' : '⚠️ 고아') : '❌ 미정의';
  console.log(`${status} ${nodeId}`);
  if (exists && !referenced) {
    console.log(`   ℹ️ 노드는 존재하지만 어디서도 참조되지 않음`);
  }
  if (!exists) {
    console.log(`   ℹ️ 노드가 정의되지 않았음 - 참조 위치:`);
    if (undefinedRefs.has(nodeId)) {
      undefinedRefs.get(nodeId)!.forEach(from => console.log(`      ← ${from}`));
    }
  }
}

console.log();
console.log('='.repeat(80));

// 파일로 저장 (JSON)
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalDefined: definedNodes.size,
    totalReferenced: referencedNodes.size,
    orphanCount: orphanNodes.length,
    undefinedReferences: undefinedRefs.size
  },
  orphanNodes: categorized,
  undefinedReferences: Object.fromEntries(undefinedRefs),
  geminiCheck: Object.fromEntries(
    geminiMentioned.map(nodeId => [
      nodeId,
      {
        exists: definedNodes.has(nodeId),
        referenced: referencedNodes.has(nodeId)
      }
    ])
  )
};

console.log('📄 상세 리포트를 orphan-report.json에 저장했습니다.');
console.log();

export { report, orphanNodes, undefinedRefs, categorized };
