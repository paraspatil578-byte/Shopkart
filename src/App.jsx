import { Routes, Route } from "react-router-dom";
import { ShopKartProvider } from "./context/ShopKartContext";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Cart from "./components/pages/Cart";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import ProductDetails from "./components/pages/ProductDetails";
import NotFound from "./components/pages/Notfound";
import Footer from "./components/Footer";

function App() {
  return (
    <ShopKartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </ShopKartProvider>
  );
}

export default App;