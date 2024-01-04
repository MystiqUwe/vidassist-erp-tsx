"use server";
import { randomInt } from "crypto";
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
  rating_schema_id: string;
}) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.id) {
    const supabase = await createSupabaseAdmin();
    const data = {
      ...values,
      createdBy: userSession.session?.user.id,
      position: randomInt(100),
    };
    const { data: ratingCriteria, error } = await supabase
      .from("rating_criteria")
      .insert(data)
      .select()
      .single();
    return { ratingCriteria, error };
  } else {
    return {
      ratingCriteria: null,
      error: "Error creating rating criteria - no session",
    };
  }
}
