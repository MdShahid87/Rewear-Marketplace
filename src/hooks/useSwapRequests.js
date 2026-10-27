import { useCallback, useEffect, useState } from "react";
import * as swapService from "../services/swapService";
import { useAuth } from "./useAuth";
import { useStore } from "./useStore";

export function useSwapRequests() {
  const { user } = useAuth();
  const store = useStore();
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setSwaps([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const data = await swapService.listSwaps(user.id);
    setSwaps(data.map(swapService.enrichSwap));
    setLoading(false);
  }, [user, store]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { swaps, loading, refresh };
}
