import { useEffect, useState } from "react";
import stockApi from "../../api/stockApi";

function AdminStock() {
  const [stocks, setStocks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newQty, setNewQty] = useState("");

  const fetchStock = async () => {
    try {
      const res = await stockApi.getAll();
      setStocks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const updateStock = async (id) => {
    try {
      await stockApi.update(id, { quantity: newQty });
      setEditId(null);
      setNewQty("");
      fetchStock();
    } catch (err) {
      alert("Failed to update stock");
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-3">Stock Management</h3>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Current Qty</th>
            <th>Low Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => (
            <tr
              key={item._id}
              className={item.quantity <= item.lowStock ? "table-danger" : ""}
            >
              <td>{item.name}</td>

              <td>
                {editId === item._id ? (
                  <input
                    type="number"
                    className="form-control"
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                  />
                ) : (
                  item.quantity
                )}
              </td>

              <td>{item.lowStock}</td>

              <td>
                {editId === item._id ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateStock(item._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setEditId(item._id);
                      setNewQty(item.quantity);
                    }}
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminStock;
/**
 * StockAlertList.jsx
 * import { useEffect, useState } from "react";
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

 */