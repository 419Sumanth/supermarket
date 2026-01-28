import api from "./axios";

// LOGIN
const login = (data) => api.post("/auth/login", data);

// REGISTER
const register = (data) => api.post("/auth/register", data);

// GET USER PROFILE
const getProfile = () => api.get("/users/me");

// UPDATE USER PROFILE
const updateProfile = (data) => api.put("/users/me", data);

export default {
  login,
  register,
  getProfile,
  updateProfile,
};
