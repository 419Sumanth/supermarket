import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <>
      <AdminNavbar />

      <div className="d-flex">
        <AdminSidebar />

        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
