import { getRatingContent } from "@/app/(dashboard)/dashboard/process-videos/_actions/index.";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { ...values } = await req.json();
    if (values.categoryId) {
      const { ratingContent, error } = await getRatingContent(
        values.categoryId
      );
      if (!error) {
        return new NextResponse(JSON.stringify(ratingContent));
      } else {
        console.log("[getRatingContent - route]", error);
        return new NextResponse("Error getting rating content", {
          status: 500,
        });
      }
    } else {
      return new NextResponse("No categoryId provided", { status: 400 });
    }
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
