import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <div className="contact-container">
            <div className="contact-info">
                <h3>Contact Information</h3>
                <p>Email: contact@optifooty.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 OptiFooty Street, Football City, FC 12345</p>
            </div>
        </div>
    );
};

export default Contact;