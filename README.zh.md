> [!NOTE]
> 此 README 由 [SKILL](https://github.com/pardnchiu/skill-readme-generate) 生成，英文版請參閱 [這裡](./README.md)。

# astro-startup

[![license](https://img.shields.io/github/license/pardnchiu/astro-startup)](LICENSE)

> Astro + React 網站啟動模板，支援 Docker 容器化部署

## 目錄

- [功能特點](#功能特點)
- [安裝](#安裝)
- [使用方法](#使用方法)
- [授權](#授權)

## 功能特點

- Astro 4.x + React 18
- TypeScript 嚴格模式
- SCSS 模組化樣式
- Docker Compose 開發/生產環境

## 安裝

```bash
git clone https://github.com/pardnchiu/astro-startup.git
cd astro-startup
cp .env.example .env
```

## 使用方法

### Docker（推薦）

```bash
# 開發
docker compose up

# 生產
docker compose -f docker-compose.prod.yml up
```

### 本地開發

```bash
cd app
npm install
npm run dev
```

## 授權

本專案採用 [MIT LICENSE](LICENSE)。
