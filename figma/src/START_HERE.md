# 🎮 셜록 홈즈 × 모로 백작의 저택
## 피그마 메이크 통합 가이드 - 여기서 시작하세요!

> **엘렌이 루시의 딸**이라는 핵심 설정을 바탕으로 한 컬트 호러 비주얼 노벨

---

## 🎯 이 프로젝트는?

**왓슨의 시점**에서 **홈즈**와 함께 모로 백작의 저택에서 벌어진 **실종 사건**을 해결하는 게임입니다.

### 핵심 특징
- ✅ **비주얼 노벨** 스타일 대화 시스템
- ✅ **허브 기반** 탐색 시스템 (무한 루프 방지)
- ✅ **플래그 기반** 단서 연동 (조사 → 대화 해금)
- ✅ **역전재판** 스타일 증거 제시 & 추궁
- ✅ **12개 엔딩** (트루/굿/배드 분기)

---

## 📚 문서 가이드 (읽는 순서)

### 1단계: 빠른 이해 (5분)
👉 **[QUICKSTART_GUIDE.md](/QUICKSTART_GUIDE.md)**
- 3대 핵심 원칙 파악
- 즉시 복사 가능한 템플릿
- 흔한 실수 TOP 3

### 2단계: 시스템 설계 이해 (20분)
👉 **[FIGMA_MAKE_INTEGRATION_GUIDE.md](/FIGMA_MAKE_INTEGRATION_GUIDE.md)**
- 7개 허브 전체 구조
- 플래그 시스템 목록
- 게임 흐름도

### 3단계: 초반부 구현 (30분)
👉 **[FIRST_FLOOR_EXPLORATION_GUIDE.md](/FIRST_FLOOR_EXPLORATION_GUIDE.md)**
- 마차 오프닝 시퀀스
- 1층 탐색 (서재/부엌)
- 단서 연동 로직

### 4단계: 코드 작성 (1시간)
👉 **[IMPLEMENTATION_EXAMPLES.md](/IMPLEMENTATION_EXAMPLES.md)**
- 복사 붙여넣기 가능한 코드
- Context API 사용법
- 디버깅 팁

### 5단계: 완성 확인
👉 **[FINAL_SYSTEM_COMPLETE.md](/FINAL_SYSTEM_COMPLETE.md)**
- 프로젝트 통계
- 완성 보고서

### 통합 인덱스
👉 **[README_INTEGRATION.md](/README_INTEGRATION.md)**
- 모든 문서 인덱스
- 상황별/역할별 추천

---

## ⚡ 5분 핵심 요약

### 3대 원칙

#### 1️⃣ 허브-스포크 구조
```
[허브] → [행동1] → [허브]
   ↓        ↑
[행동2] ←┘
```
**모든 대화/조사는 허브로 복귀!**

#### 2️⃣ 플래그 기반 해금
```
조사 노드 → 플래그 설정 → 대화 선택지 활성화
```
**단서를 찾으면 새 대화가 열림!**

#### 3️⃣ hideIfVisited
```typescript
{
  text: "질문",
  nextNode: "answer",
  hideIfVisitedNode: "answer"  // 한 번만!
}
```
**같은 질문 반복 금지!**

---

## 🎮 게임 플로우 한눈에

```
🚗 마차 (오프닝)
   ↓
🏛️ 1층 탐색
   ├─ 📚 서재 → 가계도 위조 발견 → found_genealogy_clue
   └─ 🍳 부엌 → 진흙 자국 발견 → found_kitchen_mud
   ↓
⬆️ 2층 탐색
   ├─ 🛏️ 침실 → 비밀 통로 발견
   └─ 🏚️ 다락방 → 엘렌 발견 → met_ellen
   ↓
⬇️ 지하실
   ├─ 📿 의식실 → 의식 도구 조사 → clue_ritual_found
   └─ 💬 백작 대화 → count_ritual_confession
   ↓
🏨 여관
   └─ 📜 루시 편지 획득 → has_lucy_letter
   ↓
🌹 엘렌 각성
   └─ 편지 전달 → ellen_awakened
   ↓
📚 스탠거슨 폭로
   └─ 3개 질문 + 증거 제시 → stangerson_confessed
   ↓
⚖️ 최종 추리
   └─ 스탠거슨 지목 → 3단계 추궁 → 엔딩
```

---

## 🔥 즉시 사용 가능한 코드

### 허브 템플릿
```typescript
hub_name: {
  id: 'hub_name',
  choices: [
    { text: '행동1', nextNode: 'action1', hideIfVisitedNode: 'action1' },
    { text: '행동2', nextNode: 'action2', hideIfVisitedNode: 'action2' },
    { text: '나간다', nextNode: 'parent_hub' }
  ]
}
```

### 조건부 선택지
```typescript
{
  text: '단서 필요',
  nextNode: 'next',
  showIf: (ctx) => ctx.flags.clue_found === true,
  hideIfVisitedNode: 'next'
}
```

### 증거 획득
```typescript
acquire_clue: {
  choices: [{
    text: '획득',
    nextNode: 'hub',
    onSelect: (ctx) => {
      ctx.flags.clue_found = true;
      ctx.addItem('증거');
    }
  }]
}
```

---

## 📊 프로젝트 통계

| 항목 | 수량 |
|------|------|
| 신규 노드 | 71개 |
| 허브 시스템 | 7개 |
| 조건부 선택지 | 65개 |
| 플래그 | 20개 |
| 엔딩 | 12개 |
| **완성도** | **100%** ✅ |

---

## 🗺️ 7개 허브 시스템

### 1. 지하실 허브 (Basement Hub)
- 의식 도구 조사 → 백작 대화 해금
- `examine_ritual_tools` → `clue_ritual_found` → `count_ritual_confession`

### 2. 여관 허브 (Inn Hub)
- 루시 편지 발견 → 엘렌 각성 체인
- `inn_room_desk` → `has_lucy_letter` → `show_lucy_letter_to_ellen`

### 3. 스탠거슨 허브 (Stangerson Hub)
- 3개 질문 완료 → 증거 제시
- 모든 답변 → 허브 복귀 (무한 루프 방지)

### 4. 엘렌 허브 (Ellen Hub)
- 단서 기반 대화 해금
- 편지 + 기억 → 각성 완료

### 5. 백작 허브 (Count Hub)
- 조건부 질문 5개
- 핵심 질문 완료 → 자백 강제 전환

### 6. 다락방 허브 (Attic Hub)
- 엘렌 첫 만남
- 조사 → 발견 → 대화

### 7. 최종 추리 허브 (Final Deduction Hub)
- 4명 용의자 지목
- 스탠거슨 정답 → 3단계 증거 제시 → 엔딩

---

## ✅ 체크리스트

### 구현 전
- [ ] QUICKSTART_GUIDE.md 읽음
- [ ] 허브-스포크 구조 이해
- [ ] 플래그 시스템 이해

### 구현 중
- [ ] 1층 탐색 시스템
- [ ] 지하실 허브
- [ ] 여관 허브
- [ ] 엘렌 허브
- [ ] 스탠거슨 허브
- [ ] 최종 추리 허브

### 구현 후
- [ ] 무한 루프 없음
- [ ] 조건부 선택지 작동
- [ ] 단서 체인 연결
- [ ] 엔딩 도달 가능

---

## 🚨 흔한 실수 TOP 3

### ❌ 실수 1: 복귀 경로 없음
```typescript
// 나쁜 예
answer: { choices: [] }  // 막힘!

// 좋은 예
answer: {
  choices: [{ text: '돌아간다', nextNode: 'hub' }]
}
```

### ❌ 실수 2: hideIfVisited 누락
```typescript
// 나쁜 예
{ text: '질문', nextNode: 'answer' }  // 무한 반복!

// 좋은 예
{ text: '질문', nextNode: 'answer', hideIfVisitedNode: 'answer' }
```

### ❌ 실수 3: 플래그 이름 불일치
```typescript
// 나쁜 예
onSelect: (ctx) => ctx.flags.clue_found = true
showIf: (ctx) => ctx.flags.clueFound === true  // 다른 이름!

// 좋은 예 (같은 이름!)
onSelect: (ctx) => ctx.flags.clue_found = true
showIf: (ctx) => ctx.flags.clue_found === true
```

---

## 📞 문제 해결

### Q: 선택지가 안 보여요!
```typescript
// 플래그 확인
console.log(context.flags);
console.log(context.items);
```

### Q: 무한 루프에 갇혔어요!
```typescript
// hideIfVisitedNode 추가
{ text: '...', nextNode: '...', hideIfVisitedNode: '...' }
```

### Q: 다음 단계가 안 열려요!
```typescript
// 조건 확인
showIf: (ctx) => {
  console.log('조건 체크:', ctx.flags);
  return ctx.flags.something === true;
}
```

---

## 🎓 학습 경로

### 초급 (1시간)
1. ⏱️ QUICKSTART_GUIDE.md (5분)
2. 🔧 템플릿 테스트 (10분)
3. 🏛️ 1층 탐색 구현 (15분)
4. 🌹 엘렌 허브 구현 (15분)
5. 📚 스탠거슨 허브 구현 (15분)

### 중급 (2시간)
1. 📖 FIGMA_MAKE_INTEGRATION_GUIDE.md (15분)
2. ⬇️ 지하실 허브 (30분)
3. 🏨 여관 허브 (30분)
4. 💬 백작 허브 (30분)
5. 🧪 테스트 (15분)

### 고급 (3시간)
1. ⚖️ 최종 추리 허브 (1시간)
2. 🎭 엔딩 분기 (1시간)
3. 🎮 플레이 테스트 (1시간)

---

## 🌟 핵심 키워드

- **엘렌** = 루시의 딸 (핵심 반전)
- **허브-스포크** = 무한 루프 방지
- **플래그** = 단서 기반 해금
- **hideIfVisited** = 중복 방지
- **showIf** = 조건부 표시
- **onSelect** = 플래그 설정
- **단서 체인** = 조사 → 대화 해금

---

## 🚀 지금 바로 시작!

### 1단계 (5분)
```
📖 QUICKSTART_GUIDE.md 읽기
```

### 2단계 (10분)
```
📖 FIRST_FLOOR_EXPLORATION_GUIDE.md 읽기
```

### 3단계 (30분)
```
💻 IMPLEMENTATION_EXAMPLES.md 코드 복사
```

### 4단계 (완성!)
```
🎉 게임 플레이 테스트
```

---

## 📚 모든 문서

1. **START_HERE.md** ← 지금 여기! ⭐
2. [QUICKSTART_GUIDE.md](/QUICKSTART_GUIDE.md) - 5분 가이드
3. [FIRST_FLOOR_EXPLORATION_GUIDE.md](/FIRST_FLOOR_EXPLORATION_GUIDE.md) - 1층 탐색
4. [FIGMA_MAKE_INTEGRATION_GUIDE.md](/FIGMA_MAKE_INTEGRATION_GUIDE.md) - 전체 구조
5. [IMPLEMENTATION_EXAMPLES.md](/IMPLEMENTATION_EXAMPLES.md) - 코드 예시
6. [FINAL_SYSTEM_COMPLETE.md](/FINAL_SYSTEM_COMPLETE.md) - 완성 보고서
7. [README_INTEGRATION.md](/README_INTEGRATION.md) - 통합 인덱스

---

**프로젝트 상태:** ✅ 완성  
**최종 업데이트:** 2024-12-19  
**버전:** 1.0.0

**Good luck! 🎮**
