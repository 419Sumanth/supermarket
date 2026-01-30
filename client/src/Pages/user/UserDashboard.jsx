import UserNavbar from "./UserNavbar";
import UserSidebar from "./UserSidebar";

function UserDashboard() {
  return (
    <>
      <UserNavbar />

      <div className="d-flex">
        <UserSidebar />

        <div className="flex-grow-1 p-4">
          <h3>User Dashboard</h3>
          <p>Welcome to your dashboard.</p>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
