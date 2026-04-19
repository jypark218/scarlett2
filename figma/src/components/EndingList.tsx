import { useState } from 'react';
import { Trophy, Lock, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { endingList, EndingInfo } from '../data/endingData';

interface EndingListProps {
  unlockedEndings: string[];
}

export function EndingList({ unlockedEndings }: EndingListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEnding, setSelectedEnding] = useState<EndingInfo | null>(null);

  const goodEndings = endingList.filter(e => e.type === 'good');
  const badEndings = endingList.filter(e => e.type === 'bad');
  const neutralEndings = endingList.filter(e => e.type === 'neutral');
  const unlockedCount = unlockedEndings.length;
  const totalCount = endingList.length;

  const handleEndingClick = (ending: EndingInfo) => {
    if (unlockedEndings.includes(ending.id)) {
      setSelectedEnding(ending);
    }
  };

  return (
    <>
      {/* Ending List Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
      >
        <Trophy className="size-4 mr-2" />
        엔딩 목록 ({unlockedCount}/{totalCount})
      </Button>

      {/* Ending List Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm safe-area-inset">
          <div className="w-full flex items-center justify-center p-4 py-safe-top pb-safe-bottom">
            <Card className="bg-slate-800 border-slate-700 p-4 sm:p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Trophy className="size-5 sm:size-6 text-yellow-500" />
                  <div>
                    <h2 className="text-slate-100">엔딩 목록</h2>
                    <p className="text-slate-400 text-sm">
                      {unlockedCount}개 / {totalCount}개 달성
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-100"
                >
                  <X className="size-5" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4 sm:mb-6">
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-500"
                    style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>

              {/* Good Endings */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-green-600 hover:bg-green-700">해피 엔딩</Badge>
                  <span className="text-slate-400 text-sm">
                    {goodEndings.filter(e => unlockedEndings.includes(e.id)).length}/{goodEndings.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goodEndings.map((ending) => {
                    const isUnlocked = unlockedEndings.includes(ending.id);
                    return (
                      <button
                        key={ending.id}
                        onClick={() => handleEndingClick(ending)}
                        disabled={!isUnlocked}
                        className={`
                          p-4 rounded-lg border-2 text-left transition-all duration-200
                          ${isUnlocked
                            ? 'border-green-600 bg-green-900/20 hover:bg-green-900/30 cursor-pointer'
                            : 'border-slate-800 bg-slate-900/30 cursor-not-allowed'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {isUnlocked ? (
                              <Trophy className="size-5 text-green-500" />
                            ) : (
                              <Lock className="size-5 text-slate-700" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded ${isUnlocked ? 'bg-green-700 text-green-100' : 'bg-slate-800 text-slate-700'}`}>
                                #{ending.number}
                              </span>
                              <h3 className={isUnlocked ? 'text-slate-100' : 'text-slate-700'}>
                                {isUnlocked ? ending.title : '???'}
                              </h3>
                            </div>
                            {isUnlocked && (
                              <p className="text-slate-400 text-sm">
                                클릭하여 자세히 보기
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bad Endings */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-red-600 hover:bg-red-700">배드 엔딩</Badge>
                  <span className="text-slate-400 text-sm">
                    {badEndings.filter(e => unlockedEndings.includes(e.id)).length}/{badEndings.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {badEndings.map((ending) => {
                    const isUnlocked = unlockedEndings.includes(ending.id);
                    return (
                      <button
                        key={ending.id}
                        onClick={() => handleEndingClick(ending)}
                        disabled={!isUnlocked}
                        className={`
                          p-4 rounded-lg border-2 text-left transition-all duration-200
                          ${isUnlocked
                            ? 'border-red-600 bg-red-900/20 hover:bg-red-900/30 cursor-pointer'
                            : 'border-slate-800 bg-slate-900/30 cursor-not-allowed'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {isUnlocked ? (
                              <Trophy className="size-5 text-red-500" />
                            ) : (
                              <Lock className="size-5 text-slate-700" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded ${isUnlocked ? 'bg-red-700 text-red-100' : 'bg-slate-800 text-slate-700'}`}>
                                #{ending.number}
                              </span>
                              <h3 className={isUnlocked ? 'text-slate-100' : 'text-slate-700'}>
                                {isUnlocked ? ending.title : '???'}
                              </h3>
                            </div>
                            {isUnlocked && (
                              <p className="text-slate-400 text-sm">
                                클릭하여 자세히 보기
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Neutral Endings */}
              {neutralEndings.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-slate-600 hover:bg-slate-700">??? 엔딩</Badge>
                    <span className="text-slate-400 text-sm">
                      {neutralEndings.filter(e => unlockedEndings.includes(e.id)).length}/{neutralEndings.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {neutralEndings.map((ending) => {
                      const isUnlocked = unlockedEndings.includes(ending.id);
                      return (
                        <button
                          key={ending.id}
                          onClick={() => handleEndingClick(ending)}
                          disabled={!isUnlocked}
                          className={`
                            p-4 rounded-lg border-2 text-left transition-all duration-200
                            ${isUnlocked
                              ? 'border-slate-600 bg-slate-900/40 hover:bg-slate-900/60 cursor-pointer'
                              : 'border-slate-800 bg-slate-900/30 cursor-not-allowed'
                            }
                          `}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {isUnlocked ? (
                                <Trophy className="size-5 text-slate-400" />
                              ) : (
                                <Lock className="size-5 text-slate-700" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs px-2 py-0.5 rounded ${isUnlocked ? 'bg-slate-700 text-slate-200' : 'bg-slate-800 text-slate-700'}`}>
                                  #{ending.number}
                                </span>
                                <h3 className={isUnlocked ? 'text-slate-100' : 'text-slate-700'}>
                                  {isUnlocked ? ending.title : '???'}
                                </h3>
                              </div>
                              {isUnlocked && (
                                <p className="text-slate-400 text-sm">
                                  클릭하여 자세히 보기
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Ending Detail Popup */}
      {selectedEnding && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm safe-area-inset"
          onClick={() => setSelectedEnding(null)}
        >
          <div className="w-full flex items-center justify-center p-4 py-safe-top pb-safe-bottom">
            <Card 
              className="bg-slate-800 border-slate-700 p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Trophy className={`size-6 ${
                    selectedEnding.type === 'good' ? 'text-green-500' : 
                    selectedEnding.type === 'bad' ? 'text-red-500' : 
                    'text-slate-400'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        selectedEnding.type === 'good' ? 'bg-green-700 text-green-100' : 
                        selectedEnding.type === 'bad' ? 'bg-red-700 text-red-100' : 
                        'bg-slate-700 text-slate-200'
                      }`}>
                        #{selectedEnding.number}
                      </span>
                      <h3 className="text-slate-100">
                        {selectedEnding.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedEnding(null)}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-100"
                >
                  <X className="size-5" />
                </Button>
              </div>
              
              <div className="mb-4">
                <Badge className={
                  selectedEnding.type === 'good' ? 'bg-green-600' : 
                  selectedEnding.type === 'bad' ? 'bg-red-600' : 
                  'bg-slate-600'
                }>
                  {selectedEnding.type === 'good' ? '해피 엔딩' : 
                   selectedEnding.type === 'bad' ? '배드 엔딩' : 
                   '??? 엔딩'}
                </Badge>
              </div>

              <p className="text-slate-300 leading-relaxed">
                {selectedEnding.summary}
              </p>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}