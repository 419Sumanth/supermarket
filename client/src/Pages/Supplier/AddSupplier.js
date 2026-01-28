import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supplierApi from "../../api/supplierApi";

function AddSupplier() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Supplier name and phone are required");
      return;
    }

    try {
      setLoading(true);
      await supplierApi.create(form);
      alert("Supplier added successfully");
      navigate("/admin/suppliers");
    } catch (err) {
      console.error(err);
      alert("Failed to add supplier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Add Supplier</h4>

      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Supplier Name *</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone *</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            rows="3"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Supplier"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/suppliers")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSupplier;
