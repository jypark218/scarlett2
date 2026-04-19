# 🏛️ 1층 전역 탐색 시스템
## 마차 → 1층 허브 → 단서 연동 완전 가이드

> **홈즈의 예견 → 서재/부엌 조사 → 백작/스탠거슨 대화 해금**  
> 초반부터 비틀린 동기를 암시하는 서사 구조

---

## 📋 목차
1. [마차 시퀀스](#1-마차-시퀀스)
2. [1층 메인 허브](#2-1층-메인-허브)
3. [서재 조사 시스템](#3-서재-조사-시스템)
4. [부엌 조사 시스템](#4-부엌-조사-시스템)
5. [단서 연동 로직](#5-단서-연동-로직)
6. [구현 코드](#6-구현-코드)
7. [테스트 시나리오](#7-테스트-시나리오)

---

## 1. 마차 시퀀스

### 📍 목적
홈즈가 사건의 본질을 예견하고 왓슨(플레이어)에게 수사 방향성을 제시하는 오프닝.

### 🔧 피그마 입력용 구조

```yaml
Node ID: carriage_scene
Type: Cutscene
Day: 1
TimeOfDay: afternoon
Location: carriage
Character: holmes

Description: 안개 속 마차 오프닝 시퀀스
```

### 🎯 전체 대사 플로우

```yaml
# ========== 마차 노드 1: 홈즈의 예견 ==========
Node ID: carriage_holmes_foreshadow
Speaker: holmes
Text: |
  마차가 안개 속을 달린다.
  
  홈즈가 창밖의 안개를 응시한다.
  
  [홈즈]: 왓슨, 자네는 모로 백작이 왜 우리를 불렀다고 생각하나?
  
  [홈즈]: 단순한 도난이나 유산 문제라면 런던의 흔한 경관을 불렀겠지.
  
  [홈즈]: 하지만 그는 우리를 선택했네.
  
  [홈즈]: 그건 이 사건이 '증거'보다 '비밀'에 가깝다는 뜻이지.

Choices:
  - text: "💬 백작의 배경을 묻는다"
    nextNode: carriage_watson_asks

# ========== 마차 노드 2: 왓슨의 반응 ==========
Node ID: carriage_watson_asks
Speaker: watson
Text: |
  [왓슨]: 백작은 이 지역의 명망 높은 자산가네.
  
  [왓슨]: 그의 편지에는 절박함이 묻어있었어.
  
  홈즈가 고개를 끄덕인다.

Choices:
  - text: "▶️ 계속"
    nextNode: carriage_holmes_warning

# ========== 마차 노드 3: 홈즈의 경고 ==========
Node ID: carriage_holmes_warning
Speaker: holmes
Text: |
  [홈즈]: 절박함이라...
  
  [홈즈]: 20년 전 루시라는 여인이 사라졌던 그 비극의 향기가 여기까지 진동하는군.
  
  홈즈가 당신을 본다.
  
  [홈즈]: 저택에 들어서는 순간, 사람들의 눈이 아닌...
  
  [홈즈]: 그들이 감추려 하는 '손'을 관찰하게.
  
  마차가 멈춘다.
  
  **[모로 백작의 저택 도착]**

Choices:
  - text: "🏛️ 저택으로 들어간다"
    nextNode: mansion_entrance

Flags Set:
  - carriage_scene_complete: true
  - holmes_foreshadowed_lucy: true
```

---

## 2. 1층 메인 허브

### 📍 목적
1층의 모든 방을 연결하는 중앙 노드. 서재/부엌 조사를 관리하고 루프 방지.

### 🔧 피그마 입력용 구조

```yaml
# ========== 저택 입구 ==========
Node ID: mansion_entrance
Type: Location
Day: 1
TimeOfDay: afternoon
Location: entrance_hall

Text: |
  거대한 철문이 천천히 열린다.
  
  입구 홀은 어둡고 고요하다.
  
  먼지가 쌓인 샹들리에... 벽에 걸린 낡은 초상화들...
  
  홈즈가 주위를 둘러본다.
  
  [홈즈]: 음... 사람이 살고 있는 집이라기엔 너무 조용하군.

Choices:
  - text: "📚 서재로 간다"
    nextNode: study_entrance
    hideIfVisitedNode: study_conclusion
    
  - text: "🍳 부엌으로 간다"
    nextNode: kitchen_entrance
    hideIfVisitedNode: kitchen_conclusion
    
  - text: "🚪 복도를 둘러본다"
    nextNode: hallway_hub
    
  - text: "🔍 입구 홀을 조사한다"
    nextNode: entrance_hall_investigation
    hideIfVisitedNode: entrance_hall_investigation

# ========== 1층 복도 허브 ==========
Node ID: hallway_hub
Type: Hub
Day: 1
TimeOfDay: afternoon
Location: hallway

Text: |
  1층 복도입니다.
  
  어디로 가시겠습니까?

Choices:
  - text: "📚 서재"
    nextNode: study_entrance
    showIf: (ctx) => !ctx.visitedNodes.includes('study_conclusion')
    
  - text: "🍳 부엌"
    nextNode: kitchen_entrance
    showIf: (ctx) => !ctx.visitedNodes.includes('kitchen_conclusion')
    
  - text: "🏛️ 입구 홀"
    nextNode: mansion_entrance
    
  - text: "⬆️ 2층으로 올라간다"
    nextNode: second_floor_entrance
    showIf: (ctx) => {
      // 1층 완전 조사 완료 시에만
      const studyDone = ctx.visitedNodes.includes('study_conclusion');
      const kitchenDone = ctx.visitedNodes.includes('kitchen_conclusion');
      return studyDone && kitchenDone;
    }

Flags Set on Visit:
  - visited_hallway: true
```

---

## 3. 서재 조사 시스템

### 📍 목적
가계도 조사를 통해 엘렌의 비밀을 암시하고, 백작 대화에서 "엘렌의 출생" 선택지를 해금.

### 🔧 피그마 입력용 구조

```yaml
# ========== 서재 입구 ==========
Node ID: study_entrance
Type: Location
Day: 1
TimeOfDay: afternoon
Location: study

Text: |
  서재 문을 연다.
  
  벽면을 가득 채운 책들...
  
  중앙에 거대한 책상...
  
  홈즈가 주위를 둘러본다.
  
  [홈즈]: 지성인의 공간이군. 하지만 어딘가 인위적이야.

Choices:
  - text: "🔍 책상을 조사한다"
    nextNode: study_desk_investigation
    hideIfVisitedNode: study_desk_investigation
    
  - text: "📜 가계도를 조사한다"
    nextNode: study_genealogy_investigation
    hideIfVisitedNode: study_genealogy_investigation
    
  - text: "📚 책장을 조사한다"
    nextNode: study_bookshelf_investigation
    hideIfVisitedNode: study_bookshelf_investigation
    
  - text: "🚪 서재를 나간다"
    nextNode: study_conclusion

# ========== 가계도 조사 (핵심 단서) ==========
Node ID: study_genealogy_investigation
Type: Investigation
Speaker: watson
Text: |
  벽면에 걸린 백작의 가계도를 살펴본다.
  
  [왓슨]: 이건... 백작 가문의 족보군.
  
  [왓슨]: 모로 백작... 그리고 엘렌...
  
  홈즈가 다가온다.
  
  [홈즈]: 잠깐, 왓슨. 여기 엘렌의 이름이 적힌 부분을 보게.
  
  홈즈가 종이를 만진다.
  
  [홈즈]: 종이 질감이 미묘하게 다르군.
  
  [홈즈]: 덧칠된 진실이야.
  
  [홈즈]: 백작은 엘렌을 자신의 혈육으로 위장하기 위해 가계도까지 손을 댔어.
  
  [왓슨]: 왜 그렇게까지...?
  
  [홈즈]: 그게 바로 우리가 밝혀야 할 거야.
  
  홈즈가 가계도를 자세히 본다.
  
  [홈즈]: 엘렌의 어머니 란이 비어있네. 의도적으로 지운 거야.

Choices:
  - text: "📜 가계도를 기록한다"
    nextNode: acquire_genealogy_clue
    onSelect: (ctx) => {
      ctx.flags.found_genealogy_clue = true;
      ctx.flags.knows_ellen_not_count_daughter = true;
      ctx.addItem('위조된 가계도 증거');
    }

# ========== 단서 획득 ==========
Node ID: acquire_genealogy_clue
Type: System
Speaker: system
Text: |
  **[획득: 위조된 가계도 증거]**
  
  백작과 대화할 때 "엘렌의 출생"에 대해 물을 수 있습니다.

Choices:
  - text: "🔙 서재로 돌아간다"
    nextNode: study_entrance

# ========== 책상 조사 ==========
Node ID: study_desk_investigation
Type: Investigation
Speaker: watson
Text: |
  책상을 조사한다.
  
  서랍이 잠겨있다.
  
  홈즈가 핀을 꺼내 자물쇠를 연다.
  
  [홈즈]: 실례하지.
  
  서랍 안에 편지가 있다.
  
  낡고 누렇게 변한 종이...
  
  [왓슨]: (읽는다) "사랑하는 루시... 너와의 약속을 지키지 못해 미안하다... - J.H."
  
  [홈즈]: J.H.... 제퍼슨 호프인가?
  
  [왓슨]: 20년 전 편지군.

Choices:
  - text: "📜 편지를 가져간다"
    nextNode: acquire_old_letter
    onSelect: (ctx) => {
      ctx.flags.found_hope_old_letter = true;
      ctx.addItem('20년 전 호프의 편지');
    }

Node ID: acquire_old_letter
Text: |
  **[획득: 20년 전 호프의 편지]**
  
  호프와 루시의 관계를 추적할 수 있습니다.

Choices:
  - text: "🔙 서재로 돌아간다"
    nextNode: study_entrance

# ========== 책장 조사 ==========
Node ID: study_bookshelf_investigation
Type: Investigation
Speaker: watson
Text: |
  책장을 살펴본다.
  
  대부분 신학서적과 철학서...
  
  홈즈가 한 권을 꺼낸다.
  
  [홈즈]: "영원한 구원의 길"... 교단 서적이군.
  
  [홈즈]: 백작이 교단과 연결되어 있었어.

Choices:
  - text: "📖 책을 확인한다"
    nextNode: acquire_cult_book
    onSelect: (ctx) => {
      ctx.flags.found_cult_book = true;
      ctx.addItem('교단 서적');
    }

Node ID: acquire_cult_book
Text: |
  **[획득: 교단 서적]**
  
  백작의 과거 교단 활동을 추적할 수 있습니다.

Choices:
  - text: "🔙 서재로 돌아간다"
    nextNode: study_entrance

# ========== 서재 조사 완료 ==========
Node ID: study_conclusion
Type: System
Text: |
  서재 조사를 완료했습니다.

Choices:
  - text: "🔙 복도로 나간다"
    nextNode: hallway_hub
    onSelect: (ctx) => {
      ctx.flags.study_investigation_complete = true;
    }
```

---

## 4. 부엌 조사 시스템

### 📍 목적
진흙 자국 발견을 통해 스탠거슨 심문 시 "어젯밤의 행적" 선택지를 해금.

### 🔧 피그마 입력용 구조

```yaml
# ========== 부엌 입구 ==========
Node ID: kitchen_entrance
Type: Location
Day: 1
TimeOfDay: afternoon
Location: kitchen

Text: |
  부엌 문을 연다.
  
  냉랭한 공기... 식어버린 수프 냄비...
  
  하인들이 구석에서 작은 소리로 대화하고 있다.
  
  당신을 보자 입을 다문다.
  
  [왓슨]: 안녕하십니까. 우리는...
  
  하인들이 눈을 피한다.
  
  [홈즈]: (속삭인다) 공포에 질려있군.

Choices:
  - text: "🔍 바닥을 조사한다"
    nextNode: kitchen_floor_investigation
    hideIfVisitedNode: kitchen_floor_investigation
    
  - text: "🍲 냄비를 조사한다"
    nextNode: kitchen_pot_investigation
    hideIfVisitedNode: kitchen_pot_investigation
    
  - text: "🗄️ 찬장을 조사한다"
    nextNode: kitchen_cupboard_investigation
    hideIfVisitedNode: kitchen_cupboard_investigation
    
  - text: "💬 하인들에게 말을 건다"
    nextNode: kitchen_servants_talk
    hideIfVisitedNode: kitchen_servants_talk
    
  - text: "🚪 부엌을 나간다"
    nextNode: kitchen_conclusion

# ========== 바닥 조사 (핵심 단서) ==========
Node ID: kitchen_floor_investigation
Type: Investigation
Speaker: watson
Text: |
  바닥을 살핀다.
  
  [왓슨]: 홈즈, 여기 보게.
  
  [왓슨]: 진흙 묻은 신발 자국이 있어.
  
  홈즈가 무릎을 꿇고 자세히 본다.
  
  [홈즈]: 런던 교외 지역의 점토질 진흙이야.
  
  [홈즈]: 이 저택 정원의 흙이 아니야.
  
  [홈즈]: 누군가 어젯밤 외부에서 들어왔어.
  
  [홈즈]: 그것도... 급하게.
  
  홈즈가 발자국 방향을 따라간다.
  
  [홈즈]: 부엌에서... 지하로 향하는 계단 쪽으로 이어지는군.

Choices:
  - text: "🔍 진흙 샘플을 채취한다"
    nextNode: acquire_mud_sample
    onSelect: (ctx) => {
      ctx.flags.found_kitchen_mud = true;
      ctx.flags.knows_stangerson_moved_last_night = true;
      ctx.addItem('진흙 샘플');
    }

# ========== 단서 획득 ==========
Node ID: acquire_mud_sample
Type: System
Speaker: system
Text: |
  **[획득: 진흙 샘플]**
  
  스탠거슨을 심문할 때 "어젯밤의 행적"을 물을 수 있습니다.

Choices:
  - text: "🔙 부엌으로 돌아간다"
    nextNode: kitchen_entrance

# ========== 찬장 조사 ==========
Node ID: kitchen_cupboard_investigation
Type: Investigation
Speaker: watson
Text: |
  찬장을 연다.
  
  그릇들... 식기들...
  
  그리고 찬장 뒤쪽에... 무언가 반짝인다.
  
  홈즈가 손을 뻗는다.
  
  [홈즈]: 이건...
  
  낡은 로켓 케이스다.
  
  홈즈가 케이스를 연다.
  
  안에 여성의 초상화가 들어있다.
  
  [홈즈]: 루시의 것이야.
  
  [왓슨]: 왜 부엌 찬장에...?
  
  [홈즈]: 누군가 숨긴 거지. 엘렌에게 전달하려다 실패한 것 같아.

Choices:
  - text: "📿 로켓 케이스를 가져간다"
    nextNode: acquire_locket_case
    onSelect: (ctx) => {
      ctx.flags.found_lucy_locket_case = true;
      ctx.addItem('루시의 로켓 케이스');
    }

Node ID: acquire_locket_case
Text: |
  **[획득: 루시의 로켓 케이스]**
  
  엘렌에게 어머니의 유품을 전달할 수 있습니다.

Choices:
  - text: "🔙 부엌으로 돌아간다"
    nextNode: kitchen_entrance

# ========== 냄비 조사 ==========
Node ID: kitchen_pot_investigation
Type: Investigation
Speaker: watson
Text: |
  냄비를 확인한다.
  
  [왓슨]: 수프가 식어있군.
  
  홈즈가 냄새를 맡는다.
  
  [홈즈]: 어젯밤 만들어진 것 같아. 하지만 아무도 먹지 않았어.
  
  [홈즈]: 무슨 일이 있었던 거야.

Choices:
  - text: "🔙 부엌으로 돌아간다"
    nextNode: kitchen_entrance

# ========== 하인 대화 ==========
Node ID: kitchen_servants_talk
Type: Dialogue
Character: servant
Speaker: watson
Text: |
  하인에게 다가간다.
  
  [왓슨]: 실례합니다. 백작님은 어디 계신가요?
  
  하인이 떨린다.
  
  [하인]: 저, 저희는... 모릅니다...
  
  [왓슨]: 언제부터 보지 못하셨나요?
  
  [하인]: 3일... 아니... 4일 전부터...
  
  홈즈가 끼어든다.
  
  [홈즈]: 스탠거슨 씨는 어디 있습니까?
  
  [하인]: 서, 서재에... 계실 겁니다...
  
  하인의 안색이 창백하다.
  
  [홈즈]: (왓슨에게 속삭인다) 공포는 가장 강력한 자물쇠지.

Choices:
  - text: "🔙 부엌으로 돌아간다"
    nextNode: kitchen_entrance
    onSelect: (ctx) => {
      ctx.flags.talked_to_servants = true;
      ctx.flags.knows_count_missing_4days = true;
    }

# ========== 부엌 조사 완료 ==========
Node ID: kitchen_conclusion
Type: System
Text: |
  부엌 조사를 완료했습니다.

Choices:
  - text: "🔙 복도로 나간다"
    nextNode: hallway_hub
    onSelect: (ctx) => {
      ctx.flags.kitchen_investigation_complete = true;
    }
```

---

## 5. 단서 연동 로직

### 🎯 서재 단서 → 백작 대화 해금

```yaml
# 서재에서 가계도 발견
Node: study_genealogy_investigation
Flag Set: found_genealogy_clue = true

# 백작 허브에서 선택지 해금
Node: count_hub
Choice: "엘렌의 출생에 대해 묻는다"
Condition: found_genealogy_clue == true

Example:
count_hub: {
  choices: [
    {
      text: "💬 엘렌의 출생에 대해 묻는다",
      nextNode: "count_ellen_birth_question",
      showIf: (ctx) => ctx.flags.found_genealogy_clue === true,
      hideIfVisitedNode: "count_ellen_birth_question"
    }
  ]
}

count_ellen_birth_question: {
  text: |
    [왓슨]: 백작님, 가계도를 보았습니다.
    
    [왓슨]: 엘렌의 어머니 란이 비어있더군요.
    
    백작이 얼굴을 굳힌다.
    
    [백작]: ...그건...
    
    [홈즈]: 엘렌은 당신의 친딸이 아닙니다. 맞습니까?
    
    백작이 고개를 숙인다.
    
    [백작]: ...인정합니다.
  
  choices: [
    { text: "🔙 다른 것을 묻는다", nextNode: "count_hub" }
  ]
}
```

### 🎯 부엌 단서 → 스탠거슨 심문 해금

```yaml
# 부엌에서 진흙 발견
Node: kitchen_floor_investigation
Flag Set: found_kitchen_mud = true

# 스탠거슨 허브에서 선택지 해금
Node: stangerson_hub
Choice: "어젯밤의 행적을 묻는다"
Condition: found_kitchen_mud == true

Example:
stangerson_hub: {
  choices: [
    {
      text: "🌙 어젯밤의 행적을 묻는다",
      nextNode: "stangerson_last_night_question",
      showIf: (ctx) => ctx.flags.found_kitchen_mud === true,
      hideIfVisitedNode: "stangerson_last_night_question"
    }
  ]
}

stangerson_last_night_question: {
  text: |
    [왓슨]: 스탠거슨 씨, 어젯밤 어디 다녀오셨습니까?
    
    스탠거슨이 당황한다.
    
    [스탠거슨]: 저는... 줄곧 서재에...
    
    홈즈가 진흙 샘플을 보여준다.
    
    [홈즈]: 부엌에 당신의 신발 자국이 있었습니다.
    
    [홈즈]: 런던 교외 점토질 진흙이죠.
    
    스탠거슨의 얼굴이 창백해진다.
    
    [스탠거슨]: ...인정합니다. 외출했습니다.
  
  choices: [
    { text: "🔙 다른 것을 묻는다", nextNode: "stangerson_hub" }
  ]
}
```

### 🎯 1층 완료 → Day 1 Evening 진입

```yaml
# 조건: 서재 + 부엌 모두 완료
Trigger Node: second_floor_entrance OR stangerson_meeting
Condition: 
  - study_investigation_complete == true
  - kitchen_investigation_complete == true

Example:
hallway_hub: {
  choices: [
    {
      text: "⬆️ 2층으로 올라간다",
      nextNode: "second_floor_entrance",
      showIf: (ctx) => {
        const studyDone = ctx.flags.study_investigation_complete === true;
        const kitchenDone = ctx.flags.kitchen_investigation_complete === true;
        return studyDone && kitchenDone;
      }
    },
    {
      text: "📚 서재로 돌아가 스탠거슨을 만난다",
      nextNode: "discover_stangerson",
      showIf: (ctx) => {
        const studyDone = ctx.flags.study_investigation_complete === true;
        const kitchenDone = ctx.flags.kitchen_investigation_complete === true;
        return studyDone && kitchenDone;
      }
    }
  ]
}
```

---

## 6. 구현 코드

### 완전한 1층 시스템 코드

```typescript
// ========== 마차 시퀀스 ==========
export const carriageSequence = {
  carriage_holmes_foreshadow: {
    id: 'carriage_holmes_foreshadow',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'carriage' as const,
    character: 'holmes' as const,
    speaker: 'holmes' as const,
    text: `마차가 안개 속을 달린다.

홈즈가 창밖의 안개를 응시한다.

[홈즈]: 왓슨, 자네는 모로 백작이 왜 우리를 불렀다고 생각하나?

[홈즈]: 단순한 도난이나 유산 문제라면 런던의 흔한 경관을 불렀겠지.

[홈즈]: 하지만 그는 우리를 선택했네.

[홈즈]: 그건 이 사건이 '증거'보다 '비밀'에 가깝다는 뜻이지.`,
    choices: [
      { 
        text: '💬 백작의 배경을 묻는다', 
        nextNode: 'carriage_watson_asks' 
      }
    ]
  },

  carriage_watson_asks: {
    id: 'carriage_watson_asks',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'carriage' as const,
    character: 'holmes' as const,
    speaker: 'watson' as const,
    text: `[왓슨]: 백작은 이 지역의 명망 높은 자산가네.

[왓슨]: 그의 편지에는 절박함이 묻어있었어.

홈즈가 고개를 끄덕인다.`,
    choices: [
      { text: '▶️ 계속', nextNode: 'carriage_holmes_warning' }
    ]
  },

  carriage_holmes_warning: {
    id: 'carriage_holmes_warning',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'carriage' as const,
    character: 'holmes' as const,
    speaker: 'holmes' as const,
    text: `[홈즈]: 절박함이라...

[홈즈]: 20년 전 루시라는 여인이 사라졌던 그 비극의 향기가 여기까지 진동하는군.

홈즈가 당신을 본다.

[홈즈]: 저택에 들어서는 순간, 사람들의 눈이 아닌...

[홈즈]: 그들이 감추려 하는 '손'을 관찰하게.

마차가 멈춘다.

**[모로 백작의 저택 도착]**`,
    choices: [
      { 
        text: '🏛️ 저택으로 들어간다', 
        nextNode: 'mansion_entrance' 
      }
    ]
  },

  // ========== 1층 허브 ==========
  mansion_entrance: {
    id: 'mansion_entrance',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'entrance_hall' as const,
    text: `거대한 철문이 천천히 열린다.

입구 홀은 어둡고 고요하다.

먼지가 쌓인 샹들리에... 벽에 걸린 낡은 초상화들...

홈즈가 주위를 둘러본다.

[홈즈]: 음... 사람이 살고 있는 집이라기엔 너무 조용하군.`,
    choices: [
      {
        text: '📚 서재로 간다',
        nextNode: 'study_entrance',
        hideIfVisitedNode: 'study_conclusion'
      },
      {
        text: '🍳 부엌으로 간다',
        nextNode: 'kitchen_entrance',
        hideIfVisitedNode: 'kitchen_conclusion'
      },
      {
        text: '🚪 복도를 둘러본다',
        nextNode: 'hallway_hub'
      }
    ]
  },

  hallway_hub: {
    id: 'hallway_hub',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'hallway' as const,
    text: `1층 복도입니다.

어디로 가시겠습니까?`,
    choices: [
      {
        text: '📚 서재',
        nextNode: 'study_entrance',
        showIf: (context) => !context.visitedNodes.includes('study_conclusion')
      },
      {
        text: '🍳 부엌',
        nextNode: 'kitchen_entrance',
        showIf: (context) => !context.visitedNodes.includes('kitchen_conclusion')
      },
      {
        text: '🏛️ 입구 홀',
        nextNode: 'mansion_entrance'
      },
      {
        text: '⬆️ 2층으로 올라간다',
        nextNode: 'second_floor_entrance',
        showIf: (context) => {
          const studyDone = context.flags.study_investigation_complete === true;
          const kitchenDone = context.flags.kitchen_investigation_complete === true;
          return studyDone && kitchenDone;
        }
      },
      {
        text: '📚 서재로 돌아가 스탠거슨을 만난다',
        nextNode: 'discover_stangerson',
        showIf: (context) => {
          const studyDone = context.flags.study_investigation_complete === true;
          const kitchenDone = context.flags.kitchen_investigation_complete === true;
          return studyDone && kitchenDone;
        }
      }
    ]
  },

  // ========== 서재 시스템 ==========
  study_entrance: {
    id: 'study_entrance',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'study' as const,
    text: `서재 문을 연다.

벽면을 가득 채운 책들...

중앙에 거대한 책상...

홈즈가 주위를 둘러본다.

[홈즈]: 지성인의 공간이군. 하지만 어딘가 인위적이야.`,
    choices: [
      {
        text: '🔍 책상을 조사한다',
        nextNode: 'study_desk_investigation',
        hideIfVisitedNode: 'study_desk_investigation'
      },
      {
        text: '📜 가계도를 조사한다',
        nextNode: 'study_genealogy_investigation',
        hideIfVisitedNode: 'study_genealogy_investigation'
      },
      {
        text: '📚 책장을 조사한다',
        nextNode: 'study_bookshelf_investigation',
        hideIfVisitedNode: 'study_bookshelf_investigation'
      },
      {
        text: '🚪 서재를 나간다',
        nextNode: 'study_conclusion'
      }
    ]
  },

  study_genealogy_investigation: {
    id: 'study_genealogy_investigation',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'study' as const,
    speaker: 'watson' as const,
    text: `벽면에 걸린 백작의 가계도를 살펴본다.

[왓슨]: 이건... 백작 가문의 족보군.

[왓슨]: 모로 백작... 그리고 엘렌...

홈즈가 다가온다.

[홈즈]: 잠깐, 왓슨. 여기 엘렌의 이름이 적힌 부분을 보게.

홈즈가 종이를 만진다.

[홈즈]: 종이 질감이 미묘하게 다르군.

[홈즈]: 덧칠된 진실이야.

[홈즈]: 백작은 엘렌을 자신의 혈육으로 위장하기 위해 가계도까지 손을 댔어.

[왓슨]: 왜 그렇게까지...?

[홈즈]: 그게 바로 우리가 밝혀야 할 거야.

홈즈가 가계도를 자세히 본다.

[홈즈]: 엘렌의 어머니 란이 비어있네. 의도적으로 지운 거야.`,
    choices: [
      {
        text: '📜 가계도를 기록한다',
        nextNode: 'acquire_genealogy_clue'
      }
    ]
  },

  acquire_genealogy_clue: {
    id: 'acquire_genealogy_clue',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'study' as const,
    speaker: 'system' as const,
    text: `**[획득: 위조된 가계도 증거]**

백작과 대화할 때 "엘렌의 출생"에 대해 물을 수 있습니다.`,
    choices: [
      { 
        text: '🔙 서재로 돌아간다', 
        nextNode: 'study_entrance' 
      }
    ],
    onEnter: (context) => {
      context.flags.found_genealogy_clue = true;
      context.flags.knows_ellen_not_count_daughter = true;
      context.addItem('위조된 가계도 증거');
    }
  },

  study_conclusion: {
    id: 'study_conclusion',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'study' as const,
    speaker: 'system' as const,
    text: `서재 조사를 완료했습니다.`,
    choices: [
      { 
        text: '🔙 복도로 나간다', 
        nextNode: 'hallway_hub' 
      }
    ],
    onEnter: (context) => {
      context.flags.study_investigation_complete = true;
    }
  },

  // ========== 부엌 시스템 ==========
  kitchen_entrance: {
    id: 'kitchen_entrance',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'kitchen' as const,
    text: `부엌 문을 연다.

냉랭한 공기... 식어버린 수프 냄비...

하인들이 구석에서 작은 소리로 대화하고 있다.

당신을 보자 입을 다문다.

[왓슨]: 안녕하십니까. 우리는...

하인들이 눈을 피한다.

[홈즈]: (속삭인다) 공포에 질려있군.`,
    choices: [
      {
        text: '🔍 바닥을 조사한다',
        nextNode: 'kitchen_floor_investigation',
        hideIfVisitedNode: 'kitchen_floor_investigation'
      },
      {
        text: '🍲 냄비를 조사한다',
        nextNode: 'kitchen_pot_investigation',
        hideIfVisitedNode: 'kitchen_pot_investigation'
      },
      {
        text: '🗄️ 찬장을 조사한다',
        nextNode: 'kitchen_cupboard_investigation',
        hideIfVisitedNode: 'kitchen_cupboard_investigation'
      },
      {
        text: '💬 하인들에게 말을 건다',
        nextNode: 'kitchen_servants_talk',
        hideIfVisitedNode: 'kitchen_servants_talk'
      },
      {
        text: '🚪 부엌을 나간다',
        nextNode: 'kitchen_conclusion'
      }
    ]
  },

  kitchen_floor_investigation: {
    id: 'kitchen_floor_investigation',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'kitchen' as const,
    speaker: 'watson' as const,
    text: `바닥을 살핀다.

[왓슨]: 홈즈, 여기 보게.

[왓슨]: 진흙 묻은 신발 자국이 있어.

홈즈가 무릎을 꿇고 자세히 본다.

[홈즈]: 런던 교외 지역의 점토질 진흙이야.

[홈즈]: 이 저택 정원의 흙이 아니야.

[홈즈]: 누군가 어젯밤 외부에서 들어왔어.

[홈즈]: 그것도... 급하게.

홈즈가 발자국 방향을 따라간다.

[홈즈]: 부엌에서... 지하로 향하는 계단 쪽으로 이어지는군.`,
    choices: [
      {
        text: '🔍 진흙 샘플을 채취한다',
        nextNode: 'acquire_mud_sample'
      }
    ]
  },

  acquire_mud_sample: {
    id: 'acquire_mud_sample',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'kitchen' as const,
    speaker: 'system' as const,
    text: `**[획득: 진흙 샘플]**

스탠거슨을 심문할 때 "어젯밤의 행적"을 물을 수 있습니다.`,
    choices: [
      { 
        text: '🔙 부엌으로 돌아간다', 
        nextNode: 'kitchen_entrance' 
      }
    ],
    onEnter: (context) => {
      context.flags.found_kitchen_mud = true;
      context.flags.knows_stangerson_moved_last_night = true;
      context.addItem('진흙 샘플');
    }
  },

  kitchen_conclusion: {
    id: 'kitchen_conclusion',
    day: 1,
    timeOfDay: 'afternoon' as const,
    location: 'kitchen' as const,
    speaker: 'system' as const,
    text: `부엌 조사를 완료했습니다.`,
    choices: [
      { 
        text: '🔙 복도로 나간다', 
        nextNode: 'hallway_hub' 
      }
    ],
    onEnter: (context) => {
      context.flags.kitchen_investigation_complete = true;
    }
  }
};
```

---

## 7. 테스트 시나리오

### 시나리오 1: 서재 단서 → 백작 대화

```yaml
Test: 가계도 발견 후 백작 질문 해금
Steps:
  1. mansion_entrance 진입
  2. study_entrance 선택
  3. study_genealogy_investigation 조사
  4. found_genealogy_clue = true 확인
  5. count_hub 진입
  6. "엘렌의 출생을 묻는다" 선택지 표시 확인

Expected:
  ✅ 선택지 정상 표시
  ✅ count_ellen_birth_question으로 이동
```

### 시나리오 2: 부엌 단서 → 스탠거슨 심문

```yaml
Test: 진흙 발견 후 스탠거슨 질문 해금
Steps:
  1. mansion_entrance 진입
  2. kitchen_entrance 선택
  3. kitchen_floor_investigation 조사
  4. found_kitchen_mud = true 확인
  5. stangerson_hub 진입
  6. "어젯밤의 행적을 묻는다" 선택지 표시 확인

Expected:
  ✅ 선택지 정상 표시
  ✅ stangerson_last_night_question으로 이동
```

### 시나리오 3: 1층 완료 → 2층 진입

```yaml
Test: 서재 + 부엌 완료 후 2층 해금
Steps:
  1. study_entrance → study_conclusion (완료)
  2. kitchen_entrance → kitchen_conclusion (완료)
  3. hallway_hub 진입
  4. "2층으로 올라간다" 선택지 표시 확인

Expected:
  ✅ 선택지 정상 표시
  ✅ study_investigation_complete = true
  ✅ kitchen_investigation_complete = true
```

---

## 🛠️ 피그마 메이크 개발자 체크리스트

```markdown
## 1층 탐색 시스템 구현 체크

### 마차 시퀀스
- [ ] carriage_holmes_foreshadow 구현
- [ ] carriage_watson_asks 구현
- [ ] carriage_holmes_warning 구현
- [ ] mansion_entrance로 전환

### 1층 허브
- [ ] mansion_entrance 중앙 노드
- [ ] hallway_hub 복도 노드
- [ ] hideIfVisitedNode 적용 (study_conclusion, kitchen_conclusion)
- [ ] 2층 진입 조건 체크

### 서재 시스템
- [ ] study_entrance 허브
- [ ] study_genealogy_investigation (가계도)
- [ ] found_genealogy_clue 플래그 설정
- [ ] study_conclusion 완료 노드
- [ ] 모든 조사 → study_entrance 복귀

### 부엌 시스템
- [ ] kitchen_entrance 허브
- [ ] kitchen_floor_investigation (진흙)
- [ ] found_kitchen_mud 플래그 설정
- [ ] kitchen_conclusion 완료 노드
- [ ] 모든 조사 → kitchen_entrance 복귀

### 단서 연동
- [ ] found_genealogy_clue → count_hub 선택지
- [ ] found_kitchen_mud → stangerson_hub 선택지
- [ ] 1층 완료 → 2층 진입 조건

### 무한 루프 방지
- [ ] 모든 조사 노드 hideIfVisitedNode 적용
- [ ] 모든 노드 허브 복귀 경로 보장
- [ ] conclusion 노드 중복 방문 방지
```

---

**최종 업데이트:** 2024-12-19  
**버전:** 1.0.0  
**상태:** ✅ 완성
