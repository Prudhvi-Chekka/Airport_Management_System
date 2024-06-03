
import './ModelSearch.css'; // Import the CSS file for styling
import React, { useState,useEffect} from 'react';



const ModelSearch = ({res}) => {
    
    const [models, setmodel] = useState([]);
    useEffect(() => {
        setmodel(res.data.typeOfPlane);
      }, [res.data.typeOfPlane]);
    
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

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

    


    return (
        <div>
            <div>
                <h1>Models Data</h1>
                <table className="modelAlign">
                    <thead>
                        <tr>
                            <th className="modelheader">Model</th>
                            <th className="modelheader">Fuel_Capacity</th>
                            <th className="modelheader">Weight</th>
                            <th className="modelheader">Maximum_Range</th>
                            <th className="modelheader">Seating_Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((model, index) => (
                            <tr key={index}>
                                <td className="modelcell">{model.Model}</td>
                                <td className="modelcell">{model.Fuel_Capacity}</td>
                                <td className="modelcell">{model.Weight}</td>
                                <th className="modelheader">{model.Maximum_Range}</th>
                            <th className="modelheader">{model.Seating_Capacity}</th>
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

export { ModelSearch };
