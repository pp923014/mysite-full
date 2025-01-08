import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-600">
              UmaTech is dedicated to providing the best internship opportunities for aspiring tech professionals. We believe in empowering the next generation of tech leaders.
            </p>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul>
              <li className="mb-2">
                <span className="font-semibold">Email:</span> umatechorg@gmail.com
              </li>
              <li>
                <span className="font-semibold">Address:</span> Tech Street, lucknow, India
              </li>
            </ul>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="/about" className="text-gray-600 hover:text-gray-800">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
              </li>
             
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} UmaTech. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
