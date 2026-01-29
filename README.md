# Astro React Startup

Modern web application starter template built with Astro 4, React 18, TypeScript, and Docker. Features Islands Architecture, CSS Modules, and modular design.

## Features

- **Astro 4** - Modern static site builder with Islands Architecture
- **React 18 Islands** - Selective hydration for interactive components
- **TypeScript 5.3** - Full type safety with strict mode
- **CSS Modules + SCSS** - Component-scoped styling with CSS custom properties
- **Modular Architecture** - Clean separation (types, constants, components, hooks, lib)
- **Docker Support** - Production-ready containerization
- **Strict TypeScript** - `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`
- **Zero JS by Default** - Only interactive components load JavaScript
- **Path Aliases** - Pre-configured `@/*` imports

## Project Structure

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
│   │   │   └── BaseLayout.astro        # Global layout
│   │   ├── pages/
│   │   │   ├── index.astro             # Home page
│   │   │   ├── products.astro          # Products page
│   │   │   └── 404.astro               # Not found page
│   │   ├── styles/
│   │   │   └── globals.scss            # CSS custom properties
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript types
│   │   ├── constants/
│   │   │   └── index.ts                # Static data
│   │   ├── hooks/                      # React hooks
│   │   └── lib/                        # Utilities
│   ├── public/                         # Static assets
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
└── README.md
```

## Installation

### Using Docker (Recommended)

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Configure port in `.env` (default 4321):

```env
NODE_PORT=4321
MAX_CPU=1
NODE_ENV=development
```

3. Start container:

```bash
docker-compose up
```

Application runs at http://localhost:4321

### Local Development

1. Navigate to app directory:

```bash
cd app
```

2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://0.0.0.0:4321) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run type-check` | Run TypeScript type checking |

## Architecture

### Islands Architecture

Astro uses **partial hydration** - only interactive components load JavaScript:

```astro
<!-- Static (Zero JS) -->
<section>
  <h1>Hello World</h1>
</section>

<!-- Interactive (Hydrated) -->
<Navbar client:load />
```

**Client Directives:**
- `client:load` - Hydrate immediately (Navbar)
- `client:visible` - Hydrate when visible (lazy components)
- `client:idle` - Hydrate when browser idle

### Type System

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

### Constants Management

```typescript
// src/constants/index.ts
import type { NavLink, Product } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' }
];
```

### CSS Architecture

Global CSS Custom Properties:

```scss
// src/styles/globals.scss
:root {
  --color-primary: #333;
  --nav-height: 4rem;
  --spacing-md: 1.5rem;
}
```

Component CSS Modules:

```tsx
// Navbar.tsx
import styles from './Navbar.module.scss';

export function Navbar() {
  return <header className={styles.header}>...</header>;
}
```

### Path Aliases

Configured in `tsconfig.json` and `astro.config.mjs`:

```typescript
import { Navbar } from '@/components/ui';
import { NAV_LINKS } from '@/constants';
import type { Product } from '@/types';
```

## Docker Configuration

### Development

```yaml
services:
  astro:
    image: node:22-alpine
    command: ["sh", "-c", "npm install && npm run dev -- --host"]
    environment:
      - HOST=0.0.0.0  # Required for Astro
```

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## TypeScript Configuration

Strict TypeScript settings:

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

## Development Guide

### Adding Pages

Create `.astro` file in `src/pages/`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="About">
  <section>
    <h1>About Us</h1>
  </section>
</BaseLayout>

<style lang="scss">
  section {
    padding: var(--spacing-lg);
  }
</style>
```

### Adding React Components

1. Create component in `src/components/ui/`
2. Export in `index.ts`
3. Use with client directive in `.astro` files

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
  Click Me
</Button>
```

### Adding Types

Define in `src/types/index.ts`:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}

export type Role = 'admin' | 'user' | 'guest';
```

## Tech Stack

- **Framework**: Astro 4.16.17
- **UI Library**: React 18.2.0
- **Language**: TypeScript 5.3.0
- **Styling**: SCSS + CSS Modules
- **Dev Tools**: Docker
- **Runtime**: Node.js 22

## Astro vs Next.js

| Feature | Astro | Next.js |
|---------|-------|---------|
| Default Rendering | SSG (Zero JS) | SSR/SSG |
| Hydration | Partial (Islands) | Full |
| Bundle Size | Minimal | Larger |
| React Support | Islands only | Native |
| Learning Curve | Lower | Higher |

## License

MIT License
