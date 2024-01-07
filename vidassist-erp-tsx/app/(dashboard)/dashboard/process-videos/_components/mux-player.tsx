"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";

const MuxPlayerWrapper = ({
  playbackId,
  ended,
}: {
  playbackId: string;
  ended: () => void;
}) => {
  return (
    <MuxPlayer
      loading="viewport"
      streamType="on-demand"
      style={{ width: "100%" }}
      playbackId={playbackId}
      metadata={{ player_name: "with-mux-video" }}
      onEnded={ended}
    />
  );
};

export default MuxPlayerWrapper;
