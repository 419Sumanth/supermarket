import axios from "./axios";

const authApi = {
  login(data) {
    return axios.post("/auth/login", data);
  },

  register(data) {
    return axios.post("/auth/register", data);
  },
};

export default authApi;
