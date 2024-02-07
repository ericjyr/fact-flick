// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import factFlickLogo from '../assets/img/fact-flick-logo.png';
import planetImg from "../assets/img/planet.svg";
import '../index.css'
import 'animate.css';

const Home = () => {
  return (
    <div className='main-content'>
    <Container>
        <Row>
            <div className='header-div'>
                <img src={factFlickLogo}  alt="Fact Flick Logo" className='logo-img' />
                <h1>Fact Flick</h1>
            </div>
        </Row>
        <Row>
            <Col sm={12} md={6}>
            <div className={ "planet-div animate__animated animate__zoomIn" }>
            <img src={planetImg} alt="image of a planet" className='planet-img' />
                </div>
                <div className='text-container'>
                <div className='text-div'>
                <h2>Facts that Spark Enlightenment</h2>
                <p>Explore fascinating facts that ignite curiosity and nurture mental vitality with Fact Flick.</p>
                <Link to="/cards">
                    <button className='button-obj'>Let's Go</button>
                </Link>
                </div>
                </div>
            </Col>
            <Col sm={12} md={6}>
            <div className='img-div'>
              <div className='phone-demo'> </div>
            </div>
            </Col>
        </Row>
    </Container>
    </div>
  );
};

export default Home;
