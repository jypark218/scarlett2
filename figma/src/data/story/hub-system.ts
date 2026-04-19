/**
 * 허브 시스템: 1차 선택지에서 여러 경로 탐색 가능
 * main_entrance를 허브로 만들어 각 시퀀스 완료 후 돌아올 수 있게 함
 * 
 * ⚠️ 이 파일은 하위호환성을 위해 유지됩니다.
 * 실제 노드들은 /data/story/locations/ 폴더에 분리되어 있습니다.
 */

import { StoryNode } from '../../types/story';
import { allLocationNodes } from './locations/index';

// 기존 import 호환성을 위해 export
export const hubSystem: Record<string, StoryNode> = allLocationNodes;
