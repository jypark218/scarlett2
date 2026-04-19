# 대화 루프 방지 & 단서 획득 로직 개선

## 1. 스탠거슨 대화 루프 방지 시스템

### 문제점
- "더 이상 묻지 않는다" 선택 시 `ask_stangerson`으로 돌아가 "백작님은 어디 계십니까?"를 반복
- 각 질문 노드에서 "일단 다른 질문을 한다" → `ask_stangerson` 순환 구조

### 해결책: 허브 시스템 도입

#### 🆕 `stangerson_hub` 노드 생성
**위치:** `/data/story/interrogations/stangerson-initial.ts`

**기능:**
- 중앙 심문 허브로 작동
- 이미 방문한 질문은 자동 숨김 (`hideIfVisitedNode`)
- 반복 질문 없이 새로운 주제로 전환 가능

**선택지:**
```typescript
{
  text: '3일 전 밤의 상황을 다시 묻는다', 
  nextNode: 'stangerson_night_detail',
  hideIfVisitedNode: 'stangerson_night_detail'
}
```

#### 변경된 연결 구조

**Before:**
```
stangerson_night_detail → "일단 다른 질문을 한다" → ask_stangerson
stangerson_relationship → "일단 다른 질문을 한다" → ask_stangerson
```

**After:**
```
stangerson_night_detail → "일단 다른 질문을 한다" → stangerson_hub
stangerson_relationship → "일단 다른 질문을 한다" → stangerson_hub
```

### 수정된 파일들
1. `/data/story/interrogations/stangerson-initial.ts`
   - `stangerson_hub` 노드 추가
   - `stangerson_night_detail`, `stangerson_relationship`, `stangerson_door_locked` 선택지 변경

2. `/data/story/interrogations/stangerson-evidence.ts`
   - "더 이상 묻지 않는다" → `study_with_stangerson` (서재 조사로 복귀)

3. `/data/story/interrogations/stangerson-location.ts`
   - "그래도 신중하게 생각해본다" → `study_with_stangerson`

---

## 2. 단서 획득 매핑 (TODO)

### 필요한 연결

#### A. 여관 책상 → 루시의 편지 획득
**현재:**
- `inn_room_desk` → 협박 편지 획득 (`threatening_letters`)

**추가 필요:**
- 루시의 편지를 우물이 아닌 **여관 방에서도** 발견 가능하게
- 또는 우물의 `acquire_lucy_letter` 후 반응 노드 강화

#### B. 의식 도구 조사 → 백작과의 대화 해금
**현재:**
- `examine_ritual_tools` → 의식 도구 설명만 표시

**추가 필요:**
- `examine_ritual_tools` 방문 시 → `ask_count_about_ritual` 선택지 활성화
- 조건부 선택지로 구현:
```typescript
{
  text: '백작에게 의식에 대해 묻는다',
  nextNode: 'ask_count_about_ritual',
  requiredVisitedNode: 'examine_ritual_tools'
}
```

#### C. 루시의 편지 → 엘렌에게 로켓 전달
**현재:**
- `acquire_lucy_letter` → `turn_around`로 단순 종료

**추가 필요:**
- 엘렌과의 대화에서 루시의 편지 소지 시 로켓 전달 선택지 활성화
```typescript
{
  text: '엘렌에게 로켓을 보여준다',
  nextNode: 'ellen_receives_locket',
  requiredItem: '루시의 편지'
}
```

---

## 3. 반응 일관성 (Response Consistency)

### 원칙
- **단서 노드** (증거 획득) → **반응 노드** (캐릭터 반응) 순서 유지

### 예시
```typescript
// 단서 노드
ellen_receives_locket: {
  text: "로켓을 엘렌에게 건넨다...",
  nextNode: 'ellen_lucy_memory' // 반응 노드로 직행
}

// 반응 노드
ellen_lucy_memory: {
  text: "엘렌이 로켓을 보고 눈물을 흘린다...",
  // 이후 선택지
}
```

---

## 4. Critical Clue 시스템 (TODO)

### 목표
- 특정 증거 발견 시 스탠거슨이 중요 정보 공개

### 구현 방안
```typescript
stangerson_hub: {
  choices: [
    // 기존 선택지들...
    {
      text: '드레버와 백작의 관계를 추궁한다',
      nextNode: 'stangerson_reveals_drebber_plan',
      requiredItem: 'threatening_letters', // critical_clue
      requiredVisitedNode: 'inn_room_desk'
    }
  ]
}
```

---

## 테스트 체크리스트

### 스탠거슨 대화 루프
- [ ] `stangerson_hub` 방문 시 이미 들은 질문이 숨겨지는가?
- [ ] "일단 다른 질문을 한다" 선택 시 hub로 정확히 돌아가는가?
- [ ] "더 이상 묻지 않는다" 선택 시 서재 조사로 이동하는가?

### 단서 획득 매핑
- [ ] `inn_room_desk` 방문 후 루시 관련 단서 반응이 있는가?
- [ ] `examine_ritual_tools` 후 백작과의 새 대화가 해금되는가?
- [ ] `acquire_lucy_letter` 후 엘렌 선택지가 활성화되는가?

### 반응 일관성
- [ ] 증거 획득 → 캐릭터 반응 순서가 자연스러운가?
- [ ] 중간에 다른 노드가 끼어들지 않는가?

---

## 추가 개선 사항

### Priority 1: 스탠거슨 다른 파일들도 hub 연결
- `stangerson-investigation.ts`
- `stangerson-location.ts` (일부 완료)
- `stangerson-past.ts`

### Priority 2: 단서 획득 반응 강화
- 루시의 편지 획득 시 왓슨/홈즈 대사 추가
- 의식 도구 발견 시 분위기 연출 강화

### Priority 3: 증거 제시 시스템 개선
- 역전재판 스타일 유지하면서 반복 방지
