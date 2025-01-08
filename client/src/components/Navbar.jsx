import React, { useState, useEffect,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile menu
  const navigate = useNavigate();

  const BASE_URL = 'https://mysite-full-backend.onrender.com';
  const LOGOUT_ROUTE = `${BASE_URL}/api/v1/user/logout`;
//   change1
  const menuRef = useRef(null); // Ref for mobile menu
  const profileRef = useRef(null); // Ref for profile menu

  const decode = (token) => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsLoggedIn(true);
        try {
            const decodedToken =decode(token);
            setIsAdmin(decodedToken.isAdmin);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
  }, []);
 // Close menus on outside click
 useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('https://mysite-full-backend.onrender.com/api/v1/user/logout', {
        method: 'GET',
        credentials: 'include', // Include cookies if required
      });

      if (response.ok) {
        localStorage.removeItem('token'); // Adjust key name if different
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsProfileOpen(false); // Close profile menu
        window.location.reload();
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Left part: "UmaTech" logo slightly to the left */}
        <Link to="/" className="text-gray-800 text-2xl font-bold ml-4">UmaTech</Link>

        {/* Right part */}
        <div className="hidden md:flex space-x-6">
          <Link to="/our-trainee" className="text-gray-800">Our Trainee</Link>
          <div className="ml-4">
            {!isLoggedIn ? (
              <Link to="/signup" className="text-gray-800">Create Account</Link>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="text-gray-800 flex items-center"
                >
                  <i className="fas fa-user-circle text-2xl"></i>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 bg-white shadow-md rounded-lg mt-2 w-40">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-800"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin-dashboard"
                        className="block px-4 py-2 text-gray-800"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="block px-4 py-2 text-red-500">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
          {isMenuOpen && (
            <div className="absolute top-16 right-0 bg-white p-4 rounded-lg w-40 shadow-md">
              <Link
                to="/our-trainee"
                className="block text-gray-800 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Trainee
              </Link>
              {!isLoggedIn ? (
                <Link
                  to="/signup"
                  className="block text-gray-800 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Account
                </Link>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-gray-800 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin-dashboard"
                      className="block text-gray-800 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block text-gray-800 py-2 text-red-500"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
