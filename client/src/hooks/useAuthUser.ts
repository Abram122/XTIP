import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export function useAuthUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch current user when component mounts
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error) {
        setUser(data.user)
      }
      setLoading(false)
    })

    // Subscribe to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}
