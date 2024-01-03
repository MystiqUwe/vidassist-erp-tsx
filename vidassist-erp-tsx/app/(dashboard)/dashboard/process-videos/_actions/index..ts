import { createSupbaseServerClient } from "@/lib/supabase";

export async function getProcessVideos() {
  const supabase = await createSupbaseServerClient();
  //Query nach allen courses
  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, title, description");
  if (!error) {
    console.log("courses", courses);
    return courses;
  }
  console.log("error", error);
  return [];
}

export async function getProcessVideo(courseId: string) {
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
    .eq("id", courseId)
    .single();
  return courses;
}
