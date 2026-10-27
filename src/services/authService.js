import { getStore, updateStore } from "../store";
import { delay } from "./api";

// Authenticates a user using their email and password.
export async function login(email, password) {
  await delay();
  const user = getStore().users.find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password,
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }
  updateStore((store) => ({ ...store, sessionUserId: user.id }));
  return sanitize(user);
}

// Creates a new user account and starts a local session.
export async function register(payload) {
  await delay();
  const exists = getStore().users.some(
    (item) => item.email.toLowerCase() === payload.email.trim().toLowerCase(),
  );
  if (exists) throw new Error("An account with this email already exists");

  const user = {
    id: `u-${Math.random().toString(36).slice(2, 9)}`,
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    role: "user",
    city: payload.city,
    lat: payload.lat,
    lng: payload.lng,
    bio:
      payload.bio?.trim() || "New to ReWear — listing unused pieces for swap.",
    avatar: `https://i.pravatar.cc/200?u=${encodeURIComponent(payload.email)}`,
    joinedAt: new Date().toISOString(),
  };

  updateStore((store) => ({
    ...store,
    users: [...store.users, user],
    sessionUserId: user.id,
  }));
  return sanitize(user);
}

export async function logout() {
  await delay(80);
  updateStore((store) => ({ ...store, sessionUserId: null }));
}

export async function updateProfile(userId, patch) {
  await delay();
  let updated = null;
  updateStore((store) => ({
    ...store,
    users: store.users.map((user) => {
      if (user.id !== userId) return user;
      updated = { ...user, ...patch };
      return updated;
    }),
  }));
  return sanitize(updated);
}

export function getSessionUser() {
  const { users, sessionUserId } = getStore();
  const user = users.find((item) => item.id === sessionUserId);
  return user ? sanitize(user) : null;
}

function sanitize(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}
