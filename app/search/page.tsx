import Link from "next/link";
import FilterSidebar from "./components/FilterSidebar";
import SortHeader from "./components/SortHeader";
import HotelCard from "./components/HotelCard";



import hotelsData from "../../data/hotels.json";

export default function SearchPage() {
  return (
    <>


      <main className="flex-grow w-full max-w-container-max mx-auto px-lg py-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <FilterSidebar />
        
        <section className="col-span-1 md:col-span-9 space-y-lg">
          <SortHeader />
          
          <div className="space-y-md">
            {hotelsData.map((hotel: any) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                title={hotel.name}
                location={hotel.address}
                rating={hotel.rating.score.toFixed(1)}
                ratingLabel={hotel.rating.label}
                reviews={`${hotel.rating.reviewCount.toLocaleString()} reviews`}
                badges={hotel.amenities.slice(0, 2).map((a: any) => a.label)}
                price={`${hotel.currency}${hotel.startingPrice}`}
                image={hotel.images[0]}
              />
            ))}
          </div>
        </section>
      </main>


    </>
  );
}
