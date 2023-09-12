//import React from "react";
import ferrariImage from "./ferrari.jpg";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <img src={ferrariImage} alt="FerrariImage" />
      <div className="objectives-text">
        <h4>Welcome to the F1 Drivers APP</h4>
        <p>Where you can:</p>
        <ul>
          <li>Search for different drivers.</li>
          <li>Watch drivers details.</li>
          <li>Apply different filters.</li>
          <li>Order all the drivers.</li>
          <li>Create a new driver. </li>
        </ul>
      </div>
    </div>
  );
};

export default Landing;
