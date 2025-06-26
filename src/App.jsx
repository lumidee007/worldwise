import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Pricing from "./Pages/Pricing";
import Product from "./Pages/Product";
import AppLayout from "./Pages/AppLayout";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/app" element={<AppLayout />} />
        </Routes>
      </Router>
    </div>
  );
}
