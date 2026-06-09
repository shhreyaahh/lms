import { notFound } from "next/navigation";

import { getCourseBySlug } from "@/sanity/lib/course";
import CourseContent from "./CourseContent";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseContent course={course} />;
}
