# 🔍 대화 시스템 무결성 검증기 (Dialogue Integrity Validator)

## 📋 개요

대화 시스템 무결성 검증기는 게임의 모든 대화 노드를 자동으로 검증하여 오류를 사전에 발견하는 개발 도구입니다.

수백, 수천 개의 노드를 사람이 일일이 테스트하는 것은 불가능하므로, 시스템이 자동으로 데이터 오류를 감지하여 개발자에게 리포트합니다.

## 🎯 검증 항목

### 1. ✅ 필수 데이터 누락 (Null Check)
- **검사 대상**: `text`, `speaker`, `character` 필드
- **검출 오류**:
  - 텍스트가 없거나 빈 문자열인 경우
  - 화자 ID가 존재하지 않는 경우
  - speaker와 character가 충돌하는 경우

### 2. 🔗 끊어진 연결 (Dead Links)
- **검사 대상**: `nextNode`, `choices[].nextNode`
- **검출 오류**:
  - nextNode가 실제 데이터에 존재하지 않는 경우
  - 선택지가 존재하지 않는 노드로 연결된 경우
  - nextNode도 없고 choices도 없는 막다른 노드

### 3. 📝 비정상 텍스트 감지 (Quality Check)
- **검사 대상**: `text` 내용
- **검출 오류**:
  - 텍스트가 3글자 미만인 경우 (의도적으로 짧은 것 제외)
  - TODO, TBD, TEMP, FIXME 등 플레이스홀더 포함
  - 불완전한 인용부호

### 4. 🖼️ 리소스 연결 확인 (Asset Mapping)
- **검사 대상**: `speaker`, `character`에 매핑된 포트레이트
- **검출 오류**:
  - 화자에 대한 포트레이트 이미지가 없는 경우
  - characterData에 등록되지 않은 화자

## 🚀 사용 방법

### 방법 1: 개발자 도구 UI (권장)

1. **게임 실행**: 게임을 실행합니다
2. **개발자 도구 열기**: 화면 우측 상단의 보라색 톱니바퀴 아이콘 클릭
3. **검증 모드 선택**:
   - **캐릭터 매칭**: 화자 감지, 캐릭터 매칭, 대화 형식 검증
   - **데이터 무결성**: 누락된 데이터, 끊어진 링크, 리소스 확인
   - **전체 검증**: 모든 검증을 한 번에 실행
4. **"모든 노드 검증" 버튼 클릭**
5. **결과 확인**:
   - UI에서 요약 정보 확인
   - F12를 눌러 브라우저 콘솔에서 상세 리포트 확인

### 방법 2: 브라우저 콘솔

게임 시작 시 개발 모드(DEV)에서 자동으로 검증이 실행되며, 콘솔에 결과가 출력됩니다.

```
🔍 데이터 무결성 검증 시작...

╔═══════════════════════════════════════════════════════════════╗
║       🔍 DIALOGUE INTEGRITY VALIDATION REPORT 🔍             ║
╚═══════════════════════════════════════════════════════════════╝

📊 Total Nodes: 1234
✅ Checked: 1234

─────────────────────────────────────────────────────────────────
🔴 Fatal Errors: 0
⚠️  Errors: 0
⚡ Warnings: 5
─────────────────────────────────────────────────────────────────
```

## 📊 검증 결과 해석

### 심각도 레벨

- **🔴 Fatal**: 치명적 오류 - 게임이 중단될 수 있음 (즉시 수정 필요)
  - 끊어진 링크 (존재하지 않는 노드로의 연결)
  
- **⚠️ Error**: 오류 - 게임 플레이에 영향을 줄 수 있음 (빠른 수정 권장)
  - 텍스트 누락
  - 존재하지 않는 화자 ID
  
- **⚡ Warning**: 경고 - 품질 문제 (수정 검토 필요)
  - 짧은 텍스트
  - 플레이스홀더 텍스트
  - 막다른 노드

### 에러 메시지 예시

```
🔴 ═══ FATAL ERRORS (Must Fix!) ═══
   [study_investigation_phase2] Dead link to "study_clue_nonexistent"
      ↳ nextNode does not exist
```

```
⚠️  ═══ ERRORS ═══
   [kitchen_dialogue_03] Unknown speaker: "unknown_character"
      ↳ Speaker ID not found in characterData
```

```
⚡ ═══ WARNINGS ═══
   [intro_scene] Text contains placeholder
      ↳ Text: "TODO: 여기에 대사 추가..."
```

## 🛠️ 개발 워크플로우

### 1. 새로운 대화 노드 추가 후
```bash
1. 게임 실행
2. 개발자 도구 열기
3. "모든 노드 검증" 실행
4. 오류가 있으면 수정
5. 다시 검증
```

### 2. 대규모 스토리 수정 후
```bash
1. F12로 콘솔 열기
2. 게임 시작 (자동으로 검증 실행됨)
3. 콘솔에서 전체 리포트 확인
4. Fatal → Error → Warning 순서로 수정
```

### 3. 배포 전 최종 체크
```bash
1. 개발 모드에서 게임 실행
2. 콘솔 확인: "✅ All critical validations passed!" 메시지 확인
3. Fatal과 Error가 0개인지 확인
4. Warning은 의도된 것인지 확인
```

## 📁 파일 구조

```
/utils/dialogue/
  ├── validator.ts              # 데이터 무결성 검증기 (신규)
  └── parser.ts                 # 대화 파싱 유틸리티

/utils/
  └── dialogueValidator.ts      # 캐릭터 매칭 검증기 (기존)

/components/
  └── DevTools.tsx              # 개발자 도구 UI
```

## 🔧 커스터마이징

### 검증 항목 추가하기

`/utils/dialogue/validator.ts`에서 `validateNode` 함수를 수정:

```typescript
function validateNode(
  nodeId: string, 
  node: StoryNode, 
  allNodes: Record<string, StoryNode>,
  errors: ValidationError[]
): void {
  // 기존 검증들...
  
  // 새로운 검증 추가
  if (node.background && !backgroundExists(node.background)) {
    errors.push({
      nodeId,
      type: 'error',
      category: 'resource',
      message: `Missing background: "${node.background}"`,
      details: 'Background image not found'
    });
  }
}
```

### 특정 노드 검증 제외하기

```typescript
// 검증에서 특정 노드 제외
const SKIP_VALIDATION = ['debug_node', 'test_node'];

if (SKIP_VALIDATION.includes(nodeId)) {
  return; // 검증 건너뛰기
}
```

## 💡 팁과 트릭

### 1. 빠른 노드 검증
개발자 도구의 "노드별 테스트" 섹션에서 특정 노드만 검증 가능:
```
1. 노드 ID 입력 (예: kitchen_intro)
2. "노드 검증" 버튼 클릭
3. 콘솔에서 해당 노드의 상세 정보 확인
```

### 2. 콘솔 명령어
```javascript
// 특정 노드 검증
validateNode('kitchen_intro', storyData);

// 고아 노드 찾기
getOrphanNodes();

// 전체 스토리 통계
getStoryStats(storyData);
```

### 3. Warning 무시하기
일부 Warning은 의도적일 수 있습니다:
- "..." 같은 짧은 텍스트는 연출상 필요
- 특정 막다른 노드는 의도된 게임 디자인

이런 경우 주석으로 표시:
```typescript
{
  id: 'dramatic_pause',
  text: '...', // 의도적으로 짧은 텍스트 (연출)
  nextNode: 'next_scene'
}
```

## 🐛 문제 해결

### Q: "모든 노드 검증" 버튼이 반응하지 않아요
A: F12를 눌러 콘솔에서 에러 메시지를 확인하세요. 대부분 import 오류입니다.

### Q: Fatal Error가 너무 많아요
A: 가장 먼저 나온 몇 개만 수정하세요. 연쇄적으로 해결되는 경우가 많습니다.

### Q: 검증이 너무 느려요
A: 노드 개수가 많으면 (1000개 이상) 검증에 몇 초 걸릴 수 있습니다. 정상입니다.

## 📚 참고 자료

- `DIALOGUE_QUALITY_GUIDE.md`: 대사 품질 가이드라인
- `DIALOGUE_SYSTEM.md`: 대화 시스템 전체 구조
- `STATE_MANAGEMENT_GUIDE.md`: 게임 상태 관리

## 🎉 마치며

대화 시스템 무결성 검증기를 활용하면:
- ✅ 버그를 사전에 발견
- ✅ 개발 시간 단축
- ✅ 게임 품질 향상
- ✅ 디버깅 효율성 증대

문제가 발생하면 콘솔을 먼저 확인하고, 리포트의 제안(suggestion)을 참고하세요!

Happy Validating! 🔍✨
