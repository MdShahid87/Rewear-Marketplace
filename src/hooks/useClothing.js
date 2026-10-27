import { useCallback, useEffect, useState } from "react";
import * as clothingService from "../services/clothingService";
import { useStore } from "./useStore";

// Loads and manages clothing listings based on the provided filters.
export function useClothing(filters) {
  const store = useStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await clothingService.listClothing(filters);
    setItems(data);
    setLoading(false);
  }, [JSON.stringify(filters), store]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, loading, refresh };
}
