import {Trainee} from '../models/trainee.model.js'
import jwt from 'jsonwebtoken';
// Adjust the path as per your project structure

// Controller function to add a trainee
export const addTrainee = async (req, res) => {
  try {
    const { username, email, contact, program, duration, certificate, member } = req.body;

    // Validation (optional, but recommended)
    if (!username || !email || !contact || !program || !duration) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    // Check for existing email to avoid duplicates
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee) {
      return res.status(400).json({
        success: false,
        message: 'A trainee with this email already exists',
      });
    }

    // Create new trainee
    const newTrainee = new Trainee({
      username,
      email,
      contact,
      program,
      duration,
      certificate,
      member,
    });

    // Save to database
    const savedTrainee = await newTrainee.save();

    res.status(201).json({
      success: true,
      message: 'Trainee added successfully',
      data: savedTrainee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add trainee',
      error: error.message,
    });
  }
};

  export const searchByCertificate=  async (req, res) => {
    const { certificate } = req.query; // Get the certificate number from query parameters
  
    try {
      const trainee = await Trainee.findOne({ certificate }); // Find trainee by certificate number
  
      if (trainee) {
        res.status(200).json(trainee); // Return the trainee data if found
      } else {
        res.status(404).json({ message: 'Trainee not found with this certificate number.' });
      }
    } catch (error) {
      console.error('Error searching trainee:', error);
      res.status(500).json({ message: 'Error searching for trainee.' });
    }
  };
  
  export const checkMember= async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
      // Find the trainee based on the decoded user ID or email
      const trainee = await Trainee.findOne({ email: decoded.email });
  
      if (trainee) {
        // Check if the user is a member
        if (trainee.member) {
          return res.status(200).json({
            message: "User is enrolled in an internship.",
            title: trainee.program,
            duration: trainee.duration,
          });
        } else {
          return res.status(200).json({
            message: "You are not enrolled in any internship.",
          });
        }
      } else {
        return res.status(404).json({ message: "Trainee not found." });
      }
    } catch (error) {
      console.error("Error fetching trainee data:", error);
      return res.status(500).json({ message: "Error fetching trainee data." });
    }
  }
  