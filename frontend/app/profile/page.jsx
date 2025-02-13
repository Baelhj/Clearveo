"use client";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/profile/layout";
import { createPly, getPlys } from "@/api/plyvid";
import Link from "next/link";

const page = () => {
  const userData = useContext(UserContext);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await getPlys();
      data ? setPlaylists(data) : console.log("problem getting data");
    };

    fetchPlaylists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPly(name, desc);
      const newPlaylist = { id: Date.now(), name, desc };
      setPlaylists((prev) => [...prev, newPlaylist]);
      console.log(playlists);

      setName("");
      setDesc("");

      console.log("Playlist Created successfully!");
    } catch (error) {
      console.log("Problem Creating a playlist :(", error);
    }
  };
  

  return (
    <>
      <div>
        <h1>
          Welcome to your dashboard, {userData ? userData.username : "User"}
        </h1>
        <p>Your personalized data goes here.</p>
      </div>

      {/* form to create playlists */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a playlist name"
          className="mx-0 my-auto border-rose-400"
        />

        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">Create</button>
      </form>

      {/* list the playlists */}

      <br />
      <h2>Playlists</h2>
      <br />

      {playlists.length > 0 ? (
        <ul>
          {playlists.map((playlist) => (
            <Link href={`/profile/${playlist.id}`}>
            <li key={playlist.id}>
              <p>{playlist.name}</p>
              <p>{playlist.desc}</p>
              <br />
            </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No playlists yet. create one!</p>
      )}
    </>
  );
};

export default page;
