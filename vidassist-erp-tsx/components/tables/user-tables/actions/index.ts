"use server"

import { createSupbaseServerClient } from "@/lib/supabase";
import { unstable_noStore } from "next/cache";

export async function readMembers() {

	unstable_noStore();
	const supabase = await createSupbaseServerClient();
	return await supabase.from("permissions").select("*, users(*)");

}