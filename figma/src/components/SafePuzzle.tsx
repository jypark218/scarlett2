import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Lock, Unlock } from 'lucide-react';

interface SafePuzzleProps {
  hasHint: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export function SafePuzzle({ hasHint, onSuccess, onCancel }: SafePuzzleProps) {
  const [combination, setCombination] = useState<number[]>([0, 0, 0, 0]);
  const correctCombination = [1, 8, 6, 1];
  const isUnlocked = JSON.stringify(combination) === JSON.stringify(correctCombination);

  // 디버깅용 로그
  useEffect(() => {
    // console.log('SafePuzzle hasHint:', hasHint);
  }, [hasHint]);

  const rotateDial = (index: number, direction: 'up' | 'down') => {
    setCombination(prev => {
      const newComb = [...prev];
      if (direction === 'up') {
        newComb[index] = (newComb[index] + 1) % 10;
      } else {
        newComb[index] = (newComb[index] - 1 + 10) % 10;
      }
      return newComb;
    });
  };

  const checkCombination = () => {
    if (isUnlocked) {
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  };

  useEffect(() => {
    checkCombination();
  }, [combination]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 shadow-2xl border border-zinc-700">
        {/* 금고 이미지 */}
        <div className="mb-6 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-amber-900 to-amber-950 flex items-center justify-center shadow-inner border-4 border-amber-800">
            {isUnlocked ? (
              <Unlock className="w-10 h-10 text-amber-500" />
            ) : (
              <Lock className="w-10 h-10 text-amber-700" />
            )}
          </div>
          <h2 className="mt-4 text-zinc-100">백작의 금고</h2>
          <p className="mt-2 text-sm text-zinc-400">
            {hasHint 
              ? '4자리 숫자 조합을 맞춰야 합니다.'
              : '4자리 숫자 조합을 맞춰야 합니다. 힌트가 필요할 것 같습니다...'}
          </p>
        </div>

        {/* 룰렛 다이얼 */}
        <div className="mb-6">
          <div className="flex justify-center gap-4">
            {combination.map((digit, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => rotateDial(index, 'up')}
                  className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-colors flex items-center justify-center text-zinc-400 hover:text-zinc-200"
                  disabled={!hasHint}
                >
                  <span className="text-xl">▲</span>
                </button>
                
                <div className="my-2 w-16 h-20 rounded-lg bg-gradient-to-b from-zinc-900 to-black border-2 border-amber-900 flex items-center justify-center shadow-inner">
                  <span className={`text-4xl font-mono transition-colors ${
                    isUnlocked ? 'text-green-500' : 'text-amber-700'
                  }`}>
                    {digit}
                  </span>
                </div>
                
                <button
                  onClick={() => rotateDial(index, 'down')}
                  className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-colors flex items-center justify-center text-zinc-400 hover:text-zinc-200"
                  disabled={!hasHint}
                >
                  <span className="text-xl">▼</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 상태 메시지 */}
        {isUnlocked && (
          <div className="mb-4 p-3 rounded-lg bg-green-900/30 border border-green-700">
            <p className="text-center text-green-400">
              ✓ 금고가 열렸습니다!
            </p>
          </div>
        )}

        {!hasHint && (
          <div className="mb-4 p-3 rounded-lg bg-amber-900/30 border border-amber-700">
            <p className="text-center text-amber-400 text-sm">
              암호를 풀기 위한 힌트를 먼저 찾아야 합니다.
            </p>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
            disabled={isUnlocked}
          >
            나중에
          </Button>
          {hasHint && !isUnlocked && (
            <Button
              onClick={checkCombination}
              className="flex-1 bg-amber-900 hover:bg-amber-800 text-amber-100"
            >
              확인
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}