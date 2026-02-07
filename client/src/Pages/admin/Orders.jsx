import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("userOrders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <>
      <h4>All Orders</h4>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.product}</td>
                <td>{o.quantity}</td>
                <td>{o.price}</td>
                <td>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Orders;
