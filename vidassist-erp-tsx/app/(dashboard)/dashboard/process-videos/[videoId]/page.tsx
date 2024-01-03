import BreadCrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import MuxPlayer from "@mux/mux-player-react";
import { Trash } from "lucide-react";
import MuxPlayerWrapper from "../_components/mux-player";
import { getProcessVideo } from "../_actions/index.";

const ViewVideo = async ({ params }: { params: { videoId: string } }) => {
  //Retrieve Video from database
  const breadcrumbItems = [
    { title: "Process videos", link: "/dashboard/process-videos" },
    { title: "Watch", link: `dashboard/process-videos/${params.videoId}` },
  ];

  const course = await getProcessVideo(params.videoId);
  console.log("course", course);
  //let playbackId = course?.videos[0]?.playbackId;
  const playbackId = course?.videos[0]?.playbackId || "";

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between">
          <Heading title={"View Video"} description={"Watch the video"} />
        </div>
        <Separator />
        <div>
          <MuxPlayerWrapper playbackId={playbackId} />
        </div>
      </div>
    </>
  );
};

export default ViewVideo;
