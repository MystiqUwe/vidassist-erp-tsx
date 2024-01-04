"use server";

import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";

export async function createChapter(data: {
  videoUrl: string;
  assetId: string;
  playbackId: string | undefined;
}) {
  /*const {data: userSession} = await readUserSession();
	if(userSession.session?.user.user_metadata.role !== "admin"){
		return JSON.stringify({error: {message: "You are not authorized to create a member"}});
	}*/

  const supabase = await createSupabaseAdmin();

  const createResult = await supabase
    .from("chapters")
    .insert({
      assetId: data.assetId,
      videoUrl: data.videoUrl,
      playbackId: data.playbackId,
    })
    .select();

  if (!createResult.error?.message) {
    return JSON.stringify(createResult);
  }
  return JSON.stringify({ message: "Error creating chapter" });
}

export async function createCourse(data: {
  title: string;
  description: string;
  categoryId: string;
}) {
  if (data.title) {
    const { data: userSession } = await readUserSession();

    if (userSession.session?.user.id) {
      const supabase = await createSupabaseAdmin();
      const createResult = await supabase
        .from("courses")
        .insert({
          title: data.title,
          description: data.description,
          userId: userSession.session?.user.id,
          categoryID: data.categoryId,
        })
        .select();
      if (!createResult.error?.message) {
        return JSON.stringify(createResult);
      }
      return JSON.stringify({
        error: "Error creating course",
        data: JSON.stringify(createResult),
      });
    }
    return JSON.stringify({ error: "Error creating course - no session" });
  }
  return JSON.stringify({ error: "Error creating course - no chapterId" });
}

export async function createVideo(data: {
  courseId: string;
  assetId: string;
  playbackId: string | undefined;
}) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.id) {
    const supabase = await createSupabaseAdmin();
    const { data: videos, error: videosError } = await supabase
      .from("videos")
      .insert({
        courseId: data?.courseId || "",
        assetId: data?.assetId || "",
        playbackId: data?.playbackId || "",
        createdBy: userSession.session?.user.id,
      })
      .select();
    if (!videosError?.message) {
      return JSON.stringify({ data: videos, error: videosError });
    }
    return JSON.stringify({ data: videos, error: videosError });
  }
  return JSON.stringify({ data: [], error: { message: "No User session" } });
}
