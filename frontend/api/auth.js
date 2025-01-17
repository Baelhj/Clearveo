import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api/auth";

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
