// 인물 도감 메인 컴포넌트 (공용화)
import { useState } from 'react';
import { Users } from 'lucide-react';
import { Button } from './ui/button';
import { characterInfoList, CharacterInfo } from '../data/characterInfoData';
import { CharacterGalleryModal } from './character-gallery/CharacterGalleryModal';
import { CharacterDetailModal } from './character-gallery/CharacterDetailModal';

interface CharacterGalleryProps {
  unlockedCharacters: string[];
  // 커스터마이징 옵션
  characters?: CharacterInfo[];
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'ghost';
  buttonClassName?: string;
  directUnlockedCharacters?: string[]; // 직접 대면한 캐릭터 (아이템 구별용)
}

export function CharacterGallery({ 
  unlockedCharacters,
  characters = characterInfoList,
  buttonText,
  buttonVariant = 'outline',
  buttonClassName = 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100',
  directUnlockedCharacters = []
}: CharacterGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterInfo | null>(null);

  const unlockedCount = unlockedCharacters.length;
  const totalCount = characters.length;

  const handleCharacterClick = (character: CharacterInfo) => {
    if (unlockedCharacters.includes(character.id)) {
      setSelectedCharacter(character);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant={buttonVariant}
        className={buttonClassName}
      >
        <Users className="size-4 mr-2" />
        {buttonText || `인물 도감 (${unlockedCount}/${totalCount})`}
      </Button>

      {/* Gallery Modal */}
      {isOpen && (
        <CharacterGalleryModal
          characters={characters}
          unlockedCharacters={unlockedCharacters}
          directUnlockedCharacters={directUnlockedCharacters}
          onClose={() => setIsOpen(false)}
          onCharacterClick={handleCharacterClick}
        />
      )}

      {/* Detail Modal */}
      {selectedCharacter && (
        <CharacterDetailModal
          character={selectedCharacter}
          unlockedCharacters={unlockedCharacters}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </>
  );
}