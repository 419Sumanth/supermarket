import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import orderApi from "../../api/orderApi";
import stockApi from "../../api/stockApi";

function AdminHome() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    lowStock: 0,
  });

  const loadStats = async () => {
    const products = await productApi.getAll();
    const orders = await orderApi.getAll();
    const stock = await stockApi.getAll();

    const lowStockCount = stock.data.data.filter(
      (s) => s.quantity <= s.lowStock
    ).length;

    setStats({
      products: products.data.data.length,
      orders: orders.data.data.length,
      lowStock: lowStockCount,
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="p-4">
      <h3 className="mb-4">Admin Dashboard</h3>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center p-3 shadow">
            <h5>Total Products</h5>
            <h2>{stats.products}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-3 shadow">
            <h5>Total Orders</h5>
            <h2>{stats.orders}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-3 shadow">
            <h5>Low Stock Alerts</h5>
            <h2 className="text-danger">{stats.lowStock}</h2>
          </div>
        </div>
      </div>

      {stats.lowStock > 0 && (
        <div className="alert alert-danger mt-4">
          Some products are running low on stock. Please review inventory.
        </div>
      )}
    </div>
  );
}

export default AdminHome;
