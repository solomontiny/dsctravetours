import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type Slide = {
  image: string;
  location: string;
  title: string;
  subtitle: string;
  cta?: { label: string; to: string };
};

const defaultSlides: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&w=2000&q=80",
    location: "Lagos, Nigeria",
    title: "Lagos at golden hour",
    subtitle:
      "From the bridges of Ikoyi to the lagoon skyline — our home, your gateway.",
    cta: { label: "Explore Nigeria tours", to: "/packages" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=80",
    location: "Dubai, UAE",
    title: "Skyline escapes to Dubai",
    subtitle: "Five-star stays, desert safaris and seamless visa support.",
    cta: { label: "View Dubai packages", to: "/packages" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=2000&q=80",
    location: "Zanzibar, Tanzania",
    title: "Turquoise shores of Zanzibar",
    subtitle: "Slow mornings, spice tours and dhow sunsets — curated end-to-end.",
    cta: { label: "Plan a beach escape", to: "/packages" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?auto=format&fit=crop&w=2000&q=80",
    location: "Cape Town, South Africa",
    title: "Mountains meet the Atlantic",
    subtitle: "Table Mountain, wine country and the Cape coastline.",
    cta: { label: "Discover Cape Town", to: "/packages" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=80",
    location: "Paris, France",
    title: "Timeless Paris",
    subtitle: "Boutique hotels, private guides and effortless Schengen visas.",
    cta: { label: "Browse Europe tours", to: "/packages" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2000&q=80",
    location: "Maldives",
    title: "Overwater in the Maldives",
    subtitle: "Honeymoons, anniversaries and once-in-a-lifetime stays.",
    cta: { label: "See honeymoon packages", to: "/packages" },
  },
];

type Props = { slides?: Slide[]; intervalMs?: number };

const HeroSlider = ({ slides = defaultSlides, intervalMs = 6000 }: Props) => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (n: number) => setIdx((n + slides.length) % slides.length),
    [slides.length],
  );
  const next = useCallback(() => go(idx + 1), [go, idx]);
  const prev = useCallback(() => go(idx - 1), [go, idx]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timer.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, slides.length, intervalMs]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const slide = slides[idx];

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured destinations"
    >
      <div className="relative h-[60vh] min-h-[440px] w-full sm:h-[70vh] md:h-[78vh] md:min-h-[560px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={`${slide.location} — ${slide.title}`}
              className="h-full w-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute inset-0 flex items-end">
          <div className="container-wide w-full pb-16 sm:pb-20 md:pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={`cap-${idx}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl text-white"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-md">
                  <MapPin className="h-3 w-3" />
                  {slide.location}
                </span>
                <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">
                  {slide.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base md:mt-4 md:text-lg">
                  {slide.subtitle}
                </p>
                {slide.cta && (
                  <div className="mt-6 md:mt-7">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-white px-6 text-primary hover:bg-white/90"
                    >
                      <Link to={slide.cta.to}>{slide.cta.label}</Link>
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Arrows (hidden on small) */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50 md:grid"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50 md:grid"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots + counter */}
        <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-3 md:bottom-6">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
            {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <motion.div
            key={`bar-${idx}-${paused ? "p" : "r"}`}
            initial={{ width: "0%" }}
            animate={{ width: paused ? "0%" : "100%" }}
            transition={{ duration: paused ? 0 : intervalMs / 1000, ease: "linear" }}
            className="h-full bg-accent"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
