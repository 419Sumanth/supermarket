import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import UserDashboard from "./Pages/user/UserDashboard";
import { AuthProvider } from "./context/Authcontext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    
     <AuthProvider>
      <ProductProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/user/*" element={<UserDashboard />} />
      </Routes>
      </BrowserRouter>
       </ProductProvider>
    </AuthProvider>
    
  );
}

export default App;
