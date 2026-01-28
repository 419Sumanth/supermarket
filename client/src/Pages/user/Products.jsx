import { useEffect, useState } from "react";
import productApi from "../../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await productApi.getAll();
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading products...</div>;
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Available Products</h4>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>

                <p className="mb-1">
                  <strong>Category:</strong> {p.category}
                </p>

                <p className="mb-1">
                  <strong>Size:</strong> {p.size}
                </p>

                <p className="mb-1">
                  <strong>Price:</strong> ₹{p.price}
                </p>

                <p
                  className={
                    p.quantity > 0
                      ? "text-success fw-bold"
                      : "text-danger fw-bold"
                  }
                >
                  {p.quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
