import { useEffect, useState } from "react";

function StockAlerts() {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Threshold can be adjusted later or made configurable
    const LOW_STOCK_LIMIT = 10;

    const filtered = products.filter(
      (p) => p.stock <= LOW_STOCK_LIMIT
    );

    setLowStockItems(filtered);
  }, []);

  return (
    <>
      <h4>Low Stock Alerts</h4>

      {lowStockItems.length === 0 ? (
        <p className="text-success">
          All products have sufficient stock.
        </p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Current Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {lowStockItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>
                  <span className="badge bg-danger">
                    Low Stock
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default StockAlerts;
