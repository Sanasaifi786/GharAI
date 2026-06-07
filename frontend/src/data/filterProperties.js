/**
 * @param {Array} properties
 * @param {Object} filters
 * @returns {Array}
 */
export function filterProperties(properties, filters) {
  if (!filters || Object.keys(filters).length === 0) return properties;

  const { location, bhk, maxPrice, amenities } = filters;

  return properties.filter((p) => {

    if (location) {
      const sectorLower = p.sector.toLowerCase();
      const locationLower = location.toLowerCase();
      if (!sectorLower.includes(locationLower)) return false;
    }

    if (bhk !== null && bhk !== undefined) {
      if (p.bhk !== Number(bhk)) return false;
    }
    if (maxPrice !== null && maxPrice !== undefined) {
      if (p.price > Number(maxPrice)) return false;
    }

    if (amenities && amenities.length > 0) {
      const hasAll = amenities.every((reqAmenity) =>
        p.amenities.some((a) =>
          a.toLowerCase().includes(reqAmenity.toLowerCase())
        )
      );
      if (!hasAll) return false;
    }

    return true;
  });
}
