import { createSupbaseServerClient } from "@/lib/supabase";

export async function getCategories() {
  const supabase = await createSupbaseServerClient();
  const { data: categories, error } = await supabase.from("categories").select(
    `
       *
      `
  );
  return categories;
}
