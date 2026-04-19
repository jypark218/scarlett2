/**
 * 대화 시스템 무결성 검증기 (Dialogue Integrity Validator)
 * 
 * 목적: 모든 대화 노드의 오류를 자동으로 감지하여 개발자에게 리포트
 * 
 * 검증 항목:
 * 1. 필수 데이터 누락 (speaker, text)
 * 2. 리소스 연결 확인 (포트레이트 이미지)
 * 3. 비정상 텍스트 감지 (짧은 텍스트, placeholder)
 * 4. 끊어진 연결 체크 (nextNode가 존재하는지)
 */

import { StoryNode, Choice } from '../../types/story';
import { characterData } from '../../data/characters';

export type ValidationErrorType = 'error' | 'warning' | 'fatal';

export interface ValidationError {
  nodeId: string;
  type: ValidationErrorType;
  category: 'speaker' | 'text' | 'link' | 'resource' | 'choice';
  message: string;
  details?: string;
}

export interface ValidationReport {
  totalNodes: number;
  checkedNodes: number;
  errors: ValidationError[];
  warnings: ValidationError[];
  fatals: ValidationError[];
  summary: {
    missingData: number;
    deadLinks: number;
    invalidText: number;
    missingResources: number;
  };
}

/**
 * 모든 대화 데이터를 검증
 */
export function validateAllDialogues(storyData: Record<string, StoryNode>): ValidationReport {
  const errors: ValidationError[] = [];
  const nodeIds = Object.keys(storyData);
  const totalNodes = nodeIds.length;
  
  console.log(`🔍 [Validator] Starting validation for ${totalNodes} nodes...`);
  
  // 각 노드 검증
  for (const [nodeId, node] of Object.entries(storyData)) {
    validateNode(nodeId, node, storyData, errors);
  }
  
  // 결과 집계
  const report: ValidationReport = {
    totalNodes,
    checkedNodes: totalNodes,
    errors: errors.filter(e => e.type === 'error'),
    warnings: errors.filter(e => e.type === 'warning'),
    fatals: errors.filter(e => e.type === 'fatal'),
    summary: {
      missingData: errors.filter(e => e.category === 'speaker' || e.category === 'text').length,
      deadLinks: errors.filter(e => e.category === 'link').length,
      invalidText: errors.filter(e => e.category === 'text').length,
      missingResources: errors.filter(e => e.category === 'resource').length,
    }
  };
  
  return report;
}

/**
 * 단일 노드 검증
 */
function validateNode(
  nodeId: string, 
  node: StoryNode, 
  allNodes: Record<string, StoryNode>,
  errors: ValidationError[]
): void {
  // Check 1: 텍스트 누락
  validateText(nodeId, node, errors);
  
  // Check 2: 화자 검증
  validateSpeaker(nodeId, node, errors);
  
  // Check 3: nextNode 연결 검증
  validateNextNode(nodeId, node, allNodes, errors);
  
  // Check 4: 선택지 검증
  validateChoices(nodeId, node, allNodes, errors);
  
  // Check 5: 리소스 검증
  validateResources(nodeId, node, errors);
}

/**
 * Check 1: 텍스트 검증
 */
function validateText(nodeId: string, node: StoryNode, errors: ValidationError[]): void {
  // 텍스트 누락
  if (!node.text || node.text.trim() === '') {
    errors.push({
      nodeId,
      type: 'error',
      category: 'text',
      message: 'Text is missing',
      details: 'Node has no text content'
    });
    return;
  }
  
  // placeholder 텍스트 감지
  const placeholderKeywords = ['TODO', 'TBD', 'TEMP', 'FIXME', 'XXX', '임시'];
  const hasPlaceholder = placeholderKeywords.some(keyword => 
    node.text.toUpperCase().includes(keyword)
  );
  
  if (hasPlaceholder) {
    errors.push({
      nodeId,
      type: 'warning',
      category: 'text',
      message: 'Text contains placeholder',
      details: `Text: "${node.text.substring(0, 50)}..."`
    });
  }
  
  // 너무 짧은 텍스트 (단, 의도적으로 짧은 것 제외)
  const cleanText = node.text.replace(/\n/g, '').trim();
  const exceptionalShortTexts = ['...', '!', '?', '!!', '?!', '...!'];
  
  if (cleanText.length < 3 && !exceptionalShortTexts.includes(cleanText)) {
    errors.push({
      nodeId,
      type: 'warning',
      category: 'text',
      message: 'Text is too short',
      details: `Text: "${node.text}"`
    });
  }
}

/**
 * Check 2: 화자 검증
 */
function validateSpeaker(nodeId: string, node: StoryNode, errors: ValidationError[]): void {
  const speakerId = node.speaker || node.character;
  
  // 화자가 있는 경우에만 검증 (내레이션은 speaker가 없을 수 있음)
  if (speakerId) {
    // 화자가 characterData에 존재하는지 확인
    if (!characterData[speakerId]) {
      errors.push({
        nodeId,
        type: 'error',
        category: 'speaker',
        message: `Unknown speaker: "${speakerId}"`,
        details: 'Speaker ID not found in characterData'
      });
    }
  }
  
  // speaker와 character가 모두 있고 다른 경우 경고
  if (node.speaker && node.character && node.speaker !== node.character) {
    errors.push({
      nodeId,
      type: 'warning',
      category: 'speaker',
      message: 'Conflicting speaker fields',
      details: `speaker: "${node.speaker}", character: "${node.character}"`
    });
  }
}

/**
 * Check 3: nextNode 연결 검증
 */
function validateNextNode(
  nodeId: string, 
  node: StoryNode, 
  allNodes: Record<string, StoryNode>,
  errors: ValidationError[]
): void {
  // nextNode가 있는 경우
  if (node.nextNode) {
    if (!allNodes[node.nextNode]) {
      errors.push({
        nodeId,
        type: 'fatal',
        category: 'link',
        message: `Dead link to "${node.nextNode}"`,
        details: 'nextNode does not exist'
      });
    }
  } else if (!node.choices && !node.isEnding) {
    // nextNode도 없고 choices도 없고 엔딩도 아니면 막다른 길
    errors.push({
      nodeId,
      type: 'warning',
      category: 'link',
      message: 'Dead end node',
      details: 'No nextNode, no choices, not an ending'
    });
  }
}

/**
 * Check 4: 선택지 검증
 */
function validateChoices(
  nodeId: string, 
  node: StoryNode, 
  allNodes: Record<string, StoryNode>,
  errors: ValidationError[]
): void {
  if (!node.choices || node.choices.length === 0) return;
  
  node.choices.forEach((choice, index) => {
    // 선택지 텍스트 누락
    if (!choice.text || choice.text.trim() === '') {
      errors.push({
        nodeId,
        type: 'error',
        category: 'choice',
        message: `Choice #${index + 1} has no text`,
        details: 'Choice text is missing'
      });
    }
    
    // 선택지 nextNode 검증
    if (choice.nextNode) {
      if (!allNodes[choice.nextNode]) {
        errors.push({
          nodeId,
          type: 'fatal',
          category: 'link',
          message: `Choice #${index + 1} links to non-existent node "${choice.nextNode}"`,
          details: `Choice text: "${choice.text}"`
        });
      }
    } else if (!choice.puzzleType) {
      // nextNode도 없고 puzzleType도 없으면 경고
      errors.push({
        nodeId,
        type: 'warning',
        category: 'choice',
        message: `Choice #${index + 1} has no nextNode or puzzleType`,
        details: `Choice text: "${choice.text}"`
      });
    }
  });
}

/**
 * Check 5: 리소스 검증 (포트레이트 이미지)
 */
function validateResources(nodeId: string, node: StoryNode, errors: ValidationError[]): void {
  const speakerId = node.speaker || node.character;
  
  if (speakerId && characterData[speakerId]) {
    const character = characterData[speakerId];
    
    // 포트레이트가 없거나 빈 문자열인 경우 (narrator 제외)
    if (speakerId !== 'narrator' && (!character.portraitUrl || character.portraitUrl.trim() === '')) {
      errors.push({
        nodeId,
        type: 'warning',
        category: 'resource',
        message: `Missing portrait for speaker "${speakerId}"`,
        details: 'Portrait URL is empty'
      });
    }
  }
}

/**
 * 검증 결과 출력 (콘솔)
 */
export function printValidationReport(report: ValidationReport): void {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║       🔍 DIALOGUE INTEGRITY VALIDATION REPORT 🔍             ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`📊 Total Nodes: ${report.totalNodes}`);
  console.log(`✅ Checked: ${report.checkedNodes}`);
  console.log('');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log(`🔴 Fatal Errors: ${report.fatals.length}`);
  console.log(`⚠️  Errors: ${report.errors.length}`);
  console.log(`⚡ Warnings: ${report.warnings.length}`);
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('');
  
  // Summary
  console.log('📈 SUMMARY BY CATEGORY:');
  console.log(`   • Missing Data: ${report.summary.missingData}`);
  console.log(`   • Dead Links: ${report.summary.deadLinks}`);
  console.log(`   • Invalid Text: ${report.summary.invalidText}`);
  console.log(`   • Missing Resources: ${report.summary.missingResources}`);
  console.log('');
  
  // Fatal Errors (가장 중요)
  if (report.fatals.length > 0) {
    console.log('');
    console.log('🔴 ═══ FATAL ERRORS (Must Fix!) ═══');
    report.fatals.forEach(err => {
      console.log(`   [${err.nodeId}] ${err.message}`);
      if (err.details) console.log(`      ↳ ${err.details}`);
    });
  }
  
  // Errors
  if (report.errors.length > 0) {
    console.log('');
    console.log('⚠️  ═══ ERRORS ═══');
    report.errors.slice(0, 20).forEach(err => {
      console.log(`   [${err.nodeId}] ${err.message}`);
      if (err.details) console.log(`      ↳ ${err.details}`);
    });
    if (report.errors.length > 20) {
      console.log(`   ... and ${report.errors.length - 20} more errors`);
    }
  }
  
  // Warnings (처음 10개만)
  if (report.warnings.length > 0) {
    console.log('');
    console.log('⚡ ═══ WARNINGS (First 10) ═══');
    report.warnings.slice(0, 10).forEach(err => {
      console.log(`   [${err.nodeId}] ${err.message}`);
      if (err.details) console.log(`      ↳ ${err.details}`);
    });
    if (report.warnings.length > 10) {
      console.log(`   ... and ${report.warnings.length - 10} more warnings`);
    }
  }
  
  console.log('');
  console.log('─────────────────────────────────────────────────────────────────');
  
  if (report.fatals.length === 0 && report.errors.length === 0) {
    console.log('✅ All critical validations passed!');
  } else {
    console.log('❌ Validation failed. Please fix the errors above.');
  }
  
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('');
}

/**
 * 간단한 요약 메시지 생성
 */
export function getValidationSummary(report: ValidationReport): string {
  const total = report.fatals.length + report.errors.length + report.warnings.length;
  
  if (total === 0) {
    return '✅ All validations passed';
  }
  
  const parts: string[] = [];
  if (report.fatals.length > 0) parts.push(`${report.fatals.length} Fatal`);
  if (report.errors.length > 0) parts.push(`${report.errors.length} Errors`);
  if (report.warnings.length > 0) parts.push(`${report.warnings.length} Warnings`);
  
  return `🔴 ${parts.join(', ')}`;
}

/**
 * 특정 카테고리의 에러만 필터링
 */
export function filterErrorsByCategory(
  report: ValidationReport, 
  category: ValidationError['category']
): ValidationError[] {
  return [...report.fatals, ...report.errors, ...report.warnings].filter(
    err => err.category === category
  );
}

/**
 * 특정 노드의 에러만 필터링
 */
export function filterErrorsByNode(
  report: ValidationReport, 
  nodeId: string
): ValidationError[] {
  return [...report.fatals, ...report.errors, ...report.warnings].filter(
    err => err.nodeId === nodeId
  );
}
