"use server";

import { readUserSession } from "@/lib/actions";
import { createSupbaseServerClient } from "@/lib/supabase";

export async function createCourse(
  data: {
    title: string;
    description: string;
  },
  chapterId: string
) {
  if (chapterId) {
    const { data: userSession } = await readUserSession();
    console.log("session", userSession.session);
    if (userSession.session?.user.id) {
      const supabase = await createSupbaseServerClient();
      const createResult = await supabase
        .from("courses")
        .insert({
          title: data.title,
          description: data.description,
          chapterId: chapterId,
          userId: userSession.session?.user.id,
          imageUrl: "",
        })
        .select();
      if (!createResult.error?.message) {
        return JSON.stringify(createResult);
      }
      return JSON.stringify({
        message: "Error creating course",
        data: JSON.stringify(createResult),
      });
    }
    return JSON.stringify({ message: "Error creating course - no session" });
  }
  return JSON.stringify({ message: "Error creating course - no chapterId" });
}
