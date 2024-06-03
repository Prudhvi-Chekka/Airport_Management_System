
import './EmployeeSearch.css'; // Import the CSS file for styling
import React, { useState,useEffect} from 'react';



const EmployeeSearch = ({res}) => {
    
    const [employees, setemployee] = useState([]);
    useEffect(() => {
        setemployee(res.data.employees);
      }, [res.data.employees]);
    
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

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

    


    return (
        <div>
            <div>
                <h1>Employees Data</h1>
                <table className="employeeAlign">
                    <thead>
                        <tr>
                            <th className="employeeheader">Employee_ID</th>
                            <th className="employeeheader">First_name</th>
                            <th className="employeeheader">Middle_Name</th>
                            <th className="employeeheader">Last_name</th>
                            <th className="employeeheader">Salary</th>
                            <th className="employeeheader">Sex</th>
                            <th className="employeeheader">Shift</th>
                            <th className="employeeheader">Address</th>
                            <th className="employeeheader">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((employee, index) => (
                            <tr key={index}>
                                <td className="employeecell">{employee.Employee_ID}</td>
                                <td className="employeecell">{employee.First_name}</td>
                                <td className="employeecell">{employee.Middle_Name}</td>
                                <td className="employeecell">{employee.Last_name}</td>
                                <td className="employeecell">{employee.Salary}</td>
                                <td className="employeecell">{employee.Sex}</td>
                                <td className="employeecell">{employee.Shift}</td>
                                <td className="employeecell">{employee.Address}</td>
                                <td className="employeecell">{employee.Role}</td>
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
    );
};

export { EmployeeSearch };
