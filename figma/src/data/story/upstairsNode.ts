import { StoryNode } from '../../types';

/**
 * 2층 복도 노드 (수정된 버전)
 * 드레버가 갑자기 나오는 문제를 해결
 */

export const upstairsNode: Record<string, StoryNode> = {
  upstairs: {
    id: 'upstairs',
    day: 1,
    timeOfDay: 'afternoon',
    conditionalText: [
      {
        // 이미 2층의 선택지를 하나라도 본 경우 (재방문)
        condition: (context) => {
          const upstairsChoices = ['meet_drebber', 'bedroom', 'bedroom_drawer', 'wardrobe'];
          return upstairsChoices.some(node => context.visitedNodes.includes(node));
        },
        text: `2층 복도로 돌아왔다.\\n\\n홈즈가 주변을 살핀다. \"다시 살펴보자.\"`
      }
    ],
    text: `2층 복도는 어둡고 음산하다. 낡은 융단이 깔린 긴 복도 양쪽으로 여러 개의 방문이 보인다.\\n\\n홈즈가 주변을 살핀다. \"침실이 보이는군. 그리고 이 복도 어딘가에 용의자가 있을지도 몰라.\"\\n\\n복도 끝에서 담배 연기 냄새가 난다.`,
    choices: [
      { 
        text: '복도 끝을 조사한다', 
        nextNode: 'meet_drebber'
        // hideIfVisitedNode 제거 - 플레이어가 다시 드레버에게 갈 수 있어야 함
      },
      { text: '침실을 조사한다', nextNode: 'bedroom_hub' },
      { text: '👀 (복도 끝에 그림자가...)', nextNode: 'hallway_shadow_event', requiredVisitedNode: 'bedroom' },
      { text: '1층으로 내려간다', nextNode: 'main_entrance_return_upstairs' }
    ]
  }
};