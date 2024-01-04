"use server";
import {
  createSupabaseAdmin,
  createSupbaseServerClientReadOnly,
} from "../supabase";

export async function readUserSession() {
  const supabase = await createSupbaseServerClientReadOnly();

  return supabase.auth.getSession();
}

export async function createRatingCriteria(values: {
  name: string;
  description: string;
  rating_scale_id: string;
  categoryId: string;
}) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.id) {
    const supabase = await createSupabaseAdmin();
    const data = { ...values, createdBy: userSession.session?.user.id };
    const { data: ratingCriteria, error } = await supabase
      .from("rating_criteria")
      .insert(data)
      .select()
      .single();
    return { ratingCriteria, error };
  }
  return {
    ratingCriteria: null,
    error: "Error creating rating criteria - no session",
  };
}
