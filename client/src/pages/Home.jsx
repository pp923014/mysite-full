// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import th from '../assets/th.png'
// const Home = () => {
//   const [features, setFeatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchFeatures = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/v1/post/getfeature");
//         setFeatures(response.data.features); // Assuming the API returns { features: [...] }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching features:", error);
//         setLoading(false);
//       }
//     };
//     fetchFeatures();
//   }, []);
//   return (
//     <div className="bg-white scroll-smooth">
//       {/* Section 1: Company Intro */}
//       <section
//         id="intro"
//         className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 transition-all duration-500 ease-in-out"
//       >
//         <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
//             Welcome to UmaTech
//           </h1>
//           <p className="text-lg text-gray-600 mb-6 animate-fade-in-up">
//             At UmaTech, we empower individuals with hands-on experience and
//             industry-ready skills. Explore our internship programs and take the
//             first step toward your dream career.
//           </p>
//           {/* Key Features */}
//           <ul className="list-disc list-inside text-gray-700 text-md">
//             <li className="mb-2">
//               <strong>Real-World Projects:</strong> Work on real projects to
//               build your portfolio.
//             </li>
//             <li className="mb-2">
//               <strong>Mentorship:</strong> Get guidance from industry experts.
//             </li>
//             <li className="mb-2">
//               <strong>Flexible Learning:</strong> Choose internships that fit
//               your schedule.
//             </li>
//           </ul>
//         </div>
//         <div className="w-full md:w-1/2 flex justify-center">
//           <img
//             src={th}
//             alt="Company Introduction"
//             className="w-full max-w-sm md:max-w-md object-cover rounded-lg animate-scale-up"
//           />
//         </div>
//       </section>
//   {/* sectiom 2 */}
//       {/* <section
//       id="services"
//       className="py-16 flex flex-col items-center justify-center px-8 transition-all duration-500 ease-in-out"
//     >
//       <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
//         What We Provide
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
//         {loading ? (
//           <p className="text-center col-span-full text-gray-500">Loading...</p>
//         ) : features.length > 0 ? (
//           features.map((feature, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out`}
//             >
//               <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
//               <p>{feature.description}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-500">
//             No features available at the moment.
//           </p>
//         )}
//       </div>
//     </section> */}
// <section
//       id="services"
//       className="py-16 flex flex-col items-center justify-center px-8 transition-all duration-500 ease-in-out"
//     >
//       <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
//         What We Provide
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
//         {loading ? (
//           <p className="text-center col-span-full text-gray-500">Loading...</p>
//         ) : features.length > 0 ? (
//           features.map((feature, index) => (
//             <div
//               key={index}
//               className={`bg-blue-100 text-gray-900 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out`}
//             >
//               <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
//               <p className="text-justify">{feature.description}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-500">
//             No features available at the moment.
//           </p>
//         )}
//       </div>
//     </section>

//       {/* Section 3: Types of Internships */}
//       <section
//         id="internships"
//         className="py-16 flex flex-col items-center justify-center px-8 transition-all duration-500 ease-in-out"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
//           Types of Internships
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
//           {[...Array(5)].map((_, index) => (
//             <div
//               key={index}
//               className="bg-yellow-100 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out text-gray-800"
//             >
//               <h2 className="text-xl font-bold mb-2">Internship {index + 1}</h2>
//               <p className="text-justify mb-4">
//                 This is a detailed description of Internship {index + 1}, highlighting the key aspects and benefits.
//               </p>
//               <Link to='/apply-now' className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition">
//                 Apply Now
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import th from "../assets/th.png";
const Home = () => {
  const [features, setFeatures] = useState([]);
  const [internship, setInternships] = useState([]);
  const [loadingFeatures, setLoadingFeatures] = useState(true);
  const [loadingInternships, setLoadingInternships] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/post/getfeature"
        );
        setFeatures(response.data.features); // Assuming the API returns { features: [...] }
        setLoadingFeatures(false);
      } catch (error) {
        // console.error("Error fetching features:", error);
        setLoadingFeatures(false);
      }
    };

    const fetchInternships = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/post/getinternship"
        );
        setInternships(response.data.internship); // Assuming the API returns { internships: [...] }
        setLoadingInternships(false);
      } catch (error) {
        // console.error("Error fetching internships:", error);
        setLoadingInternships(false);
      }
    };

    fetchFeatures();
    fetchInternships();
  }, []);

  return (
    <div className="bg-white scroll-smooth">
      {/* Section 1: Company Intro */}
      <section
        id="intro"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 transition-all duration-500 ease-in-out"
      >
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
            Welcome to UmaTech
          </h1>
          <p className="text-lg text-gray-600 mb-6 animate-fade-in-up">
            At UmaTech, we empower individuals with hands-on experience and
            industry-ready skills. Explore our internship programs and take the
            first step toward your dream career.
          </p>
          <ul className="list-disc list-inside text-gray-700 text-md">
            <li className="mb-2">
              <strong>Real-World Projects:</strong> Work on real projects to
              build your portfolio.
            </li>
            <li className="mb-2">
              <strong>Mentorship:</strong> Get guidance from industry experts.
            </li>
            <li className="mb-2">
              <strong>Flexible Learning:</strong> Choose internships that fit
              your schedule.
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={th} // Replace with actual path or image source
            alt="Company Introduction"
            className="w-full max-w-sm md:max-w-md object-cover rounded-lg animate-scale-up"
          />
        </div>
      </section>

      {/* Section 2: What We Provide */}
      <section
        id="services"
        className="py-16 flex flex-col items-center justify-center px-8 transition-all duration-500 ease-in-out"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          What We Provide
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {loadingFeatures ? (
            <p className="text-center col-span-full text-gray-500">
              Loading...
            </p>
          ) : features.length > 0 ? (
            features.map((feature, index) => (
              <div
                key={index}
                className="bg-blue-100 text-gray-900 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
                <p className="text-justify">{feature.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No features available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Section 3: Types of Internships */}
      <section
        id="internships"
        className="py-16 flex flex-col items-center justify-center px-8 transition-all duration-500 ease-in-out"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Types of Internships Available
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          <div className="bg-yellow-100 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out text-gray-800">
            <h2 className="text-xl font-bold mb-2">Frontend Developer</h2>
          </div>
          <div className="bg-yellow-100 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out text-gray-800">
            <h2 className="text-xl font-bold mb-2">Backend Developer</h2>
          </div>
          <div className="bg-yellow-100 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out text-gray-800">
            <h2 className="text-xl font-bold mb-2">Full Stack Developer</h2>
          </div>
          
        </div>
        <div className="mt-8">
          <Link
            to="/apply-now"
            className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
