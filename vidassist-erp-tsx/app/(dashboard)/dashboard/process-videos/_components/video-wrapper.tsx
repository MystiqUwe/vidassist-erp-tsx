"use client";

import axios from "axios";

import MainRating from "@/components/rating/main-rating";
import MuxPlayerWrapper from "./mux-player";
import { useState } from "react";

const VideoWrapper = ({
  playbackId,
  categoryId,
}: {
  playbackId: string;
  categoryId: string;
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
      <MainRating isDisabled={isDisabled} items={ratingContent} />
    </>
  );
};

export default VideoWrapper;
