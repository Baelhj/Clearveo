import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth";

// verify token
export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to register a user (Sign Up)
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/signup/`,
      {
        username,
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to log in a user

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Login error: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  console.log("trying to refresh a token");

  if (!refreshToken) {
    throw new Error("no refresh token found!");
  }

  try {
    const response = await axios.post(`${API_URL}/refresh/`, {
      refresh: refreshToken,
    });

    const { access } = response.data;
    localStorage.setItem("access_token", access);
    return access;
  } catch (error) {
    throw error;
  }
};
