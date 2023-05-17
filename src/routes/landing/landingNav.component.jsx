import React from "react";
import { Link } from "react-router-dom";
import "./landingNav.styles.scss";

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <Link to="/signin" className="navbar-button navbar-login">
          Login
        </Link>
        <Link to="/signup" className="navbar-button navbar-signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
