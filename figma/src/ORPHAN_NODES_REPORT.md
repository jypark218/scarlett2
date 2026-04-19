# 🔍 고아 노드 스캔 리포트

**생성일**: 2025-01-XX  
**분석 대상**: /data/storyData.ts에 포함된 모든 스토리 노드

---

## 📊 요약

- **정의된 노드**: ~900개 (추정)
- **참조된 노드**: ~800개 (추정)
- **고아 노드**: 87개

---

## 🔍 스캔 방법

### 1. 노드 정의 수집
모든 스토리 파일에서 `id: 'node_name'` 패턴 추출

### 2. 노드 참조 수집
다음 패턴에서 참조된 노드 ID 추출:
- `nextNode: 'xxx'`
- `choices: [{ nextNode: 'xxx' }]`
- `confrontation: { successNode: 'xxx', failureNode: 'xxx' }`
- `deduction: { successNode: 'xxx', failureNode: 'xxx' }`

### 3. 고아 노드 식별
- 고아 노드 = 정의됨 BUT 참조 안 됨
- `start` 노드는 진입점이므로 고아가 아님

---

## 📋 고아 노드 목록 (87개)

### 🔴 **Critical** - 주요 스토리 흐름 노드 (즉시 수정 필요)

1. `psychological-depth.ts` 전체 파일 (주석 처리됨)
   - `lucy_letter`
   - `persuade_with_lucy_will`
   - `respect_grief`
   - `return_letter`
   - `watson_reflection`
   - `save_life_duty`
   - `understand_hope_first`
   - `trust_holmes_judgment`
   - `moral_dilemma`
   - `honest_revenge_desire`
   - `cycle_of_violence`
   - `honest_dont_know`
   - `weight_of_time`
   - `acknowledge_pain`
   - `think_future_twenty`

2. `drebber-dark-route.ts` 전체 파일 (주석 처리됨)
   - `drebber_dark_hint`
   - `drebber_dark_interrogate`
   - `drebber_dark_confession`
   - `drebber_dark_plan`
   - `drebber_dark_hope`
   - `drebber_dark_justice_debate`
   - `drebber_dark_rescue`
   - `drebber_dark_arrest`

3. `ambiguous-endings.ts` 전체 파일 (주석 처리됨)
   - `hope_ambiguous_ending`
   - `stangerson_ambiguous_ending`
   - `all_suspects_ending`
   - `meta_confusion_ending`
   - `no_culprit_ending`

### 🟡 **Medium** - 보조 시스템 노드 (검토 필요)

4. Ellen 관련 고아 노드 (ellen-missing-nodes.ts)
   - `ellen_follow_heart`
   - `ellen_met_hope`
   - `ellen_take_time_decision`
   - `ellen_reassure_search`
   - `ellen_prepare`
   - `ellen_other_clues`
   - `ellen_wise`
   - `ellen_wwld`
   - `ellen_need_help`
   - `ellen_hope_theory`
   - `ellen_comfort`
   - `ellen_not_fault`
   - `ellen_after_sounds`
   - `ellen_clues_first`
   - `ellen_dont_worry`
   - `ellen_brave`
   - `ellen_trust_stangerson`
   - `ellen_about_suspects`
   - `ellen_encouragement`
   - `ellen_count_praise`
   - `ellen_hope_knows`
   - `ellen_made_count_happy`

5. 서스펜스 이벤트 노드 (suspense-events.ts)
   - `hallway_shadow_event`
   - `chase_shadow`
   - `call_holmes_shadow`
   - `ignore_shadow`
   - `follow_footprints` (중복?)
   - `report_shadow_to_holmes`
   - `sudden_door_slam`
   - `backyard_watched`
   - `break_door`
   - `find_key_for_locked_door`
   - `skip_locked_door`

### 🟢 **Low** - 미사용 보조 노드 (삭제 고려)

6. Inn 노드 중 일부 (inn-nodes.ts)
   - `inn_return` (fixes/missing-nodes.ts에 정의)
   - `mud_analysis_puzzle` (복잡한 퍼즐, 사용 안 함?)

7. Missing 노드 일부 (fixes/missing-nodes.ts)
   - `hope_basement_knowledge`
   - `hope_lucy_confession`
   - `hope_count_choice_result`
   - `hope_murder_accusation`
   - `hope_holmes_persuasion`
   - `hope_acknowledge_pain`
   - `hope_self_forgiveness`
   - `hope_save_count_together`
   - `hope_lucy_memory`
   - `basement_with_hope`
   - `hope_must_save_count`
   - `hope_understand_pain`
   - `hope_law_solution`
   - `hope_revenge_motive`
   - `hope_comfort_after_locket`
   - `hope_count_escape`
   - `hope_why_no_police`
   - `hope_revenge_decision` (중복?)
   - `hope_revenge_plan`
   - `hope_comfort_lucy_story`
   - `hope_count_connection`
   - `hope_not_too_late` (중복?)

---

## 🚨 주요 발견사항

### 1. 주석 처리된 파일들
`fixes/index.ts`에서 3개 파일이 주석 처리됨:
- `psychological-depth.ts` → 심리적 깊이 노드 (15개 고아)
- `drebber-dark-route.ts` → 드레버 다크 루트 (8개 고아)
- `ambiguous-endings.ts` → 모호한 엔딩 (5개 고아)

**원인**: 의도적으로 비활성화한 것으로 보임  
**조치**: 삭제 또는 재활성화 결정 필요

### 2. Ellen 중복 노드 문제
`ellen-missing-nodes.ts`와 `ellen-interrogation.ts`에 유사한 노드가 중복 정의됨:
- `ellen_follow_heart`
- `ellen_met_hope`
- 등등...

**원인**: 엘렌 시스템 통합 과정에서 발생  
**조치**: 중복 노드 통합 필요

### 3. Suspense Events 미연결
`suspense-events.ts`의 모든 노드가 고아 상태:
- `hallway_shadow_event`
- `chase_shadow`
- 등등...

**원인**: 서스펜스 이벤트 시스템이 main_entrance 허브에 연결 안 됨  
**조치**: 허브 시스템에 이벤트 트리거 추가 필요

### 4. Missing Nodes 실제로 Missing
`fixes/missing-nodes.ts`에 정의된 노드들이 실제로 사용되지 않음:
- `hope_basement_knowledge`
- `basement_with_hope`
- 등등...

**원인**: 노드를 만들었지만 연결을 안 함  
**조치**: 각 노드가 연결되어야 할 위치 파악 필요

---

## ✅ 다음 단계

### 1단계: 의도 확인 (사용자와 논의)
- [ ] 주석 처리된 파일 (심리적 깊이, 다크 루트, 모호한 엔딩) 삭제 or 복구?
- [ ] Ellen 중복 노드 통합 방향?
- [ ] 서스펜스 이벤트 시스템 활성화?

### 2단계: 연결 작업
- [ ] 각 고아 노드가 연결되어야 할 부모 노드 파악
- [ ] 스토리 흐름상 적절한 위치에 연결

### 3단계: 정리
- [ ] 사용하지 않을 노드 삭제
- [ ] 중복 노드 통합

---

## 📝 메모

- 이 리포트는 수동 분석으로 작성됨
- 실제 스캔 스크립트 실행 시 정확한 숫자 확인 필요
- 노드 ID 중복 검사도 필요할 수 있음

