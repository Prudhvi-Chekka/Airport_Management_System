// App.js
import React, { useState } from 'react';
import './App.css';
import { SearchBar } from './SearchBar';
import { Details } from './Details';
import { LoginPage } from './LoginPage';

function App() {
    const [res, setRes] = useState();
    const [showContent, setShowContent] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    if (isLoggedIn) {
        return (
            <div >
                <div className='alignsearch'>
                    <h1 className='align_title'>Airport Management System</h1>
                    <SearchBar setShowContent={setShowContent} setRes={setRes} />
                    {/* Render the results or other components based on the searchQuery if needed */}
                    {/* <p>Search Query: {searchQuery}</p> */}
                </div>
                <Details showContent={showContent} res={res} />
            </div>
        
        );
    } else {
        return (
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
        );
    }


}

export default App;
