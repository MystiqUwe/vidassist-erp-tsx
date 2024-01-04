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
