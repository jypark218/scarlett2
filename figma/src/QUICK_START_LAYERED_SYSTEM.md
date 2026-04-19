# 🎮 계층적 조사 시스템 - 빠른 시작 가이드

---

## ✅ 완료된 작업

### 1️⃣ 서재 계층적 구조 구현 완료

**파일 위치**: `/data/story/locations/study-layered-investigation.ts`

#### 구조:
```
study_hub (메인 허브)
├── Phase 1: 공간 파악
│   ├── study_observe_desk (책상 관찰)
│   ├── study_observe_wall (벽면 관찰)
│   └── study_observe_floor (바닥 관찰)
│
├── Phase 2: 정밀 조사
│   ├── study_phase2_hub (정밀 조사 허브)
│   ├── study_detail_rache (RACHE 정밀 조사)
│   ├── study_detail_genealogy (가계도 정밀 조사)
│   ├── study_detail_desk_drawer (책상 서랍 조사)
│   ├── study_detail_cloth (천 조각 조사)
│   ├── study_discover_stangerson (스탠거슨 발견)
│   └── study_detail_bookshelf (책장 조사)
│
└── Phase 3: 추리 결론
    └── study_ask_stangerson_rache (스탠거슨 질문)
```

---

## 🎮 플레이어 경험

### 🚪 서재 진입
```
게임: "서재의 문을 연다..."
      "RACHE 핏자국이 보인다..."
      
[선택지 3개만 표시]
  📖 책상 주변을 관찰한다
  🖼️ 벽면 전체를 관찰한다
  👣 바닥과 주변을 관찰한다
```

### 🔍 Phase 1 진행
```
플레이어: [🖼️ 벽면 전체 관찰] 클릭
  ↓
게임: "RACHE 글자와 가계도를 발견했다"
      
[돌아온 화면에 새 선택지 추가]
  ✓ 벽면 전체 관찰 (완료)
  📖 책상 주변 관찰
  👣 바닥 주변 관찰
  🔍 정밀 조사를 시작한다 ← 신규!
```

### 📜 Phase 2 진입
```
플레이어: [🔍 정밀 조사를 시작한다] 클릭
  ↓
게임: "세부적으로 조사하자"
      
[새로운 선택지 노출]
  📜 RACHE 핏자국을 정밀 조사한다
  🗂️ 가계도를 정밀 조사한다
  🔙 다시 전체를 둘러본다
```

### 🎯 결정적 단서 획득
```
플레이어: [🗂️ 가계도 정밀 조사] 클릭
  ↓
게임: "가계도가 위조되었다!"
      "엘렌의 이름이 덧칠되어 있다..."
      
[알림 표시]
📜 [획득: 위조된 가계도 증거]
```

---

## 🔧 게임 테스트 방법

### 1. 게임 시작
```
시작 → 마차 시퀀스 → 저택 도착 → 현관 홀
```

### 2. 서재 진입
```
현관 홀 → "서재를 조사한다" 클릭 → study_hub 진입
```

### 3. Phase 1 테스트
```
- "📖 책상 주변을 관찰한다" 클릭
  → 투쟁 흔적, 열린 서랍 발견
  → study_desk_observed = true
  
- "🖼️ 벽면 전체를 관찰한다" 클릭
  → RACHE, 가계도 발견
  → study_wall_observed = true
  
- "👣 바닥과 주변을 관찰한다" 클릭
  → 천 조각, 수상한 기척 발견
  → study_floor_observed = true
```

### 4. Phase 2 해금 확인
```
- Phase 1에서 최소 1개 관찰 완료 시
  → "🔍 정밀 조사를 시작한다" 버튼 활성화
  
- 클릭하면 study_phase2_hub로 이동
  → 조건부 선택지들만 표시됨
```

### 5. 가계도 증거 획득
```
- "🗂️ 가계도를 정밀 조사한다" 클릭
  → study_detail_genealogy 진입
  
- "📜 가계도를 스케치해 둔다" 클릭
  → study_acquire_genealogy 진입
  → [획득: 위조된 가계도 증거]
  → 인벤토리에 아이템 추가
```

---

## 📊 확인 사항

### ✅ 작동 확인 체크리스트

- [ ] 서재 진입 시 선택지 3개만 표시됨
- [ ] Phase 1 관찰 완료 시 "정밀 조사" 버튼 활성화
- [ ] Phase 2 진입 시 조건부 선택지만 표시됨
- [ ] 벽면 관찰 전에는 RACHE/가계도 조사 버튼 안 보임
- [ ] 가계도 증거 획득 시 인벤토리에 추가됨
- [ ] 완료한 선택지는 재방문 시 숨김 처리됨

---

## 🐛 오류 발생 시

### 문제 1: 선택지가 안 보임
```
원인: 조건 플래그가 설정되지 않음
해결: Phase 1 노드의 onEnter 함수 확인
```

### 문제 2: 중복 선택지 표시
```
원인: hideIfVisitedNode 속성 누락
해결: choices에 hideIfVisitedNode 추가
```

### 문제 3: study_hub를 찾을 수 없음
```
원인: 파일 임포트 누락
해결: /data/story/locations/index.ts 확인
      studyLayeredNodes가 제대로 임포트되었는지 확인
```

---

## 🎯 다음 단계: 부엌에도 적용

### 부엌 계층 구조 예시

```typescript
kitchen_hub (메인 허브)
├── Phase 1: 공간 파악
│   ├── kitchen_observe_table (식탁 관찰)
│   ├── kitchen_observe_floor (바닥 관찰)
│   └── kitchen_observe_cupboard (찬장 관찰)
│
├── Phase 2: 정밀 조사
│   ├── kitchen_detail_mud (진흙 정밀 조사)
│   ├── kitchen_detail_cupboard_back (찬장 뒤쪽 조사)
│   └── kitchen_detail_servants (하인들 질문)
│
└── Phase 3: 추리 결론
    └── kitchen_deduction (부엌 단서 종합)
```

---

## 📝 노트

### 현재 상태
- ✅ 서재 계층 시스템 구현 완료
- ✅ main_hub에서 study_hub로 연결 완료
- ✅ 피그마 메이크 가이드 문서 작성 완료
- ⏳ 부엌/2층/지하실은 아직 기존 구조 유지

### 권장 사항
1. **서재 먼저 테스트**: 플레이어 반응 확인
2. **피드백 수집**: 선택지 개수/순서 조정 필요성 파악
3. **다른 장소 적용**: 부엌 → 2층 침실 → 지하실 순서로 적용

---

**문제가 발생하거나 다른 장소에도 적용하고 싶다면 말씀해주세요!** 🚀
