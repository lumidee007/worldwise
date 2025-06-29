import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import React from "react";

export default function City() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { id } = useParams();
  return (
    <div>
      <p>
        <strong>City : </strong>
        {id}
      </p>
      <p>
        <strong>Latitude :</strong>
        {lat}
        <p>
          <strong>Longitude :</strong>
          {lng}
        </p>
      </p>
    </div>
  );
}
