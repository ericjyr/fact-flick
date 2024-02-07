// src/CardsPage.js
import React from 'react';
import Cards from './Cards';
import '../index.css'; // Import your CSS file for styling

const CardsPage = () => (
  <div className='card-page'>
    <div className='card-div'>
      <div id="next-card" className='next-card'></div>
      <Cards />
    </div>
  </div>
);

export default CardsPage;
