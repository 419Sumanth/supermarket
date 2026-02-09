import { useEffect, useState } from "react";
import stockApi from "../../api/StockApi";

function StockAlerts() {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await stockApi.getLowStockItems();
        setLowStockItems(res.data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchLowStock();
  }, []);

  return (
  
    <div style={{ padding: "0px" }}>
      <h4 style={{ textAlign: "left", marginBottom: "5px" }}>
        Low Stock Items
      </h4>
      {lowStockItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No low stock items found
        </p>
      ) : (
        // This div is scrollable and has a fixed height to contain the table of low stock items
        <div
          className="overflow-y-scroll py-2"
          style={{
            maxHeight: "800px",
          }}
        >
          <table
          style={{
            width: "100%",
            background: "white",
            paddingRight:"5px"
          }}
          >
            <thead style={{ background: "#3f1717", color: "white" }}>
              <tr>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #131212" }}>Item Name</th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #131212" }}>Price</th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #131212" }}>Supplier details</th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #131212" }}>Quantity Left</th>
              </tr>
            </thead>

            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "12px", border: "1px solid #121111" }}>{item.name}</td>

                  <td style={{ padding: "12px", border: "1px solid #121111" }}>₹{item.price}</td>

                  <td style={{ padding: "12px", border: "1px solid #121111" }}>
                    {item.supplierId ? `${item.supplierId.name}, ${item.supplierId.address}` : "No Supplier"}
                  </td>

                  <td style={{ padding: "12px", fontWeight: "bold", color: "red", border: "1px solid #121111" }}>
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

      {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Send Alerts
      </button> */}
    </div>
  );
}

export default StockAlerts;
