import { useEffect, useState } from "react";
import supplierApi from "../../api/supplierApi";

function AdminSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
  });

  const fetchSuppliers = async () => {
    const res = await supplierApi.getAll();
    setSuppliers(res.data.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await supplierApi.create(form);
    setForm({ name: "", contact: "", email: "" });
    fetchSuppliers();
  };

  return (
    <div className="p-4">
      <h3>Suppliers</h3>

      {/* Add Supplier */}
      <form className="row g-2 mb-4" onSubmit={submitHandler}>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Supplier Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="col-md-3">
          <button className="btn btn-success w-100">Add Supplier</button>
        </div>
      </form>

      {/* Supplier List */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.contact}</td>
              <td>{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminSuppliers;
