import { readUserSession } from "@/lib/actions";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {

    const { data: userSession } = await readUserSession();

    if (!userSession.session) {
        throw new Error("Unauthorized");
    }

    return { userSession };
  }

export const ourFileRouter = {
    image: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .onUploadComplete(() => {}),
        processVideo: f({ video: { maxFileCount: 1, maxFileSize: "2GB" } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;