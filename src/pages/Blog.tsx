import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { posts } from "@/lib/blog";
import { cn } from "@/lib/utils";

const categories = ["All", "Guides", "Destinations", "Tips", "Visa"] as const;
type Cat = (typeof categories)[number];

const Blog = () => {
  const [cat, setCat] = useState<Cat>("All");
  const list = useMemo(
    () => (cat === "All" ? posts : posts.filter((p) => p.category === cat)),
    [cat]
  );
  const [featured, ...rest] = list;

  return (
    <>
      <Seo
        title="Travel Guide & Stories"
        description="Practical guides, destination deep-dives and travel tips from the DSC Travels & Tours editorial team."
      />
      <PageHero
        eyebrow="Travel guide"
        title="Stories, guides and notes from the road."
        description="Practical advice, destination deep-dives and visa tips — written by our team and travelers."
      />

      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-primary"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10 grid overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card md:grid-cols-2"
            >
              <Link to={`/blog/${featured.slug}`} className="relative block aspect-[4/3] overflow-hidden md:aspect-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="eager"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
                />
              </Link>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="eyebrow">{featured.category} · Featured</span>
                <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-primary md:text-4xl">
                  <Link to={`/blog/${featured.slug}`} className="hover:text-accent transition-colors">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{new Date(featured.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
                </div>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary link-underline"
                >
                  Read article <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          )}

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <Link to={`/blog/${p.slug}`}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium uppercase tracking-wider text-accent">{p.category}</span>
                    <h3 className="mt-2 font-display text-lg font-medium leading-snug text-primary group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                      <span>{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
