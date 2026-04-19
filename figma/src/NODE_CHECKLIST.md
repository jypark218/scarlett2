# 노드 누락 체크리스트 - 완료 ✅

## ✅ 1. 캐릭터 시스템

### characterData.ts
- [x] `ellen` 캐릭터 데이터 추가
- [x] `SELF_INTRO_PATTERNS` 에 ellen 추가
- [x] `speakerMap` 에 '엘렌' 추가
- [x] `labeledDialoguePattern` 에 '엘렌' 추가

## ✅ 2. 아이템 시스템

### itemData.ts
- [x] `drawer_key` 아이템 추가
- [x] `ellen_will` 아이템 추가

### itemCharacterLinks.ts
- [x] `drawer_key` ↔ `ellen` 연결
- [x] `ellen_will` ↔ `ellen`, `count`, `lucy` 연결

## ✅ 3. 스토리 노드

### upstairs-nodes.ts (침실 관련)
- [x] `bedroom` - 서랍장 선택지 추가
  - 선택지에 `hideIfHasItem: 'ellen_will'` 추가 ✅
- [x] `bedroom_drawer` - 서랍 조사 노드
  - `requiredItem: 'drawer_key'` (requiresItem 오타 수정 완료) ✅
- [x] `bedroom_drawer_force` - 강제 열기 시도 (실패)
- [x] `bedroom_drawer_unlocked` - 서랍 해금 성공

### evidence-acquisition-improved.ts (유언장 관련)
- [x] `acquire_ellen_will` - 유언장 발견
- [x] `ellen_will_revelation` - 홈즈와 대화
  - `acquireItem: 'ellen_will'` 추가 ✅
- [x] `bedroom_drawer_more_clues` - 추가 편지 발견

### study-room.ts (서재 금고)
- [x] `safe_opened` - 서랍 열쇠 선택지 추가
- [x] `examine_ledger_safe` - 서랍 열쇠 선택지 추가
- [x] `got_basement_key` - 서랍 열쇠 선택지 추가
- [x] `got_drawer_key` - 서랍 열쇠 획득 노드

## ✅ 4. 노드 통합

### locations/index.ts
- [x] `upstairsNodes` export 확인
- [x] `studyRoomNodes` export 확인
- [x] `allLocationNodes` 에 포함 확인

### storyData.ts
- [x] `evidenceAcquisitionImproved` import 확인
- [x] `allLocationNodes` import 확인
- [x] 모든 노드가 storyData에 포함됨

## ✅ 5. 노드 연결 검증

### 서재 금고 → 서랍 열쇠
```
safe_opened
  ├─ examine_ledger_safe (item: 'ledger')
  ├─ got_basement_key (item: '지하실 열쇠')
  ├─ got_drawer_key (item: 'drawer_key') ✅ NEW
  └─ search_study_more
```

### 침실 → 서랍 → 유언장
```
bedroom
  ├─ acquire_will_bedroom_v2 (hideIfHasItem: 'will')
  ├─ bedroom_drawer (hideIfHasItem: 'ellen_will') ✅
  ├─ wardrobe
  └─ upstairs_end

bedroom_drawer
  ├─ bedroom_drawer_unlocked (requiredItem: 'drawer_key') ✅
  ├─ bedroom_drawer_force
  └─ bedroom

bedroom_drawer_unlocked
  └─ acquire_ellen_will

acquire_ellen_will
  └─ ellen_will_revelation (acquireItem: 'ellen_will') ✅

ellen_will_revelation
  ├─ bedroom_drawer_more_clues
  └─ bedroom

bedroom_drawer_more_clues
  └─ bedroom
```

## ✅ 6. 타입 검증

### Choice 인터페이스 (types/story.ts)
- [x] `requiredItem` 사용 (requiresItem 아님!) ✅
- [x] `hideIfHasItem` 사용
- [x] `item` 사용 (아이템 획득)
- [x] `acquireItem` 사용 (StoryNode에서 아이템 획득)

## ✅ 7. 아이템 획득 방식

### drawer_key
- **획득 방법**: 선택지에 `item: 'drawer_key'` 속성
- **노드**: `got_drawer_key` (서재 금고)

### ellen_will
- **획득 방법**: 노드에 `acquireItem: 'ellen_will'` 속성
- **노드**: `ellen_will_revelation` (홈즈와 대화 후)

## ✅ 8. 중복 방지

### hideIfHasItem 설정
- [x] `bedroom` 노드의 서랍 선택지에 `hideIfHasItem: 'ellen_will'` 추가
  - 유언장을 이미 획득했으면 서랍 선택지 숨김

### item 중복 획득 방지
- [x] `safe_opened` 등의 선택지에 `hideIfHasItem: 'drawer_key'` 추가
  - 이미 열쇠를 가지고 있으면 선택지 숨김

## 🎯 최종 결론

### ✅ 모든 노드 확인 완료!

1. **캐릭터 시스템** - 엘렌 완전 통합
2. **아이템 시스템** - drawer_key, ellen_will 추가
3. **노드 구조** - 8개 새 노드 추가
4. **노드 연결** - 모든 nextNode 검증 완료
5. **타입 정합성** - requiredItem 오타 수정
6. **중복 방지** - hideIfHasItem 설정 완료

### 🎮 게임 플레이 가능 상태!

**플레이 흐름:**
1. 서재 → 금고 → 서랍 열쇠 획득
2. 침실 → 서랍 조사 → 열쇠로 해금
3. 유언장 발견 → 홈즈와 대화 → 엘렌의 비밀 공개
4. 추가 편지 발견 → 백작과 루시의 과거 이해

모든 시스템이 정상 작동합니다! 🎉
