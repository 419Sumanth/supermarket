import { useState, useEffect } from "react";
import purchasesApi from "../../api/purchasesApi";

function Orders() {
  const [orders, setOrders] = useState([]);

   useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await purchasesApi.getAllPurchases();
        // console.log("Fetched orders:", res.data.data);
        setOrders(res.data.data);
      } catch (error) {
        console.log("Failed to fetch orders:", error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, []);


  return (
    <>
      <h4>Orders placed by Customers</h4>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        //This div is scrollable
        <div 
          className="overflow-y-scroll py-2"
          style={{
            paddingRight: "5px",
            maxHeight: "800px",
          }}  
        >    
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Date of Order</th>
                <th>Price (₹)</th>
                <th>Number of Items</th>
                <th>Products</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{new Date(o.purchaseDate).toLocaleDateString()}</td>
                  <td>{o.purchasePrice}</td>
                  <td>{o.numberOfItems}</td>
                  <td
                    style={{
                      paddingLeft: "20px",

                      // maxHeight: "150px",
                      // overflowY: "auto"
                    }}  
                  >
                  {o.items.map((product, i) => (
                          <li key={i}>
                            {product.name} (₹{product.price} × {product.quantity})
                          </li>
                        ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center">End of Orders...</p>
         </div>
      )}
    </>
  );
}

export default Orders;
