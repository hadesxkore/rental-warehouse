import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import googleIcon from '../images/google.png';
import { auth, GoogleAuthProvider } from '../firebase';
import backIcon from '../images/back.png'; // Import the back icon image
import './LoginPage.css';
function LoginPage() {
    const navigate = useNavigate(); // Initialize useNavigate

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading animation

    useEffect(() => {
        // Check if the user is already logged in (persist authentication)
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // If user is logged in, redirect to homepage
                navigate('/home');
            }
        });

        // Cleanup function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
    }, [navigate]);

    const handleLoginWithEmailPassword = async () => {
        try {
            setLoading(true); // Start loading animation

            // Sign in with email and password
            await auth.signInWithEmailAndPassword(email, password);
            // Redirect to HomePage upon successful login
            navigate('/home');
        } catch (error) {
            // Handle login errors
            if (error.code === 'auth/wrong-password') {
                // Display custom error message for wrong password
                setErrorMessage('The password you entered is incorrect.');
                setShowErrorMessage(true);
            } else if (error.code === 'auth/user-not-found') {
                // Display custom error message for non-registered email
                setErrorMessage('The email you entered is not registered.');
                setShowErrorMessage(true);
            } else {
                // For other errors, display the error message returned by Firebase
                setErrorMessage(error.message);
                setShowErrorMessage(true);
            }
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    const handleLoginWithGoogle = async () => {
        try {
            // Sign in with Google
            await auth.signInWithRedirect(GoogleAuthProvider);
        } catch (error) {
            // Handle login errors
            setErrorMessage(error.message);
            setShowErrorMessage(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#f1f0ee' }}>
            <div className="logo-container mb-18">
                <img src={logo} alt="Logo" className="logo" style={{ width: '200px' }} />
            </div>
            <button 
                onClick={() => navigate('/')} 
                className="back-button">
                <img src={backIcon} alt="Back"/>
                <span className="button-text font-semibold">Homepage</span>
            </button>

            <form id="login-form" className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mb-48">
                <h2 className="text-4xl font-bold mb-6 text-left">Log in</h2>
                {showErrorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {errorMessage}</span>
                        <button onClick={() => setShowErrorMessage(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 0 1 1.414 1.414L11.414 10l4.348 4.348a1 1 0 1 1-1.414 1.414L10 11.414l-4.348 4.348a1 1 0 1 1-1.414-1.414L8.586 10 4.238 5.652A1 1 0 1 1 5.652 4.238L10 8.586l4.348-4.348a1 1 0 0 1 1.414 0z"/></svg>
                        </button>
                    </div>
                )}
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input 
                        className="rounded-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-custom-input" 
                        id="email" 
                        type="email" 
                        placeholder="Email address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="password">Password</label>
                    <input 
                        className="rounded-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-custom-input" 
                        id="password" 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <p className="text-xs text-custom-color hover:text-gray-800 text-right mb-2">
                    <Link to="/forgot-password" className="underline">Forgot password?</Link>
                </p>
                <div className="mb-2">
                    <button 
                        className="bg-black text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline hover:bg-gray-900 mt-3" 
                        type="button" 
                        style={{ width: '100%' }}
                        onClick={handleLoginWithEmailPassword}
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                    <p className="mt-3 text-center">or</p>
                    <button 
                        className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline hover:bg-gray-200 mt-3 w-full" 
                        type="button" 
                        onClick={handleLoginWithGoogle}
                    >
                        <img src={googleIcon} alt="Google Icon" className="inline-block w-4 h-4 mr-2" />
                        Log in with Google
                    </button>
                    <hr className="my-8 border-gray-400" style={{ width: '100%' }} />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-bigger">Don't have an account yet?</span>
                    <Link to="/signup" className="border-2 border-custom-color text-custom-color font-relative-pro py-1.5 px-4 rounded-lg focus:outline-none focus:shadow-outline bg-transparent-hover  hover:bg-gray-200 hover:text-gray-900">Sign up</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
