import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { icons, Globe, MapPin, Grid, Star, PersonStanding, Check } from "lucide-react";

async function getHotel(id: string) {
  try {
    const filePath = path.join(process.cwd(), "data/hotels.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const hotels = JSON.parse(fileContents);
    return hotels.find((h: any) => h.id === id);
  } catch (error) {
    console.error("Error reading hotels.json", error);
    return null;
  }
}

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = icons[name as keyof typeof icons];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hotel = await getHotel(id);

  if (!hotel) {
    notFound();
  }

  return (
    <>
      {/* TopNavBar */}
      <header className="bg-surface/95 backdrop-blur-md dark:bg-surface-container-highest/95 border-b border-outline-variant/30 dark:border-outline/10 shadow-sm dark:shadow-none sticky w-full top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-page h-20 max-w-container-max mx-auto">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-primary dark:text-primary-fixed"
          >
            DeliBook
          </Link>
          <nav className="hidden md:flex gap-lg items-center">
            <Link
              href="/"
              className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-secondary dark:hover:text-secondary-fixed transition-all duration-300 scale-95 active:scale-90"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-secondary dark:hover:text-secondary-fixed transition-all duration-300 scale-95 active:scale-90"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-secondary dark:hover:text-secondary-fixed transition-all duration-300 scale-95 active:scale-90"
            >
              Services
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-secondary dark:hover:text-secondary-fixed transition-all duration-300 scale-95 active:scale-90"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-md text-primary dark:text-primary-fixed">
            <button className="flex items-center justify-center scale-95 active:scale-90 transition-transform hover:text-secondary dark:hover:text-secondary-fixed duration-300">
              <Globe className="w-6 h-6" />
            </button>
            <button className="font-button text-button scale-95 active:scale-90 transition-transform hover:text-secondary dark:hover:text-secondary-fixed duration-300">
              Log in
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="max-w-container-max mx-auto px-margin-page py-lg">
          <nav
            aria-label="Breadcrumb"
            className="flex text-on-surface-variant font-label text-label space-x-sm"
          >
            <Link href="/" className="hover:underline text-primary">
              Home
            </Link>
            <span>&gt;</span>
            <span className="hover:underline text-primary cursor-pointer">
              {hotel.country}
            </span>
            <span>&gt;</span>
            <Link href="/search" className="hover:underline text-primary">
              {hotel.city}
            </Link>
            <span>&gt;</span>
            <span className="text-primary font-bold">{hotel.name}</span>
          </nav>
        </div>

        {/* Image Gallery */}
        <div className="max-w-container-max mx-auto px-margin-page mb-xl">
          <div className="flex flex-col md:flex-row gap-base">
            <div className="w-full md:w-2/3 h-[400px] md:h-[600px] rounded-l-lg overflow-hidden relative">
              <Image
                src={hotel.images[0]}
                alt={`${hotel.name} main view`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="w-full md:w-1/3 grid grid-cols-2 md:grid-cols-1 md:grid-rows-4 gap-base h-[400px] md:h-[600px]">
              <div className="w-full h-full rounded-tr-lg overflow-hidden bg-surface-variant relative">
                <Image
                  src={hotel.images[1]}
                  alt={`${hotel.name} view 2`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full h-full overflow-hidden bg-surface-variant relative">
                <Image
                  src={hotel.images[2]}
                  alt={`${hotel.name} view 3`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full h-full overflow-hidden bg-surface-variant relative">
                <Image
                  src={hotel.images[3] || hotel.images[0]}
                  alt={`${hotel.name} view 4`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full h-full rounded-br-lg md:rounded-r-lg md:rounded-br-none overflow-hidden bg-surface-variant relative">
                <Image
                  src={hotel.images[0]}
                  alt={`${hotel.name} view 5`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/40 flex items-center justify-center cursor-pointer hover:bg-primary/50 transition-colors">
                  <span className="text-on-primary font-button text-button flex items-center gap-xs">
                    <Grid className="w-5 h-5" /> See all photos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="max-w-container-max mx-auto px-margin-page mb-xxl flex flex-col md:flex-row justify-between items-start border-b border-outline/20 pb-xl">
          <div className="w-full md:w-2/3">
            <div className="flex items-center gap-xs mb-sm text-primary">
              {[...Array(hotel.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary" />
              ))}
            </div>
            <h1 className="font-h1 text-h1 text-primary mb-md">{hotel.name}</h1>
            <div className="flex items-center gap-xs text-on-surface-variant font-body-md text-body-md">
              <MapPin className="w-5 h-5" />
              <a className="underline hover:text-primary transition-colors" href="#">
                {hotel.address}
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 text-left md:text-right mt-lg md:mt-0">
            <div className="font-body-md text-body-md text-on-surface-variant mb-xs">
              Starting from
            </div>
            <div className="font-h2 text-h2 text-primary">
              {hotel.currency}
              {hotel.startingPrice}{" "}
              <span className="font-body-sm text-body-sm font-normal">/night</span>
            </div>
            <a
              href="#rooms-section"
              className="inline-block mt-md bg-primary text-on-primary font-button text-button py-md px-xl rounded-lg w-full md:w-auto hover:bg-primary/90 transition-colors text-center"
            >
              Select Room
            </a>
          </div>
        </div>

        {/* Details Grid */}
        <div className="max-w-container-max mx-auto px-margin-page mb-xxl grid grid-cols-1 md:grid-cols-3 gap-xl">
          {/* Description & Amenities */}
          <div className="md:col-span-2">
            <h2 className="font-h2 text-h2 text-primary mb-md">About the Hotel</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">
              {hotel.description}
            </p>
            <h3 className="font-h3 text-h3 text-primary mb-md">Popular Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md font-body-md text-body-md text-on-surface-variant">
              {hotel.amenities.map((amenity: any, idx: number) => (
                <div key={idx} className="flex items-center gap-sm">
                  <DynamicIcon name={amenity.icon} className="w-5 h-5 text-primary" />{" "}
                  {amenity.label}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="border border-primary rounded-lg p-lg">
              <div className="flex items-center gap-md mb-lg">
                <div className="bg-primary text-on-primary font-h3 text-h3 py-sm px-md rounded-lg">
                  {hotel.rating.score.toFixed(1)}
                </div>
                <div>
                  <div className="font-h3 text-h3 text-primary">{hotel.rating.label}</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Based on {hotel.rating.reviewCount.toLocaleString()} reviews
                  </div>
                </div>
              </div>
              <div className="space-y-lg border-t border-outline/20 pt-lg">
                {hotel.featuredReviews.map((review: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-xs">
                      <span className="font-button text-button text-primary">
                        {review.userName}
                      </span>
                      <span className="font-label text-label text-on-surface-variant">
                        {review.date}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
                <a
                  className="inline-block mt-sm font-button text-button text-primary hover:underline"
                  href="#"
                >
                  Read all reviews
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Room Selection Table */}
        <div id="rooms-section" className="max-w-container-max mx-auto px-margin-page mb-xxl">
          <h2 className="font-h2 text-h2 text-primary mb-lg">Available Rooms</h2>
          <div className="border border-primary rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container border-b border-primary">
                <tr>
                  <th className="p-lg font-button text-button text-primary">Room Type</th>
                  <th className="p-lg font-button text-button text-primary hidden md:table-cell">
                    Capacity
                  </th>
                  <th className="p-lg font-button text-button text-primary hidden lg:table-cell">
                    Options
                  </th>
                  <th className="p-lg font-button text-button text-primary text-right">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/20">
                {hotel.rooms.map((room: any) => (
                  <tr
                    key={room.id}
                    className="hover:bg-surface-container-low transition-colors"
                  >
                    <td className="p-lg">
                      <div className="font-h3 text-h3 text-primary mb-xs">
                        {room.type}
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        {room.bedInfo}
                      </div>
                    </td>
                    <td className="p-lg hidden md:table-cell">
                      <div className="flex items-center gap-xs text-on-surface-variant">
                        {[...Array(room.capacity)].map((_, i) => (
                          <PersonStanding key={i} className="w-5 h-5" />
                        ))}
                      </div>
                    </td>
                    <td className="p-lg hidden lg:table-cell">
                      <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-xs">
                        {room.options.map((option: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-xs">
                            <Check className="w-4 h-4 text-primary" /> {option}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-lg text-right">
                      <div className="font-h3 text-h3 text-primary mb-sm">
                        {hotel.currency}
                        {room.price}
                      </div>
                      <Link
                        href={`/book?hotelId=${hotel.id}&roomId=${room.id}`}
                        className="inline-block bg-primary text-on-primary font-button text-button py-sm px-lg rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto text-center"
                      >
                        Book Now
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-tertiary-container text-primary dark:text-tertiary-fixed font-body-md text-body-md font-label-sm text-label-sm w-full border-t border-outline-variant/20 dark:border-outline/20">
        <div className="flex flex-col md:flex-row justify-between items-center py-xl px-margin-page max-w-container-max mx-auto">
          <div className="text-2xl font-bold text-primary dark:text-tertiary-fixed mb-md md:mb-0">
            DeliBook
          </div>
          <nav className="flex flex-wrap justify-center gap-md mb-md md:mb-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Support"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors opacity-80 hover:opacity-100"
                >
                  {item}
                </Link>
              )
            )}
          </nav>
          <div className="text-on-surface-variant dark:text-on-tertiary-container opacity-80">
            © 2024 DeliBook. All rights reserved. Built for structured elegance.
          </div>
        </div>
      </footer>
    </>
  );
}
