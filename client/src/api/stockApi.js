import api from "./axios";

const stockApi = {
  getAll: () => api.get("/stock"),
  lowStock: () => api.get("/stock/low"),
  update: (id, data) => api.put(`/stock/${id}`, data),
};

export default stockApi;
