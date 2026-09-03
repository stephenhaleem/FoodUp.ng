import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { Search } from "lucide-react";

const dishes = [
  "Jollof rice",
  "Suya",
  "Peppered snails",
  "Egusi soup",
  "Small chops",
  "Amala",
  "Shawarma",
  "Asun",
];

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(
      search.trim()
        ? `/restaurants?search=${encodeURIComponent(search.trim())}`
        : "/restaurants",
    );
  };

  return (
    <section className="relative flex min-h-[640px] flex-col overflow-hidden bg-brand-charcoal text-brand-cream sm:min-h-[730px] md:h-screen">
      <img
        src="/heroimg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[64%_center] md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/40 to-brand-charcoal/10 md:hidden" />

      <div className="container relative z-10 grid min-h-0 flex-1 gap-8 py-16 pt-28 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10 md:py-16 md:pt-16">
        {/* Left: statement */}
        <div>
          <p className="mb-3 text-sm font-medium text-brand-gold">
            Lagos, delivered hot
          </p>
          <h1 className="max-w-lg text-3xl leading-[1.2] sm:text-5xl sm:leading-[1.08] md:text-6xl md:leading-[1.02]">
            Whatever you're craving, someone nearby is cooking it right now.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-brand-cream/75">
            From roadside suya to your favourite jollof spot — order from
            kitchens across the city and get it while it's still steaming.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-7 flex max-w-lg flex-col gap-2.5 rounded-2xl border border-brand-cream/20 bg-brand-cream/5 p-2 backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-full sm:p-2 sm:pl-5"
          >
            <div className="flex h-11 items-center gap-2 rounded-full px-3 sm:h-auto sm:px-0">
              <Search className="h-5 w-5 shrink-0 text-brand-cream/50" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search a dish, kitchen, or area"
                className="h-full w-full bg-transparent text-sm text-brand-cream outline-none placeholder:text-brand-cream/40"
                aria-label="Search restaurants or dishes"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-brand-chili px-6 text-brand-cream hover:bg-brand-chili/90 sm:w-auto"
            >
              Find food
            </Button>
          </form>

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link to="/restaurants">
              <Button
                variant="outline"
                className="rounded-full border-brand-cream/30 bg-transparent text-brand-cream hover:bg-brand-cream hover:text-brand-charcoal"
              >
                Browse all kitchens
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link
                to="/auth?mode=signup"
                className="text-sm font-medium text-brand-gold hover:text-brand-gold/80"
              >
                First order free delivery →
              </Link>
            )}
          </div>
        </div>

        <div className="hidden md:block" aria-hidden="true" />
      </div>

      {/* Signage strip */}
      <div className="relative shrink-0 border-t border-brand-cream/10 bg-brand-charcoal/80 py-3">
        <div className="overflow-hidden">
          <div className="flex w-max animate-drift gap-8 whitespace-nowrap text-sm text-brand-cream/60">
            {[...dishes, ...dishes].map((dish, i) => (
              <span key={i} className="flex items-center gap-8">
                {dish} <span className="text-brand-gold">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
