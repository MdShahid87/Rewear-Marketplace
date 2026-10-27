import { createSeedStore } from "./data/seed";
import { loadStore, saveStore } from "./utils/storage";

let store = loadStore() || createSeedStore();
saveStore(store);

const listeners = new Set();

export function getStore() {
  return store;
}

export function setStore(next) {
  store = next;
  saveStore(store);
  listeners.forEach((listener) => listener(store));
}

export function updateStore(updater) {
  setStore(updater(store));
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetToSeed() {
  const next = createSeedStore();
  next.sessionUserId = store.sessionUserId;
  setStore(next);
}

export function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
