# ⚡ 빠른 시작 가이드
## 피그마 메이크 5분 통합

> 가장 중요한 3가지만 구현하면 게임이 작동합니다!

---

## 🎯 핵심 3대 원칙

### 1️⃣ 허브-스포크 구조
```
[허브] → [질문1] → [허브]
   ↓        ↑
[질문2] ←┘
```

**규칙:** 모든 대화는 허브로 복귀!

### 2️⃣ 플래그 기반 해금
```
조사 노드 → 플래그 설정 → 대화 선택지 활성화
```

**규칙:** 단서를 찾으면 새 대화가 열림!

### 3️⃣ hideIfVisited
```
{
  text: "질문",
  nextNode: "answer",
  hideIfVisitedNode: "answer"  // 한 번만!
}
```

**규칙:** 같은 질문 반복 금지!

---

## 🚀 5분 체크리스트

### ✅ 1단계: 지하실 허브 (30초)

```typescript
basement_hub: {
  id: 'basement_hub',
  choices: [
    { text: '조사', nextNode: 'examine_ritual_tools', hideIfVisitedNode: 'examine_ritual_tools' },
    { text: '나간다', nextNode: 'main_entrance' }
  ]
}

examine_ritual_tools: {
  id: 'examine_ritual_tools',
  choices: [
    { 
      text: '획득', 
      nextNode: 'basement_hub',  // 허브로!
      onSelect: (ctx) => ctx.flags.clue_ritual_found = true 
    }
  ]
}
```

### ✅ 2단계: 여관 허브 (30초)

```typescript
inn_drebber_room: {
  id: 'inn_drebber_room',
  choices: [
    { text: '책상', nextNode: 'inn_room_desk', hideIfVisitedNode: 'inn_room_desk' },
    { text: '나간다', nextNode: 'inn_entrance' }
  ]
}

inn_room_desk: {
  id: 'inn_room_desk',
  choices: [
    { 
      text: '편지 획득', 
      nextNode: 'inn_drebber_room',  // 허브로!
      onSelect: (ctx) => ctx.addItem('루시의 편지')
    }
  ]
}
```

### ✅ 3단계: 엘렌 허브 (1분)

```typescript
ellen_hub: {
  id: 'ellen_hub',
  choices: [
    { 
      text: '편지 보여주기', 
      nextNode: 'show_lucy_letter_to_ellen',
      showIf: (ctx) => ctx.items.includes('루시의 편지'),  // 조건!
      hideIfVisitedNode: 'show_lucy_letter_to_ellen'
    },
    { text: '나간다', nextNode: 'bedroom' }
  ]
}

show_lucy_letter_to_ellen: {
  id: 'show_lucy_letter_to_ellen',
  choices: [
    { 
      text: '계속', 
      nextNode: 'ellen_hub',  // 허브로!
      onSelect: (ctx) => ctx.flags.ellen_awakened = true
    }
  ]
}
```

### ✅ 4단계: 스탠거슨 허브 (1분)

```typescript
stangerson_hub: {
  id: 'stangerson_hub',
  choices: [
    { text: '질문1', nextNode: 'q1', hideIfVisitedNode: 'q1' },
    { text: '질문2', nextNode: 'q2', hideIfVisitedNode: 'q2' },
    { text: '질문3', nextNode: 'q3', hideIfVisitedNode: 'q3' },
    { 
      text: '추궁', 
      nextNode: 'confront',
      showIf: (ctx) => ['q1','q2','q3'].every(n => ctx.visitedNodes.includes(n))  // 모두 완료!
    },
    { text: '나간다', nextNode: 'study' }
  ]
}

// 모든 질문 노드
q1: { choices: [{ text: '돌아간다', nextNode: 'stangerson_hub' }] }
q2: { choices: [{ text: '돌아간다', nextNode: 'stangerson_hub' }] }
q3: { choices: [{ text: '돌아간다', nextNode: 'stangerson_hub' }] }
```

### ✅ 5단계: 최종 추리 (2분)

```typescript
final_deduction_hub: {
  id: 'final_deduction_hub',
  choices: [
    { text: '호프 지목', nextNode: 'accuse_hope', hideIfVisitedNode: 'accuse_hope' },
    { text: '드레버 지목', nextNode: 'accuse_drebber', hideIfVisitedNode: 'accuse_drebber' },
    { text: '스탠거슨 지목', nextNode: 'accuse_stangerson', hideIfVisitedNode: 'accuse_stangerson' },
    { text: '백작 지목', nextNode: 'accuse_count', hideIfVisitedNode: 'accuse_count' }
  ]
}

accuse_stangerson: {
  id: 'accuse_stangerson',
  text: "정답입니다!",
  choices: [
    { text: '추궁', nextNode: 'confront_stangerson' }
  ]
}
```

---

## 🔥 즉시 적용 템플릿

### 새 허브 만들기 (10초)

```typescript
new_hub: {
  id: 'new_hub',
  choices: [
    { text: '행동1', nextNode: 'action1', hideIfVisitedNode: 'action1' },
    { text: '행동2', nextNode: 'action2', hideIfVisitedNode: 'action2' },
    { text: '나간다', nextNode: 'parent_hub' }
  ]
}

action1: {
  id: 'action1',
  choices: [{ text: '돌아간다', nextNode: 'new_hub' }]  // 허브로!
}
```

### 조건부 선택지 (5초)

```typescript
{
  text: '단서 필요',
  nextNode: 'next',
  showIf: (ctx) => ctx.flags.found_clue === true,
  hideIfVisitedNode: 'next'
}
```

### 증거 획득 (5초)

```typescript
acquire_evidence: {
  id: 'acquire_evidence',
  choices: [{
    text: '획득',
    nextNode: 'return_hub',
    onSelect: (ctx) => {
      ctx.flags.evidence_found = true;
      ctx.addItem('증거 이름');
    }
  }]
}
```

---

## ⚠️ 흔한 실수 TOP 3

### ❌ 실수 1: 복귀 경로 없음
```typescript
// 나쁜 예
answer: {
  choices: []  // 막힘!
}

// 좋은 예
answer: {
  choices: [
    { text: '돌아간다', nextNode: 'hub' }  // 허브로!
  ]
}
```

### ❌ 실수 2: hideIfVisited 누락
```typescript
// 나쁜 예
{
  text: '질문',
  nextNode: 'answer'  // 무한 반복!
}

// 좋은 예
{
  text: '질문',
  nextNode: 'answer',
  hideIfVisitedNode: 'answer'  // 한 번만!
}
```

### ❌ 실수 3: 플래그 이름 불일치
```typescript
// 나쁜 예
onSelect: (ctx) => ctx.flags.clue_found = true
showIf: (ctx) => ctx.flags.clueFound === true  // 다른 이름!

// 좋은 예
onSelect: (ctx) => ctx.flags.clue_found = true
showIf: (ctx) => ctx.flags.clue_found === true  // 같은 이름!
```

---

## 📋 최종 체크리스트

복사해서 사용하세요!

```
□ 모든 대화 노드는 허브로 복귀하는가?
□ 모든 선택지에 hideIfVisitedNode가 있는가?
□ 조건부 선택지에 showIf가 정확한가?
□ 플래그 이름이 일치하는가?
□ 아이템 이름이 일치하는가?
□ 진입 조건이 명확한가?
□ 출구가 보장되는가?
```

---

## 🎓 학습 경로

1. **5분:** 이 가이드 읽기
2. **10분:** 템플릿 1개 복사해서 테스트
3. **30분:** 지하실 + 여관 + 엘렌 허브 구현
4. **1시간:** 스탠거슨 + 최종 추리 구현
5. **완성:** 🎉

---

## 📞 빠른 도움말

### Q1: 선택지가 안 보여요!
```typescript
// 플래그 확인
console.log(context.flags);  // 플래그 출력
console.log(context.items);  // 아이템 출력
```

### Q2: 무한 루프에 갇혔어요!
```typescript
// hideIfVisitedNode 추가
{
  text: '...',
  nextNode: '...',
  hideIfVisitedNode: '...'  // 이거!
}
```

### Q3: 다음 단계가 안 열려요!
```typescript
// 조건 확인
showIf: (ctx) => {
  console.log('조건 체크:', ctx.flags, ctx.items);
  return ctx.flags.something === true;
}
```

---

**시작하세요!** 5분이면 충분합니다. 🚀
