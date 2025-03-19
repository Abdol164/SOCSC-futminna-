import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email || '';
  const walletId = location.state?.walletId || '';

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/\d/.test(pass)) {
      return 'Password must include at least one number';
    }
    if (!/[a-z]/.test(pass)) {
      return 'Password must include at least one lowercase letter';
    }
    if (!/[A-Z]/.test(pass)) {
      return 'Password must include at least one uppercase letter';
    }
    if (!/[^a-zA-Z0-9]/.test(pass)) {
      return 'Password must include at least one special character';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate password
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Simulating password creation process
    setTimeout(() => {
      // save the account details securely
      setLoading(false);
      navigate('/setup-complete', { 
        state: { 
          email,
          walletId
        } 
      });
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1);
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
        Create a password
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Your password will be used to encrypt your messages and secure your {email} account
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Password Requirements */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              At least 8 characters
            </li>
            <li className={`flex items-center ${/\d/.test(password) ? 'text-green-600' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${/\d/.test(password) ? 'text-green-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              At least 1 number
            </li>
            <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-600' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              At least 1 lowercase letter
            </li>
            <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              At least 1 uppercase letter
            </li>
            <li className={`flex items-center ${/[^a-zA-Z0-9]/.test(password) ? 'text-green-600' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${/[^a-zA-Z0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              At least 1 special character
            </li>
          </ul>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Create Account Button */}
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
              Creating account...
            </span>
          ) : (
            'Create Account'
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
      </form>

      {/* Security Note */}
      <p className="text-sm text-gray-500 mt-6 text-center max-w-md">
        Your password is used to encrypt your messages and is never stored on our servers. Make sure to keep it safe as it cannot be recovered if lost.
      </p>
    </div>
  );
};

export default CreatePassword;