// 🎵 사운드 트랙 정의
export type SoundTrack = 
  | 'intro_theme'      // 인트로 전용 테마
  | 'main_theme'       // 메인 테마 (저택 외관)
  | 'investigation'    // 조사 테마 (서재, 침실 등)
  | 'tension'          // 긴장감 (중요한 발견)
  | 'mystery'          // 미스터리 (대화 장면)
  | 'revelation';      // 진실 (결말)

// 🎵 사운드 트랙 URL 매핑
export const SOUND_TRACKS: Record<SoundTrack, string> = {
  intro_theme: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c73ac46be7.mp3', // 인트로 전용 - 신비롭고 장엄한 분위기
  main_theme: 'https://cdn.pixabay.com/audio/2023/05/16/audio_b4cc0393d1.mp3',
  investigation: 'https://cdn.pixabay.com/audio/2024/07/03/audio_416c09a92a.mp3',
  tension: 'https://cdn.pixabay.com/audio/2025/09/14/audio_abef9ac625.mp3',
  mystery: 'https://cdn.pixabay.com/audio/2022/10/11/audio_27b5621663.mp3',
  revelation: 'https://cdn.pixabay.com/audio/2021/10/25/audio_05570f2464.mp3',
};

// 🎵 노드별 사운드 트랙 매핑
export function getSoundTrackForNode(
  nodeId?: string,
  background?: string,
  character?: string,
  isIntro?: boolean
): SoundTrack {
  // 인트로 화면 - 전용 인트로 테마
  if (isIntro) {
    return 'intro_theme';
  }

  // 노드 ID 기반 매핑
  if (nodeId) {
    // 🎵 게임 초반부 (프롤로그) - 메인 테마
    if (nodeId.startsWith('start') || 
        nodeId.includes('gregson') || 
        nodeId.includes('watson_') ||
        nodeId.includes('holmes_') ||
        nodeId === 'research_count' ||
        nodeId === 'chapter1_starts') {
      return 'main_theme';
    }
    
    // 저택 도착 후 미스터리 시작
    if (nodeId.startsWith('arrive_mansion') || 
        nodeId.includes('investigate') ||
        nodeId.includes('observe') ||
        nodeId.includes('carriage')) {
      return 'mystery';
    }
    
    // 긴장감 있는 장면
    if (nodeId.includes('bloodstain') || nodeId.includes('struggle') || nodeId.includes('attack')) {
      return 'tension';
    }
    
    // 조사 장면
    if (nodeId.includes('library') || nodeId.includes('bedroom') || nodeId.includes('search')) {
      return 'investigation';
    }
    
    // 결말 장면
    if (nodeId.includes('ending') || nodeId.includes('reveal')) {
      return 'revelation';
    }
  }

  // 배경 기반 매핑
  if (background) {
    if (background.includes('mansion') || background.includes('exterior')) {
      return 'main_theme';
    }
    if (background.includes('library') || background.includes('study')) {
      return 'investigation';
    }
  }

  // 기본값
  return 'mystery';
}

// 🎵 사운드 시스템 활성화 여부
export function isSoundEnabled(): boolean {
  // 개발/프로덕션 모드에 따라 변경 가능
  return true;
}