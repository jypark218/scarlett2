/**
 * Figma TypeScript 스토리 데이터를 Unity JSON 형식으로 변환
 * 실행: npx tsx figma/scripts/toUnityJson.ts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { storyData } from '../src/data/storyData';
import type { StoryNode as TSNode, Choice as TSChoice } from '../src/types/story';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Unity 타입 정의 ─────────────────────────────────────────────

interface UnityCondition {
  items?: string[];
  nodes?: string[];
  anyNodes?: string[];
  minPlayCount?: number;
  blockIfItems?: string[];
  blockIfNodes?: string[];
  blockIfAllNodes?: string[];
}

interface UnityEffect {
  itemsGranted?: string[];
  insightsGranted?: string[];
  flags?: string[];
  endingsUnlocked?: string[];
}

interface UnityChoice {
  text: string;
  nextNodeId: string;
  req?: UnityCondition;
  effect?: UnityEffect;
  puzzleType?: string;
}

interface UnityNode {
  id: string;
  speakerId?: string;
  text: string;
  nextNodeId?: string;
  locationId?: string;
  backgroundId?: string;
  choices?: UnityChoice[];
  isEnding?: boolean;
  endingType?: string;
  shake?: boolean;
  day?: number;
  timeOfDay?: string;
  grantInsights?: string[];
  archiveId?: string;
}

// ─── 헬퍼 함수 ────────────────────────────────────────────────────

function mergeUnique(arr: string[] | undefined, ...items: (string | undefined)[]): string[] | undefined {
  const base = arr ? [...arr] : [];
  for (const item of items) {
    if (item && !base.includes(item)) base.push(item);
  }
  return base.length > 0 ? base : undefined;
}

function convertCondition(choice: TSChoice): UnityCondition | undefined {
  const cond: UnityCondition = {};

  // 아이템 보유 필요
  let items: string[] = [];
  if (choice.requiredItem) items.push(choice.requiredItem);
  if (choice.showIf?.hasItem) items.push(choice.showIf.hasItem);
  if (choice.requirement?.item) items.push(choice.requirement.item);
  if (choice.requirement?.items) items.push(...choice.requirement.items);
  if (choice.requiredInsight) items.push(choice.requiredInsight);
  items = [...new Set(items)];
  if (items.length > 0) cond.items = items;

  // 노드 방문 필요 (전체)
  let nodes: string[] = [];
  if (choice.requiredVisitedNode) nodes.push(choice.requiredVisitedNode);
  if (choice.showIf?.visitedNode) nodes.push(choice.showIf.visitedNode);
  if (choice.showIf?.visitedAll) nodes.push(...choice.showIf.visitedAll);
  if (choice.requirement?.visitedNode) nodes.push(choice.requirement.visitedNode);
  nodes = [...new Set(nodes)];
  if (nodes.length > 0) cond.nodes = nodes;

  // 노드 방문 필요 (하나라도)
  if (choice.showIf?.visitedAny && choice.showIf.visitedAny.length > 0) {
    cond.anyNodes = [...new Set(choice.showIf.visitedAny)];
  }

  // 아이템 보유 시 숨김
  let blockIfItems: string[] = [];
  if (choice.hideIfHasItem) blockIfItems.push(choice.hideIfHasItem);
  if (choice.hideIf?.hasItem) blockIfItems.push(choice.hideIf.hasItem);
  blockIfItems = [...new Set(blockIfItems)];
  if (blockIfItems.length > 0) cond.blockIfItems = blockIfItems;

  // 노드 방문 시 숨김 (하나라도)
  let blockIfNodes: string[] = [];
  if (choice.hideIfVisitedNode) blockIfNodes.push(choice.hideIfVisitedNode);
  if (choice.hideIf?.visitedNode) blockIfNodes.push(choice.hideIf.visitedNode);
  if (choice.hideIf?.visitedAny) blockIfNodes.push(...choice.hideIf.visitedAny);
  blockIfNodes = [...new Set(blockIfNodes)];
  if (blockIfNodes.length > 0) cond.blockIfNodes = blockIfNodes;

  // 노드 전체 방문 시 숨김
  if (choice.hideIf?.visitedAll && choice.hideIf.visitedAll.length > 0) {
    cond.blockIfAllNodes = [...new Set(choice.hideIf.visitedAll)];
  }

  const hasAnyField = Object.keys(cond).length > 0;
  return hasAnyField ? cond : undefined;
}

function convertEffect(choice: TSChoice): UnityEffect | undefined {
  const effect: UnityEffect = {};

  if (choice.item) effect.itemsGranted = [choice.item];
  if (choice.grantInsight) effect.insightsGranted = [choice.grantInsight];

  const hasAnyField = Object.keys(effect).length > 0;
  return hasAnyField ? effect : undefined;
}

function convertChoice(choice: TSChoice): UnityChoice {
  const unified: UnityChoice = {
    text: choice.text,
    nextNodeId: choice.nextNode ?? '',
  };

  const req = convertCondition(choice);
  if (req) unified.req = req;

  const effect = convertEffect(choice);
  if (effect) unified.effect = effect;

  if (choice.puzzleType) unified.puzzleType = choice.puzzleType;

  return unified;
}

function convertNode(tsNode: TSNode): UnityNode {
  const node: UnityNode = {
    id: tsNode.id,
    text: tsNode.text ?? '',
  };

  // 화자: speaker 우선, 없으면 character
  const speaker = tsNode.speaker || tsNode.character;
  if (speaker) node.speakerId = speaker;

  if (tsNode.nextNode) node.nextNodeId = tsNode.nextNode;
  if (tsNode.location) node.locationId = tsNode.location;
  if (tsNode.background) node.backgroundId = tsNode.background;
  if (tsNode.isEnding) node.isEnding = true;
  if (tsNode.endingType) node.endingType = tsNode.endingType;
  if (tsNode.shake) node.shake = true;
  if (tsNode.day !== undefined && tsNode.day !== 0) node.day = tsNode.day;
  if (tsNode.timeOfDay) node.timeOfDay = tsNode.timeOfDay;

  // 노드 진입 시 인사이트 부여
  if (tsNode.grantInsight) node.grantInsights = [tsNode.grantInsight];

  // 선택지 변환
  if (tsNode.choices && tsNode.choices.length > 0) {
    node.choices = tsNode.choices.map(convertChoice);
  }

  return node;
}

// ─── 메인 변환 ────────────────────────────────────────────────────

const nodes: UnityNode[] = Object.values(storyData).map(convertNode);

const output = { nodes };
const json = JSON.stringify(output, null, 2);

// 출력 경로
const outPath = join(__dirname, '../../Assets/Resources/Story/ScarlettFullGraph.json');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, json, 'utf-8');

console.log(`✅ 변환 완료: ${nodes.length}개 노드`);
console.log(`   출력: ${outPath}`);

// 엔딩 노드 목록 출력
const endings = nodes.filter(n => n.isEnding);
console.log(`\n📋 엔딩 노드 (${endings.length}개):`);
endings.forEach(n => console.log(`   - [${n.endingType ?? 'unknown'}] ${n.id}`));
