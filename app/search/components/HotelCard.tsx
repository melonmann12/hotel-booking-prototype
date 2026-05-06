import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";

interface HotelCardProps {
  id: string;
  title: string;
  location: string;
  rating: string | number;
  ratingLabel: string;
  reviews: string;
  badges: string[];
  price: string;
  image: string;
}

export default function HotelCard({
  id,
  title,
  location,
  rating,
  ratingLabel,
  reviews,
  badges,
  price,
  image,
}: HotelCardProps) {
  return (
    <article className="bg-surface-container-lowest border border-primary rounded-lg flex flex-col md:flex-row overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="w-full md:w-1/3 h-48 md:h-auto shrink-0 relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-lg flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-h2 text-primary">{title}</h3>
              <div className="flex items-center gap-xs text-primary mb-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary" />
                ))}
              </div>
              <p className="font-body-sm text-on-surface-variant flex items-center gap-xs">
                <MapPin className="w-4 h-4" /> {location}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-primary text-on-primary font-button px-sm py-xs rounded-DEFAULT inline-block mb-xs">
                {rating} {ratingLabel}
              </div>
              <p className="font-body-sm text-on-surface-variant">{reviews}</p>
            </div>
          </div>
          <div className="flex gap-sm mt-md flex-wrap">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="border border-primary text-primary font-label px-xs py-xs rounded-DEFAULT"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-end mt-md border-t border-outline-variant/30 pt-md">
          <div>
            <p className="font-body-sm text-on-surface-variant">Price for 30 nights</p>
            <p className="font-h1 text-primary">{price}</p>
          </div>
          <Link
            href={`/hotel/${id}`}
            className="bg-primary text-on-primary font-button px-lg py-md rounded-DEFAULT hover:opacity-90 transition-opacity"
          >
            View Deal
          </Link>
        </div>
      </div>
    </article>
  );
}
