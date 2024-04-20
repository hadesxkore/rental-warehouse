import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase authentication
import logo from '../images/logo.png';
import locationIcon from '../images/location.png';
import searchIcon from '../images/search.png';
import userIcon from '../images/userwhite.png';
import sampleImage from '../images/sample.jpg';

import viewIcon from '../images/view.png';
import chatIcon from '../images/chat.png';
import dashboardIcon from '../images/dashboard.png';
import userProfileIcon from '../images/user.png';
import logoutIcon from '../images/logout1.png';
import './HomePage.css';

function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Effect to check if user is already logged in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        // Clean up function
        return () => unsubscribe();
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                setIsLoggedIn(false);
                setIsDropdownOpen(false); // Close dropdown after logout
            })
            .catch(error => {
                console.error('Error signing out:', error);
            });
    };

    // Function to toggle dropdown menu
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
           <main className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 px-4 md:px-36">
                {/* Sample card 1 */}
                <div className="card bg-white rounded-md shadow-md p-2 flex items-center">
                    <div className="image-container">
                        <img
                            src={sampleImage} // Replace with your image
                            alt="Warehouse Image2"
                            className="w-full h-56 rounded-md mb-4" // Added width and height
                            style={{ width: '700px', height: '300px' }} // Adjusted width and height
                        />
                    </div>
                    <div className="text-container ml-4 flex flex-col justify-between" style={{ maxWidth: 'calc(100% - 12rem)' }}>
                        <div>
                            <h3 className="text-xl font-bold">John's Warehouse</h3>
                            <div className="flex items-center">
                                <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
                                <p className="text-gray-500">Camacho St. Poblacion Balanga</p>
                            </div>
                            <p className="text-gray-700 mt-2">
                                Located on bustling Camacio Street, John's Warehouse offers a big
                                storage blending modern convenience with urban charm.
                            </p>
                            <div className="flex items-center mt-2">
                                <p className="text-lg font-semibold text-blue-500 mr-4">P200,000/Month</p>
                            </div>
                            <div className="flex items-center mt-4">
                                <img src={userIcon} alt="User Icon" className="user-icon h-8 w-8" onClick={toggleDropdown} />
                                <div className="flex items-center mr-32">
                                    <img src={userProfileIcon} alt="User Icon" className="w-20 h-20 mr-4" />
                                    <p className="text-gray-500 text-lg font-bold">Johiriny Lang</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-4 space-x-2 justify-end" style={{ marginTop: '-8px' }}>
                            <button className="btn bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '40px' }}>
                                <img src={viewIcon} alt="View Icon" className="w-5 h-5 mr-2" />
                                View
                            </button>
                            <button className="btn bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '40px' }}>
                                <img src={chatIcon} alt="Chat Icon" className="w-5 h-5 mr-2" />
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;
