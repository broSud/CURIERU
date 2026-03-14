# 🤖 Ghid Setup Bot Discord — Curierii

## PASUL 1 — Creează botul pe Discord Developer Portal

1. Mergi pe: https://discord.com/developers/applications
2. Click **New Application** → dă-i un nume (ex: "CurieriBot")
3. Mergi la **Bot** (în stânga) → click **Add Bot**
4. La **Privileged Gateway Intents** activează:
   - ✅ MESSAGE CONTENT INTENT
   - ✅ SERVER MEMBERS INTENT
5. Click **Save Changes**
6. Click **Reset Token** → copiază tokenul (îl folosești mai jos!)

## PASUL 2 — Invită botul pe serverul tău

1. Mergi la **OAuth2** → **URL Generator**
2. Bifează: `bot`
3. La Bot Permissions bifează:
   - ✅ Send Messages
   - ✅ Read Messages/View Channels
   - ✅ Embed Links
   - ✅ Read Message History
4. Copiază linkul generat → deschide-l → adaugă botul pe server

## PASUL 3 — Pune codul pe Railway

1. Mergi pe: https://railway.app și fă cont (cu GitHub e mai ușor)
2. Click **New Project** → **Deploy from GitHub repo**
   - SAU: **Empty Project** → **Add Service** → **GitHub Repo**
3. Uploadează cele 2 fișiere: `bot.js` și `package.json`
   - Cea mai simplă metodă: creează un repo pe https://github.com
   - Pune cele 2 fișiere acolo → conectează Railway la repo
4. În Railway, mergi la **Variables** și adaugă:
   - **NAME:** `TOKEN`
   - **VALUE:** (tokenul copiat la Pasul 1)
5. Click **Deploy** ✅

## PASUL 4 — Gata! Testează comenzile

- `!colet` — primești un obiect amuzant random 📦
- `!livrare` — statusul livrării tale 🚚  
- `!curier` — info despre server 📮

---

## ❓ Probleme frecvente

**Botul nu răspunde:**
- Verifică că MESSAGE CONTENT INTENT e activat la Pasul 1
- Verifică că tokenul e corect în Railway Variables

**Eroare la deploy:**
- Asigură-te că ambele fișiere (bot.js și package.json) sunt în repo

---

*Succes! 🎉*
