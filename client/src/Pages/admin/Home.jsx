import React from "react";
import { useState, useEffect } from "react";
import productApi from "../../api/productApi";
import purchasesApi from "../../api/purchasesApi";
import stockApi from "../../api/stockApi";

function Home() {

  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await productApi.getTotalProductCount();
        setProducts(res.data.count);
      } catch (error) {
        console.log("Failed to fetch product count:", error);
      }
    };

    const fetchOrdersCount = async () => {
      try {
        const res = await purchasesApi.getTotalPurchaseCount();
        setOrders(res.data.count);
      } catch (error) {
        console.log("Failed to fetch purchase count:", error);
      }
    };

    const fetchLowStockCount = async () => {
      try {
        const res = await stockApi.getLowStockCount();
        setLowStock(res.data.lowStockCount);
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
            <h6>Total Products in Inventory</h6>
            <h3>{products}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Total Orders received</h6>
            <h3>{orders}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Low Stock Items</h6>
            <h3 className="text-danger">{lowStock}</h3>
          </div>
        </div>
      </div>

      <div>
        <h4
          className="mt-5 text-left">
          Genrate Reports and Analytics (Coming Soon)
        </h4>
      </div>
    </>
  );
}

export default Home;
