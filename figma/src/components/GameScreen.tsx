import { useState, useEffect, useRef } from 'react';
import { StoryNode, DialogueLine, ItemInfo } from '../types/story';
import { backgrounds } from '../data/backgrounds';
import { getChapterName, canSkipPrologue } from '../utils/game/chapterDetector';
import { filterChoices, debugChoiceFiltering, hasRequiredItem } from '../utils/game/choiceFilter';
import { validateGameState, logValidationResults } from '../utils/game/stateValidator';
import { parseDialogue } from '../utils/dialogue/parser';
import { getLocationFromNode, getBackgroundForNode } from '../utils/background/matcher';
import { getLocationName } from '../utils/background/helpers';
import { itemDataMap } from '../data/itemData';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Home, Save, Settings, BookOpen, Undo } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { DialogueBox } from './DialogueBox';
import { Inventory } from './Inventory';
import { DialogueLog } from './DialogueLog';
import { ItemAcquisition } from './ItemAcquisition';
import { SafePuzzle } from './SafePuzzle';
import { WellPuzzle } from './WellPuzzle';
import { MudAnalysisPuzzle } from './MudAnalysisPuzzle';
import { SettingsModal } from './SettingsModal';
import { EvidenceGuide } from './EvidenceGuide';

interface GameScreenProps {
  node: StoryNode;
  onChoice: (nextNodeId: string, item?: string, usedItem?: string) => void;
  onGoHome: () => void;
  onSave: () => void;
  inventory: string[];
  visitedCount: number;
  isPlayingLoadedGame: boolean;
  onGoBack?: () => void;
  viewedItems: string[];
  onViewItem: (item: string) => void;
  onContinueAfterEnding?: () => void;
  selectedChoices: Record<string, string[]>;
  showEvidenceGuide: boolean;
  onToggleEvidenceGuide: (value: boolean) => void;
  dialogueHistory: DialogueLine[];
  onAddToDialogueHistory: (line: DialogueLine) => void;
  visitedNodes: string[]; // ✅ 추가
}

export function GameScreen({ 
  node, 
  onChoice, 
  onGoHome, 
  onSave, 
  inventory, 
  visitedCount, 
  isPlayingLoadedGame, 
  onGoBack, 
  viewedItems, 
  onViewItem, 
  onContinueAfterEnding, 
  selectedChoices, 
  showEvidenceGuide,
  onToggleEvidenceGuide,
  dialogueHistory, // 📜 전역 대화 로그
  onAddToDialogueHistory, // 📜 대화 추가 핸들러
  visitedNodes // ✅ 추가
}: GameScreenProps) {
  const [showDialogue, setShowDialogue] = useState(true);
  const [dialogueLines, setDialogueLines] = useState<DialogueLine[]>([]);
  const [currentBackground, setCurrentBackground] = useState<string>(backgrounds.default.url);
  const [currentLocation, setCurrentLocation] = useState<string>(''); // 현재 location 추적
  const [acquiredItem, setAcquiredItem] = useState<ItemInfo | null>(null);
  const [showSafePuzzle, setShowSafePuzzle] = useState(false);
  const [safePuzzleChoice, setSafePuzzleChoice] = useState<{nextNode: string, item?: string, requiredItem?: string} | null>(null);
  const [showWellPuzzle, setShowWellPuzzle] = useState(false);
  const [wellPuzzleChoice, setWellPuzzleChoice] = useState<{nextNode: string, item?: string, requiredItem?: string} | null>(null);
  const [showMudAnalysisPuzzle, setShowMudAnalysisPuzzle] = useState(false);
  const [mudAnalysisPuzzleChoice, setMudAnalysisPuzzleChoice] = useState<{nextNode: string, item?: string, requiredItem?: string} | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDialogueTyping, setIsDialogueTyping] = useState(false); // ✅ 타이핑 중인지 추적
  const backgroundClickCooldownRef = useRef<boolean>(false); // ✅ 배경 클릭 쿨다운
  
  // 챕터 전환 페이드 효과
  const [currentChapter, setCurrentChapter] = useState<string>('');
  const [isChapterTransitioning, setIsChapterTransitioning] = useState(false);
  const [pendingDialogueLines, setPendingDialogueLines] = useState<DialogueLine[]>([]); // 페이드 후 표시할 대사
  const [fadeInDuration, setFadeInDuration] = useState(1000); // 페이드인 지속시간 (ms)
  const [fadeOutDuration, setFadeOutDuration] = useState(1000); // 페이드아�� 지속시간 (ms)

  // 디버깅용 로그
  useEffect(() => {
    // console.log('GameScreen - Current inventory:', inventory);
    // console.log('🎭 GameScreen - Current Node:', {
    //   nodeId: node.id,
    //   character: node.character,
    //   hasText: !!node.text,
    //   textLength: node.text?.length
    // });
  }, [node.id]);

  // 노드가 변경될 때마다 대화 파싱 및 배경 설정
  useEffect(() => {
    // ✅ 개발 모드: 상태 검증 실행
    if (process.env.NODE_ENV === 'development') {
      const validationResult = validateGameState(
        visitedNodes,
        inventory,
        node.id,
        node.timeOfDay
      );
      logValidationResults(validationResult, node.id);
    }
    
    // conditionalText 처리: 우선순위 기반으로 조건에 맞는 텍스트 선택
    let textToDisplay = node.text;
    
    if (node.conditionalText && node.conditionalText.length > 0) {
      // ✅ priority 순으로 정렬 (높을수록 우선, undefined는 0으로 처리)
      const sortedConditionals = [...node.conditionalText].sort((a, b) => {
        const priorityA = a.priority ?? 0;
        const priorityB = b.priority ?? 0;
        return priorityB - priorityA; // 내림차순 (높은 우선순위가 먼저)
      });
      
      for (const conditional of sortedConditionals) {
        let conditionMet = false;
        
        if (typeof conditional.condition === 'function') {
          // 함수 조건
          conditionMet = conditional.condition({ visitedNodes, items: inventory });
        } else {
          // 객체 조건 - 모든 조건이 만족되어야 함 (AND)
          const { visitedNode, visitedAny, visitedAll, hasItem } = conditional.condition;
          
          // 기본값은 true로 시작 (조건이 없으면 true)
          conditionMet = true;
          
          // 각 조건을 AND로 평가
          if (visitedNode !== undefined) {
            conditionMet = conditionMet && visitedNodes.includes(visitedNode);
          }
          if (visitedAny !== undefined) {
            conditionMet = conditionMet && visitedAny.some(n => visitedNodes.includes(n));
          }
          if (visitedAll !== undefined) {
            conditionMet = conditionMet && visitedAll.every(n => visitedNodes.includes(n));
          }
          if (hasItem !== undefined) {
            conditionMet = conditionMet && inventory.includes(hasItem);
          }
        }
        
        if (conditionMet) {
          textToDisplay = conditional.text;
          break; // 첫 번째로 만족하는 조건의 텍스트 사용 (우선순위 순)
        }
      }
    }
    
    const parsed = parseDialogue(textToDisplay, node.speaker || node.character, node.id);
    
    // 파싱된 결과가 유효한지 확인
    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
      console.warn(`Invalid dialogue parsed for node ${node.id}:`, parsed);
      setDialogueLines([]);
      setShowDialogue(false);
      return;
    }
    
    // 챕터 전환 체크 (대사 설정 전에)
    const newChapter = getChapterName(node.id);
    
    // 🔧 첫 로드 시에도 챕터를 설정하도록 개선
    if (currentChapter === '') {
      setCurrentChapter(newChapter);
      setDialogueLines(parsed);
      setShowDialogue(true);
    } else if (newChapter !== currentChapter) {
      // 🎬 프롤로그 → 챕터 1 전환 시에만 페이드 효과 적용
      const isFromPrologueToChapter1 = currentChapter === '프롤로그' && newChapter === '챕터 1';
      
      if (isFromPrologueToChapter1) {
        // 🎬 프롤로그 → 챕터 1: Fade Out → Fade In 효과 적용
        console.log('🎬 [FADE] Prologue → Chapter 1 transition started');
        setIsChapterTransitioning(true);
        setCurrentChapter(newChapter);
        setPendingDialogueLines(parsed);
        
        // 페이드아웃 → 페이드인 (총 2초)
        const totalDuration = fadeOutDuration + fadeInDuration;
        setTimeout(() => {
          setIsChapterTransitioning(false);
          setDialogueLines(parsed);
          setShowDialogue(true);
          console.log('🎬 [FADE] Transition completed');
        }, totalDuration);
      } else {
        // 그 외 모든 챕터 전환: 페이드 없이 즉시 표시
        setCurrentChapter(newChapter);
        setDialogueLines(parsed);
        setShowDialogue(true);
      }
    } else {
      // 같은 챕터 내 노드 전환: 즉시 대사 표시 (페이드 없음)
      setDialogueLines(parsed);
      setShowDialogue(true);
    }
    
    // location 기반 배경 설정: location이 변경될 때만 배경 업데이트
    const newLocation = node.location || getLocationFromNode(node.id); // ✅ node.location 우선 사용
    
    // location이 변경되었거나, 노드에 명시적으로 배경이 지정된 경우, 또는 첫 로드인 경우 배경 변경
    if (currentLocation === '' || newLocation !== currentLocation || node.background) {
      const backgroundId = node.background || getBackgroundForNode(node.id);
      const background = backgrounds[backgroundId] || backgrounds.default;
      setCurrentBackground(background.url);
      setCurrentLocation(newLocation);
      
      // console.log('🖼️ Background changed:', {
      //   nodeId: node.id,
      //   oldLocation: currentLocation,
      //   newLocation: newLocation,
      //   backgroundId: backgroundId
      // });
    } else {
      // console.log('🖼️ Background maintained:', {
      //   nodeId: node.id,
      //   location: currentLocation
      // });
    }
  }, [node.id]); // ✅ node.id만 의존성으로 사용 (text와 character 제거하여 불필요한 리렌더링 방지)

  const handleDialogueComplete = () => {
    console.log('🎬 handleDialogueComplete called', { 
      nodeId: node.id, 
      hasNextNode: !!node.nextNode, 
      nextNode: node.nextNode 
    });
    
    // ✅ 타이핑 상태를 먼저 false로 설정
    setIsDialogueTyping(false);
    
    // ✅ 상태 업데이트가 완전히 반영되도록 짧은 지연 후 대화 숨김
    setTimeout(() => {
      setShowDialogue(false);
      
      // nextNode가 있으면 자동으로 다음 노드로 이동
      if (node.nextNode) {
        console.log('🎬 Auto-advancing to nextNode:', node.nextNode);
        onChoice(node.nextNode);
      }
    }, 50); // ✅ 50ms 지연으로 상태 업데이트 보장
  };

  const handleChoice = (nextNode: string, item?: string, requiredItem?: string) => {
    if (requiredItem && !inventory.includes(requiredItem)) {
      alert(`이 선택을 하려면 \"${requiredItem}\"이(가) 필요합니다.`);
      return;
    }
    
    // 금고 퍼즐인 경우
    const choice = node.choices?.find(c => c.nextNode === nextNode);
    if (choice?.puzzleType === 'safe') {
      setSafePuzzleChoice({ nextNode, item, requiredItem });
      setShowSafePuzzle(true);
      return;
    }
    
    // 우물 퍼즐인 경우
    if (choice?.puzzleType === 'well') {
      setWellPuzzleChoice({ nextNode, item, requiredItem });
      setShowWellPuzzle(true);
      return;
    }
    
    // 흙 분석 퍼즐인 경우
    if (choice?.puzzleType === 'mudAnalysis') {
      setMudAnalysisPuzzleChoice({ nextNode, item, requiredItem });
      setShowMudAnalysisPuzzle(true);
      return;
    }
    
    // 아이템을 획득하는 경우
    if (item && itemDataMap[item]) {
      // ✅ 먼저 인벤토리에 아이템을 추가 (이렇게 해야 팝업 표시 중에도 hideIfHasItem이 작동함)
      onChoice(nextNode, item, requiredItem);
      // 그 다음 팝업 표시
      setAcquiredItem(itemDataMap[item]);
      return;
    }
    
    // 아이템이 없거나 아이템 정보가 없으면 바로 진행
    onChoice(nextNode, item, requiredItem);
  };
  
  const handleSafePuzzleSuccess = () => {
    setShowSafePuzzle(false);
    if (safePuzzleChoice) {
      // 퍼즐 성공 시, 다음 노드로 바로 이동 (아이템은 해당 노드에서 처리)
      onChoice(safePuzzleChoice.nextNode, safePuzzleChoice.item, safePuzzleChoice.requiredItem);
      setSafePuzzleChoice(null);
    }
  };
  
  const handleSafePuzzleCancel = () => {
    setShowSafePuzzle(false);
    setSafePuzzleChoice(null);
  };
  
  const handleWellPuzzleSuccess = () => {
    setShowWellPuzzle(false);
    if (wellPuzzleChoice) {
      // 퍼즐 성공 시, ���음 노드로 바로 이동 (아이템은 해당 노드에서 처리)
      onChoice(wellPuzzleChoice.nextNode, wellPuzzleChoice.item, wellPuzzleChoice.requiredItem);
      setWellPuzzleChoice(null);
    }
  };
  
  const handleWellPuzzleCancel = () => {
    setShowWellPuzzle(false);
    setWellPuzzleChoice(null);
  };
  
  const handleMudAnalysisPuzzleSuccess = () => {
    setShowMudAnalysisPuzzle(false);
    if (mudAnalysisPuzzleChoice) {
      // 퍼즐 성공 시, 다음 노드로 바로 이동 (아이템은 해당 노드에서 처리)
      onChoice(mudAnalysisPuzzleChoice.nextNode, mudAnalysisPuzzleChoice.item, mudAnalysisPuzzleChoice.requiredItem);
      setMudAnalysisPuzzleChoice(null);
    }
  };
  
  const handleMudAnalysisPuzzleCancel = () => {
    setShowMudAnalysisPuzzle(false);
    setMudAnalysisPuzzleChoice(null);
  };
  
  const handleItemAcquisitionClose = () => {
    if (acquiredItem) {
      // ✅ 아이템은 이미 추가되었으므로 팝업만 닫음
      setAcquiredItem(null);
    }
  };

  const handleSaveClick = () => {
    onSave();
    toast.success('게임이 저장되었습니다.');
  };

  return (
    <div className="min-h-screen flex flex-col safe-area-inset relative overflow-hidden">
      {/* Background Image - 배경 전환은 즉시(transition 없음) */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${currentBackground})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for readability - adjust opacity based on screen size */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85 sm:from-black/70 sm:via-black/60 sm:to-black/80" />
      </div>
      
      {/* 🎬 Chapter Transition Overlay - 프롤로그→챕터1 전환 시에만 활성화 */}
      {isChapterTransitioning && (
        <div className="absolute inset-0 bg-black z-50 pointer-events-none animate-fade" />
      )}
      
      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Safe area top padding */}
        <div className="pt-safe-top" />
        
        {/* Top UI Bar */}
        <div className="px-2 sm:px-4 lg:px-6 pt-2 sm:pt-4 pb-2">
          <div className="max-w-7xl mx-auto space-y-2">
            {/* 첫 번째 줄: 공간 표기와 기본 버튼들 */}
            <div className="flex justify-between items-center gap-2">
              {/* Left: Title and Stats */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="min-w-0">
                  {/* 항상 현재 위치만 표시 */}
                  <div className="flex items-center gap-1 sm:gap-2 text-slate-400 text-xs">
                    <BookOpen className="size-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">{getLocationName(node.id)}</span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                {/* 로그 - 모바일: 아이콘만, 태블릿+: 텍스트 포함 */}
                <DialogueLog history={dialogueHistory} iconOnly={false} />
                {/* 인벤토리 - 모바일: 아이콘만, 태블릿+: 텍스트 포함 */}
                <Inventory items={inventory} maxSlots={12} viewedItems={viewedItems} onItemViewed={onViewItem} iconOnly={false} />
                <Button
                  onClick={onGoHome}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100 px-2 sm:px-3"
                >
                  <Home className="size-3 sm:size-4 sm:mr-2" />
                  <span className="hidden sm:inline">홈</span>
                </Button>
                <Button
                  onClick={handleSaveClick}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100 px-2 sm:px-3"
                >
                  <Save className="size-3 sm:size-4 sm:mr-2" />
                  <span className="hidden sm:inline">저장</span>
                </Button>
                <Button
                  onClick={() => setIsSettingsModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100 px-2 sm:px-3"
                >
                  <Settings className="size-3 sm:size-4 sm:mr-2" />
                  <span className="hidden sm:inline">설정</span>
                </Button>
              </div>
            </div>

            {/* 두 번째 줄: 프롤로그 건너뛰기 버튼 (프롤로그일 때만) */}
            {getChapterName(node.id) === '프롤로그' && (() => {
              // arrive_mansion은 이미 프롤로그 끝이므로 버튼 표시 안 함
              if (node.id === 'arrive_mansion' || node.id.includes('arrive_mansion')) {
                return null;
              }
              
              return (
                <div className="flex justify-start">
                  <Button
                    onClick={() => {
                      // arrive_mansion으로 직접 이동하면서 visitedNodes 업데이트
                      onChoice('arrive_mansion');
                    }}
                    variant="outline"
                    size="sm"
                    className="border-amber-600/50 text-amber-500 hover:bg-amber-600/20 hover:text-amber-400 px-3 sm:px-4"
                  >
                    <span className="text-xs sm:text-sm">⏭️ 저택으로 바로 가기</span>
                  </Button>
                </div>
              );
            })()}
          </div>
        </div>
        
        {/* Main Game Area */}
        <div 
          className="flex-1 flex flex-col justify-end p-2 sm:p-4 lg:p-6 pb-4 sm:pb-safe-bottom"
          onClick={(e) => {
            // 대화 중일 때만 배경 클릭으로 다음 대사로 진행
            // showDialogue가 false면 대사가 끝난 상태이므로 배경 클릭 차단됨
            if (showDialogue && dialogueLines.length > 0) {
              // 클릭한 요소가 버튼이나 선택지가 아닐 때만 진행
              const target = e.target as HTMLElement;
              if (!target.closest('button') && !target.closest('[role="button"]') && !target.closest('[data-dialogue-box]')) {
                // DialogueBox의 Card를 찾아서 클릭 이벤트 발생
                const dialogueCard = document.querySelector('[data-dialogue-box]') as HTMLElement;
                if (dialogueCard) {
                  dialogueCard.click();
                }
              }
            }
          }}
        >
          <div className="w-full max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {/* Dialogue Display - 하단에 고정 */}
            {showDialogue && dialogueLines.length > 0 && (
              <DialogueBox
                dialogueLines={dialogueLines}
                onComplete={handleDialogueComplete}
                onAddToHistory={onAddToDialogueHistory}
                nodeDay={node.day}
                shake={node.shake}
                onTypingStateChange={setIsDialogueTyping}
                currentLocation={currentLocation} // ✅ 현재 장소 정보 전달
                nodeId={node.id} // ✅ 노드 ID 전달
              />
            )}

            {/* Evidence Guide - 단서 안내 */}
            {!showDialogue && !node.isEnding && showEvidenceGuide && (
              <div>
                <EvidenceGuide inventory={inventory} />
              </div>
            )}

            {/* Choices - 중앙쪽으로 이동 (대화가 끝난 후) */}
            {!showDialogue && !isDialogueTyping && !node.nextNode && node.choices && node.choices.length > 0 && (() => {
              // 선택지 필터링
              const visibleChoices = filterChoices(
                node.choices,
                inventory,
                visitedNodes,
                visitedCount,
                node.id,
                selectedChoices[node.id]
              );

              // ⚠️ 모든 선택지가 필터링된 경우 경고
              if (visibleChoices.length === 0) {
                console.error(`[선택지 없음] 노드 ${node.id}에서 모든 선택지가 숨겨졌습니다!`);
                console.error('- 전체 선택지:', node.choices);
                console.error('- 현재 인벤토리:', inventory);
                console.error('- 방문한 노드:', visitedNodes);
                console.error('- 플레이 횟수:', visitedCount);
                
                return (
                  <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4 mb-24 sm:mb-40 md:mb-52">
                    <div className="glass-strong elevation-2 p-4 sm:p-6 text-center">
                      <p className="text-red-400 mb-4">⚠️ 선택지가 없습니다</p>
                      <p className="text-gray-300 text-sm mb-4">
                        이 노드(ID: {node.id})에서 모든 선택지가 조건에 맞지 않아 숨겨졌습니다.
                      </p>
                      <Button
                        onClick={onGoHome}
                        className="glass-strong elevation-2 hover:elevation-3"
                      >
                        메인 화면으로
                      </Button>
                    </div>
                  </div>
                );
              }

              return (
                <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4 mb-24 sm:mb-40 md:mb-52 flex flex-col items-center">
                  {visibleChoices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice.nextNode, choice.item, choice.requiredItem)}
                    className="w-[360px] max-w-full glass-strong elevation-2 hover:elevation-3 text-white justify-start h-auto py-3 px-4 sm:py-4 sm:px-6 transition-all text-sm sm:text-base border border-white/10 hover:border-amber-600/30 rounded-lg group active:scale-98"
                    variant="secondary"
                  >
                    {/* Choice text */}
                    <span className="flex-1 text-left font-medium">{choice.text}</span>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 ml-2">
                      {choice.requiredItem && (
                        <Badge 
                          variant="outline" 
                          className="border-yellow-600/50 text-yellow-500 bg-yellow-600/10 text-xs whitespace-nowrap font-medium"
                        >
                          <span className="hidden sm:inline">필요: </span>{choice.requiredItem}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-colors pointer-events-none" />
                  </Button>
                ))}
                
                {/* Go Back Button - 임시로 비활성화 (테스트용) */}
                {false && onGoBack && node.id !== 'start' && !node.isEnding && (
                  <Button
                    onClick={onGoBack}
                    className="w-full glass elevation-1 hover:elevation-2 text-neutral-400 hover:text-white justify-center h-auto py-2 px-4 sm:py-3 sm:px-6 transition-all text-xs sm:text-sm border border-white/5 hover:border-white/10 rounded-lg group active:scale-98"
                    variant="ghost"
                  >
                    <Undo className="size-3 sm:size-4 mr-2" />
                    <span className="font-medium">이전 선택으로 돌아가기</span>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-colors pointer-events-none" />
                  </Button>
                )}
              </div>
              );
            })()}

            {/* Ending Screen */}
            {!showDialogue && node.isEnding && (
              <Card className="bg-slate-800/95 border-slate-700 backdrop-blur p-4 sm:p-6 mt-3 sm:mt-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {node.endingType === 'good' && (
                      <Badge className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm">해피 엔딩</Badge>
                    )}
                    {node.endingType === 'bad' && (
                      <Badge className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm">배드 엔딩</Badge>
                    )}
                    {node.endingType === 'neutral' && (
                      <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs sm:text-sm">일반 엔딩</Badge>
                    )}
                  </div>
                </div>
                <Button
                  onClick={onGoHome}
                  className="w-full glass-strong elevation-2 hover:elevation-3 text-white justify-center h-auto py-3 px-4 sm:py-4 sm:px-6 transition-all text-sm sm:text-base border border-white/10 hover:border-amber-600/30 rounded-lg group active:scale-98"
                  variant="secondary"
                >
                  <span className="font-medium">홈으로</span>
                </Button>
              </Card>
            )}
          </div>
        </div>
        
        {/* Safe area bottom padding */}
        <div className="pb-safe-bottom" />
      </div>
      
      {/* Item Acquisition Popup */}
      {acquiredItem && (
        <ItemAcquisition item={acquiredItem} onClose={handleItemAcquisitionClose} />
      )}
      
      {/* Safe Puzzle Popup */}
      {showSafePuzzle && safePuzzleChoice && (
        <SafePuzzle
          hasHint={inventory.includes('백작의 일기') || inventory.includes('금고 비밀번호')}
          onSuccess={handleSafePuzzleSuccess}
          onCancel={handleSafePuzzleCancel}
        />
      )}
      
      {/* Well Puzzle Popup */}
      {showWellPuzzle && wellPuzzleChoice && (
        <WellPuzzle
          onSuccess={handleWellPuzzleSuccess}
          onCancel={handleWellPuzzleCancel}
        />
      )}
      
      {/* Mud Analysis Puzzle Popup */}
      {showMudAnalysisPuzzle && mudAnalysisPuzzleChoice && (
        <MudAnalysisPuzzle
          onComplete={handleMudAnalysisPuzzleSuccess}
          onCancel={handleMudAnalysisPuzzleCancel}
        />
      )}
      
      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <SettingsModal 
          isOpen={isSettingsModalOpen} 
          onClose={() => setIsSettingsModalOpen(false)} 
        />
      )}
    </div>
  );
}