/**
 * filterProperties.js
 * Pure function — takes (properties, filters) and returns the matched subset.
 * No API calls. Called client-side after the query is parsed.
 *
 * Filter logic:
 *  - bhk      → exact match
 *  - location → property sector must include the location string
 *  - maxPrice → property price must be <= maxPrice (in lakhs)
 *  - amenities → property must match AT LEAST ONE requested amenity
 *                (partial string match, case-insensitive)
 */
export function filterProperties(properties, filters) {
  // No filters at all — return everything
  if (!filters) return properties;

  const { location, bhk, maxPrice, amenities } = filters;

  // Check if any real filter was actually extracted
  const hasFilters =
    bhk !== null && bhk !== undefined ||
    location !== null && location !== undefined ||
    maxPrice !== null && maxPrice !== undefined ||
    (amenities && amenities.length > 0);

  if (!hasFilters) return properties;

  return properties.filter((p) => {

    // ── BHK: exact match ──
    if (bhk !== null && bhk !== undefined) {
      if (p.bhk !== Number(bhk)) return false;
    }

    // ── Location: sector string contains the keyword ──
    if (location) {
      const loc = location.toLowerCase();
      // "Gurgaon" / "gurugram" → all properties match (they're all in Gurgaon)
      const isGenericCity = loc === "gurgaon" || loc === "gurugram";
      if (!isGenericCity) {
        if (!p.sector.toLowerCase().includes(loc)) return false;
      }
    }

    // ── Price: property price must be ≤ maxPrice ──
    if (maxPrice !== null && maxPrice !== undefined) {
      if (p.price > Number(maxPrice)) return false;
    }

    // ── Amenities: property must match AT LEAST ONE requested amenity ──
    if (amenities && amenities.length > 0) {
      const hasAny = amenities.some((reqAmenity) =>
        p.amenities.some((a) =>
          a.toLowerCase().includes(reqAmenity.toLowerCase())
        )
      );
      if (!hasAny) return false;
    }

    return true;
  });
}
