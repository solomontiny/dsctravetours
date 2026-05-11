import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

const useCountdown = (target: string) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const ms = target ? Math.max(0, new Date(target).getTime() - now) : 0;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s, done: target && ms === 0 };
};

const TripCountdown = () => {
  const [date, setDate] = useState("");
  const { d, h, m, s, done } = useCountdown(date);
  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft md:p-8">
      <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-primary"><CalendarClock className="h-5 w-5 text-accent" /> Trip countdown</h3>
      <input
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
        className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary"
      />
      <div className="mt-6 grid grid-cols-4 gap-2">
        {[["Days", d], ["Hours", h], ["Min", m], ["Sec", s]].map(([l, v]) => (
          <div key={l as string} className="rounded-2xl bg-gradient-soft p-3 text-center">
            <div className="font-display text-2xl font-semibold tabular-nums text-primary">{date ? String(v).padStart(2, "0") : "—"}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
      {done ? <p className="mt-4 text-sm text-accent">Bon voyage! ✈️</p> : <p className="mt-4 text-xs text-muted-foreground">Pick your departure date to start the countdown.</p>}
    </div>
  );
};

export default TripCountdown;
