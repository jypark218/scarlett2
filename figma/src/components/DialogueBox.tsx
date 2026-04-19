import { useState, useEffect, useRef, useMemo } from 'react';
import { Card } from './ui/card';
import { characters, DialogueLine } from '../data/characterData';
import { splitTextIntoChunks } from '../utils/textSplitter';

interface DialogueBoxProps {
  dialogueLines: DialogueLine[];
  onComplete: () => void;
  onAddToHistory: (line: DialogueLine) => void;
  nodeDay?: number; // 📜 현재 노드의 day 정보 (프롤로그 = 0, 게임 시작 = 1+)
  shake?: boolean; // 대사창 흔들림 효과
  onTypingStateChange?: (isTyping: boolean) => void; // ✅ 타이핑 상태 전달
  currentLocation?: string; // ✅ 현재 장소 정보
  nodeId?: string; // ✅ 노드 ID
}

export function DialogueBox({ dialogueLines, onComplete, onAddToHistory, nodeDay = 0, shake = false, onTypingStateChange, currentLocation, nodeId }: DialogueBoxProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingRef = useRef(false); // ✅ 중복 클릭 방지 플래그

  // dialogueLines가 변경되면 인덱스 초기화
  useEffect(() => {
    setCurrentLineIndex(0);
    setCurrentChunkIndex(0);
    setDisplayedText('');
    setIsTyping(false);
    
    // shake 효과 활성화 후 0.6초 후 비활성화
    if (shake) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [dialogueLines, shake]);

  const currentLine = dialogueLines[currentLineIndex];
  
  // 현재 대사를 3줄 기준으로 분할
  const textChunks = useMemo(() => {
    if (!currentLine) return [];
    return splitTextIntoChunks(currentLine.text);
  }, [currentLine]);

  const currentChunkText = textChunks[currentChunkIndex] || '';
  const character = currentLine ? characters[currentLine.characterId] || characters.narrator : characters.narrator;
  const isLastLine = currentLineIndex === dialogueLines.length - 1;
  const isLastChunk = currentChunkIndex === textChunks.length - 1;
  // ✅ 내래이션 판별: isNarration 플래그 또는 characterId가 'narrator'
  const isNarrator = currentLine?.isNarration || currentLine?.characterId === 'narrator';
  
  // 캐릭터별 테두리 색상 (nameColor에서 변환)
  const getBorderColor = (nameColor: string) => {
    // Tailwind color를 실제 색상 값으로 변환
    const colorMap: Record<string, string> = {
      'text-blue-400': '#60a5fa',
      'text-purple-400': '#c084fc',
      'text-yellow-400': '#facc15',
      'text-indigo-400': '#818cf8',
      'text-red-400': '#f87171',
      'text-orange-400': '#fb923c',
      'text-green-400': '#4ade80',
      'text-cyan-400': '#22d3ee',
      'text-amber-400': '#fbbf24',
      'text-rose-400': '#fb7185',
      'text-pink-400': '#f472b6',
      'text-slate-400': '#94a3b8'
    };
    return colorMap[nameColor] || '#94a3b8';
  };
  
  // 대화에 등장하는 캐릭터들 추출 (narrator 제외, 최대 3명)
  const participatingCharacters = useMemo(() => {
    const characterIds = new Set<string>();
    dialogueLines.forEach(line => {
      // isNarration이 true이거나 characterId가 'narrator'인 경우 제외
      if (!line.isNarration && line.characterId !== 'narrator') {
        characterIds.add(line.characterId);
      }
    });
    return Array.from(characterIds).slice(0, 3);
  }, [dialogueLines]);

  // 2명 이상의 캐릭터가 대화하는지 확인
  const isMultiCharacterDialogue = participatingCharacters.length >= 2;

  // 🐛 디버그 로그 (개발용)
  useEffect(() => {
    if (currentLine) {
      console.log('[DialogueBox DEBUG]', {
        characterId: currentLine.characterId,
        isNarration: currentLine.isNarration, // ✅ 추가
        isNarrator,
        isMultiCharacterDialogue,
        participatingCharacters,
        hasPortraitUrl: !!character.portraitUrl,
        portraitUrl: character.portraitUrl,
        text: currentLine.text.substring(0, 30) + '...' // ✅ 스트 일부 표시
      });
    }
  }, [currentLine, isNarrator, isMultiCharacterDialogue, participatingCharacters, character]);

  // 텍스트 타이핑 효과
  useEffect(() => {
    if (!currentLine || !currentChunkText) return;

    // 이전 interval 리
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    setIsTyping(true);
    setDisplayedText('');

    let charIndex = 0;
    const text = currentChunkText;
    
    typingIntervalRef.current = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
      }
    }, 30); // 타이핑 속도

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [currentLine, currentChunkText, currentChunkIndex]);

  useEffect(() => {
    if (onTypingStateChange) {
      onTypingStateChange(isTyping);
    }
  }, [isTyping, onTypingStateChange]);

  const handleNext = () => {
    if (isProcessingRef.current) return; // ✅ 중복 클릭 방지
    isProcessingRef.current = true;

    if (isTyping) {
      // 타이핑 중이면 interval 정리하고 즉시 전체 텍스트 표시
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      setDisplayedText(currentChunkText);
      setIsTyping(false);
      isProcessingRef.current = false;
      return;
    }

    // 다음으로 진행
    if (isLastChunk) {
      // 📜 대사의 마지막 청크에서만 히스토리에 추가
      // ✅ 내래이션(isNarration=true 또는 narrator)과 프롤로그(day=0) 제외
      const isNarration = currentLine.isNarration || currentLine.characterId === 'narrator';
      if (!isNarration && nodeDay !== 0) {
        // ✅ location과 nodeId 정보를 포함하여 로그에 추가
        onAddToHistory({
          ...currentLine,
          location: currentLocation,
          nodeId: nodeId
        });
      }

      if (isLastLine) {
        // 마지막 대사면 완료
        console.log('📜 DialogueBox - Last line reached, calling onComplete', {
          currentLineIndex,
          totalLines: dialogueLines.length,
          currentChunkIndex,
          totalChunks: textChunks.length
        });
        setIsTyping(false); // ✅ onComplete 호출 전 타이핑 상태 명시적으로 false로 설정
        isProcessingRef.current = false;
        onComplete();
      } else {
        // 다음 대사로
        console.log('📜 DialogueBox - Moving to next line', {
          currentLineIndex,
          nextLineIndex: currentLineIndex + 1,
          totalLines: dialogueLines.length
        });
        setCurrentLineIndex(prev => prev + 1);
        setCurrentChunkIndex(0);
        isProcessingRef.current = false;
      }
    } else {
      // 다음 청크로
      console.log('📜 DialogueBox - Moving to next chunk', {
        currentChunkIndex,
        nextChunkIndex: currentChunkIndex + 1,
        totalChunks: textChunks.length
      });
      setCurrentChunkIndex(prev => prev + 1);
      isProcessingRef.current = false;
    }
  };

  if (!currentLine) return null;

  return (
    <div className="w-full">
      {/* 캐릭터 포트레이트 - 단일 캐릭터 */}
      {!isNarrator && !isMultiCharacterDialogue && character.portraitUrl && (
        <div className="flex flex-col items-center mb-3 sm:mb-4 animate-fade-in">
          <div className="relative mb-2">
            <div 
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden elevation-4 bg-black/30"
              style={{
                border: `3px solid ${getBorderColor(character.nameColor)}`
              }}
            >
              <img 
                src={character.portraitUrl} 
                alt={character.name}
                className="w-full h-full object-cover scale-125"
              />
            </div>
            <div className="absolute inset-0 rounded-full amber-glow opacity-60" />
          </div>
          
          <span className={`${character.nameColor} text-xs sm:text-sm font-semibold tracking-wide`}>
            {character.name}
          </span>
        </div>
      )}

      {/* Multi-Character Portraits - 다수 캐릭터 */}
      {!isNarrator && isMultiCharacterDialogue && (
        <div className="flex justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 animate-fade-in">
          {participatingCharacters.map(charId => {
            const char = characters[charId];
            if (!char) return null;
            
            const isCurrentSpeaker = currentLine.characterId === charId;
            const borderColor = getBorderColor(char.nameColor);
            
            return (
              <div key={charId} className="flex flex-col items-center transition-all duration-300">
                <div className="relative mb-1.5">
                  <div 
                    className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden elevation-4 transition-all duration-300 bg-black/30 ${
                      isCurrentSpeaker ? 'scale-105' : 'scale-95'
                    }`}
                    style={{
                      border: `3px solid ${borderColor}`,
                      borderColor: isCurrentSpeaker ? borderColor : `${borderColor}4d`,
                      opacity: isCurrentSpeaker ? 1 : 0.5
                    }}
                  >
                    <img 
                      src={char.portraitUrl} 
                      alt={char.name}
                      className="w-full h-full object-cover scale-125"
                    />
                  </div>
                  {isCurrentSpeaker && (
                    <div className="absolute inset-0 rounded-full amber-glow opacity-60" />
                  )}
                </div>
                
                <span 
                  className={`text-xs ${char.nameColor} transition-opacity duration-300`}
                  style={{
                    opacity: isCurrentSpeaker ? 1 : 0.5
                  }}
                >
                  {char.name}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Dialogue Box - 클릭하면 다음으로 */}
      <Card 
        data-dialogue-box
        className={`glass-strong elevation-3 hover:elevation-4 cursor-pointer transition-all border border-white/10 hover:border-amber-600/20 rounded-lg overflow-hidden ${isShaking ? 'animate-shake' : ''}`}
        onClick={handleNext}
      >
        <div className="p-4 sm:p-6">
          {/* Dialogue Text - 3줄 고정 높이 */}
          <div 
            className={`text-white leading-relaxed text-sm sm:text-base ${isNarrator ? 'italic text-neutral-400' : ''}`}
            style={{ 
              lineHeight: '1.6',
              minHeight: '4.8em', // 3줄 기준 (1.6 line-height * 3 = 4.8em)
              maxHeight: '4.8em',
              overflow: 'hidden'
            }}
          >
            {displayedText}
            {isTyping && <span className="animate-pulse text-amber-500 ml-1">▌</span>}
          </div>

          {/* 청크 진행 표시기 - 분할된 대사일 때만 표시 */}
          {textChunks.length > 1 && (
            <div className="flex gap-1 mt-3 justify-end">
              {textChunks.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all ${
                    index === currentChunkIndex
                      ? 'w-6 bg-amber-500'
                      : index < currentChunkIndex
                      ? 'w-1 bg-amber-600/50'
                      : 'w-1 bg-white/20'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-600/0 to-amber-600/0 hover:from-amber-600/5 hover:to-transparent transition-all pointer-events-none" />
      </Card>
    </div>
  );
}