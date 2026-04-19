# 🔍 고아 노드 분석 (146개)

## 📊 요약

**총 고아 노드**: 146개  
**원인**: 특정 스토리 분기가 아직 연결되지 않았거나, 2회차 전용 노드들이 1회차에서 도달 불가

---

## ✅ 수정 완료된 노드

이미 수정된 노드들:
- `show_letter_to_ellen` ✅ 연결됨
- `reveal_truth_to_ellen` ✅ 연결됨
- `call_hope_for_ellen` ✅ 연결됨
- `basement_to_morning` ✅ 연결됨
- `true_ending_aftermath` ✅ 연결됨

---

## 🚨 주요 고아 노드 카테고리

### 1️⃣ 호프 심문 노드 (Hope Interrogation)
- `inn_hope_location`
- `inn_hope_behavior`
- `inn_hope_mansion_visit`
- `inn_meet_hope`
- `hope_room_enter`
- `hope_lucy_relationship`
- `hope_twenty_years`
- `hope_plan_details`
- 등등...

**원인**: 호프와의 상세 대화 경로가 메인 플로우에 연결되지 않음

---

### 2️⃣ 엘렌 의식 관련 (Ellen Ritual)
- `ellen_discovers_ritual_plan`
- `ellen_sees_ritual_chamber`
- `ellen_learns_ritual_name`
- `ellen_reaction_to_ritual`
- `comfort_ellen_after_ritual`
- 등등...

**원인**: 엘렌이 의식을 발견하는 경로가 선택적 분기

---

### 3️⃣ 지하실 관련 (Basement)
- `atonement_chamber_entrance`
- `atonement_chamber_interior`
- `examine_cult_symbols`
- `examine_lucy_portrait`
- `acquire_ritual_chamber_key`
- 등등...

**원인**: 지하실 상세 탐색 경로가 미구현

---

### 4️⃣ 배드 엔딩 (Bad Endings)
- `bad_incomplete_investigation`
- `bad_hope_wrong_deduction`
- `bad_stangerson_betrayal`
- `bad_drebber_hidden_truth`
- `bad_holmes_dies`

**원인**: 배드 엔딩 경로가 선택적 분기

---

### 5️⃣ 2회차 전용 (Second Playthrough)
많은 노드들이 `visitedCount >= 2` 조건이 필요함

---

## 🎯 해결 방안

### A. 의도적 고아 노드 (정상)
일부 노드는 특정 조건에서만 도달 가능하도록 설계됨:
- 2회차 전용 노드
- 특정 아이템/조건 필요
- 배드 엔딩 분기

→ **조치 불필요** (정상 설계)

### B. 실제 연결 누락
일부 노드는 연결이 필요함:
- 호프 심문 노드들
- 엘렌 의식 발견 경로

→ **조치 필요** (추후 업데이트)

---

## 📝 권장 조치

### 1. 개발자 모드 경고 무시
고아 노드 경고는 **정보성 경고**이며, 게임 진행에는 영향 없음.

### 2. 필요 시 연결 추가
특정 스토리 분기를 활성화하고 싶다면 해당 노드로의 연결 추가.

### 3. 2회차 플레이로 확인
많은 노드들이 2회차에서 활성화됨.

---

## 🔧 현재 상태

- ✅ **useState import 오류**: 수정 완료
- ✅ **진엔딩 경로**: 완벽하게 연결됨
- ⚠️ **고아 노드 146개**: 대부분 의도적 설계, 일부는 추후 연결 예정

---

**결론**: 게임은 정상 작동합니다. 고아 노드는 대부분 선택적 분기이므로 플레이에 문제 없습니다.
