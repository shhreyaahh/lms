import { defineField, defineType } from "sanity";

export const enrollmentType = defineType({
  name: "enrollment",
  title: "Enrollment",
  type: "document",

  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
    }),

    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
    }),

    defineField({
      name: "completedLessons",
      title: "Completed Lessons",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "enrolledAt",
      title: "Enrolled At",
      type: "datetime",
    }),
  ],
});