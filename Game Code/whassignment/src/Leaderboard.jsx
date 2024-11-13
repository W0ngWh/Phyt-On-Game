import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Add error state for debugging

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/leaderboard');
                console.log('Leaderboard data:', response.data); 
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setError('Failed to load leaderboard.');  // Display an error message
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="body-leaderboard">
          <div className="leaderboard-container">
            <h1>Leaderboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>  // Display error if there's one
            ) : (
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Score</th>
                            <th>Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.length === 0 ? (
                            <tr>
                                <td colSpan="4">No leaderboard data available</td>
                            </tr>
                        ) : (
                            leaderboard.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{entry.username}</td>
                                    <td>{entry.score}</td>
                                    <td>{entry.difficulty}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
            <Link to="/Menu">
                <button className="start-game-button">
                    Return!
                </button>
            </Link>
          </div>
        </div>
    );  
};

export default Leaderboard;
