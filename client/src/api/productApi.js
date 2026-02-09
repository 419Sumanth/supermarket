import instance from "./axios";

const productApi = {
    getAllProducts(){
      return instance.get("/products/");
    },

    addProduct(productData){
      return instance.post("/products/add", productData);
    },
    getTotalProductCount(){
      return instance.get("/products/count");
    }
};

export default productApi;  