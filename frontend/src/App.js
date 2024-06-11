import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ResultsPage from './ResultsPage';
import Navbar from './navbar'; // Import the Navbar component
import './navbar.css'; // Imports the CSS file relative to the current directory
import './global.css'; // Import the global CSS file

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Add the Navbar component here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
