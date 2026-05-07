"use client";

import { useState, useMemo } from "react";
import FilterSidebar from "./FilterSidebar";
import SortHeader from "./SortHeader";
import HotelCard from "./HotelCard";
import { formatCurrency } from "@/lib/format";
import { SearchX } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  stars: number;
  address: string;
  city: string;
  country: string;
  startingPrice: number;
  currency: string;
  vrLink?: string;
  description: string;
  images: string[];
  amenities: { label: string; icon: string }[];
  rating: { score: number; label: string; reviewCount: number };
  featuredReviews: any[];
  rooms: {
    id: string;
    type: string;
    bedInfo: string;
    capacity: number;
    options: string[];
    price: number;
  }[];
}

interface SearchResultsClientProps {
  /** Hotels already filtered by the search-bar city query (from Server Component) */
  hotels: Hotel[];
  /** The search summary text to display */
  searchSummary: string;
  /** The city query from URL, used for empty-state messaging */
  cityQuery: string;
}

export default function SearchResultsClient({
  hotels,
  searchSummary,
  cityQuery,
}: SearchResultsClientProps) {
  // — Filter state —
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedSmartFilters, setSelectedSmartFilters] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // — Toggle helpers —
  const toggle = <T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  const handleToggleStar = (star: number) =>
    setSelectedStars((prev) => toggle(prev, star));

  const handleToggleCity = (city: string) =>
    setSelectedCities((prev) => toggle(prev, city));

  const handleToggleSmartFilter = (filter: string) =>
    setSelectedSmartFilters((prev) => toggle(prev, filter));

  const handleToggleAmenity = (amenity: string) =>
    setSelectedAmenities((prev) => toggle(prev, amenity));

  const handleClearAll = () => {
    setSelectedStars([]);
    setSelectedCities([]);
    setSelectedSmartFilters([]);
    setSelectedAmenities([]);
  };

  // — Filtering logic —
  // Rule: If a filter category has NO items selected → pass (don't filter).
  //       If items ARE selected → hotel must match AT LEAST ONE (OR within category).
  //       ALL active categories must pass (AND between categories).
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      // Stars filter
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) {
        return false;
      }

      // City filter
      if (selectedCities.length > 0 && !selectedCities.includes(hotel.city)) {
        return false;
      }

      // Smart filters — check inside hotel.rooms[].options
      if (selectedSmartFilters.length > 0) {
        const matchesAnySmartFilter = selectedSmartFilters.some((filter) => {
          // Map filter labels to checks against room options
          const filterLower = filter.toLowerCase();
          return hotel.rooms.some((room) =>
            room.options.some((opt) => opt.toLowerCase().includes(filterLower))
          );
        });
        if (!matchesAnySmartFilter) return false;
      }

      // Amenities filter — check against hotel.amenities[].label
      if (selectedAmenities.length > 0) {
        const matchesAnyAmenity = selectedAmenities.some((amenity) => {
          const amenityLower = amenity.toLowerCase();
          return hotel.amenities.some((am) =>
            am.label.toLowerCase().includes(amenityLower)
          );
        });
        if (!matchesAnyAmenity) return false;
      }

      return true;
    });
  }, [hotels, selectedStars, selectedCities, selectedSmartFilters, selectedAmenities]);

  // Count of active individual filter selections
  const activeFilterCount =
    selectedStars.length +
    selectedCities.length +
    selectedSmartFilters.length +
    selectedAmenities.length;

  // Determine the appropriate empty-state message
  const hasActiveFilters = activeFilterCount > 0;
  const isSearchBarEmpty = !cityQuery.trim();

  return (
    <>
      <FilterSidebar
        selectedStars={selectedStars}
        selectedCities={selectedCities}
        selectedSmartFilters={selectedSmartFilters}
        selectedAmenities={selectedAmenities}
        onToggleStar={handleToggleStar}
        onToggleCity={handleToggleCity}
        onToggleSmartFilter={handleToggleSmartFilter}
        onToggleAmenity={handleToggleAmenity}
        activeFilterCount={activeFilterCount}
        onClearAll={handleClearAll}
      />

      <section className="col-span-1 md:col-span-9 space-y-lg">
        <SortHeader
          summary={searchSummary}
          resultCount={filteredHotels.length}
        />

        {filteredHotels.length > 0 ? (
          <div className="space-y-md">
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                title={hotel.name}
                location={hotel.address}
                stars={hotel.stars}
                rating={hotel.rating.score.toFixed(1)}
                ratingLabel={hotel.rating.label}
                reviews={`${hotel.rating.reviewCount.toLocaleString()} đánh giá`}
                badges={hotel.amenities.slice(0, 2).map((a) => a.label)}
                price={formatCurrency(hotel.startingPrice)}
                image={hotel.images[0]}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-xxl text-center w-full min-h-[300px]">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-lg">
              <SearchX className="w-10 h-10 text-on-surface-variant" />
            </div>
            <h3 className="font-h2 text-h2 text-primary mb-sm">
              Không tìm thấy khách sạn
            </h3>
            <p className="w-full max-w-md text-center font-body-lg text-body-lg text-on-surface-variant">
              {hasActiveFilters
                ? "Không có khách sạn nào phù hợp với bộ lọc đã chọn. Vui lòng điều chỉnh bộ lọc!"
                : `Không tìm thấy khách sạn nào tại "${cityQuery.trim()}". Vui lòng thử lại với từ khóa khác!`}
            </p>
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="mt-lg bg-primary text-on-primary font-button text-button py-md px-xl rounded-lg hover:bg-primary/90 transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
}
