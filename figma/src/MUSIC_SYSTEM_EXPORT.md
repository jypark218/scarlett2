# 🎵 음악 시스템 전체 코드 익스포트

다른 AI에게 전달하기 위한 완전한 음악 시스템 코드입니다.

---

## 📋 **시스템 개요**

### **현재 상황:**
- Figma Make 환경에서 비주얼 노벨 게임 개발 중
- HTML5 Audio API 기반 배경음악 시스템
- **문제**: 외부 오디오 URL 로딩 실패 (`NotSupportedError`)
- **시도한 CDN**: 
  1. ❌ Incompetech (CORS 불안정)
  2. ❌ Pixabay (Figma Make 차단)
  3. 🤞 Internet Archive (현재 시도 중)

### **시스템 특징:**
- 16개 음악 트랙 (분위기별, 캐릭터별)
- 3단계 폴백 시스템 (Primary → Fallback → Silent Track)
- 페이드 인/아웃 효과
- 볼륨 조절 및 음소거
- localStorage 설정 저장
- 실시간 디버그 패널

---

## 📁 **파일 구조**

```
/utils/musicHelpers.ts          # 음악 URL 및 트랙 선택 로직
/components/BackgroundMusic.tsx  # 메인 오디오 재생 컴포넌트
/components/MusicDebugPanel.tsx  # 디버그 패널 UI
```

---

## 🎯 **질문할 내용 (다른 AI에게)**

### **주요 문제:**
```
Figma Make 환경에서 외부 오디오 파일이 로드되지 않습니다.

에러 메시지: "NotSupportedError: The element has no supported sources."

시도한 CDN:
1. Incompetech (incompetech.com) - CORS 불안정
2. Pixabay (cdn.pixabay.com) - 차단됨
3. Internet Archive (archive.org) - 현재 시도 중 (여전히 실패)

모든 URL이 HTTPS이고, CORS 헤더도 있지만 Figma Make에서 차단되는 것으로 보입니다.
```

### **필요한 해결책:**
```
1. Figma Make에서 작동하는 무료 오디오 CDN이 있나요?
2. Base64로 인코딩한 음악 파일을 직접 포함할 수 있나요? (파일 크기 제한은?)
3. Web Audio API로 프로그래매틱하게 음악을 생성하는 대안이 있나요?
4. 다른 회피 방법이 있나요? (예: 프록시, 다른 프로토콜 등)
```

---

## 📄 **파일 1: `/utils/musicHelpers.ts`**

```typescript
// 🎵 배경음악 시스템 활성화 여부
// false로 설정하면 BackgroundMusic 컴포넌트가 렌더링되지 않음
export const isMusicEnabled = () => true;

// 🎵 음악 트랙 타입 정의
export type MusicTrack = 
  | 'intro'
  | 'calm'
  | 'mystery'
  | 'tension'
  | 'deduction'
  | 'investigation'
  | 'fear'
  | 'revelation'
  | 'ending'
  | 'holmes_theme'
  | 'watson_theme'
  | 'hope_theme'
  | 'count_theme'
  | 'gregson_theme'
  | 'drebber_theme';

// 🎵 배경음악 URL 매핑
// Internet Archive - Public Domain 음악 (CORS 완전 허용)
// 퍼블릭 도메인 클래식 음악 - 저작권 없음
export const MUSIC_TRACKS: Record<MusicTrack, string> = {
  // 🏠 인트로 - 미스터리한 분위기 (Beethoven - Moonlight Sonata)
  intro: 'https://archive.org/download/cd_classical-music-for-dummies_various/disc1/01.%20Classical%20Music%20For%20Dummies%20-%20Moonlight%20Sonata%2C%20Moveme_sample.mp3',
  
  // 🌅 평온 - 잔잔한 피아노 (Chopin - Nocturne)
  calm: 'https://archive.org/download/VariousArtists-ClassicalMusicForRelaxation/01ChopinNocturneOp.91.mp3',
  
  // 🔍 미스터리 - 의문과 탐색 (Grieg - In the Hall of the Mountain King)
  mystery: 'https://archive.org/download/GriegPeerGynt/01InTheHallOfTheMountainKing.mp3',
  
  // ⚡ 긴장 - 팽팽한 긴장감 (Vivaldi - Winter)
  tension: 'https://archive.org/download/VivaldiTheFourSeasons/02Winter-Largo.mp3',
  
  // 🧠 추리 - 차분한 사고 (Bach - Air on G String)
  deduction: 'https://archive.org/download/jsbach_air_on_the_g_string/air_on_the_g_string.mp3',
  
  // 🏃 긴박한 추리 - 긴박함 (Mozart - Requiem)
  investigation: 'https://archive.org/download/Mozart-Requiem/01.RequiemInDMinorK.626-Introitus-Requiem.mp3',
  
  // 💀 공포 - 불길하고 공포스러움 (Wagner - Ride of the Valkyries)
  fear: 'https://archive.org/download/cd_the-classical-music-experience_various-classical-artists/disc1/08.%20The%20Classical%20Music%20Experience%20-%20The%20Ride%20Of%20The%20Valkyries_sample.mp3',
  
  // 💡 진실 폭로 - 극적인 반전 (Beethoven - Symphony No. 5)
  revelation: 'https://archive.org/download/Beethoven-Symphony5/01Allegro.mp3',
  
  // 🎬 엔딩 - 장엄한 마무리 (Handel - Messiah)
  ending: 'https://archive.org/download/HandelMessiah/01Overture.mp3',
  
  // 🎭 캐릭터 테마곡
  holmes_theme: 'https://archive.org/download/cd_sherlock-holmes-music-from-221b-baker-street_various/disc1/01.%20Sherlock%20Holmes%20-%20Music%20From%20221b%20Baker%20Street%20-%20Sherlock%20Holmes%20Theme_sample.mp3',
  watson_theme: 'https://archive.org/download/VariousArtists-ClassicalMusicForRelaxation/03DebussyClairDeLune.mp3',
  hope_theme: 'https://archive.org/download/AlbinoniAdagioInGMinor/AlbinoniAdagioInGMinor.mp3',
  count_theme: 'https://archive.org/download/cd_classical-music-for-dummies_various/disc1/06.%20Classical%20Music%20For%20Dummies%20-%20Eine%20Kleine%20Nachtmusik%2C%20Movement%201_sample.mp3',
  gregson_theme: 'https://archive.org/download/HolstThePlanets/03Mercury-TheWingedMessenger.mp3',
  drebber_theme: 'https://archive.org/download/cd_the-classical-music-experience_various-classical-artists/disc1/04.%20The%20Classical%20Music%20Experience%20-%20Toccata%20And%20Fugue%20In%20D%20Minor%20BWV%20565_sample.mp3',
};

// 🔄 백업 URL (Archive.org 다른 음원)
export const FALLBACK_TRACKS: Record<MusicTrack, string> = {
  intro: 'https://archive.org/download/beethoven_opus_27_2/moonlight_1.mp3',
  calm: 'https://archive.org/download/debussy-clair-de-lune/claire.mp3',
  mystery: 'https://archive.org/download/grieg-peer-gynt-suite/01-morning-mood.mp3',
  tension: 'https://archive.org/download/Antonio_Vivaldi-The_Four_Seasons/winter_1.mp3',
  deduction: 'https://archive.org/download/jsbach-Air/JS_Bach-Air.mp3',
  investigation: 'https://archive.org/download/mozart-requiem-lacrimosa/Mozart-Requiem-Lacrimosa.mp3',
  fear: 'https://archive.org/download/wagner-ride-valkyries/wagner-ride-valkyries.mp3',
  revelation: 'https://archive.org/download/Beethoven_Symphony_No_5/beethoven_symphony_no_5_1st_movement.mp3',
  ending: 'https://archive.org/download/Handel-Hallelujah-Chorus/Handel-Hallelujah-Chorus.mp3',
  holmes_theme: 'https://archive.org/download/saint-saens-danse-macabre/Saint-Saens-Danse-Macabre.mp3',
  watson_theme: 'https://archive.org/download/satie-gymnopedie-1/Satie-Gymnopedie-1.mp3',
  hope_theme: 'https://archive.org/download/barber-adagio-strings/Barber-Adagio-For-Strings.mp3',
  count_theme: 'https://archive.org/download/mozart-eine-kleine-nachtmusik-1/Mozart-Eine-Kleine-Nachtmusik-1.mp3',
  gregson_theme: 'https://archive.org/download/rossini-william-tell-overture/Rossini-William-Tell-Overture.mp3',
  drebber_theme: 'https://archive.org/download/bach-toccata-fugue-d-minor/Bach-Toccata-Fugue-D-Minor.mp3',
};

// 🛡️ 최종 안전 백업 (매우 짧은 무음 파일 - Base64)
// 1초짜리 무음 MP3 (342 bytes)
export const SILENT_TRACK = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADhAC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAA4T/y8TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//MUZAAHwAAAf4AAAAgAAA/wAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';

/**
 * 현재 노드와 배경, 캐릭터에 따라 재생할 음악 트랙을 결정합니다
 * 
 * 🎵 우선순위:
 * 1. HIGH PRIORITY 노드 상황 (공포, 박, 진실 등) - 무조건 우선
 * 2. 캐릭터 조우 시 캐릭터 테마
 * 3. NORMAL PRIORITY 노드 상황 (추리, 조사 등)
 * 4. 배경/장소
 * 5. 기본값
 * 
 * @param nodeId - 현재 스토리 노드 ID
 * @param backgroundId - 현재 배경 ID
 * @param characterId - 현재 주도 캐릭터 ID (선택)
 * @param isIntro - 인트로 화면인지 여부
 * @returns 재생할 음악 트랙
 */
export function getMusicTrackForNode(
  nodeId?: string,
  backgroundId?: string,
  characterId?: string,
  isIntro?: boolean
): MusicTrack {
  if (isIntro) {
    return 'intro';
  }
  
  // 1순위: HIGH PRIORITY 노드 상황 (강제 상황 음악)
  if (nodeId) {
    const nodeMusic = getMusicForNode(nodeId);
    if (nodeMusic.priority === 'high') {
      return nodeMusic.track;
    }
  }
  
  // 2순위: 캐릭터 조우 시 캐릭터 테마
  if (characterId && nodeId && isCharacterEncounter(nodeId)) {
    const characterMusic = getMusicForCharacter(characterId);
    if (characterMusic) {
      return characterMusic;
    }
  }
  
  // 3순위: 캐릭터 테마 (조우가 아닌 일반 씬)
  if (characterId) {
    const characterMusic = getMusicForCharacter(characterId);
    if (characterMusic) {
      // NORMAL 우선순위 노드 상황이 있으면 그걸 우선
      if (nodeId) {
        const nodeMusic = getMusicForNode(nodeId);
        if (nodeMusic.priority === 'normal' && nodeMusic.track !== 'calm') {
          return nodeMusic.track;
        }
      }
      return characterMusic;
    }
  }
  
  // 4순위: NORMAL PRIORITY 노드 상황
  if (nodeId) {
    const nodeMusic = getMusicForNode(nodeId);
    return nodeMusic.track;
  }
  
  // 5순위: 배경 ID
  if (backgroundId) {
    return getMusicForBackground(backgroundId);
  }
  
  // 최종 기본값
  return 'calm';
}

// 🎵 노드별 음악 매핑 (상황/이벤트 기반)
function getMusicForNode(nodeId: string): { track: MusicTrack; priority: 'high' | 'normal' } {
  // HIGH PRIORITY: 무조건 우선하는 강한 상황
  // 공포, 박탈감, 죽음, 진실 폭로 등
  
  // 🩸 시체 발견, 공포 상황
  if (nodeId.includes('body') || nodeId.includes('corpse') || nodeId.includes('death_scene')) {
    return { track: 'fear', priority: 'high' };
  }
  
  // 💀 악몽, 꿈 시퀀스
  if (nodeId.includes('dream') || nodeId.includes('nightmare')) {
    return { track: 'fear', priority: 'high' };
  }
  
  // ⚡ 범인 추격, 긴박한 상황
  if (nodeId.includes('chase') || nodeId.includes('escape') || nodeId.includes('urgent')) {
    return { track: 'investigation', priority: 'high' };
  }
  
  // 💡 진실 폭로, 결정적 증거 발견
  if (nodeId.includes('revelation') || nodeId.includes('truth') || nodeId.includes('exposed')) {
    return { track: 'revelation', priority: 'high' };
  }
  
  // 🎬 엔딩
  if (nodeId.includes('ending') || nodeId === 'epilogue') {
    return { track: 'ending', priority: 'high' };
  }
  
  // NORMAL PRIORITY: 일반적인 분위기
  
  // 🧠 홈즈의 추리 장면
  if (nodeId.includes('holmes_deduction') || nodeId.includes('explanation')) {
    return { track: 'deduction', priority: 'normal' };
  }
  
  // 🔍 증거 조사, 탐색
  if (nodeId.includes('investigate') || nodeId.includes('search') || nodeId.includes('examine')) {
    return { track: 'mystery', priority: 'normal' };
  }
  
  // ⚡ 심문, 대치
  if (nodeId.includes('interrogate') || nodeId.includes('confront') || nodeId.includes('accuse')) {
    return { track: 'tension', priority: 'normal' };
  }
  
  // 🏛️ 백작과의 대화 (긴장감)
  if (nodeId.includes('count') && (nodeId.includes('talk') || nodeId.includes('meet'))) {
    return { track: 'tension', priority: 'normal' };
  }
  
  // 기본값 - 배경이나 캐릭터에게 위임
  return { track: 'calm', priority: 'normal' };
}

// 🎵 배경별 음악 매핑
function getMusicForBackground(backgroundId: string): MusicTrack {
  switch (backgroundId) {
    // 🏛️ 모로 백작 저택 내부
    case 'mansion_hall':
    case 'mansion_drawing_room':
    case 'mansion_study':
      return 'mystery';
    
    // 🌙 저택 외부, 밤
    case 'mansion_exterior_night':
    case 'mansion_garden_night':
      return 'tension';
    
    // 🍷 식당
    case 'mansion_dining':
      return 'calm';
    
    // 🔬 서재, 연구실
    case 'study':
    case 'laboratory':
      return 'deduction';
    
    // 🏨 그린 라이온 여관
    case 'green_lion_inn':
      return 'mystery';
    
    // 🏛️ 경찰서
    case 'scotland_yard':
      return 'tension';
    
    // 🏠 베이커가 221B
    case 'baker_street':
      return 'calm';
    
    // 🌆 런던 거리
    case 'london_street_day':
    case 'london_street_night':
      return 'mystery';
    
    // 기본값
    default:
      return 'calm';
  }
}

// 🎵 캐릭터별 테마 음악
function getMusicForCharacter(characterId: string): MusicTrack | null {
  switch (characterId) {
    case 'holmes':
      return 'holmes_theme';
    case 'watson':
      return null; // 왓슨은 화자이므로 테마 없음
    case 'count':
      return 'count_theme';
    case 'hope':
      return 'hope_theme';
    case 'gregson':
      return 'gregson_theme';
    case 'drebber':
      return 'drebber_theme';
    default:
      return null;
  }
}

// 🎵 캐릭터 첫 조우 판단
function isCharacterEncounter(nodeId: string): boolean {
  // "첫 만남" 또는 "등장" 키워드가 있으면 조우로 판단
  return nodeId.includes('meet') || 
         nodeId.includes('encounter') || 
         nodeId.includes('first') ||
         nodeId.includes('appears') ||
         nodeId.includes('arrival');
}
```

---

## 📄 **파일 2: `/components/BackgroundMusic.tsx`**

**⚠️ 주의:** 이 파일이 실제 오디오를 재생하는 핵심 컴포넌트입니다.

```typescript
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { MUSIC_TRACKS, FALLBACK_TRACKS, SILENT_TRACK, type MusicTrack, isMusicEnabled } from '../utils/musicHelpers';

interface BackgroundMusicProps {
  track: MusicTrack;
  volume?: number;
}

export function BackgroundMusic({ track, volume = 0.3 }: BackgroundMusicProps) {
  // 음악 시스템이 비활성화되어 있으면 아무것도 렌더링하지 않음
  if (!isMusicEnabled()) {
    return null;
  }

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true); // 기본값을 true로 변경 (처음에는 음소거)
  const [currentVolume, setCurrentVolume] = useState(volume);
  const currentTrackRef = useRef<string>('');
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const hasUserInteractedRef = useRef(false);
  const pendingPlayRef = useRef(false);

  // 🎵 페이드 효과
  const fadeVolume = (targetVolume: number, duration: number = 1000) => {
    const audio = audioRef.current;
    if (!audio || !isMountedRef.current) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const startVolume = audio.volume;
    const volumeChange = targetVolume - startVolume;
    const steps = 50;
    const stepDuration = duration / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (!isMountedRef.current || !audio) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        return;
      }

      currentStep++;
      const progress = currentStep / steps;
      audio.volume = Math.max(0, Math.min(1, startVolume + volumeChange * progress));

      if (currentStep >= steps) {
        audio.volume = targetVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        if (targetVolume === 0) {
          audio.pause();
        }
      }
    }, stepDuration);
  };

  // 디버그 로그 전송 헬퍼
  const sendDebugLog = (message: string) => {
    console.log(message);
    window.dispatchEvent(new CustomEvent('musicLog', { detail: message }));
  };

  // 음악 상태 업데이트
  const updateMusicState = () => {
    const audio = audioRef.current;
    if (!audio) return;

    window.dispatchEvent(new CustomEvent('musicState', {
      detail: {
        track: currentTrackRef.current,
        isPlaying: !audio.paused,
        isMuted,
        volume: currentVolume,
        hasError: false,
        errorMessage: '',
      }
    }));
  };

  // 로컬 스토리지에서 설정 로드 (최초 1회)
  useEffect(() => {
    const savedMuteState = localStorage.getItem('bgmMuted');
    const savedVolume = localStorage.getItem('bgmVolume');
    const hasPlayedBefore = localStorage.getItem('bgmHasPlayedBefore');
    
    // 이전에 한 번이라도 음악을 켠 적이 있으면 그 설정 유지
    if (hasPlayedBefore === 'true' && savedMuteState !== null) {
      setIsMuted(savedMuteState === 'true');
    }
    // 처음 방문이면 음소거 상태 유지 (기본값)
    
    if (savedVolume) {
      const vol = parseInt(savedVolume, 10);
      if (!isNaN(vol) && vol >= 0 && vol <= 100) {
        setCurrentVolume(vol / 100);
      }
    }
  }, []);

  // 트랙 전환 (핵심 로직!)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isMountedRef.current) return;

    // 같은 트랙이면 재생 상태 확인
    if (track === currentTrackRef.current && audio.src) {
      sendDebugLog(\`🎵 [BGM] Already playing: \${track}\`);
      
      // 같은 트랙이지만 멈춰있다면 재시작
      if (audio.paused && !isMuted) {
        sendDebugLog(\`🎵 [BGM] Track was paused, restarting...\`);
        audio.play().then(() => {
          fadeVolume(currentVolume, 800);
          sendDebugLog(\`✅ [BGM] Restarted: \${track}\`);
          updateMusicState();
        }).catch(err => {
          sendDebugLog(\`❌ [BGM] Restart failed: \${err.name} - \${err.message}\`);
          pendingPlayRef.current = true;
          updateMusicState();
        });
      }
      
      return;
    }

    const musicUrl = MUSIC_TRACKS[track];
    sendDebugLog(\`🎵 [BGM] Track change: \${track}\`);
    let cancelled = false;

    const changeTrack = async () => {
      try {
        // 기존 트랙 페이드 아웃
        if (currentTrackRef.current && !audio.paused) {
          sendDebugLog(\`🎵 [BGM] Fading out: \${currentTrackRef.current}\`);
          fadeVolume(0, 500);
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        if (cancelled || !isMountedRef.current) return;

        // 오디오 안전하게 정리
        audio.pause();
        audio.currentTime = 0;

        // 새 트랙 로드
        sendDebugLog(\`🎵 [BGM] Loading: \${track}\`);
        audio.src = musicUrl;
        audio.loop = true;
        audio.volume = 0;
        audio.load(); // 명시적으로 로드
        currentTrackRef.current = track;

        // 음소거가 아니면 재생
        if (!isMuted && !cancelled) {
          // 🎯 3단계 폴백 시스템
          // 1️⃣ Primary URL 시도
          // 2️⃣ Fallback URL 시도
          // 3️⃣ Silent track로 최종 폴백
          
          const tryPlayWithFallback = async (): Promise<void> => {
            // 1️⃣ Primary URL 시도
            try {
              sendDebugLog(\`🎵 [BGM] Attempting to play primary URL...\`);
              await audio.play();
              if (!cancelled && isMountedRef.current) {
                sendDebugLog(\`✅ [BGM] Playing: \${track} (primary)\`);
                fadeVolume(currentVolume, 1000);
                updateMusicState();
              }
              return;
            } catch (error: any) {
              sendDebugLog(\`❌ [BGM] Primary URL failed: \${error.name} - \${error.message}\`);
              
              // NotAllowedError는 자동 재생 차단이므로 폴백 X
              if (error.name === 'NotAllowedError') {
                sendDebugLog(\`⚠️ [BGM] Autoplay blocked - waiting for user interaction\`);
                pendingPlayRef.current = true;
                updateMusicState();
                return;
              }
              
              // 2️⃣ Fallback URL 시도
              if (FALLBACK_TRACKS[track] && !cancelled) {
                sendDebugLog(\`🔄 [BGM] Trying fallback URL for: \${track}\`);
                audio.src = FALLBACK_TRACKS[track];
                audio.load();
                
                try {
                  await audio.play();
                  if (!cancelled && isMountedRef.current) {
                    sendDebugLog(\`✅ [BGM] Playing: \${track} (fallback)\`);
                    fadeVolume(currentVolume, 1000);
                    updateMusicState();
                  }
                  return;
                } catch (fallbackError: any) {
                  sendDebugLog(\`❌ [BGM] Fallback URL also failed: \${fallbackError.name} - \${fallbackError.message}\`);
                }
              }
              
              // 3️⃣ Silent track로 최종 폴백 (에러 없이 계속 동작)
              if (!cancelled) {
                sendDebugLog(\`🔇 [BGM] Using silent track as last resort\`);
                audio.src = SILENT_TRACK;
                audio.load();
                
                try {
                  await audio.play();
                  if (!cancelled && isMountedRef.current) {
                    sendDebugLog(\`✅ [BGM] Silent track loaded (no audio but system working)\`);
                    fadeVolume(0, 0); // 무음이므로 볼륨 0
                    window.dispatchEvent(new CustomEvent('musicState', {
                      detail: {
                        track: currentTrackRef.current,
                        isPlaying: true,
                        isMuted,
                        volume: 0,
                        hasError: true,
                        errorMessage: \`All URLs failed, using silent fallback\`,
                      }
                    }));
                  }
                } catch (silentError: any) {
                  sendDebugLog(\`❌ [BGM] Even silent track failed: \${silentError.name} - \${silentError.message}\`);
                  pendingPlayRef.current = true;
                  window.dispatchEvent(new CustomEvent('musicState', {
                    detail: {
                      track: currentTrackRef.current,
                      isPlaying: false,
                      isMuted,
                      volume: currentVolume,
                      hasError: true,
                      errorMessage: \`Complete failure: \${silentError.message}\`,
                    }
                  }));
                }
              }
            }
          };
          
          await tryPlayWithFallback();
        } else {
          sendDebugLog(\`🔇 [BGM] Track loaded but muted\`);
          updateMusicState();
        }
      } catch (error: any) {
        if (!cancelled) {
          sendDebugLog(\`❌ [BGM] Fatal error in changeTrack: \${error.name} - \${error.message}\`);
          console.error('[BGM] Full error:', error);
          window.dispatchEvent(new CustomEvent('musicState', {
            detail: {
              track: currentTrackRef.current,
              isPlaying: false,
              isMuted,
              volume: currentVolume,
              hasError: true,
              errorMessage: \`Fatal: \${error.message}\`,
            }
          }));
        }
      }
    };

    changeTrack();

    return () => {
      cancelled = true;
    };
  }, [track, currentVolume, isMuted]);

  // 음소거 상태 변경
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;

    if (isMuted) {
      fadeVolume(0, 400);
      updateMusicState();
    } else {
      if (audio.paused) {
        audio.play().then(() => {
          if (isMountedRef.current) {
            fadeVolume(currentVolume, 800);
            sendDebugLog(\`✅ [BGM] Unmuted and playing\`);
            updateMusicState();
          }
        }).catch((err) => {
          sendDebugLog(\`❌ [BGM] Failed to play after unmute: \${err.name} - \${err.message}\`);
          pendingPlayRef.current = true;
          window.dispatchEvent(new CustomEvent('musicState', {
            detail: {
              track: currentTrackRef.current,
              isPlaying: false,
              isMuted,
              volume: currentVolume,
              hasError: true,
              errorMessage: \`Unmute failed: \${err.message}\`,
            }
          }));
        });
      } else {
        fadeVolume(currentVolume, 800);
        updateMusicState();
      }
    }
  }, [isMuted, currentVolume]);

  // 정리
  useEffect(() => {
    isMountedRef.current = true;
    
    // 사용자 인터랙션 감지 (첫 클릭/터치 시 음악 재생)
    const handleUserInteraction = () => {
      if (hasUserInteractedRef.current) return;
      
      hasUserInteractedRef.current = true;
      console.log('🖱️ [BGM] User interaction detected');
      
      // 대기 중인 재생 시작
      if (pendingPlayRef.current && audioRef.current && !isMuted) {
        const audio = audioRef.current;
        if (audio.src && audio.paused) {
          sendDebugLog('🎵 [BGM] Starting pending playback after user interaction...');
          audio.play().then(() => {
            if (isMountedRef.current) {
              fadeVolume(currentVolume, 1000);
              sendDebugLog('✅ [BGM] Playback started after user interaction');
              pendingPlayRef.current = false;
              updateMusicState();
            }
          }).catch(err => {
            sendDebugLog(\`❌ [BGM] Still failed after interaction: \${err.name} - \${err.message}\`);
            window.dispatchEvent(new CustomEvent('musicState', {
              detail: {
                track: currentTrackRef.current,
                isPlaying: false,
                isMuted,
                volume: currentVolume,
                hasError: true,
                errorMessage: \`User interaction failed: \${err.message}\`,
              }
            }));
          });
        }
      }
      
      // 리스너 제거 (한 번만 실행)
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
    
    // 이벤트 리스너 등록
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      isMountedRef.current = false;
      
      // 페이드 인터벌 정리
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      
      // 이벤트 리스너 정리
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      
      // 오디오 안전하게 정리
      const audio = audioRef.current;
      if (audio) {
        try {
          audio.pause();
          audio.currentTime = 0;
          audio.src = '';
          audio.load();
        } catch (e) {
          // 정리 중 에러 무시
        }
      }
    };
  }, [currentVolume, isMuted]);

  // 빠른 음소거 토글
  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    localStorage.setItem('bgmMuted', String(newMuteState));
    
    // 처음 음악을 켠 경우 기록
    if (!newMuteState) {
      localStorage.setItem('bgmHasPlayedBefore', 'true');
      console.log('🎵 [BGM] User enabled music for the first time');
    }
  };

  return (
    <>
      <audio ref={audioRef} />
      
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
    </>
  );
}
```

---

## 📄 **파일 3: `/components/MusicDebugPanel.tsx`**

**💡 참고:** 디버그용 패널로, 실시간 로그를 표시합니다.

```typescript
import { useState, useEffect } from 'react';
import { Music, X } from 'lucide-react';
import { Button } from './ui/button';

interface MusicDebugPanelProps {
  isVisible?: boolean;
}

export function MusicDebugPanel({ isVisible = false }: MusicDebugPanelProps) {
  const [isOpen, setIsOpen] = useState(isVisible);
  const [logs, setLogs] = useState<string[]>([]);
  const [musicState, setMusicState] = useState({
    track: '',
    isPlaying: false,
    isMuted: false,
    volume: 0,
    hasError: false,
    errorMessage: '',
  });

  useEffect(() => {
    // 커스텀 이벤트로 음악 상태 업데이트
    const handleMusicLog = (event: CustomEvent<string>) => {
      setLogs(prev => {
        const newLogs = [...prev, \`\${new Date().toLocaleTimeString()}: \${event.detail}\`];
        return newLogs.slice(-10); // 최근 10개만 유지
      });
    };

    const handleMusicState = (event: CustomEvent<any>) => {
      setMusicState(event.detail);
    };

    window.addEventListener('musicLog', handleMusicLog as EventListener);
    window.addEventListener('musicState', handleMusicState as EventListener);

    return () => {
      window.removeEventListener('musicLog', handleMusicLog as EventListener);
      window.removeEventListener('musicState', handleMusicState as EventListener);
    };
  }, []);

  // localStorage에서 표시 상태 로드
  useEffect(() => {
    const saved = localStorage.getItem('showMusicDebug');
    if (saved === 'true') {
      setIsOpen(true);
    }
  }, []);

  const toggleShow = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('showMusicDebug', String(newState));
  };

  return (
    <>
      {/* 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-[9999] glass-panel border-purple-600/30 hover:border-purple-500/50 p-3 rounded-lg transition-all duration-300"
        title="🎵 음악 디버그 패널"
      >
        <span className="text-2xl">🎵</span>
      </button>

      {/* 디버그 패널 */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 z-[9999] glass-panel border-purple-600/30 p-4 rounded-lg w-96 max-h-[70vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-600/20">
            <h3 className="font-bold text-purple-400 flex items-center gap-2">
              🎵 음악 디버그
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* 음악 상태 */}
          <div className="mb-3 p-3 bg-slate-800/50 rounded border border-slate-700/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">트랙:</span>
              <span className="text-sm font-mono text-amber-400">{musicState.track || 'none'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">재생 중:</span>
              <span className="text-sm">{musicState.isPlaying ? '✅ 예' : '❌ 아니오'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">음소거:</span>
              <span className="text-sm">{musicState.isMuted ? '🔇 예' : '🔊 아니오'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">볼륨:</span>
              <span className="text-sm font-mono text-blue-400">{Math.round(musicState.volume * 100)}%</span>
            </div>
            {musicState.hasError && (
              <>
                <div className="flex items-start gap-2 pt-2 border-t border-red-600/30">
                  <span className="text-sm text-red-400">⚠️ 에러:</span>
                  <span className="text-xs text-red-300 flex-1">{musicState.errorMessage}</span>
                </div>
                
                {/* Figma Make 정책 경고 */}
                {musicState.errorMessage.includes('no supported') && (
                  <div className="mt-2 p-2 bg-orange-900/20 border border-orange-600/30 rounded">
                    <div className="text-xs text-orange-400 font-bold mb-1">🚨 Figma Make 제약</div>
                    <div className="text-xs text-orange-300/80 mb-2">
                      Figma Make가 외부 오디오 파일 로딩을 차단하고 있을 수 있습니다. 
                      브라우저 콘솔(F12)에서 추가 정보를 확인하세요.
                    </div>
                    <div className="text-xs text-orange-200/70">
                      <strong>시도 중인 CDN:</strong>
                      <br />• Internet Archive (archive.org)
                      <br />• Public Domain 클래식 음악
                      <br />
                      <br />
                      <strong>대안:</strong>
                      <br />음악 없이도 게임을 정상적으로 플레이할 수 있습니다.
                      음소거 버튼(🔊)을 눌러 음악 시스템을 비활성화하세요.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 로그 */}
          <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[400px] bg-black/50 rounded p-2 font-mono text-xs">
            {logs.length === 0 ? (
              <div className="text-slate-500 text-center py-4">로그 없음</div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className={\`py-1 \${
                    log.startsWith('✅')
                      ? 'text-green-400'
                      : log.startsWith('❌')
                      ? 'text-red-400'
                      : log.startsWith('⚠️')
                      ? 'text-orange-400'
                      : log.startsWith('🔄')
                      ? 'text-blue-400'
                      : log.startsWith('🔇')
                      ? 'text-purple-400'
                      : 'text-slate-300'
                  }\`}
                >
                  {log}
                </div>
              ))
            )}
          </div>

          {/* 클리어 버튼 */}
          <button
            onClick={() => setLogs([])}
            className="mt-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            로그 지우기
          </button>
        </div>
      )}
    </>
  );
}
```

---

## 🔧 **사용 방법**

### **App.tsx에서 사용:**
```typescript
import { BackgroundMusic } from './components/BackgroundMusic';
import { MusicDebugPanel } from './components/MusicDebugPanel';
import { getMusicTrackForNode } from './utils/musicHelpers';

function App() {
  const currentTrack = getMusicTrackForNode(
    'intro',           // nodeId
    'mansion_hall',    // backgroundId
    'holmes',          // characterId
    false              // isIntro
  );

  return (
    <>
      <BackgroundMusic track={currentTrack} volume={0.3} />
      <MusicDebugPanel />
      {/* ... 나머지 앱 */}
    </>
  );
}
```

---

## 🆘 **다른 AI에게 물어볼 질문**

```
Figma Make (웹 기반 React 환경)에서 HTML5 Audio API로 외부 오디오를 로드하려고 합니다.

현재 문제:
- NotSupportedError: "The element has no supported sources."
- 시도한 CDN: Incompetech (CORS 불안정), Pixabay (차단), Internet Archive (실패)
- 모든 URL이 HTTPS이고 MP3 형식입니다.

질문:
1. Figma Make에서 작동하는 무료 CORS 허용 음악 CDN을 추천해주세요
2. Base64로 음악을 내장하는 것이 현실적인가요? (파일 크기 제한은?)
3. Web Audio API로 간단한 배경음을 프로그래매틱하게 생성할 수 있나요?
4. 다른 우회 방법이 있나요?

위 3개 파일의 코드를 참고해주세요.
```

---

**📦 이 파일을 다른 AI에게 복사/붙여넣기 하면 됩니다!** 🎉
