// src/components/SearchBar.js
import './SearchBar.css';
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({setShowContent,setRes}) => {

  
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPostData({
      "registration_no": query
    });
    //  search=query;
    // Perform search or filtering logic here with the 'query' value
    // For example, you can filter data or make API calls based on the search query.
  };

  const [postData, setPostData] = useState({
    "registration_no": searchQuery
  });
  
  const handlePostRequest = () => {
    // API endpoint URL
    const apiUrl = 'http://localhost:5000/searchAirplaneByRegistration';

    // Optional: Headers for the request (e.g., if you need to send an authorization token)
    const headers = {
      'Content-Type': 'application/json',
      // Add any other required headers here
    };

    // Make the POST request using Axios
    axios.post(apiUrl, postData, { headers })
      .then((response) => {
        // Process the response data
        console.log('Response data:', response.data);
        setShowContent(true);
        setRes(response);
        // Do something with the data, if needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      });
  };

  return (
    <div className="search-bar-container">

      <input
        className="search-bar-input"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <div className="search-icon-container">
        <button onClick={handlePostRequest} className="my-button">
          Search
        </button>
      </div>
      
    </div>
    
  );
};

export {SearchBar};
