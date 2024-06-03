// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
    const data = {
        "username": username,
        "password":password
    };
    const apiUrl = 'http://localhost:5000/login';

    // Optional: Headers for the request (e.g., if you need to send an authorization token)
    const headers = {
      'Content-Type': 'application/json',
      // Add any other required headers here
    };
    
    // Make the POST request using Axios
    axios.post(apiUrl, data, { headers })
      .then((response) => {
        // Process the response data
        setIsLoggedIn(true);
        // Do something with the data, if needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      });
    

    }

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>Username:</label></td>
                                <td><input type="text" value={username} onChange={event => setUsername(event.target.value)} className="login-input" /></td>
                            </tr>
                            <tr>
                                <td><label>Password:</label></td>
                                <td><input type="password" value={password} onChange={event => setPassword(event.target.value)} className="login-input" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export {LoginPage};