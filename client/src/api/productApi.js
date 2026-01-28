import api from "./axios";

const productApi = {
  getAll: () => api.get("/products"),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
};

export default productApi;
