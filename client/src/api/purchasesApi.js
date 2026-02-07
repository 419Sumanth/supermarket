import instance from "./axios";
 
const purchasesApi = {
  getMyPurchases() {
    return instance.get("/purchases/getPurchasesByUserId");
  },

  addPurchase(data) {
    return instance.post("/purchases/add", data);
  },
};

export default purchasesApi;
