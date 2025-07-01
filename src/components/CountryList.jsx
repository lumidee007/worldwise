import React from "react";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return <Message message="Add you first City" />;
  }

  const uniqueCountries = cities.reduce((acc, city) => {
    const exists = acc.some((item) => item.country === city.country);
    if (!exists) {
      acc.push(city);
    }
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((city) => (
        <CountryItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
