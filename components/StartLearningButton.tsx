"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { enrollInCourse } from "@/app/actions/enrollment";

export default function StartLearningButton({
  courseId,
  slug,
}: {
  courseId: string;
  slug: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await enrollInCourse(courseId);

      router.push(`/learn/${slug}`);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="bg-(--primary) px-6 py-3 text-white"
    >
      {pending ? "Loading..." : "Start Learning"}
    </button>
  );
}