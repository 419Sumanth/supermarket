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
