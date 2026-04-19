// 캐릭터 도감 메인 모달
import { Users, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CharacterInfo } from '../../data/characterInfoData';
import { CharacterCard } from './CharacterCard';

interface CharacterGalleryModalProps {
  characters: CharacterInfo[];
  unlockedCharacters: string[];
  onClose: () => void;
  onCharacterClick: (character: CharacterInfo) => void;
  directUnlockedCharacters?: string[]; // 직접 대면한 캐릭터
}

export function CharacterGalleryModal({
  characters,
  unlockedCharacters,
  onClose,
  onCharacterClick,
  directUnlockedCharacters = []
}: CharacterGalleryModalProps) {
  const unlockedCount = unlockedCharacters.length;
  const totalCount = characters.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm safe-area-inset">
      <div className="w-full flex items-center justify-center p-4 py-safe-top pb-safe-bottom">
        <Card className="bg-slate-800 border-slate-700 p-4 sm:p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="size-5 sm:size-6 text-blue-500" />
              <div>
                <h2 className="text-slate-100">인물 도감</h2>
                <p className="text-slate-400 text-sm">
                  {unlockedCount}명 / {totalCount}명 만남
                </p>
              </div>
            </div>
            <Button
              onClick={onClose}
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
                className="h-full bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-500"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>

          {/* Character Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {characters.map((character) => {
              const isUnlocked = unlockedCharacters.includes(character.id);
              const isDirect = directUnlockedCharacters.includes(character.id);
              const unlockedBy = isUnlocked ? (isDirect ? 'direct' : 'item') : undefined;
              
              return (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isUnlocked={isUnlocked}
                  unlockedBy={unlockedBy as 'direct' | 'item' | undefined}
                  onClick={() => isUnlocked && onCharacterClick(character)}
                />
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}