"use server";

import { createSupbaseServerClient } from "@/lib/supabase";

export async function getRatingScales() {
  const supabase = await createSupbaseServerClient();
  const { data: ratingScales, error } = await supabase
    .from("rating_scale")
    .select(
      `
         *
        `
    );
  return ratingScales;
}

export async function getRatingCriteria(id: string) {
  const supabase = await createSupbaseServerClient();
  const { data: ratingCriteria, error } = await supabase
    .from("rating_criteria")
    .select(
      `
         id,
         name,
         description,
          rating_scale_id
        `
    )
    .eq("id", id)
    .single();
  return { ratingCriteria, error };
}

export async function updateRatingCriteria(values: {
  id: string;
  name: string;
  description: string;
  rating_scale_id: string;
}) {
  const supabase = await createSupbaseServerClient();
  const { data: ratingCriteria, error } = await supabase
    .from("rating_criteria")
    .update({
      name: values.name,
      description: values.description,
      rating_scale_id: values.rating_scale_id,
    })
    .eq("id", values.id)
    .select();
  return { ratingCriteria, error };
}
