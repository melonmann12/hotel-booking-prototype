import { Star } from "lucide-react";

export default function FilterSidebar() {
  return (
    <aside className="col-span-1 md:col-span-3 space-y-lg hidden md:block">
      {/* Price Alert */}
      <div className="border border-primary rounded-lg p-md bg-surface-container-lowest">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-h3 text-primary">Price Alert</h3>
            <p className="font-body-sm text-on-surface-variant">
              Get notified when prices drop.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Smart Filters */}
      <div className="border-t border-outline-variant/30 pt-md">
        <h4 className="font-h3 text-primary mb-sm">Smart Filters</h4>
        <div className="space-y-sm">
          {["Free Cancellation", "Breakfast Included"].map((filter) => (
            <label key={filter} className="flex items-center gap-sm cursor-pointer group">
              <input
                type="checkbox"
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
        <h4 className="font-h3 text-primary mb-sm">Star Rating</h4>
        <div className="space-y-sm">
          {[5, 4, 3].map((rating) => (
            <label key={rating} className="flex items-center gap-sm cursor-pointer group">
              <input
                type="checkbox"
                className="rounded-DEFAULT border-primary text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-body-md flex items-center group-hover:text-primary transition-colors">
                {rating} <Star className="w-4 h-4 fill-primary text-primary ml-xs" />
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Neighborhoods */}
      <div className="border-t border-outline-variant/30 pt-md">
        <h4 className="font-h3 text-primary mb-sm">Neighborhoods</h4>
        <div className="space-y-sm">
          {["Brera", "Navigli", "Centro Storico"].map((neighborhood) => (
            <label
              key={neighborhood}
              className="flex items-center gap-sm cursor-pointer group"
            >
              <input
                type="checkbox"
                className="rounded-DEFAULT border-primary text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-body-md group-hover:text-primary transition-colors">
                {neighborhood}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="border-t border-outline-variant/30 pt-md">
        <h4 className="font-h3 text-primary mb-sm">Amenities</h4>
        <div className="space-y-sm">
          {["Swimming Pool", "Free Wi-Fi", "Fitness Center", "Parking"].map(
            (amenity) => (
              <label key={amenity} className="flex items-center gap-sm cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded-DEFAULT border-primary text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <span className="font-body-md group-hover:text-primary transition-colors">
                  {amenity}
                </span>
              </label>
            )
          )}
        </div>
      </div>
    </aside>
  );
}
