import React, { useEffect, useState } from "react";
import instance from "../../api/axios";

const Suppliers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [suppliers, setSuppliers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchSuppliers = async () => {
    try {
      const res = await getAllSuppliers();
      setSuppliers(res.suppliers || res);
    } catch (error) {
      console.log("Error fetching suppliers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addSupplier(formData);

      alert("Supplier added successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: ""
      });

      fetchSuppliers();
    } catch (error) {
      console.log("Failed to add supplier:", error);
      alert("Failed to add supplier");
    }
  };

  const addSupplier = async (supplierData) => {
  try {
    const res = await instance.post("/suppliers/add", supplierData);
    return res.data;
  } catch (error) {
    console.log("Add Supplier Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

const getAllSuppliers = async () => {
  try {
    const res = await instance.get("/suppliers/");
    return res.data;
  } catch (error) {
    console.log("Fetch Supplier Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none"
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add Supplier
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          marginBottom: "30px"
        }}
      >
        <label style={{ fontWeight: "600" }}>Supplier Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter supplier name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <br /><br />

        <label style={{ fontWeight: "600" }}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter supplier email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <br /><br />

        <label style={{ fontWeight: "600" }}>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter supplier phone"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <br /><br />

        <label style={{ fontWeight: "600" }}>Address</label>
        <textarea
          name="address"
          placeholder="Enter supplier address"
          value={formData.address}
          onChange={handleChange}
          style={{ ...inputStyle, height: "80px", resize: "none" }}
          required
        />

        <br /><br />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Add Supplier
        </button>
      </form>

      {/* Supplier List */}
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
        Supplier List
      </h2>

      <div
        style={{
          maxHeight: "300px",
          overflowY: "scroll",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          background: "#f9fafb"
        }}
      >
        {suppliers.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            No suppliers found
          </p>
        ) : (
          suppliers.map((supplier) => (
            <div
              key={supplier._id}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "12px",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.08)"
              }}
            >
              <p><b>Name:</b> {supplier.name}</p>
              <p><b>Email:</b> {supplier.email}</p>
              <p><b>Phone:</b> {supplier.phone}</p>
              <p><b>Address:</b> {supplier.address}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Suppliers;
