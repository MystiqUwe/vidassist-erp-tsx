"use client";

import axios from "axios";

import MainRating from "@/components/rating/main-rating";
import MuxPlayerWrapper from "./mux-player";
import { useState } from "react";

const VideoWrapper = ({
  playbackId,
  categoryId,
  courseId,
}: {
  playbackId: string;
  categoryId: string;
  courseId: string;
}) => {
  const [ratingContent, setRatingContent] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const onVideoEnded = async () => {
    const result = await axios.patch(`/api/process-videos/rating`, {
      categoryId: categoryId,
    });
    console.log("result", result);
    if (result && result.status >= 200 && result.status <= 300) {
      setRatingContent(result.data);
      setIsDisabled(false);
    }
  };

  return (
    <>
      <MuxPlayerWrapper ended={onVideoEnded} playbackId={playbackId} />
      <MainRating
        playbackId={playbackId}
        isDisabled={isDisabled}
        items={ratingContent}
        courseId={courseId}
      />
    </>
  );
};

export default VideoWrapper;
