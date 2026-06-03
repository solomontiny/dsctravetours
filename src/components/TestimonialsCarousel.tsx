import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Testimonial = { name: string; role: string; quote: string };

type Props = { items: Testimonial[]; intervalMs?: number };

const TestimonialsCarousel = ({ items, intervalMs = 6000 }: Props) => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    timer.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, items.length, intervalMs]);

  const go = (n: number) => setIdx((n + items.length) % items.length);

  return (
    <div
      className="relative mx-auto mt-12 max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-border/70 bg-card/90 p-8 shadow-card backdrop-blur md:min-h-[240px] md:p-12">
        <AnimatePresence mode="wait">
          <motion.figure
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-display text-xl font-medium leading-relaxed text-foreground/90 md:text-2xl">
              “{items[idx].quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-border/60 pt-4">
              <div className="font-medium text-primary">{items[idx].name}</div>
              <div className="text-xs text-muted-foreground">{items[idx].role}</div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(idx - 1)}
          aria-label="Previous testimonial"
          className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-card text-primary transition-colors hover:bg-accent-soft"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-accent" : "w-2 bg-border"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(idx + 1)}
          aria-label="Next testimonial"
          className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-card text-primary transition-colors hover:bg-accent-soft"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
