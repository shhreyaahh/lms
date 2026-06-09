import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import { getEnrolledCourses } from "@/sanity/lib/enrollment";

export default async function MyLearningPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const enrollments = await getEnrolledCourses(userId);

  return (
    <main className="min-h-screen text-(--foreground)">
      {/* Hero */}
      <section className="mt-8 mb-8 border-2 border-(--border-color) bg-(--secondary) px-10 py-16">
        <p className="text-(--soft-text) text-sm uppercase tracking-wider">
          My Learning
        </p>

        <h1 className="mt-3 text-3xl font-bold md:text-4xl">
          Continue Your Learning Journey
        </h1>

        <p className="mt-4 max-w-2xl text-(--muted-text)">
          Track your enrolled courses, resume lessons, and monitor your learning
          journey.
        </p>
      </section>

      {/* Empty State */}
      {enrollments.length === 0 ? (
        <section className="border border-(--border-color) bg-(--secondary) p-12 text-center">
          <h2 className="text-2xl font-semibold">No Courses Yet</h2>

          <p className="mx-auto mt-4 max-w-xl text-(--muted-text)">
            You haven't enrolled in any courses yet.
          </p>

          <Link
            href="/explore"
            className="mt-8 inline-block bg-(--foreground) px-6 py-3 font-semibold text-(--background) transition hover:opacity-90"
          >
            Explore Courses →
          </Link>
        </section>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enrollment: any) => (
            <Link
              key={enrollment._id}
              href={`/learn/${enrollment.course.slug}`}
              className="border border-(--border-color) bg-(--secondary) p-6 transition hover:border-(--foreground)"
            >
              <p className="text-sm text-(--soft-text)">
                {enrollment.course.category}
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {enrollment.course.title}
              </h2>

              <p className="mt-3 text-sm text-(--muted-text)">
                {enrollment.course.instructor}
              </p>

              <div className="mt-6">
                <span className="text-sm font-medium">Continue Learning →</span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
