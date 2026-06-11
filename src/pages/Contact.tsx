import { useSearchParams } from "react-router-dom";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import MultiStepBookingForm from "@/components/MultiStepBookingForm";
import { site } from "@/lib/site";
import contactHero from "@/assets/dest-dubai.jpg";

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
        image={contactHero}
        imageAlt="Dubai skyline at twilight"
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

          {/* Multi-step booking */}
          <div>
            <h2 className="font-display text-2xl font-medium text-primary">Plan your trip</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Three quick steps. We typically reply within a few hours.
            </p>
            <div className="mt-6">
              <MultiStepBookingForm source="contact" defaultDestination={defaultDestination} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



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
