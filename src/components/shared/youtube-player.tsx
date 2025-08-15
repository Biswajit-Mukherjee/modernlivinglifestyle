/** This is a client component that embeds Youtube videos */

"use client";

import * as React from "react";
import YouTube, { YouTubeEvent, type YouTubeProps } from "react-youtube";

type Props = YouTubeProps & Readonly<{ videoId: string }>;

export const YouTubePlayer: React.FC<Props> = ({ videoId }) => {
  // Set up event handlers
  const onReady = (event: YouTubeEvent<unknown>) => {
    // Access the player instance
    const player = event.target;

    // Automatically pause the video on render
    player.pauseVideo();
  };

  // Log error to console
  const onError = (error: unknown) => {
    console.error("YouTube Player Error:", error);
  };

  return <YouTube videoId={videoId} onReady={onReady} onError={onError} />;
};
