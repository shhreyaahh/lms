import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCourseBySlug } from "@/sanity/lib/course";
import { urlFor } from "@/sanity/lib/image";
import StartLearningButton from "@/components/StartLearningButton";

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const pricePill =
    course.priceType === "free" ? "Free" : `₹${course.price ?? 0}`;

  return (
    <main className="pb-20">
      <section className="border-b border-(--border-color)">
        <div className="mx-auto max-w-7xl py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <div>
              {course.image ? (
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={urlFor(course.image).width(800).height(600).url()}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>

            <div className="max-w-xl">
              <p className="mb-3 text-sm text-(--soft-text)">
                {course.category ?? ""} • {course.level ?? ""}
              </p>

              <h1 className="text-5xl font-bold text-(--foreground)">
                {course.title}
              </h1>

              <p className="mt-4 text-lg text-(--soft-text)">
                Instructor: {course.instructor}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-(--soft-text)">
                  Category: {course.category}
                </span>
                <span className="text-sm font-medium text-(--soft-text)">
                  Level: {course.level}
                </span>
              </div>

              <div className="mt-6">
                <span
                  className={`mt-4 inline-block px-3 py-1 text-xs uppercase tracking-wide ${
                    course.priceType === "free"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {pricePill}
                </span>
              </div>

              <p className="mt-6 text-lg text-(--soft-text)">
                {course.description}
              </p>

              <div className="mt-8 flex gap-4">
                
                
                  <StartLearningButton
                    courseId={course._id}
                    slug={course.slug}
                  />
                
                <button
                  className="border border-(--border-color) px-6 py-3 text-(--foreground)"
                  type="button"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
