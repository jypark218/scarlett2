import { SOUND_TRACKS, type SoundTrack } from './soundHelpers';

/**
 * 🎵 전역 오디오 매니저
 * 
 * 싱글톤 패턴으로 게임 전체에서 하나의 Audio 인스턴스만 사용
 * 노드 전환 시에도 음악이 끊기지 않음
 * HMR(Hot Module Replacement) 대응으로 중복 재생 방지
 */

// 🌐 전역 Audio 인스턴스 보관 (HMR 시에도 유지)
declare global {
  interface Window {
    __audioManagerInstance?: HTMLAudioElement;
  }
}

class AudioManager {
  private audio: HTMLAudioElement;
  private currentTrack: SoundTrack | null = null;
  private targetVolume: number = 1.0;
  private isMuted: boolean = false;
  private fadeInterval: NodeJS.Timeout | null = null;
  private isChangingTrack: boolean = false; // 🔒 트랙 변경 중 플래그

  constructor() {
    // 🔒 HMR 대응: 기존 Audio 인스턴스가 있으면 재사용
    if (typeof window !== 'undefined' && window.__audioManagerInstance) {
      console.log('🎵 Reusing existing Audio instance (HMR detected)');
      this.audio = window.__audioManagerInstance;
    } else {
      console.log('🎵 Creating new Audio instance');
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.volume = 0;
      
      // 전역에 저장 (HMR 시 재사용)
      if (typeof window !== 'undefined') {
        window.__audioManagerInstance = this.audio;
      }
    }
    
    // 로컬 스토리지에서 설정 로드
    this.loadSettings();
  }

  private loadSettings() {
    const savedMuteState = localStorage.getItem('soundMuted');
    const savedVolume = localStorage.getItem('soundVolume');
    
    if (savedMuteState !== null) {
      this.isMuted = savedMuteState === 'true';
    }
    
    if (savedVolume) {
      const vol = parseInt(savedVolume, 10);
      if (!isNaN(vol) && vol >= 0 && vol <= 100) {
        this.targetVolume = vol / 100;
      }
    }
  }

  /**
   * 페이드 효과로 볼륨 변경
   */
  private fadeVolume(targetVolume: number, duration: number = 1000): Promise<void> {
    return new Promise((resolve) => {
      if (this.fadeInterval) {
        clearInterval(this.fadeInterval);
      }

      const startVolume = this.audio.volume;
      const volumeChange = targetVolume - startVolume;
      const steps = 50;
      const stepDuration = duration / steps;
      let currentStep = 0;

      this.fadeInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        this.audio.volume = Math.max(0, Math.min(1, startVolume + volumeChange * progress));

        if (currentStep >= steps) {
          this.audio.volume = targetVolume;
          if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
            this.fadeInterval = null;
          }
          resolve();
        }
      }, stepDuration);
    });
  }

  /**
   * 트랙 변경 (같은 트랙이면 스킵)
   */
  async setTrack(track: SoundTrack) {
    // 🔒 이미 트랙 변경 중이면 스킵
    if (this.isChangingTrack) {
      console.log('🎵 Track change already in progress, skipping:', track);
      return;
    }

    // 같은 트랙이면 스킵
    if (this.currentTrack === track) {
      console.log('🎵 Same track, skipping:', track);
      return;
    }

    // 🔒 같은 URL이면 스킵 (트랙 이름은 다르지만 실제 음원이 같은 경우)
    const newSoundUrl = SOUND_TRACKS[track];
    if (this.audio.src && this.audio.src.endsWith(newSoundUrl)) {
      console.log('🎵 Same audio source, updating track name only:', this.currentTrack, '→', track);
      this.currentTrack = track;
      return;
    }

    console.log('🎵 Changing track:', this.currentTrack, '→', track);
    
    this.isChangingTrack = true; // 🔒 트랙 변경 시작

    const soundUrl = newSoundUrl;
    
    try {
      // 🎵 기존 음악이 재생 중이면 페이드아웃
      if (!this.audio.paused && this.audio.volume > 0) {
        await this.fadeVolume(0, 500); // 0.5초 페이드아웃
      }
      
      // 🔄 페이드 인터벌 정리
      if (this.fadeInterval) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
      
      // 🎵 완전히 정지하고 초기화 (기존 트랙이 있든 없든)
      this.audio.pause();
      this.audio.currentTime = 0;
      
      // src를 변경하기 전에 이전 src 제거 (메모리 정리)
      if (this.audio.src) {
        this.audio.removeAttribute('src');
        this.audio.load(); // 이전 src 완전히 언로드
      }
      
      this.audio.src = soundUrl;
      this.audio.load();
      this.currentTrack = track;

      // 음소거가 아니면 재생 (페이드인)
      if (!this.isMuted) {
        try {
          this.audio.volume = 0;
          await this.audio.play();
          await this.fadeVolume(this.targetVolume, 800); // 0.8초 페이드인
        } catch (error: any) {
          // 자동 재생 차단 - 사용자 인터랙션 대기
          if (error.name === 'NotAllowedError') {
            console.log('🎵 Autoplay blocked - waiting for user interaction');
          }
        }
      }
    } catch (error) {
      console.error('🎵 Error changing track:', error);
    } finally {
      this.isChangingTrack = false; // 🔒 트랙 변경 완료
    }
  }

  /**
   * 음소거 토글
   */
  async setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('soundMuted', String(muted));

    if (muted) {
      await this.fadeVolume(0, 400);
    } else {
      if (this.audio.paused && this.audio.src) {
        try {
          this.audio.volume = 0;
          await this.audio.play();
          await this.fadeVolume(this.targetVolume, 800);
        } catch (err) {
          console.log('🎵 Play failed:', err);
        }
      } else if (!this.audio.paused) {
        await this.fadeVolume(this.targetVolume, 800);
      }
    }
  }

  /**
   * 볼륨 설정
   */
  async setVolume(volume: number) {
    this.targetVolume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('soundVolume', String(Math.round(this.targetVolume * 100)));
    
    if (!this.isMuted && !this.audio.paused) {
      await this.fadeVolume(this.targetVolume, 300);
    }
  }

  /**
   * 현재 상태 가져오기
   */
  getState() {
    return {
      currentTrack: this.currentTrack,
      isMuted: this.isMuted,
      volume: this.targetVolume,
      isPlaying: !this.audio.paused
    };
  }

  /**
   * 사용자 인터랙션 후 재생 시도 (autoplay 정책 대응)
   */
  async tryPlay() {
    if (this.audio.paused && this.audio.src && !this.isMuted) {
      try {
        await this.audio.play();
        if (this.audio.volume === 0) {
          await this.fadeVolume(this.targetVolume, 800);
        }
      } catch (err) {
        console.log('🎵 Play failed:', err);
      }
    }
  }
}

// 싱글톤 인스턴스 생성
export const audioManager = new AudioManager();

// 전역 이벤트 리스너 설정 (HMR 대응 - 중복 등록 방지)
if (typeof window !== 'undefined') {
  // 기존 리스너 제거 후 재등록 (HMR 시 중복 방지)
  const handleMuteToggle = (event: Event) => {
    const customEvent = event as CustomEvent<boolean>;
    audioManager.setMuted(customEvent.detail);
  };

  const handleVolumeChange = (event: Event) => {
    const customEvent = event as CustomEvent<number>;
    audioManager.setVolume(customEvent.detail);
  };

  // 기존 리스너 제거 (있다면)
  window.removeEventListener('soundMuteToggle', handleMuteToggle);
  window.removeEventListener('soundVolumeChange', handleVolumeChange);
  
  // 새로운 리스너 등록
  window.addEventListener('soundMuteToggle', handleMuteToggle);
  window.addEventListener('soundVolumeChange', handleVolumeChange);

  // 사용자 인터랙션 시 자동 재생 시도 (한 번만)
  let hasTriedAutoplay = false;
  
  const tryPlayOnce = () => {
    if (hasTriedAutoplay) {
      console.log('🎵 Autoplay already attempted');
      return;
    }
    hasTriedAutoplay = true;
    console.log('🎵 Attempting autoplay on user interaction');
    audioManager.tryPlay();
  };
  
  // 한 번만 실행되도록 { once: true } 사용
  document.addEventListener('click', tryPlayOnce, { once: true });
  document.addEventListener('keydown', tryPlayOnce, { once: true });
}