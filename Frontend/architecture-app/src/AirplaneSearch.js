
import './AirplaneSearch.css'; // Import the CSS file for styling
import React, { useState,useEffect} from 'react';



const AirplaneSearch = ({res}) => {
    
    const [Airplanes, setAirplane] = useState([]);
    useEffect(() => {
        setAirplane(res.data.airplane);
      }, [res.data.airplane]);
    
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(Airplanes.length / itemsPerPage);

    // Get the current items to display based on the current page number
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Airplanes.slice(indexOfFirstItem, indexOfLastItem);

    // Handle changing the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    


    return (
        <div>
            <div>
                <h1>Airplanes Data</h1>
                <table className="planeAlign">
                    <thead>
                        <tr>
                            <th className="planeheader">Registration_number</th>
                            <th className="planeheader">Manufacturer</th>
                            <th className="planeheader">Model</th>
                            <th className="planeheader">Apron_number</th>
                            <th className="planeheader">Maintenance_Status</th>
                            <th className="planeheader">Last_Maintenance_Date</th>
                            <th className="planeheader">Purchase_date</th>
                            <th className="planeheader">owner_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((Airplane, index) => (
                            <tr key={index}>
                                <td className="planecell">{Airplane.Registration_number}</td>
                                <td className="planecell">{Airplane.Manufacturer}</td>
                                <td className="planecell">{Airplane.Model}</td>
                                <td className="planecell">{Airplane.Apron_number}</td>
                                <td className="planecell">{Airplane.Maintenance_Status}</td>
                                <td className="planecell">{Airplane.Last_Maintenance_Date}</td>
                                <td className="planecell">{Airplane.Purchase_date}</td>
                                <td className="planecell">{Airplane.owner_id}</td>
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

export { AirplaneSearch };
