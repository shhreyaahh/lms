"use client";

import { useState, useEffect } from "react";
import StartLearningButton from "@/components/StartLearningButton";

type Lesson = {
  _key: string;
  title: string;
  duration: string;
  type: "video" | "article";
  videoUrl?: string;
  content?: string;
};

type Course = {
  title: string;
  instructor: string;
  description: string;
  lessons: Lesson[];
};

export default function CourseContent({ course }: { course: Course }) {
  const lessons = course.lessons ?? [];

  const [activeLesson, setActiveLesson] = useState<Lesson | undefined>(
    lessons[0],
  );

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const progress =
    lessons.length > 0
      ? Math.round((completedLessons.length / lessons.length) * 100)
      : 0;

  const [canCompleteVideo, setCanCompleteVideo] = useState(false);
  const handleVideoProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;

    if (!video.duration) return;

    const watched = (video.currentTime / video.duration) * 100;

    if (watched >= 97) {
      setCanCompleteVideo(true);
    }
  };

  useEffect(() => {
    setCanCompleteVideo(false);
  }, [activeLesson]);

  return (
    <section className="mt-16 pb-20">
      <div
        className="
          overflow-hidden
          border
          border-(--border-color)
          bg-(--secondary)
        "
      >
        <div className="h-72 bg-(--background)" />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-(--foreground)">
            {course.title}
          </h1>

          <p className="mt-3 text-(--soft-text)">
            Instructor:
            <span className="ml-2 text-(--foreground)">
              {course.instructor}
            </span>
          </p>

          <p className="mt-6 max-w-3xl leading-8 text-(--muted-text)">
            {course.description}
          </p>
        </div>
      </div>

      <div
        className="
          mt-10
          grid
          gap-8
          lg:grid-cols-[1fr_340px]
        "
      >
        <div
          className="
            border
            border-(--border-color)
            bg-(--secondary)
            p-6
          "
        >
          {activeLesson?.type === "video" && (
            <div
              className="
                overflow-hidden
                border
                border-(--border-color)
                bg-black
              "
            >
              <video
                controls
                onTimeUpdate={handleVideoProgress}
                className="
                  aspect-video
                  w-full
                  object-cover
                "
              >
                <source src={activeLesson.videoUrl} type="video/mp4" />
              </video>
            </div>
          )}

          <h2 className="mt-6 text-2xl font-semibold text-(--foreground)">
            {activeLesson?.title}
          </h2>

          <div className="mt-4">
            <button
              disabled={activeLesson?.type === "video" && !canCompleteVideo}
              className={`px-4 py-2 text-white ${
                activeLesson?.type === "video" && !canCompleteVideo
                  ? "cursor-not-allowed bg-gray-500"
                  : "bg-(--primary)"
              }`}
              onClick={() => {
                if (
                  activeLesson &&
                  !completedLessons.includes(activeLesson.title)
                ) {
                  setCompletedLessons((prev) => [...prev, activeLesson.title]);
                }
              }}
            >
              {activeLesson?.type === "video" && !canCompleteVideo
                ? "Mark as Complete"
                : "Mark as Complete"}
            </button>
          </div>

          {activeLesson?.type === "article" && (
            <article className="prose prose-invert mt-6 max-w-none text-(--foreground)">
              {activeLesson.content}
            </article>
          )}
        </div>

        <div
          className="
            h-fit
            border
            border-(--border-color)
            bg-(--secondary)
            p-6
          "
        >
          <h3 className="text-xl font-semibold text-(--foreground)">
            Course Content
          </h3>

          <div className="mt-6 space-y-3">
            {lessons.map((lesson) => (
              <button
                key={lesson.title}
                onClick={() => setActiveLesson(lesson)}
                className={`
      w-full
      border
      border-(--border-color)
      p-4
      text-left
      transition
      ${
        activeLesson?.title === lesson.title
          ? "border-(--active-border) bg-(--active-bg)"
          : "bg-transparent hover:bg-(--hover-bg)"
      }
    `}
              >
                <div className="flex items-center gap-2">
                  <p className="font-medium text-(--foreground)">
                    {lesson.title}
                  </p>

                  {completedLessons.includes(lesson.title) && (
                    <span className="text-green-500">✓</span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="text-(--soft-text)">{lesson.duration}</span>

                  <span className="text-(--muted-text)">•</span>

                  <span className="capitalize text-(--soft-text)">
                    {lesson.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
