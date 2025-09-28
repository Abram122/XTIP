import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { getProfile } from "@/services/api"

export function useUnifiedUser() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            setLoading(true)

            const { data } = await supabase.auth.getUser()
            if (data?.user) {
                setUser(data.user)
                setLoading(false)
                return
            }

            try {
                const data = await getProfile()
                if (data.user?.id) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch {
                console.error("Failed to fetch user")
                setUser(null)
            }

            setLoading(false)
        }

        loadUser()
    }, [])

    return { user, loading }
}
