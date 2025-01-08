// import React, { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import jwt_decode from 'jwt-decode'; // Use default export

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
//   const [isAdmin, setIsAdmin] = useState(false); // Admin state
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
//   const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile menu toggle state

//   const menuRef = useRef(null); // Ref for mobile menu
//   const profileRef = useRef(null); // Ref for profile menu

//   // Check if user is logged in based on token in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Adjust key name if different
//     if (token) {
//       setIsLoggedIn(true);
//       try {
//         const decodedToken = jwt_decode(token); // Decode the JWT token
//         setIsAdmin(decodedToken.isAdmin); // Set isAdmin based on decoded token
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     }
//   }, []);

//   // Close menus on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMenuOpen(false);
//       }
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);
 
//   // Handle Logout by calling backend API
//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/v1/user/logout', {
//         method: 'GET',
//         credentials: 'include', // Include cookies if required
//       });

//       if (response.ok) {
//         localStorage.removeItem('token'); // Adjust key name if different
//         setIsLoggedIn(false);
//         setIsAdmin(false);
//         setIsProfileOpen(false); // Close profile menu
//         window.location.reload();
//       } else {
//         alert('Logout failed. Please try again.');
//       }
//     } catch (error) {
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <nav className="bg-white p-4 shadow-md">
//       <div className="flex justify-between items-center max-w-screen-xl mx-auto">
//         {/* Left part: "UmaTech" logo slightly to the left */}
//         <Link to="/" className="text-gray-800 text-2xl font-bold ml-4">UmaTech</Link>

//         {/* Right part */}
//         <div className="hidden md:flex space-x-6">
//           <Link to="/our-trainee" className="text-gray-800">Our Trainee</Link>
//           <div className="ml-4">
//             {!isLoggedIn ? (
//               <Link to="/signup" className="text-gray-800">Create Account</Link>
//             ) : (
//               <div className="relative" ref={profileRef}>
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="text-gray-800 flex items-center"
//                 >
//                   <i className="fas fa-user-circle text-2xl"></i>
//                 </button>
//                 {isProfileOpen && (
//                   <div className="absolute right-0 bg-white shadow-md rounded-lg mt-2 w-40">
//                     <Link
//                       to="/dashboard"
//                       className="block px-4 py-2 text-gray-800"
//                       onClick={() => setIsProfileOpen(false)}
//                     >
//                       Dashboard
//                     </Link>
//                     {isAdmin && (
//                       <Link
//                         to="/admin-dashboard"
//                         className="block px-4 py-2 text-gray-800"
//                         onClick={() => setIsProfileOpen(false)}
//                       >
//                         Admin Dashboard
//                       </Link>
//                     )}
//                     <button onClick={handleLogout} className="block px-4 py-2 text-red-500">
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Hamburger Menu */}
//         <div className="md:hidden relative" ref={menuRef}>
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-gray-800"
//           >
//             <i className="fas fa-bars text-2xl"></i>
//           </button>
//           {isMenuOpen && (
//             <div className="absolute top-16 right-0 bg-white p-4 rounded-lg w-40 shadow-md">
//               <Link
//                 to="/our-trainee"
//                 className="block text-gray-800 py-2"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Our Trainee
//               </Link>
//               {!isLoggedIn ? (
//                 <Link
//                   to="/signup"
//                   className="block text-gray-800 py-2"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Create Account
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     to="/dashboard"
//                     className="block text-gray-800 py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   {isAdmin && (
//                     <Link
//                       to="/admin-dashboard"
//                       className="block text-gray-800 py-2"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Admin Dashboard
//                     </Link>
//                   )}
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="block text-gray-800 py-2 text-red-500"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   // Base URL and Logout Route
//   const BASE_URL = 'http://localhost:8000';
//   const LOGOUT_ROUTE = `${BASE_URL}/api/v1/user/logout`;

//   // Manual Decode Function
//   const decodeToken = (token) => {
//     try {
//       const payload = token.split('.')[1]; // Get the payload part
//       return JSON.parse(atob(payload)); // Decode Base64 and parse JSON
//     } catch (error) {
//       console.error('Invalid token:', error);
//       return null;
//     }
//   };

//   // Handle Token and User Authentication
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decoded = decodeToken(token);
//       if (decoded) {
//         setUser(decoded);
//         setIsAdmin(decoded.role === 'admin'); // Check if user is admin
//       } else {
//         localStorage.removeItem('token'); // Remove invalid token
//       }
//     }
//   }, []);

//   // Logout Handler
//   const handleLogout = async () => {
//     try {
//       await axios.get(LOGOUT_ROUTE);
//       localStorage.removeItem('token');
//       setUser(null);
//       navigate('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <nav className="bg-white text-white shadow-md fixed w-full z-10">
//       <div className="container mx-auto px-4 flex justify-between items-center h-16">
//         {/* Left Part */}
//         <Link to="/" className="text-2xl font-bold">
//           UmaTech
//         </Link>

//         {/* Right Part */}
//         <div className="hidden md:flex items-center space-x-4">
//           <Link to="/trainees" className="hover:text-gray-300">
//             Our Trainee
//           </Link>
//           {!user ? (
//             <Link to="/login" className="hover:text-gray-300">
//               Signup/Login
//             </Link>
//           ) : (
//             <div className="relative group">
//               <button className="hover:text-gray-300">
//                 Profile
//               </button>
//               <div className="absolute right-0 bg-white text-black mt-2 py-2 rounded shadow-lg hidden group-hover:block">
//                 <Link
//                   to="/dashboard"
//                   className="block px-4 py-2 hover:bg-gray-100"
//                 >
//                   Dashboard
//                 </Link>
//                 {isAdmin && (
//                   <Link
//                     to="/admin"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Admin Page
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Mobile View */}
//         <button
//           className="md:hidden flex items-center"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16m-7 6h7"
//             />
//           </svg>
//         </button>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="absolute top-16 left-0 w-full bg-blue-600 text-white md:hidden">
//             <Link to="/trainees" className="block px-4 py-2 hover:bg-blue-700">
//               Our Trainee
//             </Link>
//             {!user ? (
//               <Link to="/login" className="block px-4 py-2 hover:bg-blue-700">
//                 Signup/Login
//               </Link>
//             ) : (
//               <>
//                 <Link
//                   to="/dashboard"
//                   className="block px-4 py-2 hover:bg-blue-700"
//                 >
//                   Dashboard
//                 </Link>
//                 {isAdmin && (
//                   <Link
//                     to="/admin"
//                     className="block px-4 py-2 hover:bg-blue-700"
//                   >
//                     Admin Page
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-700"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile menu
  const navigate = useNavigate();

  const BASE_URL = 'http://localhost:8000';
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
      const response = await fetch('http://localhost:8000/api/v1/user/logout', {
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
