import { lazy, Suspense } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import SpinnerFullPage from "./components/SpinnerFullPage";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

const Homepage = lazy(() => import("./Pages/Homepage"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Product = lazy(() => import("./Pages/Product"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/Login"));
const NotFound = lazy(() => import("./Pages/NotFound"));

export default function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <Router>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="product" element={<Product />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="cities" replace />} />
                  <Route path="cities">
                    <Route index element={<CityList />} />
                    <Route path=":id" element={<City />} />
                  </Route>
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}
