import React, { useState } from "react";
import axios from "axios";


const AdminDashboard = () => {
  const [provideData, setProvideData] = useState({
    title: "",
    description: "",
  });

  const handleProvideChange = (e) => {
    const { name, value } = e.target;
    setProvideData({ ...provideData, [name]: value });
  };
  const handleProvideSubmit = async (e) => {
    e.preventDefault();
    console.log("What We Provide Data Submitted:", provideData);
    
    try {
      const response = await axios.post("https://mysite-full-backend.onrender.com/api/v1/post/feature", {
        title: provideData.title,
        description: provideData.description,
      });
      console.log("Response from server:", response.data);
      // You can add logic here to show a success message or reset form fields
    } catch (error) {
      console.error("Error submitting data:", error);
      // You can add error handling here
    }
  };
  
  
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-10">Admin Dashboard</h1>

      {/* Internship Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4">Add Internship</h2>
        <form onSubmit={handleInternshipSubmit}>
          <div className="mb-4">
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={internshipData.title}
              onChange={handleInternshipChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="shortDescription">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={internshipData.shortDescription}
              onChange={handleInternshipChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter short description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="longDescription">
              Long Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              value={internshipData.longDescription}
              onChange={handleInternshipChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter long description"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Submit Internship
          </button>
        </form>
      </div>

      {/* What We Provide Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add "What We Provide"</h2>
        <form onSubmit={handleProvideSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="provideTitle">
              Title
            </label>
            <input
              type="text"
              id="provideTitle"
              name="title"
              value={provideData.title}
              onChange={handleProvideChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="provideDescription">
              Description
            </label>
            <textarea
              id="provideDescription"
              name="description"
              value={provideData.description}
              onChange={handleProvideChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter description"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Submit "What We Provide"
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
