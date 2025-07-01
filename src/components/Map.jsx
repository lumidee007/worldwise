import React from "react";
import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <p>
        {lat}

        {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 20, lng: 59 })}>
        change position
      </button>
    </div>
  );
}
