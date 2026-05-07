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
      <div className="bg-surface-container-lowest border border-primary rounded-2xl p-md flex flex-col md:flex-row items-stretch md:items-center gap-md mb-8 md:mb-0">
        <div className="flex-1 flex flex-col md:flex-row items-stretch md:items-center gap-md">
          <div className="flex-1 min-w-0">
            <label className="block font-label text-label text-on-surface-variant mb-xs">
              Điểm đến
            </label>
            <input
              className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-md text-body-md text-primary placeholder-on-surface-variant/50 outline-none"
              placeholder="Tìm điểm đến(thành phố)"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="h-px w-full md:h-8 md:w-px bg-outline-variant/30" />
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
          <div className="h-px w-full md:h-8 md:w-px bg-outline-variant/30" />
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
        {/* Mobile: full-width button | Desktop: circle icon */}
        <button
          onClick={handleSearch}
          className="w-full md:w-10 h-12 md:h-10 rounded-xl md:rounded-full bg-[#0F172A] text-on-primary flex items-center justify-center gap-sm hover:opacity-90 transition-opacity flex-shrink-0 font-button"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
          <span className="md:hidden">Tìm kiếm</span>
        </button>
      </div>
    );
  }

  // Default: "hero" variant (used on Home page)
  return (
    <div className="bg-surface-container-lowest rounded-2xl md:rounded-full p-4 md:p-sm flex flex-col md:flex-row items-stretch md:items-center w-full max-w-4xl shadow-md border border-primary/10 mb-8 md:mb-0 gap-y-1 md:gap-y-0">
      <div className="flex-1 w-full md:w-auto px-lg py-sm border-b md:border-b-0 md:border-r border-outline-variant/30">
        <label className="block font-label text-label text-on-surface-variant mb-xs">
          Điểm đến
        </label>
        <input
          className="w-full bg-transparent border-none p-0 focus:ring-0 font-body-lg text-body-lg text-primary placeholder-on-surface-variant/50 outline-none"
          placeholder="Tìm điểm đến(thành phố)"
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
      <div className="flex-1 w-full md:w-auto px-lg py-sm">
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
      {/* Mobile: full-width button | Desktop: circle icon */}
      <div className="px-lg md:px-0 pt-2 md:pt-0 flex-shrink-0">
        <button
          onClick={handleSearch}
          className="w-full md:w-12 h-12 rounded-xl md:rounded-full bg-[#0F172A] text-on-primary flex items-center justify-center gap-sm hover:opacity-90 transition-opacity font-button"
        >
          <span className="material-symbols-outlined">search</span>
          <span className="md:hidden">Tìm kiếm</span>
        </button>
      </div>
    </div>
  );
}
