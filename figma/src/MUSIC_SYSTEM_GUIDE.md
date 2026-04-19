# 🎵 캐릭터 테마 시스템 사용 가이드

## 개요
캐릭터별 테마곡이 추가되어 **캐릭터 조우 시**에는 테마곡이 재생되고, **상황이 긴박하거나 공포스러울 때**는 자동으로 상황 음악으로 전환됩니다.

## 🎼 음악 우선순위 시스템

음악은 다음 우선순위로 자동 결정됩니다:

### 1️⃣ HIGH PRIORITY 상황 (최우선)
**긴박하거나 공포스러운 상황은 무조건 우선됩니다**

| 키워드 | 재생 음악 | 설명 |
|--------|----------|------|
| `scream`, `discover_body` | `fear` | 시체 발견, 비명 |
| `blood`, `wound`, `cause_of_death` | `tension` | 혈흔, 사인 분석 |
| `basement`, `cellar`, `underground` | `fear` | 지하실, 보관소 |
| `reveal`, `accuse`, `confession` | `revelation` | 진실 폭로, 범인 지목 |
| `crisis`, `chase`, `urgent`, `danger` | `investigation` | 긴박한 추리, 위기 |
| `dream`, `nightmare`, `vision` | `fear` | 꿈 시퀀스 |
| `ending`, `epilogue` | `ending` | 엔딩 |

### 2️⃣ 캐릭터 조우 (캐릭터 테마 재생)
**처음 만나거나 대면하는 씬에서 캐릭터 테마가 재생됩니다**

| 조우 키워드 | 설명 |
|-----------|------|
| `meet`, `encounter` | 캐릭터와 만남 |
| `introduce`, `first` | 소개, 첫 대면 |
| `appear`, `arrival` | 등장, 도착 |
| `greeting`, `intro_` | 인사, 인트로 씬 |

### 3️⃣ 캐릭터 테마 (일반 대화)
조우가 아닌 일반 대화나 상호작용 씬

### 4️⃣ NORMAL PRIORITY 상황
추리, 조사, 심문 등 일반적인 상황

### 5️⃣ 배경/장소
특정 장소의 분위기

## 사용 가능한 캐릭터 테마

| 캐릭터 ID | 캐릭터 이름 | 테마 특징 |
|----------|-----------|---------|
| `holmes` | 셜록 홈즈 | 지적이고 명석한 추리 |
| `watson` | 존 H. 왓슨 | 따뜻함과 인간미 |
| `hope` | 제퍼슨 호프 | 비극적, 복수의 그림자 |
| `count` | 모로 백작 | 위엄과 신비로움 |
| `gregson` | 그레그슨 형사 | 공권력, 긴장감 |
| `drebber` | 이노크 드레버 | 죽음, 과거의 망령 |

## 💡 실전 시나리오 예시

### 시나리오 1: 호프와의 만남 → 진실 폭로

```typescript
// 1️⃣ 호프 첫 만남 (조우) → hope_theme 재생
hope_first_encounter: {
  id: 'hope_first_encounter',
  character: 'hope',
  text: `제퍼슨 호프가 당신 앞에 섰다.
  
[호프]: 오래 기다렸소, 탐정님.`
}

// 2️⃣ 호프와 대화 (일반) → hope_theme 유지
hope_conversation: {
  id: 'hope_conversation',
  character: 'hope',
  text: `[호프]: 내 이야기를 들어주시겠소?
  
[왓슨]: 당신의 사연을 듣고 싶습니다.`
}

// 3️⃣ 진실 폭로 (HIGH PRIORITY) → revelation으로 자동 전환!
hope_truth_reveal: {
  id: 'hope_truth_reveal', // 'reveal' 키워드
  character: 'hope', // 캐릭터 있어도 상황이 우선
  text: `[호프]: 내가 왜 그들을 죽였는지... 이제 말하겠소!
  
🎵 음악이 revelation으로 전환됩니다`
}
```

### 시나리오 2: 홈즈의 추리 → 긴박한 상황

```typescript
// 1️⃣ 홈즈와 추리 (일반) → holmes_theme 재생
holmes_deduction_calm: {
  id: 'holmes_deduction_calm',
  character: 'holmes',
  text: `[홈즈]: 흥미롭군요. 이 발자국을 보십시오...`
}

// 2️⃣ 결정적 단서 발견 (긴박) → investigation으로 전환!
holmes_urgent_discovery: {
  id: 'holmes_urgent_discovery', // 'urgent' 키워드
  character: 'holmes',
  text: `[홈즈]: 잠깐! 왓슨, 시간이 없습니다!
  
🎵 음악이 investigation으로 전환됩니다`
}
```

### 시나리오 3: 지하실 탐색

```typescript
// 1️⃣ 홈즈와 지하실 입구 → holmes_theme
basement_entrance_holmes: {
  id: 'basement_entrance', // 'basement' 있지만 조우 키워드 없음
  character: 'holmes',
  text: `[홈즈]: 지하실로 내려가봅시다.`
}

// 2️⃣ 지하실 깊숙이 → fear로 자동 전환!
basement_deep_explore: {
  id: 'basement_deep_explore', // 'basement' 키워드
  character: 'holmes', // 캐릭터 있어도 공포 상황이 우선
  text: `어둡고 스산한 지하실. 무언가 불길한 기운이 느껴진다.
  
🎵 음악이 fear로 전환됩니다`
}
```

## 📝 노드 작성 가이드

### ✅ 캐릭터 조우 노드 (테마곡 재생)

```typescript
hope_first_meet: {
  id: 'hope_first_meet', // 'meet' 키워드 포함
  character: 'hope',
  text: `...`
}

holmes_encounter_study: {
  id: 'holmes_encounter_study', // 'encounter' 키워드
  character: 'holmes',
  text: `...`
}
```

### ✅ 긴박한 상황 노드 (상황 음악 우선)

```typescript
crisis_moment: {
  id: 'crisis_moment', // 'crisis' 키워드
  character: 'holmes', // 캐릭터 있어도 상황이 우선
  text: `...`
}

blood_discovery: {
  id: 'blood_discovery', // 'blood' 키워드
  character: 'watson',
  text: `...`
}
```

### ✅ 일반 대화 노드 (캐릭터 테마 유지)

```typescript
holmes_analysis: {
  id: 'holmes_analysis', // 특별한 키워드 없음
  character: 'holmes',
  text: `...` // holmes_theme 계속 재생
}
```

## 🎯 키워드 치트시트

### 🚨 HIGH PRIORITY (무조건 우선)
- 공포: `scream`, `fear`, `basement`, `cellar`, `nightmare`
- 긴장: `blood`, `wound`, `cause_of_death`
- 긴박: `crisis`, `chase`, `urgent`, `danger`, `critical`
- 진실: `reveal`, `accuse`, `confession`, `truth`
- 엔딩: `ending`, `epilogue`, `conclusion`

### 🎭 캐릭터 조우 (테마곡 재생)
- `meet`, `encounter`, `introduce`, `first`, `appear`, `arrival`, `greeting`

### 📊 NORMAL PRIORITY (캐릭터 테마와 혼용)
- 추리: `analyze`, `deduction`, `evidence`
- 조사: `investigate`, `search`, `examine`, `explore`
- 심문: `interrogate`, `question`, `suspect`

## 음악 트랙 목록

| 트랙 이름 | 음악 제목 | 설명 |
|----------|---------|------|
| `intro` | Intrepid | 인트로 화면 - 웅장하고 모험적 |
| `calm` | **Gymnopedie No 1** | **평온한 대화 - 매우 잔잔한 피아노 멜로디** |
| `mystery` | Dark Mystery | 미스터리, 단서 발견 |
| `tension` | Brittle Rille | 긴장감, 심문 |
| `deduction` | Deliberate Thought | 차분한 추리 |
| `investigation` | Trouble on the Horizon | 긴박한 추리 |
| `fear` | Unholy Knight | 공포, 지하실 |
| `revelation` | Scheming Weasel | 진실 폭로 |
| `ending` | Prelude and Action | 엔딩 - 장엄한 마무리 |
| `holmes_theme` | Arcane | 홈즈 테마 - 지적이고 명석한 |
| `watson_theme` | Wholesome | 왓슨 테마 - 따뜻하고 인간적 |
| `hope_theme` | Funeral March for Brass | 호프 테마 - 비극적 |
| `count_theme` | The Complex | 백작 테마 - 위엄있고 신비로운 |
| `gregson_theme` | Constancy Part Two | 그레그슨 테마 - 공권력의 무게 |
| `drebber_theme` | Darker | 드레버 테마 - 죽음과 과거 |

---

## 🎹 음악 크레딧

모든 음악은 **Kevin MacLeod**의 작품입니다.
- 출처: [incompetech.com](https://incompetech.com)
- 라이선스: [Creative Commons: By Attribution 4.0](http://creativecommons.org/licenses/by/4.0/)

---

## 📚 추가 문서

더 많은 실전 예시를 보려면 다음 문서를 참고하세요:
- **[MUSIC_TRANSITION_EXAMPLES.md](/MUSIC_TRANSITION_EXAMPLES.md)** - 시퀀스별 음악 전환 예시