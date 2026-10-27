import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SwapValueBadge from "./SwapValueBadge";

export default function ClothingCard({ item }) {
  return (
    <Link
      to={`/items/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <SwapValueBadge value={item.estimatedValue} compact />
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-[11px] uppercase tracking-wide">
          {item.status}
        </span>
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-widest text-muted">
          {item.brand} · {item.size}
        </p>
        <h3 className="font-display text-lg leading-snug text-forest">
          {item.title}
        </h3>
        <p className="flex items-center gap-1 text-sm text-muted">
          <MapPin size={14} /> {item.city}
          {item.distanceKm != null && ` · ${item.distanceKm} km`}
        </p>
        <p className="text-sm text-ink/70">
          {item.condition} {item.category.toLowerCase()}
        </p>
      </div>
    </Link>
  );
}
