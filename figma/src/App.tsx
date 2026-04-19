import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Toaster, toast } from 'sonner@2.0.3';
import './styles/globals.css';
import { GameScreen } from './components/GameScreen';
import { IntroScreen } from './components/IntroScreen';
import { OpeningSequence } from './components/OpeningSequence';
import { InsightNotification } from './components/InsightNotification';
import { BackgroundSound } from './components/BackgroundSound';
import { Credits } from './components/Credits';
import { ValidationBadge } from './components/ValidationBadge';
import { storyData } from './data/storyData';
import { DialogueLine } from './data/characterData';
import { Insight, insightsData } from './data/insights';
import { getSoundTrackForNode, type SoundTrack } from './utils/soundHelpers';
import { 
  validateCharacterAttributes, 
  logValidationResults,
  validateAllGameData,
  getOrphanNodes
} from './utils/dataValidator';
import {
  validateAllDialogues as validateDataIntegrity,
  printValidationReport as printIntegrityReport
} from './utils/dialogue/validator';

interface SaveData {
  currentNodeId: string;
  visitedNodes: string[];
  inventory: string[];
  history: { nodeId: string; inventory: string[] }[];
  viewedItems: string[];
  selectedChoices: Record<string, string[]>;
  showEvidenceGuide: boolean;
  dialogueHistory: DialogueLine[];
  insights: string[];
}

export default function App() {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [visitedNodes, setVisitedNodes] = useState<string[]>(['start']);
  const [inventory, setInventory] = useState<string[]>([]);
  const [history, setHistory] = useState<{ nodeId: string; inventory: string[] }[]>([
    { nodeId: 'start', inventory: [] }
  ]);
  const [showIntro, setShowIntro] = useState(true);
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);
  const [isPlayingLoadedGame, setIsPlayingLoadedGame] = useState<boolean>(false);
  const [viewedItems, setViewedItems] = useState<string[]>([]);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string[]>>({});
  const [showEvidenceGuide, setShowEvidenceGuide] = useState<boolean>(false);
  
  // 📜 전역 대화 로그
  const [dialogueHistory, setDialogueHistory] = useState<DialogueLine[]>([]);
  
  // 💭 감정적 통찰 시스템
  const [insights, setInsights] = useState<string[]>([]);
  const [currentInsightNotification, setCurrentInsightNotification] = useState<Insight | null>(null);
  
  // 🎬 크레딧 표시
  const [showCredits, setShowCredits] = useState<boolean>(false);
  const [creditsEndingType, setCreditsEndingType] = useState<'good' | 'bad' | 'true'>('good');
  
  // 🔄 로딩 상태
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // 🎬 오프닝 시퀀스 (첫 플레이 시에만)
  const [showOpeningSequence, setShowOpeningSequence] = useState<boolean>(false);
  
  // 🔒 무한 루프 방지용 ref
  const hasSavedGameRef = useRef<boolean>(false);
  const isResettingRef = useRef<boolean>(false);
  const isOpeningCompleteRef = useRef<boolean>(false); // ✅ 오프닝 완료 중복 방지

  // ✅ useCallback을 최상단에 배치 (조건부 반환 이전)
  const handleOpeningComplete = useCallback(() => {
    if (isOpeningCompleteRef.current) {
      console.log('🎬 Opening already completed, skipping');
      return;
    }
    console.log('🎬 Opening sequence complete');
    isOpeningCompleteRef.current = true;
    setShowOpeningSequence(false);
  }, []); // 빈 의존성 배열 - 한 번만 생성

  // 🎵 현재 음악 트랙 결정 (메모이제이션으로 중복 호출 방지)
  const currentTrack = useMemo(() => {
    if (showIntro || showOpeningSequence) {
      return getSoundTrackForNode(undefined, undefined, undefined, true);
    }
    const node = storyData[currentNodeId];
    if (node) {
      return getSoundTrackForNode(node.id);
    }
    return 'main_theme' as const;
  }, [showIntro, showOpeningSequence, currentNodeId]);

  // 🔄 초기 로딩: 저장된 게임이 있으면 자동으로 로드
  useEffect(() => {
    // 🧹 마이그레이션: 이전 엔딩 방식 데이터 정리
    const hasOldData = localStorage.getItem('moroMansionEndings') || 
                       localStorage.getItem('moroMansionCharacters') ||
                       localStorage.getItem('moroMansionPlayCount') ||
                       localStorage.getItem('moroMansionFirstVisit');
    
    if (hasOldData) {
      console.log('🧹 Cleaning up old data format...');
      localStorage.removeItem('moroMansionEndings');
      localStorage.removeItem('moroMansionCharacters');
      localStorage.removeItem('moroMansionPlayCount');
      localStorage.removeItem('moroMansionFirstVisit');
      console.log('✅ Old data cleaned');
    }
    
    // 저장된 게임 확인
    const savedData = localStorage.getItem('moroMansionSave');
    const hasData = !!savedData;
    hasSavedGameRef.current = hasData;
    setHasSavedGame(hasData);
    
    if (savedData) {
      try {
        const data: SaveData = JSON.parse(savedData);
        
        // 🔄 저장된 노드가 유효한지 확인
        if (storyData[data.currentNodeId]) {
          setCurrentNodeId(data.currentNodeId);
          setVisitedNodes(data.visitedNodes);
          setInventory(data.inventory);
          setHistory(data.history || [{ nodeId: data.currentNodeId, inventory: data.inventory }]);
          setViewedItems(data.viewedItems || []);
          setSelectedChoices(data.selectedChoices || {});
          setShowEvidenceGuide(data.showEvidenceGuide || false);
          setDialogueHistory(data.dialogueHistory || []); // 📜 대화 로그 복원
          setInsights(data.insights || []); // 💭 감정적 통찰 복원
          setIsPlayingLoadedGame(true);
          setShowIntro(false); // 💾 저장된 게임이 있으면 바로 게임 화면으로
        } else {
          // 저장된 노드가 유효하지 않으면 저장 데이터 삭제
          console.warn(`Invalid saved node: ${data.currentNodeId}. Clearing save data.`);
          localStorage.removeItem('moroMansionSave');
          setHasSavedGame(false);
        }
      } catch (error) {
        console.error('Failed to load saved game:', error);
        localStorage.removeItem('moroMansionSave');
        setHasSavedGame(false);
      }
    }
    
    // 📜 증거 가이드 설정 로드
    const savedEvidenceGuide = localStorage.getItem('evidenceGuideEnabled');
    if (savedEvidenceGuide !== null) {
      setShowEvidenceGuide(savedEvidenceGuide === 'true');
    }
    
    // 🔄 로딩 완료
    setIsLoading(false);
    
    // 🔍 개발 모드에서만 character 속성 검증 실행
    if (import.meta.env.DEV) {
      console.log('🔍 Character 속성 검증 시작...');
      const validation = validateCharacterAttributes();
      
      if (validation.errors.length > 0) {
        console.error('❌ Character 속성 오류:', validation.errors);
      }
      
      if (validation.warnings.length > 0) {
        console.warn('⚠️ Character 속성 경고:', validation.warnings);
      }
      
      console.log('✅ Character 속성 검증 완료:', validation.summary);
      
      // 전체 게임 데이터 검증
      console.log('🔍 전체 게임 데이터 검증 시작...');
      const fullValidation = validateAllGameData();
      logValidationResults(fullValidation);
      
      // 고아 노드 확인
      const orphanNodes = getOrphanNodes();
      if (orphanNodes.length > 0) {
        console.warn(`⚠️ 고아 노드 발견 (${orphanNodes.length}개):`, orphanNodes);
        console.log('💡 고아 노드 상세 목록을 보려면 콘솔에서 getOrphanNodes()를 실행하세요');
      } else {
        console.log('✅ 고아 노드 없음');
      }
      
      // 전역에서 접근 가능하도록 설정 (디버깅용)
      (window as any).getOrphanNodes = getOrphanNodes;
      (window as any).storyData = storyData;
      
      // 데이터 무결성 검증
      console.log('🔍 데이터 무결성 검증 시작...');
      const integrityValidation = validateDataIntegrity(storyData);
      printIntegrityReport(integrityValidation);
    }
  }, []);

  const currentNode = storyData[currentNodeId];

  const handleChoice = (nextNodeId: string, item?: string, usedItem?: string) => {
    if (!storyData[nextNodeId]) {
      console.error(`Invalid node: ${nextNodeId}`);
      return;
    }

    // 선택지 기록 추가
    setSelectedChoices(prev => ({
      ...prev,
      [currentNodeId]: [...(prev[currentNodeId] || []), nextNodeId]
    }));

    // 🎯 다음 노드의 item 속성 확인 (노드 자체에 아이템이 있으면 자동 획득)
    const nextNode = storyData[nextNodeId];
    const itemToAcquire = item || nextNode.item;

    // 아이템 획득
    if (itemToAcquire && !inventory.includes(itemToAcquire)) {
      setInventory([...inventory, itemToAcquire]);
      console.log('🎁 아이템 획득:', itemToAcquire);
    }

    // 아이템 사용 (제거)
    if (usedItem) {
      setInventory(inventory.filter(i => i !== usedItem));
    }

    // 방문한 노드 추가 (중복 허용 - 재방문 가능)
    setVisitedNodes([...visitedNodes, nextNodeId]);

    // 히스토리에 추가
    setHistory([...history, { 
      nodeId: nextNodeId, 
      inventory: itemToAcquire ? [...inventory, itemToAcquire] : (usedItem ? inventory.filter(i => i !== usedItem) : inventory)
    }]);

    setCurrentNodeId(nextNodeId);
    
    // 🎬 엔딩 노드 감지 - 크레딧 표시
    if (nextNode.isEnding && nextNode.showCredits) {
      console.log('🎬 Ending detected, showing credits:', nextNode.endingType);
      setTimeout(() => {
        setCreditsEndingType((nextNode.endingType as 'good' | 'bad' | 'true') || 'good');
        setShowCredits(true);
      }, 2000); // 엔딩 텍스트를 2초 동안 보여준 후 크레딧
    }
  };

  const handleGoBack = () => {
    if (history.length <= 1) {
      toast.error('더 이상 되돌릴 수 없습니다.');
      return;
    }

    const newHistory = history.slice(0, -1);
    const previousState = newHistory[newHistory.length - 1];

    setHistory(newHistory);
    setCurrentNodeId(previousState.nodeId);
    setInventory(previousState.inventory);
    
    toast.success('이전 선택으로 돌아갔습니다.');
  };

  const saveGameData = () => {
    const saveData: SaveData = {
      currentNodeId,
      visitedNodes,
      inventory,
      history,
      viewedItems,
      selectedChoices,
      showEvidenceGuide,
      dialogueHistory, // 📜 대화 로그 저장
      insights, // 💭 감정적 통찰 저장
    };
    localStorage.setItem('moroMansionSave', JSON.stringify(saveData));
  };

  const handleSave = () => {
    saveGameData();
    setHasSavedGame(true);
    toast.success('게임이 저장되었습니다.');
  };

  // 저장 자동화: 노드 이동, 인벤토리 변경, 선택지 기록 시 자동 저장
  useEffect(() => {
    if (!isLoading && currentNodeId !== 'start') {
      saveGameData();
    }
  }, [currentNodeId, inventory, selectedChoices, showEvidenceGuide, insights]);

  const handleStart = () => {
    // 🔒 리셋 중이면 무시
    if (isResettingRef.current) {
      console.log('🔒 Reset in progress, ignoring start');
      return;
    }

    isResettingRef.current = true;
    console.log('🎬 Starting new game...');
    
    // 🔄 게임 초기화
    setCurrentNodeId('start');
    setVisitedNodes(['start']);
    setInventory([]);
    setHistory([{ nodeId: 'start', inventory: [] }]);
    setViewedItems([]);
    setSelectedChoices({});
    setDialogueHistory([]);
    setInsights([]);
    setCurrentInsightNotification(null);
    setIsPlayingLoadedGame(false);
    
    // 🔒 오프닝 완료 플래그 초기화
    isOpeningCompleteRef.current = false;
    
    // 🎬 오프닝 시퀀스 표시
    setShowIntro(false);
    setShowOpeningSequence(true);
    
    // 저장 데이터 삭제
    localStorage.removeItem('moroMansionSave');
    setHasSavedGame(false);
    
    // 짧은 딜레이 후 리셋 플래그 해제
    setTimeout(() => {
      isResettingRef.current = false;
      console.log('🔓 Reset complete');
    }, 500);
  };

  const handleGoHome = () => {
    setShowIntro(true);
    setShowOpeningSequence(false);
    
    // 홈으로 갈 때 저장된 게임 확인
    const savedData = localStorage.getItem('moroMansionSave');
    setHasSavedGame(!!savedData);
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem('moroMansionSave');
    if (savedData) {
      const data: SaveData = JSON.parse(savedData);
      setCurrentNodeId(data.currentNodeId);
      setVisitedNodes(data.visitedNodes);
      setInventory(data.inventory);
      setHistory(data.history || [{ nodeId: data.currentNodeId, inventory: data.inventory }]);
      setViewedItems(data.viewedItems || []);
      setSelectedChoices(data.selectedChoices || {});
      setShowEvidenceGuide(data.showEvidenceGuide || false);
      setDialogueHistory(data.dialogueHistory || []); // 📜 대화 로그 복원
      setInsights(data.insights || []); // 💭 감정적 통찰 복원
      setIsPlayingLoadedGame(true);
      setShowIntro(false);
    }
  };

  const handleItemViewed = (item: string) => {
    setViewedItems(prev => {
      if (prev.includes(item)) {
        return prev;
      }
      return [...prev, item];
    });
  };
  
  // 엔딩 후 홈으로 (이어하기 버튼 제거됨)
  const handleContinueAfterEnding = () => {
    handleGoHome();
  };
  
  // 🎬 크레딧 완료 핸들러
  const handleCreditsComplete = () => {
    console.log('🎬 Credits complete, returning to title');
    setShowCredits(false);
    // 저장 데이터 삭제 (엔딩을 봤으므로)
    localStorage.removeItem('moroMansionSave');
    setHasSavedGame(false);
    handleGoHome();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        {/* 간단한 로딩 표시 */}
        <div className="text-amber-500 text-xl animate-pulse">Loading...</div>
      </div>
    );
  }
  
  // 📜 대화 추가 핸들러
  const addToDialogueHistory = (line: DialogueLine) => {
    setDialogueHistory(prev => [...prev, line]);
  };

  // 💭 감정적 통찰 획득 핸들러
  const handleGainInsight = (insightId: string) => {
    if (!insights.includes(insightId)) {
      setInsights(prev => [...prev, insightId]);
      
      // 💭 알림 표시
      const insight = insightsData[insightId];
      if (insight) {
        setCurrentInsightNotification(insight);
      }
      
      // 저장
      saveGameData();
    }
  };

  // 💭 통찰 알림 닫기 핸들러
  const handleCloseInsightNotification = () => {
    setCurrentInsightNotification(null);
  };

  // 🔄 노드가 유효하지 않으면 간단한 로딩 표시
  if (!currentNode && !showIntro && !showOpeningSequence) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-amber-500 text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  // 🎵 전역 음악 재생 컴포넌트 - 화면 전환 시에도 유지됨
  return (
    <>
      <BackgroundSound track={currentTrack} />
      
      {showIntro && (
        <>
          <IntroScreen 
            onStart={handleStart} 
            onLoad={handleLoad} 
            hasSavedGame={hasSavedGame} 
          />
          <Toaster />
        </>
      )}
      
      {showOpeningSequence && (
        <>
          <OpeningSequence onComplete={handleOpeningComplete} />
          <Toaster />
        </>
      )}
      
      {!showIntro && !showOpeningSequence && (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
          <GameScreen
            node={currentNode}
            onChoice={handleChoice}
            onGoHome={handleGoHome}
            onSave={handleSave}
            inventory={inventory}
            visitedCount={visitedNodes.length}
            isPlayingLoadedGame={isPlayingLoadedGame}
            onGoBack={handleGoBack}
            viewedItems={viewedItems}
            onViewItem={handleItemViewed}
            onContinueAfterEnding={handleContinueAfterEnding}
            selectedChoices={selectedChoices}
            showEvidenceGuide={showEvidenceGuide}
            onToggleEvidenceGuide={setShowEvidenceGuide}
            dialogueHistory={dialogueHistory}
            onAddToDialogueHistory={addToDialogueHistory}
            visitedNodes={visitedNodes}
          />
          <Toaster />
          {currentInsightNotification && (
            <InsightNotification 
              insight={currentInsightNotification} 
              onClose={handleCloseInsightNotification} 
            />
          )}
        </div>
      )}
      
      {showCredits && (
        <Credits 
          endingType={creditsEndingType} 
          onComplete={handleCreditsComplete} 
        />
      )}
    </>
  );
}