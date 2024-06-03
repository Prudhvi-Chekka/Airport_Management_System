
import './ModelsData.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiDeleteBinLine, RiAddLine } from 'react-icons/ri';

const ModelsData = ({ children }) => {
  const [models, setmodel] = useState([]);
  const itemsPerPage = 10; // Set the number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [Edit, setEdit] = useState(false);
  const [Add, setAdd] = useState(false);
  // Calculate the total number of pages
  const totalPages = Math.ceil(models.length / itemsPerPage);

  // Get the current items to display based on the current page number
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = models.slice(indexOfFirstItem, indexOfLastItem);

  // Handle changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [Manufacturer, setManufacturer] = useState();
  const [Model, setModel] = useState();
  const [ApronNumber, setApronNumber] = useState();
  const [Last_Maintenance_Date, setLast_Maintenance_Date] = useState();
  const [Maintenance_Status, setMaintenance_Status] = useState();
  const [Registration_number, setRegistration_number] = useState();
  const [owner_id    , setowner_id  ] = useState();
  const [Purchase_date    , setPurchase_date  ] = useState();
  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log('Edit item with ID:', id);
    setManufacturer(id.Manufacturer);
    setModel(id.Model);
    setApronNumber(id.Apron_number);
    setLast_Maintenance_Date(id.Last_Maintenance_Date);
    setMaintenance_Status(id.Maintenance_Status);
    setRegistration_number(id.Registration_number);
    setowner_id(id.owner_id);
    setPurchase_date(id.Purchase_date);
    setEdit(true);
    setAdd(false);
  };

  const handleDelete = (id, event) => {
    // Implement your delete logic here
    event.preventDefault();

    const apiUrl = 'http://localhost:5000/airplanes/' + id.Registration_number;

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
          axios.get('/getAirplane') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setmodel(response.data))
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
    setManufacturer('');
    setModel('');
    setApronNumber('');
    setLast_Maintenance_Date('');
    setMaintenance_Status('');
    setRegistration_number('');
    setPurchase_date('');
    setowner_id('');
    console.log('Add item with ID:', id);
  };
  const handleChangeManufacturer = (event) => {
    setManufacturer(event.target.value);
  };
  const handleModel = (event) => {
    setModel(event.target.value);
  };
  const handleApron_number = (event) => {
    setApronNumber(event.target.value);
  };
  const handlePurchase_date  = (event) => {
    setPurchase_date    (event.target.value);
  };
  const handleowner_id  = (event) => {
    setowner_id (event.target.value);
  };
  const handleLast_Maintenance_Date = (event) => {
    setLast_Maintenance_Date(event.target.value);
  };
  const handleMaintenance_Status = (event) => {
    setMaintenance_Status(event.target.value);
  };

  const handleManufacturerAdd = (event) => {
    setManufacturer(event.target.value);
  };
  const handleModelAdd = (event) => {
    setModel(event.target.value);
  };
  const handleApron_numberAdd = (event) => {
    setApronNumber(event.target.value);
  };
  const handleLast_Maintenance_DateAdd = (event) => {
    setLast_Maintenance_Date(event.target.value);
  };
  const handleMaintenance_StatusAdd = (event) => {
    setMaintenance_Status(event.target.value);
  };
  const handleRegistration_numberAdd = (event) => {
    setRegistration_number(event.target.value);
  };
  const handleowner_idAdd = (event) => {
    setowner_id(event.target.value);
  };
  const handlePurchase_dateAdd = (event) => {
    setPurchase_date(event.target.value);
  };
  const handleSubmit = (event) => {
    //setcapacity(event.target.value);

  };
  const handleSubmitAdd = (event) => {
    //setcapacity(event.target.value);

  };
  const useHandleSave = (event) => {
    event.preventDefault();
    const data = {
      "Model": Model,
      "Manufacturer": Manufacturer,
      "Apron_number": ApronNumber,
      "Maintenance_Status": Maintenance_Status,
      "Last_Maintenance_Date": Last_Maintenance_Date,
      "Purchase_date":Purchase_date
    };
    const apiUrl = 'http://localhost:5000/airplanes/' + Registration_number;

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
          axios.get('/getAirplane') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setmodel(response.data))
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
      "Registration_number": Registration_number,
      "Model": Model,
      "Manufacturer": Manufacturer,
      "Apron_number": ApronNumber,
      "Maintenance_Status": Maintenance_Status,
      "Last_Maintenance_Date": Last_Maintenance_Date,
      "Purchase_date":Purchase_date
    };
    const apiUrl = 'http://localhost:5000/airplanes';

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
        axios.get('/getAirplane') // The proxy is set to 'http://localhost:5000' in package.json
          .then(response => setmodel(response.data))
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
  const dropdownOptions = ['Registration_number', 'Manufacturer', 'Model','Apron_number','Last_Maintenance_Date',
'Maintenance_Status','owner_id'];
  const handleSearchChange = (query) => {
    setSearchBox(query);
  };
  const handlePostRequestSearch = (event) => {
    event.preventDefault();
    const data = {
      "column":selectedOption,
      "value":searchBox
    };
    const apiUrl = 'http://localhost:5000/search/airplane';

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
        setmodel(response.data);
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
    axios.get('/getAirplane') // The proxy is set to 'http://localhost:5000' in package.json
      .then(response => setmodel(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);


  return (
    <div>
      <div className='align_table'>
        <h1>Plane Services
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

        <table className="modelAlign">
          <thead>
            <tr>
              <th className="modelheader">Registration No</th>
              <th className="modelheader">Manufacturer</th>
              <th className="modelheader">Model</th>
              <th className="modelheader">Apron Number</th>
              <th className="modelheader">Last_Maintenance_Date</th>
              <th className="modelheader">Maintenance_Status</th>
              <th className="modelheader">owner_id</th>
              <th className="modelheader">Purchase_date</th>
              <th className="modelheader">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((model, index) => (
              <tr key={index}>
                <td className="modelcell">{model.Registration_number}</td>
                <td className="modelcell">{model.Manufacturer}</td>
                <td className="modelcell">{model.Model}</td>
                <td className="modelcell">{model.Apron_number}</td>
                <td className="modelcell">{model.Last_Maintenance_Date}</td>
                <td className="modelcell">{model.Maintenance_Status}</td>
                <td className="modelcell">{model.owner_id}</td>
                <td className="modelcell">{model.Purchase_date}</td>
                <td className="aproncell">
                  <span>
                    <RiEdit2Line
                      onClick={() => handleEdit(model)}
                      style={{ cursor: 'pointer', marginRight: '10px' }}
                    />
                  </span>
                  <span>
                    <RiDeleteBinLine
                      onClick={(e) => handleDelete(model, e)}
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>



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
            <div className='Align_label'>Edit Model</div>
            <div className='form-group'>
              <div className='floatleft'>Manufacturer:</div>
              <input type="text" value={Manufacturer} onChange={handleChangeManufacturer} className='floatright'/>

            </div>
            <div className='form-group'>

              <div className='floatleft'>Model:</div>
              <input type="text" value={Model} onChange={handleModel} className='floatright'/>

            </div>
            <div className='form-group'>


              <div className='floatleft'>Apron_number:</div>
              <input type="text" value={ApronNumber} onChange={handleApron_number} className='floatright'/>

            </div>
            <div className='form-group'>
              

                <div className='floatleft'>Last_Maintenance_Date:</div>
                <input type="text" value={Last_Maintenance_Date} onChange={handleLast_Maintenance_Date} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

                <div className='floatleft'>Maintenance_Status:</div>
                <input type="text" value={Maintenance_Status} onChange={handleMaintenance_Status} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

                <div className='floatleft'>owner_id:</div>
                <input type="text" value={owner_id} onChange={handleowner_id} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

                <div className='floatleft'>Purchase_date:</div>
                <input type="text" value={Purchase_date} onChange={handlePurchase_date} className='floatright'/>
              
            </div>
            <div><button type="submit" onClick={useHandleSave}>Save</button></div>
          </form>
        ) : null}

        {Add ?
          <form onSubmit={handleSubmitAdd} className='labelAlign'>
            <div className='Align_label'>Add new Model:</div>
            <div className='form-group'>

              <div className='floatleft'>Manufacturer:</div>
              <input type="text" value={Manufacturer} onChange={handleManufacturerAdd} className='floatright'/>

            </div>
            <div className='form-group'>

              <div className='floatleft'>Registration_number:</div>
              <input type="text" value={Registration_number} onChange={handleRegistration_numberAdd} className='floatright'/>

            </div>
            <div className='form-group'>

              <div className='floatleft'>Model:</div>
              <input type="text" value={Model} onChange={handleModelAdd} className='floatright'/>

            </div>
            <div className='form-group'>

              <div className='floatleft'>Apron_number:</div>
              <input type="text" value={ApronNumber} onChange={handleApron_numberAdd} className='floatright'/>

            </div>
            <div className='form-group'>

              <div className='floatleft'>Last_Maintenance_Date:</div>
              <input type="text" value={Last_Maintenance_Date} onChange={handleLast_Maintenance_DateAdd} className='floatright'/>

            </div>
            <div className='form-group'>

              <div className='floatleft'>Maintenance_Status:</div>
              <input type="text" value={Maintenance_Status} onChange={handleMaintenance_StatusAdd} className='floatright'/>

            </div>
            <div className='form-group'>

<div className='floatleft'>owner_id:</div>
<input type="text" value={owner_id} onChange={handleowner_idAdd} className='floatright'/>

</div>
<div className='form-group'>

<div className='floatleft'>Purchase_date:</div>
<input type="text" value={Purchase_date} onChange={handlePurchase_dateAdd} className='floatright'/>

</div>
            <div><button type="submit" onClick={useHandleSaveAdd}>Save</button></div>
          </form>
          : null}
      </div>
    </div>
  );
};

export { ModelsData };
