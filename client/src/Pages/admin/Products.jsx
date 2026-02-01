import { useState, useEffect } from "react";

function Products() {
  // ✅ Initialize products from localStorage or default data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Rice", price: 60, stock: 50 },
          { id: 2, name: "Sugar", price: 45, stock: 20 },
        ];
  });

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  // ✅ Persist products whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock) return;

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    setProducts((prev) => [...prev, newProduct]);

    setForm({
      name: "",
      price: "",
      stock: "",
    });
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <h4>Products</h4>

      {/* ➕ Add Product Form */}
      <form onSubmit={addProduct} className="row g-2 mb-4">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-success w-100">
            Add
          </button>
        </div>
      </form>

      {/* 📦 Products Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th width="100">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Products;
