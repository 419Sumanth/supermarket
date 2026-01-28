import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await orderApi.getMyOrders();
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading orders...</div>;
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3">My Orders</h4>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="accordion" id="ordersAccordion">
          {orders.map((order, index) => (
            <div className="accordion-item mb-2" key={order._id}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#order-${index}`}
                >
                  Order #{order._id.slice(-6)} | ₹{order.totalAmount} |{" "}
                  <span className="ms-2 badge bg-info">
                    {order.status}
                  </span>
                </button>
              </h2>

              <div
                id={`order-${index}`}
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item._id}>
                          <td>{item.product.name}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td>₹{item.quantity * item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
