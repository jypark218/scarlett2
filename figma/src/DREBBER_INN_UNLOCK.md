# 드레버 만남 후 여관 이동 활성화 완료 ✅

## 📋 요구사항
드레버와 만난 후, 현관 허브에서 여관으로 이동할 수 있는 선택지 활성화

## ✅ 구현 내용

### 수정된 노드들

#### 1. `main_entrance` (첫 현관 진입)
```typescript
choices: [
  { text: '서재를 조사한다', nextNode: 'study_room' },
  { text: '2층으로 올라간다', nextNode: 'upstairs' },
  { text: '뒷뜰을 조사한다', nextNode: 'back_entrance' },
  { text: '근처 여관을 방문한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber' }, // ✅ 추가
  { text: '💎 [2회차+] 홈즈와 심도있는 대화를 나눈다', nextNode: 'holmes_hint_playcount_2', minPlayCount: 1 }
]
```

#### 2. `main_entrance_return_study` (서재 조사 후 복귀)
```typescript
choices: [
  { text: '2층으로 올라간다', nextNode: 'upstairs' },
  { text: '뒷뜰을 조사한다', nextNode: 'back_entrance' },
  { text: '서재로 다시 간다', nextNode: 'study_room_return' },
  { text: '근처 여관을 방문한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber' }, // ✅ 추가
  { text: '💎 [2회차+] 홈즈와 대화한다', nextNode: 'holmes_hint_playcount_2', minPlayCount: 1 }
]
```

#### 3. `main_entrance_return_upstairs` (2층 조사 후 복귀)
```typescript
choices: [
  { text: '🔼 2층으로 다시 올라간다', nextNode: 'upstairs' },
  { text: '서재로 간다', nextNode: 'study_room', hideIfVisitedNode: 'discover_stangerson' },
  { text: '서재로 간다', nextNode: 'study_room_return', requiredVisitedNode: 'discover_stangerson' },
  { text: '뒷뜰로 간다', nextNode: 'back_entrance' },
  { text: '근처 여관을 방문한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber' }, // ✅ 추가
  { text: '💎 [2회차+] 홈즈와 대화한다', nextNode: 'holmes_hint_playcount_2', minPlayCount: 1 }
]
```

#### 4. `main_entrance_return_backyard` (뒷뜰 조사 후 복귀)
```typescript
choices: [
  { text: '서재를 조사한다', nextNode: 'study_room', hideIfVisitedNode: 'discover_stangerson' },
  { text: '서재를 조사한다', nextNode: 'study_room_return', requiredVisitedNode: 'discover_stangerson' },
  { text: '2층으로 올라간다', nextNode: 'upstairs' },
  { text: '뒷뜰로 다시 간다', nextNode: 'back_entrance' },
  { text: '근처 여관을 방문한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber' }, // ✅ 추가
  { text: '💎 [2회차+] 홈즈와 대화한다', nextNode: 'holmes_hint_playcount_2', minPlayCount: 1 }
]
```

---

## 🎮 플레이어 경험 흐름

### Before (기존)
```
[현관] → 2층 → [드레버 만남]
  ↓
[2층 복도] → continue_investigation_2
  ↓
여관 선택지 나타남 (여기서만!)
```

❌ **문제**: 현관으로 돌아오면 여관 선택지가 사라짐

### After (개선)
```
[현관] → 2층 → [드레버 만남]
  ↓
모든 현관 허브에서 여관 선택지 활성화!

[main_entrance] ✅ 여관 이동 가능
[main_entrance_return_study] ✅ 여관 이동 가능
[main_entrance_return_upstairs] ✅ 여관 이동 가능
[main_entrance_return_backyard] ✅ 여관 이동 가능
```

✅ **개선**: 드레버를 만난 후 어느 현관에서든 여관으로 이동 가능

---

## 🔑 조건부 표시 로직

### `requiredVisitedNode: 'meet_drebber'`

- **드레버를 만나기 전**: 여관 선택지 숨김 ❌
- **드레버를 만난 후**: 여관 선택지 표시 ✅

### 왜 이렇게 설계했는가?

1. **스토리 진행 순서 보장**
   - 플레이어가 드레버를 만나기 전에는 여관에 대해 모름
   - 드레버와 대화 후 "그린 라이온 여관"에 대한 정보를 얻음

2. **자연스러운 정보 획득**
   - 드레버: "어젯밤 그린 라이온 여관에 있었어"
   - 왓슨/홈즈: "여관을 조사해야겠군!"
   - → 여관 이동 선택지 활성화

3. **게임플레이 자유도 향상**
   - 드레버를 만난 후에는 언제든 여관 방문 가능
   - 서재 → 현관 → 여관 ✅
   - 2층 → 현관 → 여관 ✅
   - 뒷뜰 → 현관 → 여관 ✅

---

## 📊 이미 구현되어 있던 곳

### `continue_investigation_2` (2층 복도)
```typescript
// /data/story/locations/investigation-hub.ts
choices: [
  { text: '드레버에게 다시 질문한다', nextNode: 'meet_drebber' },
  { text: '침실을 조사한다', nextNode: 'bedroom' },
  { text: '1층으로 내려간다', nextNode: 'main_entrance_return_upstairs' },
  { text: '근처 여관을 방문한다', nextNode: 'inn_entrance' }  // 이미 있었음
]
```

**특징**: 조건 없이 항상 표시됨
- 이유: `continue_investigation_2`는 드레버와 대화한 직후이므로 이미 여관 정보를 알고 있음

---

## 🎯 수정된 파일

### `/data/story/locations/main-hub.ts`
- 모든 현관 허브 노드에 여관 선택지 추가
- `requiredVisitedNode: 'meet_drebber'` 조건 추가

---

## 🧪 테스트 시나리오

### 시나리오 1: 드레버 만나기 전
1. 게임 시작 → `main_entrance`
2. **확인**: 여관 선택지 없음 ❌
3. 서재 조사 → `main_entrance_return_study`
4. **확인**: 여관 선택지 없음 ❌

### 시나리오 2: 드레버 만난 후
1. 2층 이동 → `upstairs` → `meet_drebber`
2. 드레버와 대화 완료
3. 1층으로 내려옴 → `main_entrance_return_upstairs`
4. **확인**: "근처 여관을 방문한다" 선택지 표시 ✅
5. 여관 이동 → `inn_entrance`

### 시나리오 3: 뒷뜰 조사 후
1. 드레버를 만남 (이미 방문함)
2. 뒷뜰 조사 → `back_entrance`
3. 현관 복귀 → `main_entrance_return_backyard`
4. **확인**: "근처 여관을 방문한다" 선택지 표시 ✅

### 시나리오 4: 여관 방문 후 복귀
1. 여관 방문 → `inn_entrance` → `inn_leave`
2. `inn_leave`에서 "저택으로 돌아간다" 선택
3. `main_entrance` (또는 다른 허브)로 이동
4. **확인**: 다시 여관 선택지 표시 ✅ (재방문 가능)

---

## 💡 추가 개선 가능 사항 (선택)

### 1. 여관 선택지 텍스트 변경 (선택)
```typescript
// 첫 방문
{ text: '🏠 [새로운 단서] 그린 라이온 여관을 조사한다', nextNode: 'inn_entrance', requiredVisitedNode: 'meet_drebber', hideIfVisitedNode: 'inn_entrance' }

// 재방문
{ text: '그린 라이온 여관으로 돌아간다', nextNode: 'inn_entrance', requiredVisitedNode: 'inn_entrance' }
```

### 2. 홈즈의 힌트 추가 (선택)
```typescript
// main_entrance_return_upstairs 텍스트 수정
text: '1층 현관으로 돌아왔다. 2층에서 중요한 단서들을 발견했다.\\n\\n홈즈가 말한다. "드레버가 말한 그린 라이온 여관... 그곳도 조사해봐야겠어."'
```

---

## ✅ 완료 체크리스트

- [x] `main_entrance`에 여관 선택지 추가
- [x] `main_entrance_return_study`에 여관 선택지 추가
- [x] `main_entrance_return_upstairs`에 여관 선택지 추가
- [x] `main_entrance_return_backyard`에 여관 선택지 추가
- [x] 모든 선택지에 `requiredVisitedNode: 'meet_drebber'` 조건 추가
- [x] 문서화 완료

**드레버 만남 후 여관 이동 활성화가 완료되었습니다!** 🎉
