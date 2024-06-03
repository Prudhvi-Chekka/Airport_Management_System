
import './OwnerSearch.css'; // Import the CSS file for styling
import React, { useState,useEffect} from 'react';



const OwnerSearch = ({res}) => {
    
    const [owners, setowner] = useState([]);
    useEffect(() => {
        setowner(res.data.owns);
      }, [res.data.owns]);
    
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

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

    


    return (
        <div>
            <div>
                <h1>Owners Data</h1>
                <table className="ownerAlign">
                    <thead>
                        <tr>
                            <th className="ownerheader">owner_id</th>
                            <th className="ownerheader">City</th>
                            <th className="ownerheader">Name</th>
                            <th className="ownerheader">Phone_No</th>
                            <th className="ownerheader">State</th>
                            <th className="ownerheader">Street</th>
                            <th className="ownerheader">Type_of_owner</th>
                            <th className="ownerheader">Zip</th>
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

export { OwnerSearch };
