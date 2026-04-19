/**
 * 배경 매칭 규칙 (노드 ID → 배경 ID)
 */

/**
 * 스토리 노드 ID를 기반으로 적절한 배경을 자동 추천하는 함수
 */
export function getBackgroundForNode(nodeId: string): string {
  const id = nodeId.toLowerCase();
  
  // ============================================================
  // 🎯 프롤로그 (최우선 순위) - 베이커가 고정
  // ============================================================
  
  // 여관은 프롤로그 체크보다 우선! (inn_morning_evidence 등의 충돌 방지)
  if (id.includes('inn') || id.includes('여관')) return 'inn_lobby';
  
  // 프롤로그 관련 모든 노드는 베이커가 배경
  if (id.includes('start') || id.includes('morning') || id.includes('newspaper') ||
      id.includes('cocaine') || id.includes('knock') || id.includes('excitement') ||
      id.includes('gregson') || id.includes('shocked') || id.includes('calm') ||
      id.includes('rache') || id.includes('shiver') || id.includes('urge') ||
      id.includes('agree') || id.includes('gear') || id.includes('ready') ||
      id.includes('depart') || id.includes('leave') || id.includes('chapter1_starts') ||
      id.includes('research_order') || id.includes('research_count') ||
      id.includes('ask_details') || id.includes('second_playthrough') ||
      id.includes('research_count_deeper') || id.includes('ask_details_deeper') ||
      id.includes('thorough_investigation')) {
    return 'baker_street';
  }
  
  // ============================================================
  // 우선순위 높은 패턴 (더 구체적인 것부터)
  // ============================================================
  
  if (id.includes('arrive') || id.includes('mansion') && id.includes('exterior')) return 'mansion_exterior';
  
  // main_entrance 노드는 항상 현관 (다른 조건보다 먼저 체크)
  if (id.includes('main_entrance')) return 'mansion_entrance';
  
  // 뒷뜰 체크를 entrance보다 먼저! (back_entrance가 mansion_entrance로 잘못 매칭되는 것 방지)
  if (id.includes('backyard') || id.includes('뒷뜰') || 
      id.includes('back_entrance') || id.includes('footprints') || 
      id.includes('examine_broken_window')) return 'backyard';
  
  // 저택 입구
  if (id.includes('entrance') || id.includes('main_hall')) return 'mansion_entrance';
  
  // ============================================================
  // 일반 패턴 (알파벳 순)
  // ============================================================
  
  // 부엌
  if (id.includes('kitchen') || id.includes('부엌')) return 'kitchen';
  
  if (id.includes('library') || id.includes('서재')) return 'library';
  if (id.includes('study') || id.includes('연구')) return 'study_room';
  if (id.includes('dining') || id.includes('식당')) return 'dining_room';
  if (id.includes('bedroom') || id.includes('침실') || id.includes('wardrobe') || id.includes('drawer') || id.includes('search_clothes')) return 'bedroom';
  if (id.includes('basement') || id.includes('지하') || id.includes('tunnel_basement')) return 'basement';
  if (id.includes('secret') || id.includes('hidden') || id.includes('passage') || id.includes('tunnel')) return 'secret_passage';
  if (id.includes('well') || id.includes('우물')) return 'well';
  if (id.includes('garden') || id.includes('정원')) return 'garden';
  if (id.includes('ritual') || id.includes('ceremony')) return 'ritual_chamber';
  if (id.includes('corridor') || id.includes('hallway') || id.includes('upstairs') || id.includes('meet_drebber')) return 'dark_corridor';
  if (id.includes('court') || id.includes('법정')) return 'courtroom';
  if (id.includes('street') || id.includes('london')) return 'london_street';
  
  // 기본값: 저택 외부
  return 'mansion_exterior';
}

/**
 * 노드 ID로부터 location(공간) 추출 - 같은 공간에 있는 동안 배경 유지
 */
export function getLocationFromNode(nodeId: string): string {
  const id = nodeId.toLowerCase();
  
  // ============================================================
  // 🎯 프롤로그 (Day 0) - 모든 베이커 스트리트 장면
  // ============================================================
  
  // 여관은 프롤로그 체크보다 우선! (inn_morning_evidence 등의 충돌 방지)
  if (id.includes('inn') || id.includes('여관')) return 'inn_lobby';
  
  if (id.includes('start') || id.includes('morning') || id.includes('newspaper') ||
      id.includes('cocaine') || id.includes('knock') || id.includes('excitement') ||
      id.includes('gregson') || id.includes('shocked') || id.includes('calm') ||
      id.includes('rache') || id.includes('shiver') || id.includes('urge') ||
      id.includes('agree') || id.includes('gear') || id.includes('ready') ||
      id.includes('depart') || id.includes('leave') || id.includes('chapter1_starts') ||
      id.includes('research_order') || id.includes('research_count') ||
      id.includes('ask_details') || id.includes('second_playthrough') ||
      id.includes('research_count_deeper') || id.includes('ask_details_deeper') ||
      id.includes('thorough_investigation')) {
    return 'baker_street';
  }
  
  // ============================================================
  // 특수 장소 (우선순위 높음)
  // ============================================================
  
  // 저택 외부
  if (id.includes('arrive') || (id.includes('mansion') && id.includes('exterior'))) return 'mansion_exterior';
  
  // main_entrance 노드는 항상 현관 (다른 조건보다 먼저 체크)
  if (id.includes('main_entrance')) return 'mansion_entrance';
  
  // 뒷뜰 체크를 entrance보다 먼저! (back_entrance가 mansion_entrance로 잘못 매칭되는 것 방지)
  if (id.includes('backyard') || id.includes('뒷뜰') || 
      id.includes('back_entrance') || id.includes('footprints') || 
      id.includes('examine_broken_window')) return 'backyard';
  
  // 저택 입구
  if (id.includes('entrance') || id.includes('main_hall')) return 'mansion_entrance';
  
  // ============================================================
  // 일반 장소 (알파벳 순)
  // ============================================================
  
  // 부엌
  if (id.includes('kitchen') || id.includes('부엌')) return 'kitchen';
  
  // 서재
  if (id.includes('library') || id.includes('서재')) return 'library';
  
  // 연구실
  if (id.includes('study') || id.includes('연구')) return 'study_room';
  
  // 식당
  if (id.includes('dining') || id.includes('식당')) return 'dining_room';
  
  // 침실
  if (id.includes('bedroom') || id.includes('침실') || id.includes('wardrobe') || id.includes('drawer') || id.includes('search_clothes')) return 'bedroom';
  
  // 지하실
  if (id.includes('basement') || id.includes('지하') || id.includes('tunnel_basement')) return 'basement';
  
  // 비밀 통로
  if (id.includes('secret') || id.includes('hidden') || id.includes('passage') || id.includes('tunnel')) return 'secret_passage';
  
  // 우물
  if (id.includes('well') || id.includes('우물')) return 'well';
  
  // 정원
  if (id.includes('garden') || id.includes('정원')) return 'garden';
  
  // 의식실
  if (id.includes('ritual') || id.includes('ceremony')) return 'ritual_chamber';
  
  // 복
  if (id.includes('corridor') || id.includes('hallway') || id.includes('upstairs') || id.includes('meet_drebber')) return 'dark_corridor';
  
  // 법정
  if (id.includes('court') || id.includes('법정')) return 'courtroom';
  
  // 거리
  if (id.includes('street') || id.includes('london')) return 'london_street';
  
  // 기본값: 저택 외부
  return 'mansion_exterior';
}