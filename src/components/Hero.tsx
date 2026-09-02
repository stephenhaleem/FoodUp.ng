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
    <section className="relative flex h-[730px] flex-col overflow-hidden bg-brand-charcoal text-brand-cream md:h-screen">
      <img
        src="/heroimg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[64%_center] md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/35 to-transparent md:hidden" />

      <div className="container relative z-10 grid min-h-0 flex-1 gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-16">
        {/* Left: statement */}
        <div>
          <p className="mb-4 text-sm font-medium text-brand-gold">
            Lagos, delivered hot
          </p>
          <h1 className="max-w-lg text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
            Whatever you're craving, someone nearby is cooking it right now.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-brand-cream/75">
            From roadside suya to your favourite jollof spot — order from
            kitchens across the city and get it while it's still steaming.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-lg flex-col gap-2 rounded-2xl border border-brand-cream/20 bg-brand-cream/5 p-2 backdrop-blur-sm sm:flex-row sm:rounded-full sm:pl-5"
          >
            <Search className="my-auto h-5 w-5 shrink-0 text-brand-cream/50" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search a dish, kitchen, or area"
              className="h-11 w-full bg-transparent px-2 text-sm text-brand-cream outline-none placeholder:text-brand-cream/40"
              aria-label="Search restaurants or dishes"
            />
            <Button
              type="submit"
              className="rounded-full bg-brand-chili px-6 text-brand-cream hover:bg-brand-chili/90"
            >
              Find food
            </Button>
          </form>

          <div className="mt-6 flex items-center gap-4">
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
