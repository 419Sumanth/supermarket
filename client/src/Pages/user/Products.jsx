import { useState, useEffect } from "react";
import productApi from "../../api/productApi"

function Products(props) {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log("filtered products : ", filteredProducts)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAllProducts();
        setProducts(data.data.products);
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
            // position:"absolute",
            // zIndex:"100",
            // background:"black"
          }}
        >
          {filteredProducts.map((p) => (
            <div className="col-md-3 mb-3" key={p._id}>
               
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h6>{p.name}</h6>
                  <p>₹{p.price}</p>

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </button>
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

      {/* {!props.restrict && <hr
        style={{
          width: "100%",
          margin: "20px auto",
          border: "2px solid #000000",
        }}
      />} */}

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
