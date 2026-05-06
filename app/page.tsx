import Image from "next/image";
import Link from "next/link";



import hotelsData from "../data/hotels.json";
import { formatCurrency } from "@/lib/format";
import SearchBar from "@/components/SearchBar";

const categories = ["Tất cả", "Căn hộ", "Khu nghỉ dưỡng", "Nhà nghỉ", "Khách sạn"];

export default function Home() {
  return (
    <>


      <main className="flex-grow flex flex-col">
        <section className="relative w-full h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNEuk0-OfdJCZQcq0Xa8cuVX1xpJ-OXjo7jFe4hnLnxf-ZELJ9jMW9dW9a9Y32yh0bgGwoYZiHhZluT49C18S5acCmR3MEUs3b5Rl5xiSfr_HhXQomK-XFb_WcOOW8F8jEYKgwX1PJyZ2gL5seFOdbWiuQqbnDjwj5Qn-sxc5M2xZL6mM9GbQRwibL0vJK8okoAN9qKR57H-CFx1uA0ebBA9nMbGVcjQ-qhzVhHvUF7rdsO5W7cs6dzX_FwRy7lzEtRyT3eJ0GdpvL"
              alt="Luxury tropical resort"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter flex flex-col items-center">
            <div className="mb-xl flex flex-col items-center gap-sm text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                Nghỉ dưỡng tại các Resort tuyệt đẹp,<br className="hidden md:block" /> Lưu trú tại những Khách sạn sang trọng.
              </h1>
              {/* <p className="text-lg md:text-2xl text-white/90 italic">
                Dịch vụ chuyên nghiệp cho một chuyến đi suôn sẻ và đáng nhớ.
              </p> */}
            </div>
            <SearchBar variant="hero" />
          </div>
        </section>


        <section className="w-full max-w-container-max mx-auto px-gutter py-xxl flex flex-col gap-xl">
          <div className="flex flex-col gap-md">
            <h1 className="font-h1 text-h1 text-primary">
              Nơi sự thoải mái hội tụ cùng tiện nghi
            </h1>
            <div className="flex flex-wrap gap-sm">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-md py-sm rounded-full font-button text-button transition-colors ${index === 0
                    ? "bg-[#0F172A] text-on-primary"
                    : "bg-surface-container-lowest text-primary border border-primary hover:bg-[#0F172A] hover:text-on-primary"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {hotelsData.slice(0, 4).map((hotel: any) => (
              <Link
                key={hotel.id}
                href={`/hotel/${hotel.id}`}
                className="bg-surface-container-lowest border border-[#0F172A] rounded-lg overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="w-full h-48 bg-surface-container relative">
                  <Image
                    src={hotel.images[0]}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <button
                    className="absolute top-sm right-sm text-surface-container-lowest hover:text-error transition-colors p-sm bg-primary/20 rounded-full backdrop-blur-sm flex items-center justify-center z-10"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-lg flex flex-col gap-sm flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-h3 text-h3 text-primary truncate">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-xs text-primary">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-button text-button">
                        {hotel.rating.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {hotel.city}, {hotel.country}
                  </p>
                  <div className="flex flex-wrap gap-xs mt-auto pt-sm">
                    <span className="border border-[#0F172A] text-primary px-sm py-xs rounded text-[10px] font-semibold tracking-wider uppercase">
                      {hotel.rooms[0]?.capacity || 2} Khách
                    </span>
                    <span className="border border-[#0F172A] text-primary px-sm py-xs rounded text-[10px] font-semibold tracking-wider uppercase">
                      {hotel.rooms[0]?.bedInfo || "1 Giường"}
                    </span>
                  </div>
                  <div className="mt-sm pt-sm border-t border-outline-variant/20 flex justify-between items-end">
                    <div>
                      <span className="font-h3 text-h3 text-primary font-bold">
                        {formatCurrency(hotel.startingPrice)}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant ml-1">
                        /đêm
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>


    </>
  );
}
