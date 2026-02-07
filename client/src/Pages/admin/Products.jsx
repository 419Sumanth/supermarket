import React, { useEffect, useState } from "react";
// import { addProduct, getAllProducts } from "./../../api/productApi"; // adjust path
import productApi from "../../api/productApi";

const Products = () => {

  // common input style
  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
    fontSize: "14px",
    // background: "#f9f9f9"
    };

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // To store the form data for adding a new product
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    size: "",
    price: "",
    quantity: "",
    lowStock: "",
    supplierId: ""
  });

  // To store the list of products fetched from the server
  const [products, setProducts] = useState([]);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // fetch products
  const fetchProducts = async () => {
    try {
      const res = await productApi.getAllProducts();
      setProducts(res.data.products); // supports both response formats
    } catch (error) {
      console.log("Error loading products:", error);
    }
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productPayload = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        lowStock: Number(formData.lowStock)
      };

      await productApi.addProduct(productPayload);

      alert("Product added successfully!");

      setFormData({
        name: "",
        category: "",
        size: "",
        price: "",
        quantity: "",
        lowStock: "",
        supplierId: ""
      });

      fetchProducts(); // refresh list after adding
    } catch (error) {
      console.log("Failed to add product:", error);
      alert("Failed to add product");
    }
  };

  // load products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          marginBottom: "30px"
        }}
      >
        <label style={{ fontWeight: "600" }}>Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <br /><br />

        <label style={{ fontWeight: "600" }}>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter category"
          value={formData.category}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <br /><br />

        <label style={{ fontWeight: "600" }}>Size</label>
        <input
          type="text"
          name="size"
          placeholder="Example: 500g / 1L"
          value={formData.size}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <br /><br />

        <label style={{ fontWeight: "600" }}>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <br /><br />

        <label style={{ fontWeight: "600" }}>Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          value={formData.quantity}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <br /><br />

        <label style={{ fontWeight: "600" }}>Low Stock Limit</label>
        <input
          type="number"
          name="lowStock"
          placeholder="Enter low stock limit"
          value={formData.lowStock}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <br /><br />

        <label style={{ fontWeight: "600" }}>Supplier ID (Optional)</label>
        <input
          type="text"
          name="supplierId"
          placeholder="Enter supplier id"
          value={formData.supplierId}
          onChange={handleChange}
          style={inputStyle}
        />

        <br /><br />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Add Product
        </button>
      </form>

    <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
      Product List
    </h2>

    <div
      style={{
        height: "350px",
        overflowY: "scroll",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        background: "#f9fafb"
      }}
    >
      {products.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "15px"
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => toggleExpand(product._id)}
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "0.2s ease"
              }}
            >
              <h3 style={{ marginBottom: "8px", fontSize: "16px" }}>
                {product.name}
              </h3>

              <p style={{ margin: "4px 0" }}>
                <b>Category:</b> {product.category}
              </p>

              <p style={{ margin: "4px 0" }}>
                <b>Qty:</b> {product.quantity}
              </p>

              {/* Expandable Section */}
              {expandedId === product._id && (
                <div style={{ marginTop: "10px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
                  <p style={{ margin: "4px 0" }}>
                    <b>Size:</b> {product.size}
                  </p>

                  <p style={{ margin: "4px 0" }}>
                    <b>Price:</b> ₹{product.price}
                  </p>

                  <p style={{ margin: "4px 0" }}>
                    <b>Low Stock:</b> {product.lowStock}
                  </p>

                  <p style={{ margin: "4px 0", color: "gray", fontSize: "13px" }}>
                    Click again to collapse
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default Products;

