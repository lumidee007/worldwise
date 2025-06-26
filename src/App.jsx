import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Pricing from "./Pages/Pricing";
import Product from "./Pages/Product";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import CityList from "./components/CityList";
import { useState, useEffect } from "react";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/cities");
        if (!res.ok) {
          throw new Error("fail to load cities");
        }
        const data = await res.json();
        setCities(data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  console.log(isLoading);
  console.log(cities);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />

          <Route path="app" element={<AppLayout />}>
            <Route index element={<p>App landing page</p>} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="countries" element={<p>Countries</p>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
