/**
 * 게임 상태 검증 및 상태 충돌 방지 시스템
 * 
 * 목적:
 * 1. 상호 배타적인 상태(플래그)들이 동시에 true가 되는 것을 방지
 * 2. 조건문의 우선순위를 명확하게 관리
 * 3. 시간대/사건 인과관계 검증
 */

/**
 * 상호 배타적 관계 정의
 * - 한 그룹 내의 노드들은 동시에 방문될 수 없음
 */
export const MUTUALLY_EXCLUSIVE_GROUPS = {
  // 엘렌의 운명 (세 가지 중 하나만 가능)
  ellen_fate: [
    'ending_ellen_saved',      // 엘렌 구출 성공
    'ending_ellen_sacrificed', // 엘렌 희생
    'ending_ellen_lost'        // 엘렌을 찾지 못함
  ],
  
  // 백작의 운명 (하나만 가능)
  count_fate: [
    'ending_count_arrested',   // 백작 체포
    'ending_count_escaped',    // 백작 도주
    'ending_count_killed'      // 백작 사망
  ],
  
  // 호프의 태도 (하나만 가능)
  hope_relationship: [
    'hope_trusts_watson',      // 호프가 왓슨을 신뢰
    'hope_hostile_watson',     // 호프가 왓슨에게 적대적
    'hope_neutral_watson'      // 호프가 중립적
  ],
  
  // 지하실 진입 경로 (복수 가능하지만 추적 필요)
  basement_routes: [
    'basement_via_kitchen',    // 부엌을 통해 진입
    'basement_via_well'        // 우물을 통해 진입
  ],
  
  // 의식 단계 (순차적이어야 함)
  ritual_stages: [
    'ritual_not_started',      // 의식 시작 전
    'ritual_in_progress',      // 의식 진행 중
    'ritual_interrupted',      // 의식 중단됨
    'ritual_completed'         // 의식 완료
  ]
};

/**
 * 시간대별 필수 조건
 * - 특정 시간대에는 반드시 특정 조건이 만족되어야 함
 */
export const TIME_BASED_REQUIREMENTS = {
  evening: {
    // 저녁 시간대에는 오후 조사가 어느 정도 진행되어야 함
    requiredVisitedAny: ['study_room', 'upstairs', 'back_entrance']
  },
  night: {
    // 밤 시간대에는 저녁 조사가 완료되어야 함
    requiredVisitedAny: ['drebber_alibi', 'basement_scene', 'hope_reveals_lucy_hint']
  }
};

/**
 * 아이템 획득 순서 제약
 * - key: 선행 아이템, value: 후행 아이템 (선행 아이템 없이 후행 아이템을 얻을 수 없음)
 */
export const ITEM_DEPENDENCY_CHAIN: Record<string, string[]> = {
  '금고 비밀번호': ['지하실 열쇠', 'ledger'], // 금고를 열어야 이 아이템들을 얻을 수 있음
  '서랍장 열쇠': ['ellen_will'],                // 서랍장 열쇠가 있어야 엘렌의 유언장을 얻을 수 있음
  '지하실 열쇠': ['ritual_knife', 'cult_robe'] // 지하실 열쇠가 있어야 지하실 아이템들을 얻을 수 있음
};

/**
 * 상태 검증 결과
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * 상호 배타적 상태 검증
 * - 한 그룹 내에서 여러 노드가 동시에 방문되었는지 체크
 */
export function validateMutuallyExclusiveStates(
  visitedNodes: string[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  for (const [groupName, nodes] of Object.entries(MUTUALLY_EXCLUSIVE_GROUPS)) {
    const visitedInGroup = nodes.filter(node => visitedNodes.includes(node));
    
    // 특수 케이스: basement_routes는 복수 방문 허용
    if (groupName === 'basement_routes') {
      if (visitedInGroup.length > 1) {
        warnings.push(
          `[${groupName}] 지하실에 여러 경로로 진입했습니다: ${visitedInGroup.join(', ')}`
        );
      }
      continue;
    }
    
    // ritual_stages는 순차적이어야 함
    if (groupName === 'ritual_stages') {
      const stages = ['ritual_not_started', 'ritual_in_progress', 'ritual_interrupted', 'ritual_completed'];
      const visitedStageIndices = visitedInGroup.map(node => stages.indexOf(node));
      const maxStage = Math.max(...visitedStageIndices);
      const minStage = Math.min(...visitedStageIndices);
      
      // 중간 단계를 건너뛰었는지 확인
      for (let i = minStage + 1; i < maxStage; i++) {
        if (!visitedInGroup.includes(stages[i])) {
          errors.push(
            `[${groupName}] 의식 단계를 건너뛰었습니다: ${stages[i]} 누락`
          );
        }
      }
      continue;
    }
    
    // 일반 상호 배타적 그룹: 2개 이상 방문 시 오류
    if (visitedInGroup.length > 1) {
      errors.push(
        `[${groupName}] 상호 배타적인 상태가 동시에 활성화됨: ${visitedInGroup.join(', ')}`
      );
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 시간대 기반 조건 검증
 */
export function validateTimeBasedConditions(
  currentTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' | undefined,
  visitedNodes: string[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!currentTimeOfDay) {
    return { isValid: true, errors, warnings };
  }
  
  const requirements = TIME_BASED_REQUIREMENTS[currentTimeOfDay];
  
  if (requirements?.requiredVisitedAny) {
    const hasAny = requirements.requiredVisitedAny.some(node => 
      visitedNodes.includes(node)
    );
    
    if (!hasAny) {
      warnings.push(
        `[시간대 검증] ${currentTimeOfDay} 시간대에 필요한 선행 노드를 방문하지 않았습니다: ${requirements.requiredVisitedAny.join(', ')} 중 하나 필요`
      );
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 아이템 의존성 검증
 * - 선행 아이템 없이 후행 아이템을 얻었는지 체크
 */
export function validateItemDependencies(
  inventory: string[],
  visitedNodes: string[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  for (const [prerequisiteItem, dependentItems] of Object.entries(ITEM_DEPENDENCY_CHAIN)) {
    const hasPrerequisite = inventory.includes(prerequisiteItem);
    
    for (const dependentItem of dependentItems) {
      const hasDependent = inventory.includes(dependentItem);
      
      if (hasDependent && !hasPrerequisite) {
        errors.push(
          `[아이템 의존성] '${dependentItem}'을(를) '${prerequisiteItem}' 없이 획득했습니다`
        );
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 전체 게임 상태 검증
 */
export function validateGameState(
  visitedNodes: string[],
  inventory: string[],
  currentNodeId: string,
  currentTimeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night'
): ValidationResult {
  const results: ValidationResult[] = [
    validateMutuallyExclusiveStates(visitedNodes),
    validateTimeBasedConditions(currentTimeOfDay, visitedNodes),
    validateItemDependencies(inventory, visitedNodes)
  ];
  
  const allErrors = results.flatMap(r => r.errors);
  const allWarnings = results.flatMap(r => r.warnings);
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
}

/**
 * 개발 모드에서 상태 검증 결과를 콘솔에 출력
 */
export function logValidationResults(
  result: ValidationResult,
  nodeId: string
): void {
  if (result.errors.length > 0) {
    console.error(`❌ [상태 검증 오류] 노드 ${nodeId}:`);
    result.errors.forEach(error => console.error(`  - ${error}`));
  }
  
  if (result.warnings.length > 0) {
    console.warn(`⚠️ [상태 검증 경고] 노드 ${nodeId}:`);
    result.warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
  
  if (result.isValid && result.warnings.length === 0) {
    // console.log(`✅ [상태 검증 통과] 노드 ${nodeId}`);
  }
}
