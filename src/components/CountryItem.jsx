import React from "react";
import styles from "./CountryItem.module.css";

export default function CountryItem({ city }) {
  const { emoji, country } = city;
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{country}</h3>
    </li>
  );
}
