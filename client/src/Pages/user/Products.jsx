import { useState } from "react";

function Products() {
  const products = [
    { id: 1, name: "Rice", price: 60 },
    { id: 2, name: "Sugar", price: 45 },
    { id: 3, name: "Wheat", price: 50 },
  ];

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem("cart")) || [];

    const found = existing.find((p) => p.id === product.id);

    if (found) {
      found.quantity += 1;
    } else {
      existing.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existing));
    alert("Added to cart");
  };

  return (
    <>
      <h4>Products</h4>

      <div className="row mt-3">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h6>{p.name}</h6>
                <p>₹{p.price}</p>

                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
