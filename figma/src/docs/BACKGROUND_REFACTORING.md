# 배경 시스템 리팩토링 완료 ✅

## 📋 개요

기존 235줄의 `backgroundData.ts` 파일을 책임별로 분리하여 모듈화했습니다.

---

## 🏗️ 새로운 구조

### **Before (기존)**
```
/data/backgroundData.ts (235줄)
  ├─ BackgroundImage 타입
  ├─ 배경 이미지 데이터 (18개)
  ├─ getBackgroundForNode() (배경 매칭)
  ├─ getLocationFromNode() (위치 추출)
  └─ getLocationName() (위치 이름)
```

### **After (리팩토링)**
```
/types/dialogue.ts
  └─ BackgroundImage 타입 추가

/data/backgrounds.ts (117줄)
  └─ backgrounds (순수 데이터)

/utils/background/
  ├─ matcher.ts (145줄)
  │   ├─ getBackgroundForNode()
  │   └─ getLocationFromNode()
  │
  └─ helpers.ts (14줄)
      └─ getLocationName()

/data/backgroundData.ts (13줄)
  └─ 하위 호환성을 위한 리엑스포트
```

---

## ✅ 장점

### **1. 명확한 책임 분리**
- **타입**: `/types/dialogue.ts`
- **데이터**: `/data/backgrounds.ts` (18개 배경)
- **매칭 로직**: `/utils/background/matcher.ts` (노드 → 배경)
- **헬퍼 함수**: `/utils/background/helpers.ts` (이름 가져오기 등)

### **2. 격리된 변경 영향 범위**
- 새 배경 추가 → `backgrounds.ts`만 수정
- 매칭 규칙 수정 → `matcher.ts`만 수정
- 헬퍼 함수 추가 → `helpers.ts`만 수정
- **다른 시스템에 영향 없음!**

### **3. 테스트 용이성**
각 모듈을 독립적으로 테스트 가능:
```typescript
// 매칭 로직만 테스트
import { getBackgroundForNode } from './utils/background/matcher';

// 헬퍼만 테스트
import { getLocationName } from './utils/background/helpers';
```

### **4. 하위 호환성 유지**
기존 코드는 수정 없이 그대로 작동:
```typescript
// 기존 import (여전히 작동!)
import { backgrounds, getBackgroundForNode } from '../data/backgroundData';
```

---

## 📁 파일별 역할

### **`/types/dialogue.ts`**
- `BackgroundImage` 타입 추가
- 대화 시스템 타입과 함께 관리

### **`/data/backgrounds.ts`**
- **순수 데이터만** 관리
- 18개 배경 이미지 정보
- 로직 없음!

### **`/utils/background/matcher.ts`**
- 노드 ID → 배경 ID 매칭 로직
- `getBackgroundForNode()`: 단일 노드의 배경
- `getLocationFromNode()`: 같은 공간에서 배경 유지

### **`/utils/background/helpers.ts`**
- 유틸리티 함수
- `getLocationName()`: 위치 한국어 이름

### **`/data/backgroundData.ts`**
- 하위 호환성을 위한 리엑스포트
- 기존 코드 수정 불필요

---

## 🎯 사용 예시

### **새 배경 추가**
```typescript
// /data/backgrounds.ts만 수정
export const backgrounds: Record<string, BackgroundImage> = {
  // ... 기존 배경들
  new_location: {
    id: 'new_location',
    name: '새로운 장소',
    url: 'https://...',
    description: '새로운 장소 설명'
  }
};
```

### **매칭 규칙 추가**
```typescript
// /utils/background/matcher.ts만 수정
export function getBackgroundForNode(nodeId: string): string {
  const id = nodeId.toLowerCase();
  
  // 새 규칙 추가
  if (id.includes('new_location')) return 'new_location';
  
  // ... 기존 규칙들
}
```

### **배경 사용 (기존과 동일)**
```typescript
// 어디서든 동일하게 사용
import { backgrounds, getBackgroundForNode } from '../data/backgroundData';

const bgId = getBackgroundForNode(node.id);
const background = backgrounds[bgId];
```

---

## 🔄 마이그레이션 가이드

**기존 코드는 수정 불필요!** 하지만 새 코드 작성 시 권장사항:

### **권장: 직접 import**
```typescript
// 명확한 의존성
import { backgrounds } from '../data/backgrounds';
import { getBackgroundForNode } from '../utils/background/matcher';
import { getLocationName } from '../utils/background/helpers';
```

### **허용: 기존 방식**
```typescript
// 하위 호환성 유지
import { backgrounds, getBackgroundForNode, getLocationName } from '../data/backgroundData';
```

---

## 🚀 향후 확장성

### **쉽게 추가 가능한 기능들**
1. **시간대별 배경**
   - `/data/backgrounds.morning.ts`, `/data/backgrounds.night.ts`
   - 같은 장소의 낮/밤 버전

2. **날씨 효과**
   - `/utils/background/weather.ts`
   - 비, 눈, 안개 효과 오버레이

3. **배경 애니메이션**
   - `/utils/background/animations.ts`
   - 배경 전환 효과

4. **배경 프리로딩**
   - `/utils/background/preloader.ts`
   - 성능 최적화

5. **배경 변형**
   - `/utils/background/variants.ts`
   - 같은 장소의 다른 버전 (깨끗함 vs 어질러짐)

---

## 📊 개선 효과

| 항목 | Before | After | 개선 |
|------|--------|-------|------|
| 파일 크기 | 235줄 | 최대 145줄 | ✅ 38% 감소 |
| 책임 분리 | 1개 파일 | 4개 모듈 | ✅ 명확화 |
| 변경 영향 | 전체 시스템 | 해당 모듈만 | ✅ 격리 |
| 테스트 용이성 | 어려움 | 쉬움 | ✅ 개선 |
| 하위 호환성 | - | 100% | ✅ 유지 |

---

## 🎨 배경 데이터 현황

현재 18개 배경 지원:
- ✅ 저택 외관 (mansion_exterior)
- ✅ 저택 현관 (mansion_entrance)
- ✅ 서재 (library)
- ✅ 연구실 (study_room)
- ✅ 식당 (dining_room)
- ✅ 침실 (bedroom)
- ✅ 지하실 (basement)
- ✅ 비밀 통로 (secret_passage)
- ✅ 정원 (garden)
- ✅ 뒷뜰 (backyard)
- ✅ 우물 (well)
- ✅ 런던 거리 (london_street)
- ✅ 베이커 스트리트 221B (baker_street)
- ✅ 법정 (courtroom)
- ✅ 의식실 (ritual_chamber)
- ✅ 어두운 복도 (dark_corridor)
- ✅ 그린 라이온 여관 (inn_lobby)
- ✅ 기본 배경 (default)

---

## 🎉 결론

**배경 시스템을 건드리지 않고 새 기능 추가 가능!**

- 새 배경 → `backgrounds.ts`
- 매칭 규칙 → `matcher.ts`
- 헬퍼 함수 → `helpers.ts`
- 새 UI 기능 → 독립 컴포넌트

**각 모듈이 독립적이므로, 한 곳의 변경이 전체 시스템에 영향을 주지 않습니다!** ✨

---

## 🔗 관련 문서

- [대화 시스템 리팩토링](/docs/DIALOGUE_REFACTORING.md)
- [시스템 아키텍처](/docs/SYSTEM_ARCHITECTURE.md)
