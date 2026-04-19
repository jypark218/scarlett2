import { useState } from 'react';
import { Network, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface RelationshipMapProps {
  unlockedCharacters: string[];
}

export function RelationshipMap({ unlockedCharacters }: RelationshipMapProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isCountUnlocked = unlockedCharacters.includes('count');
  const isHopeUnlocked = unlockedCharacters.includes('hope');
  const isLucyUnlocked = unlockedCharacters.includes('lucy');
  const isStangersonUnlocked = unlockedCharacters.includes('stangerson');
  const isDrebberUnlocked = unlockedCharacters.includes('drebber');

  return (
    <>
      {/* Relationship Map Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
      >
        <Network className="size-4 mr-2" />
        사건 관계도
      </Button>

      {/* Relationship Map Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm safe-area-inset">
          <div className="w-full flex items-center justify-center p-4 py-safe-top pb-safe-bottom">
            <Card className="bg-slate-800 border-slate-700 p-4 sm:p-6 w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Network className="size-5 sm:size-6 text-red-500" />
                  <div>
                    <h2 className="text-slate-100">사건 관계도</h2>
                    <p className="text-slate-400 text-sm">
                      피해자와 용의자들의 관계
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

              {/* Relationship Diagram */}
              <div className="space-y-6">
                {/* Central Victim */}
                <div className="flex justify-center">
                  <div className={`p-4 rounded-lg border-2 ${
                    isCountUnlocked 
                      ? 'border-red-600 bg-red-900/20' 
                      : 'border-slate-700 bg-slate-900/30'
                  }`}>
                    <Badge className="bg-red-600 mb-2">피해자</Badge>
                    <div className="text-center">
                      <p className={isCountUnlocked ? 'text-red-400' : 'text-slate-500'}>
                        {isCountUnlocked ? '모로 백작' : '???'}
                      </p>
                      {isCountUnlocked && (
                        <p className="text-slate-400 text-xs mt-1">저택 주인, 실종</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Relationship Lines */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Suspect 1 - Hope */}
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg border-2 ${
                      isHopeUnlocked 
                        ? 'border-orange-600 bg-orange-900/20' 
                        : 'border-slate-700 bg-slate-900/30'
                    }`}>
                      <Badge className="bg-orange-600 mb-2 text-xs">용의자</Badge>
                      <p className={`text-sm mb-1 ${isHopeUnlocked ? 'text-orange-400' : 'text-slate-500'}`}>
                        {isHopeUnlocked ? '제퍼슨 호프' : '???'}
                      </p>
                      {isHopeUnlocked && (
                        <>
                          <p className="text-slate-400 text-xs mb-2">마차꾼</p>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="text-red-500">↑</span>
                            <span>백작을 자주 방문</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Lucy */}
                    {isLucyUnlocked && (
                      <div className="p-3 rounded-lg border-2 border-pink-600 bg-pink-900/20">
                        <Badge className="bg-pink-600 mb-2 text-xs">???</Badge>
                        <p className="text-sm mb-1 text-pink-400">루시 루이자</p>
                        <p className="text-slate-400 text-xs mb-2">과거 인물</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <span className="text-red-500">?</span>
                          <span>관계 조사 필요</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Suspect 2 - Stangerson */}
                  <div className={`p-3 rounded-lg border-2 ${
                    isStangersonUnlocked 
                      ? 'border-green-600 bg-green-900/20' 
                      : 'border-slate-700 bg-slate-900/30'
                  }`}>
                    <Badge className="bg-green-600 mb-2 text-xs">용의자</Badge>
                    <p className={`text-sm mb-1 ${isStangersonUnlocked ? 'text-green-400' : 'text-slate-500'}`}>
                      {isStangersonUnlocked ? '조셉 스탠거슨' : '???'}
                    </p>
                    {isStangersonUnlocked && (
                      <>
                        <p className="text-slate-400 text-xs mb-2">집사</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="text-purple-500">🤐</span>
                            <span>불안한 태도</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="text-yellow-500">↑</span>
                            <span>백작의 오랜 부하</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Suspect 3 - Drebber */}
                  <div className={`p-3 rounded-lg border-2 ${
                    isDrebberUnlocked 
                      ? 'border-cyan-600 bg-cyan-900/20' 
                      : 'border-slate-700 bg-slate-900/30'
                  }`}>
                    <Badge className="bg-cyan-600 mb-2 text-xs">용의자</Badge>
                    <p className={`text-sm mb-1 ${isDrebberUnlocked ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {isDrebberUnlocked ? '이노크 드레버' : '???'}
                    </p>
                    {isDrebberUnlocked && (
                      <>
                        <p className="text-slate-400 text-xs mb-2">사업가</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="text-purple-500">🏦</span>
                            <span>과거 사업 파트너</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="text-red-500">💸</span>
                            <span>금전 문제</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Key Evidence */}
                <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/30">
                  <h4 className="text-slate-300 text-sm mb-3 flex items-center gap-2">
                    <span>🔍</span>
                    <span>발견한 단서들</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-400">
                      <span>•</span>
                      <span>벽에 쓰인 RACHE</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-400">
                      <span>•</span>
                      <span>군화 발자국 흔적</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-400">
                      <span>•</span>
                      <span>백작의 일기장</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-400">
                      <span>•</span>
                      <span>누군가의 편지</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-400">
                      <span>•</span>
                      <span>L.L 이니셜 반지</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-400">
                      <span>•</span>
                      <span>지하실 열쇠</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/30">
                  <h4 className="text-slate-300 text-sm mb-3 flex items-center gap-2">
                    <span>📅</span>
                    <span>연표</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-3 text-slate-400">
                      <span className="text-slate-500">1861년</span>
                      <span>???</span>
                    </div>
                    <div className="flex items-start gap-3 text-slate-400">
                      <span className="text-slate-500">1871년</span>
                      <span>백작이 영국으로 이주</span>
                    </div>
                    <div className="flex items-start gap-3 text-slate-400">
                      <span className="text-slate-500">1881년</span>
                      <span>백작 실종 사건 발생</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
