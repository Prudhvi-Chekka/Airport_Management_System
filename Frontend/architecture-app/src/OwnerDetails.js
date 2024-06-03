
import './OwnerDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiDeleteBinLine, RiAddLine } from 'react-icons/ri';

const OwnerDetails = ({ children }) => {
    const [owners, setowner] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [Edit, setEdit] = useState(false);
    const [Add, setAdd] = useState(false);
    // Calculate the total number of pages
    const totalPages = Math.ceil(owners.length / itemsPerPage);

    // Get the current items to display based on the current page number
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = owners.slice(indexOfFirstItem, indexOfLastItem);

    // Handle changing the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [owner_id, setowner_id] = useState();
    const[City,setCity]=useState();
    const[Name,setName]=useState();
    const[Phone_No,setPhone_No]=useState();
    const[State,setState]=useState();
    const[Street,setStreet]=useState();
    const[Type_of_owner,setType_of_owner]=useState();
    const[Zip,setZip]=useState();
    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit item with ID:', id);
        setEdit(true);
        setowner_id(id.owner_id);
        setCity(id.City);
        setName(id.Name);
        setPhone_No(id.Phone_No);
        setState(id.State);
        setStreet(id.Street);
        setType_of_owner(id.Type_of_owner);
        setZip(id.Zip);
        setAdd(false);
    };

    const handleDelete = (id,event) => {
      event.preventDefault();
        
      const apiUrl = 'http://localhost:5000/owns/' + owner_id;
  
      // Optional: Headers for the request (e.g., if you need to send an authorization token)
      const headers = {
        'Content-Type': 'application/json',
        // Add any other required headers here
      };
     
        // Make the POST request using Axios
        axios.delete(apiUrl, { headers })
          .then((response) => {
            // Process the response data
            console.log('Response data:', response.data);
            if (response.status === 200 && response.data.message === "Airport apron updated successfully.") {
              axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
              .then(response => setowner(response.data))
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
      console.log('Delete item with ID:', id);


    };
    const handleAdd = (id) => {

        // Implement your add logic here
        setAdd(true);
        setEdit(false);
        setowner_id('');
        setCity('');
        setName('');
        setPhone_No('');
        setState('');
        setStreet('');
        setType_of_owner('');
        setZip('');
        console.log('Add item with ID:', id);
    };
    
  const handleowner_id = (event) => {
    setowner_id(event.target.value);
  };
  const handleCity = (event) => {
    setCity(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePhone_No = (event) => {
    setPhone_No(event.target.value);
  };
  const handleState = (event) => {
    setState(event.target.value);
  };
  const handleStreet = (event) => {
    setStreet(event.target.value);
  };
  const handleType_of_owner = (event) => {
    setType_of_owner(event.target.value);
  };
  const handleZip = (event) => {
    setZip(event.target.value);
  };
  const handleowner_idAdd = (event) => {
    setowner_id(event.target.value);
  };
  const handleCityAdd = (event) => {
    setCity(event.target.value);
  };
  const handleNameAdd = (event) => {
    setName(event.target.value);
  };
  const handlePhone_NoAdd = (event) => {
    setPhone_No(event.target.value);
  };
  const handleStateAdd = (event) => {
    setState(event.target.value);
  };
  const handleStreetAdd = (event) => {
    setStreet(event.target.value);
  };
  const handleType_of_ownerAdd = (event) => {
    setType_of_owner(event.target.value);
  };
  const handleZipAdd = (event) => {
    setZip(event.target.value);
  };
  const handleSubmit = (event) => {
    //setcapacity(event.target.value);
    event.preventDefault();
    const data = {
      "City": City,
      "Name":Name,
      "Phone_No":Phone_No,
      "State":State,
      "Street":Street,
      "Type_of_owner":Type_of_owner,
      "Zip":Zip
    };
    const apiUrl = 'http://localhost:5000/owns/' + owner_id;

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
          if (response.status === 200 && response.data.message === "Type of plane updated successfully.") {
            axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setowner(response.data))
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
  const handleSubmitAdd = (event) => {
    //setcapacity(event.target.value);
    event.preventDefault();
    const data = {
      "owner_id": owner_id,
      "City": City,
      "Name":Name,
      "Phone_No":Phone_No,
      "State":State,
      "Street":Street,
      "Type_of_owner":Type_of_owner,
      "Zip":Zip
    };
    const apiUrl = 'http://localhost:5000/owns';

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
        axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
      .then(response => setowner(response.data))
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

  const [selectedOption, setSelectedOption] = useState('Option 1'); // For storing the selected option in the dropdown

  // Function to handle the dropdown selection
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [searchBox, setSearchBox] = useState('');
  // Options for the dropdown
  const dropdownOptions = ['owner_id', 'City', 'Name','Phone_No ','State','Street','Type_of_owner','Zip'];
  const handleSearchChange = (query) => {
    setSearchBox(query);
  };
  const handlePostRequestSearch = (event) => {
    event.preventDefault();
    const data = {
      "column":selectedOption,
      "value":searchBox
    };
    const apiUrl = 'http://localhost:5000/search/owns';

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
        setowner(response.data);
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
        axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setowner(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div className='align_table'>
            <div>
                <h1>Owners Data
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
                <table className="ownerAlign">
                    <thead>
                        <tr>
                            <th className="ownerheader">Owner ID</th>
                            <th className="ownerheader">City</th>
                            <th className="ownerheader">Name</th>
                            <th className="ownerheader">Phone_No</th>
                            <th className="ownerheader">State</th>
                            <th className="ownerheader">Street</th>
                            <th className="ownerheader">Type_of_owner</th>
                            <th className="ownerheader">Zip</th>
                            <th className="ownerheader">Actions</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((owner, index) => (
                            <tr key={index}>
                                <td className="ownercell">{owner.owner_id}</td>
                                <td className="ownercell">{owner.City}</td>
                                <td className="ownercell">{owner.Name}</td>
                                <td className="ownercell">{owner.Phone_No}</td>
                                <td className="ownercell">{owner.State}</td>
                                <td className="ownercell">{owner.Street}</td>
                                <td className="ownercell">{owner.Type_of_owner}</td>
                                <td className="ownercell">{owner.Zip}</td>
                                <td className="ownercell">
                                        <span>
                                            <RiEdit2Line
                                                onClick={() => handleEdit(owner)}
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                            />
                                        </span>
                                        <span>
                                            <RiDeleteBinLine
                                                onClick={(e) => handleDelete(owner,e)}
                                                style={{ cursor: 'pointer' }}
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
                        <div className='Align_label'>Edit Owner</div>
                        <div className='form-group'>
                        <div className='floatleft'>Owner ID:</div>
                          <input type="text" value={owner_id} onChange={handleowner_id} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                        <div className='floatleft'>City:</div>
                          <input type="text" value={City} onChange={handleCity} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Name:</div>
                          <input type="text" value={Name} onChange={handleName} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Phone_No:</div>
                          <input type="text" value={Phone_No} onChange={handlePhone_No} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>State:</div>
                          <input type="text" value={State} onChange={handleState} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Street:</div>
                          <input type="text" value={Street} onChange={handleStreet} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Type_of_owner:</div>
                          <input type="text" value={Type_of_owner} onChange={handleType_of_owner} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Zip:</div>
                          <input type="text" value={Zip} onChange={handleZip} className='floatright'/>
                        
                        </div>
                          <div><button type="submit">Save</button></div>
                      </form>
                    ) : null}

                    {Add ?
                        <form onSubmit={handleSubmitAdd} className='labelAlign'>
                        <div className='Align_label'>Add Owner:</div>
                        <div className='form-group'>
                        <div className='floatleft'>Owner_ID:</div>
                          <input type="text" value={owner_id} onChange={handleowner_idAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                        <div className='floatleft'>City:</div>
                          <input type="text" value={City} onChange={handleCityAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Name:</div>
                          <input type="text" value={Name} onChange={handleNameAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Phone_No:</div>
                          <input type="text" value={Phone_No} onChange={handlePhone_NoAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>State:</div>
                          <input type="text" value={State} onChange={handleStateAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Street:</div>
                          <input type="text" value={Street} onChange={handleStreetAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Type_of_owner:</div>
                          <input type="text" value={Type_of_owner} onChange={handleType_of_ownerAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Zip:</div>
                          <input type="text" value={Zip} onChange={handleZipAdd} className='floatright'/>
                        
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                        : null}
                </div>
        </div>
    );
};

export { OwnerDetails };
