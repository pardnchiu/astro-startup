# Astro React Startup

使用 Astro 4、React 18、TypeScript 和 Docker 構建的現代化 Web 應用程式啟動模板。採用 Islands 架構、CSS Modules 和模組化設計。

## 特色

- **Astro 4** - 採用 Islands 架構的現代靜態網站建構工具
- **React 18 Islands** - 選擇性注水 (Hydration) 的互動元件
- **TypeScript 5.3** - 完整型別安全與嚴格模式
- **CSS Modules + SCSS** - 元件範圍樣式與 CSS 自訂屬性
- **模組化架構** - 清晰分層（types、constants、components、hooks、lib）
- **Docker 支援** - 生產環境就緒的容器化
- **嚴格 TypeScript** - `noUncheckedIndexedAccess`、`noUnusedLocals`、`noUnusedParameters`
- **預設零 JavaScript** - 僅互動元件載入 JavaScript
- **路徑別名** - 預設配置 `@/*` 匯入

## 專案結構

```
astro-react-startup/
├── app/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── Navbar.tsx          # React Island (client:load)
│   │   │       ├── Navbar.module.scss
│   │   │       └── index.ts
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro        # 全域佈局
│   │   ├── pages/
│   │   │   ├── index.astro             # 首頁
│   │   │   ├── products.astro          # 產品頁
│   │   │   └── 404.astro               # 404 頁面
│   │   ├── styles/
│   │   │   └── globals.scss            # CSS 自訂屬性
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript 型別
│   │   ├── constants/
│   │   │   └── index.ts                # 靜態資料
│   │   ├── hooks/                      # React Hooks
│   │   └── lib/                        # 工具函式
│   ├── public/                         # 靜態資源
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
└── README.md
```

## 安裝

### 使用 Docker（推薦）

1. 複製環境變數檔案：

```bash
cp .env.example .env
```

2. 編輯 `.env` 設定埠號（預設 4321）：

```env
NODE_PORT=4321
MAX_CPU=1
NODE_ENV=development
```

3. 啟動容器：

```bash
docker-compose up
```

應用程式將在 http://localhost:4321 執行。

### 本地開發

1. 進入應用程式目錄：

```bash
cd app
```

2. 安裝依賴套件：

```bash
npm install
```

3. 啟動開發伺服器：

```bash
npm run dev
```

## 可用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器（http://0.0.0.0:4321） |
| `npm run build` | 建置生產版本 |
| `npm run preview` | 預覽生產版本 |
| `npm run type-check` | 執行 TypeScript 型別檢查 |

## 架構設計

### Islands 架構

Astro 使用 **部分注水 (Partial Hydration)** - 僅互動元件載入 JavaScript：

```astro
<!-- 靜態（零 JavaScript） -->
<section>
  <h1>Hello World</h1>
</section>

<!-- 互動（注水） -->
<Navbar client:load />
```

**Client 指令：**
- `client:load` - 立即注水（Navbar）
- `client:visible` - 可見時注水（延遲載入元件）
- `client:idle` - 瀏覽器閒置時注水

### 型別系統

```typescript
// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface NavLink {
  href: string;
  label: string;
}
```

### 常數管理

```typescript
// src/constants/index.ts
import type { NavLink, Product } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' }
];
```

### CSS 架構

全域 CSS 自訂屬性：

```scss
// src/styles/globals.scss
:root {
  --color-primary: #333;
  --nav-height: 4rem;
  --spacing-md: 1.5rem;
}
```

元件 CSS Modules：

```tsx
// Navbar.tsx
import styles from './Navbar.module.scss';

export function Navbar() {
  return <header className={styles.header}>...</header>;
}
```

### 路徑別名

在 `tsconfig.json` 和 `astro.config.mjs` 中配置：

```typescript
import { Navbar } from '@/components/ui';
import { NAV_LINKS } from '@/constants';
import type { Product } from '@/types';
```

## Docker 設定

### 開發環境

```yaml
services:
  astro:
    image: node:22-alpine
    command: ["sh", "-c", "npm install && npm run dev -- --host"]
    environment:
      - HOST=0.0.0.0  # Astro 必須設定
```

### 生產環境

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## TypeScript 設定

嚴格的 TypeScript 設定：

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## 開發指南

### 新增頁面

在 `src/pages/` 建立 `.astro` 檔案：

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="關於我們">
  <section>
    <h1>關於我們</h1>
  </section>
</BaseLayout>

<style lang="scss">
  section {
    padding: var(--spacing-lg);
  }
</style>
```

### 新增 React 元件

1. 在 `src/components/ui/` 建立元件
2. 匯出至 `index.ts`
3. 在 `.astro` 檔案中使用 client 指令

```tsx
// Button.tsx
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
```

```astro
---
import { Button } from '@/components/ui';
---

<Button client:visible onClick={() => console.log('clicked')}>
  點擊我
</Button>
```

### 新增型別

在 `src/types/index.ts` 定義：

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}

export type Role = 'admin' | 'user' | 'guest';
```

## 技術棧

- **框架**: Astro 4.16.17
- **UI 函式庫**: React 18.2.0
- **語言**: TypeScript 5.3.0
- **樣式**: SCSS + CSS Modules
- **開發工具**: Docker
- **執行環境**: Node.js 22

## Astro vs Next.js

| 功能 | Astro | Next.js |
|------|-------|---------|
| 預設渲染 | SSG（零 JavaScript） | SSR/SSG |
| 注水策略 | 部分（Islands） | 完全 |
| 打包大小 | 最小 | 較大 |
| React 支援 | 僅 Islands | 原生 |
| 學習曲線 | 較低 | 較高 |

## 授權

MIT License
