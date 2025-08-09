## 토스 메이커스 컨퍼런스 스타일 적용

---

## 🎨 Color System

### Primary Colors

```css
--primary-blue: #2e6ff2; /* 메인 컬러 */
--primary-dark: #1a4db8; /* 버튼 호버, 액센트 */
--primary-light: #e8f1ff; /* 배경, 카드 */
```

### Secondary Colors

```css
--purple-gradient-start: #e8d5ff; /* 카드 배경 그라데이션 시작 */
--purple-gradient-end: #f3e8ff; /* 카드 배경 그라데이션 끝 */
--blue-gradient-start: #d5e8ff; /* 블루 카드 그라데이션 */
--blue-gradient-end: #e8f4ff; /* 블루 카드 그라데이션 */
```

### Neutral Colors

```css
--black: #000000; /* 메인 배경 */
--white: #ffffff; /* 텍스트, 카드 내용 */
--gray-50: #f9fafb; /* 라이트 배경 */
--gray-100: #f3f4f6; /* 버튼 배경 */
--gray-200: #e5e7eb; /* 보더 */
--gray-400: #9ca3af; /* 서브 텍스트 */
--gray-600: #4b5563; /* 일반 텍스트 */
--gray-800: #1f2937; /* 강조 텍스트 */
```

### Status Colors

```css
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

---

## 📱 Layout & Grid

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: 24px;
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 1024px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-cols-4,
  .grid-cols-3,
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
```

---

## 🃏 Card Components

### Basic Card

```css
.card {
  background: linear-gradient(
    135deg,
    var(--purple-gradient-start),
    var(--purple-gradient-end)
  );
  border-radius: 24px;
  padding: 32px;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Session Card (토스 스타일)

```css
.session-card {
  background: linear-gradient(
    135deg,
    var(--purple-gradient-start),
    var(--purple-gradient-end)
  );
  border-radius: 24px;
  padding: 24px;
  min-height: 280px;
  position: relative;
  transition: all 0.3s ease;
}

.session-card .time-badge {
  background: var(--primary-blue);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 16px;
}

.session-card .title {
  font-size: 24px;
  font-weight: 700;
  color: var(--gray-800);
  line-height: 1.3;
  margin-bottom: 16px;
}

.session-card .speaker {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.session-card .speaker-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.session-card .speaker-info h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-800);
  margin: 0;
}

.session-card .speaker-info p {
  font-size: 14px;
  color: var(--primary-blue);
  margin: 0;
}
```

### Hero Card (대형 카드)

```css
.hero-card {
  background: linear-gradient(
    135deg,
    var(--blue-gradient-start),
    var(--blue-gradient-end)
  );
  border-radius: 32px;
  padding: 48px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.hero-card .hero-image {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 300px;
  height: 300px;
  object-fit: cover;
}
```

---

## 🔤 Typography

### Font Family

```css
/* Pretendard 폰트 import */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");

body {
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  line-height: 1.5;
  color: var(--gray-800);
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}
```

### Headings

```css
.h1 {
  font-size: 3.5rem; /* 56px */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.h2 {
  font-size: 2.5rem; /* 40px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.h3 {
  font-size: 2rem; /* 32px */
  font-weight: 700;
  line-height: 1.25;
}

.h4 {
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  line-height: 1.3;
}

.h5 {
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  line-height: 1.4;
}

.h6 {
  font-size: 1rem; /* 16px */
  font-weight: 600;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .h1 {
    font-size: 2.5rem;
  }
  .h2 {
    font-size: 2rem;
  }
  .h3 {
    font-size: 1.75rem;
  }
}
```

### Body Text

```css
.text-lg {
  font-size: 1.125rem; /* 18px */
  line-height: 1.6;
}

.text-base {
  font-size: 1rem; /* 16px */
  line-height: 1.5;
}

.text-sm {
  font-size: 0.875rem; /* 14px */
  line-height: 1.4;
}

.text-xs {
  font-size: 0.75rem; /* 12px */
  line-height: 1.3;
}
```

---

## 🔘 Buttons

### Primary Button

```css
.btn-primary {
  background: var(--primary-blue);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(46, 111, 242, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}
```

### Secondary Button

```css
.btn-secondary {
  background: var(--gray-100);
  color: var(--gray-800);
  border: 2px solid var(--gray-200);
  border-radius: 12px;
  padding: 14px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--gray-200);
  border-color: var(--gray-300);
}
```

### Button Sizes

```css
.btn-lg {
  padding: 20px 40px;
  font-size: 18px;
  border-radius: 16px;
}

.btn-sm {
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 10px;
}

.btn-xs {
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 8px;
}
```

---

## 🏷️ Badges & Tags

### Time Badge

```css
.time-badge {
  background: var(--primary-blue);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
}
```

### Category Badge

```css
.category-badge {
  background: rgba(255, 255, 255, 0.2);
  color: var(--gray-800);
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}
```

---

## 🎭 Dark Mode Support

### Dark Background

```css
.dark-section {
  background: var(--black);
  color: var(--white);
  padding: 80px 0;
}

.dark-section .card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-section h1,
.dark-section h2,
.dark-section h3 {
  color: var(--white);
}
```

---

## 🎯 Animations

### Scroll Animations

```css
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

.scale-in {
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.5s ease;
}

.scale-in.visible {
  opacity: 1;
  transform: scale(1);
}
```

### Card Hover Effects

```css
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

---

## 📐 Spacing System

```css
.space-1 {
  margin: 4px;
}
.space-2 {
  margin: 8px;
}
.space-3 {
  margin: 12px;
}
.space-4 {
  margin: 16px;
}
.space-5 {
  margin: 20px;
}
.space-6 {
  margin: 24px;
}
.space-8 {
  margin: 32px;
}
.space-10 {
  margin: 40px;
}
.space-12 {
  margin: 48px;
}
.space-16 {
  margin: 64px;
}
.space-20 {
  margin: 80px;
}
.space-24 {
  margin: 96px;
}

/* Padding variants */
.p-1 {
  padding: 4px;
}
.p-2 {
  padding: 8px;
}
.p-3 {
  padding: 12px;
}
.p-4 {
  padding: 16px;
}
.p-5 {
  padding: 20px;
}
.p-6 {
  padding: 24px;
}
.p-8 {
  padding: 32px;
}
.p-10 {
  padding: 40px;
}
.p-12 {
  padding: 48px;
}
```

---

## 🌊 Gradient Backgrounds

```css
.gradient-purple {
  background: linear-gradient(135deg, #e8d5ff 0%, #f3e8ff 100%);
}

.gradient-blue {
  background: linear-gradient(135deg, #d5e8ff 0%, #e8f4ff 100%);
}

.gradient-primary {
  background: linear-gradient(
    135deg,
    var(--primary-blue) 0%,
    var(--primary-dark) 100%
  );
}

.gradient-dark {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 639px) {
  .mobile-hidden {
    display: none;
  }
  .mobile-full {
    width: 100%;
  }
}

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) {
  .tablet-hidden {
    display: none;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .desktop-hidden {
    display: none;
  }
}
```

---

## 🎨 Implementation Notes

### 1. 카드 레이아웃

- 토스 스타일의 둥근 모서리 (24px border-radius) 사용
- 그라데이션 배경으로 시각적 깊이감 연출
- 호버시 살짝 위로 올라가는 애니메이션

### 2. 타이포그래피

- 한글 가독성을 위한 시스템 폰트 사용
- 굵은 폰트 웨이트로 임팩트 있는 제목
- 적절한 line-height로 읽기 편한 본문

### 3. 색상 활용

- 바이브 코딩 브랜드 컬러(#2E6FF2)를 베이스로 함
- 파스텔 그라데이션으로 부드러운 느낌
- 다크 배경에서 화이트 텍스트로 대비

### 4. 인터랙션

- 버튼과 카드에 미묘한 호버 효과
- 스크롤 애니메이션으로 동적 느낌
- 과하지 않은 transition 적용

이 디자인 시스템을 Claude Code에 제공하여 토스 스타일의 모던한 바이브 코딩 부트캠프 랜딩페이지를 개발해보세요!
