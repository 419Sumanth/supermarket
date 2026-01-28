import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function PurchaseHistory() {
  const { supplierId } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `/purchases/supplier/${supplierId}`
      );

      setSupplier(res.data.supplier);
      setPurchases(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load purchase history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [supplierId]);

  if (loading) return <p className="m-4">Loading purchase history...</p>;

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/admin/suppliers")}
      >
        ← Back to Suppliers
      </button>

      {supplier && (
        <div className="card mb-3 p-3">
          <h5>{supplier.name}</h5>
          <small>Phone: {supplier.phone}</small>
        </div>
      )}

      {purchases.length === 0 ? (
        <p>No purchases found for this supplier.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p._id}>
                  <td>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td>{p.productName}</td>
                  <td>{p.quantity}</td>
                  <td>₹{p.price}</td>
                  <td>₹{p.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PurchaseHistory;
