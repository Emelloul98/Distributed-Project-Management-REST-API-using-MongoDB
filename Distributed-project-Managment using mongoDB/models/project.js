// A page that Defines the schema for the project collection in the database.
const { required } = require('joi');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
// import the mongoose-id-validator module:
const mongooseIdValidator = require('mongoose-id-validator');

const validator = require('validator');
// Define the schema for the images subdocument:
const imageSchema = new mongoose.Schema({
  thumb: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: props => `${props.value} is not a valid URL`
    }
  },
  description: {type: String, required: true}
});
// Define the schema for the team member subdocument:
const teamMemberSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  role: { type: String, required: true }
});
// Define the schema for the manager subdocument:
const managerSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true}
});

// Define the schema for the project collection:
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: {type: String, required: true, maxlength: 20, maxlength: 80},
  start_date: { 
    type: String, 
    required: true,
    validate: {
      validator: function (v) {
        const num = parseInt(v, 10);
        return Number.isInteger(num) && num > 0 && num <= 2147483647;
      },
      message: props => `${props.path} must be a valid timestamp`
    }
  },
  manager: {type: managerSchema, required: true},
  team: {
    type: [teamMemberSchema],
    validate: {
      validator: function (v) {
        // Check for at least one team member
        if (v.length < 1) {
          return false;
        }
        // Check for duplicate team members
        const ids = v.map(member => member._id.toString());
        return ids.length === new Set(ids).size;
      },
      message: props => {
        if (props.value.length < 1) {
          return `${props.path} must have at least one team member`;
        }
        return `${props.path} must not have duplicate team members`;
      }
    }
  },
  // Add the images subdocument to the project schema:
  images: [imageSchema]
});
// Apply the mongoose-id-validator plugin to the project schema:
projectSchema.plugin(mongooseIdValidator);

// Export the Project model:
module.exports = mongoose.model('Project', projectSchema);
