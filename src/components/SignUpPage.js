import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import googleIcon from '../images/google.png';
import backIcon from '../images/back.png'; // Import the back icon image
import { auth, GoogleAuthProvider } from '../firebase';
import './LoginPage.css';
function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for loading animation

  const signUpWithEmailPassword = async (email, password) => {
    try {
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      setLoading(true); // Start loading animation

      // Create user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      // Send email verification
      await userCredential.user.sendEmailVerification();
      // Redirect to VerifyPage and pass email as a parameter
      navigate(`/verify?email=${email}`);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithRedirect(GoogleAuthProvider);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpWithEmailPassword(email, password);
  };
  return (
    <div className="signup-container" style={{ backgroundColor: '#eeeeee' }}>
      <div className="logo-container text-center">
        <img src={logo} alt="Logo" className="logo" style={{ width: '200px', margin: '0 auto'}} />
      </div>
      <button 
  onClick={() => navigate('/')} 
  className="back-button">
  <img src={backIcon} alt="Back" /> {/* Add margin-right for spacing */}
  <span className="button-text font-semibold">Homepage</span>
</button>


      <div className="signup-form-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form id="signup-form" className="bg-white p-8 rounded-lg shadow-md mx-auto" onSubmit={handleSignUp}>
          <h2 className="text-4xl font-bold mb-6 text-LEFT">Sign Up</h2>
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input 
              className="rounded-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-custom-input" 
              id="password" 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              className="rounded-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-custom-input" 
              id="confirmPassword" 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>
          <button className="bg-black text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline hover:bg-gray-900 mt-3 w-full" type="submit">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <div className="flex justify-center items-center"> 
            <span className="text-gray-900 text-bigger">or</span>
          </div>
          <div className="flex justify-center items-center mb-2"> 
            <button className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline hover:bg-gray-200 mt-3 w-full" type="button" onClick={signInWithGoogle}>
              <img src={googleIcon} alt="Google Icon" className="inline-block w-4 h-4 mr-2" />
              Sign Up with Google
            </button>
          </div>
          <p className="text-xs text-gray-700 mb-4">
            By clicking "Create account" above, you acknowledge that you will receive updates from the WhereHouse team and that you have read, understood, and agreed to WhereHouse Library's Terms & Conditions, Licensing Agreement and Privacy Policy.
          </p>
          <hr className="line" />
          <div className="cta-container flex justify-between items-center mb-2 pt-4">
            <span className="text-gray-900 text-bigger">Already have an account?</span>
            <Link to="/login" className="bg-transparent border-2 border-custom-color text-custom-color font-relative-pro py-1.5 px-4 rounded-lg focus:outline-none focus:shadow-outline login-button hover:bg-gray-200 hover:text-gray-900">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );




}

export default SignUpPage;
