import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
export default function ProtectedAdmin() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="auth-loading">
        <div>
          <span className="eyebrow">ETEF ADMINISTRATION</span>
          <h1>Checking secure session…</h1>
        </div>
      </div>
    );
  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
