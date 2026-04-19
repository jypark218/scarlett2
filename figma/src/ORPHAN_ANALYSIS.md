# 🔍 고아 노드 정밀 분석 리포트

생성일: 2025-01-XX  
분석자: AI Assistant

---

## 📋 스캔 전략

### Phase 1: 파일 목록 확인 ✅
총 58개 스토리 파일 확인 완료

### Phase 2: 고아 노드 후보 그룹

다음 카테고리별로 고아 노드를 분류:

---

## 🚨 **Category 1: 주석 처리된 파일 (확실한 고아)**

### 1.1 `psychological-depth.ts` (15개 노드)
**파일 위치**: `/data/story/psychological-depth.ts`  
**import 상태**: `fixes/index.ts`에서 주석 처리됨  
**원인**: 의도적으로 비활성화

**고아 노드 목록**:
1. `lucy_letter` - 루시의 편지를 보여주는 노드
2. `persuade_with_lucy_will` - 루시의 뜻으로 설득
3. `respect_grief` - 슬픔을 존중
4. `return_letter` - 편지를 돌려줌
5. `watson_reflection` - 왓슨의 성찰
6. `save_life_duty` - 생명 구하는 의무
7. `understand_hope_first` - 호프 이해 우선
8. `trust_holmes_judgment` - 홈즈 판단 신뢰
9. `moral_dilemma` - 도덕적 딜레마
10. `honest_revenge_desire` - 솔직한 복수 욕망
11. `cycle_of_violence` - 폭력의 순환
12. `honest_dont_know` - 솔직히 모르겠다
13. `weight_of_time` - 시간의 무게
14. `acknowledge_pain` - 고통 인정
15. `think_future_twenty` - 미래 20년 생각

**조치 제안**: 
- [ ] 삭제 (사용하지 않을 경우)
- [ ] 재활성화 후 연결 (사용할 경우)

---

### 1.2 `drebber-dark-route.ts` (8개 노드)
**파일 위치**: `/data/story/drebber-dark-route.ts`  
**import 상태**: `fixes/index.ts`에서 주석 처리됨  
**원인**: 드레버 다크 루트 미사용

**고아 노드 목록**:
1. `drebber_dark_hint` - 드레버 다크 힌트
2. `drebber_dark_interrogate` - 드레버 다크 심문
3. `drebber_dark_confession` - 드레버 다크 고백
4. `drebber_dark_plan` - 드레버 다크 계획
5. `drebber_dark_hope` - 드레버 다크 희망
6. `drebber_dark_justice_debate` - 정의 논쟁
7. `drebber_dark_rescue` - 드레버 다크 구출
8. `drebber_dark_arrest` - 드레버 다크 체포

**조치 제안**: 
- [ ] 삭제 (다크 루트 불필요)
- [ ] 재활성화 (다크 루트 추가)

---

### 1.3 `ambiguous-endings.ts` (5개 노드)
**파일 위치**: `/data/story/ambiguous-endings.ts`  
**import 상태**: `fixes/index.ts`에서 주석 처리됨  
**원인**: 모호한 엔딩 미사용

**고아 노드 목록**:
1. `hope_ambiguous_ending` - 호프 모호한 엔딩
2. `stangerson_ambiguous_ending` - 스탠거슨 모호한 엔딩
3. `all_suspects_ending` - 모든 용의자 엔딩
4. `meta_confusion_ending` - 메타 혼란 엔딩
5. `no_culprit_ending` - 범인 없음 엔딩

**조치 제안**: 
- [ ] 삭제 (모호한 엔딩 불필요)
- [ ] 재활성화 (2회차 콘텐츠로 활용)

---

## 🟡 **Category 2: Ellen 중복/미연결 노드**

### 2.1 `ellen-missing-nodes.ts` (22개 노드)
**파일 위치**: `/data/story/ellen-missing-nodes.ts`  
**import 상태**: ❌ **어디서도 import 되지 않음!**  
**원인**: 파일은 존재하지만 `fixes/index.ts`나 다른 곳에서 import 안 함

**고아 노드 목록**:
1. `ellen_follow_heart`
2. `ellen_met_hope`
3. `ellen_take_time_decision`
4. `ellen_reassure_search`
5. `ellen_prepare`
6. `ellen_other_clues`
7. `ellen_wise`
8. `ellen_wwld` (What Would Lucy Do?)
9. `ellen_need_help`
10. `ellen_hope_theory`
11. `ellen_comfort`
12. `ellen_not_fault`
13. `ellen_after_sounds`
14. `ellen_clues_first`
15. `ellen_dont_worry`
16. `ellen_brave`
17. `ellen_trust_stangerson`
18. `ellen_about_suspects`
19. `ellen_encouragement`
20. `ellen_count_praise`
21. `ellen_hope_knows`
22. `ellen_made_count_happy`

**조치 제안**: 
- [ ] `ellen-interrogation.ts`에 통합
- [ ] `fixes/index.ts`에 import 추가

---

## 🟢 **Category 3: 서스펜스 이벤트 (미연결)**

### 3.1 `suspense-events.ts` (11개 노드)
**파일 위치**: `/data/story/locations/suspense-events.ts`  
**import 상태**: ✅ import됨 (`allStoryFixes`에 포함)  
**원인**: 노드는 로드되지만, 어디서도 `nextNode`로 참조 안 됨

**고아 노드 목록**:
1. `hallway_shadow_event` - 복도 그림자 이벤트
2. `chase_shadow` - 그림자 추격
3. `call_holmes_shadow` - 홈즈 호출
4. `ignore_shadow` - 그림자 무시
5. `follow_footprints` - 발자국 추적 (⚠️ part1-opening.ts와 중복?)
6. `report_shadow_to_holmes` - 홈즈에게 보고
7. `sudden_door_slam` - 갑작스런 문 닫힘
8. `backyard_watched` - 뒷마당 감시
9. `break_door` - 문 부수기
10. `find_key_for_locked_door` - 열쇠 찾기
11. `skip_locked_door` - 잠긴 문 건너뛰기

**조치 제안**: 
- [ ] `main_entrance` 허브에 랜덤 이벤트 트리거 추가
- [ ] 특정 조건에서 이벤트 발생하도록 연결

---

## 🔵 **Category 4: Missing Nodes (의도된 고아?)**

### 4.1 `fixes/missing-nodes.ts` 중 미연결 (25개+)
**파일 위치**: `/data/story/fixes/missing-nodes.ts`  
**import 상태**: ✅ import됨  
**원인**: 노드를 만들었지만 연결 안 함

**주요 고아 노드**:
1. `inn_return` - 여관 복귀
2. `hope_basement_knowledge` - 호프 지하실 지식
3. `hope_lucy_confession` - 루시 고백
4. `hope_count_choice_result` - 백작 선택 결과
5. `hope_murder_accusation` - 살인 고발
6. `hope_holmes_persuasion` - 홈즈 설득
7. `hope_acknowledge_pain` - 고통 인정
8. `hope_self_forgiveness` - 자기 용서
9. `hope_save_count_together` - 함께 백작 구하기
10. `hope_lucy_memory` - 루시 기억
11. `basement_with_hope` - 호프와 지하실
12. `hope_must_save_count` - 백작 구해야 함
13. `hope_understand_pain` - 고통 이해
14. `hope_law_solution` - 법적 해결
15. `hope_revenge_motive` - 복수 동기
16. `hope_comfort_after_locket` - 로켓 후 위로
17. `hope_count_escape` - 백작 탈출
18. `hope_why_no_police` - 왜 경찰 안 부름
19. `hope_revenge_decision` - 복수 결정
20. `hope_revenge_plan` - 복수 계획
21. `hope_comfort_lucy_story` - 루시 이야기 위로
22. `hope_count_connection` - 백작 연결
23. `hope_not_too_late` - 아직 늦지 않음
24. ... (더 있음)

**스탠거슨 관련**:
25. `stangerson_count_fate` - 스탠거슨 백작 운명
26. `call_police_early` - 경찰 일찍 부르기
27. `stangerson_how_knew_basement` - 지하실 어떻게 알았나
28. `stangerson_why_hide_this` - 왜 숨겼나
29. `persuade_hope_basement` - 호프 지하실 설득
30. `save_count_first` - 백작 먼저 구하기
31. ... (더 있음)

**조치 제안**: 
- [ ] 각 노드가 연결되어야 할 위치 매핑
- [ ] 호프/스탠거슨 심문 시스템에 통합

---

## 📊 **통계 요약**

| 카테고리 | 파일 수 | 고아 노드 수 | 우선순위 |
|---------|--------|------------|---------|
| 주석 처리된 파일 | 3 | 28개 | 🚨 High |
| Ellen 미연결 | 1 | 22개 | 🟡 Medium |
| 서스펜스 이벤트 | 1 | 11개 | 🟡 Medium |
| Missing Nodes | 1 | 25개+ | 🔵 Low |
| **합계** | **6** | **87개** | - |

---

## 🎯 **우선순위별 작업 계획**

### Priority 1 (즉시): 주석 파일 정리
1. `psychological-depth.ts` - 삭제 or 복구 결정
2. `drebber-dark-route.ts` - 삭제 or 복구 결정
3. `ambiguous-endings.ts` - 삭제 or 복구 결정

### Priority 2 (중요): Ellen 시스템 정리
4. `ellen-missing-nodes.ts` - import 추가 or 통합

### Priority 3 (선택): 서스펜스/Missing
5. 서스펜스 이벤트 연결 (선택적)
6. Missing Nodes 연결 (필요한 것만)

---

## 📝 **다음 단계**

**사용자에게 확인 필요**:
1. ❓ 심리적 깊이 노드 필요한가요? (15개)
2. ❓ 드레버 다크 루트 필요한가요? (8개)
3. ❓ 모호한 엔딩 필요한가요? (5개)
4. ❓ Ellen missing nodes를 어디에 연결할까요? (22개)
5. ❓ 서스펜스 이벤트 활성화할까요? (11개)

**확인 후 작업**:
- [ ] 불필요한 파일 삭제
- [ ] 필요한 노드 연결 매핑
- [ ] 연결 작업 시작

