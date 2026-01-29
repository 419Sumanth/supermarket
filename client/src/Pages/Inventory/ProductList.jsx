import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext.jsx";
import { useAuth } from "../../context/Authcontext.jsx";

function ProductList() {
  const navigate = useNavigate();
  const { products, fetchProducts, deleteProduct, loading } = useProducts();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading products...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Products</h3>

        {isAdmin && (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/inventory/add")}
          >
            + Add Product
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>

                <td>
                  {product.quantity <= product.lowStock ? (
                    <span className="badge bg-danger">Low</span>
                  ) : (
                    <span className="badge bg-success">OK</span>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() =>
                      navigate(`/inventory/${product._id}`)
                    }
                  >
                    View
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() =>
                          navigate(`/admin/inventory/edit/${product._id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
