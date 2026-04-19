/**
 * 스탠거슨 집사 추궁 시퀀스
 * 서재에서 스탠거슨을 심문하며 그의 과거와 비밀을 파헤치는 깊이 있는 서사
 * 
 * ⚠️ 이 파일은 하위호환성을 위해 유지됩니다.
 * 실제 노드들은 /data/story/interrogations/ 폴더에 분리되어 있습니다.
 */

import { StoryNode } from '../../types';
import { allInterrogationNodes } from './interrogations/index';

// 기존 import 호환성을 위해 export
export const stangersonInterrogation: Record<string, StoryNode> = allInterrogationNodes;
