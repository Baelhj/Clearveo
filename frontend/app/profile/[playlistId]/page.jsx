"use client";

import React, { useState, useEffect } from "react";
import { getPly } from "@/api/plyvid";

const page = ({ params }) => {
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = React.use(params);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const data = await getPly(playlistId);
      setPlaylist(data);
      console.log(playlist);
    };

    if (playlistId) {
      fetchPlaylist();
    }
  }, [playlistId]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return <div>
    <p>playlist ID: {playlistId}</p>
    <p>playlist Name: {playlist.name}</p>
    <p>playlist Description: {playlist.desc}</p>
    <p></p>
  </div>;
};

export default page;
