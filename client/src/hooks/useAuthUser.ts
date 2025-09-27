import { useEffect, useState } from "react"
import axios from "axios"
import { supabase } from "../lib/supabaseClient"

export function useAuthUser() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error && data?.user) {
        setUser(data.user)
      }
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          const sessionUser = session?.user ?? null
          setUser(sessionUser)
          if (sessionUser) {
            await saveUserToBackend(sessionUser)
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null)
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const saveUserToBackend = async (user: any) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/save`, {
        email: user.email,
        name: user.user_metadata?.full_name ?? null,
      })
    } catch (err: any) {
      console.error("Error saving user to backend:", err.response?.data || err.message)
    }
  }

  return { user, loading }
}
