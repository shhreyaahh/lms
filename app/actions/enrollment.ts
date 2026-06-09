"use server";

import { auth } from "@clerk/nextjs/server";
import { createEnrollment } from "@/sanity/lib/enrollment";
import {
  getEnrollment,
  markLessonComplete,
} from "@/sanity/lib/enrollment";

export async function enrollInCourse(courseId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  await createEnrollment(userId, courseId);
}

export async function completeLesson(
  courseId: string,
  lessonTitle: string,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const enrollment = await getEnrollment(
    userId,
    courseId,
  );

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  await markLessonComplete(
    enrollment._id,
    lessonTitle,
  );
}