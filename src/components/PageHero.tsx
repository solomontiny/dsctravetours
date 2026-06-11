import { motion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

const PageHero = ({ eyebrow, title, description, image, imageAlt }: Props) => {
  const hasImage = !!image;

  return (
    <section
      className={`relative isolate overflow-hidden ${
        hasImage ? "bg-primary text-white" : "bg-gradient-hero"
      }`}
    >
      {hasImage && (
        <div className="absolute inset-0 -z-10">
          <img
            src={image}
            alt={imageAlt || ""}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        </div>
      )}

      <div
        className={`container-wide ${
          hasImage
            ? "py-20 sm:py-28 md:py-36"
            : "py-16 sm:py-20 md:py-28"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span
              className={
                hasImage
                  ? "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md"
                  : "eyebrow"
              }
            >
              {eyebrow}
            </span>
          )}
          <h1
            className={`mt-3 font-display text-[2.25rem] font-medium leading-[1.1] sm:text-4xl md:text-6xl ${
              hasImage ? "text-white" : "text-primary"
            }`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`mt-4 max-w-2xl text-base sm:text-lg md:mt-5 md:text-xl ${
                hasImage ? "text-white/85" : "text-muted-foreground"
              }`}
            >
              {description}
            </p>
          )}
        </motion.div>
      </div>

      {!hasImage && (
        <>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        </>
      )}
    </section>
  );
};

export default PageHero;
