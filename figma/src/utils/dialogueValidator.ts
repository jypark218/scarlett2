/**
 * 🔍 대화 검증 및 디버깅 도구
 * 
 * 스토리 데이터의 대화를 검증하고 문제를 자동으로 감지합니다.
 */

import { parseDialogueLines, CHARACTER_ALIASES } from './characterMatcher';
import { characters } from '../data/characterData';
import type { StoryNode } from '../data/storyData';

export interface ValidationIssue {
  nodeId: string;
  severity: 'error' | 'warning' | 'info';
  type: 'low_confidence' | 'missing_character' | 'mismatched_character' | 'empty_dialogue' | 'format_issue';
  message: string;
  lineText?: string;
  detectedCharacter?: string;
  expectedCharacter?: string;
  confidence?: number;
  suggestion?: string;
}

export interface ValidationReport {
  totalNodes: number;
  checkedNodes: number;
  issues: ValidationIssue[];
  summary: {
    errors: number;
    warnings: number;
    infos: number;
  };
}

/**
 * 모든 스토리 노드 검증
 */
export function validateAllDialogues(storyData?: Record<string, StoryNode>): ValidationReport {
  // 동적 import를 사용하거나 파라미터로 받음
  if (!storyData) {
    try {
      const { storyData: importedData } = require('../data/storyData');
      storyData = importedData;
    } catch (error) {
      console.error('스토리 데이터를 로드할 수 없습니다:', error);
      return {
        totalNodes: 0,
        checkedNodes: 0,
        issues: [],
        summary: { errors: 0, warnings: 0, infos: 0 }
      };
    }
  }
  
  const issues: ValidationIssue[] = [];
  let checkedNodes = 0;
  
  for (const [nodeId, node] of Object.entries(storyData)) {
    if (!node.text) continue;
    
    checkedNodes++;
    const nodeIssues = validateNodeDialogue(nodeId, node.text, node.character);
    issues.push(...nodeIssues);
  }
  
  const summary = {
    errors: issues.filter(i => i.severity === 'error').length,
    warnings: issues.filter(i => i.severity === 'warning').length,
    infos: issues.filter(i => i.severity === 'info').length
  };
  
  return {
    totalNodes: Object.keys(storyData).length,
    checkedNodes,
    issues,
    summary
  };
}

/**
 * 특정 노드의 대화 검증
 */
export function validateNodeDialogue(
  nodeId: string,
  text: string,
  declaredCharacter?: string
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  
  // 대화 파싱
  const parsed = parseDialogueLines(text, declaredCharacter, nodeId);
  
  for (const line of parsed) {
    // 1. 낮은 신뢰도 경고
    if (line.confidence < 0.7) {
      issues.push({
        nodeId,
        severity: line.confidence < 0.5 ? 'warning' : 'info',
        type: 'low_confidence',
        message: `낮은 신뢰도로 화자 감지됨 (${(line.confidence * 100).toFixed(0)}%)`,
        lineText: line.originalText,
        detectedCharacter: line.characterId,
        confidence: line.confidence,
        suggestion: getSpeakerSuggestion(line.originalText)
      });
    }
    
    // 2. 존재하지 않는 캐릭터
    if (line.characterId !== 'narrator' && !characters[line.characterId]) {
      issues.push({
        nodeId,
        severity: 'error',
        type: 'missing_character',
        message: `존재하지 않는 캐릭터 ID: ${line.characterId}`,
        lineText: line.originalText,
        detectedCharacter: line.characterId,
        suggestion: '캐릭터 데이터에 해당 ID를 추가하거나, 텍스트를 수정하세요.'
      });
    }
    
    // 3. 선언된 캐릭터와 불일치
    if (declaredCharacter && line.characterId !== declaredCharacter && line.confidence > 0.8) {
      issues.push({
        nodeId,
        severity: 'warning',
        type: 'mismatched_character',
        message: `노드에 선언된 캐릭터(${declaredCharacter})와 감지된 화자(${line.characterId})가 다릅니다`,
        lineText: line.originalText,
        detectedCharacter: line.characterId,
        expectedCharacter: declaredCharacter,
        suggestion: `노드의 character 속성을 "${line.characterId}"로 변경하거나, 텍스트를 수정하세요.`
      });
    }
    
    // 4. 빈 대화
    if (!line.text || line.text.length < 2) {
      issues.push({
        nodeId,
        severity: 'warning',
        type: 'empty_dialogue',
        message: '비어있거나 너무 짧은 대화',
        lineText: line.originalText,
        suggestion: '의미있는 대화 내용을 추가하세요.'
      });
    }
    
    // 5. 형식 문제 감지
    const formatIssue = detectFormatIssue(line.originalText);
    if (formatIssue) {
      issues.push({
        nodeId,
        severity: 'info',
        type: 'format_issue',
        message: formatIssue.message,
        lineText: line.originalText,
        suggestion: formatIssue.suggestion
      });
    }
  }
  
  return issues;
}

/**
 * 형식 문제 감지
 */
function detectFormatIssue(text: string): { message: string; suggestion: string } | null {
  // 불완전한 인용부호
  const openQuotes = (text.match(/["""']/g) || []).length;
  if (openQuotes % 2 !== 0) {
    return {
      message: '불완전한 인용부호',
      suggestion: '인용부호를 짝을 맞춰 사용하세요.'
    };
  }
  
  // 콜론 없이 이름만 있는 경우
  if (/^(홈즈|왓슨|그레그슨|백작|호프|스탠거슨|드레버)\s+[^:：]/.test(text)) {
    return {
      message: '캐릭터 이름 뒤에 콜론(:)이 없습니다',
      suggestion: '캐릭터 이름 뒤에 콜론을 추가하세요. 예: "홈즈: 대화 내용"'
    };
  }
  
  return null;
}

/**
 * 화자 제안
 */
function getSpeakerSuggestion(text: string): string {
  const suggestions: string[] = [];
  
  for (const [charId, alias] of Object.entries(CHARACTER_ALIASES)) {
    const score = calculateMatchScore(text, alias.names, alias.patterns, alias.keywords);
    if (score > 0) {
      suggestions.push(`${characters[charId]?.name || charId} (점수: ${score})`);
    }
  }
  
  if (suggestions.length === 0) {
    return '명확한 화자를 감지할 수 없습니다. 텍스트에 화자 이름을 명시하세요.';
  }
  
  return `가능한 화자: ${suggestions.slice(0, 3).join(', ')}`;
}

/**
 * 매칭 점수 계산
 */
function calculateMatchScore(
  text: string,
  names: string[],
  patterns: string[],
  keywords: string[]
): number {
  const normalized = text.toLowerCase();
  let score = 0;
  
  for (const name of names) {
    if (normalized.includes(name.toLowerCase())) {
      score += 10;
    }
  }
  
  for (const pattern of patterns) {
    if (normalized.includes(pattern.toLowerCase())) {
      score += 5;
    }
  }
  
  for (const keyword of keywords) {
    if (normalized.includes(keyword.toLowerCase())) {
      score += 2;
    }
  }
  
  return score;
}

/**
 * 검증 리포트 출력 (콘솔)
 */
export function printValidationReport(report: ValidationReport): void {
  console.group('🔍 대화 검증 리포트');
  console.log(`📊 총 노드: ${report.totalNodes}, 검사된 노드: ${report.checkedNodes}`);
  console.log(`❌ 에러: ${report.summary.errors}`);
  console.log(`⚠️ 경고: ${report.summary.warnings}`);
  console.log(`ℹ️ 정보: ${report.summary.infos}`);
  
  if (report.issues.length === 0) {
    console.log('✅ 문제가 발견되지 않았습니다!');
  } else {
    console.log('\n📋 발견된 문제들:');
    
    // 심각도별로 그룹화
    const errors = report.issues.filter(i => i.severity === 'error');
    const warnings = report.issues.filter(i => i.severity === 'warning');
    const infos = report.issues.filter(i => i.severity === 'info');
    
    if (errors.length > 0) {
      console.group('❌ 에러');
      errors.forEach(issue => printIssue(issue));
      console.groupEnd();
    }
    
    if (warnings.length > 0) {
      console.group('⚠️ 경고');
      warnings.forEach(issue => printIssue(issue));
      console.groupEnd();
    }
    
    if (infos.length > 0) {
      console.group('ℹ️ 정보');
      infos.slice(0, 10).forEach(issue => printIssue(issue)); // 처음 10개만
      if (infos.length > 10) {
        console.log(`... 외 ${infos.length - 10}개`);
      }
      console.groupEnd();
    }
  }
  
  console.groupEnd();
}

/**
 * 개별 이슈 출력
 */
function printIssue(issue: ValidationIssue): void {
  console.log(`\n[${issue.nodeId}] ${issue.message}`);
  if (issue.lineText) {
    console.log(`  텍스트: "${issue.lineText}"`);
  }
  if (issue.detectedCharacter) {
    console.log(`  감지된 화자: ${issue.detectedCharacter}`);
  }
  if (issue.expectedCharacter) {
    console.log(`  예상 화자: ${issue.expectedCharacter}`);
  }
  if (issue.confidence !== undefined) {
    console.log(`  신뢰도: ${(issue.confidence * 100).toFixed(0)}%`);
  }
  if (issue.suggestion) {
    console.log(`  💡 제안: ${issue.suggestion}`);
  }
}

/**
 * 특정 노드만 검증 (개발 도구)
 */
export function validateNode(nodeId: string, storyData?: Record<string, StoryNode>): void {
  if (!storyData) {
    try {
      const { storyData: importedData } = require('../data/storyData');
      storyData = importedData;
    } catch (error) {
      console.error('스토리 데이터를 로드할 수 없습니다:', error);
      return;
    }
  }
  
  const node = storyData[nodeId];
  if (!node) {
    console.error(`노드를 찾을 수 없습니다: ${nodeId}`);
    return;
  }
  
  console.group(`🔍 노드 검증: ${nodeId}`);
  
  if (!node.text) {
    console.log('ℹ️ 이 노드에는 텍스트가 없습니다.');
    console.groupEnd();
    return;
  }
  
  const issues = validateNodeDialogue(nodeId, node.text, node.character);
  
  if (issues.length === 0) {
    console.log('✅ 문제가 발견되지 않았습니다!');
  } else {
    console.log(`⚠️ ${issues.length}개의 문제 발견:`);
    issues.forEach(issue => printIssue(issue));
  }
  
  // 파싱 결과 미리보기
  console.log('\n📜 파싱 결과:');
  const parsed = parseDialogueLines(node.text, node.character, nodeId);
  parsed.forEach((line, i) => {
    const charName = characters[line.characterId]?.name || line.characterId;
    const confidence = (line.confidence * 100).toFixed(0);
    console.log(`  ${i + 1}. [${charName}] (${confidence}%): ${line.text.substring(0, 50)}${line.text.length > 50 ? '...' : ''}`);
  });
  
  console.groupEnd();
}

/**
 * 문제가 있는 노드 목록 반환
 */
export function getProblematicNodes(minSeverity: 'error' | 'warning' | 'info' = 'warning', storyData?: Record<string, StoryNode>): string[] {
  const report = validateAllDialogues(storyData);
  const severityLevel = { error: 3, warning: 2, info: 1 };
  const threshold = severityLevel[minSeverity];
  
  const problematicNodes = new Set<string>();
  
  for (const issue of report.issues) {
    if (severityLevel[issue.severity] >= threshold) {
      problematicNodes.add(issue.nodeId);
    }
  }
  
  return Array.from(problematicNodes);
}
