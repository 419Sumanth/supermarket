import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import purchasesApi from "../../api/purchasesApi";
import instance from "../../api/axios";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Calculate total amount and quantity
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity,0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    const existingOrders = JSON.parse(localStorage.getItem("userOrders")) || [];

    try{
      const formattedItems = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const purchase = {
        numberOfItems: totalQuantity,
        items: formattedItems,
        purchasePrice: totalAmount,
        paymentstatus: true // or false depending on your logic
      };

      const response = await purchasesApi.addPurchase(purchase);
      localStorage.setItem("userOrders",JSON.stringify([...existingOrders, purchase]));

      // Clear cart
      localStorage.removeItem("cart");
      setCart([]);

      alert("Order placed successfully!");
      navigate("/user/orders");
    
    }catch(error){
       alert("Failed to place order. Please try again.");
       navigate("/user/cart");
       console.log("Add Purchase Error:", error.response?.data || error.message);
       throw error.response?.data || error.message;
    }
  };

  return (
    <>
      <h4>My Cart</h4>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table 
            className="table "
            style={{
              borderRadius:"10px",
              width:"40%",
              margin:"50px 0"
            }}  
          >
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price (₹)</th>
                <th >Total (₹)</th>
                <th style={{width:"80px"}}></th>
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
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5 >
            Order Total: 
            <p style={{fontWeight:"600", display:"inline", marginLeft:"10px"}}>
              ₹{totalAmount}
            </p>
          </h5>

          <button
            className="btn btn-success mt-5"
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
