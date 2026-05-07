"use client";

import { useRouter } from "next/navigation";

const categories = ["Tất cả", "Căn hộ", "Khu nghỉ dưỡng", "Nhà nghỉ", "Khách sạn"];

interface CategoryFilterProps {
  activeCategory?: string;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const router = useRouter();

  const handleClick = (category: string) => {
    if (category === "Tất cả") {
      router.push("/search");
    } else {
      router.push(`/search?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-sm">
      {categories.map((category) => {
        const isActive =
          activeCategory === category ||
          (!activeCategory && category === "Tất cả");

        return (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={`px-md py-sm rounded-full font-button text-button transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? "bg-[#0F172A] text-on-primary shadow-md scale-[1.03]"
                  : "bg-surface-container-lowest text-primary border border-primary hover:bg-[#0F172A] hover:text-on-primary hover:shadow-md hover:scale-[1.03] active:scale-95"
              }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
