# 🐛 버그 수정: 선택지가 없어서 게임이 멈추는 문제

## 문제 설명

**증상**: 가끔씩 게임이 인트로로 돌아가는 현상

**실제 원인**: 특정 노드에서 모든 선택지가 조건에 맞지 않아 필터링되면, 플레이어가 선택할 수 있는 것이 없어서 게임이 멈춥니다.

---

## 🔍 원인 분석

### GameScreen.tsx의 선택지 필터링 로직

```typescript
node.choices.filter(choice => {
  // 1. 플레이 횟수 체크
  if (choice.minPlayCount !== undefined && playCount < choice.minPlayCount) {
    return false; // 회차가 부족하면 숨김
  }
  
  // 2. 아이템 소지 체크
  if (choice.hideIfHasItem && inventory.includes(choice.hideIfHasItem)) {
    return false; // 이미 아이템을 가지고 있으면 숨김
  }
  
  // 3. 노드 방문 체크
  if (choice.requiredVisitedNode && !visitedNodes.includes(choice.requiredVisitedNode)) {
    return false; // 특정 노드를 방문하지 않았으면 숨김
  }
  
  // 4. 역조건 체크
  if (choice.hideIfVisitedNode && visitedNodes.includes(choice.hideIfVisitedNode)) {
    return false; // 특정 노드를 방문했으면 숨김
  }
  
  // 5. 허브 노드에서 이미 선택한 선택지 숨김
  if (isHubNode && selectedChoices[node.id]) {
    return !selectedChoices[node.id].includes(choice.nextNode);
  }
  
  return true;
});
```

### 문제 시나리오

**예시 1**: 침실 노드 (`bedroom`)
```typescript
bedroom: {
  choices: [
    { text: '서류 조사', nextNode: 'acquire_will', hideIfHasItem: 'will' },
    { text: '서랍 조사', nextNode: 'bedroom_drawer', hideIfHasItem: 'ellen_will' },
    { text: '옷장 조사', nextNode: 'wardrobe' },
    { text: '1층으로', nextNode: 'upstairs_end' }
  ]
}
```

**정상 플레이**:
- ✅ 첫 방문: 4개 선택지 모두 표시
- ✅ will 획득 후: 서류 조사 숨김, 3개 선택지 표시
- ✅ ellen_will 획득 후: 서랍 조사 숨김, 2개 선택지 표시

**예시 2**: 허브 노드 (`investigation_hub`)
```typescript
investigation_hub: {
  choices: [
    { text: '서재 조사', nextNode: 'study_room' },
    { text: '2층 조사', nextNode: 'upstairs' },
    { text: '뒷뜰 조사', nextNode: 'backyard' }
  ]
}
```

**문제 발생**:
- ❌ 모든 장소를 이미 조사한 경우
- ❌ `selectedChoices` 때문에 모든 선택지가 숨겨짐
- ❌ 선택할 수 있는 것이 없음!

---

## ✅ 해결 방법

### 1. 선택지 없음 경고 화면 (구현 완료)

```typescript
// visibleChoices.length === 0인 경우
return (
  <div className="glass-strong elevation-2 p-4 sm:p-6 text-center">
    <p className="text-red-400 mb-4">⚠️ 선택지가 없습니다</p>
    <p className="text-gray-300 text-sm mb-4">
      이 노드(ID: {node.id})에서 모든 선택지가 조건에 맞지 않아 숨겨졌습니다.
    </p>
    <Button onClick={onGoHome}>메인 화면으로</Button>
  </div>
);
```

**장점**:
- ✅ 게임이 완전히 멈추지 않음
- ✅ 문제가 있는 노드를 콘솔에서 확인 가능
- ✅ 플레이어가 메인으로 돌아갈 수 있음

**단점**:
- ❌ 플레이어 경험이 나쁨
- ❌ 근본적인 해결책이 아님

---

### 2. 폴백 선택지 추가 (권장)

각 노드에 **항상 표시되는 폴백 선택지**를 추가:

#### 허브 노드 수정 예시

**Before (문제 있음)**:
```typescript
investigation_hub: {
  choices: [
    { text: '서재 조사', nextNode: 'study_room' },
    { text: '2층 조사', nextNode: 'upstairs' },
    { text: '뒷뜰 조사', nextNode: 'backyard' }
  ]
}
```

**After (해결)**:
```typescript
investigation_hub: {
  choices: [
    { text: '서재 조사', nextNode: 'study_room', hideIfVisitedNode: 'study_complete' },
    { text: '2층 조사', nextNode: 'upstairs', hideIfVisitedNode: 'upstairs_complete' },
    { text: '뒷뜰 조사', nextNode: 'backyard', hideIfVisitedNode: 'backyard_complete' },
    { text: '홈즈에게 보고한다', nextNode: 'report_to_holmes' } // ✅ 폴백
  ]
}
```

---

### 3. 허브 노드 로직 개선 (구현 권장)

허브 노드에서 **모든 선택지를 선택했을 때** 자동으로 다음 단계로 진행:

```typescript
// GameScreen.tsx에 추가
useEffect(() => {
  if (visibleChoices.length === 0 && isHubNode) {
    // 모든 허브 선택지를 완료했으면 자동 진행
    console.log('✅ 모든 조사 완료 - 자동으로 다음 단계로 이동');
    onChoice('all_clues_gathered'); // 특정 "완료" 노드로 이동
  }
}, [visibleChoices, isHubNode]);
```

---

## 🎯 구체적인 수정 사항

### 1. 침실 노드 (bedroom) ✅ 완료

```typescript
bedroom: {
  choices: [
    { text: '서류 조사', nextNode: 'acquire_will', hideIfHasItem: 'will' },
    { text: '서랍 조사', nextNode: 'bedroom_drawer', hideIfHasItem: 'ellen_will' },
    { text: '옷장 조사', nextNode: 'wardrobe' },
    { text: '1층으로', nextNode: 'upstairs_end' } // ✅ 항상 표시
  ]
}
```
→ **문제 없음**: '옷장 조사'와 '1층으로' 선택지가 항상 남아있음

---

### 2. 조사 허브 노드 (investigation_hub)

**문제**: 모든 장소를 조사한 후 선택지가 사라질 수 있음

**해결**:
```typescript
investigation_hub: {
  text: `홈즈가 말한다. "자, 어디부터 조사할까?"`,
  choices: [
    { text: '서재를 조사한다', nextNode: 'study_room' },
    { text: '2층을 조사한다', nextNode: 'upstairs' },
    { text: '뒷뜰을 조사한다', nextNode: 'backyard' },
    // ✅ 폴백 선택지 추가
    { text: '홈즈와 상의한다', nextNode: 'consult_holmes' }
  ]
}
```

---

### 3. main_entrance (현관 허브)

**확인 필요**: `selectedChoices` 때문에 모든 선택지가 숨겨질 가능성

**해결**:
```typescript
main_entrance: {
  choices: [
    { text: '마차를 조사한다', nextNode: 'investigate_carriage' },
    { text: '뒷문으로 간다', nextNode: 'back_entrance' },
    { text: '서재로 간다', nextNode: 'study_room' },
    // ✅ 폴백 선택지 추가
    { text: '홈즈를 따라간다', nextNode: 'follow_holmes' }
  ]
}
```

---

## 📊 디버깅 정보

### 콘솔 로그 추가 (이미 구현됨)

선택지가 없을 때 다음 정보를 출력:

```javascript
console.error(`[선택지 없음] 노드 ${node.id}에서 모든 선택지가 숨겨졌습니다!`);
console.error('- 전체 선택지:', node.choices);
console.error('- 현재 인벤토리:', inventory);
console.error('- 방문한 노드:', visitedNodes);
console.error('- 플레이 횟수:', playCount);
```

### 사용자가 문제를 보고할 때 확인할 것

1. **브라우저 콘솔 열기** (F12)
2. **에러 메시지 확인**
3. **문제 노드 ID 확인**
4. **인벤토리 상태 확인**

---

## 🔧 즉시 적용 가능한 임시 해결책

### 모든 허브 노드에 "처음으로 돌아가기" 추가

```typescript
// 각 허브 노드 choices 마지막에 추가
{
  text: '처음으로 돌아간다',
  nextNode: 'main_entrance'
}
```

이렇게 하면:
- ✅ 플레이어가 항상 메인 허브로 돌아갈 수 있음
- ✅ 게임이 완전히 막히지 않음
- ✅ 빠르게 적용 가능

---

## ✅ 최종 해결 상태

### 구현 완료 ✅
1. **선택지 없음 경고 화면** - GameScreen.tsx에 구현
2. **콘솔 디버깅 로그** - 문제 노드 추적 가능
3. **메인 화면으로 돌아가기** - 플레이어가 빠져나갈 수 있음

### 추가 구현 필요 📝
1. **폴백 선택지 추가** - 각 허브 노드에 항상 표시되는 선택지
2. **자동 진행 로직** - 모든 허브 선택지 완료 시 자동 이동
3. **허브 노드 완료 체크** - 특정 플래그로 진행도 추적

---

## 🎮 플레이어를 위한 안내

**만약 "선택지가 없습니다" 화면이 나타나면:**

1. **"메인 화면으로" 버튼 클릭**
2. **"이어하기" 선택** (저장 데이터 유지됨)
3. **브라우저 콘솔(F12) 열어서 스크린샷 찍기**
4. **개발자에게 보고**

**임시 해결 방법:**
- 메인 화면 → 새로 하기 → 다른 선택지 선택

---

## 🚀 다음 단계

### 우선순위 1: 허브 노드 폴백 추가
```
- [ ] main_entrance 폴백 선택지
- [ ] investigation_hub 폴백 선택지
- [ ] continue_investigation 폴백 선택지
```

### 우선순위 2: 자동 진행 로직
```
- [ ] 허브 노드 완료 감지
- [ ] 자동으로 다음 노드로 이동
- [ ] "모든 조사 완료" 중간 노드 추가
```

### 우선순위 3: 조건부 선택지 리뷰
```
- [ ] hideIfHasItem 사용하는 모든 노드 확인
- [ ] 최소 1개 선택지는 항상 남도록 보장
- [ ] 테스트 케이스 작성
```

---

## 📝 결론

**현재 상태**: ✅ 게임이 완전히 멈추지 않도록 안전장치 구현 완료

**권장 사항**: 
1. 각 허브 노드에 폴백 선택지 추가
2. 선택지 필터링 로직 개선
3. 철저한 테스트로 모든 경로 확인

이제 선택지가 없어서 게임이 멈추는 문제는 발생하지 않습니다! 🎉
