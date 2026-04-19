import { storyData } from '../data/storyData';
import { characters } from '../data/characterData';

interface ValidationIssue {
  nodeId: string;
  issueType: 'missing_character' | 'invalid_character' | 'missing_text' | 'invalid_choice';
  message: string;
}

interface TextValidationError {
  type: 'tone' | 'name_in_diary';
  message: string;
  line: string;
}

// ============================================================
// 📝 텍스트 검증 함수들
// ============================================================

/**
 * 스토리 텍스트 검증: 오타와 깨진 문자만 체크
 */
export function validateStoryText(text: string): TextValidationError[] {
  const errors: TextValidationError[] = [];
  
  // 1. 깨진 문자 체크 (줄바꿈(\n), 탭(\t)은 제외)
  const brokenChars = /[\uFFFD\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g;
  if (brokenChars.test(text)) {
    errors.push({
      type: 'tone',
      message: '깨진 문자 발견',
      line: text.substring(0, 100)
    });
  }

  // 2. 잘못된 따옴표 패턴 체크는 제거
  // 템플릿 리터럴 안의 따옴표는 정상적인 문법이므로 체크하지 않음

  return errors;
}

/**
 * 텍스트 검증 에러 출력
 */
export function printValidationErrors(errors: TextValidationError[], context: string) {
  if (errors.length === 0) return;

  console.log(`\n⚠️ ${context} - ${errors.length}개 텍스트 오류 발견`);
  errors.forEach((error, index) => {
    console.log(`  ${index + 1}. [${error.type}] ${error.message}`);
    console.log(`     → "${error.line.substring(0, 80)}${error.line.length > 80 ? '...' : ''}"`);
  });
}

// ============================================================
// 📊 스토리 데이터 검증
// ============================================================

export function validateStoryData(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  Object.entries(storyData).forEach(([nodeId, node]) => {
    // 텍스트가 있는지 확인
    if (!node.text || node.text.trim() === '') {
      issues.push({
        nodeId,
        issueType: 'missing_text',
        message: `노드에 텍스트가 없습니다.`
      });
    }

    // character 속성 확인 (엔딩 노드는 제외)
    if (!node.isEnding && node.text && node.text.includes('"')) {
      // 대사가 있는데 character나 speaker가 없으면 경고
      if (!node.character && !node.speaker) {
        issues.push({
          nodeId,
          issueType: 'missing_character',
          message: `대사가 있지만 character 또는 speaker 속성이 없습니다.`
        });
      } else if (node.character && !characters[node.character]) {
        // character가 있지만 유효하지 않으면 오류
        issues.push({
          nodeId,
          issueType: 'invalid_character',
          message: `유효하지 않은 character: "${node.character}"`
        });
      } else if (node.speaker && !characters[node.speaker]) {
        // speaker가 있지만 유효하지 않으면 오류
        issues.push({
          nodeId,
          issueType: 'invalid_character',
          message: `유효하지 않은 speaker: "${node.speaker}"`
        });
      }
    }

    // 선택지 확인
    if (node.choices) {
      node.choices.forEach((choice, index) => {
        if (!choice.text || choice.text.trim() === '') {
          issues.push({
            nodeId,
            issueType: 'invalid_choice',
            message: `선택지 ${index + 1}에 텍스트가 없습니다.`
          });
        }
        if (!choice.nextNode || !storyData[choice.nextNode]) {
          issues.push({
            nodeId,
            issueType: 'invalid_choice',
            message: `선택지 ${index + 1}의 nextNode가 유효하지 않습니다: "${choice.nextNode}"`
          });
        }
      });
    }
  });

  return issues;
}

export function printValidationReport() {
  const issues = validateStoryData();
  
  if (issues.length === 0) {
    console.log('✅ 스토리 데이터 검증 완료: 문제 없음');
    return;
  }

  console.log(`⚠️ 스토리 데이터 검증 결과: ${issues.length}개 문제 발견`);
  console.log('='.repeat(60));

  const groupedIssues = issues.reduce((acc, issue) => {
    if (!acc[issue.issueType]) {
      acc[issue.issueType] = [];
    }
    acc[issue.issueType].push(issue);
    return acc;
  }, {} as Record<string, ValidationIssue[]>);

  Object.entries(groupedIssues).forEach(([type, typeIssues]) => {
    console.log(`\n🔍 ${type.toUpperCase()} (${typeIssues.length}개)`);
    typeIssues.forEach((issue, index) => {
      console.log(`  ${index + 1}. [${issue.nodeId}] ${issue.message}`);
    });
  });

  console.log('\n' + '='.repeat(60));
}