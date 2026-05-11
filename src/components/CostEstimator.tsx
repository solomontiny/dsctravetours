import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { formatNGN } from "@/lib/currency";

const CostEstimator = () => {
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(7);
  const [flight, setFlight] = useState(800000);
  const [hotel, setHotel] = useState(120000);
  const [extras, setExtras] = useState(150000);

  const total = useMemo(
    () => travelers * (flight + nights * hotel + extras),
    [travelers, nights, flight, hotel, extras],
  );

  const Row = ({ label, value, set, step = 50000, min = 0 }: { label: string; value: number; set: (n: number) => void; step?: number; min?: number }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => set(Math.max(min, Number(e.target.value) || 0))}
        className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-primary focus:border-accent focus:outline-none"
      />
    </div>
  );

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft md:p-8">
      <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-primary"><Calculator className="h-5 w-5 text-accent" /> Trip cost estimator</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Row label="Travelers" value={travelers} set={setTravelers} step={1} min={1} />
        <Row label="Nights" value={nights} set={setNights} step={1} min={1} />
        <Row label="Flight per person (NGN)" value={flight} set={setFlight} />
        <Row label="Hotel per night (NGN)" value={hotel} set={setHotel} step={10000} />
        <div className="sm:col-span-2"><Row label="Extras per person (tours, transfers, NGN)" value={extras} set={setExtras} step={10000} /></div>
      </div>
      <div className="mt-6 flex items-end justify-between rounded-2xl bg-gradient-soft p-5">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Estimated total</div>
          <div className="mt-1 font-display text-3xl font-semibold text-primary">{formatNGN(total)}</div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          {travelers} × ({formatNGN(flight)} + {nights} × {formatNGN(hotel)} + {formatNGN(extras)})
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;
