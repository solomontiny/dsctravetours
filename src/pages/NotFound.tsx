import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Seo
        title="Page not found"
        description="The page you're looking for doesn't exist. Explore our travel packages and services instead."
      />
      <section className="container-tight flex min-h-[70vh] flex-col items-center justify-center py-16 text-center md:py-24">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-soft text-primary md:h-20 md:w-20">
          <Compass className="h-7 w-7 md:h-9 md:w-9" />
        </div>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">404 — off the map</p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight text-primary sm:text-5xl md:text-6xl">
          This page took a detour.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          We couldn't find <span className="font-medium text-primary break-all">{location.pathname}</span>. Let's get you back on a more scenic route.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back home</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-7">
            <Link to="/packages">Browse packages</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default NotFound;
