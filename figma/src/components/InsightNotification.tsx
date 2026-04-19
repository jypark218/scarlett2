import { motion, AnimatePresence } from 'motion/react';
import { Insight } from '../types';
import { characterPortraits } from '../data/characterData';

interface InsightNotificationProps {
  insight: Insight | null;
  onClose: () => void;
}

export function InsightNotification({ insight, onClose }: InsightNotificationProps) {
  if (!insight) return null;

  const characterPortrait = characterPortraits[insight.character];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
      >
        <div className="relative">
          {/* 빛나는 효과 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-amber-400/20 blur-xl rounded-lg"
          />

          {/* 메인 카드 */}
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-600 rounded-lg shadow-2xl overflow-hidden">
            {/* 장식 테두리 */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />

            <div className="p-6">
              {/* 헤더 */}
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="text-4xl"
                >
                  {insight.icon}
                </motion.div>
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-amber-900 text-sm tracking-widest uppercase mb-1"
                  >
                    💭 새로운 통찰
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-amber-950"
                  >
                    {insight.name}
                  </motion.h3>
                </div>
                {characterPortrait && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-600 shadow-lg"
                  >
                    <img 
                      src={characterPortrait} 
                      alt={insight.character}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>

              {/* 설명 */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-amber-900/90 leading-relaxed"
              >
                {insight.description}
              </motion.p>

              {/* 진행 바 (자동 닫힘) */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: 'linear', delay: 1 }}
                onAnimationComplete={onClose}
                className="mt-4 h-1 bg-amber-600/30 origin-left"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 4, ease: 'linear' }}
                  className="h-full bg-amber-600 origin-left"
                />
              </motion.div>

              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-amber-900/50 hover:text-amber-900 transition-colors text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
