"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  /** Initial values to pre-fill the inputs (e.g. from URL params on /search) */
  initialCity?: string;
  initialDate?: string;
  initialGuests?: string;
  /** Visual variant: "hero" renders the full-width rounded pill used on the home page,
   *  "compact" renders a smaller version for the search results page header. */
  variant?: "hero" | "compact";
}

export default function SearchBar({
  initialCity = "",
  initialDate = "",
  initialGuests = "",
  variant = "hero",
}: SearchBarProps) {
  const router = useRouter();
  const [city, setCity] = useState(initialCity);
  const [date, setDate] = useState(initialDate);
  const [guests, setGuests] = useState(initialGuests);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city.trim()) params.set("city", city.trim());
    if (date.trim()) params.set("date", date.trim());
    if (guests.trim()) params.set("guests", guests.trim());
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (variant === "compact") {
    return (
      <div className="bg-surface-container-lowest border border-primary rounded-lg p-md flex flex-col md:flex-row items-stretch md:items-center gap-md">
        <div className="flex-1 flex flex-col md:flex-row items-stretch md:items-center gap-md">
          <div className="flex-1 min-w-0">
            <label className="block font-label text-label text-on-surface-variant mb-xs">
              Điểm đến
            </label>
            <input
              className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-md text-body-md text-primary placeholder-on-surface-variant/50 outline-none"
              placeholder="Tìm điểm đến (thành phố)"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="hidden md:block w-px h-8 bg-outline-variant/30" />
          <div className="flex-1 min-w-0">
            <label className="block font-label text-label text-on-surface-variant mb-xs">
              Ngày
            </label>
            <input
              className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-md text-body-md text-primary placeholder-on-surface-variant/50 outline-none"
              placeholder="Thêm ngày"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="hidden md:block w-px h-8 bg-outline-variant/30" />
          <div className="flex-1 min-w-0">
            <label className="block font-label text-label text-on-surface-variant mb-xs">
              Khách
            </label>
            <input
              className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-md text-body-md text-primary placeholder-on-surface-variant/50 outline-none"
              placeholder="Thêm khách"
              type="text"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#0F172A] text-on-primary w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>
      </div>
    );
  }

  // Default: "hero" variant (used on Home page)
  return (
    <div className="bg-surface-container-lowest rounded-full p-sm flex flex-col md:flex-row items-center w-full max-w-4xl shadow-md border border-primary/10">
      <div className="flex-1 w-full md:w-auto px-lg py-sm border-b md:border-b-0 md:border-r border-outline-variant/30">
        <label className="block font-label text-label text-on-surface-variant mb-xs">
          Điểm đến
        </label>
        <input
          className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-primary placeholder-on-surface-variant/50 outline-none"
          placeholder="Tìm điểm đến (thành phố)"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex-1 w-full md:w-auto px-lg py-sm border-b md:border-b-0 md:border-r border-outline-variant/30">
        <label className="block font-label text-label text-on-surface-variant mb-xs">
          Ngày
        </label>
        <input
          className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-primary placeholder-on-surface-variant/50 outline-none"
          placeholder="Thêm ngày"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex-1 w-full md:w-auto px-lg py-sm flex items-center justify-between">
        <div>
          <label className="block font-label text-label text-on-surface-variant mb-xs">
            Khách
          </label>
          <input
            className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-primary placeholder-on-surface-variant/50 outline-none"
            placeholder="Thêm khách"
            type="text"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#0F172A] text-on-primary w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
  );
}
