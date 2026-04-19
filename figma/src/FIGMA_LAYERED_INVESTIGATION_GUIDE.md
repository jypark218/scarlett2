# 📚 계층적 조사 시스템 (Layered Investigation System)
## 피그마 메이크(Figma Make) 전달용 기능 명세서

---

## 🎯 목적

**선택지 과부하(Choice Overload)** 문제를 해결하기 위해, 플레이어가 **[관찰 → 발견 → 추리]**의 자연스러운 사고 흐름을 따라가도록 설계된 3단계 조사 구조입니다.

한 화면에 6~7개의 선택지를 동시에 노출하는 대신, **단계별로 2~3개씩 순차적으로 해금**하여 몰입감을 유지합니다.

---

## 📊 시스템 구조

```
Phase 1: 공간 파악 (Initial Observation)
  └─> 선택지 2~3개 노출
       ├─ 책상 주변 관찰
       ├─ 벽면 전체 관찰
       └─ 바닥 주변 관찰

Phase 2: 정밀 조사 (Detailed Investigation)
  └─> Phase 1 완료 후 해금
       ├─ RACHE 정밀 조사 (벽면 관찰 후 해금)
       ├─ 가계도 정밀 조사 (벽면 관찰 후 해금)
       ├─ 책상 서랍 조사 (책상 관찰 후 해금)
       └─ 천 조각 조사 (바닥 관찰 후 해금)

Phase 3: 추리 결론 (Deduction)
  └─> Phase 2의 핵심 단서 발견 후 해금
       └─ 홈즈의 종합 추리 → 다음 장소 활성화
```

---

## 🔧 기술 구현 요구사항

### 1️⃣ 변수(Flag) 시스템

각 Phase의 진행 상태를 추적하기 위한 Boolean 플래그:

```typescript
// Phase 1 플래그
study_desk_observed: boolean = false
study_wall_observed: boolean = false
study_floor_observed: boolean = false

// Phase 2 플래그
examined_rache: boolean = false
examined_genealogy: boolean = false
found_desk_drawer: boolean = false
examined_cloth: boolean = false

// Phase 3 플래그
study_phase1_complete: boolean = false
study_phase2_complete: boolean = false
```

---

### 2️⃣ 선택지 가시성(Visibility) 로직

#### Phase 1 → Phase 2 전환 조건

```typescript
// "🔍 정밀 조사를 시작한다" 버튼 표시 조건
showPhase2Button = 
  study_wall_observed === true  // 최소 1개 이상 관찰 완료
```

#### Phase 2 선택지 개별 표시 조건

```typescript
// "RACHE 정밀 조사" 버튼
showRacheButton = 
  study_wall_observed === true && 
  examined_rache === false

// "가계도 정밀 조사" 버튼
showGenealogyButton = 
  study_wall_observed === true && 
  examined_genealogy === false

// "책상 서랍 조사" 버튼
showDeskDrawerButton = 
  study_desk_observed === true && 
  found_desk_drawer === false

// "천 조각 조사" 버튼
showClothButton = 
  study_floor_observed === true && 
  examined_cloth === false
```

---

### 3️⃣ 선택지 표시 규칙

#### ✅ 기본 원칙

1. **한 화면당 선택지 최대 3개**
   - 너무 많으면 2개씩 분리하여 새 노드 생성

2. **이미 확인한 선택지 숨김 처리**
   - `hideIfVisitedNode` 속성 활용
   - 또는 회색 처리 + 체크 표시 (✓)

3. **조건부 선택지는 하단에 배치**
   - 기본 선택지 (상단)
   - 조건부 선택지 (중간)
   - "돌아가기" 버튼 (하단 고정)

#### 🎨 UI 표현 예시

```
━━━━━━━━━━━━━━━━━━━━━━━
📚 서재 - 공간 파악

[선택지]
✓ 책상 주변 관찰 (완료)
✓ 벽면 전체 관찰 (완료)
  바닥 주변 관찰

🔍 정밀 조사를 시작한다  ← 2개 완료 시 활성화
🚪 현관으로 돌아간다
━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 4️⃣ 자동 노드 전환(Auto-Transition)

특정 구역 조사 완료 시 자동으로 허브(Hub)로 복귀:

```typescript
// Phase 1 관찰 노드 완료 시
onComplete: {
  action: "returnToHub",
  targetNode: "study_hub",
  setFlag: "study_desk_observed = true"
}

// Phase 2 정밀 조사 완료 시
onComplete: {
  action: "returnToHub",
  targetNode: "study_phase2_hub",
  addItem: "위조된 가계도 증거"
}
```

---

### 5️⃣ 아이템 연동

특정 증거 획득 시 **홈즈의 독백 노드 강제 실행**:

```typescript
// 예시: 가계도 증거 획득 시
onAcquireItem: "위조된 가계도 증거" => {
  forceNextNode: "holmes_insight_genealogy",
  showNotification: "📜 [획득: 위조된 가계도 증거]"
}
```

---

## 📋 서재(Study) 노드 전개 순서표

| 순서 | 노드 ID | 선택지 텍스트 | 해금 조건 (Visibility) |
|------|---------|---------------|------------------------|
| **Phase 1: 공간 파악** ||||
| 1 | `study_hub` | "📖 책상 주변을 관찰한다" | 기본 노출 |
| 2 | `study_hub` | "🖼️ 벽면 전체를 관찰한다" | 기본 노출 |
| 3 | `study_hub` | "👣 바닥과 주변을 관찰한다" | 기본 노출 |
| 4 | `study_hub` | "🔍 정밀 조사를 시작한다" | `study_wall_observed == true` |
| **Phase 2: 정밀 조사** ||||
| 5 | `study_phase2_hub` | "📜 RACHE 핏자국을 정밀 조사한다" | `study_wall_observed == true` |
| 6 | `study_phase2_hub` | "🗂️ 가계도를 정밀 조사한다" | `study_wall_observed == true` |
| 7 | `study_phase2_hub` | "📖 책상 서랍을 정밀 조사한다" | `study_desk_observed == true` |
| 8 | `study_phase2_hub` | "🧵 찢어진 천 조각을 정밀 조사한다" | `study_floor_observed == true` |
| 9 | `study_phase2_hub` | "🔍 책장 뒤의 기척을 확인한다" | `study_floor_observed == true` |
| **Phase 3: 추리 결론** ||||
| 10 | `study_deduction` | "💡 홈즈와 단서를 정리한다" | Phase 2 핵심 단서 2개 이상 획득 |

---

## 🎮 플레이어 경험 시나리오

### 1️⃣ 서재 진입

```
플레이어: [서재로 들어간다]
  ↓
게임: "서재의 문을 연다..."
      "RACHE 핏자국이 보인다..."
      
[선택지 3개만 표시]
  📖 책상 주변 관찰
  🖼️ 벽면 전체 관찰
  👣 바닥 주변 관찰
```

---

### 2️⃣ Phase 1 진행

```
플레이어: [🖼️ 벽면 전체 관찰] 클릭
  ↓
게임: "RACHE 글자와 가계도를 발견했다"
      플래그 설정: study_wall_observed = true
      
[돌아온 화면에 새 선택지 추가]
  ✓ 벽면 전체 관찰 (완료)
  📖 책상 주변 관찰
  👣 바닥 주변 관찰
  🔍 정밀 조사를 시작한다 ← 신규 활성화!
```

---

### 3️⃣ Phase 2 진입

```
플레이어: [🔍 정밀 조사를 시작한다] 클릭
  ↓
게임: "세부적으로 조사하자"
      
[새로운 선택지 노출 - 최대 3개씩]
  📜 RACHE 핏자국 정밀 조사
  🗂️ 가계도 정밀 조사
  🔙 다시 전체를 둘러본다
```

---

### 4️⃣ 결정적 단서 획득

```
플레이어: [🗂️ 가계도 정밀 조사] 클릭
  ↓
게임: "가계도가 위조되었다!"
      "엘렌의 이름이 덧칠되어 있다..."
      
[알림 표시]
📜 [획득: 위조된 가계도 증거]

[자동 전환]
  → "홈즈의 독백" 노드 강제 실행
  → 인벤토리에 증거 추가
```

---

## 🛠️ 구현 체크리스트

### Phase 1 구현 확인사항

- [ ] `study_hub` 노드에 선택지 3개만 노출
- [ ] 각 관찰 노드 완료 시 플래그 설정
- [ ] 플래그 기반으로 "정밀 조사" 버튼 활성화
- [ ] 완료된 선택지는 체크 표시 또는 숨김 처리

### Phase 2 구현 확인사항

- [ ] `study_phase2_hub` 노드에 조건부 선택지 배치
- [ ] 각 정밀 조사 노드 완료 시 아이템 획득
- [ ] 중요 증거 획득 시 홈즈 독백 강제 실행
- [ ] hideIfVisitedNode 속성으로 중복 방지

### Phase 3 구현 확인사항

- [ ] Phase 2 핵심 단서 2개 이상 획득 시 추리 노드 활성화
- [ ] 홈즈의 종합 추리 후 다음 장소 해금
- [ ] 플레이어가 놓친 단서 있을 시 힌트 제공

---

## 💡 추가 제안: 진행도 표시

### 시각적 진행도 인디케이터

```
━━━━━━━━━━━━━━━━━━━━━━━
📚 서재 조사

진행도: ▓▓▓░░░░ (3/7)

[Phase 1] 공간 파악: ✓ 완료
[Phase 2] 정밀 조사: 진행 중 (2/5)
[Phase 3] 추리 결론: 🔒 잠김
━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎨 디자인 가이드

### 선택지 아이콘 규칙

- `📖` `🖼️` `👣` = Phase 1 (관찰)
- `📜` `🗂️` `🔍` = Phase 2 (정밀 조사)
- `💡` `🧩` `🎯` = Phase 3 (추리)
- `🚪` `🔙` = 네비게이션

### 색상 구분

- **기본 선택지**: 흰색
- **조건부 선택지**: 노란색 (해금됨)
- **완료된 선택지**: 회색 + ✓ 표시
- **잠긴 선택지**: 회색 + 🔒 표시

---

## 📌 요약

### 핵심 원칙

1. **한 화면에 선택지 3개 이하 유지**
2. **조건부 해금으로 단계별 정보 제공**
3. **완료된 선택지 시각적으로 구분**
4. **중요 발견 시 자동으로 다음 단계 안내**

### 구현 우선순위

1. **High Priority**: 선택지 가시성 로직 (조건부 표시/숨김)
2. **Medium Priority**: 자동 노드 전환, 아이템 획득 알림
3. **Low Priority**: 진행도 표시, 시각적 효과

---

## 🔗 다음 단계

### 다른 장소에도 동일 구조 적용

- **부엌(Kitchen)**: 식기 관찰 → 진흙 발견 → 스탠거슨 압박
- **2층 침실(Bedroom)**: 방 전체 관찰 → 서랍 조사 → 편지 발견
- **지하실(Basement)**: 입구 확인 → 제단 발견 → 의식 흔적

### 캐릭터 대화에도 계층 적용

- **스탠거슨**: 간단한 질문 → 압박 질문 → 결정적 증거 제시
- **백작**: 표면적 대화 → 교단 연결고리 추궁 → 진실 폭로

---

**이 시스템을 모든 조사 장소에 적용하면 플레이어는 압도당하지 않고 논리적으로 수사를 진행할 수 있습니다.**
