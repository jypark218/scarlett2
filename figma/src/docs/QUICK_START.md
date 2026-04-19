# 🚀 빠른 시작 가이드

## 개발자 도구 사용하기

### 1. 게임 실행
```bash
npm run dev
```

### 2. 개발자 도구 열기

#### 방법 A: UI 도구 사용
1. 게임 화면에서 우측 하단 **⚙️ 버튼** 클릭
2. 개발자 도구 패널 열림
3. "모든 노드 검증" 버튼 클릭

#### 방법 B: 콘솔 사용
1. **F12**를 눌러 브라우저 개발자 도구 열기
2. **Console** 탭으로 이동
3. 다음 명령어 입력:

```javascript
// 사용법 확인
devTools.help()

// 전체 검증
devTools.validate()

// 문제 노드 목록
devTools.problems()
```

## 자주 사용하는 명령어

### 🔍 검증
```javascript
// 전체 스토리 검증
devTools.validate()

// 특정 노드 검증
devTools.validateNode('start')

// 에러만 있는 노드 찾기
devTools.problems('error')
```

### 🧪 테스트
```javascript
// 노드 파싱 테스트
devTools.testNode('start')

// 텍스트 파싱 테스트
devTools.testText('홈즈: 안녕하세요, 왓슨.')

// 화자 감지 테스트
devTools.detectSpeaker('홈즈가 말했다. "이상합니다."')
```

### 📚 정보
```javascript
// 지원하는 대화 형식
devTools.formats()

// 캐릭터 별칭 목록
devTools.aliases()

// 스토리 통계
devTools.stats()
```

## 일반적인 사용 흐름

### 1. 전체 검증 실행
```javascript
devTools.validate()
```

**결과 예시:**
```
🔍 대화 검증 리포트
📊 총 노드: 150, 검사된 노드: 120
❌ 에러: 0
⚠️ 경고: 5
ℹ️ 정보: 12
```

### 2. 문제 노드 확인
```javascript
devTools.problems()
```

**결과 예시:**
```
🚨 문제 노드 목록 (심각도: warning 이상)

총 5개 노드:
  1. investigation_start
  2. count_confrontation
  3. hope_flashback
  4. stangerson_death
  5. final_deduction
```

### 3. 개별 노드 테스트
```javascript
devTools.testNode('investigation_start')
```

**결과 예시:**
```
🔍 노드 검증: investigation_start

⚠️ 2개의 문제 발견:

[investigation_start] 낮은 신뢰도로 화자 감지됨 (65%)
  텍스트: "이상하군요. 여기에 흔적이..."
  감지된 화자: narrator
  신뢰도: 65%
  💡 제안: 가능한 화자: 셜록 홈즈 (점수: 8)

📜 파싱 결과:
  1. [내레이션] (100%): 홈즈가 방을 둘러보았다.
  2. [셜록 홈즈] (65%): 이상하군요. 여기에 흔적이...
```

### 4. 빠른 수정 제안
```javascript
devTools.quickFix('investigation_start')
```

**결과 예시:**
```
🔧 빠른 수정 제안: investigation_start

⚠️ 1개 라인이 낮은 신뢰도로 감지되었습니다.

1. 원본: "이상하군요. 여기에 흔적이..."
   신뢰도: 65%
   감지된 화자: narrator
   💡 제안: "holmes: 이상하군요. 여기에 흔적이..."
```

## 문제 해결

### Q: "낮은 신뢰도" 경고가 나옵니다

**A: 화자를 명시적으로 표시하세요**

```typescript
// 수정 전 (신뢰도 낮음)
text: `"이상한 일입니다."`

// 수정 후 (신뢰도 100%)
text: `홈즈: 이상한 일입니다.`
```

### Q: "캐릭터 불일치" 경고가 나옵니다

**A: 노드의 character 속성을 확인하세요**

```typescript
// 불일치 (경고 발생)
{
  id: 'some_node',
  character: 'watson',
  text: `홈즈: 이것은 단서입니다.`
}

// 수정 방법 1: character 속성 변경
{
  id: 'some_node',
  character: 'holmes',
  text: `홈즈: 이것은 단서입니다.`
}

// 수정 방법 2: 텍스트 변경
{
  id: 'some_node',
  character: 'watson',
  text: `왓슨: 이것은 단서입니다.`
}
```

### Q: "존재하지 않는 캐릭터" 에러가 나옵니다

**A: 캐릭터 ID 오타를 확인하세요**

```typescript
// 오타 (에러 발생)
character: 'gregsen'  // ❌

// 올바른 철자
character: 'gregson'  // ✅
```

**지원하는 캐릭터 ID:**
- `watson`, `holmes`, `gregson`, `count`
- `hope`, `stangerson`, `drebber`, `lucy`
- `narrator` (내레이션)

## 유용한 팁

### 1. 작업 전 검증
새 노드를 추가하기 전에 현재 상태를 확인:
```javascript
devTools.validate()
```

### 2. 작업 후 검증
변경 사항을 확인:
```javascript
devTools.testNode('새로운_노드_id')
```

### 3. 형식 가이드 확인
어떤 형식을 사용할 수 있는지 확인:
```javascript
devTools.formats()
```

### 4. 별칭 확인
캐릭터를 어떻게 표현할 수 있는지 확인:
```javascript
devTools.aliases()
```

### 5. 실시간 테스트
대화를 작성하면서 바로 테스트:
```javascript
devTools.testText(`
홈즈: 흥미로운 사건이군요.
왓슨: 어떤 점이 그러신가요?
홈즈: 모든 것이 너무 완벽합니다.
`)
```

## 권장 작업 흐름

1. **새 노드 작성**
   ```typescript
   {
     id: 'new_scene',
     text: `홈즈: 여기서 뭔가 발견했소.
왓슨: 무엇인가요?`,
     character: 'holmes',
     // ...
   }
   ```

2. **즉시 테스트**
   ```javascript
   devTools.testNode('new_scene')
   ```

3. **문제 수정**
   - 경고나 에러가 있으면 제안에 따라 수정

4. **전체 검증**
   ```javascript
   devTools.validate()
   ```

5. **커밋 전 최종 확인**
   ```javascript
   devTools.problems('error')  // 에러가 0개여야 함
   ```

## 다음 단계

- 📖 [상세 가이드 보기](/docs/DIALOGUE_SYSTEM.md)
- 🏗️ [시스템 아키텍처 이해하기](/docs/SYSTEM_ARCHITECTURE.md)
- 🎭 [캐릭터 매칭 시스템](/utils/characterMatcher.ts)
- 🔍 [검증 시스템](/utils/dialogueValidator.ts)

## 도움이 필요하신가요?

```javascript
// 언제든지 도움말 확인
devTools.help()
```

---

**Happy Coding! 🎮**
