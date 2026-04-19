# 배경 매칭 수정 완료 보고서

## ✅ 수정 완료된 문제들

### 1. **2층 복도 노드 매칭 수정** ✅
**문제**: `upstairs`, `meet_drebber` 노드가 저택 외관으로 표시됨
**해결**: `dark_corridor` 조건에 `upstairs`, `meet_drebber` 추가

```typescript
// Before
if (id.includes('corridor') || id.includes('hallway')) return 'dark_corridor';

// After
if (id.includes('corridor') || id.includes('hallway') || 
    id.includes('upstairs') || id.includes('meet_drebber')) return 'dark_corridor';
```

**영향받는 노드**:
- `upstairs` → dark_corridor ✅
- `meet_drebber` → dark_corridor ✅
- `upstairs_end` → dark_corridor ✅

---

### 2. **침실 내부 노드 매칭 수정** ✅
**문제**: `wardrobe`, `drawer`, `search_clothes` 등이 저택 외관으로 표시됨
**해결**: `bedroom` 조건에 침실 관련 키워드 추가

```typescript
// Before
if (id.includes('bedroom') || id.includes('침실')) return 'bedroom';

// After
if (id.includes('bedroom') || id.includes('침실') || 
    id.includes('wardrobe') || id.includes('drawer') || 
    id.includes('search_clothes')) return 'bedroom';
```

**영향받는 노드**:
- `wardrobe` → bedroom ✅
- `search_clothes` → bedroom ✅
- `bedroom_drawer` → bedroom ✅
- `drawer_puzzle_*` → bedroom ✅

---

### 3. **뒷뜰 발자국 노드 매칭 수정** ✅
**문제**: `examine_footprints`, `follow_footprints` 등이 뒷뜰 배경으로 표시되지 않음
**해결**: `backyard` 조건에 `footprints` 추가

```typescript
// Before
if (id.includes('backyard') || id.includes('뒷뜰') || 
    id.includes('back_entrance')) return 'backyard';

// After  
if (id.includes('backyard') || id.includes('뒷뜰') || 
    id.includes('back_entrance') || id.includes('footprints')) return 'backyard';
```

**영향받는 노드**:
- `examine_footprints` → backyard ✅
- `follow_footprints` → backyard ✅

---

### 4. **지하실/터널 우선순위 수정** ✅
**문제**: `tunnel_basement_discovery` 등이 비밀 통로로 잘못 매칭될 수 있음
**해결**: `basement` 조건을 `secret_passage`보다 먼저 체크하도록 순서 변경 + `tunnel_basement` 추가

```typescript
// Before
if (id.includes('secret') || id.includes('hidden') || 
    id.includes('passage') || id.includes('tunnel')) return 'secret_passage';
if (id.includes('basement') || id.includes('지하')) return 'basement';

// After
if (id.includes('basement') || id.includes('지하') || 
    id.includes('tunnel_basement')) return 'basement';
if (id.includes('secret') || id.includes('hidden') || 
    id.includes('passage') || id.includes('tunnel')) return 'secret_passage';
```

**영향받는 노드**:
- `tunnel_basement_discovery` → basement ✅
- `find_basement` → basement ✅
- `open_basement` → basement ✅
- `chase_hope_to_basement` → basement ✅
- `tunnel` → secret_passage ✅
- `examine_tunnel_door` → secret_passage ✅

---

## 📋 최종 배경 매칭 우선순위

```typescript
1.  베이커 스트리트 (start, ask_details)
2.  그린 라이온 여관 (inn, 여관)
3.  저택 외관 (arrive, mansion+exterior)
4.  저택 현관 (entrance, main_hall)
5.  서재 (library, 서재)
6.  연구실 (study, 연구)
7.  식당 (dining, 식당)
8.  침실 (bedroom, 침실, wardrobe, drawer, search_clothes) ✅ 수정
9.  지하실 (basement, 지하, tunnel_basement) ✅ 수정
10. 비밀 통로 (secret, hidden, passage, tunnel)
11. 우물 (well, 우물)
12. 뒷뜰 (backyard, 뒷뜰, back_entrance, footprints) ✅ 수정
13. 정원 (garden, 정원)
14. 의식실 (ritual, ceremony)
15. 어두운 복도 (corridor, hallway, upstairs, meet_drebber) ✅ 수정
16. 법정 (court, 법정)
17. 런던 거리 (street, london)
18. 기본값 (mansion_exterior)
```

---

## 🎯 노드별 배경 매칭 결과

### 베이커 스트리트 221B
- `start` ✅
- `ask_details` ✅
- `morning`, `newspaper`, `cocaine`, `knock` 등 프롤로그 노드들 ✅

### 그린 라이온 여관
- `inn_entrance`, `inn_lobby_investigate`, `inn_meet_innkeeper` ✅
- `inn_ask_*`, `inn_room_*` 모든 여관 노드 ✅

### 저택 현관
- `main_entrance` ✅
- `main_entrance_return_*` ✅

### 서재/연구실
- `study_room` → study_room (연구실) ✅
- `discover_stangerson` → study_room ✅

### 침실
- `bedroom` ✅
- `wardrobe` ✅ (수정됨)
- `drawer`, `bedroom_drawer` ✅ (수정됨)
- `search_clothes` ✅ (수정됨)
- `window` ⚠️ (bedroom이 포함되지 않아 매칭 안 될 수 있음)

### 2층 복도
- `upstairs` ✅ (수정됨)
- `meet_drebber` ✅ (수정됨)
- `upstairs_end` ✅ (수정됨)

### 뒷뜰
- `back_entrance` ✅
- `examine_footprints` ✅ (수정됨)
- `follow_footprints` ✅ (수정됨)

### 우물
- `well` ✅
- `well_*` 모든 우물 노드 ✅
- `turn_around` ⚠️ (well이 포함되지 않아 기본값으로 갈 수 있음)
- `ask_hope_relation` ⚠️ (well이 포함되지 않아 기본값으로 갈 수 있음)

### 지하실
- `find_basement`, `open_basement` ✅
- `chase_hope_to_basement` ✅
- `tunnel_basement_discovery` ✅ (수정됨)

### 비밀 통로
- `tunnel` ✅
- `examine_tunnel_door` ✅

---

## ⚠️ 남아있는 잠재적 문제

### 1. **window 노드**
**노드 ID**: `window`
**현재 매칭**: `mansion_exterior` (기본값)
**올바른 배경**: `bedroom` (침실에서 창문을 보는 장면)

**해결 방법**:
- 옵션 1: 노드 ID를 `bedroom_window`로 변경
- 옵션 2: `window` 조건을 bedroom 체크에 추가 (하지만 다른 곳의 window와 충돌 가능)

### 2. **우물 장면 일부 노드**
**노드 ID**: `turn_around`, `ask_hope_relation`
**현재 매칭**: `mansion_exterior` (기본값)
**올바른 배경**: `well` (우물에서 일어나는 장면)

**해결 방법**:
- 노드 ID에 `well_` 접두어 추가 권장
- 예: `turn_around` → `well_turn_around`

### 3. **서재 vs 연구실**
**노드 ID**: `study_room`, `study_room_return`
**현재 매칭**: `study_room` (연구실)
**실제 의도**: 확인 필요 (서재일 가능성 있음)

**확인 필요**:
- 스토리 텍스트에서 "서재"로 언급되는지 "연구실"로 언급되는지 체크
- 필요하면 background 조건 수정 또는 노드 ID 변경

---

## 🎨 배경 이미지 현황

| 배경 ID | 이름 | 사용 노드 수 | 상태 |
|---------|------|-------------|------|
| baker_street | 베이커 스트리트 221B | ~20개 | ✅ |
| inn_lobby | 그린 라이온 여관 | 17개 | ✅ |
| mansion_exterior | 저택 외관 | 기본값 | ✅ |
| mansion_entrance | 저택 현관 | ~4개 | ✅ |
| library | 서재 | 0개? | ⚠️ 미사용? |
| study_room | 연구실 | ~4개 | ✅ |
| bedroom | 침실 | ~10개 | ✅ |
| dark_corridor | 어두운 복도 | ~3개 | ✅ |
| backyard | 뒷뜰 | ~5개 | ✅ |
| well | 우물 | ~15개 | ✅ |
| basement | 지하실 | ~5개 | ✅ |
| secret_passage | 비밀 통로 | ~3개 | ✅ |
| garden | 정원 | 0개? | ⚠️ 미사용? |
| dining_room | 식당 | 0개? | ⚠️ 미사용? |
| ritual_chamber | 의식실 | 0개? | ⚠️ 미사용? |
| courtroom | 법정 | 엔딩? | ⚠️ |
| london_street | 런던 거리 | 0개? | ⚠️ 미사용? |

---

## 📊 수정 요약

### 코드 변경 파일
- `/data/backgroundData.ts` ✅ 수정 완료

### 수정된 조건
1. `dark_corridor`: `upstairs`, `meet_drebber` 추가
2. `bedroom`: `wardrobe`, `drawer`, `search_clothes` 추가
3. `backyard`: `footprints` 추가
4. `basement`: `tunnel_basement` 추가 + 우선순위 조정

### 영향받는 노드 수
- **침실**: ~10개 노드
- **2층 복도**: ~3개 노드
- **뒷뜰**: ~2개 노드
- **지하실**: ~5개 노드

### 테스트 권장 사항
1. ✅ 2층 복도에서 배경이 어두운 복도로 나오는지 확인
2. ✅ 옷장/서랍 조사 시 침실 배경이 유지되는지 확인
3. ✅ 뒷뜰 발자국 조사 시 뒷뜰 배경이 나오는지 확인
4. ✅ 지하실/터널 노드에서 올바른 배경이 나오는지 확인

---

## 🔍 추가 검토 필요 사항

1. **window 노드**: 노드 ID 변경 고려
2. **우물 일부 노드**: well_ 접두어 추가 고려
3. **library vs study_room**: 용도 확인 후 조정
4. **미사용 배경**: garden, dining_room, ritual_chamber 등 실제 사용 여부 확인
