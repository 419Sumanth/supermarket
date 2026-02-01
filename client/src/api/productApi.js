import axios from "./axios";

const productApi = {
  getAll() {
    return axios.get("/products");
  },

  create(data) {
    return axios.post("/products", data);
  },

  remove(id) {
    return axios.delete(`/products/${id}`);
  },
};

export default productApi;
