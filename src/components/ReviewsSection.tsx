import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type ReviewRow = {
  id: string;
  user_id: string;
  rating: number;
  title: string | null;
  body: string | null;
  created_at: string;
};

type Author = { user_id: string; display_name: string | null; avatar_url: string | null };

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(120).optional(),
  body: z.string().trim().min(4, "Tell us a little more").max(2000),
});

const Stars = ({ value, onChange, size = "h-5 w-5" }: { value: number; onChange?: (v: number) => void; size?: string }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => {
      const v = i + 1;
      const filled = v <= value;
      const Cmp = onChange ? "button" : "span";
      return (
        <Cmp key={i} type="button" onClick={onChange ? () => onChange(v) : undefined}
          className={`${onChange ? "cursor-pointer" : ""}`}
          aria-label={onChange ? `Rate ${v} stars` : undefined}>
          <Star className={`${size} ${filled ? "fill-amber-500 text-amber-500" : "text-amber-500/30"}`} />
        </Cmp>
      );
    })}
  </div>
);

const ReviewsSection = ({ packageSlug }: { packageSlug: string }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewRow[] | null>(null);
  const [authors, setAuthors] = useState<Record<string, Author>>({});
  const [form, setForm] = useState({ rating: 0, title: "", body: "" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("id, user_id, rating, title, body, created_at")
      .eq("package_slug", packageSlug)
      .order("created_at", { ascending: false });
    const list = (data as ReviewRow[]) ?? [];
    setReviews(list);
    const ids = [...new Set(list.map((r) => r.user_id))];
    if (ids.length) {
      const { data: profs } = await supabase.from("profiles").select("user_id, display_name, avatar_url").in("user_id", ids);
      const map: Record<string, Author> = {};
      (profs as Author[] | null)?.forEach((p) => { map[p.user_id] = p; });
      setAuthors(map);
    }
  };

  useEffect(() => { load(); }, [packageSlug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      package_slug: packageSlug,
      rating: form.rating,
      title: form.title || null,
      body: form.body,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Thanks for your review!");
    setForm({ rating: 0, title: "", body: "" });
    load();
  };

  const avg = reviews && reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : null;

  return (
    <section className="border-t border-border/60 bg-secondary/30 py-12 md:py-16">
      <div className="container-narrow">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">Traveller reviews</h2>
            {avg !== null && (
              <div className="mt-2 flex items-center gap-2">
                <Stars value={Math.round(avg)} />
                <span className="text-sm text-muted-foreground">{avg.toFixed(1)} · {reviews!.length} review{reviews!.length === 1 ? "" : "s"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Review form */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          {!user ? (
            <p className="text-sm text-muted-foreground">
              <Link to={`/auth?redirect=/packages/${packageSlug}`} className="font-medium text-primary hover:underline">Sign in</Link> to share your experience.
            </p>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary">Your rating</label>
                <div className="mt-1"><Stars value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} size="h-6 w-6" /></div>
              </div>
              <Input placeholder="Title (optional)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={120} />
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={4}
                maxLength={2000}
                placeholder="What did you love about this trip?"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" disabled={busy || form.rating === 0} className="rounded-full">
                {busy ? "Posting…" : "Post review"}
              </Button>
            </form>
          )}
        </div>

        {/* List */}
        <div className="mt-8 space-y-4">
          {reviews === null ? (
            [0, 1, 2].map((i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)
          ) : reviews.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">Be the first to review this trip.</p>
          ) : (
            reviews.map((r, i) => {
              const a = authors[r.user_id];
              const name = a?.display_name || "Traveller";
              return (
                <motion.article key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                      {name.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-primary">{name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="ml-auto"><Stars value={r.rating} size="h-4 w-4" /></div>
                  </div>
                  {r.title && <h3 className="mt-3 font-display text-base font-semibold text-primary">{r.title}</h3>}
                  {r.body && <p className="mt-1 text-sm text-foreground/80 whitespace-pre-line">{r.body}</p>}
                </motion.article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
