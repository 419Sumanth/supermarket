import { createContext, useContext, useEffect, useState } from "react";
import productApi from "../api/productApi";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productApi.getAll();
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (data) => {
    await productApi.create(data);
    fetchProducts();
  };

  const updateProduct = async (id, data) => {
    await productApi.update(id, data);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await productApi.remove(id);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
