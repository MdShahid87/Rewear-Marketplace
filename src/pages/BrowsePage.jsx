import { useMemo, useState } from "react";
import ClothingFilters from "../components/clothing/ClothingFilters";
import ClothingGrid from "../components/clothing/ClothingGrid";
import Loader from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";
import { useClothing } from "../hooks/useClothing";

export default function BrowsePage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    size: "",
    condition: "",
    city: "",
  });
  const [nearby, setNearby] = useState(false);

  const query = useMemo(
    () => ({
      ...filters,
      availableOnly: true,
      origin: nearby && user ? { lat: user.lat, lng: user.lng } : undefined,
    }),
    [filters, nearby, user],
  );

  const { items, loading } = useClothing(query);

  return (
    <div className="page-enter mx-auto max-w-6xl px-4 py-10">
      <section className="mb-8 overflow-hidden rounded-[2rem] bg-forest px-6 py-10 text-sand md:px-10">
        <p className="text-xs uppercase tracking-[0.25em] text-sand/70">
          Clothing exchange marketplace
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">
          Wear it again — just on someone else.
        </h1>
        <p className="mt-4 max-w-xl text-sand/80">
          List unused clothes, browse nearby wardrobes, and swap directly.
          Estimated values keep exchanges fair without a checkout.
        </p>
      </section>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-3xl text-forest">
          Available listings
        </h2>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={nearby}
            disabled={!user}
            onChange={(e) => setNearby(e.target.checked)}
          />
          Sort by distance from me {!user && "(sign in)"}
        </label>
      </div>

      <ClothingFilters value={filters} onChange={setFilters} />
      <div className="mt-6">
        {loading ? <Loader /> : <ClothingGrid items={items} />}
      </div>
    </div>
  );
}
