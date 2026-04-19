import { StoryNode } from '../../types/story';

/**
 * 🕐 타임라인 잠금 시스템
 * 
 * 목적:
 * 1. Day/TimeOfDay 일관성 유지
 * 2. 과거 시간대 노드 접근 차단
 * 3. 자연스러운 시간 흐름
 * 
 * 시간대:
 * - morning (오전)
 * - afternoon (오후)
 * - evening (저녁)
 * - night (밤)
 */

export const timelineLockNodes: Record<string, StoryNode> = {

  // ═══════════════════════════════════════════════════════
  // 🕐 타임라인 체크포인트
  // ═══════════════════════════════════════════════════════

  timeline_checkpoint_afternoon_to_evening: {
    id: 'timeline_checkpoint_afternoon_to_evening',
    day: 1,
    timeOfDay: 'afternoon',
    character: 'holmes',
    text: `창밖을 보니 해가 기울기 시작한다.

[홈즈]: 왓슨, 시간이 얼마 없어.

[왓슨]: 저녁이 되면...?

[홈즈]: 백작을 찾아야 해. 시간이 지날수록... 위험해질 거야.

홈즈가 시계를 확인한다.

[홈즈]: 서두르자.`,
    choices: [
      { text: '💨 "계속 조사합니다"', nextNode: 'continue_investigation_evening' }
    ]
  },

  continue_investigation_evening: {
    id: 'continue_investigation_evening',
    day: 1,
    timeOfDay: 'evening',
    text: `저녁 시간...

저택에 어둠이 내린다.

램프를 켜고 조사를 계속한다.`,
    choices: [
      { text: '🏠 "현관으로 간다"', nextNode: 'main_entrance' }
    ]
  },

  timeline_checkpoint_evening_to_night: {
    id: 'timeline_checkpoint_evening_to_night',
    day: 1,
    timeOfDay: 'evening',
    character: 'holmes',
    text: `밤이 깊어진다.

[홈즈]: 왓슨, 이제 결정해야 해.

[왓슨]: 무엇을요?

[홈즈]: 진범을 지목하고... 백작을 구하고... 모든 걸 끝낼 시간이야.

홈즈가 당신을 본다.

[홈즈]: 준비됐나?`,
    choices: [
      { text: '💎 "최종 추리를 시작합니다"', nextNode: 'final_deduction_checkpoint' },
      { text: '🔍 "조금 더 조사하겠습니다"', nextNode: 'main_entrance' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🔒 과거 시간대 접근 차단
  // ═══════════════════════════════════════════════════════

  timeline_lock_warning: {
    id: 'timeline_lock_warning',
    day: 1,
    timeOfDay: 'evening',
    speaker: 'watson',
    text: `[시스템 메시지]

이미 지나간 시간대입니다.

현재 시간: 저녁 (Evening)

과거로 돌아갈 수 없습니다.

**[힌트: 현재 시간대에 집중하세요]**`,
    choices: [
      { text: '🔙 "돌아갑니다"', nextNode: 'main_entrance' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🌅 Day 전환 시스템 (2회차용)
  // ═══════════════════════════════════════════════════════

  day_transition_1_to_2: {
    id: 'day_transition_1_to_2',
    day: 1,
    timeOfDay: 'night',
    character: 'holmes',
    text: `[Day 1 종료]

사건은 해결되었지만...

홈즈가 말한다.

[홈즈]: 왓슨, 우리가 놓친 게 있어.

[왓슨]: 뭘 말입니까?

[홈즈]: 진실의 다른 면... 또 다른 가능성...

홈즈가 일기를 펼친다.

[홈즈]: 다시 시작하면... 다른 결말을 볼 수 있을 거야.

**[2회차 시작]**

모든 단서가 해금되었습니다.

이제 자유롭게 탐색할 수 있습니다.`,
    choices: [
      { text: '🔄 "다시 시작합니다"', nextNode: 'start' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // 🎯 시간대별 노드 필터링 헬퍼
  // ═══════════════════════════════════════════════════════

  /**
   * 사용 예시:
   * 
   * {
   *   text: '오전 노드',
   *   nextNode: 'morning_node',
   *   hideIf: (context) => context.currentTimeOfDay !== 'morning'
   * }
   * 
   * {
   *   text: '오후 이후 노드',
   *   nextNode: 'afternoon_node',
   *   showIf: (context) => {
   *     const validTimes = ['afternoon', 'evening', 'night'];
   *     return validTimes.includes(context.currentTimeOfDay);
   *   }
   * }
   */
};

// ═══════════════════════════════════════════════════════
// 🛠️ 유틸리티 함수
// ═══════════════════════════════════════════════════════

export const timelineUtils = {
  /**
   * 현재 시간대가 특정 시간대 이후인지 체크
   */
  isAfterTime: (currentTime: string, targetTime: string): boolean => {
    const timeOrder = ['morning', 'afternoon', 'evening', 'night'];
    const currentIndex = timeOrder.indexOf(currentTime);
    const targetIndex = timeOrder.indexOf(targetTime);
    return currentIndex >= targetIndex;
  },

  /**
   * 현재 시간대가 특정 시간대 범위 내인지 체크
   */
  isTimeInRange: (currentTime: string, startTime: string, endTime: string): boolean => {
    const timeOrder = ['morning', 'afternoon', 'evening', 'night'];
    const currentIndex = timeOrder.indexOf(currentTime);
    const startIndex = timeOrder.indexOf(startTime);
    const endIndex = timeOrder.indexOf(endTime);
    return currentIndex >= startIndex && currentIndex <= endIndex;
  },

  /**
   * 시간대 표시 텍스트
   */
  getTimeText: (time: string): string => {
    const timeTexts: Record<string, string> = {
      morning: '오전',
      afternoon: '오후',
      evening: '저녁',
      night: '밤'
    };
    return timeTexts[time] || time;
  }
};

// ═══════════════════════════════════════════════════════
// 📋 타임라인 가이드
// ═══════════════════════════════════════════════════════

/**
 * 게임 타임라인:
 * 
 * Day 1:
 * - Morning (오전): 저택 도착, 초기 조사
 * - Afternoon (오후): 1-2층 탐색, NPC 만남
 * - Evening (저녁): 지하실 발견, 심문 시작
 * - Night (밤): 최종 추리, 진범 지목, 엔딩
 * 
 * Day 2 (2회차):
 * - 모든 단서 해금
 * - 자유 탐색 모드
 * - 숨겨진 엔딩 해금
 * 
 * 구현 원칙:
 * 1. 시간은 앞으로만 흐른다 (과거 회귀 불가)
 * 2. 중요한 전환점에서만 시간대 변경
 * 3. 플레이어가 시간 흐름을 인지할 수 있도록
 * 4. 2회차에서는 시간 제약 제거 가능
 */
