# 🎭 대사 퀄리티 개선 가이드라인

## 목적
캐릭터 대사가 단순 정보 전달이 아닌, **몰입감 있는 서사**가 되도록 작성 규칙을 정의합니다.

---

## 1. 캐릭터별 페르소나 (Persona Definition)

### 🕵️‍♂️ 셜록 홈즈 (Sherlock Holmes)
**핵심 키워드**: 냉소적, 분석적, 귀족적 어휘, 감정 절제

**말투 가이드**:
- ✅ 단답형 대신 관찰과 추론을 덧붙여 길게 말함
- ✅ 상대방의 질문에 바로 답하기보다, 질문의 의도를 파악하거나 역질문을 던짐
- ✅ 추리 과정을 드러내며 말함 ("이것은... 때문이지")
- ✅ 비유와 은유를 자주 사용

**Bad Example**:
```
"여기에 컵이 있군."
```

**Good Example**:
```
"흥미롭군. 먼지 쌓인 테이블 위에 유독 이 컵의 손잡이만 깨끗해. 
누군가 최근까지 이 자리를 지켰다는 뜻이지."
```

---

### 👨‍⚕️ 존 왓슨 (John Watson)
**핵심 키워드**: 인간적, 감성적, 상식적 반응, 플레이어의 대변인

**말투 가이드**:
- ✅ 홈즈의 비약에 놀라거나 의문을 제기하는 역할
- ✅ 상황의 공포감이나 기괴함을 일반인의 시선에서 서술
- ✅ 감각적 묘사를 풍부하게 (냄새, 온도, 촉감)
- ✅ 내면의 불안감이나 의심을 솔직하게 드러냄

**Bad Example**:
```
"누가 빵을 먹었네."
```

**Good Example**:
```
"세상에, 홈즈. 이 차가운 폐가에서 김이 나는 빵이라니... 
등골이 오싹하지 않나?"
```

---

### 👧 엘렌 (Ellen)
**핵심 키워드**: 순진함과 공포, 비밀을 간직한 소녀, 불안정한 감정

**말투 가이드**:
- ✅ 말을 더듬거나 망설임을 표현 ("저, 저는...")
- ✅ 행동 지문으로 불안감 표현 (시선 회피, 손 떨림, 물건 만지작거림)
- ✅ 짧은 대답 뒤에 긴 침묵 또는 추가 설명
- ✅ 무언가를 숨기고 있다는 암시

**Bad Example**:
```
"전 아무것도 몰라요."
```

**Good Example**:
```
(시선을 피하며 목에 걸린 로켓을 꽉 쥔다)
"...저, 저는 아무것도 모릅니다. 백작님이 아무에게도 말하지 말라고 하셨어요."
```

---

### 🎩 제퍼슨 호프 (Jefferson Hope)
**핵심 키워드**: 복수심에 사로잡힌 남자, 절박함, 거친 미국식 말투

**말투 가이드**:
- ✅ 직설적이고 거친 표현 사용
- ✅ 과거 회상 시 감정적으로 격앙됨
- ✅ 짧고 강렬한 문장 선호
- ✅ 복수의 정당성을 강조

**Bad Example**:
```
"나는 복수할 거야."
```

**Good Example**:
```
(주먹을 쥐며 떨리는 목소리로)
"그놈들이 루시를... 내 루시를 빼앗았어. 
20년을 기다렸다고. 이제 그 빚을 받아낼 시간이야."
```

---

## 2. 서술 강화 규칙 (Expansion Rule)

### ❌ 금지: 1줄짜리 정보 전달형 대사
```typescript
// Bad
text: "편지군."
```

### ✅ 필수: [감각 묘사] + [행동 지문] + [추론/감정]
```typescript
// Good
text: "(봉투의 냄새를 맡으며 미간을 찌푸린다)\\n\\n라벤더 향이 나는군... 20년 전 유행했던 싸구려 향수 냄새야.\\n\\n이건 단순한 편지가 아니라 초대장이네, 왓슨."
```

---

## 3. 맥락에 맞는 반응 (Contextual Reaction)

### 구조: [즉각 반응] → [본론]

**나쁜 예**:
```typescript
text: "이건 단서야."
```

**좋은 예**:
```typescript
text: "(갑자기 멈춰 서서 바닥을 응시한다)\\n\\n잠깐... 이건...\\n\\n왓슨, 자네 이 발자국 패턴을 보게. 이건 단서가 아니야. 범인의 동선 그 자체지."
```

---

## 4. 적용 체크리스트

각 대사 작성 시 다음을 확인:

- [ ] **캐릭터 페르소나 반영**: 이 대사가 해당 캐릭터답게 들리는가?
- [ ] **길이 적절성**: 중요한 대사는 최소 2-3문장 이상인가?
- [ ] **감각 묘사**: 시각/청각/후각/촉각 중 하나 이상 포함되었는가?
- [ ] **행동 지문**: 대사와 함께 캐릭터의 행동이 묘사되는가?
- [ ] **감정 표현**: 기계적 정보 전달이 아닌 감정이 담겼는가?

---

## 5. 실전 예시: Before & After

### Example 1: 단서 발견 장면

**Before**:
```typescript
holmes_find_key: {
  text: "열쇠를 발견했다."
}
```

**After**:
```typescript
holmes_find_key: {
  text: "(먼지 쌓인 서랍 뒤편을 더듬다가 무언가를 꺼낸다)\\n\\n이것 봐, 왓슨. 구리로 된 낡은 열쇠야.\\n\\n(열쇠를 빛에 비춰보며) 산화된 정도를 보니 최소 수십 년은 된 물건이군. 하지만 이 열쇠구멍은... 최근에 기름칠을 한 흔적이 있어.\\n\\n누군가 이 열쇠를 여전히 사용하고 있다는 뜻이지."
}
```

---

### Example 2: 공포 상황

**Before**:
```typescript
watson_basement: {
  text: "지하실이 어둡다."
}
```

**After**:
```typescript
watson_basement: {
  text: "(계단을 내려가며 랜턴을 높이 든다)\\n\\n세상에... 이 냄새...\\n\\n썩은 고기와 습기가 뒤섞인, 역겨운 악취가 코를 찌른다.\\n\\n지하실 벽에는 검은 곰팡이가 기어오르고 있었고, 천장에서는 무언가 똑... 똑... 떨어지는 소리가 들렸다.\\n\\n(손이 떨리며) 홈즈... 정말 여기 들어가야 하나?"
}
```

---

## 6. 개발자 전달용 프롬프트

```
[WRITING UPDATE: ENRICH DIALOGUE]

현재 스크립트가 너무 기능적이고 짧습니다. 아래 규칙에 따라 모든 주요 대사를 리라이팅(Rewriting) 해주세요.

1. [Apply Persona]:
   - Holmes: Analytical, verbose, uses deductive reasoning in speech. Never just says "Yes/No".
   - Watson: Emotional, descriptive, emphasizes the atmosphere/mood.
   - Ellen: Hesitant, fearful, hides secrets with body language.

2. [Expand Content]:
   - Avoid 1-line dialogues. Add sensory details (smell, touch, sound) or internal monologues.
   - Include actions in parentheses (e.g., "looking closely at the ink", "shivering with cold").

3. [Example Correction]:
   - Input: "It's a key."
   - Output (Holmes): "A brass key... The oxidization suggests it hasn't been used for decades. It must fit the basement lock."
```

---

## 적용 대상 파일

다음 파일들의 대사를 우선적으로 개선:

1. `/data/story/part1-opening.ts` - 오프닝 시퀀스
2. `/data/story/locations/study-layered-investigation.ts` - 서재 조사
3. `/data/story/locations/basement-layered.ts` - 지하실 조사
4. `/data/story/hope-interrogation.ts` - 호프 심문
5. `/data/story/ellen-encounter.ts` - 엘렌 조우
6. `/data/story/final-deduction-hub.ts` - 최종 추리

---

**작성일**: 2025-12-21  
**버전**: 1.0
