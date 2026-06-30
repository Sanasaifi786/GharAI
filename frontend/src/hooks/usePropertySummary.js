import { useState, useCallback, useRef } from "react";
import { callOpenRouter } from "../services/openrouter.js";
import { formatPrice } from "../utils/formatPrice.js";

const SYSTEM_PROMPT = `You are a warm, knowledgeable real estate advisor in Gurgaon.
When given a property's details and a buyer's search query, write a 2–3 sentence personalised summary
explaining why this specific property matches what the buyer is looking for.
Be specific, enthusiastic but not salesy, and mention concrete details like sector, price, and standout amenities.
Keep it under 60 words.`;

export function usePropertySummary() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Track the last fetched property to prevent double-fetching in StrictMode
  const lastFetchedRef = useRef(null);

  const getSummary = useCallback(async (property, userQuery) => {
    const fetchKey = `${property.id}-${userQuery}`;
    if (lastFetchedRef.current === fetchKey) return;
    lastFetchedRef.current = fetchKey;

    setLoading(true);
    setError(null);
    setSummary("");

    const userMessage = `
Buyer query: "${userQuery || "Looking for a good home in Gurgaon"}"

Property details:
- BHK: ${property.bhk}
- Area: ${property.area} sqft
- Sector: ${property.sector}
- Price: ${formatPrice(property.price)}
- Amenities: ${property.amenities.join(", ")}
`.trim();

    try {
      const text = await callOpenRouter(SYSTEM_PROMPT, userMessage);
      setSummary(text);
    } catch (err) {
      console.error("getSummary error:", err);
      setError("Could not generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { summary, loading, error, getSummary };
}
