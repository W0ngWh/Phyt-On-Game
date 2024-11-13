import React, { useState } from 'react';
import './Login.css';
import "beercss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSlidingOut, setIsSlidingOut] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleLogin = async () => {
        setErrorMessage('');
        console.log({ email, password });

        try {
            if (!email || !password) {
                setErrorMessage('Email and password must not be empty.');
                return;
            }

            const response = await axios.post('http://localhost:5000/login', { email, password });
            console.log(response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/Menu');
            } else {
                setErrorMessage('Login failed. Please try again.');
            }
            
        } catch (error) {
            if (error.response) {
                const serverMessage = error.response.data.error;
                if (serverMessage === "Invalid credentials") {
                    setErrorMessage('Wrong credentials. Please try again.');
                } else {
                    setErrorMessage(serverMessage || 'An error occurred during login.');
                }
            } else {
                setErrorMessage('An error occurred during login.');
            }
        }
    };

    const handleRegisterRedirect = () => {
        setIsSlidingOut(true); 
        setTimeout(() => navigate('/Register'), 500); 
    };

    return (
        <div className="body-login">
            <div className={`container ${isSlidingOut ? 'slide-out' : ''}`}>
                <fieldset className="login-bar fade-in">
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
                    <button className="login-button" onClick={handleLogin}>Login</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </fieldset>

                <span className="reg-text" onClick={handleRegisterRedirect}>
                    Don't have an Account?
                </span>
            </div>
        </div>
    );
};

export default Login;
