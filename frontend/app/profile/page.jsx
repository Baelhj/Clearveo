"use client";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/profile/layout";
import { createPly, getPlys } from "@/api/plyvid";

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

  console.log(playlists);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPly(name, desc);
      const updatedPlaylists = await getPlys();
      if (updatedPlaylists) setPlaylists(updatedPlaylists);
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

      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <p>{playlist.name}</p>
            <p>{playlist.desc}</p>
            <br />
          </li>
        ))}
      </ul>
    </>
  );
};

export default page;
