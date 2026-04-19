import { useState, useEffect } from 'react';
import { X, Code, GraduationCap, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { isSoundEnabled } from '../utils/soundHelpers';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [showNodeIds, setShowNodeIds] = useState(false);
  const [showEvidenceGuide, setShowEvidenceGuide] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(30);
  const soundEnabled = isSoundEnabled();
  
  // 로컬 스토리지에서 설정 로드
  useEffect(() => {
    const savedShowNodeIds = localStorage.getItem('showNodeIds');
    const savedEvidenceGuide = localStorage.getItem('evidenceGuideEnabled');
    const savedMuteState = localStorage.getItem('soundMuted');
    const savedVolume = localStorage.getItem('soundVolume');
    
    if (savedShowNodeIds === 'true') {
      setShowNodeIds(true);
    }
    
    if (savedEvidenceGuide === 'true') {
      setShowEvidenceGuide(true);
    }
    
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

  // 음악 토글
  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    localStorage.setItem('soundMuted', newMuteState.toString());
    
    // BackgroundSound 컴포넌트에 알림
    window.dispatchEvent(new CustomEvent('soundMuteToggle', { detail: newMuteState }));
  };

  // 음량 조절
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    localStorage.setItem('soundVolume', newVolume.toString());
    
    // BackgroundSound 컴포넌트에 알림
    window.dispatchEvent(new CustomEvent('soundVolumeChange', { detail: newVolume / 100 }));
  };

  // 노드 ID 표시 토글
  const toggleShowNodeIds = () => {
    const newState = !showNodeIds;
    setShowNodeIds(newState);
    localStorage.setItem('showNodeIds', newState.toString());
    
    // 페이지 새로고침으로 적용
    window.location.reload();
  };

  // 증거 가이드 토글
  const toggleShowEvidenceGuide = () => {
    const newState = !showEvidenceGuide;
    
    if (confirm(`증거 가이드를 ${newState ? 'ON' : 'OFF'} 하시겠습니까?\n\n⚠️ 난이도 변경은 게임을 재시작해야 적용됩니다.\n(현재 진행 상황은 저장됩니다)`)) {
      setShowEvidenceGuide(newState);
      localStorage.setItem('evidenceGuideEnabled', newState.toString());
      
      // 페이지 새로고침으로 적용
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass-strong elevation-8 rounded-xl border border-amber-600/30 p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl text-amber-400">설정</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="size-8 hover:bg-slate-700/50 rounded-full"
          >
            <X className="size-5 text-slate-400" />
          </Button>
        </div>

        {/* Settings List */}
        <div className="space-y-4">
          {/* 배경음악 설정 - 음악이 활성화되어 있을 때만 표시 */}
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
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}

          {/* 개발자 모드 */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className={`size-5 ${showNodeIds ? 'text-purple-500' : 'text-slate-400'}`} />
                <div>
                  <h3 className="text-slate-200 mb-1">개발자 모드</h3>
                  <p className="text-xs text-slate-400">노드 ID 표시 (디버깅용)</p>
                </div>
              </div>
              <Button
                onClick={toggleShowNodeIds}
                variant={showNodeIds ? "default" : "outline"}
                size="sm"
                className={showNodeIds 
                  ? "bg-purple-600 hover:bg-purple-700 text-white" 
                  : "border-slate-600 text-slate-400 hover:bg-slate-700"
                }
              >
                {showNodeIds ? 'ON' : 'OFF'}
              </Button>
            </div>
          </div>

          {/* 증거 가이드 */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GraduationCap className={`size-5 ${showEvidenceGuide ? 'text-blue-500' : 'text-slate-400'}`} />
                <div>
                  <h3 className="text-slate-200 mb-1">증거 가이드</h3>
                  <p className="text-xs text-slate-400">증거 가이드 표시 (도움용)</p>
                </div>
              </div>
              <Button
                onClick={toggleShowEvidenceGuide}
                variant={showEvidenceGuide ? "default" : "outline"}
                size="sm"
                className={showEvidenceGuide 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "border-slate-600 text-slate-400 hover:bg-slate-700"
                }
              >
                {showEvidenceGuide ? 'ON' : 'OFF'}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-500 text-center">
            설정은 자동으로 저장됩니다
          </p>
        </div>
      </div>
    </div>
  );
}