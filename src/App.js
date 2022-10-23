import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
