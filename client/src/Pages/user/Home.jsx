import { useNavigate } from "react-router-dom";
import Products from "./Products";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h4>User Dashboard</h4>

      {/* Quick Actions */}
      <div className="row mt-3">
        <div className="col-md-6">
          <div
            className="card p-3 shadow-sm cursor-pointer"
            style={{ cursor: "pointer", background:"#BFC9D1", fontWeight:"600" }}
            onClick={() => navigate("/user/products")}
          >
            <h5>Browse Products</h5>
            <p className="text-muted mb-0">
              Click here to view available items
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="card p-3 shadow-sm"
            style={{ cursor: "pointer", background:"#BFC9D1", fontWeight:"600" }}
            onClick={() => navigate("/user/orders")}
          >
            <h5>My Orders</h5>
            <p className="text-muted mb-0">
               Click here to view your order history
            </p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <h4 className="mt-4">Featured Products</h4>

      <div>
        <Products restrict={true}/>
      </div>
    </>
  );
}

export default Home;
