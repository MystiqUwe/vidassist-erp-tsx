"use server";

import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";

export async function getRatingSchemas() {
  const supabase = await createSupbaseServerClient();

  const { data: ratingSchemas, error } = await supabase.from("rating_schema")
    .select(`
    id,
    title,
    rating_criteria (
      id,
      name,
      description
    ),
    categories (
      id,
      name
    )
  `);
  return { ratingSchemas, error };
}

export async function createRatingSchema(values: {
  title: string;
  categoryId: string;
}) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.id) {
    const supabase = await createSupabaseAdmin();
    const data = { ...values, createdBy: userSession.session?.user.id };
    const { data: ratingSchema, error } = await supabase
      .from("rating_schema")
      .insert(data)
      .select()
      .single();
    return { ratingSchema, error };
  } else {
    return {
      ratingCriterias: null,
      error: "Error creating rating criteria - no session",
    };
  }
}

export async function deleteRatingSchema(schemaId: string) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.id) {
    const supabase = await createSupabaseAdmin();
    const { data: ratingSchema, error } = await supabase
      .from("rating_schema")
      .delete()
      .match({ id: schemaId })
      .select()
      .single();
    return { ratingSchema, error };
  } else {
    return {
      ratingCriterias: null,
      error: "Error creating rating criteria - no session",
    };
  }
}
