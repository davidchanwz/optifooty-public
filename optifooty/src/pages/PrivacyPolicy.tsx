import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="privacy-policy-container">
            <h1>Privacy Policy</h1>
            
            <section>
                <h2>Introduction</h2>
                <p>Welcome to OptiFooty. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
            </section>
            
            <section>
                <h2>Information We Collect</h2>
                <p>We collect the following types of information:</p>
                <ul>
                    <li><strong>Email Address:</strong> We collect your email address for authentication purposes.</li>
                    <li><strong>User Team Data:</strong> We collect data about the team you create and manage within our application.</li>
                </ul>
            </section>
            
            <section>
                <h2>How We Use the Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul>
                    <li>To provide, operate, and maintain our website and services.</li>
                    <li>To authenticate your identity and manage your user account.</li>
                    <li>To store and manage your team data.</li>
                </ul>
            </section>
            
            <section>
                <h2>Sharing Information with Third Parties</h2>
                <p>We share your information with Supabase, our backend service provider, which handles our authentication and database management.</p>
            </section>
            
            <section>
                <h2>Security of Information</h2>
                <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken steps to secure the information you provide, please be aware that no security measures are perfect or impenetrable.</p>
            </section>
            
            <section>
                <h2>User Rights</h2>
                <p>You have the following rights regarding your personal data:</p>
                <ul>
                    <li>The right to access – You have the right to request copies of your personal data.</li>
                    <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                    <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                </ul>
            </section>
            
            <section>
                <h2>Cookies</h2>
                <p>We do not use cookies or any other tracking technologies to collect your data.</p>
            </section>
            
            <section>
                <h2>Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </section>
            
            <section>
                <h2>Contact Information</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <ul>
                    <li>Email: contact@optifooty.com</li>
                </ul>
            </section>
        </div>
    );
};

export default PrivacyPolicy;