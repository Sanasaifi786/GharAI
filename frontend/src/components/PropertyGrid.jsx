import React from "react";
import PropertyCard from "./PropertyCard.jsx";

export default function PropertyGrid({ properties, onCardClick }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🏚️</span>
        <h2>No properties found</h2>
        <p>Try adjusting your search — fewer filters or a different sector.</p>
      </div>
    );
  }

  return (
    <section className="property-grid" aria-label="Property listings">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onClick={onCardClick}
        />
      ))}
    </section>
  );
}
