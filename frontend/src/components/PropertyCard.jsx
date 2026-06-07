import React from "react";
import MatchBadge from "./MatchBadge.jsx";
import { formatPrice } from "../utils/formatPrice.js";

export default function PropertyCard({ property, onClick }) {
  const { bhk, area, sector, price, amenities, matchReason, image } = property;

  return (
    <div
      className="property-card"
      onClick={() => onClick(property)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(property)}
    >
      {/* Property image */}
      <div className="card-image-wrapper">
        <img src={image} alt={`${bhk}BHK in ${sector}`} className="card-image" />
        <div className="card-badge-overlay">
          <MatchBadge reason={matchReason} />
        </div>
      </div>

      {/* Card body */}
      <div className="card-body">
        <div className="card-header-row">
          <h3 className="card-title">{bhk} BHK Apartment</h3>
          <span className="card-price">{formatPrice(price)}</span>
        </div>

        <p className="card-sector">📍 {sector}</p>
        <p className="card-area">📐 {area.toLocaleString()} sqft</p>

        {/* Amenities */}
        <div className="card-amenities">
          {amenities.map((a) => (
            <span key={a} className="amenity-tag">
              {a}
            </span>
          ))}
        </div>

        <button className="view-details-btn">View Details & AI Summary →</button>
      </div>
    </div>
  );
}
