import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useSwipeable } from 'react-swipeable';
import Draggable from 'react-draggable';

const Cards = () => {
  const [facts, setFacts] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [colorIndex, setColorIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const colorSets = [
    { cardPage: '#48383c', nextCard: '#ffac55', flyingCard: '#93da8a'},
    { cardPage: '#376b75', nextCard: '#90d5d0', flyingCard:'#ffac55'},
    { cardPage: '#2f2d47', nextCard: '#ffafaf', flyingCard:'#90d5d0'},
    { cardPage: '#1d4547', nextCard: '#26a988', flyingCard:'#ffafaf'},
    { cardPage: '#344759', nextCard: '#93da8a', flyingCard: '#26a988'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/facts?limit=30', {
          headers: {
            'X-Api-Key': process.env.API_KEY,
          },
        });

        setFacts(response.data);
      } catch (error) {
        console.error('Error fetching facts:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateInitialPosition = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const initialX = windowWidth / 1000;
      const initialY = windowHeight / 1000;

      setInitialPosition({ x: initialX, y: initialY });
    };

    calculateInitialPosition();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      calculateInitialPosition();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNextCard = (direction) => {
    const newPosition = direction === 'left' ? 'left' : 'right';
  
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % facts.length);
  
    const colors = colorSets[colorIndex];
    document.documentElement.style.setProperty('--card-page-color', colors.cardPage);
    document.documentElement.style.setProperty('--next-card-color', colors.nextCard);
    document.documentElement.style.setProperty('--flying-card-color', colors.flyingCard);
  
    document.getElementById('next-card').classList.add('rotate-back');
    document.getElementById('swiper').classList.add(`fly-${newPosition}`);
  
    setTimeout(() => {
      document.getElementById('next-card').classList.remove('rotate-back');
      document.getElementById('swiper').classList.remove(`fly-${newPosition}`);
    }, 500);
  
    setTimeout(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colorSets.length);
    }, 1000);
  };
  
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextCard('left'),
    onSwipedRight: () => handleNextCard('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleDragStop = (e, ui) => {
    document.getElementById('swiper').classList.remove('fly-left', 'fly-right');
  };

  const renderCardContainer = () => {
    if (isMobile) {
      return (
        <div id="swiper" className="card-container" {...swipeHandlers}>
          {facts.length > 0 && (
            <Card className={`rotate-next-card`}>
              <Card.Body>
                <Card.Text className='no-select card-text' style={{ color: '#fff' }}>
                  {facts[currentCardIndex].fact}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>
      );
    } else {
      return (
        <Draggable {...swipeHandlers} onStop={handleDragStop} defaultPosition={initialPosition} position={initialPosition}>
          <div id="swiper" className="card-container">
            {facts.length > 0 && (
              <Card className={`rotate-next-card`}>
                <Card.Body>
                  <Card.Text className='no-select card-text' style={{ color: '#fff' }}>
                    {facts[currentCardIndex].fact}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
        </Draggable>
      );
    }
  };

  return renderCardContainer();
};

export default Cards;
