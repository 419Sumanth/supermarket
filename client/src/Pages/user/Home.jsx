import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../../api/productApi";
import orderApi from "../../api/orderApi";
import authApi from "../../api/authApi";

function Home() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    name: "",
  });

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes, profileRes] = await Promise.all([
        productApi.getAll(),
        orderApi.getMyOrders(),
        authApi.getProfile(),
      ]);

      setStats({
        products: productsRes.data.data.length,
        orders: ordersRes.data.data.length,
        name: profileRes.data.data.name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Welcome, {stats.name || "User"} 👋</h3>

      <div className="row">
        <div className="col-md-4">
          <div
            className="card shadow-sm p-3 cursor-pointer"
            onClick={() => navigate("/user/products")}
          >
            <h5>Total Products</h5>
            <h2>{stats.products}</h2>
            <p className="text-muted">Browse available items</p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow-sm p-3 cursor-pointer"
            onClick={() => navigate("/user/orders")}
          >
            <h5>My Orders</h5>
            <h2>{stats.orders}</h2>
            <p className="text-muted">View order history</p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow-sm p-3 cursor-pointer"
            onClick={() => navigate("/user/profile")}
          >
            <h5>My Profile</h5>
            <h2>👤</h2>
            <p className="text-muted">Manage account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
