import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#", isActive: true },
  { name: "About Us", href: "#", isActive: false },
  { name: "Services", href: "#", isActive: false },
  { name: "Blog", href: "#", isActive: false },
];

const properties = [
  {
    id: 1,
    title: "Villa Serenity",
    location: "Santorini, Greece",
    rating: "4.9",
    guests: "4 GUESTS",
    beds: "2 BEDS",
    price: "$350",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhgfl6fC28Wm4QCsMvtTXojezHht6aEGk7v7B3dJ6yJiBe9Z4qM0PqPJtUuzXog7N5dAn43E3EpxrdrLhmSlR2TcgLKeMAlXkEkuTTbN7LqrtYdZX5XnosI9eh5cnOJ980vHcrifSoU4on3pQ5dquc34GUr5oiAFXlXM0fKIv6uVxQn9Uuj6DadQeZbimzbhsj0ypAsY4gbkBle5gLkDSKNlF7FCMlNrzSNGsKavza2kCO0uojCG0bYng",
  },
  {
    id: 2,
    title: "Azure Coast Resort",
    location: "Amalfi Coast, Italy",
    rating: "4.8",
    guests: "2 GUESTS",
    beds: "1 BED",
    price: "$420",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhgfl6fC28Wm4QCsMvtTXojezHht6aEGk7v7B3dJ6yJiBe9Z4qM0PqPJtUuzXog7N5dAn43E3EpxrdrLhmSlR2TcgLKeMAlXkEkuTTbN7LqrtYdZX5XnosI9eh5cnOJ980vHcrifSoU4on3pQ5dquc34GUr5oiAFXlXM0fKIv6uVxQn9Uuj6DadQeZbimzbhsj0ypAsY4gbkBle5gLkDSKNlF7FCMlNrzSNGsKavza2kCO0uojCG0bYng",
  },
  {
    id: 3,
    title: "Urban Loft",
    location: "New York City, USA",
    rating: "4.7",
    guests: "2 GUESTS",
    beds: "1 BED",
    price: "$280",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhgfl6fC28Wm4QCsMvtTXojezHht6aEGk7v7B3dJ6yJiBe9Z4qM0PqPJtUuzXog7N5dAn43E3EpxrdrLhmSlR2TcgLKeMAlXkEkuTTbN7LqrtYdZX5XnosI9eh5cnOJ980vHcrifSoU4on3pQ5dquc34GUr5oiAFXlXM0fKIv6uVxQn9Uuj6DadQeZbimzbhsj0ypAsY4gbkBle5gLkDSKNlF7FCMlNrzSNGsKavza2kCO0uojCG0bYng",
  },
  {
    id: 4,
    title: "Coastal Villa",
    location: "Malibu, USA",
    rating: "4.9",
    guests: "6 GUESTS",
    beds: "3 BEDS",
    price: "$650",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhgfl6fC28Wm4QCsMvtTXojezHht6aEGk7v7B3dJ6yJiBe9Z4qM0PqPJtUuzXog7N5dAn43E3EpxrdrLhmSlR2TcgLKeMAlXkEkuTTbN7LqrtYdZX5XnosI9eh5cnOJ980vHcrifSoU4on3pQ5dquc34GUr5oiAFXlXM0fKIv6uVxQn9Uuj6DadQeZbimzbhsj0ypAsY4gbkBle5gLkDSKNlF7FCMlNrzSNGsKavza2kCO0uojCG0bYng",
  },
];

const categories = ["All", "Apartment", "Resort", "Lodge", "Hotel"];

export default function Home() {
  return (
    <>
      <header className="bg-surface/95 backdrop-blur-md dark:bg-surface-container-highest/95 w-full top-0 z-50 border-b border-outline-variant/30 dark:border-outline/10 shadow-sm dark:shadow-none sticky">
        <div className="flex justify-between items-center w-full px-gutter h-20 max-w-container-max mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-primary dark:text-primary-fixed">
              DeliBook
            </span>
          </div>
          <nav className="hidden md:flex gap-gutter items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-button text-button transition-all duration-300 scale-95 active:scale-90 ${
                  link.isActive
                    ? "text-primary dark:text-secondary-fixed border-b-2 border-secondary dark:border-secondary-fixed pb-1"
                    : "text-on-surface-variant dark:text-outline-variant font-medium hover:text-secondary dark:hover:text-secondary-fixed"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-md">
            <button className="hidden md:flex items-center justify-center bg-surface-container-lowest text-primary border border-primary px-lg py-sm rounded-lg font-button text-button hover:bg-primary hover:text-on-primary transition-colors">
              Log in
            </button>
            <button
              aria-label="Language"
              className="text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined">language</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        <section className="relative w-full h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNEuk0-OfdJCZQcq0Xa8cuVX1xpJ-OXjo7jFe4hnLnxf-ZELJ9jMW9dW9a9Y32yh0bgGwoYZiHhZluT49C18S5acCmR3MEUs3b5Rl5xiSfr_HhXQomK-XFb_WcOOW8F8jEYKgwX1PJyZ2gL5seFOdbWiuQqbnDjwj5Qn-sxc5M2xZL6mM9GbQRwibL0vJK8okoAN9qKR57H-CFx1uA0ebBA9nMbGVcjQ-qhzVhHvUF7rdsO5W7cs6dzX_FwRy7lzEtRyT3eJ0GdpvL"
              alt="Luxury tropical resort"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/20"></div>
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter flex flex-col items-center">
            <div className="bg-surface-container-lowest rounded-full p-sm flex flex-col md:flex-row items-center w-full max-w-4xl shadow-md border border-primary/10">
              <div className="flex-1 w-full md:w-auto px-lg py-sm border-b md:border-b-0 md:border-r border-outline-variant/30">
                <label className="block font-label text-label text-on-surface-variant mb-xs">
                  Where to
                </label>
                <input
                  className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-primary placeholder-on-surface-variant/50 outline-none"
                  placeholder="Search destinations"
                  type="text"
                />
              </div>
              <div className="flex-1 w-full md:w-auto px-lg py-sm border-b md:border-b-0 md:border-r border-outline-variant/30">
                <label className="block font-label text-label text-on-surface-variant mb-xs">
                  Date
                </label>
                <input
                  className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-primary placeholder-on-surface-variant/50 outline-none"
                  placeholder="Add dates"
                  type="text"
                />
              </div>
              <div className="flex-1 w-full md:w-auto px-lg py-sm flex items-center justify-between">
                <div>
                  <label className="block font-label text-label text-on-surface-variant mb-xs">
                    Who
                  </label>
                  <input
                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-primary placeholder-on-surface-variant/50 outline-none"
                    placeholder="Add guests"
                    type="text"
                  />
                </div>
                <Link href="/search" className="bg-[#0F172A] text-on-primary w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0">
                  <span className="material-symbols-outlined">search</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-container-max mx-auto px-gutter py-xxl flex flex-col gap-xl">
          <div className="flex flex-col gap-md">
            <h1 className="font-h1 text-h1 text-primary">
              Where Comfort Meets Convenience
            </h1>
            <div className="flex flex-wrap gap-sm">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-md py-sm rounded-full font-button text-button transition-colors ${
                    index === 0
                      ? "bg-[#0F172A] text-on-primary"
                      : "bg-surface-container-lowest text-primary border border-primary hover:bg-[#0F172A] hover:text-on-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {properties.map((property) => (
              <article
                key={property.id}
                className="bg-surface-container-lowest border border-[#0F172A] rounded-lg overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="w-full h-48 bg-surface-container relative">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <button className="absolute top-sm right-sm text-surface-container-lowest hover:text-error transition-colors p-sm bg-primary/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-lg flex flex-col gap-sm flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-h3 text-h3 text-primary truncate">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-xs text-primary">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-button text-button">
                        {property.rating}
                      </span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {property.location}
                  </p>
                  <div className="flex flex-wrap gap-xs mt-auto pt-sm">
                    <span className="border border-[#0F172A] text-primary px-sm py-xs rounded text-[10px] font-semibold tracking-wider">
                      {property.guests}
                    </span>
                    <span className="border border-[#0F172A] text-primary px-sm py-xs rounded text-[10px] font-semibold tracking-wider">
                      {property.beds}
                    </span>
                  </div>
                  <div className="mt-sm pt-sm border-t border-outline-variant/20 flex justify-between items-end">
                    <div>
                      <span className="font-h3 text-h3 text-primary">
                        {property.price}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        /night
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-lowest dark:bg-tertiary-container w-full border-t border-outline-variant/20 dark:border-outline/20 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center py-xl px-gutter max-w-container-max mx-auto gap-md">
          <div className="text-2xl font-bold text-primary dark:text-tertiary-fixed">
            DeliBook
          </div>
          <nav className="flex flex-wrap justify-center gap-lg">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Support"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-on-surface-variant dark:text-on-tertiary-container font-body-md text-body-md hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors opacity-80 hover:opacity-100"
                >
                  {item}
                </Link>
              )
            )}
          </nav>
          <div className="font-label text-label text-on-surface-variant dark:text-on-tertiary-container text-center md:text-right">
            © 2024 DeliBook. All rights reserved. Built for structured elegance.
          </div>
        </div>
      </footer>
    </>
  );
}
