"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Calendar, Clock, User, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/format";

interface BookingFormClientProps {
  hotelName: string;
  roomType: string;
  image: string;
  pricePerNight: number;
  currency: string;
  address: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export default function BookingFormClient({
  hotelName,
  roomType,
  image,
  pricePerNight,
  currency,
  address,
  initialCheckIn,
  initialCheckOut,
}: BookingFormClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const [checkIn, setCheckIn] = useState(initialCheckIn || "2024-10-15");
  const [checkOut, setCheckOut] = useState(initialCheckOut || "2024-10-17");

  // Dynamic calculations
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const nights = isNaN(diffDays) || diffDays < 1 ? 1 : diffDays;

  const roomTotal = pricePerNight * nights;
  const taxes = roomTotal * 0.15; // 15% taxes & fees
  const total = roomTotal + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to localStorage
    const bookingDetails = {
      hotelName,
      roomType,
      image,
      address,
      email,
      checkIn,
      checkOut,
      nights,
      roomTotal,
      taxes,
      total,
      currency
    };
    localStorage.setItem("delibook_booking", JSON.stringify(bookingDetails));

    // Simulate API call
    setTimeout(() => {
      router.push("/payment");
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-xl">
      {/* Left Column: Form */}
      <div className="w-full lg:w-3/5">
        <h1 className="font-h1 text-h1 text-on-surface mb-lg">Hoàn tất đặt phòng</h1>
        <form onSubmit={handleSubmit} className="space-y-gutter">
          
          {/* Guest Information Section */}
          <div className="space-y-gutter">
            <h2 className="font-h3 text-h3 text-primary flex items-center gap-sm">
              <User className="w-5 h-5" /> Thông tin khách hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-sm">
                <label
                  className="block font-label text-label text-on-surface uppercase"
                  htmlFor="fullName"
                >
                  Họ và tên (theo CMND/CCCD/Hộ chiếu)
                </label>
                <input
                  required
                  className="w-full bg-surface border border-primary-container text-on-surface rounded-lg px-md py-sm focus:border-2 focus:ring-primary-container outline-none font-body-md transition-all duration-200"
                  id="fullName"
                  placeholder="Nguyễn Văn A"
                  type="text"
                />
              </div>
              <div className="space-y-sm">
                <label
                  className="block font-label text-label text-on-surface uppercase"
                  htmlFor="email"
                >
                  Địa chỉ Email
                </label>
                <input
                  required
                  className="w-full bg-surface border border-primary-container text-on-surface rounded-lg px-md py-sm focus:border-2 focus:ring-primary-container outline-none font-body-md transition-all duration-200"
                  id="email"
                  placeholder="john.doe@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-sm">
                <label
                  className="block font-label text-label text-on-surface uppercase"
                  htmlFor="phone"
                >
                  Số điện thoại
                </label>
                <input
                  required
                  className="w-full bg-surface border border-primary-container text-on-surface rounded-lg px-md py-sm focus:border-2 focus:ring-primary-container outline-none font-body-md transition-all duration-200"
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
              </div>
              <div className="space-y-sm">
                <label className="block font-label text-label text-on-surface uppercase">
                  Giới tính
                </label>
                <div className="flex gap-gutter mt-sm">
                  <label className="flex items-center space-x-sm cursor-pointer">
                    <input
                      className="text-primary-container border-primary-container focus:ring-primary-container w-4 h-4 cursor-pointer"
                      name="gender"
                      type="radio"
                      value="male"
                      required
                    />
                    <span className="font-body-md text-on-surface">Nam</span>
                  </label>
                  <label className="flex items-center space-x-sm cursor-pointer">
                    <input
                      className="text-primary-container border-primary-container focus:ring-primary-container w-4 h-4 cursor-pointer"
                      name="gender"
                      type="radio"
                      value="female"
                    />
                    <span className="font-body-md text-on-surface">Nữ</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-outline-variant/30 my-lg"></div>

          {/* Date Selection Section */}
          <div className="space-y-gutter">
            <h2 className="font-h3 text-h3 text-primary flex items-center gap-sm">
              <Calendar className="w-5 h-5" /> Chọn ngày
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-sm">
                <label className="block font-label text-label text-on-surface uppercase">
                  Ngày nhận phòng
                </label>
                <input
                  required
                  className="w-full bg-surface border border-primary-container text-on-surface rounded-lg px-md py-sm focus:border-2 focus:ring-primary-container outline-none font-body-md transition-all duration-200"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="space-y-sm">
                <label className="block font-label text-label text-on-surface uppercase">
                  Ngày trả phòng
                </label>
                <input
                  required
                  className="w-full bg-surface border border-primary-container text-on-surface rounded-lg px-md py-sm focus:border-2 focus:ring-primary-container outline-none font-body-md transition-all duration-200"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-sm">
              <label className="block font-label text-label text-on-surface uppercase flex items-center gap-xs">
                <Clock className="w-4 h-4" /> Thời gian đến dự kiến
              </label>
              <select className="w-full bg-surface border border-primary-container text-on-surface rounded-lg px-md py-sm focus:border-2 focus:ring-primary-container outline-none font-body-md transition-all duration-200">
                <option>Tôi chưa biết</option>
                <option>12:00 PM - 2:00 PM</option>
                <option>2:00 PM - 4:00 PM</option>
                <option>4:00 PM - 6:00 PM</option>
                <option>Sau 18:00</option>
              </select>
            </div>
          </div>

          <div className="border-t border-outline-variant/30 my-lg"></div>

          {/* Special Requests Section */}
          <div className="space-y-gutter">
            <h2 className="font-h3 text-h3 text-primary flex items-center gap-sm">
              <MessageSquare className="w-5 h-5" /> Yêu cầu đặc biệt
            </h2>
            <div className="space-y-sm">
              <label
                className="block font-label text-label text-on-surface uppercase"
                htmlFor="requests"
              >
                Bạn có yêu cầu gì không? (Không bắt buộc)
              </label>
              <textarea
                className="w-full bg-surface border border-primary-container text-on-surface rounded-lg px-md py-sm focus:border-2 focus:ring-primary-container outline-none font-body-md transition-all duration-200 resize-none"
                id="requests"
                placeholder="VD: Nhận phòng sớm, phòng tầng cao..."
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className="pt-lg">
            <button
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-sm bg-primary-container text-on-primary font-button text-button py-md rounded-lg hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Lock className="w-5 h-5" />
              )}
              <span>{isSubmitting ? "Đang xử lý..." : "Xác nhận đặt phòng"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Summary Card */}
      <div className="w-full lg:w-2/5">
        <div className="sticky top-24 bg-surface border border-primary-container rounded-lg overflow-hidden">
          <div className="w-full h-48 relative">
            <Image
              src={image}
              alt="Ảnh phòng"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="p-lg">
            <h2 className="font-h2 text-h2 text-on-surface mb-sm">{hotelName}</h2>
            <p className="font-body-md text-on-surface-variant mb-md">{roomType}</p>
            <div className="flex justify-between items-center mb-md pb-md border-b border-outline-variant">
              <div>
                <p className="font-label text-label text-on-surface-variant uppercase mb-xs">
                  Nhận phòng
                </p>
                <p className="font-body-md text-on-surface font-semibold">
                  {checkInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-label text-label text-on-surface-variant uppercase mb-xs">
                  Trả phòng
                </p>
                <p className="font-body-md text-on-surface font-semibold">
                  {checkOutDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="space-y-sm mb-lg">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-on-surface-variant">
                  Giá mỗi đêm x {nights}
                </span>
                <span className="font-body-md text-on-surface font-bold">
                  {formatCurrency(roomTotal)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-md text-on-surface-variant">
                  Thuế & Phí
                </span>
                <span className="font-body-md text-on-surface font-bold">
                  {formatCurrency(taxes)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-md border-t border-primary-container">
              <span className="font-h3 text-h3 text-on-surface">Tổng cộng</span>
              <span className="font-h1 text-h1 text-primary-container font-bold">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
