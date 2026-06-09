"use client";

import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { exploreMenu } from "@/data/exploreMenu";
import { useRouter } from "next/navigation";

export default function PublicNavbar() {
  const [showExplore, setShowExplore] = useState(false);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);

  type ExploreCategory = {
    title: string;
    links: string[];
  };

  const [exploreMenu, setExploreMenu] = useState<ExploreCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<ExploreCategory | null>(
    null,
  );

  //explore menu
  useEffect(() => {
    async function loadExploreMenu() {
      const res = await fetch("/api/explore");
      const fetchedCourses = await res.json();

      setCourses(fetchedCourses);
      

      const grouped: Record<string, string[]> = {};

      fetchedCourses.forEach((course: { category: string; topic: string }) => {
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

  const suggestions =
    searchQuery.trim() === ""
      ? []
      : courses
          .filter(
            (course) =>
              course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              course.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              course.category
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()),
          )
          .slice(0, 5);

  return (
    <nav className="sticky top-0 z-50 border-b border-(--primary) bg-(--background)/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo - Left */}
          <Link
            href="/"
            className="text-2xl font-bold text-(--foreground) shrink-0"
          >
            LMS
          </Link>

          {/* Middle Section - Explore, Search, Career */}
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
            <div className="hidden md:flex relative w-150 ">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--primary) hover:text-(--foreground) transition"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                  }
                }}
                placeholder="What do you want to learn today?"
                className="w-full rounded-full border border-(--primary) bg-(--input-bg) py-2 pl-11 pr-4 text-sm outline-none hover:border-(--foreground) focus:border-(--foreground) transition text-(--foreground)"
              />
              {suggestions.length > 0 && (
                <div
                  className="
      absolute
      top-full
      mt-2
      w-full
      overflow-hidden
      border
      border-(--border-color)
      bg-(--secondary)
      shadow-lg
      z-50
    "
                >
                  {suggestions.map((course) => (
                    <button
                      key={course._id}
                      onClick={() => {
                        router.push(`/courses/${course.slug}`);
                        setSearchQuery("");
                      }}
                      className="
          block
          w-full
          px-4
          py-3
          text-left
          hover:bg-(--hover-bg)
        "
                    >
                      <div className="font-medium">{course.title}</div>

                      <div className="text-sm text-(--soft-text)">
                        {course.category} • {course.topic}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Career */}
            <button className="text-sm text-(--primary) hover:text-(--foreground)">
              Career
            </button>
          </div>

          {/* Right Section - Login & Signup */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/sign-in"
              className="text-sm text-(--primary) hover:text-(--foreground) border-(--primary) border px-4 py-2 hover:border-(--foreground)"
            >
              Login
            </Link>

            <Link
              href="/sign-up"
              className="bg-(--primary) px-4 py-2 text-sm font-medium text-(--secondary) hover:bg-(--foreground) hover:text-(--background) transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
