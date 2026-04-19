import { useState, useEffect } from 'react';
import { Cloud, Moon, Sparkles } from 'lucide-react';

interface RecurringDreamSequenceProps {
  playCount: number;
  onFinish: () => void;
}

export function RecurringDreamSequence({ playCount, onFinish }: RecurringDreamSequenceProps) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => {
      onFinish();
    }, 6000); // 6초 후 자동으로 넘어감

    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);

  // 플레이 횟수에 따른 대사 변화
  const getDreamText = () => {
    if (playCount === 2) {
      return {
        title: '이상한 꿈',
        lines: [
          '어젯밤, 이상한 꿈을 꿨다.',
          '',
          '런던의 음산한 저택...',
          '제퍼슨 호프라는 남자...',
          '그리고... 누군가의 죽음.',
          '',
          '너무나 생생했다. 마치 실제로 경험한 것처럼...',
          '',
          '하지만 그저 꿈일 뿐이겠지.'
        ]
      };
    } else if (playCount === 3) {
      return {
        title: '반복되는 악몽',
        lines: [
          '또 그 꿈을 꿨다.',
          '',
          '저택... 호프... 백작...',
          '매번 다른 결말을 보지만...',
          '',
          '왜 계속 같은 장소로 돌아가는 걸까?',
          '',
          '이건 단순한 꿈이 아닌 것 같다.',
          '무언가... 놓친 게 있는 건 아닐까?'
        ]
      };
    } else if (playCount === 4) {
      return {
        title: '기시감',
        lines: [
          '셜 수 없는 기시감이 든다.',
          '',
          '마치 이미 여러 번 경험한 것 같은...',
          '하지만 기억은 흐릿하다.',
          '',
          '호프의 눈물... 백작의 비명... 홈즈의 목소리...',
          '',
          '이번에는... 다른 선택을 할 수 있을까?',
          '진실에 더 가까이 갈 수 있을까?'
        ]
      };
    } else if (playCount >= 5) {
      return {
        title: '시간의 굴레',
        lines: [
          '나는 이 이야기를 알고 있다.',
          '',
          '여러 번... 아니, 수없이 많이...',
          '같은 밤, 같은 저택, 같은 사람들.',
          '',
          '하지만 매번 다른 진실이 펼쳐진다.',
          '',
          '호프, 스탠거슨, 드레버...',
          '누가 진범인가는 중요하지 않다.',
          '',
          '중요한 건...',
          '이번에야말로 모두를 구할 수 있을까?'
        ]
      };
    }

    return null;
  };

  const dreamData = getDreamText();

  if (!dreamData) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 noir-gradient flex items-center justify-center transition-opacity duration-1000 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 꿈같은 배경 효과 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        
        {/* 떠다니는 파티클 */}
        <Sparkles className="absolute top-1/3 left-1/4 size-6 text-amber-400/30 animate-float-slow" />
        <Cloud className="absolute top-1/2 right-1/3 size-8 text-neutral-400/20 animate-float delay-500" />
        <Moon className="absolute top-1/4 right-1/4 size-10 text-amber-300/20 animate-pulse-glow" />
      </div>

      {/* 텍스트 컨텐츠 */}
      <div className="relative z-10 max-w-2xl px-6 text-center space-y-6 animate-fade-in">
        {/* 타이틀 */}
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-400/80 tracking-wider animate-flicker">
          {dreamData.title}
        </h2>

        {/* 대사들 */}
        <div className="space-y-3 text-lg sm:text-xl text-neutral-300 leading-relaxed font-light">
          {dreamData.lines.map((line, index) => (
            <p
              key={index}
              className="animate-fade-in-delay opacity-0"
              style={{
                animationDelay: `${index * 0.4}s`,
                animationFillMode: 'forwards'
              }}
            >
              {line || '\u00A0'}
            </p>
          ))}
        </div>

        {/* 스킵 안내 */}
        <p className="text-sm text-neutral-500 mt-8 animate-pulse">
          잠시 후 자동으로 계속됩니다...
        </p>
      </div>
    </div>
  );
}