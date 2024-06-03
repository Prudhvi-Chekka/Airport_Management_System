
import './ApronDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiAddLine } from 'react-icons/ri';

const ApronDetails = ({ children }) => {
  const [aprons, setapron] = useState([]);
  const itemsPerPage = 10; // Set the number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [Edit, setEdit] = useState(false);
  const [Add, setAdd] = useState(false);
  // Calculate the total number of pages
  const totalPages = Math.ceil(aprons.length / itemsPerPage);

  // Get the current items to display based on the current page number
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = aprons.slice(indexOfFirstItem, indexOfLastItem);

  // Handle changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [capacity, setcapacity] = useState();
  const [ApronType, setApronType] = useState();
  const [ApronStatus, setApronStatus] = useState();
  const [Apron_number, setApron_number] = useState();
  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log('Edit item with ID:', id);
    setEdit(true);
    setcapacity(id.Aircraft_Capacity);
    setApronType(id.Apron_type);
    setApronStatus(id.Apron_status);
    setApron_number(id.Apron_number);
    setAdd(false);
  };


  const handleAdd = (id) => {

    // Implement your add logic here
    setAdd(true);
    setEdit(false);
    setcapacity('');
    setApronType('');
    setApronStatus('');
    setApron_number('');
    console.log('Add item with ID:', id);
  };
  const useHandleSave = (event) => {
    event.preventDefault();
    const data = {
      "Apron_type": ApronType,
      "Aircraft_Capacity": capacity,
      "Apron_status": ApronStatus
    };
    const apiUrl = 'http://localhost:5000/airport_aprons/' + Apron_number;

    // Optional: Headers for the request (e.g., if you need to send an authorization token)
    const headers = {
      'Content-Type': 'application/json',
      // Add any other required headers here
    };
   
      // Make the POST request using Axios
      axios.put(apiUrl, data, { headers })
        .then((response) => {
          // Process the response data
          console.log('Response data:', response.data);
          if (response.status === 200 && response.data.message === "Airport apron updated successfully.") {
            axios.get('/getAirportAprons') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setapron(response.data))
            .catch(error => console.error('Error fetching data', error));
            setAdd(false);
    setEdit(false);
              // Do something with the data, if needed
          }

          // Do something with the data, if needed
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle any errors that occurred during the request
        });
    
  };
  

  const useHandleSaveAdd = (event) => {
    event.preventDefault();
    const data = {
      "Apron_number": Apron_number,
      "Apron_type": ApronType,
      "Aircraft_Capacity": capacity,
      "Apron_status": ApronStatus
    };
    const apiUrl = 'http://localhost:5000/airport_apron';

    // Optional: Headers for the request (e.g., if you need to send an authorization token)
    const headers = {
      'Content-Type': 'application/json',
      // Add any other required headers here
    };
    
    // Make the POST request using Axios
    axios.post(apiUrl, data, { headers })
      .then((response) => {
        // Process the response data
        console.log('Response data:', response.data);
        axios.get('/getAirportAprons') // The proxy is set to 'http://localhost:5000' in package.json
      .then(response => setapron(response.data))
      .catch(error => console.error('Error fetching data', error));
      setAdd(false);
    setEdit(false);
        // Do something with the data, if needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      });
    
  };
  const handleChangecapacity = (event) => {
    setcapacity(event.target.value);
  };
  const handleApronType = (event) => {
    setApronType(event.target.value);
  };
  const handleApronStatus = (event) => {
    setApronStatus(event.target.value);
  };
  const handleChangecapacityAdd = (event) => {
    setcapacity(event.target.value);
  };
  const handleApronTypeAdd = (event) => {
    setApronType(event.target.value);
  };
  const handleApronStatusAdd = (event) => {
    setApronStatus(event.target.value);
  };
  const handleSubmit = (event) => {
    //setcapacity(event.target.value);
    event.preventDefault();
  };
  const handleSubmitAdd = (event) => {
    //setcapacity(event.target.value);

  };
  const [selectedOption, setSelectedOption] = useState('Option 1'); // For storing the selected option in the dropdown

  // Function to handle the dropdown selection
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [searchBox, setSearchBox] = useState('');
  // Options for the dropdown
  const dropdownOptions = ['Apron_number', 'Aircraft_Capacity', 'Apron_status','Apron_type'];
  const handleSearchChange = (query) => {
    setSearchBox(query);
  };
  const handlePostRequestSearch = (event) => {
    event.preventDefault();
    const data = {
      "column":selectedOption,
      "value":searchBox
    };
    const apiUrl = 'http://localhost:5000/search/airport_apron';

    // Optional: Headers for the request (e.g., if you need to send an authorization token)
    const headers = {
      'Content-Type': 'application/json',
      // Add any other required headers here
    };
    
    // Make the POST request using Axios
    axios.post(apiUrl, data, { headers })
      .then((response) => {
        // Process the response data
        console.log('Response data:', response.data);
        setapron(response.data);
      setAdd(false);
    setEdit(false);
        // Do something with the data, if needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      });

  };

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('/getAirportAprons') // The proxy is set to 'http://localhost:5000' in package.json
      .then(response => setapron(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);


  return (
    <div>
      <div className='align_table'>
        <div>
          <h1>Aprons Data
            <RiAddLine
              onClick={() => handleAdd(123)}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />

<div>
      
      <form className="dropdown-container">
        <label htmlFor="dropdown" className="dropdown-label"></label>
        <select id="dropdown" value={selectedOption} onChange={handleDropdownChange} className="dropdown-select">
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
        className="search-bar-input"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <button onClick={handlePostRequestSearch} className="my-button">
          Search
        </button>
      <div className="search-icon-container">
        
      </div>
        
      </form>
      
    </div>
          </h1>
          <table className="apronAlign">
            <thead>
              <tr>
                <th className="apronheader">Apron Number</th>
                <th className="apronheader">Capacity</th>
                <th className="apronheader">Apron Status</th>
                <th className="apronheader">Apron Type</th>
                <th className="apronheader">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((apron, index) => (
                <tr key={index}>
                  <td className="aproncell">{apron.Apron_number}</td>
                  <td className="aproncell">{apron.Aircraft_Capacity}</td>
                  <td className="aproncell">{apron.Apron_status}</td>
                  <td className="aproncell">{apron.Apron_type}</td>
                  <td className="aproncell">
                    <span>
                      <RiEdit2Line
                        onClick={() =>handleEdit(apron)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                      />
                    </span>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        <div>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
      <div className='align_form'>
        {Edit ? (
          <form onSubmit={handleSubmit} className='labelAlign'>
          <div className='Align_label'>Edit Apron</div>
          <div className='form-group'>
            <div className='floatleft'>Capacity:</div>
            <input type='text' value={capacity} className='floatright' onChange={handleChangecapacity} />
          </div>
          <div className='form-group'>
            <div className='floatleft'>Apron Status:</div>
            <input type='text' className='floatright' value={ApronStatus} onChange={handleApronStatus} />
          </div>
          <div className='form-group'>
            <div className='floatleft'>Apron Type:</div>
            <input type='text' className='floatright' value={ApronType} onChange={handleApronType} />
          </div>
          <div>
            <button type='submit' onClick={useHandleSave}>Save</button>
          </div>
        </form>
        
        ) : null}

        {Add ?
          <form onSubmit={handleSubmitAdd} className='labelAlign'>
            <div className='Align_label'>Add new Apron:</div>
            <div className='form-group'>
              
                <div className='floatleft'>Capacity:</div>
                <input type="text" value={capacity} onChange={handleChangecapacityAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              
                <div className='floatleft'>Apron Status:</div>
                <input type="text" value={ApronStatus} onChange={handleApronStatusAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

                <div className='floatleft'>Apron Type:</div>
                <input type="text" value={ApronType} onChange={handleApronTypeAdd} className='floatright'/>
              
            </div>
            <div><button type="submit" onClick={ useHandleSaveAdd}>Save</button></div>
          </form>
          : null}
      </div>

    </div>
  );
};

export { ApronDetails };
