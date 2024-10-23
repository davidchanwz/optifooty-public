// src/pages/Terms.tsx

import React from 'react';
import './Terms.css'; // Import the CSS file for styling

const Terms: React.FC = () => {
    return (
        <div className="terms-container">
            <h1>Terms of Service</h1>
            <section>
                <h2>1. Introduction</h2>
                <p>Welcome to OptiFooty! By using our website and services, you agree to the following terms and conditions.</p>
            </section>
            <section>
                <h2>2. User Accounts</h2>
                <p>To use certain features, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.</p>
            </section>
            <section>
                <h2>3. Use of Service</h2>
                <p>You agree to use our service only for lawful purposes and in accordance with these terms.</p>
            </section>
            <section>
                <h2>4. Privacy</h2>
                <p>We only collect user email addresses for authentication purposes, which are shared with Supabase for database management. We collect user team data provided by you, also shared with Supabase. We do not use cookies.</p>
            </section>
            <section>
                <h2>5. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. Continued use of the service indicates your acceptance of the new terms.</p>
            </section>
        </div>
    );
};

export default Terms;