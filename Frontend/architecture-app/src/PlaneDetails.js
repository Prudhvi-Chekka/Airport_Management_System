
import './PlaneDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiAddLine } from 'react-icons/ri';

const PlaneDetails = ({ children }) => {
    const [planes, setPlanes] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [Edit, setEdit] = useState(false);
    const [Add, setAdd] = useState(false);

    // Calculate the total number of pages
    const totalPages = Math.ceil(planes.length / itemsPerPage);

    // Get the current items to display based on the current page number
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = planes.slice(indexOfFirstItem, indexOfLastItem);
    const [Model, setModel] = useState();
    const[Fuel_Capacity,setFuel_Capacity]=useState();
    const[Weight,setWeight]=useState();
    const[Maximum_Range	,setMaximum_Range	]=useState();
    const[Seating_Capacity,setSeating_Capacity]=useState();
    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit item with ID:', id);
        setEdit(true);
        setAdd(false);
        setModel(id.Model);
        setWeight(id.Weight);
        setFuel_Capacity(id.Fuel_Capacity);
        setMaximum_Range(id.Maximum_Range);
        setSeating_Capacity(id.Seating_Capacity);
    };

    
    const handleAdd = (id) => {

        // Implement your add logic here
        setAdd(true);
        setEdit(false);
        setModel('');
        setWeight('');
        setFuel_Capacity('');
        setMaximum_Range('');
        setSeating_Capacity('');
        console.log('Add item with ID:', id);
    };
    const handleModel = (event) => {
        setModel(event.target.value);
      };
      const handleFuel_Capacity = (event) => {
        setFuel_Capacity(event.target.value);
      };
      const handleWeight = (event) => {
        setWeight(event.target.value);
      };
      const handleMaximum_Range = (event) => {
        setMaximum_Range(event.target.value);
      };
      const handleSeating_Capacity = (event) => {
        setSeating_Capacity(event.target.value);
      };
      const handleModelAdd = (event) => {
        setModel(event.target.value);
      };
      const handleWeightAdd = (event) => {
        setWeight(event.target.value);
      };
      const handleFuel_CapacityAdd = (event) => {
        setFuel_Capacity(event.target.value);
      };
      const handleMaximum_RangeAdd = (event) => {
        setMaximum_Range(event.target.value);
      };
      const handleSeating_CapacityAdd = (event) => {
        setSeating_Capacity(event.target.value);
      };
      const handleSubmit = (event) => {
        //setcapacity(event.target.value);
        event.preventDefault();
    const data = {
      "Fuel_Capacity": Fuel_Capacity,
      "Maximum_Range": Maximum_Range,
      "Weight": Weight,
      "Seating_Capacity": Seating_Capacity
    };
    const apiUrl = 'http://localhost:5000/type_of_planes/' + Model;

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
            axios.get('/getTypeOfPlane') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setPlanes(response.data))
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
        event.preventDefault();
        const data = {
          "Model": Model,
          "Fuel_Capacity": Fuel_Capacity,
          "Maximum_Range": Maximum_Range,
          "Weight": Weight,
          "Seating_Capacity": Seating_Capacity
        };
        const apiUrl = 'http://localhost:5000/type_of_plane';
    
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
            axios.get('/getTypeOfPlane') // The proxy is set to 'http://localhost:5000' in package.json
          .then(response => setPlanes(response.data))
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
    // Handle changing the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [selectedOption, setSelectedOption] = useState('Option 1'); // For storing the selected option in the dropdown

  // Function to handle the dropdown selection
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [searchBox, setSearchBox] = useState('');
  // Options for the dropdown
  const dropdownOptions = ['Model', 'Fuel_Capacity', 'Weight','Maximum_Range','Seating_Capacity'];
  const handleSearchChange = (query) => {
    setSearchBox(query);
  };
  const handlePostRequestSearch = (event) => {
    event.preventDefault();
    const data = {
      "column":selectedOption,
      "value":searchBox
    };
    const apiUrl = 'http://localhost:5000/search/typeOfPlane';

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
        setPlanes(response.data);
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
        axios.get('/getTypeOfPlane') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setPlanes(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div className='align_table'>
            <div>
                <h1>Models Data
                <RiAddLine
                            onClick={() => handleAdd(123)}
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                        />
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
                </h1>
                <table className="planeAlign">
                    <thead>
                        <tr>
                            <th className="planeheader">Model</th>
                            <th className="planeheader">Fuel_Capacity</th>
                            <th className="planeheader">Weight</th>
                            <th className="planeheader">Maximum_Range</th>
                            <th className="planeheader">Seating_Capacity</th>
                            <th className="planeheader">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((plane, index) => (
                            <tr key={index}>
                                <td className="planecell">{plane.Model}</td>
                                <td className="planecell">{plane.Fuel_Capacity}</td>
                                <td className="planecell">{plane.Weight}</td>
                                <td className="planecell">{plane.Maximum_Range}</td>
                                <td className="planecell">{plane.Seating_Capacity}</td>
                                <td className="aproncell">
                                        <span>
                                            <RiEdit2Line
                                                onClick={() => handleEdit(plane)}
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
                        <div className='Align_label'>Edit Plane</div>
                        <div className='form-group'>
                        
                        <div className='floatleft'>Model:</div>
                          <input type="text" value={Model} onChange={handleModel} className='floatright'/>
                       
                        </div>
                        <div className='form-group'>
                        
                        <div className='floatleft'>Fuel_Capacity:</div>
                          <input type="text" value={Fuel_Capacity} onChange={handleFuel_Capacity} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Weight:</div>
                          <input type="text" value={Weight} onChange={handleWeight} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Maximum_Range:</div>
                          <input type="text" value={Maximum_Range} onChange={handleMaximum_Range} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        <div className='floatleft'>
                            
                        Seating_Capacity:</div>
                          <input type="text" value={Seating_Capacity} onChange={handleSeating_Capacity} className='floatright'/>
                          
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                    ) : null}

                    {Add ?
                        <form onSubmit={handleSubmitAdd} className='labelAlign'>
                        <div className='Align_label'>Add new Plane:</div>
                        <div className='form-group'>
                          <div className='floatleft'>Model:</div>
                        
                          <input type="text" value={Model} onChange={handleModelAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                        <div className='floatleft'>Fuel_Capacity:</div>
                          <input type="text" value={Fuel_Capacity} onChange={handleFuel_CapacityAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                        <div className='floatleft'>Weight:</div> 
                          <input type="text" value={Weight} onChange={handleWeightAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Maximum_Range:</div>
                          <input type="text" value={Maximum_Range} onChange={handleMaximum_RangeAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        <div className='floatleft'>
                            
                        Seating_Capacity:</div>
                          <input type="text" value={Seating_Capacity} onChange={handleSeating_CapacityAdd} className='floatright'/>
                          
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                        : null}
                </div>
        </div>
    );
};

export { PlaneDetails };
