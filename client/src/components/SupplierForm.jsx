import { useState, useEffect } from "react";
import supplierApi from "../api/supplierApi";

function SupplierForm({ onSuccess, initialData = null }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    gst: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        contact: initialData.contact || "",
        email: initialData.email || "",
        address: initialData.address || "",
        gst: initialData.gst || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.contact) {
      alert("Supplier name and contact are required");
      return;
    }

    try {
      setLoading(true);

      if (initialData) {
        await supplierApi.update(initialData._id, form);
      } else {
        await supplierApi.create(form);
      }

      setForm({
        name: "",
        contact: "",
        email: "",
        address: "",
        gst: "",
        notes: "",
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to save supplier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="card p-3 mb-4 shadow-sm">
      <h5 className="mb-3">
        {initialData ? "Edit Supplier" : "Add Supplier"}
      </h5>

      <div className="row g-3">
        <div className="col-md-4">
          <input
            name="name"
            className="form-control"
            placeholder="Supplier Name *"
            value={form.name}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="col-md-4">
          <input
            name="contact"
            className="form-control"
            placeholder="Contact Number *"
            value={form.contact}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="col-md-4">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={changeHandler}
          />
        </div>

        <div className="col-md-6">
          <input
            name="address"
            className="form-control"
            placeholder="Address"
            value={form.address}
            onChange={changeHandler}
          />
        </div>

        <div className="col-md-3">
          <input
            name="gst"
            className="form-control"
            placeholder="GST / Tax ID"
            value={form.gst}
            onChange={changeHandler}
          />
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : initialData
              ? "Update Supplier"
              : "Add Supplier"}
          </button>
        </div>

        <div className="col-md-12">
          <textarea
            name="notes"
            className="form-control"
            placeholder="Notes"
            rows="2"
            value={form.notes}
            onChange={changeHandler}
          />
        </div>
      </div>
    </form>
  );
}

export default SupplierForm;
