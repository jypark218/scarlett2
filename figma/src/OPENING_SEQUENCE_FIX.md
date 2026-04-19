# 🎬 오프닝 시퀀스 중복 실행 문제 해결

## 🔍 문제 분석

### 발생하는 문제들
1. **터치 속도와 상관없이 대사가 중복으로 나옴**
2. **게임 시작으로 바로 가는 경우 발생**
3. **영상이 두 번 재생되면서 음악 중복**

### 원인 분석

#### 1. OpeningSequence 컴포넌트의 중복 호출
```typescript
// App.tsx에서 onComplete 콜백이 매 렌더링마다 새로 생성됨
<OpeningSequence onComplete={() => {
  if (isOpeningCompleteRef.current) return;
  isOpeningCompleteRef.current = true;
  setShowOpeningSequence(false);
}} />
```

**문제점:**
- `onComplete` 함수가 매번 새로 생성됨
- `useEffect`에서 이 함수를 의존성으로 사용하면 무한 루프 가능
- React의 리렌더링 시 중복 호출 가능

#### 2. useEffect의 cleanup이 제대로 작동하지 않음
```typescript
// OpeningSequence.tsx
useEffect(() => {
  // ... 타이핑 애니메이션
  const typingInterval = setInterval(() => { ... }, typingSpeed);
  
  // 다음 줄로 이동
  const nextLineTimer = setTimeout(() => {
    setCurrentLine(currentLine + 1);
  }, line.duration);
  
  return () => clearInterval(typingInterval); // ❌ nextLineTimer 정리 안 됨!
}, [currentLine]);
```

**문제점:**
- `setTimeout`이 정리되지 않아 중복 실행
- 빠른 클릭 시 여러 타이머가 동시 실행

#### 3. 클릭 핸들러의 race condition
```typescript
const handleClick = () => {
  if (isCompletingRef.current || isClickingRef.current) return;
  
  isClickingRef.current = true;
  
  // ... 로직
  
  setTimeout(() => {
    isClickingRef.current = false; // ❌ 비동기 타이밍 이슈
  }, 100);
};
```

**문제점:**
- 빠르게 연속 클릭 시 플래그가 제때 리셋 안 됨
- `setTimeout` 딜레이 중 또 다른 클릭 가능

#### 4. 마지막 줄 완료 처리의 중복
```typescript
// useEffect에서 완료 처리
if (currentLine >= OPENING_LINES.length) {
  const timer = setTimeout(() => {
    if (!isCompletingRef.current) {
      isCompletingRef.current = true;
      onCompleteRef.current();
    }
  }, 1000);
  return () => clearTimeout(timer);
}

// handleClick에서도 완료 처리
else {
  isCompletingRef.current = true;
  onCompleteRef.current();
}
```

**문제점:**
- 두 곳에서 완료 처리 → 중복 호출 가능
- `isCompletingRef`로 방지하지만 타이밍 이슈 존재

---

## ✅ 해결 방법

### 1. App.tsx - useCallback으로 onComplete 안정화

```typescript
// ❌ 이전: 매번 새 함수 생성
<OpeningSequence onComplete={() => {
  if (isOpeningCompleteRef.current) return;
  isOpeningCompleteRef.current = true;
  setShowOpeningSequence(false);
}} />

// ✅ 변경 후: useCallback으로 메모이제이션
const handleOpeningComplete = useCallback(() => {
  if (isOpeningCompleteRef.current) {
    console.log('🎬 Opening already completed, skipping');
    return;
  }
  console.log('🎬 Opening sequence complete');
  isOpeningCompleteRef.current = true;
  setShowOpeningSequence(false);
}, []); // 빈 의존성 배열 - 한 번만 생성

<OpeningSequence onComplete={handleOpeningComplete} />
```

### 2. OpeningSequence - cleanup 함수 개선

```typescript
useEffect(() => {
  // ... 타이핑 로직
  
  const typingInterval = setInterval(() => { ... }, typingSpeed);
  
  const nextLineTimer = setTimeout(() => {
    setCurrentLine(currentLine + 1);
  }, line.duration);
  
  // ✅ 모든 타이머 정리
  return () => {
    clearInterval(typingInterval);
    clearTimeout(nextLineTimer);
  };
}, [currentLine]);
```

### 3. 마지막 줄 완료 로직 통합

```typescript
// ✅ useEffect에서만 완료 처리 (handleClick에서는 currentLine만 변경)
useEffect(() => {
  if (currentLine >= OPENING_LINES.length) {
    if (isCompletingRef.current) {
      console.log('🎬 Already completing, skipping');
      return;
    }
    
    console.log('🎬 All lines displayed, completing in 1s');
    const timer = setTimeout(() => {
      if (!isCompletingRef.current) {
        console.log('🎬 Executing onComplete');
        isCompletingRef.current = true;
        onCompleteRef.current();
      }
    }, 1000);
    
    return () => {
      console.log('🎬 Cleanup: clearing completion timer');
      clearTimeout(timer);
    };
  }
}, [currentLine]);

// handleClick에서는 마지막 줄로만 이동
const handleClick = () => {
  if (isCompletingRef.current) return;
  
  // ... 타이핑 중이거나 중간 줄이면 진행
  
  if (currentLine < OPENING_LINES.length - 1) {
    setCurrentLine(currentLine + 1);
  } else {
    // ✅ 마지막 줄 → currentLine을 OPENING_LINES.length로 설정
    // → useEffect가 감지하여 완료 처리
    setCurrentLine(OPENING_LINES.length);
  }
};
```

### 4. 클릭 플래그 제거 (불필요)

```typescript
// ❌ 이전: 복잡한 플래그 관리
const isClickingRef = useRef(false);
isClickingRef.current = true;
setTimeout(() => {
  isClickingRef.current = false;
}, 100);

// ✅ 변경 후: 플래그 제거, isCompletingRef만 사용
const handleClick = () => {
  if (isCompletingRef.current) return;
  
  // 간단한 로직으로 충분
  if (isTyping) {
    setDisplayedText(OPENING_LINES[currentLine].text);
    setIsTyping(false);
  } else if (currentLine < OPENING_LINES.length - 1) {
    setCurrentLine(currentLine + 1);
  } else {
    setCurrentLine(OPENING_LINES.length); // useEffect에서 처리
  }
};
```

### 5. 디버깅 로그 추가

```typescript
useEffect(() => {
  console.log('🎬 OpeningSequence: currentLine changed to', currentLine);
  
  if (currentLine >= OPENING_LINES.length) {
    console.log('🎬 All lines completed');
    // ...
  }
  // ...
}, [currentLine]);

const handleClick = () => {
  console.log('🎬 Click detected, currentLine:', currentLine, 'isTyping:', isTyping);
  // ...
};
```

---

## 📋 수정 체크리스트

### App.tsx
- [ ] `handleOpeningComplete`를 `useCallback`으로 메모이제이션
- [ ] 디버깅 로그 추가

### OpeningSequence.tsx
- [ ] `useEffect` cleanup에 `nextLineTimer` 정리 추가
- [ ] `isClickingRef` 제거 (불필요)
- [ ] `handleClick`에서 완료 처리 제거, `currentLine` 변경만
- [ ] 마지막 줄 완료는 `useEffect`에서만 처리
- [ ] 디버깅 로그 추가

---

## 🎯 예상 결과

### 정상 동작
1. **대사가 순차적으로 표시됨**
2. **빠른 클릭에도 중복 없음**
3. **마지막 대사 후 1초 뒤 자동 완료**
4. **onComplete가 단 한 번만 호출됨**
5. **음악이 중복 재생되지 않음**

### 디버깅 로그 (정상)
```
🎬 OpeningSequence: currentLine changed to 0
🎬 Click detected, currentLine: 0, isTyping: false
🎬 OpeningSequence: currentLine changed to 1
🎬 Click detected, currentLine: 1, isTyping: false
🎬 OpeningSequence: currentLine changed to 2
...
🎬 OpeningSequence: currentLine changed to 5
🎬 All lines completed
🎬 Executing onComplete
🎬 Opening sequence complete
```

### 비정상 로그 (문제 시)
```
🎬 OpeningSequence: currentLine changed to 3
🎬 Click detected, currentLine: 3, isTyping: false
🎬 OpeningSequence: currentLine changed to 4
🎬 OpeningSequence: currentLine changed to 4 (❌ 중복!)
🎬 All lines completed
🎬 Executing onComplete
🎬 Executing onComplete (❌ 중복!)
```

---

## 🔧 추가 개선 사항

### 1. 전역 클릭 리스너 대신 개별 버튼
```typescript
// 현재: 전체 화면 클릭
<div onClick={handleClick}>

// 개선안: 명확한 버튼 제공
<div>
  {/* 대사 표시 영역 */}
  
  {!isTyping && (
    <button onClick={handleClick} className="...">
      {currentLine < OPENING_LINES.length - 1 ? 'Continue' : 'Begin'}
    </button>
  )}
</div>
```

### 2. 스킵 버튼 추가
```typescript
<button
  onClick={() => {
    if (!isCompletingRef.current) {
      isCompletingRef.current = true;
      onCompleteRef.current();
    }
  }}
  className="absolute top-4 right-4 text-sm text-slate-500 hover:text-white"
>
  Skip Intro →
</button>
```

---

**작성일:** 2025-01-XX
**상태:** 🔄 수정 준비 완료
