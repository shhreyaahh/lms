import React from "react";
import ExploreCourses from "@/components/explore-course/ExploreCourses";
import { getCourses } from "@/sanity/lib/course";
import Link from "next/link";

export default async function Home() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen text-(--foreground)">
      <section className="flex flex-col px-10 py-24 border-2 mt-8 mb-8 border-(--border-color) bg-(--secondary)">
        <h2 className="text-3xl md:text-4xl font-bold max-w-3xl leading-tight">
          Learn New Skills Online
        </h2>

        <p className="text-(--muted-text) mt-6 max-w-2xl text-lg">
          Explore courses, track progress, and improve your skills with our{" "}
          <br />
          modern learning platform.
        </p>

        <Link 
        href='/sign-in'
        className="mt-10 bg-(--foreground) text-(--background) px-8 py-3 rounded-xl font-semibold hover:scale-105 transition w-fit">
          Log in to Get Started →
        </Link>
      </section>

      <section className="pb-20">
        

        <div>
          <ExploreCourses courses={courses} />
        </div>
      </section>
    </main>
  );
}
