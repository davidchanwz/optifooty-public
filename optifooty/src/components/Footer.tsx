import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css'; // Import the CSS file for the footer

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/privacy">Privacy Policy</NavLink>
                <NavLink to="/terms">Terms of Service</NavLink>
            </div>
        </footer>
    );
};

export default Footer;