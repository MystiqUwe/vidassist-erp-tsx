import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getProcessVideo, getRatingContent } from "../_actions/index.";
import VideoWrapper from "../_components/video-wrapper";

const ViewVideo = async ({ params }: { params: { videoId: string } }) => {
  //Retrieve Video from database
  const breadcrumbItems = [
    { title: "Process videos", link: "/dashboard/process-videos" },
    { title: "Watch", link: `dashboard/process-videos/${params.videoId}` },
  ];

  const course = await getProcessVideo(params.videoId);
  const playbackId = course?.videos[0]?.playbackId || "";

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between">
          <Heading title={"View Video"} description={"Watch the video"} />
        </div>
        <Separator />
        <VideoWrapper
          playbackId={playbackId}
          categoryId={course?.categoryID || ""}
        />
      </div>
    </>
  );
};

export default ViewVideo;
