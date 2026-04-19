# 🎵 음악 전환 실전 예시

## 여관 시퀀스 - 음악 흐름

### 1️⃣ 여관 입구 (watson_theme)
```typescript
inn_entrance: {
  id: 'inn_entrance',
  character: 'watson', // watson_theme 재생
}
```
🎵 **watson_theme** - 왓슨의 시점으로 여관 접근

---

### 2️⃣ 여관 주인과 만남 (mystery)
```typescript
inn_meet_innkeeper: {
  id: 'inn_meet_innkeeper',
  character: 'innkeeper', // 테마 없음 → inn_ 패턴으로 mystery 재생
}
```
🎵 **mystery** - 단서를 찾기 위한 만남

---

### 3️⃣ 밤 행적 질문 (mystery 유지)
```typescript
inn_ask_night_activity: {
  id: 'inn_ask_night_activity',
  character: 'innkeeper',
}
```
🎵 **mystery** - 알리바이 조사

---

### 4️⃣ 7번 방 조사 (deduction)
```typescript
inn_room_7_entrance: {
  id: 'inn_room_7_entrance', // 특별 키워드 없음
  character: 'watson',
}
```
🎵 **watson_theme** - 왓슨과 홈즈의 조사

---

### 5️⃣ 책상 조사 (holmes_theme)
```typescript
inn_room_desk: {
  id: 'inn_room_desk',
  character: 'watson', // watson 캐릭터지만...
}

inn_room_desk_reveal: {
  id: 'inn_room_desk_reveal',
  character: 'holmes', // 홈즈가 주도
}
```
🎵 **holmes_theme** - 홈즈의 추리

---

### 6️⃣ 결론 (holmes_theme)
```typescript
inn_conclusion: {
  id: 'inn_conclusion',
  character: 'holmes',
}
```
🎵 **holmes_theme** - 홈즈의 결론

---

## 호프 시퀀스 - 음악 흐름

### 1️⃣ 호프 첫 조우 (hope_theme)
```typescript
well_hope_first_encounter: {
  id: 'well_hope_first_encounter', // 'encounter' 키워드
  character: 'hope',
}
```
🎵 **hope_theme** - 비극적인 호프의 등장

---

### 2️⃣ 호프와 대화 (hope_theme 유지)
```typescript
hope_conversation: {
  id: 'hope_conversation',
  character: 'hope',
}
```
🎵 **hope_theme** - 호프의 이야기

---

### 3️⃣ 진실 폭로 (revelation) ⚡
```typescript
hope_truth_reveal: {
  id: 'hope_truth_reveal', // 'reveal' 키워드 → HIGH PRIORITY
  character: 'hope', // 캐릭터 테마 무시
}
```
🎵 **revelation** - 극적인 진실 폭로 (자동 전환)

---

### 4️⃣ 체포 장면 (tension)
```typescript
hope_arrest: {
  id: 'hope_arrest',
  character: 'gregson', // gregson_theme보다...
}
```
🎵 **gregson_theme** - 그레그슨의 체포

---

## 지하실 시퀀스 - 음악 흐름

### 1️⃣ 지하실 입구 (holmes_theme)
```typescript
basement_entrance_with_holmes: {
  id: 'basement_entrance_with_holmes',
  character: 'holmes',
}
```
🎵 **holmes_theme** - 홈즈와 함께 내려감

---

### 2️⃣ 지하실 깊숙이 (fear) ⚡
```typescript
basement_deep_explore: {
  id: 'basement_deep_explore', // 'basement' 키워드 → HIGH PRIORITY
  character: 'holmes', // 캐릭터 테마 무시
}
```
🎵 **fear** - 공포 분위기로 자동 전환

---

### 3️⃣ 시체 발견 (fear 유지)
```typescript
basement_body_discover: {
  id: 'basement_body_discover', // 'discover' + 'body' → HIGH PRIORITY
  character: 'watson',
}
```
🎵 **fear** - 시체 발견의 충격

---

### 4️⃣ 시체 검시 (deduction) ⚡
```typescript
basement_body_autopsy: {
  id: 'basement_body_autopsy', // 'autopsy' → NORMAL PRIORITY
  character: 'holmes',
}
```
🎵 **deduction** - 냉정한 검시 (자동 전환)

---

### 5️⃣ 혈흔 분석 (tension) ⚡
```typescript
basement_blood_analysis: {
  id: 'basement_blood_analysis', // 'blood' → HIGH PRIORITY
  character: 'holmes',
}
```
🎵 **tension** - 긴장감 있는 혈흔 분석 (자동 전환)

---

## 서재 시퀀스 - 음악 흐름

### 1️⃣ 서재 입장 (deduction)
```typescript
study_entrance: {
  id: 'study_entrance', // 'study' 키워드
  character: 'watson',
}
```
🎵 **deduction** - 차분한 조사

---

### 2️⃣ 홈즈와 추리 (holmes_theme)
```typescript
study_holmes_deduction: {
  id: 'study_holmes_deduction', // 'deduction' 있지만 NORMAL
  character: 'holmes', // 캐릭터 테마 우선
}
```
🎵 **holmes_theme** - 홈즈의 추리

---

### 3️⃣ 긴박한 발견 (investigation) ⚡
```typescript
study_urgent_discovery: {
  id: 'study_urgent_discovery', // 'urgent' → HIGH PRIORITY
  character: 'holmes',
}
```
🎵 **investigation** - 긴박한 상황으로 전환

---

### 4️⃣ 진실 확신 (revelation) ⚡
```typescript
study_truth_revealed: {
  id: 'study_truth_revealed', // 'revealed' → HIGH PRIORITY
  character: 'holmes',
}
```
🎵 **revelation** - 진실을 깨달은 순간

---

## 백작 시퀀스 - 음악 흐름

### 1️⃣ 백작과 첫 만남 (count_theme)
```typescript
count_first_meeting: {
  id: 'count_first_meeting', // 'meeting' (조우 키워드)
  character: 'count',
}
```
🎵 **count_theme** - 백작의 위엄

---

### 2️⃣ 백작 심문 (tension) ⚡
```typescript
count_interrogation: {
  id: 'count_interrogation', // 'interrogation' → NORMAL
  character: 'count', // 하지만 count_theme이 우선...
}
```
🎵 **count_theme** - 백작 테마 유지 (NORMAL은 캐릭터에게 밀림)

---

### 3️⃣ 백작 고발 (revelation) ⚡
```typescript
count_accusation: {
  id: 'count_accusation', // 'accusation' ≈ 'accuse' → HIGH PRIORITY
  character: 'count',
}
```
🎵 **revelation** - 백작 고발 장면

---

## 꿈 시퀀스 - 음악 흐름

### 1️⃣ 꿈 시작 (fear)
```typescript
dream_sequence_start: {
  id: 'dream_sequence_start', // 'dream' → HIGH PRIORITY
  character: 'watson',
}
```
🎵 **fear** - 불길한 꿈

---

### 2️⃣ 악몽 (fear 유지)
```typescript
nightmare_vision: {
  id: 'nightmare_vision', // 'nightmare' → HIGH PRIORITY
  character: 'watson',
}
```
🎵 **fear** - 악몽 지속

---

### 3️⃣ 깨어남 (calm)
```typescript
wake_up: {
  id: 'wake_up',
  character: 'watson',
}
```
🎵 **watson_theme** or **calm** - 평온하게 깨어남

---

## 엔딩 시퀀스 - 음악 흐름

### 1️⃣ 진실 폭로 (revelation)
```typescript
final_truth_reveal: {
  id: 'final_truth_reveal', // 'reveal' → HIGH PRIORITY
  character: 'holmes',
}
```
🎵 **revelation** - 모든 진실

---

### 2️⃣ 엔딩 (ending)
```typescript
true_ending: {
  id: 'true_ending', // 'ending' → HIGH PRIORITY
  character: 'watson',
}
```
🎵 **ending** - 게임 종료

---

## 🎯 음악 전환 패턴 요약

| 시작 | 전환 트리거 | 결과 |
|------|-----------|------|
| watson_theme | → `inn_` 노드 | mystery |
| mystery | → `character: 'holmes'` | holmes_theme |
| holmes_theme | → `urgent` 키워드 | investigation ⚡ |
| holmes_theme | → `reveal` 키워드 | revelation ⚡ |
| hope_theme | → `truth` 키워드 | revelation ⚡ |
| count_theme | → `basement` 키워드 | fear ⚡ |
| any | → `blood` 키워드 | tension ⚡ |
| any | → `ending` 키워드 | ending ⚡ |

⚡ = HIGH PRIORITY (즉시 전환, 캐릭터 테마 무시)
