// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CardsPage from './components/CardsPage';

const App = () => {
  return (
   <Router basename="/fact-flick">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<CardsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
