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
                Thông tin khách
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface border border-outline-variant text-on-surface-variant flex items-center justify-center font-button text-button mb-sm">
                2
              </div>
              <span className="font-label text-label text-on-surface-variant uppercase">
                Thanh toán
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface border border-outline-variant text-on-surface-variant flex items-center justify-center font-button text-button mb-sm">
                3
              </div>
              <span className="font-label text-label text-on-surface-variant uppercase">
                Xác nhận
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


    </>
  );
}
