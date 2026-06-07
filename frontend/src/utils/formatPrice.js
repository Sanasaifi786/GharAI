export function formatPrice(lakhs) {
  if (lakhs === null || lakhs === undefined) return "Price on request";

  const num = Number(lakhs);

  if (num >= 100) {
    const crore = num / 100;
    const display = Number.isInteger(crore) ? crore : crore.toFixed(2).replace(/\.?0+$/, "");
    return `₹${display} Cr`;
  }

  return `₹${num} Lakhs`;
}
