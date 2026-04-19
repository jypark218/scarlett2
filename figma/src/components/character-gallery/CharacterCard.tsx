// 캐릭터 카드 컴포넌트
import { Lock, User, Package } from 'lucide-react';
import { CharacterInfo } from '../../data/characterInfoData';
import { Badge } from '../ui/badge';

interface CharacterCardProps {
  character: CharacterInfo;
  isUnlocked: boolean;
  onClick: () => void;
  unlockedBy?: 'direct' | 'item'; // 어떻게 언락되었는지
}

export function CharacterCard({ character, isUnlocked, onClick, unlockedBy }: CharacterCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}
      className={`
        p-4 rounded-lg border-2 text-left transition-all duration-200
        ${isUnlocked
          ? 'border-blue-600 bg-blue-900/20 hover:bg-blue-900/30 cursor-pointer'
          : 'border-slate-800 bg-slate-900/30 cursor-not-allowed'
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Portrait */}
        <div className="flex-shrink-0">
          {isUnlocked ? (
            <div className="relative">
              <img
                src={character.portraitUrl}
                alt={character.name}
                className="size-16 rounded-lg object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 size-6 rounded-full ${character.nameColor.replace('text-', 'bg-')} border-2 border-slate-800`} />
              
              {/* Unlock method indicator */}
              {unlockedBy === 'item' && (
                <div className="absolute -top-1 -left-1 size-5 rounded-full bg-amber-500 border-2 border-slate-800 flex items-center justify-center">
                  <Package className="size-3 text-slate-900" />
                </div>
              )}
            </div>
          ) : (
            <div className="size-16 rounded-lg bg-slate-800 flex items-center justify-center">
              <Lock className="size-6 text-slate-700" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`${isUnlocked ? character.nameColor : 'text-slate-700'}`}>
              {isUnlocked ? character.name : '???'}
            </h3>
          </div>
          <p className={`text-sm mb-2 ${isUnlocked ? 'text-slate-400' : 'text-slate-700'}`}>
            {isUnlocked ? character.role : '잠김'}
          </p>
          {isUnlocked && (
            <div className="flex items-center gap-2">
              <p className="text-slate-500 text-xs">
                클릭하여 자세히 보기
              </p>
              {unlockedBy === 'item' && (
                <Badge className="bg-amber-600/80 text-xs px-1.5 py-0">
                  단서 획득
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
