"use server";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";

export async function getProducerCourses(userId: string) {
  console.log("userId", userId);
  const supabase = await createSupbaseServerClient();
  const { data: courses, error } = await supabase
    .from("courses")
    .select(
      `
   *,
    videos (
      courseId,
      assetId,
      playbackId
    )
  `
    )
    .eq("userId", userId);
  return courses;
}
