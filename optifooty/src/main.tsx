// src/main.tsx

import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './App.css'; // Import global styles
import App from './App';

const container = document.getElementById('root'); // Get the root element
const root = createRoot(container!); // Create a root using createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);