import Link from "next/link";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import BookingFormClient from "./components/BookingFormClient";

async function getBookingData(hotelId: string, roomId: string) {
  try {
    const filePath = path.join(process.cwd(), "data/hotels.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const hotels = JSON.parse(fileContents);

    const hotel = hotels.find((h: any) => h.id === hotelId);
    if (!hotel) return null;

    const room = hotel.rooms.find((r: any) => r.id === roomId);
    if (!room) return null;

    return { hotel, room };
  } catch (error) {
    console.error("Error reading hotels.json", error);
    return null;
  }
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const hotelId = typeof params.hotelId === "string" ? params.hotelId : "";
  const roomId = typeof params.roomId === "string" ? params.roomId : "";
  const checkIn = typeof params.checkIn === "string" ? params.checkIn : "";
  const checkOut = typeof params.checkOut === "string" ? params.checkOut : "";

  if (!hotelId || !roomId) {
    notFound();
  }

  const data = await getBookingData(hotelId, roomId);

  if (!data) {
    notFound();
  }

  const { hotel, room } = data;

  return (
    <>
      {/* Top Navigation */}
      <header className="bg-surface border-b border-outline-variant/20 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto">
          <Link href="/" className="font-h2 text-h2 font-bold text-on-surface tracking-tight">
            DeliBook
          </Link>
          <nav className="hidden md:flex items-center space-x-gutter">
            <Link
              href="/"
              className="font-button text-button text-secondary hover:underline decoration-1 underline-offset-4 transition-all duration-200 ease-in-out"
            >
              Home
            </Link>
            <Link
              href="#"
              className="font-button text-button text-secondary hover:underline decoration-1 underline-offset-4 transition-all duration-200 ease-in-out"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="font-button text-button text-secondary hover:underline decoration-1 underline-offset-4 transition-all duration-200 ease-in-out"
            >
              Services
            </Link>
            <Link
              href="#"
              className="font-button text-button text-secondary hover:underline decoration-1 underline-offset-4 transition-all duration-200 ease-in-out"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center space-x-md">
            {/* <span className="font-button text-button text-on-surface border-b-2 border-primary-container pb-1">
              Booking
            </span> */}
            <button className="bg-primary-container text-on-primary font-button text-button px-lg py-sm rounded-lg hover:bg-opacity-90 transition-opacity">
              Log in
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-lg py-xl">
        {/* Progress Stepper */}
        <div className="mb-xl">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-outline-variant/30 z-0"></div>
            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-button text-button mb-sm">
                1
              </div>
              <span className="font-label text-label text-primary-container uppercase">
                Guest Details
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface border border-outline-variant text-on-surface-variant flex items-center justify-center font-button text-button mb-sm">
                2
              </div>
              <span className="font-label text-label text-on-surface-variant uppercase">
                Payment
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface border border-outline-variant text-on-surface-variant flex items-center justify-center font-button text-button mb-sm">
                3
              </div>
              <span className="font-label text-label text-on-surface-variant uppercase">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <BookingFormClient
          hotelName={hotel.name}
          roomType={room.type}
          image={hotel.images[0]}
          pricePerNight={room.price}
          currency={hotel.currency}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
        />
      </main>

      {/* Footer */}
      <footer className="bg-primary-container text-on-primary mt-xxl border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-lg py-xl max-w-container-max mx-auto">
          <span className="font-h3 text-h3 text-on-primary mb-md md:mb-0">DeliBook</span>
          <p className="font-body-sm text-body-sm text-on-primary/80 text-center md:text-left mb-md md:mb-0">
            © 2024 DeliBook. All rights reserved.
          </p>
          <div className="flex items-center space-x-lg">
            <Link
              href="#"
              className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
