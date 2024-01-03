"use client";

import MuxPlayer from "@mux/mux-player-react";

const MuxPlayerWrapper = ({ playbackId }: { playbackId: string }) => {
  return (
    <MuxPlayer
      streamType="on-demand"
      style={{ width: "100%" }}
      playbackId={playbackId}
      metadata={{ player_name: "with-mux-video" }}
    />
  );
};

export default MuxPlayerWrapper;
