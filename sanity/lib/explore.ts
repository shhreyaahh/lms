import { client } from "./client";

export async function getExploreData() {
  return client.fetch(`
    *[_type == "course"]{
      _id,
      title,
      "slug": slug.current,
      category,
      topic
    }
  `);
}