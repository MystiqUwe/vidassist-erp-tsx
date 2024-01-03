import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";
import { createCourse } from "../actions/video-actions";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function PATCH(
  req: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { ...values } = await req.json();

    /* const createResult = await createCourse({
      title: values.title,
      description: values.description,
      chapterId: params?.chapterId,
    });*/

    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.log("[PROCESS_VIDEO]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
