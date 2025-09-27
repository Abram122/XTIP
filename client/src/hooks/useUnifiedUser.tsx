import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function useUnifiedUser() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            setLoading(true)

            // 1. Check Supabase session
            const { data } = await supabase.auth.getUser()
            if (data?.user) {
                setUser(data.user)
                setLoading(false)
                return
            }

            // 2. Check JWT stored locally (email login)
            const token = sessionStorage.getItem("authToken")
            const localUser = sessionStorage.getItem("user")

            if (token && localUser) {
                try {
                    setUser(JSON.parse(localUser))
                } catch {
                    setUser(null)
                }
            } else {
                setUser(null)
            }

            setLoading(false)
        }

        loadUser()
    }, [])

    return { user, loading }
}
