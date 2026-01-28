import axios from "./axios";

const purchaseApi = {
  // Create a new purchase
  create(data) {
    return axios.post("/purchases", data);
  },

  // Get all purchases (admin)
  getAll() {
    return axios.get("/purchases");
  },

  // Get purchases for a specific supplier
  getBySupplier(supplierId) {
    return axios.get(`/purchases/supplier/${supplierId}`);
  },

  // Get purchases by logged-in user (optional)
  getMyPurchases() {
    return axios.get("/purchases/my");
  }
};

export default purchaseApi;
