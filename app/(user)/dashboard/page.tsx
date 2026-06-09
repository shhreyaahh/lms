import ExploreCourses from "@/components/explore-course/ExploreCourses";
import { getCourses } from "@/sanity/lib/course";

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen text-(--foreground)">
      {/* Welcome Section */}
      <section className="border-2 border-(--border-color) bg-(--secondary) px-10 py-16 mt-8 mb-8">
        <p className="text-(--soft-text) text-sm uppercase tracking-wider">
          Dashboard
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-3">
          Welcome Back 👋
        </h1>

        <p className="text-(--muted-text) mt-4 max-w-2xl">
          Continue learning, explore new courses, and keep building your skills.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="/my-learning"
            className="bg-(--foreground) text-(--background) px-6 py-3 rounded-xl font-semibold"
          >
            My Learning
          </a>

          <a
            href="/explore"
            className="border border-(--border-color) px-6 py-3 rounded-xl hover:bg-(--hover-bg) transition"
          >
            Explore Courses
          </a>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid gap-6 md:grid-cols-3 mb-10">
        <div className="border border-(--border-color) bg-(--secondary) p-6">
          <p className="text-(--soft-text)">Courses Enrolled</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="border border-(--border-color) bg-(--secondary) p-6">
          <p className="text-(--soft-text)">Completed</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="border border-(--border-color) bg-(--secondary) p-6">
          <p className="text-(--soft-text)">Hours Learned</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>
      </section>

      {/* Explore Courses */}
      <section className="pb-20">
        <h2 className="text-2xl font-bold mb-6">
          Recommended For You
        </h2>

        <ExploreCourses courses={courses} />
      </section>
    </main>
  );
}