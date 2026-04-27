import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, User, Send, Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { site } from "@/lib/site";
import { bookingSchema } from "@/lib/validation";
import { useBookingSubmit } from "@/hooks/use-booking-submit";

type Props = {
  compact?: boolean;
  source?: "website" | "tour-details" | "contact";
  defaultDestination?: string;
};

const buildWhatsAppUrl = (form: { name: string; destination: string; date: string; travelers: string }) => {
  const lines = [
    "Hello DSC Travels & Tours,",
    "",
    "I just submitted a booking request:",
    `• Name: ${form.name}`,
    `• Destination: ${form.destination}`,
    `• Date: ${form.date}`,
    `• Travelers: ${form.travelers}`,
  ];
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
};

const BookingForm = ({ compact = false, source = "website", defaultDestination = "" }: Props) => {
  const initial = { name: "", destination: defaultDestination, date: "", travelers: "2" };
  const [form, setForm] = useState(initial);
  const [confirmation, setConfirmation] = useState<null | typeof initial>(null);
  const { submit, submitting } = useBookingSubmit();

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    const data = parsed.data;

    const ok = await submit({
      name: data.name,
      destination: data.destination,
      travel_date: data.date,
      travelers: data.travelers,
      source,
    });
    if (!ok) return;

    toast.success("Booking request received!");
    setConfirmation(form);
    setForm({ ...initial, destination: defaultDestination });
  };

  if (confirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-accent/40 bg-card/95 p-6 shadow-card backdrop-blur md:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl font-medium text-primary md:text-2xl">
              Booking request received
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Thanks {confirmation.name.split(" ")[0]} — we've saved your request for{" "}
              <span className="font-medium text-primary">{confirmation.destination}</span> on{" "}
              <span className="font-medium text-primary">
                {new Date(confirmation.date).toLocaleDateString(undefined, {
                  weekday: "short", day: "numeric", month: "short", year: "numeric",
                })}
              </span>{" "}
              for {confirmation.travelers} {Number(confirmation.travelers) === 1 ? "traveler" : "travelers"}.
              A travel consultant will reach out within 24 hours.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full">
                <a
                  href={buildWhatsAppUrl(confirmation)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full"
                onClick={() => setConfirmation(null)}
              >
                Make another booking
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      noValidate
      className={`grid gap-3 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-card backdrop-blur md:p-5 ${
        compact ? "" : "md:grid-cols-[1fr_1fr_1fr_auto_auto]"
      }`}
    >
      <Field icon={<User className="h-4 w-4" />} label="Your name">
        <input
          name="name"
          value={form.name}
          onChange={handle}
          placeholder="Ada Okafor"
          className="field-input"
          autoComplete="name"
          maxLength={120}
          required
        />
      </Field>
      <Field icon={<MapPin className="h-4 w-4" />} label="Destination">
        <input
          name="destination"
          value={form.destination}
          onChange={handle}
          placeholder="Dubai, UAE"
          className="field-input"
          maxLength={200}
          required
        />
      </Field>
      <Field icon={<Calendar className="h-4 w-4" />} label="Travel date">
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handle}
          min={new Date().toISOString().split("T")[0]}
          className="field-input"
          required
        />
      </Field>
      <Field icon={<Users className="h-4 w-4" />} label="Travelers">
        <select name="travelers" value={form.travelers} onChange={handle} className="field-input">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
          ))}
        </select>
      </Field>

      <Button type="submit" disabled={submitting} className="h-auto w-full rounded-xl px-6 py-3 text-sm md:w-auto md:self-end">
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Book Now
          </>
        )}
      </Button>

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
        .field-input:focus { outline: none; }
      `}</style>
    </motion.form>
  );
};

const Field = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <label className="group flex flex-col gap-1 rounded-xl border border-transparent bg-secondary/60 px-4 py-2.5 transition-colors focus-within:border-accent/50 focus-within:bg-background">
    <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
      <span className="text-accent">{icon}</span>
      {label}
    </span>
    {children}
  </label>
);

export default BookingForm;
