import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioManager } from '../utils/AudioManager';

interface OpeningSequenceProps {
  onComplete: () => void;
}

// 🎬 역전재판 스타일 극적 인트로 대사 (컴포넌트 외부에 선언하여 재생성 방지)
const OPENING_LINES = [
  { 
    text: '1881년 10월, 런던.', 
    duration: 1200,
    color: 'text-white',
    flash: true,
    scale: true
  },
  { 
    text: '베이커 스트리트 221B.', 
    duration: 1200,
    color: 'text-amber-300',
    flash: true,
    scale: true
  },
  { 
    text: '나는 그날을 결코 잊을 수 없다.', 
    duration: 1500,
    color: 'text-white',
    flash: false,
    scale: false
  },
  { 
    text: '셜록 홈즈와 함께한...', 
    duration: 1800,
    color: 'text-slate-300',
    flash: false,
    scale: false,
    slow: true
  },
  { 
    text: '그 끔찍한 사건을.', 
    duration: 2500,
    color: 'text-red-500',
    flash: true,
    shake: true,
    scale: true,
    intense: true
  },
] as const;

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showFlash, setShowFlash] = useState(false);
  
  // 🔒 중복 실행 방지
  const isCompletingRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // onComplete 함수가 변경될 때마다 ref 업데이트
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // 🎵 OpeningSequence가 마운트되면 intro_theme 설정
  useEffect(() => {
    audioManager.setTrack('intro_theme');
    // 사용자가 이미 클릭했으므로 재생 시도
    audioManager.tryPlay();
  }, []);

  // 타핑 효과
  useEffect(() => {
    console.log('🎬 OpeningSequence: currentLine changed to', currentLine);
    
    if (currentLine >= OPENING_LINES.length) {
      // 🔒 중복 실행 방지
      if (isCompletingRef.current) {
        console.log('🎬 Already completing, skipping');
        return;
      }
      
      console.log('🎬 All lines displayed, completing in 1s');
      // 모든 대사 완료 후 잠시 대기 후 게임 시작
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

    const line = OPENING_LINES[currentLine];
    let charIndex = 0;
    let typingIntervalId: NodeJS.Timeout | null = null;
    let nextLineTimerId: NodeJS.Timeout | null = null;
    
    setDisplayedText('');
    setIsTyping(true);

    // 🔥 플래시 효과 (새 줄 시작 시)
    if (line.flash) {
      setShowFlash(true);
      const flashTimer = setTimeout(() => setShowFlash(false), line.intense ? 300 : 150);
      // Cleanup에서 처리하지 않음 (짧은 애니메이션이므로)
    }

    // 타이핑 애니메이션
    const typingSpeed = line.slow ? 80 : 40; // 느린 타이핑 또는 빠른 타이핑
    typingIntervalId = setInterval(() => {
      if (charIndex < line.text.length) {
        setDisplayedText(line.text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        if (typingIntervalId) clearInterval(typingIntervalId);
        setIsTyping(false);
        
        // 다음 줄로 이동
        nextLineTimerId = setTimeout(() => {
          setCurrentLine(prev => prev + 1);
        }, line.duration);
      }
    }, typingSpeed);

    // Cleanup 함수
    return () => {
      if (typingIntervalId) {
        clearInterval(typingIntervalId);
      }
      if (nextLineTimerId) {
        clearTimeout(nextLineTimerId);
      }
    };
  }, [currentLine]); // ✅ onComplete 의존성 제거 (ref 사용)

  const handleClick = () => {
    console.log('🎬 Click detected, currentLine:', currentLine, 'isTyping:', isTyping, 'isCompleting:', isCompletingRef.current);
    
    // 🔒 이미 완료 처리 중이면 무시
    if (isCompletingRef.current) {
      console.log('🎬 Already completing, ignoring click');
      return;
    }
    
    // 클릭 시 즉시 완료
    if (isTyping) {
      // 타이핑 중이면 현재 줄 완성
      setDisplayedText(OPENING_LINES[currentLine].text);
      setIsTyping(false);
    } else if (currentLine < OPENING_LINES.length - 1) {
      // 다음 줄로 즉시 이동
      setCurrentLine(currentLine + 1);
    } else {
      // ✅ 마지막 줄 → currentLine을 OPENING_LINES.length로 설정
      // useEffect가 감지하여 완료 처리
      console.log('🎬 Last line, moving to completion state');
      setCurrentLine(OPENING_LINES.length);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* 🔥 플래시 효과 - 역전재판 스타일 */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: OPENING_LINES[currentLine]?.intense ? 0.3 : 0.15 }}
            className={`absolute inset-0 z-50 pointer-events-none ${
              OPENING_LINES[currentLine]?.intense ? 'bg-red-600' : 'bg-white'
            }`}
          />
        )}
      </AnimatePresence>

      {/* 배경 비네트 효과 */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black" />

      {/* 🌩️ 대기 효과 */}
      {currentLine >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-red-950/20"
        />
      )}

      {/* 대사 표시 */}
      <AnimatePresence mode="wait">
        {currentLine < OPENING_LINES.length && (
          <motion.div
            key={currentLine}
            initial={{ 
              opacity: 0, 
              y: OPENING_LINES[currentLine].scale ? 50 : 20,
              scale: OPENING_LINES[currentLine].scale ? 0.8 : 1
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1,
              ...(OPENING_LINES[currentLine].shake && {
                x: [0, -3, 3, -3, 3, -2, 2, 0],
                y: [0, -2, 2, -2, 2, 0],
                rotate: [0, -0.5, 0.5, -0.5, 0.5, -0.3, 0.3, 0],
                transition: { 
                  x: { 
                    repeat: Infinity, 
                    duration: 0.5,
                    repeatType: "mirror"
                  },
                  y: { 
                    repeat: Infinity, 
                    duration: 0.4,
                    repeatType: "mirror"
                  },
                  rotate: { 
                    repeat: Infinity, 
                    duration: 0.6,
                    repeatType: "mirror"
                  }
                }
              })
            }}
            exit={{ 
              opacity: 0, 
              y: -20,
              scale: OPENING_LINES[currentLine].scale ? 1.1 : 1,
              transition: { duration: 0.3 }
            }}
            transition={{ 
              duration: 0.5,
              type: OPENING_LINES[currentLine].scale ? "spring" : "tween",
              stiffness: OPENING_LINES[currentLine].scale ? 200 : 100
            }}
            className="text-center px-8 relative z-10"
          >
            {/* 🔥 강렬한 대사용 배경 글로우 */}
            {OPENING_LINES[currentLine].intense && (
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full"
              />
            )}

            <p className={`
              ${OPENING_LINES[currentLine].color}
              ${OPENING_LINES[currentLine].intense ? 'text-3xl sm:text-4xl md:text-6xl font-black' : 'text-2xl sm:text-3xl md:text-4xl'}
              font-serif tracking-wide leading-relaxed relative
              ${OPENING_LINES[currentLine].intense ? 'drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]' : ''}
            `}>
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className={`inline-block w-2 h-8 sm:h-10 md:h-12 ${
                    OPENING_LINES[currentLine].intense ? 'bg-red-500 h-14 md:h-20' : 'bg-white'
                  } ml-1 align-middle`}
                />
              )}
            </p>
            
            {/* 🎬 줄 아래 강조선 (강렬한 대사) */}
            {OPENING_LINES[currentLine].intense && !isTyping && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mt-6 origin-center"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 클릭 안내 - 첫 번째 대사 이후부터 표시 */}
      {!isTyping && currentLine > 0 && currentLine < OPENING_LINES.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <p className="text-slate-500 text-sm tracking-wider uppercase">
            Click to Continue
          </p>
        </motion.div>
      )}

      {/* 마지막 대사 후 시작 안내 */}
      {!isTyping && currentLine === OPENING_LINES.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.p
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-amber-500 tracking-wider uppercase font-bold"
          >
            Click to Begin Investigation
          </motion.p>
        </motion.div>
      )}

      {/* 🎬 스캔라인 효과 (옵션) */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-[2px] animate-scan" />
      </div>
    </div>
  );
}