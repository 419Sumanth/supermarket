import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
  return (
    <>
      <AdminNavbar />

      <div className="d-flex">
        <AdminSidebar />

        <div className="flex-grow-1 p-4">
          <h3>Admin Dashboard</h3>
          <p>Select an option from the sidebar.</p>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
