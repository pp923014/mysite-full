import React, { useState } from "react";

const ApplyNowPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    internshipType: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://mysite-full-backend.onrender.com/api/v1/trainee/addTrinee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.fullName,
          email: formData.email,
          contact: formData.contactNumber,
          program: formData.internshipType,
          duration: formData.duration,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Application submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          internshipType: "",
          duration: "",
        });
      } else {
        setMessage(result.message || "Failed to submit application");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Apply For Internship
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Join our team and gain hands-on experience in Tech Field. You'll work
          on real-world projects, collaborate with experienced developers, and
          enhance your skills.
        </p>
      </header>

      {/* Form Section */}
      <form
        className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contactNumber"
            className="block text-gray-700 font-medium mb-2"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your contact number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="internshipType"
            className="block text-gray-700 font-medium mb-2"
          >
            Internship Type
          </label>
          <select
            id="internshipType"
            name="internshipType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.internshipType}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Full Stack Development">Full Stack Development</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-gray-700 font-medium mb-2"
          >
            Duration
          </label>
          <select
            id="duration"
            name="duration"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.duration}
            onChange={handleChange}
            required
          >
            <option value="">Select duration</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Month">2 Month</option>
            <option value="3 Months">3 Months</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ApplyNowPage;
