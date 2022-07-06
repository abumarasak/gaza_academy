import axios from "axios";

const API_URL = "http://localhost:5000";
const user = JSON.parse(localStorage.getItem("user"));
// Register User
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
  return response.data;
};
// Logout User
const logout = async () => {
  await axios.post(`${API_URL}/api/auth/logout`, {
    refreshToken: user.refreshToken,
  });
  localStorage.removeItem("user");
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/signin`, userData);
  if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// update user
const updateUser = async (userData) => {
  const response = await axios.put(`${API_URL}/user/${userData.id}`, userData);
  localStorage.removeItem("user");
  return response.data;
};
// Delete User
const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/user/${userId}`, {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  });
  localStorage.removeItem("user");
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  updateUser,
  deleteUser,
};
export default authService;
