"use client";

import React, { useState, useEffect } from "react";
import { register } from "@/api/auth"; // Import register function
import { useRouter } from "next/navigation"; // Use Next.js Router

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

   useEffect(() => {
      const token = localStorage.getItem("access_token");
  
      if (token) {
        router.push("/dashboard");
      }
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert("User registered successfully!");
      router.push("/login");
    } catch (error) {
      console.error("There was an error during registration:", error);
      alert("Error during signup!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
      <p>
        You already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default Signup;
