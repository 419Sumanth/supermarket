import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext.jsx";

function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    lowStock: "",
    size: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        lowStock: Number(formData.lowStock)
      });

      navigate("/admin/inventory");
    } catch (error) {
      console.error("Failed to add product", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Product</h3>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="row">

          <div className="col-md-6 mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              required
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Low Stock Alert</label>
            <input
              type="number"
              className="form-control"
              name="lowStock"
              required
              value={formData.lowStock}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Size / Unit</label>
            <input
              type="text"
              className="form-control"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />
          </div>

        </div>

        <button type="submit" className="btn btn-success">
          Save Product
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
