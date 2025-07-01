import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        console.log("back button");
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}
