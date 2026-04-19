# 🎵 음악 중복 재생 문제 해결

## 🔍 문제 분석

### 현재 상황
App.tsx에서 **3곳**에 `<BackgroundSound>` 컴포넌트가 렌더링되고 있음:

```typescript
// 1. IntroScreen 렌더링 시
if (showIntro) {
  return (
    <>
      <BackgroundSound track={getCurrentTrack()} /> // ❌ 중복 1
      <IntroScreen />
    </>
  );
}

// 2. OpeningSequence 렌더링 시
if (showOpeningSequence) {
  return (
    <>
      <BackgroundSound track={getCurrentTrack()} /> // ❌ 중복 2
      <OpeningSequence />
    </>
  );
}

// 3. GameScreen 렌더링 시
return (
  <div>
    <BackgroundSound track={getCurrentTrack()} /> // ❌ 중복 3
    <GameScreen />
  </div>
);
```

### 문제점
1. **화면 전환 시 새로운 BackgroundSound 컴포넌트가 마운트됨**
2. **각 컴포넌트가 독립적으로 audioManager.setTrack() 호출**
3. **React의 리렌더링 시 useEffect가 여러 번 실행될 수 있음**
4. **getCurrentTrack()이 같은 트랙을 반환해도 컴포넌트가 다시 마운트되면 setTrack 호출**

## 🎯 해결 방법

### 방법 1: BackgroundSound를 최상위에 하나만 배치 ✅ (권장)
App 컴포넌트 최상위에 `<BackgroundSound>`를 하나만 두고, 화면 전환 시에도 유지

### 방법 2: AudioManager에 중복 방지 로직 강화
이미 구현되어 있지만, React 라이프사이클 때문에 완벽하지 않음

---

## ✅ 해결 방법 1 적용 (권장)

### App.tsx 수정

```typescript
// ❌ 이전: 각 화면마다 BackgroundSound 컴포넌트
if (showIntro) {
  return (
    <>
      <BackgroundSound track={getCurrentTrack()} /> // 제거
      <IntroScreen />
    </>
  );
}

// ✅ 변경 후: 최상위에 하나만
return (
  <>
    {/* 🎵 전역 음악 재생 - 화면 전환 시에도 유지 */}
    <BackgroundSound track={getCurrentTrack()} />
    
    {isLoading && <LoadingScreen />}
    {showIntro && <IntroScreen />}
    {showOpeningSequence && <OpeningSequence />}
    {!isLoading && !showIntro && !showOpeningSequence && (
      <GameScreen />
    )}
  </>
);
```

### 장점
- ✅ BackgroundSound 컴포넌트가 언마운트되지 않음
- ✅ audioManager.setTrack()이 불필요하게 호출되지 않음
- ✅ React의 리렌더링 최적화
- ✅ 화면 전환 시 음악이 끊기지 않음

---

## 🔧 AudioManager 개선 (추가 보완)

### 현재 AudioManager의 중복 방지 로직

```typescript
async setTrack(track: SoundTrack) {
  // 1. 트랙 변경 중이면 스킵
  if (this.isChangingTrack) {
    console.log('🎵 Track change already in progress, skipping:', track);
    return;
  }

  // 2. 같은 트랙이면 스킵
  if (this.currentTrack === track) {
    console.log('🎵 Same track, skipping:', track);
    return;
  }

  // 3. 같은 URL이면 스킵
  const newSoundUrl = SOUND_TRACKS[track];
  if (this.audio.src && this.audio.src.endsWith(newSoundUrl)) {
    console.log('🎵 Same audio source, updating track name only:', this.currentTrack, '→', track);
    this.currentTrack = track;
    return;
  }

  // ... 트랙 변경 로직
}
```

### 추가 개선: Debounce 적용

```typescript
class AudioManager {
  private setTrackDebounceTimer: NodeJS.Timeout | null = null;
  
  async setTrack(track: SoundTrack) {
    // 디바운스: 100ms 내 중복 호출 무시
    if (this.setTrackDebounceTimer) {
      return;
    }
    
    this.setTrackDebounceTimer = setTimeout(() => {
      this.setTrackDebounceTimer = null;
    }, 100);
    
    // ... 기존 로직
  }
}
```

---

## 📋 체크리스트

- [ ] App.tsx에서 BackgroundSound를 최상위로 이동
- [ ] IntroScreen 렌더링 부분에서 BackgroundSound 제거
- [ ] OpeningSequence 렌더링 부분에서 BackgroundSound 제거
- [ ] GameScreen 렌더링 부분에서 BackgroundSound 제거
- [ ] 조건부 렌더링 구조 개선
- [ ] 테스트: 인트로 → 오프닝 → 게임 화면 전환 시 음악 중복 확인

---

## 🎯 예상 결과

### 이전
- IntroScreen → OpeningSequence 전환 시: 2개의 BackgroundSound 컴포넌트 존재 가능
- OpeningSequence → GameScreen 전환 시: 새로운 setTrack() 호출
- 음악이 겹치거나 재시작됨

### 변경 후
- 단 하나의 BackgroundSound 컴포넌트만 존재
- track prop만 변경되므로 useEffect가 효율적으로 동작
- audioManager의 중복 방지 로직이 제대로 작동
- 음악이 부드럽게 전환됨

---

## 🔍 디버깅 방법

### 콘솔 로그 확인
```typescript
// BackgroundSound.tsx
console.log('🎵 BackgroundSound: Component mounted');
console.log('🎵 BackgroundSound: setTrack called with:', track);

// AudioManager.ts
console.log('🎵 Same track, skipping:', track);
console.log('🎵 Track change already in progress, skipping:', track);
console.log('🎵 Changing track:', this.currentTrack, '→', track);
```

### 예상 로그 (정상 작동 시)
```
🎵 BackgroundSound: Component mounted (1번만)
🎵 BackgroundSound: setTrack called with: main_theme
🎵 Changing track: null → main_theme
🎵 BackgroundSound: setTrack called with: main_theme
🎵 Same track, skipping: main_theme (✅ 중복 방지)
```

### 비정상 로그 (문제 발생 시)
```
🎵 BackgroundSound: Component mounted
🎵 BackgroundSound: setTrack called with: main_theme
🎵 Changing track: null → main_theme
🎵 BackgroundSound: Component mounted (❌ 또 마운트됨!)
🎵 BackgroundSound: setTrack called with: main_theme
🎵 Track change already in progress, skipping: main_theme (⚠️ 충돌)
```

---

## 📝 구현 우선순위

1. **높음** - App.tsx 구조 개선 (BackgroundSound 최상위 배치)
2. **중간** - AudioManager에 debounce 추가
3. **낮음** - 추가 로깅 및 모니터링

---

**작성일:** 2025-01-XX
**상태:** 🔄 준비 완료
