import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../lib/supabaseClient";

export function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user on mount
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error && data?.user) {
        setUser(data.user);
      }
      setLoading(false);
    });

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          const sessionUser = session?.user ?? null;
          setUser(sessionUser);

          if (sessionUser) {
            await saveUserToBackend(sessionUser);
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null); // logout → don’t send to backend
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Save user to backend API
  const saveUserToBackend = async (user) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/save`, {
        email: user.email,
        name: user.user_metadata?.full_name ?? null,
      });
    } catch (err) {
      console.error(
        "Error saving user to backend:",
        err.response?.data || err.message
      );
    }
  };

  return { user, loading };
}
