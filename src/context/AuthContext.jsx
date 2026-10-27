import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { subscribe } from "../store";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getSessionUser());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return subscribe(() => setUser(authService.getSessionUser()));
  }, []);

  const run = useCallback(async (fn) => {
    setBusy(true);
    setError("");
    try {
      return await fn();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setBusy(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      busy,
      error,
      setError,
      login: (email, password) => run(() => authService.login(email, password)),
      register: (payload) => run(() => authService.register(payload)),
      logout: () => run(() => authService.logout()),
      updateProfile: (patch) =>
        run(() => authService.updateProfile(user.id, patch)),
      isAdmin: user?.role === "admin",
    }),
    [user, busy, error, run],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}
