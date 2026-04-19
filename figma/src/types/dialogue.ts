/**
 * 대화 시스템 타입 정의
 */

export interface CharacterData {
  id: string;
  name: string;
  nameColor: string;
  portraitUrl: string;
}

export interface DialogueLine {
  characterId: string;
  text: string;
  isNarration?: boolean; // ✅ 내래이션 플래그 추가 (왓슨의 시점 설명 등)
  location?: string; // ✅ 대화가 발생한 장소 (로그 필터링용)
  nodeId?: string; // ✅ 대화가 발생한 노드 ID (디버깅용)
}

export interface SpeakerPattern {
  // 캐릭터 호칭들 (예: "홈즈", "그레그슨", "그레그슨 형사")
  names: string[];
  // 행동/발화 동사 (예: "말", "대답", "웃")
  actions: string[];
  // 조사 (예: "이", "가")
  particles: string[];
}

/**
 * 배경 시스템 타입 정의
 */

export interface BackgroundImage {
  id: string;
  name: string;
  url: string;
  description: string;
}