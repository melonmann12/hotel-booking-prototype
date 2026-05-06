"use client";

import { Star } from "lucide-react";

// Available Vietnamese cities from the JSON data
const CITIES = [
  "Hà Nội",
  "Đà Lạt",
  "Đà Nẵng",
  "Côn Đảo",
  "Hồ Chí Minh",
  "Vĩnh Phúc",
];

const SMART_FILTERS = ["Miễn phí hủy phòng", "Bao gồm bữa sáng"];
const STAR_RATINGS = [5, 4, 3];
const AMENITIES = ["Hồ bơi", "Spa", "Nhà hàng", "Wi-Fi", "Phòng gym"];

interface FilterSidebarProps {
  selectedStars: number[];
  selectedCities: string[];
  selectedSmartFilters: string[];
  selectedAmenities: string[];
  onToggleStar: (star: number) => void;
  onToggleCity: (city: string) => void;
  onToggleSmartFilter: (filter: string) => void;
  onToggleAmenity: (amenity: string) => void;
  /** Count of hotels that pass all active filters */
  activeFilterCount: number;
  onClearAll: () => void;
}

export default function FilterSidebar({
  selectedStars,
  selectedCities,
  selectedSmartFilters,
  selectedAmenities,
  onToggleStar,
  onToggleCity,
  onToggleSmartFilter,
  onToggleAmenity,
  activeFilterCount,
  onClearAll,
}: FilterSidebarProps) {
  const hasActiveFilters =
    selectedStars.length > 0 ||
    selectedCities.length > 0 ||
    selectedSmartFilters.length > 0 ||
    selectedAmenities.length > 0;

  return (
    <aside className="col-span-1 md:col-span-3 space-y-lg hidden md:block">
      {/* Price Alert */}
      <div className="border border-primary rounded-lg p-md bg-surface-container-lowest">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-h3 text-primary">Thông báo giá</h3>
            <p className="font-body-sm text-on-surface-variant">
              Nhận thông báo khi giá giảm.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="w-full text-center font-button text-button text-primary border border-primary rounded-lg py-sm px-md hover:bg-primary hover:text-on-primary transition-colors"
        >
          Xóa tất cả bộ lọc ({activeFilterCount})
        </button>
      )}

      {/* Smart Filters */}
      <div className="border-t border-outline-variant/30 pt-md">
        <h4 className="font-h3 text-primary mb-sm">Bộ lọc thông minh</h4>
        <div className="space-y-sm">
          {SMART_FILTERS.map((filter) => (
            <label key={filter} className="flex items-center gap-sm cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedSmartFilters.includes(filter)}
                onChange={() => onToggleSmartFilter(filter)}
                className="rounded-DEFAULT border-primary text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-body-md group-hover:text-primary transition-colors">
                {filter}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Star Rating */}
      <div className="border-t border-outline-variant/30 pt-md">
        <h4 className="font-h3 text-primary mb-sm">Xếp hạng sao</h4>
        <div className="space-y-sm">
          {STAR_RATINGS.map((rating) => (
            <label key={rating} className="flex items-center gap-sm cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedStars.includes(rating)}
                onChange={() => onToggleStar(rating)}
                className="rounded-DEFAULT border-primary text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-body-md flex items-center group-hover:text-primary transition-colors">
                {rating} <Star className="w-4 h-4 fill-primary text-primary ml-xs" />
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations (Cities) */}
      <div className="border-t border-outline-variant/30 pt-md">
        <h4 className="font-h3 text-primary mb-sm">Khu vực</h4>
        <div className="space-y-sm">
          {CITIES.map((city) => (
            <label
              key={city}
              className="flex items-center gap-sm cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCities.includes(city)}
                onChange={() => onToggleCity(city)}
                className="rounded-DEFAULT border-primary text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-body-md group-hover:text-primary transition-colors">
                {city}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="border-t border-outline-variant/30 pt-md">
        <h4 className="font-h3 text-primary mb-sm">Tiện nghi</h4>
        <div className="space-y-sm">
          {AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center gap-sm cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => onToggleAmenity(amenity)}
                className="rounded-DEFAULT border-primary text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-body-md group-hover:text-primary transition-colors">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
