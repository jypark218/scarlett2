/**
 * 🎭 3명의 용의자 시스템
 * 
 * 호프, 스탠거슨, 드레버가 각각 진범이 될 수 있는 시나리오
 * 총 10개 엔딩: 진엔딩 1개 + 굿엔딩 2개 + 배드엔딩 7개
 */

import { suspectChoiceHub } from './suspect-routes';
import { badEndings } from './bad-endings';
import { hubToSuspectsBridge } from './hub-to-suspects-bridge';
import { evidenceAcquisitionImproved } from './evidence-acquisition-improved';
import { freeChoiceRoutes } from './free-choice-routes';

// 모든 새로운 노드 통합
export const threeSuspectsSystem = {
  ...evidenceAcquisitionImproved,  // ✅ 증거 획득 노드
  ...hubToSuspectsBridge,  // ✅ 허브 → 용의자 선택 연결
  ...suspectChoiceHub,
  ...badEndings,
  ...freeChoiceRoutes  // ✅ 자유 선택 시스템
};

/**
 * 📊 엔딩 통계
 * 
 * 🌟 진엔딩 (1개):
 *   - true_ending_mercy: 호프가 백작을 용서하고 모두 구원받음
 * 
 * ✅ 굿 엔딩 (4개):
 *   - good_ending_stangerson: 스탠거슨의 배신 저지
 *   - good_ending_drebber: 드레버의 음모 저지
 *   - good_ending_hope_innocent: 호프가 무죄로 밝혀짐 (NEW!)
 *   - good_ending_watson_hero: 왓슨의 용기로 모두 구함 (NEW!)
 * 
 * ❌ 배드 엔딩 (7개):
 *   호프 관련:
 *     - bad_hope_wrong_deduction: 호프가 진범이 아니라고 오판
 *     - bad_hope_violence: 호프와 싸우다 왓슨 사망
 *     - bad_hope_count_suicide: 백작이 자살
 *   
 *   스탠거슨 관련:
 *     - bad_stangerson_betrayal: 스탠거슨의 배신을 놓침
 *     - bad_stangerson_innocent_dies: 잘못된 추리로 백작 사망
 *   
 *   드레버 관련:
 *     - bad_drebber_hidden_truth: 드레버가 진범임을 모르고 호프 누명
 *     - bad_holmes_dies: 드레버의 함정에 걸려 홈즈 사망
 * 
 * 총계: 1 (진엔딩) + 4 (굿엔딩) + 7 (배드엔딩) = 12개 엔딩 ✅
 * 
 * 🎭 진범 자유도:
 *   - 호프가 범인인 경우: hope_route_start → hope_persuade_mercy → true_ending_mercy
 *   - 스탠거슨이 범인인 경우: stangerson_route_start → stangerson_save_count → good_ending_stangerson
 *   - 드레버가 범인인 경우: drebber_route_start → drebber_save_holmes → good_ending_drebber
 *   - 호프가 무죄인 경우: hope_route_start → hope_doubt_culprit → good_ending_hope_innocent
 *   - 스탠거슨이 무죄인 경우: stangerson_route_start → stangerson_fight → stangerson_innocent_route → good_ending_drebber
 *   
 * 🔀 플레이어의 선택에 따라 누구든 범인이 될 수 있음!
 */