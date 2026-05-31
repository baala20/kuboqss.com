import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
};

const sizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={cn(className, filled ? "text-gold" : "text-blush-dark")}
    >
      <path
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.2"
        d="M10 2.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L10 11.67 6.48 13.34l.67-3.92L4.3 6.64l3.94-.57L10 2.5z"
      />
    </svg>
  );
}

export function StarRating({
  rating,
  size = "md",
  showValue = false,
  reviewCount,
  className,
}: StarRatingProps) {
  const clamped = Math.min(5, Math.max(0, rating));

  return (
    <div className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" aria-label={`تقييم ${clamped} من 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon key={index} filled={clamped >= index + 1} className={sizes[size]} />
        ))}
      </div>
      {showValue ? <span className="font-black text-plum">{clamped.toFixed(1)}</span> : null}
      {reviewCount ? <span className="text-sm font-bold text-taupe">{reviewCount}+ تقييم</span> : null}
    </div>
  );
}
