import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { useAuth } from "../context/FakeAuthContext";
import Button from "./Button";

export default function PageNav() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {!isAuthenticated ? (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          ) : (
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}
