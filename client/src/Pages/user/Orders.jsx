import { useState, useEffect } from "react";
import purchasesApi from "../../api/purchasesApi";

function Orders() {

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await purchasesApi.getMyPurchases();
        setOrders(res.data.purchases);
        console.log("Fetched purchases:", res.data.purchases);
      } catch (error) {
        console.log("Failed to load purchases:", error);
      }
    };
    fetchPurchases();
  }, []);

  return (
    // <>
    //   <h4>My Orders</h4>

    //   {orders.length === 0 ? (
    //     <p>No orders placed yet</p>
    //   ) : (
    //     <table className="table table-bordered">
    //       <thead className="table-dark">
    //         <tr>
    //           {/* <th>Product</th> */}
    //           <th>Qty</th>
    //           <th>Price (₹)</th>
    //           <th>Date</th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {orders.map((o) => (
    //           <tr key={o._id}>
    //             {/* <td>{o.product}</td> */}
    //             <td>{o.numberOfItems}</td>
    //             <td>{o.purchasePrice}</td>
    //             <td>{o.purchaseDate.substring(0, 10)}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </>


    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "left", marginBottom: "20px" }}>
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "#fff",
              borderRadius: "10px",
              marginBottom: "15px",
              boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
              overflow: "hidden"
            }}
          >
            {/* Order Header */}
            <div
              onClick={() => toggleExpand(order._id)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                background: "#9ca0a8",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "left"
              }}
            >
              <div>
                <h3 style={{ marginBottom: "10px" }}>
                  Order - {new Date(order.purchaseDate).toLocaleDateString()}
                </h3>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold", letterSpacing: "0.5px" }}>
                  Total Items: {order.numberOfItems} | Total Price: ₹{order.purchasePrice}
                </p>
              </div>

              <span style={{ fontSize: "18px", fontWeight: "bold",marginLeft:"20px", padding: "10px" }}>
                {expandedOrderId === order._id ? "−" : "+"}
              </span>
            </div>

            {/* Collapsible Body */}
            {expandedOrderId === order._id && (
              <div style={{ padding: "15px" }}>
                <h4 style={{ marginBottom: "10px" }}>Items Purchased:</h4>

                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden"
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#f3f4f6" }}>
                      <tr>
                        <th style={{ padding: "10px", textAlign: "left" }}>Item Name</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Quantity</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index} style={{ borderTop: "1px solid #ddd" }}>
                          <td style={{ padding: "10px" }}>{item.name}</td>
                          <td style={{ padding: "10px" }}>₹{item.price}</td>
                          <td style={{ padding: "10px" }}>{item.quantity}</td>
                          <td style={{ padding: "10px" }}>
                            ₹{item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
