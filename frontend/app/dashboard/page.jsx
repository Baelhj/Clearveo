"use client";



import { useContext } from "react";
import {UserContext} from '@/app/dashboard/layout'

const page = () => { 
  const userData = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to your dashboard, {userData ? userData.username : "User"}</h1>
      <p>Your personalized data goes here.</p>
    </div>
  );
};

export default page;
