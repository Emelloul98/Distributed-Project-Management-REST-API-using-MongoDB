// A page that Defines the schema for the member collection in the database.
const mongoose = require('mongoose');
const validator = require('validator');

// Define the schema for the member collection:
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, validate(value){  
    // Check if the email is valid:
    if(!validator.isEmail(value)){
      throw new Error('Email is invalid')
    }
  } }
});

// Export the model:
module.exports = mongoose.model('Member', memberSchema);