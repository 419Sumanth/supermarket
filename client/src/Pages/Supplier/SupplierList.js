import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supplierApi from "../../api/supplierApi";

function SupplierList() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = async () => {
    try {
      const res = await supplierApi.getAll();
      setSuppliers(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await supplierApi.delete(id);
      setSuppliers(suppliers.filter((s) => s._id !== id));
    } catch (err) {
      alert("Failed to delete supplier");
    }
  };

  if (loading) return <p className="m-4">Loading suppliers...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Suppliers</h4>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/suppliers/add")}
        >
          + Add Supplier
        </button>
      </div>

      {suppliers.length === 0 ? (
        <p>No suppliers found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Email</th>
                <th width="220">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.company || "-"}</td>
                  <td>{s.phone}</td>
                  <td>{s.email || "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() =>
                        navigate(`/admin/suppliers/${s._id}/purchases`)
                      }
                    >
                      Purchases
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteSupplier(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SupplierList;
