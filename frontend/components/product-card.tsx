import Link from "next/link";
import type { Product } from "@/data/products";
import { StarRating } from "@/components/ui/star-rating";
import { formatLyd } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const bestOffer = product.offers[1] || product.offers[0];

  return (
    <article className="premium-card group overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative grid h-56 place-items-center bg-gradient-to-br from-blush to-ivory p-8">
        <div className="absolute right-4 top-4 rounded-full bg-plum px-3 py-1 text-xs font-black text-gold">اختيار كوبوكس</div>
        <img src={product.image} alt={product.nameAr} className="h-full max-h-44 w-full object-contain transition duration-300 group-hover:scale-105" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-2">
          {product.badges.slice(0, 2).map((badge) => (
            <span key={badge} className="rounded-full bg-blush px-3 py-1 text-xs font-bold text-plum">
              {badge}
            </span>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-black text-plum">{product.nameAr}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-taupe">{product.headline}</p>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-ivory px-4 py-3">
          <StarRating rating={product.rating} size="sm" showValue />
          <span className="text-sm font-black text-plum">{product.reviewCount}+</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-taupe">ابتداءً من</span>
          <strong className="text-xl text-plum">{formatLyd(bestOffer.priceLyd)}</strong>
        </div>
        <p className="rounded-2xl bg-blush px-4 py-3 text-center text-xs font-black text-plum">
          دفع عند الاستلام · تأكيد قبل الشحن
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="block rounded-full bg-plum px-5 py-3 text-center text-sm font-black text-ivory transition hover:bg-plum-dark"
        >
          شاهدي التفاصيل
        </Link>
      </div>
    </article>
  );
}
