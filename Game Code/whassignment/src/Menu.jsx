import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import logo from './assets/logo.png';

function Menu() {
    return (
        <>  
            <div className="body-menu">
            <div className="game-title">
                <img src={logo} alt="Phyt-On Logo" className="logo" />  
                <div className="selections">
                    <Link to="/Story">
                        <button className="start-game-button">
                            Story!
                        </button>
                    </Link>

                    <Link to="/Challenge">
                        <button className="start-game-button">
                            Challenge!
                        </button>
                    </Link>

                    <Link to="/Multiplayer"> 
                        <button className="start-game-button">
                            Multiplayer!
                        </button>
                    </Link>

                    <Link to="/Leaderboard">
                        <button className="start-game-button">
                            Leaderboard!
                        </button>
                    </Link>

                    <Link to="/Login">
                        <button className="start-game-button">
                            Logout!
                        </button>
                    </Link>
                </div>
            </div>
            </div>
        </>
    );
}

export default Menu;
