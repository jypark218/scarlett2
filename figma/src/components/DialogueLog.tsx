import { useState } from 'react';
import { ScrollText, X, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { characters, DialogueLine } from '../data/characterData';
import { getLocationName } from '../data/backgroundData';

interface DialogueLogProps {
  history: DialogueLine[];
  iconOnly?: boolean; // 아이콘만 표시할지 여부
}

export function DialogueLog({ history, iconOnly = false }: DialogueLogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null); // ✅ 선택된 장소 필터

  // ✅ 로그에서 등장한 모든 장소 추출
  const locations = Array.from(new Set(history.map(line => line.location).filter(Boolean))) as string[];

  // ✅ 필터링된 로그
  const filteredHistory = selectedLocation 
    ? history.filter(line => line.location === selectedLocation)
    : history;

  return (
    <>
      {/* Log Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100 px-2 sm:px-3"
      >
        <ScrollText className={`size-3 sm:size-4 ${iconOnly ? '' : 'sm:mr-2'}`} />
        {!iconOnly && <span className="hidden sm:inline">로그</span>}
      </Button>

      {/* Log Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <Card className="bg-slate-800 border-slate-700 w-full max-w-2xl max-h-[85vh] sm:max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <ScrollText className="size-4 sm:size-5 text-slate-400" />
                <h3 className="text-slate-100 text-sm sm:text-base">대화 로그</h3>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-slate-100"
              >
                <X className="size-4 sm:size-5" />
              </Button>
            </div>

            {/* Location Filter */}
            <div className="px-3 sm:px-4 py-2 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 sm:size-5 text-slate-400" />
                <select
                  value={selectedLocation || ''}
                  onChange={(e) => setSelectedLocation(e.target.value as string)}
                  className="bg-slate-800 text-slate-300 border-slate-700 focus:outline-none focus:border-slate-500"
                >
                  <option value="">전체</option>
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {getLocationName(location)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Log Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {filteredHistory.length === 0 ? (
                <p className="text-slate-500 text-center py-8 text-sm sm:text-base">
                  아직 대화 기록이 없습니다.
                </p>
              ) : (
                filteredHistory.map((line, index) => {
                  const character = characters[line.characterId] || characters.narrator;
                  // ✅ 내래이션 판별: isNarration 플래그 또는 characterId가 'narrator'
                  const isNarrator = line.isNarration || line.characterId === 'narrator';
                  
                  return (
                    <div 
                      key={index}
                      className={`${isNarrator ? 'opacity-70' : ''}`}
                    >
                      {!isNarrator && (
                        <div className={`${character.nameColor} text-xs sm:text-sm mb-1`}>
                          {character.name}
                        </div>
                      )}
                      <div className={`text-slate-300 text-xs sm:text-sm ${isNarrator ? 'italic' : ''}`}>
                        {line.text}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  );
}