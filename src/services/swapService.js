import { getStore, uid, updateStore } from "../store";
import { delay } from "./api";

export async function listSwaps(userId) {
  await delay();
  return getStore()
    .swaps.filter(
      (swap) => swap.fromUserId === userId || swap.toUserId === userId,
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export async function listAllSwaps() {
  await delay();
  return [...getStore().swaps].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );
}

export async function getSwap(id) {
  await delay();
  return getStore().swaps.find((swap) => swap.id === id) || null;
}

// Creates a swap request after validating both items and checking for duplicates.
export async function createSwapRequest({
  fromUserId,
  offeredItemId,
  requestedItemId,
  meetingType,
}) {
  await delay();
  const { listings, swaps } = getStore();
  const offered = listings.find((item) => item.id === offeredItemId);
  const requested = listings.find((item) => item.id === requestedItemId);
  if (!offered || !requested)
    throw new Error("One of the items is no longer available");
  if (offered.ownerId !== fromUserId)
    throw new Error("Offer an item from your wardrobe");
  if (requested.ownerId === fromUserId)
    throw new Error("You cannot swap with yourself");
  if (offered.status !== "available" || requested.status !== "available") {
    throw new Error("Both items must be available");
  }
  const duplicate = swaps.find(
    (swap) =>
      swap.fromUserId === fromUserId &&
      swap.requestedItemId === requestedItemId &&
      ["pending", "negotiating", "accepted", "shipped"].includes(swap.status),
  );
  if (duplicate)
    throw new Error("You already have an open request for this item");

  const swap = {
    id: uid("s"),
    fromUserId,
    toUserId: requested.ownerId,
    offeredItemId,
    requestedItemId,
    status: "pending",
    meetingType: meetingType || "local",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  updateStore((store) => ({ ...store, swaps: [swap, ...store.swaps] }));
  return swap;
}

// Updates a swap's status and adjusts the related listing statuses.
export async function updateSwapStatus(id, status, actorId) {
  await delay();
  const swap = getStore().swaps.find((item) => item.id === id);
  if (!swap) throw new Error("Swap request not found");
  if (swap.fromUserId !== actorId && swap.toUserId !== actorId) {
    throw new Error("Not authorised to update this swap");
  }

  if (status === "accepted" || status === "rejected") {
    if (swap.toUserId !== actorId)
      throw new Error("Only the recipient can accept or reject");
  }

  updateStore((store) => {
    let listings = store.listings;
    if (status === "accepted") {
      listings = listings.map((item) =>
        item.id === swap.offeredItemId || item.id === swap.requestedItemId
          ? { ...item, status: "reserved" }
          : item,
      );
    }
    if (status === "completed") {
      listings = listings.map((item) =>
        item.id === swap.offeredItemId || item.id === swap.requestedItemId
          ? { ...item, status: "swapped" }
          : item,
      );
    }
    if (status === "rejected") {
      listings = listings.map((item) =>
        item.id === swap.offeredItemId || item.id === swap.requestedItemId
          ? {
              ...item,
              status: item.status === "reserved" ? "available" : item.status,
            }
          : item,
      );
    }
    return {
      ...store,
      listings,
      swaps: store.swaps.map((item) =>
        item.id === id
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item,
      ),
    };
  });
}

// Adds the related clothing items and users to a swap request.
export function enrichSwap(swap) {
  const { listings, users } = getStore();
  return {
    ...swap,
    offeredItem: listings.find((item) => item.id === swap.offeredItemId),
    requestedItem: listings.find((item) => item.id === swap.requestedItemId),
    fromUser: users.find((user) => user.id === swap.fromUserId),
    toUser: users.find((user) => user.id === swap.toUserId),
  };
}
