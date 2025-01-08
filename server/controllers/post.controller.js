import {Feature} from '../models/feature.model.js';
import sharp from 'sharp';
import { Post } from '../models/post.model.js';
export const addPost = async (req, res) => {
    try {
      const { title, shortDescription, longDescription } = req.body;
      if (!title || !shortDescription || !longDescription) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const newInternship = await Post.create({
        title,
        shortDescription,
        longDescription
      });
      return res.status(201).json({
        message: 'Intership created successfully.',
        success: true,
        data: newInternship,
      });
    } catch (error) {
      // console.error('Error in addPost:', error);
      return res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  };

export const addFeature = async (req, res) => {
    try {
      // Destructure title and description from req.body
      const { title, description } = req.body;
  
      // Check if both fields are provided
      if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create a new feature in the database
      const newFeature = await Feature.create({
        title,
        description,
      });
  
      // Respond with success message
      return res.status(201).json({
        message: 'Feature created successfully.',
        success: true,
        data: newFeature,
      });
    } catch (error) {
      console.error('Error in addFeature:', error);
      return res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  };

 export const getFeature= async (req, res) => {
    try {
      const features = await Feature.find({}); // Fetch all features
      res.status(200).json({ features });
    } catch (error) {
      console.error("Error fetching features:", error);
      res.status(500).json({ message: "Failed to fetch features" });
    }
  }
  export const getInternship= async (req, res) => {
    try {
      const internship = await Post.find({}); // Fetch all features
      res.status(200).json({ internship });
    } catch (error) {
      console.error("Error fetching Internship:", error);
      res.status(500).json({ message: "Failed to fetch Internship" });
    }
  }