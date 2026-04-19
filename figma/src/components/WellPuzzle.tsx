import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface WellPuzzleProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function WellPuzzle({ onSuccess, onCancel }: WellPuzzleProps) {
  const [isSwinging, setIsSwinging] = useState(false);
  const [bucketPosition, setBucketPosition] = useState(0); // -100 to 100
  const [attempts, setAttempts] = useState(3);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const ringPosition = 0; // 반지는 중앙에 위치
  const successRange = 15; // 성공 범위 (±15)

  useEffect(() => {
    if (!isSwinging) return;

    const interval = setInterval(() => {
      setBucketPosition(prev => {
        // 진자 운동 시뮬레이션 (사인파)
        const time = Date.now() / 1000;
        return Math.sin(time * 2) * 100; // -100 ~ 100 사이를 왔다갔다
      });
    }, 16); // 60fps

    return () => clearInterval(interval);
  }, [isSwinging]);

  const startSwinging = () => {
    setIsSwinging(true);
    setMessage('타이밍을 맞춰 클릭하세요!');
  };

  const tryGrab = () => {
    if (!isSwinging) {
      startSwinging();
      return;
    }

    const distance = Math.abs(bucketPosition - ringPosition);
    
    if (distance <= successRange) {
      // 성공!
      setIsSuccess(true);
      setIsSwinging(false);
      setMessage('✓ 반지를 건져냈습니다!');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      // 실패
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      
      if (newAttempts <= 0) {
        setIsSwinging(false);
        setIsFailed(true);
        setMessage('❌ 실패했습니다. 다시 시도해보세요.');
      } else {
        setMessage(`아깝습니다! 남은 시도: ${newAttempts}회`);
      }
    }
  };

  const reset = () => {
    setAttempts(3);
    setIsSwinging(false);
    setMessage('');
    setIsFailed(false);
    setBucketPosition(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg rounded-lg bg-gradient-to-b from-stone-800 to-stone-900 p-6 shadow-2xl border border-stone-700">
        {/* 제목 */}
        <div className="mb-6 text-center">
          <h2 className="text-zinc-100 mb-2">우물의 반지</h2>
          <p className="text-sm text-zinc-400">
            두레박을 내려 반지를 건져야 합니다
          </p>
        </div>

        {/* 우물 영역 */}
        <div className="mb-6 relative bg-gradient-to-b from-stone-900 to-black rounded-lg border-4 border-stone-600 overflow-hidden">
          {/* 우물 안쪽 */}
          <div className="h-80 relative">
            {/* 배경 - 우물 벽 */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-700 via-stone-800 to-black opacity-40">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 22px)',
              }} />
            </div>

            {/* 밧줄 */}
            <div className="absolute left-1/2 top-0 w-1 bg-amber-900 h-full transform -translate-x-1/2" />

            {/* 두레박 */}
            <motion.div
              className="absolute top-8 w-20 h-16 transform -translate-x-1/2"
              style={{ left: '50%' }}
              animate={{
                x: isSwinging ? bucketPosition : 0,
              }}
              transition={{
                duration: 0,
              }}
            >
              {/* 두레박 본체 */}
              <div className="w-full h-full bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg border-2 border-amber-950 relative shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-2 bg-amber-950 rounded-t-lg" />
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-950 rounded-b-lg" />
                {/* 손잡이 */}
                <div className="absolute -top-2 left-1/2 w-1 h-2 bg-amber-950 transform -translate-x-1/2" />
              </div>
            </motion.div>

            {/* 반지 (중앙) */}
            <div 
              className="absolute bottom-16 left-1/2 w-8 h-8 transform -translate-x-1/2"
            >
              <motion.div
                className="w-full h-full rounded-full border-4 border-yellow-500 bg-yellow-400 shadow-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <div className="absolute inset-2 rounded-full bg-yellow-600" />
              </motion.div>
            </div>

            {/* 성공 범위 표시 (디버그용 - 투명하게) */}
            <div 
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 opacity-20"
              style={{
                width: `${successRange * 2}px`,
                height: '40px',
                backgroundColor: 'green',
              }}
            />
          </div>
        </div>

        {/* 상태 메시지 */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg border ${
            isSuccess 
              ? 'bg-green-900/30 border-green-700 text-green-400' 
              : isFailed
              ? 'bg-red-900/30 border-red-700 text-red-400'
              : 'bg-amber-900/30 border-amber-700 text-amber-400'
          }`}>
            <p className="text-center text-sm">
              {message}
            </p>
          </div>
        )}

        {/* 시도 횟수 */}
        <div className="mb-4 flex justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < attempts ? 'bg-amber-500' : 'bg-stone-700'
              }`}
            />
          ))}
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 bg-stone-800 border-stone-700 hover:bg-stone-700"
            disabled={isSuccess}
          >
            나중에
          </Button>
          
          {isFailed ? (
            <Button
              onClick={reset}
              className="flex-1 bg-amber-900 hover:bg-amber-800 text-amber-100"
            >
              다시 시도
            </Button>
          ) : (
            <Button
              onClick={tryGrab}
              className="flex-1 bg-amber-900 hover:bg-amber-800 text-amber-100"
              disabled={isSuccess}
            >
              {isSwinging ? '지금!' : '두레박 내리기'}
            </Button>
          )}
        </div>

        {/* 도움말 */}
        <div className="mt-4 p-3 rounded-lg bg-stone-800/50 border border-stone-700">
          <p className="text-xs text-stone-400 text-center">
            💡 두레박이 반지 위를 지날 때 "지금!" 버튼을 누르세요
          </p>
        </div>
      </div>
    </div>
  );
}
