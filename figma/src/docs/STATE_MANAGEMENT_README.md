# 상태 관리 시스템 - 빠른 시작 가이드

> 📘 **TL;DR**: 게임의 상태 충돌을 방지하고 조건문을 명확하게 만드는 시스템입니다.

---

## 🚀 5분 만에 시작하기

### 1. 기본 개념

```typescript
// ❌ 문제: Trust와 Betrayal이 동시에 true가 될 수 있음
visitedNodes.includes('hope_trusts') && visitedNodes.includes('hope_betrays')

// ✅ 해결: stateValidator.ts에 정의하면 자동으로 검증됨
export const MUTUALLY_EXCLUSIVE_GROUPS = {
  hope_relationship: ['hope_trusts', 'hope_betrays']
};
```

### 2. 우선순위로 조건 관리

```typescript
// ❌ 문제: 두 조건 모두 만족하면 어떤 텍스트가 나올지 불명확
conditionalText: [
  { condition: { hasItem: 'key' }, text: '열쇠가 있다' },
  { condition: { visitedNode: 'room' }, text: '방을 봤다' }
]

// ✅ 해결: priority 추가
conditionalText: [
  { 
    condition: { hasItem: 'key', visitedNode: 'room' }, 
    text: '열쇠도 있고 방도 봤다',
    priority: 100 // 최우선
  },
  { 
    condition: { hasItem: 'key' }, 
    text: '열쇠가 있다',
    priority: 50
  },
  { 
    condition: { visitedNode: 'room' }, 
    text: '방을 봤다',
    priority: 10
  }
]
```

### 3. 개발 모드에서 자동 검증

```typescript
// GameScreen.tsx에 이미 적용되어 있음
// 콘솔을 확인하면 됩니다!

// ✅ 검증 통과
✅ [상태 검증 통과] 노드 study_room

// ⚠️ 경고 (권장사항)
⚠️ [상태 검증 경고] 노드 night_scene:
  - [시간대 검증] 선행 노드를 방문하지 않았습니다

// ❌ 오류 (수정 필요)
❌ [상태 검증 오류] 노드 ending:
  - [hope_relationship] 상호 배타적인 상태가 동시에 활성화됨
```

---

## 📁 파일 구조

```
/utils/game/
└── stateValidator.ts          # ⭐ 여기에 규칙 정의

/docs/
├── STATE_MANAGEMENT_GUIDE.md    # 📖 완전한 가이드
└── STATE_MANAGEMENT_EXAMPLES.md # 💡 실전 예제

/components/
└── GameScreen.tsx             # 이미 검증이 통합되어 있음

/types/
└── story.ts                   # priority 타입 정의 추가됨
```

---

## 🎯 핵심 기능 3가지

### 1. 상호 배타적 상태 그룹

**언제 사용?**  
- 두 상태가 동시에 true가 되면 안 될 때
- 예: 신뢰/배신, 생존/사망, 구출/희생

**어떻게?**
```typescript
// stateValidator.ts에 추가
export const MUTUALLY_EXCLUSIVE_GROUPS = {
  내그룹이름: ['상태A', '상태B', '상태C']
};
```

### 2. 조건 우선순위

**언제 사용?**  
- 여러 조건이 동시에 만족될 수 있을 때
- 더 구체적인 조건이 우선되어야 할 때

**어떻게?**
```typescript
conditionalText: [
  { condition: {...}, text: '...', priority: 100 }, // 높을수록 우선
  { condition: {...}, text: '...', priority: 50 }
]
```

### 3. 시간대/아이템 검증

**언제 사용?**  
- 선행 조건이 필요한 이벤트
- 아이템 획득 순서가 중요할 때

**어떻게?**
```typescript
// stateValidator.ts에 추가
export const TIME_BASED_REQUIREMENTS = {
  night: { requiredVisitedAny: ['오후이벤트1', '오후이벤트2'] }
};

export const ITEM_DEPENDENCY_CHAIN = {
  '선행아이템': ['후행아이템']
};
```

---

## 📖 더 알아보기

| 문서 | 내용 | 난이도 |
|------|------|--------|
| [STATE_MANAGEMENT_GUIDE.md](./STATE_MANAGEMENT_GUIDE.md) | 완전한 개념 설명 및 사용법 | ⭐⭐ |
| [STATE_MANAGEMENT_EXAMPLES.md](./STATE_MANAGEMENT_EXAMPLES.md) | 실전 예제 5가지 | ⭐⭐⭐ |
| [STATE_MANAGEMENT_IMPROVEMENT_SUMMARY.md](../STATE_MANAGEMENT_IMPROVEMENT_SUMMARY.md) | 개선 내역 보고서 | ⭐ |

---

## 💡 자주 묻는 질문

**Q: 기존 코드를 바꿔야 하나요?**  
A: 아니요. 새로운 기능은 선택사항입니다.

**Q: 성능에 영향이 있나요?**  
A: 없습니다. 개발 모드에서만 실행됩니다.

**Q: priority는 모든 conditionalText에 필요한가요?**  
A: 아니요. 조건이 겹칠 ���만 추가하면 됩니다.

---

## 🎮 실전 팁

### 패턴 1: 관계 분기
```typescript
// 노드 ID로 상태 관리
const trustPath = { id: 'hope_trust_path', ... };
const betrayPath = { id: 'hope_betray_path', ... };

// 나중에 조건으로 사용
conditionalText: [
  { condition: { visitedNode: 'hope_trust_path' }, text: '신뢰 대사' }
]
```

### 패턴 2: 복합 엔딩
```typescript
conditionalText: [
  { 
    condition: { visitedAll: ['A', 'B'], hasItem: 'key' },
    text: 'TRUE END',
    priority: 1000 // 최우선
  },
  { 
    condition: { visitedNode: 'A' },
    text: 'GOOD END',
    priority: 500
  }
]
```

### 패턴 3: 시간대 분기
```typescript
// stateValidator.ts
TIME_BASED_REQUIREMENTS = {
  night: { requiredVisitedAny: ['evening_event'] }
};

// 시나리오
const nightNode = {
  timeOfDay: 'night',
  // 자동으로 검증됨!
};
```

---

## 🔧 체크리스트

### 새 시나리오 작성 시

- [ ] 상호 배타적 상태가 있나요? → `stateValidator.ts`에 그룹 추가
- [ ] 조건이 겹칠 수 있나요? → `priority` 추가
- [ ] 시간대 순서가 있나요? → `TIME_BASED_REQUIREMENTS` 추가
- [ ] 아이템 순서가 있나요? → `ITEM_DEPENDENCY_CHAIN` 추가
- [ ] 개발 모드에서 테스트했나요? → 콘솔 확인

---

## 🎓 학습 경로

1. **초급**: 이 README 읽��� (5분)
2. **중급**: [STATE_MANAGEMENT_GUIDE.md](./STATE_MANAGEMENT_GUIDE.md) (15분)
3. **고급**: [STATE_MANAGEMENT_EXAMPLES.md](./STATE_MANAGEMENT_EXAMPLES.md) (30분)
4. **실전**: 자신의 시나리오에 적용

---

**시작일**: 2025-12-19  
**버전**: 1.0.0  
**상태**: ✅ 사용 가능

> 💬 질문이나 피드백은 프로젝트 이슈에 등록해주세요!
