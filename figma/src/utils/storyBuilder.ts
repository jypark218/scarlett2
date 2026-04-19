// 스토리 빌더 - 여러 스토리 파일을 자동으로 병합
import { StoryData, StoryNode } from '../types/story';

/**
 * 여러 스토리 노드 객체를 하나로 병합
 */
export function mergeStoryNodes(...nodeGroups: Record<string, StoryNode>[]): StoryData {
  const merged: StoryData = {};
  
  for (const group of nodeGroups) {
    Object.assign(merged, group);
  }
  
  return merged;
}

/**
 * 스토리 노드 검증
 */
export function validateStoryNodes(nodes: StoryData): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const nodeIds = new Set(Object.keys(nodes));
  const referencedNodes = new Set<string>();
  const endingNodes = new Set<string>();

  // 각 노드 검증
  for (const [id, node] of Object.entries(nodes)) {
    // 1. 노드 ID와 node.id 일치 확인
    if (node.id !== id) {
      errors.push(`노드 "${id}"의 id 속성이 일치하지 않음: ${node.id}`);
    }

    // 2. 엔딩 노드가 아니면 choices 필요
    if (!node.isEnding && (!node.choices || node.choices.length === 0)) {
      errors.push(`노드 "${id}"에 선택지가 없음 (엔딩이 아닌 경우 필수)`);
    }

    // 3. 엔딩 노드 표시
    if (node.isEnding) {
      endingNodes.add(id);
    }

    // 4. 선택지의 nextNode 검증
    if (node.choices) {
      for (const choice of node.choices) {
        referencedNodes.add(choice.nextNode);
        
        if (!nodeIds.has(choice.nextNode)) {
          errors.push(`노드 "${id}"의 선택지 "${choice.text}"가 존재하지 않는 노드 "${choice.nextNode}"를 참조`);
        }

        // requiredItem이 있는데 item도 있으면 경고
        if (choice.requiredItem && choice.item) {
          warnings.push(`노드 "${id}"의 선택지 "${choice.text}"에 requiredItem과 item이 동시에 설정됨`);
        }
      }
    }
  }

  // 5. 고아 노드 찾기 (참조되지 않는 노드)
  const orphanNodes: string[] = [];
  for (const id of nodeIds) {
    // start 노드나 엔딩 노드는 제외
    if (id !== 'start' && !endingNodes.has(id) && !referencedNodes.has(id)) {
      orphanNodes.push(id);
    }
  }

  if (orphanNodes.length > 0) {
    warnings.push(`고아 노드 발견 (참조되지 않음): ${orphanNodes.join(', ')}`);
  }

  // 6. start 노드 존재 확인
  if (!nodeIds.has('start')) {
    errors.push('start 노드가 없습니다');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 특정 노드로부터 도달 가능한 모든 노드 찾기
 */
export function findReachableNodes(
  startNodeId: string,
  allNodes: StoryData
): Set<string> {
  const reachable = new Set<string>();
  const queue = [startNodeId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (reachable.has(current)) continue;
    reachable.add(current);

    const node = allNodes[current];
    if (!node || node.isEnding) continue;

    if (node.choices) {
      for (const choice of node.choices) {
        if (!reachable.has(choice.nextNode)) {
          queue.push(choice.nextNode);
        }
      }
    }
  }

  return reachable;
}

/**
 * 도달 불가능한 노드 찾기
 */
export function findUnreachableNodes(nodes: StoryData): string[] {
  const reachable = findReachableNodes('start', nodes);
  const unreachable: string[] = [];

  for (const id of Object.keys(nodes)) {
    if (!reachable.has(id) && id !== 'start') {
      unreachable.push(id);
    }
  }

  return unreachable;
}

/**
 * 순환 참조 탐지
 */
export function findCircularReferences(nodes: StoryData): string[][] {
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function dfs(nodeId: string, path: string[]): void {
    if (recursionStack.has(nodeId)) {
      // 순환 발견
      const cycleStart = path.indexOf(nodeId);
      cycles.push(path.slice(cycleStart).concat(nodeId));
      return;
    }

    if (visited.has(nodeId)) return;

    visited.add(nodeId);
    recursionStack.add(nodeId);
    path.push(nodeId);

    const node = nodes[nodeId];
    if (node && !node.isEnding && node.choices) {
      for (const choice of node.choices) {
        dfs(choice.nextNode, [...path]);
      }
    }

    recursionStack.delete(nodeId);
  }

  for (const nodeId of Object.keys(nodes)) {
    if (!visited.has(nodeId)) {
      dfs(nodeId, []);
    }
  }

  return cycles;
}

/**
 * 개발 모드: 스토리 구조 분석 리포트
 */
export function analyzeStory(nodes: StoryData): {
  totalNodes: number;
  endingNodes: number;
  averageChoices: number;
  maxDepth: number;
  nodesByDay: Record<number, number>;
  nodesByTimeOfDay: Record<string, number>;
} {
  let totalChoices = 0;
  let nonEndingNodes = 0;
  const endingNodes = Object.values(nodes).filter(n => n.isEnding).length;
  const nodesByDay: Record<number, number> = {};
  const nodesByTimeOfDay: Record<string, number> = {};

  // BFS로 최대 깊이 계산
  const depths = new Map<string, number>();
  const queue: [string, number][] = [['start', 0]];
  let maxDepth = 0;

  while (queue.length > 0) {
    const [nodeId, depth] = queue.shift()!;
    
    if (depths.has(nodeId)) continue;
    depths.set(nodeId, depth);
    maxDepth = Math.max(maxDepth, depth);

    const node = nodes[nodeId];
    if (node && !node.isEnding && node.choices) {
      for (const choice of node.choices) {
        queue.push([choice.nextNode, depth + 1]);
      }
    }
  }

  for (const node of Object.values(nodes)) {
    // 일차/시간대별 통계
    if (node.day) {
      nodesByDay[node.day] = (nodesByDay[node.day] || 0) + 1;
    }
    if (node.timeOfDay) {
      nodesByTimeOfDay[node.timeOfDay] = (nodesByTimeOfDay[node.timeOfDay] || 0) + 1;
    }

    // 선택지 통계
    if (!node.isEnding && node.choices) {
      totalChoices += node.choices.length;
      nonEndingNodes++;
    }
  }

  return {
    totalNodes: Object.keys(nodes).length,
    endingNodes,
    averageChoices: nonEndingNodes > 0 ? totalChoices / nonEndingNodes : 0,
    maxDepth,
    nodesByDay,
    nodesByTimeOfDay
  };
}
