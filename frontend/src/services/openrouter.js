const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = "google/gemma-4-31b-it:free";
const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * @param {string} systemPrompt 
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
export async function callOpenRouter(systemPrompt, userMessage) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "GharAI",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
