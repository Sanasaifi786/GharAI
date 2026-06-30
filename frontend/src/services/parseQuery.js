import { callOpenRouter } from "./openrouter.js";

const SYSTEM_PROMPT = `You are a real estate search assistant for Gurgaon properties.
Extract structured filters from a property search query.
Return ONLY valid JSON with exactly these keys:
- location: string (e.g. "Sector 50") or null if not mentioned
- bhk: number (2, 3, or 4) or null if not mentioned
- maxPrice: number in lakhs (e.g. 80 for "80 lakhs", 150 for "1.5 crore") or null if not mentioned
- amenities: array of strings (e.g. ["near school", "east facing"]) or []

Do not include any explanation or markdown — only raw JSON.`;

/**
 * Parse a natural language property query into structured filters.
 * @param {string} query - the user's raw search text
 * @returns {Promise<{ location: string|null, bhk: number|null, maxPrice: number|null, amenities: string[] }>}
 */
export async function parseQuery(query) {
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
    console.error("parseQuery failed:", err);
    return { location: null, bhk: null, maxPrice: null, amenities: [] };
  }
}
