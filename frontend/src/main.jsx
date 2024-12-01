import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Styles for your app
import App from './App.jsx'; // Root component
import { BrowserRouter } from "react-router-dom"; // Enables routing

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
