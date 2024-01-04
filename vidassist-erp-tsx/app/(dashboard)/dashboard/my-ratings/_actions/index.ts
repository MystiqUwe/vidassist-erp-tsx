"use server";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";

export async function getRatingCriterias() {
  const supabase = await createSupbaseServerClient();
  const { data: rating_criteria, error } = await supabase
    .from("rating_criteria")
    .select(
      `
   id,
   name,
   description
  `
    );
  return rating_criteria;
}
