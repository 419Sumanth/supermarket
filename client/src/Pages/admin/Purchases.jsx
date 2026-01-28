import { useEffect, useState } from "react";
import purchaseApi from "../../api/purchaseApi";
import productApi from "../../api/productApi";
import supplierApi from "../../api/supplierApi";

function AdminPurchases() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    supplierId: "",
    quantity: "",
    price: "",
  });

  const loadData = async () => {
    const p = await productApi.getAll();
    const s = await supplierApi.getAll();
    const pur = await purchaseApi.getAll();

    setProducts(p.data.data);
    setSuppliers(s.data.data);
    setPurchases(pur.data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await purchaseApi.create(form);
    setForm({ productId: "", supplierId: "", quantity: "", price: "" });
    loadData();
  };

  return (
    <div className="p-4">
      <h3>Purchases</h3>

      {/* Purchase Form */}
      <form className="row g-2 mb-4" onSubmit={submitHandler}>
        <div className="col-md-3">
          <select
            className="form-control"
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={form.supplierId}
            onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Qty"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100">Add</button>
        </div>
      </form>

      {/* Purchase History */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p._id}>
              <td>{p.product?.name}</td>
              <td>{p.supplier?.name}</td>
              <td>{p.quantity}</td>
              <td>₹{p.price}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPurchases;
