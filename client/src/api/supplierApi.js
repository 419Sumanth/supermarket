import instance from "./axios";

const supplierApi = {
  getAllSuppliers: () => instance.get("/suppliers/"),
  addSupplier: (supplierData) => instance.post("/suppliers/add", supplierData),
//   updateSupplier: (id, supplierData) => instance.put(`/suppliers/${id}/`, supplierData),
//   deleteSupplier: (id) => instance.delete(`/suppliers/${id}/`)
};

export default supplierApi;