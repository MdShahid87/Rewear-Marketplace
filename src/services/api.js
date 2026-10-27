import { getStore, subscribe } from "../store";

export function delay(ms = 180) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withLatency(result) {
  await delay();
  return result;
}

export function getCurrentUser() {
  const { users, sessionUserId } = getStore();
  return users.find((user) => user.id === sessionUserId) || null;
}

export function findUser(id) {
  return getStore().users.find((user) => user.id === id);
}

export function useStoreSnapshot(selector) {
  return selector(getStore());
}

export { subscribe, getStore };
