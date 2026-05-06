import { Search } from "lucide-react";

interface SortHeaderProps {
  summary?: string;
  resultCount?: number;
}

export default function SortHeader({
  summary = "Tất cả khách sạn",
  resultCount,
}: SortHeaderProps) {
  return (
    <>
      {/* Top Bar / Search Summary */}
      <div className="bg-surface-container-lowest border border-primary rounded-lg p-md flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div className="flex items-center gap-sm">
          <Search className="w-6 h-6 text-primary" />
          <h2 className="font-h2 text-primary">
            {summary}
            {resultCount !== undefined && (
              <span className="font-body-md text-on-surface-variant ml-sm">
                ({resultCount} kết quả)
              </span>
            )}
          </h2>
        </div>
      </div>

      {/* Sorting Tabs */}
      <div className="flex gap-sm border-b border-outline-variant/30 pb-sm">
        <button className="px-md py-sm rounded-DEFAULT border border-primary text-primary font-button hover:bg-primary hover:text-on-primary transition-colors">
          Rẻ nhất
        </button>
        <button className="px-md py-sm rounded-DEFAULT bg-primary text-on-primary font-button">
          Tốt nhất
        </button>
        <button className="px-md py-sm rounded-DEFAULT border border-primary text-primary font-button hover:bg-primary hover:text-on-primary transition-colors">
          Đánh giá cao
        </button>
      </div>
    </>
  );
}
