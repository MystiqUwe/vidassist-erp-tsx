import { createRatingCriteria } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { ...values } = await req.json();
    if (values) {
      const { ratingCriteria, error: ratingCriteriaError } =
        await createRatingCriteria(values);
      console.log("ratingCriteria", ratingCriteria);
      if (!ratingCriteriaError) {
        return new NextResponse(JSON.stringify(ratingCriteria));
      } else {
        console.log("ratingCriteriaError", ratingCriteriaError);
        return new NextResponse("Error creating criteria", { status: 500 });
      }
    } else {
      return new NextResponse("No values provided", { status: 400 });
    }
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
