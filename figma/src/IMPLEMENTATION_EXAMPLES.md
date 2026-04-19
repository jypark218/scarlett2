# 💻 구현 예시 코드
## 피그마 메이크 직접 복사 가능한 코드

> 각 허브 시스템을 그대로 복사해서 사용할 수 있는 실제 TypeScript 코드입니다.

---

## 1. 지하실 허브 구현 예시

### 의식 도구 조사 → 백작 대화 해금

```typescript
// ========== 의식 도구 조사 노드 ==========
examine_ritual_tools: {
  id: 'examine_ritual_tools',
  day: 1,
  timeOfDay: 'evening',
  location: 'basement',
  speaker: 'watson',
  text: `의식실 중앙에 제단이 있다.

검은 천으로 덮인 제단 위에...

흰색 드레스가 놓여있다.

[왓슨]: 이건... 신부 드레스...?

홈즈가 드레스를 들어올린다.

[홈즈]: 엘렌의 이름이 수놓아져 있어.

[왓슨]: ...!

제단 옆에 의식 계획 메모가 있다.

"21세 생일... 영원한 신부 의식... 루시의 피를 이어받은 자..."

홈즈가 메모를 집어든다.

[홈즈]: 백작이 엘렌을... 의식에 바치려 했군.`,
  choices: [
    { 
      text: '📜 의식 계획 메모를 가져간다', 
      nextNode: 'acquire_ritual_memo',
      onSelect: (context) => {
        context.flags.clue_ritual_found = true;
        context.addItem('의식 계획 메모');
      }
    }
  ]
},

acquire_ritual_memo: {
  id: 'acquire_ritual_memo',
  day: 1,
  timeOfDay: 'evening',
  speaker: 'system',
  text: `**[획득: 의식 계획 메모]**

백작과 대화할 때 "의식의 목적"을 물을 수 있습니다.`,
  choices: [
    { text: '🔙 지하실로 돌아간다', nextNode: 'basement_entrance' }
  ]
},

// ========== 백작 허브 (조건부 선택지) ==========
count_hub: {
  id: 'count_hub',
  day: 1,
  timeOfDay: 'evening',
  location: 'basement',
  character: 'count',
  text: `백작이 의자에 묶여있다.

무엇을 물어보시겠습니까?`,
  choices: [
    {
      text: '💬 "루시에 대해 말씀해주세요"',
      nextNode: 'count_lucy_regret',
      hideIfVisitedNode: 'count_lucy_regret'
    },
    {
      text: '🎯 "의식의 목적이 무엇입니까?"',
      nextNode: 'count_ritual_confession',
      hideIfVisitedNode: 'count_ritual_confession',
      showIf: (context) => context.flags.clue_ritual_found === true
    },
    {
      text: '🌹 "엘렌을 왜 숨기셨습니까?"',
      nextNode: 'count_ellen_protection',
      hideIfVisitedNode: 'count_ellen_protection',
      showIf: (context) => context.flags.visited_attic === true
    },
    {
      text: '🚪 "대화를 마칩니다"',
      nextNode: 'basement_entrance'
    }
  ]
}
```

---

## 2. 여관 허브 구현 예시

### 책상 조사 → 편지 획득 → 엘렌 각성

```typescript
// ========== 여관 방 조사 허브 ==========
inn_drebber_room: {
  id: 'inn_drebber_room',
  day: 1,
  timeOfDay: 'evening',
  location: 'inn',
  text: `드레버의 여관 방...

무엇을 조사하시겠습니까?`,
  choices: [
    {
      text: '📖 책상을 조사한다',
      nextNode: 'inn_room_desk',
      hideIfVisitedNode: 'inn_room_desk'
    },
    {
      text: '🥾 진흙 샘플을 채취한다',
      nextNode: 'inn_mud_sample',
      hideIfVisitedNode: 'inn_mud_sample'
    },
    {
      text: '🚪 방을 나간다',
      nextNode: 'inn_entrance'
    }
  ]
},

// ========== 책상 조사 (편지 발견) ==========
inn_room_desk: {
  id: 'inn_room_desk',
  day: 1,
  timeOfDay: 'evening',
  location: 'inn',
  speaker: 'watson',
  text: `책상 서랍을 연다.

협박 편지들이 가득하다.

"당신의 빚을 갚을 방법이 있소. 백작을 만나시오. - S"

홈즈가 편지를 읽는다.

[홈즈]: "S"... 스탠거슨일 가능성이 높아.

서랍 맨 아래에서... 또 다른 편지를 발견한다.

낡고 찢어진 종이... 여성의 필체...

"사랑하는 제퍼슨에게... 백작이 아버지를 속였어요... 저는 병에 걸렸어요... 제발... - Lucy"

[왓슨]: 이건... 루시의 편지!`,
  choices: [
    {
      text: '📜 루시의 편지를 가져간다',
      nextNode: 'acquire_lucy_letter',
      onSelect: (context) => {
        context.flags.has_lucy_letter = true;
        context.addItem('루시의 편지');
      }
    }
  ]
},

acquire_lucy_letter: {
  id: 'acquire_lucy_letter',
  day: 1,
  timeOfDay: 'evening',
  speaker: 'system',
  text: `**[획득: 루시의 편지]**

엘렌에게 어머니의 편지를 보여줄 수 있습니다.`,
  choices: [
    { text: '🔙 방으로 돌아간다', nextNode: 'inn_drebber_room' }
  ]
},

// ========== 엘렌 허브 (편지 선택지 해금) ==========
ellen_hub: {
  id: 'ellen_hub',
  day: 1,
  timeOfDay: 'evening',
  character: 'ellen',
  text: `엘렌이 조용히 당신을 기다린다.

무엇을 물어보시겠습니까?`,
  choices: [
    {
      text: '🌹 "어머니 루시에 대해 들려주세요"',
      nextNode: 'ellen_lucy_memory',
      hideIfVisitedNode: 'ellen_lucy_memory'
    },
    {
      text: '📜 "루시의 편지를 찾았습니다"',
      nextNode: 'show_lucy_letter_to_ellen',
      hideIfVisitedNode: 'show_lucy_letter_to_ellen',
      showIf: (context) => context.flags.has_lucy_letter === true,
      // 조건부 표시: 편지를 가지고 있을 때만
    },
    {
      text: '🚪 "이제 가보겠습니다"',
      nextNode: 'bedroom'
    }
  ]
},

// ========== 엘렌 각성 (편지 전달) ==========
show_lucy_letter_to_ellen: {
  id: 'show_lucy_letter_to_ellen',
  day: 1,
  timeOfDay: 'evening',
  character: 'ellen',
  speaker: 'watson',
  text: `"엘렌 양, 이것을 보십시오."

당신이 우물에서 찾은 편지를 꺼낸다.

엘렌이 편지를 받아든다.

[엘렌]: 이건...

그녀가 떨리는 손으로 편지를 읽는다.

눈물이 흐른다.

[엘렌]: 어머니의... 글씨...

[엘렌]: 제가 태어나기 직전에... 쓰신 거예요...

그녀가 편지를 가슴에 안는다.`,
  choices: [
    {
      text: '💬 "호프가 이 편지를 남겼습니다"',
      nextNode: 'ellen_hope_left_letter',
      onSelect: (context) => {
        context.flags.ellen_knows_truth = true;
        context.flags.ellen_awakened = true;
      }
    }
  ]
}
```

---

## 3. 스탠거슨 허브 구현 예시

### 허브-스포크 구조 + 진행 추적

```typescript
// ========== 스탠거슨 허브 (중앙 노드) ==========
stangerson_hub: {
  id: 'stangerson_hub',
  day: 1,
  timeOfDay: 'evening',
  location: 'library',
  character: 'stangerson',
  text: `스탠거슨이 당신을 기다린다.

무엇을 물어보시겠습니까?`,
  choices: [
    {
      text: '🌙 "3일 전 밤의 일을 말씀해주세요"',
      nextNode: 'stangerson_that_night',
      hideIfVisitedNode: 'stangerson_that_night',
      showIf: (context) => context.flags.found_threatening_letter === true
    },
    {
      text: '💬 "드레버와 어떤 관계입니까?"',
      nextNode: 'stangerson_knows_drebber',
      hideIfVisitedNode: 'stangerson_knows_drebber'
    },
    {
      text: '🔍 "백작은 어디 계십니까?"',
      nextNode: 'stangerson_count_location',
      hideIfVisitedNode: 'stangerson_count_location'
    },
    {
      text: '📜 "증거를 제시합니다"',
      nextNode: 'stangerson_confront_evidence',
      showIf: (context) => {
        // 모든 질문 완료 체크
        return context.visitedNodes.includes('stangerson_that_night') &&
               context.visitedNodes.includes('stangerson_knows_drebber') &&
               context.visitedNodes.includes('stangerson_count_location');
      }
    },
    {
      text: '🚪 "심문을 마칩니다"',
      nextNode: 'study'
    }
  ]
},

// ========== 질문 노드 (스포크) - 항상 허브로 복귀 ==========
stangerson_that_night: {
  id: 'stangerson_that_night',
  day: 1,
  timeOfDay: 'evening',
  location: 'library',
  character: 'stangerson',
  speaker: 'watson',
  text: `"3일 전 밤... 무슨 일이 있었습니까?"

스탠거슨이 망설인다.

[스탠거슨]: 저는... 일찍 잠들었습니다...

[왓슨]: 거짓말입니다. 증거가 있습니다.

협박 편지를 보여준다.

스탠거슨의 얼굴이 창백해진다.

[스탠거슨]: ...그건...

[홈즈]: 당신이 보낸 편지입니다. 드레버를 협박한...

스탠거슨이 고개를 숙인다.`,
  choices: [
    { 
      text: '🔙 "다른 것을 묻겠습니다"', 
      nextNode: 'stangerson_hub',  // 항상 허브로!
      onSelect: (context) => {
        context.flags.asked_stangerson_night = true;
      }
    }
  ]
},

stangerson_knows_drebber: {
  id: 'stangerson_knows_drebber',
  day: 1,
  timeOfDay: 'evening',
  location: 'library',
  character: 'stangerson',
  text: `[왓슨]: 드레버와 어떤 관계입니까?

스탠거슨이 대답한다.

[스탠거슨]: 채무 관계입니다... 백작님께서 드레버에게 돈을 빌려주셨고...

[홈즈]: 그래서 당신이 추심을 맡았군요.

스탠거슨이 고개를 끄덕인다.`,
  choices: [
    { 
      text: '🔙 "다른 것을 묻겠습니다"', 
      nextNode: 'stangerson_hub',  // 항상 허브로!
      onSelect: (context) => {
        context.flags.asked_stangerson_drebber = true;
      }
    }
  ]
},

stangerson_count_location: {
  id: 'stangerson_count_location',
  day: 1,
  timeOfDay: 'evening',
  location: 'library',
  character: 'stangerson',
  text: `[왓슨]: 백작은 어디 계십니까?

스탠거슨이 눈을 피한다.

[스탠거슨]: 저도... 모릅니다...

[홈즈]: 거짓말입니다.

홈즈가 다가간다.

[홈즈]: 당신은 백작의 비서입니다. 모를 리가 없어.

스탠거슨이 떨린다.`,
  choices: [
    { 
      text: '🔙 "다른 것을 묻겠습니다"', 
      nextNode: 'stangerson_hub',  // 항상 허브로!
      onSelect: (context) => {
        context.flags.asked_stangerson_count = true;
      }
    }
  ]
},

// ========== 증거 제시 (모든 질문 완료 후) ==========
stangerson_confront_evidence: {
  id: 'stangerson_confront_evidence',
  day: 1,
  timeOfDay: 'evening',
  location: 'library',
  character: 'stangerson',
  speaker: 'watson',
  text: `"이제 진실을 말할 시간입니다."

당신이 증거들을 펼친다.

협박 편지... 의식 계획 메모... 교단 문서...

스탠거슨의 얼굴이 창백해진다.

[스탠거슨]: 저, 저는...

홈즈가 한 발짝 다가선다.

[홈즈]: 당신이 모든 것을 계획했습니다.

[홈즈]: 백작을 이용해... 엘렌을 의식에 바치려 했죠.

스탠거슨이 무너진다.

[스탠거슨]: ...인정합니다.`,
  choices: [
    { 
      text: '💡 "폭로합니다"', 
      nextNode: 'stangerson_reveals_drebber_plan',
      onSelect: (context) => {
        context.flags.stangerson_confessed = true;
      }
    }
  ]
}
```

---

## 4. 엘렌 허브 구현 예시

### 단서 기반 대화 해금 + 각성 체인

```typescript
// ========== 엘렌 허브 ==========
ellen_hub: {
  id: 'ellen_hub',
  day: 1,
  timeOfDay: 'evening',
  character: 'ellen',
  text: `엘렌이 조용히 당신을 기다린다.

무엇을 물어보시겠습니까?`,
  choices: [
    {
      text: '🌹 "어머니 루시에 대해 들려주세요"',
      nextNode: 'ellen_lucy_memory',
      hideIfVisitedNode: 'ellen_lucy_memory'
    },
    {
      text: '💬 "백작님은 어디 계신가요?"',
      nextNode: 'ellen_knows_count_missing',
      hideIfVisitedNode: 'ellen_knows_count_missing'
    },
    {
      text: '🔍 "어디에 숨어계셨나요?"',
      nextNode: 'ellen_hiding_place',
      hideIfVisitedNode: 'ellen_hiding_place'
    },
    {
      text: '📜 "루시의 편지를 찾았습니다"',
      nextNode: 'show_lucy_letter_to_ellen',
      requiredItem: '루시의 편지',
      hideIfVisitedNode: 'show_lucy_letter_to_ellen',
      // 아이템 보유 시에만 표시
    },
    {
      text: '🎯 "함께 백작과 호프를 찾읍시다"',
      nextNode: 'ellen_ready_to_confront',
      hideIfVisitedNode: 'ellen_ready_to_confront',
      showIf: (context) => {
        // 2개 조건 충족 필요
        return context.visitedNodes.includes('show_lucy_letter_to_ellen') &&
               context.visitedNodes.includes('ellen_lucy_memory');
      }
    },
    {
      text: '🚪 "이제 가보겠습니다"',
      nextNode: 'bedroom'
    }
  ]
},

// ========== 루시 기억 ==========
ellen_lucy_memory: {
  id: 'ellen_lucy_memory',
  day: 1,
  timeOfDay: 'evening',
  character: 'ellen',
  text: `[엘렌]: 어머니... 루시...

그녀가 조용히 말한다.

[엘렌]: 한 번도 만난 적 없어요. 하지만...

[엘렌]: 백작님이 자주 말씀하셨어요.

[엘렌]: "네 어머니는 아름다웠다... 너는 그녀를 닮았다"고...

엘렌이 로켓을 꺼내 펼친다.

안에 루시의 초상화가 들어있다.

[엘렌]: 이것만 가지고 있어요...`,
  choices: [
    { text: '🔙 "다른 것을 묻겠습니다"', nextNode: 'ellen_hub' }
  ]
},

// ========== 편지 전달 (각성 체인 시작) ==========
show_lucy_letter_to_ellen: {
  id: 'show_lucy_letter_to_ellen',
  day: 1,
  timeOfDay: 'evening',
  character: 'ellen',
  speaker: 'watson',
  text: `"엘렌 양, 이것을 보십시오."

당신이 우물에서 찾은 편지를 꺼낸다.

엘렌이 편지를 받아든다.

[엘렌]: 이건...

그녀가 떨리는 손으로 편지를 읽는다.

"사랑하는 제퍼슨에게... 백작이 아버지를 속였어요... 제발... - Lucy"

엘렌의 눈에서 눈물이 흐른다.

[엘렌]: 어머니의... 글씨...`,
  choices: [
    {
      text: '💬 "호프가 이 편지를 남겼습니다"',
      nextNode: 'ellen_hope_left_letter',
      onSelect: (context) => {
        // 각성 플래그 설정
        context.flags.ellen_knows_truth = true;
        context.flags.ellen_awakened = true;
      }
    }
  ]
},

// ========== 각성 완료 ==========
ellen_hope_left_letter: {
  id: 'ellen_hope_left_letter',
  day: 1,
  timeOfDay: 'evening',
  character: 'ellen',
  text: `[엘렌]: 호프님이... 이 편지를...

[왓슨]: 네. 우물가에 남겨두셨습니다.

[엘렌]: 20년... 20년간 간직하고 계셨군요...

그녀가 편지를 가슴에 안는다.

[엘렌]: 호프님은... 제 친아버지... 맞나요?

침묵이 흐른다.

[엘렌]: 이제... 두 분을 만나야 해요.

엘렌이 일어선다.

**[엘렌 각성 완료]**`,
  choices: [
    { text: '🔙 "엘렌과 대화합니다"', nextNode: 'ellen_hub' }
  ]
},

// ========== 최종 준비 (2개 조건 충족 후) ==========
ellen_ready_to_confront: {
  id: 'ellen_ready_to_confront',
  day: 1,
  timeOfDay: 'evening',
  character: 'ellen',
  text: `엘렌이 결연한 표정을 짓는다.

[엘렌]: 네. 함께 가겠습니다.

그녀가 편지와 로켓을 챙긴다.

[엘렌]: 이제... 모든 진실을 밝힐 시간이에요.

홈즈가 고개를 끄덕인다.

[홈즈]: 용감합니다.

셋이 함께 문을 나선다.`,
  choices: [
    { 
      text: '🚪 지하실로 향한다', 
      nextNode: 'ellen_to_basement',
      requiredVisitedNode: 'find_basement'
    }
  ]
}
```

---

## 5. 최종 추리 허브 구현 예시

### 진입 조건 + 용의자 지목 + 증거 제시

```typescript
// ========== 진입 체크포인트 ==========
final_deduction_checkpoint: {
  id: 'final_deduction_checkpoint',
  day: 1,
  timeOfDay: 'evening',
  character: 'holmes',
  // 조건부 텍스트
  conditionalText: [
    {
      condition: (context) => {
        const hasEnoughEvidence = context.items.length >= 3;
        const visitedKeyLocations = [
          'examine_ritual_tools',
          'read_count_confession',
          'inn_conclusion'
        ].every(node => context.visitedNodes.includes(node));
        const talkedToNPCs = [
          'stangerson_hub',
          'count_hub'
        ].some(node => context.visitedNodes.includes(node));
        
        return hasEnoughEvidence && visitedKeyLocations && talkedToNPCs;
      },
      text: `홈즈가 모든 증거를 정리한다.

[홈즈]: 왓슨, 이제 모든 조각이 맞춰졌어.

당신이 증거들을 나열한다:
• ${(context) => context.items.join('\n• ')}

[홈즈]: 루시의 죽음, 엘렌의 감금, 호프의 복수, 백작의 속죄...

[홈즈]: 그리고... 진범.

홈즈가 당신을 본다.

[홈즈]: 왓슨, 자네가 말해보게. 누가 이 모든 일을 꾸몄을까?`
    }
  ],
  text: `홈즈가 증거를 정리하려 하지만... 멈춘다.

[홈즈]: 왓슨, 아직 충분하지 않아.

**[힌트: 지하실 의식실을 조사하고, 백작/스탠거슨과 대화하세요]**`,
  choices: [
    { 
      text: '💎 "추리를 시작합니다"', 
      nextNode: 'final_deduction_hub',
      showIf: (context) => {
        const hasEnoughEvidence = context.items.length >= 3;
        const visitedKeyLocations = [
          'examine_ritual_tools',
          'read_count_confession'
        ].some(node => context.visitedNodes.includes(node));
        
        return hasEnoughEvidence || visitedKeyLocations;
      }
    },
    { 
      text: '🔍 "더 조사하겠습니다"', 
      nextNode: 'main_entrance' 
    }
  ]
},

// ========== 추리 허브 (용의자 지목) ==========
final_deduction_hub: {
  id: 'final_deduction_hub',
  day: 1,
  timeOfDay: 'evening',
  character: 'holmes',
  text: `홈즈가 서재 한가운데 선다.

[홈즈]: 자, 이제 시작하지. 주홍색 연구의 마지막 장을...

누구를 지목하시겠습니까?`,
  choices: [
    { 
      text: '🎯 제퍼슨 호프 - "복수자"', 
      nextNode: 'accuse_hope',
      hideIfVisitedNode: 'accuse_hope'
    },
    { 
      text: '🎯 이노크 드레버 - "채무자"', 
      nextNode: 'accuse_drebber',
      hideIfVisitedNode: 'accuse_drebber'
    },
    { 
      text: '🎯 조셉 스탠거슨 - "비서"', 
      nextNode: 'accuse_stangerson',
      hideIfVisitedNode: 'accuse_stangerson'
    },
    { 
      text: '🎯 모로 백작 - "교단 설교자"', 
      nextNode: 'accuse_count',
      hideIfVisitedNode: 'accuse_count'
    },
    {
      text: '💡 "증거를 다시 검토합니다"',
      nextNode: 'review_evidence'
    }
  ]
},

// ========== 정답: 스탠거슨 지목 ==========
accuse_stangerson: {
  id: 'accuse_stangerson',
  day: 1,
  timeOfDay: 'evening',
  character: 'holmes',
  speaker: 'watson',
  text: `"스탠거슨이 범인입니다."

홈즈의 눈이 빛난다.

[홈즈]: 근거를 말해보게.

[왓슨]: 협박 편지의 서명 "S"... 스탠거슨입니다.

[왓슨]: 의식 계획 메모도... 스탠거슨의 필체일 가능성이 있습니다.

홈즈가 서재 서랍을 연다.

[홈즈]: 왓슨, 이것 보게.

교단 문서... "영원한 구원 교단 - 런던 지부장 조셉 스탠거슨"

[왓슨]: ...!

[홈즈]: 스탠거슨이... 진범이야.`,
  choices: [
    { text: '💡 "추궁합시다!"', nextNode: 'confront_stangerson' }
  ]
},

// ========== 추궁 시작 (역전재판 스타일) ==========
confront_stangerson: {
  id: 'confront_stangerson',
  day: 1,
  timeOfDay: 'evening',
  location: 'library',
  character: 'stangerson',
  text: `홈즈와 당신이 서재로 스탠거슨을 불러들인다.

[스탠거슨]: 무슨... 일이십니까?

홈즈가 증거들을 테이블에 펼친다.

[홈즈]: 스탠거슨 씨. 이제 진실을 말할 시간입니다.

[홈즈]: 증거가 있습니다.`,
  choices: [
    { text: '📜 [협박 편지 제시]', nextNode: 'present_threatening_letters' },
    { text: '📖 [교단 문서 제시]', nextNode: 'present_cult_documents' },
    { text: '🔑 [의식실 열쇠 제시]', nextNode: 'present_ritual_key' }
  ]
},

// ========== 증거 제시 1단계 ==========
present_threatening_letters: {
  id: 'present_threatening_letters',
  day: 1,
  timeOfDay: 'evening',
  location: 'library',
  character: 'stangerson',
  text: `홈즈가 협박 편지를 펼친다.

[홈즈]: 드레버에게 보낸 편지입니다. 서명은 "S".

스탠거슨이 떨린다.

[스탠거슨]: 저, 저는... 그건...

[홈즈]: 필적 감정을 받을까요?

스탠거슨이 고개를 숙인다.

[스탠거슨]: ...인정합니다.`,
  choices: [
    { text: '📖 [교단 문서 제시]', nextNode: 'present_cult_documents' }
  ]
},

// ========== 증거 제시 2단계 ==========
present_cult_documents: {
  id: 'present_cult_documents',
  day: 1,
  timeOfDay: 'evening',
  location: 'library',
  character: 'stangerson',
  text: `홈즈가 교단 문서를 펼친다.

[홈즈]: "영원한 구원 교단 - 런던 지부장 조셉 스탠거슨"

[홈즈]: 당신은 여전히 교단의 신도였습니다.

스탠거슨이 눈을 감는다.

[스탠거슨]: 저는... 신의 계시를...

[홈즈]: 광신입니다. 그리고... 살인 미수입니다.`,
  choices: [
    { text: '🔑 [의식실 열쇠 제시]', nextNode: 'present_ritual_key' }
  ]
},

// ========== 증거 제시 3단계 (최종) ==========
present_ritual_key: {
  id: 'present_ritual_key',
  day: 1,
  timeOfDay: 'evening',
  location: 'library',
  character: 'stangerson',
  text: `홈즈가 의식실 열쇠를 테이블에 놓는다.

[홈즈]: 의식실을 만든 건 당신입니다.

스탠거슨이 주저앉는다.

[스탠거슨]: 저는... 저는 신의 명령을...

홈즈가 조용히 말한다.

[홈즈]: 미쳤군요.

**[스탠거슨 자백 완료]**`,
  choices: [
    { 
      text: '⚖️ "경찰에 넘깁니다"', 
      nextNode: 'stangerson_to_police',
      onSelect: (context) => {
        context.flags.stangerson_confessed = true;
      }
    },
    { text: '💬 "백작과 대면시킵니다"', nextNode: 'stangerson_meets_count' },
    { text: '🌹 "엘렌을 데려옵니다"', nextNode: 'stangerson_meets_ellen' }
  ]
}
```

---

## 6. 공통 패턴 (재사용 가능)

### 패턴 1: 조사 → 플래그 설정

```typescript
// 표준 조사 노드 템플릿
investigation_node_template: {
  id: 'investigation_node_template',
  type: 'investigation',
  text: `조사 장면 묘사`,
  choices: [
    {
      text: '🔍 증거를 획득한다',
      nextNode: 'acquire_clue',
      onSelect: (context) => {
        // 플래그 설정
        context.flags.clue_found = true;
        // 아이템 추가
        context.addItem('증거 이름');
      }
    }
  ]
}
```

### 패턴 2: 허브-스포크 복귀

```typescript
// 질문 노드 템플릿 (항상 허브로)
dialogue_spoke_template: {
  id: 'dialogue_spoke_template',
  type: 'dialogue',
  text: `대화 내용`,
  choices: [
    {
      text: '🔙 "다른 것을 묻겠습니다"',
      nextNode: 'dialogue_hub',  // 항상 허브로!
      onSelect: (context) => {
        // 진행 추적
        context.flags.asked_this_question = true;
      }
    }
  ]
}
```

### 패턴 3: 조건부 선택지

```typescript
// 조건부 선택지 템플릿
conditional_choice_template: {
  choices: [
    {
      text: '🎯 단서 필요 선택지',
      nextNode: 'next_node',
      showIf: (context) => context.flags.clue_found === true,
      hideIfVisitedNode: 'next_node'
    },
    {
      text: '💎 복수 조건 선택지',
      nextNode: 'special_node',
      showIf: (context) => {
        return context.flags.clue_a === true &&
               context.flags.clue_b === true &&
               context.items.includes('특정 아이템');
      },
      hideIfVisitedNode: 'special_node'
    }
  ]
}
```

### 패턴 4: 강제 전환

```typescript
// 자백/폭로 노드 템플릿
confession_node_template: {
  id: 'confession_node_template',
  type: 'cutscene',
  text: `자백 장면`,
  choices: [
    {
      text: '▶️ 계속',
      nextNode: 'next_scene',  // 자동 진행
      onSelect: (context) => {
        context.flags.character_confessed = true;
      }
    }
  ]
}
```

---

## 7. Context API 레퍼런스

### 사용 가능한 Context 속성

```typescript
interface GameContext {
  // 플래그 (불린 값)
  flags: {
    [key: string]: boolean;
  };
  
  // 방문한 노드 목록
  visitedNodes: string[];
  
  // 보유 아이템
  items: string[];
  
  // 현재 시간
  currentTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  
  // 현재 Day
  currentDay: number;
  
  // 헬퍼 함수
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  hasItem: (item: string) => boolean;
  setFlag: (flag: string, value: boolean) => void;
  getFlag: (flag: string) => boolean;
}
```

### 사용 예시

```typescript
// 플래그 체크
showIf: (context) => context.flags.clue_found === true

// 방문 노드 체크
showIf: (context) => context.visitedNodes.includes('important_scene')

// 아이템 체크
showIf: (context) => context.items.includes('루시의 편지')

// 복합 조건
showIf: (context) => {
  const hasEvidence = context.flags.clue_ritual_found;
  const metEllen = context.visitedNodes.includes('attic_ellen_first_meet');
  const hasLetter = context.items.includes('루시의 편지');
  
  return hasEvidence && metEllen && hasLetter;
}
```

---

## 8. 디버깅 팁

### 자주 발생하는 문제

```typescript
// ❌ 문제: 선택지가 안 보임
{
  text: '특정 선택지',
  nextNode: 'next',
  showIf: (context) => context.flags.some_flag === true  // 플래그 이름 확인!
}

// ✅ 해결: 플래그 이름 일치 확인
onSelect: (context) => {
  context.flags.some_flag = true;  // 같은 이름!
}

// ❌ 문제: 무한 루프
{
  text: '질문',
  nextNode: 'answer'  // 복귀 경로 없음!
}

// ✅ 해결: 항상 허브로 복귀
answer: {
  choices: [
    { text: '돌아간다', nextNode: 'hub' }  // 허브로!
  ]
}

// ❌ 문제: 같은 선택지 반복
{
  text: '이미 물었던 질문',
  nextNode: 'answer'  // hideIfVisited 없음!
}

// ✅ 해결: hideIfVisitedNode 추가
{
  text: '질문',
  nextNode: 'answer',
  hideIfVisitedNode: 'answer'  // 방문 후 숨김
}
```

---

**최종 업데이트:** 2024-12-19  
**버전:** 1.0.0  
**상태:** ✅ 완성
