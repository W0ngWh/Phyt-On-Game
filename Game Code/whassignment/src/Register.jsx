import React, { useState } from 'react';
import './Register.css';
import "beercss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(''); 
    const [isSlidingOut, setIsSlidingOut] = useState(false); 
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError('');
        if (!email || !password || !confirmPassword || !username) {
            setError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!email.endsWith('@gmail.com')) {
            setError('Error in Entered Email');
            return 
          }
        try {
            const response = await axios.post('http://localhost:5000/register', {
                email,
                password,
                username
            });
            console.log(response.data);
            setIsSlidingOut(true); 
            setTimeout(() => navigate('/login'), 500); 
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error); 
            } else {
                setError('An error occurred during registration.');
            }
        }
    };

    return (
        <div className='body-register'>
            <div className={`container ${isSlidingOut ? 'slide-out' : ''}`}>
                <fieldset className="register-bar fade-in">
                    <legend className='Fid'>Fill in Details</legend>
                    <div className="field border label">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                        />
                        <label>Email</label>
                    </div>
                    <div className="field border label">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                        />
                        <label>Password</label>
                    </div>
                    <div className="field border label">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder=""
                        />
                        <label>Confirm Password</label>
                    </div>
                    <div className="field border label">
                        <input
                            type="Textarea"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder=""
                        />
                        <label>Username</label>
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button className='register-button' onClick={handleRegister}>Register</button>
                </fieldset>

                <span className='reg-text' onClick={() => {
                    setIsSlidingOut(true); // Trigger slide-out animation
                    setTimeout(() => navigate('/login'), 500); 
                }}>
                    Have an Account?
                </span>
            </div>
        </div>
    );
}

export default Register;
