# 변경 사항

## 2024-12-10: 로딩 최적화 및 불필요한 파일 정리

### 삭제된 파일
- `/data/storyData.ts` (사용하지 않는 구버전)
- `/data/storyData_clean.ts` (사용하지 않는 구버전)
- `/data/storyData_fixed.ts` (사용하지 않는 구버전)
- `/fix_story.sh` (불필요한 스크립트)
- `/BACKGROUND_GUIDE.md` (불필요한 문서)
- `/RESPONSIVE_DESIGN.md` (불필요한 문서)

### 유지된 파일
- `/data/storyData_simplified.ts` - 메인 스토리 데이터 (10개 엔딩)
- `/data/characterData.ts` - 캐릭터 대화 시스템
- `/data/backgroundData.ts` - 배경 이미지 시스템
- `/data/endingData.ts` - 엔딩 목록

### 성능 개선
- 중복된 스토리 데이터 파일 3개 제거로 번들 크기 감소
- 불필요한 문서 파일 제거
- 더 빠른 초기 로딩 속도

---

## 2024-12-10: 스토리 간소화 및 엔딩 정리

### 주요 변경사항
- **엔딩 개수**: 17개 → 10개로 감소
  - 해피 엔딩: 2개 유지
  - 배드 엔딩: 15개 → 8개로 정리
  
### 제거된 배드 엔딩 (7개)
1. `scream_alone` - 비명을 지르다 죽음
2. `rush_at_hope` - 혼돈 속의 비극
3. `push_count_forward` - 백작을 밀어냄
4. `agree_with_revenge` - 복수에 동의
5. `ask_forgiveness` - 용서를 구함
6. `let_count_decide` - 백작이 결정하게 함
7. `drag_count_out` - 화염 속으로

### 유지된 엔딩 (10개)

#### 해피 엔딩 (2개)
1. `ending_justice` - 정의의 승리
2. `comfort_hope` - 자비로운 판결

#### 배드 엔딩 (8개)
1. `struggle_alone` - 무모한 용기
2. `rush_in_tunnel` - 성급한 행동
3. `draw_gun` - 폭력의 선택
4. `watch_tragedy` - 방관자의 죄
5. `wait_too_long` - 늦은 도착
6. `attack_hope` - 무모한 공격
7. `send_holmes_first` - 잘못된 판단
8. `blame_count` - 가혹한 진실

### 스토리 구조 개선
- **논리적 일관성**: 스토리 분기점의 논리적 모순 제거
- **불필요한 노드 정리**: 중복되거나 불필요한 스토리 노드 삭제
- **명확한 분기**: 각 분기점이 명확한 결과로 이어지도록 정리
- **간소화된 경로**: 복잡했던 스토리 경로를 단순하고 명확하게 재구성

### 기술적 변경
- 새 스토리 파일: `storyData_simplified.ts` 생성
- 엔딩 데이터 업데이트: `endingData.ts` (10개 엔딩 반영)
- IntroScreen 업데이트: 엔딩 개수 표시 변경 (8개 배드 + 2개 해피)

### 게임 플레이 개선
- 더 명확한 스토리 흐름
- 논리적으로 일관된 캐릭터 행동
- 간결하고 집중된 게임 경험