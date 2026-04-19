/**
 * 챕터 감지 시스템
 * 노드 ID를 기반으로 현재 챕터를 결정
 */

/**
 * 노드 ID를 기반으로 챕터 이름을 반환
 */
export function getChapterName(nodeId: string): string {
  const id = nodeId.toLowerCase();
  
  // ============================================================
  // 프롤로그 (Day 0의 모든 노드, chapter1_starts까지)
  // ============================================================
  // ✅ arrive_mansion은 챕터 1 시작이므로 프롤로그에서 제외
  if (id.includes('start') || id.includes('morning') || id.includes('newspaper') ||
      id.includes('cocaine') || id.includes('knock') || id.includes('excitement') ||
      id.includes('gregson') || id.includes('shocked') || id.includes('calm') ||
      id.includes('holmes_continue') || id.includes('watson_shocked') ||
      id.includes('gregson_background') || id.includes('holmes_knows') || 
      id.includes('gregson_incident') || id.includes('watson_chilled') || 
      id.includes('gregson_disappearance') || id.includes('holmes_interested') ||
      id.includes('gregson_photo') || id.includes('watson_sees') || 
      id.includes('holmes_rache') || id.includes('watson_shiver') || 
      id.includes('watson_urge') || id.includes('holmes_agree') ||
      id.includes('watson_gear') || id.includes('gregson_ready') || 
      id.includes('watson_ready') || id.includes('holmes_depart') ||
      id.includes('watson_leave') || id.includes('chapter1_starts') ||
      id.includes('research_order') || id.includes('research_count') ||
      id.includes('ask_details') || id.includes('second_playthrough') || 
      id.includes('research_count_deeper') || id.includes('ask_details_deeper') || 
      id.includes('thorough_investigation')) {
    // ✅ arrive_mansion 제외 - 챕터 1이므로
    if (!id.includes('arrive_mansion')) {
      return '프롤로그';
    }
  }
  
  // ============================================================
  // 챕터 2: 서재 및 1층 탐색
  // ============================================================
  // (먼저 체크해서 continue_investigation과 충돌 방지)
  if (id.includes('study_room') || id.includes('stangerson') || 
      id.includes('diary') || id.includes('continue_investigation_1') ||
      id.includes('kitchen')) {
    return '챕터 2';
  }
  
  // ============================================================
  // 챕터 3: 2층 탐색 및 드레버
  // ============================================================
  if (id.includes('upstairs') || id.includes('drebber') || 
      id.includes('bedroom') || id.includes('wardrobe') || 
      id.includes('window') || id.includes('continue_investigation_2')) {
    return '챕터 3';
  }
  
  // ============================================================
  // 챕터 4: 뒷뜰 및 추가 조사
  // ============================================================
  if (id.includes('backyard') || id.includes('back_entrance') || 
      id.includes('well') || 
      (id.includes('hope') && !id.includes('ask_hope_name') && !id.includes('investigate_carriage'))) {
    return '챕터 4';
  }
  
  // ============================================================
  // 챕터 5: 심문 및 추리
  // ============================================================
  if (id.includes('interrogation') || id.includes('suspect') || 
      id.includes('hub_after') || id.includes('all_clues')) {
    return '챕터 5';
  }
  
  // ============================================================
  // 챕터 1: 저택 도착 후 초기 탐색 (main_entrance 이후)
  // ============================================================
  if (id === 'arrive_mansion' || id.includes('arrive_mansion') ||
      id === 'main_entrance' || 
      id.includes('main_entrance_return') || id.includes('investigate_carriage') ||
      id.includes('search_carriage') || id === 'ask_hope_name') {
    return '챕터 1';
  }
  
  // ============================================================
  // 엔딩
  // ============================================================
  if (id.includes('ending') || id.includes('epilogue') || 
      id.includes('final_')) {
    return '엔딩';
  }
  
  // 기본값
  return '챕터 1';
}

/**
 * 프롤로그 건너뛰기 가능 여부 확인
 */
export function canSkipPrologue(nodeId: string): boolean {
  const chapter = getChapterName(nodeId);
  
  // 프롤로그이고, arrive_mansion이 아닌 경우에만 건너뛰기 가능
  if (chapter === '프롤로그') {
    const id = nodeId.toLowerCase();
    return !(id === 'arrive_mansion' || id.includes('arrive_mansion'));
  }
  
  return false;
}