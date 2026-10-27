import { CATEGORIES, CITIES, CONDITIONS, SIZES } from "../../data/seed";
import Input from "../common/Input";

export default function ClothingFilters({ value, onChange }) {
  const set = (key, next) => onChange({ ...value, [key]: next });

  return (
    <div className="grid gap-3 rounded-3xl bg-white p-4 md:grid-cols-2 lg:grid-cols-5">
      <Input
        placeholder="Search brand, type, city…"
        value={value.q}
        onChange={(e) => set("q", e.target.value)}
      />
      <select
        className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm"
        value={value.category}
        onChange={(e) => set("category", e.target.value)}
      >
        <option value="">All categories</option>
        {CATEGORIES.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select
        className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm"
        value={value.size}
        onChange={(e) => set("size", e.target.value)}
      >
        <option value="">All sizes</option>
        {SIZES.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select
        className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm"
        value={value.condition}
        onChange={(e) => set("condition", e.target.value)}
      >
        <option value="">Any condition</option>
        {CONDITIONS.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select
        className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm"
        value={value.city}
        onChange={(e) => set("city", e.target.value)}
      >
        <option value="">All cities</option>
        {CITIES.map((item) => (
          <option key={item.name}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}
