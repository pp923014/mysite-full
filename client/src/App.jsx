import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OurTrainee from './pages/OurTrainee';
import Home from './pages/Home';
import Footer from './components/Footer';
import Assignment from './pages/Assignment';
import ApplyNowPage from './pages/ApplyNow';
import AboutUs from './pages/About';
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound';
const App = () => {
  
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          {/* public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/our-trainee" element={<OurTrainee />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          {/* protected routes */}
          <Route path="/apply-now" element={<PrivateRoute element={<ApplyNowPage />} />}/>
          {/* <Route path="/assignment" element={<PrivateRoute element={<Assignment />} />}/> */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}/>
          {/* <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} />}/> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
