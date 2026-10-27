// Defines the base estimated value for each clothing category.
const CATEGORY_BASE = {
  Tops: 1200,
  Bottoms: 1500,
  Dresses: 2200,
  Outerwear: 2800,
  Footwear: 2500,
  Accessories: 900,
};

const CONDITION_MULTIPLIER = {
  New: 1.2,
  "Like New": 1.05,
  Good: 0.85,
  Fair: 0.6,
};

// Lists brands that receive an additional value adjustment.
const PREMIUM_BRANDS = [
  "Levi's",
  "Nike",
  "Adidas",
  "Zara",
  "H&M",
  "Uniqlo",
  "Ralph Lauren",
  "Calvin Klein",
  "Puma",
  "Woodland",
  "Biba",
  "Fabindia",
  "Allen Solly",
  "Van Heusen",
  "Mango",
];

// Estimates an item's swap value using its category, condition, and brand.
export function estimateSwapValue({ category, condition, brand }) {
  const base = CATEGORY_BASE[category] || 1000;
  const conditionFactor = CONDITION_MULTIPLIER[condition] || 0.8;
  const brandFactor = PREMIUM_BRANDS.some(
    (name) => name.toLowerCase() === String(brand).trim().toLowerCase(),
  )
    ? 1.15
    : 1;
  return Math.round(base * conditionFactor * brandFactor);
}

// Compares two swap values and classifies the value balance.
export function compareSwapValues(offeredValue, requestedValue) {
  const diff = offeredValue - requestedValue;
  const ratio = requestedValue ? offeredValue / requestedValue : 1;
  let fairness = "balanced";
  if (ratio < 0.8) fairness = "under";
  if (ratio > 1.2) fairness = "over";
  return { diff, ratio, fairness };
}

// Calculates the approximate great-circle distance between two coordinates in kilometers.
export function haversineKm(a, b) {
  if (!a || !b) return null;
  const toRad = (n) => (n * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}
