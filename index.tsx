
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Could not find root element.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Swasthya Rakshak initialized successfully.");
  } catch (error) {
    console.error("Render Error:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif; color: #003366;">
        <h1 style="font-size: 24px;">Unexpected Error | अनपेक्षित त्रुटि</h1>
        <p>The application failed to load. Please check your internet connection or browser compatibility.</p>
        <button onclick="window.location.reload()" style="background: #003366; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
}
