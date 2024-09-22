/**
 * @function createMember
 * @description A server function that creates a new member and saves it to the database.
 * @param {Object} req - The request object containing the member details.
 * @param {Object} res - The response object to send the result or error message.
 * @returns {Object} The response object with the new member ID or an error message.
 */
const Member = require("../models/member");

module.exports = {
  createMember: async function (req, res) {
    const { name, email } = req.body;
    try {
      const member = new Member({name, email}); 
      await member.save();
      res.status(200).json({ _id: member._id });
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({message: "Validation Error: " + error.message});
      } else {
        res.status(500).json({message: "Error creating member: " + error.message});
      }
    }
  },
};
