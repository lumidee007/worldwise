import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <h1 className={styles.h1}>Sorry, page not found</h1>
      <Link to="/" className={styles.link}>
        Go back home
      </Link>
    </div>
  );
}
