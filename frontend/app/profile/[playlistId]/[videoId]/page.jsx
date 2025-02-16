"use client";

import React, { useState, useEffect } from "react";
import { getVid } from "@/api/plyvid";
import Link from "next/link";

const page = ({params}) => {

  const [video, setVideo] = useState()


  const { playlistId, videoId } = React.use(params);

  const fetchVideo = async () => {
      const data = await getVid(playlistId, videoId);
      setVideo(data);
      console.log("Updated Video:", data);
    };

  useEffect(() => {
      if (videoId) {
        fetchVideo();
      }
    }, [videoId]);

  return (
    <>
    <h1>hi {videoId} and this is {playlistId}</h1>
    </>
  )
}

export default page