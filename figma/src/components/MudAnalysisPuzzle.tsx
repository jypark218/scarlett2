import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle, Microscope, Droplet, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MudSample {
  id: string;
  name: string;
  color: string;
  moisture: string;
  texture: string;
  location: string;
}

interface MudAnalysisPuzzleProps {
  onComplete: () => void;
  onCancel: () => void;
}

const mudSamples: MudSample[] = [
  {
    id: 'kitchen',
    name: '부엌 진흙',
    color: '검은빛이 도는 갈색',
    moisture: '매우 높음 (85%)',
    texture: '미세한 입자, 점토질',
    location: '부엌 양탄자 주변'
  },
  {
    id: 'well',
    name: '우물 진흙',
    color: '검은빛이 도는 갈색',
    moisture: '매우 높음 (85%)',
    texture: '미세한 입자, 점토질',
    location: '우물 둘레'
  },
  {
    id: 'inn',
    name: '드레버 구두 진흙',
    color: '검은빛이 도는 갈색',
    moisture: '매우 높음 (83%)',
    texture: '미세한 입자, 점토질',
    location: '여관 7번 방'
  }
];

export function MudAnalysisPuzzle({ onComplete, onCancel }: MudAnalysisPuzzleProps) {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [comparedSamples, setComparedSamples] = useState<Set<string>>(new Set());
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelectSample = (sampleId: string) => {
    setSelectedSample(sampleId);
  };

  const handleCompareSamples = () => {
    if (!selectedSample) return;

    const newCompared = new Set(comparedSamples);
    newCompared.add(selectedSample);
    setComparedSamples(newCompared);

    // 분석 결과 추가
    const newAnalysis = [...analysis];
    
    if (selectedSample === 'kitchen') {
      newAnalysis.push('부엌 진흙: 지하 수맥 근처 특성. 미네랄 함량 높음.');
    } else if (selectedSample === 'well') {
      newAnalysis.push('우물 진흙: 부엌 샘플과 색상, 습도, 입자 크기 일치!');
    } else if (selectedSample === 'inn') {
      newAnalysis.push('드레버 구두 진흙: 부엌/우물 샘플과 완벽히 일치! 동일 출처 확정!');
    }

    setAnalysis(newAnalysis);

    // 모든 샘플 분석 완료
    if (newCompared.size === 3) {
      setIsComplete(true);
    }
  };

  const getMatchingAttributes = (sample: MudSample) => {
    const matches = [];
    const reference = mudSamples[0]; // 부엌 진흙을 기준으로

    if (sample.color === reference.color) {
      matches.push('color');
    }
    if (sample.moisture.includes('매우 높음')) {
      matches.push('moisture');
    }
    if (sample.texture === reference.texture) {
      matches.push('texture');
    }

    return matches;
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-b from-amber-50 to-stone-100 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-amber-900"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-amber-50 p-6 border-b-4 border-amber-950">
          <div className="flex items-center gap-3 mb-2">
            <Microscope className="size-8" />
            <h2 className="text-2xl">진흙 샘플 분석</h2>
          </div>
          <p className="text-amber-100 text-sm">
            각 샘플을 선택하여 특성을 분석하세요. 일치하는 특성을 찾아내야 합니다.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Sample Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mudSamples.map((sample) => {
              const matches = getMatchingAttributes(sample);
              const isAnalyzed = comparedSamples.has(sample.id);
              const isSelected = selectedSample === sample.id;
              const matchPercentage = Math.round((matches.length / 3) * 100);

              return (
                <motion.div
                  key={sample.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50 shadow-lg'
                        : isAnalyzed
                        ? 'border-green-500 bg-green-50'
                        : 'border-stone-300 bg-white hover:border-amber-400'
                    }`}
                    onClick={() => handleSelectSample(sample.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-stone-800">{sample.name}</h3>
                      {isAnalyzed && (
                        <CheckCircle2 className="size-5 text-green-600" />
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-stone-600">
                      <div className="flex items-center gap-2">
                        <div
                          className="size-4 rounded-full border border-stone-400"
                          style={{
                            background: 'linear-gradient(135deg, #4a3520 0%, #6b5640 50%, #3d2b1f 100%)'
                          }}
                        />
                        <span className="text-xs">{sample.color}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Droplet className="size-4 text-blue-600" />
                        <span className="text-xs">{sample.moisture}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Layers className="size-4 text-amber-700" />
                        <span className="text-xs">{sample.texture}</span>
                      </div>

                      <div className="text-xs text-stone-500 mt-2">
                        📍 {sample.location}
                      </div>
                    </div>

                    {isAnalyzed && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 pt-3 border-t border-stone-200"
                      >
                        <Badge variant={matchPercentage >= 90 ? 'default' : 'secondary'}>
                          기준 샘플과 {matchPercentage}% 일치
                        </Badge>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Compare Button */}
          {selectedSample && !comparedSamples.has(selectedSample) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <Button
                onClick={handleCompareSamples}
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3"
              >
                <Microscope className="size-4 mr-2" />
                선택한 샘플 분석하기
              </Button>
            </motion.div>
          )}

          {/* Analysis Results */}
          <AnimatePresence>
            {analysis.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-stone-800 text-amber-100 p-6 rounded-lg border-2 border-amber-700"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Microscope className="size-5" />
                  홈즈의 분석 결과
                </h3>
                <div className="space-y-3">
                  {analysis.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="size-4 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-sm">{result}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conclusion */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-600"
            >
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="size-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-green-900 text-lg mb-2">분석 완료!</h3>
                  <p className="text-green-800 text-sm mb-3">
                    세 샘플의 특성이 완벽하게 일치합니다. 이는 모두 동일한 출처에서 온 진흙임을 의미합니다.
                  </p>
                  <div className="bg-white/80 p-4 rounded border border-green-300">
                    <p className="text-sm text-stone-700 italic">
                      <strong className="text-green-900">[홈즈]:</strong> "의심의 여지가 없어, 왓슨. 드레버는 여관에서 나와 저택으로 왔고, 우물을 통해 지하실에 접근한 뒤 부엌을 거쳐 나갔어. 그의 알리바이는 완전히 무너졌네."
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={onComplete}
                className="w-full bg-green-700 hover:bg-green-800 text-white"
              >
                분석 완료 - 계속하기
              </Button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-300 flex justify-end gap-2">
          {!isComplete && (
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-stone-400 text-stone-700 hover:bg-stone-200"
            >
              나중에 분석하기
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}