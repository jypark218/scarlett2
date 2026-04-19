/**
 * 2층 관련 노드
 * 침실, 2층 탐색 종료 노드만 포함
 * (드레버 대면은 drebberNodes.ts 사용)
 */

import { StoryNode } from '../../../types/story';

export const upstairsNodes: Record<string, StoryNode> = {
  // ========== upstairs_end는 hub-to-suspects-bridge.ts에서 정의됨 (중복 제거) ==========
  
  // ========== 서랍장 조사 ==========
  bedroom_drawer: {
    id: 'bedroom_drawer',
    day: 1,
    timeOfDay: 'evening',
    location: 'bedroom',
    text: `서랍장에 다가간다.

가장 위 서랍에 정교한 자물쇠가 달려있다. 은빛 금속에 장미 문양이 새겨져 있다.

홈즈가 자물쇠를 살핀다.

[홈즈]: 여성용 장신구 상자에 쓰는 자물쇠군. 특별한 열쇠가 필요할 거야.`,
    conditionalText: [
      {
        // 가짜 유언장을 읽은 후
        condition: (context) => context.visitedNodes.includes('will_examine_forgery'),
        text: `서랍장에 다가간다.

가장 위 서랍에 정교한 자물쇠가 달려있다. 은빛 금속에 장미 문양이 새겨져 있다.

홈즈가 말한다.

[홈즈]: 책상 위 유언장이 위조라면... 진짜는 여기 있을지도 몰라. 이 서랍에는 백작이 정말로 중요하게 여긴 것들이 보관되어 있을 거야.`
      }
    ],
    choices: [
      { text: '서랍 열쇠로 연다', nextNode: 'bedroom_drawer_unlocked', requiredItem: 'drawer_key' },
      { text: '강제로 열어본다', nextNode: 'bedroom_drawer_force' },
      { text: '다른 곳을 조사한다', nextNode: 'bedroom' }
    ]
  },
  
  bedroom_drawer_force: {
    id: 'bedroom_drawer_force',
    day: 1,
    timeOfDay: 'evening',
    location: 'bedroom',
    text: `서랍을 강제로 열려고 시도했지만... 자물쇠가 너무 견고하다.

홈즈가 말한다.

[홈즈]: 무리하게 부수면 안의 물건이 손상될 수 있어. 열쇠를 찾는 게 나을 거야.`,
    choices: [
      { text: '다른 방법을 찾아본다', nextNode: 'bedroom_drawer' },
      { text: '일단 돌아간다', nextNode: 'bedroom' }
    ]
  },
  
  bedroom_drawer_unlocked: {
    id: 'bedroom_drawer_unlocked',
    day: 1,
    timeOfDay: 'evening',
    location: 'bedroom',
    text: `서랍 열쇠를 자물쇠에 꽂았다. 딸깍, 부드럽게 열린다.

서랍 안에는... 오래된 봉투와 편지들이 가지런히 정리되어 있다.

홈즈가 조심스럽게 봉투를 집어든다.

[홈즈]: 왓슨, 이것 봐...`,
    choices: [
      { text: '유언장을 읽는다', nextNode: 'acquire_ellen_will' }
    ]
  }
};