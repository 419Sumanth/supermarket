import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import supplierApi from "../../api/supplierApi";

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
      const res = await supplierApi.getAllSuppliers();
      setSuppliers(res.data);
    } catch (error) {
      console.log("Error fetching suppliers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await supplierApi.addSupplier(formData);

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


  useEffect(() => {
    fetchSuppliers();
  }, []);

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    color: "#333",
    background: "#f9f9f9"
  };

  return (
    <div 
      style={{ minWidth: "100%", 
               margin: "0",
               padding: "0px",
               display: "flex",
               justifyContent: "space-between", 
              //  border: "1px solid #e5e7eb",
               height: "100%",
              }}
    >
      {/* form section */}
      <div 
        style={{ width: "40%", 
                //  padding: "10px",  
                //  border: "1px solid #e5e7eb", 
                 margin: "0" }}
      >
        <h4 style={{ textAlign: "left", marginBottom: "20px" }}>
          Add Supplier
        </h4>

      {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            // padding: "20px",
            borderRadius: "10px",
            margin:"50px 0",
            marginLeft:"30px",
            // boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            width: "80%",
            height: "60%",
            display: "flex",
            flexDirection: "column",
            gap: "35px"
          }}
        >
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <label style={{ fontWeight: "600" }}>Address</label>
            <textarea
              name="address"
              placeholder="Enter supplier address"
              value={formData.address}
              onChange={handleChange}
              style={{ ...inputStyle, height: "80px", resize: "none" }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "20px",
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
      </div>

      {/* Supplier List */}
      <div
        style={{
          width: "60%",
          padding: "0px",
          // border: "1px solid #e5e7eb",
          margin: "0"
        }}
      >
        <h4 style={{ textAlign: "left", marginBottom: "15px" }}>
          Suppliers Details
        </h4>

        <div
          style={{
            maxHeight: "800px",
            overflowY: "scroll",
            padding: "10px",
            margin: "auto",
            // borderRadius: "10px",
            // border: "1px solid #ddd",
            // background: "#f9fafb"
          }}
        > 
          {suppliers.length === 0 ? (
            <p style={{ textAlign: "center", color: "gray" }}>
              No suppliers found
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "15px",
                columnGap: "30px",
                marginTop: "30px",
                padding: "0 20px"
              }}
            >
              {suppliers.map((supplier) => (
                <div
                  key={supplier._id}
                  style={{
                    background: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.08)"
                  }}
                >
                  <p><b>Name:</b> {supplier.name}</p>
                  <p><b>Email:</b> {supplier.email}</p>
                  <p><b>Phone:</b> {supplier.phone}</p>
                  <p><b>Address:</b> {supplier.address}</p>
                </div>
              ))}
           </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
