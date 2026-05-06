import SearchBar from "@/components/SearchBar";
import SearchResultsClient from "./components/SearchResultsClient";

import hotelsData from "../../data/hotels.json";
import { normalizeVietnamese } from "@/lib/format";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const cityQuery = typeof params.city === "string" ? params.city : "";
  const dateQuery = typeof params.date === "string" ? params.date : "";
  const guestsQuery = typeof params.guests === "string" ? params.guests : "";

  // Filter hotels by city from the search bar — accent-insensitive, case-insensitive
  const searchBarFilteredHotels = cityQuery.trim()
    ? hotelsData.filter((hotel: any) => {
        const normalizedQuery = normalizeVietnamese(cityQuery);
        const normalizedCity = normalizeVietnamese(hotel.city);
        return normalizedCity.includes(normalizedQuery);
      })
    : hotelsData;

  // Build a search summary string for the SortHeader
  const summaryParts: string[] = [];
  if (cityQuery.trim()) summaryParts.push(cityQuery.trim());
  if (dateQuery.trim()) summaryParts.push(dateQuery.trim());
  if (guestsQuery.trim()) summaryParts.push(guestsQuery.trim());
  const searchSummary =
    summaryParts.length > 0
      ? summaryParts.join(" | ")
      : "Tất cả khách sạn";

  return (
    <>
      <main className="flex-grow w-full max-w-container-max mx-auto px-lg py-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Search Bar spans full width above the grid — pre-filled with current params */}
        <div className="col-span-1 md:col-span-12">
          <SearchBar
            variant="compact"
            initialCity={cityQuery}
            initialDate={dateQuery}
            initialGuests={guestsQuery}
          />
        </div>

        {/* FilterSidebar + Hotel list — managed by client component for interactive filters */}
        <SearchResultsClient
          hotels={searchBarFilteredHotels}
          searchSummary={searchSummary}
          cityQuery={cityQuery}
        />
      </main>
    </>
  );
}
