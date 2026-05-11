import { useEffect, useState } from "react";
import { Cloud, Loader2 } from "lucide-react";

const CITIES: { name: string; lat: number; lon: number }[] = [
  { name: "Lagos", lat: 6.45, lon: 3.4 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Paris", lat: 48.85, lon: 2.35 },
  { name: "Santorini", lat: 36.39, lon: 25.46 },
  { name: "Maldives", lat: 4.17, lon: 73.51 },
  { name: "Cape Town", lat: -33.92, lon: 18.42 },
  { name: "Zanzibar", lat: -6.16, lon: 39.2 },
];

const WeatherWidget = () => {
  const [city, setCity] = useState(CITIES[1]);
  const [data, setData] = useState<{ t: number; code: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      try {
        const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code`);
        const j = await r.json();
        if (!cancel) setData({ t: j.current?.temperature_2m, code: j.current?.weather_code });
      } finally { if (!cancel) setLoading(false); }
    })();
    return () => { cancel = true; };
  }, [city]);

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft md:p-8">
      <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-primary"><Cloud className="h-5 w-5 text-accent" /> Destination weather</h3>
      <select
        value={city.name}
        onChange={(e) => setCity(CITIES.find((c) => c.name === e.target.value) ?? CITIES[0])}
        className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-primary"
      >
        {CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
      </select>
      <div className="mt-6 grid place-items-center rounded-2xl bg-gradient-soft p-8">
        {loading || !data ? <Loader2 className="h-6 w-6 animate-spin text-accent" /> : (
          <div className="text-center">
            <div className="font-display text-5xl font-semibold text-primary">{Math.round(data.t)}°C</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Right now in {city.name}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
