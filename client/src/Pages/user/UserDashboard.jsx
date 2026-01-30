import UserNavbar from "./UserNavbar";
import UserSidebar from "./UserSidebar";
import { Outlet } from "react-router-dom";

function UserDashboard() {
  return (
    <>
      <UserNavbar />

      <div className="d-flex">
        <UserSidebar />

        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
