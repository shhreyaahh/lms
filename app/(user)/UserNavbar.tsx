"use client";

import Link from "next/link";

import { Search, ChevronDown, Bell, Heart, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import useWishlistStore from "@/store/wishlistStore";
import useCartStore from "@/store/cartStore";

import ClerkUserButton from "@/components/ui/navbar/ClerkUserButton";

export default function UserNavbar() {
  const [showExplore, setShowExplore] = useState(false);

  const { wishlist } = useWishlistStore();
  const [showWishlist, setShowWishlist] = useState(false);
  const wishlistRef = useRef<HTMLDivElement>(null);

  const { cart } = useCartStore();
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  type ExploreCategory = {
    title: string;
    links: string[];
  };

  const [exploreMenu, setExploreMenu] = useState<ExploreCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<ExploreCategory | null>(
    null,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wishlistRef.current &&
        !wishlistRef.current.contains(event.target as Node)
      ) {
        setShowWishlist(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //explore menu
  useEffect(() => {
    async function loadExploreMenu() {
      const res = await fetch("/api/explore");
      const courses = await res.json();

      const grouped: Record<string, string[]> = {};

      courses.forEach((course: { category: string; topic: string }) => {
        if (!grouped[course.category]) {
          grouped[course.category] = [];
        }

        if (course.topic && !grouped[course.category].includes(course.topic)) {
          grouped[course.category].push(course.topic);
        }
      });

      const menu = Object.entries(grouped).map(([title, links]) => ({
        title,
        links,
      }));

      setExploreMenu(menu);

      if (menu.length > 0) {
        setActiveCategory(menu[0]);
      }
    }

    loadExploreMenu();
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-(--primary) bg-(--background)/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-(--foreground) shrink-0"
          >
            LMS
          </Link>

          {/* Middle Section */}
          <div className="flex flex-1 items-center justify-center gap-15">
            {/* Explore */}
            <div
              className="relative h-full"
              onMouseLeave={() => setShowExplore(false)}
            >
              {showExplore && (
                <div
                  className="
      absolute
      left-0
      top-full
      z-50
      mt-px
      w-180
      border
      border-(--border-color)
      bg-(--secondary)
      shadow-2xl
    "
                >
                  {/* TOP CATEGORIES */}
                  <div
                    className="
        flex
        border-b
        border-(--border-color)
      "
                  >
                    {exploreMenu.map((section) => (
                      <button
                        key={section.title}
                        onMouseEnter={() => setActiveCategory(section)}
                        className={`
            px-6
            py-4
            text-sm
            transition

            ${
              activeCategory?.title === section.title
                ? "bg-(--active-bg) text-(--foreground)"
                : "text-(--soft-text) hover:bg-(--hover-bg)"
            }
          `}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>

                  {/* SUBCATEGORIES */}
                  <div
                    className="flex
    flex-wrap
    gap-6
    p-6"
                  >
                    {activeCategory?.links.map((item) => (
                      <button
                        key={item}
                        className="
            text-left
            text-(--soft-text)
            transition
            hover:text-(--foreground)
          "
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button
                onMouseEnter={() => setShowExplore(true)}
                className="
                  h-full
                  px-4
                  text-(--soft-text)
                  hover:text-(--foreground)
                "
              >
                <span className="flex items-center gap-2">
                  <span>Explore</span>
                  <ChevronDown size={18} />
                </span>
              </button>
            </div>

            {/* Search */}
            <div className="hidden md:flex relative w-150">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--primary)"
              />

              <input
                type="text"
                placeholder="Search your courses..."
                className="w-full rounded-full border border-(--primary) bg-(--input-bg) py-2 pl-11 pr-4 text-sm outline-none hover:border-(--foreground) focus:border-(--foreground) transition text-(--foreground)"
              />
            </div>

            {/* My Learning */}
            <Link
              href="/my-learning"
              className="text-sm text-(--primary) hover:text-(--foreground)"
            >
              My Learning
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5 shrink-0">
            {/* Wishlist */}
            <div
              ref={wishlistRef}
              className="relative flex items-center gap-5 shrink-0"
            >
              <button
                onClick={() => setShowWishlist((prev) => !prev)}
                className="relative hover:text-(--foreground)"
              >
                <Heart size={20} className="text-(--primary)" />

                {wishlist.length > 0 && (
                  <span
                    className="
          absolute
          -top-2
          -right-2
          rounded-full
          bg-red-500
          px-1.5
          py-0.5
          text-[10px]
          text-white
        "
                  >
                    {wishlist.length}
                  </span>
                )}
              </button>

              {showWishlist && (
                <div
                  className="
        absolute
        right-0
        top-14
        z-50
        w-80
        border
        border-(--border-color)
        bg-(--secondary)
        shadow-xl
      "
                >
                  <div className="p-4">
                    {wishlist.length === 0 ? (
                      <div className="flex flex-col items-center py-8 text-center">
                        <h4 className="text-base font-semibold text-(--foreground)">
                          Your wishlist is empty
                        </h4>

                        <p className="mt-2 text-sm text-(--soft-text)">
                          Save courses you're interested in by clicking the
                          heart icon.
                        </p>

                        <a
                          href="#explore-courses"
                          onClick={() => setShowWishlist(false)}
                          className="
      mt-5
      bg-(--primary)
      px-5
      py-2.5
      text-sm
      text-white
      transition
      hover:opacity-90
    "
                        >
                          Explore Courses
                        </a>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4">
                          {wishlist.map((course: any) => (
                            <div key={course.id} className="flex gap-3">
                              <div className="h-16 w-20 shrink-0 bg-(--background)" />

                              <div className="min-w-0">
                                <h4
                                  className="
                        line-clamp-2
                        text-sm
                        font-medium
                        text-(--foreground)
                      "
                                >
                                  {course.title}
                                </h4>

                                <p className="mt-1 text-xs text-(--soft-text)">
                                  {course.instructor}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Link
                          href="/wishlist"
                          onClick={() => setShowWishlist(false)}
                          className="
                mt-4
                block
                w-full
                bg-(--primary)
                py-3
                text-center
                text-white
                transition
                hover:opacity-90
              "
                        >
                          Go to wishlist
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <div ref={cartRef} className="relative flex items-center">
              <button
                onClick={() => setShowCart((prev) => !prev)}
                className="relative text-(--primary) hover:text-(--foreground)"
              >
                <ShoppingCart size={20} />

                {cart.length > 0 && (
                  <span
                    className="
          absolute
          -top-2
          -right-2
          rounded-full
          bg-red-500
          px-1.5
          py-0.5
          text-[10px]
          text-white
        "
                  >
                    {cart.length}
                  </span>
                )}
              </button>

              {showCart && (
                <div
                  className="
        absolute
        right-0
        top-14
        z-50
        w-80
        border
        border-(--border-color)
        bg-(--secondary)
        shadow-xl
      "
                >
                  <div className="p-4">
                    <div className="flex flex-col items-center py-8 text-center">
                      <p className="text-sm text-(--soft-text)">
                        Your cart is empty
                      </p>

                      <a
                        href="#explore-courses"
                        onClick={() => setShowCart(false)}
                        className="
              mt-5
              bg-(--primary)
              px-5
              py-2.5
              text-sm
              text-white
            "
                      >
                        Explore Courses
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="relative text-(--primary) hover:text-(--foreground)">
              <Bell size={20} />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User */}
            <div className="flex items-center justify-center">
              <ClerkUserButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
