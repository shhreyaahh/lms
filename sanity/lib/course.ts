import { client } from "./client";
import { COURSE_BY_SLUG_QUERY, COURSES_QUERY,  COURSES_BY_CATEGORY_AND_TOPIC_QUERY, } from "./queries";


export async function getCourses() {
  return await client.fetch(COURSES_QUERY);
}

export async function getCourseBySlug(slug: string) {
  return await client.fetch(COURSE_BY_SLUG_QUERY, { slug });
}

export async function getCoursesByCategoryAndTopic(
  category: string,
  topic: string
) {
  return await client.fetch(
    COURSES_BY_CATEGORY_AND_TOPIC_QUERY,
    {
      category,
      topic,
    }
  );
}

