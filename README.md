# Ruslan Somin — Portfolio

Next.js 15 · Tailwind · editorial "Lab Notebook" aesthetic · retrieval-grounded `§ 00 Query` hero.

## Scripts

```bash
npm run dev     # dev server on :3000
npm run build   # production build
npm run start   # serve the production build
```

## Deploy to Vercel

```bash
# 1. init git
git init
git add .
git commit -m "Initial portfolio"

# 2. push to a new GitHub repo, then import it on vercel.com
# Vercel auto-detects Next.js — no config needed.
```

Optional env vars (only if you wire an LLM into `/api/ask`):

- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
