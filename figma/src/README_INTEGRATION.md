# 📚 피그마 메이크 통합 문서 총정리

> 셸록 홈즈 "주홍색 연구" × 모로 백작의 저택  
> 엘렌(루시의 딸) 중심 허브 시스템 완전 가이드

---

## 🎯 이 프로젝트는...

**엘렌이 루시의 딸**이라는 핵심 설정을 바탕으로, 각 장소에서 얻은 단서가 어떻게 다음 대화를 해금하고 무한 루프를 방지하는지 구현한 비주얼 노벨 게임입니다.

---

## 📁 문서 구조

### 1️⃣ [QUICKSTART_GUIDE.md](/QUICKSTART_GUIDE.md) - **가장 먼저 보세요!**
- ⏱️ **5분** 만에 핵심 파악
- 3대 원칙 (허브-스포크, 플래그, hideIfVisited)
- 즉시 복사 가능한 템플릿
- **추천:** 처음 시작하는 분

### 2️⃣ [FIGMA_MAKE_INTEGRATION_GUIDE.md](/FIGMA_MAKE_INTEGRATION_GUIDE.md) - **상세 가이드**
- 📖 **완전한** 허브별 설계 문서
- 7개 허브 전체 구조 (지하실/여관/스탠거슨/엘렌/백작/다락방/최종추리)
- 플래그 시스템 전체 목록
- 게임 흐름도
- **추천:** 전체 구조 이해가 필요한 분

### 3️⃣ [IMPLEMENTATION_EXAMPLES.md](/IMPLEMENTATION_EXAMPLES.md) - **코드 예시**
- 💻 **복사 붙여넣기** 가능한 실제 코드
- 5개 주요 허브 완전 구현
- Context API 레퍼런스
- 디버깅 팁
- **추천:** 실제 구현하는 분

### 4️⃣ [FINAL_SYSTEM_COMPLETE.md](/FINAL_SYSTEM_COMPLETE.md) - **완성 보고서**
- ✅ 프로젝트 전체 통계
- Phase 1~3 진행 과정
- 71개 신규 노드 목록
- 플레이어 경험 개선 사항
- **추천:** 프로젝트 관리자

### 5️⃣ [FIRST_FLOOR_EXPLORATION_GUIDE.md](/FIRST_FLOOR_EXPLORATION_GUIDE.md) - **1층 탐색 시스템** ⭐ NEW
- 🏛️ 마차 시퀀스 → 1층 허브 → 단서 수집
- 서재 조사 (가계도 위조 발견)
- 부엌 조사 (진흙 자국 발견)
- 단서 연동 로직 (백작/스탠거슨 대화 해금)
- **추천:** 게임 초반 구현하는 분

---

## 🚀 빠른 시작 3단계

### Step 1: 개념 이해 (5분)
```bash
📖 QUICKSTART_GUIDE.md 읽기
```
- 허브-스포크 구조
- 플래그 기반 해금
- hideIfVisited 패턴

### Step 2: 구조 파악 (15분)
```bash
📖 FIGMA_MAKE_INTEGRATION_GUIDE.md 읽기
```
- 7개 허브 전체 맵
- 단서 연결망
- 조건부 진행 로직

### Step 3: 구현 (30분)
```bash
📖 IMPLEMENTATION_EXAMPLES.md 보고 코드 복사
```
- 지하실 허브
- 여관 허브
- 엘렌 허브
- 스탠거슨 허브
- 최종 추리 허브

---

## 🎮 핵심 게임 플로우

```
[오프닝] 
   ↓
[1층 탐색] → 스탠거슨 발견
   ↓
[2층 탐색] → 엘렌 발견 (다락방)
   ↓
[지하실] → 의식실 조사 → clue_ritual_found = true
   ↓
[여관] → 루시 편지 발견 → has_lucy_letter = true
   ↓
[엘렌 각성] → show_lucy_letter_to_ellen → ellen_awakened = true
   ↓
[스탠거슨 폭로] → 3개 질문 완료 → 증거 제시
   ↓
[최종 추리] → 스탠거슨 지목 → 3단계 추궁
   ↓
[엔딩] → 트루/굿/배드
```

---

## 🔧 시스템 핵심 요소

### 1. 허브-스포크 구조
```
모든 대화 → 허브 복귀 → 무한 루프 방지
```

### 2. 플래그 기반 해금
```
조사 → 플래그 → 대화 해금 → 진행
```

### 3. 단서 체인
```
examine_ritual_tools → count_ritual_confession
acquire_lucy_letter → ellen_awakened
stangerson 3질문 → stangerson_reveals
```

### 4. 조건부 진행
```
3개 증거 + 핵심 대화 → 최종 추리 허브
스탠거슨 지목 + 3단계 추궁 → 엔딩
```

---

## 📊 프로젝트 통계

| 항목 | 수량 |
|------|------|
| **신규 노드** | 71개 |
| **허브 시스템** | 7개 |
| **조건부 선택지** | 65개 |
| **플래그** | 20개 |
| **엔딩** | 12개 |
| **완성도** | 100% ✅ |

---

## 🎯 각 문서 사용법

### 상황별 추천

| 상황 | 문서 | 시간 |
|------|------|------|
| **처음 접함** | QUICKSTART_GUIDE.md | 5분 |
| **전체 파악** | FIGMA_MAKE_INTEGRATION_GUIDE.md | 15분 |
| **코드 작성** | IMPLEMENTATION_EXAMPLES.md | 30분 |
| **완성 확인** | FINAL_SYSTEM_COMPLETE.md | 10분 |

### 역할별 추천

| 역할 | 문서 | 목적 |
|------|------|------|
| **개발자** | IMPLEMENTATION_EXAMPLES.md | 코드 복사 |
| **기획자** | FIGMA_MAKE_INTEGRATION_GUIDE.md | 구조 이해 |
| **PM** | FINAL_SYSTEM_COMPLETE.md | 진행 확인 |
| **신규 팀원** | QUICKSTART_GUIDE.md | 빠른 온보딩 |

---

## 🛠️ 구현 체크리스트

복사해서 사용하세요!

```markdown
## Phase 1: 지하실 허브
- [ ] examine_ritual_tools 구현
- [ ] clue_ritual_found 플래그 설정
- [ ] count_hub 조건부 선택지
- [ ] count_ritual_confession 연결

## Phase 2: 여관 허브
- [ ] inn_drebber_room 허브 구현
- [ ] inn_room_desk 조사
- [ ] acquire_lucy_letter 체인
- [ ] has_lucy_letter 플래그

## Phase 3: 엘렌 허브
- [ ] ellen_hub 중앙 노드
- [ ] show_lucy_letter_to_ellen
- [ ] ellen_awakened 플래그
- [ ] ellen_ready_to_confront 조건

## Phase 4: 스탠거슨 허브
- [ ] stangerson_hub 중앙 노드
- [ ] 3개 질문 노드 (허브 복귀)
- [ ] 진행 추적 플래그
- [ ] 증거 제시 조건

## Phase 5: 최종 추리
- [ ] final_deduction_checkpoint
- [ ] 4명 용의자 지목
- [ ] accuse_stangerson 정답 경로
- [ ] 3단계 증거 제시
- [ ] 엔딩 분기
```

---

## 🔥 즉시 사용 가능한 코드

### 허브 템플릿 (10초)
```typescript
hub_name: {
  id: 'hub_name',
  choices: [
    { text: '행동1', nextNode: 'action1', hideIfVisitedNode: 'action1' },
    { text: '행동2', nextNode: 'action2', hideIfVisitedNode: 'action2' },
    { text: '나간다', nextNode: 'parent_hub' }
  ]
}
```

### 조건부 선택지 (5초)
```typescript
{
  text: '단서 필요',
  nextNode: 'next',
  showIf: (ctx) => ctx.flags.clue_found === true,
  hideIfVisitedNode: 'next'
}
```

### 증거 획득 (5초)
```typescript
acquire_clue: {
  choices: [{
    text: '획득',
    nextNode: 'hub',
    onSelect: (ctx) => {
      ctx.flags.clue_found = true;
      ctx.addItem('증거');
    }
  }]
}
```

---

## ⚠️ 자주 묻는 질문

### Q1: 어떤 문서부터 읽어야 하나요?
**A:** QUICKSTART_GUIDE.md → FIGMA_MAKE_INTEGRATION_GUIDE.md → IMPLEMENTATION_EXAMPLES.md 순서로!

### Q2: 코드만 빨리 보고 싶어요!
**A:** IMPLEMENTATION_EXAMPLES.md로 바로 가세요!

### Q3: 전체 구조를 파악하고 싶어요!
**A:** FIGMA_MAKE_INTEGRATION_GUIDE.md의 흐름도를 보세요!

### Q4: 무한 루프가 생겨요!
**A:** QUICKSTART_GUIDE.md의 "흔한 실수 TOP 3" 참고!

### Q5: 선택지가 안 보여요!
**A:** IMPLEMENTATION_EXAMPLES.md의 "디버깅 팁" 참고!

---

## 🎓 학습 로드맵

### 초급 (1시간)
1. QUICKSTART_GUIDE.md 읽기 (5분)
2. 템플릿 1개 복사해서 테스트 (10분)
3. 지하실 허브 구현 (15분)
4. 여관 허브 구현 (15분)
5. 엘렌 허브 구현 (15분)

### 중급 (2시간)
1. FIGMA_MAKE_INTEGRATION_GUIDE.md 읽기 (15분)
2. 스탠거슨 허브 구현 (30분)
3. 백작 허브 구현 (30분)
4. 다락방 허브 구현 (30분)
5. 테스트 및 디버깅 (15분)

### 고급 (3시간)
1. 최종 추리 허브 구현 (1시간)
2. 엔딩 분기 구현 (1시간)
3. 전체 플레이 테스트 (30분)
4. 최적화 및 버그 수정 (30분)

---

## 📞 지원

### 문제 해결 순서
1. **QUICKSTART_GUIDE.md** - 기본 개념 확인
2. **IMPLEMENTATION_EXAMPLES.md** - 디버깅 팁 참고
3. **FIGMA_MAKE_INTEGRATION_GUIDE.md** - 전체 구조 재확인
4. **FINAL_SYSTEM_COMPLETE.md** - 완성 사례 참고

### 체크리스트
```
□ 플래그 이름이 일치하는가?
□ hideIfVisitedNode가 있는가?
□ 모든 노드가 허브로 복귀하는가?
□ showIf 조건이 정확한가?
□ 아이템 이름이 일치하��가?
```

---

## 🌟 핵심 포인트 3가지

### 1. 허브-스포크 구조
```
모든 대화 노드 → 반드시 허브로 복귀
```

### 2. 플래그 기반 해금
```
조사 → 플래그 설정 → 대화 해금
```

### 3. hideIfVisited
```
모든 선택지 → hideIfVisitedNode 필수
```

---

## 🎉 최종 체크

구현 전에 확인하세요!

- [ ] QUICKSTART_GUIDE.md 읽음
- [ ] 허브-스포크 구조 이해
- [ ] 플래그 시스템 이해
- [ ] hideIfVisited 패턴 이해
- [ ] 템플릿 코드 테스트 완료

구현 후에 확인하세요!

- [ ] 모든 허브가 작동함
- [ ] 무한 루프 없음
- [ ] 조건부 선택지 정상 작동
- [ ] 단서 체인 연결됨
- [ ] 엔딩 도달 가능

---

## 📚 문서 요약

| 문서 | 길이 | 내용 | 대상 |
|------|------|------|------|
| **QUICKSTART_GUIDE.md** | 짧음 | 핵심 개념 + 템플릿 | 초급 |
| **FIGMA_MAKE_INTEGRATION_GUIDE.md** | 긴편 | 전체 구조 + 설계 | 중급 |
| **IMPLEMENTATION_EXAMPLES.md** | 중간 | 실제 코드 + 예시 | 개발자 |
| **FINAL_SYSTEM_COMPLETE.md** | 긴편 | 완성 보고서 | PM/기획자 |

---

## 🚀 지금 시작하세요!

```bash
1. QUICKSTART_GUIDE.md 읽기 (5분)
2. 템플릿 복사해서 테스트 (10분)
3. 첫 허브 구현 (15분)
4. 완성! 🎉
```

---

**프로젝트 상태:** ✅ 완성  
**최종 업데이트:** 2024-12-19  
**버전:** 1.0.0

**Good luck! 🎮**