import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import StockAlertCard from "../../components/StockAlertCard";

function StockAlertList() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLowStock = async () => {
    try {
      const res = await axios.get("/stocks/low");
      setAlerts(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch stock alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  if (loading) return <p className="m-4">Loading stock alerts...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>⚠️ Low Stock Alerts</h4>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/stock")}
        >
          Go to Stock
        </button>
      </div>

      {alerts.length === 0 ? (
        <div className="alert alert-success">
          🎉 All products have sufficient stock.
        </div>
      ) : (
        <>
          <div className="alert alert-danger">
            {alerts.length} product(s) require immediate attention
          </div>

          <div className="row">
            {alerts.map((product) => (
              <div className="col-md-4 mb-3" key={product._id}>
                <StockAlertCard product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StockAlertList;
