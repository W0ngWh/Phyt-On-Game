import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Story.css';

function Story() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/user/data', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username); 
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSkip = () => {
        navigate('/Map'); 
    };

    return (
        <div className="story-container">
            <h2 className="welcome-message">Welcome {username}, you need to defeat all the evil phyton questions to save me!</h2>
            <div className="video-wrapper">
            <button className="skip-button" onClick={handleSkip}>
                    Let's Go!
            </button>
            </div>
        </div>
        
    );
}

export default Story;
