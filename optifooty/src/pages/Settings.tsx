// src/pages/Settings.tsx

import React, { useEffect, useState } from 'react';
import './Settings.css'; // Import the CSS for the settings page

const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="dark-mode-toggle">
        <label htmlFor="darkModeToggle">Dark Mode:</label>
        <button id="darkModeToggle" onClick={toggleDarkMode}>
          {isDarkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Settings;