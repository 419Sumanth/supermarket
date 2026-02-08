import instance from "./axios";
 
const stockApi = {
  getLowStockItems() {
    return instance.get("/stock/getlowstockitems");
  },

  getLowStockCount() {
    return instance.get("/stock/getlowstockcount"); 
  },
};

export default stockApi;
