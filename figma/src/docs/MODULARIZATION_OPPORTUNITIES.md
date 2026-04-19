# 모듈화 기회 분석 📊

## 📋 개요

프로젝트 전체를 스캔하여 추가로 모듈화 가능한 시스템들을 분석했습니다.

---

## 🎯 우선순위별 모듈화 후보

### **🔥 높은 우선순위 (즉시 리팩토링 권장)**

#### **1. GameScreen.tsx - 게임 로직 분리**

**현재 문제:**
- 챕터 결정 로직이 컴포넌트 내부에 있음 (91줄)
- UI와 비즈니스 로직이 뒤섞임
- 선택지 필터링 로직이 산재

**리팩토링 방향:**
```
/utils/game/
  ├─ chapterDetector.ts - 챕터 결정 로직
  ├─ choiceFilter.ts - 선택지 필터링 로직
  └─ gameState.ts - 게임 상태 관리
```

**예상 효과:**
- GameScreen.tsx 크기 50% 감소
- UI와 로직 명확한 분리
- 테스트 용이성 대폭 향상

---

#### **2. itemData.ts - 아이템 시스템 분리**

**현재 문제:**
- 타입 + 데이터가 한 파일에
- 아이템별 설명이 길어서 가독성 저하
- 확장 시 파일이 계속 커짐

**리팩토링 방향:**
```
/types/item.ts
  └─ ItemInfo 타입

/data/items/
  ├─ evidence.ts - 증거 아이템 (일기, 편지, 장부 등)
  ├─ keys.ts - 열쇠류 아이템
  ├─ personal.ts - 개인 소지품 (로켓, 반지 등)
  └─ index.ts - 통합 export

/data/itemData.ts
  └─ 하위 호환성 리엑스포트
```

**예상 효과:**
- 파일 크기 70% 감소 (카테고리별 분리)
- 아이템 찾기 쉬워짐
- 새 아이템 추가 시 해당 카테고리만 수정

---

#### **3. insights.ts - 통찰 시스템 분리**

**현재 문제:**
- 타입 + 데이터가 한 파일에
- 캐릭터별 통찰이 섞여있음

**리팩토링 방향:**
```
/types/insight.ts
  └─ Insight 타입

/data/insights/
  ├─ hope.ts - 호프 관련 통찰
  ├─ stangerson.ts - 스탠거슨 관련 통찰
  ├─ drebber.ts - 드레버 관련 통찰
  ├─ watson.ts - 왓슨 관련 통찰
  ├─ constants.ts - TRUE_ENDING_REQUIRED_INSIGHTS
  └─ index.ts - 통합 export

/data/insights.ts
  └─ 하위 호환성 리엑스포트
```

**예상 효과:**
- 캐릭터별 통찰 관리 용이
- 새 통찰 추가 시 해당 캐릭터 파일만 수정
- 진엔딩 조건 관리 분리

---

### **⚡ 중간 우선순위 (점진적 개선)**

#### **4. endingData.ts - 엔딩 시스템 분리**

**현재 문제:**
- 타입 + 데이터가 한 파일에
- 엔딩 타입별로 섞여있음

**리팩토링 방향:**
```
/types/ending.ts
  └─ EndingInfo 타입

/data/endings/
  ├─ good.ts - 굿 엔딩 (4개)
  ├─ bad.ts - 배드 엔딩 (7개)
  ├─ neutral.ts - 중립 엔딩 (4개)
  └─ index.ts - 통합 export

/data/endingData.ts
  └─ 하위 호환성 리엑스포트
```

**예상 효과:**
- 엔딩 타입별 관리 용이
- 엔딩 추가 시 해당 타입 파일만 수정

---

#### **5. soundHelpers.ts - 사운드 시스템 분리**

**현재 분석 필요:**
- 파일 크기와 책임 확인 필요
- 배경음악 매칭 로직 분리 가능성

**리팩토링 방향 (예상):**
```
/utils/sound/
  ├─ trackMatcher.ts - 노드 → 음악 매칭
  ├─ audioControl.ts - 재생 제어
  └─ constants.ts - 음악 URL 상수
```

---

#### **6. storyHelpers.ts - 스토리 빌더 유틸 분리**

**현재 문제:**
- 여러 헬퍼 함수가 한 파일에
- 각 함수의 역할이 명확하게 분리되지 않음

**리팩토링 방향:**
```
/utils/story/
  ├─ nodeBuilder.ts - createNode, createEnding
  ├─ choiceBuilder.ts - createChoice
  ├─ chainBuilder.ts - createDialogueChain
  └─ templates.ts - 조사 노드 템플릿 등
```

**예상 효과:**
- 각 빌더의 책임 명확화
- 새 빌더 추가 용이

---

### **💡 낮은 우선순위 (선택적)**

#### **7. characterInfoData.ts**
- 캐릭터 상세 정보 (갤러리용)
- 현재 크기 작아서 급하지 않음

#### **8. itemCharacterLinks.ts**
- 아이템-캐릭터 연결 데이터
- 현재 크기 작아서 급하지 않음

---

## 📊 리팩토링 효과 예상

### **Before (현재)**
```
/data/
  ├─ itemData.ts (추정 300줄+)
  ├─ insights.ts (78줄)
  ├─ endingData.ts (149줄)
  └─ ...

/utils/
  ├─ storyHelpers.ts (추정 200줄+)
  ├─ soundHelpers.ts (추정 150줄+)
  └─ ...

/components/
  └─ GameScreen.tsx (추정 800줄+)
```

### **After (리팩토링 후)**
```
/types/
  ├─ item.ts (타입만)
  ├─ insight.ts (타입만)
  └─ ending.ts (타입만)

/data/
  ├─ items/ (카테고리별 분리)
  ├─ insights/ (캐릭터별 분리)
  ├─ endings/ (타입별 분리)
  └─ ...

/utils/
  ├─ game/ (게임 로직)
  ├─ story/ (스토리 빌더)
  ├─ sound/ (사운드 시스템)
  └─ ...

/components/
  └─ GameScreen.tsx (UI만, 50% 감소)
```

---

## 🎯 리팩토링 순서 제안

### **Phase 1: 데이터 분리 (1-2일)**
1. ✅ itemData.ts → items/ 폴더로 분리
2. ✅ insights.ts → insights/ 폴더로 분리
3. ✅ endingData.ts → endings/ 폴더로 분리

### **Phase 2: 로직 분리 (2-3일)**
4. ✅ GameScreen.tsx 로직 → game/ 폴더로 분리
5. ✅ storyHelpers.ts → story/ 폴더로 분리
6. ✅ soundHelpers.ts → sound/ 폴더로 분리

### **Phase 3: 검증 및 정리 (1일)**
7. ✅ 하위 호환성 확인
8. ✅ 문서 업데이트
9. ✅ 테스트

---

## 📈 예상 개선 효과

| 항목 | Before | After | 개선 |
|------|--------|-------|------|
| **평균 파일 크기** | 300줄 | 150줄 | 50% ↓ |
| **모듈 개수** | 10개 | 30개 | 명확성 ↑ |
| **변경 영향 범위** | 넓음 | 좁음 | 안정성 ↑ |
| **테스트 용이성** | 어려움 | 쉬움 | 품질 ↑ |

---

## 🔥 최우선 추천 (빠른 효과)

### **1. itemData.ts 분리**
- 즉시 효과적
- 파일 크기 대폭 감소
- 아이템 관리 편의성 증가

### **2. GameScreen.tsx 로직 분리**
- 컴포넌트 크기 50% 감소
- UI/로직 명확한 분리
- 테스트 가능성 증가

### **3. insights.ts 분리**
- 캐릭터별 관리 용이
- 진엔딩 조건 분리

---

## ✨ 핵심 원칙 (대화/배경 시스템과 동일)

1. **단일 책임 원칙** - 하나의 파일은 하나의 책임만
2. **의존성 격리** - 변경 사항의 영향 범위 최소화
3. **하위 호환성** - 기존 코드는 수정 없이 작동
4. **명확한 구조** - 파일 이름만 봐도 역할 파악 가능

---

## 🎉 결론

**총 6개 시스템을 모듈화하면:**
- ✅ 파일 크기 평균 50% 감소
- ✅ 책임 명확화로 유지보수 용이
- ✅ 새 기능 추가 시 영향 범위 최소화
- ✅ 테스트 및 디버깅 편의성 증가

**권장 시작 순서:**
1. itemData.ts (가장 효과적)
2. GameScreen.tsx (가장 중요)
3. insights.ts (비교적 쉬움)

---

## 📚 관련 문서

- [대화 시스템 리팩토링](/docs/DIALOGUE_REFACTORING.md)
- [배경 시스템 리팩토링](/docs/BACKGROUND_REFACTORING.md)
- [전체 리팩토링 요약](/docs/REFACTORING_SUMMARY.md)
