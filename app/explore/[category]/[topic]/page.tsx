import Link from "next/link";

import { getCoursesByCategoryAndTopic } from "@/sanity/lib/course";
import CourseCard from "@/components/course/CourseCard";

export default async function TopicPage({
  params,
}: {
  params: Promise<{
    category: string;
    topic: string;
  }>;
}) {
  const { category, topic } = await params;

  const courses =
    await getCoursesByCategoryAndTopic(
      decodeURIComponent(category),
      decodeURIComponent(topic)
    );

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-bold text-(--foreground)">
        {decodeURIComponent(topic)}
      </h1>

      <p className="mb-10 text-(--soft-text)">
        {courses.length} course(s) found
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((course: any) => (
          <CourseCard
  key={course._id}
  course={course}
/>
        ))}
      </div>
    </div>
  );
}