/**
 * 선택지 배열을 필터링하여 표시 가능한 것만 반환
 */

import { Choice } from '../../types/story';

// 허브 노드 목록 (여러 선택지를 탐색 후 다시 돌아오는 노드)
const HUB_NODES = [
  'investigation_hub',
  'evidence_collection_hub',
  'mansion_exploration_hub'
];

/**
 * 허브 노드인지 판별
 */
function isHubNode(nodeId: string): boolean {
  return HUB_NODES.includes(nodeId);
}

export function filterChoices(
  choices: Choice[],
  inventory: string[],
  visitedNodes: string[],
  playCount: number,
  currentNodeId: string,
  selectedChoicesForNode?: string[]
): Choice[] {
  return choices.filter(choice => {
    // ============================================================
    // 1. 플레이 횟수 조건 - ✅ 제거됨 (1회차부터 모든 콘텐츠 언락)
    // ============================================================
    // minPlayCount 조건은 더 이상 사용하지 않음
    
    // ============================================================
    // 2. 아이템 조건
    // ============================================================
    // hideIfHasItem: 이미 아이템을 가지고 있으면 선택지 숨김
    if (choice.hideIfHasItem && inventory.includes(choice.hideIfHasItem)) {
      return false;
    }
    
    // ============================================================
    // 3. 단순 노드 방문 조건
    // ============================================================
    // requiredVisitedNode: 특정 노드를 방문했어야만 선택지 표시
    if (choice.requiredVisitedNode && !visitedNodes.includes(choice.requiredVisitedNode)) {
      return false;
    }
    
    // hideIfVisitedNode: 특정 노드를 방문했으면 선택지 숨김 (역조건)
    if (choice.hideIfVisitedNode && visitedNodes.includes(choice.hideIfVisitedNode)) {
      return false;
    }
    
    // ============================================================
    // 4. 복합 표시 조건 (showIf) - 모든 조건이 만족되어야 표시
    // ============================================================
    if (choice.showIf) {
      // visitedNode: 특정 노드를 방문했어야 표시
      if (choice.showIf.visitedNode && !visitedNodes.includes(choice.showIf.visitedNode)) {
        return false;
      }
      
      // visitedAny: 이 중 하나라도 방문했으면 표시
      if (choice.showIf.visitedAny && !choice.showIf.visitedAny.some(node => visitedNodes.includes(node))) {
        return false;
      }
      
      // visitedAll: 모두 방문했어야 표시
      if (choice.showIf.visitedAll && !choice.showIf.visitedAll.every(node => visitedNodes.includes(node))) {
        return false;
      }
      
      // hasItem: 특정 아이템을 가지고 있어야 표시
      if (choice.showIf.hasItem && !inventory.includes(choice.showIf.hasItem)) {
        return false;
      }
    }
    
    // ============================================================
    // 5. 복합 숨김 조건 (hideIf) - 하나라도 만족되면 숨김
    // ============================================================
    if (choice.hideIf) {
      // visitedNode: 특정 노드를 방문했으면 숨김
      if (choice.hideIf.visitedNode && visitedNodes.includes(choice.hideIf.visitedNode)) {
        return false;
      }
      
      // visitedAny: 이 중 하나라도 방문했으면 숨김
      if (choice.hideIf.visitedAny && choice.hideIf.visitedAny.some(node => visitedNodes.includes(node))) {
        return false;
      }
      
      // visitedAll: 모두 방문했으면 숨김
      if (choice.hideIf.visitedAll && choice.hideIf.visitedAll.every(node => visitedNodes.includes(node))) {
        return false;
      }
      
      // hasItem: 특정 아이템을 가지고 있으면 숨김
      if (choice.hideIf.hasItem && inventory.includes(choice.hideIf.hasItem)) {
        return false;
      }
    }
    
    // ============================================================
    // 6. 레거시 복합 조건 (requirement)
    // ============================================================
    // requirement.visitedNode: 복합 조건에서 방문 체크
    if (choice.requirement?.visitedNode && !visitedNodes.includes(choice.requirement.visitedNode)) {
      return false;
    }
    
    // ============================================================
    // 7. 허브 노드 전용: 이미 선택한 선택지 숨김
    // ============================================================
    // 허브 노드 판별: 여러 개의 선택지가 있고, 같은 노드로 돌아오는 경우
    if (isHubNode(currentNodeId) && selectedChoicesForNode) {
      return !selectedChoicesForNode.includes(choice.nextNode);
    }
    
    return true;
  });
}

/**
 * 필수 아이템 소지 여부 확인
 */
export function hasRequiredItem(
  choice: Choice,
  inventory: string[]
): boolean {
  if (!choice.requiredItem) return true;
  return inventory.includes(choice.requiredItem);
}

/**
 * 선택지 필터링 옵션 타입
 */
export interface ChoiceFilterOptions {
  inventory: string[];
  visitedNodes: string[];
  playCount: number;
}

/**
 * 선택지 필터링 디버깅 정보
 */
export function debugChoiceFiltering(
  nodeId: string,
  allChoices: Choice[],
  visibleChoices: Choice[],
  options: ChoiceFilterOptions
): void {
  if (visibleChoices.length === 0) {
    console.error(`[선택지 없음] 노드 ${nodeId}에서 모든 선택지가 숨겨졌습니다!`);
    console.error('- 전체 선택지:', allChoices);
    console.error('- 현재 인벤토리:', options.inventory);
    console.error('- 방문한 노드:', options.visitedNodes);
    console.error('- 플레이 횟수:', options.playCount);
  }
}