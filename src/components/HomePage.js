// HomePage.js

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
        <div className="main-container">
            <nav className="nav-bar bg-black flex flex-wrap items-center justify-between px-4 md:px-36 py-2 shadow-md">
                <div className="flex items-center space-x-4 text-white w-full md:w-auto">
                    <img src={logo} alt="Company Logo" className="logo" style={{ maxWidth: '200px', maxHeight: '90px' }} />
                    <Link to="#" className="px-3 py-2 rounded-md hover:bg-gray-700">HOME</Link>
                    <div className="relative flex items-center">
                        <input type="text" name="location-search" placeholder="Search for a location" className="px-2 py-2 pr-16 rounded-md text-black w-full md:w-54 focus:outline-none font-semibold" />
                        <img src={locationIcon} alt="Location Icon" className="absolute right-3 top-3 h-5 w-5" />
                    </div>
                    <div className="relative">
                        <button className="search-button">
                            <img src={searchIcon} alt="Search Icon" className="search-icon h-5 w-5" />
                            Search
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    {isLoggedIn ? (
                        <div className="relative">
                            <img src={userIcon} alt="User Icon" className="cursor-pointer h-12 w-12" onClick={toggleDropdown} />
                            {isDropdownOpen && (
                                <div className="dropdown-menu show">
                                    <Link to="/dashboard" className="dropdown-item">
                                        <img src={dashboardIcon} alt="Dashboard Icon" />
                                        Dashboard
                                    </Link>
                                    <Link to="/edit-profile" className="dropdown-item">
                                        <img src={userProfileIcon} alt="User Profile Icon" />
                                        Edit Profile
                                    </Link>
                                    <button onClick={handleLogout} className="dropdown-item">
                                        <img src={logoutIcon} alt="Logout Icon" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/signup" className="px-4 py-2 rounded-md text-white hover:bg-gray-900 btn gradient-bg">Sign Up</Link>
                            <Link to="/login" className="px-4 py-2 rounded-md text-white hover:bg-gray-900 btn gradient-bg">Log in</Link>
                        </>
                    )}
                </div>
            </nav>
            <main className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 px-4 md:px-36">
                {/* Sample card 1 */}
                <div className="card bg-white rounded-md shadow-md flex flex-col md:flex-row">
                    <div className="image-container md:w-1/2">
                        <img
                            src={sampleImage} // Replace with your image
                            alt="Warehouse Image1"
                            className="w-full h-56 rounded-md mb-4" // Added width and height
                        />
                    </div>
                    <div className="text-container md:w-1/2 p-4">
                        <h3 className="text-xl font-bold">John's Warehouse</h3>
                        <div className="flex items-center">
                            <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
                            <p className="text-gray-500">Camacho St. Poblacion Balanga</p>
                        </div>
                        <p className="text-gray-700 mt-2">
                            Located on bustling Camacio Street, John's Warehouse offers a big storage blending modern convenience with urban charm.
                        </p>
                        <div className="flex items-center mt-2">
                            <p className="text-lg font-semibold text-blue-500 mr-4">P200,000/Month</p> {/* Updated font size and weight */}
                        </div>
                        <div className="flex items-center mt-4">
                            <img 
                                src={userIcon} 
                                alt="User Icon" 
                                className="user-icon h-8 w-8" 
                                onClick={toggleDropdown} 
                            />
                            <img
                                src={userProfileIcon}
                                alt="User Icon"
                                className="w-20 h-20 mr-2 user-icon"
                            />
                            <p className="text-gray-500 text-lg font-bold user-name">Johiriny Lang</p>
                        </div>
                        <div className="flex mt-4 space-x-2 justify-end" style={{ marginTop: '-4px' }}>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={viewIcon} alt="View Icon" className="w-5 h-5 mr-2" />
                                View
                            </button>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={chatIcon} alt="Chat Icon" className="w-5 h-5 mr-2" />
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
                 {/* Sample card 1 */}
                 <div className="card bg-white rounded-md shadow-md flex flex-col md:flex-row">
                    <div className="image-container md:w-1/2">
                        <img
                            src={sampleImage} // Replace with your image
                            alt="Warehouse Image1"
                            className="w-full h-56 rounded-md mb-4" // Added width and height
                        />
                    </div>
                    <div className="text-container md:w-1/2 p-4">
                        <h3 className="text-xl font-bold">John's Warehouse</h3>
                        <div className="flex items-center">
                            <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
                            <p className="text-gray-500">Camacho St. Poblacion Balanga</p>
                        </div>
                        <p className="text-gray-700 mt-2">
                            Located on bustling Camacio Street, John's Warehouse offers a big storage blending modern convenience with urban charm.
                        </p>
                        <div className="flex items-center mt-2">
                            <p className="text-lg font-semibold text-blue-500 mr-4">P200,000/Month</p> {/* Updated font size and weight */}
                        </div>
                        <div className="flex items-center mt-4">
                            <img 
                                src={userIcon} 
                                alt="User Icon" 
                                className="user-icon h-8 w-8" 
                                onClick={toggleDropdown} 
                            />
                            <img
                                src={userProfileIcon}
                                alt="User Icon"
                                className="w-20 h-20 mr-2 user-icon"
                            />
                            <p className="text-gray-500 text-lg font-bold user-name">Johiriny Lang</p>
                        </div>
                        <div className="flex mt-4 space-x-2 justify-end" style={{ marginTop: '-4px' }}>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={viewIcon} alt="View Icon" className="w-5 h-5 mr-2" />
                                View
                            </button>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={chatIcon} alt="Chat Icon" className="w-5 h-5 mr-2" />
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
                 {/* Sample card 1 */}
                 <div className="card bg-white rounded-md shadow-md flex flex-col md:flex-row">
                    <div className="image-container md:w-1/2">
                        <img
                            src={sampleImage} // Replace with your image
                            alt="Warehouse Image1"
                            className="w-full h-56 rounded-md mb-4" // Added width and height
                        />
                    </div>
                    <div className="text-container md:w-1/2 p-4">
                        <h3 className="text-xl font-bold">John's Warehouse</h3>
                        <div className="flex items-center">
                            <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
                            <p className="text-gray-500">Camacho St. Poblacion Balanga</p>
                        </div>
                        <p className="text-gray-700 mt-2">
                            Located on bustling Camacio Street, John's Warehouse offers a big storage blending modern convenience with urban charm.
                        </p>
                        <div className="flex items-center mt-2">
                            <p className="text-lg font-semibold text-blue-500 mr-4">P200,000/Month</p> {/* Updated font size and weight */}
                        </div>
                        <div className="flex items-center mt-4">
                            <img 
                                src={userIcon} 
                                alt="User Icon" 
                                className="user-icon h-8 w-8" 
                                onClick={toggleDropdown} 
                            />
                            <img
                                src={userProfileIcon}
                                alt="User Icon"
                                className="w-20 h-20 mr-2 user-icon"
                            />
                            <p className="text-gray-500 text-lg font-bold user-name">Johiriny Lang</p>
                        </div>
                        <div className="flex mt-4 space-x-2 justify-end" style={{ marginTop: '-4px' }}>
                            <button className="btn bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={viewIcon} alt="View Icon" className="w-5 h-5 mr-2" />
                                View
                            </button>
                            <button className="btn bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={chatIcon} alt="Chat Icon" className="w-5 h-5 mr-2" />
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
                 {/* Sample card 1 */}
                 <div className="card bg-white rounded-md shadow-md flex flex-col md:flex-row">
                    <div className="image-container md:w-1/2">
                        <img
                            src={sampleImage} // Replace with your image
                            alt="Warehouse Image1"
                            className="w-full h-56 rounded-md mb-4" // Added width and height
                        />
                    </div>
                    <div className="text-container md:w-1/2 p-4">
                        <h3 className="text-xl font-bold">John's Warehouse</h3>
                        <div className="flex items-center">
                            <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
                            <p className="text-gray-500">Camacho St. Poblacion Balanga</p>
                        </div>
                        <p className="text-gray-700 mt-2">
                            Located on bustling Camacio Street, John's Warehouse offers a big storage blending modern convenience with urban charm.
                        </p>
                        <div className="flex items-center mt-2">
                            <p className="text-lg font-semibold text-blue-500 mr-4">P200,000/Month</p> {/* Updated font size and weight */}
                        </div>
                        <div className="flex items-center mt-4">
                            <img 
                                src={userIcon} 
                                alt="User Icon" 
                                className="user-icon h-8 w-8" 
                                onClick={toggleDropdown} 
                            />
                            <img
                                src={userProfileIcon}
                                alt="User Icon"
                                className="w-20 h-20 mr-2 user-icon"
                            />
                            <p className="text-gray-500 text-lg font-bold user-name">Johiriny Lang</p>
                        </div>
                        <div className="flex mt-4 space-x-2 justify-end" style={{ marginTop: '-4px' }}>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={viewIcon} alt="View Icon" className="w-5 h-5 mr-2" />
                                View
                            </button>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={chatIcon} alt="Chat Icon" className="w-5 h-5 mr-2" />
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
                 {/* Sample card 1 */}
                 <div className="card bg-white rounded-md shadow-md flex flex-col md:flex-row">
                    <div className="image-container md:w-1/2">
                        <img
                            src={sampleImage} // Replace with your image
                            alt="Warehouse Image1"
                            className="w-full h-56 rounded-md mb-4" // Added width and height
                        />
                    </div>
                    <div className="text-container md:w-1/2 p-4">
                        <h3 className="text-xl font-bold">John's Warehouse</h3>
                        <div className="flex items-center">
                            <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
                            <p className="text-gray-500">Camacho St. Poblacion Balanga</p>
                        </div>
                        <p className="text-gray-700 mt-2">
                            Located on bustling Camacio Street, John's Warehouse offers a big storage blending modern convenience with urban charm.
                        </p>
                        <div className="flex items-center mt-2">
                            <p className="text-lg font-semibold text-blue-500 mr-4">P200,000/Month</p> {/* Updated font size and weight */}
                        </div>
                        <div className="flex items-center mt-4">
                            <img 
                                src={userIcon} 
                                alt="User Icon" 
                                className="user-icon h-8 w-8" 
                                onClick={toggleDropdown} 
                            />
                            <img
                                src={userProfileIcon}
                                alt="User Icon"
                                className="w-20 h-20 mr-2 user-icon"
                            />
                            <p className="text-gray-500 text-lg font-bold user-name">Johiriny Lang</p>
                        </div>
                        <div className="flex mt-4 space-x-2 justify-end" style={{ marginTop: '-4px' }}>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={viewIcon} alt="View Icon" className="w-5 h-5 mr-2" />
                                View
                            </button>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={chatIcon} alt="Chat Icon" className="w-5 h-5 mr-2" />
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
                 {/* Sample card 1 */}
                 <div className="card bg-white rounded-md shadow-md flex flex-col md:flex-row">
                    <div className="image-container md:w-1/2">
                        <img
                            src={sampleImage} // Replace with your image
                            alt="Warehouse Image1"
                            className="w-full h-56 rounded-md mb-4" // Added width and height
                        />
                    </div>
                    <div className="text-container md:w-1/2 p-4">
                        <h3 className="text-xl font-bold">John's Warehouse</h3>
                        <div className="flex items-center">
                            <img src={locationIcon} alt="Location Icon" className="h-5 w-5 mr-2" />
                            <p className="text-gray-500">Camacho St. Poblacion Balanga</p>
                        </div>
                        <p className="text-gray-700 mt-2">
                            Located on bustling Camacio Street, John's Warehouse offers a big storage blending modern convenience with urban charm.
                        </p>
                        <div className="flex items-center mt-2">
                            <p className="text-lg font-semibold text-blue-500 mr-4">P200,000/Month</p> {/* Updated font size and weight */}
                        </div>
                        <div className="flex items-center mt-4">
                            <img 
                                src={userIcon} 
                                alt="User Icon" 
                                className="user-icon h-8 w-8" 
                                onClick={toggleDropdown} 
                            />
                            <img
                                src={userProfileIcon}
                                alt="User Icon"
                                className="w-20 h-20 mr-2 user-icon"
                            />
                            <p className="text-gray-500 text-lg font-bold user-name">Johiriny Lang</p>
                        </div>
                        <div className="flex mt-4 space-x-2 justify-end" style={{ marginTop: '-4px' }}>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
                                <img src={viewIcon} alt="View Icon" className="w-5 h-5 mr-2" />
                                View
                            </button>
                            <button className=" bg-white border border-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105" style={{ width: '100px', height: '30px' }}>
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
