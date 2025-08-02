import React from "react";
import styles from "./User.module.css";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
