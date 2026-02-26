# 🎬 CineGPT — AI Movie Recommendation Chatbot

Deployed live on Vercel using **Groq** (free LLaMA 3 API) + **TMDB** for posters.

## 🚀 Deploy to Vercel (Free) — 5 Steps

### Step 1 — Get a free Groq API key
1. Go to **https://console.groq.com**
2. Sign up (no credit card needed)
3. Click **API Keys** → **Create API Key**
4. Copy the key

### Step 2 — Get a free TMDB key (for posters)
1. Go to **https://www.themoviedb.org/signup**
2. Verify email → go to **Settings → API → Create**
3. Copy the API key (v3 auth)

### Step 3 — Push to GitHub
1. Go to **https://github.com/new** and create a repo
2. In your project folder run:
```bash
git init
git add .
git commit -m "Initial CineGPT commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cinegpt.git
git push -u origin main
```

### Step 4 — Deploy on Vercel
1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **Add New Project** → Import your cinegpt repo
3. Click **Environment Variables** and add:
   - `GROQ_API_KEY` = your Groq key from Step 1
   - `NEXT_PUBLIC_TMDB_API_KEY` = your TMDB key from Step 2
4. Click **Deploy** — done in ~60 seconds!

### Step 5 — Your app is live!
Vercel gives you a free URL like: `https://cinegpt-xyz.vercel.app`

---

## 💻 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Set up env
cp .env.local.example .env.local
# Edit .env.local and add your GROQ_API_KEY and TMDB key

# 3. Run
npm run dev
# → http://localhost:3000
```

---

## Stack
- **Next.js 14** — Framework
- **Groq + LLaMA 3** — Free AI (500+ tokens/sec)
- **TMDB API** — Movie posters
- **Tailwind CSS** — Styling
- **Web Speech API** — Voice search
- **Vercel** — Free hosting
