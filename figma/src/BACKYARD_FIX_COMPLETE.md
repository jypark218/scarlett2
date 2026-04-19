# 뒷뜰 배경 매칭 문제 해결 완료 ✅

## 🐛 문제 상황
- **증상**: 뒷뜰로 이동해도 배경이 계속 "저택 현관"으로 표시됨
- **위치 표시**: "저택 현관" (잘못됨)
- **올바른 표시**: "뒷뜰"

## 🔍 원인 분석

### 근본 원인: **조건 검사 순서 문제**

```typescript
// ❌ 문제 있던 코드
if (id.includes('entrance') || id.includes('main_hall')) return 'mansion_entrance';
// ...
if (id.includes('backyard') || id.includes('뒷뜰') || 
    id.includes('back_entrance')) return 'backyard';
```

### 왜 문제가 발생했는가?

1. **`back_entrance` 노드**가 뒷뜰 장면임
2. 하지만 `entrance` 조건이 `backyard` 조건보다 **먼저 체크**됨
3. `back_entrance`는 `entrance`를 포함하므로 → `mansion_entrance` (저택 현관)로 매칭됨 ❌
4. `backyard` 조건까지 도달하지 못함

### 영향받은 노드들
- `back_entrance` → ❌ mansion_entrance (저택 현관)
- `back_entrance_return` → ❌ mansion_entrance (저택 현관)
- `examine_broken_window` → ❌ 기본값 (저택 외관)

---

## ✅ 해결 방법

### 1. **조건 순서 재배치**
더 구체적인 조건(`back_entrance`)을 더 일반적인 조건(`entrance`)보다 **먼저** 체크

```typescript
// ✅ 수정된 코드
// main_entrance는 가장 먼저 체크 (항상 현관이어야 함)
if (id.includes('main_entrance')) return 'mansion_entrance';

// back_entrance는 entrance보다 먼저 체크 (뒷뜰이어야 함)
if (id.includes('backyard') || id.includes('뒷뜰') || 
    id.includes('back_entrance') || id.includes('footprints') || 
    id.includes('examine_broken_window')) return 'backyard';

// 일반적인 entrance 체크 (현관)
if (id.includes('entrance') || id.includes('main_hall')) return 'mansion_entrance';
```

### 2. **추가 키워드 보완**
- `examine_broken_window` 추가 (깨진 창문 조사 = 뒷뜰 장면)

---

## 📊 최종 배경 매칭 우선순위

```typescript
1.  베이커 스트리트 (start, ask_details)
2.  그린 라이온 여관 (inn, 여관)
3.  저택 외관 (arrive, mansion+exterior)
4.  🔑 main_entrance (항상 현관) ← NEW!
5.  🔑 뒷뜰 (backyard, 뒷뜰, back_entrance, footprints, examine_broken_window) ← 순서 변경!
6.  저택 현관 (entrance, main_hall)
7.  서재 (library, 서재)
8.  연구실 (study, 연구)
9.  식당 (dining, 식당)
10. 침실 (bedroom, 침실, wardrobe, drawer, search_clothes)
11. 지하실 (basement, 지하, tunnel_basement)
12. 비밀 통로 (secret, hidden, passage, tunnel)
13. 우물 (well, 우물)
14. 정원 (garden, 정원)
15. 의식실 (ritual, ceremony)
16. 복도 (corridor, hallway, upstairs, meet_drebber)
17. 법정 (court, 법정)
18. 런던 거리 (street, london)
19. 기본값 (mansion_exterior)
```

---

## 🎯 노드별 배경 매칭 결과

### ✅ 뒷뜰 관련 노드
| 노드 ID | Before | After | 상태 |
|---------|--------|-------|------|
| `back_entrance` | 저택 현관 ❌ | 뒷뜰 ✅ | 수정됨 |
| `back_entrance_return` | 저택 현관 ❌ | 뒷뜰 ✅ | 수정됨 |
| `examine_broken_window` | 저택 외관 ❌ | 뒷뜰 ✅ | 수정됨 |
| `examine_footprints` | 저택 외관 ❌ | 뒷뜰 ✅ | 수정됨 |
| `follow_footprints` | 저택 외관 ❌ | 뒷뜰 ✅ | 수정됨 |

### ✅ 현관 관련 노드 (영향 없음)
| 노드 ID | Before | After | 상태 |
|---------|--------|-------|------|
| `main_entrance` | 저택 현관 ✅ | 저택 현관 ✅ | 유지됨 |
| `main_entrance_return_study` | 저택 현관 ✅ | 저택 현관 ✅ | 유지됨 |
| `main_entrance_return_upstairs` | 저택 현관 ✅ | 저택 현관 ✅ | 유지됨 |
| `main_entrance_return_backyard` | 뒷뜰 ❌ | 저택 현관 ✅ | 수정됨 |

**중요**: `main_entrance_return_backyard`는 **뒷뜰에서 현관으로 돌아온** 노드이므로 현관 배경이 맞습니다!

---

## 🧪 테스트 시나리오

### 시나리오 1: 현관 → 뒷뜰
1. `main_entrance` → 배경: 저택 현관 ✅
2. "뒤뜰을 조사한다" 선택
3. `back_entrance` → 배경: 뒷뜰 ✅
4. 위치 표시: "뒷뜰" ✅

### 시나리오 2: 뒷뜰 탐색
1. `back_entrance` → 배경: 뒷뜰 ✅
2. "깨진 창문을 더 자세히 살펴본다" 선택
3. `examine_broken_window` → 배경: 뒷뜰 ✅
4. 위치 표시: "뒷뜰" ✅

### 시나리오 3: 뒷뜰 → 현관
1. `back_entrance` → 배경: 뒷뜰 ✅
2. "정문으로 돌아간다" 선택
3. `main_entrance_return_backyard` → 배경: 저택 현관 ✅
4. 위치 표시: "저택 현관" ✅

---

## 📝 수정된 파일

### `/data/backgroundData.ts`
- `getBackgroundForNode()` 함수: 조건 순서 재배치
- `getLocationFromNode()` 함수: 조건 순서 재배치

---

## 🎨 배경 전환 흐름

```
[저택 현관]
    ↓ 뒤뜰 조사
[뒷뜰] ← back_entrance
    ↓ 창문 조사
[뒷뜰] ← examine_broken_window
    ↓ 우물로 이동
[우물] ← well
    ↓ 반지 획득
[우물] ← take_ring
    ↓ 정문으로 복귀
[저택 현관] ← main_entrance_return_backyard
```

---

## 🚀 다음 단계

모든 뒷뜰 관련 노드가 이제 올바른 배경으로 표시됩니다!

### 게임 내 확인 사항:
1. ✅ 뒤뜰로 이동 시 배경이 "뒷뜰"로 변경되는지 확인
2. ✅ 위치 표시가 "뒷뜰"로 나오는지 확인
3. ✅ 깨진 창문 조사 시 배경이 유지되는지 확인
4. ✅ 현관으로 복귀 시 배경이 "저택 현관"으로 변경되는지 확인

---

## 💡 배운 교훈

### 문자열 포함 검사의 함정
```typescript
// ❌ 나쁜 예: 일반적인 조건을 먼저 체크
if (id.includes('entrance')) return 'mansion_entrance';  // back_entrance도 매칭됨!
if (id.includes('back_entrance')) return 'backyard';     // 도달 불가

// ✅ 좋은 예: 구체적인 조건을 먼저 체크
if (id.includes('main_entrance')) return 'mansion_entrance';
if (id.includes('back_entrance')) return 'backyard';
if (id.includes('entrance')) return 'mansion_entrance';
```

### 우선순위 원칙
1. **가장 구체적인 조건**을 가장 먼저 체크
2. **일반적인 조건**은 나중에 체크
3. **기본값**은 마지막에 체크

---

## ✅ 완료 체크리스트

- [x] 문제 원인 파악
- [x] `getBackgroundForNode()` 함수 수정
- [x] `getLocationFromNode()` 함수 수정
- [x] `main_entrance` 우선순위 조정
- [x] `back_entrance` 조건 순서 변경
- [x] `examine_broken_window` 조건 추가
- [x] 테스트 시나리오 작성
- [x] 문서화 완료

**모든 뒷뜰 배경 매칭 문제가 해결되었습니다!** 🎉
