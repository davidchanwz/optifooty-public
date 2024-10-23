// src/pages/About.tsx

import React from "react";
import david from "../assets/images/david.png";
import stanley from "../assets/images/stanley.png";
import logo from "../assets/images/logo.png";

import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-logo-container">
        <img src={logo} alt="OptiFooty Logo" className="about-logo" />
      </div>
      <section className="about-section">
        <h2>About OptiFooty</h2>
        <p>
          OptiFooty is your ultimate Fantasy Premier League (FPL) team
          optimizer. Our platform provides cutting-edge tools and insights to
          help you create and manage your perfect FPL team. Whether you're a
          seasoned FPL manager or just getting started, OptiFooty is designed to
          enhance your FPL experience.
        </p>
      </section>
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At OptiFooty, our mission is to empower FPL managers with the best
          tools and data-driven insights. We aim to simplify the decision-making
          process, making it easier for you to achieve success in your FPL
          league. With our user-friendly interface and powerful optimization
          algorithms, we are committed to helping you stay ahead of the
          competition.
        </p>
      </section>
      <section className="about-section">
        <h2>About Us</h2>
        <div className="about-us">
          <div className="about-person">
            <img src={david} alt="Your Name" className="about-photo" />
            <h3>David Chan</h3>
            <p>
              David is a passionate football enthusiast and data analyst. With a
              keen eye for detail and a love for the beautiful game, David
              co-leads the OptiFooty project, ensuring that our platform
              delivers top-notch performance and user satisfaction.
            </p>
          </div>
          <div className="about-person">
            <img src={stanley} alt="Partner's Name" className="about-photo" />
            <h3>Stanley Hsu</h3>
            <p>
              Stanley brings a wealth of experience in software development and
              project management. As a co-leader of the OptiFooty project,
              Stanley is dedicated to creating a seamless and intuitive user
              experience, leveraging the latest technologies to make OptiFooty
              the best FPL tool available.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
