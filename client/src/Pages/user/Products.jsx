import { useState, useEffect } from "react";
import productApi from "../../api/productApi"
import { Navigate } from "react-router-dom";

function Products(props) {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // console.log("filtered products : ", filteredProducts)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAllProducts();
        const tempProducts = data.data.products;
        // setProducts(data.data.products);

        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedProducts = tempProducts.map((product) => {
            const cartItem = savedCart.find((item) => item._id === product._id);

            if (cartItem) {
              return {
                ...product,
                quantity: Math.max(product.quantity - cartItem.quantity, 0)
              };
            }
            return product;
        });
        setProducts(updatedProducts);

        // console.log("after updating : ", updatedProducts);
      } catch (error) {
        console.log("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (props.restrict) {
    products.splice(12); // Show only first 6 products
  }

  const addToCart = (product) => {

    if (product.quantity <= 0) {
      alert("Out of stock");
      return;
    }

    const updatedProducts = products.map((p) => {
      if (product._id === p._id) {
        return {
          ...p,
          quantity: p.quantity - 1
        };
      }
      return p;
    });
    setProducts(updatedProducts);

    const existing = JSON.parse(localStorage.getItem("cart")) || [];
    const found = existing.find((p) => p._id === product._id);

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
      {!props.restrict && <h4>Products</h4>}

        {/* Search Bar */}
      {!props.restrict &&  
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search products..."
        style={{
          padding:"10px"
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />}

      {/*Searched products Grid */}
      {search.trim() !== "" && (
        <div className="row"
          style={{
            overflowY:"scroll",
            maxHeight:"200px",
            padding:"0 80px",
            marginBottom:"30px",
          }}
        >
          {filteredProducts.map((p) => (
            <div className="col-md-3 mb-3" key={p._id}>
               
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h6>{p.name}</h6>
                  <p>₹{p.price}</p>

                  {p.quantity <= 0 ? (
                    <button className="btn btn-sm btn-secondary" disabled>
                      Out of Stock
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </button>
                  )}

                  {/* <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </button> */}
                </div>
              </div>
            </div>
          ))}

         <hr
        style={{
          width: "100%",
          margin: "20px auto",
          border: "2px solid #000000",
        }}
      />
        </div>
      )}

      <div className="row mt-3"
        style={{
          overflowY:"scroll",
          maxHeight:"700px",
          paddingTop:"10px",

        }}
      >
        {products.map((p) => (
          <div className="col-md-2 mb-3" key={p._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h6>{p.name}</h6>
                <p>₹{p.price}</p>

                 {p.quantity <= 0 ? (
                    <button className="btn btn-sm btn-secondary" disabled>
                      Out of Stock
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </button>
                  )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
