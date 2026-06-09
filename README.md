# 🏡 GharAI - AI-Powered Property Search for Gurgaon

> Describe your dream home in plain English. GharAI finds it instantly.

---

## 🚀 What It Does

GharAI is a frontend-only real estate search prototype for Gurgaon properties. Instead of clicking through dropdown filters, users type natural language queries like:

> *"3BHK near a metro station under 1 crore"*
> *"2BHK east-facing flat in Sector 50"*

The app uses an LLM to extract structured filters from the query and matches them against a curated mock dataset of 12 Gurgaon properties.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Natural Language Search** | Type queries in plain English — the AI extracts BHK, location, price, and amenities automatically |
| **Property Cards Grid** | Responsive 3-column grid of property cards, each with image, price, sector, area, amenity tags, and a match badge |
| **Match Badge** | Coloured pill on each card explaining why it matches (e.g. "🚇 Metro in 5 mins") |
| **AI Personalised Summary** | Click any card → OpenRouter generates a 2–3 sentence explanation of why this property suits your query |
| **Shareable URL** | Your search is encoded as `?q=` in the URL — paste the link and anyone sees the same filtered results |
| **AI Clarification Bubble** | If your location is ambiguous, a second LLM call asks a friendly follow-up (e.g. "Did you mean Sector 50 or 57?") |
| **Local Fallback Parser** | If no API key is set or the AI call fails, a regex-based local parser extracts filters instantly — zero downtime |

---

## 🤖 Model Choice — `google/gemma-4-31b-it:free`

**Why Gemma 4 31B?**

- **Free tier on OpenRouter** — no cost for a prototype, which makes this accessible to any evaluator running it locally.
- **Strong instruction-following** — Gemma reliably returns clean JSON when told explicitly to do so, which is critical for the query parsing step.
- **Low hallucination on structured output** — compared to smaller free models (Mistral 7B, Phi-3), Gemma was far more consistent at returning `null` correctly when a field wasn't mentioned, rather than guessing.
- **Good for short prompts** — both our use cases (query parsing and property summary) are under 200 tokens of input, well within Gemma's sweet spot.

---

## 📐 Prompt Design Notes

### Query Parsing Prompt

The system prompt for extracting filters was designed to be **strict and format-specific**:

```text
You are a real estate search assistant for Gurgaon properties.
Extract structured filters from a property search query.
Return ONLY valid JSON with exactly these keys:
- location: string or null
- bhk: number (2, 3, or 4) or null
- maxPrice: number in lakhs or null
- amenities: array of strings or []
Do not include any explanation or markdown — only raw JSON.
```

**What worked:** Specifying the exact key names and types in the prompt dramatically reduced format errors. The phrase *"Return ONLY valid JSON"* and *"no markdown"* stopped the model from wrapping output in code fences.

**What didn't work:**
- An earlier version used a single-line prompt ("Extract filters and return JSON"). The model often returned explanatory text alongside the JSON or used inconsistent key names like `"bedrooms"` instead of `"bhk"`.
- Asking the model to infer crore-to-lakh conversion without examples led to incorrect values. We added the explicit note `"150 for '1.5 crore'"` which fixed it.
- When `location` was missing from the query, some smaller models returned `"location": "Gurgaon"` as a guess instead of `null`, which caused over-filtering. Gemma handled nulls correctly.

**Fallback strategy:** Since the API can fail or be slow, a regex-based local parser runs as a fallback. It handles the most common patterns (e.g. `3bhk`, `under 1cr`, `near metro`) with zero latency and no API dependency.

### Property Summary Prompt

The summary prompt passes the buyer's original query + all property details and asks for a personalised 2–3 sentence response. The key instruction is: *"Be specific, mention concrete details like sector and price, and do not be salesy."* This keeps the output grounded and useful rather than generic.

---

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx        # Text input, submit, loading state
│   │   ├── PropertyCard.jsx     # One property tile with all info
│   │   ├── PropertyGrid.jsx     # Responsive grid of cards
│   │   ├── PropertyModal.jsx    # Popup with AI summary on card click
│   │   ├── MatchBadge.jsx       # Coloured pill badge component
│   │   ├── ClarifyBubble.jsx    # Bonus: AI follow-up nudge
│   │   ├── AboutPage.jsx        # About page
│   │   └── ContactPage.jsx      # Contact page
│   ├── hooks/
│   │   ├── usePropertySearch.js # Orchestrates query → parse → filter
│   │   └── usePropertySummary.js# Fetches AI summary on card click
│   ├── services/
│   │   ├── openrouter.js        # Base API fetch wrapper
│   │   └── parseQuery.js        # AI + local fallback query parser
│   ├── data/
│   │   ├── properties.js        # 12 mock Gurgaon property objects
│   │   └── filterProperties.js  # Pure client-side filter function
│   └── utils/
│       ├── formatPrice.js       # 87 → "₹87 Lakhs", 150 → "₹1.5 Cr"
│       └── urlParams.js         # Encode/decode ?q= for shareable links
├── public/
│   └── prop_*.png               # AI-generated property images
├── .env                         # VITE_OPENROUTER_API_KEY (never commit)
└── index.html
```

---

## ⚙️ How to Run

### 1. Clone the repo

```bash
git clone https://github.com/Sanasaifi786/GharAI.git
cd GharAI/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

Create a `.env` file inside the `frontend/` folder:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_key_here
```

Get a free key at [openrouter.ai](https://openrouter.ai). The model used is `google/gemma-4-31b-it:free` — no billing required.

> ⚠️ **Production note:** In a real app, this key would live in a backend proxy. It's exposed on the frontend here because this is a prototype — as mentioned in the assignment brief.

### 4. Start the dev server

```bash
npm run dev
```

Open (https://ghar-ai-lime.vercel.app) in your browser.

---

## 🎯 Bonus Features Implemented

1. **Shareable URL (`?q=`)** — Every search encodes the query in the URL. Share the link and the recipient sees the same filtered results automatically on page load.

2. **AI Clarification Bubble** — After a search, if no specific sector was mentioned, a second LLM call generates a friendly follow-up question ("Did you mean Sector 50 or Sector 57?") shown as a nudge below the search bar.

---

## 🌿 Color Theme

Built with a custom **forest green palette** — Brunswick Green · Hunter Green · Fern · Shamrock · Pistachio — to evoke calm, trust, and nature. No UI library used; all styles are vanilla CSS with custom tokens.

---

*Built for the GharAI assignment · Gurgaon property search · 2026*