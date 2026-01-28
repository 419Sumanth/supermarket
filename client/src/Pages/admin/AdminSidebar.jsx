import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-light border-end"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <ul className="list-group list-group-flush">

        
        <li
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin")}
        >
          Dashboard
        </li>

        <li
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/products")}
        >
          Products
        </li>

        <li
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/stock")}
        >
          Stock
        </li>

        <li
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/alerts/stock")}
        >
          Stock Alerts
        </li>
        
        


        <li
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/suppliers")}
        >
          Suppliers
        </li>

        <li
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/purchases")}
        >
          Purchases
        </li>

        <li
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/admin/orders")}
        >
          Orders
        </li>

        <li
          className="list-group-item list-group-item-action text-danger"
          onClick={() => navigate("/login")}
        >
          Exit
        </li>

      </ul>
    </div>
  );
}

export default AdminSidebar;
