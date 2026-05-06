import Link from "next/link";
import { Globe } from "lucide-react";
import FilterSidebar from "./components/FilterSidebar";
import SortHeader from "./components/SortHeader";
import HotelCard from "./components/HotelCard";

const navLinks = [
  { name: "Home", href: "/", isActive: false },
  { name: "About Us", href: "#", isActive: false },
  { name: "Services", href: "#", isActive: true },
  { name: "Blog", href: "#", isActive: false },
];

import hotelsData from "../../data/hotels.json";

export default function SearchPage() {
  return (
    <>
      <header className="bg-surface/95 backdrop-blur-md dark:bg-surface-container-highest/95 border-b border-outline-variant/30 dark:border-outline/10 shadow-sm dark:shadow-none w-full sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-lg h-20 max-w-container-max mx-auto">
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary dark:text-primary-fixed">
            DeliBook
          </Link>
          <nav className="hidden md:flex gap-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-button transition-all duration-300 ${
                  link.isActive
                    ? "text-primary dark:text-secondary-fixed border-b-2 border-secondary dark:border-secondary-fixed pb-1"
                    : "text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-md">
            <button className="scale-95 active:scale-90 transition-transform">
              <Globe className="w-6 h-6 text-primary" />
            </button>
            <button className="bg-primary text-on-primary font-button px-md py-sm rounded-DEFAULT scale-95 active:scale-90 transition-transform">
              Log in
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-lg py-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <FilterSidebar />
        
        <section className="col-span-1 md:col-span-9 space-y-lg">
          <SortHeader />
          
          <div className="space-y-md">
            {hotelsData.map((hotel: any) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                title={hotel.name}
                location={hotel.address}
                rating={hotel.rating.score.toFixed(1)}
                ratingLabel={hotel.rating.label}
                reviews={`${hotel.rating.reviewCount.toLocaleString()} reviews`}
                badges={hotel.amenities.slice(0, 2).map((a: any) => a.label)}
                price={`${hotel.currency}${hotel.startingPrice}`}
                image={hotel.images[0]}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-lowest dark:bg-tertiary-container border-t border-outline-variant/20 dark:border-outline/20 mt-xxl">
        <div className="flex flex-col md:flex-row justify-between items-center py-lg px-lg max-w-container-max mx-auto w-full">
          <div className="text-2xl font-bold text-primary dark:text-tertiary-fixed mb-md md:mb-0">
            DeliBook
          </div>
          <div className="flex flex-wrap gap-md justify-center mb-md md:mb-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Support"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-on-surface-variant dark:text-on-tertiary-container font-body-md hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors opacity-80 hover:opacity-100"
                >
                  {item}
                </Link>
              )
            )}
          </div>
          <div className="text-primary dark:text-tertiary-fixed font-label text-center md:text-right opacity-80">
            © 2024 DeliBook. All rights reserved. Built for structured elegance.
          </div>
        </div>
      </footer>
    </>
  );
}
