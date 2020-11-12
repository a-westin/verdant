import React from "react";
import "./Landing.css";
import Gardening from "../../Images/gardening.png";

function Landing(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="landingHeading"><strong>Verdant</strong></h1>
          <img src={Gardening} alt="Gardening" height="400" width="400" />
        </div>
      </div>
    </div>
  );
}

export default Landing;