import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../hooks/useUrlLocation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

function countryCodeToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlLocation();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const [emoji, setEmoji] = useState("");

  const { addNewCity, isLoading } = useCities();

  const navigate = useNavigate();

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(() => {
    if (!lat && !lng) return;
    async function getCityDetails() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const cityData = await res.json();
        console.log(cityData);

        if (!cityData.countryCode) {
          throw new Error(
            "That doesn't seem to be a city, click somewhere else."
          );
        }

        setCityName(cityData.city || "");
        setCountry(cityData.countryName || "");
        setEmoji(countryCodeToFlag(cityData.countryCode));
      } catch (e) {
        console.log(e.message);
        setGeocodingError(e.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    getCityDetails();
  }, [BASE_URL, lat, lng]);

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (!lat && !lng) {
    return <Message message="Click anywhere on the map to get started" />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !country || !date) {
      return;
    }

    const newCity = {
      cityName,
      country,
      notes,
      date,
      emoji,
      position: { lat, lng },
    };

    console.log(newCity);
    await addNewCity(newCity);
    navigate("/app/cities");
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="country">Country name</label>
        <input
          id="country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/YYYY"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {cityName}({country})
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
