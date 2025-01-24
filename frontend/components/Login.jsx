"use client";

import React, { useState, useEffect } from "react";
import { login } from "@/api/auth"; // Import register function
import { useRouter } from "next/navigation"; // Use Next.js Router

const Login = () => {
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      router.push("/dashboard");
    }
  }, []);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      const { access, refresh } = data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      alert("login successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("There was an error during login!", error);
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
