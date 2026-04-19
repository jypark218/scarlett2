# 배경 매칭 전체 체크 리스트

## ✅ 베이커 스트리트 (baker_street)
**매칭 조건**: `start`, `ask_details`

### 노드 목록:
- `start` ✅
- `ask_details` ✅  
- `morning`, `newspaper`, `cocaine`, `knock` 등 프롤로그 노드들 ✅
- `research_order`, `research_count` ✅
- `second_playthrough`, `thorough_investigation` ✅

---

## ✅ 그린 라이온 여관 (inn_lobby)
**매칭 조건**: `inn`, `여관`

### 노드 목록:
- `inn_entrance` ✅
- `inn_lobby_investigate` ✅
- `inn_meet_innkeeper` ✅
- `inn_ask_checkin` ✅
- `inn_ask_night_activity` ✅
- `inn_morning_evidence` ✅
- `inn_ask_impression` ✅
- `inn_ask_room_search` ✅
- `inn_room_7_entrance` ✅
- `inn_room_bed` ✅
- `inn_room_desk` ✅
- `inn_room_desk_reveal` ✅
- `inn_room_window` ✅
- `inn_room_stairs` ✅
- `inn_conclusion` ✅
- `inn_leave` ✅
- `inn_ask_room` ✅

**결과**: 모든 inn_ 노드가 여관 배경으로 매칭됨 ✅

---

## ✅ 저택 외관 (mansion_exterior)
**매칭 조건**: `arrive`, `mansion` + `exterior`

### 노드 목록:
- `arrive` ✅
- 기본값 (매칭되지 않은 노드들)

---

## ✅ 저택 현관 (mansion_entrance)
**매칭 조건**: `entrance`, `main_hall`

### 노드 목록:
- `main_entrance` ✅
- `main_entrance_return_study` ✅
- `main_entrance_return_upstairs` ✅
- `main_entrance_return_backyard` ✅

**결과**: 모든 entrance 노드가 현관 배경으로 매칭됨 ✅

---

## ⚠️ 서재 vs 연구실 (library vs study_room)
**매칭 조건**:
- `library`, `서재` → library
- `study`, `연구` → study_room

### 노드 목록:
- `study_room` → **study_room** ✅
- `study_room_return` → **study_room** ✅
- `discover_stangerson` → **study_room** ✅
- `study_with_stangerson` → **study_room** ✅

**잠재적 문제**: 
- 노드 ID가 `study_room`인데 배경은 `study_room` (연구실)로 매칭됨
- 실제로는 **서재 (library)** 배경이 맞을 수 있음
- 확인 필요! ⚠️

---

## ✅ 침실 (bedroom)
**매칭 조건**: `bedroom`, `침실`

### 노드 목록:
- `bedroom` ✅
- `window` ⚠️ (침실에서 창문을 보는 장면인데 매칭 안 됨)
- `wardrobe` ⚠️ (옷장 - 침실 안에 있는데 매칭 안 됨)
- `search_clothes` ⚠️ (옷 조사 - 침실 안에 있는데 매칭 안 됨)
- `bedroom_drawer` ⚠️ (서랍 - 침실 안에 있는데 매칭 안 됨)
- `drawer_puzzle_*` ⚠️ (서랍 퍼즐 - 침실 안에 있는데 매칭 안 됨)

**문제 발견**:
- `wardrobe`, `drawer`, `window`, `search_clothes` 등의 노드들이 침실에서 일어나는 장면인데 **bedroom** 조건에 매칭되지 않음
- 이 노드들은 기본값인 `mansion_exterior`로 표시될 위험 ❌

---

## ✅ 2층 복도 (dark_corridor)
**매칭 조건**: `corridor`, `hallway`, `upstairs`, `meet_drebber`

### 노드 목록:
- `upstairs` ✅ (방금 수정함)
- `meet_drebber` ✅ (방금 수정함)
- `upstairs_end` ✅

**결과**: 수정 완료 ✅

---

## ⚠️ 뒷뜰 (backyard)
**매칭 조건**: `backyard`, `뒷뜰`, `back_entrance`

### 노드 목록:
- `back_entrance` ✅
- `examine_footprints` ⚠️ (뒷뜰 조사인데 매칭 안 됨)
- `follow_footprints` ⚠️ (발자국 추적 - 뒷뜰에서 일어남)

**문제 가능성**: footprints 관련 노드들이 뒷뜰 배경으로 매칭되지 않을 수 있음 ⚠️

---

## ✅ 우물 (well)
**매칭 조건**: `well`, `우물`

### 노드 목록:
- `well` ✅
- `turn_around` ⚠️ (우물에서 돌아서는 장면)
- `ask_hope_relation` ⚠️ (우물에서 호프와 대화)
- `ask_hope_well` ⚠️ (우물에서 대화)
- `well_ask_count_whereabouts` ✅
- `well_offer_help` ✅
- `well_suggest_police` ✅
- `investigate_well` ✅
- `acquire_lucy_letter` ⚠️ (우물에서 획득하지만 매칭 안 됨)
- `well_press_hope_past` ✅
- `well_hope_tragedy` ✅
- `well_let_hope_go` ✅
- `well_show_ring` ✅
- `well_ask_truth_after_ring` ✅
- `well_comfort_hope_ring` ✅
- `well_comfort_after_truth` ✅
- `well_must_find_count` ✅
- `well_try_stop_hope` ✅
- `well_follow_hope_secretly` ✅

**결과**: `well_`로 시작하는 노드들은 매칭됨 ✅
**문제**: 일부 노드(`turn_around`, `ask_hope_relation`)는 well 접두어가 없어서 매칭 안 될 수 있음 ⚠️

---

## ⚠️ 지하실 (basement)
**매칭 조건**: `basement`, `지하`

### 노드 목록:
- `find_basement` ✅
- `open_basement` ✅
- `chase_hope_to_basement` ✅
- `tunnel` ⚠️ (터널 - 지하실 관련인데 secret_passage로 매칭될 수 있음)
- `examine_tunnel_door` ⚠️
- `tunnel_basement_discovery` ⚠️

**문제**: `tunnel` 관련 노드들이 `secret_passage`와 `basement` 중 어디로 가야 할지 모호함 ⚠️

---

## ⚠️ 비밀 통로 (secret_passage)
**매칭 조건**: `secret`, `hidden`, `passage`

### 노드 목록:
- `tunnel` ✅
- `examine_tunnel_door` ⚠️ (tunnel이 있지만 door도 있어서 매칭 안 될 수 있음)
- `tunnel_basement_discovery` ⚠️

**문제**: `tunnel`은 매칭되지만 `tunnel_door`, `tunnel_basement`는 매칭 안 될 수 있음 ⚠️

---

## 🚨 발견된 주요 문제

### 1. **침실 내부 노드들이 매칭 안 됨**
```typescript
// 현재 조건
if (id.includes('bedroom') || id.includes('침실')) return 'bedroom';

// 문제 노드들:
- wardrobe ❌
- drawer ❌  
- window ❌
- search_clothes ❌
- bedroom_drawer ❌
- drawer_puzzle_* ❌
```

**해결책**: 조건 추가 필요
```typescript
if (id.includes('bedroom') || id.includes('침실') || 
    id.includes('wardrobe') || id.includes('drawer') || 
    id.includes('window') && id.includes('bedroom')) return 'bedroom';
```

---

### 2. **우물 장면 일부 노드 매칭 안 됨**
```typescript
// 현재 조건
if (id.includes('well') || id.includes('우물')) return 'well';

// 문제 노드들:
- turn_around ❌ (우물에서 일어나는 장면)
- ask_hope_relation ❌ (우물에서 대화)
- ask_hope_well ✅ (이건 매칭됨)
- acquire_lucy_letter ❌
```

**해결책**: 노드 ID 자체를 수정하거나, 문맥상 우물 장면인 노드들에 well_ 접두어 추가

---

### 3. **터널/지하실 혼동**
```typescript
// tunnel 노드들이 secret_passage와 basement 중 어디로 가야 할지 모호

// 터널 노드들:
- tunnel → secret_passage
- examine_tunnel_door → ?
- tunnel_basement_discovery → basement로 가야 할 것 같은데 secret_passage로 갈 수 있음
```

**해결책**: 우선순위 조정 필요 (basement를 먼저 체크)

---

### 4. **서재 vs 연구실 혼동**
```typescript
// study_room 노드들이 실제로는 서재(library) 장면인데 연구실(study_room)로 매칭됨
```

**해결책**: 노드 용도 확인 후 배경 결정 필요

---

## 📋 권장 수정 사항

### backgroundData.ts 수정:
```typescript
export function getBackgroundForNode(nodeId: string): string {
  const id = nodeId.toLowerCase();
  
  // 베이커 스트리트
  if (id.includes('start') || id.includes('ask_details')) return 'baker_street';
  
  // 여관
  if (id.includes('inn') || id.includes('여관')) return 'inn_lobby';
  
  // 저택 외관
  if (id.includes('arrive') || id.includes('mansion') && id.includes('exterior')) return 'mansion_exterior';
  
  // 현관
  if (id.includes('entrance') || id.includes('main_hall')) return 'mansion_entrance';
  
  // 서재 (우선순위: library > study_room)
  if (id.includes('library') || id.includes('서재')) return 'library';
  
  // 침실 (수정 필요!)
  if (id.includes('bedroom') || id.includes('침실') || 
      id.includes('wardrobe') || id.includes('drawer') || 
      id.includes('search_clothes')) return 'bedroom';
  
  // 지하실 (우선순위: basement > secret_passage)
  if (id.includes('basement') || id.includes('지하') || 
      id.includes('tunnel_basement')) return 'basement';
  
  // 비밀 통로
  if (id.includes('secret') || id.includes('hidden') || 
      id.includes('passage') || id.includes('tunnel')) return 'secret_passage';
  
  // 우물
  if (id.includes('well') || id.includes('우물')) return 'well';
  
  // 뒷뜰
  if (id.includes('backyard') || id.includes('뒷뜰') || 
      id.includes('back_entrance') || id.includes('footprints')) return 'backyard';
  
  // 정원
  if (id.includes('garden') || id.includes('정원')) return 'garden';
  
  // 의식실
  if (id.includes('ritual') || id.includes('ceremony')) return 'ritual_chamber';
  
  // 복도
  if (id.includes('corridor') || id.includes('hallway') || 
      id.includes('upstairs') || id.includes('meet_drebber')) return 'dark_corridor';
  
  // 연구실
  if (id.includes('study') || id.includes('연구')) return 'study_room';
  
  // 식당
  if (id.includes('dining') || id.includes('식당')) return 'dining_room';
  
  // 법정
  if (id.includes('court') || id.includes('법정')) return 'courtroom';
  
  // 거리
  if (id.includes('street') || id.includes('london')) return 'london_street';
  
  return 'mansion_exterior';
}
```

---

## 🎯 수정 우선순위

1. **🔴 긴급**: 침실 관련 노드 (wardrobe, drawer 등)
2. **🟡 중요**: 터널/지하실 우선순위 조정
3. **🟢 확인**: 서재 vs 연구실 구분
4. **🟢 확인**: 뒷뜰 footprints 노드들
