import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Seo from "@/components/Seo";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(72),
  name: z.string().trim().min(1).max(80).optional(),
});

const Auth = () => {
  const [params] = useSearchParams();
  const initialMode = params.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [busy, setBusy] = useState(false);
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const redirect = params.get("redirect") || "/dashboard";

  if (!loading && user) return <Navigate to={redirect} replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setBusy(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: `${window.location.origin}${redirect}`,
            data: {
              display_name: form.name || form.email.split("@")[0],
            },
          },
        });

        if (error) throw error;

        toast.success("Account created. Welcome aboard!");
        nav(redirect);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (error) throw error;

        toast.success("Welcome back!");
        nav(redirect);
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  // ✅ FIXED GOOGLE AUTH (Supabase only — no lovable)
  const google = async () => {
    setBusy(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + redirect,
      },
    });

    if (error) {
      toast.error("Google sign-in failed");
      setBusy(false);
    }
  };

  return (
    <>
      <Seo
        title={mode === "signup" ? "Create account" : "Sign in"}
        description="Access your DSC Travels & Tours account to book trips and manage your itineraries."
      />

      <section className="container-wide flex min-h-[80vh] items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft"
        >
          <h1 className="font-display text-3xl font-semibold text-primary">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signup"
              ? "Save trips, track bookings, leave reviews."
              : "Sign in to manage your bookings."}
          </p>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            className="mt-6 w-full rounded-full"
            onClick={google}
            disabled={busy}
          >
            Continue with Google
          </Button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR{" "}
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={busy}
            >
              {busy
                ? "Please wait…"
                : mode === "signup"
                ? "Create account"
                : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signup"
              ? "Already have an account? "
              : "New here? "}

            <button
              type="button"
              onClick={() =>
                setMode(mode === "signup" ? "signin" : "signup")
              }
              className="font-medium text-primary hover:underline"
            >
              {mode === "signup" ? "Sign in" : "Create an account"}
            </button>
          </p>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:underline">
              ← Back to home
            </Link>
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default Auth;