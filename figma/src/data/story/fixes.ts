// 스토리 논리적 오류 수정 패치
// 이 파일의 노드들을 storyData.ts에 병합하여 사용

import { StoryNode } from '../../types/story';

export const storyFixes: Record<string, StoryNode> = {
  // 의사 대사 수정 - 화자 명시
  call_doctor: {
    id: 'call_doctor',
    day: 1,
    timeOfDay: 'evening',
    text: '급히 의사를 부른다. 의사가 도착하여 백작을 진찰한다.\n\n의사가 진단을 내린다. "독의 양이 치명적이지는 않습니다. 하지만 빨리 치료하지 않으면..."',
    choices: [
      { text: '백작을 구한다', nextNode: 'ending_count_saved' },
      { text: '너무 늦었다', nextNode: 'ending_count_dies' }
    ]
  }
};
