/**
 * 고아 노드 스캐너 - 현재 상태 확인
 */

import { storyData } from '../data/storyData';
import { StoryNode } from '../types/story';

interface OrphanScanResult {
  totalDefined: number;
  totalReferenced: number;
  orphanCount: number;
  orphanNodes: string[];
  undefinedReferences: string[];
}

export function scanOrphanNodes(): OrphanScanResult {
  const definedNodes = new Set<string>();
  const referencedNodes = new Set<string>();
  const undefinedReferences: string[] = [];

  // 1. 정의된 모든 노드 수집
  for (const [key, node] of Object.entries(storyData)) {
    if (node && typeof node === 'object' && 'id' in node) {
      definedNodes.add(node.id as string);
    }
  }

  // 2. 참조된 모든 노드 수집
  for (const node of Object.values(storyData) as StoryNode[]) {
    if (!node) continue;

    // nextNode 참조
    if (node.nextNode) {
      referencedNodes.add(node.nextNode);
      if (!definedNodes.has(node.nextNode)) {
        undefinedReferences.push(node.nextNode);
      }
    }

    // choices 내 nextNode 참조
    if (node.choices) {
      for (const choice of node.choices) {
        if (choice.nextNode) {
          referencedNodes.add(choice.nextNode);
          if (!definedNodes.has(choice.nextNode)) {
            undefinedReferences.push(choice.nextNode);
          }
        }
      }
    }
  }

  // 3. start 노드는 진입점이므로 참조된 것으로 간주
  referencedNodes.add('start');

  // 4. 엔딩 노드들도 참조된 것으로 간주 (도달점)
  for (const node of Object.values(storyData) as StoryNode[]) {
    if (node && node.isEnding) {
      referencedNodes.add(node.id);
    }
  }

  // 5. 고아 노드 = 정의됨 BUT 참조 안 됨
  const orphanNodes: string[] = [];
  for (const nodeId of definedNodes) {
    if (!referencedNodes.has(nodeId)) {
      orphanNodes.push(nodeId);
    }
  }

  orphanNodes.sort();

  return {
    totalDefined: definedNodes.size,
    totalReferenced: referencedNodes.size,
    orphanCount: orphanNodes.length,
    orphanNodes,
    undefinedReferences: [...new Set(undefinedReferences)].sort()
  };
}

/**
 * 고아 노드를 카테고리별로 분류
 */
export function categorizeOrphanNodes(orphanNodes: string[]): Record<string, string[]> {
  const categories: Record<string, string[]> = {
    ellen: [],
    hope: [],
    drebber: [],
    stangerson: [],
    basement: [],
    ending: [],
    suspense: [],
    interrogation: [],
    deduction: [],
    evidence: [],
    psychological: [],
    other: []
  };

  for (const nodeId of orphanNodes) {
    const lower = nodeId.toLowerCase();
    
    if (lower.includes('ellen')) {
      categories.ellen.push(nodeId);
    } else if (lower.includes('hope')) {
      categories.hope.push(nodeId);
    } else if (lower.includes('drebber')) {
      categories.drebber.push(nodeId);
    } else if (lower.includes('stangerson')) {
      categories.stangerson.push(nodeId);
    } else if (lower.includes('basement')) {
      categories.basement.push(nodeId);
    } else if (lower.includes('ending')) {
      categories.ending.push(nodeId);
    } else if (lower.includes('suspense') || lower.includes('shadow') || lower.includes('chase')) {
      categories.suspense.push(nodeId);
    } else if (lower.includes('interrogat') || lower.includes('confront')) {
      categories.interrogation.push(nodeId);
    } else if (lower.includes('deduc')) {
      categories.deduction.push(nodeId);
    } else if (lower.includes('evidence') || lower.includes('clue')) {
      categories.evidence.push(nodeId);
    } else if (lower.includes('psycholog') || lower.includes('reflect') || lower.includes('moral')) {
      categories.psychological.push(nodeId);
    } else {
      categories.other.push(nodeId);
    }
  }

  // 빈 카테고리 제거
  for (const key in categories) {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  }

  return categories;
}

/**
 * 콘솔에 결과 출력
 */
export function printOrphanReport() {
  console.log('='.repeat(80));
  console.log('🔍 고아 노드 스캔 결과');
  console.log('='.repeat(80));
  console.log();

  const result = scanOrphanNodes();

  console.log('📊 통계:');
  console.log(`  - 정의된 노드: ${result.totalDefined}개`);
  console.log(`  - 참조된 노드: ${result.totalReferenced}개`);
  console.log(`  - 고아 노드: ${result.orphanCount}개`);
  console.log(`  - 정의되지 않은 참조: ${result.undefinedReferences.length}개`);
  console.log();

  if (result.orphanCount === 0) {
    console.log('✅ 고아 노드가 없습니다!');
  } else {
    console.log('='.repeat(80));
    console.log('📋 카테고리별 고아 노드:');
    console.log('='.repeat(80));
    console.log();

    const categories = categorizeOrphanNodes(result.orphanNodes);
    
    for (const [category, nodes] of Object.entries(categories)) {
      console.log(`\n📁 ${category.toUpperCase()} (${nodes.length}개):`);
      nodes.forEach((nodeId, index) => {
        console.log(`  ${(index + 1).toString().padStart(3, ' ')}. ${nodeId}`);
      });
    }
  }

  if (result.undefinedReferences.length > 0) {
    console.log();
    console.log('='.repeat(80));
    console.log('⚠️ 정의되지 않은 참조 (치명적 오류!):');
    console.log('='.repeat(80));
    console.log();
    result.undefinedReferences.forEach((nodeId, index) => {
      console.log(`  ${(index + 1).toString().padStart(3, ' ')}. ${nodeId}`);
    });
  }

  console.log();
  console.log('='.repeat(80));

  return result;
}
