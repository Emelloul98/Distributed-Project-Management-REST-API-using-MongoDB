// Description: This file contains the routes for the project.
const express = require('express');
const router = express.Router();
// Import the member.js file that has all the server functionalities.
const Member = require('../server/members');
// A route that calls the CreateMember function
router.post('/members', Member.createMember);

// Export the router.
module.exports = router;

