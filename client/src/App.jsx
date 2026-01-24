
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Suppliers from "./Pages/Suppliers";
import Purchases from "./Pages/Purchases";
import Stock from "./Pages/Stock";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



