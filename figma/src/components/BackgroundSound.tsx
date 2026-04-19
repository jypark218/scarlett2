import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { type SoundTrack, isSoundEnabled } from '../utils/soundHelpers';
import { audioManager } from '../utils/AudioManager';

interface BackgroundSoundProps {
  track: SoundTrack;
  showButton?: boolean;
}

export function BackgroundSound({ track, showButton = true }: BackgroundSoundProps) {
  // 사운드 시스템이 비활성화되어 있으면 렌더링하지 않음
  if (!isSoundEnabled()) {
    return null;
  }

  const [state, setState] = useState(audioManager.getState());

  // 트랙 변경 (AudioManager에서 중복 체크)
  useEffect(() => {
    audioManager.setTrack(track);
  }, [track]);

  // 상태 업데이트 리스너
  useEffect(() => {
    const updateState = () => {
      setState(audioManager.getState());
    };

    // 주기적으로 상태 확인
    const interval = setInterval(updateState, 1000);
    
    // 이벤트 리스너
    window.addEventListener('soundMuteToggle', updateState);
    window.addEventListener('soundVolumeChange', updateState);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('soundMuteToggle', updateState);
      window.removeEventListener('soundVolumeChange', updateState);
    };
  }, []);

  // 빠른 음소거 토글
  const toggleMute = () => {
    audioManager.setMuted(!state.isMuted);
    setState(audioManager.getState());
  };

  return (
    <>
      {showButton && (
        <div className="fixed top-16 right-4 z-10">
          <Button
            onClick={toggleMute}
            variant="outline"
            size="icon"
            className="glass-panel border-amber-600/30 hover:border-amber-500/50 transition-all duration-300"
            title={state.isMuted ? '음악 켜기' : '음악 끄기'}
          >
            {state.isMuted ? (
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