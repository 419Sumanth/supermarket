import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const existingOrders =
      JSON.parse(localStorage.getItem("userOrders")) || [];

    const newOrders = cart.map((item) => ({
      id: Date.now() + Math.random(),
      product: item.name,
      quantity: item.quantity,
      price: item.price,
      date: new Date().toLocaleDateString(),
    }));

    localStorage.setItem(
      "userOrders",
      JSON.stringify([...existingOrders, ...newOrders])
    );

    // Clear cart
    localStorage.removeItem("cart");
    setCart([]);

    alert("Order placed successfully!");
    navigate("/user/orders");
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <h4>My Cart</h4>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price (₹)</th>
                <th>Total (₹)</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5>Total: ₹{totalAmount}</h5>

          <button
            className="btn btn-success mt-2"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </>
      )}
    </>
  );
}

export default Cart;
