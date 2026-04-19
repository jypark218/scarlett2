import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CreditsProps {
  onComplete: () => void;
  endingType?: 'good' | 'bad' | 'true';
}

export function Credits({ onComplete, endingType = 'good' }: CreditsProps) {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // 3초 후 스킵 버튼 표시
    const timer = setTimeout(() => setShowSkip(true), 3000);
    
    // 크레딧 자동 완료 (60초)
    const autoComplete = setTimeout(() => {
      onComplete();
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoComplete);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80" />
      
      {/* 크레딧 내용 */}
      <motion.div
        initial={{ y: '100vh' }}
        animate={{ y: '-100vh' }}
        transition={{
          duration: 50,
          ease: 'linear'
        }}
        className="relative z-10 text-center px-8 max-w-2xl"
      >
        {/* 타이틀 */}
        <div className="mb-32">
          <h1 className="text-6xl mb-8 text-amber-100">
            {endingType === 'true' && '🌟 TRUE ENDING 🌟'}
            {endingType === 'good' && '✅ GOOD ENDING'}
            {endingType === 'bad' && '💀 BAD ENDING'}
          </h1>
          <h2 className="text-4xl text-amber-200">
            주홍색 연구
          </h2>
          <p className="text-2xl text-gray-400 mt-4">
            A Study in Scarlet × The Manor of Count Moro
          </p>
        </div>

        {/* 제작진 */}
        <div className="space-y-24 text-amber-100">
          <CreditSection title="Original Story">
            <CreditLine role="Based on" name="'A Study in Scarlet' by Sir Arthur Conan Doyle" />
            <CreditLine role="Inspired by" name="'The Manor of Count Moro' Visual Novel" />
          </CreditSection>

          <CreditSection title="Game Design">
            <CreditLine role="Story & Narrative Design" name="Claude AI & User Collaboration" />
            <CreditLine role="Interactive Mystery System" name="Visual Novel Framework" />
            <CreditLine role="Evidence & Deduction Mechanics" name="Ace Attorney Style" />
          </CreditSection>

          <CreditSection title="Characters">
            <CreditLine role="Sherlock Holmes" name="The Great Detective" />
            <CreditLine role="Dr. Watson" name="The Narrator & Player" />
            <CreditLine role="Jefferson Hope" name="The Avenger" />
            <CreditLine role="Count Moro" name="The Guilty" />
            <CreditLine role="Joseph Stangerson" name="The Accomplice" />
            <CreditLine role="Enoch Drebber" name="The Elder" />
            <CreditLine role="Ellen" name="The Countess" />
            <CreditLine role="Lucy Ferrier" name="The Lost Soul" />
          </CreditSection>

          <CreditSection title="Development">
            <CreditLine role="Programming" name="React + TypeScript" />
            <CreditLine role="Framework" name="Vite + Tailwind CSS" />
            <CreditLine role="Animation" name="Motion (Framer Motion)" />
            <CreditLine role="Audio System" name="Howler.js" />
          </CreditSection>

          <CreditSection title="Story Features">
            <CreditLine role="Multiple Routes" name="3 Suspect Paths" />
            <CreditLine role="Endings" name="1 True + 2 Good + 5 Bad" />
            <CreditLine role="Playthrough System" name="NG+ with new insights" />
            <CreditLine role="Evidence System" name="Item Collection & Deduction" />
            <CreditLine role="Interrogation" name="Phoenix Wright Style" />
          </CreditSection>

          <CreditSection title="Special Thanks">
            <CreditLine name="Sir Arthur Conan Doyle for creating Sherlock Holmes" />
            <CreditLine name="All visual novel creators who inspired this project" />
            <CreditLine name="The mystery game community" />
            <CreditLine name="Everyone who played and enjoyed this game" />
          </CreditSection>

          <div className="py-32">
            <p className="text-3xl text-amber-200 mb-8">
              "복수보다 용서를, 증오보다 이해를."
            </p>
            <p className="text-2xl text-gray-400">
              - 셜록 홈즈와 왓슨의 모험 中
            </p>
          </div>

          <div className="py-32">
            <h2 className="text-5xl text-amber-100 mb-8">
              THE END
            </h2>
            <p className="text-xl text-gray-400">
              Thank you for playing!
            </p>
          </div>
        </div>
      </motion.div>

      {/* 스킵 버튼 */}
      {showSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleSkip}
          className="fixed bottom-8 right-8 z-20 px-6 py-3 bg-amber-900/50 hover:bg-amber-800/70 text-amber-100 rounded-lg border border-amber-700/50 backdrop-blur-sm transition-colors"
        >
          크레딧 건너뛰기 (타이틀로)
        </motion.button>
      )}
    </div>
  );
}

function CreditSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-3xl mb-8 text-amber-300 border-b border-amber-700/30 pb-4">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function CreditLine({ role, name }: { role?: string; name: string }) {
  if (!role) {
    return <p className="text-xl text-gray-300">{name}</p>;
  }
  
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg text-gray-400">{role}</p>
      <p className="text-2xl text-amber-200">{name}</p>
    </div>
  );
}
