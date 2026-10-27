import { getStore, uid, updateStore } from "../store";
import { delay } from "./api";

export async function listMessages(swapId) {
  await delay(80);
  return getStore()
    .messages.filter((message) => message.swapId === swapId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

export async function sendMessage(swapId, senderId, text) {
  await delay(80);
  const body = text.trim();
  if (!body) throw new Error("Message cannot be empty");
  const swap = getStore().swaps.find((item) => item.id === swapId);
  if (!swap) throw new Error("Conversation not found");
  if (swap.fromUserId !== senderId && swap.toUserId !== senderId) {
    throw new Error("You are not part of this conversation");
  }

  const message = {
    id: uid("m"),
    swapId,
    senderId,
    text: body,
    createdAt: new Date().toISOString(),
  };

  updateStore((store) => ({
    ...store,
    messages: [...store.messages, message],
    swaps: store.swaps.map((item) =>
      item.id === swapId
        ? {
            ...item,
            status: item.status === "pending" ? "negotiating" : item.status,
            updatedAt: message.createdAt,
          }
        : item,
    ),
  }));
  return message;
}
