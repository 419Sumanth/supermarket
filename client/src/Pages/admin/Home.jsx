import React from "react";
import { useState, useEffect } from "react";
import instance from "../../api/axios";

function Home() {

  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  const getTotalProductCount = async () => {
    try {
      const res = await instance.get("/products/count");
      return res.data;
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };

  const getTotalPurchaseCount = async () => {
    try {
      const res = await instance.get("/purchases/count");
      return res.data;
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };

  const getLowStockCount = async () => {
    try {
      const res = await instance.get("/stock/getlowstockcount");
      return res.data;
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };


  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await getTotalProductCount();
        setProducts(res.count);
      } catch (error) {
        console.log("Failed to fetch product count:", error);
      }
    };

    const fetchOrdersCount = async () => {
      try {
        const res = await getTotalPurchaseCount();
        setOrders(res.count);
      } catch (error) {
        console.log("Failed to fetch purchase count:", error);
      }
    };

    const fetchLowStockCount = async () => {
      try {
        const res = await getLowStockCount();
        setLowStock(res.lowStockCount);
      } catch (error) {
        console.log("Failed to fetch low stock count:", error);
      }
    };


    fetchCount();
    fetchOrdersCount();
    fetchLowStockCount();
  }, []);

  return (
    <>
      <h4>Admin Dashboard</h4>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Total Products</h6>
            <h3>{products}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Total Orders</h6>
            <h3>{orders}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Low Stock Alerts</h6>
            <h3 className="text-danger">{lowStock}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
