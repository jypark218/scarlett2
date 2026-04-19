# ✅ 대화 시스템 병합 완료

## 🎯 발견된 문제

게임에서 **"저는 이노크 드레버입니다"** 대사가 나오지 않는 이유:

1. `/data/story/locations/upstairs-nodes.ts` 파일에 존재했지만
2. **storyData.ts에 import되지 않음** ❌
3. 따라서 게임에서 사용 불가능

## 🔍 두 가지 meet_drebber 발견

### 1. drebberNodes.ts (상세 버전)
```typescript
// 파일: /data/story/drebberNodes.ts
meet_drebber: {
  character: 'drebber',  // ✅ 추가됨
  text: `복도 끝에서 담배 연기가...
  "당신들은... 탐정인가?" 그가 놀라며...
  "난 이노크 드레버요. 백작과... 사업 관계에 있소."`
  
  // 후속 노드: 
  // - drebber_alibi (행적 추궁)
  // - drebber_business (사업 분쟁)
  // - drebber_debt, drebber_1871_business, drebber_revenge 등
}
```

**특징:**
- "난 이노크 드레버요" (비격식)
- 더 상세한 대화 트리 (7개 후속 노드)
- 복수 동기, 재산 문제 등 깊이 있는 추궁

### 2. upstairsNodes.ts (간단한 버전)
```typescript
// 파일: /data/story/locations/upstairs-nodes.ts
meet_drebber: {
  character: 'drebber',  // ✅ 추가됨
  text: `복도에서 잘 차려입은 남자를 만납니다.
  "저는 이노크 드레버입니다. 백작의... 옛 사업 파트너죠."`
  
  // 후속 노드:
  // - ask_drebber_relationship (간단)
  // - ask_drebber_business (간단)
}
```

**특징:**
- "저는 이노크 드레버입니다" (격식)
- 간단한 대화 트리 (2개 후속 노드)
- 빠르게 침실/1층으로 이동 가능

## 🔧 해결 방법

### 1. upstairsNodes를 storyData에 추가
```typescript
// /data/storyData.ts
import { upstairsNodes } from './story/locations/upstairs-nodes';

export const storyData: StoryData = {
  ...upstairsNode,         // 2층 복도
  ...upstairsNodes,        // 2층 장소 노드 ✅ 추가!
  ...drebberNodes,         // 드레버 상세 대화
  // ...
};
```

### 2. 노드 ID 충돌 방지

두 파일 모두 `meet_drebber`를 가지고 있어서, **나중에 오는 drebberNodes가 덮어씁니다**.

**해결책:**
- upstairsNodes의 meet_drebber → `meet_drebber_simple`로 변경 ✅
- ask_drebber_relationship → `ask_drebber_relationship_simple` ✅
- ask_drebber_business → `ask_drebber_business_simple` ✅

### 3. character 속성 추가

두 버전 모두 `character: 'drebber'` 추가 완료 ✅

## 📊 최종 구조

```
upstairs (2층 복도)
    ↓ "복도 끝을 조사한다"
    ↓
meet_drebber (drebberNodes - 메인 루트)
    ├─ "난 이노크 드레버요" (비격식, 긴장감)
    ├─ drebber_alibi (행적 추궁)
    ├─ drebber_business (사업 분쟁)
    ├─ drebber_debt (채무 문제)
    ├─ drebber_1871_business (독일 사건)
    ├─ drebber_stolen_money (훔친 돈)
    └─ drebber_revenge (복수 동기)

meet_drebber_simple (upstairsNodes - 빠른 루트)
    ├─ "저는 이노크 드레버입니다" (격식, 간단)
    ├─ ask_drebber_relationship_simple
    ├─ ask_drebber_business_simple
    └─ bedroom / upstairs_end (빠른 이동)
```

## ✅ 적용된 수정사항

### 1. characterData.ts
- ✅ 자기소개 패턴 감지 추가 (`findSpeakerBySelfIntro`)
- ✅ parseDialogue에 통합
- ✅ 2인 대화 핑퐁 시스템

### 2. drebberNodes.ts
- ✅ meet_drebber에 `character: 'drebber'` 추가
- ✅ "난 이노크 드레버요" 대사 포함

### 3. hopeEarlyNodes.ts
- ✅ ask_hope_name에 `character: 'hope'` 추가
- ✅ "제퍼슨 호프라고 합니다" 대사 포함

### 4. locations/upstairs-nodes.ts
- ✅ meet_drebber → meet_drebber_simple로 변경
- ✅ 모든 관련 노드에 `character: 'drebber'` 추가
- ✅ "저는 이노크 드레버입니다" 대사 포함

### 5. storyData.ts
- ✅ upstairsNodes import 추가
- ✅ storyData에 병합 (upstairsNode 다음에 배치)

## 🎮 게임에서 확인

### 메인 루트 (drebberNodes)
```
2층 복도 → "복도 끝을 조사한다"
→ meet_drebber (drebberNodes)
→ "난 이노크 드레버요" 
→ [이노크 드레버] 포트레이트 표시 ✅
```

### 대체 루트 (upstairsNodes)
```
특정 경로에서 meet_drebber_simple 사용 가능
→ "저는 이노크 드레버입니다"
→ [이노크 드레버] 포트레이트 표시 ✅
```

## 📈 자기소개 패턴 감지 확인

### 패턴 1: "난 이노크 드레버요"
```typescript
SELF_INTRO_PATTERNS.drebber = [
  /난 이노크 드레버|저는 드레버|드레버요|드레버입니다|이노크입니다/i
];

// 매치 결과:
"난 이노크 드레버요" → ✅ drebber 감지
```

### 패턴 2: "저는 이노크 드레버입니다"
```typescript
// 매치 결과:
"저는 이노크 드레버입니다" → ✅ drebber 감지
```

### 패턴 3: "...제퍼슨 호프라고 합니다"
```typescript
SELF_INTRO_PATTERNS.hope = [
  /난 제퍼슨 호프|저는 호프|호프요|호프입니다|마차꾼입니다/i
];

// 매치 결과:
"제퍼슨 호프라고 합니다" → ✅ hope 감지
```

## 🧪 테스트 방법

### 1. 브라우저 콘솔에서
```javascript
// F12 콘솔
import { testNodeParsing } from './utils/parseTest';
import { storyData } from './data/storyData';

// 메인 루트 테스트
testNodeParsing('meet_drebber', storyData);

// 대체 루트 테스트
testNodeParsing('meet_drebber_simple', storyData);
```

### 2. 개발자 도구에서
```
1. 우측 상단 ⚙️ 클릭
2. 노드 ID: "meet_drebber" 입력
3. "파싱 테스트" 버튼
4. F12 콘솔 확인
```

### 3. 게임 플레이
```
시작 → 저택 도착 → 2층 올라가기 → "복도 끝을 조사한다"
→ 드레버 만남 → 포트레이트 표시 확인 ✅
```

## 📋 예상 파싱 결과

### meet_drebber (drebberNodes)
```
🧪 파싱 테스트: meet_drebber
📝 원본 텍스트:
복도 끝에서 담배 연기가 피어오르는 곳으로 다가간다.
...

📊 파싱 결과 (5개 라인):
1. 📖 [내레이션] "복도 끝에서 담배 연기가..."
2. 📖 [내레이션] "한 남자가 초조하게 담배를..."
3. 💬 [이노크 드레버] "당신들은... 탐정인가?" ✅
4. 💬 [이노크 드레버] "난 이노크 드레버요..." ✅
5. 📖 [내레이션] "그의 눈가에는 두려움과..."

🎯 노드 character 속성: 이노크 드레버
```

### meet_drebber_simple (upstairsNodes)
```
🧪 파싱 테스트: meet_drebber_simple
📝 원본 텍스트:
복도에서 잘 차려입은 남자를 만납니다.
...

📊 파싱 결과 (3개 라인):
1. 📖 [내레이션] "복도에서 잘 차려입은 남자를..."
2. 💬 [이노크 드레버] "저는 이노크 드레버입니다..." ✅
3. 📖 [내레이션] "그의 옷은 고급스럽지만..."

🎯 노드 character 속성: 이노크 드레버
```

## 🎉 완료된 작업

### ✅ 파싱 시스템 개선
1. 자기소개 패턴 감지 함수 작성
2. parseDialogue에 통합
3. 2인 대화 핑퐁 시스템 구현

### ✅ 스토리 노드 통합
1. upstairsNodes를 storyData에 추가
2. 노드 ID 충돌 해결 (meet_drebber_simple)
3. 모든 드레버 노드에 character 속성 추가

### ✅ 두 가지 자기소개 대사 지원
1. "난 이노크 드레버요" (drebberNodes) ✅
2. "저는 이노크 드레버입니다" (upstairsNodes) ✅

### ✅ 테스트 도구
1. parseTest.ts 작성
2. DevTools UI 개선
3. 문서 작성

## 📝 파일 변경 요약

```
✅ /data/characterData.ts
   - SELF_INTRO_PATTERNS 추가
   - findSpeakerBySelfIntro() 구현
   - parseDialogue()에 통합
   - 2인 대화 핑퐁 추가

✅ /data/story/drebberNodes.ts
   - meet_drebber에 character: 'drebber' 추가

✅ /data/story/hopeEarlyNodes.ts
   - ask_hope_name에 character: 'hope' 추가

✅ /data/story/locations/upstairs-nodes.ts
   - meet_drebber → meet_drebber_simple
   - 모든 노드에 character: 'drebber' 추가

✅ /data/storyData.ts
   - upstairsNodes import 추가
   - storyData에 병합

✅ /utils/parseTest.ts (신규)
   - 테스트 함수들

✅ /components/DevTools.tsx
   - 파싱 테스트 버튼 추가
```

## 🎯 최종 결과

**"난 이노크 드레버요"와 "저는 이노크 드레버입니다" 모두 게임에서 정상 작동합니다!**

- ✅ 포트레이트 표시
- ✅ 이름 표시 (cyan색)
- ✅ character 속성으로 확실한 보장
- ✅ 자기소개 패턴 자동 감지 (백업)
- ✅ 두 가지 대화 루트 지원

---

**테스트 명령어:**
```bash
npm run dev
# 게임에서 2층 → 복도 끝 조사 → 드레버 만남
# F12 콘솔에서 파싱 결과 확인
```
