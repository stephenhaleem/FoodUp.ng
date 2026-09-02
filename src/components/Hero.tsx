import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Search } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: 'Gourmet burgers.',
    description: 'Juicy patties, crispy sides, and all the toppings you love.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1800&q=85',
    titleColor: '#FDBA74',
    cta: 'Get something cheesy',
  },
  {
    id: 2,
    title: 'Pizza night sorted.',
    description: 'Wood-fired favourites and fresh ingredients, delivered while they are hot.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1800&q=85',
    titleColor: '#FDE047',
    cta: 'Find your slice',
  },
  {
    id: 3,
    title: 'Sushi worth slowing down for.',
    description: 'Beautifully prepared rolls, bowls, and premium seafood from local favourites.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1800&q=85',
    titleColor: '#86EFAC',
    cta: 'Explore fresh picks',
  },
  {
    id: 4,
    title: 'Good food, good mood.',
    description: 'Colourful bowls and nourishing plates that make every bite count.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1800&q=85',
    titleColor: '#67E8F9',
    cta: 'Browse healthy eats',
  },
];

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(search.trim() ? `/restaurants?search=${encodeURIComponent(search.trim())}` : '/restaurants');
  };

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="relative min-h-[760px] pl-0 md:min-h-[720px]">
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-[58%_20%] md:object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.18)_30%,rgba(2,6,23,0.9)_82%,rgba(2,6,23,0.98)_100%)] md:bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.7)_38%,rgba(2,6,23,0.18)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 md:from-slate-950/70" />

              <div className="container relative z-10 flex min-h-[760px] items-end px-5 pb-24 pt-20 sm:px-8 md:min-h-[720px] md:items-center md:px-12 md:py-20">
                <div className="w-full max-w-2xl">
                  <h1
                    className="mb-5 max-w-xl text-5xl font-black leading-[0.94] tracking-tight drop-shadow-lg sm:text-6xl md:mb-6 md:text-7xl"
                    style={{ color: slide.titleColor }}
                  >
                    {slide.title}
                  </h1>
                  <p className="mb-7 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg md:mb-8 md:text-xl">
                    {slide.description}
                  </p>

                  <form onSubmit={handleSearch} className="mb-5 flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md sm:flex-row md:mb-6">
                    <div className="flex flex-1 items-center gap-3 px-3">
                      <Search className="h-5 w-5 shrink-0 text-white/70" />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search restaurants or dishes"
                        className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
                        aria-label="Search restaurants or dishes"
                      />
                    </div>
                    <Button type="submit" size="lg" className="bg-white text-slate-950 hover:bg-white/90">
                      Find food
                    </Button>
                  </form>

                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <Link to="/restaurants">
                      <Button size="lg" className="border-0 bg-brand-orange px-6 text-white hover:bg-brand-orange/90">
                        {slide.cta}
                      </Button>
                    </Link>
                    {!isAuthenticated && (
                      <Link to="/auth?mode=signup" className="text-sm font-semibold text-white/80 transition-colors hover:text-white">
                        Sign up for free <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>

                  <div className="mt-7 flex items-center gap-2 text-sm text-white/70 md:mt-10">
                    <MapPin className="h-4 w-4" style={{ color: slide.titleColor }} />
                    Delivering across the city in 30–45 minutes
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 border-white/30 bg-black/20 text-white hover:bg-white hover:text-slate-950 md:left-8" />
        <CarouselNext className="right-4 border-white/30 bg-black/20 text-white hover:bg-white hover:text-slate-950 md:right-8" />
      </Carousel>
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
        Swipe to explore
      </div>
    </section>
  );
};

export default Hero;
