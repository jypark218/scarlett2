// 스토리 노드 생성 헬퍼 함수들
import { StoryNode, Choice } from '../types/story';

/**
 * 기본 스토리 노드 생성
 */
export function createNode(params: {
  id: string;
  text: string;
  choices: Choice[];
  day?: number;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
  character?: string;
  background?: string;
}): StoryNode {
  return {
    id: params.id,
    day: params.day || 1,
    timeOfDay: params.timeOfDay || 'afternoon',
    text: params.text,
    choices: params.choices,
    ...(params.character && { character: params.character }),
    ...(params.background && { background: params.background })
  };
}

/**
 * 엔딩 노드 생성
 */
export function createEnding(params: {
  id: string;
  text: string;
  day?: number;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
  endingType: 'good' | 'bad' | 'normal';
}): StoryNode {
  return {
    id: params.id,
    day: params.day || 2,
    timeOfDay: params.timeOfDay || 'evening',
    text: params.text,
    isEnding: true,
    endingType: params.endingType,
    choices: []
  };
}

/**
 * 선택지 생성
 */
export function createChoice(params: {
  text: string;
  nextNode: string;
  item?: string;
  requiredItem?: string;
}): Choice {
  return {
    text: params.text,
    nextNode: params.nextNode,
    ...(params.item && { item: params.item }),
    ...(params.requiredItem && { requiredItem: params.requiredItem })
  };
}

/**
 * 대화 체인 생성 (여러 노드를 순차적으로 연결)
 */
export function createDialogueChain(params: {
  baseId: string;
  texts: string[];
  finalChoices: Choice[];
  day?: number;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
  character?: string;
}): Record<string, StoryNode> {
  const nodes: Record<string, StoryNode> = {};
  const { baseId, texts, finalChoices, day, timeOfDay, character } = params;

  texts.forEach((text, index) => {
    const nodeId = index === 0 ? baseId : `${baseId}_${index}`;
    const isLast = index === texts.length - 1;

    nodes[nodeId] = {
      id: nodeId,
      day: day || 1,
      timeOfDay: timeOfDay || 'afternoon',
      text,
      choices: isLast 
        ? finalChoices 
        : [{ text: '계속한다', nextNode: `${baseId}_${index + 1}` }],
      ...(character && { character })
    };
  });

  return nodes;
}

/**
 * 조사 노드 템플릿 (조사 → 결과 발견 → 다음 선택)
 */
export function createInvestigationNode(params: {
  id: string;
  location: string;
  clue: string;
  nextChoices: Choice[];
  day?: number;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
}): StoryNode {
  return {
    id: params.id,
    day: params.day || 1,
    timeOfDay: params.timeOfDay || 'afternoon',
    text: `${params.location}을(를) 조사합니다.\n\n${params.clue}`,
    choices: params.nextChoices
  };
}

/**
 * 캐릭터 대화 노드 템플릿
 */
export function createCharacterDialogue(params: {
  id: string;
  character: string;
  dialogue: string;
  watsonResponse?: string;
  choices: Choice[];
  day?: number;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
}): StoryNode {
  const text = params.watsonResponse
    ? `"${params.dialogue}"\n\n${params.watsonResponse}`
    : `"${params.dialogue}"`;

  return {
    id: params.id,
    day: params.day || 1,
    timeOfDay: params.timeOfDay || 'afternoon',
    character: params.character,
    text,
    choices: params.choices
  };
}

/**
 * 분기 노드 생성 (조건부 선택지)
 */
export function createBranchNode(params: {
  id: string;
  question: string;
  branches: {
    text: string;
    nextNode: string;
    requiredItem?: string;
  }[];
  day?: number;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
}): StoryNode {
  return {
    id: params.id,
    day: params.day || 1,
    timeOfDay: params.timeOfDay || 'afternoon',
    text: params.question,
    choices: params.branches.map(branch => ({
      text: branch.text,
      nextNode: branch.nextNode,
      ...(branch.requiredItem && { requiredItem: branch.requiredItem })
    }))
  };
}

/**
 * 노드 그룹 생성 (관련된 노드들을 한번에)
 */
export function createNodeGroup(
  nodes: StoryNode[]
): Record<string, StoryNode> {
  const group: Record<string, StoryNode> = {};
  
  for (const node of nodes) {
    group[node.id] = node;
  }
  
  return group;
}

/**
 * 템플릿 문자열 대체
 */
export function replaceTemplateVars(
  text: string,
  vars: Record<string, string>
): string {
  let result = text;
  
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  
  return result;
}

/**
 * 빠른 선택지 배열 생성
 */
export function choices(...items: [string, string][]): Choice[] {
  return items.map(([text, nextNode]) => ({ text, nextNode }));
}

/**
 * 아이템 획득 선택지
 */
export function itemChoice(text: string, nextNode: string, item: string): Choice {
  return { text, nextNode, item };
}

/**
 * 아이템 필요 선택지
 */
export function requiredItemChoice(
  text: string,
  nextNode: string,
  requiredItem: string
): Choice {
  return { text, nextNode, requiredItem };
}
