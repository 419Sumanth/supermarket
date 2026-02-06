import { useState, useEffect } from "react";
import instance from "../../api/axios";

function Orders() {

   const [orders, setOrders] = useState([]);

  const getMyPurchases = async () => {
  try {
    const res = await instance.get("/purchases/getPurchasesByUserId");
    return res.data;
  } catch (error) {
    console.log("Purchase Fetch Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await getMyPurchases();
        console.log("Purchases fetched:", res.purchases);
        setOrders(res.purchases); // because backend returns { success, data: purchases }
      } catch (error) {
        console.log("Failed to load purchases:", error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <>
      <h4>My Orders</h4>

      {orders.length === 0 ? (
        <p>No orders placed yet</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              {/* <th>Product</th> */}
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                {/* <td>{o.product}</td> */}
                <td>{o.quantity}</td>
                <td>{o.purchasePrice}</td>
                <td>{o.purchaseDate.substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Orders;
