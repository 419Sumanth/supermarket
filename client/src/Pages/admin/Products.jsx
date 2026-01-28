import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import ProductForm from "../../components/ProductForm";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    const res = await productApi.getAll();
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Products</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Add Product
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Size</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.size}</td>
              <td>₹{p.price}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
}

export default AdminProducts;
