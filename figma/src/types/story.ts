export interface Choice {
  text: string;
  nextNode: string;
  item?: string;
  requiredItem?: string;
  hideIfHasItem?: string; // 이 아이템을 이미 가지고 있으면 선택지 숨김
  puzzleType?: 'safe' | 'well'; // 퍼즐 타입 추가
  minPlayCount?: number; // 최소 플레이 횟수 (이 횟수 이상이어야 선택지 표시)
  requiredInsight?: string; // 필요한 감정적 통찰 (진엔딩 선택지 등)
  grantInsight?: string; // 이 선택지를 선택하면 얻는 통찰
  requiredVisitedNode?: string; // 이 노드를 방문했어야만 선택지 표시
  hideIfVisitedNode?: string; // 이 노드를 방문했으면 선택지 숨김 (역조건)
  showIf?: { // 복합 표시 조건 (모든 조건이 만족되어야 표시)
    visitedNode?: string; // 특정 노드를 방문했어야 표시
    visitedAny?: string[]; // 이 중 하나라도 방문했으면 표시
    visitedAll?: string[]; // 모두 방문했어야 표시
    hasItem?: string; // 특정 아이템을 가지고 있어야 표시
  };
  hideIf?: { // 복합 숨김 조건 (하나라도 만족되면 숨김)
    visitedNode?: string; // 특정 노드를 방문했으면 숨김
    visitedAny?: string[]; // 이 중 하나라도 방문했으면 숨김
    visitedAll?: string[]; // 모두 방문했으면 숨김
    hasItem?: string; // 특정 아이템을 가지고 있으면 숨김
  };
  requirement?: { // 복합 조건
    items?: string[]; // 여러 아이템 필요
    item?: string; // 단일 아이템
    visitedNode?: string; // 특정 노드 방문 필요
  };
}

export interface StoryNode {
  id: string;
  text: string;
  conditionalText?: Array<{
    condition: { visitedNode?: string; visitedAny?: string[]; visitedAll?: string[]; hasItem?: string } | ((context: { visitedNodes: string[]; items: string[] }) => boolean);
    text: string;
    priority?: number; // 우선순위 (높을수록 먼저 평가됨, 기본값: 0)
  }>; // 조건에 따라 다른 텍스트 표시
  image?: string;
  background?: string; // 배경 이미지 ID
  speaker?: string; // 화자 (watson, holmes, 등)
  character?: string; // 메인 화자 (stangerson, drebber, hope 등) - parseDialogue에서 사용
  day?: number; // 게임 내 날짜
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night'; // 시간대
  choices?: Choice[];
  nextNode?: string; // 자동으로 다음 노드로 이동 (선택지 없이)
  isEnding?: boolean;
  endingType?: 'good' | 'bad' | 'neutral' | 'true';
  showCredits?: boolean; // 엔딩 후 크레딧 표시 여부
  puzzleType?: 'safe' | 'well'; // 노드 자체가 퍼즐인 경우
  minPlayCount?: number; // 최소 플레이 횟수 (이 횟수 이상이어야 노드 접근 가능)
  nodeType?: 'normal' | 'flashback'; // 노드 타입 (일반 / 회상)
  flashbackCharacter?: string; // 회상의 주인공 캐릭터
  grantInsight?: string; // 이 노드를 보면 얻는 통찰
  shake?: boolean; // 대사창 흔들림 효과
}

// 감정적 통찰 (심리적 이해)
export interface Insight {
  id: string;
  name: string;
  description: string;
  character: string; // 관련 캐릭터
  icon: string; // 아이콘 (emoji)
}

export interface StoryData {
  [key: string]: StoryNode;
}