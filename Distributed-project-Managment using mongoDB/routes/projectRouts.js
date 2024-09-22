// Description: This file contains the routes for the project.
const express = require('express');
const router = express.Router();
// Import the project.js file that has all the server functionalities.
const Project = require('../server/projects');

/* A route that calls the CreateProject function */
router.post('/projects', Project.CreateProject);
/* A route that calls the AddImagesToProject function */
router.post('/projects/:project_id/images', Project.addImageToProject);
/* A route that calls the GetProjects (full list) function */
router.get('/projects', Project.getProjects);
/* A route that calls the deleteImageFromProject function */
router.delete('/projects/:project_id/images/:img_id', Project.deleteImageFromProject);
// Export the router.
module.exports = router;

