import { groq } from "next-sanity";

export const COURSES_QUERY = groq`
  *[_type == "course"]{
    _id,
    title,
    instructor,
    priceType,
    price,
    description,
    category,
    topic,
    level,
    "slug": slug.current,
    image
  }
`;

export const COURSE_BY_SLUG_QUERY = groq`
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    instructor,
    priceType,
    price,
    description,
    category,
    topic,
    level,
    duration,
    lessonsCount,
    lessons,
    "slug": slug.current,
    image
  }
`;

export const COURSES_BY_CATEGORY_AND_TOPIC_QUERY = groq`
  *[
    _type == "course" &&
    lower(category) == lower($category) &&
    lower(topic) == lower($topic)
  ]{
    _id,
    title,
    instructor,
    priceType,
    price,
    description,
    category,
    topic,
    level,
    "slug": slug.current,
    image
  }
`;

export const ENROLLED_COURSES_QUERY = groq`
  *[
    _type == "enrollment" &&
    userId == $userId
  ]{
    _id,
    completedLessons,
    enrolledAt,
    course->{
      _id,
      title,
      instructor,
      description,
      image,
      category,
      level,
      "slug": slug.current
    }
  }
`;