import { Search } from "lucide-react";

export default function SortHeader() {
  return (
    <>
      {/* Top Bar / Search Summary */}
      <div className="bg-surface-container-lowest border border-primary rounded-lg p-md flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div className="flex items-center gap-sm">
          <Search className="w-6 h-6 text-primary" />
          <h2 className="font-h2 text-primary">
            Milan, Italy | Nov 04 - Dec 04 | 2 Adults, 1 Child
          </h2>
        </div>
        <button className="border border-primary text-primary font-button px-md py-sm rounded-DEFAULT hover:bg-primary hover:text-on-primary transition-colors">
          Edit Search
        </button>
      </div>

      {/* Sorting Tabs */}
      <div className="flex gap-sm border-b border-outline-variant/30 pb-sm">
        <button className="px-md py-sm rounded-DEFAULT border border-primary text-primary font-button hover:bg-primary hover:text-on-primary transition-colors">
          Cheapest
        </button>
        <button className="px-md py-sm rounded-DEFAULT bg-primary text-on-primary font-button">
          Best
        </button>
        <button className="px-md py-sm rounded-DEFAULT border border-primary text-primary font-button hover:bg-primary hover:text-on-primary transition-colors">
          Top Rated
        </button>
      </div>
    </>
  );
}
