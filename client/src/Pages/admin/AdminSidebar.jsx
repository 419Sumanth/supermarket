function AdminSidebar() {
  return (
    <div
      className="bg-light border-end"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <ul className="nav flex-column p-3">
        <li className="nav-item mb-2">
          <span className="fw-bold">Dashboard</span>
        </li>

        <li className="nav-item mb-2">
          <span className="nav-link text-dark">Products</span>
        </li>

        <li className="nav-item mb-2">
          <span className="nav-link text-dark">Suppliers</span>
        </li>

        <li className="nav-item mb-2">
          <span className="nav-link text-dark">Purchases</span>
        </li>

        <li className="nav-item mb-2">
          <span className="nav-link text-dark">Orders</span>
        </li>

        <li className="nav-item mb-2">
          <span className="nav-link text-danger">Low Stock Alerts</span>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
