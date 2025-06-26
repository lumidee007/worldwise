import React from "react";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return <Message message="Add you first City" />;
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
