# 🌹 엘렌 등장 시스템 - 모듈화 구조

## 📁 파일 구조

기존의 거대한 `ellen-encounter.ts` (2070줄)를 관리하기 쉽게 모듈화했습니다.

```
/data/story/ellen/
├── index.ts                    # 메인 통합 파일
├── ellen-first-encounter.ts    # ✅ Part 1: 첫 만남 (완료)
├── ellen-basement.ts           # 📝 Part 2: 지하실 조사 (예정)
├── ellen-meets-hope.ts         # 📝 Part 3: 호프와의 만남 (예정)
├── ellen-endings.ts            # 📝 Part 4: 엔딩 시퀀스 (예정)
└── README.md                   # 이 파일
```

## 🔧 작동 방식

### 현재 상태
- **Part 1 (첫 만남)**: 분리 완료 ✅
  - `ellen-first-encounter.ts`에 일반 문자 인코딩으로 작성
  - 수정이 쉽고, fast_apply_tool과 edit_tool이 정상 작동
  
- **Part 2-4**: 아직 원본 파일 사용 ⏳
  - `ellen-encounter.ts`의 나머지 노드들을 그대로 사용
  - 필요시 점진적으로 분리 예정

### 통합 방식
`index.ts`에서 다음과 같이 병합:

```typescript
export const ellenEncounterModular = {
  ...ellenOriginal,          // 원본 파일 (Part 2-4)
  ...ellenFirstEncounter     // Part 1로 덮어쓰기
};
```

## 🎯 장점

### 1. **특수 인코딩 문제 해결**
- 기존: `ellen-encounter.ts`의 특수 따옴표 때문에 edit_tool 실패
- 현재: `ellen-first-encounter.ts`는 일반 문자로 작성되어 수정 가능

### 2. **점진적 마이그레이션**
- 한 번에 전체를 다시 작성할 필요 없음
- 필요한 부분만 분리하여 개선

### 3. **관리 용이성**
- 각 파트가 독립적인 파일로 분리
- 특정 기능 수정 시 해당 파일만 찾아서 편집

## 📝 향후 작업

### Part 2: 지하실 조사 (ellen-basement.ts)
노드 범위: `basement_with_ellen` ~ `ellen_brave_decision`
- 엘렌과 함께 지하실 진입
- 백작 발견 및 구조
- 백작과 엘렌의 재회

### Part 3: 호프와의 만남 (ellen-meets-hope.ts)
노드 범위: `search_for_hope_with_ellen` ~ `ellen_comforts_hope`
- 호프 발견
- 엘렌과 호프의 첫 만남
- 복수 vs 용서 대화

### Part 4: 엔딩 (ellen-endings.ts)
노드 범위: 나머지 모든 엔딩 노드
- 진엔딩 (true_ending_with_ellen)
- 자비 엔딩 (mercy_ending_with_ellen)
- 정의 엔딩 (justice_ending_with_ellen)
- 기타 변형 엔딩들

## 🔄 수정 방법

### Part 1 노드 수정 (쉬움 ✅)
```bash
# ellen-first-encounter.ts 수정
# 일반 문자 인코딩이므로 edit_tool이 정상 작동
```

### Part 2-4 노드 수정 (중간 난이도 ⚠️)
```bash
# 방법 1: 원본 파일(ellen-encounter.ts) 수정 시도
# 방법 2: 해당 파트를 새 파일로 분리하여 재작성
```

## 🚀 사용법

시스템에서는 `ellenEncounterModular`를 import하여 사용:

```typescript
import { ellenEncounterModular } from '../ellen/index';

// 모든 엘렌 노드 사용 가능
// Part 1은 새 버전, Part 2-4는 원본 버전
```

## ✅ 해결된 문제

1. **`holmes_recognizes_ellen` → `ellen_sits_down` 참조 오류**
   - 수정: ellen-first-encounter.ts에서 `ellen_survival_explanation`로 변경
   
2. **`ellen_stays_hidden` → `basement_interior` 참조 오류**
   - 수정: ellen-first-encounter.ts에서 `find_basement`로 변경

3. **특수 인코딩으로 인한 수정 불가 문제**
   - 해결: 새 파일은 일반 인코딩 사용

---

*최종 업데이트: 2024*
*작성자: Assistant*
