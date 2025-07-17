import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesContext";

export function formatDate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

export default function CityItem({ city }) {
  const { currentCity, removeCity } = useCities();
  const {
    emoji,
    cityName,
    date,
    id,
    position: { lat, lng },
  } = city;
  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            removeCity(id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
