import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api, setCsrfToken } from "../api";

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  role: string;
};
type AuthValue = {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    api<{ success: boolean; user: AdminUser; csrfToken: string }>("/auth/me")
      .then((r) => {
        setUser(r.user);
        setCsrfToken(r.csrfToken);
      })
      .catch(() => {
        setUser(null);
        setCsrfToken("");
      })
      .finally(() => setLoading(false));
  }, []);
  const login = async (email: string, password: string) => {
    const r = await api<{ user: AdminUser; csrfToken: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setCsrfToken(r.csrfToken);
    setUser(r.user);
  };
  const logout = async () => {
    try {
      await api("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setCsrfToken("");
    }
  };
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const v = useContext(AuthContext);
  if (!v) throw new Error("useAuth must be inside AuthProvider");
  return v;
}
