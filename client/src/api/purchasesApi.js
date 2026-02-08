import instance from "./axios";
 
const purchasesApi = {
  getMyPurchases() {
    return instance.get("/purchases/getPurchasesByUserId");
  },

  addPurchase(data) {
    return instance.post("/purchases/add", data);
  },

  getAllPurchases(){
    return instance.get("/purchases/");
  }
};

export default purchasesApi;
