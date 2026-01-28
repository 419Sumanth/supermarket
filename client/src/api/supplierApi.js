import api from "./axios";

const supplierApi = {
  getAll: () => api.get("/suppliers"),
  create: (data) => api.post("/suppliers", data),
  update: (id, data) => api.put(`/suppliers/${id}`, data),
  remove: (id) => api.delete(`/suppliers/${id}`),
};

export default supplierApi;
