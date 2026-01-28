import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await orderApi.getAll();
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h3>Orders</h3>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user?.email}</td>

              <td>
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    {item.product?.name} × {item.quantity}
                  </div>
                ))}
              </td>

              <td>₹{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
