import React from "react";

export default function MatchBadge({ reason }) {
  if (!reason) return null;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "999px",
        background: "linear-gradient(135deg, #6C63FF, #48CAE4)",
        color: "#fff",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        boxShadow: "0 2px 8px rgba(108,99,255,0.3)",
      }}
      title={reason}
    >
      {reason}
    </span>
  );
}
