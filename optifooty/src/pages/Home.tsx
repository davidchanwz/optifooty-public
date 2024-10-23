// src/pages/Home.tsx

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import './Home.css'; // Import the CSS file for styling

const Home: React.FC = () => {
    const { user } = useAuth(); // Get the current user from the auth context
    const navigate = useNavigate(); // Get the navigate function for programmatic navigation

    const handleGetStartedClick = () => {
        if (user) {
            navigate('/your-team'); // Navigate to the "Your Team" page if the user is logged in
        } else {
            navigate('/login'); // Navigate to the "Login" page if the user is not logged in
        }
    };

    return (
        <div className="home">
            <section className="hero">
                <h1>Optimize Your FPL Team Effortlessly</h1>
                <p>Get the best insights and recommendations to maximize your FPL points.</p>
                <div className="cta-buttons">
                    <button onClick={handleGetStartedClick} className="btn-primary">Get Started</button>
                    <NavLink to="/about" className="btn-secondary">Learn More</NavLink>
                </div>
            </section>

            <section className="features">
                <h2>Features</h2>
                <div className="features-grid">
                    <NavLink to="/optimiser" className="feature-item">
                        <h3>Advanced Team Optimization</h3>
                        <p>Optimize your team with advanced algorithms to get the best performance.</p>
                    </NavLink>
                    <NavLink to="/stats" className="feature-item">
                        <h3>Comprehensive Player Stats</h3>
                        <p>Access detailed stats for every player to make informed decisions.</p>
                    </NavLink>
                    <NavLink to="/optimiser" className="feature-item">
                        <h3>Smart Transfer Suggestions</h3>
                        <p>Get smart transfer suggestions to improve your team's performance.</p>
                    </NavLink>
                </div>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <NavLink to="/login" className="step">
                        <h3>Step 1: Sign Up and Log In</h3>
                        <p>Create an account and log in to start optimizing your team.</p>
                    </NavLink>
                    <NavLink to="/your-team" className="step">
                        <h3>Step 2: Select Your Team</h3>
                        <p>Choose your team of 15 players from the player database.</p>
                    </NavLink>
                    <NavLink to="/optimiser" className="step">
                        <h3>Step 3: Optimize and Get Recommendations</h3>
                        <p>Optimize your team and get personalized recommendations.</p>
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default Home;