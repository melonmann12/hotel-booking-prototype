"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy, Mail, MapPin, Printer } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingSuccessPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("delibook_booking");
    if (saved) {
      setBooking(JSON.parse(saved));
      setBookingId(`#DB-${Math.floor(100000 + Math.random() * 900000)}`);
    } else {
      router.push("/");
    }
  }, [router]);

  if (!booking) return null;

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);

  return (
    <div className="bg-surface-container-lowest text-on-background font-body-md antialiased min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-xxl px-gutter">
        <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* 1. Success Indicator */}
          <div className="flex flex-col items-center space-y-lg">
            <div className="w-24 h-24 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
              <Check className="w-12 h-12" />
            </div>
            <div className="space-y-sm">
              <h1 className="font-display text-display text-primary-container">
                Booking Successful!
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Thank you for choosing DeliBook. Your stay is now confirmed.
              </p>
            </div>
          </div>

          {/* 2. Booking Reference */}
          <div className="inline-flex items-center space-x-sm border border-dashed border-primary-container rounded-lg py-md px-lg bg-surface-bright">
            <span className="font-h3 text-h3 text-primary-container">
              Booking ID: {bookingId}
            </span>
            <button
              aria-label="Copy Booking ID"
              className="text-primary-container hover:opacity-80 transition-opacity"
              onClick={() => navigator.clipboard.writeText(bookingId)}
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          {/* 3. Confirmation Notice */}
          <div className="flex items-center space-x-sm text-on-surface-variant font-body-md text-body-md bg-surface-container-low py-sm px-md rounded-full">
            <Mail className="w-5 h-5 text-primary-container" />
            <span>
              A confirmation voucher and receipt have been sent to <strong>user@example.com</strong>
            </span>
          </div>

          {/* 4. Booking Summary Card */}
          <div className="w-full text-left bg-surface-container-lowest border-t-[4px] border-t-primary-container border-x border-b border-primary-container/10 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="w-full md:w-1/3 h-48 md:h-auto bg-surface-variant relative">
              <Image
                src={booking.image || "https://lh3.googleusercontent.com/aida/ADBb0uhgfl6fC28Wm4QCsMvtTXojezHht6aEGk7v7B3dJ6yJiBe9Z4qM0PqPJtUuzXog7N5dAn43E3EpxrdrLhmSlR2TcgLKeMAlXkEkuTTbN7LqrtYdZX5XnosI9eh5cnOJ980vHcrifSoU4on3pQ5dquc34GUr5oiAFXlXM0fKIv6uVxQn9Uuj6DadQeZbimzbhsj0ypAsY4gbkBle5gLkDSKNlF7FCMlNrzSNGsKavza2kCO0uojCG0bYng"}
                alt="Hotel Exterior"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Content Side */}
            <div className="p-lg w-full md:w-2/3 space-y-md">
              <div>
                <h2 className="font-h2 text-h2 text-on-background">{booking.hotelName}</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center mt-xs">
                  <MapPin className="w-4 h-4 mr-xs" /> Via Manzoni 31, Milan
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-lg border-t border-outline-variant/30 pt-md">
                <div>
                  <span className="font-label text-label text-on-surface-variant uppercase tracking-widest block mb-xs">
                    Check-in
                  </span>
                  <span className="font-button text-button text-on-background">
                    {checkInDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div>
                  <span className="font-label text-label text-on-surface-variant uppercase tracking-widest block mb-xs">
                    Check-out
                  </span>
                  <span className="font-button text-button text-on-background">
                    {checkOutDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div>
                  <span className="font-label text-label text-on-surface-variant uppercase tracking-widest block mb-xs">
                    Guests
                  </span>
                  <span className="font-button text-button text-on-background">2 Adults</span>
                </div>
                <div>
                  <span className="font-label text-label text-on-surface-variant uppercase tracking-widest block mb-xs">
                    Total Paid
                  </span>
                  <span className="font-h3 text-h3 text-primary-container">
                    {booking.currency}{booking.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-md sm:space-y-0 sm:space-x-lg w-full pt-xl">
            <Link
              href="/"
              className="w-full sm:w-auto text-center bg-primary-container text-on-primary font-button text-button py-md px-xl rounded-lg hover:bg-inverse-surface transition-colors"
            >
              Back to Home
            </Link>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto text-center bg-surface-container-lowest text-primary-container border border-primary-container font-button text-button py-md px-xl rounded-lg hover:bg-primary-container hover:text-on-primary transition-colors flex items-center justify-center space-x-sm"
            >
              <Printer className="w-5 h-5" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
