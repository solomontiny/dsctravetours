import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Calendar, MapPin, Users, X, Star, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/use-favorites";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import dashHero from "@/assets/dest-zanzibar.jpg";
import { formatNGN } from "@/lib/currency";
import { packages } from "@/lib/packages";

type Booking = {
  id: string;
  destination: string;
  travel_date: string | null;
  travelers: number;
  status: string;
  package_slug: string | null;
  price_ngn: number | null;
  created_at: string;
};

type Review = { id: string; package_slug: string; rating: number; title: string | null; created_at: string };

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const { slugs: favSlugs, toggle: toggleFav } = useFavorites();
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const favoritePackages = packages.filter((p) => favSlugs.includes(p.slug));

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [b, r] = await Promise.all([
        supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("reviews").select("id, package_slug, rating, title, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      setBookings((b.data as Booking[]) ?? []);
      setReviews((r.data as Review[]) ?? []);
    })();
  }, [user]);

  if (loading) return <div className="container-wide py-32 text-center text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/auth?redirect=/dashboard" replace />;

  const cancel = async (id: string) => {
    const { error } = await supabase.from("bookings").update({ status: "cancelled" }).eq("id", id);
    if (error) return toast.error("Couldn't cancel booking");
    setBookings((prev) => prev?.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)) ?? null);
    toast.success("Booking cancelled");
  };

  const name = profile?.display_name || user.email?.split("@")[0];

  return (
    <>
      <Seo title="My dashboard" description="Manage your bookings, reviews, and travel preferences." />
      <PageHero eyebrow={`Hi, ${name}`} title="Your travel dashboard" description="Track your bookings, leave reviews, and plan your next adventure." />

      <section className="py-12 md:py-16">
        <div className="container-wide grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-primary">My bookings</h2>
              <Button asChild variant="outline" size="sm" className="rounded-full"><Link to="/packages">Book another trip</Link></Button>
            </div>

            {bookings === null ? (
              <div className="mt-6 space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}</div>
            ) : bookings.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
                <p className="text-muted-foreground">You haven't booked any trips yet.</p>
                <Button asChild className="mt-4 rounded-full"><Link to="/packages">Browse packages</Link></Button>
              </div>
            ) : (
              <ul className="mt-6 space-y-3">
                {bookings.map((b, i) => (
                  <motion.li key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex h-2 w-2 rounded-full ${b.status === "cancelled" ? "bg-destructive" : b.status === "confirmed" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">{b.status}</span>
                      </div>
                      <h3 className="mt-1 truncate font-display text-lg font-semibold text-primary">{b.destination}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {b.travel_date && <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(b.travel_date).toLocaleDateString()}</span>}
                        <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{b.travelers} traveller{b.travelers > 1 ? "s" : ""}</span>
                        {b.price_ngn && <span className="font-medium text-primary">{formatNGN(b.price_ngn)}</span>}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {b.package_slug && (
                        <Button asChild variant="outline" size="sm" className="rounded-full"><Link to={`/packages/${b.package_slug}`}><MapPin className="mr-1 h-3 w-3" />View</Link></Button>
                      )}
                      {b.status !== "cancelled" && (
                        <Button onClick={() => cancel(b.id)} variant="outline" size="sm" className="rounded-full text-destructive hover:text-destructive"><X className="mr-1 h-3 w-3" />Cancel</Button>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-primary">My reviews</h3>
              {reviews === null ? <Skeleton className="mt-3 h-16 w-full" /> : reviews.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">You haven't written any reviews yet. After your trip, share your experience to help others.</p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {reviews.map((r) => (
                    <li key={r.id} className="rounded-xl border border-border/60 p-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-current" : "opacity-30"}`} />)}
                      </div>
                      <Link to={`/packages/${r.package_slug}`} className="mt-1 block truncate text-sm font-medium text-primary hover:underline">{r.title || r.package_slug}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
                <Heart className="h-4 w-4 text-destructive" /> Saved trips
              </h3>
              {favoritePackages.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Tap the heart on any tour to save it here for later.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {favoritePackages.map((p) => (
                    <li key={p.slug} className="flex items-center justify-between gap-2 rounded-xl border border-border/60 p-2 pl-3">
                      <Link to={`/packages/${p.slug}`} className="min-w-0 flex-1 truncate text-sm font-medium text-primary hover:underline">
                        {p.title}
                      </Link>
                      <button
                        onClick={() => toggleFav(p.slug)}
                        aria-label={`Remove ${p.title} from favorites`}
                        className="grid h-7 w-7 place-items-center rounded-full text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
              <p className="text-primary font-medium">Need help?</p>
              <p className="mt-2">Our travel team is on standby on WhatsApp and email to help you adjust trips.</p>
              <Button asChild variant="outline" size="sm" className="mt-4 rounded-full"><Link to="/contact">Contact support</Link></Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
