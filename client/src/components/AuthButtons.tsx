import { supabase } from "../lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaEnvelope } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function AuthButtons() {
  async function signIn(provider: "google" | "github") {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (error) console.error(error)
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-4">
      <h2 className="text-center text-2xl font-bold text-foreground">
        Sign in to your account
      </h2>
      <p className="text-center text-muted-foreground text-sm">
        Choose one of the following providers
      </p>

      <div className="flex flex-col gap-3">
        <Button
          onClick={() => signIn("google")}
          variant="outline"
          className="flex items-center justify-center gap-3 w-full py-5 rounded-xl text-base font-medium transition-colors hover:bg-accent/50 dark:hover:bg-accent/30"
        >
          <FcGoogle className="w-6 h-6" />
          <span>Continue with Google</span>
        </Button>

        <Button
          onClick={() => signIn("github")}
          variant="outline"
          className="flex items-center justify-center gap-3 w-full py-5 rounded-xl text-base font-medium transition-colors hover:bg-accent/50 dark:hover:bg-accent/30"
        >
          <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          <span>Continue with GitHub</span>
        </Button>

        <Link to="/login" className="w-full">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-xl text-base font-medium transition-colors hover:bg-accent/50 dark:hover:bg-accent/30"
          >
            <FaEnvelope className="w-6 h-6 text-blue-500" />
            <span>Continue with Email</span>
          </Button>
        </Link>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-2">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-primary font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
