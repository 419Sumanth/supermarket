import { useNavigate } from "react-router-dom";
import Products from "./Products";

function Home() {
  const navigate = useNavigate();

  // Temporary product data (same idea as Products page)
  const products = [
    { id: 1, name: "Rice", price: 60 },
    { id: 2, name: "Sugar", price: 45 },
    { id: 3, name: "Wheat", price: 50 },
  ];

  return (
    <>
      <h4>User Dashboard</h4>

      {/* Quick Actions */}
      <div className="row mt-3">
        <div className="col-md-6">
          <div
            className="card p-3 shadow-sm cursor-pointer"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/user/products")}
          >
            <h6>Browse Products</h6>
            <p className="text-muted mb-0">
              View available items
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="card p-3 shadow-sm"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/user/orders")}
          >
            <h6>My Orders</h6>
            <p className="text-muted mb-0">
              View your order history
            </p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <h5 className="mt-4">Featured Products</h5>

      <div>
        <Products restrict={true}/>
      </div>

      {/* <div className="row mt-2">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h6>{p.name}</h6>
                <p>₹{p.price}</p>

                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate("/user/products")}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}

export default Home;
