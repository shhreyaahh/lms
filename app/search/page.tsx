import Link from "next/link";
import Image from "next/image";

import { getCourses } from "@/sanity/lib/course";
import { urlFor } from "@/sanity/lib/image";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  const courses = await getCourses();

  const query = q.toLowerCase();

  const filteredCourses = courses.filter(
    (course: any) =>
      course.title?.toLowerCase().includes(query) ||
      course.instructor?.toLowerCase().includes(query) ||
      course.category?.toLowerCase().includes(query) ||
      course.topic?.toLowerCase().includes(query),
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Search Results
      </h1>

      <p className="mt-3 text-(--soft-text)">
        {filteredCourses.length} result(s) for "{q}"
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course: any) => (
          <Link
            key={course._id}
            href={`/courses/${course.slug}`}
            className="
              overflow-hidden
              border
              border-(--border-color)
              bg-(--secondary)
              transition
              hover:bg-(--hover-bg)
            "
          >
            {course.image && (
              <div className="relative aspect-video">
                <Image
                  src={urlFor(course.image).url()}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-5">
              <h2 className="font-semibold">
                {course.title}
              </h2>

              <p className="mt-2 text-sm text-(--soft-text)">
                {course.category} • {course.topic}
              </p>

              <p className="mt-1 text-sm text-(--muted-text)">
                {course.instructor}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold">
            No courses found
          </h2>

          <p className="mt-3 text-(--soft-text)">
            Try searching with a different keyword.
          </p>
        </div>
      )}
    </main>
  );
}