import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../api/axios";

function Products(props) {

  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await instance.get("/products/");
      return res.data; // array of product objects
    } catch (error) {
      console.log("Error fetching products:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products);
          // console.log("Products fetched successfully:", data.products);
      } catch (error) {
        console.log("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (props.restrict) {
    products.splice(6); // Show only first 3 products
  }

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

  // console.log("Restrict prop:", props.restrict);

  return (
    <>
      {!props.restrict && <h4>Products</h4>}

      <div className="row mt-3">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p._id}>
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
