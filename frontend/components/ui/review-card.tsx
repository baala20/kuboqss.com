import { StarRating } from "@/components/ui/star-rating";

type ReviewCardProps = {
  name: string;
  city: string;
  text: string;
  rating?: number;
  verified?: boolean;
};

export function ReviewCard({ name, city, text, rating = 5, verified = true }: ReviewCardProps) {
  return (
    <article className="review-card">
      <div className="flex items-center justify-between gap-3">
        <StarRating rating={rating} size="sm" />
        {verified ? (
          <span className="rounded-full bg-blush px-3 py-1 text-xs font-black text-plum">✓ موثّقة</span>
        ) : null}
      </div>
      <blockquote className="mt-4 text-base leading-8 text-ink">&ldquo;{text}&rdquo;</blockquote>
      <footer className="mt-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-plum text-sm font-black text-gold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-black text-plum">{name}</p>
          <p className="text-sm text-taupe">{city}</p>
        </div>
      </footer>
    </article>
  );
}
