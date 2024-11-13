import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Story.css';
import storyVideo from './assets/svideo.mp4'; 

function Story() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const response = await fetch('http://localhost:5000/api/user/data', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username); // Set the username in the state
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);
    const handleVideoEnd = () => {
        navigate('/Menu'); // Navigate to the map page once the video ends
    };
    const handleSkip = () => {
        navigate('/Menu'); // Navigate to the map page immediately if "Skip" is clicked
    };

    return (
        <div className="story-container">
            <h2 className="welcome-message">Congrajulations, you did it {username}</h2>
            <div className="video-wrapper">
                <video
                    src={storyVideo}
                    controls
                    autoPlay
                    onEnded={handleVideoEnd}
                    className="story-video"
                />
                <button className="skip-button" onClick={handleSkip}>
                    Skip Video
                </button>
            </div>
        </div>
    );
}

export default Story;
