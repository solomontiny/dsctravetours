import { useSearchParams } from "react-router-dom";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import MultiStepBookingForm from "@/components/MultiStepBookingForm";
import { site } from "@/lib/site";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const defaultDestination = searchParams.get("destination") ?? "";
  const waHref = `https://wa.me/${site.whatsapp}`;

  return (
    <>
      <Seo
        title="Contact Us"
        description="Visit our Ikoyi, Lagos office, send us an email, call us or chat on WhatsApp — we typically reply within a few hours."
      />
      <PageHero
        eyebrow="Contact"
        title="Let's plan something memorable."
        description="Tell us where you'd like to go — we'll come back with a thoughtful plan within 24 hours."
      />

      <section className="py-20 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="space-y-6">
            <ContactCard
              icon={<MapPin className="h-5 w-5" />}
              title="Visit our office"
              text={site.address}
            />
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              title="Send an email"
              text={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              title="Call us"
              text={site.phone}
              href={`tel:${site.phone.replace(/\s/g, "")}`}
            />
            <ContactCard
              icon={<MessageCircle className="h-5 w-5" />}
              title="Chat on WhatsApp"
              text="The fastest way to reach us"
              href={waHref}
              external
            />

            <div className="overflow-hidden rounded-2xl border border-border/70 shadow-soft">
              <iframe
                title="DSC Travels & Tours office on the map"
                src="https://www.google.com/maps?q=Adekunle+Lawal+Street+Ikoyi+Lagos&output=embed"
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border/70 bg-card p-8 shadow-card md:p-10"
          >
            <h2 className="font-display text-2xl font-medium text-primary">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in the details below — we typically reply within a few hours.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Input label="Full name" name="name" value={form.name} onChange={handle} placeholder="Ada Okafor" />
              <Input label="Email address" type="email" name="email" value={form.email} onChange={handle} placeholder="ada@example.com" />
              <div className="md:col-span-2">
                <Input label="Subject" name="subject" value={form.subject} onChange={handle} placeholder="Honeymoon planning for August" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  rows={5}
                  placeholder="Tell us about your dream trip…"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <Button type="submit" size="lg" disabled={submitting} className="mt-8 rounded-full px-7">
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>
              ) : (
                <><Send className="mr-2 h-4 w-4" /> Send message</>
              )}
            </Button>
          </motion.form>
        </div>
      </section>
    </>
  );
};

const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div>
    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
    <input
      {...props}
      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus:border-accent focus:outline-none"
    />
  </div>
);

const ContactCard = ({
  icon, title, text, href, external = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href?: string;
  external?: boolean;
}) => {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="mt-1 break-words font-medium text-primary">{text}</div>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return inner;
};

export default Contact;
