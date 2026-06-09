"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

import useWishlistStore from "@/store/wishlistStore";
import useCartStore from "@/store/cartStore";
import useUIStore from "@/store/uiStore";

interface CourseCardProps {
  course: {
    _id: string;
    slug?: string;
    title: string;
    instructor: string;
    priceType?: "free" | string;
    price?: number;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist
  );

  const toggleCart = useCartStore(
    (state) => state.toggleCart
  );

  const openWishlist = useUIStore(
    (state) => state.openWishlist
  );

  const openCart = useUIStore(
    (state) => state.openCart
  );

  const priceType = course.priceType ?? "free";
  const price = course.price ?? 0;

  return (
    <Link
      href={`/courses/${course.slug ?? ""}`}
      aria-label={`Course: ${course.title}`}
      className="
        w-60
        md:w-70
        shrink-0
        rounded-none
        overflow-hidden
        bg-(--secondary)
        border
        border-(--border-color)
        hover:-translate-y-1
        transition-transform
      "
    >
      {/* COURSE VISUAL */}
      <div className="relative flex h-60 items-end bg-(--background) p-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            toggleWishlist(course);
            openWishlist();
          }}
          className="
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-(--secondary)
            border
            border-(--border-color)
            hover:bg-(--hover-bg)
            transition
          "
        >
          <Heart size={18} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-(--foreground)">
          {course.title}
        </h3>

        <p className="text-sm text-(--soft-text)">
          {course.instructor}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span
            className={`inline-block px-3 py-1 text-xs uppercase tracking-wide ${
              priceType === "free"
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {priceType === "free" ? "Free" : `₹${price}`}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toggleCart(course);
              openCart();
            }}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-(--secondary)
              border
              border-(--border-color)
              hover:bg-(--hover-bg)
              transition
            "
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}