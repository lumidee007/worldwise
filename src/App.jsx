import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Pricing from "./Pages/Pricing";
import Product from "./Pages/Product";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />

              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities">
                  <Route index element={<CityList />} />
                  <Route path=":id" element={<City />} />
                </Route>
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}
