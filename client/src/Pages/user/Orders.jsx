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
      } catch (error) {
        console.log("Failed to load purchases:", error);
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div style={{ padding: "0px",maxHeight:"93.4vh", maxWidth: "600px", margin: "0"}}>
      <h4 style={{ textAlign: "left", marginBottom: "20px" }}>
        My Orders
      </h4>

      <div
        style={{
          overflowY:"scroll",
          maxHeight:"900px",
          padding:"10px 10px 10px 0px",
          // border:"1px solid gray"
        }}
      >
          {orders.length === 0 ? (
            <p style={{ textAlign: "center", color: "gray" }}>No orders found</p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "#fff",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  // marginRight:"10px"
                }}
              >
                {/* Order Header */}
                <div
                  onClick={() => toggleExpand(order._id)}
                  style={{
                    padding: "10px 10px",
                    cursor: "pointer",
                    background: "#e9eaeb",
                    color: "black",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "left"
                  }}
                >
                  <div
                    style={{
                      display:"flex",
                      alignItems:"center",
                      padding:"0",
                      gap:"50px"
                    }}
                  >
                    <p style={{  fontWeight:"600", fontSize:"18px", margin:"0" }}>
                      Order - {new Date(order.purchaseDate).toLocaleDateString()}
                    </p>
                    <p style={{fontSize: "14px", fontWeight: "bold", letterSpacing: "0.5px",margin:"0"}}>
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

      
    </div>
  );
}

export default Orders;
