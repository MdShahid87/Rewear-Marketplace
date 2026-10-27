import { useEffect, useState } from "react";
import { getStore, subscribe } from "../store";

// Provides the current application store state to React components.
export function useStore() {
  const [snapshot, setSnapshot] = useState(() => getStore());
  useEffect(() => subscribe(setSnapshot), []);
  return snapshot;
}
