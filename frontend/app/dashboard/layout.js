"use client";

import React, { useState, useEffect, createContext } from "react";
import { verifyToken, refreshToken } from "@/api/auth";
import { useRouter } from "next/navigation";

export const UserContext = createContext();

const DashboardLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const userData = await verifyToken(token);
        setUserData(userData);
        console.log(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("error verifying token: ", error);

        // attempt to refresh the token
        const refreshTokenFromStorage = localStorage.getItem("refresh_token");

        if (refreshTokenFromStorage) {
          try {
            console.log("attempting to refresh token", token);

            const newAccessToken = await refreshToken();
            const userData = await verifyToken(newAccessToken);
            setUserData(userData);
            setIsAuthenticated(true);
          } catch (error) {
            console.log(
              "Error refreshing token or verifying new token.",
              error
            );
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            router.push("/login");
          }
        } else {
          console.log("we didn't find the token ):");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <UserContext.Provider value={userData}>
      <div>{children}</div>
    </UserContext.Provider>
  ) : null;
};

export default DashboardLayout;
