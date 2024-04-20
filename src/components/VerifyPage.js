import React, { useState } from 'react'; // Import useState
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../images/logo.png';
import emailIcon from '../images/email.png';
import { auth } from '../firebase';

function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(''); // Use useState

  // Extract email parameter from URL
  const params = new URLSearchParams(location.search);
  const email = params.get('email');

  // Resend verification email
  const resendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      await user.sendEmailVerification();
      // Provide feedback to the user
      alert('Verification email sent. Please check your inbox.');
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" style={{ backgroundColor: '#eeeeee' }}>
      <div className="logo-container mb-18">
        <img src={logo} alt="Logo" className="logo" style={{ width: '200px' }} />
      </div>
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md custom-form mb-16">
        <img src={emailIcon} alt="Email Icon" style={{ width: '50px', height: '50px', marginLeft: '175px', marginTop: '-20px' }} />
        <h1 className="text-3xl font-bold mb-6 text-center mt-5">
          Check your email
        </h1>
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        <p className="custom-p text-gray-800 mb-6 text-left">We've sent a verification link to <span className="font-semibold">{email}</span>. Please check your inbox and click on the link to confirm your email address.</p>
        <div className="button-container">
          <p className="custom-p text-gray-900 mt-4 text-left">
            Did not receive the email? <button onClick={resendVerificationEmail} className="underline" type="button">Resend verification email</button>
          </p>
          <div className="mt-6 text-center">
            <Link to="/login" className="block bg-black text-white font-relative-pro py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline login-button hover:bg-gray-900 hover:text-white">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
