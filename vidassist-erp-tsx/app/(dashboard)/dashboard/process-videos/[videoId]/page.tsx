"use client";

import BreadCrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import MuxPlayer from "@mux/mux-player-react";
import { Trash } from "lucide-react";

const ViewVideo = ({ params }: { params: { videoId: string } }) => {
  //Retrieve Video from database
  const playbackId = "rNwYyVZxucSVh016aTUHZGYAh9pX00touJedopZQ5khJA";
  const breadcrumbItems = [
    { title: "Process videos", link: "/dashboard/process-videos" },
    { title: "Watch", link: `dashboard/process-videos/${params.videoId}` },
  ];
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between">
          <Heading title={"View Video"} description={"Watch the video"} />
        </div>
        <Separator />
        <div>
          <MuxPlayer
            streamType="on-demand"
            style={{ width: "100%" }}
            playbackId={playbackId}
            metadata={{ player_name: "with-mux-video" }}
          />
        </div>
      </div>
    </>
  );
};

export default ViewVideo;
