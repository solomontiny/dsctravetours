import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import CurrencyConverter from "@/components/CurrencyConverter";
import WeatherWidget from "@/components/WeatherWidget";
import TripCountdown from "@/components/TripCountdown";
import CostEstimator from "@/components/CostEstimator";

const Tools = () => (
  <>
    <Seo title="Travel Tools" description="Free travel tools: live currency converter, destination weather, trip countdown and travel cost estimator." />
    <PageHero eyebrow="Travel tools" title="Plan smarter, travel further." description="Live currency rates, real-time weather, a trip countdown and a quick cost estimator — all in one place." />
    <section className="py-16 md:py-24">
      <div className="container-wide grid gap-6 md:grid-cols-2">
        <CurrencyConverter />
        <WeatherWidget />
        <TripCountdown />
        <CostEstimator />
      </div>
    </section>
  </>
);

export default Tools;
