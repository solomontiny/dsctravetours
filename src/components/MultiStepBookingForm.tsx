import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, User, Mail, Phone, Send, Loader2, CheckCircle2, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBookingSubmit } from "@/hooks/use-booking-submit";
import { useAuth } from "@/contexts/AuthContext";
import { buildWhatsAppUrl, bookingFollowUpMessage } from "@/lib/whatsapp";

type Step = 0 | 1 | 2;

const steps = [
  { label: "Trip", helper: "Where & when" },
  { label: "Travelers", helper: "How many people" },
  { label: "Contact", helper: "We'll reach out" },
];

type Props = { source?: "website" | "tour-details" | "contact"; defaultDestination?: string; packageSlug?: string; priceNgn?: number };

const today = new Date().toISOString().split("T")[0];

const MultiStepBookingForm = ({ source = "contact", defaultDestination = "", packageSlug, priceNgn }: Props) => {
  const { user, profile } = useAuth();
  const { submit, submitting } = useBookingSubmit();
  const [step, setStep] = useState<Step>(0);
  const [done, setDone] = useState<null | { name: string; destination: string; date: string; travelers: string }>(null);
  const [form, setForm] = useState({
    destination: defaultDestination,
    date: "",
    travelers: "2",
    name: profile?.display_name ?? "",
    email: user?.email ?? "",
    phone: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = (s: Step): string | null => {
    if (s === 0) {
      if (!form.destination.trim()) return "Please tell us where you'd like to go.";
      if (!form.date) return "Please pick a travel date.";
      return null;
    }
    if (s === 1) {
      const n = Number(form.travelers);
      if (!n || n < 1 || n > 50) return "Travelers must be between 1 and 50.";
      return null;
    }
    if (!form.name.trim() || form.name.length < 2) return "Please enter your full name.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) return "Email looks invalid.";
    return null;
  };

  const next = () => {
    const err = validate(step);
    if (err) return toast.error(err);
    setStep((s) => (Math.min(2, s + 1) as Step));
  };
  const back = () => setStep((s) => (Math.max(0, s - 1) as Step));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(2);
    if (err) return toast.error(err);
    const ok = await submit({
      name: form.name,
      destination: form.destination,
      travel_date: form.date,
      travelers: Number(form.travelers),
      email: form.email || null,
      phone: form.phone || null,
      message: form.message || null,
      source,
      user_id: user?.id,
      package_slug: packageSlug,
      price_ngn: priceNgn,
    });
    if (!ok) return;
    toast.success("Booking request received!");
    setDone({ name: form.name, destination: form.destination, date: form.date, travelers: form.travelers });
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-accent/40 bg-card/95 p-8 shadow-card backdrop-blur"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-soft text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-2xl font-medium text-primary">Booking request received</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Thanks {done.name.split(" ")[0]} — we've saved your request for{" "}
              <span className="font-medium text-primary">{done.destination}</span> on{" "}
              <span className="font-medium text-primary">
                {new Date(done.date).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
              </span>{" "}
              for {done.travelers} {Number(done.travelers) === 1 ? "traveler" : "travelers"}. A planner will reach out within 24 hours.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full">
                <a href={buildWhatsAppUrl(bookingFollowUpMessage(done))} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
                </a>
              </Button>
              <Button type="button" variant="ghost" className="rounded-full" onClick={() => { setDone(null); setStep(0); }}>
                Make another booking
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-border/70 bg-card/95 p-6 shadow-card backdrop-blur md:p-8" noValidate>
      {/* Stepper */}
      <ol className="mb-8 grid grid-cols-3 gap-3">
        {steps.map((s, i) => {
          const active = i === step;
          const complete = i < step;
          return (
            <li key={s.label} className="flex items-center gap-3">
              <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors ${
                  complete
                    ? "border-accent bg-accent text-accent-foreground"
                    : active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {complete ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <div className="min-w-0">
                <div className={`text-xs font-semibold uppercase tracking-wider ${active || complete ? "text-primary" : "text-muted-foreground"}`}>
                  {s.label}
                </div>
                <div className="hidden truncate text-[11px] text-muted-foreground sm:block">{s.helper}</div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Progress bar */}
      <div className="mb-8 h-1 overflow-hidden rounded-full bg-border">
        <motion.div
          initial={false}
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-brand"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {step === 0 && (
            <>
              <Field icon={<MapPin className="h-4 w-4" />} label="Destination">
                <input value={form.destination} onChange={set("destination")} placeholder="Dubai, UAE" className="field-input" required maxLength={200} />
              </Field>
              <Field icon={<Calendar className="h-4 w-4" />} label="Travel date">
                <input type="date" value={form.date} onChange={set("date")} min={today} className="field-input" required />
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <Field icon={<Users className="h-4 w-4" />} label="Travelers">
                <select value={form.travelers} onChange={set("travelers")} className="field-input">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                  ))}
                </select>
              </Field>
              <Field icon={<MessageCircle className="h-4 w-4" />} label="Anything special? (optional)">
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Honeymoon, kids' ages, dietary needs, etc."
                  className="field-input resize-none"
                  maxLength={2000}
                />
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <Field icon={<User className="h-4 w-4" />} label="Full name">
                <input value={form.name} onChange={set("name")} placeholder="Ada Okafor" className="field-input" autoComplete="name" required maxLength={120} />
              </Field>
              <Field icon={<Mail className="h-4 w-4" />} label="Email">
                <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className="field-input" autoComplete="email" maxLength={320} />
              </Field>
              <Field icon={<Phone className="h-4 w-4" />} label="Phone (WhatsApp preferred)">
                <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+234 800 000 0000" className="field-input" autoComplete="tel" maxLength={40} />
              </Field>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={back} disabled={step === 0} className="rounded-full">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
        </Button>
        {step < 2 ? (
          <Button type="button" onClick={next} className="rounded-full px-6">
            Continue <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={submitting} className="rounded-full px-6">
            {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</> : <><Send className="mr-2 h-4 w-4" /> Submit booking</>}
          </Button>
        )}
      </div>

      <style>{`
        .field-input {
          width: 100%;
          background: transparent;
          border: 0;
          outline: 0;
          font-size: 0.95rem;
          color: hsl(var(--primary));
          font-weight: 500;
        }
        .field-input::placeholder { color: hsl(var(--muted-foreground)); font-weight: 400; }
      `}</style>
    </form>
  );
};

const Field = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <label className="flex flex-col gap-1 rounded-xl border border-border/60 bg-secondary/40 px-4 py-3 transition-colors focus-within:border-accent/50 focus-within:bg-background">
    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      <span className="text-accent">{icon}</span>
      {label}
    </span>
    {children}
  </label>
);

export default MultiStepBookingForm;
