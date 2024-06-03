
import './EmployeeDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiDeleteBinLine, RiAddLine } from 'react-icons/ri';

const EmployeeDetails = ({ children }) => {
  const [employees, setEmployee] = useState([]);
  const itemsPerPage = 10; // Set the number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [Edit, setEdit] = useState(false);
  const [Add, setAdd] = useState(false);
  // Calculate the total number of pages
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  // Get the current items to display based on the current page number
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  // Handle changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [Address, setAddress] = useState();
  const [Employee_ID, setEmployee_ID] = useState();
  const [First_name, setFirst_name] = useState();
  const [Last_name, setLast_name] = useState();
  const [Middle_Name, setMiddle_Name] = useState();
  const [Role, setRole] = useState();
  const [Salary, setSalary] = useState();
  const [Sex, setSex] = useState();
  const [Shift, setShift] = useState();
  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log('Edit item with ID:', id);
    setEdit(true);
    setAdd(false);
    setAddress(id.Address);
    setEmployee_ID(id.Employee_ID);
    setFirst_name(id.First_name);
    setLast_name(id.Last_name);
    setMiddle_Name(id.Middle_Name);
    setRole(id.Role);
    setSalary(id.Salary);
    setSex(id.Sex);
    setShift(id.Shift);
  };

  const handleDelete = (id, event) => {
    event.preventDefault();

    const apiUrl = 'http://localhost:5000/employees' + Employee_ID;

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
          axios.get('/getEmployee') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setEmployee(response.data))
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
    setAddress('');
    setEmployee_ID('');
    setFirst_name('');
    setLast_name('');
    setMiddle_Name('');
    setRole('');
    setSalary('');
    setSex('');
    setShift('');
    console.log('Add item with ID:', id);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleEmployee_ID = (event) => {
    setEmployee_ID(event.target.value);
  };
  const handleFirst_name = (event) => {
    setFirst_name(event.target.value);
  };
  const handleLast_name = (event) => {
    setLast_name(event.target.value);
  };
  const handleMiddle_Name = (event) => {
    setMiddle_Name(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleSalary = (event) => {
    setSalary(event.target.value);
  };
  const handleSex = (event) => {
    setSex(event.target.value);
  };
  const handleShift = (event) => {
    setShift(event.target.value);
  };


  const handleAddressAdd = (event) => {
    setAddress(event.target.value);
  };
  const handleEmployee_IDAdd = (event) => {
    setEmployee_ID(event.target.value);
  };
  const handleFirst_nameAdd = (event) => {
    setFirst_name(event.target.value);
  };
  const handleLast_nameAdd = (event) => {
    setLast_name(event.target.value);
  };
  const handleMiddle_NameAdd = (event) => {
    setMiddle_Name(event.target.value);
  };
  const handleRoleAdd = (event) => {
    setRole(event.target.value);
  };
  const handleSalaryAdd = (event) => {
    setSalary(event.target.value);
  };
  const handleSexAdd = (event) => {
    setSex(event.target.value);
  };
  const handleShiftAdd = (event) => {
    setShift(event.target.value);
  };
  const handleSubmit = (event) => {
    //setcapacity(event.target.value);
    event.preventDefault();
    const data = {
      "First_name": First_name,
      "Middle_Name": Middle_Name,
      "Last_name": Last_name,
      "Salary": Salary,
      "Sex": Sex,
      "Shift": Shift,
      "Address": Address,
      "Role": Role
    };
    const apiUrl = 'http://localhost:5000/employees/' + Employee_ID;

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
          axios.get('/getEmployee') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setEmployee(response.data))
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
      "Employee_ID": Employee_ID,
      "First_name": First_name,
      "Middle_Name": Middle_Name,
      "Last_name": Last_name,
      "Salary": Salary,
      "Sex": Sex,
      "Shift": Shift,
      "Address": Address,
      "Role": Role
    };
     const apiUrl = 'http://localhost:5000/employees';
 
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
         axios.get('/getEmployee') // The proxy is set to 'http://localhost:5000' in package.json
       .then(response => setEmployee(response.data))
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
  const dropdownOptions = ['Address', 'Employee_ID', 'First_name','Last_name','Middle_Name','Role','Salary','Sex','Shift'];
  const handleSearchChange = (query) => {
    setSearchBox(query);
  };
  const handlePostRequestSearch = (event) => {
    event.preventDefault();
    const data = {
      "column":selectedOption,
      "value":searchBox
    };
    const apiUrl = 'http://localhost:5000/search/employee';

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
        setEmployee(response.data);
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
    axios.get('/getEmployee') // The proxy is set to 'http://localhost:5000' in package.json
      .then(response => setEmployee(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);


  return (
    <div>
      <div className='align_table'>
        <div >
          <h1>Employees Data
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
          <table className="employeeAlign">
            <thead>
              <tr>
                <th className="employeeheader">Address</th>
                <th className="employeeheader">Employee_ID</th>
                <th className="employeeheader">First_name</th>
                <th className="employeeheader">Last_name</th>
                <th className="employeeheader">Middle_Name</th>
                <th className="employeeheader">Role</th>
                <th className="employeeheader">Salary</th>
                <th className="employeeheader">Sex</th>
                <th className="employeeheader">Shift</th>
                <th className="employeeheader">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee, index) => (
                <tr key={index}>
                  <td className="employeecell">{employee.Address}</td>
                  <td className="employeecell">{employee.Employee_ID}</td>
                  <td className="employeecell">{employee.First_name}</td>
                  <td className="employeecell">{employee.Last_name}</td>
                  <td className="employeecell">{employee.Middle_Name}</td>
                  <td className="employeecell">{employee.Role}</td>
                  <td className="employeecell">{employee.Salary}</td>
                  <td className="employeecell">{employee.Sex}</td>
                  <td className="employeecell">{employee.Shift}</td>
                  <td className="aproncell">
                    <span>
                      <RiEdit2Line
                        onClick={() => handleEdit(employee)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                      />
                    </span>
                    <span>
                      <RiDeleteBinLine
                        onClick={(e) => handleDelete(employee, e)}
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
            <div className='Align_label'>Edit Employee</div>
            <div className='form-group'>
                <div className='floatleft'>Address:</div>
                <input type="text" value={Address} onChange={handleAddress}  className='floatright'/>
              
            </div>
            <div className='form-group'>
              
              <div className='floatleft'>  Employee_ID:</div>
                <input type="text" value={Employee_ID} onChange={handleEmployee_ID} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

                <div className='floatleft'>First_name:</div>
                <input type="text" value={First_name} onChange={handleFirst_name}  className='floatright'/>
              
            </div>
            <div className='form-group'>
              

              <div className='floatleft'>  Last_name:</div>
                <input type="text" value={Last_name} onChange={handleLast_name} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

                <div className='floatleft'>Middle_Name:</div>
                <input type="text" value={Middle_Name} onChange={handleMiddle_Name} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

                <div className='floatleft'>Role:</div>
                <input type="text" value={Role} onChange={handleRole} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

               <div className='floatleft'> Salary:</div>
                <input type="text" value={Salary} onChange={handleSalary} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

              <div className='floatleft'>  Sex:</div>
                <input type="text" value={Sex} onChange={handleSex} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

                <div className='floatleft'>Shift:</div>
                <input type="text" value={Shift} onChange={handleShift} className='floatright'/>
              
            </div>
            <div><button type="submit">Save</button></div>
          </form>
        ) : null}

        {Add ?
          <form onSubmit={handleSubmitAdd} className='labelAlign'>
            <div className='Align_label'>Add new Employee:</div>
              <div className='form-group'>
                <div className='floatleft'>Address:</div>
                <input type="text" value={Address} onChange={handleAddressAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              
              <div className='floatleft'>  Employee_ID:</div>
                <input type="text" value={Employee_ID} onChange={handleEmployee_IDAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

              <div className='floatleft'>  First_name:</div>
                <input type="text" value={First_name} onChange={handleFirst_nameAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

                <div className='floatleft'>Last_name:</div>
                <input type="text" value={Last_name} onChange={handleLast_nameAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

              <div className='floatleft'>  Middle_Name:</div>
                <input type="text" value={Middle_Name} onChange={handleMiddle_NameAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

              <div className='floatleft'>  Role:</div>
                <input type="text" value={Role} onChange={handleRoleAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

              <div className='floatleft'>  Salary:</div>
                <input type="text" value={Salary} onChange={handleSalaryAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

               <div className='floatleft'> Sex:</div>
                <input type="text" value={Sex} onChange={handleSexAdd} className='floatright'/>
              
            </div>
            <div className='form-group'>
              

              <div className='floatleft'>  Shift:</div>
                <input type="text" value={Shift} onChange={handleShiftAdd} className='floatright'/>
              
            </div>
            <div><button type="submit">Save</button></div>
          </form>
          : null}
      </div>
    </div>
  );
};

export { EmployeeDetails };
