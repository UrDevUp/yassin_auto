import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import "./App.css";

function ComingSoon({ title }) {
  return (
    <div
      className="container"
      style={{ padding: "80px 0", textAlign: "center" }}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "8px" }}>
        {title}
      </h2>
      <p style={{ color: "var(--gray-light)" }}>هذه الصفحة قيد الإنشاء 🚧</p>
    </div>
  );
}

function App() {
  return (
    <div className="app" dir="rtl" lang="ar">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/admin" element={<ComingSoon title="لوحة التحكم" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
