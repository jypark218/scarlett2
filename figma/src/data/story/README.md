# 스토리 파일 구조 📚

이 폴더는 게임의 모든 스토리 노드를 포함합니다. 파일이 길어지는 것을 방지하기 위해 **논리적 단위로 분리**되어 있습니다.

## 📁 폴더 구조

### `/locations/` - 장소별 노드
장소 기반 탐색 노드들을 포함합니다.

- **`main-hub.ts`** - 메인 허브 (현관 홀, 복귀 노드들)
- **`study-room.ts`** - 서재 관련 노드
- **`upstairs-nodes.ts`** - 2층 관련 노드 (침실, 드레버 대면)
- **`backyard-nodes.ts`** - 뒷뜰 관련 노드 (우물, 루시의 반지)
- **`diary-nodes.ts`** - 백작의 일기 관련
- **`investigation-hub.ts`** - 용의자 조사 허브
- **`index.ts`** - 모든 location 노드 통합 export

### `/interrogations/` - 심문 노드
캐릭터 심문 및 대화 노드들을 포함합니다.

- **`stangerson-initial.ts`** - 스탠거슨 초기 심문 (첫 대면, 기본 질문)
- **`stangerson-past.ts`** - 스탠거슨 과거 이야기 (독일 사건, 협박, 1861년)
- **`stangerson-resolution.ts`** - 스탠거슨 해결/행동 (속죄, 구출, 지하실 힌트)
- **`index.ts`** - 모든 interrogation 노드 통합 export

### 기타 파일들

#### 메인 구조
- **`part1-opening.ts`** - 게임 시작 ~ 저택 도착
- **`part2-first-floor.ts`** - 1층 탐색
- **`part3-second-floor.ts`** - 2층 탐색

#### 캐릭터 루트
- **`hopeEarlyNodes.ts`** - 호프 초기 노드
- **`drebberNodes.ts`** - 드레버 노드
- **`suspect-backgrounds.ts`** - 용의자 배경
- **`suspect-routes.ts`** - 용의자 선택 허브
- **`suspects-backstory.ts`** - 용의자 심화 서사

#### 특수 시스템
- **`hub-system.ts`** ⚠️ (하위호환) → 실제 노드는 `/locations/`에 있음
- **`stangerson-interrogation.ts`** ⚠️ (하위호환) → 실제 노드는 `/interrogations/`에 있음
- **`three-suspects-system.ts`** - 3명의 용의자 시스템 통합
- **`free-choice-routes.ts`** - 자유 선택 경로
- **`evidence-acquisition.ts`** - 증거 획득
- **`hub-to-suspects-bridge.ts`** - 허브와 용의자 연결

#### 엔딩
- **`good-endings.ts`** - 진엔딩 + 굿엔딩 4개
- **`bad-endings.ts`** - 배드엔딩 7개
- **`ambiguous-endings.ts`** - 찜찜한 엔딩 4개

#### 루트별
- **`well-hope-encounter.ts`** - 우물에서 호프와의 만남
- **`drebber-dark-route.ts`** - 드레버 다크 루트
- **`psychological-depth.ts`** - 심리적 깊이 노드

#### 패치/수정
- **`fixes.ts`** - 버그 수정 노드
- **`critical-fixes.ts`** - 치명적 버그 수정
- **`basement-route-fix.ts`** - 지하실 루트 수정

## 🔄 파일 분리 원칙

### 1. **장소별 분리** (`/locations/`)
- 같은 장소에서 일어나는 노드들을 그룹화
- 예: 서재, 침실, 뒷뜰, 현관 등

### 2. **기능별 분리** (`/interrogations/`)
- 같은 목적을 가진 노드들을 그룹화
- 예: 심문, 추론, 증거 수집 등

### 3. **캐릭터별 분리**
- 특정 캐릭터와 관련된 노드들
- 예: 스탠거슨, 드레버, 호프

### 4. **스토리 단계별 분리**
- 게임 진행 순서에 따라 분리
- 예: part1 (오프닝), part2 (1층), part3 (2층)

## 🔧 하위호환성

일부 파일은 기존 import를 깨뜨리지 않기 위해 **wrapper 파일**로 유지됩니다:

```typescript
// hub-system.ts (wrapper)
import { allLocationNodes } from './locations/index';
export const hubSystem = allLocationNodes;
```

실제 노드는 분리된 폴더에 있지만, 기존 코드는 그대로 작동합니다.

## 📝 새 노드 추가 방법

### 1. 적절한 카테고리 찾기
- 장소 관련? → `/locations/`
- 심문 관련? → `/interrogations/`
- 특정 캐릭터? → 해당 캐릭터 파일

### 2. 파일에 노드 추가
```typescript
export const yourNodes: Record<string, StoryNode> = {
  new_node: {
    id: 'new_node',
    day: 1,
    timeOfDay: 'afternoon',
    text: '...',
    choices: [...]
  }
};
```

### 3. index.ts에 export 추가
```typescript
import { yourNodes } from './your-file';

export const allYourCategoryNodes = {
  ...existingNodes,
  ...yourNodes  // ← 추가
};
```

## ⚠️ 주의사항

1. **절대 wrapper 파일에 직접 노드를 추가하지 마세요**
   - `hub-system.ts`, `stangerson-interrogation.ts`는 import만 합니다

2. **index.ts를 업데이트하세요**
   - 새 파일을 만들면 반드시 `index.ts`에 추가

3. **노드 ID 중복 방지**
   - 모든 노드 ID는 고유해야 합니다
   - storyData.ts에서 통합될 때 덮어씌워질 수 있습니다

4. **character 속성 검증**
   - 개발 모드에서 자동으로 대사와 character 속성을 검증합니다
   - 콘솔에서 경고를 확인하세요

## 🎯 총 노드 개수

- **메인 스토리**: ~200개 노드
- **엔딩**: 16개 (진엔딩 1, 굿 4, 배드 7, 찜찜 4)
- **자유 탐색**: 허브 시스템으로 자유롭게 이동 가능
- **다회차**: 플레이 횟수에 따라 메타적 연출 추가

---

**최종 업데이트**: 2024년 (파일 분리 완료)
