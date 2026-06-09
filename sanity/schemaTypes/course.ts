import { defineField, defineType } from "sanity";

export const courseType = defineType({
  name: "course",
  title: "Course",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),

    defineField({
      name: "instructor",
      title: "Instructor",
      type: "string",
    }),

    defineField({
      name: "priceType",
      title: "Price Type",
      type: "string",
      options: {
        list: [
          { title: "Free", value: "free" },
          { title: "Paid", value: "paid" },
        ],
      },
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),

    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
    }),

    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
      },
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),

    defineField({
      name: "lessonsCount",
      title: "Lessons Count",
      type: "number",
    }),

    defineField({
      name: "lessons",
      title: "Lessons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
            },
            {
              name: "duration",
              type: "string",
            },
            {
              name: "type",
              type: "string",
              options: {
                list: [
                  { title: "Video", value: "video" },
                  { title: "Article", value: "article" },
                ],
              },
            },
            {
              name: "videoUrl",
              type: "url",
            },
            {
              name: "content",
              type: "text",
            },
          ],
        },
      ],
    }),
  ],
});
