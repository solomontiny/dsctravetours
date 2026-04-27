import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import PackageCard from "@/components/PackageCard";
import PackageQuickView from "@/components/PackageQuickView";
import Seo from "@/components/Seo";
import { categories, packages, type TourCategory, type TourPackage } from "@/lib/packages";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Filter = "All" | TourCategory;
type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

const SORT_LABELS: Record<SortKey, string> = {
  recommended: "Recommended",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
};

const MAX_PRICE = Math.max(...packages.map((p) => p.price));
const MIN_PRICE = Math.min(...packages.map((p) => p.price));

const Packages = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [maxBudget, setMaxBudget] = useState<number>(MAX_PRICE);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [quickViewPkg, setQuickViewPkg] = useState<TourPackage | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const openQuickView = (pkg: TourPackage) => {
    setQuickViewPkg(pkg);
    setQuickViewOpen(true);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = packages.filter((p) => {
      const matchCat = filter === "All" || p.category === filter;
      const matchBudget = p.price <= maxBudget;
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q);
      return matchCat && matchQ && matchBudget;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [filter, query, maxBudget, sort]);

  const filters: Filter[] = ["All", ...categories];
  const hasActiveFilters =
    filter !== "All" || query !== "" || maxBudget < MAX_PRICE || sort !== "recommended";

  const resetFilters = () => {
    setFilter("All");
    setQuery("");
    setMaxBudget(MAX_PRICE);
    setSort("recommended");
  };

  return (
    <>
      <Seo
        title="Tour Packages"
        description="Curated tour packages across Africa, Europe, Asia and the Middle East — beach, city, adventure, honeymoon and cultural trips."
      />
      <PageHero
        eyebrow="Tour packages"
        title="Curated trips, ready to book."
        description="Hand-picked journeys across Africa, Europe, Asia and the Middle East. Filter by style, budget or search a destination."
      />

      <section className="py-16 md:py-20">
        <div className="container-wide">
          {/* Search + Sort */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destination, country or trip…"
                aria-label="Search packages"
                className="w-full rounded-full border border-border bg-card py-2.5 pl-11 pr-5 text-sm text-primary placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-xs uppercase tracking-wider text-muted-foreground">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-primary focus:border-accent focus:outline-none"
              >
                {Object.entries(SORT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-primary"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Budget slider */}
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/60 p-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <SlidersHorizontal className="h-4 w-4 text-accent" />
              Max budget
            </div>
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={50}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              aria-label="Maximum budget per person"
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-accent"
            />
            <div className="font-display text-base font-semibold text-primary tabular-nums">
              up to ${maxBudget.toLocaleString()}
            </div>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="rounded-full text-muted-foreground"
              >
                <X className="mr-1 h-3 w-3" /> Reset
              </Button>
            )}
          </div>

          {/* Result count */}
          <p className="mt-6 text-sm text-muted-foreground">
            Showing <span className="font-medium text-primary">{filtered.length}</span> of {packages.length} trips
          </p>

          <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <PackageCard key={p.slug} pkg={p} index={i} onQuickView={openQuickView} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-border py-16 text-center">
              <p className="text-muted-foreground">No trips match those filters.</p>
              <Button onClick={resetFilters} variant="outline" size="sm" className="mt-4 rounded-full">
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <PackageQuickView
        pkg={quickViewPkg}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
};

export default Packages;
