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

    const { data: latestPosition } = await supabase
      .from("rating_criteria")
      .select("position")
      .order("position", { ascending: false })
      .limit(1)
      .eq("rating_schema_id", values.rating_schema_id)
      .single();

    const newPosition = latestPosition?.position
      ? latestPosition.position + 1
      : 1;

    const data = {
      ...values,
      createdBy: userSession.session?.user.id,
      position: newPosition,
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
