import axios from "axios";

const token = localStorage.getItem("access_token");

// url for Django api
const API_URL = "http://127.0.0.1:8000/api/p";

// axios instance with default settings

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

/// API Playlist Section ///

// Creating a playlist
export const createPly = async (name, desc) => {
  try {
    const response = await api.post(`/playlists/`, { name, desc });
    return response.data;
  } catch (error) {
    console.error("problem creating a playlist ", error);
  }
};

// Getting all the playlists to be listed
export const getPlys = async () => {
  try {
    const response = await api.get(`/playlists/`);
    return response.data;
  } catch (error) {
    console.error("problem getting and listing the playlists ", error);
  }
};

// Getting a single playlist when clicked
export const getPly = async (id) => {
  try {
    const response = await api.get(`/playlists/${id}`);
    return response.data;
  } catch (error) {
    console.error("problem getting a playlist ", error);
  }
};

// Updating the playlist
export const updatePly = async (id, name, desc) => {
  try {
    const response = await api.put(`/playlists/${id}`, { name, desc });
    return response.data;
  } catch (error) {
    console.error("problem updating a playlist ", error);
  }
};

// Deleting the playlist
export const deletePly = async (id) => {
  try {
    const response = await api.delete(`/playlists/${id}`);
    return response.data;
  } catch (error) {
    console.error("problem creating a playlist ", error);
  }
};

/// API Videos Section ///

// Creating a video
export const createVid = async (playlistId, url, position, link_video_id) => {
  try {
    const response = await api.post(`/playlists/${playlistId}/videos/`, {
      url,
      position,
      link_video_id,
    });
    return response.data;
  } catch (error) {
    console.error("problem creating the video ", error);
  }
};

// Getting all the videos to be listed
export const getVids = async (playlistId) => {
  try {
    const response = await api.get(`/playlists/${playlistId}/videos/`);
    return response.data;
  } catch (error) {
    console.error("problem getting and listing the videos ", error);
    return [];
  }
};

// Getting a single video when clicked
export const getVid = async (playlistId, videoId) => {
  try {
    const response = await api.get(`/playlists/${playlistId}/videos/by-link/${videoId}/`);
    return response.data;
  } catch (error) {
    console.error("problem getting a video ", error);
  }
};

// Updating the video
export const updateVid = async (playlistId, videoId, url, position) => {
  try {
    const response = await api.put(`/playlists/${playlistId}/videos/${videoId}/`, {
      url,
      position,
    });
    return response.data;
  } catch (error) {
    console.error("problem updating a video ", error);
  }
};

// Deleting the video
export const deleteVid = async (playlistId, videoId) => {
  try {
    const response = await api.delete(`/playlists/${playlistId}/videos/${videoId}/`);
    return response.data;
  } catch (error) {
    console.error("problem creating a video ", error);
  }
};
