"use client";

import React, { useState, useEffect } from "react";
import { getPly, createVid, getVids } from "@/api/plyvid";
import Link from "next/link";

const page = ({ params }) => {
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);

  const { playlistId } = React.use(params);

  const [url, setUrl] = useState("");

  // getting video id from the url


  // getting videos

  const fetchVideos = async () => {
    const videoData = await getVids(playlistId);
    videoData
      ? setVideos(videoData)
      : console.log("problem getting video data");
    console.log(videoData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idv = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11,})/);
    const link_video_id = idv[1]
    
    const position = videos?.length + 1 || 1;
    
    try {
      const response = await createVid(playlistId, url, position, link_video_id);
      const newVideo = { id: Date.now(), playlistId, url, position, link_video_id};
      setVideos((prev) => [...prev, newVideo]);
      console.log(response);

      setUrl("");
      console.log("successfully created the video!!");
      await fetchVideos();
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
      fetchVideos();
    }
  }, [playlistId]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  console.log("Videos Data:", videos);
  

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

      {/* Getting videos */}

      <section id="videos-of-playlist">
        <br />
        <h2>Videos</h2>
        <br />

        {videos.length > 0 ? (
          <ul>
            {videos.map((video) => (
              <Link key={video.link_video_id} href={`/profile/${playlist.id}/${video.link_video_id}`}>
                <li>
                  <p>{video.url}</p>
                  <p>{video.position}</p>
                  <p>{video.link_video_id || 'nothing'}</p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No videos yet! Creat one +</p>
        )}
      </section>
    </>
  );
};

export default page;
