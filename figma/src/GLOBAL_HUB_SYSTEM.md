# 전역 허브 시스템 & 단서 기반 해금 로직

## 🎯 목표
1. 모든 주요 위치에 중앙 허브 노드 구축
2. 단서 획득 → 대화 해금 체인 구축
3. 무한 루프 방지 + 다음 단계 진행 조건 명확화

---

## 📍 위치별 허브 시스템

### 1. 지하실 (Basement) - `basement_hub`

**메인 허브:** `basement_investigation_hub`

**서브 위치:**
- A. 속죄실 (Atonement Chamber)
  - 루시 초상화, 백작의 일기, 편지들
- B. 의식실 (Ritual Chamber)  
  - 제단, 의식 도구, 드레스, 위조 편지

**허브 구조:**
```typescript
basement_investigation_hub: {
  id: 'basement_investigation_hub',
  location: 'basement',
  text: "지하실에서 어디를 조사하시겠습니까?",
  choices: [
    { text: '속죄실 조사', nextNode: 'atonement_chamber_interior' },
    { text: '의식실 조사', nextNode: 'ritual_chamber_interior', requiredItem: '의식실 열쇠' },
    { text: '백작과 대화', nextNode: 'count_basement_talk', requiredVisitedNode: 'examine_ritual_tools' },
    { text: '위층으로 올라간다', nextNode: 'exit_basement_to_kitchen' }
  ]
}
```

**반환 경로:**
- `atonement_chamber_interior` → "지하실 조사 계속" → `basement_investigation_hub`
- `ritual_chamber_interior` → "다른 곳 조사" → `basement_investigation_hub`

---

### 2. 여관 (Inn) - `inn_hub`

**메인 허브:** `inn_investigation_hub`

**서브 위치:**
- A. 여관 로비
- B. 드레버의 방
- C. 호프의 방 (비어있음)

**허브 구조:**
```typescript
inn_investigation_hub: {
  id: 'inn_investigation_hub',
  location: 'inn',
  text: "그린 라이온 여관. 어디를 조사하시겠습니까?",
  choices: [
    { text: '여관 주인과 대화', nextNode: 'innkeeper_talk' },
    { text: '드레버의 방 조사', nextNode: 'drebber_room_search', requiredVisitedNode: 'innkeeper_talk' },
    { text: '호프의 방 조사', nextNode: 'hope_room_search', requiredVisitedNode: 'innkeeper_talk' },
    { text: '저택으로 돌아간다', nextNode: 'main_entrance' }
  ]
}
```

**현재 상태:** 여관 노드가 아직 구현되지 않음
**TODO:** `/data/story/locations/inn-nodes.ts` 생성 필요

---

### 3. 다락방 (Attic) - `attic_hub`

**메인 허브:** `attic_investigation_hub`

**서브 위치:**
- 엘렌의 방 (침대, 책상, 일기장)

**허브 구조:**
```typescript
attic_investigation_hub: {
  id: 'attic_investigation_hub',
  location: 'attic',
  text: "다락방... 엘렌의 공간입니다.",
  choices: [
    { text: '침대 주변 조사', nextNode: 'attic_bed_area' },
    { text: '책장 조사', nextNode: 'attic_bookshelf' },
    { text: '일기장 읽기', nextNode: 'ellen_diary_attic', hideIfVisitedNode: 'ellen_diary_attic' },
    { text: '아래층으로 내려간다', nextNode: 'second_floor_hallway' }
  ]
}
```

**반환 경로:**
- 모든 다락방 조사 노드 → "다른 곳 조사" → `attic_investigation_hub`

**현재 상태:** `/data/story/part3-second-floor.ts`에 노드 존재하지만 허브 없음
**TODO:** 허브 노드 추가 및 반환 경로 구축

---

### 4. 우물 (Well) - `well_hub`

**메인 허브:** `well_investigation_hub`

**서브 위치:**
- 우물 외부 (호프 조우 지점)
- 우물 내부 (터널 → 의식실)

**허브 구조:**
```typescript
well_investigation_hub: {
  id: 'well_investigation_hub',
  location: 'garden',
  text: "오래된 우물. 무언가 숨겨져 있을 것 같다.",
  choices: [
    { text: '우물 조사', nextNode: 'investigate_well' },
    { text: '우물 안으로 내려간다', nextNode: 'well_descend', requiredVisitedNode: 'investigate_well' },
    { text: '호프와 대화', nextNode: 'hope_at_well', showIf: (ctx) => ctx.visitedNodes.includes('turn_around') },
    { text: '정원으로 돌아간다', nextNode: 'back_entrance' }
  ]
}
```

**현재 상태:** 호프 조우 시퀀스가 linear하게 연결됨
**TODO:** 허브 노드 추가 및 조건부 분기 구현

---

## 🔗 단서 기반 해금 체인

### Chain 1: 의식 도구 → 백작 의식 대화

```
[조사] examine_ritual_tools
   ↓ (플래그 설정)
[해금] ask_count_about_ritual (백작 대화)
   ↓
[전개] show_ritual_evidence_to_count
   ↓
[추론] count_not_culprit_realization
```

**구현 상태:** ✅ 완료 (`basement-nodes.ts` line 1293)

---

### Chain 2: 루시의 편지 → 엘렌 로켓 반응

```
[조사] investigate_well
   ↓
[획득] acquire_lucy_letter (아이템: '루시의 편지')
   ↓ (아이템 체크)
[해금] show_lucy_letter_to_ellen (엘렌 대화)
   ↓
[반응] ellen_receives_locket
   ↓
[기억] ellen_lucy_memory
```

**구현 상태:** ⚠️ 부분 완료
- `acquire_lucy_letter` 존재 (`well-hope-encounter.ts`)
- `ellen_receives_locket` 존재 (`ellen-encounter.ts`)
- **누락:** 연결 노드 `show_lucy_letter_to_ellen` 생성 필요

**TODO:**
1. 엘렌 대화 허브에 조건부 선택지 추가:
```typescript
{
  text: '📜 "루시의 편지를 찾았습니다"',
  nextNode: 'show_lucy_letter_to_ellen',
  requiredItem: '루시의 편지'
}
```

2. 반응 노드 생성:
```typescript
show_lucy_letter_to_ellen: {
  id: 'show_lucy_letter_to_ellen',
  text: `엘렌에게 편지를 보여준다...`,
  choices: [
    { text: '로켓을 건넨다', nextNode: 'ellen_receives_locket' }
  ]
}
```

---

### Chain 3: 스탠거슨 심문 → 드레버 계획 폭로

```
[심문] stangerson_hub (모든 질문 완료)
   ↓ (조건: 주요 단서 수집)
[해금] stangerson_reveals_drebber_plan
   ↓
[진행] final_deduction_hub
```

**조건:**
- `visitedNodes.includes('stangerson_reveal_hope')` (호프 이름 언급)
- `visitedNodes.includes('stangerson_threat_letter')` (협박 편지)
- `visitedNodes.includes('stangerson_1861_connection')` (과거 사건)

**TODO:** 조건부 선택지 추가:
```typescript
// stangerson_hub 노드에 추가
{
  text: '🎯 "이제 진실을 말해주십시오"',
  nextNode: 'stangerson_reveals_drebber_plan',
  requiredVisitedNodes: [
    'stangerson_reveal_hope',
    'stangerson_threat_letter', 
    'stangerson_1861_connection'
  ]
}
```

---

### Chain 4: 백작 일기 → 엘렌 보호 동기

```
[조사] read_count_confession (속죄실 일기)
   ↓
[이해] holmes_reads_confession
   ↓ (플래그 설정)
[해금] ask_count_about_ellen (백작 대화)
   ↓
[진실] count_protecting_ellen
```

**구현 상태:** ⚠️ 노드 존재하지만 조건부 연결 없음

**TODO:** 백작 대화 허브 생성 및 조건부 선택지 추가

---

## 🔄 무한 루프 방지 시스템

### NPC별 진행 단계 잠금

#### A. 스탠거슨 (`stangerson_hub`)

**Phase 1: 초기 심문** (자유 질문)
- 모든 질문 선택지 표시
- `hideIfVisitedNode`로 중복 방지

**Phase 2: 핵심 단서 수집** (조건부 진행)
```typescript
{
  text: '서재로 가서 증거를 확인한다',
  nextNode: 'study_with_stangerson',
  showIf: (ctx) => ctx.visitedNodes.filter(id => 
    id.startsWith('stangerson_')
  ).length >= 5
}
```

**Phase 3: 최종 폭로** (진행 조건 충족)
```typescript
{
  text: '🎯 드레버의 계획을 폭로하게 한다',
  nextNode: 'stangerson_reveals_drebber_plan',
  requiredVisitedNodes: ['stangerson_reveal_hope', 'stangerson_threat_letter']
}
```

---

#### B. 엘렌 (`ellen_hub`)

**Phase 1: 신원 확인**
- 기본 질문들

**Phase 2: 과거 연결** (루시 편지 필요)
```typescript
{
  text: '📜 편지를 보여준다',
  nextNode: 'show_lucy_letter_to_ellen',
  requiredItem: '루시의 편지'
}
```

**Phase 3: 가족 재회**
```typescript
{
  text: '호프를 데려온다',
  nextNode: 'ellen_meets_hope',
  requiredVisitedNodes: ['show_lucy_letter_to_ellen', 'well_hope_tragedy']
}
```

---

#### C. 백작 (`count_hub`)

**Phase 1: 구출**
```typescript
{
  text: '백작을 풀어준다',
  nextNode: 'free_count_immediately'
}
```

**Phase 2: 의식 추궁** (의식실 조사 필요)
```typescript
{
  text: '의식에 대해 묻는다',
  nextNode: 'ask_count_about_ritual',
  requiredVisitedNode: 'examine_ritual_tools'
}
```

**Phase 3: 진실 화해**
```typescript
{
  text: '호프와 화해시킨다',
  nextNode: 'reconcile_count_and_hope',
  requiredVisitedNodes: ['ask_count_about_ritual', 'hope_reaction_to_truth']
}
```

---

## 🎮 구현 우선순위

### Priority 1: 허브 노드 생성 ✅
- [x] 스탠거슨 허브 (`stangerson_hub`) - 완료
- [ ] 엘렌 허브 (`ellen_hub`) - 생성 필요
- [ ] 백작 허브 (`count_hub`) - 생성 필요  
- [ ] 다락방 허브 (`attic_investigation_hub`) - 생성 필요
- [ ] 우물 허브 (`well_investigation_hub`) - 생성 필요
- [ ] 여관 허브 (`inn_investigation_hub`) - 파일 자체 생성 필요

### Priority 2: 단서-대화 연결 🔗
- [x] `examine_ritual_tools` → `ask_count_about_ritual` - 완료
- [ ] `acquire_lucy_letter` → `show_lucy_letter_to_ellen` - 노드 생성
- [ ] `read_count_confession` → `ask_count_about_ellen` - 조건 추가
- [ ] Critical clues 수집 → `final_deduction_hub` - 로직 구현

### Priority 3: 진행 단계 잠금 🔒
- [ ] 스탠거슨 → `stangerson_reveals_drebber_plan` 조건부 해금
- [ ] 엘렌 → `ellen_meets_hope` 조건부 해금
- [ ] 백작 → `reconcile_count_and_hope` 조건부 해금

---

## 📝 코드 컨벤션

### 허브 노드 네이밍
```
{location}_{context}_hub
```

예시:
- `stangerson_hub` (캐릭터 중심)
- `basement_investigation_hub` (위치 중심)
- `attic_investigation_hub` (위치 중심)

### 조건부 선택지 구조
```typescript
{
  text: '선택지 텍스트',
  nextNode: 'target_node',
  
  // 아이템 필요
  requiredItem: '아이템명',
  
  // 노드 방문 필요 (단일)
  requiredVisitedNode: 'node_id',
  
  // 노드 방문 필요 (복수)
  requiredVisitedNodes: ['node1', 'node2'],
  
  // 이미 방문 시 숨김
  hideIfVisitedNode: 'node_id',
  
  // 아이템 보유 시 숨김
  hideIfHasItem: '아이템명',
  
  // 커스텀 조건
  showIf: (context) => context.visitedNodes.length >= 5
}
```

---

## 🧪 테스트 체크리스트

### 허브 시스템
- [ ] 각 허브에서 모든 서브 노드로 접근 가능
- [ ] 서브 노드에서 허브로 반환 경로 존재
- [ ] 중복 방문 시 선택지 자동 숨김
- [ ] 조건 미충족 시 선택지 비활성화

### 단서 해금
- [ ] `examine_ritual_tools` → `ask_count_about_ritual` 정상 작동
- [ ] `acquire_lucy_letter` → 엘렌 대화 해금
- [ ] Critical clues → `final_deduction_hub` 해금

### 진행 잠금
- [ ] 스탠거슨 Phase 1 → 2 → 3 순차 진행
- [ ] 엘렌 루시 편지 없이 특정 대화 불가
- [ ] 백작 의식실 미조사 시 의식 대화 불가

---

## 📚 관련 파일

### 기존 파일
- `/data/story/interrogations/stangerson-*.ts` - 스탠거슨 노드들
- `/data/story/ellen-encounter.ts` - 엘렌 노드들
- `/data/story/locations/basement-nodes.ts` - 지하실 노드들
- `/data/story/part3-second-floor.ts` - 다락방 노드들
- `/data/story/well-hope-encounter.ts` - 우물/호프 노드들

### 생성 필요
- `/data/story/locations/inn-nodes.ts` - 여관 노드 (신규)
- `/data/story/hubs/character-hubs.ts` - 캐릭터 허브 통합 (선택)
- `/data/story/hubs/location-hubs.ts` - 위치 허브 통합 (선택)

---

## 🎯 최종 목표

**완성된 시스템:**
1. ✅ 모든 위치에 중앙 허브 존재
2. ✅ 단서 획득 → 대화 해금 체인 완성
3. ✅ 무한 루프 없이 자연스러운 진행
4. ✅ 조건부 선택지로 진행 단계 명확화
5. ✅ 플레이어가 "다음에 뭘 해야 하는지" 명확히 알 수 있음

**플레이어 경험:**
- "허브에서 원하는 곳을 자유롭게 조사"
- "중요한 단서를 찾으면 새로운 대화 해금"
- "핵심 질문을 다 하면 다음 단계로 진행"
- "막힌 느낌 없이 자연스러운 탐정 경험"
