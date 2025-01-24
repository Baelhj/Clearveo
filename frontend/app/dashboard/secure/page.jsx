"use client";


import React, { useContext } from "react";
import { UserContext } from "@/app/dashboard/layout";

const page = () => {
  const userData = useContext(UserContext);

  return (
    <>
      <div>safe route</div>
      <h1>
        Welcome to your dashboard, {userData ? userData.username : "User"}
      </h1>
    </>
  );
};

export default page;
