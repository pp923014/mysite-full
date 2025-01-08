import React, { useState } from "react";

const OurTrainee = () => {
  const [certificateNo, setCertificateNo] = useState("");
  const [traineeData, setTraineeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    try {
      // Send a GET request to search for a trainee by certificate number
      const response = await fetch(
        `http://localhost:8000/api/v1/trainee/searchByCertificate?certificate=${certificateNo}`
      );

      if (response.ok) {
        const trainee = await response.json();
        setTraineeData(trainee);
        setErrorMessage(""); // Clear any previous error messages
      } else {
        setTraineeData(null);
        const { message } = await response.json();
        setErrorMessage(message);
      }
    } catch (error) {
      // console.error("Error searching trainee:", error);
      setTraineeData(null);
      setErrorMessage("An error occurred while searching for trainee.");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold leading-tight">
          Verify Trainee Certificate
        </h1>
        <p className="mt-4 text-lg">
          Enter the certificate number below to find trainee information and internship
          details.
        </p>
      </div>

      {/* Search Form */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 space-y-4 sm:space-y-0 mb-8">
        <input
          type="text"
          placeholder="Enter Certificate No."
          value={certificateNo}
          onChange={(e) => setCertificateNo(e.target.value)}
          className="w-full sm:w-96 px-6 py-3 rounded-xl border-2 border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        />
        <button
          onClick={handleSearch}
          className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105"
        >
          Search
        </button>
      </div>

      {/* Trainee Information */}
      {traineeData ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full text-black">
          <h3 className="text-2xl font-semibold text-center">Trainee Details</h3>
          <ul className="mt-6 space-y-4 text-lg">
            <li>
              <strong>Name:</strong> {traineeData.username}
            </li>
            <li>
              <strong>Internship Type:</strong> {traineeData.program}
            </li>
            <li>
              <strong>Duration:</strong> {traineeData.duration}
            </li>
            <li>
              <strong>Certificate No:</strong> {traineeData.certificate}
            </li>
          </ul>
        </div>
      ) : errorMessage ? (
        <p className="text-red-500 mt-6 text-lg text-center">{errorMessage}</p>
      ) : null}
    </div>
  );
};

export default OurTrainee;
