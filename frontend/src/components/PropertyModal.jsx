import React, { useEffect } from "react";
import { usePropertySummary } from "../hooks/usePropertySummary.js";
import MatchBadge from "./MatchBadge.jsx";
import { formatPrice } from "../utils/formatPrice.js";

export default function PropertyModal({ property, userQuery, onClose }) {
  const { summary, loading, error, getSummary } = usePropertySummary();

  useEffect(() => {
    if (property) {
      getSummary(property, userQuery);
    }
  }, [property, userQuery]);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!property) return null;

  const { bhk, area, sector, price, amenities, matchReason, image } = property;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Image */}
        <img src={image} alt={`${bhk}BHK in ${sector}`} className="modal-image" />

        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{bhk} BHK Apartment</h2>
            <p className="modal-sector">📍 {sector}</p>
          </div>
          <div className="modal-price">{formatPrice(price)}</div>
        </div>

        {/* Match badge */}
        <div className="modal-badge-row">
          <MatchBadge reason={matchReason} />
          <span className="modal-area">📐 {area.toLocaleString()} sqft</span>
        </div>

        {/* Amenities */}
        <div className="modal-amenities">
          {amenities.map((a) => (
            <span key={a} className="amenity-tag">{a}</span>
          ))}
        </div>

        {/* AI Summary section */}
        <div className="modal-ai-section">
          <h3 className="ai-label">✨ AI Summary</h3>
          {loading && (
            <div className="ai-loading">
              <span className="spinner" />
              Generating personalised summary…
            </div>
          )}
          {error && <p className="ai-error">{error}</p>}
          {!loading && !error && summary && (
            <p className="ai-summary">{summary}</p>
          )}
        </div>
      </div>
    </div>
  );
}
