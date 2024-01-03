import Mux from "@mux/mux-node";
import { createCourse, createVideo } from "./actions/video-actions";
import { NextResponse } from "next/server";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function PATCH(req: Request) {
  try {
    const { ...values } = await req.json();
    if (values.videoUrl) {
      //Course anlegen + videos
      // Insert course data
      const { data: courses, error: courseError } = JSON.parse(
        await createCourse({
          title: values.title,
          description: values.description,
          categoryId: values.categoryId,
        })
      );

      console.log("courses", courses);
      if (!courseError) {
        const asset = await Video.Assets.create({
          input: values.videoUrl,
          playback_policy: "public",
          test: false,
        });

        if (asset) {
          const { data: videos, error: videosError } = JSON.parse(
            await createVideo({
              courseId: courses[0].id,
              assetId: asset.id,
              playbackId: asset.playback_ids?.[0]?.id,
            })
          );

          if (!videosError) {
            return new NextResponse(JSON.stringify(courses));
          } else {
            console.log("[video]", videosError);
            return new NextResponse("Error creating video record", {
              status: 500,
            });
          }
        } else {
          return new NextResponse("Error creating video asset", {
            status: 500,
          });
        }
      }
    } else {
      return new NextResponse("No video URL provided", { status: 400 });
    }
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
