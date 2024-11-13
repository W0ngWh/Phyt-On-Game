import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from './assets/header.png';

function Home() {
  return (
    <>  
      <div className="body-home">
        <div className="game-title">
          <img src={logo} alt="Phyt-On Logo" className="logo" />
          <div className="start-button">
            <Link to="/login">
              <button className="start-game-button">
                Start The Game!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
