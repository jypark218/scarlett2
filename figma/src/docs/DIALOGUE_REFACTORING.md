# 대화 시스템 리팩토링 완료 ✅

## 📋 개요

기존 671줄의 거대한 `characterData.ts` 파일을 책임별로 분리하여 모듈화했습니다.

---

## 🏗️ 새로운 구조

### **Before (기존)**
```
/data/characterData.ts (671줄)
  ├─ CharacterData 타입
  ├─ DialogueLine 타입
  ├─ 캐릭터 데이터
  ├─ 자기소개 패턴
  ├─ 화자 인식 시스템
  ├─ 텍스트 분할 함수
  └─ parseDialogue (메인 파싱 함수)
```

### **After (리팩토링)**
```
/types/dialogue.ts (25줄)
  ├─ CharacterData 타입
  ├─ DialogueLine 타입
  └─ SpeakerPattern 타입

/data/characters.ts (74줄)
  ├─ characterData (순수 데이터)
  ├─ characters (별칭)
  └─ characterPortraits (헬퍼)

/utils/dialogue/
  ├─ speakerDetector.ts (199줄)
  │   ├─ findSpeakerBySelfIntro()
  │   ├─ findSpeakerInText()
  │   ├─ findLastMentionedSpeaker()
  │   └─ SPEAKER_MAP
  │
  ├─ textSplitter.ts (97줄)
  │   └─ splitLongDialogues()
  │
  └─ parser.ts (348줄)
      └─ parseDialogue() (메인 함수)

/data/characterData.ts (10줄)
  └─ 하위 호환성을 위한 리엑스포트
```

---

## ✅ 장점

### **1. 명확한 책임 분리**
- **타입**: `/types/dialogue.ts`
- **데이터**: `/data/characters.ts`
- **화자 감지**: `/utils/dialogue/speakerDetector.ts`
- **텍스트 분할**: `/utils/dialogue/textSplitter.ts`
- **파싱**: `/utils/dialogue/parser.ts`

### **2. 격리된 변경 영향 범위**
- 새 캐릭터 추가 → `characters.ts`만 수정
- 화자 인식 개선 → `speakerDetector.ts`만 수정
- 파싱 로직 수정 → `parser.ts`만 수정
- **대사 시스템 전체가 영향받지 않음!**

### **3. 테스트 용이성**
각 모듈을 독립적으로 테스트 가능:
```typescript
// 화자 감지만 테스트
import { findSpeakerInText } from './utils/dialogue/speakerDetector';

// 텍스트 분할만 테스트
import { splitLongDialogues } from './utils/dialogue/textSplitter';
```

### **4. 하위 호환성 유지**
기존 코드는 수정 없이 그대로 작동:
```typescript
// 기존 import (여전히 작동!)
import { characters, parseDialogue } from '../data/characterData';
```

---

## 📁 파일별 역할

### **`/types/dialogue.ts`**
- 대화 시스템 타입 정의
- 다른 모듈에서 import하여 사용

### **`/data/characters.ts`**
- **순수 데이터만** 관리
- 캐릭터 ID, 이름, 색상, 포트레이트 URL
- 로직 없음!

### **`/utils/dialogue/speakerDetector.ts`**
- 화자 인식 전용 모듈
- 자기소개 패턴, 행동 패턴 감지
- `SPEAKER_MAP` 관리

### **`/utils/dialogue/textSplitter.ts`**
- 긴 대사 자동 분할
- 자연스러운 구두점에서 끊기

### **`/utils/dialogue/parser.ts`**
- 메인 파싱 로직
- `[캐릭터]:대사`, `"대사"` 형식 처리
- 다른 모듈 조합하여 사용

### **`/data/characterData.ts`**
- 하위 호환성을 위한 리엑스포트
- 기존 코드 수정 불필요

---

## 🎯 사용 예시

### **새 캐릭터 추가**
```typescript
// /data/characters.ts만 수정
export const characterData: Record<string, CharacterData> = {
  // ... 기존 캐릭터들
  newCharacter: {
    id: 'newCharacter',
    name: '새 캐릭터',
    nameColor: 'text-pink-400',
    portraitUrl: 'https://...'
  }
};
```

### **화자 패턴 추가**
```typescript
// /utils/dialogue/speakerDetector.ts만 수정
const SPEAKER_PATTERNS: Record<string, SpeakerPattern> = {
  // ... 기존 패턴들
  newCharacter: {
    names: ['새캐릭터', '새 캐릭터'],
    actions: ['말', '대답', '웃'],
    particles: ['이', '은', '의']
  }
};

export const SPEAKER_MAP: Record<string, string> = {
  // ... 기존 매핑들
  '새캐릭터': 'newCharacter'
};
```

### **파싱 로직 사용 (기존과 동일)**
```typescript
// 어디서든 동일하게 사용
import { parseDialogue } from '../data/characterData';

const lines = parseDialogue(node.text, node.character, node.id);
```

---

## 🔄 마이그레이션 가이드

**기존 코드는 수정 불필요!** 하지만 새 코드 작성 시 권장사항:

### **권장: 직접 import**
```typescript
// 명확한 의존성
import { characters } from '../data/characters';
import { parseDialogue } from '../utils/dialogue/parser';
```

### **허용: 기존 방식**
```typescript
// 하위 호환성 유지
import { characters, parseDialogue } from '../data/characterData';
```

---

## 🚀 향후 확장성

### **쉽게 추가 가능한 기능들**
1. **감정 표현 시스템**
   - `/utils/dialogue/emotionDetector.ts` 추가
   - 대사에서 감정 추출 (기쁨, 슬픔, 분노 등)

2. **다국어 지원**
   - `/data/characters.en.ts`, `/data/characters.ko.ts`
   - locale별 캐릭터 이름 관리

3. **대사 통계**
   - `/utils/dialogue/analytics.ts` 추가
   - 캐릭터별 대사량, 평균 길이 등

4. **커스텀 파서**
   - `/utils/dialogue/customParser.ts` 추가
   - 특수 형식 대사 처리 (노래, 시 등)

---

## 📊 개선 효과

| 항목 | Before | After | 개선 |
|------|--------|-------|------|
| 파일 크기 | 671줄 | 최대 348줄 | ✅ 48% 감소 |
| 책임 분리 | 1개 파일 | 6개 모듈 | ✅ 명확화 |
| 변경 영향 | 전체 시스템 | 해당 모듈만 | ✅ 격리 |
| 테스트 용이성 | 어려움 | 쉬움 | ✅ 개선 |
| 하위 호환성 | - | 100% | ✅ 유지 |

---

## 🎉 결론

**대사 시스템을 건드리지 않고 새 기능 추가 가능!**

- 새 캐릭터 → `characters.ts`
- 새 UI 기능 → 독립 컴포넌트
- 파싱 개선 → `parser.ts`
- 화자 인식 → `speakerDetector.ts`

**각 모듈이 독립적이므로, 한 곳의 변경이 전체 시스템에 영향을 주지 않습니다!** ✨
