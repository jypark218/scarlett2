/**
 * 🧪 검증기 테스트 스크립트
 * 
 * 대화 시스템 무결성 검증기를 테스트합니다.
 * 터미널에서 실행: npx tsx test-validator.ts
 */

import { validateAllDialogues, printValidationReport } from './utils/dialogue/validator';
import { storyData } from './data/storyData';

console.log('🧪 Starting Validator Test...\n');

// 전체 검증 실행
const report = validateAllDialogues(storyData);

// 결과 출력
printValidationReport(report);

// 통계 요약
console.log('\n📈 Final Summary:');
console.log(`   Total Nodes Validated: ${report.totalNodes}`);
console.log(`   Total Issues Found: ${report.fatals.length + report.errors.length + report.warnings.length}`);
console.log(`   - Fatal: ${report.fatals.length}`);
console.log(`   - Error: ${report.errors.length}`);
console.log(`   - Warning: ${report.warnings.length}`);

// 카테고리별 통계
console.log('\n🗂️ Issues by Category:');
console.log(`   - Missing Data: ${report.summary.missingData}`);
console.log(`   - Dead Links: ${report.summary.deadLinks}`);
console.log(`   - Invalid Text: ${report.summary.invalidText}`);
console.log(`   - Missing Resources: ${report.summary.missingResources}`);

// 성공 여부 판정
console.log('\n');
if (report.fatals.length === 0 && report.errors.length === 0) {
  console.log('✅ ═══════════════════════════════════════════');
  console.log('✅ ALL CRITICAL VALIDATIONS PASSED!');
  console.log('✅ ═══════════════════════════════════════════');
  process.exit(0);
} else {
  console.log('❌ ═══════════════════════════════════════════');
  console.log('❌ VALIDATION FAILED - PLEASE FIX ERRORS');
  console.log('❌ ═══════════════════════════════════════════');
  process.exit(1);
}
