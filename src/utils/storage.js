// Defines the key used to store ReWear data in localStorage...
const KEY = "rewear-store-v1";

// Loads the saved ReWear data from localStorage in Browser.
export function loadStore() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Saves the ReWear data as a JSON string in localStorage.
export function saveStore(store) {
  localStorage.setItem(KEY, JSON.stringify(store));
}

// Removes the saved ReWear data from localStorage.
export function resetStore() {
  localStorage.removeItem(KEY);
}
