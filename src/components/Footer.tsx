import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-brand-cream">
      <div className="container py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-2xl font-semibold">
              Food<span className="text-brand-chili">Up</span>
            </span>
            <p className="mt-4 text-sm text-brand-cream/60">
              Lagos's best kitchens, delivered while it's still hot.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-cream/70">
              <li>
                <Link
                  to="/"
                  className="hover:text-brand-cream transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/restaurants"
                  className="hover:text-brand-cream transition-colors"
                >
                  Kitchens
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-brand-cream transition-colors"
                >
                  Your cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Account
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-cream/70">
              <li>
                <Link
                  to="/auth?mode=login"
                  className="hover:text-brand-cream transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth?mode=signup"
                  className="hover:text-brand-cream transition-colors"
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-cream/70">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-cream transition-colors"
                >
                  Terms of service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-cream transition-colors"
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-cream/10 pt-6">
          <p className="text-sm text-center text-brand-cream/50">
            © {currentYear} FoodUp.ng. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
