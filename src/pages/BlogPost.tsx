import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="container-wide py-32 text-center">
        <h1 className="font-display text-3xl text-primary">Article not found</h1>
        <p className="mt-3 text-muted-foreground">This story doesn't exist (yet).</p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to all stories</Link>
        </Button>
      </section>
    );
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.image}
        type="article"
        jsonLd={jsonLd}
      />

      <article>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-background" />
          </div>
          <div className="container-tight pt-16 pb-20 md:pt-24 md:pb-28">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground">
              <ArrowLeft className="h-4 w-4" /> All stories
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                {post.category}
              </span>
              <h1 className="mt-4 font-display text-[2rem] font-medium leading-[1.1] text-primary-foreground sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/85">
                <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-tight max-w-3xl">
            <div className="prose-content space-y-6 text-lg leading-relaxed text-foreground/85">
              {post.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-border/70 bg-secondary/40 p-8 text-center">
              <span className="eyebrow">Plan with DSC</span>
              <h3 className="mt-2 font-display text-2xl font-medium text-primary">
                Inspired? Let's plan your trip.
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Tell us where and when — we'll come back with a thoughtful plan within 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild className="rounded-full px-6">
                  <Link to="/contact">Plan my trip</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link to="/packages">Browse packages</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-secondary/40 py-16 md:py-20">
            <div className="container-wide">
              <h2 className="font-display text-2xl font-medium text-primary md:text-3xl">Keep reading</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium uppercase tracking-wider text-accent">{p.category}</span>
                      <h3 className="mt-2 font-display text-base font-medium leading-snug text-primary group-hover:text-accent transition-colors">{p.title}</h3>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
};

export default BlogPost;
