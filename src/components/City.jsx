import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import Spinner from "./Spinner";
import styles from "./City.module.css";
import styles2 from "./Form.module.css";
import BackButton from "./BackButton";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function City() {
  // const [searchParams] = useSearchParams();

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  if (isLoading || !currentCity) {
    return <Spinner />;
  }

  const { cityName, emoji, notes, date } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div className={styles.buttons}>
        <BackButton />
      </div>
    </div>
  );
}
