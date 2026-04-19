// 캐릭터 상세 정보 모달
import { Lock, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CharacterInfo } from '../../data/characterInfoData';

interface CharacterDetailModalProps {
  character: CharacterInfo;
  unlockedCharacters: string[];
  onClose: () => void;
}

export function CharacterDetailModal({ 
  character, 
  unlockedCharacters, 
  onClose 
}: CharacterDetailModalProps) {
  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm safe-area-inset"
      onClick={onClose}
    >
      <div className="w-full flex items-center justify-center p-4 py-safe-top pb-safe-bottom">
        <Card 
          className="bg-slate-800 border-slate-700 p-6 w-full max-w-md max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <img
                src={character.portraitUrl}
                alt={character.name}
                className="size-20 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className={`mb-1 ${character.nameColor}`}>
                  {character.name}
                </h3>
                <Badge className="bg-blue-600">
                  {character.role}
                </Badge>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-slate-100 flex-shrink-0"
            >
              <X className="size-5" />
            </Button>
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <h4 className="text-slate-300 text-sm mb-2">소개</h4>
            <p className="text-slate-400 leading-relaxed text-sm">
              {character.description}
            </p>
          </div>

          {/* Traits */}
          <div>
            <h4 className="text-slate-300 text-sm mb-2">특징</h4>
            <div className="flex flex-wrap gap-2">
              {character.traits.map((trait, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="border-slate-600 text-slate-300"
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          {/* Relationships */}
          {character.relationships && character.relationships.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <h4 className="text-slate-300 text-sm mb-3">인물 관계</h4>
              <div className="space-y-3">
                {character.relationships.map((rel, index) => {
                  const isUnlocked = unlockedCharacters.includes(rel.characterId);
                  return (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-2 rounded-lg ${
                        isUnlocked ? 'bg-slate-700/50' : 'bg-slate-700/20'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {isUnlocked ? (
                            <span className="text-slate-200 text-sm">
                              {rel.characterName}
                            </span>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Lock className="size-3 text-slate-500" />
                              <span className="text-slate-500 text-sm">???</span>
                            </div>
                          )}
                          <Badge 
                            variant="outline" 
                            className="border-slate-600 text-slate-400 text-xs"
                          >
                            {rel.relation}
                          </Badge>
                        </div>
                        {isUnlocked && (
                          <p className="text-slate-400 text-xs leading-relaxed">
                            {rel.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
