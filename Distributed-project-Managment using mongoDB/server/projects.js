// Description: This file contains the server-side logic for handling project-related requests.
const Project = require("../models/project");

const mongoose = require('mongoose');

// Export the functions:
module.exports = {
  /*
        function name: CreateProject
        function description: A server function that creates a new project and adds it to the DB.
        input: A request from the user with project details.
        output: A response to the user with the new project ID, or an error message.
    */
  CreateProject: async function (req, res) {

    try {

      const { name, summary, start_date, manager, team } = req.body; 

      // Example of saving project to a JSON file or database
      const newProject = new Project({ name, summary, manager, team, start_date, images: [] });

      // Save the project to the database
      await newProject.save();

      // Respond with the created project ID
      res.status(200).json({ _id: newProject._id });
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({message: "Validation Error: " + error.message});
      } else {
        res.status(500).json({message: "Error creating project: " + error.message});
      }
    }
  },

  /*
        function name: addImagesToProject
        function description: A server function that adds an image to an existing project in the DB.
        input: A request from the user with the project ID and the image details.
        output: A response to the user with a success message (200) + the img id, or an error message. 
    */
  addImageToProject: async function (req, res) {
    try {
      const { project_id } = req.params;
      const { thumb, description } = req.body;

      // Check if project_id is a valid ObjectId
      if (!mongoose.isValidObjectId(project_id)) {
        return res.status(400).json({ message: "Invalid project_id format" });
      }

      // Check if URL is provided
      if (!thumb) {
        return res.status(400).json({ message: "Image URL is required" });
      }
      
      // Create an instance of the Image model
      const image = { thumb, description };

      // Find the project by ID and add the new image to the images array
      const project = await Project.findById(project_id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Check if there is already an image with the same URL
      const existingImage = project.images.find(image => image.thumb === thumb);
      if (existingImage) {
        return res.status(400).json({ message: "Image with this URL already exists" });
      }
      

      project.images.push(image);
      await project.save();

      // Retrieve the newly added image
      const addedImage = project.images[project.images.length - 1];


      res.status(200).json({ _id: addedImage._id});
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({message: "Validation Error: " + error.message});
      } else {
        res.status(500).json({message: "Error adding images to project: " + error.message});
      }
    }
  },

  /*
        function name: getProjects
        function description: A server function that returns all the projects from the DB.
        input: None.
        output: A response to the user with all the projects details. 
    */
  getProjects: async function (req, res) {
    try {
      const projects = await Project.find().populate('team._id').populate('manager._id');
      res.status(200).send(projects);
    } catch (error) {
      res.status(500).json({message: "Error fetching projects: " + error.message});
    }
  },

  /*
      function name: deleteImageFromProject
      function description: A server function that deletes an image from an existing project in the DB.
      input: A request from the user with the project ID and the image ID.
      output: A response to the user with a success message (200), or an error message. 
  */
  deleteImageFromProject: async function (req, res) {
    try {
      const { project_id, img_id } = req.params;

      // Check if project_id is a valid ObjectId
      if (!mongoose.isValidObjectId(project_id)) {
        return res.status(400).json({ message: "Invalid project_id format" });
      }
      
      // Find the project by ID
      const project = await Project.findById(project_id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Find the index of the image to be removed
      const imageIndex = project.images.findIndex(
        (image) => image._id.toString() === img_id
      );
      if (imageIndex === -1) {
        return res.status(404).json({ message: "Image not found" });
      }

      // Remove the image from the images array
      project.images.splice(imageIndex, 1);

      // Save the updated project
      await project.save();

      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({message: "Validation Error: " + error.message});
      } else {
        res.status(500).json({message: "Error deleting image from project: " + error.message});
      }
    }
  },
};
