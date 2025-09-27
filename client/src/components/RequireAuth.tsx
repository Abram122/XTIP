import { Navigate } from "react-router-dom"
import { useUnifiedUser } from "@/hooks/useUnifiedUser"
import Loader from "./ui/Loader"

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useUnifiedUser()

  if (loading) {
    return <Loader />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
