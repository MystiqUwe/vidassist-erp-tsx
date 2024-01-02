import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
  );

  export async function PATCH(
    req: Request,
  ) {
    try {
      const { ...values } = await req.json();
        console.log("values", values);

      if (values.videoUrl) {
       /* const existingMuxData = await db.muxData.findFirst({
          where: {
            chapterId: params.chapterId,
          }
        });*/
  
       /* if (existingMuxData) {
          await Video.Assets.del(existingMuxData.assetId);
          await db.muxData.delete({
            where: {
              id: existingMuxData.id,
            }
          });
        }*/
  
        const asset = await Video.Assets.create({
          input: values.videoUrl,
          playback_policy: "public",
          test: false,
        });

        console.log("asset", asset);
  
       /* await db.muxData.create({
          data: {
            chapterId: params.chapterId,
            assetId: asset.id,
            playbackId: asset.playback_ids?.[0]?.id,
          }
        });*/
      }
  
      return NextResponse.json("Created!", {status: 201});
    } catch (error) {
      console.log("[PROCESS_VIDEO]", error);
      return new NextResponse("Internal Error", { status: 500 }); 
    }
  }