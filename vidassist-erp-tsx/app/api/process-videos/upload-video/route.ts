import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function PATCH(req: Request) {
  try {
    const { ...values } = await req.json();
    if (values.videoUrl) {
      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      return JSON.stringify(asset);
    }
  } catch (error) {}
}
