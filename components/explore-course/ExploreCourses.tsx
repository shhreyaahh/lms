"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CourseCard from "@/components/course/CourseCard";

type Course = {
  _id: string;
  slug?: string;
  title: string;
  instructor: string;
  priceType?: string;
  price?: number;
  description?: string;
};

export default function CoursesCarousel({ courses }: { courses: Course[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;

    if (!el) return;

    setShowLeft(el.scrollLeft > 0);

    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    checkScroll();

    el.addEventListener("scroll", checkScroll);

    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full mt-16">
      <h2 className="text-4xl font-bold text-(--foreground) mb-10">
        Explore Courses
      </h2>

      <div className="relative">
        {/* LEFT BUTTON */}
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              z-20
              p-3
              rounded-none
              bg-(--hover-bg)
              border

              border-(--border-color)
              text-(--foreground)
              hover:bg-white/20
              transition
            "
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* CAROUSEL */}
        <div
          ref={scrollRef}
          className="
            flex
            gap-6
            overflow-x-auto
            scroll-smooth
            w-full
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            scrollbar-none
          "
        >
          {courses.map((course) => (
            <CourseCard
    key={course._id}
    course={course}
  />
          ))}
        </div>

        {/* RIGHT BUTTON */}
        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="
              absolute
              right-0
              top-1/2
              -translate-y-1/2
              z-20
              p-3
              rounded-none
              bg-(--hover-bg)
              border

              border-(--border-color)

              text-(--foreground)
              hover:bg-white/20
              transition
            "
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </section>
  );
}
