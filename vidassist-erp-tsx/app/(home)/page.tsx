import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  return (
    <div>
      <h1>Build Dashboard with role access using Next.js + Supabase </h1>
    </div>
  );
}
