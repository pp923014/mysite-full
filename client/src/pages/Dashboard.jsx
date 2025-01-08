import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');  // Get the token from localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setMessage("Token not found. Please log in.");
          return;
        }

        // Fetch user data
        const userResponse = await fetch('http://localhost:8000/api/v1/user/get', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();
        
        if (userResponse.ok) {
          setUserData(userData); // Set user data after successfully fetching
        } else {
          setMessage('Failed to fetch user data');
        }

      } catch (error) {
        // console.error('Error fetching data:', error);
        setMessage('Error fetching data');
      }
    };

    if (token) {
      fetchData();  // Fetch data when token exists
    }
  }, [token]);

  return (
    <div className="flex h-screen">
      {/* Left Section (User Info) */}
      <div className="w-1/4 bg-yellow-100 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome to Your Dashboard</h2>
          {userData ? (
            <p className="text-lg mt-2">Hello, {userData.username}!</p>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>

      {/* Right Section (Additional Content) */}
      <div className="w-3/4 bg-white p-8">
        {/* Display message in case of error */}
        {message && (
          <p className="text-red-500 text-center">{message}</p>
        )}

        <div>
          <h3 className="text-2xl font-bold">Thank You for Visiting Our Site</h3>
          <p className="mt-4">We're glad to have you here. If you have any queries or need assistance, feel free to reach out to us.</p>

          <p className="mt-8 text-lg font-semibold">For any queries, please email us at:</p>
          <p className="text-blue-500">umatechorg@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
