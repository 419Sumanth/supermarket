import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext.jsx";
import { useAuth } from "../../context/Authcontext.jsx";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProductById, updateProduct } = useProducts();
  const { isAdmin } = useAuth();

  const [product, setProduct] = useState(null);
  const [orderQty, setOrderQty] = useState(1);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductById(id);
      setProduct(data);
      setEditData({
        price: data.price,
        quantity: data.quantity,
        lowStock: data.lowStock
      });
    }
    loadProduct();
  }, [id]);

  if (!product) return <p className="mt-4 text-center">Loading...</p>;

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateProduct(product._id, {
      price: Number(editData.price),
      quantity: Number(editData.quantity),
      lowStock: Number(editData.lowStock)
    });
    navigate("/admin/inventory");
  };

  const placeOrder = () => {
    navigate(`/orders/new/${product._id}?qty=${orderQty}`);
  };

  return (
    <div className="container mt-4">
      <h3>{product.name}</h3>
      <p className="text-muted">{product.category}</p>

      <div className="row mt-3">
        <div className="col-md-6">
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Available Stock:</strong> {product.quantity}</p>
          <p><strong>Low Stock Alert:</strong> {product.lowStock}</p>
          <p><strong>Size:</strong> {product.size}</p>

          {product.quantity <= product.lowStock && (
            <span className="badge bg-danger">Low Stock</span>
          )}
        </div>

        {/* USER ACTION */}
        {!isAdmin && (
          <div className="col-md-6">
            <h5>Place Order</h5>
            <input
              type="number"
              min="1"
              max={product.quantity}
              className="form-control w-50 mb-2"
              value={orderQty}
              onChange={(e) => setOrderQty(e.target.value)}
            />
            <button className="btn btn-primary" onClick={placeOrder}>
              Order
            </button>
          </div>
        )}

        {/* ADMIN ACTION */}
        {isAdmin && (
          <div className="col-md-6">
            <h5>Edit Product</h5>

            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control mb-2"
              name="price"
              value={editData.price}
              onChange={handleEditChange}
            />

            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control mb-2"
              name="quantity"
              value={editData.quantity}
              onChange={handleEditChange}
            />

            <label className="form-label">Low Stock</label>
            <input
              type="number"
              className="form-control mb-2"
              name="lowStock"
              value={editData.lowStock}
              onChange={handleEditChange}
            />

            <button className="btn btn-success me-2" onClick={handleUpdate}>
              Update
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin/inventory")}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
