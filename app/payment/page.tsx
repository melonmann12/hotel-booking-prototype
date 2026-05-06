"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, X, CreditCard, Lock } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("delibook_booking");
    if (saved) {
      setBooking(JSON.parse(saved));
    } else {
      router.push("/");
    }
  }, [router]);

  // Basic formatting functions
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (value.length >= 3) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    setExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4);
    setCvv(value);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      if (booking) {
        const completedBooking = { ...booking, status: "Paid" };
        localStorage.setItem("delibook_booking", JSON.stringify(completedBooking));
      }
      router.push("/booking-success");
    }, 2000);
  };

  if (!booking) return null; // Avoid hydration mismatch or flashing content

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen pb-xxl selection:bg-primary-container selection:text-on-primary">


      <main className="max-w-container-max mx-auto px-lg md:px-xl py-xl">
        {/* Stepper */}
        <div className="w-full flex justify-center mb-xl">
          <ol className="flex items-center w-full max-w-2xl text-center font-button text-button">
            <li className="flex items-center text-on-surface-variant after:content-[''] after:w-full after:h-px after:border-b after:border-outline-variant after:mx-4">
              <span className="flex items-center justify-center w-8 h-8 bg-surface-container rounded-full shrink-0 mr-2">
                <Check className="w-4 h-4 text-[#0F172A]" />
              </span>
              <span className="hidden sm:inline">1. Guest Details</span>
            </li>
            <li className="flex items-center text-[#0F172A] font-bold after:content-[''] after:w-full after:h-px after:border-b after:border-outline-variant after:mx-4">
              <span className="flex items-center justify-center w-8 h-8 bg-[#0F172A] text-on-primary rounded-full shrink-0 mr-2">
                2
              </span>
              <span className="hidden sm:inline">2. Payment</span>
            </li>
            <li className="flex items-center text-on-surface-variant">
              <span className="flex items-center justify-center w-8 h-8 bg-surface-container rounded-full shrink-0 mr-2">
                3
              </span>
              <span className="hidden sm:inline">3. Confirmation</span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Left Column: Payment Methods (60%) */}
          <div className="w-full lg:w-3/5 space-y-lg">
            <h1 className="font-h1 text-h1 text-[#0F172A] mb-lg">Select Payment Method</h1>

            {/* Option 1: Credit/Debit Card */}
            <div
              className={`bg-surface-container-lowest rounded-lg p-lg relative border transition-all cursor-pointer ${
                paymentMethod === "card"
                  ? "border-[#0F172A] ring-1 ring-[#0F172A]"
                  : "border-outline-variant opacity-70 hover:opacity-100"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="flex items-start mb-lg">
                <div className="flex items-center h-5">
                  <input
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-4 h-4 text-[#0F172A] bg-surface border-[#0F172A] focus:ring-[#0F172A] focus:ring-2 cursor-pointer"
                    id="card"
                    name="payment_method"
                    type="radio"
                    value="card"
                  />
                </div>
                <div className="ml-3 flex-1 flex justify-between items-center">
                  <label className="font-h3 text-h3 text-[#0F172A] cursor-pointer" htmlFor="card">
                    Credit/Debit Card
                  </label>
                  <div className="flex gap-2">
                    <CreditCard className="w-6 h-6 text-[#0F172A]" />
                  </div>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-md mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex flex-col gap-xs">
                    <label className="font-label text-label text-[#0F172A]">
                      Cardholder Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 bg-surface-container-lowest border border-[#0F172A] rounded text-body-md px-4 focus:ring-0 focus:border-2 focus:border-[#0F172A] outline-none"
                      placeholder="Name on card"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label text-label text-[#0F172A]">
                      Card Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                        <CreditCard className="w-5 h-5 text-outline" />
                      </span>
                      <input
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full h-12 bg-surface-container-lowest border border-[#0F172A] rounded text-body-md pl-12 pr-4 focus:ring-0 focus:border-2 focus:border-[#0F172A] outline-none"
                        placeholder="0000 0000 0000 0000"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex gap-md">
                    <div className="flex-1 flex flex-col gap-xs">
                      <label className="font-label text-label text-[#0F172A]">
                        Expiry Date
                      </label>
                      <input
                        value={expiry}
                        onChange={handleExpiryChange}
                        className="w-full h-12 bg-surface-container-lowest border border-[#0F172A] rounded text-body-md px-4 focus:ring-0 focus:border-2 focus:border-[#0F172A] outline-none"
                        placeholder="MM/YY"
                        type="text"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-xs">
                      <label className="font-label text-label text-[#0F172A]">CVV</label>
                      <input
                        value={cvv}
                        onChange={handleCvvChange}
                        className="w-full h-12 bg-surface-container-lowest border border-[#0F172A] rounded text-body-md px-4 focus:ring-0 focus:border-2 focus:border-[#0F172A] outline-none"
                        placeholder="123"
                        type="text"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Option 2: VietQR */}
            <div
              className={`bg-surface-container-lowest rounded-lg p-lg border transition-all cursor-pointer ${
                paymentMethod === "qr"
                  ? "border-[#0F172A] ring-1 ring-[#0F172A]"
                  : "border-outline-variant opacity-70 hover:opacity-100"
              }`}
              onClick={() => setPaymentMethod("qr")}
            >
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    checked={paymentMethod === "qr"}
                    onChange={() => setPaymentMethod("qr")}
                    className="w-4 h-4 text-[#0F172A] bg-surface border-[#0F172A] focus:ring-[#0F172A] focus:ring-2 cursor-pointer"
                    id="qr"
                    name="payment_method"
                    type="radio"
                    value="qr"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <label className="font-h3 text-h3 text-[#0F172A] block cursor-pointer" htmlFor="qr">
                    VietQR / Banking App
                  </label>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Scan QR code using your local banking app.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <button
              onClick={handleCompletePayment}
              disabled={isProcessing}
              className="w-full h-14 bg-[#0F172A] text-on-primary rounded-lg font-button text-button flex items-center justify-center gap-sm mt-lg hover:bg-opacity-90 transition-all disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Lock className="w-5 h-5" />
              )}
              {isProcessing
                ? "Processing Payment..."
                : `Complete Payment - ${booking.currency}${booking.total.toFixed(2)}`}
            </button>
          </div>

          {/* Right Column: Order Summary (40%) */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-24 bg-surface-container-lowest border border-[#0F172A] rounded-lg overflow-hidden flex flex-col">
              <div className="h-48 w-full relative">
                <Image
                  src={booking.image || "https://lh3.googleusercontent.com/aida/ADBb0uhgfl6fC28Wm4QCsMvtTXojezHht6aEGk7v7B3dJ6yJiBe9Z4qM0PqPJtUuzXog7N5dAn43E3EpxrdrLhmSlR2TcgLKeMAlXkEkuTTbN7LqrtYdZX5XnosI9eh5cnOJ980vHcrifSoU4on3pQ5dquc34GUr5oiAFXlXM0fKIv6uVxQn9Uuj6DadQeZbimzbhsj0ypAsY4gbkBle5gLkDSKNlF7FCMlNrzSNGsKavza2kCO0uojCG0bYng"}
                  alt="Room preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-lg flex flex-col gap-md">
                <div className="border-b border-outline-variant/30 pb-md">
                  <h2 className="font-h2 text-h2 text-[#0F172A]">{booking.hotelName}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {booking.roomType}
                  </p>
                </div>

                <div className="flex justify-between items-center border-b border-outline-variant/30 pb-md font-body-sm text-body-sm">
                  <div className="flex flex-col">
                    <span className="font-label text-label text-on-surface-variant uppercase mb-1">
                      Check-in
                    </span>
                    <span className="text-[#0F172A] font-bold">
                      {checkInDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="text-on-surface-variant">14:00</span>
                  </div>
                  <div className="h-8 w-px bg-outline-variant/30"></div>
                  <div className="flex flex-col text-right">
                    <span className="font-label text-label text-on-surface-variant uppercase mb-1">
                      Check-out
                    </span>
                    <span className="text-[#0F172A] font-bold">
                      {checkOutDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="text-on-surface-variant">12:00</span>
                  </div>
                </div>

                <div className="flex flex-col gap-sm py-md border-b border-outline-variant/30 font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>
                      {booking.nights} Nights x {booking.currency}
                      {(booking.roomTotal / booking.nights).toFixed(2)}
                    </span>
                    <span>
                      {booking.currency}
                      {booking.roomTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>
                      {booking.currency}
                      {booking.taxes.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-sm">
                  <span className="font-h3 text-h3 text-[#0F172A]">Total</span>
                  <span className="font-h1 text-h1 text-[#0F172A] tracking-tight">
                    {booking.currency}
                    {booking.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
