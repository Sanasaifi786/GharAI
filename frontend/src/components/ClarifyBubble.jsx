import React, { useEffect, useState } from "react";
import { callOpenRouter } from "../services/openrouter.js";

const SYSTEM_PROMPT = `You are a helpful real estate assistant for Gurgaon.
If a property search query has an ambiguous or missing sector/location, ask ONE short, friendly clarification question.
If the query is already specific enough, respond with exactly: "OK"
Keep the question under 20 words. Do not explain yourself.`;

export default function ClarifyBubble({ query, filters }) {
  const [clarification, setClarification] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!query || filters?.location) {
      setClarification("");
      setVisible(false);
      return;
    }

    let cancelled = false;

    async function fetchClarification() {
      try {
        const response = await callOpenRouter(
          SYSTEM_PROMPT,
          `Query: "${query}"`
        );
        if (!cancelled && response && response !== "OK") {
          setClarification(response);
          setVisible(true);
        } else if (!cancelled) {
          setVisible(false);
        }
      } catch {
      }
    }

    fetchClarification();
    return () => { cancelled = true; };
  }, [query, filters]);

  if (!visible || !clarification) return null;

  return (
    <div className="clarify-bubble" role="status" aria-live="polite">
      <span className="clarify-icon">💬</span>
      <span className="clarify-text">{clarification}</span>
      <button
        className="clarify-dismiss"
        onClick={() => setVisible(false)}
        aria-label="Dismiss clarification"
      >
        ✕
      </button>
    </div>
  );
}
