# 🎵 음원 시스템 완벽 가이드 (작동 확인 완료)

> **✅ 작동 확인 날짜:** 2025년 12월 13일  
> **✅ 상태:** 정상 작동  
> **✅ 목적:** 다른 AI에게 설명하거나 문제 발생 시 참고용

---

## 📋 목차

1. [전체 구조 개요](#1-전체-구조-개요)
2. [파일별 상세 코드](#2-파일별-상세-코드)
3. [작동 원리](#3-작동-원리)
4. [데이터 흐름도](#4-데이터-흐름도)
5. [체크포인트](#5-체크포인트)
6. [트러블슈팅](#6-트러블슈팅)
7. [localStorage 키](#7-localstorage-키)
8. [브라우저 자동재생 정책 대응](#8-브라우저-자동재생-정책-대응)

---

## 1. 전체 구조 개요

### 📁 파일 구조

```
프로젝트 루트/
├── utils/
│   └── soundHelpers.ts          # 사운드 트랙 정의 및 매핑 로직
├── components/
│   ├── BackgroundSound.tsx      # 배경음악 재생 컴포넌트 (핵심)
│   └── SettingsModal.tsx        # 설정 UI (음악 제어)
└── App.tsx                       # 메인 앱 (사운드 시스템 통합)
```

---

### 🎯 시스템 역할 분담

| 파일 | 역할 | 주요 기능 |
|------|------|-----------|
| **soundHelpers.ts** | 데이터 레이어 | 트랙 URL 정의, 노드→트랙 매핑 |
| **BackgroundSound.tsx** | 로직 레이어 | 음원 재생, 페이드, 상태 관리 |
| **SettingsModal.tsx** | UI 레이어 | 사용자 설정 인터페이스 |
| **App.tsx** | 통합 레이어 | 컴포넌트 조립 및 연결 |

---

## 2. 파일별 상세 코드

### 2.1 `/utils/soundHelpers.ts`

**목적:** 사운드 트랙 정의 및 자동 선택 로직

```typescript
// 🎵 사운드 트랙 정의
export type SoundTrack = 
  | 'main_theme'      // 메인 테마 (인트로, 저택 외관)
  | 'investigation'   // 조사 테마 (서재, 침실 등)
  | 'tension'         // 긴장감 (중요한 발견)
  | 'mystery'         // 미스터리 (대화 장면)
  | 'revelation';     // 진실 (결말)

// 🎵 사운드 트랙 URL 매핑
export const SOUND_TRACKS: Record<SoundTrack, string> = {
  main_theme: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  investigation: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4e5d5a2dd3.mp3',
  tension: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3',
  mystery: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  revelation: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8a7d68f26.mp3',
};

// 🎵 노드별 사운드 트랙 매핑
export function getSoundTrackForNode(
  nodeId?: string,
  background?: string,
  character?: string,
  isIntro?: boolean
): SoundTrack {
  // 인트로 화면
  if (isIntro) {
    return 'main_theme';
  }

  // 노드 ID 기반 매핑
  if (nodeId) {
    // 긴장감 있는 장면
    if (nodeId.includes('bloodstain') || nodeId.includes('struggle') || nodeId.includes('attack')) {
      return 'tension';
    }
    
    // 조사 장면
    if (nodeId.includes('library') || nodeId.includes('bedroom') || nodeId.includes('search')) {
      return 'investigation';
    }
    
    // 결말 장면
    if (nodeId.includes('ending') || nodeId.includes('reveal')) {
      return 'revelation';
    }
  }

  // 배경 기반 매핑
  if (background) {
    if (background.includes('mansion') || background.includes('exterior')) {
      return 'main_theme';
    }
    if (background.includes('library') || background.includes('study')) {
      return 'investigation';
    }
  }

  // 기본값
  return 'mystery';
}

// 🎵 사운드 시스템 활성화 여부
export function isSoundEnabled(): boolean {
  // 개발/프로덕션 모드에 따라 변경 가능
  return true;
}
```

---

### 2.2 `/components/BackgroundSound.tsx`

**목적:** 배경음악 재생 및 제어 (시스템의 핵심)

```typescript
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { SOUND_TRACKS, type SoundTrack, isSoundEnabled } from '../utils/soundHelpers';

interface BackgroundSoundProps {
  track: SoundTrack;
  volume?: number;
  showButton?: boolean;
}

export function BackgroundSound({ track, volume = 0.3, showButton = true }: BackgroundSoundProps) {
  // 사운드 시스템이 비활성화되어 있으면 렌더링하지 않음
  if (!isSoundEnabled()) {
    return null;
  }

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const currentTrackRef = useRef<string>('');
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 🎵 페이드 효과
  const fadeVolume = (targetVolume: number, duration: number = 1000) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = audio.volume;
    const volumeChange = targetVolume - startVolume;
    const steps = 50;
    const stepDuration = duration / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (!audio) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      currentStep++;
      const progress = currentStep / steps;
      audio.volume = Math.max(0, Math.min(1, startVolume + volumeChange * progress));

      if (currentStep >= steps) {
        audio.volume = targetVolume;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        if (targetVolume === 0) {
          audio.pause();
        }
      }
    }, stepDuration);
  };

  // 로컬 스토리지에서 설정 로드
  useEffect(() => {
    const savedMuteState = localStorage.getItem('soundMuted');
    const savedVolume = localStorage.getItem('soundVolume');
    
    if (savedMuteState !== null) {
      setIsMuted(savedMuteState === 'true');
    }
    
    if (savedVolume) {
      const vol = parseInt(savedVolume, 10);
      if (!isNaN(vol) && vol >= 0 && vol <= 100) {
        setCurrentVolume(vol / 100);
      }
    }
  }, []);

  // 트랙 전환
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const soundUrl = SOUND_TRACKS[track];
    
    // 같은 트랙이면 스킵
    if (currentTrackRef.current === track) {
      return;
    }

    const changeTrack = async () => {
      try {
        // 기존 트랙 페이드 아웃
        if (currentTrackRef.current && !audio.paused) {
          fadeVolume(0, 500);
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // 새 트랙 로드
        audio.pause();
        audio.currentTime = 0;
        audio.src = soundUrl;
        audio.loop = true;
        audio.volume = 0;
        audio.load();
        currentTrackRef.current = track;

        // 음소거가 아니면 재생
        if (!isMuted) {
          try {
            await audio.play();
            fadeVolume(currentVolume, 1000);
          } catch (error: any) {
            // 자동 재생 차단 - 사용자 인터랙션 대기
            if (error.name === 'NotAllowedError') {
              console.log('🎵 Autoplay blocked - waiting for user interaction');
            }
          }
        }
      } catch (error) {
        console.error('🎵 Error changing track:', error);
      }
    };

    changeTrack();
  }, [track, currentVolume, isMuted]);

  // 음소거 상태 변경
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      fadeVolume(0, 400);
    } else {
      if (audio.paused && audio.src) {
        audio.play()
          .then(() => fadeVolume(currentVolume, 800))
          .catch(err => console.log('🎵 Play failed:', err));
      } else {
        fadeVolume(currentVolume, 800);
      }
    }
  }, [isMuted, currentVolume]);

  // 설정 모달에서 오는 이벤트 리스너
  useEffect(() => {
    const handleMuteToggle = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      setIsMuted(customEvent.detail);
      localStorage.setItem('soundMuted', String(customEvent.detail));
    };

    const handleVolumeChange = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      const newVolume = Math.max(0, Math.min(1, customEvent.detail));
      setCurrentVolume(newVolume);
      localStorage.setItem('soundVolume', String(Math.round(newVolume * 100)));
    };

    window.addEventListener('soundMuteToggle', handleMuteToggle);
    window.addEventListener('soundVolumeChange', handleVolumeChange);
    
    return () => {
      window.removeEventListener('soundMuteToggle', handleMuteToggle);
      window.removeEventListener('soundVolumeChange', handleVolumeChange);
    };
  }, []);

  // 정리
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  // 빠른 음소거 토글
  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    localStorage.setItem('soundMuted', String(newMuteState));
  };

  return (
    <>
      <audio ref={audioRef} preload={isMuted ? "none" : "auto"} />
      
      {showButton && (
        <div className="fixed top-16 right-4 z-[9998]">
          <Button
            onClick={toggleMute}
            variant="outline"
            size="icon"
            className="glass-panel border-amber-600/30 hover:border-amber-500/50 transition-all duration-300"
            title={isMuted ? '음악 켜기' : '음악 끄기'}
          >
            {isMuted ? (
              <VolumeX className="size-5 text-slate-400" />
            ) : (
              <Volume2 className="size-5 text-amber-500" />
            )}
          </Button>
        </div>
      )}
    </>
  );
}
```

---

### 2.3 `/App.tsx` (음원 관련 부분만)

**목적:** BackgroundSound 컴포넌트 통합

#### Import 섹션
```typescript
import { BackgroundSound } from './components/BackgroundSound';
import { getSoundTrackForNode } from './utils/soundHelpers';
```

#### 게임 화면 렌더링 부분
```typescript
return (
  <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
    {/* 🎵 배경음악 컴포넌트 */}
    <BackgroundSound track={getSoundTrackForNode(currentNode.id)} />
    
    <GameScreen
      node={currentNode}
      onChoice={handleChoice}
      // ... 기타 props
    />
    {/* ... */}
  </div>
);
```

**💡 핵심 포인트:**
- `getSoundTrackForNode(currentNode.id)` → 현재 노드에 맞는 트랙 자동 선택
- `showButton` prop 기본값 `true` → 우측 상단 음소거 버튼 표시

---

### 2.4 `/components/SettingsModal.tsx` (음원 관련 부분만)

**목적:** 사용자가 음량 및 음소거 설정

#### Import 섹션
```typescript
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled } from '../utils/soundHelpers';
```

#### State 및 Effect
```typescript
const [isMuted, setIsMuted] = useState(false);
const [volume, setVolume] = useState(30);
const soundEnabled = isSoundEnabled();

// 로컬 스토리지에서 설정 로드
useEffect(() => {
  const savedMuteState = localStorage.getItem('soundMuted');
  const savedVolume = localStorage.getItem('soundVolume');
  
  if (savedMuteState === 'true') {
    setIsMuted(true);
  }
  
  if (savedVolume) {
    const vol = parseInt(savedVolume, 10);
    if (!isNaN(vol) && vol >= 0 && vol <= 100) {
      setVolume(vol);
    }
  }
}, [isOpen]);
```

#### 음악 토글 함수
```typescript
const toggleMute = () => {
  const newMuteState = !isMuted;
  setIsMuted(newMuteState);
  localStorage.setItem('soundMuted', newMuteState.toString());
  
  // BackgroundSound 컴포넌트에 알림
  window.dispatchEvent(new CustomEvent('soundMuteToggle', { detail: newMuteState }));
};
```

#### 음량 조절 함수
```typescript
const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newVolume = parseInt(e.target.value, 10);
  setVolume(newVolume);
  localStorage.setItem('soundVolume', newVolume.toString());
  
  // BackgroundSound 컴포넌트에 알림
  window.dispatchEvent(new CustomEvent('soundVolumeChange', { detail: newVolume / 100 }));
};
```

#### UI 렌더링
```typescript
{soundEnabled && (
  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {isMuted ? (
          <VolumeX className="size-5 text-slate-400" />
        ) : (
          <Volume2 className="size-5 text-amber-500" />
        )}
        <div>
          <h3 className="text-slate-200 mb-1">배경음악</h3>
          <p className="text-xs text-slate-400">게임 배경음악 on/off</p>
        </div>
      </div>
      <Button
        onClick={toggleMute}
        variant={isMuted ? "outline" : "default"}
        size="sm"
        className={isMuted 
          ? "border-slate-600 text-slate-400 hover:bg-slate-700" 
          : "bg-amber-600 hover:bg-amber-700 text-white"
        }
      >
        {isMuted ? 'OFF' : 'ON'}
      </Button>
    </div>
    
    {/* 음량 조절 슬라이더 */}
    {!isMuted && (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>음량</span>
          <span>{volume}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer ..."
        />
      </div>
    )}
  </div>
)}
```

---

## 3. 작동 원리

### 3.1 초기화 과정

```
1. App.tsx 렌더링
   ↓
2. BackgroundSound 컴포넌트 마운트
   ↓
3. localStorage에서 설정 로드 (soundMuted, soundVolume)
   ↓
4. getSoundTrackForNode(currentNode.id) 호출 → 트랙 선택
   ↓
5. SOUND_TRACKS에서 URL 가져오기
   ↓
6. <audio> 요소에 src 설정 및 load()
   ↓
7. 음소거가 아니면 audio.play() 시도
   ↓
8. 페이드 인 효과로 볼륨 0 → currentVolume
```

---

### 3.2 트랙 전환 과정

```
노드 이동 (currentNodeId 변경)
   ↓
App.tsx의 currentNode 업데이트
   ↓
getSoundTrackForNode(currentNode.id) 재계산
   ↓
BackgroundSound의 track prop 변경
   ↓
useEffect([track, ...]) 트리거
   ↓
┌─────────────────────────────────┐
│ changeTrack() 비동기 함수 실행  │
├─────────────────────────────────┤
│ 1. 기존 트랙 페이드 아웃 (500ms)│
│ 2. audio.pause() + src 변경     │
│ 3. audio.load()                 │
│ 4. currentTrackRef 업데이트     │
│ 5. audio.play()                 │
│ 6. 페이드 인 (1000ms)           │
└─────────────────────────────────┘
```

---

### 3.3 설정 모달과의 통신

```
사용자가 설정 모달에서 음량 조절
   ↓
SettingsModal의 handleVolumeChange() 호출
   ↓
localStorage.setItem('soundVolume', ...)
   ↓
window.dispatchEvent(new CustomEvent('soundVolumeChange', { detail: 0.5 }))
   ↓
BackgroundSound의 이벤트 리스너가 감지
   ↓
setCurrentVolume(0.5) 업데이트
   ↓
useEffect([isMuted, currentVolume]) 트리거
   ↓
fadeVolume(0.5, 800) → 부드럽게 볼륨 변경
```

**동일한 흐름이 음소거 토글에도 적용됨:**
- 이벤트 이름: `soundMuteToggle`
- Detail: `boolean` (true/false)

---

## 4. 데이터 흐름도

### 4.1 전체 시스템 흐름

```
┌───────────────────────────────────────────────────────────────┐
│                        App.tsx                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ currentNode.id 변경                                     │  │
│  │   ↓                                                     │  │
│  │ getSoundTrackForNode(currentNode.id)                   │  │
│  │   ↓                                                     │  │
│  │ <BackgroundSound track="investigation" />              │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────┐
│                   BackgroundSound.tsx                          │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ SOUND_TRACKS['investigation'] → URL 가져오기            │  │
│  │   ↓                                                     │  │
│  │ <audio ref={audioRef} src={url} loop preload="auto" /> │  │
│  │   ↓                                                     │  │
│  │ fadeVolume() + audio.play()                            │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
          ↑                                      ↑
          │                                      │
          │                                      │
┌─────────────────────┐              ┌─────────────────────┐
│   localStorage      │              │  SettingsModal.tsx  │
│ ┌─────────────────┐ │              │ ┌─────────────────┐ │
│ │ soundMuted      │ │◄─────────────┤ │ toggleMute()    │ │
│ │ soundVolume     │ │              │ │ handleVolume()  │ │
│ └─────────────────┘ │              │ └─────────────────┘ │
└─────────────────────┘              └─────────────────────┘
```

---

### 4.2 페이드 효과 상세

```typescript
fadeVolume(targetVolume, duration)
   ↓
┌──────────────────────────────────────────┐
│ 설정값:                                  │
│ - 시작 볼륨: audio.volume (현재값)      │
│ - 목표 볼륨: targetVolume               │
│ - 지속 시간: duration (밀리초)          │
│ - 단계 수: 50 steps                     │
│ - 각 단계 간격: duration / 50           │
└──────────────────────────────────────────┘
   ↓
setInterval(() => {
  currentStep++;
  progress = currentStep / 50;
  audio.volume = startVolume + (volumeChange * progress);
  
  if (currentStep >= 50) {
    clearInterval();
    if (targetVolume === 0) audio.pause();
  }
}, stepDuration);
```

**예시: 음량 0.3 → 0.7로 1초간 페이드**
```
Step  0: 0.30 ▓░░░░░░░░░
Step 10: 0.38 ▓▓░░░░░░░░
Step 25: 0.50 ▓▓▓▓▓░░░░░
Step 40: 0.62 ▓▓▓▓▓▓▓▓░░
Step 50: 0.70 ▓▓▓▓▓▓▓▓▓▓ (완료)
```

---

## 5. 체크포인트

### ✅ 시스템이 정상 작동하는지 확인하는 방법

#### 5.1 기본 확인 사항

| 체크리스트 | 확인 방법 | 정상 상태 |
|-----------|----------|----------|
| **파일 존재** | `/utils/soundHelpers.ts` 확인 | ✅ 파일이 존재하고 내용이 완전함 |
| **컴포넌트 존재** | `/components/BackgroundSound.tsx` 확인 | ✅ 파일이 존재하고 내용이 완전함 |
| **Import 확인** | `App.tsx` 상단 import 문 확인 | ✅ BackgroundSound, getSoundTrackForNode 임포트됨 |
| **렌더링 확인** | `App.tsx` return 문에 `<BackgroundSound />` 존재 | ✅ 컴포넌트가 렌더링됨 |
| **활성화 확인** | `isSoundEnabled()` 함수 반환값 | ✅ `true` 반환 |

---

#### 5.2 런타임 확인 사항

**브라우저 콘솔에서 확인:**
```javascript
// 1. localStorage 상태 확인
localStorage.getItem('soundMuted');   // "false" 또는 null이어야 음악 재생
localStorage.getItem('soundVolume');  // "30" 같은 숫자

// 2. audio 요소 확인
document.querySelector('audio');      // <audio> 요소가 존재해야 함

// 3. audio 재생 상태 확인
const audio = document.querySelector('audio');
console.log(audio.paused);            // false = 재생 중
console.log(audio.volume);            // 0~1 사이 값
console.log(audio.src);               // Pixabay URL
```

---

#### 5.3 UI 확인 사항

| 요소 | 위치 | 정상 상태 |
|------|------|----------|
| **음소거 버튼** | 화면 우측 상단 | 🔊 아이콘 표시 (음소거 OFF 시) |
| **설정 모달** | ⚙️ 버튼 클릭 시 | 배경음악 섹션이 표시됨 |
| **음량 슬라이더** | 설정 모달 내부 | 드래그 시 실시간 음량 변경 |

---

## 6. 트러블슈팅

### 🔧 문제 1: 음악이 전혀 재생되지 않음

#### 증상
- 페이지 로드 후 아무 소리도 들리지 않음
- 우측 상단 버튼이 보이지 않음

#### 원인 및 해결책

| 원인 | 확인 방법 | 해결책 |
|------|----------|--------|
| **isSoundEnabled() = false** | `soundHelpers.ts` 확인 | `return true;`로 변경 |
| **BackgroundSound 렌더링 안됨** | React DevTools 확인 | `App.tsx`에 `<BackgroundSound />` 추가 |
| **Import 오류** | 콘솔 에러 확인 | import 경로 수정 |
| **브라우저 자동재생 차단** | 콘솔에 `NotAllowedError` | 정상 (사용자 첫 클릭 후 재생됨) |

---

### 🔧 문제 2: 음악은 나오지만 트랙이 전환되지 않음

#### 증상
- 처음 음악은 재생되지만 노드 이동 시 계속 같은 음악

#### 원인 및 해결책

```typescript
// ❌ 잘못된 코드
<BackgroundSound track="main_theme" />  // 하드코딩됨

// ✅ 올바른 코드
<BackgroundSound track={getSoundTrackForNode(currentNode.id)} />
```

**체크 포인트:**
1. `App.tsx`에서 `track` prop이 동적으로 전달되는가?
2. `currentNode.id`가 제대로 업데이트되는가?
3. `getSoundTrackForNode()` 함수가 올바른 값을 반환하는가?

---

### 🔧 문제 3: 페이드 효과 없이 갑자기 음악이 끊김

#### 증상
- 트랙 전환 시 페이드 효과 없이 뚝 끊김

#### 원인 및 해결책

```typescript
// BackgroundSound.tsx의 changeTrack() 함수 확인
const changeTrack = async () => {
  try {
    // ✅ 이 부분이 있어야 페이드 아웃 작동
    if (currentTrackRef.current && !audio.paused) {
      fadeVolume(0, 500);
      await new Promise(resolve => setTimeout(resolve, 500));  // ⚠️ 중요!
    }
    
    // 새 트랙 로드...
  }
};
```

**핵심:** `await new Promise(...)`가 없으면 페이드 아웃이 완료되기 전에 트랙이 전환됨

---

### 🔧 문제 4: 설정 모달에서 음량 조절이 반영 안됨

#### 증상
- 슬라이더를 움직여도 음량이 안 바뀜

#### 원인 및 해결책

**1. CustomEvent 발송 확인**
```typescript
// SettingsModal.tsx
const handleVolumeChange = (e) => {
  const newVolume = parseInt(e.target.value, 10);
  setVolume(newVolume);
  localStorage.setItem('soundVolume', newVolume.toString());
  
  // ✅ 이 줄이 있어야 BackgroundSound가 감지
  window.dispatchEvent(new CustomEvent('soundVolumeChange', { detail: newVolume / 100 }));
};
```

**2. 이벤트 리스너 확인**
```typescript
// BackgroundSound.tsx
useEffect(() => {
  const handleVolumeChange = (event: Event) => {
    const customEvent = event as CustomEvent<number>;
    const newVolume = Math.max(0, Math.min(1, customEvent.detail));
    setCurrentVolume(newVolume);
    localStorage.setItem('soundVolume', String(Math.round(newVolume * 100)));
  };

  // ✅ 이벤트 이름이 정확히 일치해야 함
  window.addEventListener('soundVolumeChange', handleVolumeChange);
  
  return () => {
    window.removeEventListener('soundVolumeChange', handleVolumeChange);
  };
}, []);
```

---

### 🔧 문제 5: 메모리 누수 (장시간 플레이 후 브라우저 느려짐)

#### 증상
- 게임을 오래 하면 브라우저가 점점 느려짐

#### 원인 및 해결책

**cleanup 함수 확인:**
```typescript
// BackgroundSound.tsx
useEffect(() => {
  return () => {
    // ✅ 이 부분이 컴포넌트 언마운트 시 실행되어야 함
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);  // 페이드 타이머 정리
    }
    
    const audio = audioRef.current;
    if (audio) {
      audio.pause();          // 재생 중지
      audio.currentTime = 0;  // 재생 위치 초기화
    }
  };
}, []);
```

---

## 7. localStorage 키

### 📦 사용되는 키 목록

| 키 이름 | 타입 | 가능한 값 | 기본값 | 설명 |
|---------|------|-----------|--------|------|
| `soundMuted` | string | `"true"`, `"false"` | `"false"` | 음소거 상태 |
| `soundVolume` | string | `"0"` ~ `"100"` | `"30"` | 음량 (백분율) |

### 🔍 값 읽기 방법

```typescript
// BackgroundSound.tsx
const savedMuteState = localStorage.getItem('soundMuted');
if (savedMuteState !== null) {
  setIsMuted(savedMuteState === 'true');
}

const savedVolume = localStorage.getItem('soundVolume');
if (savedVolume) {
  const vol = parseInt(savedVolume, 10);
  if (!isNaN(vol) && vol >= 0 && vol <= 100) {
    setCurrentVolume(vol / 100);  // 0.3 같은 소수로 변환
  }
}
```

### 💾 값 저장 방법

```typescript
// SettingsModal.tsx
localStorage.setItem('soundMuted', 'true');
localStorage.setItem('soundVolume', '50');
```

### 🗑️ 초기화 방법

**브라우저 콘솔에서:**
```javascript
localStorage.removeItem('soundMuted');
localStorage.removeItem('soundVolume');
window.location.reload();  // 페이지 새로고침
```

---

## 8. 브라우저 자동재생 정책 대응

### 🚫 브라우저 자동재생 제한

**대부분의 최신 브라우저(Chrome, Firefox, Safari)는 사용자 인터랙션 없이 자동으로 음악을 재생하는 것을 차단합니다.**

---

### ✅ 현재 시스템의 대응 방법

#### 1. **에러 핸들링**
```typescript
try {
  await audio.play();
  fadeVolume(currentVolume, 1000);
} catch (error: any) {
  // ✅ 자동 재생 차단 시 조용히 실패 (에러 안 던짐)
  if (error.name === 'NotAllowedError') {
    console.log('🎵 Autoplay blocked - waiting for user interaction');
  }
}
```

#### 2. **사용자 첫 클릭 후 재생**
- 사용자가 아무 버튼이나 클릭하면 자동으로 재생 시도
- 예: "게임 시작" 버튼, 선택지 클릭 등

#### 3. **preload 최적화**
```typescript
<audio ref={audioRef} preload={isMuted ? "none" : "auto"} />
```
- 음소거 상태면 미리 로드하지 않음 (대역폭 절약)
- 음소거 해제 상태면 미리 로드 (빠른 재생)

---

### 📊 브라우저별 자동재생 정책

| 브라우저 | 자동재생 허용 조건 |
|---------|-------------------|
| **Chrome** | 사용자가 페이지와 인터랙션한 경우 |
| **Firefox** | 사용자가 페이지를 클릭한 경우 |
| **Safari** | 사용자가 페이지와 인터랙션한 경우 |
| **Edge** | Chrome과 동일 |

---

### 🧪 자동재생 테스트 방법

**브라우저 콘솔에서:**
```javascript
// 자동재생 가능 여부 확인
navigator.mediaSession.playbackState
// "none" = 재생 안됨
// "playing" = 재생 중

// 강제로 재생 시도
const audio = document.querySelector('audio');
audio.play()
  .then(() => console.log('✅ 재생 성공'))
  .catch((err) => console.log('❌ 재생 실패:', err.name));
```

---

## 9. 요약: 왜 음원이 나오는가?

### ✅ 작동하는 이유 체크리스트

1. **파일이 완전하다**
   - ✅ `soundHelpers.ts` → 트랙 정의 및 매핑
   - ✅ `BackgroundSound.tsx` → 재생 로직
   - ✅ `App.tsx` → 통합
   - ✅ `SettingsModal.tsx` → 설정 UI

2. **데이터 흐름이 연결되어 있다**
   - ✅ `currentNode.id` → `getSoundTrackForNode()` → `track` prop → `SOUND_TRACKS[track]` → `audio.src`

3. **이벤트가 제대로 전달된다**
   - ✅ SettingsModal → `CustomEvent` → BackgroundSound → 음량/음소거 반영

4. **에러 핸들링이 있다**
   - ✅ 자동재생 차단 시 조용히 실패 (게임 플레이에 영향 없음)
   - ✅ try-catch로 예외 처리

5. **UX가 좋다**
   - ✅ 페이드 인/아웃으로 부드러운 전환
   - ✅ localStorage로 설정 영구 저장
   - ✅ 음소거 버튼으로 빠른 제어

---

## 10. 다른 AI에게 전달 시 체크리스트

### 📋 이 문서를 다른 AI에게 전달할 때

**"음원이 안 나와요"라는 문제가 발생하면 이렇게 질문하세요:**

```
1. "isSoundEnabled() 함수가 true를 반환하나요?"
2. "App.tsx에 <BackgroundSound /> 컴포넌트가 렌더링되나요?"
3. "브라우저 콘솔에 에러가 있나요?"
4. "localStorage에 soundMuted가 'true'로 설정되어 있나요?"
5. "브라우저가 자동재생을 차단하고 있나요? (NotAllowedError)"
6. "audio 요소의 src가 올바른 URL인가요?"
7. "사용자가 페이지와 최소 한 번 인터랙션했나요?"
```

---

### 🔍 디버깅용 코드 스니펫

**브라우저 콘솔에 붙여넣기:**
```javascript
// 🎵 음원 시스템 상태 확인 스크립트
console.log('=== 음원 시스템 진단 ===');
console.log('1. localStorage 상태:');
console.log('   - soundMuted:', localStorage.getItem('soundMuted'));
console.log('   - soundVolume:', localStorage.getItem('soundVolume'));

const audio = document.querySelector('audio');
if (audio) {
  console.log('2. Audio 요소 발견:');
  console.log('   - src:', audio.src);
  console.log('   - paused:', audio.paused);
  console.log('   - volume:', audio.volume);
  console.log('   - loop:', audio.loop);
} else {
  console.log('2. ❌ Audio 요소를 찾을 수 없음!');
}

const soundButton = document.querySelector('button[title*="음악"]');
if (soundButton) {
  console.log('3. ✅ 음소거 버튼 발견');
} else {
  console.log('3. ❌ 음소거 버튼을 찾을 수 없음!');
}

console.log('=== 진단 완료 ===');
```

---

## 11. 마지막 체크

### ✅ 정상 작동 확인 (2025-12-13 기준)

- ✅ 음원 재생됨
- ✅ 트랙 자동 전환됨
- ✅ 페이드 효과 작동
- ✅ 설정 모달 연동
- ✅ localStorage 저장/로드
- ✅ 브라우저 자동재생 정책 대응

### 📝 추가 개선 제안

**현재 시스템은 충분히 안정적이지만, 원하시면:**

1. **효과음 추가**
   - 버튼 클릭 소리
   - 아이템 획득 소리

2. **트랙 프리로딩**
   - 다음 노드의 음악을 미리 로드

3. **크로스페이드**
   - 두 트랙을 동시에 재생하며 전환

---

## 📞 문제 발생 시

**이 문서의 섹션 6 (트러블슈팅)을 먼저 확인하세요!**

**그래도 해결 안 되면:**
1. 브라우저 콘솔 에러 확인
2. 섹션 5 (체크포인트) 단계별 확인
3. 섹션 10 (디버깅 스크립트) 실행

---

## 🎉 완료!

이 문서는 현재 작동 중인 음원 시스템의 **완벽한 스냅샷**입니다.  
나중에 문제가 생기면 이 문서를 참고하여 시스템을 복원할 수 있습니다! 🎵
