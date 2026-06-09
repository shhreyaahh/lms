import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getExploreData } from "@/sanity/lib/explore";

type Course = {
  category: string;
  topic: string;
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const courses = (await getExploreData()) as Course[];

  const topics: string[] = Array.from(
    new Set(courses.map((course) => course.category)),
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        {decodeURIComponent(category)}
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic}
            href={`/explore/${encodeURIComponent(
              category,
            )}/${encodeURIComponent(topic)}`}
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
            {topic}
          </Link>
        ))}
      </div>
    </div>
  );
}
