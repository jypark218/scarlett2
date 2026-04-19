/**
 * 노드 관련 헬퍼 함수
 */

/**
 * 허브 노드 여부 확인
 * 허브 노드: 여러 선택지가 있고, 조사 후 같은 노드로 돌아오는 노드
 */
export function isHubNode(nodeId: string): boolean {
  return nodeId.includes('continue_investigation') || 
         nodeId.includes('main_entrance') || 
         nodeId === 'main_entrance' ||
         nodeId === 'investigation_hub';
}

/**
 * 엔딩 노드 여부 확인
 */
export function isEndingNode(nodeId: string): boolean {
  const id = nodeId.toLowerCase();
  return id.includes('ending') || id.includes('epilogue') || id.includes('final_');
}

/**
 * 프롤로그 노드 여부 확인
 */
export function isPrologueNode(nodeId: string): boolean {
  const id = nodeId.toLowerCase();
  
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
    // arrive_mansion은 챕터 1이므로 제외
    return !(id === 'arrive_mansion' || id.includes('arrive_mansion'));
  }
  
  return false;
}
