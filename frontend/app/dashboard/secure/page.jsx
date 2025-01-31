"use client";

import { useState, useEffect } from 'react';
import {
  createPly,
  getPlys,
  getPly,
  updatePly,
  deletePly,
  createVid,
  getVids,
  updateVid,
  deleteVid
} from '@/api/plyvid'; // Adjust the path according to where you save the api.js file

export default function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [videos, setVideos] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', desc: '' });
  const [newVideo, setNewVideo] = useState({ url: '', position: 1 });
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

  // Fetch all playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await getPlys();
      if (!data) {
        console.log("no data")
      }
      setPlaylists(data);
    };
    fetchPlaylists();
  }, []);

  // Fetch videos for a specific playlist
  const fetchVideos = async (playlistId) => {
    setCurrentPlaylistId(playlistId);
    const data = await getVids(playlistId);
    setVideos(data);
  };

  // Handle creating a new playlist
  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    const { name, desc } = newPlaylist;
    const createdPlaylist = await createPly(name, desc);
    setPlaylists([...playlists, createdPlaylist]);
    setNewPlaylist({ name: '', desc: '' }); // Clear inputs
  };

  // Handle creating a new video in a specific playlist
  const handleCreateVideo = async (e) => {
    e.preventDefault();
    const { url, position } = newVideo;
    if (currentPlaylistId) {
      const createdVideo = await createVid(currentPlaylistId, url, position);
      setVideos([...videos, createdVideo]);
      setNewVideo({ url: '', position: 1 }); // Clear inputs
    }
  };

  // Handle updating a playlist
  const handleUpdatePlaylist = async (id, name, desc) => {
    const updatedPlaylist = await updatePly(id, name, desc);
    setPlaylists(playlists.map((ply) => (ply.id === id ? updatedPlaylist : ply)));
  };

  // Handle deleting a playlist
  const handleDeletePlaylist = async (id) => {
    await deletePly(id);
    setPlaylists(playlists.filter((ply) => ply.id !== id));
  };

  // Handle updating a video
  const handleUpdateVideo = async (videoId, url, position) => {
    if (currentPlaylistId) {
      const updatedVideo = await updateVid(currentPlaylistId, videoId, url, position);
      setVideos(videos.map((vid) => (vid.id === videoId ? updatedVideo : vid)));
    }
  };

  // Handle deleting a video
  const handleDeleteVideo = async (videoId) => {
    if (currentPlaylistId) {
      await deleteVid(currentPlaylistId, videoId);
      setVideos(videos.filter((vid) => vid.id !== videoId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Manage Playlists and Videos</h1>

      {/* Playlist Creation */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Create Playlist</h2>
        <form onSubmit={handleCreatePlaylist} className="space-y-2">
          <input
            type="text"
            value={newPlaylist.name}
            onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
            placeholder="Playlist Name"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={newPlaylist.desc}
            onChange={(e) => setNewPlaylist({ ...newPlaylist, desc: e.target.value })}
            placeholder="Playlist Description"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Create Playlist
          </button>
        </form>
      </div>

      {/* Playlist Listing */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Playlists</h2>
        <ul className="space-y-2">
          {playlists.map((playlist) => (
            <li key={playlist.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{playlist.name}</h3>
                <p className="text-gray-600">{playlist.desc}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => fetchVideos(playlist.id)} className="bg-green-500 text-white px-3 py-1 rounded">
                  View Videos
                </button>
                <button onClick={() => handleDeletePlaylist(playlist.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Section */}
      {currentPlaylistId && (
        <div className="bg-white p-4 shadow rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">Videos in Playlist</h2>
          <form onSubmit={handleCreateVideo} className="space-y-2">
            <input
              type="url"
              value={newVideo.url}
              onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
              placeholder="Video URL"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              value={newVideo.position}
              onChange={(e) => setNewVideo({ ...newVideo, position: Number(e.target.value) })}
              placeholder="Position"
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Create Video
            </button>
          </form>
          <ul className="mt-4 space-y-2">
            {videos.map((video) => (
              <li key={video.id} className="p-3 border rounded flex justify-between items-center">
                <div>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {video.url}
                  </a>
                  <p className="text-gray-600">Position: {video.position}</p>
                </div>
                <button onClick={() => handleDeleteVideo(video.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
