/**
 * 캐릭터 데이터 및 대화 시스템 통합 export
 * (하위 호환성 유지를 위한 리엑스포트)
 */

// 타입
export type { CharacterData, DialogueLine } from '../types/dialogue';

// 캐릭터 데이터
export { characterData, characters, characterPortraits } from './characters';

// 대화 파싱
export { parseDialogue } from '../utils/dialogue/parser';
