import { BookOpen, Eye } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { audioManager } from '../utils/AudioManager';

interface IntroScreenProps {
  onStart: () => void;
  onLoad: () => void;
  hasSavedGame: boolean;
}

export function IntroScreen({ onStart, onLoad, hasSavedGame }: IntroScreenProps) {
  const [showButtons, setShowButtons] = useState(false);
  
  // 🔒 중복 실행 방지
  const isStartingRef = useRef(false);
  
  useEffect(() => {
    // 페이드인 효과
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // 🎵 IntroScreen이 마운트되면 intro_theme 설정
  useEffect(() => {
    audioManager.setTrack('intro_theme');
  }, []);
  
  const handleStartClick = () => {
    // 🔒 이미 시작 중이면 무시
    if (isStartingRef.current) {
      return;
    }
    
    isStartingRef.current = true;
    
    // 🎵 사용자 인터랙션으로 오디오 재생 시도
    audioManager.tryPlay();
    
    onStart();
  };
  
  const handleLoadClick = () => {
    // 🔒 이미 시작 중이면 무시
    if (isStartingRef.current) {
      return;
    }
    
    isStartingRef.current = true;
    
    // 🎵 사용자 인터랙션으로 오디오 재생 시도
    audioManager.tryPlay();
    
    onLoad();
  };
  
  return (
    <div className="min-h-screen flex flex-col safe-area-inset relative overflow-hidden">
      {/* Background Image - Victorian Gothic Illustration */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1717250265213-c2886f17ab0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBnb3RoaWMlMjBtYW5zaW9uJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NTY5MDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1920)',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>
      
      {/* Atmospheric background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-700/5 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      </div>
      
      {/* Safe area top padding */}
      <div className="pt-safe-top" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        {/* Title Section - Material Design Hierarchy */}
        <div className="text-center mb-8 sm:mb-12 space-y-4 sm:space-y-6 max-w-2xl animate-fade-in">
          {/* Headline Large */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            진홍의 증언
          </h1>
          
          {/* Headline Small */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-amber-600/50" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-amber-500 tracking-wide uppercase">
              A Study in Scarlet
            </h2>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-amber-600/50" />
          </div>
          
          {/* Body Large */}
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-lg mx-auto">
            새벽 5시, 급보가 날아왔다.
            <br />
            <span className="text-red-400 font-semibold">"모로 백작 실종. 비어있는 침실, 수많은 단서가 그의 목숨을 노린다."</span>
            <br />
            <span className="text-amber-400 font-medium">당신의 선택이 진실을 밝힌다.</span>
          </p>
          
          {/* Simple tags */}
          <div className="flex items-center justify-center gap-3 mt-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Eye className="size-3" />
              <span>다양한 엔딩 경험</span>
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="size-3" />
              <span>추리 어드벤처</span>
            </span>
          </div>
        </div>
        
        {/* CTA Buttons - Material Design Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-sm animate-scale-in mt-8">
          {/* Primary Action - 저장된 게임이 있으면 "이어하기"로 시작 */}
          {hasSavedGame ? (
            <>
              <button
                onClick={handleLoadClick}
                className="group relative w-full px-6 sm:px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium text-base sm:text-lg transition-all duration-200 elevation-2 hover:elevation-4 active:scale-98"
              >
                <span className="relative z-10">이어하기</span>
                {/* Ripple effect overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-lg transition-colors" />
              </button>
              
              <button
                onClick={onStart}
                className="group relative w-full px-6 sm:px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium text-base sm:text-lg transition-all duration-200 elevation-1 hover:elevation-3 border border-white/10 active:scale-98"
              >
                <span className="relative z-10">새로 하기</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-colors" />
              </button>
            </>
          ) : (
            <button
              onClick={handleStartClick}
              className="group relative w-full px-6 sm:px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium text-base sm:text-lg transition-all duration-200 elevation-2 hover:elevation-4 active:scale-98"
            >
              <span className="relative z-10">게임 시작</span>
              {/* Ripple effect overlay */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-lg transition-colors" />
            </button>
          )}
        </div>
        
        {/* Supporting Text */}
        <p className="text-xs sm:text-sm text-neutral-500 text-center mt-8 sm:mt-10 max-w-xs leading-relaxed">
          이 게임은 선택에 따라 다양한 결말을 경험할 수 있습니다.
          <br />
          신중하게 선택하세요.
        </p>
      </div>
      
      {/* Safe area bottom padding */}
      <div className="pb-safe-bottom" />
    </div>
  );
}