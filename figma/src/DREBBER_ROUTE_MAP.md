# 드레버 대화 루트 맵

## 📍 시작점: meet_drebber
**위치**: 2층 복도 끝 (`upstairs` → `복도 끝을 조사한다`)

### 첫 만남 선택지:
1. **사건 당일 밤 행적을 묻는다** → `drebber_alibi`
2. **백작과의 사업 분쟁에 대해 묻는다** → `drebber_business_first`
3. **💎 진흙과 과거에 대해 추궁한다** → `drebber_playcount_2_question` (조건: `drebber_alibi` 방문 필요)
4. **다른 곳을 조사한다** → `continue_investigation_2`

---

## 🌳 대화 트리

### 루트 A: 알리바이 경로
```
meet_drebber
  └─ drebber_alibi (여관 알리바이)
       └─ drebber_business_from_alibi (사업 분쟁)
            └─ drebber_debt (5만 파운드 빚)
                 ├─ bedroom (침실 조사)
                 └─ main_entrance (1층)
```

### 루트 B: 사업 우선 경로
```
meet_drebber
  └─ drebber_business_first (광산 투자)
       ├─ drebber_debt (빚 추궁)
       │    ├─ bedroom
       │    └─ main_entrance
       │
       └─ drebber_1871_business (1871년 자금 의혹)
            ├─ drebber_debt
            └─ drebber_money_legitimacy (자금 출처 의문)
                 ├─ drebber_debt
                 └─ drebber_other_victims (다른 피해자 가능성)
                      ├─ drebber_revenge (드레버 추적)
                      │    ├─ bedroom
                      │    └─ continue_investigation_2
                      └─ continue_investigation_2
```

### 루트 C: 💎 진흙 추궁 경로 (핵심 단서!)
**조건**: `drebber_alibi`를 먼저 방문해야 함

```
meet_drebber
  └─ drebber_playcount_2_question (홈즈가 구두 진흙 발견!)
       ├─ drebber_mud_match (지하실 토양 샘플 대조)
       │    ├─ who_entered_basement (누가 들어갔나?)
       │    │    ├─ well (우물 조사)
       │    │    └─ main_entrance
       │    └─ find_basement (지하실 직접 조사)
       │
       ├─ drebber_fingernail_evidence (손톱 진흙 지적) ⭐
       │    ├─ drebber_basement_reason (왜 지하실에?)
       │    │    ├─ drebber_witness (목격자)
       │    │    │    ├─ stangerson_timeline_confront
       │    │    │    └─ find_basement
       │    │    │
       │    │    └─ drebber_past_indirect (10년 전 일)
       │    │         └─ drebber_hope_reaction (호프 반응!)
       │    │              ├─ search_hope_urgently (호프 긴급 수색)
       │    │              └─ stangerson_hope_question
       │    │
       │    └─ find_basement (지하실 직접 조사)
       │
       └─ continue_investigation_2 (일단 물러남)
```

---

## 🔑 핵심 단서 노드

### 1. drebber_fingernail_evidence (가장 중요!)
- **내용**: 손톱 밑 진흙 → 무언가를 "판" 증거
- **드레버 자백**: 지하실 창문을 열려고 흙을 팠음
- **다음 경로**: 
  - 지하실 조사로 직행
  - 목격자 증언 → 스탠거슨 타임라인 추궁
  - 10년 전 과거 → 호프 반응 → 호프 긴급 수색

### 2. drebber_witness
- **내용**: 드레버가 목격한 "의료 가방을 든 키 큰 남자"
- **시간**: 11시 45분 ~ 자정
- **장소**: 저택 뒤쪽, 지하실 방향
- **연결**: 스탠거슨의 알리바이와 모순

### 3. drebber_hope_reaction
- **내용**: 로켓을 보고 공포에 떠는 드레버
- **자백**: "20년을 도망쳤는데... 복수하러 온 거야..."
- **연결**: 호프의 복수 동기 확정

### 4. drebber_mud_match
- **조건**: `basement_soil` 아이템 필요
- **내용**: 지하실 토양과 구두 진흙 일치
- **결과**: 드레버가 지하실에 있었음 증명

---

## 🚫 숨겨진 선택지 조건

### 1. 💎 진흙과 과거에 대해 추궁한다
- **조건**: `requiredVisitedNode: 'drebber_alibi'`
- **이유**: 최소 한 번 드레버와 대화해야 홈즈가 관찰 가능

### 2. 진흙 성분을 대조한다
- **조건**: `requiredItem: 'basement_soil'`
- **획득 방법**: 지하실 조사 (`find_basement` → `basement_investigation`)

---

## 💡 추천 플레이 순서

### 최적 단서 수집 경로:
1. **meet_drebber** (드레버 첫 만남)
2. **drebber_alibi** (알리바이 확인) - 필수!
3. **meet_drebber** 재방문 (복도 끝 재조사)
4. **drebber_playcount_2_question** (💎 진흙 추궁 해금됨)
5. **drebber_fingernail_evidence** (손톱 진흙 지적) ⭐
6. **drebber_basement_reason** (왜 지하실에?)
7. 두 갈래:
   - A: **drebber_witness** → 스탠거슨 타임라인 추궁
   - B: **drebber_past_indirect** → 호프 반응 → 긴급 수색

### 지하실 토양 샘플 활용:
1. 지하실 먼저 조사 (`find_basement` → `basement_soil` 획득)
2. **meet_drebber** 재방문
3. **drebber_playcount_2_question** (진흙 추궁)
4. **drebber_mud_match** (과학적 증거!) ⭐

---

## ⚠️ 주의사항

### 순환 참조 방지
- 드레버 대화는 언제든 `continue_investigation_2`로 빠져나올 수 있음
- 재방문 시 `meet_drebber`가 항상 접근 가능 (hideIfVisitedNode 제거됨)

### 다회차 시스템 제거
- 모든 노드가 1회차부터 접근 가능
- `requiredVisitedNode`는 같은 플레이스루 내에서만 동작

---

## 🎯 결론

드레버 노드는 **전혀 숨겨지지 않았으며**, 오히려 **가장 풍부한 대화 트리**를 가지고 있습니다!

- **기본 노드**: 9개
- **힌트 노드**: 9개
- **총 18개의 드레버 관련 노드**

핵심은 **drebber_playcount_2_question → drebber_fingernail_evidence** 경로를 찾는 것입니다.
이 경로가 호프의 복수 동기와 지하실의 비밀로 연결됩니다!
