# 상호작용 정규화 완료 보고서

## ✅ 완료된 작업

### 1. 전역 스탠거슨 허브 시스템 통합

#### 수정된 파일:
- ✅ `/data/story/interrogations/stangerson-initial.ts`
  - `stangerson_hub` 노드 생성 및 통합
  - 모든 "일단 다른 질문을 한다" → `stangerson_hub`로 변경

- ✅ `/data/story/interrogations/stangerson-investigation.ts`
  - 모든 반복 선택지 `stangerson_hub`로 연결

- ✅ `/data/story/interrogations/stangerson-past.ts`
  - `stangerson_germany_past` 선택지 수정
  - "나중에 다시 묻는다" → `stangerson_hub`

- ✅ `/data/story/interrogations/stangerson-evidence.ts` (이전 완료)
  - "더 이상 묻지 않는다" → `study_with_stangerson`

- ✅ `/data/story/interrogations/stangerson-location.ts` (이전 완료)
  - 경찰 제안 선택지 수정

#### 허브 노드 구조:
```typescript
stangerson_hub: {
  text: "스탠거슨이 불안하게 서 있다. 홈즈가 나를 본다.",
  choices: [
    {
      text: '3일 전 밤의 상황을 다시 묻는다',
      nextNode: 'stangerson_night_detail',
      hideIfVisitedNode: 'stangerson_night_detail' // 자동 숨김
    },
    // ... 다른 질문들
    { text: '서재를 더 조사한다', nextNode: 'study_with_stangerson' }
  ]
}
```

---

### 2. 단서-대화 해금 연결

#### ✅ 의식 도구 → 백작 의식 대화 해금
**파일:** `/data/story/locations/basement-nodes.ts`

**구현:**
```typescript
// Line 1293
{
  text: '의식에 대해 묻는다',
  nextNode: 'ask_count_about_ritual',
  requiredVisitedNode: 'examine_ritual_tools' // 🆕 조건부 해금
}
```

**효과:**
- `examine_ritual_tools` 방문 전: 선택지 숨김
- `examine_ritual_tools` 방문 후: "의식에 대해 묻는다" 활성화

---

### 3. 타임라인 이슈 해결 (TODO)

**문제:**
- Day 1 Morning 노드가 Evening 진입 후에도 접근 가능

**해결 방안:**
```typescript
// 모든 Morning 노드에 timeOfDay 잠금 추가
{
  // ... node definition
  timeOfDay: 'morning',
  hideIf: (context) => context.currentTimeOfDay === 'evening' // 🆕
}
```

**적용 필요 파일:**
- `/data/story/part1-arrival.ts`
- `/data/story/part2-first-floor.ts`
- 기타 morning 노드가 있는 모든 파일

---

## 🔄 진행 중인 작업

### 1. 루시의 편지 → 엘렌 대화 해금

**목표:**
- `acquire_lucy_letter` (우물) 획득 후
- 엘렌과의 대화에서 편지 관련 선택지 활성화

**구현 예정:**
```typescript
// /data/story/ellen-encounter.ts
{
  text: '📜 "루시의 편지를 찾았습니다"',
  nextNode: 'show_lucy_letter_to_ellen',
  requiredItem: '루시의 편지' // 🆕 조건부 해금
}
```

**현재 상태:** 파일 구조 확인 중

---

### 2. 스탠거슨 → 최종 추론 허브 연결

**목표:**
- 모든 critical clue 수집 시
- `stangerson_hub`에서 `final_deduction_hub` 연결

**구현 예정:**
```typescript
stangerson_hub: {
  choices: [
    // ... 기존 선택지들
    {
      text: '최종 추론을 시작한다',
      nextNode: 'final_deduction_hub',
      requiredItems: ['협박 편지들', '의식 계획 메모'], // critical clues
      requiredVisitedNodes: ['examine_ritual_tools', 'read_count_confession']
    }
  ]
}
```

---

## 📊 테스트 체크리스트

### 스탠거슨 허브 시스템
- [ ] `stangerson_hub` 방문 시 이미 들은 질문 자동 숨김
- [ ] "일단 다른 질문을 한다" 선택 시 hub로 정확히 복귀
- [ ] "더 이상 묻지 않는다" 선택 시 `study_with_stangerson`으로 이동
- [ ] 모든 스탠거슨 파일에서 hub 시스템 작동 확인

### 단서-대화 해금
- [x] `examine_ritual_tools` 전에는 의식 대화 숨김
- [x] `examine_ritual_tools` 후 "의식에 대해 묻는다" 활성화
- [ ] `acquire_lucy_letter` 후 엘렌 편지 선택지 활성화

### 타임라인 잠금
- [ ] Day 1 Evening 시작 시 Morning 노드 접근 불가
- [ ] Day 2 시작 시 Day 1 노드 잠금

---

## 🎯 다음 단계

### Priority 1: 엘렌 노드 통합
1. `/data/story/ellen-encounter.ts` vs `/data/story/ellen/ellen-first-encounter.ts` 확인
2. 중복 노드 정리
3. 루시 편지 조건부 선택지 추가

### Priority 2: 최종 추론 허브 연결
1. `final_deduction_hub` 노드 위치 확인
2. Critical clue 리스트 정의
3. 조건부 연결 구현

### Priority 3: 타임라인 시스템
1. 시간대별 노드 접근 제한 로직 구현
2. 모든 타임라인 노드에 적용
3. Day 전환 시 잠금 테스트

---

## 🔧 기술적 개선 사항

### 조건부 선택지 시스템 강화
```typescript
// 복합 조건 지원
{
  text: '최종 추론',
  nextNode: 'final_deduction',
  requiredItems: ['item1', 'item2'], // AND 조건
  requiredVisitedNodes: ['node1', 'node2'], // AND 조건
  hideIf: (context) => !context.hasMetCharacter('ellen') // 커스텀 조건
}
```

### 허브 노드 패턴 표준화
- 모든 캐릭터 심문에 허브 시스템 적용
- `{character}_hub` 네이밍 컨벤션
- 자동 선택지 숨김 기능

### 단서 획득 반응 체인
```
단서 노드 → 반응 노드 → 대화 해금
예: examine_ritual_tools → realize_ritual_plan → ask_count_about_ritual
```

---

## 📝 노트

### 이미 구현되어 있던 기능
- 백작 의식 대화는 이미 `requiredVisitedNode` 조건 적용되어 있었음
- `basement-nodes.ts`에서 확인 완료

### 파일 중복 이슈
- `ellen-encounter.ts` 와 `ellen/ellen-first-encounter.ts` 중복 존재 가능
- 통합 작업 필요

### 아이템 이름 통일
- `'루시의 편지'` vs `'lucy_letter'` 일관성 확인 필요
- `'협박 편지들'` vs `'threatening_letters'` 통일

---

## 📚 참고 문서

- `/DIALOGUE_LOOP_FIX_SUMMARY.md` - 대화 루프 방지 가이드
- `/verify-connections.ts` - 노드 연결 검증 스크립트
- `/data/story/node-connections-fix.ts` - 기존 연결 수정 기록
