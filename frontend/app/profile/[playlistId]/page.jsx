"use client";

import React, { useState, useEffect } from "react";
import { getPly, createVid } from "@/api/plyvid";

const page = ({ params }) => {
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = React.use(params);

  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const position = playlist?.videos?.length + 1 || 1;

    try {
      const response = await createVid(playlistId, url, position);
      console.log(response);

      setUrl("");
      console.log("successfully created the video!!");
      fetchPlaylist();
    } catch (error) {
      console.log("a problem creating the video -_-", error);
    }
  };
  
  const fetchPlaylist = async () => {
    const data = await getPly(playlistId);
    setPlaylist(data);
    console.log("Updated Playlist:", data);
  };

  useEffect(() => {

    if (playlistId) {
      fetchPlaylist();
    }
  }, [playlistId]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <p>playlist ID: {playlist.id}</p>
        <p>playlist Name: {playlist.name}</p>
        <p>playlist Description: {playlist.desc}</p>
        <p></p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter video url"
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default page;
