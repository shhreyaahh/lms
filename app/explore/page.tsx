import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getExploreData } from "@/sanity/lib/explore";

export default async function ExplorePage() {
  type CourseCategory = {
    category: string;
  };

  const courses: CourseCategory[] = await getExploreData();

  const categories = [
    ...new Set(
      courses
        .map((course) => course.category)
        .filter(Boolean),
    ),
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold text-(--foreground)">Explore Categories</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/explore/${encodeURIComponent(category)}`}
            className="
            rounded-xl
        border
        border-(--border-color)
        bg-(--secondary)
        p-6
        text-(--soft-text)
        transition-all
        hover:bg-(--hover-bg)
        hover:text-(--foreground)
        "
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
