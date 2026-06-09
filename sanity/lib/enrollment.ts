import { writeClient } from "./write-client";
import { auth } from "@clerk/nextjs/server";
import { client } from "./client";
import { ENROLLED_COURSES_QUERY } from "./queries";

export async function getEnrolledCourses(userId: string) {
  return client.fetch(
    ENROLLED_COURSES_QUERY,
    { userId }
  );
}

export async function getEnrollment(
  userId: string,
  courseId: string,
) {
  return client.fetch(
    `*[
      _type == "enrollment" &&
      userId == $userId &&
      course._ref == $courseId
    ][0]`,
    {
      userId,
      courseId,
    },
  );
}
export async function createEnrollment(
  userId: string,
  courseId: string,
) {
  const existing = await writeClient.fetch(
    `*[
      _type == "enrollment" &&
      userId == $userId &&
      course._ref == $courseId
    ][0]`,
    {
      userId,
      courseId,
    },
  );

  if (existing) {
    return existing;
  }

  return writeClient.create({
    _type: "enrollment",
    userId,
    enrolledAt: new Date().toISOString(),
    completedLessons: [],
    course: {
      _type: "reference",
      _ref: courseId,
    },
  });
}

export async function markLessonComplete(
  enrollmentId: string,
  lessonTitle: string,
) {
  return writeClient
    .patch(enrollmentId)
    .setIfMissing({
      completedLessons: [],
    })
    .append("completedLessons", [lessonTitle])
    .commit();
}