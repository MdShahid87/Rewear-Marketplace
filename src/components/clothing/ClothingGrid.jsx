import ClothingCard from "./ClothingCard";
// Display clothing items in a responsive grid layout.
export default function ClothingGrid({ items }) {
  if (!items.length) {
    return (
      <div className="rounded-3xl bg-white px-6 py-16 text-center">
        <p className="font-display text-2xl text-forest">
          No pieces match these filters
        </p>
        <p className="mt-2 text-sm text-muted">
          Try another city, size, or category.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ClothingCard key={item.id} item={item} />
      ))}
    </div>
  );
}
