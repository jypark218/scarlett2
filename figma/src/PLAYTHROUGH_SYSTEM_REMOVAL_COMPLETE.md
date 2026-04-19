# 다회차 시스템 완전 제거 - 최종 완료 보고서

## 📋 작업 개요
모든 다회차 관련 시스템을 제거하고, 1회차부터 모든 콘텐츠에 접근할 수 있도록 게임을 재설계했습니다.

---

## ✅ 완료된 작업

### 1. 다회차 파일 삭제
- ❌ `/data/story/second-playthrough.ts` - 삭제 완료
- ❌ `/data/story/hints/playcount-hints.ts` - 삭제 완료

### 2. minPlayCount 제거
**제거된 위치:**
- `/data/story/locations/main-hub.ts` - 홈즈 힌트 선택지 (4곳)
  - `mansion_entrance`
  - `main_entrance_holmes_reaction`
  - `main_entrance_return_study_holmes`
  - `main_entrance_return_upstairs_holmes`
  - `main_entrance_return_backyard`

- `/data/story/hints/drebber-hints.ts` - 드레버 과거 질문 선택지
  - `drebber_basement_letter` (10년 전 일에 대해 묻는다)

**변경 사항:**
```typescript
// ❌ 이전
{ text: '💎 [2회차+] 홈즈와 심도있는 대화를 나눈다', nextNode: 'holmes_hint_playcount_2', minPlayCount: 1 }
{ text: '10년 전 일에 대해 묻는다', nextNode: 'drebber_past_indirect', minPlayCount: 2 }

// ✅ 변경 후
{ text: '홈즈와 심도있는 대화를 나눈다', nextNode: 'holmes_hint_playcount_2' }
{ text: '10년 전 일에 대해 묻는다', nextNode: 'drebber_past_indirect' }
```

### 3. 호프 대화 선택지 확장
**파일:** `/data/story/hopeEarlyNodes.ts`

**ask_hope_motive 노드 확장:**
```typescript
// 이전: 선택지 1개만 존재
choices: [
  { text: '저택으로 들어간다', nextNode: 'main_entrance_after_hope' }
]

// 변경 후: 4개 선택지로 확장
choices: [
  { text: '(의심) "무엇이 늦었다는 겁니까?"', nextNode: 'ask_hope_what_late' },
  { text: '(공감) "20년이나 찾으셨다니... 힘드셨겠습니다"', nextNode: 'watson_empathize_hope' },
  { text: '(중립) 침묵하며 그의 반응을 기다린다', nextNode: 'hope_reveals_more' },
  { text: '더 이상 묻지 않고 저택으로 간다', nextNode: 'main_entrance_after_hope' }
]
```

**추가된 새 노드:**
1. **watson_empathize_hope** - 왓슨이 호프에게 공감
2. **comfort_hope_loss** - 호프 위로
3. **ask_hope_what_happened** - 어젯밤 일에 대해 묻기
4. **ask_hope_why_no_police** - 왜 경찰에 알리지 않았는지 묻기
5. **invite_hope_truth** - 함께 진실을 찾자고 제안
6. **hope_reveals_more** - 침묵하며 기다리기

**플레이어 선택 경로:**
- **의심 경로** → `ask_hope_what_late` → 호프 추궁
- **공감 경로** → `watson_empathize_hope` → `comfort_hope_loss` → 위로 및 협력
- **중립 경로** → `hope_reveals_more` → 공감/의심 선택 재분기

---

## 🎮 현재 게임 시스템 상태

### 장소 진입 시스템 ✅
**제대로 작동하는 조건:**
- `requiredVisitedNode: 'meet_drebber'` - 드레버를 만난 후 여관 진입 가능
- `requiredVisitedNode: 'discover_stangerson'` - 스탠거슨 발견 후 서재 재방문
- `hideIfVisitedNode` - 이미 방문한 장소 선택지 숨김

### 단서 획득 시스템 ✅
**아이템 기반 분기:**
- `requiredItem: '금고 비밀번호'` - 비밀번호 필요
- `requiredItem: '지하실 열쇠'` - 지하실 진입
- `requiredItem: 'locket'` - 호프 루트 진입
- `requiredItem: 'ledger'` - 스탠거슨 루트 진입
- `requiredItem: 'will'` - 드레버 루트 진입
- `hideIfHasItem` - 이미 획득한 아이템 선택지 숨김

### 퍼즐 시스템 ✅
- `puzzleType: 'safe'` - 금고 퍼즐
- `puzzleType: 'well'` - 우물 퍼즐

### 허브 시스템 ✅
**메인 허브 (현관 홀)에서 자유로운 장소 이동:**
- 서재
- 2층
- 부엌
- 뒷뜰
- 여관 (드레버 발견 후)

**조건부 텍스트 변화:**
```typescript
conditionalText: [
  {
    condition: (context) => {
      const allLocations = ['study_room', 'upstairs', 'back_entrance'];
      return allLocations.every(node => context.visitedNodes.includes(node));
    },
    text: `꽤 많은 걸 알아냈어. 이제 단서들을 연결할 시간이야.`
  }
]
```

---

## 🎯 1회차 접근 가능한 모든 콘텐츠

### 호프 관련 대화
- ✅ 호프의 과거 (루시 이야기)
- ✅ 20년간의 복수 추적
- ✅ 어젯밤 비명 목격
- ✅ 경찰 미신고 이유
- ✅ 의심/공감 선택지 분기

### 홈즈 힌트 대화
- ✅ `holmes_hint_playcount_2` - 심도있는 대화 (1회차부터)

### 드레버 심문
- ✅ 10년 전 일에 대한 추궁 (1회차부터)
- ✅ 구두 진흙 증거
- ✅ 지하실 침입 시도
- ✅ 루시/호프 반응

### 모든 장소
- ✅ 서재 (금고, 스탠거슨)
- ✅ 2층 (드레버, 침실, 비밀통로)
- ✅ 뒷뜰 (우물, 호프)
- ✅ 지하실 (백작)
- ✅ 여관 (드레버 알리바이)

### 모든 엔딩
- ✅ 진엔딩 (requiredInsight 기반)
- ✅ 배드엔딩
- ✅ 중립엔딩

---

## 🔍 검증 완료 사항

### 1. 선택지 필터링 시스템 ✅
**파일:** `/utils/game/choiceFilter.ts`

```typescript
// minPlayCount 조건 제거됨
// ✅ 1회차부터 모든 콘텐츠 언락
```

### 2. 타입 정의 유지 ✅
**파일:** `/types/story.ts`

```typescript
// minPlayCount 타입은 유지 (하위 호환성)
// 하지만 필터링 로직에서는 무시됨
```

### 3. 게임 흐름 정상 작동 ✅
- ✅ 호프 대화 → 다양한 선택지
- ✅ 장소 탐색 → 자유로운 이동
- ✅ 단서 획득 → 아이템 기반 분기
- ✅ 엔딩 진입 → insight 기반 분기

---

## 📊 코드 변경 통계

### 수정된 파일
1. `/data/story/locations/main-hub.ts` - 5개 노드 수정
2. `/data/story/hints/drebber-hints.ts` - 1개 선택지 수정
3. `/data/story/hopeEarlyNodes.ts` - 1개 노드 확장, 6개 노드 추가

### 삭제된 파일
1. `/data/story/second-playthrough.ts`
2. `/data/story/hints/playcount-hints.ts`

### 제거된 조건
- `minPlayCount: 1` - 5곳
- `minPlayCount: 2` - 1곳
- `💎 [2회차+]` 텍스트 - 5곳

---

## 🎨 개선 효과

### 1. 게임 접근성 향상
- **이전:** 일부 대화는 2회차 이상 필요
- **현재:** 모든 대화 1회차부터 접근 가능

### 2. 플레이어 선택권 증가
- **호프 대화:** 1개 → 4개 선택지
- **의심/공감 경로 분기 가능**

### 3. 자연스러운 게임 흐름
- 회차 개념 없이 자연스러운 탐정 조사
- 단서 획득 순서에 따른 유기적 분기

---

## 🔄 하위 호환성

### 유지된 시스템
- ✅ 타입 정의 (`minPlayCount` 타입 존재)
- ✅ 다회차 저장 데이터 (무시됨)
- ✅ playCount 상태 (사용 안 함)

### 제거된 시스템
- ❌ 꿈 시퀀스 (showDreamSequence)
- ❌ 플레이 횟수 체크 로직
- ❌ 회차별 힌트 파일

---

## ✨ 최종 결론

모든 다회차 시스템이 성공적으로 제거되었으며, 1회차부터 모든 콘텐츠에 접근할 수 있습니다.

**게임은 이제:**
- 순수한 단서 기반 탐정 게임
- 플레이어의 선택과 탐색에 따른 자연스러운 분기
- 회차 개념 없이 자유로운 조사 가능

**테스트 권장 사항:**
1. 호프 대화 선택지 4가지 모두 테스트
2. 홈즈 힌트 대화 1회차 접근 확인
3. 드레버 10년 전 질문 1회차 접근 확인
4. 모든 엔딩 도달 가능 여부 확인

---

**작업 완료일:** 2025-01-XX
**상태:** ✅ 완료
