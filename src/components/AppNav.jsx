import React from "react";
import { Link } from "react-router-dom";
import styles from "./AppNav.module.css";

export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="cities">Cities</Link>
        </li>
        <li>
          <Link to="countries">Countries</Link>
        </li>
      </ul>
    </nav>
  );
}
