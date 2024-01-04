import { createSupbaseServerClient } from "@/lib/supabase";

export async function getCategories() {
  const supabase = await createSupbaseServerClient();
  const { data: categories, error } = await supabase.from("categories").select(
    `
       *
      `
  );
  return categories;
}

export async function getCourseData(courseId: string) {
  const supabase = await createSupbaseServerClient();
  const { data: courses, error } = await supabase
    .from("courses")
    .select(
      `
    *,
    videos(
      id,
      playbackId,
      assetId
    )
    `
    )
    .eq("id", courseId)
    .single();
  return courses;
}
