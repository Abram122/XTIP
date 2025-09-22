import { supabase } from '../lib/supabaseClient'
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export default function AuthButtons() {
  async function signIn(provider) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin, // after login return here
      },
    })
    if (error) console.error(error)
  }

  return (
    <div className="flex gap-2">
        <Button onClick={() => signIn('google')}>
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium">Sign in with Google</span>
        </Button>
        <Button onClick={() => signIn('github')}>
            <FaGithub className="w-5 h-5" />
            Sign in with GitHub
        </Button>
    </div>
  )
}
