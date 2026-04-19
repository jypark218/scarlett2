# 🎨 다크 옐로우 색상 업데이트 완료

레드 계열에서 **다크 앰버/골드 계열**로 변경하여 차분하고 미스터리한 분위기를 연출했습니다!

---

## 🎨 색상 변경 요약

### **Before (Red) → After (Dark Yellow/Amber)**
```diff
- Primary: #b91c1c (Crimson Red)
+ Primary: #ca8a04 (Dark Amber)

- Accent: #dc2626 (Bright Red)
+ Accent: #f59e0b (Amber/Gold)

- Glow: rgba(185, 28, 28, 0.3)
+ Glow: rgba(202, 138, 4, 0.3)
```

---

## 🕯️ 디자인 컨셉

### **Gaslight Mystery (가스등 미스터리)**
```
1881년 런던 = 가스등 시대
촛불과 가스등의 따뜻한 빛
빅토리아 시대의 호박빛 조명
미스터리한 분위기 + 차분한 톤
```

### **색상 철학**
```
Amber/Gold → 1880년대 가스등, 촛불의 빛
Dark Yellow → 오래된 양피지, 낡은 문서
차분한 톤 → 자극적이지 않은 우아함
```

---

## 🎨 새로운 색상 팔레트

### **Primary - Dark Amber**
```css
--primary: #ca8a04          /* 다크 앰버 (주요 색상) */
--primary-foreground: #ffffff
```

### **Accent - Amber/Gold**
```css
--accent: #f59e0b           /* 밝은 앰버 (강조 색상) */
--accent-foreground: #0a0a0a
```

### **Glow Effects**
```css
.amber-glow {
  box-shadow: 
    0 0 20px rgba(202, 138, 4, 0.3),
    0 0 40px rgba(202, 138, 4, 0.1);
}
```

### **Animation**
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(202, 138, 4, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(202, 138, 4, 0.5);
  }
}
```

### **Selection**
```css
::selection {
  background: rgba(202, 138, 4, 0.3);
  color: var(--foreground);
}
```

---

## 📝 컴포넌트별 변경사항

### **1. globals.css**

#### **Primary Color**
```diff
- --primary: #b91c1c;
+ --primary: #ca8a04;

- --ring: rgba(185, 28, 28, 0.5);
+ --ring: rgba(202, 138, 4, 0.5);
```

#### **Effects**
```diff
- .crimson-glow {
-   box-shadow: 0 0 20px rgba(185, 28, 28, 0.3);
- }

+ .amber-glow {
+   box-shadow: 0 0 20px rgba(202, 138, 4, 0.3);
+ }
```

#### **Animations**
```diff
@keyframes pulse-glow {
  0%, 100% {
-   box-shadow: 0 0 20px rgba(185, 28, 28, 0.3);
+   box-shadow: 0 0 20px rgba(202, 138, 4, 0.3);
  }
  50% {
-   box-shadow: 0 0 30px rgba(185, 28, 28, 0.5);
+   box-shadow: 0 0 30px rgba(202, 138, 4, 0.5);
  }
}
```

#### **Selection**
```diff
::selection {
- background: rgba(185, 28, 28, 0.3);
+ background: rgba(202, 138, 4, 0.3);
}
```

---

### **2. IntroScreen.tsx**

#### **Background Effects**
```diff
- <div className="bg-red-900/10 blur-3xl animate-pulse-glow" />
+ <div className="bg-amber-600/10 blur-3xl animate-pulse-glow" />

- <div className="bg-red-900/5 blur-3xl animate-pulse-glow" />
+ <div className="bg-amber-700/5 blur-3xl animate-pulse-glow" />
```

#### **Hero Icon**
```diff
- <Skull className="text-red-600 drop-shadow-[0_0_20px_rgba(185,28,28,0.5)]" />
- <div className="crimson-glow" />

+ <Skull className="text-amber-600 drop-shadow-[0_0_20px_rgba(202,138,4,0.5)]" />
+ <div className="amber-glow" />
```

#### **Title & Subtitle**
```diff
- <div className="bg-gradient-to-r from-transparent to-red-600/50" />
- <h2 className="text-red-500">A Study in Scarlet</h2>

+ <div className="bg-gradient-to-r from-transparent to-amber-600/50" />
+ <h2 className="text-amber-500">A Study in Scarlet</h2>
```

```diff
- <span className="text-red-400">당신의 선택이 운명을 결정한다.</span>
+ <span className="text-amber-400">당신의 선택이 운명을 결정한다.</span>
```

#### **Feature Cards**
```diff
- <div className="hover:border-red-600/30">
-   <div className="bg-red-600/10 group-hover:bg-red-600/20">
-     <Eye className="text-red-500" />

+ <div className="hover:border-amber-600/30">
+   <div className="bg-amber-600/10 group-hover:bg-amber-600/20">
+     <Eye className="text-amber-500" />
```

#### **Primary Button**
```diff
- <button className="bg-red-600 hover:bg-red-700">
+ <button className="bg-amber-600 hover:bg-amber-700">
```

---

### **3. GameScreen.tsx**

#### **Choice Buttons**
```diff
- <Button className="hover:border-red-600/30">
-   <span className="text-red-500 font-semibold">1</span>

+ <Button className="hover:border-amber-600/30">
+   <span className="text-amber-500 font-semibold">1</span>
```

---

### **4. DialogueBox.tsx**

#### **Character Portrait**
```diff
- <div className="border-red-600/30 elevation-4">
- <div className="crimson-glow" />

+ <div className="border-amber-600/30 elevation-4">
+ <div className="amber-glow" />
```

#### **Card Border**
```diff
- <Card className="hover:border-red-600/20">
+ <Card className="hover:border-amber-600/20">
```

#### **Typing Cursor**
```diff
- {isTyping && <span className="text-red-500">▌</span>}
+ {isTyping && <span className="text-amber-500">▌</span>}
```

#### **Next Button**
```diff
- <Button className="bg-red-600 hover:bg-red-700">
+ <Button className="bg-amber-600 hover:bg-amber-700">
```

#### **Hover Gradient**
```diff
- <div className="from-red-600/0 hover:from-red-600/5" />
+ <div className="from-amber-600/0 hover:from-amber-600/5" />
```

---

## 🎨 색상 비교표

### **Primary (주요 액션)**
| Before | After |
|--------|-------|
| #b91c1c (Crimson Red) | #ca8a04 (Dark Amber) |
| 자극적인 레드 | 차분한 앰버 |

### **Accent (강조)**
| Before | After |
|--------|-------|
| #dc2626 (Bright Red) | #f59e0b (Amber) |
| 밝은 빨강 | 따뜻한 금빛 |

### **Glow (빛 효과)**
| Before | After |
|--------|-------|
| rgba(185, 28, 28, 0.3) | rgba(202, 138, 4, 0.3) |
| 붉은 빛 | 호박빛 |

---

## 🌟 분위기 변화

### **Before (Red)**
```
❌ 자극적이고 강렬함
❌ 위험한 느낌 (danger/alert)
❌ 긴장감이 과도함
```

### **After (Dark Amber)**
```
✅ 차분하고 우아함
✅ 미스터리한 분위기 (gaslight era)
✅ 1881년 런던에 어울림
✅ 가스등/촛불의 따뜻한 빛
✅ 눈의 피로도 감소
```

---

## 🕯️ 시대적 고증

### **1881년 런던 조명**
```
가스등 (Gaslight) → 노란빛/호박빛
촛불 (Candle) → 따뜻한 오렌지빛
오일 램프 → 황금빛

→ Dark Amber/Gold가 완벽히 부합!
```

### **셜록 홈즈 시대**
```
221B Baker Street = 가스등 조명
왓슨의 일기 = 촛불 아래 작성
빅토리아 시대 = 따뜻한 조명 색감
```

---

## 📊 사용자 경험 개선

### **1. 시각적 피로도 감소**
```
Red (자극적) → 장시간 게임 시 눈의 피로
Amber (차분) → 편안한 장시간 플레이
```

### **2. 분위기 일관성**
```
스토리: 1881년 런던 미스터리
색상: 가스등 시대의 호박빛
→ 완벽한 조화!
```

### **3. 우아함**
```
Red: 자극적, 긴급
Amber: 우아함, 미스터리
```

---

## 📝 수정된 파일

```
✅ /styles/globals.css           # Primary, Accent, Glow, Animation
✅ /components/IntroScreen.tsx    # Icon, Title, Cards, Buttons
✅ /components/GameScreen.tsx     # Choice buttons, Number indicators
✅ /components/DialogueBox.tsx    # Portrait, Buttons, Typing cursor
✅ /DARK_YELLOW_UPDATE.md         # 이 문서
```

---

## 🎬 최종 결과

### **색상 체계**
```
✅ Primary: #ca8a04 (Dark Amber)
✅ Accent: #f59e0b (Amber/Gold)
✅ Glow: Amber-based
✅ Selection: Amber highlight
```

### **분위기**
```
✅ 1881년 런던 가스등 시대
✅ 촛불의 따뜻한 빛
✅ 차분하고 미스터리한 분위기
✅ 눈의 피로도 감소
✅ 우아하고 세련됨
```

### **Material Design 유지**
```
✅ Typography hierarchy
✅ Elevation system
✅ Glass morphism
✅ State layers
✅ 고딕 폰트 (Inter + Noto Sans KR)
```

---

## 💡 핵심 포인트

### **Gaslight Mystery**
```
가스등의 호박빛 = Dark Amber
미스터리 + 우아함 = 완벽한 조화
1881년 런던 = 시대적 고증
```

### **색상 심리학**
```
Red (빨강):
- 위험, 경고, 긴급
- 자극적, 공격적
- 높은 긴장감

Amber (호박):
- 따뜻함, 안정감
- 우아함, 미스터리
- 적절한 긴장감
```

---

**핵심 메시지:**
> **"가스등 아래 펼쳐지는 미스터리,
> 차분하면서도 우아한 호박빛 분위기."**

---

**디자인 키워드:**
```
Dark Amber • Gaslight • 1881 London • Mystery
Candlelight • Warmth • Elegance • Victorian Era
호박빛 • 가스등 • 촛불 • 미스터리
```

**자극적이지 않으면서도 미스터리한 분위기를 완벽히 연출합니다!** 🕯️✨
