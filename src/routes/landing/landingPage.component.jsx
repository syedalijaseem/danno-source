import React from "react";
import animatedImage from "../../assets/animatedImage.png";
import NavigationBar from "./landingNav.component";
import "./landingPage.styles.scss";

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <NavigationBar />
        <div className="landing-page-container">
          <div className="text underline-offset-8">
            <h1>Welcome to My App</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              sed dui eu nulla ultrices scelerisque in vel quam.
            </p>
            <button>Get Started</button>
          </div>
          <div className="image">
            <img src={animatedImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
