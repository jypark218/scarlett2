/**
 * 내레이션 및 독백을 반말로 자동 변환하는 스크립트
 * 
 * 사용법:
 * 1. 이 파일은 참고용입니다
 * 2. 실제 변환은 수동으로 진행해주세요
 */

// 존댓말 -> 반말 변환 규칙
const conversionRules: [RegExp, string][] = [
  // 내레이션 문장 끝 (따옴표 밖)
  [/([^"]+)습니다\./g, '$1다.'],
  [/([^"]+)입니다\./g, '$1다.'],
  [/([^"]+)였습니다\./g, '$1였다.'],
  [/([^"]+)했습니다\./g, '$1했다.'],
  [/([^"]+)합니다\./g, '$1한다.'],
  [/([^"]+)겠습니다\./g, '$1겠다.'],
  [/([^"]+)됩니다\./g, '$1된다.'],
  [/([^"]+)없습니다\./g, '$1없다.'],
  [/([^"]+)있습니다\./g, '$1있다.'],
  
  // 동사 변환
  [/살핍니다\./g, '살핀다.'],
  [/묻습니다\./g, '묻는다.'],
  [/봅니다\./g, '본다.'],
  [/듭니다\./g, '든다.'],
  [/섭니다\./g, '선다.'],
  [/줍니다\./g, '준다.'],
  [/연다\./g, '연다.'],
  
  // 명사 + 이다
  [/것 같습니다/g, '것 같다'],
  [/것입니다/g, '것이다'],
];

/**
 * 주의사항:
 * 1. 대화문 (따옴표 안)은 변환하지 말 것
 * 2. 캐릭터 대사는 원본 유지
 * 3. 내레이션과 독백만 변환
 */

console.log(`
📝 내레이션 반말 변환 가이드

다음 파일들을 수동으로 변환해주세요:
- /data/story/drebberNodes.ts
- /data/story/basement-route-fix.ts  
- /data/story/fixes.ts
- /data/story/critical-fixes.ts
- /data/story/psychological-depth.ts
- /data/story/stangerson-interrogation.ts
- /data/story/bad-endings.ts
- /data/story/good-endings.ts
- /data/story/ambiguous-endings.ts
- /data/story/suspect-routes.ts
- /data/story/part3-second-floor.ts

변환 규칙:
1. "~습니다." → "~다."
2. "~입니다." → "~다."
3. "~였습니다." → "~였다."
4. "~합니다." → "~한다."

⚠️ 주의: 대화문 안의 존댓말은 절대 변환하지 마세요!
`);