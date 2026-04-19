# 🎉 계층적 조사 시스템 통합 완료

---

## ✅ 완료 작업 요약

모든 주요 탐색 장소에 **계층적 선택지 구조(Layered Choice Structure)**가 적용되었습니다!

---

## 📍 통합된 장소 (6곳)

### 1️⃣ 서재 (Study)
- **파일**: `/data/story/locations/study-layered-investigation.ts`
- **Export**: `studyLayeredNodes`
- **진입 노드**: `study_hub`
- **연결 위치**: `main_entrance` → "서재를 조사한다"

#### 구조:
```
study_hub (Phase 1)
├── 책상 관찰 → study_observe_desk
├── 벽면 관찰 → study_observe_wall
└── 바닥 관찰 → study_observe_floor
    ↓
study_phase2_hub (Phase 2)
├── RACHE 정밀 조사
├── 가계도 정밀 조사 → [위조된 가계도 증거] 획득
├── 책상 서랍 조사 → 호프 일기장 발견
├── 천 조각 조사
├── 스탠거슨 발견
└── 책장 조사 → 비밀 금고 발견
```

---

### 2️⃣ 부엌 (Kitchen)
- **파일**: `/data/story/locations/kitchen-layered.ts`
- **Export**: `kitchenLayeredNodes`
- **진입 노드**: `kitchen_hub`
- **연결 위치**: `main_entrance` → "부엌을 조사한다"

#### 구조:
```
kitchen_hub (Phase 1)
├── 식탁 관찰 → kitchen_observe_table
├── 바닥 관찰 → kitchen_observe_floor
└── 찬장 관찰 → kitchen_observe_cupboard
    ↓
kitchen_phase2_hub (Phase 2)
├── 진흙 정밀 조사
├── 찬장 뒤쪽 조사 → 로켓 발견
├── 하인들 질문
└── 지하실 입구 발견
```

---

### 3️⃣ 뒷뜰 (Backyard)
- **파일**: `/data/story/locations/backyard-layered.ts`
- **Export**: `backyardLayeredNodes`
- **진입 노드**: `backyard_hub`
- **연결 위치**: `main_entrance` → "뒷뜰을 조사한다"

#### 구조:
```
backyard_hub (Phase 1)
├── 정원 관찰 → backyard_observe_garden
├── 우물 관찰 → backyard_observe_well
└── 창문 관찰 → backyard_observe_window
    ↓
backyard_phase2_hub (Phase 2)
├── 발자국 추적
├── 우물 내부 조사
├── 깨진 창문 정밀 조사
└── 터널 발견
```

---

### 4️⃣ 침실 (Bedroom - 2층)
- **파일**: `/data/story/locations/bedroom-layered.ts`
- **Export**: `bedroomLayeredNodes`
- **진입 노드**: `bedroom_hub`
- **연결 위치**: `upstairs` → "침실을 조사한다"

#### 구조:
```
bedroom_hub (Phase 1)
├── 책상 관찰 → bedroom_observe_desk
├── 침대 관찰 → bedroom_observe_bed
└── 옷장 관찰 → bedroom_observe_wardrobe
    ↓
bedroom_phase2_hub (Phase 2)
├── 책상 서랍 조사 → 서랍 열쇠 필요
├── 침대 밑 조사
├── 옷장 내부 조사 → 비밀 통로 발견
└── 편지 발견
```

---

### 5️⃣ 다락방 (Attic - 2층 위)
- **파일**: `/data/story/locations/attic-layered.ts`
- **Export**: `atticLayeredNodes`
- **진입 노드**: `attic_hub`
- **연결 위치**: `discover_attic_ladder` → "다락방으로 올라간다"

#### 구조:
```
attic_hub (Phase 1)
├── 책상 관찰 → attic_observe_desk
├── 침대 관찰 → attic_observe_bed
└── 창문 관찰 → attic_observe_window
    ↓
attic_phase2_hub (Phase 2)
├── 일기장 정밀 조사 → [엘렌의 일기장] 획득
├── 보관함 조사 → [루시의 편지] 획득
├── 책장 조사 → 백작의 교육 흔적
└── 창문 낙서 조사 → 엘렌의 절규
    ↓
attic_deduction (Phase 3)
└── 엘렌과 루시의 관계 파악 → 지하실 진입
```

---

### 6️⃣ 지하실 (Basement)
- **파일**: `/data/story/locations/basement-layered.ts`
- **Export**: `basementLayeredNodes`
- **진입 노드**: `basement_hub`
- **연결 위치**: `open_basement` → "조심스럽게 들어간다"

#### 구조:
```
basement_hub (Phase 1)
├── 제단 관찰 → basement_observe_altar
├── 벽면 관찰 → basement_observe_walls
└── 구석 관찰 → basement_observe_corner
    ↓
basement_phase2_hub (Phase 2)
├── 제단 정밀 조사 → 의식 흔적
├── 벽면 혈흔 조사
├── 백작 발견 → 백작 구출/대화
└── 진상 밝히기
```

---

## 🔧 수정된 연결 노드

### 메인 허브 (main_entrance)
```typescript
// /data/story/locations/main-hub.ts
choices: [
  { text: '서재를 조사한다', nextNode: 'study_hub' },        // ✅ 변경
  { text: '부엌을 조사한다', nextNode: 'kitchen_hub' },      // ✅ 변경
  { text: '뒷뜰을 조사한다', nextNode: 'backyard_hub' },     // ✅ 변경
  { text: '2층으로 올라간다', nextNode: 'checkpoint_go_upstairs' }
]
```

### 2층 복도 (upstairs)
```typescript
// /data/story/upstairsNode.ts
choices: [
  { text: '침실을 조사한다', nextNode: 'bedroom_hub' },      // ✅ 변경
  { text: '복도 끝을 조사한다', nextNode: 'meet_drebber' }
]
```

### 지하실 진입 (open_basement)
```typescript
// /data/story/basement-route-fix.ts
choices: [
  { text: '조심스럽게 들어간다', nextNode: 'basement_hub' }  // ✅ 변경
]
```

---

## 📊 통합 현황

| 장소 | 파일 이름 | Export 이름 | 진입 노드 | 상태 |
|------|----------|-------------|-----------|------|
| 서재 | `study-layered-investigation.ts` | `studyLayeredNodes` | `study_hub` | ✅ 완료 |
| 부엌 | `kitchen-layered.ts` | `kitchenLayeredNodes` | `kitchen_hub` | ✅ 완료 |
| 뒷뜰 | `backyard-layered.ts` | `backyardLayeredNodes` | `backyard_hub` | ✅ 완료 |
| 침실 | `bedroom-layered.ts` | `bedroomLayeredNodes` | `bedroom_hub` | ✅ 완료 |
| 다락방 | `attic-layered.ts` | `atticLayeredNodes` | `attic_hub` | ✅ 완료 |
| 지하실 | `basement-layered.ts` | `basementLayeredNodes` | `basement_hub` | ✅ 완료 |

---

## 🎮 플레이어 경험 개선

### Before (기존)
```
서재 진입 → 선택지 7개 동시 노출
- 책장 뒤 확인
- RACHE 조사
- 가계도 조사
- 책상 조사
- 책장 조사
- 천 조각 조사
- 현관으로 돌아가기

❌ 플레이어 혼란
❌ 중요도 파악 어려움
❌ 몰입감 저하
```

### After (개선)
```
Phase 1: 공간 파악 (선택지 3개)
- 📖 책상 주변 관찰
- 🖼️ 벽면 전체 관찰
- 👣 바닥 주변 관찰
    ↓
Phase 2: 정밀 조사 (조건부 해금)
- 🔍 정밀 조사 시작
- 📜 RACHE 조사 (벽면 관찰 후)
- 🗂️ 가계도 조사 (벽면 관찰 후)
    ↓
Phase 3: 추리 결론
- 💡 홈즈와 단서 정리

✅ 논리적 흐름
✅ 단계별 정보 제공
✅ 몰입감 유지
```

---

## 🧪 테스트 가이드

### 1. 서재 테스트
```
시작 → 마차 → 현관 → "서재를 조사한다"
  ↓
study_hub 진입
  ↓
선택지 3개만 표시 확인:
- 📖 책상 주변 관찰
- 🖼️ 벽면 전체 관찰  
- 👣 바닥 주변 관찰
  ↓
벽면 관찰 완료 후
  ↓
"🔍 정밀 조사 시작" 버튼 활성화 확인
  ↓
가계도 조사 → [위조된 가계도 증거] 획득 확인
```

### 2. 부엌 테스트
```
현관 → "부엌을 조사한다"
  ↓
kitchen_hub 진입
  ↓
Phase 1 완료 → Phase 2 해금 확인
  ↓
진흙/로켓 발견 확인
```

### 3. 침실 테스트
```
현관 → 2층 올라가기 → "침실을 조사한다"
  ↓
bedroom_hub 진입
  ↓
Phase 1 완료 → 비밀 통로 발견 확인
```

### 4. 지하실 테스트
```
서재 금고 → 지하실 열쇠 획득
  ↓
부엌 → 지하실 입구 발견
  ↓
basement_hub 진입
  ↓
제단/백작 발견 확인
```

---

## 🐛 주의사항

### 1. 기존 노드와의 충돌
- 기존 `study_room`, `bedroom`, `basement_scene` 노드는 여전히 존재합니다
- 새 계층 시스템은 `_hub` 접미사로 구분됩니다
- 기존 노드를 참조하는 다른 파일들은 수동 확인 필요

### 2. 플래그 시스템
```typescript
// Phase 1 플래그
study_desk_observed: boolean
study_wall_observed: boolean
study_floor_observed: boolean

// Phase 2 플래그
examined_rache: boolean
examined_genealogy: boolean
found_desk_drawer: boolean
```

### 3. 아이템 획득
- 가계도 증거: `위조된 가계도 증거`
- 천 조각: `찢어진 천 조각`
- 일기장: 기존 `hope_diary_discovery` 노드 연결
- 지하실 열쇠: `지하실 열쇠`

---

## 📝 다음 작업 (선택사항)

### 1. 여관(Inn) 계층화
```
inn_hub (Phase 1)
├── 주인에게 질문
├── 손님들 관찰
└── 호프의 방 발견
```

### 2. 최종 추리 허브 개선
- 35개 노드 → 계층 구조 적용
- 카테고리별 분류 (인물/장소/증거)

### 3. 2회차 힌트 시스템
- Phase별 진행도 표시
- 놓친 단서 자동 알림

---

## 🎯 예상 효과

### 플레이어 경험
- ✅ 선택지 과부하 제거
- ✅ 논리적 사고 흐름 유도
- ✅ 중요 단서 놓침 방지
- ✅ 몰입감 향상

### 게임 디자인
- ✅ 정보 전달 효율 증가
- ✅ 스토리 텔링 개선
- ✅ 난이도 조절 용이
- ✅ 재플레이 가치 향상

---

## 📞 문제 발생 시

### 노드 연결 오류
```
Error: Node 'xxx' not found
→ /data/story/locations/index.ts에서 export 확인
→ studyLayeredNodes, kitchenLayeredNodes 등이 포함되었는지 확인
```

### 선택지 안 보임
```
선택지가 표시되지 않음
→ requiredVisitedNode 조건 확인
→ Phase 1 플래그가 제대로 설정되었는지 확인
```

### 중복 노드 경고
```
Duplicate node ID detected
→ 기존 노드와 새 노드의 ID 충돌
→ 새 노드는 _hub 접미사 사용
```

---

## 🎉 최종 요약

**6개 주요 탐색 장소에 계층적 조사 시스템이 성공적으로 통합되었습니다!**

플레이어는 이제:
- 한 번에 2~3개의 선택지만 보게 됩니다
- 논리적 순서로 단서를 발견합니다
- 중요한 정보를 놓치지 않습니다
- 더 몰입감 있는 수사를 진행합니다

**게임을 테스트하고 피드백을 주시면 추가 개선하겠습니다!** 🚀