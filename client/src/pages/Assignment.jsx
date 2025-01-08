import React, { useState } from "react";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Build a Responsive Portfolio",
      description: "Create a fully responsive portfolio website using HTML, CSS, and JavaScript.",
    },
    {
      id: 2,
      title: "Develop a Blog Platform",
      description: "Build a MERN stack application that allows users to create, read, update, and delete blog posts.",
    },
    {
      id: 3,
      title: "API Integration Project",
      description: "Integrate a third-party API into a React application and display the data dynamically.",
    },
    {
      id: 4,
      title: "Machine Learning Model Deployment",
      description: "Train a simple ML model and deploy it on a web application using Flask and React.",
    },
  ]);

  const [githubLinks, setGithubLinks] = useState({});

  const handleInputChange = (id, value) => {
    setGithubLinks({ ...githubLinks, [id]: value });
  };

  const handleSubmit = (id) => {
    const link = githubLinks[id];
    if (link) {
      // alert(`GitHub link for assignment ${id} submitted: ${link}`);
      // Implement API call to submit the GitHub link here.
    } else {
      // alert("Please provide a GitHub link before submitting.");
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Assignment Submissions</h1>
        <p className="text-lg text-gray-600">
          Welcome to the assignment page. Here you can find all the assignments assigned to you. 
          Ensure you complete each task and submit your GitHub repository link for evaluation.
        </p>
      </header>

      {/* Assignments Section */}
      <section>
        {assignments.map((assignment) => (
          <details
            key={assignment.id}
            className="mb-6 border border-gray-300 rounded-lg shadow-sm"
          >
            <summary className="px-6 py-4 bg-gray-100 font-medium cursor-pointer">
              {assignment.title}
            </summary>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4">{assignment.description}</p>
              <label htmlFor={`github-link-${assignment.id}`} className="block text-gray-600 mb-2">
                Submit your GitHub link:
              </label>
              <input
                type="url"
                id={`github-link-${assignment.id}`}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter GitHub repository link"
                value={githubLinks[assignment.id] || ""}
                onChange={(e) => handleInputChange(assignment.id, e.target.value)}
              />
              <button
                onClick={() => handleSubmit(assignment.id)}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </div>
          </details>
        ))}
      </section>

      {/* Footer Section */}
      <footer className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          For any assistance or queries regarding the assignments, please contact your mentor or 
          email us at <a href="mailto:support@umatech.com" className="text-indigo-600">support@umatech.com</a>.
        </p>
      </footer>
    </div>
  );
};

export default AssignmentsPage;
