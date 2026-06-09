import React from "react";

export default function MatchBadge({ reason }) {
  if (!reason) return null;

  return (
    <span className="match-badge" title={reason}>
      {reason}
    </span>
  );
}
