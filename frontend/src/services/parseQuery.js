import { callOpenRouter } from "./openrouter.js";

const SYSTEM_PROMPT = `You are a real estate search assistant for Gurgaon properties.
Extract structured filters from a property search query.
Return ONLY valid JSON with exactly these keys:
- location: string (e.g. "Sector 50") or null if not mentioned
- bhk: number (2, 3, or 4) or null if not mentioned
- maxPrice: number in lakhs (e.g. 80 for "80 lakhs", 150 for "1.5 crore") or null if not mentioned
- amenities: array of strings (e.g. ["near metro", "east facing"]) or []

Do not include any explanation or markdown - only raw JSON.`;

/* ── Local keyword parser (no API needed) ─────────────────────────
   Runs instantly. Used when API key is missing or API call fails.
────────────────────────────────────────────────────────────────── */
function localParseQuery(query) {
  const q = query.toLowerCase();

  // ── BHK ──
  let bhk = null;
  const bhkMatch = q.match(/(\d)\s*bhk/) || q.match(/(\d)\s*bedroom/);
  if (bhkMatch) bhk = parseInt(bhkMatch[1]);

  // ── Location ──
  let location = null;
  const sectorMatch = q.match(/sector\s*(\d+)/i);
  if (sectorMatch) {
    location = `Sector ${sectorMatch[1]}`;
  } else if (q.includes("gurgaon") || q.includes("gurugram")) {
    location = "Gurgaon"; // broad match — all our properties are Gurgaon
  }

  // ── Max Price ──
  let maxPrice = null;
  // "under 80 lakh", "below 1.5 crore", "80L budget", "budget 1cr"
  const croreMatch = q.match(/(?:under|below|budget|within|upto|up to)\s*([\d.]+)\s*cr/i)
    || q.match(/([\d.]+)\s*cr(?:ore)?\s*budget/i);
  const lakhMatch = q.match(/(?:under|below|budget|within|upto|up to)\s*([\d.]+)\s*(?:lakh|lac|l\b)/i)
    || q.match(/([\d.]+)\s*(?:lakh|lac)\s*budget/i);

  if (croreMatch) {
    maxPrice = parseFloat(croreMatch[1]) * 100; // convert crore to lakhs
  } else if (lakhMatch) {
    maxPrice = parseFloat(lakhMatch[1]);
  }

  // ── Amenities ──
  const amenityKeywords = [
    "metro", "school", "pool", "gym", "park", "hospital",
    "east facing", "west facing", "north facing", "south facing",
    "gated", "luxury", "affordable", "ready to move", "new",
    "club", "security", "garden", "pet", "vastu",
    "highway", "expressway", "terrace", "balcony",
  ];

  const amenities = amenityKeywords.filter((kw) => q.includes(kw));

  return { location, bhk, maxPrice, amenities };
}

/* ── Check if a real API key is configured ── */
function hasApiKey() {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  return key && key.trim() !== "" && !key.includes("your_openrouter");
}

/**
 * Parse a natural language property query into structured filters.
 * Uses OpenRouter API if key is set, otherwise falls back to local parser.
 */
export async function parseQuery(query) {
  // If no real API key, use local parser immediately
  if (!hasApiKey()) {
    console.log("No API key — using local parser");
    return localParseQuery(query);
  }

  // Try AI parse
  try {
    const raw = await callOpenRouter(SYSTEM_PROMPT, `Query: ${query}`);
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const filters = JSON.parse(cleaned);

    return {
      location: filters.location ?? null,
      bhk: filters.bhk ?? null,
      maxPrice: filters.maxPrice ?? null,
      amenities: Array.isArray(filters.amenities) ? filters.amenities : [],
    };
  } catch (err) {
    // API failed — fall back to local parser
    console.warn("AI parse failed, falling back to local parser:", err.message);
    return localParseQuery(query);
  }
}
