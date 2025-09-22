import { useAuth } from "../context/AuthContext";
import AuthButtons from "./AuthButtons";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="mb-4">You must sign in to access this page.</p>
        <AuthButtons />
      </div>
    );
  }

  return children;
}
