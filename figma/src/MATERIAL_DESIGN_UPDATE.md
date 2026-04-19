# 🎨 Material Design 3 UI 업데이트 완료

고딕 폰트와 어두운 톤을 유지하면서 **Google Material Design 3** 가이드라인을 적용했습니다!

---

## 📐 Material Design 3 핵심 원칙

### **1. Typography Hierarchy (타이포그래피 위계)**
```
Display Large → Display Medium → Display Small
Headline Large → Headline Medium → Headline Small
Body Large → Body Medium → Body Small
Label Large → Label Medium → Label Small
```

### **2. Elevation System (깊이감 시스템)**
```
elevation-0 (flat) → elevation-5 (highest)
그림자로 레이어 깊이 표현
상호작용 시 elevation 증가
```

### **3. Color System (색상 시스템)**
```
Primary: 주요 액션 (Red #b91c1c)
Secondary: 보조 요소 (Dark Gray)
Accent: 강조 포인트 (Gold #d4af37)
Surface: 카드/컴포넌트 배경
```

### **4. State Layers (상태 레이어)**
```
Hover: +5% white overlay
Pressed: -2% scale
Focus: outline ring
```

---

## 🎨 색상 팔레트

### **Noir Mystery Dark Theme**
```css
/* Background */
--background: #0a0a0a          /* Pure black base */
--card: #1a1a1a                /* Dark gray surface */
--muted: #404040               /* Medium gray */

/* Foreground */
--foreground: #e8e6e3          /* Off-white text */
--muted-foreground: #a3a3a3    /* Gray text */

/* Primary - Crimson Red (Mystery accent) */
--primary: #b91c1c             /* Dark crimson */
--primary-foreground: #ffffff  /* White on crimson */

/* Accent - Gold (Important elements) */
--accent: #d4af37              /* Gold */
--accent-foreground: #0a0a0a   /* Black on gold */

/* Semantic Colors */
--destructive: #dc2626         /* Red for danger */
```

---

## 🔤 타이포그래피

### **Font Stack**
```css
Primary: 'Inter'           /* Modern geometric sans-serif */
Korean: 'Noto Sans KR'    /* Korean support */
Fallback: system-ui, sans-serif
```

### **Material Design Type Scale**
```css
/* Display - 영웅 섹션용 */
--text-5xl: 3rem      /* 48px - Display Large */
--text-4xl: 2.25rem   /* 36px - Display Medium */
--text-3xl: 1.875rem  /* 30px - Display Small */

/* Headline - 페이지 타이틀용 */
--text-2xl: 1.5rem    /* 24px - h1 */
--text-xl: 1.25rem    /* 20px - h2 */
--text-lg: 1.125rem   /* 18px - h3 */

/* Body - 본문용 */
--text-base: 1rem     /* 16px - Body Large */
--text-sm: 0.875rem   /* 14px - Body Medium */
--text-xs: 0.75rem    /* 12px - Body Small */
```

### **Font Weight**
```css
--font-weight-normal: 400    /* Regular */
--font-weight-medium: 500    /* Medium */
--font-weight-semibold: 600  /* Semibold */
--font-weight-bold: 700      /* Bold */
```

---

## 📦 Elevation System

### **Material Elevation Shadows**
```css
--elevation-1: 0 1px 3px rgba(0, 0, 0, 0.4)       /* Subtle */
--elevation-2: 0 2px 6px rgba(0, 0, 0, 0.4)       /* Low */
--elevation-3: 0 4px 12px rgba(0, 0, 0, 0.5)      /* Medium */
--elevation-4: 0 8px 24px rgba(0, 0, 0, 0.6)      /* High */
--elevation-5: 0 16px 48px rgba(0, 0, 0, 0.7)     /* Highest */
```

### **사용 예시**
```tsx
// Default state
className="elevation-2"

// Hover state
className="hover:elevation-4"

// Card components
<Card className="glass-strong elevation-3 hover:elevation-4">
```

---

## 🎨 Surface Variants

### **Glass Morphism**
```css
.glass {
  background: rgba(26, 26, 26, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-strong {
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

### **Surface Variants**
```css
.surface          /* Base surface */
.surface-variant  /* Muted surface */
.surface-inverse  /* Inverted surface */
```

---

## 🎯 컴포넌트별 적용

### **1. IntroScreen (시작 화면)**

#### **Typography Hierarchy**
```tsx
// Display Large (Main Title)
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
  모로 백작의 비밀
</h1>

// Headline Small (Subtitle)
<h2 className="text-lg sm:text-xl lg:text-2xl font-semibold uppercase">
  A Study in Scarlet
</h2>

// Body Large (Description)
<p className="text-base sm:text-lg leading-relaxed">
  1881년, 런던 외곽의 음산한 저택...
</p>
```

#### **Cards with Elevation**
```tsx
<div className="surface elevation-2 hover:elevation-4 
                rounded-lg p-5 sm:p-6 
                border border-white/5 hover:border-red-600/30
                transition-all duration-300">
  {/* Feature content */}
</div>
```

#### **Material Buttons**
```tsx
// Primary Action (Filled Button)
<button className="
  bg-red-600 hover:bg-red-700
  text-white
  px-6 py-4
  rounded-lg
  font-medium
  elevation-2 hover:elevation-4
  active:scale-98
  transition-all duration-200
">
  게임 시작
</button>

// Secondary Action (Outlined Button)
<button className="
  bg-neutral-800 hover:bg-neutral-700
  text-white
  border border-white/10
  elevation-1 hover:elevation-3
  active:scale-98
">
  계속하기
</button>
```

---

### **2. GameScreen (게임 화면)**

#### **Choice Buttons**
```tsx
<Button className="
  w-full
  glass-strong              /* Glassmorphism surface */
  elevation-2 hover:elevation-3
  text-white
  py-3 px-4 sm:py-4 sm:px-6
  border border-white/10 hover:border-red-600/30
  rounded-lg
  group
  active:scale-98           /* Press feedback */
">
  {/* Number - Primary Color */}
  <span className="text-red-500 font-semibold text-base sm:text-lg">
    1
  </span>
  
  {/* Text - Body Medium */}
  <span className="font-medium">
    선택지 텍스트
  </span>
  
  {/* Hover overlay */}
  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5" />
</Button>
```

#### **Back Button**
```tsx
<Button className="
  glass                     /* Subtle glassmorphism */
  elevation-1 hover:elevation-2
  text-neutral-400 hover:text-white
  border border-white/5 hover:border-white/10
  active:scale-98
">
  <Undo className="size-3 sm:size-4 mr-2" />
  <span className="font-medium">이전 선택으로 돌아가기</span>
</Button>
```

---

### **3. DialogueBox (대화창)**

#### **Material Card**
```tsx
<Card className="
  glass-strong              /* Strong glassmorphism */
  elevation-3 hover:elevation-4
  border border-white/10 hover:border-red-600/20
  rounded-lg
  cursor-pointer
  transition-all
">
  {/* Content */}
</Card>
```

#### **Character Name**
```tsx
// Label Medium
<span className="text-sm sm:text-base font-semibold">
  홈즈
</span>
```

#### **Dialogue Text**
```tsx
// Body Large
<div className="
  text-white
  text-sm sm:text-base
  leading-relaxed              /* 1.6 line height */
  min-h-[50px] sm:min-h-[60px]
">
  {displayedText}
  {isTyping && <span className="text-red-500">▌</span>}
</div>
```

#### **Action Buttons**
```tsx
// Text Button (Skip)
<Button variant="ghost" className="
  text-neutral-400 hover:text-white
  hover:bg-white/5
  font-medium
">
  건너뛰기
</Button>

// Filled Button (Next)
<Button className="
  bg-red-600 hover:bg-red-700
  text-white
  elevation-1 hover:elevation-2
  active:scale-98
  font-medium
">
  다음
  <ChevronRight />
</Button>
```

---

## 🎨 Material Effects

### **Hover States**
```css
/* Subtle overlay */
group-hover:bg-white/5

/* Border accent */
hover:border-red-600/30

/* Elevation change */
hover:elevation-4
```

### **Press States**
```css
/* Scale down */
active:scale-98

/* Transform */
transition-all duration-200
```

### **Focus States**
```css
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

---

## 🌟 Noir Mystery Theme

### **Background Effects**
```tsx
// Noir gradient
<div className="noir-gradient">
  /* linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%) */
</div>

// Crimson glow (for emphasis)
<div className="crimson-glow">
  /* box-shadow: 0 0 20px rgba(185, 28, 28, 0.3) */
</div>
```

### **Atmospheric Effects**
```tsx
<div className="absolute inset-0 pointer-events-none">
  <div className="w-96 h-96 bg-red-900/10 blur-3xl animate-pulse-glow" />
  <div className="w-96 h-96 bg-red-900/5 blur-3xl animate-pulse-glow delay-1000" />
</div>
```

---

## 📊 Before & After 비교

### **Typography**
```
Before: 빅토리아 세리프 (Playfair Display + Crimson Text)
After:  Modern Sans-serif (Inter + Noto Sans KR)
```

### **Color Scheme**
```
Before: 세피아 톤 (베이지, 브라운, 금박)
After:  Dark + Crimson (검정, 회색, 레드)
```

### **Design System**
```
Before: 빅토리아 장식 스타일
After:  Material Design 3 체계
```

### **Elevation**
```
Before: 2D 플랫
After:  Material elevation (shadow depth)
```

### **Interaction**
```
Before: 기본 hover
After:  Material state layers (hover + press + focus)
```

---

## 🎯 디자인 위계 (Hierarchy)

### **1. Visual Hierarchy**
```
큰 텍스트 → 작은 텍스트
높은 elevation → 낮은 elevation
밝은 색상 → 어두운 색상
Bold → Regular
```

### **2. Interactive Hierarchy**
```
Primary Button (Red filled) → 가장 중요한 액션
Secondary Button (Outlined) → 보조 액션
Text Button (Ghost) → 부가적인 액션
```

### **3. Information Hierarchy**
```
Title (Display/Headline) → 페이지 제목
Body → 본문 내용
Label → 부가 정보
Caption → 메타 정보
```

---

## 📱 반응형 디자인

### **Material Breakpoints**
```css
sm:  640px   /* Small devices */
md:  768px   /* Medium devices */
lg:  1024px  /* Large devices */
xl:  1280px  /* Extra large devices */
```

### **Responsive Typography**
```tsx
// Display Large
className="text-4xl sm:text-5xl lg:text-6xl"

// Body
className="text-sm sm:text-base"

// Padding
className="px-4 sm:px-6 lg:px-8"
```

---

## ✅ Material Design Checklist

### **Typography ✅**
- [x] Inter + Noto Sans KR 폰트
- [x] Material type scale 적용
- [x] Font weight hierarchy
- [x] Line height 1.6 (가독성)
- [x] Letter spacing 적용

### **Color ✅**
- [x] Primary color (Red)
- [x] Accent color (Gold)
- [x] Surface variants
- [x] Semantic colors (destructive, etc.)
- [x] Dark theme 최적화

### **Elevation ✅**
- [x] 5단계 elevation system
- [x] Shadow depth 적용
- [x] Hover state elevation 증가
- [x] Glass morphism 효과

### **Components ✅**
- [x] Material buttons (filled, outlined, text)
- [x] Material cards with elevation
- [x] State layers (hover, press, focus)
- [x] Ripple-like overlay effects
- [x] Badges with semantic colors

### **Interaction ✅**
- [x] Active scale feedback (scale-98)
- [x] Hover overlays
- [x] Focus states
- [x] Transition animations
- [x] Touch-friendly sizes (44px minimum)

---

## 📝 수정된 파일

```
✅ /styles/globals.css           # Material Design color + typography + elevation
✅ /App.tsx                       # 어두운 배경
✅ /components/IntroScreen.tsx    # Material cards + buttons
✅ /components/GameScreen.tsx     # Glass morphism + elevation
✅ /components/DialogueBox.tsx    # Material card + buttons
✅ /MATERIAL_DESIGN_UPDATE.md     # 이 문서
```

---

## 🎬 결과

```
✅ 고딕 폰트 (Inter + Noto Sans KR)
✅ 어두운 톤 유지 (Noir Mystery)
✅ Material Design 3 가이드라인 준수
✅ Typography hierarchy 명확화
✅ Elevation system으로 깊이감
✅ Glass morphism 효과
✅ State layers로 인터랙션 피드백
✅ 디자인 위계 체계적 적용
```

---

## 💡 핵심 포인트

### **1. Typography Hierarchy**
```
크기, 굵기, 색상으로 정보 위계 명확화
Display → Headline → Body → Label
```

### **2. Elevation Depth**
```
그림자로 레이어 깊이 표현
interaction 시 elevation 증가
```

### **3. Color System**
```
Primary (Red) - 주요 액션
Accent (Gold) - 강조
Surface - 컴포넌트 배경
```

### **4. State Layers**
```
Hover: subtle white overlay
Press: scale-98 feedback
Focus: outline ring
```

---

**핵심 메시지:**
> **"Modern, Clean, Dark.
> Material Design으로 세련된 미스터리 경험을."**

---

**디자인 키워드:**
```
Material Design 3 • Typography Hierarchy • Elevation
Glass Morphism • State Layers • Noir Mystery
Dark Theme • Inter Font • Crimson Accent
```

**Google Material Design 가이드라인을 완벽히 준수하면서
어두운 미스터리 분위기를 유지했습니다!** 🎨✨
