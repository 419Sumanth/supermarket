import axios from "./axios";
import instance from "./axios";

const authApi = {
  login(data) {
    return axios.post("/auth/login", data);
  },

  register(data) {
    return axios.post("/auth/register", data);
  },

  getProfile(){
    return instance.get("/auth/profile");
  }
};

export default authApi;
