import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic frontend validation
    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    // Simple format validation
    const validFormat = /^[a-zA-Z0-9._-]+$/;
    if (!validFormat.test(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to next step 
      navigate('/connect-wallet', { state: { email: email + '@suimail' } });
    }, 1000);
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4">
      {/* Logo */}
      <div className="mb-8">
        <img 
          src="/png/tiny.png"
          alt="Suimail Logo"
          className="w-12 h-12"
        />
      </div>

      {/* Title and Description */}
      <h1 className="text-2xl font-bold text-navy-900 mb-4">
        Create an account
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Welcome to a decentralized mail system that's secure, powerful and fully private.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative mb-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Create a Suimail address"
            className={`w-full px-4 py-3 border ${
              error ? 'border-red-500' : 'border-gray-200'
            } rounded-lg focus:outline-none focus:border-blue-500`}
            disabled={loading}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            @suimail
          </span>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Next Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4 hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg 
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Next'
          )}
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="w-full text-gray-600 py-3 hover:text-gray-800 transition-colors"
          disabled={loading}
        >
          Back
        </button>

         {/* Login Link */}
         <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login-page" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        {/* Terms Text */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          By clicking Next above, you acknowledge that you have read and agree to Suimail's{' '}
          <a href="#" className="text-blue-500 hover:underline">Terms</a>
          {' '}and{' '}
          <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;