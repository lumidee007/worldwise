import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Logo.module.css";
export default function Logo() {
  return (
    <Link to="/">
      <img src="../../public/img/logo.png" className={Styles.logo} />
    </Link>
  );
}
