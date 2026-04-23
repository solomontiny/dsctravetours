import { motion } from "framer-motion";
import { Award, Target, Heart } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Seo from "@/components/Seo";
import bukola from "@/assets/team-bukola.jpg";
import babs from "@/assets/team-babs.jpg";
import hakeem from "@/assets/team-hakeem.jpg";

const directors = [
  { name: "Amb. Dr. Mrs. Olubukola Abitoye", role: "Managing Director", img: bukola },
  { name: "Babs Olugbemi", role: "Independent Director", img: babs },
  { name: "Engr Hakeem Ademola Adeoye", role: "Non Executive Director", img: hakeem },
];

const About = () => (
  <>
    <Seo
      title="About Us"
      description="DSC Travels and Tours — a legally registered Lagos-based agency delivering excellent travel and tourism services since 2024."
    />
    <PageHero
      eyebrow="About us"
      title="A travel agency built on quiet excellence."
      description="DSC Travels and Tours was fully established in 2024 — a legally registered agency committed to top-notch travel and tourism services for individuals and corporate clients within and outside Nigeria."
    />

    {/* Story */}
    <section className="py-14 sm:py-20 md:py-28">
      <div className="container-tight grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Our story</span>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-primary md:text-4xl">
            Passion for excellence, quality service and the most memorable experiences.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            We're a reputable organization with a passion for excellence and quality service —
            providing clients travel experiences they'll treasure long after they return home.
            Whether it's a corporate trip, a family holiday or a once-in-a-lifetime honeymoon,
            we treat every itinerary like our own.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { k: "2024", v: "Established" },
            { k: "30+", v: "Destinations" },
            { k: "500+", v: "Happy travelers" },
            { k: "98%", v: "Visa success" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl border border-border/70 bg-card p-6 text-center shadow-soft">
              <div className="font-display text-3xl font-semibold text-primary">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="bg-gradient-hero py-14 sm:py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader eyebrow="Purpose" title="Why we do this" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border/70 bg-card p-10 shadow-soft"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-primary">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-medium text-primary">Our Vision</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              To create an environmentally and socially responsible approach to travel that
              brings forth a high quality of personality and trust.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border/70 bg-card p-10 shadow-soft"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-primary">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-medium text-primary">Our Mission</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              To focus on customer satisfaction by delivering excellent, quality service and
              providing unforgettable travel experiences that fulfill our clients' dreams.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Board */}
    <section className="py-14 sm:py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Leadership"
          title="Board of Directors"
          description="Experienced leaders guiding DSC with care and discipline."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {directors.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-medium text-primary">{d.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-accent">{d.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="bg-secondary/40 py-20 md:py-24">
      <div className="container-wide grid gap-8 md:grid-cols-3">
        {[
          { icon: Heart, title: "Care first", text: "Every itinerary is shaped around the people traveling." },
          { icon: Award, title: "Quality always", text: "Trusted partners, vetted hotels, and verified routes." },
          { icon: Target, title: "Honest counsel", text: "We tell you what works — even when it's the simpler option." },
        ].map((v) => (
          <div key={v.title} className="flex items-start gap-5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-soft">
              <v.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-medium text-primary">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default About;
