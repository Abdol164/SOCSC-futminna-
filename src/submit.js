import React, { useState } from 'react';
import axios from 'axios';

const Submit = () => {
  const [name, setName] = useState('');
  const [address, setaddress] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name, 
      email,
      message,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/submit', formData);
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      setResponseMessage('Error submitting the form. Please try again.');
    }

    // Clear form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Submit;
