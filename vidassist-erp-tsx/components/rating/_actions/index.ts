"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";

export async function createRatings(
  values: {
    courseId: string;
    rating_value: number;
    comment: string;
    userId: string;
  }[]
) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.id) {
    const supabase = await createSupabaseAdmin();
    const { data: ratings, error } = await supabase
      .from("ratings")
      .insert(values)
      .select();

    return { ratings, error };
  }
  return { ratings: [], error: "No user session" };
}
