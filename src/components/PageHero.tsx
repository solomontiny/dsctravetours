import { motion } from "framer-motion";

type Props = { eyebrow?: string; title: string; description?: string };

const PageHero = ({ eyebrow, title, description }: Props) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container-wide py-16 sm:py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-3 font-display text-[2.25rem] font-medium leading-[1.1] text-primary sm:text-4xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl">
              {description}
            </p>
          )}
        </motion.div>
      </div>
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
    </section>
  );
};

export default PageHero;
