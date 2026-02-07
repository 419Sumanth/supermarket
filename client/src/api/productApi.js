import instance from "./axios";

const productApi = {
    getAllProducts(){
      return instance.get("/products/");
    },

    addProduct(productData){
      return instance.post("/products/add", productData);
    },
};

export default productApi;  