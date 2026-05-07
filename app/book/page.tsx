import Link from "next/link";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import BookingFormClient from "./components/BookingFormClient";
import BookingStepper from "@/components/BookingStepper";

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
        <BookingStepper currentStep={1} />

        <BookingFormClient
          hotelName={hotel.name}
          roomType={room.type}
          image={hotel.images[0]}
          pricePerNight={room.price}
          currency={hotel.currency}
          address={hotel.address}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
        />
      </main>


    </>
  );
}
