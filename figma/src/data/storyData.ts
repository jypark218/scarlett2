import { StoryData } from '../types/story';

// ========== 순번별 스토리 파트 ==========
import { part1Opening } from './story/part1-opening';
import { part2FirstFloor } from './story/part2-first-floor';
import { part3SecondFloor } from './story/part3-second-floor';

// ========== 캐릭터별 상세 노드 ==========
import { allCharacterNodes } from './story/characters/index';

// ========== 🗺️ 장소별 노드 ==========
import { allLocationNodes } from './story/locations/index';

// ========== 🔍 심문 노드 ==========
import { allInterrogationNodes } from './story/interrogations/index';

// ========== 추가 노드 및 수정사항 ==========
import { allStoryFixes } from './story/fixes/index';

// ========== 시스템 노드 (허브, 엔딩, 2회차) ==========
import { allSystemNodes } from './story/systems/index';

// ========== 💡 힌트 노드 ==========
import { allHintNodes } from './story/hints/index';

export const storyData: StoryData = {
  // ========== 📚 Part 1: 오프닝 (게임 시작 ~ 저택 도착) ==========
  ...part1Opening,
  
  // ========== 📚 Part 2: 1층 탐색 (현관, 서재, 뒷문) ==========
  ...part2FirstFloor,
  
  // ========== 📚 Part 3: 2층 탐색 ==========
  ...part3SecondFloor,
  
  // ========== 🎭 캐릭터별 상세 노드 ==========
  ...allCharacterNodes,
  
  // ========== 🗺️ 장소별 노드 ==========
  ...allLocationNodes,
  
  // ========== 🔍 심문 노드 ==========
  ...allInterrogationNodes,
  
  // ========== 🔧 추가 노드 및 수정사항 ==========
  ...allStoryFixes,
  
  // ========== 🌐 시스템 노드 (허브, 엔딩, 2회차) ==========
  ...allSystemNodes,
  
  // ========== 💡 힌트 노드 ==========
  ...allHintNodes,
};