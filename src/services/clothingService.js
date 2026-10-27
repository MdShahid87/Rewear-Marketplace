import { estimateSwapValue, haversineKm } from "../utils/swapValue";
import { getStore, uid, updateStore } from "../store";
import { delay } from "./api";

// Retrieves clothing listings and applies the provided search filters.
export async function listClothing(filters = {}) {
  await delay();
  let items = getStore().listings.filter((item) => item.status !== "removed");

  // Searches listing titles, brands, categories, types, and cities.
  if (filters.q) {
    const q = filters.q.toLowerCase();
    items = items.filter((item) =>
      [item.title, item.brand, item.category, item.type, item.city]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }
  // Filters listings by clothing category.
  if (filters.category)
    items = items.filter((item) => item.category === filters.category);
  if (filters.size) items = items.filter((item) => item.size === filters.size);
  if (filters.condition)
    items = items.filter((item) => item.condition === filters.condition);
  if (filters.city) items = items.filter((item) => item.city === filters.city);
  if (filters.ownerId)
    items = items.filter((item) => item.ownerId === filters.ownerId);
  if (filters.excludeOwnerId)
    items = items.filter((item) => item.ownerId !== filters.excludeOwnerId);
  if (filters.availableOnly)
    items = items.filter((item) => item.status === "available");

  if (filters.origin) {
    items = items
      .map((item) => ({
        ...item,
        distanceKm: haversineKm(filters.origin, item),
      }))
      .sort((a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));
  } else {
    items = [...items].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }

  return items;
}

export async function getClothing(id) {
  await delay();
  return getStore().listings.find((item) => item.id === id) || null;
}

// Creates a new clothing listing for the specified owner
export async function createListing(owner, payload) {
  await delay();
  const item = {
    id: uid("c"),
    ownerId: owner.id,
    title: payload.title.trim(),
    category: payload.category,
    type: payload.type?.trim() || payload.category,
    brand: payload.brand.trim(),
    size: payload.size,
    condition: payload.condition,
    description: payload.description.trim(),
    imageUrl: payload.imageUrl.trim(),
    city: owner.city,
    lat: owner.lat,
    lng: owner.lng,
    estimatedValue: estimateSwapValue(payload),
    status: "available",
    createdAt: new Date().toISOString(),
  };
  updateStore((store) => ({ ...store, listings: [item, ...store.listings] }));
  return item;
}

// Updates an existing listing after checking the actor's permissions.
export async function updateListing(id, payload, actor) {
  await delay();
  const current = getStore().listings.find((item) => item.id === id);
  if (!current) throw new Error("Listing not found");
  if (actor.role !== "admin" && current.ownerId !== actor.id) {
    throw new Error("You can only edit your own listings");
  }
  const next = {
    ...current,
    ...payload,
    estimatedValue: estimateSwapValue({ ...current, ...payload }),
  };
  updateStore((store) => ({
    ...store,
    listings: store.listings.map((item) => (item.id === id ? next : item)),
  }));
  return next;
}

// Marks a listing as removed after checking the actor's permissions.
export async function removeListing(id, actor) {
  await delay();
  const current = getStore().listings.find((item) => item.id === id);
  if (!current) throw new Error("Listing not found");
  if (actor.role !== "admin" && current.ownerId !== actor.id) {
    throw new Error("You can only remove your own listings");
  }
  updateStore((store) => ({
    ...store,
    listings: store.listings.map((item) =>
      item.id === id ? { ...item, status: "removed" } : item,
    ),
  }));
}

// Finds available listings from other owners, prioritizing similar values and shorter distances.
export function nearbyMatches(item, origin, limit = 4) {
  return getStore()
    .listings.filter(
      (other) =>
        other.id !== item.id &&
        other.status === "available" &&
        other.ownerId !== item.ownerId,
    )
    .map((other) => ({
      ...other,
      distanceKm: haversineKm(origin || item, other),
      valueGap: Math.abs(other.estimatedValue - item.estimatedValue),
    }))
    .sort((a, b) => a.valueGap - b.valueGap || a.distanceKm - b.distanceKm)
    .slice(0, limit);
}
