import { useState } from "react";
import productApi from "../api/productApi";

function ProductForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    size: "",
    price: "",
    quantity: "",
    lowStock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await productApi.create(form);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="modal show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5 className="mb-3">Add Product</h5>

          <form onSubmit={submitHandler}>
            <input
              className="form-control mb-2"
              placeholder="Product Name"
              name="name"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              placeholder="Category"
              name="category"
              onChange={handleChange}
            />

            <input
              className="form-control mb-2"
              placeholder="Size (eg: 1kg)"
              name="size"
              onChange={handleChange}
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Price"
              name="price"
              onChange={handleChange}
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Quantity"
              name="quantity"
              onChange={handleChange}
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Low Stock Alert"
              name="lowStock"
              onChange={handleChange}
            />

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
