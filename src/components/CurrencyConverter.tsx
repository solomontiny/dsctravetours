import { useEffect, useState } from "react";
import { ArrowRightLeft, Loader2 } from "lucide-react";

const POPULAR = ["NGN", "USD", "EUR", "GBP", "AED", "ZAR", "KES", "GHS", "CAD"];

const CurrencyConverter = ({ defaultFrom = "NGN", defaultTo = "USD", defaultAmount = 100000 }: {
  defaultFrom?: string; defaultTo?: string; defaultAmount?: number;
}) => {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await res.json();
        if (cancel) return;
        if (data.result !== "success") throw new Error("Rate unavailable");
        const r = data.rates?.[to];
        if (typeof r !== "number") throw new Error("Currency not supported");
        setRate(r);
      } catch (e) {
        if (!cancel) setError(e instanceof Error ? e.message : "Failed to load rates");
      } finally {
        if (!cancel) setLoading(false);
      }
    };
    load();
    return () => { cancel = true; };
  }, [from, to]);

  const swap = () => { setFrom(to); setTo(from); };
  const result = rate ? amount * rate : null;

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft md:p-8">
      <h3 className="font-display text-xl font-semibold text-primary">Currency converter</h3>
      <p className="mt-1 text-sm text-muted-foreground">Live rates so you can budget your trip.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">From</label>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary focus:border-accent focus:outline-none"
            />
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-xl border border-border bg-background px-3 py-3 text-sm font-medium text-primary">
              {POPULAR.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button type="button" onClick={swap} aria-label="Swap currencies" className="mb-1 grid h-11 w-11 place-items-center self-end rounded-full border border-border bg-card text-primary hover:bg-accent-soft">
          <ArrowRightLeft className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">To</label>
          <div className="flex gap-2">
            <div className="flex w-full items-center rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm font-semibold text-primary">
              {loading ? <Loader2 className="h-4 w-4 animate-spin text-accent" /> : result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—"}
            </div>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-xl border border-border bg-background px-3 py-3 text-sm font-medium text-primary">
              {POPULAR.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {rate && !loading && (
        <p className="mt-4 text-xs text-muted-foreground">
          1 {from} = <span className="font-semibold text-primary">{rate.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span> {to}
        </p>
      )}
      {error && <p className="mt-4 text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default CurrencyConverter;
